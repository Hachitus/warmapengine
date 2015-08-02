'user strict';

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** ===== OWN imports ===== */
import { mouseUtils } from "../utils/utils.js";
import { eventListeners } from '../eventlisteners';

export let map_zoom = (function map_zoom() {
  var scope = {};
  /* Maximum and minimum the player can zoomt he map */
  var zoomLimit = {
    farther: 0.4,
    closer : 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;
  var eventlisteners;
  scope.pluginName = map_zoom.name;

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function(map) {
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);

    map.eventCBs.zoom = _setupZoomEvent(map);

    eventlisteners = eventListeners(map.eventCBs);
    eventlisteners.toggleZoomListener();
  };

  return scope;

  /* ==== PROTOTYPE extensions for map */
  /** How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms */
  function setZoomModifier (amount) {
    zoomModifier = amount;

    return this;
  }
  /** How much can be zoomed in maximum and minimum
   * @param {Number 1+} farther How much one mouse wheel step zooms out
   * @param {Number 0 - 1} closer How much one mouse wheel step zooms in */
  function setZoomLimits (farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  /** Zoom in to the map
   * @param {Number} amount how much map is zoomed in */
  function zoomIn (amount) {
    if(_isOverZoomLimit( amount ) )

    this.getLayersWithAttributes("zoomable", true).forEach(layer => {
      layer.scaleX -= zoomModifier;
      layer.scaleY -= zoomModifier;
    });

    return this;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
  function zoomOut (amount) {
    if(_isOverZoomLimit( amount ) )

    this.getLayersWithAttributes("zoomable", true).forEach(layer => {
      layer.scaleX += zoomModifier;
      layer.scaleY += zoomModifier;
    });

    return this;
  }

  /* ===== Private functions ===== */
  function _isOverZoomLimit(amount) {
    if(amount > zoomLimit.farther && amount < zoomLimit.closer) {
      return false;
    }

    return true;
  }
  function _setupZoomEvent(map) {
    return function handleZoomEvent(event) {
      var mouseWheelDelta = mouseUtils.deltaFromWheel(event);

      if(mouseWheelDelta > 0) {
        map.zoomIn();
      } else if(mouseWheelDelta < 0) {
        map.zoomOut();
      }

      map.drawOnNextTick();
    };
  }
})();