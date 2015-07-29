'use strict';

export let map_drag = (function map_move() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = "map_drag";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function(mapObj) {
    mapObj.setListener("mousedown", _startDragListener(mapObj));
  };

  return scope;

  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener( map ) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset({
          x: e.stageX,
          y: e.stageY
        });
        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */

        map.setListener("mousemove", _dragListener(map));
        map.setListener("mousemove", function(e) {
          /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
          if(e.nativeEvent.buttons === 0) {
            map.removeListeners(["mousemove", "mouseup"]);
          }
        });
        map.setListener("mouseup", function() {
          map.removeListeners(["mousemove", "mouseup"]);
        });
      } catch (e) {
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