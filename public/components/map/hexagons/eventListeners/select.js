'use strict';

import logger from "../../../logger/log.js";

export function setupHexagonClick(map, callback) {
  return onMouseDown(map, callback);

  return false;
}

function onMouseDown(map, callback) {
  map.setListener("mousedown", mouseDownListener);

  function mouseDownListener() {
    onMouseUp(map, callback);
  }

  return mouseDownListener;
}

function onMouseUp(map, callback) {
  map.setListener("mouseup", retrieveClickData);

  function retrieveClickData(e) {
    if( map.mapMoved() ) {
      map.removeListeners("mouseup", retrieveClickData);
      return false;
    }
    var globalCoords =  {x: e.x, y: e.y };
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }

    map.removeListeners("mouseup", retrieveClickData);
  }
}