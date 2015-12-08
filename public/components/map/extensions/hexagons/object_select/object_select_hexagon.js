'use strict';

/* Calculate the coordinates of the center hexagon always and get objects based on the coordinates. For example with
  some method like getAllObjectsInHexagon.
SO:
We create a function for layers, like "map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)"
- There we only find out about the coordinates for the object, we dont use getOBjectUnderPoint. If the coords equal to
those gotten from: getHexagonCoordsFromClick, then that object is added to returned array. We can also cache these if
needed for performance

HOW we do the whole organizational stuff?
- map_move
- map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)
*/

/***********************
******* IMPORTS ********
***********************/
import { setupHexagonClick } from '/components/map/extensions/hexagons/eventListeners/select';

/***********************
****** VARIABLES *******
***********************/
var _pluginName = "object_select";

/***********************
********* API **********
***********************/
export var pluginName = _pluginName;
export var object_select = setupObject_select_hexagon();

/***********************
******* PUBLIC *********
***********************/
function setupObject_select_hexagon() {
  var scope = {};
  var map = {};
  scope.pluginName = _pluginName;

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    map = mapObj;

    _startClickListener(mapObj);
  };

  return scope;

  /***********************
  ******* PRIVATE ********
  ***********************/
  /**
   * @param {Map} map - The Map class object
   */
  function _startClickListener(map) {
    return setupHexagonClick(map);
  }
}