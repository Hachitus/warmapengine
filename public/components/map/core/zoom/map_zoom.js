'use strict';

/**
 * The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed.
 * Zooming happens when the user scrolls the mousewheel or in mobile, pinches the screen
 */

/** ===== OWN imports ===== */
import { eventListeners as eventListenerMod, utils, mapEvents } from '/components/bundles/coreBundle';

/***********************
********* API **********
***********************/
export const pluginName = "map_zoom";
export var map_zoom = setupMap_zoom();

/***********************
******** PUBLIC ********
***********************/
function setupMap_zoom() {
  /***********************
  ****** VARIABLES *******
  ***********************/
  const TIMEOUT_AFTER_ZOOM = 40;
  var initialized = false;
  var mobileInitialized = false;
  var difference = {};
  var map, eventListener;
  /**
   * Maximum and minimum amount, the player can zoom the map
   * @type { farther: Number, closer: Number }
   */
  var zoomLimit = {
    farther: 0.4,
    closer : 2.5
  };
  /**
   * How much one step of zooming affects
   * @type {Number}
   */
  var zoomModifier = 0.1;

  /************************
  ********** API **********
  ************************/
  return {
    init
  };

  /************************
  ********* PUBLIC ********
  ************************/
  /**
   * Required init functions for the plugin
   * @param {Map object} mapObj - the Map class object
   *
   * @todo think through should setZoomLimits and setZoomModifier be in map.prototype?
   * But zoomLimit and modifier need to be setable in creation, init or later with setters
   * */
  function init(thisMap) {
    eventListener = eventListenerMod();
    map = thisMap;
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    eventListener.toggleZoomListener(unifiedEventCB);
  }

  /****************************************
  ***** PROTOTYPE extensions for map ******
  ****************************************/
  /**
   * How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms. Needs to be in between 0 - 0.5
   * */
  function setZoomModifier (amount) {
    if (! (amount > 0 || amount <= 0.5) ) {
      throw new Error("Wrong zoom modifier! (needs to be >0 and <=0.5, given:" + amount);
    }
    zoomModifier = amount;

    return this;
  }
  /**
   * How much can be zoomed in maximum and minimum
   * @param {Number 1+} farther How much one mouse wheel step zooms out
   * @param {Number 0 - 1} closer How much one mouse wheel step zooms in
   * */
  function setZoomLimits (farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  /**
   * Zoom in to the map
   * @param {Number} amount how much map is zoomed in
   * */
  function zoomIn (amount) {
    var presentScale = this.getScale();
    const IS_ZOOM_IN = true;

    mapEvents.publish("mapZoomed", { presentScale: presentScale, amount: amount, isZoomIn: IS_ZOOM_IN } );

    return _zoom(this, presentScale, Math.abs(amount) || zoomModifier, IS_ZOOM_IN);
  }
  /**
   * Zoom out of the map
   * @param {Number} amount how much map is zoomed out
   * */
  function zoomOut (amount) {
    var presentScale = this.getScale();
    const IS_ZOOM_IN = false;

    amount = amount < 0 ? amount : -amount;
    mapEvents.publish("mapZoomed", { presentScale: presentScale, amount: amount, isZoomIn: IS_ZOOM_IN } );

    return _zoom(this, presentScale, amount || -zoomModifier, IS_ZOOM_IN);
  }

  /**********************************
  ********* Event functions *********
  **********************************/
  /**
   * This starts the correct eventListener for the current environment. Mousewheel and pinch differ quite dramatically
   * so we keep them as separate functions.
   *
   * @param  {Event} e             Event object
   * @param  {Integer} delta       Hamster.js provided delta
   * @param  {Integer} deltaX      Hamster.js provided delta
   * @param  {Integer} deltaY      Hamster.js provided delta
   */
  function unifiedEventCB(e, delta, deltaX, deltaY) {
    if (delta) {
      handleZoomEventDesktop(e, delta, deltaX, deltaY);
    } else if (e.pointers) {
      if (!mobileInitialized) {
        mobileInitialized = true;
        setZoomModifier(zoomModifier * 0.5);
      }
      handleZoomEventMobile(e);
    }
  }
  /**
   * Setup desktop zoomEvent by currying. Internally: Sets up correct scale + moves map accordingly to zoom to the
   * current center coordinates
   *
   * @param  {Map} map             Map instance
   */
  function handleZoomEventDesktop(e, delta, deltaX, deltaY) {
    var mouseWheelDelta = deltaY;
    /* Scale changes when the map is drawn. We make calculations with the old scale before draw */
    var oldScale = map.getScale();

    /* No nasty scrolling side-effects */
    e.preventDefault();

    if (mouseWheelDelta > 0) {
      if (map.zoomIn()) {
        map.moveMap(_calculateCenterMoveCoordinates(oldScale, true), _calculateCenterMoveCoordinates(map.getScale(), true));
      }
    } else if (mouseWheelDelta < 0) {
      if (map.zoomOut()) {
        map.moveMap(_calculateCenterMoveCoordinates(oldScale), _calculateCenterMoveCoordinates(map.getScale()));
      }
    }
  }
  function handleZoomEventMobile(e) {
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
      if (!initialized) {
        difference = {
          x: changeX,
          y: changeY
        };
        eventListener.setState("zoom", true);
        initialized = true;

        return;
      } else if (e.eventType === 4 || e.eventType === 8) { /* e.eventType 4 = event canceled, e.eventType 8 = event finished */
        /* We don't want another event to be fired right after a pinch event. It makes the zoomign experience rather
         * bad if after zoom there is immediately an unexplainable drag and the map moves a bit
         * */
        window.setTimeout(function () {
          eventListener.setState("zoom", false);
        }, TIMEOUT_AFTER_ZOOM);
        initialized = false;
      }

      if (difference.x + difference.y < changeX + changeY) {
        if (map.zoomIn()) {
          map.moveMap(_calculateCenterMoveCoordinates(map.getScale(), true));
        }
      } else {
        if (map.zoomOut()) {
          map.moveMap(_calculateCenterMoveCoordinates(map.getScale()));
        }
      }

      difference = {
        x: changeX,
        y: changeY
      };

    } catch (ev) {
      console.log("Error! ", ev);
    }
  }

  /* =================
     Private functions
     ================= */
  function _isOverZoomLimit(amount, isZoomIn) {
    if ( (isZoomIn && amount > zoomLimit.closer ) || (!isZoomIn && amount < zoomLimit.farther) ) {
      return true;
    }

    return false;
  }
  function _calculateCenterMoveCoordinates(scale, isZoomIn) {
    var windowSize = utils.resize.getWindowSize();
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
  function _zoom(map, presentScale, amount, isZoomIn) {
    var newScale;

    if ( !_isOverZoomLimit(presentScale, isZoomIn) ) {
      newScale = map.setScale( amount ? presentScale + amount : presentScale + zoomModifier );
    }

    return newScale;
  }
}