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