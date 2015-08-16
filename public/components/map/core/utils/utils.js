'use strict';

/** The core utils for the 2D map engine. */

export var mouseUtils = ( function mouseUtils() {
  var scope = {};

  /** This function is from: http://www.adomas.org/javascript-mouse-wheel/, but modified for todays browsers
    It detects which way the mousewheel has been moved.
    zero delta = mouse wheel not moved
    positive delta = scrolled up
    negative delta = scrolled down

    @param {Event} event pass the event to deltaFromWheel
    @return delta. Positive if wheel was scrolled up, and negative, if wheel was scrolled down. */
  scope.deltaFromWheel = function( event ) {
    var delta = 0;

    event = event ? event : window.event; /* For IE. */

    if ( event.deltaY > 99 ) { /* IE/Opera. */
      delta = event.deltaY / 100;
    } else if ( event.deltaY <= 99 ) {
      delta = event.deltaY;
    }

    /* If delta is nonzero, handle it, otherwise scrap it Basically, delta is now positive if
    wheel was scrolled up, and negative, if wheel was scrolled down. */
    if ( delta ) return delta;
  };
  /** Has the mouse click been right mouse button
   * @param {Event} event The event where the click occured */
  scope.isRightClick = function( event ) {
     var rightclick;

     event = event ? event : window.event; /* For IE. */
     if ( event.buttons ) rightclick = ( event.buttons == 2 );
     else if ( event.which ) rightclick = ( event.which == 3 );
     else if ( event.button ) rightclick = ( event.button == 2 );

     if ( rightclick ) return true;

     return false;
  };
  scope.getEventCoordsOnPage = function (e) {
    return {
      x: e.pageX,
      y: e.pageY
    };
  };

  return scope;
} )();
export var resizeUtils = {
  toggleFullScreen: function toggleFullScreen() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = ( document.fullScreenElement && document.fullScreenElement !== null ) ||
       (
       document.mozFullScreen || document.webkitIsFullScreen );

    isInFullScreen ? cancelFullScreen( document ) : requestFullScreen( elem );

    return false;

    // Sub functions
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
  },
  /** Sets canvas size to maximum width and height on the browser, not using fullscreen
   * @param {DOMElement Canvas context} context */
  setToFullSize: function setToFullSize(context) {
    return function fullSize() {
      var size = _getWindowSize();

      context.canvas.width = size.x;
      context.canvas.height = size.y;
    };
  },
  getWindowSize: _getWindowSize
};
export var environmentDetection = (function () {
  var scope = {};

  scope.isMobile =function() {
    var screenSize = (screen.width <= 640) || (window.matchMedia && window.matchMedia('only screen and (max-width: 640px)').matches );
    var features = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    return features && screenSize;
  };

  return scope;
})();

/** ===== PRIVATE ===== */
function _getWindowSize() {
  return {
    x: window.innerWidth,
    y: window.innerHeight
  };
}