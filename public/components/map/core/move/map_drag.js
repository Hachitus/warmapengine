'use strict';

/** The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @todo See if this plugin need refactoring and more documentation */

import { eventListeners as eventListenerMod } from '../eventlisteners';
import { mouseUtils } from '../utils/utils';

export let map_drag = (function map_drag() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();
  var eventlisteners;

  scope.pluginName = "map_drag";

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function(map) {
    /* Singleton should have been instantiated before, we only retrieve it with 0 params! */
    eventlisteners = eventListenerMod();

    if(map.mapEnvironment() === "mobile") {
      map.eventCBs.drag = _startDragListener_mobile(map);
    } else {
      map.eventCBs.drag = _startDragListener(map);
    }

    eventlisteners.toggleDragListener();
  };

  /* ======================================
   private functions revealed for testing
   ======================================*/
  scope._startDragListener = _startDragListener;

  return scope;

  /** Starts the whole functionality of this class
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener( map ) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset(mouseUtils.getEventCoordsOnPage(e));

        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */
        var moveCallback1 = _dragListener(map);
        var mouseupCallback = _setupMouseupListener(map);
        map.canvas.addEventListener("mousemove", moveCallback1);
        map.canvas.addEventListener("mouseup", mouseupCallback);
      } catch (e) {
        console.log(e);
      }

      function _setupMouseupListener(map) {
        return function(e) {
          e.preventDefault();

          map.canvas.removeEventListener("mousemove", moveCallback1);
          map.canvas.removeEventListener("mouseup", mouseupCallback);
          _mapMoved(map);
        };
      }
      /* Event listeners are in their separate file; eventListeners.js */
      function _dragListener(map) {
        try {
          return function dragger(e) {
            var eventCoords = mouseUtils.getEventCoordsOnPage(e);

            e.preventDefault();

            map.mapMoved(true);

            if(e.buttons === 0) {
              map.canvas.removeEventListener("mousemove", moveCallback1);
              map.canvas.removeEventListener("mouseup", mouseupCallback);
              /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
              _mapMoved(map);
            }

            var offset = offsetCoords.getOffset();
            var moved = {
              x: eventCoords.x - offset.x,
              y: eventCoords.y - offset.y
            };

            if(moved.x > 0 || moved.y > 0 || moved.x < 0 || moved.y < 0) {
              map.moveMap(moved);
            } else {
              map.mapMoved(false);
            }

            offsetCoords.setOffset({
              x: eventCoords.x,
              y: eventCoords.y
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
    };
  }

  function _startDragListener_mobile( map ) {
    var initialized = false;

    return function startDrag(e) {
      var coords = e.center;

      e.preventDefault();

      try {
        if(!initialized) {
          offsetCoords.setOffset({
            x: coords.x,
            y: coords.y
          });
          initialized = true;
          map.mapMoved(true);

          return;
        } else if (e.isFinal === true) {
          initialized = false;
          map.mapMoved(false);
        }

        map.mapMoved(true);

        let offset = offsetCoords.getOffset();
        let moved = {
            x: coords.x - offset.x,
            y: coords.y - offset.y
          };

        if(moved.x !== 0 || moved.y !== 0) {
          map.moveMap(moved);
        }

        offsetCoords.setOffset({
          x: coords.x,
          y: coords.y
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

  /* ====== Private functions ====== */
  /** Function for setting and getting the mouse offset. */
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

/* Without this, the other eventListeners might fire inappropriate events. */
function _mapMoved(map) {
  window.setTimeout(function (){
    map.mapMoved(false);
  }, 1);
}