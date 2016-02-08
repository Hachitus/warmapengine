'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import { createCSSRules } from 'components/map/UIs/default/layout/CSSRules';

/*---------------------
------ VARIABLES ------
----------------------*/
var styleSheetElement, allCSSClasses;

/*---------------------
--------- API ---------
----------------------*/
export class UI_templateBase {
  /**
   * The template base class for UI templates
   *
   * @todo This needs a bit of redesign.
   *
   * @class core.UI_templateBase
   * @constructor
   * @param  {*} CSSClasses
   */
  constructor(CSSClasses) {
    allCSSClasses = CSSClasses;
    styleSheetElement = this.addStyleElement();
    let createdCSS = createCSSRules(allCSSClasses);
    this.addCSSRulesToScriptTag(styleSheetElement, createdCSS);
  }
  /**
   * Get the stylesheet element. Where are the defined CSS is
   *
   * @method getStyleSheetElement
   * @return {HTMLElement}
   */
  getStyleSheetElement() {
    return styleSheetElement;
  }
  /**
   * @method getCSSClasses
   */
  getCSSClasses() {
    return allCSSClasses;
  }
  /**
   * @method addCSSRulesToScriptTag
   *
   * @param {Object} sheet
   * @param {Object} rules
   */
  addCSSRulesToScriptTag(sheet, rules) {
    sheet.insertRule(rules, 0);
  }
  /**
   * @method addStyleElement
   */
  addStyleElement() {
    var _styleElement = document.createElement("style");
    // WebKit hack :(
    _styleElement.appendChild(document.createTextNode(""));
    document.head.appendChild(_styleElement);

    return _styleElement.sheet;
  }
  /**
   * @method showModal
   *
   * @param {HTMLElement} modalElem
   * @param {Object} cssClasses
   * @todo make sure / check, that modalElem.classList.add gets added only once
   */
  showModal(modalElem, cssClasses) {
    modalElem.classList.add(cssClasses.select);
    /* Would be HTML 5.1 standard, but that might be a long way
      this.modal.show();*/
  }
}