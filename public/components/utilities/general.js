'use strict';

/*-----------------------
---------- API ----------
-----------------------*/
export var arrays = setupArrays();

/*-----------------------
--------- PUBLIC --------
-----------------------*/
/**
 * Array manipulation
 *
 * @class utilities.arrays
 * @memberOf Utilities
 */
function setupArrays() {
  return {
    flatten2Levels
  };

  /**
   * Flattern 2 levels deep, 2-dimensional arrays. Credits: http://stackoverflow.com/a/15030117/1523545
   *
   * @method flatten2Levels
   * @param  {Array} arr        Array to flatten
   * @return {Array}            Flattened array
   */
  function flatten2Levels(arr) {
    return [].concat.apply([], arr);
  }
}