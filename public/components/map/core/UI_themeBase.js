'use strict';

/***********************
******** IMPORT ********
***********************/
import { createCSSRules } from '/components/map/UIs/default/layout/CSSRules';

/***********************
****** VARIABLES *******
***********************/
var styleSheetElement, allCSSClasses;

/***********************
********* API **********
***********************/
export class UI_templateBase {
  constructor(CSSClasses) {
    allCSSClasses = CSSClasses;
    styleSheetElement = this.addStyleElement();
    let createdCSS = createCSSRules(allCSSClasses);
    this.addCSSRulesToScriptTag(styleSheetElement, createdCSS);
  }
  getStyleSheetElement() {
    return styleSheetElement;
  }
  getCSSClasses() {
    return allCSSClasses;
  }
  addCSSRulesToScriptTag(sheet, rules) {
    sheet.insertRule(rules, 0);
  }
  addStyleElement() {
    var _styleElement = document.createElement("style");
    // WebKit hack :(
    _styleElement.appendChild(document.createTextNode(""));
    document.head.appendChild(_styleElement);

    return _styleElement.sheet;
  }
  showModal(modalElem, cssClasses) {
    /** @todo make sure / check, that this gets added only once */
    modalElem.classList.add(cssClasses.select);
    /* Would be HTML 5.1 standard, but that might be a long way
      this.modal.show();*/
  }
}