'use strict';

/**
 * Handles the selection of hexagons on the map
*/

/***********************
******* IMPORTS ********
***********************/
import { setupHexagonClick } from '/components/map/extensions/hexagons/eventListeners/select';

/***********************
********* API **********
***********************/
export const pluginName = "object_select";
export const object_select = setupObject_select_hexagon();

/***********************
******* PUBLIC *********
***********************/
function setupObject_select_hexagon() {
  var map = {};

  /***********************
  ********** API *********
  ***********************/
  return {
    init
  };

  /**
   * @param {Map} givenMap         Instantiated Map class object
   */
  function init(givenMap) {
    map = givenMap;

    startClickListener(map);
  }

  /***********************
  ******* PRIVATE ********
  ***********************/
  /**
   * @param {Map} map              Instantiated Map class object
   */
  function startClickListener(map) {
    return setupHexagonClick(map);
  }
}