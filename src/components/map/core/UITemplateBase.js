(function () {
  'use strict';
  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  var styleSheetElement, allCSSClasses;

  /*---------------------
  --------- API ---------
  ----------------------*/
  class UITemplateBase {
    /**
     * The template base class for UI templates
     *
     * @todo This needs a bit of redesign.
     *
     * @class UITemplateBase
     * @constructor
     * @param  {*} CSSClasses
     */
    constructor(CSSClasses) {
      allCSSClasses = CSSClasses;
      styleSheetElement = this.addStyleElement();
      /* For testing. This is deeefinitely supposed to not be here, but it has stayed there for testing. */
      let createdCSS = `
        ${allCSSClasses.select} {
          z-index: 9999;
          opacity: 0.9;
          position: fixed;
          left: 0px;
          bottom: 0px;
          background-color: brown;
          border: 1px solid rgb(255, 186, 148);;
          border-bottom: 0px;
          padding:15px;
          margin-left:10px;
        }`;
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

  window.flatworld.UITemplateBase = UITemplateBase;
})();