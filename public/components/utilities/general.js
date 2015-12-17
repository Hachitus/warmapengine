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
    flatten2Levels
  };

  /**
   * Flattern 2 levels deep, 2-dimensional arrays. Credits: http://stackoverflow.com/a/15030117/1523545
   *
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  function flatten2Levels(arr) {
    return [].concat.apply([], arr);
  }
}