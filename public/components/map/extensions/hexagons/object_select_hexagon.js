'use strict';

/*-----------------------
--------- IMPORT --------
-----------------------*/
import { setupHexagonClick } from '/components/map/extensions/hexagons/eventListeners/select';

/*-----------------------
---------- API ----------
-----------------------*/
/** For debugging. This will show up if the plugin fails to load in Map.js */
export const object_select = setupObject_select_hexagon();
export default object_select;

/*-----------------------
-------- PUBLIC ---------
-----------------------*/
/**
 * Handles the selection of hexagons on the map
 *
 * @class object_select
 * @return {Object}       Return methods inside object
 */
function setupObject_select_hexagon() {
  var map = {};

  return {
    init
  };

  /**
   * @method  init
   * @param {Map} givenMap         Instantiated Map class object
   */
  function init(givenMap) {
    map = givenMap;

    startClickListener(map);
  }

/*-----------------------
-------- PRIVATE --------
-----------------------*/
  /**
   * @method startClickListener
   * @param {Map} map              Instantiated Map class object
   */
  function startClickListener(map) {
    return setupHexagonClick(map);
  }
}