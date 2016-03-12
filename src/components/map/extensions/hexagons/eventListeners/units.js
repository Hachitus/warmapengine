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
  var hexagonUtils = window.flatworld.extensions.hexagons.utils;

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
   * @class hexagonPlugin.setupHexagonClick
   * @requires Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
   * @event                 Mapselect and objectsSelected (objectsSelected will have parameter for the objects that were selected)
   * @param  {Map} map      The currently use Map instance
   * @return {Boolean}      True
   */
  function _setupUnitsHexagonClick(map) {
    var ui, mapInstance;

    if (!map) {
      throw new Error("eventlisteners initialization require map arguments");
    }

    mapInstance = map;
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

      mapStates.objectSelect();

      objects = map.getObjectsUnderArea(globalCoords, { filter });
      objects = utils.dataManipulation.mapObjectsToArray(objects);
      objects = utils.dataManipulation.flattenArrayBy1Level(objects);

      /* Throw a mapEvent if there are objects found. It might be required to throw this event later on, not yet here. */
      if (objects.length) {
        mapEvents.publish("objectsSelected", objects);
      }

      map.currentlySelectedObjects = objects;
      ui.showSelections(objects, getData);
      map.drawOnNextTick();
    }
    /**
     * This listener is for the situation, where we have an object and we issue an order / action to
     * that unit. For example to move from one hexagon to another.
     *
     * @method orderListener
     * @param  {Event} e      Event object
     */
    function orderListener(e) {
      const filter = new MapDataManipulator({
        type: "filter",
        object: "container",
        property: "name",
        value: "unitLayer"
      });
      var getData = {
        allData: function (object) {
          return object.data.typeData;
        }
      };
      var selectedObject = mapInstance.currentlySelectedObjects[0];
      var globalCoords;

      if (mapInstance.currentlySelectedObjects.length > 1) {
        mapLog.error("the selected object is only supported to be one atm." + JSON.stringify(mapInstance.currentlySelectedObjects));
      } else if (!selectedObject) {
        mapLog.error("No objects selected for orders! " + JSON.stringify(selectedObject));
      }

      mapStates.objectOrder();

      if (mapInstance.isSupportedTouch) {
        globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
      } else {
        globalCoords = utils.mouse.eventData.getPointerCoords(e);
      }

      /* Align the coordinates with hexagon grid */
      globalCoords = hexagonUtils.getClosestHexagonCenter(map.getMovableLayer().toLocal(globalCoords));

      selectedObject.move(globalCoords);
      mapEvents.publish("objectMoves", selectedObject);

      ui.showUnitMovement(selectedObject, globalCoords);

      mapStates.objectOrderEnd();
      mapInstance.drawOnNextTick();
    }
  }
})();