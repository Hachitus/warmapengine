/* global Hammer, Hamster */
'use strict';

/*-----------------------
--------- IMPORT --------
-----------------------*/
import 'hammer';
import { eventListeners } from 'bundles/coreBundle';

/*-----------------------
---------- API ----------
-----------------------*/
export const baseEventlisteners = baseEventlistenersModule();

/*-----------------------
-------- PUBLIC ---------
-----------------------*/
/**
 * Core plugin. Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the eventlistener management.
 *
 * @class baseEventlisteners
 * @requires Hammer.js (for touch events)
 * @requires Hamster.js (for good cross-browser mousewheel events)
 * @param {HTMLElement} canvasElement   The canvas element we listen events from. Will try to search the first canvas in the DOM, if none is provided
 */
function baseEventlistenersModule() {
  var CBs = {};
  var hammer, hamster, fullSize, fullscreen, zoom, drag, select, boundResizer;

  /*---------------------------
  ----------- API -------------
  ---------------------------*/
  return {
    init,
    pluginName: "baseEventlisteners"
  };

  function init(map) {
    hammer = new Hammer.Manager(map.canvas);
    hamster = new Hamster(map.canvas);

    eventListeners.setDetector("fullSize", fullSize().on, fullSize().off);
    eventListeners.setDetector("fullscreen", fullscreen().on, fullscreen().off);
    eventListeners.setDetector("zoom", zoom().on, zoom().off);
    eventListeners.setDetector("drag", drag().on, drag().off);
    eventListeners.setDetector("select", select().on, select().off);

    map.setPrototype("setFullsize", () => {
      /* We set this only once */
      boundResizer = boundResizer || map._resizeCanvas.bind(map);

      eventListeners.on("fullSize", boundResizer);
    })
    map.setPrototype("setFullScreen", () => {
      eventListeners.on("fullscreen", map._setFullScreen.bind(map));
    })
  }

  /**
   * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen. Note that
   *
   * @method fullSizeListener
   * @private
   * @static
   */
  function fullSize() {
    return {
      on: (cb) => {
        window.addEventListener("resize", cb);
      },
      off: (cb) => {
        window.removeEventListener("resize", cb);
      }
    }
  }
  /**
   * Sets the browser in fullscreen mode.
   *
   * @method toggleFullscreen
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function fullscreen() {
    return {
      on: (cb) => {
        window.addEventListener("fullscreen", cb);
      },
      off: (cb) => {
        window.removeEventListener("fullscreen", cb);
      }
    }
  };
  /**
   * Zoom the map. Mousewheel (desktop) and pinch (mobile)
   *
   * @method toggleZoomListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function zoom() {
    return {
      on: (cb) => {
        var pinch = new Hammer.Pinch();

        hammer.add(pinch);
        hammer.on("pinch", cb);
        /* Hamster handles wheel events really nicely */
        hamster.wheel(cb);
      },
      off: (cb) => {
        hammer.on("pinch", cb);
        hamster.unwheel(cb);
      }
    }
  };
  /**
   * DragListener (normally used for moving the map)
   *
   * @method toggleDragListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function drag() {
    return {
      on: (cb) => {
        var pan = new Hammer.Pan({
          pointers: 1,
          threshold: 5,
          direction:  Hammer.DIRECTION_ALL });
        hammer.add(pan);
        hammer.on("pan", cb);
      },
      off: (cb) => {
        hammer.off("pan", cb);
      }
    }
  };
  /**
   * Selecting something from the map
   *
   * @method toggleSelectListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function select() {
    return {
      on: (cb) => {
        var tap = new Hammer.Tap();
        hammer.add(tap);
        hammer.on("tap", cb);
      },
      off: (cb) => {
        hammer.off("tap", cb);
      }
    };
  }
}