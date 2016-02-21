(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var mapAPI = window.flatworld.mapAPI;
  var mapEvents = window.flatworld.mapEvents;
  var ObjectSpriteUnit = window.flatworld.objects.ObjectSpriteUnit;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.extensions.basicActions = {
    extendBasicActions: setupExtendBasicActionsToUnits()
  };

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  const BASE_URL = "/requests/";

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /* We just activate the necessary APIs for this module in the mapApi module. This does a lot of the functionality too */
  activateAPIs();

  /**
   * This is a plugin to implement basic actions on units. Includes move, attack etc. This REQUIRES the map-instance to have
   */
  function setupExtendBasicActionsToUnits () {
    return {
      extendMove: function (objectToExtend) {
        objectToExtend = objectToExtend || ObjectSpriteUnit;

        objectToExtend.prototype.move = function (to) {
          mapEvents.publish("objectMove", this);
          mapAPI.post("objectMove", {
            id: this.id,
            from: {
              x: this.x,
              y: this.y
            },
            to
          });
        };
      }
    };
  }

  /**
   * Does a lot of the functionality. Activates the callback used to generate the correct http request
   *
   * @method activateAPIs
   */
  function activateAPIs() {
    mapAPI.add(
      "objectMove",
      function (type, data, params) {
        var object = params[0];
        var movementData = params[0];

        if (type === "get") {
          return {
            url: data.baseUrl + object.name
          };
        } else {
          return {
            url: data.baseUrl + params.name,
            body: JSON.stringify(movementData)
          };
        }
      },
      BASE_URL
    );
  }
})();