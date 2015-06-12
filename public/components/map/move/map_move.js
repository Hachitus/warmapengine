'use strict';

/**
 * this = map instance
 */
export let map_move = (function () {
  var scope = {};
  var map = {};
  var topMostStage = {};
  var mouseOffsetCoords;
  var mouseOffset = {};

  scope.pluginName = "map_move";

  scope.init = function(mapObj) {
    _createPrototypes(mapObj);

    /* We take the top-most stage on the map and add the drag event listener to it */
    topMostStage = mapObj.stages.slice(-1)[0];

    topMostStage.on("stagemousedown", startDragListener(topMostStage, map));
  };

  return scope;

  function startDragListener( topMostStage, map ) {
    try {
      return function startDrag(e) {
        var offsetCoords = {
          x: e.stageX,
          y: e.stageY
        };
        var moveListeners = [];

        moveListeners.push({
            "action": "stagemousemove",
            "cb": topMostStage.on("stagemousemove", dragListener.call(topMostStage, offsetCoords, map))
        });
        moveListeners.push({
            "action": "stagemousemove",
            "cb": topMostStage.on("stagemousemove",function() {
              console.log("moved");
            })
        });

        moveListeners.push({
            "action": "stagemouseup",
            "cb": topMostStage.on("stagemouseup", function() {
              moveListeners.forEach(function(cbData) {
                  topMostStage.off(cbData.action, cbData.cb);
              });
            })
      });
      };
    } catch(e) {
      console.log(e);
    }
  }
  /* Event listeners are in their separate file; eventListeners.js */
  function dragListener(offsetCoords, map) {
    try {
      return function dragger(e) {
        var moved = {
          x: offsetCoords.x - e.stageX,
          y: offsetCoords.y - e.stageY
        };

        map.moveMap(moved);

        /* The mouse has been moved after pressing. This prevent the click
          event to fire at the same time with the mouseDown / dragging event
        */
        //map.mouseMoved( true );
      };
    } catch (e) {
      console.log(e);
    }
  }

  /* ====== Private functions ====== */
  /**
   * Adds function for the map object and prototype-functions for it's stages and layers. Creates moveMap function
   * for the given map object and moveStage & moveLayer - prototype functions for the stages and layers in the map.
   */
  function _createPrototypes (mapObj) {
    map = mapObj;

    if(mapObj.stages && mapObj.stages[0]) {
      mapObj.stages[0].addPrototype("moveStage", _moveStage);
    }

    /* Not a prototype function, but regular */
    mapObj.moveMap = _moveMap;

    /**
     * prototype function for moving map / all stages in map, that are movable
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
    function _moveMap(coords) {
      this.stages.forEach(function(stage) {
        if(stage.movable) {
          stage.moveStage(coords);
        }
      });

      return this;
    }
    /**
     * prototype function for moving stage / stages all layers
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
    function _moveStage (coords) {
      let preciseCoords = {
        x: this.x + coords.x,
        y: this.y + coords.y
      };

      this.x = preciseCoords.x;
      this.y = preciseCoords.y;

      this.drawThisChild = true;
      map.drawMap();

      return this;
    }
    /**
     * prototype function for moving layer, if it is movable
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
     /*
    function _moveLayer(coords) {
      if(this.movable) {
        this.x = coords.x;
        this.y = coords.y;
      }

      return this;
    }*/
  }
})();