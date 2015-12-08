'use strict';

/**
 * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
 * etc. are in object_select_hexagon
 *
 * @require Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
 */

/***********************
******* IMPORTS ********
***********************/
import { eventListeners as eventListenerMod } from '/components/map/core/eventlisteners';
import { UI } from '/components/map/core/UI';
import { mouseUtils } from '/components/map/core/utils/utils';
import { mapObjects } from '/components/map/core/utils/dataManipulation';

/***********************
********* API **********
***********************/
export var setupHexagonClick = _setupHexagonClick;

/***********************
******* PUBLIC *********
***********************/
/**
 * Curries the detection of clicking on the map and selecting the correct hexagon area.
 * @param  {Map} map      The currently use Map instance
 * @return {[type]}       -
 */
function _setupHexagonClick(map) {
  var eventlisteners, ui;

  /********** Required **********/
  if (!map) {
    throw new Error("eventlisteners initialization require map arguments");
  }

  /* Singleton should have been instantiated before, we only retrieve it with 0 params */
  eventlisteners = eventListenerMod();
  ui = UI();

  eventlisteners.toggleSelectListener(tapListener);

  return true;

  /*************************
  ********* PUBLIC *********
  *************************/
  function tapListener(e) {
    var globalCoords = mouseUtils.eventData.getHAMMERPointerCoords(e);
    var objects;

    objects = map.getObjectsUnderPoint(globalCoords, "unit");
    objects = mapObjects.mapObjectsToArray(objects);
    objects = mapObjects.flattenArrayBy1Level(objects);

    ui.showSelections(objects);
  }
}