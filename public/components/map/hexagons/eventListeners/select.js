'use strict';

import logger from "../../../logger/log.js";
import { eventListeners } from '../../core/eventlisteners';

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

export function setupHexagonClick(map, callback) {
  eventlisteners = eventListeners(map.eventCBs);

  map.eventCBs.select = mouseDownListener;
  eventlisteners.toggleSelectListener();

  //return onMouseDown(map, callback);

  return false;

  function mouseDownListener() {
    onMouseUp(map, callback);
  }
}

function onMouseUp(map, callback) {
  map.canvas.addEventListener("mouseup", retrieveClickData);

  function retrieveClickData(e) {
    if( map.mapMoved() ) {
      map.canvas.removeEventListener("mouseup", retrieveClickData);
      return false;
    }
    var globalCoords =  {x: e.x, y: e.y };
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }

    map.canvas.removeEventListener("mouseup", retrieveClickData);
  }
}