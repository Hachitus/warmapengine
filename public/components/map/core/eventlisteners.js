/* global Hammer, Hamster */

'use strict';

/**
 * @module Map
 * @submodule core
 */

/***********************
****** VARIABLES *******
***********************/
var stateOfEvents = {};
var singletonScope;

/***********************
********* API **********
***********************/
export { eventListenerModule as eventListeners };

/***********************
******** PUBLIC ********
***********************/
/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this class. I.e.
 *  {
 *  select: function() {},
 *   zoom: function() {}
 * }
 *
 * @class eventListeners
 * @memberOf Map.core
 * @requires Hammer.js (for touch events)
 * @requires Hamster.js (for good cross-browser mousewheel events)
 * @param {Object} canvasElement                The canvas element we listen events from. Will try to search the first canvas in the DOM, if none is provided
 * @param {Boolean} refresh                     If you want to reset the singleton object, set this to true
 */
function eventListenerModule(canvasElement = document.getElementsByTagName("canvas")[0], refresh = false) {
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
   * Sets the state of the event. State is so far very important for fluent dragging and selecting. When we start to drag, we avoid selecting units and vice versa, when we keep an event state tracking through this.
   *
   * @param {String} type         Event name we are following
   * @param {Boolean} state       The state we want to set (true or false)
   */
  singletonScope.setState = function setState(type, state) {
    stateOfEvents[type] = state;
  };
  /**
   * Gets the current state of the event
   *
   * @param  {String} type         Event name we are following
   * @return {Boolean}             returns true of false
   */
  singletonScope.getState = function setState(type) {
    return stateOfEvents[type];
  };

  /**
   * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen
   *
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
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
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  singletonScope.toggleFullscreen = function toggleFullscreen(cb) {
    singletonScope.states.fullScreen = cb();

    return cb;
  };
  /**
   * Zoom the map. Mousewheel (desktop) and pinch (mobile)
   *
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
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

    return singletonScope.states.zoom;
  };
  /**
   * DragListener (normally used for moving the map)
   *
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
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

    return singletonScope.states.drag;
  };
  /**
   * Selecting something from the map
   *
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
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

    return singletonScope.states.select;
  };

  return singletonScope;
}