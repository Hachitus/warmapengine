/** The simplest default UI implementation. Implement UI functionalities for:
 * showSelections
 * highlightSelectedObject
 *
 * @require Handlebars
 * @todo IN PROGRESS, not implemented well yet. Uses chromes built-in modal support only atm. just for the kicks :)
    NEED to at least remove the framework specific things out of this module! */

'use strict';

import { templates } from './layout/templates';
import { createCSSRules } from './layout/CSSRules';
import { createVisibleHexagon } from '../../extensions/hexagons/utils/createHexagon';
import { pixi_createVisibleHexagon } from '../../extensions/hexagons/utils/pixi_createHexagon';

import { calcShortDiagonal, calcLongDiagonal } from '/components/map/extensions/hexagons/utils/hexagonMath';

var _styleSheet = {};
var cssClasses = {
  select: "#dialog_select"
};
var $elements = {};
var fadeAnimation = "slow";
var createHighlight;

export class UI_default {
  constructor(modal, map, options = { styles: "#F0F0F0" }) {
    var createdCSS;
    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    _styleSheet = _addStyleElement();
    createdCSS = createCSSRules(cssClasses);
    _addCSSRulesToScriptTag(_styleSheet, createdCSS);

    this.map = map;
    this.modal = modal || document.getElementById("dialog_select");
    this.styles = options.styles;

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }
  showSelections(objects) {
    createHighlight = setupCreateHighlight(this.map);

    if (this.map.getEnvironment() === "mobile") {
      _showMobileSelections(objects, this.modal, this.map.drawOnNextTick.bind(this.map), this.map.getMovableLayer());
    } else {
      _showDesktopSelections(objects, this.modal, this.map.drawOnNextTick.bind(this.map), this.map.getMovableLayer());
    }
  }
  highlightSelectedObject(object) {
    createHighlight = setupCreateHighlight(this.map);

    if (object.highlightable) {
      return _highlightSelectedObject(object, this.map.getMovableLayer());
    }
  }
  init() {
    var self = this;

    this.closingElements.forEach(function(element) {
      /**
       * @todo change this modal system totally. As it is based on HTML 5.1 modal specifications atm. for easy testing
       * Maybe create a class that abstracts the modal behind it or then just use this? */
      if (self.modal && self.modal.close) {
        _activateClosingElement( element, self.modal.close.bind(self.modal) );
      }
    });
  }
}

/** ====== PRIVATE FUNCTIONS ====== */
function _activateClosingElement(element, closeCB) {
  element.addEventListener("click", function(e) {
        closeCB();
      });
}
function _DOMElementsToArray(elements) {
  if (!elements) {
    throw new Error(this.constructor + " function needs elements");
  }

  var length = elements.length;
  var elementArray = [];

  for (let i = 0; i < length; i++) {
    elementArray.push(elements[i]);
  }

  return elementArray;
}
function _addCSSRulesToScriptTag(sheet, rules) {
  sheet.insertRule(rules, 0);
}
function _addStyleElement() {
  var _styleElement = document.createElement("style");
  // WebKit hack :(
  _styleElement.appendChild(document.createTextNode(""));
  document.head.appendChild(_styleElement);

  return _styleElement.sheet;
}
function _showModal(modalElem, cssClasses) {
  /** @todo make sure / check, that this get added only once */
  modalElem.classList.add(cssClasses.select);
  /* Would be HTML 5.1 standard, but that might be a long way
    this.modal.show();*/
}
function _get$Element(which) {
  /* Set the jQuery element to collection only once */
  if (!$elements[which]) {
    let $element = $(cssClasses[which]);
    $elements[which] = $element;
  }

  return $elements[which];
}
function _showDesktopSelections(objects, modal, updateCB, UILayer, map) {
  var hightlightableObjects = _selectionsInit(UILayer, objects);

  if (objects && hightlightableObjects.length > 1) {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      modal.innerHTML = templates.multiSelection({
        title: "Objects",
        objects
      });

      _showModal(modal, cssClasses);

      console.log(objects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else if (hightlightableObjects.length === 1) {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      modal.innerHTML = templates.singleSelection({
        title: "Selected",
        object: {
          name: hightlightableObjects[0].data.typeData.name
        }
      });

      _showModal(modal, cssClasses);
      _highlightSelectedObject(hightlightableObjects[0], UILayer, map);
      updateCB();

      console.log(hightlightableObjects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      UILayer.emptyUIObjects();
      updateCB();
      console.log("Error occured selecting the objects on this coordinates! Nothing found");
    });
  }
}
function _showMobileSelections(objects, modal, updateCB, UILayer) {
  var hightlightableObjects = _selectionsInit(UILayer, objects);

  if (objects && objects.length > 1) {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      modal.innerHTML = templates.multiSelection({
        title: "Objects",
        objects
      });

      _showModal(modal, cssClasses);

      console.log(objects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else if (hightlightableObjects.length === 1) {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      modal.innerHTML = templates.singleSelection({
        title: "Selected",
        object: {
          name: hightlightableObjects[0].data.typeData.name
        }
      });

      _showModal(modal, cssClasses);
      _highlightSelectedObject(hightlightableObjects[0], UILayer, map);
      updateCB();

      console.log(hightlightableObjects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else {
    _get$Element("select").fadeOut(fadeAnimation, () => {
      UILayer.emptyUIObjects();
      updateCB();
      console.log("Error occured selecting the objects on this coordinates! Nothing found");
    });
  }
}
function _highlightSelectedObject(object, movableLayer, map) {
  var clonedObject, correctCoords;

  clonedObject = object.clone();

  var jee = object.toGlobal(new PIXI.Point(0,0));
  jee = movableLayer.toLocal(jee);

  jee.x -= object.width * object.anchor.x;
  jee.y -= object.height * object.anchor.y;

  createHighlight(clonedObject, movableLayer, { coords: jee });

}
function _filterObjectsForHighlighting(objects) {
  var newObjects = objects;

  if (objects && objects.length > 1) {
    newObjects = objects.filter(obj => {
      return obj.highlightable === true ? true : false;
    });
  }

  return newObjects;
}
function _selectionsInit(UILayer, objects) {
  var highlightObjects = _filterObjectsForHighlighting(objects);

  if (highlightObjects.length < 1) {
    return false;
  }

  UILayer.emptyUIObjects();
  UILayer.addUIObjects(highlightObjects);

  return highlightObjects;
}

/* @todo This whole damn system and logic needs to be changed and moved elsewhere, stupid stupid stupid atm. */
function setupCreateHighlight(map) {
  return function createHighlight(object, movableLayer, options = { coords: new PIXI.Point(0, 0) }) {
    var radius = 47;
    var container = new map.createLayer("UILayer");
    var easelObjCoords = {
      x: Number(object.x),
      y: Number(object.y)
    };
    var highlighterObject;

    if (typeof createjs != 'undefined') {
      highlighterObject = createVisibleHexagon({ x:0, y:0 }, radius, "#F0F0F0");
      highlighterObject.x = easelObjCoords.x - 1;
      highlighterObject.y = easelObjCoords.y + 12;
    } else {
      //let positionOnMovable = object.toLocal(new PIXI.Point(0,0), movableLayer);
      highlighterObject = pixi_createVisibleHexagon(radius, { color: "#F0F0F0" });
      //highlighterObject = new PIXI.Sprite(highlighterObject.generateTexture(false));
      highlighterObject.x = easelObjCoords.x + 32;
      highlighterObject.y = easelObjCoords.y + 27;
      /*let positionOnMovable = new PIXI.Point(0,0);
      circle = createPixiCircle(object, radius, positionOnMovable);
      circle.x = calcShortDiagonal(radius) / 2;
      circle.y = ( calcLongDiagonal(radius) / 2 ) + ( calcLongDiagonal(radius) / 4 );*/
    }

    highlighterObject.alpha = 0.5;

    /* We add the children first to subContainer, since it's much easier to handle the x and y in it, rather than
     * handle graphics x and y */
    container.addChild(highlighterObject);
    container.addChild(object);

    container.position = options.coords;

    movableLayer.addUIObjects(container);
  };
}

function createPixiCircle(object, radius, positionOnMovable) {
  var circle = new PIXI.Graphics();
  circle.lineStyle(2, 0xFF00FF);  //(thickness, color)
  circle.drawCircle(0, 0, radius);   //(x,y,radius)
  circle.endFill();

  circle.position = Object.assign({}, positionOnMovable);

  return circle;
}

function createEaseljsCircle(object, radius) {
  var g = new createjs.Graphics();
  var highlightCircle;

  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
  g.beginFill(createjs.Graphics.getRGB(255, 200, 200, 0.2));
  g.drawCircle( 0, 0, radius );

  highlightCircle = new createjs.Shape(g);

  return highlightCircle;
}