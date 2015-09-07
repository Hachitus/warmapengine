'user strict';

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** @todo Change the map move after zooming to be mouse based or such. Now it is based on the map corners coordinates */

/** ===== OWN imports ===== */
import { resizeUtils } from "../utils/utils.js";
import { eventListeners as eventListenerMod } from '../eventlisteners';

export let map_zoom = (function map_zoom() {
  /* Maximum and minimum the player can zoomt he map */
  var zoomLimit = {
    farther: 0.4,
    closer : 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;

  /* =====================
     MODULE API (in scope)
     ===================== */
  var scope = {};
  scope.pluginName = "map_zoom";

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function(map) {
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    /* @todo think through should these be in map.prototype? But zoomLimit and modifier need to be setable in creation,
    init or later with setters */
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);

    if(map.getEnvironment() === "mobile") {
      map.eventCBs.zoom = _setupZoomEvent_mobile(map);
    } else {
      map.eventCBs.zoom = _setupZoomEvent(map);
    }

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    eventListenerMod().toggleZoomListener();
  };

  /* ======================================
     private functions revealed for testing
     ======================================*/
  //scope._setupZoomEvent = _setupZoomEvent;

  return scope;

  /* ============================
     PROTOTYPE extensions for map
     ============================*/
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
  function zoomIn (amount) {
    var newScale;
    var zoomLayer = this.getZoomLayer();

    if( !_isOverZoomLimit(this.getScale(), true) ) {
      newScale = zoomLayer.scale.y = zoomLayer.scale.x += ( amount || zoomModifier );
    }

    return newScale;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
  function zoomOut (amount) {
    var newScale;
    var zoomLayer = this.getZoomLayer();

    if( !_isOverZoomLimit(this.getScale()) ) {
      newScale = zoomLayer.scale.y = zoomLayer.scale.x -= ( amount || zoomModifier );
    }

    return newScale;
  }

  /* ============
     Initializers
     ============ */
  function _setupZoomEvent(map) {
    return function handleZoomEvent(e, delta, deltaX, deltaY) {
      var mouseWheelDelta = deltaY;
      /* We use old scale, since the scale really changes when the map is drawn. So we must make calculations with the
      old scale now */
      var oldScale = map.getScale();

      /* No nasty scrolling side-effects */
      e.preventDefault();

      if(mouseWheelDelta > 0) {
        if(map.zoomIn()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale, true));
        }
      } else if(mouseWheelDelta < 0) {
        if(map.zoomOut()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale));
        }
      }

      // no need when we use map.move:
      //map.drawOnNextTick();
    };
  }

  function _setupZoomEvent_mobile(map) {
    zoomModifier = zoomModifier * 0.5;
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
          if(map.zoomIn(undefined)) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getScale(), true));
          }
        } else {
          if(map.zoomOut(undefined)) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getScale()));
          }
        }

        // no need when we use map.move:
        //map.drawOnNextTick();

        difference = {
          x: changeX,
          y: changeY
        };

      } catch (e) {
        console.log("Error! ", e);
      }
    };
  }

  /* =================
     Private functions
     ================= */
  function _isOverZoomLimit(amount, isZoomIn) {
    if( (isZoomIn && amount > zoomLimit.closer ) || (!isZoomIn && amount < zoomLimit.farther) ) {
      return true;
    }

    return false;
  }
  function _calculateCenterMoveCoordinates(scale, isZoomIn) {
    var windowSize = resizeUtils.getWindowSize();
    var halfWindowSize = {
      x: ( windowSize.x / 2 ) / scale,
      y: ( windowSize.y / 2 ) / scale
    };
    var realMovement = {
      x: ( halfWindowSize.x ) * ( ( isZoomIn ? -zoomModifier : zoomModifier) ),
      y: ( halfWindowSize.y ) * ( ( isZoomIn ? -zoomModifier : zoomModifier) )
    };

    return realMovement;
  }
})();