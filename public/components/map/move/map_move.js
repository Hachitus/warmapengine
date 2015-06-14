'use strict';

export let map_move = (function map_move() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = "map_move";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    /* We take the top-most stage on the map and add the drag event listener to it */
    var topMostStage = mapObj.stages.slice(-1)[0];

    _createPrototypes(mapObj);

    topMostStage.on("stagemousedown", _startDragListener(topMostStage, mapObj));
  };

  return scope;

  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener( topMostStage, map ) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset({
          x: e.stageX,
          y: e.stageY
        });
        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */
        var moveListeners = [];

        moveListeners.push({
            "action": "stagemousemove",
            "cb": topMostStage.on("stagemousemove", _dragListener.call(topMostStage, map))
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
      } catch(e) {
        console.log(e);
      }
    };
  }
  /* Event listeners are in their separate file; eventListeners.js */
  function _dragListener(map) {
    try {
      return function dragger(e) {
        var offset = offsetCoords.getOffset();
        var moved = {
          x: e.stageX - offset.x,
          y: e.stageY - offset.y
        };

        map.moveMap(moved);

        offsetCoords.setOffset({
          x: e.stageX,
          y: e.stageY
        });

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
    if(mapObj.stages && mapObj.stages[0]) {
      mapObj.stages[0].addPrototype("moveStage", _moveStage(mapObj));
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
    function _moveStage (map) {
      return function(coords) {
        let preciseCoords = {
          x: this.x + coords.x,
          y: this.y + coords.y
        };

        this.x = preciseCoords.x;
        this.y = preciseCoords.y;

        this.drawThisChild = true;
        map.drawMap();

        return this;
      };
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

  function _offsetCoords() {
    var scope = {};
    var offsetCoords;

    scope.setOffset = function setOffset(coords) {
      return offsetCoords = coords;
    };
    scope.getOffset = function getOffset() {
      return offsetCoords;
    };

    return scope;
  };
})();