'use strict';

/**
 * The core plugin for the 2D map engine. Handles moving the map by dragging the map with mouse or touch event.
 * Core plugins can always be overwrote if needed.
 *
 * @require Mobile part requires Hammer.js
 * */

import { eventListeners as eventListenerMod } from '../eventlisteners';
import { mouseUtils } from '../utils/utils';

/* pluginName is always needed as export! */
export var pluginName = "map_drag";

export var map_drag = (function map_drag() {
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

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
    if (map.getEnvironment() === "mobile") {
      map.eventCBs.drag = _startDragListener_mobile(map);
    } else {
      map.eventCBs.drag = _startDragListener(map);
    }

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    eventListenerMod().toggleDragListener();
  }

  /*****************************
  ********** PRIVATE ***********
  *****************************/
  /**
   * Desktop version. Starts the functionality, by activating from mouse click and then starting up proper listeners
   * for mouseup (when the drag ends) and mousemove (when the actual drag happens).
   * @param {Map Object} map        The current map object
   */
  function _startDragListener( map ) {
    return function startDrag(e) {
      e.preventDefault();

      offsetCoords.setOffset(mouseUtils.eventData.getPointerCoords(e));
      _addDragListeners();

      function _addDragListeners() {
        map.canvas.addEventListener("mousemove", _dragListener);
        map.canvas.addEventListener("mouseup", _mouseupListener);
      }
      function _removeDragListeners() {
        map.canvas.removeEventListener("mousemove", _dragListener);
        map.canvas.removeEventListener("mouseup", _mouseupListener);
      }

      /** @requires map objects to be accessible in scope */
      function _mouseupListener() {
        e.preventDefault();
        _removeDragListeners();
        _mapMoved(map);
      }

      /** @requires map objects to be accessible in scope */
      function _dragListener(e) {
        var coords = mouseUtils.eventData.getPointerCoords(e);

        map.mapMoved(true);

        _mapMovement(e, map, coords);

        if (e.buttons === 0) {
          _removeDragListeners();
          /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
          _mapMoved(map);
        }
      }
    };
  }
  /**
   * Mobile version. Starts the functionality, uses Hammer.js heavily for doing the drag. More simple and better than
   * desktop version, since we don't need to calculate the drag with several event listener, one is enough with Hammer
   * @param {Map Object} map        The current map object
   */
  function _startDragListener_mobile( map ) {
    var initialized = false;

    return function startDrag(e) {
      var coords = mouseUtils.eventData.getHAMMERPointerCoords(e);

      if (!initialized) {
        offsetCoords.setOffset({
          x: coords.x,
          y: coords.y
        });
        initialized = true;

        return;
      } else if (e.isFinal === true) {
        initialized = false;
      }

      _mapMovement(e, map, coords);
    };
  }

  /**
   * This handles offset Changes and setting data has map been moved based on it. Also
   * sets basic settings like preventDefault etc.
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

  /**
   * Without this, the other eventListeners might fire inappropriate events. This basically to ensure that the mapMoved
   * parameter get set to false after the other synchronous actions have passed. Otherwise it is possible that
   * @param  {Map Object} map
   */
  function _mapMoved(map) {
    window.setTimeout(function (){
      map.mapMoved(false);
    }, 1);
  }
})();