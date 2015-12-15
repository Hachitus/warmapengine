'use strict';

/***********************
********* API **********
***********************/
export var arrays = setupArrays();

/***********************
******** PUBLIC ********
***********************/
function setupArrays() {
  return {
    flatten
  };

  /**
   * Flattern 2-dimensional arrays. Credits: http://stackoverflow.com/a/15030117/1523545
   *
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }
}