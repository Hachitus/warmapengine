/* global $ */

'use strict';

/** The simplest default UI implementation. Implement UI functionalities for:
 * showSelections
 * highlightSelectedObject
 *
 * @require Handlebars
 * @require jQuery
 * @todo  should take jQuery away from this, as soon as we refactor the animations and graphics for selections
 * */

/***********************
******* IMPORT *********
***********************/
import { templates } from '/components/map/UIs/default/layout/templates';
import { createVisibleHexagon } from '/components/map/extensions/hexagons/utils/createHexagon';
import { UI_templateBase } from '/components/map/core/UI_themeBase';
import { drawShapes } from '/components/map/UIs/default/utils/arrows';

/***********************
****** VARIABLES *******
***********************/
var cssClasses = {
  select: "#dialog_select"
};
var fadeAnimation = "slow";
var $elements = {};
var createHighlight;

/***********************
********* API **********
***********************/
export class UI_default extends UI_templateBase {
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
   * Required by the map/core/UI.js API
   */
  getTemplates() {
    return templates;
  }
  /**
   * Required by the map/core/UI.js API
   * @param  {Object} objects     Objects that have been selected. @todo: Should add object format to this documentation
   */
  showSelections(objects) {
    createHighlight = setupCreateHighlight(this.map);
    var hightlightableObjects = _filterObjectsForHighlighting(objects);
    var updateCB = this.map.drawOnNextTick.bind(this.map);
    var UILayer = this.map.getMovableLayer();
    var cb;

    /* We add the objects to be highlighted to the correct UI layer */
    //objectsToUI(UILayer, hightlightableObjects);

    if (objects && hightlightableObjects.length > 1) {
      cb = () => {
        this.modal.innerHTML = templates.multiSelection({
          title: "Objects",
          objects
        });

        this.showModal(this.modal, cssClasses);

        console.log(objects);

        _get$Element("select").fadeIn(fadeAnimation);
      };
    } else if (hightlightableObjects.length === 1) {
      cb = () => {
        this.modal.innerHTML = templates.singleSelection({
          title: "Selected",
          object: {
            name: hightlightableObjects[0].data.typeData.name
          }
        });

        this.showModal(this.modal, cssClasses);
        this.highlightSelectedObject(hightlightableObjects[0]);
        updateCB();

        console.log(hightlightableObjects);

        _get$Element("select").fadeIn(fadeAnimation);
      };
    } else {
      cb = () => {
        UILayer.emptyUIObjects();
        updateCB();
        console.log("Error occured selecting the objects on this coordinates! Nothing found");
      };
    }

    _get$Element("select").fadeOut(fadeAnimation, cb);
  }
  /**
   * Required by the map/core/UI.js API
   * @param  {Object} objects       Objects that have been selected. @todo: Should add object format to this documentation
   */
  highlightSelectedObject(object) {
    var highlightableObject;

    createHighlight = setupCreateHighlight(this.map);

    if (object.highlightable) {
      highlightableObject = _highlightSelectedObject(object, this.map.getMovableLayer(), this.map.getRenderer());

      highlightableObject.dropShadow({ color: "0x0000", distance: 5, alpha: 0.55, angle: 45, blur: 5 });

      return highlightableObject;
    }
  }
  showUnitMovement() {}
  init() {}

}

/***********************
******* PRIVATE ********
***********************/
function _get$Element(which) {
  /* Set the jQuery element to collection only once */
  if (!$elements[which]) {
    let $element = $(cssClasses[which]);
    $elements[which] = $element;
  }

  return $elements[which];
}
function _highlightSelectedObject(object, movableLayer, renderer) {
  var clonedObject;

  clonedObject = object.clone(renderer);
  clonedObject.__proto__ = object.__proto__;

  var jee = object.toGlobal(new PIXI.Point(0,0));
  jee = movableLayer.toLocal(jee);

  jee.x -= object.width * object.anchor.x;
  jee.y -= object.height * object.anchor.y;

  createHighlight(clonedObject, movableLayer, { coords: jee });

  return clonedObject;
}
function _filterObjectsForHighlighting(objects) {
  var newObjects = objects.filter(obj => {
    return obj.highlightable === true ? true : false;
  });

  return newObjects;
}

/* @todo This whole damn system and logic needs to be changed and moved elsewhere, stupid stupid stupid atm. */
function setupCreateHighlight(map) {
  return function createHighlight(object, movableLayer, options = { coords: new PIXI.Point(0, 0) }) {
    var radius = 47;
    var container = new map.createUILayer("UILayer");
    var objCoords = {
      x: Number(object.x),
      y: Number(object.y)
    };
    var highlighterObject;

    highlighterObject = createVisibleHexagon(radius, { color: "#F0F0F0" });
    highlighterObject.x = objCoords.x + 32;
    highlighterObject.y = objCoords.y + 27;

    highlighterObject.alpha = 0.5;

    /* We add the children first to subContainer, since it's much easier to handle the x and y in it, rather than
     * handle graphics x and y */
    container.addChild(highlighterObject);
    container.addChild(object);

    container.position = options.coords;

    movableLayer.emptyUIObjects();
    movableLayer.addUIObjects(container);
  };
}