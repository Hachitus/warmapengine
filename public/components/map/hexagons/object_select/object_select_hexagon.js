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

import { Map_coords_horizontalHex } from '../coordinates/Map_coords_horizontalHex';
import { setupHexagonClick } from '../eventListeners/select';

export let object_select_hexagon = function object_select_hexagon(hexRadius) {
  var scope = {};
  /* This needs the size of hexagons */
  var hexCoordsModule = Map_coords_horizontalHex(hexRadius);

  scope.pluginName = "object_select";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    /* We take the top-most stage on the map and add the listener to it */
    var topMostStage = mapObj.stages.slice(-1)[0];

    _createPrototypes(mapObj);

    _startClickListener(mapObj, topMostStage);
  };

  return scope;

  /* Prototypes */
  function getCenterCoords() {
    let bounds = this.getBounds();
    let centerCoords = {};

    if(bounds.x === 0 && bounds.y === 0) {
      bounds = this.getFrameBounds();
    }

    centerCoords.x = bounds.width / 2 + bounds.x;
    centerCoords.x = bounds.height / 2 + bounds.y;

    return centerCoords;
  }
  function getObjectsForMap(clickCoords) {
    this.stages.forEach(function(stage) {
      stage.getObjectsUnderPoint(clickCoords);
    });
  }

  function getObjectsForStage(clickCoords) {
    this.children.forEach(function(layer) {
      layer.getObjectsUnderPoint(clickCoords);
    });
  }
  function getObjectsForLayer(clickCoords) {
    this.children.forEach(function(child) {
      child.getCenterCoords();
      child.getObjectsUnderPoint(clickCoords);
    });
  }
  /* ====== Private functions ====== */
  /**
   * Attached the correct prototypes to map
   *
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _createPrototypes(map) {
    map.prototype.getObjectsUnderPoint = getObjectsForMap;
    map.stages[0].prototype.getObjectsUnderPoint = getObjectsForStage;
    map.stages[0].layers[0].prototype.getObjectsUnderPoint = getObjectsForLayer;
    map.stages[0].layers[0].prototype.getCenterCoords = getCenterCoords;
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener( map, canvas ) {
    return setupHexagonClick(map, canvas, showSelectionChoices);
  }
  /**
   * Adds function for the map object and prototype-functions for it's stages and layers. Creates moveMap function
   * for the given map object and moveStage & moveLayer - prototype functions for the stages and layers in the map.
   */
  function _getObjects(clickCoords) {
    var hexaCenterCoords, mapStage;

    this.stages.forEach(function(stage) {
      if(stage.constructor.name === "Map_stage") {
        /* We need to use the layer for getting objects, since stages don't have good enough methods for this. They do
        not get objects recursively :( */
        hexaCenterCoords = hexCoordsModule.toHexaCenterCoord(clickCoords.x, clickCoords.y);
        mapStage = stage;

        return stage.getObjectsUnderPoint(hexaCenterCoords.x, hexaCenterCoords.y, 0);
      }
    });

    if(!hexaCenterCoords) {
      throw new Error("no center coordinates for hexagon found");
    }
    return mapStage.getObjectsUnderPoint(hexaCenterCoords.x, hexaCenterCoords.y, 0);
  }

  /* This should be separated elsewhere. This is definitely not supposed to be in this class */
  function showSelectionChoices(objects) {
    if(objects && objects.length > 1) {
      alert("You have objects to choose from:" + objects.length);
      console.log(objects);
    } else {
      alert("You just selected an object");
      console.log(objects[0]);
    }
  }
};