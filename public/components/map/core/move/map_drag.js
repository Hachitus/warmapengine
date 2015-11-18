/* global console */

'use strict';

/**
 * The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @todo See if this plugin need refactoring and more documentation
 * */

import { eventListeners as eventListenerMod } from '../eventlisteners';
import { mouseUtils } from '../utils/utils';

export var pluginName = "map_drag";

export var map_drag = (function map_drag() {
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* =====================
     MODULE API (in scope)
     ===================== */
  return {
    pluginName: pluginName,
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
  ********* PRIVATE ************
  *****************************/
  /**
   * Starts the whole functionality of this class
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener( map ) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset(mouseUtils.eventData.getPointerCoords(e));
        _addDragListeners();
      } catch (ev) {
        console.log(ev);
      }

      /** @requires map objects to be accessible in scope */
      function _mouseupListener() {
        e.preventDefault();
        _removeDragListeners();
        _mapMoved(map);
      }

      /** @requires map objects to be accessible in scope */
      function _dragListener(e) {
        try {
          var coords = mouseUtils.eventData.getPointerCoords(e);

          e.preventDefault();

          map.mapMoved(true);

          if (e.buttons === 0) {
            _removeDragListeners();
            /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
            _mapMoved(map);
          }

          _mapMovement(e, map, coords);

          /* The mouse has been moved after pressing. This prevent the click
            event to fire at the same time with the mouseDown / dragging event
          */
          //map.mouseMoved( true );
        } catch (ev) {
          console.log(ev);
        }
      }

      function _addDragListeners() {
        map.canvas.addEventListener("mousemove", _dragListener);
        map.canvas.addEventListener("mouseup", _mouseupListener);
      }
      function _removeDragListeners() {
        map.canvas.removeEventListener("mousemove", _dragListener);
        map.canvas.removeEventListener("mouseup", _mouseupListener);
      }
    };
  }

  function _startDragListener_mobile( map ) {
    var initialized = false;

    return function startDrag(e) {
      var coords = mouseUtils.eventData.getHAMMERPointerCoords(e);

      e.preventDefault();

      try {
        if (!initialized) {
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

        _mapMovement(e, map, coords);
      } catch (ev) {
        console.log(ev);
      }
    };
  }

  /**
   * This handles offset Changes and setting data has map been moved based on it. Also
   * sets basic settings like preventDefault etc.
   * @param  {[type]} e      [description]
   * @param  {[type]} map    [description]
   * @param  {[type]} coords [description]
   * @return {[type]}        [description]
   */
  function _mapMovement(e, map, coords) {
    e.preventDefault();
    map.mapMoved(true);

    var offset = offsetCoords.getOffset();
    var moved = {
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
  }
  /**
   * Function for setting and getting the mouse offset.
   */
  function _offsetCoords() {
    var scope = {};
    var offsetCoords;

    scope.setOffset = function setOffset(coords) {
      offsetCoords = coords;

      return offsetCoords;
    };
    scope.getOffset = function getOffset() {
      return offsetCoords;
    };

    return scope;
  }

  /* Without this, the other eventListeners might fire inappropriate events. */
  function _mapMoved(map) {
    window.setTimeout(function (){
      map.mapMoved(false);
    }, 1);
  }
})();