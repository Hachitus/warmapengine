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

var _styleSheet = {};
var cssClasses = {
  select: "#dialog_select"
};
var $elements = {};
var fadeAnimation = "slow";
var createHighlight;

export class UI_default {
  constructor(modal, styles) {
    var createdCSS;
  	// Add a media (and/or media query) here if you'd like!
	  // style.setAttribute("media", "screen")
	  // style.setAttribute("media", "only screen and (max-width : 1024px)")
	  _styleSheet = _addStyleElement();
	  createdCSS = createCSSRules(cssClasses);
	  _addCSSRulesToScriptTag(_styleSheet, createdCSS);

    this.modal = modal || document.getElementById("dialog_select");
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }
  showSelections(map, objects) {
    createHighlight = setupCreateHighlight(map);

    if(map.mapEnvironment() === "mobile") {
      _showMobileSelections(objects, this.modal, map.drawOnNextTick.bind(map), map.getMovableLayer());
    } else {
      _showDesktopSelections(objects, this.modal, map.drawOnNextTick.bind(map), map.getMovableLayer());
    }
  }
  highlightSelectedObject(map, object) {
    createHighlight = setupCreateHighlight(map);

    if(object.highlightable) {
      return _highlightSelectedObject(object, map.getMovableLayer());
    }
  }
  init() {
    var self = this;

    this.closingElements.forEach(function(element) {
      /**
       * @todo change this modal system totally. As it is based on HTML 5.1 modal specifications atm. for easy testing
       * Maybe create a class that abstracts the modal behind it or then just use this? */
      if(self.modal && self.modal.close) {
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
  if(!$elements[which]) {
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
    console.log("Error occured selecting the objects on this coordinates! Nothing found");
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
  } else {
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
  }
}
function _highlightSelectedObject(object, movableLayer, map) {
  var highlightCircle;
  var positionOnMovable = object.localToLocal(0,0, movableLayer);
  var clonedObject = object.clone();

  createHighlight(clonedObject, movableLayer, positionOnMovable);

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

  if(highlightObjects.length < 1) {
    return false;
  }

  UILayer.emptyUIObjects();
  UILayer.addUIObjects(highlightObjects);

  return highlightObjects;
}

/* @todo This whole damn system and logic needs to be changed and moved elsewhere, stupid stupid stupid atm. */
function setupCreateHighlight(map) {
  return function createHighlight(object, movableLayer, positionOnMovable) {
    var container = new PIXI.Container();
    var circle = createPixiCircle(positionOnMovable, object);

    container.addChild(circle);

    movableLayer.addUIObjects(container);
  }
}

function createPixiCircle(positionOnMovable, object) {
  var circle = new PIXI.Graphics();
  circle.lineStyle(2, 0xFF00FF);  //(thickness, color)
  circle.drawCircle(0, 0, 10);   //(x,y,radius)
  circle.endFill();

  circle.x = Number( positionOnMovable.x + object.anchor.x );
  circle.y = Number( positionOnMovable.y + object.anchor.y )

  return circle;
}

function createEaseljsCircle(positionOnMovable) {
  var g = new createjs.Graphics();
  var highlightCircle;
  var circleCoords = {
    x: Number( positionOnMovable.y + object.regX ),
    y: Number( positionOnMovable.y + object.regY ),
  };

  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(0,0,0));
  g.beginFill(createjs.Graphics.getRGB(255,200,200, 0.2));
  g.drawCircle( circleCoords.x, circleCoords.y, 50 );

  highlightCircle = new createjs.Shape(g);

  return highlightCircle;
}