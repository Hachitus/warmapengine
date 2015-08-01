export var mouseUtils = ( function mouseUtils() {
  var scope = {};

  /** This function is from: http://www.adomas.org/javascript-mouse-wheel/
    It detects which way the mousewheel has been moved

    @param {Event} event pass the event to deltaFromWheel
    @return delta. Positive if wheel was scrolled up, and negative, if wheel was scrolled down.
    */
  scope.deltaFromWheel = function( event ) {
     var delta = 0;

     event = event ? event : window.event; /* For IE. */

     if ( event.wheelDelta ) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
     } else if ( event.detail ) { /** Mozilla case. */
        /* In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3. */
        delta = -event.detail / 3;
     }
     /* Prevent default actions caused by mouse wheel. It might be ugly */
     event.preventDefault ? event.preventDefault() : event.returnValue = false;

     /* If delta is nonzero, handle it, otherwise scrap it Basically, delta is now positive if
     wheel was scrolled up, and negative, if wheel was scrolled down. */
     if ( delta ) return delta;
  };
  /** Detect right click */
  scope.isRightClick = function( event ) {
     var rightclick;

     event = event ? event : window.event; /* For IE. */
     if ( event.buttons ) rightclick = ( event.buttons == 2 );
     else if ( event.which ) rightclick = ( event.which == 3 );
     else if ( event.button ) rightclick = ( event.button == 2 );

     if ( rightclick ) return true;

     return false;
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
  setToFullSize: function setToFullSize(context) {
    return function fullSize() {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
    };
  }
};

export var listeners = (function() {
  const LISTENER_TYPES = {
    "mousemove": {
      element: "canvas",
      event: "mousemove"
    },
    "mouseup": {
      element: "canvas",
      event: "mouseup"
    },
    "mousedown": {
      element: "canvas",
      event: "mousedown"
    },
    "mousewheel": {
      element: "canvas",
      event: "wheel"
    },
    "mouseclick": {
      element: "canvas",
      event: "click"
    },
  };
  var _eventListeners = _getEmptyEventListenerArray();
  var scope = {};

  scope.setOne = function setOne(action, callback) {
    /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
    _eventListeners[action].push(callback);
    this[LISTENER_TYPES[action].element].addEventListener(LISTENER_TYPES[action].event, callback);

    return this;
  };
  scope.removeOne = function removeOne(type, origCallback) {

    if(typeof type === "string" ) {
      if(origCallback) {
        this[LISTENER_TYPES[type].element].removeEventListener(LISTENER_TYPES[type].event, origCallback);
        return;
      }

      throw new Error("no callback specified! - 1");
    } else if (type instanceof Array ) {
      type.forEach(thisType => {
        if(origCallback) {
          this[LISTENER_TYPES[thisType].element].removeEventListener(LISTENER_TYPES[thisType].event, origCallback);
          return;
        }

        throw new Error("no callback specified! - 2");
      });
    }

    return this;
  };

  return scope;

  /* PRIVATE functions */
  function _getEmptyEventListenerArray() {
    var objects = {};

    Object.keys(LISTENER_TYPES).forEach(function(type) {
      objects[type] = [];
    });

    return objects;
  }
})();