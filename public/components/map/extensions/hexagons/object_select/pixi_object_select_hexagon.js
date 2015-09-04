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

export let object_select_hexagon = (function object_select_hexagon() {
  var scope = {};
  scope.pluginName = "object_select";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    /* We take the top-most stage on the map and add the listener to it */
    _createPrototypes(mapObj);

    _startClickListener(mapObj);
  };

  return scope;

  function getObjectsForMap(clickCoords, group) {
    /* Filter objects based on quadtree and then based on possible group provided */
    var objects = {};

     Object.keys(this.objectSelections).forEach(layerName => {
       /* If the given group is not the one we want, we skip */
      if(group && group !== layerName) {
        return undefined;
      }
      objects = objects || {};

      let quadtreeLayer = this.objectSelections[layerName];
      let quadtreeObjects = quadtreeLayer.retrieve(clickCoords);

      objects[layerName] = quadtreeObjects.filter(object => {
        var localCoords = object.toLocal(new PIXI.Point(clickCoords.x, clickCoords.y));
        return object.hitArea.contains(localCoords.x, localCoords.y)
        //return object.containsPoint(clickCoords);
      });
    });

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
})();