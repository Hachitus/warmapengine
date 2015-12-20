'use strict';

/**
 * The core plugin for the 2D map engine. Handles moving the map by dragging the map with mouse or touch event.
 * Core plugins can always be overwrote if needed.
 *
 * @require Mobile part requires Hammer.js
 * */

/***********************
******** IMPORT ********
***********************/
import { eventListeners as eventListenerMod } from '../eventlisteners';
import { mouseUtils } from '../utils/utils';

/***********************
********* API **********
***********************/
/* pluginName is always needed as export! */
export var pluginName = "map_drag";
export var map_drag = setupMap_drag();

/***********************
******** PUBLIC ********
***********************/
function setupMap_drag() {
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();
  var eventListenerCB, eventListener;

  /***********************
  ********* API **********
  ***********************/
  return {
    pluginName: pluginName, // More for debugging
    init,
    _startDragListener /* Function revealed for testing */
  };

  /**************************
  ********* PUBLIC **********
  **************************/
  /**
   * Required init functions for the plugin
   * @param {Map object} mapObj - the Map class object
   * */
  function init(map) {
    eventListener = eventListenerMod();
    eventListenerCB = _startDragListener(map);

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    eventListener.toggleDragListener(eventListenerCB);
  }

  /*****************************
  ********** PRIVATE ***********
  *****************************/
  /**
   * Mobile version. Starts the functionality, uses Hammer.js heavily for doing the drag. More simple and better than
   * desktop version, since we don't need to calculate the drag with several event listener, one is enough with Hammer
   * @param {Map Object} map        The current map object
   */
  function _startDragListener( map ) {
    var initialized = false;

    return function startDrag(e) {
      if (eventListener.getState("zoom")) {
        return false;
      }
      var coords = mouseUtils.eventData.getHAMMERPointerCoords(e);

      map.mapMoved(true);

      coords.x = Math.round( coords.x );
      coords.y = Math.round( coords.y );

      if (!initialized) {
        offsetCoords.setOffset({
          x: coords.x,
          y: coords.y
        });
        initialized = true;

        return;
      } else if (e.isFinal === true) {
        initialized = false;
        map.mapMoved(false, true);
      }

      _mapMovement(e, map, coords);
    };
  }

  /**
   * This handles offset Changes and setting data has map been moved based on it. Also
   * sets basic settings like preventDefault etc.
   *
   * @param  {Event} e                        The event being dealt with
   * @param  {Map Object} map                 The map object
   * @param  {x: Number, y: Number} coords    Current pointer coordinates
   * @return {[type]}                         Nothing
   */
  function _mapMovement(e, map, coords) {
    var offset, moved;

    offset = offsetCoords.getOffset();
    moved = {
      x: coords.x - offset.x,
      y: coords.y - offset.y
    };

    if (moved.x > 0 || moved.y > 0 || moved.x < 0 || moved.y < 0) {
      map.moveMap(moved);
    } else {
      map.mapMoved(false);
    }

    offsetCoords.setOffset({
      x: coords.x,
      y: coords.y
    });

    e.preventDefault();
  }
  /**
   * Function for setting and getting the mouse offset.
   * Offset is the distance from the left upper coordinates (global 0, 0 coordinates) on the canvas, to the current /
   * last known mouse coordinates
   */
  function _offsetCoords() {
    var offsetCoords;

    /****** API ******/
    return {
      setOffset,
      getOffset
    };

    function setOffset(coords) {
      offsetCoords = coords;

      return offsetCoords;
    }
    function getOffset() {
      return offsetCoords;
    }
  }
}