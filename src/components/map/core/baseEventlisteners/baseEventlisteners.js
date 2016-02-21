(function () {
  /* global Hammer, Hamster */
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/
  var eventListeners = window.flatworld.eventListeners;
  var mapStates = window.flatworld.mapStates;
  var utils = window.flatworld.utils;

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.extensions.baseEventlisteners = baseEventlistenersModule();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Core plugin. Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the
   * eventlistener management.
   *
   * @class baseEventlisteners
   * @requires Hammer.js (for touch events)
   * @requires Hamster.js (for good cross-browser mousewheel events)
   * @param {HTMLElement} canvasElement   The canvas element we listen events from. Will try to search the first canvas in the DOM,
   * if none is provided
   */
  function baseEventlistenersModule() {
    var hammer, hamster, boundResizer, mapInstance;

    /*---------------------------
    ----------- API -------------
    ---------------------------*/
    return {
      init,
      pluginName: "baseEventlisteners"
    };

    function init(map) {
      const orderToggle = toggleOrder();
      const selectToggle = toggleSelect();

      mapInstance = map;
      hammer = new Hammer.Manager(map.canvas);
      hamster = new Hamster(map.canvas);

      eventListeners.setDetector("fullSize", toggleFullSize().on, toggleFullSize().off);
      eventListeners.setDetector("fullscreen", toggleFullscreen().on, toggleFullscreen().off);
      eventListeners.setDetector("zoom", toggleZoom().on, toggleZoom().off);
      eventListeners.setDetector("drag", toggleDrag().on, toggleDrag().off);
      eventListeners.setDetector("select", selectToggle.on, selectToggle.off);
      eventListeners.setDetector("order", orderToggle.on, orderToggle.off);

      map.setPrototype("setFullsize", () => {
        /* We set this only once */
        boundResizer = boundResizer || map._resizeCanvas.bind(map);

        eventListeners.on("fullSize", boundResizer);
      });
      map.setPrototype("setFullScreen", () => {
        eventListeners.on("fullscreen", map._setFullScreen.bind(map));
      });
    }

    /**
     * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen. Note that
     *
     * @method toggleFullSize
     * @private
     * @static
     */
    function toggleFullSize() {
      var activeCB;

      return {
        on: (cb) => {
          activeCB = cb;

          window.addEventListener("resize", activeCB);
        },
        off: () => {
          window.removeEventListener("resize", activeCB);
        }
      };
    }
    /**
     * Sets the browser in fullscreen mode.
     *
     * @method toggleFullscreen
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleFullscreen() {
      var activeCB;

      return {
        on: (cb) => {
          activeCB = cb;

          window.addEventListener("fullscreen", activeCB);
        },
        off: () => {
          window.removeEventListener("fullscreen", activeCB);
        }
      };
    }
    /**
     * Zoom the map. Mousewheel (desktop) and pinch (mobile)
     *
     * @method toggleZoomListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleZoom() {
      var activeCB;

      return {
        on: (cb) => {
          var pinch = new Hammer.Pinch();
          activeCB = cb;

          hammer.add(pinch);
          hammer.on("pinch", activeCB);
          /* Hamster handles wheel events really nicely */
          hamster.wheel(activeCB);
        },
        off: () => {
          hammer.on("pinch", activeCB);
          hamster.unwheel(activeCB);
        }
      };
    }
    /**
     * DragListener (normally used for moving the map)
     *
     * @method toggleDragListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleDrag() {
      var activeCB;

      return {
        on: (cb) => {
          var pan = new Hammer.Pan({
            pointers: 1,
            threshold: 5,
            direction:  Hammer.DIRECTION_ALL });
          activeCB = cb;

          hammer.add(pan);
          hammer.on("pan", activeCB);
        },
        off: () => {
          hammer.off("pan", activeCB);
        }
      };
    }
    /**
     * Selecting something from the map
     *
     * @method toggleSelectListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleSelect() {
      var activeCB;

      return {
        on: (cb) => {
          var tap = new Hammer.Tap();
          activeCB = cb;

          hammer.add(tap);
          hammer.on("tap", activeCB);
        },
        off: () => {
          hammer.off("tap", activeCB);
        }
      };
    }
    /**
     * Selecting something from the map
     *
     * @method toggleSelectListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleOrder() {
      var activeCB;

      return {
        on: (cb) => {
          activeCB = cb;

          if (mapInstance.isSupportedTouch) {
            var tap = new Hammer.Tap();

            hammer.add(tap);
            hammer.on("tap", clickListener);
          } else {
            mapInstance.canvas.addEventListener("contextmenu", clickListener, true);
          }
        },
        off: () => {
          hammer.off("tap", clickListener);
          mapInstance.canvas.removeEventListener("contextmenu", clickListener, true);
        }
      };

      function clickListener(e) {
        /* Prevent right clicks default menu */
        e.preventDefault();

        /* Check that finite state is correct and that if desktop, the user clicked right button */
        if (! mapStates.can("objectOrder") && ( mapInstance.isSupportedTouch || utils.mouse.isRightClick(e))) {
          return false;
        }

        activeCB(e);
      }
    }
  }
})();