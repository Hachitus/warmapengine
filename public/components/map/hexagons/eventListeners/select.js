'use strict';

import logger from "../../../logger/log.js";

export function setupHexagonClick(map, element, callback) {
  try {
    onMouseDown(...arguments);
    onMouseUp(element);
  } catch (e) {
    logger.debug(e, "onMouseDown or onMouseUp hexagonClick error:");
  }

  return true;
}

function onMouseDown(map, element, callback) {
  element.addEventListener("stagemousedown", function(e) {
    var globalCoords = element.localToGlobal(e.stageX, e.stageY);
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if(objects && objects.length > 0) {
      callback(objects);
    }
  });
}

function onMouseUp(element) {
  element.addEventListener("stagemousedown", function(e) {
    element.removeEventListener("stagemousedown", onMouseDown)
  });
}