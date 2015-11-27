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

import { templates } from '/components/map/UIs/default/layout/templates';
import { createCSSRules } from '/components/map/UIs/default/layout/CSSRules';
import { createVisibleHexagon } from '/components/map/extensions/hexagons/utils/createHexagon';
import { UI_templateBase } from '/components/map/core/UI_templateBase';

var cssClasses = {
  select: "#dialog_select"
};
var fadeAnimation = "slow";
var _styleSheet = {};
var $elements = {};
var createHighlight;

export class UI_default extends UI_templateBase {
  constructor(modal, map, options = { styles: "#F0F0F0" }) {
    var createdCSS;

    super(cssClasses);

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    _styleSheet = this.addStyleElement();
    createdCSS = createCSSRules(cssClasses);
    this.addCSSRulesToScriptTag(_styleSheet, createdCSS);

    this.map = map;
    this.modal = modal || document.getElementById("dialog_select");
    this.styles = options.styles;
  }
  /**
   * Required by the map/core/UI.js API
   */
  getCSSRules() {
    return createCSSRules;
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
        _highlightSelectedObject(hightlightableObjects[0], UILayer, this.map);
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
    createHighlight = setupCreateHighlight(this.map);

    if (object.highlightable) {
      return _highlightSelectedObject(object, this.map.getMovableLayer());
    }
  }
  init() {}


}

/** ====== PRIVATE FUNCTIONS ====== */
function _get$Element(which) {
  /* Set the jQuery element to collection only once */
  if (!$elements[which]) {
    let $element = $(cssClasses[which]);
    $elements[which] = $element;
  }

  return $elements[which];
}
function _highlightSelectedObject(object, movableLayer) {
  var clonedObject;

  clonedObject = object.clone();

  var jee = object.toGlobal(new PIXI.Point(0,0));
  jee = movableLayer.toLocal(jee);

  jee.x -= object.width * object.anchor.x;
  jee.y -= object.height * object.anchor.y;

  createHighlight(clonedObject, movableLayer, { coords: jee });
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
    var container = new map.createLayer("UILayer");
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