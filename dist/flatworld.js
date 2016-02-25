"use strict";

window.flatworld_libararies = {};
window.flatworld_libararies.PIXI = window.PIXI;
window.flatworld_libararies.Q = window.Q;
window.flatworld_libararies.Hammer = window.Hammer;
window.flatworld_libararies.hamster = window.hamster;
window.flatworld_libararies.Handlebars = window.Handlebars;
window.flatworld_libararies.loglevel = window.log;
window.flatworld_libararies.Howler = window.Howl;
window.flatworld = {};
window.flatworld.generalUtils = {};
window.flatworld.objects = {};
window.flatworld.extensions = {};
window.flatworld.mapLayers = {};
window.flatworld.utils = {};
window.flatworld.factories = {};
window.flatworld.UIs = {};
window.flatworld.UIs.default = {};
'use strict';

(function () {
  /* jshint ignore:start */
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  window.flatworld.generalUtils.polyfills = setupPolyfills();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Add polyfills for the map, as necessary. Easy to drop out.
   *
   * @class generalUtils.polyfills
   * @return {Object} arrayFind, objectAssign
   */
  function setupPolyfills() {
    return {
      arrayFind: arrayFind,
      objectAssign: objectAssign,
      es6String: es6String
    };

    /**
     * @static
     * @method arrayFind
     */
    function arrayFind() {
      if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
          if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
          }
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          var value;

          for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
          return undefined;
        };
      }
    }

    /**
     * Object.assign IE11 polyfill. Credits to Mozillas folk:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     *
     * @method objectAssign
     * @static
     */
    function objectAssign() {
      if (typeof Object.assign != 'function') {
        (function () {
          Object.assign = function (target) {
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
              var source = arguments[index];
              if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                  if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                  }
                }
              }
            }
            return output;
          };
        })();
      }
    }
    // purely for internet explorer. Though I think this issue is only in EI11,not in edge?
    function es6String() {
      /*! https://mths.be/repeat v0.2.0 by @mathias */
      if (!String.prototype.repeat) {
        (function () {
          'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

          var defineProperty = function () {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
              var object = {};
              var $defineProperty = Object.defineProperty;
              var result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {}
            return result;
          }();
          var repeat = function repeat(count) {
            if (this == null) {
              throw TypeError();
            }
            var string = String(this);
            // `ToInteger`
            var n = count ? Number(count) : 0;
            if (n != n) {
              // better `isNaN`
              n = 0;
            }
            // Account for out-of-bounds indices
            if (n < 0 || n == Infinity) {
              throw RangeError();
            }
            var result = '';
            while (n) {
              if (n % 2 == 1) {
                result += string;
              }
              if (n > 1) {
                string += string;
              }
              n >>= 1;
            }
            return result;
          };
          if (defineProperty) {
            defineProperty(String.prototype, 'repeat', {
              value: repeat,
              configurable: true,
              writable: true
            });
          } else {
            String.prototype.repeat = repeat;
          }
        })();
      }
    }
  }
  /* jshint ignore:end */
})();
'use strict';

(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  window.flatworld.generalUtils.arrays = setupArrays();

  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * Array manipulation
   *
   * @class utilities.arrays
   */
  function setupArrays() {
    return {
      flatten2Levels: flatten2Levels
    };

    /**
     * Flattern 2 levels deep, 2-dimensional arrays. Credits: http://stackoverflow.com/a/15030117/1523545
     *
     * @method flatten2Levels
     * @param  {Array} arr        Array to flatten
     * @return {Array}            Flattened array
     */
    function flatten2Levels(arr) {
      return [].concat.apply([], arr);
    }
  }
})();
'use strict';

(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  window.flatworld.generalUtils.environmentDetection = setupEnvironmentDetection();

  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * @class utilities.environmentDetections
   * @return {Object}                         Holds methods in this class
   */
  function setupEnvironmentDetection() {
    return {
      isMobile: isMobile
    };

    /**
     * Detect mobile environment
     *
     * @method isMobile
     * @return {Boolean}
     */
    function isMobile() {
      var screenSize = screen.width <= 640 || window.matchMedia && window.matchMedia('only screen and (max-width: 640px)').matches;
      var features = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

      return features && screenSize;
    }
  }
})();
'use strict';

(function () {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/

  var loglevel = window.flatworld_libararies.loglevel;

  loglevel.enableAll();
  /**
   * @class log
   * @requires loglevel.js for frontend logging, or something similar
   **/
  window.flatworld.log = {
    debug: function debug(e, errorText) {
      loglevel.debug(errorText, e);
    }
  };
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var Q = window.flatworld_libararies.Q;
  var PIXI = window.flatworld_libararies.PIXI;

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  var Preload = function () {
    /**
     * Preloads assets before initializing map.
     *
     * @class Preload
     * @constructor
     * @requires Q for promises
     * @todo should you use PIXI here or just https://github.com/englercj/resource-loader straight?
     */

    function Preload(baseUrl) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? { concurrency: 15, crossOrigin: false } : arguments[1];

      _classCallCheck(this, Preload);

      var concurrency = options.concurrency;


      this.preloaderClass = new PIXI.loaders.Loader(baseUrl, concurrency);
    }
    /**
     * @method resolveOnComplete
     * @return {Promise} Return promise object, that will be resolved when the preloading is finished
     **/


    _createClass(Preload, [{
      key: "resolveOnComplete",
      value: function resolveOnComplete() {
        var promise = Q.defer();

        this.preloaderClass.load();

        this.preloaderClass.once('complete', function (loader, resources) {
          promise.resolve(loader, resources);
        });

        return promise.promise;
      }
      /**
       * @method addResource
       **/

    }, {
      key: "addResource",
      value: function addResource(resource) {
        this.preloaderClass.add(resource);
      }
      /**
       * Preload assets
       *
       * @method loadManifest
       **/

    }, {
      key: "loadManifest",
      value: function loadManifest() {
        return this;
      }
      /**
       * Error handler if something goes wrong when preloading
       *
       * @method setErrorHandler
       **/

    }, {
      key: "setErrorHandler",
      value: function setErrorHandler(errorCB) {
        this.preloaderClass.on("error", errorCB);

        return this;
      }
      /**
       * Progress handler for loading. You should look easeljs docs for more information
       *
       * @method setProgressHandler
       **/

    }, {
      key: "setProgressHandler",
      value: function setProgressHandler(progressCB) {
        this.preloaderClass.on("error", progressCB);

        return this;
      }
      /**
       * Activate sound preloading also
       *
       * @method activateSound
       **/

    }, {
      key: "activateSound",
      value: function activateSound() {
        this.preloaderClass.installPlugin();
      }
    }]);

    return Preload;
  }();

  window.flatworld.Preload = Preload;
})();
'use strict';

(function () {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/

  window.flatworld.utils.dataManipulation = setupDataManipulation();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * These are utils for manipulating the data, that our classes and functions use.
   *
   * @class utils.dataManipulation
   * @return {Object}      mapObjectsToArray, flattenArrayBy1Level
   */
  function setupDataManipulation() {
    /*---------------------
    ------- API ----------
    --------------------*/
    return {
      mapObjectsToArray: mapObjectsToArray,
      flattenArrayBy1Level: flattenArrayBy1Level
    };

    /*----------------------
    ------- PUBLIC ---------
    ----------------------*/
    /**
     * Changes the data from e.g. getting objects from the map based on coordinate. The data is like this normally:
     * {
     *   units: [{
     *     {... the objects datas ...}
     *   }]
     * }
     * We change it to this:
     * [
     *   [{
     *     {... the objects datas ...}
     *   }]
     * ]
     *
     * @method mapObjectsToArray
     * @param  {Object} objects       Object that holds objects
     * @return {Array}                Returns the transformed array
     */
    function mapObjectsToArray(objects) {
      return Object.keys(objects).map(function (objGroup) {
        return objects[objGroup];
      });
    }
    /**
     * @method flattenArrayBy1Level
     * @param  {Array} objects
     */
    function flattenArrayBy1Level(objects) {
      var merged = [];

      return merged.concat.apply(merged, objects);
    }
  }
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/

  window.flatworld.utils.effects = setupEffects();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * This module will hold the most common graphical effects used in the map. It is still very stub as the development
   * hasn't proceeded to this stage yet.
   *
   * @class utils.effects
   * @return {Object}      init, _startDragListener
   */
  function setupEffects() {
    /*---------------------
    ------- API ----------
    --------------------*/
    return {
      dropShadow: dropShadow
    };

    /*----------------------
    ------- PUBLIC ---------
    ----------------------*/
    /**
     * @method dropShadow
     * @param  {Object} options
     */
    function dropShadow() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { color: "#000000", distance: 5, alpha: 0.5, amgöe: 45, blur: 5 } : arguments[0];

      var shadow = new PIXI.filters.DropShadowFilter();

      shadow.color = options.color;
      shadow.distance = options.distance;
      shadow.alpha = options.alpha;
      shadow.angle = options.angle;
      shadow.blur = options.blur;

      this.filters = [shadow];
    }
  }
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/

  window.flatworld.utils.mouse = setupMouseUtils();
  window.flatworld.utils.resize = setupResizeUtils();
  window.flatworld.utils.environmentDetection = setupEnvironmentDetection();
  window.flatworld.utils.general = setupGeneral();

  /**
   * @class utils.mouse
   * @return {Object}      isRightClick, eventData.getPointerCoords, eventData.getHAMMERPointerCoords, eventMouseCoords
   */
  function setupMouseUtils() {
    return {
      isRightClick: isRightClick,
      eventData: {
        getPointerCoords: getPointerCoords,
        getHAMMERPointerCoords: getHAMMERPointerCoords
      },
      eventMouseCoords: eventMouseCoords
    };

    /**
     * Detects if the mouse click has been the right mouse button
     *
     * @method isRightClick
     * @param {Event} event The event where the click occured
     */
    function isRightClick(event) {
      var rightclick;

      event = event ? event : window.event; /* For IE. */
      if (event.buttons) {
        rightclick = +event.buttons === 2;
      } else if (event.which) {
        rightclick = +event.which === 3;
      } else if (event.button) {
        rightclick = +event.button === 2;
      }

      if (rightclick) {
        return true;
      }

      return false;
    }
    /**
     * @method getPointerCoords
     * @param  {Event} e    Event object
     * @return {Object}
     */
    function getPointerCoords(e) {
      return {
        x: e.offsetX,
        y: e.offsetY
      };
    }
    /**
     * @method getHAMMERPointerCoords
     * @param  {Event} e    Event object
     * @return {Object}
     */
    function getHAMMERPointerCoords(e) {
      return e.center;
    }
    /**
     * @method eventMouseCoords
     * @param  {Event} e    Event object
     * @return {Object}
     */
    function eventMouseCoords(e) {
      var pos = {
        x: 0,
        y: 0
      };

      if (!e) {
        e = window.event;
      }
      if (e.pageX || e.pageY) {
        pos.x = e.pageX;
        pos.y = e.pageY;
      } else if (e.clientX || e.clientY) {
        pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      // posx and posy contain the mouse position relative to the document
      // Do something with this information
      return pos;
    }
  }
  /**
   * @class utils.resize
   * @return {Object}      toggleFullScreen, setToFullSize, getWindowSize
   */
  function setupResizeUtils() {
    return {
      toggleFullScreen: toggleFullScreen,
      setToFullSize: setToFullSize,
      getWindowSize: getWindowSize
    };

    /**
     * @method toggleFullScreen
     */
    function toggleFullScreen() {
      var elem = document.body; // Make the body go full screen.
      var isInFullScreen = document.fullScreenElement && document.fullScreenElement !== null || document.mozFullScreen || document.webkitIsFullScreen;

      /* jshint expr: true */
      isInFullScreen ? cancelFullScreen(document) : requestFullScreen(elem);

      return false;

      /*-------------------------
      --------- PRIVATE ---------
      -------------------------*/
      /* global ActiveXObject */
      function cancelFullScreen(el) {
        var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
        if (requestMethod) {
          // cancel full screen.
          requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
          // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          wscript !== null && wscript.SendKeys("{F11}");
        }
      }
      function requestFullScreen(el) {
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

        if (requestMethod) {
          // Native full screen.
          requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
          // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          wscript !== null && wscript.SendKeys("{F11}");
        }
        return false;
      }
    }
    /**
     * Sets canvas size to maximum width and height on the browser, not using fullscreen
     *
     * @method setToFullSize
     * @param {HTMLElement} context        DOMElement Canvas context
     */
    function setToFullSize(context) {
      return function fullSize() {
        var size = getWindowSize();

        context.canvas.width = size.x;
        context.canvas.height = size.y;
      };
    }
    /**
     * Get browser windows size
     *
     * @method getWindowSize
     * @param {HTMLElement} context        DOMElement Canvas context
     */
    function getWindowSize() {
      return {
        x: window.innerWidth,
        y: window.innerHeight
      };
    }
  }
  /**
   * @class utils.environment
   * @return {Object}      getPixelRatio
   */
  function setupEnvironmentDetection() {
    return {
      getPixelRatio: getPixelRatio //,
      // isMobile,
      // isMobile_detectUserAgent
    };

    /**
     * @method getPixelRatio
     * @requires Canvas element in the DOM. This needs to be found
     * @param  {HTMLElement} canvasElement       HTML canvas element
     * @return {Number}
     */
    function getPixelRatio(canvasElement) {
      var DPR = window.devicePixelRatio || 1;
      var ctx = canvasElement && canvasElement.getContext("2d") || document.createElement('canvas').getContext("2d");
      var bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

      return DPR / bsr;
    }
  }
  /**
   * @class utils.general
   * @return {Object}      pixelEpsilonEquality
   */
  function setupGeneral() {
    var PIXEL_EPSILON = 0.01;

    return {
      pixelEpsilonEquality: epsilonEquality
    };

    /**
     * @method epsilonEquality
     * @param  {Number} x
     * @param  {Number} y
     */
    function epsilonEquality(x, y) {
      return Math.abs(x) - Math.abs(y) < PIXEL_EPSILON;
    }
  }
})();
'use strict';

(function () {
  'use strict';

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * This module handles map events. Like informing map movement, object selection and other changes. Not that ALL the eventlisteners and their callbacks will throw one event! But that event will have no extra parameters, so when you do special things, like selecting objects on the map, you should throw another event when that happens and you can pass on the objects that were selected from the map.
   * Events atm:
   * - mapfullscreen - NO ARGUMENTS
   * - mapfullSize - NO ARGUMENTS
   * - mapdrag - NO ARGUMENTS
   * - mapzoomed - NO ARGUMENTS
   * - Mapselect - NO ARGUMENTS
   * - mapMoved
   * - mapResize
   * - mapFullscreeActivated
   *
   * @class mapEvents
   * @return {Object}     subsribe and publish
   * @todo I want the pubsub module to go the ES6 way, not the only global exception!
   */

  function setupMapEvents() {
    var TIMER_FOR_SAME_TYPE = 50;
    var lastTimePublished = {};

    /*---------------------------
    ------------ API ------------
    ---------------------------*/
    return {
      subscribe: subscribe,
      publish: publish
    };

    function subscribe(type, cb) {
      document.addEventListener(type, cb);
      lastTimePublished[type] = 0;
    }
    function publish(type) {
      var timestamp;

      timestamp = new Date().getTime();

      if (lastTimePublished[type] + TIMER_FOR_SAME_TYPE < timestamp) {
        var eventToDispatch = new Event(type);

        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          data[_key - 1] = arguments[_key];
        }

        eventToDispatch.customData = data;

        document.dispatchEvent(eventToDispatch);
        lastTimePublished[type] = timestamp;
      }
    }
  }

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.mapEvents = setupMapEvents();
})();
"use strict";

(function () {
  /* global Hammer, Hamster */
  'use strict';

  /*-----------------------
  ------- VARIABLES -------
  -----------------------*/

  var stateOfEvents = {};
  var activeEventListeners = {};
  var detectors = {};

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/
  var mapEvents = window.flatworld.mapEvents;

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.eventListeners = eventListenersModule();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * This keeps all the event listeners and detectors in one class. You add detectors / event listener types with addDetector and you add event listeners with on.
   *
   * @class eventListeners
   */
  function eventListenersModule() {
    /*---------------------------
    ------------ API ------------
    ---------------------------*/
    return {
      on: on,
      off: off,
      isOn: isOn,
      setActivityState: setActivityState,
      getActivityState: getActivityState,
      setDetector: setDetector,
      clearDetector: clearDetector
    };

    /*---------------------------
    ----------- PUBLIC ----------
    ---------------------------*/
    /**
     * Activates the eventListener.
     *
     * @method on
     * @event Event that consists of "Map" + the given event type, like such: "MapDrag"
     * @throws {Error} General error, if detector for this event type has not been set.
     * @param  {String}  type REQUIRED. The type of event. This type has been created with setDetector.
     * @param  {Boolean} cb   REQUIRED. Callback to do it's eventlistener magic.
     */
    function on() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var cb = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (!detectors[type] && !detectors[type].size) {
        throw new Error("eventlisteners.on needs to have detector set with this event type!");
      }
      detectors[type].on(_createEventListenerWrapper("Map" + type, cb));
      activeEventListeners[type] = activeEventListeners[type] || new Set();
      activeEventListeners[type].add(cb);
    }
    /**
     * Deactivates the eventListener. Callback is optional. If is not provided will remove all this types eventListeners
     *
     * @method off
     * @param  {String}  type REQUIRED. The type of event. This type has been created with setDetector.
     * @param  {Boolean} cb   Callback to do it's eventlistener magic.
     */
    function off() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var cb = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      detectors[type].off(cb);
      cb ? activeEventListeners[type].delete(cb) : delete activeEventListeners[type];
    }
    /**
     * Activates the eventListener. Callback is optional. If is not provided will check if the eventlistener type has any listeners active.
     *
     * @method isOn
     * @param  {String}  type REQUIRED. The type of event. This type has been created with setDetector.
     * @param  {Boolean} cb   Callback to do it's eventlistener magic.
     */
    function isOn() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var cb = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var answer;

      answer = cb ? activeEventListeners[type].has(cb) : !!activeEventListeners[type].size;

      return answer;
    }
    /**
     * Sets the state of the event. State is very important e.g. for fluent dragging and selecting. When we start to drag, we avoid selecting units and vice versa, when we keep an event state tracking through this.
     *
     * @method setActivityState
     * @param {String} type     EventType
     * @param {[type]} newState [description]
     */
    function setActivityState() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var newState = arguments[1];

      stateOfEvents[type] = newState;
    }
    /**
     * get activity state of the event
     *
     * @method getActivityState
     * @param  {String} type EventType
     * @return {Boolean}
     */
    function getActivityState() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

      return stateOfEvents[type];
    }
    /**
     * Set event detector. If there is already detector of this type, we overwrite it.
     *
     * @method setDetector
     * @param {String}   type  Event type
     * @param {Function} cbOn  Callback which sets activates the detector
     * @param {Function} cbOff Callback which sets deactivates the detector
     */
    function setDetector() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var cbOn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
      var cbOff = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

      detectors[type] = {};
      detectors[type] = {
        on: cbOn,
        off: cbOff
      };
    }
    /**
     * Clear event detector. We also remove all possible eventlisteners set on this event type.
     *
     * @method clearDetector
     * @param {String}   type  Event type
     */
    function clearDetector() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

      /* remove all event listeners before we empty the data */
      activeEventListeners[type].forEach(function (cb) {
        detectors[type].cbOff(cb);
      });

      /* remove all data / references to event listeners and detector */
      delete activeEventListeners[type];
      delete detectors[type];
    }

    /*-----------------------------
    ----------- PRIVATE -----------
    ------------------------------*/
    /**
     * This creates a wrapper for callback. The idea is to send map events from this wrapper for all events.
     *
     * @method _createEventListenerWrapper
     * @private
     * @static
     * @param  {String}   type Event type
     * @param  {Function} cb   Event callback
     */
    function _createEventListenerWrapper(type, cb) {
      /* NOTE! There can be more than one arguments in an event. E.g. Hamster.js */
      return function () {
        mapEvents.publish(type);
        cb.apply(undefined, arguments);
      };
    }
  }
})();
"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  /*---------------------
  ------ VARIABLES ------
  ---------------------*/

  var _UIObjects = [];

  /*---------------------
  -------- EXPORT -------
  ---------------------*/

  var MapLayer = function (_PIXI$Container) {
    _inherits(MapLayer, _PIXI$Container);

    /**
     * Creates a basic layer for the Map. This type of layer can not hold subcontainers. Note that different devices and graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE. This is important also when caching.
     *
     * @class MapLayer
     * @constructor
     * @param {Object} options                            optional options
     * @param {String} options.name                       Layers name, used for identifying the layer. Useful in debugging, but can be used for finding correct layers too
     * @param  {Object} options.coord                   coord starting coords of layer. Relative to parent map layer.
     * @param  {Integer} options.coord.x         X coordinate
     * @param  {Integer} options.coord.y         Y coordinate
     * @param  {Object} options.specialLayer            Is this layer special (e.g. UILayer not included in normal operations)
     * @param  {Integer} options.specialLayer.x         X coordinate
     * @param  {Integer} options.specialLayer.y         Y coordinate
     **/

    function MapLayer() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {
        name: "",
        coord: { x: 0, y: 0 },
        specialLayer: false,
        selectable: false } : arguments[0];

      _classCallCheck(this, MapLayer);

      var name = options.name;
      var coord = options.coord;
      var specialLayer = options.specialLayer;
      var selectable = options.selectable;

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapLayer).call(this));

      Object.assign(_this, coord);

      /**
       * Layers name, used for identifying the layer. Useful in debugging, but can be used for finding correct layers too
       *
       * @attribute name
       * @type {String}
       */
      _this.name = "" + name;
      /**
       * Is this layer special (e.g. UILayer not included in normal operations)
       *
       * @attribute specialLayer
       * @type {Boolean}
       */
      _this.specialLayer = !!specialLayer;
      /**
       * Can you select objects from this layer. For example with Map.getObjectsUnderArea
       *
       * @attribute selectable
       * @type {Boolean}
       */
      _this.selectable = selectable;
      return _this;
    }
    /**
     * Does this layer use subcontainers.
     *
     * @method hasSubcontainers
     * @return {Boolean} true = uses subcontainers.
     */


    _createClass(MapLayer, [{
      key: "hasSubcontainers",
      value: function hasSubcontainers() {
        return this.subcontainersConfig ? true : false;
      }
      /**
       * Is this layer cached at the moment or not.
       *
       * @method isCached
       * @return {Boolean} true = is cached
       */

    }, {
      key: "isCached",
      value: function isCached() {
        return this.cacheAsBitmap;
      }
      /**
       * Move layer based on given amounts
       *
       * @method move
       * @param  {Object} coord            The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }. This would move the map 5 pixels horizontally and 0 pixels vertically
       * @param  {Integer} coord.x         X coordinate
       * @param  {Integer} coord.y         Y coordinate
       **/

    }, {
      key: "move",
      value: function move(coord) {
        this.x += coord.x;
        this.y += coord.y;
        this.drawThisChild = true;
      }
      /**
       * set layer zoom
       *
       * @method setZoom
       * @param {Number} amount The amount that you want the layer to zoom.
       * @return {Number} The same amount that was given, except after transform to 2 decimals and type cast to Number
       * */

    }, {
      key: "setZoom",
      value: function setZoom(amount) {
        this.scale.x = this.scale.y = +amount.toFixed(2);

        return this.scale.x;
      }
      /**
       * get layer zoom
       *
       * @method getZoom
       * @return {Boolean} current amount of zoom
       * */

    }, {
      key: "getZoom",
      value: function getZoom() {
        return this.scale.x;
      }
      /**
      * get UIObjects on this layer, if there are any, or defaulty empty array if no UIObjects are active
      *
      * @method getUIObjects
      * @return {Array} current UIObjects
      * */

    }, {
      key: "getUIObjects",
      value: function getUIObjects() {
        return _UIObjects;
      }
      /**
       * Remove all the UIObjects from this layer
       *
       * @method emptyUIObjects
       * @return {Array} empty UIObjects array
       * */

    }, {
      key: "emptyUIObjects",
      value: function emptyUIObjects() {
        var _this2 = this;

        _UIObjects.map(function (obj) {
          _this2.getUILayer().removeChild(obj);
          obj = null;
        });

        return _UIObjects;
      }
      /**
       * Get primary layers, that this layer holds as children. So basically all children that are not special layers (such as UI layers etc.)
       *
       * @method getPrimaryLayers
       * @return {Array}                            Primary children layers under this layer
       * */

    }, {
      key: "getPrimaryLayers",
      value: function getPrimaryLayers() {
        return this.children.filter(function (thisChild) {
          return !thisChild.specialLayer;
        });
      }
      /**
       * Get all objects that are this layers children or subcontainers children. Does not return layers, but the objects.
       *
       * @method getObjects
       * @return {Array}                            All the objects (not layers) found under this layer
       * */

    }, {
      key: "getObjects",
      value: function getObjects() {
        var allObjects = [];

        if (this.hasSubcontainers()) {
          this.subcontainerList.forEach(function (subcontainer) {
            allObjects.concat(subcontainer.children);
          });
        }

        return allObjects;
      }
      /**
       * @todo IMPLEMENT CACHE PROPERLY! TAKE SUBCONTAINERS INTO ACCOUNT!
       *
       * Sets layer cache on or off.
       *
       * @method setCache
       * @param {Boolean} status      true = activate cache, false = disable cache
       */

    }, {
      key: "setCache",
      value: function setCache(status) {
        var toCacheStatus = status ? true : false;

        this.cacheAsBitmap = toCacheStatus;

        return toCacheStatus;
      }
      /**
       * Create and add special layer, that holds UI effects in it.
       *
       * @method createUILayer
       * @param  {String} name          name of the layer
       * @param  {Object} coord         Coordinates of the layer
       * @param  {Integer} coord.x      X coordinate
       * @param  {Integer} coord.y      Y coordinate
       * @return {MapLayer}            The created UI layer
       **/

    }, {
      key: "createUILayer",
      value: function createUILayer() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "default UI layer" : arguments[0];
        var coord = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];

        var layer = new MapLayer(name, coord);

        layer.specialLayer = true;
        this.addChild(layer);

        this.UILayer = layer;

        return layer;
      }
      /**
       * Adds and object to this layers UILayer child.
       *
       * @method addUIObject
       * @param {Object} object   The UI object to be added under this layer
       * @return {Array}          All the UIObjects currently on this layer
       */

    }, {
      key: "addUIObject",
      value: function addUIObject(object) {
        var UILayer;
        _UIObjects = _UIObjects || [];

        if (!this.getUILayer()) {
          UILayer = this.createUILayer();
        } else {
          UILayer = this.getUILayer;
        }

        this.UILayer.addChild(object);
        _UIObjects.push(object);

        return _UIObjects;
      }
      /**
       * Return the UILayer. If no UILayer is yet created, will return undefined
       *
       * @method getUILayer
       * @return {MapLayer | undefined}
       */

    }, {
      key: "getUILayer",
      value: function getUILayer() {
        return this.UILayer;
      }
    }]);

    return MapLayer;
  }(PIXI.Container);

  var MapLayerParent = function (_MapLayer) {
    _inherits(MapLayerParent, _MapLayer);

    /**
     * Layer designed to hold subcontainers. But can handle objects too. Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap. Thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
     *
     * @class MapLayerParent
     * @constructor
     * @param {Object} options
     * @param {String} options.name                    name layer property name, used for identifiying the layer, usefull in debugging, but used also otherwise too
     * @param  {Object} options.coord                  starting coords of layer. Relative to parent map layer.
     * @param  {Integer} options.coord.x               X coordinate
     * @param  {Integer} options.coord.y               Y coordinate
     * @param  {Object} options.subcontainers          Subontainer size. If given activated subcontainers, otherwise not.
     * @param  {Integer} options.subcontainers.width   width (in pixels)
     * @param  {Integer} options.subcontainers.height  height (in pixels)
     * @param {Boolean} options.specialLayer           Is this special layer or not.
     */

    function MapLayerParent() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { name: "", coord: { x: 0, y: 0 }, subcontainers: false, specialLayer: false, selectable: false } : arguments[0];

      _classCallCheck(this, MapLayerParent);

      var subcontainers = options.subcontainers;
      var selectable = options.selectable;
      var specialLayer = options.specialLayer;

      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapLayerParent).call(this, options));

      _this3.oldAddChild = _get(Object.getPrototypeOf(MapLayerParent.prototype), "addChild", _this3).bind(_this3);
      _this3.subcontainersConfig = subcontainers;
      _this3.subcontainerList = [];
      _this3.selectable = selectable;
      _this3.specialLayer = specialLayer;
      return _this3;
    }
    /**
     * We override the PIXIs own addchild functionality. Since we need to support subcontainers in addChild. We check subcontainers and then we call the original (PIXIs) addChild
     *
     * @method addChild
     * @param {PIXI.DisplayObject} displayObject      PIXI.DisplayObject
     */


    _createClass(MapLayerParent, [{
      key: "addChild",
      value: function addChild(displayObject) {
        if (this.hasSubcontainers()) {
          var correctContainer = undefined;
          correctContainer = setCorrectSubcontainer(displayObject, this);
          this.oldAddChild(correctContainer);
        } else {
          this.oldAddChild(displayObject);
        }

        return displayObject;
      }
      /**
       * Returns the configurations set for subcontainers.
       *
       * @method getSubcontainerConfigs
       */

    }, {
      key: "getSubcontainerConfigs",
      value: function getSubcontainerConfigs() {
        return this.subcontainersConfig;
      }
      /**
       * Returns subcontainers based on the given coordinates. Can be applied through a MapDataManipulator filter also.
       *
       * @method getSubcontainersByCoordinates
       * @param  {Object} coordinates
       * @param  {Integer} coordinates.x                  X coordinate
       * @param  {Integer} coordinates.y                  Y coordinate
       * @param  {Object} options                         Optional options.
       * @param  {MapDataManipulator} options.filter      Filter for selecting only certain subcontainers
       */

    }, {
      key: "getSubcontainersByCoordinates",
      value: function getSubcontainersByCoordinates(coordinates) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { filter: undefined } : arguments[1];

        if (!this.hasSubcontainers()) {
          throw new Error("tried to retrieve subcontainers, when they are not present");
        }

        var foundSubcontainers, tempCoordinates;
        var filter = options.filter;


        tempCoordinates = this.toLocal(new PIXI.Point(coordinates.x, coordinates.y));
        tempCoordinates.width = coordinates.width;
        tempCoordinates.height = coordinates.height;

        foundSubcontainers = getClosestSubcontainers(this, tempCoordinates, { filter: filter });

        return foundSubcontainers;
      }
      /**
       * @method getSubcontainers
       */

    }, {
      key: "getSubcontainers",
      value: function getSubcontainers() {
        return this.subcontainerList;
      }
    }]);

    return MapLayerParent;
  }(MapLayer);

  var MapSubcontainer = function (_PIXI$Container2) {
    _inherits(MapSubcontainer, _PIXI$Container2);

    /**
     * Subcontainers are containers that hold objects like units and terrain etc. under them. They have some restrictions atm. since they are PIXI.ParticleContainers. But when needed we can extend MapLayers with another class which is subcontainer, but not ParticleContainer at the present there is no need, so we won't extend yet. Subcontainers help the layers to make better movement of the map, by making subcontainers visible or invisible and even helping with selecting objects on the map. Thus we don't need to use our inefficient Quadtree. The intention was to use PIXI.ParticleContainer for this, but it seems it doesn't clean up the memory afterwards the same way as normal Container.
     *
     * @private
     * @class MapSubcontainer
     * @constructor
     * @param  {Object} size              Subontainer size. If given activated subcontainers, otherwise not.
     * @param  {Integer} size.width       width (in pixels)
     * @param  {Integer} size.height      height (in pixels)
     */

    function MapSubcontainer(size) {
      _classCallCheck(this, MapSubcontainer);

      var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapSubcontainer).call(this));

      _this4.specialLayer = true;
      _this4.size = size;
      _this4.selectable = false;
      return _this4;
    }
    /**
     * Gets this subcontainers coordinates and size
     *
     * @method getSubcontainerArea
     * @param {Number} scale                              The size of scale the map currently has
     * @param {Boolean} options.toGlobal                  Do we get the global coordinates or local
     */


    _createClass(MapSubcontainer, [{
      key: "getSubcontainerArea",
      value: function getSubcontainerArea(scale) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { toGlobal: true } : arguments[1];

        var coordinates;

        coordinates = options.toGlobal ? this.toGlobal(new PIXI.Point(0, 0)) : this;
        if (scale) {
          coordinates.x /= scale;
          coordinates.y /= scale;
        }

        return {
          x: Math.round(coordinates.x),
          y: Math.round(coordinates.y),
          width: Math.round(this.size.width),
          height: Math.round(this.size.height)
        };
      }
      /**
       * Set cache on or off for this layer
       *
       * @method setCache
       * @param {Boolean} status      true = activate cache, false = disable cache
       */

    }, {
      key: "setCache",
      value: function setCache(status) {
        var toCacheStatus = status ? true : false;

        this.cacheAsBitmap = toCacheStatus;

        return toCacheStatus;
      }
    }]);

    return MapSubcontainer;
  }(PIXI.Container);
  /*---------------------
  ------- PRIVATE -------
  ----------------------*/
  /**
   * Helper function for setting subcontainers to parent containers
   *
   * @method setCorrectSubcontainer
   * @private
   * @static
   * @method setCorrectSubcontainer
   * @param {PIXI.DisplayObject} displayObject
   * @param {Object} parentLayer
   */


  function setCorrectSubcontainer(displayObject, parentLayer) {
    var subcontainersConfig = parentLayer.subcontainersConfig;
    var subcontainerList = parentLayer.subcontainerList;

    var xIndex = Math.floor(displayObject.x / subcontainersConfig.width);
    var yIndex = Math.floor(displayObject.y / subcontainersConfig.height);
    var thisSubcontainer;

    subcontainerList[xIndex] = subcontainerList[xIndex] || [];
    thisSubcontainer = subcontainerList[xIndex][yIndex] = subcontainerList[xIndex][yIndex] || [];

    if (subcontainerList[xIndex][yIndex].length <= 0) {
      thisSubcontainer = new MapSubcontainer({
        x: xIndex * subcontainersConfig.width,
        y: yIndex * subcontainersConfig.height,
        width: subcontainersConfig.width,
        height: subcontainersConfig.height
      });

      subcontainerList[xIndex][yIndex] = thisSubcontainer;
      thisSubcontainer.x = xIndex * subcontainersConfig.width;
      thisSubcontainer.y = yIndex * subcontainersConfig.height;
      thisSubcontainer.visible = subcontainersConfig.isHiddenByDefault ? false : true;
    }

    displayObject.x -= thisSubcontainer.x;
    displayObject.y -= thisSubcontainer.y;
    subcontainerList[xIndex][yIndex].addChild(displayObject);

    return subcontainerList[xIndex][yIndex];
  }
  /**
   * Get the closest subcontainers of the given area.
   *
   * @method setCorrectSubcontainer
   * @private
   * @static
   * @method getClosestSubcontainers
   * @param  {Object} layer                         Instance of PIXI.Container - The layer being used
   * @param  {Number} xIndex                        x / horizontal index.
   * @param  {Number} yIndex                        y / vertical index.
   * @param  {Object} options                       Optional options.
   * @param  {MapDataManipulator} options.filter    Filter for selecting only wanted subcontainers
   * @return {Array}                                Array of found subcontainers.
   */
  function getClosestSubcontainers(layer, givenCoordinates) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? { filter: undefined } : arguments[2];
    var filter = options.filter;

    var coordinates = {
      x: givenCoordinates.x >= 0 ? givenCoordinates.x : 0,
      y: givenCoordinates.y >= 0 ? givenCoordinates.y : 0,
      width: givenCoordinates.width,
      height: givenCoordinates.height
    };

    var _layer$getSubcontaine = layer.getSubcontainerConfigs();

    var width = _layer$getSubcontaine.width;
    var height = _layer$getSubcontaine.height;

    var allFoundSubcontainers = [];
    var xIndex = Math.floor(coordinates.x / width);
    var yIndex = Math.floor(coordinates.y / height);
    var x2 = coordinates.width ? coordinates.x + coordinates.width : +coordinates.x;
    var y2 = coordinates.height ? coordinates.y + coordinates.height : +coordinates.y;
    var widthIndex = Math.floor(x2 / width);
    var heightIndex = Math.floor(y2 / height);
    var subcontainerList = layer.subcontainerList;

    for (var thisXIndex = xIndex; thisXIndex <= widthIndex; thisXIndex++) {
      if (thisXIndex >= 0 && subcontainerList && subcontainerList[thisXIndex]) {
        for (var thisYIndex = yIndex; thisYIndex <= heightIndex; thisYIndex++) {
          if (thisYIndex >= 0 && subcontainerList[thisXIndex][thisYIndex]) {
            if (filter && !filter.filterSubcontainers(subcontainerList[thisXIndex][thisYIndex])) {
              continue;
            }
            allFoundSubcontainers.push(subcontainerList[thisXIndex][thisYIndex]);
          }
        }
      }
    }

    return allFoundSubcontainers;
  }

  window.flatworld.mapLayers = window.flatworld.mapLayers || {};
  window.flatworld.mapLayers.MapLayer = MapLayer;
  window.flatworld.mapLayers.MapLayerParent = MapLayerParent;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var mapLayers = window.flatworld.mapLayers;

  /*---------------------
  --------- API ---------
  ----------------------*/

  var MapDataManipulator = function () {
    /**
     * Class to get a consistent standard for the engine to be able to filter objects, when retrieving or sorting them.
     *
     * @class MapDataManipulator
     * @constructor
     * @param {Array|Object} rules        REQUIRED. The rules that apply for this instance. Multiple rules in Array or one as Object.
     **/

    function MapDataManipulator(rules) {
      _classCallCheck(this, MapDataManipulator);

      this.rules = Array.isArray(rules) ? rules : [rules];
      this.layerClasses = [mapLayers.MapLayer, mapLayers.MapLayerParent];
    }

    _createClass(MapDataManipulator, [{
      key: "filterSubcontainers",
      value: function filterSubcontainers(subcontainers) {
        if (!Array.isArray(subcontainers)) {
          return this._runRules(subcontainers);
        }
      }
    }, {
      key: "addRule",
      value: function addRule(rules) {
        this.rules.concat(rules);
      }
      /**
       * This is the actual method that runs through the rules and arranges the data
       *
       * @method _runRules
       * @private
       * @return {[type]} [description]
       **/

    }, {
      key: "_runRules",
      value: function _runRules(object) {
        var _this = this;

        var foundObjects;

        this.rules.forEach(function (rule) {
          if (rule.type === "filter") {
            switch (rule.object) {
              case "container":
                foundObjects = _this._getContainer(object, rule);
                break;
              case "object":
                foundObjects = _this._getObject(object, rule);
                break;
            }
          }
        });

        return foundObjects;
      }
      /**
       * This is the actual method that runs through the rules and arranges the data
       *
       * @todo Refactor
       *
       * @method _getContainer
       * @private
       * @return {[type]} [description]
       **/

    }, {
      key: "_getContainer",
      value: function _getContainer(object, rule) {
        if (object && (object.parent instanceof this.layerClasses[0] || object && object.parent instanceof this.layerClasses[1])) {
          return object.parent[rule.property] === rule.value;
        } else if (object && object.parent && (object.parent.parent instanceof this.layerClasses[0] || object.parent.parent instanceof this.layerClasses[0])) {
          return object.parent.parent[rule.property] === rule.value;
        }
      }
      /**
       * This is the actual method that runs through the rules and arranges the data
       *
       * @todo Refactor
       *
       * @method _getContainer
       * @private
       * @return {[type]} [description]
       **/

    }, {
      key: "_getContainer",
      value: function _getContainer(object, rule) {
        if (object && (object.parent instanceof this.layerClasses[0] || object && object.parent instanceof this.layerClasses[1])) {
          return object.parent[rule.property] === rule.value;
        } else if (object && object.parent && (object.parent.parent instanceof this.layerClasses[0] || object.parent.parent instanceof this.layerClasses[0])) {
          return object.parent.parent[rule.property] === rule.value;
        }
      }
    }]);

    return MapDataManipulator;
  }();

  window.flatworld.MapDataManipulator = MapDataManipulator;
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/

  var scope;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
   * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and bringing the unit on top in the map. UI themes must implement this core UI module
   *
   * @todo Not implemented fully yet and probably need refactoring
   *
   * @class UI
   * @constructor
   * @param {Object} UITheme        Module that will be used for the UI theme
   * @param {Map} givenMap          Map instance that is used
   * @return {Object}               UI module
  */
  function UI(UITheme, givenMap) {
    var map;

    /* SINGLETON MODULE */
    if (scope) {
      return scope;
    }

    if (!UITheme || !givenMap) {
      throw new Error("UI-module requires UITheme and map object");
    }

    map = givenMap;
    scope = {};

    /**
     * Responsible for showing selection element, where the player select the wanted object out of array of objects.
     * For example if there are several objects in one tile on the map and the player needs to be able to select one
     * specific unit on the stack. This is always defined in the UI theme-module
     *
     * @method showSelections
     * @static
     * @param  {Array} objects     Objects that have been selected.
     * @param {Object} getDatas       This is an object made of functions, that get wanted data from the object. For example if you have objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name  Retrieves object name
     * @param {Object} options        Extra options
     * @return {Boolean}
     * */
    scope.showSelections = function (objects, getDatas, options) {
      objects = filterObjectsForHighlighting(objects);

      if (objects.length === 1) {
        return UITheme.highlightSelectedObject(objects[0], getDatas);
      } else if (objects.length > 1) {
        return UITheme.showSelections(objects, getDatas);
      }

      return "No objects found";
    };
    /**
     * Resonsible for hignlighting the selected object. For example the unit that is being commanded. The hightlight
     * can mean e.g. bringing the unit on top on the map and showing selection circle around it.
     *
     * @method highlightSelectedObject
     * @static
     * @param  {Object} object        Object that has been selected.
     * @param {Object} getDatas       This is an object made of functions, that get wanted data from the object. For example if you have objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name  Retrieves object name
     * @param {Object} options        Extra options. Like dropping a shadow etc.
     * */
    scope.highlightSelectedObject = function (object, getDatas, options) {
      UITheme.highlightSelectedObject(object);
    };
    /**
     * Shows arrow or movement or what ever to indicate the selected unit is moving to the given location
     *
     * @method showUnitMovement
     * @static
     * */
    scope.showUnitMovement = function (object, from, to, options) {
      UITheme.showUnitMovement(object, from, to, options);
    };

    return scope;
  }
  /*--------------------------------
  ------------ PRIVATE -------------
  --------------------------------*/
  /**
   * This is a general function which filters only highlightable object for use in UI operations
   *
   * @static
   * @method filterObjectsForHighlighting
   * @param  {Array} objects
   */
  function filterObjectsForHighlighting(objects) {
    var newObjects = objects.filter(function (obj) {
      return obj.highlightable === true ? true : false;
    });

    return newObjects;
  }

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.UI = UI;
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var utils = window.flatworld.utils;
  var arrays = window.flatworld.generalUtils.arrays;

  /*---------------------
  --------- API ---------
  ----------------------*/

  var ObjectManager = function () {
    /**
     * this module is responsible for doing hitTesting, like returning the units on certain clicked coordinates or when objects or areas collide with each other.
     *
     * @class ObjectManager
     * @constructor
     * @param {object} hitDetector Object or function that handles hit detection. This can be omitted in many cases
     * @todo It might be a good idea to make the hitDetection more extensive. Now it just uses point or rectangle / bounds to detect hits. It could use sprites or forms.
     */

    function ObjectManager(hitDetector) {
      _classCallCheck(this, ObjectManager);

      this.hitDetector = hitDetector || {};
    }
    /**
     * Retrieve objects under certain coordinates or area, if size is given. Uses subcontainers when used, no other options yet.
     *
     * @method retrieve
     * @param {Object} allCoords                                The coordinates which we want to hitTest
     * @param {x:Integer, y:Integer} allCoords.globalCoords     Global coordinates on static layer / canvas
     * @param {x:Integer, y:Integer} allCoords.globalCoords.x
     * @param {x:Integer, y:Integer} allCoords.globalCoords.y
     * @param {Object} allCoords.localCoords                    Local coordiantes on movable layer
     * @param {x:Integer, y:Integer} allCoords.localCoords.x
     * @param {x:Integer, y:Integer} allCoords.localCoords.y
     * @param {string} type                                     type of the object / layer that we want to retrieve
     * @param {Object} options                                  optional options
     * @param {Array} options.subcontainers                     The subcontainers we match against
     * @param {Object} options.size                             Size of the rectangle area to match against, if we want to match rectangle instead of one point
     * @param {Integer} options.size.width
     * @param {Integer} options.size.height
     * @return {Array}                                          matched objects
     */


    _createClass(ObjectManager, [{
      key: 'retrieve',
      value: function retrieve(allCoords) {
        var _this = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? { type: false, subcontainers: [], size: { width: 0, height: 0 } } : arguments[1];
        var subcontainers = options.subcontainers;
        var size = options.size;
        var type = options.type;
        var globalCoords = allCoords.globalCoords;
        var localCoords = allCoords.localCoords;

        var foundObjs = [];

        if (subcontainers.length > 0) {
          subcontainers.forEach(function (container) {
            foundObjs = foundObjs.concat(container.children);
          });

          if (!size.width || !size.height) {
            foundObjs = foundObjs.filter(function (obj) {
              if (type && type !== obj.type) {
                return false;
              }

              var isHit = obj.hitTest ? obj.hitTest(globalCoords, { hitDetector: _this.hitDetector }) : true;

              return isHit;
            });
          }
        }

        return foundObjs;
      }
    }]);

    return ObjectManager;
  }();

  window.flatworld.ObjectManager = ObjectManager;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/

  var utils = window.flatworld.utils;
  var PIXI = window.PIXI;

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  var ObjectSprite = function (_PIXI$Sprite) {
    _inherits(ObjectSprite, _PIXI$Sprite);

    /**
     * The base class of all sprite objects
     *
     * @class ObjectSprite
     * @constructor
     * @extends PIXI.Sprite
     * @param {PIXI.Point} coords                         the coordinate where the object is located at, relative to it's parent
     * @param {Object} data                               objects data, that will be used in the game. It will not actually be mainly used in graphical but rather things  like unit-data and city-data presentations etc.
     * @param {Object} options.currFrame       currFrame the current frames number. This is basically the initial image, we can change it later for animation or such
     */

    function ObjectSprite() {
      var coord = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? { currentFrame: {} } : arguments[2];

      _classCallCheck(this, ObjectSprite);

      var currentFrame = options.currentFrame;


      /* We need to round the numbers. If there are decimal values, the graphics will get blurry */

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectSprite).call(this, currentFrame));

      var exactCoords = {
        x: Math.round(coord.x),
        y: Math.round(coord.y)
      };
      _this.position.set(exactCoords.x, exactCoords.y);
      /**
       * Name of the object. Used mostly for debugging
       *
       * @attribute
       * @type {String}
       */
      _this.name = "Objects_sprite_" + _this.id;
      /**
       * Type of the object. Can be used for filtering, ordering or finding correct objects.
       *
       * @attribute
       * @type {String}
       */
      _this.type = "None";
      /**
       * Is the object highligtable.
       *
       * @attribute
       * @type {Boolean}
       */
      _this.highlightable = true;
      /**
       * Objects custom data. Holds unit statistics and most data. Like unit movement speed etc.
       *
       * @attribute
       * @type {Object}
       */
      _this.data = data;
      /**
       * Current frame (from spritesheet) we are showing.
       *
       * @attribute
       * @type {Number}
       */
      _this.currentFrame = currentFrame;
      /**
       * Object area width in pixels.
       *
       * @attribute
       * @type {Number}
       */
      _this.areaWidth = _this.width;
      /**
       * Object area height in pixels.
       *
       * @attribute
       * @type {Number}
       */
      _this.areaHeight = _this.height;
      return _this;
    }
    /**
     * Drawing the object
     *
     * @method innerDraw
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @return this object instance
     */


    _createClass(ObjectSprite, [{
      key: "innerDraw",
      value: function innerDraw(x, y) {
        this.fromFrame(this.currentFrame);
        this.x = x;
        this.y = y;

        return this;
      }
      /**
       * Draws new frame to animate or such
       *
       * @method drawNewFrame
       * @param {Number} x                coordinate x
       * @param {Number} y                coordinate y
       * @param {Number} newFrame         New frame number to animate to
       * @return this object instance
       */

    }, {
      key: "drawNewFrame",
      value: function drawNewFrame(x, y, newFrame) {
        this.currentFrame = newFrame;

        return this.innerDraw(x, y);
      }
      /**
       * Get the area that is reserved for the graphical presenation of this object as a rectangle.
       *
       * @method getGraphicalArea
       * @param  {Object} options       toGlobal: Boolean. Should the method return global coordinates or local (movableLayer)
       * @return {AreaSize}               { x: Number, y: Number, width: Number, height: Number}
       */

    }, {
      key: "getGraphicalArea",
      value: function getGraphicalArea() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? { toGlobal: true } : arguments[0];

        var coordinates;

        coordinates = options.toGlobal ? this.toGlobal(new PIXI.Point(0, 0)) : this;

        return {
          x: Math.round(coordinates.x),
          y: Math.round(coordinates.y),
          width: Math.round(this.width),
          height: Math.round(this.height)
        };
      }
      /**
       * Coordinate conversion: localToLocal
       *
       * @method localToLocal
       * @param  {Number} x                  X coordinate
       * @param  {Number} y                  Y coordinate
       * @param  {Object} target             PIXI.DisplayObject. The DisplayObject where we should target the coordinates for
       * @return  {{PIXI.Point}} point       PIXI.Point. Coordinates.
       * @return {Coordinates}
       */

    }, {
      key: "localToLocal",
      value: function localToLocal(x, y, target) {
        var globalCoords = this.toGlobal({ x: x, y: y });
        var targetLocalCoords = target.toLocal(globalCoords);

        return targetLocalCoords;
      }
      /**
       * Clone object
       *
       * @method clone
       * @param  {Object} renderer              PIXI renderer
       * @param  {Object} options               position: Boolean, anchor: Boolean
       * @return {Object}                       cloned object
       */

    }, {
      key: "clone",
      value: function clone(renderer) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { position: false, anchor: false } : arguments[1];

        var newSprite = new PIXI.Sprite();

        newSprite.texture = this.generateTexture(renderer);

        if (options.anchor) {
          newSprite.anchor = Object.assign({}, this.anchor);
        }
        if (options.position) {
          newSprite.position = Object.assign({}, this.position);
        }

        return newSprite;
      }
    }]);

    return ObjectSprite;
  }(PIXI.Sprite);

  var ObjectSpriteTerrain = function (_ObjectSprite) {
    _inherits(ObjectSpriteTerrain, _ObjectSprite);

    /**
     * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
     * inherited, depending on the map type. For example you might want to add some click area for these
     *
     * @class ObjectSpriteTerrain
     * @constructor
     * @extends ObjectSprite
     * @param {Coordinates} coords        format: {x: Number, y: Number}. Coordinates for the object relative to it's parent
     * @param {object} data               This units custom data
     * @param {object} options            other specific options for constructing this terrain
     */

    function ObjectSpriteTerrain(coords, data, options) {
      _classCallCheck(this, ObjectSpriteTerrain);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectSpriteTerrain).call(this, coords, data, options));

      _this2.name = "DefaultTerrainObject";
      _this2.type = "terrain";
      _this2.highlightable = false;
      return _this2;
    }

    return ObjectSpriteTerrain;
  }(ObjectSprite);

  var ObjectSpriteUnit = function (_ObjectSprite2) {
    _inherits(ObjectSpriteUnit, _ObjectSprite2);

    /**
     * Map unit like infantry or worker, usually something with actions or movable. Usually these are extended, depending on the map type. For example you might want to add some click area for these (e.g. hexagon)
     *
     * @class ObjectSpriteUnit
     * @constructor
     * @extends ObjectSprite
     * @requires graphics
     * @param {Object} coords               Coordinates for the object relative to it's parent
     * @param {Integer} coords.x            X coordinate
     * @param {Integer} coords.y            Y coordinate
     * @param {object} data                 This units data
     * @param {object} options              other specific options for constructing this unit, like options.throwShadow
     * @param {object} options.throwShadow  Can we throw a shadow under this object
     */

    function ObjectSpriteUnit(coords, data, options) {
      _classCallCheck(this, ObjectSpriteUnit);

      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectSpriteUnit).call(this, coords, data, options));

      _this3.name = "DefaultUnitObjects";
      _this3.type = "unit";
      /**
       * actions bound to this object. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
       *
       * @attribute actions
       * @type {Object}
       */
      _this3.actions = {
        move: [],
        attack: []
      };
      return _this3;
    }
    /**
     * Execute action on units (move, attack etc.). @todo THIS HAS NOT BEEN IMPLEMENTED YET!
     *
     * @method  doAction
     * @param {String} type
     */


    _createClass(ObjectSpriteUnit, [{
      key: "doAction",
      value: function doAction(type) {
        this.actions[type].forEach(function (action) {
          action();
        });
      }
      /**
       * Add certain action type. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
       *
       * @method addActionType
       * @param {String} type
       */

    }, {
      key: "addActionType",
      value: function addActionType(type) {
        this.actions[type] = this.actions[type] || [];
      }
      /**
       * Attach callback for the certain action type. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
       *
       * @method addCallbackToAction
       * @param {String} type
       * @param {Function} cb
       */

    }, {
      key: "addCallbackToAction",
      value: function addCallbackToAction(type, cb) {
        this.actions[type].push(cb);
      }
      /**
       * @method dropShadow
       */

    }, {
      key: "dropShadow",
      value: function dropShadow() {
        var _utils$effects;

        return (_utils$effects = utils.effects).dropShadow.apply(_utils$effects, arguments);
      }
    }]);

    return ObjectSpriteUnit;
  }(ObjectSprite);

  window.flatworld.objects.ObjectSprite = ObjectSprite;
  window.flatworld.objects.ObjectSpriteTerrain = ObjectSpriteTerrain;
  window.flatworld.objects.ObjectSpriteUnit = ObjectSpriteUnit;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  /* global System, Q */
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var Q = window.flatworld_libararies.Q;
  var Howl = window.flatworld_libararies.Howler;
  var utils = window.flatworld.utils;
  var log = window.flatworld.mapLayers;

  /*---------------------
  --------- API ---------
  ----------------------*/

  var Sound = function () {
    function Sound() {
      _classCallCheck(this, Sound);

      this._allSounds = {};
    }
    /**
     * Add a sound to be used.
     *
     * @method add
     * @param {String} name               Name / identifier
     * @param {String} urls               An array of urls or one url
     * @param {Object} options            *OPTIONAL*
     * @param {Booleam} options.loop      Wether the sound will be looped or not
     * @param {Object} options.volume     The volume of the sound (0 - 1)
     * @return {Object}                   Created instance of sound
     */


    _createClass(Sound, [{
      key: "add",
      value: function add(name, url) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? { loop: false, volume: 1 } : arguments[2];

        var ERROR_STRING = "The sound '" + name + "' was unable to load!";
        var loop = options.loop;
        var volume = options.volume;


        this._allSounds[name] = {};
        this._allSounds[name] = new Howl({
          urls: [url],
          autoplay: false,
          loop: loop,
          volume: volume
        });

        return this._allSounds[name];
      }
      /**
       * Remove the sound from usage and memory
       *
       * @method remove
       * @param {String} name     Name / identifier of the sound to be removed
       */

    }, {
      key: "remove",
      value: function remove(name) {
        delete this._allSounds[name];
      }
      /**
       * Start the sounds playback
       *
       * @method play
       * @param  {String} name      Name of the sound to play
       */

    }, {
      key: "play",
      value: function play(name) {
        var promise = Q.defer();

        this._allSounds[name]._onend = function () {
          promise.resolve(true);
        };
        this._allSounds[name].play();
      }
      /**
       * stop sound playback
       *
       * @method stop
       * @param  {String} name      Name of the sound to stop playing
       */

    }, {
      key: "stop",
      value: function stop(name) {
        this._allSounds[name].stop();
      }
      /**
       * Fade the sound in or out
       *
       * @method  fade
       * @param  {String} name            Name / identifier of the sound
       * @param  {Object} from            Volume to fade from
       * @param  {Object} to              Volume to fade to
       * @param  {Object} duration        Time in milliseconds to fade
       * @return {Promise}                Promise that resolves after fade is complete
       */

    }, {
      key: "fade",
      value: function fade(name, from, to, duration) {
        var promise = Q.defer();
        var cb;
        cb = function cb() {
          promise.resolve(true);
        };

        this._allSounds[name].fade(from, to, duration, cb);

        return promise.promise;
      }
    }]);

    return Sound;
  }();

  window.flatworld.Sound = Sound;
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';
  /*---------------------
  ------ VARIABLES ------
  ----------------------*/

  var styleSheetElement, allCSSClasses;

  /*---------------------
  --------- API ---------
  ----------------------*/

  var UITemplateBase = function () {
    /**
     * The template base class for UI templates
     *
     * @todo This needs a bit of redesign.
     *
     * @class UITemplateBase
     * @constructor
     * @param  {*} CSSClasses
     */

    function UITemplateBase(CSSClasses) {
      _classCallCheck(this, UITemplateBase);

      allCSSClasses = CSSClasses;
      styleSheetElement = this.addStyleElement();
      /* For testing. This is deeefinitely supposed to not be here, but it has stayed there for testing. */
      var createdCSS = "\n        " + allCSSClasses.select + " {\n          z-index: 9999;\n          opacity: 0.9;\n          position: fixed;\n          left: 0px;\n          bottom: 0px;\n          background-color: brown;\n          border: 1px solid rgb(255, 186, 148);;\n          border-bottom: 0px;\n          padding:15px;\n          margin-left:10px;\n        }";
      this.addCSSRulesToScriptTag(styleSheetElement, createdCSS);
    }
    /**
     * Get the stylesheet element. Where are the defined CSS is
     *
     * @method getStyleSheetElement
     * @return {HTMLElement}
     */


    _createClass(UITemplateBase, [{
      key: "getStyleSheetElement",
      value: function getStyleSheetElement() {
        return styleSheetElement;
      }
      /**
       * @method getCSSClasses
       */

    }, {
      key: "getCSSClasses",
      value: function getCSSClasses() {
        return allCSSClasses;
      }
      /**
       * @method addCSSRulesToScriptTag
       *
       * @param {Object} sheet
       * @param {Object} rules
       */

    }, {
      key: "addCSSRulesToScriptTag",
      value: function addCSSRulesToScriptTag(sheet, rules) {
        sheet.insertRule(rules, 0);
      }
      /**
       * @method addStyleElement
       */

    }, {
      key: "addStyleElement",
      value: function addStyleElement() {
        var _styleElement = document.createElement("style");
        // WebKit hack :(
        _styleElement.appendChild(document.createTextNode(""));
        document.head.appendChild(_styleElement);

        return _styleElement.sheet;
      }
      /**
       * @method showModal
       *
       * @param {HTMLElement} modalElem
       * @param {Object} cssClasses
       * @todo make sure / check, that modalElem.classList.add gets added only once
       */

    }, {
      key: "showModal",
      value: function showModal(modalElem, cssClasses) {
        modalElem.classList.add(cssClasses.select);
        /* Would be HTML 5.1 standard, but that might be a long way
          this.modal.show();*/
      }
    }]);

    return UITemplateBase;
  }();

  window.flatworld.UITemplateBase = UITemplateBase;
})();
"use strict";

(function () {
  /* global Hammer, Hamster */
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/

  var eventListeners = window.flatworld.eventListeners;

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.extensions.baseEventlisteners = baseEventlistenersModule();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Core plugin. Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the eventlistener management.
   *
   * @class baseEventlisteners
   * @requires Hammer.js (for touch events)
   * @requires Hamster.js (for good cross-browser mousewheel events)
   * @param {HTMLElement} canvasElement   The canvas element we listen events from. Will try to search the first canvas in the DOM, if none is provided
   */
  function baseEventlistenersModule() {
    var CBs = {};
    var hammer, hamster, fullSize, fullscreen, zoom, drag, select, boundResizer;

    /*---------------------------
    ----------- API -------------
    ---------------------------*/
    return {
      init: init,
      pluginName: "baseEventlisteners"
    };

    function init(map) {
      hammer = new Hammer.Manager(map.canvas);
      hamster = new Hamster(map.canvas);

      eventListeners.setDetector("fullSize", toggleFullSize().on, toggleFullSize().off);
      eventListeners.setDetector("fullscreen", toggleFullscreen().on, toggleFullscreen().off);
      eventListeners.setDetector("zoom", toggleZoom().on, toggleZoom().off);
      eventListeners.setDetector("drag", toggleDrag().on, toggleDrag().off);
      eventListeners.setDetector("select", toggleSelect().on, toggleSelect().off);

      map.setPrototype("setFullsize", function () {
        /* We set this only once */
        boundResizer = boundResizer || map._resizeCanvas.bind(map);

        eventListeners.on("fullSize", boundResizer);
      });
      map.setPrototype("setFullScreen", function () {
        eventListeners.on("fullscreen", map._setFullScreen.bind(map));
      });
    }

    /**
     * Sets the canvas to fullsize as in the same size of the window / content area. But not fullscreen. Note that
     *
     * @method toggleFullSize
     * @private
     * @static
     */
    function toggleFullSize() {
      return {
        on: function on(cb) {
          window.addEventListener("resize", cb);
        },
        off: function off(cb) {
          window.removeEventListener("resize", cb);
        }
      };
    }
    /**
     * Sets the browser in fullscreen mode.
     *
     * @method toggleFullscreen
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleFullscreen() {
      return {
        on: function on(cb) {
          window.addEventListener("fullscreen", cb);
        },
        off: function off(cb) {
          window.removeEventListener("fullscreen", cb);
        }
      };
    };
    /**
     * Zoom the map. Mousewheel (desktop) and pinch (mobile)
     *
     * @method toggleZoomListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleZoom() {
      return {
        on: function on(cb) {
          var pinch = new Hammer.Pinch();

          hammer.add(pinch);
          hammer.on("pinch", cb);
          /* Hamster handles wheel events really nicely */
          hamster.wheel(cb);
        },
        off: function off(cb) {
          hammer.on("pinch", cb);
          hamster.unwheel(cb);
        }
      };
    };
    /**
     * DragListener (normally used for moving the map)
     *
     * @method toggleDragListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleDrag() {
      return {
        on: function on(cb) {
          var pan = new Hammer.Pan({
            pointers: 1,
            threshold: 5,
            direction: Hammer.DIRECTION_ALL });
          hammer.add(pan);
          hammer.on("pan", cb);
        },
        off: function off(cb) {
          hammer.off("pan", cb);
        }
      };
    };
    /**
     * Selecting something from the map
     *
     * @method toggleSelectListener
     * @static
     * @param {Function} cb     Callback that fires when this event activates
     * @return {Boolean}        Return the state of this event
     */
    function toggleSelect() {
      return {
        on: function on(cb) {
          var tap = new Hammer.Tap();
          hammer.add(tap);
          hammer.on("tap", cb);
        },
        off: function off(cb) {
          hammer.off("tap", cb);
        }
      };
    }
  }
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var eventListeners = window.flatworld.eventListeners;
  var utils = window.flatworld.utils;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.extensions.mapDrag = setupMap_drag();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Core plugin for the engine. Handles moving the map by dragging the map with mouse or touch event. Core plugins can always be overwrote if needed.
   *
   * @class mapDrag
   * @requires Hammer.js - Mobile part requires
   * @return {Object}      init, _startDragListener
   */
  function setupMap_drag() {
    /* Function for setting and getting the mouse offset. Private functions declared bottom */
    var offsetCoords = _offsetCoords();
    var mapMoved = false;
    var eventListenerCB;

    /*--------------------
    ------- API ----------
    --------------------*/
    return {
      init: init,
      pluginName: "mapDrag",
      _startDragListener: _startDragListener /* Function revealed for testing */
    };

    /*---------------------
    -------- PUBLIC -------
    ----------------------*/
    /**
     * Required init functions for the plugin
     *
     * @method init
     * @param {Map} mapObj        The current instance of Map class
     * */
    function init(map) {
      eventListenerCB = _startDragListener(map);

      /* Singleton should have been instantiated before, we only retrieve it with 0 params */
      eventListeners.on("drag", eventListenerCB);
    }

    /*---------------------
    -------- PRIVATE ------
    ----------------------*/
    /**
     * Mobile version. Starts the functionality, uses Hammer.js heavily for doing the drag. More simple and better than
     * desktop version, since we don't need to calculate the drag with several event listener, one is enough with Hammer
     *
     * @private
     * @static
     * @method _startDragListener
     * @param {Map} map           The current instance of Map class
     */
    function _startDragListener(map) {
      var initialized = false;

      return function startDrag(e) {
        var coords;

        if (eventListeners.getActivityState("zoom")) {
          return false;
        }
        coords = utils.mouse.eventData.getHAMMERPointerCoords(e);

        mapMoved = true;

        coords.x = Math.round(coords.x);
        coords.y = Math.round(coords.y);

        if (!initialized) {
          offsetCoords.setOffset({
            x: coords.x,
            y: coords.y
          });
          initialized = true;

          return;
        } else if (e.isFinal === true) {
          initialized = false;
          mapMoved = false;
        }

        _mapMovement(e, map, coords);
      };
    }

    /**
     * This handles offset Changes and setting data has map been moved based on it. Also
     * sets basic settings like preventDefault etc.
     *
     * @private
     * @static
     * @method _mapMovement
     * @param  {Event} e                        The event being dealt with
     * @param  {Map} map                        The current instance of Map class
     * @param  {Coordinates} coords             Current pointer coordinates
     */
    function _mapMovement(e, map, coords) {
      var offset, moved;

      offset = offsetCoords.getOffset();
      moved = {
        x: coords.x - offset.x,
        y: coords.y - offset.y
      };

      if (moved.x > 0 || moved.y > 0 || moved.x < 0 || moved.y < 0) {
        map.moveMap(moved);
      } else {
        mapMoved = false;
      }

      offsetCoords.setOffset({
        x: coords.x,
        y: coords.y
      });

      e.preventDefault();
    }
    /**
     * Function for setting and getting the mouse offset.
     * Offset is the distance from the left upper coordinates (global 0, 0 coordinates) on the canvas, to the current /
     * last known mouse coordinates
     *
     * @private
     * @static
     * @method _offsetCoords
     */
    function _offsetCoords() {
      var offsetCoords;

      return {
        setOffset: setOffset,
        getOffset: getOffset
      };

      function setOffset(coords) {
        return offsetCoords = coords;
      }
      function getOffset() {
        return offsetCoords;
      }
    }
  }
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var eventListeners = window.flatworld.eventListeners;
  var utils = window.flatworld.utils;
  var mapEvents = window.flatworld.mapEvents;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.extensions.mapZoom = setupMap_zoom();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Core plugin for the engine. Handles zooming for the map. Core plugins can always be overwrote if needed. Zooming happens when the user scrolls the mousewheel or in mobile, pinches the screen.
   *
   * @class mapZoom
   * @return {Object}      init
   */
  function setupMap_zoom() {
    /*---------------------
    ------ VARIABLES ------
    ----------------------*/
    var TIMEOUT_AFTER_ZOOM = 40;
    var initialized = false;
    var mobileInitialized = false;
    var difference = {};
    var map;
    /**
     * Maximum and minimum amount, the player can zoom the map
     *
     * @attribute zoomLimit
     * @type {{ farther: Number, closer: Number }}
     */
    var zoomLimit = {
      farther: 0.4,
      closer: 2.5
    };
    /**
     * How much one step of zooming affects
     *
     * @attribute zoomModifier
     * @type {Number}
     */
    var zoomModifier = 0.1;

    /*---------------------
    --------- API ---------
    ---------------------*/
    return {
      init: init,
      pluginName: "mapZoom"
    };

    /*---------------------
    ------- PUBLIC --------
    ----------------------*/
    /**
     * Required init functions for the plugin
     *
     * @method init
     * @param {Map} mapObj       instantiated Map class object
     *
     * @todo think through should setZoomLimits and setZoomModifier be in map.prototype?
     * But zoomLimit and modifier need to be setable in creation, init or later with setters
     **/
    function init(thisMap) {
      map = thisMap;
      map.setPrototype("zoomIn", zoomIn);
      map.setPrototype("zoomOut", zoomOut);
      map.setPrototype("setZoomLimits", setZoomLimits);
      map.setPrototype("setZoomModifier", setZoomModifier);

      /* Singleton should have been instantiated before, we only retrieve it with 0 params */
      eventListeners.on("zoom", unifiedEventCB);
    }

    /*----------------------------------------
    ------ PROTOTYPE extensions for map ------
    ----------------------------------------*/
    /**
     * How much one mouse wheel step zooms
     *
     * @method setZoomModifier
     * @param {Number} amount           How much one mouse wheel step zooms. Needs to be in between 0 - 0.5
     **/
    function setZoomModifier(amount) {
      if (!(amount > 0 || amount <= 0.5)) {
        throw new Error("Wrong zoom modifier! (needs to be >0 and <=0.5, given:" + amount);
      }
      zoomModifier = amount;

      return this;
    }
    /**
     * How much can be zoomed in maximum and minimum
     *
     * @method setZoomLimits
     * @param {Number} farther          (>1) How much one mouse wheel step zooms out
     * @param {Number} closer           (0 - 1) How much one mouse wheel step zooms in
     **/
    function setZoomLimits(farther, closer) {
      zoomLimit.farther = farther;
      zoomLimit.closer = closer;

      return this;
    }
    /**
     * Zoom in to the map
     *
     * @method zoomIn
     * @param {Number} amount how much map is zoomed in
     * */
    function zoomIn(amount) {
      var presentScale = this.getZoom();
      var IS_ZOOM_IN = true;

      mapEvents.publish("mapZoomed", { presentScale: presentScale, amount: amount, isZoomIn: IS_ZOOM_IN });

      return _zoom(this, presentScale, Math.abs(amount) || zoomModifier, IS_ZOOM_IN);
    }
    /**
     * Zoom out of the map
     *
     * @method zoomOut
     * @param {Number} amount how much map is zoomed out
     * */
    function zoomOut(amount) {
      var presentScale = this.getZoom();
      var IS_ZOOM_IN = false;

      amount = amount < 0 ? amount : -amount;
      mapEvents.publish("mapZoomed", { presentScale: presentScale, amount: amount, isZoomIn: IS_ZOOM_IN });

      return _zoom(this, presentScale, amount || -zoomModifier, IS_ZOOM_IN);
    }

    /*---------------------------
    ------ EVENT FUNCTIONS ------
    ---------------------------*/
    /**
     * This starts the correct eventListener for the current environment. Mousewheel and pinch differ quite dramatically
     * so we keep them as separate functions.
     *
     * @method unifiedEventCB
     * @param  {Event} e             Event object
     * @param  {Integer} delta       Hamster.js provided delta
     * @param  {Integer} deltaX      Hamster.js provided delta
     * @param  {Integer} deltaY      Hamster.js provided delta
     */
    function unifiedEventCB(e, delta, deltaX, deltaY) {
      if (delta) {
        handleZoomEventDesktop(e, delta, deltaX, deltaY);
      } else if (e.pointers) {
        if (!mobileInitialized) {
          mobileInitialized = true;
          setZoomModifier(zoomModifier * 0.5);
        }
        handleZoomEventMobile(e);
      }
    }
    /**
     * Setup desktop zoomEvent by currying. Internally: Sets up correct scale + moves map accordingly to zoom to the
     * current center coordinates
     *
     * @method handleZoomEventDesktop
     * @param  {Map} map             Map instance
     */
    function handleZoomEventDesktop(e, delta, deltaX, deltaY) {
      var mouseWheelDelta = deltaY;
      /* Scale changes when the map is drawn. We make calculations with the old scale before draw */
      var oldScale = map.getZoom();

      /* No nasty scrolling side-effects */
      e.preventDefault();

      if (mouseWheelDelta > 0) {
        if (map.zoomIn()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale, true), _calculateCenterMoveCoordinates(map.getZoom(), true));
        }
      } else if (mouseWheelDelta < 0) {
        if (map.zoomOut()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale), _calculateCenterMoveCoordinates(map.getZoom()));
        }
      }
    }
    /**
     * handleZoomEventMobile
     *
     * @method handleZoomEventMobile
     * @param  {Event} e
     */
    function handleZoomEventMobile(e) {
      var pointers = e.pointers;
      var coords = [{
        x: pointers[0].pageX,
        y: pointers[0].pageY
      }, {
        x: pointers[1].pageX,
        y: pointers[1].pageY
      }];
      var changeX = Math.abs(coords[0].x - coords[1].x);
      var changeY = Math.abs(coords[0].y - coords[1].y);

      e.preventDefault();

      try {
        if (!initialized) {
          difference = {
            x: changeX,
            y: changeY
          };
          eventListeners.setActivityState("zoom", true);
          initialized = true;

          return;
        } else if (e.eventType === 4 || e.eventType === 8) {
          /* e.eventType 4 = event canceled, e.eventType 8 = event finished */
          /* We don't want another event to be fired right after a pinch event. It makes the zoomign experience rather
           * bad if after zoom there is immediately an unexplainable drag and the map moves a bit
           * */
          window.setTimeout(function () {
            eventListeners.setActivityState("zoom", false);
          }, TIMEOUT_AFTER_ZOOM);
          initialized = false;
        }

        if (difference.x + difference.y < changeX + changeY) {
          if (map.zoomIn()) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getZoom(), true));
          }
        } else {
          if (map.zoomOut()) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getZoom()));
          }
        }

        difference = {
          x: changeX,
          y: changeY
        };
      } catch (ev) {
        console.log("Error! ", ev);
      }
    }

    /*---------------------
    ------- PRIVATE -------
    ---------------------*/
    /**
     * _isOverZoomLimit
     *
     * @private
     * @static
     * @method _isOverZoomLimit
     **/
    function _isOverZoomLimit(amount, isZoomIn) {
      if (isZoomIn && amount > zoomLimit.closer || !isZoomIn && amount < zoomLimit.farther) {
        return true;
      }

      return false;
    }
    /**
     * @private
     * @static
     * @method _calculateCenterMoveCoordinates
     **/
    function _calculateCenterMoveCoordinates(scale, isZoomIn) {
      var windowSize = utils.resize.getWindowSize();
      var halfWindowSize = {
        x: windowSize.x / 2 / scale,
        y: windowSize.y / 2 / scale
      };
      var realMovement = {
        x: halfWindowSize.x * (isZoomIn ? -zoomModifier : zoomModifier),
        y: halfWindowSize.y * (isZoomIn ? -zoomModifier : zoomModifier)
      };

      return realMovement;
    }
    /**
     * @private
     * @static
     * @method _zoom
     **/
    function _zoom(map, presentScale, amount, isZoomIn) {
      var newScale;

      if (!_isOverZoomLimit(presentScale, isZoomIn)) {
        newScale = map.setZoom(amount ? presentScale + amount : presentScale + zoomModifier);
      }

      return newScale;
    }
  }
})();
"use strict";

window.flatworld.extensions.hexagons = {};
window.flatworld.extensions.hexagons.utils = {};
window.flatworld.extensions.hexagons.eventlisteners = {};
"use strict";

(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  window.flatworld.extensions.hexagons.utils.calcShortDiagonal = calcShortDiagonal;
  window.flatworld.extensions.hexagons.utils.calcLongDiagonal = calcLongDiagonal;
  window.flatworld.extensions.hexagons.utils.hexaHitTest = hexaHitTest;

  /**
   * Utility module, for making different calculations and tests when hexagon based grid map in use
   *
   * @class hexagonPlugin.utils
   */
  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * Calculates the hexagons:
   * innerDiameter
   * - Vertical / Flat hexagons height
   * - Horizontal / pointy hexagons width
   *
   * @method calcLongDiagonal
   * @static
   * @param {float} value - Usually the radius of the hexagon
   * @param {string} type - If you provide something else than radius, where the calculation is based from
   * @param {integer} precision - How many decimals to round
   */
  function calcShortDiagonal(value) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? "radius" : arguments[1];
    var precision = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];

    var answer;

    precision = Math.round(precision);

    if (type === "radius") {
      answer = value * Math.sqrt(3);
    }

    return Number(answer.toFixed(precision));
  }
  /** Calculates the hexagons:
   * outerDiameter
   * - Vertical / Flat hexagons width
   * - Horizontal / pointy hexagons height
   *
   * @method calcLongDiagonal
   * @static
   * @param {float} value					Usually the radius of the hexagon
   * @param {string} type					If you provide something else than radius, where the calculation is based from
   * @param {integer} precision 	How many decimals to round
   */
  function calcLongDiagonal(value) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? "radius" : arguments[1];
    var precision = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];

    var answer;

    if (type === "radius") {
      answer = value * 2;
    }

    return Number(answer.toFixed(precision));
  }
  /**
   * Test do the given coordinates hit the hexagon, given by the points container / array
   *
   * @static
   * @method hexaHitTest
   * @param  {PIXI.Point[]} points             Array of PIXI.points
   * @param  {Object} hitCoords         The coordinates to test against
   * @param  {Integer} hitCoords.x      X coordinate
   * @param  {Integer} hitCoords.y      Y coordinate
   * @param  {Object} offsetCoords      offsetCoordinates that are added to the hitCoordinates. Separate because these are outside the given array.
   * @param  {Integer} offsetCoords.x   X coordinate
   * @param  {Integer} offsetCoords.y   Y coordinate
   * @return {Boolean}                  Is the coordinate inside the hexagon or not
   */

  function hexaHitTest(points) {
    var hitCoords = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];
    var offsetCoords = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];

    var realPolygonPoints;

    realPolygonPoints = points.map(function (point) {
      return {
        x: point.x + offsetCoords.x,
        y: point.y + offsetCoords.y
      };
    });

    return pointInPolygon(hitCoords, realPolygonPoints);
  }

  /*-----------------------
  --------- PRIVATE -------
  -----------------------*/
  /**
   * credits to: https://github.com/substack/point-in-polygon
   * Tests whether the given point / coordinate is inside the given points. Assuming the points form a polygon
   *
   * @static
   * @private
   * @method pointInPolygon
   * @param  {Object} point             The coordinates to test against
   * @param  {Integer} hitCoords.x      X coordinate
   * @param  {Integer} hitCoords.y      Y coordinate
   * @param  {Integer[]} vs             The points of the polygon to test [0] === x-point, [1] === y-point
   * @return {Boolean}                  Is the coordinate inside the hexagon or not
   */
  function pointInPolygon(point, vs) {
    var x = point.x;
    var y = point.y;
    var inside = false;
    var xi, xj, yi, yj, intersect;

    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      xi = vs[i].x;
      yi = vs[i].y;
      xj = vs[j].x;
      yj = vs[j].y;
      intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }
})();
"use strict";

(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  window.flatworld.extensions.hexagons.utils.createHexagon = createHexagon;
  window.flatworld.extensions.hexagons.utils.createVisibleHexagon = createVisibleHexagon;

  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * This manages some utility functionalities for creating hexagons
   *
   * @class hexagonPlugin.utils
   */
  /**
   * Credits belong to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js
   * Creates a hex shaped polygon that is used for the hex's hit area.
   *
   * @private
   * @static
   * @method createHexagon
   * @param {Number} radius       Radius of the hexagon
   * @param {Object} options      Options, such as: isFlatTop (Boolean), is the heaxgon flat-topped
   * @return {PIXI.Polygon}       Hexagon shaped PIXI.Polygon object. That houses the hexagons corner points.
   */
  function createHexagon(radius) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { isFlatTop: false } : arguments[1];

    var points = [];

    points = coordsToPixiPoints(radius);

    return new PIXI.Polygon(points);
  }
  /**
   * @private
   * @static
   * @method createVisibleHexagon
   * @param {Number} radius       Radius of the hexagon
   * @param {Object} options      Options, such as:
   *                              color: The fill color of the hexagon
   *                              isFlatTop (Boolean), is the heaxgon flat-topped
   * @return {PIXI.Graphics}      Graphics object that is shaped as hexagon, based on given radius and options.
   */
  function createVisibleHexagon(radius) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { color: "#000000", isFlatTop: false } : arguments[1];

    var graphics = new PIXI.Graphics();
    var points = coordsToPixiPoints(radius);

    graphics.beginFill(options.color, 1);
    graphics.drawPolygon(points);
    graphics.endFill();

    return graphics;
  }

  /*-----------------------
  --------- PRIVATE -------
  -----------------------*/
  /**
   * Converts Array of x- and y-coordinates to new PIXI.Point coordinates
   *
   * @method coordsToPixiPoints
   * @private
   * @static
   * @method coordsToPixiPoints
   * @param  {Number} radius        Hexagons radius
   * @return {Array}                Array of PIXI.Point coordinates
   */
  function coordsToPixiPoints(radius) {
    return getHexagonPoints(radius).map(function (point) {
      return new PIXI.Point(point.x, point.y);
    });
  }
  /**
   * @method getHexagonPoints
   * @private
   * @static
   * @param {Float} radius      radius of the hexagon
   * @param {object} options    extra options, like generating horizontal hexagon points and
   * how many decimals to round
  */
  function getHexagonPoints(radius) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { isFlatTop: false, precision: 3 } : arguments[1];

    var OFFSET = options.isFlatTop ? 0 : 0.5;
    var CENTER = {
      x: radius,
      y: radius
    };
    var angle = 2 * Math.PI / 6 * OFFSET;
    var x = CENTER.x * Math.cos(angle);
    var y = CENTER.y * Math.sin(angle);
    var points = [];

    points.push({ x: x, y: y });

    for (var i = 1; i < 7; i++) {
      angle = 2 * Math.PI / 6 * (i + OFFSET);
      x = CENTER.x * Math.cos(angle);
      y = CENTER.y * Math.sin(angle);

      points.push({ x: x, y: y });
    }

    return points;
  }
})();
"use strict";

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var utils = window.flatworld.utils;
  var mapEvents = window.flatworld.mapEvents;
  var UI = window.flatworld.UI;
  var MapDataManipulator = window.flatworld.MapDataManipulator;
  var eventListeners = window.flatworld.eventListeners;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.extensions.hexagons.setupHexagonClick = _setupHexagonClick;

  /*---------------------
  ------- PUBLIC --------
  ----------------------*/
  /**
   * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
   * etc. are in selectHexagonPlugin
   *
   * @class hexagonPlugin.setupHexagonClick
   * @requires Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
   * @event                 Mapselect and objectsSelected (objectsSelected will have parameter for the objects that were selected)
   * @param  {Map} map      The currently use Map instance
   * @return {Boolean}      True
   */
  function _setupHexagonClick(map) {
    var ui;

    if (!map) {
      throw new Error("eventlisteners initialization require map arguments");
    }

    ui = UI();

    eventListeners.on("select", tapListener);

    return true;

    /*----------------------
    ------- PUBLIC ---------
    ----------------------*/
    /**
     * the listener that received the event object
     *
     * @method tapListener
     * @param  {Event} e      Event object
     */
    function tapListener(e) {
      var globalCoords = utils.mouse.eventData.getHAMMERPointerCoords(e);
      var getData = {
        allData: function allData(object) {
          return object.data.typeData;
        }
      };
      var objects, filter;

      filter = new MapDataManipulator({
        type: "filter",
        object: "container",
        property: "name",
        value: "unitLayer"
      });

      objects = map.getObjectsUnderArea(globalCoords, { filter: filter });
      objects = utils.dataManipulation.mapObjectsToArray(objects);
      objects = utils.dataManipulation.flattenArrayBy1Level(objects);

      /* Throw a mapEvent if there are objects found. It might be required to throw this event later on, not yet here. */
      if (objects.length) {
        mapEvents.publish("objectsSelected", objects);
      }

      ui.showSelections(objects, getData);
      map.drawOnNextTick();
    }
  }
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/

  var _window$flatworld$obj = window.flatworld.objects;
  var ObjectSpriteTerrain = _window$flatworld$obj.ObjectSpriteTerrain;
  var ObjectSpriteUnit = _window$flatworld$obj.ObjectSpriteUnit;
  var _window$flatworld$ext = window.flatworld.extensions.hexagons.utils;
  var calcLongDiagonal = _window$flatworld$ext.calcLongDiagonal;
  var calcShortDiagonal = _window$flatworld$ext.calcShortDiagonal;
  var createHexagon = _window$flatworld$ext.createHexagon;

  /*-----------------------
  -------- VARIABLES ------
  -----------------------*/

  var shape;

  var ObjectHexaTerrain = function (_ObjectSpriteTerrain) {
    _inherits(ObjectHexaTerrain, _ObjectSpriteTerrain);

    /**
     * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are inherited, depending on the map type. For example you might want to add some click area for these
     *
     * @class hexagonPlugin.ObjectHexaTerrain
     * @constructor
     * @param  {Object} coords
     * @param  {Integer} coords.x         X coordinate
     * @param  {Integer} coords.y         Y coordinate
     * @param {object} data               This units custom data
     * @param {Object} options            options.radius REQUIRED.
     * @param {Number} options.radius     REQUIRED. This is the radius of the game maps hexagon.
     */

    function ObjectHexaTerrain(coords, data, options) {
      _classCallCheck(this, ObjectHexaTerrain);

      var radius = options.radius;

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectHexaTerrain).call(this, coords, data, options));

      _this.name = "DefaultTerrainObject_hexa";
      calculateHexa.call(_this, radius);
      return _this;
    }

    return ObjectHexaTerrain;
  }(ObjectSpriteTerrain);

  var ObjectHexaUnit = function (_ObjectSpriteUnit) {
    _inherits(ObjectHexaUnit, _ObjectSpriteUnit);

    /**
     * Map unit like infantry or worker, usually something with actions or movable. Usually these are extended, depending on the map type. For example you might want to add some click area for these (e.g. hexagon)
     *
     * @class hexagonPlugin.ObjectHexaUnit
     * @constructor
     * @param {Object} coords            This units coordinates, relative to it's parent container
     * @param {Integer} coords.x         X coordinate
     * @param {Integer} coords.y         Y coordinate
     * @param {object} data               This units custom data
     * @param {Object} options            options.radius REQUIRED
     * @param {Object} options.radius     REQUIRED. This is the radius of the game maps hexagon
     */

    function ObjectHexaUnit(coords, data, options) {
      _classCallCheck(this, ObjectHexaUnit);

      var radius = options.radius;

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectHexaUnit).call(this, coords, data, options));

      _this2.name = "DefaultUnitObjects_hexa";

      calculateHexa.call(_this2, radius);
      return _this2;
    }

    return ObjectHexaUnit;
  }(ObjectSpriteUnit);
  /*-----------------------
  --------- PRIVATE -------
  -----------------------*/
  /**
   * @private
   * @static
   * @method calculateHexa
   * @param {Number} radius       Hexagon radius
   */


  function calculateHexa(radius) {
    if (!radius) {
      throw new Error("Need radius!");
    }

    var HEIGHT = Math.round(calcLongDiagonal(radius));
    var WIDTH = Math.round(calcShortDiagonal(radius));
    var SIDE = Math.round(radius.toFixed(3));

    this.anchor.set(0.5, 0.5);
    this.areaHeight = this.HEIGHT = HEIGHT;
    this.areaWidth = this.WIDTH = WIDTH;
    this.SIDE = SIDE;
    this.ROW_HEIGHT = Math.round(HEIGHT * 0.75);

    /* Draw hexagon to test the hits with hitArea */
    this.hitArea = setAndGetShape(radius);
    this.hitTest = function (coords, options) {
      this.updateTransform();
      //map.getMovableLayer().updateTransform();
      //coords = map.getMovableLayer().toLocal(coords);
      var isHit = options.hitDetector.processInteractive(new PIXI.Point(coords.x, coords.y), this, function () /*parent, hits*/{
        console.log("Shouldn't get here, the object should be non-interactive");
      }, true, true);

      return isHit;
    };
  }
  /**
   * @private
   * @static
   * @method setAndGetShape
   * @param {Number} radius       Hexagon radius
   */
  function setAndGetShape(radius) {
    if (!shape) {
      shape = createHexagon(radius);
    }

    return shape;
  }

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.extensions.hexagons.objects = {
    ObjectHexaTerrain: ObjectHexaTerrain,
    ObjectHexaUnit: ObjectHexaUnit
  };
})();
"use strict";

(function () {
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/

  var setupHexagonClick = window.flatworld.extensions.hexagons.setupHexagonClick;

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  debugger;
  window.flatworld.extensions.hexagons.selectHexagonObject = setupObject_select_hexagon();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Handles the selection of hexagons on the map
   *
   * @class hexagonPlugin.setupObject_select_hexagon
   * @return {Object}       Return methods inside object
   */
  function setupObject_select_hexagon() {
    var map = {};

    return {
      init: init,
      pluginName: "selectHexagonObject"
    };

    /**
     * @method  init
     * @param {Map} givenMap         Instantiated Map class object
     */
    function init(givenMap) {
      map = givenMap;

      startClickListener(map);
    }

    /*-----------------------
    -------- PRIVATE --------
    -----------------------*/
    /**
     * @method startClickListener
     * @param {Map} map              Instantiated Map class object
     */
    function startClickListener(map) {
      return setupHexagonClick(map);
    }
  }
})();
"use strict";

(function () {
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/

  var mapEvents = window.flatworld.mapEvents;
  var arrays = window.flatworld.generalUtils.arrays;

  /*-----------------------
  ------- VARIABLES -------
  -----------------------*/
  var viewportWorker = new Worker("/components/map/extensions/mapMovement/mapMovementWorker.js");

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  /* For debugging. This will show up if the plugin fails to load in Map.js */
  window.flatworld.extensions.mapMovement = setupMapMovement();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /** This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise. Requires subcontainers atm.
   *
   * @class mapMovement
   **/
  function setupMapMovement() {
    var VIEWPORT_OFFSET = 0.15;
    var CHECK_INTERVAL = 20;
    var queue = {};
    var changedCoordinates = {
      width: 0,
      height: 0
    };
    var map, currentScale;

    return {
      init: init,
      pluginName: "mapMovement",
      addAll: addAll,
      check: check,
      startEventListeners: startEventListeners
    };
    /**
     * Ínitialize as a plugin
     *
     * @method init
     * @param  {Map} map     Instance of Map
     */
    function init(givenMap) {
      map = givenMap;
      currentScale = map.getZoom();

      addAll();
      startEventListeners();
      map.drawOnNextTick();

      /**
       * For debugging. Shows the amount of currectly active and inactive subcontainers. Console.logs the data. Also extends window object.
       *
       * @method window.FlaTWorld_mapMovement_subCheck
       * @static
       */
      window.FlaTWorld_mapMovement_subCheck = function () {
        map.getPrimaryLayers().forEach(function (layer) {
          var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());
          var visibleContainers, invisibleContainers;

          visibleContainers = subcontainers.filter(function (subcontainer) {
            return subcontainer.visible;
          });
          invisibleContainers = subcontainers.filter(function (subcontainer) {
            return !subcontainer.visible;
          });

          console.log("visible subcontainers: " + visibleContainers.length + ":" + visibleContainers, "\n\ninvisible: " + invisibleContainers.length + ":" + invisibleContainers);
        });
      };
      /**
       * For debugging. Sets all primaryLayers subcontainers on the map as visible = true.
       *
       * @method window.FlaTWorld_mapMovement_deactivate
       * @static
       */
      window.FlaTWorld_mapMovement_deactivate = function () {
        map.getPrimaryLayers().forEach(function (layer) {
          var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());
          var visibleContainers, invisibleContainers;

          visibleContainers = subcontainers.forEach(function (subcontainer) {
            subcontainer.visible = false;
          });
        });
      };
    }
    /**
     * Ínitialize as a plugin
     *
     * @method addAll
     * @param  {Map} map     Instance of Map
     */
    function addAll() {
      var viewportArea;

      viewportArea = map.getViewportArea();
      Object.assign(viewportArea, getViewportsRightSideCoordinates(viewportArea));
      Object.assign(viewportArea, applyScaleToViewport(viewportArea, currentScale));

      map.getPrimaryLayers().forEach(function (layer) {
        var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());

        subcontainers.forEach(function (subcontainer) {
          subcontainer.visible = isObjectOutsideViewport(subcontainer, viewportArea, false) ? false : true;
        });
      });
    }
    /**
     * This one checks the that the objects that should currently be visible in the viewport area are visible and outside
     * of the viewport objects are set .visible = false. This affect performance a lot. Basically when the map moves, we
     * set a check in the future based on the given intervalCheck milliseconds. And immediately after it we check if there
     * is another map movement. If there is we set another timeout. This works better with timeouts.
     *
     * This uses webWorkers. They seemed to speed up the check, when timing with performance.now.
     *
     * @method check
     * @param  {Map} map        The current Map instance
     * @return {Boolean}        True
     */
    function check() {
      if (queue.processing) {
        return false;
      }
      queue.processing = true;

      var viewportFn = setupHandleViewportArea(queue, changedCoordinates);
      window.setTimeout(viewportFn, CHECK_INTERVAL);

      function setupHandleViewportArea(queue, changedCoordinates) {
        var methodType = 1;
        var viewportArea, smallerViewportArea, scaledViewport, smallerScaledViewportArea;

        viewportArea = map.getViewportArea();

        smallerViewportArea = getViewportCoordinates(viewportArea, 0.5);
        Object.assign(viewportArea, getViewportCoordinates(viewportArea));

        scaledViewport = applyScaleToViewport(viewportArea);
        smallerScaledViewportArea = applyScaleToViewport(smallerViewportArea);

        viewportWorkerOnMessage(scaledViewport, smallerScaledViewportArea);
      }

      return;
    }
    /**
     * @method startEventListeners
     * @param  {Map} map     Instance of Map
     */
    function startEventListeners() {
      mapEvents.subscribe("mapMoved", moveCb);
      mapEvents.subscribe("mapResized", resizeCb);
      /* We change the scale factor ONLY if the map is zoomed. We reserve resources */
      mapEvents.subscribe("mapZoomed", zoomCb);

      function moveCb(type) {
        var movedCoordinates = type.customData[0];

        changedCoordinates.width += movedCoordinates.x;
        changedCoordinates.height += movedCoordinates.y;
        check(map);
      }
      function resizeCb() {
        check(map);
      }
      function zoomCb(newScale) {
        currentScale = newScale;
      }
    }
    /*-----------------------
    -------- PRIVATE --------
    -----------------------*/
    /**
     * @private
     * @static
     * @method isObjectOutsideViewport
     * @param  {Object}  object                 Object / layer we are testing
     * @param  {Object} viewportArea            ViewportArea location and size
     * @param  {Integer} viewportArea.x         X coordinate
     * @param  {Integer} viewportArea.y         Y coordinate
     * @param  {Integer} viewportArea.width     Viewports width (in pixels)
     * @param  {Integer} viewportArea.height    Viewports height (in pixels)
     * @param  {Boolean} hasParent              default = true
     * @return {Boolean}
     */
    function isObjectOutsideViewport(object, viewportArea) {
      var hasParent = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var isIt, globalCoords;

      globalCoords = object.getSubcontainerArea(currentScale, { toGlobal: hasParent });

      isIt = !testRectangleIntersect(globalCoords, viewportArea);

      return isIt;
    }
    /**
     * @private
     * @static
     * @method getViewportsRightSideCoordinates
     * @private
     * @param  {Object} viewportArea            ViewportArea location and size
     * @param  {Integer} viewportArea.x         X coordinate
     * @param  {Integer} viewportArea.y         Y coordinate
     * @param  {Integer} viewportArea.width     Viewports width (in pixels)
     * @param  {Integer} viewportArea.height    Viewports height (in pixels)
     */
    function getViewportsRightSideCoordinates(viewportArea) {
      var offsetSize = Math.abs(viewportArea.width * VIEWPORT_OFFSET * 2);

      return {
        x2: Math.round(viewportArea.x + Math.abs(viewportArea.width) + offsetSize),
        y2: Math.round(viewportArea.y + Math.abs(viewportArea.height) + offsetSize),
        width: Math.round(viewportArea.width + offsetSize),
        height: Math.round(viewportArea.height + offsetSize)
      };
    }
    /**
     * Calculates and modifies coordinates and size according to current scale / zoom on the map.
     *
     * @private
     * @static
     * @method applyScaleToViewport
     * @private
     * @param  {Object} viewportArea            ViewportArea location and size
     * @param  {Integer} viewportArea.x         X coordinate
     * @param  {Integer} viewportArea.y         Y coordinate
     * @param  {Integer} viewportArea.width     Viewports width (in pixels)
     * @param  {Integer} viewportArea.height    Viewports height (in pixels)
     */
    function applyScaleToViewport(viewportArea) {
      return {
        x: Math.round(viewportArea.x / currentScale),
        y: Math.round(viewportArea.y / currentScale),
        x2: Math.round(viewportArea.x2 / currentScale),
        y2: Math.round(viewportArea.y2 / currentScale),
        width: Math.round(viewportArea.width / currentScale),
        height: Math.round(viewportArea.height / currentScale)
      };
    }
    /**
     * The onmessage callback that handles things after we get reply from the worker
     *
     * @param  {Object} e   Event object from worker
     */
    function viewportWorkerOnMessage(scaledViewport, smallerScaledViewport) {
      var containersUnderChangedArea = [];
      var scaledAndChangedViewport;

      scaledAndChangedViewport = Object.assign({}, scaledViewport);

      scaledAndChangedViewport.width += Math.round(Math.abs(changedCoordinates.width));
      scaledAndChangedViewport.height += Math.round(Math.abs(changedCoordinates.height));

      /* RESET */
      changedCoordinates.width = 0;
      changedCoordinates.height = 0;

      containersUnderChangedArea = map.getPrimaryLayers().map(function (layer) {
        return layer.getSubcontainersByCoordinates(scaledAndChangedViewport);
      });
      containersUnderChangedArea = arrays.flatten2Levels(containersUnderChangedArea);

      containersUnderChangedArea.forEach(function (thisContainer) {

        if (isObjectOutsideViewport(thisContainer, smallerScaledViewport, true)) {
          thisContainer.visible = false;
        } else {
          thisContainer.visible = true;
        }
      });

      queue.processing = false;

      map.drawOnNextTick();
    }
    /**
     * forms the total viewport parameters based on the given ones.
     *
     * @private
     * @static
     * @method getViewportCoordinates
     * @param  {AreaSize} viewportArea          Given viewport area
     * @param  {Number} offsetQuantifier        How big offset we match against
     * @return {totalViewportArea}              The total viewportArea
     */
    function getViewportCoordinates(viewportArea, offsetQuantifier) {
      var offsetSize = Math.abs(viewportArea.width * VIEWPORT_OFFSET);
      offsetQuantifier = offsetQuantifier || 1;

      return {
        x: Math.round(viewportArea.x - offsetSize * offsetQuantifier),
        y: Math.round(viewportArea.y - offsetSize * offsetQuantifier),
        x2: Math.round(viewportArea.x + Math.abs(viewportArea.width) + offsetSize * offsetQuantifier),
        y2: Math.round(viewportArea.y + Math.abs(viewportArea.height) + offsetSize * offsetQuantifier),
        width: Math.round(viewportArea.width + offsetSize * 2 * offsetQuantifier),
        height: Math.round(viewportArea.height + offsetSize * 2 * offsetQuantifier)
      };
    }
    /**
     * @private
     * @static
     * @method applyScaleToViewport
     * @param  {AreaSize} viewportArea
     * @return {totalViewportArea}        The total viewportArea
     */
    function applyScaleToViewport(viewportArea) {
      return {
        x: Math.round(viewportArea.x / currentScale),
        y: Math.round(viewportArea.y / currentScale),
        x2: Math.round(viewportArea.x2 / currentScale),
        y2: Math.round(viewportArea.y2 / currentScale),
        width: Math.round(viewportArea.width / currentScale),
        height: Math.round(viewportArea.height / currentScale)
      };
    }
  }
  /*-----------------------
  -------- PRIVATE --------
  -----------------------*/
  /**
   * @private
   * @static
   * @method testRectangleIntersect
   */
  function testRectangleIntersect(a, b) {
    return a.x <= b.x + b.width && b.x <= a.x + a.width && a.y <= b.y + b.height && b.y <= a.y + a.height;
  }
})();
"use strict";

window.flatworld.UIs = window.flatworld.UIs || {};
window.flatworld.UIs.default = {};
window.flatworld.UIs.default.utils = {};
window.flatworld.UIs.default.layout = {};
"use strict";

(function () {
  "use strict";

  window.flatworld.UIs.default.utils = window.flatworld.UIs.default.utils || {};
  window.flatworld.UIs.default.utils.drawShapes = function () {
    return {
      normal: drawArrow,
      arced: drawArcedArrow
    };

    /* =============== Functions for drawing arrows ================ */

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
    function drawArrow(shape, x1, y1, x2, y2, style, which, angle, d) {
      var graphics = shape.graphics,
          color = "#000",
          angle1,
          topx,
          topy,
          angle2,
          botx,
          boty;

      /* Ceason pointed to a problem when x1 or y1 were a string, and
          concatenation would happen instead of addition */
      if (typeof x1 === 'string') x1 = parseInt(x1, 10);
      if (typeof y1 == 'string') y1 = parseInt(y1, 10);
      if (typeof x2 == 'string') x2 = parseInt(x2, 10);
      if (typeof y2 == 'string') y2 = parseInt(y2, 10);
      style = typeof style != 'undefined' ? style : 3;
      which = typeof which != 'undefined' ? which : 1; // end point gets arrow
      angle = typeof angle != 'undefined' ? angle : Math.PI / 8;
      d = typeof d != 'undefined' ? d : 10;
      // default to using drawHead to draw the head, but if the style
      // argument is a function, use it instead
      var toDrawHead = typeof style != 'function' ? drawHead : style;

      /* For ends with arrow we actually want to stop before we get to the arrow
          so that wide lines won't put a flat end on the arrow. */
      var dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      var ratio = (dist - d / 3) / dist;
      var tox, toy, fromx, fromy;
      if (which & 1) {
        tox = Math.round(x1 + (x2 - x1) * ratio);
        toy = Math.round(y1 + (y2 - y1) * ratio);
      } else {
        tox = x2;
        toy = y2;
      }
      if (which & 2) {
        fromx = x1 + (x2 - x1) * (1 - ratio);
        fromy = y1 + (y2 - y1) * (1 - ratio);
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
      graphics.beginStroke(color).moveTo(fromx, fromy).lineTo(tox, toy);

      // calculate the angle of the line
      var lineangle = Math.atan2(y2 - y1, x2 - x1);
      // h is the line length of a side of the arrow head
      var h = Math.abs(d / Math.cos(angle));

      if (which & 1) {
        // handle far end arrow head
        angle1 = lineangle + Math.PI + angle;
        topx = x2 + Math.cos(angle1) * h;
        topy = y2 + Math.sin(angle1) * h;
        angle2 = lineangle + Math.PI - angle;
        botx = x2 + Math.cos(angle2) * h;
        boty = y2 + Math.sin(angle2) * h;
        toDrawHead(graphics, topx, topy, x2, y2, botx, boty, style);
      }
      if (which & 2) {
        // handle near end arrow head
        angle1 = lineangle + angle;
        topx = x1 + Math.cos(angle1) * h;
        topy = y1 + Math.sin(angle1) * h;
        angle2 = lineangle - angle;
        botx = x1 + Math.cos(angle2) * h;
        boty = y1 + Math.sin(angle2) * h;
        toDrawHead(graphics, topx, topy, x1, y1, botx, boty, style);
      }

      return true;

      function drawHead(graphics, x0, y0, x1, y1, x2, y2, style) {
        var backdist;
        x0 = +x0, y0 = +y0, x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2;
        // all cases do this.
        graphics.beginStroke("#F00").moveTo(x0, y0).lineTo(x1, y1).lineTo(x2, y2);
        switch (style) {
          case 0:
            // curved filled, add the bottom as an arcTo curve and fill
            backdist = Math.sqrt((x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0));
            graphics.arcTo(x1, y1, x0, y0, 0.55 * backdist);
            graphics.fill();
            break;
          case 1:
            // straight filled, add the bottom as a line and fill.
            graphics.beginStroke("#F00").moveTo(x0, y0).lineTo(x1, y1).lineTo(x2, y2).lineTo(x0, y0).fill();
            break;
          case 2:
            // unfilled head, just stroke.
            break;
          case 3:
            //filled head, add the bottom as a quadraticCurveTo curve and fill
            var cpx = (x0 + x1 + x2) / 3;
            var cpy = (y0 + y1 + y2) / 3;
            graphics.beginFill().quadraticCurveTo(cpx, cpy, x0, y0);
            break;
          case 4:
            //filled head, add the bottom as a bezierCurveTo curve and fill
            var cp1x, cp1y, cp2x, cp2y;
            var shiftamt = 5;
            if (x2 === x0) {
              // Avoid a divide by zero if x2==x0
              backdist = y2 - y0;
              cp1x = (x1 + x0) / 2;
              cp2x = (x1 + x0) / 2;
              cp1y = y1 + backdist / shiftamt;
              cp2y = y1 - backdist / shiftamt;
            } else {
              backdist = Math.sqrt((x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0));
              var xback = (x0 + x2) / 2;
              var yback = (y0 + y2) / 2;
              var xmid = (xback + x1) / 2;
              var ymid = (yback + y1) / 2;

              var m = (y2 - y0) / (x2 - x0);
              var dx = backdist / (2 * Math.sqrt(m * m + 1)) / shiftamt;
              var dy = m * dx;
              cp1x = xmid - dx;
              cp1y = ymid - dy;
              cp2x = xmid + dx;
              cp2y = ymid + dy;
            }

            graphics.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x0, y0);
            graphics.fill();
            break;
        }
      }
    }
    function drawArcedArrow(graphics, x, y, r, startangle, endangle, anticlockwise, style, which, angle, d) {
      var sx, sy, lineangle, destx, desty;

      style = typeof style != 'undefined' ? style : 3;
      which = typeof which != 'undefined' ? which : 1; // end point gets arrow
      angle = typeof angle != 'undefined' ? angle : Math.PI / 8;
      d = typeof d != 'undefined' ? d : 10;
      // Old: ctx.save();
      graphics.beginPath();
      graphics.arc(x, y, r, startangle, endangle, anticlockwise);
      graphics.stroke();

      graphics.strokeStyle = 'rgba(0,0,0,0)'; // don't show the shaft
      if (which & 1) {
        // draw the destination end
        sx = Math.cos(startangle) * r + x;
        sy = Math.sin(startangle) * r + y;
        lineangle = Math.atan2(x - sx, sy - y);

        if (anticlockwise) {
          destx = sx + 10 * Math.cos(lineangle);
          desty = sy + 10 * Math.sin(lineangle);
        } else {
          destx = sx - 10 * Math.cos(lineangle);
          desty = sy - 10 * Math.sin(lineangle);
        }
        drawArrow(graphics, sx, sy, destx, desty, style, 2, angle, d);
      }
      if (which & 2) {
        // draw the origination end
        sx = Math.cos(endangle) * r + x;
        sy = Math.sin(endangle) * r + y;
        lineangle = Math.atan2(x - sx, sy - y);
        if (anticlockwise) {
          destx = sx - 10 * Math.cos(lineangle);
          desty = sy - 10 * Math.sin(lineangle);
        } else {
          destx = sx + 10 * Math.cos(lineangle);
          desty = sy + 10 * Math.sin(lineangle);
        }
        drawArrow(graphics, sx, sy, destx, desty, style, 2, angle, d);
      }
    }
    /* =============================== */
  }();
})();
'use strict';

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var Handlebars = window.flatworld_libararies.Handlebars;

  window.flatworld.UIs = window.flatworld.UIs || {};
  window.flatworld.UIs.default = window.flatworld.UIs.default || {};
  window.flatworld.UIs.default.templates = {
    multiSelection: Handlebars.compile('\n      <span style=\'font-size:200%;display:block;margin-bottom:20px;\'>\n        {{title}}\n      </span>\n      <ul>\n        {{#each objects}}\n        <li>\n          {{this.data.typeData.name}}\n        </li>\n        {{/each}}\n      </ul>'),
    singleSelection: Handlebars.compile('\n      <span style=\'font-size:200%;display:block;margin-bottom:20px;\'>\n        {{title}}\n      </span>\n      <ul>\n        <li>\n          {{object.name}}\n        </li>\n      </ul>')
  };
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  // This is only for testing, so we don't set it here... var $ = require('assets/lib/jquery/jquery-css-ajax-effects.min.js');

  var templates = window.flatworld.UIs.default.templates;
  var createVisibleHexagon = window.flatworld.extensions.hexagons.utils.createVisibleHexagon;
  var UITemplateBase = window.flatworld.UITemplateBase;
  var UI = window.flatworld.UI;
  //import { drawShapes } from 'components/map/UIs/default/utils/arrows';

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  var FADE_ANIMATION = "slow";
  var cssClasses = {
    select: "#dialog_select"
  };
  var $elements = {};

  /*---------------------
  --------- API ---------
  ----------------------*/

  var UIDefault = function (_UITemplateBase) {
    _inherits(UIDefault, _UITemplateBase);

    /**
     * The simplest default UI implementation. Implemented UI functionalities for: showSelections, highlightSelectedObject
     *
     * @class UIDefault
     * @constructor
     * @requires Handlebars
     * @requires hexagon extension
     * @requires jQuery
     * @todo  should take jQuery away from this, as soon as we refactor the animations and graphics for selections
     * @param  {HTMLElement} modal
     * @param  {Map} map
     * @param  {Object} options
     */

    function UIDefault(modal, map) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? { styles: "#F0F0F0" } : arguments[2];

      _classCallCheck(this, UIDefault);

      // Add a media (and/or media query) here if you'd like!
      // style.setAttribute("media", "screen")
      // style.setAttribute("media", "only screen and (max-width : 1024px)")

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UIDefault).call(this, cssClasses));

      _this.map = map;
      _this.modal = modal || document.getElementById("dialog_select");
      _this.styles = options.styles;
      return _this;
    }
    /**
     * @method getTemplates
     * Required by the map/core/UI.js API
     */


    _createClass(UIDefault, [{
      key: "getTemplates",
      value: function getTemplates() {
        return templates;
      }
      /**
       * Required by the map.UI API
       *
       * @method showSelections
       * @param  {Object} objects     Objects that have been selected. See core.UI for more information
       * @param {Object} getDatas       See explanation in core.UI
       * @param {Object} options        Extra options
       */

    }, {
      key: "showSelections",
      value: function showSelections(objects, getDatas, options) {
        var _this2 = this;

        var updateCB = this.map.drawOnNextTick.bind(this.map);
        var UILayer = this.map.getMovableLayer();
        var cb;

        /* We add the objects to be highlighted to the correct UI layer */
        //objectsToUI(UILayer, objects);

        if (objects && objects.length > 1) {
          cb = function cb() {
            _this2.modal.innerHTML = templates.multiSelection({
              title: "Objects",
              objects: objects
            });

            _this2.showModal(_this2.modal, cssClasses);

            console.log(objects);

            _get$Element("select").fadeIn(FADE_ANIMATION);
          };
        } else if (objects.length === 1) {
          cb = function cb() {
            _this2.highlightSelectedObject(objects[0]);

            console.log(objects);
          };
        } else {
          cb = function cb() {
            UILayer.emptyUIObjects();
            updateCB();
            console.log("Error occured selecting the objects on this coordinates! Nothing found");
          };
        }

        _get$Element("select").fadeOut(FADE_ANIMATION, cb);
      }
      /**
       * Required by the map.UI API
       *
       * @method highlightSelectedObject
       * @param  {Object} object        Object that has been selected. See core.UI for more information
       * @param {Object} getDatas       See explanation in core.UI
       * @param {Object} options        Extra options. Like dropping a shadow etc.
       */

    }, {
      key: "highlightSelectedObject",
      value: function highlightSelectedObject(object, getDatas) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? { shadow: { color: "0x0000", distance: 5, alpha: 0.55, angle: 45, blur: 5 } } : arguments[2];
        var shadow = options.shadow;

        var highlightableObject, objectDatas;

        objectDatas = getDatas.allData(object);

        this.modal.innerHTML = templates.singleSelection({
          title: "Selected",
          object: {
            name: objectDatas.name
          }
        });
        this.showModal(this.modal, cssClasses);

        highlightableObject = this._highlightSelectedObject(object, this.map.getRenderer());

        highlightableObject.dropShadow({
          color: shadow.color,
          distance: shadow.distance,
          alpha: shadow.alpha,
          angle: shadow.angle,
          blur: shadow.blur
        });

        this.map.drawOnNextTick();

        _get$Element("select").fadeIn(FADE_ANIMATION);

        return highlightableObject;
      }
      /**
       * @method showUnitMovement
       */

    }, {
      key: "showUnitMovement",
      value: function showUnitMovement() {}
      /**
       * @method init
       */

    }, {
      key: "init",
      value: function init() {}

      /*----------------------
      ------- PRIVATE --------
      ----------------------*/
      /**
       * @private
       * @static
       * @method _highlightSelectedObject
       * @param  {Object} object
       * @param  {MapLayer} movableLayer
       * @param  {PIXI.Renderer} renderer
       */

    }, {
      key: "_highlightSelectedObject",
      value: function _highlightSelectedObject(object, renderer) {
        var movableLayer = this.map.getMovableLayer();
        var clonedObject;

        clonedObject = object.clone(renderer);
        clonedObject.__proto__ = object.__proto__;

        var coord = object.toGlobal(new PIXI.Point(0, 0));
        coord = movableLayer.toLocal(coord);

        coord.x -= object.width * object.anchor.x;
        coord.y -= object.height * object.anchor.y;

        this.createHighlight(clonedObject, { coords: coord });

        return clonedObject;
      }
      /**
       * @private
       * @static
       * @method createHighlight
       */

    }, {
      key: "createHighlight",
      value: function createHighlight(object) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { coords: new PIXI.Point(0, 0) } : arguments[1];

        var radius = 47;
        var movableLayer = this.map.getMovableLayer();
        var container = new this.map.createSpecialLayer("UILayer", { toLayer: movableLayer });
        var objCoords = {
          x: Number(object.x),
          y: Number(object.y)
        };
        var highlighterObject;

        highlighterObject = createVisibleHexagon(radius, { color: "#F0F0F0" });
        highlighterObject.x = objCoords.x + 32;
        highlighterObject.y = objCoords.y + 27;

        highlighterObject.alpha = 0.5;

        /* We add the children first to subcontainer, since it's much easier to handle the x and y in it, rather than
         * handle graphics x and y */
        container.addChild(highlighterObject);
        container.addChild(object);

        container.position = options.coords;

        this.map.removeUIObject(this.map.layerTypes.movableType.id, [container]);
        this.map.addUIObjects(this.map.layerTypes.movableType.id, [container]);
      }
    }]);

    return UIDefault;
  }(UITemplateBase);

  /*----------------------
  ------- PRIVATE --------
  ----------------------*/
  /**
   * @private
   * @static
   * @method _get$Element
   * @param  {[type]} which [description]
   * @return {[type]}       [description]
   */


  function _get$Element(which) {
    /* Set the jQuery element to collection only once */
    if (!$elements[which]) {
      var $element = $(cssClasses[which]);
      $elements[which] = $element;
    }

    return $elements[which];
  }

  window.flatworld.UIs.default.init = UIDefault;
})();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var Q = window.flatworld_libararies.Q;
  var mapLayers = window.flatworld.mapLayers;
  var Objects = window.flatworld.Objects;
  var ObjectManager = window.flatworld.ObjectManager;
  var mapEvents = window.flatworld.mapEvents;
  var utils = window.flatworld.utils;
  var MapDataManipulator = window.flatworld.MapDataManipulator;

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  var LAYER_TYPE_STATIC = 0;
  var LAYER_TYPE_MOVABLE = 1;
  var VERSION = "0.0.1";
  var _drawMapOnNextTick = false;
  var isMapReadyPromises = [];
  var _staticLayer, _movableLayer, _renderer, ParentLayerConstructor;

  /*---------------------
  --------- API ---------
  ----------------------*/

  var Flatworld = function () {
    /**
     * #Main class for the engine
     *
     * Initializes the whole structure and plugins and is used as primary API for all operations. This class is e.g. passed to every plugin that get initialized with their init-method.
     *
     * You use the class by instantiating it (new) and then finishing initialization with init-method. Please see examples below.
     *
     * The biggest part of creating the map, is the data structure. There is a clear data structure that you can see from the tests/data-folder, but the factory is responsible for creating the objects, so you can use your own factory implementation. So to understand more, please see e.g. factories.horizontalHexaFactory.
     *
     * The map consists of layer on top of each other. The example is best understood when thinking typical war strategy game. The structure is this:
     * 1. StaticLayer: Handles things like scaling / zooming the map
     * 2. MovableLayer: Obviously handles movement of the map. Also is a good place to get map coordinates. Since getting global coordinates won't help you much, half of the time.
     * 3. Different layers: like units, terrain, fog of war, UIs etc. Can also contains special layers like dynamically changed UIlayers.
     * 4. possible subcontainers (used for optimized object selection and map movement). Can also contains special layers like dynamically changed UIlayers.
     * 5. Individual objects, like units, terrains, cities etc...
     *
     * Plugins can be added with activatePlugins-method by sending them to the class. Plugins must always implement init-method, which receives Map instance. Plugins are not yet restricted what they can do and can add functionality without touching map or can modify objects or their prototypes through access to Map instance.
     *
     * @example
     *     var map = new Map(divContainer, mapOptions );
     *     promises = map.init( gameData.pluginsToActivate, mapData.startPoint );
     *
     * @class Map
     * @constructor
     * @requires PIXI.JS framework in global namespace
     * @requires Canvas (webGL support recommended) HTML5-element supported.
     * @requires Q for promises
     * @requires Hammer for touch events
     * @requires Hamster for mouse scroll events
     *
     * @param {HTMLElement} canvasContainer                 HTML element which will be container for the created canvas element. REQUIRED
     * @param {Object} props                                Extra properties
     * @param {Object} props.bounds                         Bounds of the map / mapSize
     * @param {Integer} props.bounds.width                  Bound width
     * @param {Integer} props.bounds.height                 Bound height
     * @param {Object} props.rendererOptions                Renderer options passed to PIXI.autoDetectRenderer
     * @param {Object} props.subcontainers                  Subcontainers size in pixels. If given, will activate subcontainers. If not given or false, subcontainers are not used.area.
     * @param {Integer} props.subcontainers.width           Subcontainer width
     * @param {Integer} props.subcontainers.height          Subcontainer height
     * @param {FPSCallback} trackFPSCB                      Callback function for tracking FPS in renderer. So this is used for debugging and optimizing.
     *
     * @return {Object}                                      New Map instance
     */

    function Flatworld() {
      var canvasContainer = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var props = arguments.length <= 1 || arguments[1] === undefined ? {
        bounds: { width: 0, height: 0 },
        rendererOptions: { refreshEventListeners: true },
        subcontainers: false,
        cache: false,
        trackFPSCB: false } : arguments[1];

      _classCallCheck(this, Flatworld);

      var bounds = props.bounds;
      var rendererOptions = props.rendererOptions;
      var subcontainers = props.subcontainers;
      var trackFPSCB = props.trackFPSCB;
      var cache = props.cache;

      /* Check for the required parameters! */

      if (!canvasContainer) {
        throw new Error(this.constructor.name + " needs canvasContainer!");
      }
      /* If the constructor was passed canvasContainer as a string and not as an Element, we get the element */
      if (typeof canvasContainer === "string") {
        canvasContainer = document.querySelector(canvasContainer);
      }

      /* Create PIXI renderer. Practically PIXI creates its own canvas and does its magic to it */
      _renderer = PIXI.autoDetectRenderer(bounds.width, bounds.height, rendererOptions);
      /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
      _renderer.plugins.interaction.destroy();
      /* Make sure the canvasContainer is empty. So there are no nasty surprises */
      canvasContainer.innerHTML = "";
      /* Add the canvas Element PIXI created inside the given canvasContainer */
      canvasContainer.appendChild(_renderer.view, canvasContainer);
      /* This defines which MapLayer class we use to generate layers on the map. Under movableLayer. These are layers like: Units, terrain, fog of war, UIs etc. */
      ParentLayerConstructor = subcontainers ? mapLayers.MapLayerParent : mapLayers.MapLayer;

      /* These are the 2 topmost layers on the map:
       * - staticLayer: Keeps at the same coordinates always and is responsible for holding map scale value and possible
       * objects that do not move with the map. StaticLayer has only one child: _movableLayer
       * - movableLayer: Moves the map, when the user commands. Can hold e.g. UI objects that move with the map. Like
       * graphics that show which area or object is currently selected. */
      _staticLayer = new mapLayers.MapLayer({ name: "staticLayer", coord: { x: 0, y: 0 } });
      _movableLayer = new mapLayers.MapLayer({ name: "movableLayer", coord: { x: 0, y: 0 } });
      _staticLayer.addChild(_movableLayer);

      /* needed to make the canvas fullsize canvas with PIXI */
      _renderer.view.style.position = "absolute";
      _renderer.view.style.display = "block";
      _renderer.view.style.left = "0px";
      _renderer.view.style.top = "0px";
      /* stop scrollbars of showing */
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      /* For html5 canvas. I guess it doesn't apply for webgl */
      _renderer.roundPixels = true;

      /**
       * canvas element that was generated and is being used by this new generated Map instance.
       *
       * @attribute canvas
       * @type {HTMLElement}
       * @required
       **/
      this.canvas = _renderer.view;
      /**
       * list of plugins that the map uses and are initialized
       * @see Map.activatePlugins
       *
       * @attribute plugins
       * @type {Set}
       **/
      this.plugins = new Set();
      /**
       * Subcontainers size that we want to generate, when layers use subcontainers
       *
       * @attribute subcontainersConfig
       * @type {{width: Integer, height: Int}}
       **/
      this.subcontainersConfig = subcontainers;
      /**
       * Callback function that gets the current FPS on the map and shows it in DOM
       *
       * @attribute trackFPSCB
       * @type {Function}
       **/
      this.trackFPSCB = trackFPSCB;
      /**
       * ObjectManager instance. Responsible for retrieving the objects from the map, on desired occasions. Like when the player clicks the map to select some object. This uses subcontainers when present.
       *
       * @attribute objectManager
       * @type {ObjectManager}
       **/
      this.objectManager = new ObjectManager(new PIXI.interaction.InteractionManager(_renderer));
      /**
       * Is cache activated for this map at all. This is set for individual layers with a property, but without activating the cache for the whole map, the layers cache property is ignored.
       *
       * @attribute objectManager
       * @type {ObjectManager}
       **/
      this.cache = cache;
      /**
       * Layer types. Can be extended, but the already defined types are supposed to be constants and not to be changed.
       *
       * @attribute layerTypes
       * @type {Object}
       */
      this.layerTypes = {
        staticType: {
          id: LAYER_TYPE_STATIC,
          layer: _staticLayer
        },
        movableType: {
          id: LAYER_TYPE_MOVABLE,
          layer: _movableLayer
        }
      };
      /**
       * Self explanatory
       * @type {SEMVER}     http://semver.org/
       */
      this.VERSION = VERSION;
    }
    /**
     * This initializes the map and makes everything appear on the map and actually work. Also initializes the given plugins since normally the plugins have to be activated before the map is shown.
     *
     * @method init
     * @param {String[]|Object[]} plugins                  Plugins to be activated for the map. Normally you should give the plugins here
     * instead of separately passing them to activatePlugins method. You can provide the module strings or module objects.
     * @param  {Object} coord                     Starting coordinates for the map.
     * @param  {Integer} coord.x                  X coordinate.
     * @param  {Integer} coord.y                  Y coordinate.
     * @param {Function} tickCB                   callback function for tick. Tick callback is initiated in every frame. So map draws happen during ticks.
     * @param {Object} options                    Extra options.
     * @param {Boolean} options.fullsize          Do we set fullsize canvas or not at the beginning. Default: true
     * @return {Array}                            Returns an array of Promises. If this is empty / zero. Then there is nothing to wait for, if it contains promises, you have to wait for them to finish for the plugins to work and map be ready.
     **/


    _createClass(Flatworld, [{
      key: "init",
      value: function init() {
        var plugins = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var coord = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];
        var tickCB = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        var options = arguments.length <= 3 || arguments[3] === undefined ? { fullsize: true } : arguments[3];

        var allPromises = [];

        options.fullsize && this.toggleFullsize();

        if (plugins.length) {
          allPromises = this.activatePlugins(plugins);
        }

        /* Sets the correct Map starting coordinates */
        coord && Object.assign(_movableLayer, coord);

        /* We activate the default tick for the map, but if custom tick callback has been given, we activate it too */
        this._defaultTick();
        tickCB && this.customTickOn(tickCB);
        isMapReadyPromises = allPromises;

        if (this.cache) {
          this.cacheMap();
        }

        this.drawOnNextTick();

        return allPromises || Promise.resolve();
      }
      /**
       * Returns a promise that resolves after the map is fully initialized
       *
       * @method whenReady
       * @return {Promise}        Promise that holds all the individual plugin loading promises
       **/

    }, {
      key: "whenReady",
      value: function whenReady() {
        return Q.all(isMapReadyPromises);
      }
      /**
       * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
       *
       * @method drawOnNextTick
       **/

    }, {
      key: "drawOnNextTick",
      value: function drawOnNextTick() {
        _drawMapOnNextTick = true;
      }
      /**
       * Add an UI object to the wanted layer.
       *
       * @method addUIObject
       * @param {Integer} layer   Type of the layer. layerTypes.STATIC of layerTypes.MOVABLE.
       * @param {Object} object   The object to be attached as UI object.
       */

    }, {
      key: "addUIObject",
      value: function addUIObject(layerType, object) {
        switch (layerType) {
          case LAYER_TYPE_STATIC:
            this.getStaticLayer().addUIObject(object);
            break;
          case LAYER_TYPE_MOVABLE:
            this.getMovableLayer().addUIObject(object);
            break;
        }
      }
      /**
       * Remove an UI object to the wanted layer.
       *
       * @method removeUIObject
       * @param {Integer} layer   Type of the layer. layerTypes.STATIC of layerTypes.MOVABLE.
       * @param {Object} object   The object to be attached as UI object.
       */

    }, {
      key: "removeUIObject",
      value: function removeUIObject(layerType, object) {
        switch (layerType) {
          case LAYER_TYPE_STATIC:
            this.getStaticLayer().emptyUIObjects();
            break;
          case LAYER_TYPE_MOVABLE:
            this.getMovableLayer().emptyUIObjects();
            break;
        }
      }
      /**
       * Adds an UI object to the map. This method adds it to the given layer and removes it with removeUIObject-method.
       *
       * @method addUIObjects
       * @param {Integer} layerType     map.layerTypes holds the constants used in this.
       * @param {Array} objects         Object that are added as UI objects
       */

    }, {
      key: "addUIObjects",
      value: function addUIObjects(layerType, objects) {
        var _this = this;

        objects.forEach(function (object) {
          _this.addUIObject(layerType, object);
        });
      }
      /**
       * Create a special layer, that can holds e.g. UI effects in it.
       *
       * @method createSpecialLayer
       * @param {String} name               name of the layer
       * @param {Object} options            Optional options.
       * @param {Object} options.coord      Coordinates of the layer
       * @param {Integer} options.coord.x   X coordinate
       * @param {Integer} options.coord.y   Y coordinate
       * @param {Object} options.toLayer    To which layer will this layer be added to as UILayer
       * @return {MapLayer}            The created UI layer
       **/

    }, {
      key: "createSpecialLayer",
      value: function createSpecialLayer() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "default special layer" : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? { coord: { x: 0, y: 0 }, toLayer: toLayer } : arguments[1];

        var coord = options.coord || { x: 0, y: 0 };
        var layer = new mapLayers.MapLayer(name, coord);

        layer.specialLayer = true;
        options.toLayer && options.toLayer.addChild(layer);

        return layer;
      }
      /**
       * All parameters are passed to ParentLayerConstructor (normally constructor of MapLayer).
       *
       * @method addLayer
       * @uses MapLayer
       * @return {MapLayer}          created MapLayer instance
       **/

    }, {
      key: "addLayer",
      value: function addLayer(layerOptions) {
        var newLayer;

        if (this.getSubcontainerConfigs() && layerOptions.subcontainers !== false) {
          layerOptions.subcontainers = this.getSubcontainerConfigs();
        }

        newLayer = new ParentLayerConstructor(layerOptions);
        this.getMovableLayer().addChild(newLayer);

        return newLayer;
      }
      /**
       * Just a convenience function (for usability and readability), for checking if the map uses subcontainers.
       *
       * @method usesSubcontainers
       **/

    }, {
      key: "usesSubcontainers",
      value: function usesSubcontainers() {
        return this.getSubcontainerConfigs() ? true : false;
      }
      /**
       * Returns current subcontainers configurations (like subcontainers size).
       *
       * @method getSubcontainerConfigs
       **/

    }, {
      key: "getSubcontainerConfigs",
      value: function getSubcontainerConfigs() {
        return this.subcontainersConfig;
      }
      /**
       * Get the size of the area that is shown to the player. More or less the area of the browser window.
       *
       * @method getViewportArea
       * @param  {Boolean} isLocal                                                  Do we want to use Map coordinates or global / canvas coordinates. Default = false
       * @return {{x: Integer, y: Integer, width: Integer, height: Integer}}        x- and y-coordinates and the width and height of the viewport
       **/

    }, {
      key: "getViewportArea",
      value: function getViewportArea() {
        var isLocal = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        var layer = isLocal ? this.getMovableLayer() : this.getStaticLayer();

        return {
          x: layer.x,
          y: layer.y,
          width: Math.round(window.innerWidth),
          height: Math.round(window.innerHeight)
        };
      }
      /**
       * Remove a primary layer from the map
       *
       * @method removeLayer
       * @param {MapLayer|PIXI.Container|PIXI.ParticleContainer} layer       The layer object to be removed
       **/

    }, {
      key: "removeLayer",
      value: function removeLayer(layer) {
        _movableLayer.removeChild(layer);

        return layer;
      }
      /**
       * Moves the map the amount of given x and y pixels. Note that this is not the destination coordinate, but the amount of movement that the map should move. Internally it moves the movableLayer, taking into account necessary properties (like scale). Draws map after movement.
       *
       * @method moveMap
       * @param {Object} coord                 The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }. With this we want the map to move horizontally 5 pixels and vertically stay at the same position.
       * @param {Integer} coord.x              X coordinate
       * @param {Integer} coord.y              Y coordinate
       * @param {Object} informCoordinates     THIS IS EXPERIMENTAL, TO FIX THE INCORRECT EVENT COORDINATES THIS SEND TO mapEvents, WHEN SCALING
       * @param {Integer} informCoordinates.x  X coordinate
       * @param {Integer} informCoordinates.y  Y coordinate
       **/

    }, {
      key: "moveMap",
      value: function moveMap() {
        var coord = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
        var informCoordinates = arguments.length <= 1 || arguments[1] === undefined ? coord : arguments[1];

        var realCoordinates = {
          x: Math.round(coord.x / this.getStaticLayer().getZoom()),
          y: Math.round(coord.y / this.getStaticLayer().getZoom())
        };
        _movableLayer.move(realCoordinates);
        mapEvents.publish("mapMoved", informCoordinates || realCoordinates);
        this.drawOnNextTick();
      }
      /**
       * Is cache on
       *
       * @method isCacheActivated
       * @return {Boolean}
       **/

    }, {
      key: "isCacheActivated",
      value: function isCacheActivated() {
        return this.cache;
      }
      /**
       * Cache the map. This provides performance boost when used correctly. CacheMap iterates through all the layers on the map and caches the ones that return true from isCached-method. NOT WORKING YET. CACHING IMPLEMENTED SOON.
       *
       * @method cacheMap
       * @param {Object} filters          filters from MapDataManipulator.js
       **/

    }, {
      key: "cacheMap",
      value: function cacheMap(filters) {
        cacheLayers(true, this.usesSubcontainers());
      }
      /**
       * unCache the map. NOT WORKING ATM. IMPLEMENTED SOON!
       *
       * @method unCacheMap
       * @return {Map}        this map instance
       * */

    }, {
      key: "unCacheMap",
      value: function unCacheMap() {
        cacheLayers(false, this.usesSubcontainers());
      }
      /**
       * Activate all plugins for the map. Iterates through the given plugins we wish to activate and does the actual work in activatePlugin-method.
       *
       * @method pluginsArray
       * @param {Object[]} pluginsArray   Array that consists the plugin modules to be activated
       * @return {Promise}                Promise. If string are provided resolved those with System.import, otherwise resolves immediately.
       * */

    }, {
      key: "activatePlugins",
      value: function activatePlugins() {
        var _this2 = this;

        var pluginsArray = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var allPromises = [];

        /* Iterates over given plugins Array and calls their init-method, depeding if it is String or Object */
        pluginsArray.forEach(function (plugin) {
          if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) === "object") {
            _this2.activatePlugin(plugin);
          } else {
            throw new Error("problem with initializing a plugin");
          }
        });

        return allPromises;
      }
      /**
       * Activate plugin for the map. Plugins need .pluginName property and .init-method. Plugins init-method activates the plugins and we call them in Map. Plugins init-metho receivse this (Map instance) as their only parameter.
       *
       * @method activatePlugin
       * @param {Object} plugin        Plugin module
       * */

    }, {
      key: "activatePlugin",
      value: function activatePlugin(plugin) {
        try {
          if (!plugin || !plugin.pluginName || !plugin.init) {
            throw new Error("plugin, plugin.pluginName or plugin.init import is missing!");
          }

          if (this.plugins.add(plugin[plugin.pluginName])) {
            plugin.init(this);
          }
        } catch (e) {
          console.log("An error initializing plugin. JSON.stringify: '" + JSON.stringify(plugin) + "' ", e);
        }
      }
      /**
       * Setting new prototype methods for the Map instance
       *
       * @method setPrototype
       * @param {String} property         The property you want to set
       * @param {*} value                 Value for the property
       */

    }, {
      key: "setPrototype",
      value: function setPrototype(property, value) {
        var thisPrototype = Object.getPrototypeOf(this);

        thisPrototype[property] = value;
      }
      /**
       * Gets object under specific map coordinates. Uses the ObjectManagers retrieve method. Using subcontainers if they exist, other methods if not. If you provide type parameter, the method returns only object types that match it.
       *
       * @method getObjectsUnderArea
       * @param  {Object} globalCoords            Event coordinates on the staticLayer / canvas.
       * @param  {Integer} globalCoords.x         X coordinate
       * @param  {Integer} globalCoords.y         Y coordinate
       * @param  {Object} options                 Optional options
       * @param  {Object} options.filter          The filter to apply to subcontainers
       * @return {Array}                          Array of object found on the map.
       */

    }, {
      key: "getObjectsUnderArea",
      value: function getObjectsUnderArea() {
        var globalCoords = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0, width: 0, height: 0 } : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? { filter: undefined } : arguments[1];
        var filter = options.filter;
        /* We need both coordinates later on and it's logical to do the work here */

        var allCoords = {
          globalCoords: globalCoords,
          localCoords: this.getMovableLayer().toLocal(new PIXI.Point(globalCoords.x, globalCoords.y))
        };
        var objects = {};

        allCoords.localCoords.width = globalCoords.width;
        allCoords.localCoords.height = globalCoords.height;
        if (filter) {
          var selectableContainerfilter = new MapDataManipulator({
            type: "filter",
            object: "container",
            property: "selectable",
            value: true
          });
          filter.addRule(selectableContainerfilter);
        }

        if (this.usesSubcontainers()) {
          var allMatchingSubcontainers = this._getSubcontainersUnderArea(allCoords, { filter: filter });

          objects = this._retrieveObjects(allCoords, {
            subcontainers: allMatchingSubcontainers
          });
        }

        return objects;
      }
      /**
       * This returns the normal parent layers that we mostly use for manipulation everything. MovableLayer and staticLayer are built-in layers designed to provide the basic functionalities like zooming and moving the map. These layers provide everything that extends the map more.
       *
       * @method getPrimaryLayers
       * @return {Object} Basically anything in the map that is used as a layer (not really counting subcontainers).
       */

    }, {
      key: "getPrimaryLayers",
      value: function getPrimaryLayers() {
        return this.getMovableLayer().getPrimaryLayers();
      }
      /**
       * Get current map coordinates. Basically the same as movable layers position.
       *
       * @method getMapCoordinates
       * @return {{x: Integer, y: Integer}}          current coordinates for the moved map
       * */

    }, {
      key: "getMapCoordinates",
      value: function getMapCoordinates() {
        return {
          x: this.getMovableLayer().x,
          y: this.getMovableLayer().y
        };
      }
      /**
       * This returns the layer that is responsible for map zoom
       *
       * @method getZoomLayer
       * @return {MapLayer|PIXI.Container|PIXI.ParticleContainer}
       */

    }, {
      key: "getZoomLayer",
      value: function getZoomLayer() {
        return this.getStaticLayer();
      }
      /**
       * Set map zoom. 1 = no zoom. <1 zoom out, >1 zoom in.
       *
       * @method setZoom
       * @param {Number} scale    The amount of zoom you want to set
       * @return {Number}         The amount of zoom applied
       */

    }, {
      key: "setZoom",
      value: function setZoom(scale) {
        mapEvents.publish("mapZoomed", scale);

        return this.getZoomLayer().setZoom(scale);
      }
      /**
       * Get map zoom. 1 = no zoom. <1 zoom out, >1 zoom in.
       *
       * @method getZoom
       * @return {MapLayer|PIXI.Container|PIXI.ParticleContainer}
       */

    }, {
      key: "getZoom",
      value: function getZoom() {
        return this.getZoomLayer().getZoom();
      }
      /**
       * Returns movable layer. This layer is the one that moves when the player moves the map. So this is used for things that are relative to the current map position the player is seeing. This can be used e.g. when you want to display some objects on the map or UI elements, like effects that happen on certain point on the map.
       *
       * @method getMovableLayer
       * @return {MapLayer|PIXI.Container|PIXI.ParticleContainer}
       */

    }, {
      key: "getMovableLayer",
      value: function getMovableLayer() {
        return _movableLayer;
      }
      /**
       * Returns the PIXI renderer. Some situations might need this. For more advanced or PIXI specific cases.
       *
       * @method getRenderer
       * @return {PIXI.Renderer}
       */

    }, {
      key: "getRenderer",
      value: function getRenderer() {
        return _renderer;
      }
      /**
       * Return static layer. The static layer is the topmost of all layers. It handles zooming and other non-movable operations.
       *
       * @method getStaticLayer
       */

    }, {
      key: "getStaticLayer",
      value: function getStaticLayer() {
        return _staticLayer;
      }
      /*---------------------------------------------
       ------- ABSTRACT APIS THROUGH PLUGINS --------
       --------------------------------------------*/
      /**
       * This is abstract method and needs to be implemented with a plugin. Core module has an implementation for this and if you don't implement your own, I suggest you use it.
       *
       * @method zoomIn
       */

    }, {
      key: "zoomIn",
      value: function zoomIn() {
        return "notImplementedYet. Activate with plugin";
      }
      /**
       * This is abstract method and needs to be implemented with a plugin. Core module has an implementation for this and if you don't implement your own, I suggest you use it.
       *
       * @method zoomOut
       */

    }, {
      key: "zoomOut",
      value: function zoomOut() {
        return "notImplementedYet. Activate with plugin";
      }
      /**
       * Resize the canvas to fill the whole browser content area. Defined by the baseEventlisteners-module (core modules plugin)
       *
       * @method toggleFullsize
       **/

    }, {
      key: "toggleFullsize",
      value: function toggleFullsize() {
        return "notImplementedYet. Activate with plugin";
      }
      /**
       * Toggles fullscreen mode. Defined by the baseEventlisteners-module (core modules plugin)
       *
       * @method toggleFullScreen
       **/

    }, {
      key: "toggleFullScreen",
      value: function toggleFullScreen() {
        return "notImplementedYet. Activate with plugin";
      }

      /*-------------------------
      --------- PRIVATE ---------
      -------------------------*/
      /**
       * Retrieves the objects from ObjectManager, with the given parameters. Mostly helper functionality for getObjectsUnderArea
       *
       * @private
       * @method _retrieveObjects
       * @param {Object} allCoords                        REQUIRED
       * @param {Object} allCoords.globalCoords           REQUIRED
       * @param {Integer} allCoords.globalCoords.x        REQUIRED
       * @param {Integer} allCoords.globalCoords.y        REQUIRED
       * @param {Integer} allCoords.globalCoords.width    REQUIRED
       * @param {Integer} allCoords.globalCoords.height   REQUIRED
       * @param {Object} allCoords.localCoords            REQUIRED
       * @param {Integer} allCoords.localCoords.x         REQUIRED
       * @param {Integer} allCoords.localCoords.y         REQUIRED
       * @param {Object} options                          Optional options
       * @param {String} options.type                     The type of objects we want
       * @param {Array} options.subcontainers             Array of the subcontainers we will search
       * @return {Array}                                  Found objects
       */

    }, {
      key: "_retrieveObjects",
      value: function _retrieveObjects(allCoords) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { type: "", subcontainers: [] } : arguments[1];

        return this.objectManager.retrieve(allCoords, {
          type: options.type,
          subcontainers: options.subcontainers,
          size: {
            width: allCoords.globalCoords.width,
            height: allCoords.globalCoords.height
          }
        });
      }
      /**
       * This returns layers by filtering them based on certain attribute. Can be used with more higher order filtering
       *
       * @private
       * @method _getLayersWithAttributes
       * @param {String} attribute
       * @param {*} value
       * @return the current map instance
       **/

    }, {
      key: "_getLayersWithAttributes",
      value: function _getLayersWithAttributes(attribute, value) {
        return this.getMovableLayer().children[0].children.filter(function (layer) {
          return layer[attribute] === value;
        });
      }
      /**
       * Get subcontainers under certain point or rectangle
       *
       * @private
       * @method _getSubcontainersUnderPoint
       * @param  {[type]} globalCoords
       * @param {Object} options              Optional options.
       * @return {Array}                        All subcontainers that matched the critea
       */

    }, {
      key: "_getSubcontainersUnderArea",
      value: function _getSubcontainersUnderArea(allCoords) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { filter: undefined } : arguments[1];

        var primaryLayers = this.getMovableLayer().getPrimaryLayers();
        var allMatchingSubcontainers = [];
        var filter = options.filter;

        var thisLayersSubcontainers;

        primaryLayers.forEach(function (layer) {
          thisLayersSubcontainers = layer.getSubcontainersByCoordinates(allCoords.globalCoords, { filter: filter });
          allMatchingSubcontainers = allMatchingSubcontainers.concat(thisLayersSubcontainers);
        });

        return allMatchingSubcontainers;
      }
      /**
       * Activate the browsers fullScreen mode and expand the canvas to fullsize
       *
       * @private
       * @method setFullScreen
       */

    }, {
      key: "_setFullScreen",
      value: function _setFullScreen() {
        utils.resize.toggleFullScreen();
        mapEvents.publish("mapResized");
        this._resizeCanvas();
      }
      /**
       * Resizes the canvas to the current most wide and high element status. Basically canvas size === window size.
       *
       * @private
       * @method _resizeCanvas
       */

    }, {
      key: "_resizeCanvas",
      value: function _resizeCanvas() {
        var windowSize = utils.resize.getWindowSize();

        _renderer.autoResize = true;
        _renderer.resize(windowSize.x, windowSize.y);
        mapEvents.publish("mapResized");
        this.drawOnNextTick();
      }
      /**
       * This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
       * callback is always set and should not be removed or overruled
       *
       * @private
       * @method _defaultTick
       */

    }, {
      key: "_defaultTick",
      value: function _defaultTick() {
        var ONE_SECOND = 1000;
        var FPSCount = 0;
        var fpsTimer = new Date().getTime();
        var renderStart, totalRenderTime;

        PIXI.ticker.shared.add(function () {
          if (_drawMapOnNextTick === true) {
            if (this.trackFPSCB) {
              renderStart = new Date().getTime();
            }

            _renderer.render(_staticLayer);
            _drawMapOnNextTick = false;

            if (this.trackFPSCB) {
              totalRenderTime += Math.round(Math.abs(renderStart - new Date().getTime()));
            }
          }
          if (this.trackFPSCB) {
            FPSCount++;

            if (fpsTimer + ONE_SECOND < new Date().getTime()) {
              this.trackFPSCB({
                FPS: FPSCount,
                FPStime: fpsTimer,
                renderTime: totalRenderTime,
                drawCount: _renderer.drawCount
              });

              FPSCount = 0;
              totalRenderTime = 0;
              fpsTimer = new Date().getTime();
            }
          }
        }.bind(this));
      }
    }]);

    return Flatworld;
  }();

  /*---------------------
  ------- PRIVATE -------
  ----------------------*/
  /**
   * cacheLayers
   *
   * @method cacheLayers
   * @private
   * @static
   * @param  {Boolean}  cacheOrNot        Do you want to cache or uncache?
   * @param  {Boolean} hasSubcontainers   Does the map have subcontainers activated?
   */


  function cacheLayers(cacheOrNot, hasSubcontainers) {
    if (hasSubcontainers) {
      _movableLayer.children.forEach(function (child) {
        if (!child.isCached()) {
          return false;
        }
        var subcontainers = child.getSubcontainers();

        subcontainers.forEach(function (subcontainer) {
          subcontainer.setCache(cacheOrNot);
        });
      });
    } else {
      _movableLayer.children.forEach(function (child) {
        if (!child.isCached()) {
          return false;
        }

        child.setCache(cacheOrNot);
      });
    }
  }

  window.flatworld.Flatworld = Flatworld;
})();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  var PIXI = window.flatworld_libararies.PIXI;
  var UIDefault = window.flatworld.UIs.default.init;
  var hexagonPlugin = window.flatworld.extensions.hexagons;
  var Flatworld = window.flatworld.Flatworld;
  var UI = window.flatworld.UI;
  var utils = window.flatworld.utils;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.factories.hexaFactory = hexaFactory;

  /*---------------------
  ------- PUBLIC --------
  ----------------------*/
  /**
   * This constructs a whole horizontally aligned hexagonal map. Some polyfills are needed and added for IE11 ( http://babeljs.io/docs/usage/polyfill/ ). These are found in utils
   *
   * @class factories.horizontalHexaFactory
   * @requires PIXI in global space
   * @param {HTMLElement} canvasContainerElement  HTML Element. Container which will hold the generated canvas element
   * @param {Object} datas                        Object with mapDatas to construct the map structure
   * @param {Object} datas.map                    Holds all the stage, layer and object data needed to construct a full map
   * @param {Object} datas.game                   More general game data (like turn number, map size etc.)
   * @param {Object} datas.type                   Type data such as different unit types and their graphics (tank, soldier etc.)
   * @param {Object} options                      Optional options
   * @param {Object} options.isHiddenByDefault    When we use mapMovement plugin, it is best to keep all the obejcts hidden at the beginnig.
   * @param {Function} options.trackFPSCB         Callback to track FPS
   **/
  function hexaFactory(canvasContainerElement, datas) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? { trackFPSCB: false, isHiddenByDefault: true, cache: false } : arguments[2];

    console.log("============== Horizontal hexagonal Map factory started =============");
    var pixelRatio = utils.environmentDetection.getPixelRatio();
    var DATA_MAP = typeof datas.map === "string" ? JSON.parse(datas.map) : datas.map;
    var DATA_TYPE = typeof datas.type === "string" ? JSON.parse(datas.type) : datas.type;
    var DATA_GAME = typeof datas.game === "string" ? JSON.parse(datas.game) : datas.game;
    var WINDOW_SIZE = utils.resize.getWindowSize();
    var MAP_SIZE = DATA_GAME.mapSize;
    var mapOptions = {
      refreshEventListeners: true
    };
    /*---------------------
    ------ VARIABLES ------
    ----------------------*/
    var functionsInObj = {
      ObjectTerrain: hexagonPlugin.objects.ObjectHexaTerrain,
      ObjectUnit: hexagonPlugin.objects.ObjectHexaUnit
    };
    var mapProperties = {
      bounds: {
        x: 0,
        y: 0,
        width: WINDOW_SIZE.x,
        height: WINDOW_SIZE.y
      },
      rendererOptions: {
        resolution: pixelRatio, // We might need this later on, when doing mobile optimizations, for different pizel density devices
        autoResize: true,
        transparent: true,
        antialias: false // TEST. Only should work in chrome atm.?
      },
      subcontainers: {
        width: 500,
        height: 500,
        maxDetectionOffset: 100,
        isHiddenByDefault: options.isHiddenByDefault
      },
      trackFPSCB: options.trackFPSCB,
      cache: options.cache
    };
    var map, dialog_selection, defaultUI;

    map = new Flatworld(canvasContainerElement, mapProperties, mapOptions);
    dialog_selection = document.getElementById("selectionDialog");
    defaultUI = new UIDefault(dialog_selection, map);

    /* Initialize UI as singleton */
    UI(defaultUI, map);

    DATA_MAP.layers.forEach(function (layerData) {
      if ((typeof layerData === "undefined" ? "undefined" : _typeof(layerData)) !== "object") {
        console.log("Problem in horizontalHexaFactory, with layerData:", layerData);
        throw new Error("Problem in horizontalHexaFactory, with layerData:", layerData);
      }

      var layerGroup = layerData.group;
      var objManager = map.objectManager;
      var renderer = map.getRenderer();
      var layerOptions = {
        name: layerData.name,
        coord: layerData.coord,
        drawOutsideViewport: {
          x: renderer.width,
          y: renderer.height
        },
        selectable: layerData.name === "unitLayer" ? true : false
      };
      var thisLayer;

      try {
        thisLayer = map.addLayer(layerOptions);

        layerData.objectGroups.forEach(function (objectGroup) {
          var spritesheetType = objectGroup.typeImageData;

          if (!spritesheetType) {
            console.log("Error with spritesheetType-data");
            return;
          }

          objectGroup.objects.forEach(function (object) {
            var objTypeData, objData, objectOptions, currentFrame, newObject;

            try {
              objTypeData = DATA_TYPE.objectData[spritesheetType][object.objType];
              if (!objTypeData) {
                console.debug("Bad mapData for type:", spritesheetType, object.objType, object.name);
                throw new Error("Bad mapData for type:", spritesheetType, object.objType, object.name);
              }

              objData = {
                typeData: objTypeData,
                activeData: object.data
              };
              currentFrame = PIXI.Texture.fromFrame(objTypeData.image);
              objectOptions = {
                currentFrame: currentFrame,
                radius: DATA_GAME.hexagonRadius
              };

              newObject = new functionsInObj[objectGroup.type](object.coord, objData, objectOptions);

              thisLayer.addChild(newObject);
            } catch (e) {
              console.log(e);
            }
          });
        });
      } catch (e) {
        console.log("Problem:", layerData.type, e.stack);
      }
    });

    map.moveMap(DATA_MAP.startPoint);

    return map;
  }
})();
//# sourceMappingURL=flatworld.js.map
