/** The simplest default UI implementation. Implement UI functionalities for:
 * showSelections
 * highlightSelectedObject
 *
 * @require Handlebars
 * @todo IN PROGRESS, not implemented well yet. Uses chromes built-in modal support only atm. just for the kicks :)  */

'use strict';

import { templates } from './templates';

var _styleSheet = {};
var cssClasses = {
  select: "#dialog_select"
};
var $elements = {};
var fadeAnimation = "slow";

export class UI_default {
  constructor(modal, styles) {
  	// Add a media (and/or media query) here if you'd like!
	  // style.setAttribute("media", "screen")
	  // style.setAttribute("media", "only screen and (max-width : 1024px)")
	  _styleSheet = _addStyleElement();
	  _addCSSRulesToScriptTag(_styleSheet, _createCSSRules());

    this.modal = modal || document.getElementById("dialog_select");
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }
  showSelections(map, objects) {
    if (objects && objects.length > 1) {
      _get$Element("select").fadeOut(fadeAnimation, () => {
        this.modal.innerHTML = templates.multiSelection({
          title: "Objects",
          objects
        });

        _showModal(this.modal, cssClasses);

        console.log(objects);

        _get$Element("select").fadeIn(fadeAnimation);
      });
    } else {
      _get$Element("select").fadeOut(fadeAnimation, () => {
        this.modal.innerHTML = templates.singleSelection({
          title: "Selected",
          object: {
            name: objects[0].data.typeData.name
          }
        });

        _showModal(this.modal, cssClasses);

        console.log(objects);

        _get$Element("select").fadeIn(fadeAnimation);
      });
    }
  }
  highlightSelectedObject(map, object) {
    // Not implemented yet
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
function _createCSSRules(dialogOptions = { zIndex: 9999, opacity: 0.9 } ) {
   var allRules = '';

   allRules += `${cssClasses.select} {
      z-index: ${dialogOptions.zIndex};
      opacity: ${dialogOptions.opacity};
      position: fixed;
      left: 0px;
      bottom: 0px;
      background-color: brown;
      border: 1px solid rgb(255, 186, 148);;
      border-bottom: 0px;
      padding:15px;
      margin-left:10px;}`;


    return allRules;
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