'use strict';

/**
 * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
 * etc. are in object_select_hexagon
 */

import { eventListeners as eventListenerMod } from '/components/map/core/eventlisteners';
import { UI } from '/components/map/core/UI';
import { mouseUtils } from '/components/map/core/utils/utils';

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners, ui;
/**
 * Curries the detection of clicking on the map and selecting the correct hexagon area.
 * @param  {Map} map      The currently use Map instance
 * @return {[type]}       -
 */
export function setupHexagonClick(map) {
  var eventListenerCB;

  /********** Required **********/
  if (!map) {
    throw new Error("eventlisteners initialization require map arguments");
  }

  /* Singleton should have been instantiated before, we only retrieve it with 0 params */
  eventlisteners = eventListenerMod();
  ui = UI();

  if (map.getEnvironment() === "mobile") {
    eventListenerCB = setupTapListener(map);
  } else {
    eventListenerCB = mouseDownListener;
  }
  eventlisteners.toggleSelectListener(eventListenerCB);

  return true;

  /*************************
  ********* PUBLIC *********
  *************************/
  function mouseDownListener() {
    onMouseUp(map);
  }
  function setupTapListener(map) {
    return function tapListener(e) {
      var touchCoords = mouseUtils.eventData.getHAMMERPointerCoords(e);
      var globalCoords =  {
        x: touchCoords.x, y: touchCoords.y

      };
      var objects;

      objects = map.getObjectsUnderPoint(globalCoords, "unit");

      if (objects && objects.length > 0) {
        ui.showSelections(objects);
      }
    };
  }
}

function onMouseUp(map) {
  map.canvas.addEventListener("mouseup", retrieveClickData);

  function retrieveClickData(e) {
    if ( map.mapMoved() ) {
      map.canvas.removeEventListener("mouseup", retrieveClickData);
      return false;
    }

    var globalCoords = mouseUtils.eventData.getPointerCoords(e);
    var objects, leveledObjects;

    objects = map.getObjectsUnderPoint(globalCoords, "unit");

    leveledObjects = Object.keys(objects).map(objGroup => {
      return objects[objGroup];
    });
    if (leveledObjects && leveledObjects.length > 0) {
      let merged = [];

      ui.showSelections(merged.concat.apply(merged, leveledObjects));
    }

    map.canvas.removeEventListener("mouseup", retrieveClickData);
  }
}