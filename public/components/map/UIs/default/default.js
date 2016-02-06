/* global $ */

'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import { UI } from 'components/bundles/strippedCoreBundle';
import { templates } from 'components/map/UIs/default/layout/templates';
import { createVisibleHexagon } from 'components/map/extensions/hexagons/utils/createHexagon';
import { UI_templateBase } from 'components/bundles/coreBundle';
//import { drawShapes } from 'components/map/UIs/default/utils/arrows';

/*---------------------
------ VARIABLES ------
----------------------*/
const FADE_ANIMATION = "slow";
var cssClasses = {
  select: "#dialog_select"
};
var $elements = {};

/*---------------------
--------- API ---------
----------------------*/
export class UI_default extends UI_templateBase {
  /**
   * The simplest default UI implementation. Implemented UI functionalities for: showSelections, highlightSelectedObject
   *
   * @class UI_default
   * @constructor
   * @requires Handlebars
   * @requires jQuery
   * @todo  should take jQuery away from this, as soon as we refactor the animations and graphics for selections
   * @param  {HTMLElement} modal
   * @param  {Map} map
   * @param  {Object} options
   */
  constructor(modal, map, options = { styles: "#F0F0F0" }) {
    super(cssClasses);
    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")

    this.map = map;
    this.modal = modal || document.getElementById("dialog_select");
    this.styles = options.styles;
  }
  /**
   * @method getTemplates
   * Required by the map/core/UI.js API
   */
  getTemplates() {
    return templates;
  }
  /**
   * Required by the map/core/UI.js API
   *
   * @method showSelections
   * @param  {Object} objects     Objects that have been selected. See core.UI for more information
   * @param {Object} getDatas       See explanation in core.UI
   * @param {Object} options        Extra options
   */
  showSelections(objects, getDatas, options) {
    var updateCB = this.map.drawOnNextTick.bind(this.map);
    var UILayer = this.map.getMovableLayer();
    var cb;

    /* We add the objects to be highlighted to the correct UI layer */
    //objectsToUI(UILayer, objects);

    if (objects && objects.length > 1) {
      cb = () => {
        this.modal.innerHTML = templates.multiSelection({
          title: "Objects",
          objects
        });

        this.showModal(this.modal, cssClasses);

        console.log(objects);

        _get$Element("select").fadeIn(FADE_ANIMATION);
      };
    } else if (objects.length === 1) {
      cb = () => {
        this.highlightSelectedObject(objects[0]);

        console.log(objects);
      };
    } else {
      cb = () => {
        UILayer.emptyUIObjects();
        updateCB();
        console.log("Error occured selecting the objects on this coordinates! Nothing found");
      };
    }

    _get$Element("select").fadeOut(FADE_ANIMATION, cb);
  }
  /**
   * Required by the map/core/UI.js API
   *
   * @method highlightSelectedObject
   * @param  {Object} object        Object that has been selected. See core.UI for more information
   * @param {Object} getDatas       See explanation in core.UI
   * @param {Object} options        Extra options. Like dropping a shadow etc.
   */
  highlightSelectedObject(object, getDatas, options = {shadow: { color: "0x0000", distance: 5, alpha: 0.55, angle: 45, blur: 5 }}) {
    var { shadow } = options;
    var highlightableObject, objectDatas;

    objectDatas = getDatas.allData(object);

    this.modal.innerHTML = templates.singleSelection({
      title: "Selected",
      object: {
        name: objectDatas.name
      }
    });
    this.showModal(this.modal, cssClasses);

    highlightableObject = this._highlightSelectedObject(object, this.map.getRenderer());

    highlightableObject.dropShadow({
      color: shadow.color,
      distance: shadow.distance,
      alpha: shadow.alpha,
      angle: shadow.angle,
      blur: shadow.blur
    });

    this.map.drawOnNextTick();

    _get$Element("select").fadeIn(FADE_ANIMATION);

    return highlightableObject;
  }
  /**
   * @method showUnitMovement
   */
  showUnitMovement() {}
  /**
   * @method init
   */
  init() {}

  /*----------------------
  ------- PRIVATE --------
  ----------------------*/
  /**
   * @private
   * @static
   * @method _highlightSelectedObject
   * @param  {Object} object
   * @param  {MapLayer} movableLayer
   * @param  {PIXI.Renderer} renderer
   */
  _highlightSelectedObject(object, renderer) {
    var movableLayer = this.map.getMovableLayer();
    var clonedObject;

    clonedObject = object.clone(renderer);
    clonedObject.__proto__ = object.__proto__;

    var coord = object.toGlobal(new PIXI.Point(0,0));
    coord = movableLayer.toLocal(coord);

    coord.x -= object.width * object.anchor.x;
    coord.y -= object.height * object.anchor.y;

    this.createHighlight(clonedObject, { coords: coord });

    return clonedObject;
  }
  /**
   * @private
   * @static
   * @method createHighlight
   */
  createHighlight(object, options = { coords: new PIXI.Point(0, 0) }) {
    var radius = 47;
    var movableLayer = this.map.getMovableLayer();
    var container = new this.map.createSpecialLayer("UILayer", { toLayer: movableLayer});
    var objCoords = {
      x: Number(object.x),
      y: Number(object.y)
    };
    var highlighterObject;

    highlighterObject = createVisibleHexagon(radius, { color: "#F0F0F0" });
    highlighterObject.x = objCoords.x + 32;
    highlighterObject.y = objCoords.y + 27;

    highlighterObject.alpha = 0.5;

    /* We add the children first to subcontainer, since it's much easier to handle the x and y in it, rather than
     * handle graphics x and y */
    container.addChild(highlighterObject);
    container.addChild(object);

    container.position = options.coords;

    this.map.removeUIObject(this.map.layerTypes.movableType.id, [container])
    this.map.addUIObjects(this.map.layerTypes.movableType.id, [container]);
  }

}

/*----------------------
------- PRIVATE --------
----------------------*/
/**
 * @private
 * @static
 * @method _get$Element
 * @param  {[type]} which [description]
 * @return {[type]}       [description]
 */
function _get$Element(which) {
  /* Set the jQuery element to collection only once */
  if (!$elements[which]) {
    let $element = $(cssClasses[which]);
    $elements[which] = $element;
  }

  return $elements[which];
}