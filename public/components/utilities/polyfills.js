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
    arrayFind
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
}