'use strict';

/**
 * Polyfills for the map, as necessary. Easy to drop out.
 */

/***********************
********* API **********
***********************/
export var polyfills = setupPolyfills();

/***********************
******** PUBLIC ********
***********************/
function setupPolyfills() {
  return {
    arrayFind,
    objectAssign
  };

  function arrayFind() {
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
  }
  /**
   * Object.assign IE11 polyfill. Credits to Mozillas folk:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   *
   * @return {[type]} [description]
   */
  function objectAssign() {
    if (typeof Object.assign != 'function') {
      (function () {
        Object.assign = function (target) {
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }

          var output = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
              for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey];
                }
              }
            }
          }
          return output;
        };
      })();
    }
  }
}