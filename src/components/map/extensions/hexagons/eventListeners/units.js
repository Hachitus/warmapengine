(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var utils = window.flatworld.utils;
  var mapEvents = window.flatworld.mapEvents;
  var UI = window.flatworld.UI;
  var MapDataManipulator = window.flatworld.MapDataManipulator;
  var eventListeners = window.flatworld.eventListeners;
  var mapStates = window.flatworld.mapStates;
  var mapLog = window.flatworld.log;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.extensions.hexagons.setupHexagonClick = _setupUnitsHexagonClick;

  /*---------------------
  ------- PUBLIC --------
  ----------------------*/
  /**
   * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
   * etc. are in selectHexagonPlugin
   *
   * @class extensions.hexagons.setupHexagonClick
   * @requires Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
   * @event                 Mapselect and objectsSelected (objectsSelected will have parameter for the objects that were selected)
   * @param  {Map} map      The currently use Map instance
   * @return {Boolean}      True
   */
  function _setupUnitsHexagonClick(FTW) {
    var ui;

    if (!FTW) {
      throw new Error("eventlisteners initialization requires flatworld instance as a parameter");
    }

    ui = UI();

    eventListeners.on("select", tapListener);
    eventListeners.on("order", orderListener);

    return true;

    /*----------------------
    ------- PUBLIC ---------
    ----------------------*/
    /**
     * the listener that received the event object
     *
     * @private
     * @method tapListener
     * @param  {Event} e      Event object
     */
    function tapListener(e) {
      const globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
      const getData = {
        allData: function (object) {
          return object.data.typeData;
        }
      };
      const containerFilter = new MapDataManipulator({
        type: "filter",
        object: "layer",
        property: "name",
        value: "unitLayer"
      });
      var objects;

      mapStates.objectSelect();

      objects = FTW.getObjectsUnderArea(globalCoords, { filters: containerFilter });
      objects = utils.dataManipulation.mapObjectsToArray(objects);
      objects = utils.dataManipulation.flattenArrayBy1Level(objects);

      /* Throw a mapEvent if there are objects found. It might be required to throw this event later on, not yet here. */
      if (objects.length) {
        mapEvents.publish("objectsSelected", objects);
      }

      FTW.currentlySelectedObjects = objects;
      ui.showSelections(objects, getData);
      FTW.drawOnNextTick();
    }
    /**
     * This listener is for the situation, where we have an object and we issue an order / action to
     * that unit. For example to move from one hexagon to another.
     *
     * @private
     * @method orderListener
     * @param  {Event} e      Event object
     */
    function orderListener(e) {
      const filter = new MapDataManipulator({
        type: "filter",
        object: "layer",
        property: "name",
        value: "unitLayer"
      });
      var getData = {
        allData: function (object) {
          return object.data.typeData;
        }
      };
      var selectedObject = FTW.currentlySelectedObjects[0];
      var globalCoords;

      if (FTW.currentlySelectedObjects.length > 1) {
        mapLog.error("the selected object is only supported to be one atm." + JSON.stringify(FTW.currentlySelectedObjects));
      } else if (!selectedObject) {
        mapLog.error("No objects selected for orders! " + JSON.stringify(selectedObject));
      }

      mapStates.objectOrder();

      if (FTW.isSupportedTouch) {
        globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
      } else {
        globalCoords = utils.mouse.eventData.getPointerCoords(e);
      }

      selectedObject.move(globalCoords);
      mapEvents.publish("objectMoves", selectedObject);

      ui.showUnitMovement(selectedObject, globalCoords);

      mapStates.objectOrderEnd();
      FTW.drawOnNextTick();
    }
  }
})();