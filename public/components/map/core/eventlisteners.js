/* global Hammer, Hamster */
'use strict';

/*-----------------------
------- VARIABLES -------
-----------------------*/
var stateOfEvents = {};
var singletonScope;

/*-----------------------
---------- API ----------
-----------------------*/
export { eventListenerModule as eventListeners };

/*-----------------------
-------- PUBLIC ---------
-----------------------*/
/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this class. I.e.
 *  {
 *  select: function() {},
 *   zoom: function() {}
 * }
 *
 * @class core.eventListeners
 * @requires Hammer.js (for touch events)
 * @requires Hamster.js (for good cross-browser mousewheel events)
 * @param {HTMLElement} canvasElement           The canvas element we listen events from. Will try to search the first canvas in the DOM, if none is provided
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

  /*---------------------------
  ----------- API -------------
  ---------------------------*/
  singletonScope = {
    states: {},
    setState,
    getState,
    toggleFullSizeListener,
    toggleFullscreen,
    toggleZoomListener,
    toggleDragListener,
    toggleSelectListener
  };

  /**
   * Sets the state of the event. State is so far very important for fluent dragging and selecting. When we start to drag, we avoid selecting units and vice versa, when we keep an event state tracking through this.
   *
   * @method setState
   * @static
   * @param {String} type         Event name we are following
   * @param {Boolean} state       The state we want to set (true or false)
   */
  function setState(type, state) {
    stateOfEvents[type] = state;
  }
  /**
   * Gets the current state of the event
   *
   * @method getState
   * @static
   * @param  {String} type         Event name we are following
   * @return {Boolean}             returns true of false
   */
  function getState(type) {
    return stateOfEvents[type];
  }

  /**
   * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen
   *
   * @method toggleFullSizeListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function toggleFullSizeListener(cb) {
    if ( !singletonScope.states.fullSize ) {
      CBs.fullSize = cb;
      cb();
      window.addEventListener("resize", CBs.fullSize);
    } else {
      window.removeEventListener("resize", CBs.fullSize);
    }

    singletonScope.states.fullSize = !singletonScope.states.fullSize;

    return singletonScope.states.fullSize;
  }
  /**
   * Sets the canvas to fullsize (as in fullSizeListener) and sets the browser in fullscreen mode
   *
   * @method toggleFullscreen
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function toggleFullscreen(cb) {
    singletonScope.states.fullScreen = cb();

    return cb;
  }
  /**
   * Zoom the map. Mousewheel (desktop) and pinch (mobile)
   *
   * @method toggleZoomListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function toggleZoomListener(cb) {
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
  }
  /**
   * DragListener (normally used for moving the map)
   *
   * @method toggleDragListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function toggleDragListener(cb) {
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
  }
  /**
   * Selecting something from the map
   *
   * @method toggleSelectListener
   * @static
   * @param {Function} cb     Callback that fires when this event activates
   * @return {Boolean}        Return the state of this event
   */
  function toggleSelectListener(cb) {
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
  }

  return singletonScope;
}