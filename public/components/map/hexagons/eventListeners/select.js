'use strict';

import logger from "../../../logger/log.js";

export function setupHexagonClick(map, callback) {
  try {
    onMouseDown(map, callback);
    onMouseUp(map, callback);
  } catch (e) {
    logger.debug(e, "onMouseDown or onMouseUp hexagonClick error:");
  }

  return true;
}

function onMouseDown(map, callback) {
  map.setListener("mousedown", function(e) {
    var globalCoords =  {x: e.stageX, y: e.stageY };
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }
  });
}

function onMouseUp(map, element) {
  map.setListener("mouseup", function(e) {
    map.removeListeners("mouseup");
  });
}