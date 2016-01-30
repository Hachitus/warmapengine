'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import { utils, mapEvents, UI, MapDataManipulator, eventListeners } from '/components/bundles/coreBundle';

/*---------------------
--------- API ---------
----------------------*/
export { _setupHexagonClick as setupHexagonClick };

/*---------------------
------- PUBLIC --------
----------------------*/
/**
 * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
 * etc. are in selectHexagonPlugin
 *
 * @class setupHexagonClick
 * @requires Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
 * @param  {Map} map      The currently use Map instance
 * @return {Boolean}      True
 */
function _setupHexagonClick(map) {
  var ui;

  if (!map) {
    throw new Error("eventlisteners initialization require map arguments");
  }

  ui = UI();

  eventListeners.on("select", tapListener);

  return true;

  /*----------------------
  ------- PUBLIC ---------
  ----------------------*/
  /**
   * the listener that received the event object
   *
   * @method tapListener
   * @param  {Event} e      Event object
   */
  function tapListener(e) {
    var globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
    var getData = {
      allData: function (object) {
        return object.data.typeData;
      }
    };
    var objects, filter;

    filter = new MapDataManipulator({
      type: "filter",
      object: "container",
      property: "name",
      value: "unitLayer"
    });

    objects = map.getObjectsUnderArea(globalCoords, { filter });
    objects = utils.dataManipulation.mapObjectsToArray(objects);
    objects = utils.dataManipulation.flattenArrayBy1Level(objects);

    /* Throw a mapEvent if there are objects found. It might be required to throw this event later on, not yet here. */
    if (objects.length) {
      mapEvents.publish("objectsSelected", objects);
    }

    ui.showSelections(objects, getData);
  }
}