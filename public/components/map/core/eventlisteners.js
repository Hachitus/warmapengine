'use strict';

/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently. */

var singletonScope;

/* ===== EXPORT ===== */
/**
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this
 * class. I.e.
 {
   select: function() {},
   zoom: function() {}
 }*/
export let eventListeners = function eventListenerModule(mapCBs) {
  if(singletonScope) {
    return singletonScope;
  }

  singletonScope = {
    states: {}
  };

  singletonScope.toggleFullSizeListener = function toggleFullSizeListener() {
    if(singletonScope.states.fullSize !== true) {
      window.addEventListener("resize", mapCBs.fullSizeCB);
      singletonScope.states.fullSize = true;
    } else {
      window.removeEventListener("resize", mapCBs.fullSizeCB);
      singletonScope.states.fullSize = false;
    }

    return mapCBs.fullSize;
  };
  singletonScope.toggleFullscreen = function toggleFullscreen() {
    return mapCBs.fullscreen;
  };
  singletonScope.toggleZoomListener = function toggleZoomListener() {
    if(singletonScope.states.zoom !== true) {
      window.addEventListener("mousewheel", mapCBs.zoom);
      singletonScope.states.zoom = true;
    } else {
      window.removeEventListener("mousewheel", mapCBs.zoom);
      singletonScope.states.zoom = false;
    }

    return mapCBs.zoom;
  };
  singletonScope.toggleDragListener = function toggleDragListener() {
    if(singletonScope.states.drag !== true) {
      window.addEventListener("mousedown", mapCBs.drag);
      singletonScope.states.drag = true;
    } else {
      window.removeEventListener("mousedown", mapCBs.drag);
      singletonScope.states.drag = false;
    }

    return mapCBs.drag;
  };
  singletonScope.toggleSelectListener = function toggleSelectListener() {
    if(singletonScope.states.select !== true) {
      window.addEventListener("mousedown", mapCBs.select);
      singletonScope.states.select = true;
    } else {
      window.removeEventListener("mousedown", mapCBs.select);
      singletonScope.states.select = false;
    }

    return mapCBs.select;
  };

  return singletonScope;
};