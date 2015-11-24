/* global Hammer, Hamster */

'use strict';

/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 *
 * @require Hammer.js for touch events (mobile)
 * @require Hamster.js for good cross-browser (desktop) mousewheel events
 */

var singletonScope;

/* ===== EXPORT ===== */
/**
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this
 * class. I.e.
 *  {
 *  select: function() {},
 *   zoom: function() {}
 * }
 */
export let eventListeners = function eventListenerModule(canvasElement = document.getElementsByTagName("canvas")[0]) {
  var CBs = {};
  var hammer;

  if (singletonScope) {
    return singletonScope;
  }
  /********** Required **********/
  if (!canvasElement) {
    throw new Error("eventlisteners initialization require map callbacks and canvas element as arguments");
  }

  if (isMobileSite()) {
    hammer = new Hammer.Manager(canvasElement);
  }

  singletonScope = {
    states: {}
  };

  /**
   * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleFullSizeListener = function toggleFullSizeListener(cb) {
    if ( !singletonScope.states.fullSize ) {
      CBs.fullSize = cb;
      cb();
      window.addEventListener("resize", CBs.fullSize);
    } else {
      window.removeEventListener("resize", CBs.fullSize);
    }

    singletonScope.states.fullSize = !singletonScope.states.fullSize;

    return singletonScope.states.fullSize;
  };
  /**
   * Sets the canvas to fullsize (as in fullSizeListener) and sets the browser in fullscreen mode
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleFullscreen = function toggleFullscreen(cb) {
    singletonScope.states.fullScreen = cb();

    return cb;
  };
  /**
   * Zoom the map. Mousewheel (desktop) and pinch (mobile)
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleZoomListener = function toggleZoomListener(cb) {
    if (singletonScope.states.zoom !== true) {
      CBs.zoom = cb;

      if (isMobileSite()) {
        hammer = new Hammer.Manager(canvasElement);
        var pinch = new Hammer.Pinch();
        hammer.add(pinch);
        hammer.on("pinch", CBs.zoom);
      } else {
        /* Hamster handles wheel events really nicely */
        Hamster(canvasElement).wheel(CBs.zoom);
      }
    } else {
      if (isMobileSite()) {
        hammer.on("pinch", CBs.zoom);
      } else {
        Hamster(canvasElement).unwheel(CBs.zoom);
      }
    }

    singletonScope.states.zoom = !singletonScope.states.zoom;

    return CBs.zoom;
  };
  /**
   * DragListener (normally used for moving the map)
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleDragListener = function toggleDragListener(cb) {
    if (singletonScope.states.drag !== true) {
      CBs.drag = cb;

      if (isMobileSite()) {
        hammer = new Hammer.Manager(canvasElement);
        var pan = new Hammer.Pan({
          pointers: 1,
          threshold: 5,
          direction:  Hammer.DIRECTION_ALL });
        hammer.add(pan);
        hammer.on("pan", CBs.drag);
      } else {
        canvasElement.addEventListener("mousedown", CBs.drag);
      }
    } else {
      CBs.drag = cb;
      if (isMobileSite()) {
        hammer.off("pan", CBs.drag);
      } else {
        canvasElement.removeEventListener("mousedown", CBs.drag);
      }
    }

    singletonScope.states.drag = !singletonScope.states.drag;

    return CBs.drag;
  };
  /**
   * Selecting something from the map
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleSelectListener = function toggleSelectListener(cb) {
    if (singletonScope.states.select !== true) {
      CBs.select = cb;

      if (isMobileSite()) {
        hammer = new Hammer.Manager(canvasElement);
        var tap = new Hammer.Tap();
        hammer.add(tap);
        hammer.on("tap", CBs.select);
      } else {
        canvasElement.addEventListener("mousedown", CBs.select);
      }
    } else {
      if (isMobileSite()) {
        hammer.off("tap", CBs.select);
      } else {
        canvasElement.removeEventListener("mousedown", CBs.select);
        CBs.select = undefined;
      }
    }

    singletonScope.states.select = !singletonScope.states.select;

    return CBs.select;
  };

  return singletonScope;
};

function isMobileSite() {
  return typeof Hammer !== 'undefined';
}