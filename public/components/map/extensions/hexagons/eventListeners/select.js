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
import { utils, mapEvents, UI, eventListeners as eventListenerMod } from '/components/bundles/coreBundle';

/***********************
********* API **********
***********************/
export { _setupHexagonClick as setupHexagonClick };

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
    var globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
    var objects;

    objects = map.getObjectsUnderPoint(globalCoords, "unit");
    objects = utils.dataManipulation.mapObjectsToArray(objects);
    objects = utils.dataManipulation.flattenArrayBy1Level(objects);

    /* Throw a mapEvent if there are objects found. It might be required to throw this event later on, not yet here. */
    if (objects.length) {
      mapEvents.publish("objectsSelected", objects);
    }

    ui.showSelections(objects);
  }
}