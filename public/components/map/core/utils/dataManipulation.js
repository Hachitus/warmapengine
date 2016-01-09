'use strict';

/**
 * These are utils for manipulating the data, that our classes and functions use.
 */

/***********************
********* API **********
***********************/
export const dataManipulation = setupDataManipulation();

/***********************
******** PUBLIC ********
***********************/
function setupDataManipulation() {
  /***********************
  ********* API **********
  ***********************/
  return {
    mapObjectsToArray,
    flattenArrayBy1Level
  };

  /***********************
  ******** PUBLIC ********
  ***********************/
  /**
   * Changes the data from e.g. getting objects from the map based on coordinate. The data is like this normally:
   * {
   *   units: [{
   *     {... the objects datas ...}
   *   }]
   * }
   * We change it to this:
   * [
   *   [{
   *     {... the objects datas ...}
   *   }]
   * ]
   *
   * @param  {Object} objects       Object that holds objects
   * @return {Array}                Returns the transformed array
   */
  function mapObjectsToArray(objects) {
    return Object.keys(objects).map(objGroup => {
      return objects[objGroup];
    });
  }
  function flattenArrayBy1Level(objects) {
    let merged = [];

    return merged.concat.apply(merged, objects);
  }
}