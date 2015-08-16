'use strict';

/**
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP */

import { eventListeners as eventListenerMod } from '../../../core/eventlisteners';
import { mouseUtils } from '../../../core/utils/utils';

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

export function setupHexagonClick(map, callback) {
  /* Singleton should have been instantiated before, we only retrieve it with 0 params! */
  eventlisteners = eventListenerMod();

  if(map.mapEnvironment() === "mobile") {
    map.eventCBs.select = setupTapListener(map, callback);
  } else {
    map.eventCBs.select = mouseDownListener;
  }
  eventlisteners.toggleSelectListener();

  return false;

  function mouseDownListener() {
    onMouseUp(map, callback);
  }
  function setupTapListener(map, callback) {
    return function tapListener(e) {
      var touchCoords = e.center;
      var globalCoords =  {
        x: touchCoords.x, y: touchCoords.y

      };
      var objects;

      objects = map.getObjectsUnderMapPoint(globalCoords);

      if (objects && objects.length > 0) {
        callback(objects);
      }
    }
  }
}

function onMouseUp(map, callback) {
  map.canvas.addEventListener("mouseup", retrieveClickData);

  function retrieveClickData(e) {
    if( map.mapMoved() ) {
      map.canvas.removeEventListener("mouseup", retrieveClickData);
      return false;
    }

    var globalCoords = mouseUtils.getEventCoordsOnPage(e);
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }

    map.canvas.removeEventListener("mouseup", retrieveClickData);
  }
}