'use strict';

/** Hold different validator functions to be used in modules */

/** ===== Private functions declared ===== */
let privateFunctions = {
  _isInt
};

/** ===== EXPORT ===== */
export let validatorMod = (function validatorMod() {
  return {
    isIndex(int) {
      return privateFunctions.isInt(int);
    },
    isBoolean(bool) {
      return bool === Boolean(bool);
    },
    isCoordinates(x, y) {
      if (privateFunctions.isInt(x) && privateFunctions.isInt(y) ) {
        return true;
      }

      return false;
    },
    isSubContainerAmount() {

    },
    isUseOfSubLayers() {

    },
    isUseOfSubContainers() {

    }
  };
})();

/** ===== Private functions ===== */
function _isInt(wannabeInt) {
  /* ES6 */
  if (Number.isInteger) {
    return Number.isInteger(wannabeInt);
  }

  /* ES5 */
  return typeof wannabeInt === 'number' && (wannabeInt % 1) === 0;
}