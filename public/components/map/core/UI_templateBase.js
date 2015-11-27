'use strict';

export class UI_templateBase {
  constructor(cssClasses) {
    this.cssClasses = cssClasses;
    this.addStyleElement = addStyleElement;
    this.addCSSRulesToScriptTag = addCSSRulesToScriptTag;
    this.showModal = showModal;
  }
}

/*****************************
********* INHERITED **********
*****************************/
function addCSSRulesToScriptTag(sheet, rules) {
  sheet.insertRule(rules, 0);
}
function addStyleElement() {
  var _styleElement = document.createElement("style");
  // WebKit hack :(
  _styleElement.appendChild(document.createTextNode(""));
  document.head.appendChild(_styleElement);

  return _styleElement.sheet;
}
function showModal(modalElem, cssClasses) {
  /** @todo make sure / check, that this gets added only once */
  modalElem.classList.add(cssClasses.select);
  /* Would be HTML 5.1 standard, but that might be a long way
    this.modal.show();*/
}