(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.generalUtils.arrays = setupArrays();

  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * Array manipulation
   *
   * @class utilities.arrays
   */
  function setupArrays() {
    return {
      flatten2Levels,
      chunkArray
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
    /**
     * from: http://stackoverflow.com/a/34847417/1523545
     */
    function chunkArray(array, chunkSize) {
      var result = [];

      for (var i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, chunkSize + i));
      }

      return result;
    }
  }
})();