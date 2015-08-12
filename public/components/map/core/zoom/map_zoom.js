'user strict';

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** @todo Change the map move after zooming to be mouse based or such. Now it is based on the map corners coordinates */

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
  var eventlisteners, lastZoom;
  scope.pluginName = map_zoom.name;

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function(map) {
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);
    map.setPrototype("getZoomableLayers", getZoomableLayers);

    if(map.mapEnvironment() === "mobile") {
      map.eventCBs.zoom = _setupZoomEvent_mobile(map);
    } else {
      map.eventCBs.zoom = _setupZoomEvent(map);
    }

    eventlisteners = eventListeners(map.eventCBs);
    eventlisteners.toggleZoomListener();
  };

  return scope;

  /* ==== PROTOTYPE extensions for map */
  /** How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms. Needs to be in between 0 - 0.5 */
  function setZoomModifier (amount) {
    if(! (amount > 0 || amount <= 0.5) ) {
      throw new Error("Wrong zoom modifier! (needs to be >0 and <=0.5, given:" + amount);
    }
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
  function zoomIn (amount, divider = 1) {
    lastZoom = "in";
    var newScale;

    this.getZoomableLayers().forEach(layer => {
      if( _isOverZoomLimit(layer.scaleX, true) ) {
        return;
      }
      newScale = layer.scaleY = layer.scaleX += ( amount || zoomModifier ) * divider;
    });

    return newScale;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
  function zoomOut (amount, divider = 1) {
    lastZoom = "out";
    var newScale;

    this.getZoomableLayers().forEach(layer => {
      if( _isOverZoomLimit(layer.scaleX) ) {
        return;
      }
      newScale = layer.scaleY = layer.scaleX -= ( amount || zoomModifier ) * divider;
    });

    return newScale;
  }
  function getZoomableLayers() {
    return this.getZoomLayers();
  }

  /* ===== Initializers ===== */
  function _setupZoomEvent(map) {
    return function handleZoomEvent(e) {
      var mouseWheelDelta = mouseUtils.deltaFromWheel(e);

      if(mouseWheelDelta > 0) {
        map.zoomIn();
      } else if(mouseWheelDelta < 0) {
        map.zoomOut();
      }

      /* let newCoords = _getMoveCoordsForMapCorner(map);
      map.moveMap(newCoords); */

      map.drawOnNextTick();
    };
  }

  function _setupZoomEvent_mobile(map) {
    var initialized = false;
    var difference = {};

    return function handleZoomEvent_mobile(e) {
      var pointers = e.pointers;
      var coords = [{
          x: pointers[0].pageX,
          y: pointers[0].pageY
        },{
          x: pointers[1].pageX,
          y: pointers[1].pageY
      }];
      var changeX = Math.abs( coords[0].x - coords[1].x );
      var changeY = Math.abs( coords[0].y - coords[1].y );

      e.preventDefault();

      try {
        if(!initialized) {
          difference = {
            x: changeX,
            y: changeY
          };
          initialized = true;

          return;
        } else if (e.isFinal === true) {
          alert("STOP");
          initialized = false;
        }

        if(difference.x + difference.y < changeX + changeY) {
          map.zoomIn(undefined, 0.5);
        } else {
          map.zoomOut(undefined, 0.5);
        }

        /*
        let newCoords = _getMoveCoordsForMapCorner(map);
        map.moveMap(newCoords);
        */

        map.drawOnNextTick();

        difference = {
          x: changeX,
          y: changeY
        };

      } catch (e) {
        console.log("Error! ", e);
      }
    };
  }

  /* ===== Private functions ===== */
  function _isOverZoomLimit(amount, isZoomIn) {
    if( (isZoomIn && amount < zoomLimit.farther ) || (!isZoomIn && amount > zoomLimit.closer) ) {
      return true;
    }

    return false;
  }
  function _getMoveCoordsForMapCorner(map) {
  }
})();