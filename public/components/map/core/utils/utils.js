'use strict';

/**
 * @module Map
 */

/***********************
********* API **********
***********************/
export const mouse = setupMouseUtils();
export const resize = setupResizeUtils();
export const environmentDetection = setupEnvironmentDetection();
export const general = setupGeneral();
/**
 * @class mouse
 * @memberof utils
 * @return {Object}      isRightClick, eventData.getPointerCoords, eventData.getHAMMERPointerCoords, eventMouseCoords
 */
function setupMouseUtils() {
  return {
    isRightClick,
    eventData: {
      getPointerCoords,
      getHAMMERPointerCoords
    },
    eventMouseCoords
  };

  /**
   * Detects if the mouse click has been the right mouse button
   *
   * @param {Event} event The event where the click occured
   */
  function isRightClick( event ) {
    var rightclick;

    event = event ? event : window.event; /* For IE. */
    if ( event.buttons ) {
      rightclick = ( +event.buttons === 2 );
    } else if ( event.which ) {
      rightclick = ( +event.which === 3 );
    } else if ( event.button ) {
      rightclick = ( +event.button === 2 );
    }

    if ( rightclick ) {
      return true;
    }

    return false;
  }
  function getPointerCoords(e) {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
  function getHAMMERPointerCoords(e) {
    return e.center;
  }
  function eventMouseCoords(e) {
    var pos = {
      x:0,
      y:0
    };

    if (!e) {
      e = window.event;
    }
    if (e.pageX || e.pageY)   {
      pos.x = e.pageX;
      pos.y = e.pageY;
    } else if (e.clientX || e.clientY)  {
      pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    // posx and posy contain the mouse position relative to the document
    // Do something with this information
    return pos;
  }
}
/**
 * @class resize
 * @memberof utils
 * @return {Object}      toggleFullScreen, setToFullSize, getWindowSize
 */
function setupResizeUtils() {
  return {
    toggleFullScreen,
    setToFullSize,
    getWindowSize
  };

  function toggleFullScreen() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = ( document.fullScreenElement && document.fullScreenElement !== null ) ||
       (
       document.mozFullScreen || document.webkitIsFullScreen );

    /* jshint expr: true */
    isInFullScreen ? cancelFullScreen( document ) : requestFullScreen( elem );

    return false;

    /*********** PRIVATE ************/
    /* global ActiveXObject */
    function cancelFullScreen( el ) {
      var requestMethod = el.cancelFullScreen ||
         el.webkitCancelFullScreen ||
         el.mozCancelFullScreen ||
         el.exitFullscreen;
      if ( requestMethod ) { // cancel full screen.
        requestMethod.call( el );
      } else if ( typeof window.ActiveXObject !== "undefined" ) { // Older IE.
        var wscript = new ActiveXObject( "WScript.Shell" );
        wscript !== null && wscript.SendKeys( "{F11}" );
      }
    }
    function requestFullScreen( el ) {
      // Supports most browsers and their versions.
      var requestMethod = el.requestFullScreen ||
         el.webkitRequestFullScreen ||
         el.mozRequestFullScreen ||
         el.msRequestFullScreen;

      if ( requestMethod ) { // Native full screen.
        requestMethod.call( el );
      } else if ( typeof window.ActiveXObject !== "undefined" ) { // Older IE.
        var wscript = new ActiveXObject( "WScript.Shell" );
        wscript !== null && wscript.SendKeys( "{F11}" );
      }
      return false;
    }
  }
  /**
   * Sets canvas size to maximum width and height on the browser, not using fullscreen
   *
   * @param {Object} context        DOMElement Canvas context
   */
  function setToFullSize(context) {
    return function fullSize() {
      const size = getWindowSize();

      context.canvas.width = size.x;
      context.canvas.height = size.y;
    };
  }
  function getWindowSize() {
    return {
      x: window.innerWidth,
      y: window.innerHeight
    };
  }
}
/**
 * @class environment
 * @memberof utils
 * @return {Object}      getPixelRatio
 */
function setupEnvironmentDetection() {
  return {
    getPixelRatio//,
    // isMobile,
    // isMobile_detectUserAgent
  };

  /**
   * [getPixelRatio description]
   *
   * @require Canvas element in the DOM. This needs to be found
   * @param  {Object} canvasElement       HTML canvas element
   * @return {Number}
   */
  function getPixelRatio(canvasElement) {
    const DPR = window.devicePixelRatio || 1;
    var ctx = ( canvasElement && canvasElement.getContext("2d") ) || document.createElement('canvas').getContext("2d");
    var bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return DPR / bsr;
  }
}
/**
 * @class general
 * @memberof utils
 * @return {Object}      pixelEpsilonEquality
 */
function setupGeneral() {
  const PIXEL_EPSILON = 0.01;

  /**************************
  *********** API ***********
  **************************/
  return {
    pixelEpsilonEquality: epsilonEquality
  };

  /**************************
  ********* PUBLIC **********
  **************************/
  function epsilonEquality(x, y) {
    return ( Math.abs(x) - Math.abs(y) ) < PIXEL_EPSILON;
  }
}