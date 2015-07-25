/**
  The simplest default UI implementation. Holds:
  - Selection highlight of object
  - Selection list of units at the hexagon
*/

/* ====== 3rd party imports ====== */

/* ====== Own module imports ====== */

'use strict';

export class UI_default {
  constructor(modal, styles) {
    this.modal = modal || document.getElementsByTagName("dialog")[0];
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }
  showSelections(objects) {
    if(objects && objects.length > 1) {
      this.modal.innerHTML = "objects:<br>";
      objects.map( object => {
        this.modal.innerHTML += object.data.typeData.name + "<br>";
      });
      this.modal.show();
      console.log(objects);
    } else {
      this.modal.innerHTML = "SELECTED:<br>";
      this.modal.innerHTML += objects[0].data.typeData.name;
      this.modal.show();
      console.log(objects);
    }
  }
  init() {
    var self = this;

    this.closingElements.forEach(function(element) {
      _activateClosingElement( element, self.modal.close.bind(self.modal) );
    });
  }
}

function _activateClosingElement(element, closeCB) {
      element.addEventListener("click", function(e) {
        closeCB();
      });
}
function _DOMElementsToArray(elements) {
  if(!elements) {
    throw new Error(this.constructor + " function needs elements");
  }

  var length = elements.length;
  var elementArray = [];

  for(let i = 0; i < length; i++) {
    elementArray.push(elements[i]);
  }

  return elementArray;
}