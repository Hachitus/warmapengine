"use strict";

/** For nodeJS */
var extend, promiseFunc;
/* node jquery has issues */
if ( typeof exports !== "undefined" ) {
   extend = require( 'node.extend' );
   promiseFunc = require( 'q' )
      .defer;
} else { // frontend uses jquery
   extend = jQuery.extend;
   promiseFunc = jQuery.Deferred;
}

/*
Here we keep all the general functions that can be used in more than one
project. All the project-specific functions will be in separate files and
can use the H_Lib-functions.

@requires extend-functionality (jquery and / or node.extend)  and Handlebars.
 */
export var H_Lib = ( function( extend, promiseFunc ) {
   var ret = {};
   /** ==== Graphics ==== */
   ret.drawing = ( function drawing() {
      var ret2 = {};

      ret2.drawArea = function( ctx, imgSource, x, y, width, height ) {
         var createdImage;
         createdImage = new Image();
         createdImage.src = imgSource;

         ctx.drawImage( createdImage, x, y, width, height );
         return createdImage;
      };
      ret2.requestNextAnimationFrame = function() {
         var self = this;
         return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

         function( callback ) {
            window.setTimeout( function() {
               var start = +new Date(),
                  finish = +new Date();
               callback( start );

               self.timeout = 1000 / 60 - ( finish - start );
            }, 1000 / 60 );
         };
      };
      ret2.clearCanvas = function( ctxToClear ) {
         ctxToClear.clearRect( 0, 0, ctxToClear.canvas.width, ctxToClear.canvas.height );
      };
      ret2.cloneCanvas = function( oldCanvas ) {
         //create a new canvas
         var newCanvas = document.createElement( 'canvas' ),
            context = newCanvas.getContext( '2d' );

         //set dimensions
         newCanvas.width = oldCanvas.width;
         newCanvas.height = oldCanvas.height;

         //apply the old canvas to the new one and return the context
         return context.drawImage( oldCanvas, 0, 0 );
      };

      /*
      Zooms the canvas, based on the fiven zoomSize and moves the map after zoom operation if wanted
      the move can be used e.g. if we want to concentrate the zoom on mouse coordinates.
      @requires createJS library, since it uses the stage-object
      @param {Array} zoomThese - Holds all the objects that will be scaled by changing the objects
      scaleX and scaleY variables. This makes the library function more flexible and general
      @param {int} zoomSize - this defines how much and to which direction we zoom: can be - or +
      @param {object collection} moveToMouseCoords - {
      - moveFunc: callback function that moves the layer after the zoom. Receives: { x: ?, y: ? }
      - stage: createjs.Stage where we get information from, like coordinates for moving */
      ret2.zoomContainer = function( zoomThese, zoomSize, moveToMouseCoords ) {
         var i, lengthi = 0;

         // Do the zooming
         for ( i = 0, lengthi = zoomThese.length; i < lengthi; i++ ) {
            zoomThese[ i ].scaleX += zoomSize;
            zoomThese[ i ].scaleY += zoomSize;
         }

         if ( moveToMouseCoords.stage && moveToMouseCoords.moveFunc ) {
            /* OLD system, didn't work we have to rethink everything anyway
            oldStageCoords = moveToMouseCoords.stage.localToLocal(
               moveToMouseCoords.stage.mouseX,
               moveToMouseCoords.stage.mouseY,
               moveToMouseCoords.stage.children[ 0 ]
            );

            newStageCoords = moveToMouseCoords.stage.localToLocal(
               moveToMouseCoords.stage.mouseX,
               moveToMouseCoords.stage.mouseY,
               moveToMouseCoords.stage.children[ 0 ]
            );

            newStageCoords.x = (
               moveToMouseCoords.stage.children[ 0 ].x + newStageCoords.x - oldStageCoords.x
            );
            newStageCoords.y = (
               moveToMouseCoords.stage.children[ 0 ].y + newStageCoords.y - oldStageCoords.y
            );
            */
            // This can stay :) moveToMouseCoords.moveFunc(  );
         }
      };
      ret2.viewportSize = function() {
         return {
            width: window.innerWidth,
            height: window.innerHeight
         };
      };

      /* used with constructed functions, requires this */
      ret2.drawShape = ( function() {
         var ret = {};
         /*
         @param { [x, y] } coords
         @param { int } radius
         @param { [gradientColorFrom, gradientColorTo] } colors gradient colors for the shape
         @param { [from, to] } ratios points where the gradientColors start and end from */
         ret.gradientCircle = function circle( coords, radius, colors, ratios ) {
            ratios = ratios || [ 0, 1 ];
            colors = colors || [ "#000", "#FFF" ];

            this.graphics.beginRadialGradientFill(
               colors, ratios,
               coords[ 0 ], coords[ 1 ], radius[ 0 ],
               coords[ 0 ], coords[ 1 ], radius[ 1 ]
            );
            this.graphics.drawCircle(
               coords[ 0 ], coords[ 1 ], radius[ 1 ]
            );
            return this;
         };
         return ret;
      } )();

      /** =============== Functions for drawing arrows ================ */

      // From the website: http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html
      /*
        @param {int} x1,y1 - the line of the shaft starts here
        @param {int} x2,y2 - the line of the shaft ends here
        @param {int or function} style - type of head to draw
            0 - filled head with back a curve drawn with arcTo
                n.b. some browsers have an arcTo bug that make this look bizarre
            1 - filled head with back a straight line
            2 - unfilled but stroked head
            3 - filled head with back a curve drawn with quadraticCurveTo
            4 - filled head with back a curve drawn with bezierCurveTo
                function(ctx,x0,y0,x1,y1,x2,y2,style) - a function provided by the user to draw the head. Point (x1,y1) is the same as the end of the line, and (x0,y0) and (x2,y2) are the two back corners. The style argument is the this for the function. An example that just draws little circles at each corner of the arrow head is shown later in this document.
            default 3 (filled head with quadratic back)
        @param {int} which - which end(s) get the arrow
            0 - neither
            1 - x2,y2 end
            2 - x1,y1 end
            3 - (that's 1+2) both ends
            default 1 (destination end gets the arrow)
        @param {float} angle - the angle θ from shaft to one side of arrow head - default π/8 radians (22 1/2°, half of a 45°)
        @param {int} length - the distance d in pixels from arrow point back along the shaft to the back of the arrow head - default 10px

        Passing in a custom head drawing routine, ie:
        var headDrawer=function(ctx,x0,y0,x1,y1,x2,y2,style)
        {
            var radius=3;
            var twoPI=2*Math.PI;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x0,y0,radius,0,twoPI,false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x1,y1,radius,0,twoPI,false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x2,y2,radius,0,twoPI,false);
            ctx.stroke();
            ctx.restore();
        }

        Modified to support easelJS (no context editing, instead graphics-object)

        */

      var drawHead = function( graphics, x0, y0, x1, y1, x2, y2, style ) {
         var backdist;
         x0 = +x0, y0 = +y0, x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2;
         // all cases do this.
         graphics.beginStroke( "#F00" )
            .moveTo( x0, y0 )
            .lineTo( x1, y1 )
            .lineTo( x2, y2 );
         switch ( style ) {
            case 0:
               // curved filled, add the bottom as an arcTo curve and fill
               backdist = Math.sqrt( ( ( x2 - x0 ) * ( x2 - x0 ) ) + ( ( y2 - y0 ) * ( y2 -
                  y0 ) ) );
               graphics.arcTo( x1, y1, x0, y0, 0.55 * backdist );
               graphics.fill();
               break;
            case 1:
               // straight filled, add the bottom as a line and fill.
               graphics.beginStroke( "#F00" )
                  .moveTo( x0, y0 )
                  .lineTo( x1, y1 )
                  .lineTo( x2, y2 )
                  .lineTo( x0, y0 )
                  .fill();
               break;
            case 2:
               // unfilled head, just stroke.
               break;
            case 3:
               //filled head, add the bottom as a quadraticCurveTo curve and fill
               var cpx = ( x0 + x1 + x2 ) / 3;
               var cpy = ( y0 + y1 + y2 ) / 3;
               graphics.beginFill()
                  .quadraticCurveTo( cpx, cpy, x0, y0 );
               break;
            case 4:
               //filled head, add the bottom as a bezierCurveTo curve and fill
               var cp1x, cp1y, cp2x, cp2y;
               var shiftamt = 5;
               if ( x2 === x0 ) {
                  // Avoid a divide by zero if x2==x0
                  backdist = y2 - y0;
                  cp1x = ( x1 + x0 ) / 2;
                  cp2x = ( x1 + x0 ) / 2;
                  cp1y = y1 + backdist / shiftamt;
                  cp2y = y1 - backdist / shiftamt;
               } else {
                  backdist = Math.sqrt( ( ( x2 - x0 ) * ( x2 - x0 ) ) + ( ( y2 - y0 ) * ( y2 -
                     y0 ) ) );
                  var xback = ( x0 + x2 ) / 2;
                  var yback = ( y0 + y2 ) / 2;
                  var xmid = ( xback + x1 ) / 2;
                  var ymid = ( yback + y1 ) / 2;

                  var m = ( y2 - y0 ) / ( x2 - x0 );
                  var dx = ( backdist / ( 2 * Math.sqrt( m * m + 1 ) ) ) / shiftamt;
                  var dy = m * dx;
                  cp1x = xmid - dx;
                  cp1y = ymid - dy;
                  cp2x = xmid + dx;
                  cp2y = ymid + dy;
               }

               graphics.bezierCurveTo( cp1x, cp1y, cp2x, cp2y, x0, y0 );
               graphics.fill();
               break;
         }
      };

      ret2.drawArrow = function( shape, x1, y1, x2, y2, style, which, angle, d ) {
         'use strict';

         var graphics = shape.graphics,
            color = "#000",
            angle1, topx, topy, angle2, botx, boty;

         /* Ceason pointed to a problem when x1 or y1 were a string, and
             concatenation would happen instead of addition */
         if ( typeof( x1 ) === 'string' ) x1 = parseInt( x1, 10 );
         if ( typeof( y1 ) == 'string' ) y1 = parseInt( y1, 10 );
         if ( typeof( x2 ) == 'string' ) x2 = parseInt( x2, 10 );
         if ( typeof( y2 ) == 'string' ) y2 = parseInt( y2, 10 );
         style = typeof( style ) != 'undefined' ? style : 3;
         which = typeof( which ) != 'undefined' ? which : 1; // end point gets arrow
         angle = typeof( angle ) != 'undefined' ? angle : Math.PI / 8;
         d = typeof( d ) != 'undefined' ? d : 10;
         // default to using drawHead to draw the head, but if the style
         // argument is a function, use it instead
         var toDrawHead = typeof( style ) != 'function' ? drawHead : style;

         /* For ends with arrow we actually want to stop before we get to the arrow
             so that wide lines won't put a flat end on the arrow. */
         var dist = Math.sqrt( ( x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 ) );
         var ratio = ( dist - d / 3 ) / dist;
         var tox, toy, fromx, fromy;
         if ( which & 1 ) {
            tox = Math.round( x1 + ( x2 - x1 ) * ratio );
            toy = Math.round( y1 + ( y2 - y1 ) * ratio );
         } else {
            tox = x2;
            toy = y2;
         }
         if ( which & 2 ) {
            fromx = x1 + ( x2 - x1 ) * ( 1 - ratio );
            fromy = y1 + ( y2 - y1 ) * ( 1 - ratio );
         } else {
            fromx = x1;
            fromy = y1;
         }

         /* Original: Draw the shaft of the arrow
            ctx.beginPath();
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            ctx.stroke(); */

         // Modified easelJS-version:
         graphics.beginStroke( color )
            .moveTo( fromx, fromy )
            .lineTo( tox, toy );

         // calculate the angle of the line
         var lineangle = Math.atan2( y2 - y1, x2 - x1 );
         // h is the line length of a side of the arrow head
         var h = Math.abs( d / Math.cos( angle ) );

         if ( which & 1 ) { // handle far end arrow head
            angle1 = lineangle + Math.PI + angle;
            topx = x2 + Math.cos( angle1 ) * h;
            topy = y2 + Math.sin( angle1 ) * h;
            angle2 = lineangle + Math.PI - angle;
            botx = x2 + Math.cos( angle2 ) * h;
            boty = y2 + Math.sin( angle2 ) * h;
            toDrawHead( graphics, topx, topy, x2, y2, botx, boty, style );
         }
         if ( which & 2 ) { // handle near end arrow head
            angle1 = lineangle + angle;
            topx = x1 + Math.cos( angle1 ) * h;
            topy = y1 + Math.sin( angle1 ) * h;
            angle2 = lineangle - angle;
            botx = x1 + Math.cos( angle2 ) * h;
            boty = y1 + Math.sin( angle2 ) * h;
            toDrawHead( graphics, topx, topy, x1, y1, botx, boty, style );
         }
      };
      ret2.drawArcedArrow = function( graphics, x, y, r, startangle, endangle, anticlockwise,
         style, which, angle, d ) {
         var sx, sy, lineangle, destx, desty;

         style = typeof( style ) != 'undefined' ? style : 3;
         which = typeof( which ) != 'undefined' ? which : 1; // end point gets arrow
         angle = typeof( angle ) != 'undefined' ? angle : Math.PI / 8;
         d = typeof( d ) != 'undefined' ? d : 10;
         // Old: ctx.save();
         graphics.beginPath();
         graphics.arc( x, y, r, startangle, endangle, anticlockwise );
         graphics.stroke();

         graphics.strokeStyle = 'rgba(0,0,0,0)'; // don't show the shaft
         if ( which & 1 ) { // draw the destination end
            sx = Math.cos( startangle ) * r + x;
            sy = Math.sin( startangle ) * r + y;
            lineangle = Math.atan2( x - sx, sy - y );

            if ( anticlockwise ) {
               destx = sx + 10 * Math.cos( lineangle );
               desty = sy + 10 * Math.sin( lineangle );
            } else {
               destx = sx - 10 * Math.cos( lineangle );
               desty = sy - 10 * Math.sin( lineangle );
            }
            ret.drawArrow( graphics, sx, sy, destx, desty, style, 2, angle, d );
         }
         if ( which & 2 ) { // draw the origination end
            sx = Math.cos( endangle ) * r + x;
            sy = Math.sin( endangle ) * r + y;
            lineangle = Math.atan2( x - sx, sy - y );
            if ( anticlockwise ) {
               destx = sx - 10 * Math.cos( lineangle );
               desty = sy - 10 * Math.sin( lineangle );
            } else {
               destx = sx + 10 * Math.cos( lineangle );
               desty = sy + 10 * Math.sin( lineangle );
            }
            ret.drawArrow( graphics, sx, sy, destx, desty, style, 2, angle, d );
         }
      };
      /* =============================== */

      ret2.setCanvasSize = function setCanvasSize( canvases ) {
         var key;

         for ( key in canvases ) {
            var ctx = canvases[ key ].getContext( "2d" );

            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
         }
      };

      return ret2;
   } )();

   /* Managing full screen modes. Unfortunatel only for newer browsers
    * Source: http://stackoverflow.com/questions/1125084/how-to-make-in-javascript-full-screen-windows-
    stretching-all-over-the-screen */
   ret.toggleFullScreen = function() {
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
   };
   ret.screenSize = function() {
      return {
         x: screen.availWidth,
         y: screen.availHeight
      };
   };
   // =============================

   /** ==== START - THESE ARE FOR DIALOG WINDOWS ==== */
   /* @constructor
@params {DOM element} content - The dialogs DOM element
@params {object} style - CSS styles that are added to the DOM element */
   ret.Dialog = function Dialog( content, style ) {
      var self = this,
         compiledTmpl = Handlebars.compile( content.innerHTML );

      self.ele = content;

      extend( self.ele.style, style );

      function unHide() {
         self.ele.classList.remove( "hidden" );
      }

      function hide() {
         self.ele.classList.add( "hidden" );
      }

      this.changeCoords = function( coord ) {
         style.left = coord.x;
         style.top = coord.y;
      };
      this.show = function( data, coord ) {
         if ( coord ) {
            self.ele.style.left = coord.x + "px";
            self.ele.style.top = coord.y + "px";
         }
         self.ele.innerHTML = compiledTmpl( data );
         unHide();
      };
      this.hide = function() {
         hide();
      };
      this.destroy = function() {
         this.ele.parentNode.removeChild( this.ele );
      };
   };
   /** ==== Mouse Functions ==== */
   /* These are functionalities for handling mouse events, like detecting which way
mousewheel goes etc.*/
   ret.mouseFuncs = ( function mouseFuncs() {
      var ret2 = {};

      /* This function is from: http://www.adomas.org/javascript-mouse-wheel/
        It detects which way the mousewheel has been moved
        */
      ret2.deltaFromWheel = function( event ) {
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
      ret2.isRightClick = function( event ) {
         var rightclick;

         event = event ? event : window.event; /* For IE. */
         if ( event.buttons ) rightclick = ( event.buttons == 2 );
         else if ( event.which ) rightclick = ( event.which == 3 );
         else if ( event.button ) rightclick = ( event.button == 2 );

         if ( rightclick ) return true;

         return false;
      };
      return ret2;
   } )();
   /* code from: http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-
   nested-object-key/2631198#2631198

    This checks wether the subObjects / variables exist, ie. obj.sub1.sub2.sub3. This
    is very sucky in javascript in general, so I really love to have function for
    this

    This needs toString-method for all the variables / objects in the chain, to give proper
    debugging feedback. Otherwise if there
    is just an object literal involved, it might show [Object Object] without the use of toString.

    @params obj {object} - the object to traverse
    @params args[1+] - The subObjects, that should be checked

    I tried to have the obj-object to be presented with toString, but it was really
    heavy operation for some reason, so there are poor debugging capabilities here atm.
    */
   ret.checkNested = function() {
      var args = Array.prototype.slice.call( arguments ),
         obj = args.shift();

      for ( var i = 0; i < args.length; i++ ) {
         if ( obj == null || !obj.hasOwnProperty( args[ i ] ) ) {
            console.log( "error:", obj, new Error()
               .stack );
            return false;
         }
         obj = obj[ args[ i ] ];
      }
      return true;
   };
   ret.checkNestedThrower = function() {
      var args = Array.prototype.slice.call( arguments ),
         obj = args.shift();

      for ( var i = 0; i < args.length; i++ ) {
         if ( obj == null || !obj.hasOwnProperty( args[ i ] ) ) {
            throw new Error( "variable didn't exist. Some info: " + args[ i ].toString() );
         }
         obj = obj[ args[ i ] ];
      }
      return true;
   };
   ret.isInt = function( n ) {
      n = parseInt( n, 10 );
      return typeof n === 'number' && n % 1 == 0;
   };
   ret.capitalise1stLetter = function( string ) {
      return string.charAt( 0 )
         .toUpperCase() + string.slice( 1 );
   };
   ret.checkZero = function checkZero( n ) {
      return !+n;
   };
   /* Check wether one array contains same values as another array, un-tested */
   ret.checkArrayMatch = function( arr1, arr2 ) {
      var i = 0,
         lengthi = 0,
         found = false;
      for ( i = 0, lengthi = arr1.length; i < lengthi; i++ ) {
         if ( arr1.indexOf( arr2[ i ] ) > -1 ) {
            found = true;
            break;
         }
      }
      return found;
   };

   /* jquery helper functions for the game */
   ret.postAjax = function( where, data ) {
      var promise = promiseFunc();
      $.ajax( {
         "type": "POST",
         "url": where,
         "dataType": "json",
         "data": data,
         "async": true,
         success: function( resp ) {
            promise.resolve( resp );
         },
         error: function( resp ) {
            promise.reject( new Error(
               "AjaxError. Bad data or problem at backend-end", resp ) );
         }
      } );
      return promise;
   }

   return ret;
} )( extend, promiseFunc );