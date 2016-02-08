'use strict';

export function createCSSRules(classNames, dialogOptions = { zIndex: 9999, opacity: 0.9 }) {
  return `
    ${classNames.select} {
      z-index: ${dialogOptions.zIndex};
      opacity: ${dialogOptions.opacity};
      position: fixed;
      left: 0px;
      bottom: 0px;
      background-color: brown;
      border: 1px solid rgb(255, 186, 148);;
      border-bottom: 0px;
      padding:15px;
      margin-left:10px;
    }`;
}