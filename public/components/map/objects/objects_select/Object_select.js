'use strict';

export let object_select = (function object_select() {
  var scope = {};

  scope.pluginName = "object_select";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    /* We take the top-most stage on the map and add the drag event listener to it */
    var topMostStage = mapObj.stages.slice(-1)[0];

    //_createPrototypes(mapObj);

    /* We take the top-most stage on the map and add the drag event listener to it */
    topMostStage = mapObj.stages.slice(-1)[0];

    topMostStage.on( "click", _startClickListener(mapObj ) );
  };

  return scope;

  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener( map ) {
    return function selectObjects(e) {
      var clickCoords = {
        x: e.stageX,
        y: e.stageY
      };
      var objects;

      objects = _getObjects(map.stages, clickCoords);

      showSelectionChoices(objects);
    };
  }
  /* ====== Private functions ====== */
  /**
   * Adds function for the map object and prototype-functions for it's stages and layers. Creates moveMap function
   * for the given map object and moveStage & moveLayer - prototype functions for the stages and layers in the map.
   */
  function _getObjects(stages, clickCoords) {
    stages.forEach(function(stage) {
      if(stage.constructor.name === "Map_stage") {
        return stage.getObjectsUnderMapPoint(clickCoords.x, clickCoords.y);
      }
    });
  }

  /* This should be separated elsewhere. This is definitely not supposed to be in this class */
  function showSelectionChoices(objects) {
    alert("You have objects to choose from");

    if(objects.length > 1) {
      alert("You have objects to choose from");
      console.log(objects);
    } else {
      alert("You just selected an object");
      console.log(objects[0]);
    }
  }
})();