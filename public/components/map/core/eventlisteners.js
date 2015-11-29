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
export let eventListeners = function eventListenerModule(canvasElement = document.getElementsByTagName("canvas")[0], refresh = false) {
  var CBs = {};
  var hammer, hamster;

  if (refresh) {
    singletonScope = undefined;
  }

  if (singletonScope) {
    return singletonScope;
  }

  if (!canvasElement) {
    throw new Error("eventlisteners initialization require map callbacks and canvas element as arguments");
  }

  hammer = new Hammer.Manager(canvasElement);
  hamster = new Hamster(canvasElement);
  /********** Required **********/

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
    CBs.zoom = cb;

    if (singletonScope.states.zoom !== true) {
      var pinch = new Hammer.Pinch();
      hammer.add(pinch);
      hammer.on("pinch", CBs.zoom);
      /* Hamster handles wheel events really nicely */
      hamster.wheel(CBs.zoom);
    } else {
      hammer.on("pinch", CBs.zoom);
      hamster.unwheel(CBs.zoom);
    }

    singletonScope.states.zoom = !singletonScope.states.zoom;

    return CBs.zoom;
  };
  /**
   * DragListener (normally used for moving the map)
   * @param {Function} cb     Callback function that handles the event for dragging the map.
   *
   * @return {Function}       Return the used function
   */
  singletonScope.toggleDragListener = function toggleDragListener(cb) {
    var pan;

    CBs.drag = cb;

    if (singletonScope.states.drag !== true) {
      pan = new Hammer.Pan({
        pointers: 1,
        threshold: 5,
        direction:  Hammer.DIRECTION_ALL });
      hammer.add(pan);
      hammer.on("pan", CBs.drag);
    } else {
      hammer.off("pan", CBs.drag);
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
    CBs.select = cb;

    if (singletonScope.states.select !== true) {
      var tap = new Hammer.Tap();
      hammer.add(tap);
      hammer.on("tap", CBs.select);
    } else {
      hammer.off("tap", CBs.select);
    }

    singletonScope.states.select = !singletonScope.states.select;

    return CBs.select;
  };

  return singletonScope;
};