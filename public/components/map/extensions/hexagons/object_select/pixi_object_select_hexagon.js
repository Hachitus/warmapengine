/*Calculate the coordinates of the center hexagon always and get objects based on the coordinates. For example with
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

'use strict';

//import { map_coords_horizontalHex } from '../coordinates/Map_coords_horizontalHex';
import { setupHexagonClick } from '../eventListeners/select';
import { UI } from '../../../core/UI';

var _pluginName = "object_select";

export var pluginName = _pluginName;

export let object_select = (function object_select_hexagon() {
  var scope = {};
  var map = {};
  scope.pluginName = _pluginName;

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    map = mapObj;
    /* We take the top-most stage on the map and add the listener to it */
    _createPrototypes(mapObj);

    _startClickListener(mapObj);
  };

  return scope;

  function getObjectsForMap(clickCoords, group) {
    var objects = {};

    objects[group] = map.objectManager.retrieve(group, clickCoords);

    return objects;
  }
  /* ====== Private functions ====== */
  /**
   * Attached the correct prototypes to map. I do not think we need to override getObjectsUnderPoint for stages.
   *
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _createPrototypes(map) {
    map.objectManager.hitTest = hitTest;
    map.setPrototype("getObjectsUnderPoint", getObjectsForMap);
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener( map ) {
    var singletonUI = UI();

    return setupHexagonClick(map, singletonUI.showSelections);
  }
  function hitTest(obj, coords) {
    var isHit = this.hitDetector.processInteractive(
      new PIXI.Point(coords.x, coords.y),
      obj,
      function(parent, hits) {
        console.log("Shouldn't get here, the object should be non-interactive");
      },
      true,
      true);

    return isHit;
  }
})();