"bundle";
System.registerDynamic("npm:loglevel@1.4.0/lib/loglevel.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(root, definition) {
    "use strict";
    if (typeof module === 'object' && module.exports && typeof $__require === 'function') {
      module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
      define(definition);
    } else {
      root.log = definition();
    }
  }(this, function() {
    "use strict";
    var noop = function() {};
    var undefinedType = "undefined";
    function realMethod(methodName) {
      if (typeof console === undefinedType) {
        return false;
      } else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName);
      } else if (console.log !== undefined) {
        return bindMethod(console, 'log');
      } else {
        return noop;
      }
    }
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === 'function') {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          return function() {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
      return function() {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this, level, loggerName);
          this[methodName].apply(this, arguments);
        }
      };
    }
    function replaceLoggingMethods(level, loggerName) {
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = (i < level) ? noop : this.methodFactory(methodName, level, loggerName);
      }
    }
    function defaultMethodFactory(methodName, level, loggerName) {
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    var logMethods = ["trace", "debug", "info", "warn", "error"];
    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {}
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {}
      }
      function getPersistedLevel() {
        var storedLevel;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {}
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
            if (location) {
              storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            }
          } catch (ignore) {}
        }
        if (self.levels[storedLevel] === undefined) {
          storedLevel = undefined;
        }
        return storedLevel;
      }
      self.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self.methodFactory = factory || defaultMethodFactory;
      self.getLevel = function() {
        return currentLevel;
      };
      self.setLevel = function(level, persist) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
          level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
          currentLevel = level;
          if (persist !== false) {
            persistLevelIfPossible(level);
          }
          replaceLoggingMethods.call(self, level, name);
          if (typeof console === undefinedType && level < self.levels.SILENT) {
            return "No console available for logging";
          }
        } else {
          throw "log.setLevel() called with invalid level: " + level;
        }
      };
      self.setDefaultLevel = function(level) {
        if (!getPersistedLevel()) {
          self.setLevel(level, false);
        }
      };
      self.enableAll = function(persist) {
        self.setLevel(self.levels.TRACE, persist);
      };
      self.disableAll = function(persist) {
        self.setLevel(self.levels.SILENT, persist);
      };
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
        initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }
    var defaultLogger = new Logger();
    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
      }
      return logger;
    };
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    return defaultLogger;
  }));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:loglevel@1.4.0.js", ["npm:loglevel@1.4.0/lib/loglevel.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:loglevel@1.4.0/lib/loglevel.js');
  global.define = __define;
  return module.exports;
});

System.register('components/logger/log.js', ['npm:loglevel@1.4.0.js'], function (_export) {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/

  var log;
  return {
    setters: [function (_npmLoglevel140Js) {
      log = _npmLoglevel140Js['default'];
    }],
    execute: function () {

      log.enableAll();
      /**
       * @class default
       * @requires loglevel.js for frontend logging, or something similar
       **/

      _export('default', {
        debug: function debug(e, errorText) {
          log.debug(errorText, e);
        }
      });
    }
  };
});
System.register('components/map/extensions/basicActions/basicActions.js', [], function (_export) {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/

  /*---------------------
  --------- API ---------
  ----------------------*/
  function extendUnit(object) {
    object.prototype.move = function () {};
  }
  return {
    setters: [],
    execute: function () {
      _export('extendUnit', extendUnit);
    }
  };
});
System.register('components/map/extensions/hexagons/Objects.js', ['npm:babel-runtime@5.8.24/helpers/get.js', 'npm:babel-runtime@5.8.24/helpers/inherits.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'npm:babel-runtime@5.8.24/core-js/object/assign.js', 'bundles/coreBundle.js', 'components/map/extensions/hexagons/utils/createHexagon.js', 'components/map/extensions/hexagons/utils/hexagonMath.js'], function (_export) {
  var _get, _inherits, _classCallCheck, _Object$assign, ObjectSpriteTerrain, ObjectSpriteUnit, createHexagon, hexagonMath, shape, ObjectTerrain, ObjectUnit;

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

    var HEIGHT = Math.round(hexagonMath.calcLongDiagonal(radius));
    var WIDTH = Math.round(hexagonMath.calcShortDiagonal(radius));
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
  return {
    setters: [function (_npmBabelRuntime5824HelpersGetJs) {
      _get = _npmBabelRuntime5824HelpersGetJs['default'];
    }, function (_npmBabelRuntime5824HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5824HelpersInheritsJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs['default'];
    }, function (_bundlesCoreBundleJs) {
      ObjectSpriteTerrain = _bundlesCoreBundleJs.ObjectSpriteTerrain;
      ObjectSpriteUnit = _bundlesCoreBundleJs.ObjectSpriteUnit;
    }, function (_componentsMapExtensionsHexagonsUtilsCreateHexagonJs) {
      createHexagon = _componentsMapExtensionsHexagonsUtilsCreateHexagonJs.createHexagon;
    }, function (_componentsMapExtensionsHexagonsUtilsHexagonMathJs) {
      hexagonMath = _componentsMapExtensionsHexagonsUtilsHexagonMathJs['default'];
    }],
    execute: function () {

      /*-----------------------
      -------- VARIABLES ------
      -----------------------*/

      /*-----------------------
      --------- IMPORT --------
      -----------------------*/
      'use strict';

      /*-----------------------
      ---------- API ----------
      -----------------------*/

      ObjectTerrain = (function (_ObjectSpriteTerrain) {
        _inherits(ObjectTerrain, _ObjectSpriteTerrain);

        /**
         * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are inherited, depending on the map type. For example you might want to add some click area for these
         *
         * @class ObjectTerrains
         * @constructor
         * @param  {Object} coords
         * @param  {Integer} coords.x         X coordinate
         * @param  {Integer} coords.y         Y coordinate
         * @param {object} data               This units custom data
         * @param {Object} options            options.radius REQUIRED.
         * @param {Number} options.radius     REQUIRED. This is the radius of the game maps hexagon.
         */

        function ObjectTerrain(coords, data, options) {
          _classCallCheck(this, ObjectTerrain);

          var radius = options.radius;

          _get(Object.getPrototypeOf(ObjectTerrain.prototype), 'constructor', this).call(this, coords, data, options);

          this.name = "DefaultTerrainObject_hexa";
          calculateHexa.call(this, radius);
        }

        return ObjectTerrain;
      })(ObjectSpriteTerrain);

      _export('ObjectTerrain', ObjectTerrain);

      _Object$assign(ObjectTerrain.prototype, calculateHexa);

      ObjectUnit = (function (_ObjectSpriteUnit) {
        _inherits(ObjectUnit, _ObjectSpriteUnit);

        /**
         * Map unit like infantry or worker, usually something with actions or movable. Usually these are extended, depending on the map type. For example you might want to add some click area for these (e.g. hexagon)
         *
         * @class ObjectUnit
         * @constructor
         * @param {Object} coords            This units coordinates, relative to it's parent container
         * @param {Integer} coords.x         X coordinate
         * @param {Integer} coords.y         Y coordinate
         * @param {object} data               This units custom data
         * @param {Object} options            options.radius REQUIRED
         * @param {Object} options.radius     REQUIRED. This is the radius of the game maps hexagon
         */

        function ObjectUnit(coords, data, options) {
          _classCallCheck(this, ObjectUnit);

          var radius = options.radius;

          _get(Object.getPrototypeOf(ObjectUnit.prototype), 'constructor', this).call(this, coords, data, options);

          this.name = "DefaultUnitObjects_hexa";

          calculateHexa.call(this, radius);
        }

        return ObjectUnit;
      })(ObjectSpriteUnit);

      _export('ObjectUnit', ObjectUnit);
    }
  };
});
System.register('components/map/extensions/hexagons/eventListeners/select.js', ['bundles/coreBundle.js'], function (_export) {

  /*---------------------
  --------- API ---------
  ----------------------*/
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var utils, mapEvents, UI, MapDataManipulator, eventListeners;

  /*---------------------
  ------- PUBLIC --------
  ----------------------*/
  /**
   * Handles the eventlistner for selecting objects on the map. THe actual logic for detecting the objects under mouse
   * etc. are in selectHexagonPlugin
   *
   * @class setupHexagonClick
   * @requires Hammer.js. Some events are done with Hammer.js, so we need it to handle those events correctly
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
  return {
    setters: [function (_bundlesCoreBundleJs) {
      utils = _bundlesCoreBundleJs.utils;
      mapEvents = _bundlesCoreBundleJs.mapEvents;
      UI = _bundlesCoreBundleJs.UI;
      MapDataManipulator = _bundlesCoreBundleJs.MapDataManipulator;
      eventListeners = _bundlesCoreBundleJs.eventListeners;
    }],
    execute: function () {
      _export('setupHexagonClick', _setupHexagonClick);
    }
  };
});
System.register('components/map/extensions/hexagons/selectHexagonPlugin.js', ['components/map/extensions/hexagons/eventListeners/select.js'], function (_export) {

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  /* For debugging. This will show up if the plugin fails to load in Map.js */
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/
  var setupHexagonClick, selectHexagonObject;

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Handles the selection of hexagons on the map
   *
   * @class object_select
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
  return {
    setters: [function (_componentsMapExtensionsHexagonsEventListenersSelectJs) {
      setupHexagonClick = _componentsMapExtensionsHexagonsEventListenersSelectJs.setupHexagonClick;
    }],
    execute: function () {
      selectHexagonObject = setupObject_select_hexagon();

      _export('selectHexagonObject', selectHexagonObject);
    }
  };
});
System.register('components/map/extensions/hexagons/index.js', ['components/map/extensions/hexagons/eventListeners/select.js', 'components/map/extensions/hexagons/utils/createHexagon.js', 'components/map/extensions/hexagons/utils/hexagonMath.js', 'components/map/extensions/hexagons/Objects.js', 'components/map/extensions/hexagons/selectHexagonPlugin.js'], function (_export) {
  'use strict';

  /*
   * Bundles the hexagons plugin
   */

  return {
    setters: [function (_componentsMapExtensionsHexagonsEventListenersSelectJs) {
      var _exportObj = {};

      for (var _key in _componentsMapExtensionsHexagonsEventListenersSelectJs) {
        if (_key !== 'default') _exportObj[_key] = _componentsMapExtensionsHexagonsEventListenersSelectJs[_key];
      }

      _export(_exportObj);
    }, function (_componentsMapExtensionsHexagonsUtilsCreateHexagonJs) {
      var _exportObj2 = {};

      for (var _key2 in _componentsMapExtensionsHexagonsUtilsCreateHexagonJs) {
        if (_key2 !== 'default') _exportObj2[_key2] = _componentsMapExtensionsHexagonsUtilsCreateHexagonJs[_key2];
      }

      _export(_exportObj2);
    }, function (_componentsMapExtensionsHexagonsUtilsHexagonMathJs) {
      var _exportObj3 = {};

      for (var _key3 in _componentsMapExtensionsHexagonsUtilsHexagonMathJs) {
        if (_key3 !== 'default') _exportObj3[_key3] = _componentsMapExtensionsHexagonsUtilsHexagonMathJs[_key3];
      }

      _export(_exportObj3);
    }, function (_componentsMapExtensionsHexagonsObjectsJs) {
      var _exportObj4 = {};

      for (var _key4 in _componentsMapExtensionsHexagonsObjectsJs) {
        if (_key4 !== 'default') _exportObj4[_key4] = _componentsMapExtensionsHexagonsObjectsJs[_key4];
      }

      _export(_exportObj4);
    }, function (_componentsMapExtensionsHexagonsSelectHexagonPluginJs) {
      var _exportObj5 = {};

      for (var _key5 in _componentsMapExtensionsHexagonsSelectHexagonPluginJs) {
        if (_key5 !== 'default') _exportObj5[_key5] = _componentsMapExtensionsHexagonsSelectHexagonPluginJs[_key5];
      }

      _export(_exportObj5);
    }],
    execute: function () {}
  };
});
System.register('components/map/extensions/mapMovement/mapMovement.js', ['npm:babel-runtime@5.8.24/core-js/object/assign.js', 'bundles/coreBundle.js', 'components/utilities/general.js'], function (_export) {
  var _Object$assign, mapEvents, arrays, viewportWorker, mapMovement;

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
    function init(map) {
      addAll(map);
      startEventListeners(map);
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
    function addAll(map) {
      var scale = map.getZoom();
      var viewportArea;

      viewportArea = map.getViewportArea();
      _Object$assign(viewportArea, getViewportsRightSideCoordinates(viewportArea));
      _Object$assign(viewportArea, applyScaleToViewport(viewportArea, map.getZoom()));

      map.getPrimaryLayers().forEach(function (layer) {
        var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());

        subcontainers.forEach(function (subcontainer) {
          subcontainer.visible = isObjectOutsideViewport(subcontainer, viewportArea, false, scale) ? false : true;
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
    function check(map) {
      if (queue.processing) {
        return false;
      }
      queue.processing = true;

      var viewportFn = setupHandleViewportArea(queue, map, changedCoordinates);
      window.setTimeout(viewportFn, CHECK_INTERVAL);

      function setupHandleViewportArea(queue, map, changedCoordinates) {
        var viewportArea = map.getViewportArea();

        if (window.Worker) {
          viewportWorker.onmessage = function (e) {
            var scale = map.getZoom();
            var scaledViewport = e.data[0];
            var smallerScaledViewport = e.data[1];
            var containersUnderChangedArea = [];
            var usesCache = map.isCacheActivated();
            var isOutside, scaledAndChangedViewport;

            scaledAndChangedViewport = _Object$assign({}, scaledViewport);

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
              isOutside = isObjectOutsideViewport(thisContainer, smallerScaledViewport, true, scale);

              if (isOutside) {
                thisContainer.visible = false;
              } else {
                thisContainer.visible = true;
              }
            });

            queue.processing = false;

            map.drawOnNextTick();
          };
          viewportWorker.postMessage([1, viewportArea, map.getZoom(), changedCoordinates]);
        } else {
          queue.processing = false;
          throw new Error("ERROR WITH WEB WORKER");
        }
      }

      return;
    }
    /**
     * @method startEventListeners
     * @param  {Map} map     Instance of Map
     */
    function startEventListeners(map) {
      mapEvents.subscribe("mapMoved", moveCb);
      mapEvents.subscribe("mapResized", resizeCb);

      function moveCb(type) {
        var movedCoordinates = type.customData[0];

        changedCoordinates.width += movedCoordinates.x;
        changedCoordinates.height += movedCoordinates.y;
        mapMovement.check(map);
      }
      function resizeCb() {
        mapMovement.check(map);
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
     * @param  {Number}  scale                  default = 1 (equals to no defaul scale / no scale)
     * @return {Boolean}
     */
    function isObjectOutsideViewport(object, viewportArea) {
      var hasParent = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var scale = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

      var isIt, globalCoords;

      globalCoords = object.getSubcontainerArea(scale, { toGlobal: hasParent });

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
     * @param {Number} scale
     */
    function applyScaleToViewport(viewportArea, scale) {
      return {
        x: Math.round(viewportArea.x / scale),
        y: Math.round(viewportArea.y / scale),
        x2: Math.round(viewportArea.x2 / scale),
        y2: Math.round(viewportArea.y2 / scale),
        width: Math.round(viewportArea.width / scale),
        height: Math.round(viewportArea.height / scale)
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
  return {
    setters: [function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs['default'];
    }, function (_bundlesCoreBundleJs) {
      mapEvents = _bundlesCoreBundleJs.mapEvents;
    }, function (_componentsUtilitiesGeneralJs) {
      arrays = _componentsUtilitiesGeneralJs.arrays;
    }],
    execute: function () {
      /* global console */

      /*-----------------------
      ------- VARIABLES -------
      -----------------------*/

      /*-----------------------
      --------- IMPORT --------
      -----------------------*/
      'use strict';viewportWorker = new Worker("/components/map/extensions/mapMovement/mapMovementWorker.js");

      /*-----------------------
      ---------- API ----------
      -----------------------*/
      /* For debugging. This will show up if the plugin fails to load in Map.js */
      mapMovement = setupMapMovement();

      _export('mapMovement', mapMovement);
    }
  };
});
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
!function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
    if (!a.document)
      throw new Error("jQuery requires a window with a document");
    return b(a);
  } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
      d = c.slice,
      e = c.concat,
      f = c.push,
      g = c.indexOf,
      h = {},
      i = h.toString,
      j = h.hasOwnProperty,
      k = {},
      l = a.document,
      m = "2.1.1 -deprecated,-dimensions,-event-alias,-offset,-css/hiddenVisibleSelectors,-effects/animatedSelector,-wrap",
      n = function(a, b) {
        return new n.fn.init(a, b);
      },
      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      p = /^-ms-/,
      q = /-([\da-z])/gi,
      r = function(a, b) {
        return b.toUpperCase();
      };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function() {
      return d.call(this);
    },
    get: function(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
    },
    pushStack: function(a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b;
    },
    each: function(a, b) {
      return n.each(this, a, b);
    },
    map: function(a) {
      return this.pushStack(n.map(this, function(b, c) {
        return a.call(b, c, b);
      }));
    },
    slice: function() {
      return this.pushStack(d.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(a) {
      var b = this.length,
          c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    push: f,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function() {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (a = arguments[h]))
        for (b in a)
          c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
    return g;
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(a) {
      throw new Error(a);
    },
    noop: function() {},
    isFunction: function(a) {
      return "function" === n.type(a);
    },
    isArray: Array.isArray,
    isWindow: function(a) {
      return null != a && a === a.window;
    },
    isNumeric: function(a) {
      return !n.isArray(a) && a - parseFloat(a) >= 0;
    },
    isPlainObject: function(a) {
      return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0;
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a)
        return !1;
      return !0;
    },
    type: function(a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a;
    },
    globalEval: function(a) {
      var b,
          c = eval;
      a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a));
    },
    camelCase: function(a) {
      return a.replace(p, "ms-").replace(q, r);
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function(a, b, c) {
      var d,
          e = 0,
          f = a.length,
          g = s(a);
      if (c) {
        if (g) {
          for (; f > e; e++)
            if (d = b.apply(a[e], c), d === !1)
              break;
        } else
          for (e in a)
            if (d = b.apply(a[e], c), d === !1)
              break;
      } else if (g) {
        for (; f > e; e++)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      } else
        for (e in a)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      return a;
    },
    trim: function(a) {
      return null == a ? "" : (a + "").replace(o, "");
    },
    makeArray: function(a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c;
    },
    inArray: function(a, b, c) {
      return null == b ? -1 : g.call(b, a, c);
    },
    merge: function(a, b) {
      for (var c = +b.length,
          d = 0,
          e = a.length; c > d; d++)
        a[e++] = b[d];
      return a.length = e, a;
    },
    grep: function(a, b, c) {
      for (var d,
          e = [],
          f = 0,
          g = a.length,
          h = !c; g > f; f++)
        d = !b(a[f], f), d !== h && e.push(a[f]);
      return e;
    },
    map: function(a, b, c) {
      var d,
          f = 0,
          g = a.length,
          h = s(a),
          i = [];
      if (h)
        for (; g > f; f++)
          d = b(a[f], f, c), null != d && i.push(d);
      else
        for (f in a)
          d = b(a[f], f, c), null != d && i.push(d);
      return e.apply([], i);
    },
    guid: 1,
    proxy: function(a, b) {
      var c,
          e,
          f;
      return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
        return a.apply(b || this, e.concat(d.call(arguments)));
      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0;
    },
    now: Date.now,
    support: k
  }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    h["[object " + b + "]"] = b.toLowerCase();
  });
  function s(a) {
    var b = a.length,
        c = n.type(a);
    return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
  }
  var t = a.document.documentElement,
      u,
      v = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.msMatchesSelector,
      w = function(a, b) {
        if (a === b)
          return u = !0, 0;
        var c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        return c ? 1 & c ? a === l || n.contains(l, a) ? -1 : b === l || n.contains(l, b) ? 1 : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
      };
  n.extend({
    find: function(a, b, c, d) {
      var e,
          f,
          g = 0;
      if (c = c || [], b = b || l, !a || "string" != typeof a)
        return c;
      if (1 !== (f = b.nodeType) && 9 !== f)
        return [];
      if (d)
        while (e = d[g++])
          n.find.matchesSelector(e, a) && c.push(e);
      else
        n.merge(c, b.querySelectorAll(a));
      return c;
    },
    unique: function(a) {
      var b,
          c = [],
          d = 0,
          e = 0;
      if (u = !1, a.sort(w), u) {
        while (b = a[d++])
          b === a[d] && (e = c.push(d));
        while (e--)
          a.splice(c[e], 1);
      }
      return a;
    },
    text: function(a) {
      var b,
          c = "",
          d = 0,
          e = a.nodeType;
      if (e) {
        if (1 === e || 9 === e || 11 === e)
          return a.textContent;
        if (3 === e || 4 === e)
          return a.nodeValue;
      } else
        while (b = a[d++])
          c += n.text(b);
      return c;
    },
    contains: function(a, b) {
      var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
      return a === d || !(!d || 1 !== d.nodeType || !c.contains(d));
    },
    isXMLDoc: function(a) {
      return "HTML" !== (a.ownerDocument || a).documentElement.nodeName;
    },
    expr: {
      attrHandle: {},
      match: {
        bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
        needsContext: /^[\x20\t\r\n\f]*[>+~]/
      }
    }
  }), n.extend(n.find, {
    matches: function(a, b) {
      return n.find(a, null, null, b);
    },
    matchesSelector: function(a, b) {
      return v.call(a, b);
    },
    attr: function(a, b) {
      return a.getAttribute(b);
    }
  });
  var x = n.expr.match.needsContext,
      y = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      z = /^.[^:#\[\.,]*$/;
  function A(a, b, c) {
    if (n.isFunction(b))
      return n.grep(a, function(a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return n.grep(a, function(a) {
        return a === b !== c;
      });
    if ("string" == typeof b) {
      if (z.test(b))
        return n.filter(b, a, c);
      b = n.filter(b, a);
    }
    return n.grep(a, function(a) {
      return g.call(b, a) >= 0 !== c;
    });
  }
  n.filter = function(a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
      return 1 === a.nodeType;
    }));
  }, n.fn.extend({
    find: function(a) {
      var b,
          c = this.length,
          d = [],
          e = this;
      if ("string" != typeof a)
        return this.pushStack(n(a).filter(function() {
          for (b = 0; c > b; b++)
            if (n.contains(e[b], this))
              return !0;
        }));
      for (b = 0; c > b; b++)
        n.find(a, e[b], d);
      return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d;
    },
    filter: function(a) {
      return this.pushStack(A(this, a || [], !1));
    },
    not: function(a) {
      return this.pushStack(A(this, a || [], !0));
    },
    is: function(a) {
      return !!A(this, "string" == typeof a && x.test(a) ? n(a) : a || [], !1).length;
    }
  });
  var B,
      C = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      D = n.fn.init = function(a, b) {
        var c,
            d;
        if (!a)
          return this;
        if ("string" == typeof a) {
          if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : C.exec(a), !c || !c[1] && b)
            return !b || b.jquery ? (b || B).find(a) : this.constructor(b).find(a);
          if (c[1]) {
            if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), y.test(c[1]) && n.isPlainObject(b))
              for (c in b)
                n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            return this;
          }
          return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof B.ready ? B.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
      };
  D.prototype = n.fn, B = n(l);
  var E = /^(?:parents|prev(?:Until|All))/,
      F = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
  n.extend({
    dir: function(a, b, c) {
      var d = [],
          e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c))
            break;
          d.push(a);
        }
      return d;
    },
    sibling: function(a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    }
  }), n.fn.extend({
    has: function(a) {
      var b = n(a, this),
          c = b.length;
      return this.filter(function() {
        for (var a = 0; c > a; a++)
          if (n.contains(this, b[a]))
            return !0;
      });
    },
    closest: function(a, b) {
      for (var c,
          d = 0,
          e = this.length,
          f = [],
          g = x.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break;
          }
      return this.pushStack(f.length > 1 ? n.unique(f) : f);
    },
    index: function(a) {
      return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function(a, b) {
      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }
  });
  function G(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType)
      ;
    return a;
  }
  n.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    parents: function(a) {
      return n.dir(a, "parentNode");
    },
    parentsUntil: function(a, b, c) {
      return n.dir(a, "parentNode", c);
    },
    next: function(a) {
      return G(a, "nextSibling");
    },
    prev: function(a) {
      return G(a, "previousSibling");
    },
    nextAll: function(a) {
      return n.dir(a, "nextSibling");
    },
    prevAll: function(a) {
      return n.dir(a, "previousSibling");
    },
    nextUntil: function(a, b, c) {
      return n.dir(a, "nextSibling", c);
    },
    prevUntil: function(a, b, c) {
      return n.dir(a, "previousSibling", c);
    },
    siblings: function(a) {
      return n.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function(a) {
      return n.sibling(a.firstChild);
    },
    contents: function(a) {
      return a.contentDocument || n.merge([], a.childNodes);
    }
  }, function(a, b) {
    n.fn[a] = function(c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (F[a] || n.unique(e), E.test(a) && e.reverse()), this.pushStack(e);
    };
  });
  var H = /\S+/g,
      I = {};
  function J(a) {
    var b = I[a] = {};
    return n.each(a.match(H) || [], function(a, c) {
      b[c] = !0;
    }), b;
  }
  n.Callbacks = function(a) {
    a = "string" == typeof a ? I[a] || J(a) : n.extend({}, a);
    var b,
        c,
        d,
        e,
        f,
        g,
        h = [],
        i = !a.once && [],
        j = function(l) {
          for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
            if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
              b = !1;
              break;
            }
          d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());
        },
        k = {
          add: function() {
            if (h) {
              var c = h.length;
              !function g(b) {
                n.each(b, function(b, c) {
                  var d = n.type(c);
                  "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c);
                });
              }(arguments), d ? f = h.length : b && (e = c, j(b));
            }
            return this;
          },
          remove: function() {
            return h && n.each(arguments, function(a, b) {
              var c;
              while ((c = n.inArray(b, h, c)) > -1)
                h.splice(c, 1), d && (f >= c && f--, g >= c && g--);
            }), this;
          },
          has: function(a) {
            return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
          },
          empty: function() {
            return h = [], f = 0, this;
          },
          disable: function() {
            return h = i = b = void 0, this;
          },
          disabled: function() {
            return !h;
          },
          lock: function() {
            return i = void 0, b || k.disable(), this;
          },
          locked: function() {
            return !i;
          },
          fireWith: function(a, b) {
            return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this;
          },
          fire: function() {
            return k.fireWith(this, arguments), this;
          },
          fired: function() {
            return !!c;
          }
        };
    return k;
  }, n.extend({
    Deferred: function(a) {
      var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
          c = "pending",
          d = {
            state: function() {
              return c;
            },
            always: function() {
              return e.done(arguments).fail(arguments), this;
            },
            then: function() {
              var a = arguments;
              return n.Deferred(function(c) {
                n.each(b, function(b, f) {
                  var g = n.isFunction(a[b]) && a[b];
                  e[f[1]](function() {
                    var a = g && g.apply(this, arguments);
                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
                  });
                }), a = null;
              }).promise();
            },
            promise: function(a) {
              return null != a ? n.extend(a, d) : d;
            }
          },
          e = {};
      return d.pipe = d.then, n.each(b, function(a, f) {
        var g = f[2],
            h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h;
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this;
        }, e[f[0] + "With"] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    },
    when: function(a) {
      var b = 0,
          c = d.call(arguments),
          e = c.length,
          f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function(a, b, c) {
            return function(e) {
              b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
      if (e > 1)
        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
          c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
      return f || g.resolveWith(k, c), g.promise();
    }
  });
  var K;
  n.fn.ready = function(a) {
    return n.ready.promise().done(a), this;
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? n.readyWait++ : n.ready(!0);
    },
    ready: function(a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (K.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))));
    }
  });
  function L() {
    l.removeEventListener("DOMContentLoaded", L, !1), a.removeEventListener("load", L, !1), n.ready();
  }
  n.ready.promise = function(b) {
    return K || (K = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", L, !1), a.addEventListener("load", L, !1))), K.promise(b);
  }, n.ready.promise();
  var M = n.access = function(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;
    if ("object" === n.type(c)) {
      e = !0;
      for (h in c)
        n.access(a, b, h, c[h], !0, f, g);
    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
      return j.call(n(a), c);
    })), b))
      for (; i > h; h++)
        b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  };
  n.acceptData = function(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };
  function N() {
    Object.defineProperty(this.cache = {}, 0, {get: function() {
        return {};
      }}), this.expando = n.expando + Math.random();
  }
  N.uid = 1, N.accepts = n.acceptData, N.prototype = {
    key: function(a) {
      if (!N.accepts(a))
        return 0;
      var b = {},
          c = a[this.expando];
      if (!c) {
        c = N.uid++;
        try {
          b[this.expando] = {value: c}, Object.defineProperties(a, b);
        } catch (d) {
          b[this.expando] = c, n.extend(a, b);
        }
      }
      return this.cache[c] || (this.cache[c] = {}), c;
    },
    set: function(a, b, c) {
      var d,
          e = this.key(a),
          f = this.cache[e];
      if ("string" == typeof b)
        f[b] = c;
      else if (n.isEmptyObject(f))
        n.extend(this.cache[e], b);
      else
        for (d in b)
          f[d] = b[d];
      return f;
    },
    get: function(a, b) {
      var c = this.cache[this.key(a)];
      return void 0 === b ? c : c[b];
    },
    access: function(a, b, c) {
      var d;
      return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
    },
    remove: function(a, b) {
      var c,
          d,
          e,
          f = this.key(a),
          g = this.cache[f];
      if (void 0 === b)
        this.cache[f] = {};
      else {
        n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(H) || [])), c = d.length;
        while (c--)
          delete g[d[c]];
      }
    },
    hasData: function(a) {
      return !n.isEmptyObject(this.cache[a[this.expando]] || {});
    },
    discard: function(a) {
      a[this.expando] && delete this.cache[a[this.expando]];
    }
  };
  var O = new N,
      P = new N,
      Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      R = /([A-Z])/g;
  function S(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType)
      if (d = "data-" + b.replace(R, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : Q.test(c) ? n.parseJSON(c) : c;
        } catch (e) {}
        P.set(a, b, c);
      } else
        c = void 0;
    return c;
  }
  n.extend({
    hasData: function(a) {
      return P.hasData(a) || O.hasData(a);
    },
    data: function(a, b, c) {
      return P.access(a, b, c);
    },
    removeData: function(a, b) {
      P.remove(a, b);
    },
    _data: function(a, b, c) {
      return O.access(a, b, c);
    },
    _removeData: function(a, b) {
      O.remove(a, b);
    }
  }), n.fn.extend({
    data: function(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = P.get(f), 1 === f.nodeType && !O.get(f, "hasDataAttrs"))) {
          c = g.length;
          while (c--)
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), S(f, d, e[d])));
          O.set(f, "hasDataAttrs", !0);
        }
        return e;
      }
      return "object" == typeof a ? this.each(function() {
        P.set(this, a);
      }) : M(this, function(b) {
        var c,
            d = n.camelCase(a);
        if (f && void 0 === b) {
          if (c = P.get(f, a), void 0 !== c)
            return c;
          if (c = P.get(f, d), void 0 !== c)
            return c;
          if (c = S(f, d, void 0), void 0 !== c)
            return c;
        } else
          this.each(function() {
            var c = P.get(this, d);
            P.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && P.set(this, a, b);
          });
      }, null, b, arguments.length > 1, null, !0);
    },
    removeData: function(a) {
      return this.each(function() {
        P.remove(this, a);
      });
    }
  }), n.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = O.get(a, b), c && (!d || n.isArray(c) ? d = O.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function() {
            n.dequeue(a, b);
          };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return O.get(a, c) || O.access(a, c, {empty: n.Callbacks("once memory").add(function() {
          O.remove(a, [b + "queue", c]);
        })});
    }
  }), n.fn.extend({
    queue: function(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
      });
    },
    dequeue: function(a) {
      return this.each(function() {
        n.dequeue(this, a);
      });
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", []);
    },
    promise: function(a, b) {
      var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function() {
            --d || e.resolveWith(f, [f]);
          };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--)
        c = O.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b);
    }
  });
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      U = ["Top", "Right", "Bottom", "Left"],
      V = function(a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
      },
      W = /^(?:checkbox|radio)$/i;
  !function() {
    var a = l.createDocumentFragment(),
        b = a.appendChild(l.createElement("div")),
        c = l.createElement("input");
    c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();
  var X = "undefined";
  k.focusinBubbles = "onfocusin" in a;
  var Y = /^key/,
      Z = /^(?:mouse|pointer|contextmenu)|click/,
      $ = /^(?:focusinfocus|focusoutblur)$/,
      _ = /^([^.]*)(?:\.(.+)|)$/;
  function ab() {
    return !0;
  }
  function bb() {
    return !1;
  }
  function cb() {
    try {
      return l.activeElement;
    } catch (a) {}
  }
  n.event = {
    global: {},
    add: function(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = O.get(a);
      if (r) {
        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
          return typeof n !== X && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(H) || [""], j = b.length;
        while (j--)
          h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
            type: o,
            origType: q,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && n.expr.match.needsContext.test(e),
            namespace: p.join(".")
          }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);
      }
    },
    remove: function(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r = O.hasData(a) && O.get(a);
      if (r && (i = r.events)) {
        b = (b || "").match(H) || [""], j = b.length;
        while (j--)
          if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
            while (f--)
              k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);
          } else
            for (o in i)
              n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(i) && (delete r.handle, O.remove(a, "events"));
      }
    },
    trigger: function(b, c, d, e) {
      var f,
          g,
          h,
          i,
          k,
          m,
          o,
          p = [d || l],
          q = j.call(b, "type") ? b.type : b,
          r = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
        if (!e && !o.noBubble && !n.isWindow(d)) {
          for (i = o.delegateType || q, $.test(i + q) || (g = g.parentNode); g; g = g.parentNode)
            p.push(g), h = g;
          h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a);
        }
        f = 0;
        while ((g = p[f++]) && !b.isPropagationStopped())
          b.type = f > 1 ? i : o.bindType || q, m = (O.get(g, "events") || {})[b.type] && O.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
        return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result;
      }
    },
    dispatch: function(a) {
      a = n.event.fix(a);
      var b,
          c,
          e,
          f,
          g,
          h = [],
          i = d.call(arguments),
          j = (O.get(this, "events") || {})[a.type] || [],
          k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, c = 0;
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
            (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function(a, b) {
      var c,
          d,
          e,
          f,
          g = [],
          h = b.delegateCount,
          i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i !== this; i = i.parentNode || this)
          if (i.disabled !== !0 || "click" !== a.type) {
            for (d = [], c = 0; h > c; c++)
              f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            });
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, b) {
        var c,
            d,
            e,
            f = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
      }
    },
    fix: function(a) {
      if (a[n.expando])
        return a;
      var b,
          c,
          d,
          e = a.type,
          f = a,
          g = this.fixHooks[e];
      g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
      while (b--)
        c = d[b], a[c] = f[c];
      return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a;
    },
    special: {
      load: {noBubble: !0},
      focus: {
        trigger: function() {
          return this !== cb() && this.focus ? (this.focus(), !1) : void 0;
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === cb() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0;
        },
        _default: function(a) {
          return n.nodeName(a.target, "a");
        }
      },
      beforeunload: {postDispatch: function(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        }}
    },
    simulate: function(a, b, c, d) {
      var e = n.extend(new n.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    }
  }, n.removeEvent = function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  }, n.Event = function(a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b);
  }, n.Event.prototype = {
    isDefaultPrevented: bb,
    isPropagationStopped: bb,
    isImmediatePropagationStopped: bb,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = ab, a && a.preventDefault && a.preventDefault();
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = ab, a && a.stopPropagation && a.stopPropagation();
    },
    stopImmediatePropagation: function() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;
        return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      }
    };
  }), k.focusinBubbles || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = function(a) {
      n.event.simulate(b, a.target, n.event.fix(a), !0);
    };
    n.event.special[b] = {
      setup: function() {
        var d = this.ownerDocument || this,
            e = O.access(d, b);
        e || d.addEventListener(a, c, !0), O.access(d, b, (e || 0) + 1);
      },
      teardown: function() {
        var d = this.ownerDocument || this,
            e = O.access(d, b) - 1;
        e ? O.access(d, b, e) : (d.removeEventListener(a, c, !0), O.remove(d, b));
      }
    };
  }), n.fn.extend({
    on: function(a, b, c, d, e) {
      var f,
          g;
      if ("object" == typeof a) {
        "string" != typeof b && (c = c || b, b = void 0);
        for (g in a)
          this.on(g, b, c, a[g], e);
        return this;
      }
      if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
        d = bb;
      else if (!d)
        return this;
      return 1 === e && (f = d, d = function(a) {
        return n().off(a), f.apply(this, arguments);
      }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
        n.event.add(this, a, d, c, b);
      });
    },
    one: function(a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function(a, b, c) {
      var d,
          e;
      if (a && a.preventDefault && a.handleObj)
        return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a)
          this.off(e, b, a[e]);
        return this;
      }
      return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() {
        n.event.remove(this, a, c, b);
      });
    },
    trigger: function(a, b) {
      return this.each(function() {
        n.event.trigger(a, b, this);
      });
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0;
    }
  });
  var db = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      eb = /<([\w:]+)/,
      fb = /<|&#?\w+;/,
      gb = /<(?:script|style|link)/i,
      hb = /checked\s*(?:[^=]|=\s*.checked.)/i,
      ib = /^$|\/(?:java|ecma)script/i,
      jb = /^true\/(.*)/,
      kb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      lb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
  lb.optgroup = lb.option, lb.tbody = lb.tfoot = lb.colgroup = lb.caption = lb.thead, lb.th = lb.td;
  function mb(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }
  function nb(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }
  function ob(a) {
    var b = jb.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }
  function pb(a, b) {
    for (var c = 0,
        d = a.length; d > c; c++)
      O.set(a[c], "globalEval", !b || O.get(b[c], "globalEval"));
  }
  function qb(a, b) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j;
    if (1 === b.nodeType) {
      if (O.hasData(a) && (f = O.access(a), g = O.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};
        for (e in j)
          for (c = 0, d = j[e].length; d > c; c++)
            n.event.add(b, e, j[e][c]);
      }
      P.hasData(a) && (h = P.access(a), i = n.extend({}, h), P.set(b, i));
    }
  }
  function rb(a, b) {
    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;
  }
  function sb(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && W.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
  }
  n.extend({
    clone: function(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = n.contains(a.ownerDocument, a);
      if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (g = rb(h), f = rb(a), d = 0, e = f.length; e > d; d++)
          sb(f[d], g[d]);
      if (b)
        if (c)
          for (f = f || rb(a), g = g || rb(h), d = 0, e = f.length; e > d; d++)
            qb(f[d], g[d]);
        else
          qb(a, h);
      return g = rb(h, "script"), g.length > 0 && pb(g, !i && rb(a, "script")), h;
    },
    buildFragment: function(a, b, c, d) {
      for (var e,
          f,
          g,
          h,
          i,
          j,
          k = b.createDocumentFragment(),
          l = [],
          m = 0,
          o = a.length; o > m; m++)
        if (e = a[m], e || 0 === e)
          if ("object" === n.type(e))
            n.merge(l, e.nodeType ? [e] : e);
          else if (fb.test(e)) {
            f = f || k.appendChild(b.createElement("div")), g = (eb.exec(e) || ["", ""])[1].toLowerCase(), h = lb[g] || lb._default, f.innerHTML = h[1] + e.replace(db, "<$1></$2>") + h[2], j = h[0];
            while (j--)
              f = f.lastChild;
            n.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
          } else
            l.push(b.createTextNode(e));
      k.textContent = "", m = 0;
      while (e = l[m++])
        if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = rb(k.appendChild(e), "script"), i && pb(f), c)) {
          j = 0;
          while (e = f[j++])
            ib.test(e.type || "") && c.push(e);
        }
      return k;
    },
    cleanData: function(a) {
      for (var b,
          c,
          d,
          e,
          f = n.event.special,
          g = 0; void 0 !== (c = a[g]); g++) {
        if (n.acceptData(c) && (e = c[O.expando], e && (b = O.cache[e]))) {
          if (b.events)
            for (d in b.events)
              f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
          O.cache[e] && delete O.cache[e];
        }
        delete P.cache[c[P.expando]];
      }
    }
  }), n.fn.extend({
    text: function(a) {
      return M(this, function(a) {
        return void 0 === a ? n.text(this) : this.empty().each(function() {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
        });
      }, null, a, arguments.length);
    },
    append: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = mb(this, a);
          b.appendChild(a);
        }
      });
    },
    prepend: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = mb(this, a);
          b.insertBefore(a, b.firstChild);
        }
      });
    },
    before: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    },
    after: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    },
    remove: function(a, b) {
      for (var c,
          d = a ? n.filter(a, this) : this,
          e = 0; null != (c = d[e]); e++)
        b || 1 !== c.nodeType || n.cleanData(rb(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && pb(rb(c, "script")), c.parentNode.removeChild(c));
      return this;
    },
    empty: function() {
      for (var a,
          b = 0; null != (a = this[b]); b++)
        1 === a.nodeType && (n.cleanData(rb(a, !1)), a.textContent = "");
      return this;
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return n.clone(this, a, b);
      });
    },
    html: function(a) {
      return M(this, function(a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;
        if (void 0 === a && 1 === b.nodeType)
          return b.innerHTML;
        if ("string" == typeof a && !gb.test(a) && !lb[(eb.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(db, "<$1></$2>");
          try {
            for (; d > c; c++)
              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(rb(b, !1)), b.innerHTML = a);
            b = 0;
          } catch (e) {}
        }
        b && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function() {
      var a = arguments[0];
      return this.domManip(arguments, function(b) {
        a = this.parentNode, n.cleanData(rb(this)), a && a.replaceChild(b, this);
      }), a && (a.length || a.nodeType) ? this : this.remove();
    },
    detach: function(a) {
      return this.remove(a, !0);
    },
    domManip: function(a, b) {
      a = e.apply([], a);
      var c,
          d,
          f,
          g,
          h,
          i,
          j = 0,
          l = this.length,
          m = this,
          o = l - 1,
          p = a[0],
          q = n.isFunction(p);
      if (q || l > 1 && "string" == typeof p && !k.checkClone && hb.test(p))
        return this.each(function(c) {
          var d = m.eq(c);
          q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
        });
      if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
        for (f = n.map(rb(c, "script"), nb), g = f.length; l > j; j++)
          h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, rb(h, "script"))), b.call(this[j], h, j);
        if (g)
          for (i = f[f.length - 1].ownerDocument, n.map(f, ob), j = 0; g > j; j++)
            h = f[j], ib.test(h.type || "") && !O.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(kb, "")));
      }
      return this;
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    n.fn[a] = function(a) {
      for (var c,
          d = [],
          e = n(a),
          g = e.length - 1,
          h = 0; g >= h; h++)
        c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
      return this.pushStack(d);
    };
  });
  var tb,
      ub = {};
  function vb(b, c) {
    var d,
        e = n(c.createElement(b)).appendTo(c.body),
        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
    return e.detach(), f;
  }
  function wb(a) {
    var b = l,
        c = ub[a];
    return c || (c = vb(a, b), "none" !== c && c || (tb = (tb || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = tb[0].contentDocument, b.write(), b.close(), c = vb(a, b), tb.detach()), ub[a] = c), c;
  }
  var xb = /^margin/,
      yb = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
      zb = function(a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null);
      };
  function Ab(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;
    return c = c || zb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), yb.test(g) && xb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }
  function Bb(a, b) {
    return {get: function() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      }};
  }
  !function() {
    var b,
        c,
        d = l.documentElement,
        e = l.createElement("div"),
        f = l.createElement("div");
    if (f.style) {
      f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);
      function g() {
        f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
        var g = a.getComputedStyle(f, null);
        b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e);
      }
      a.getComputedStyle && n.extend(k, {
        pixelPosition: function() {
          return g(), b;
        },
        boxSizingReliable: function() {
          return null == c && g(), c;
        },
        reliableMarginRight: function() {
          var b,
              c = f.appendChild(l.createElement("div"));
          return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), b;
        }
      });
    }
  }(), n.swap = function(a, b, c, d) {
    var e,
        f,
        g = {};
    for (f in b)
      g[f] = a.style[f], a.style[f] = b[f];
    e = c.apply(a, d || []);
    for (f in b)
      a.style[f] = g[f];
    return e;
  };
  var Cb = /^(none|table(?!-c[ea]).+)/,
      Db = new RegExp("^(" + T + ")(.*)$", "i"),
      Eb = new RegExp("^([+-])=(" + T + ")", "i"),
      Fb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      Gb = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      Hb = ["Webkit", "O", "Moz", "ms"];
  function Ib(a, b) {
    if (b in a)
      return b;
    var c = b[0].toUpperCase() + b.slice(1),
        d = b,
        e = Hb.length;
    while (e--)
      if (b = Hb[e] + c, b in a)
        return b;
    return d;
  }
  function Jb(a, b, c) {
    var d = Db.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
  }
  function Kb(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
        g = 0; 4 > f; f += 2)
      "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
    return g;
  }
  function Lb(a, b, c) {
    var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = zb(a),
        g = "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Ab(a, b, f), (0 > e || null == e) && (e = a.style[b]), yb.test(e))
        return e;
      d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
    }
    return e + Kb(a, b, c || (g ? "border" : "content"), d, f) + "px";
  }
  function Mb(a, b) {
    for (var c,
        d,
        e,
        f = [],
        g = 0,
        h = a.length; h > g; g++)
      d = a[g], d.style && (f[g] = O.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = O.access(d, "olddisplay", wb(d.nodeName)))) : (e = V(d), "none" === c && e || O.set(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++)
      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a;
  }
  n.extend({
    cssHooks: {opacity: {get: function(a, b) {
          if (b) {
            var c = Ab(a, "opacity");
            return "" === c ? "1" : c;
          }
        }}},
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {float: "cssFloat"},
    style: function(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = n.camelCase(b),
            i = a.style;
        return b = n.cssProps[h] || (n.cssProps[h] = Ib(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Eb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
      }
    },
    css: function(a, b, c, d) {
      var e,
          f,
          g,
          h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Ib(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Ab(a, b, d)), "normal" === e && b in Gb && (e = Gb[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e;
    }
  }), n.each(["height", "width"], function(a, b) {
    n.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? Cb.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Fb, function() {
          return Lb(a, b, d);
        }) : Lb(a, b, d) : void 0;
      },
      set: function(a, c, d) {
        var e = d && zb(a);
        return Jb(a, c, d ? Kb(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
      }
    };
  }), n.cssHooks.marginRight = Bb(k.reliableMarginRight, function(a, b) {
    return b ? n.swap(a, {display: "inline-block"}, Ab, [a, "marginRight"]) : void 0;
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    n.cssHooks[a + b] = {expand: function(c) {
        for (var d = 0,
            e = {},
            f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
          e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
        return e;
      }}, xb.test(a) || (n.cssHooks[a + b].set = Jb);
  }), n.fn.extend({
    css: function(a, b) {
      return M(this, function(a, b, c) {
        var d,
            e,
            f = {},
            g = 0;
        if (n.isArray(b)) {
          for (d = zb(a), e = b.length; e > g; g++)
            f[b[g]] = n.css(a, b[g], !1, d);
          return f;
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
      }, a, b, arguments.length > 1);
    },
    show: function() {
      return Mb(this, !0);
    },
    hide: function() {
      return Mb(this);
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        V(this) ? n(this).show() : n(this).hide();
      });
    }
  });
  function Nb(a, b, c, d, e) {
    return new Nb.prototype.init(a, b, c, d, e);
  }
  n.Tween = Nb, Nb.prototype = {
    constructor: Nb,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
    },
    cur: function() {
      var a = Nb.propHooks[this.prop];
      return a && a.get ? a.get(this) : Nb.propHooks._default.get(this);
    },
    run: function(a) {
      var b,
          c = Nb.propHooks[this.prop];
      return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Nb.propHooks._default.set(this), this;
    }
  }, Nb.prototype.init.prototype = Nb.prototype, Nb.propHooks = {_default: {
      get: function(a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop];
      },
      set: function(a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
      }
    }}, Nb.propHooks.scrollTop = Nb.propHooks.scrollLeft = {set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    }}, n.easing = {
    linear: function(a) {
      return a;
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    }
  }, n.fx = Nb.prototype.init, n.fx.step = {};
  var Ob,
      Pb,
      Qb = /^(?:toggle|show|hide)$/,
      Rb = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
      Sb = /queueHooks$/,
      Tb = [Yb],
      Ub = {"*": [function(a, b) {
          var c = this.createTween(a, b),
              d = c.cur(),
              e = Rb.exec(b),
              f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
              g = (n.cssNumber[a] || "px" !== f && +d) && Rb.exec(n.css(c.elem, a)),
              h = 1,
              i = 20;
          if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do
              h = h || ".5", g /= h, n.style(c.elem, a, g + f);
 while (h !== (h = c.cur() / d) && 1 !== h && --i);
          }
          return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
        }]};
  function Vb() {
    return setTimeout(function() {
      Ob = void 0;
    }), Ob = n.now();
  }
  function Wb(a, b) {
    var c,
        d = 0,
        e = {height: a};
    for (b = b ? 1 : 0; 4 > d; d += 2 - b)
      c = U[d], e["margin" + c] = e["padding" + c] = a;
    return b && (e.opacity = e.width = a), e;
  }
  function Xb(a, b, c) {
    for (var d,
        e = (Ub[b] || []).concat(Ub["*"]),
        f = 0,
        g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a))
        return d;
  }
  function Yb(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = this,
        m = {},
        o = a.style,
        p = a.nodeType && V(a),
        q = O.get(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
      h.unqueued || i();
    }), h.unqueued++, l.always(function() {
      l.always(function() {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
      });
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? O.get(a, "olddisplay") || wb(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
    }));
    for (d in b)
      if (e = b[d], Qb.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d])
            continue;
          p = !0;
        }
        m[d] = q && q[d] || n.style(a, d);
      } else
        j = void 0;
    if (n.isEmptyObject(m))
      "inline" === ("none" === j ? wb(a.nodeName) : j) && (o.display = j);
    else {
      q ? "hidden" in q && (p = q.hidden) : q = O.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
        n(a).hide();
      }), l.done(function() {
        var b;
        O.remove(a, "fxshow");
        for (b in m)
          n.style(a, b, m[b]);
      });
      for (d in m)
        g = Xb(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
    }
  }
  function Zb(a, b) {
    var c,
        d,
        e,
        f,
        g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f)
          c in a || (a[c] = f[c], b[c] = e);
      } else
        b[d] = e;
  }
  function $b(a, b, c) {
    var d,
        e,
        f = 0,
        g = Tb.length,
        h = n.Deferred().always(function() {
          delete i.elem;
        }),
        i = function() {
          if (e)
            return !1;
          for (var b = Ob || Vb(),
              c = Math.max(0, j.startTime + j.duration - b),
              d = c / j.duration || 0,
              f = 1 - d,
              g = 0,
              i = j.tweens.length; i > g; g++)
            j.tweens[g].run(f);
          return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
        },
        j = h.promise({
          elem: a,
          props: n.extend({}, b),
          opts: n.extend(!0, {specialEasing: {}}, c),
          originalProperties: b,
          originalOptions: c,
          startTime: Ob || Vb(),
          duration: c.duration,
          tweens: [],
          createTween: function(b, c) {
            var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
            return j.tweens.push(d), d;
          },
          stop: function(b) {
            var c = 0,
                d = b ? j.tweens.length : 0;
            if (e)
              return this;
            for (e = !0; d > c; c++)
              j.tweens[c].run(1);
            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
          }
        }),
        k = j.props;
    for (Zb(k, j.opts.specialEasing); g > f; f++)
      if (d = Tb[f].call(j, a, k, j.opts))
        return d;
    return n.map(k, Xb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
  }
  n.Animation = n.extend($b, {
    tweener: function(a, b) {
      n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
      for (var c,
          d = 0,
          e = a.length; e > d; d++)
        c = a[d], Ub[c] = Ub[c] || [], Ub[c].unshift(b);
    },
    prefilter: function(a, b) {
      b ? Tb.unshift(a) : Tb.push(a);
    }
  }), n.speed = function(a, b, c) {
    var d = a && "object" == typeof a ? n.extend({}, a) : {
      complete: c || !c && b || n.isFunction(a) && a,
      duration: a,
      easing: c && b || b && !n.isFunction(b) && b
    };
    return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
    }, d;
  }, n.fn.extend({
    fadeTo: function(a, b, c, d) {
      return this.filter(V).css("opacity", 0).show().end().animate({opacity: b}, a, c, d);
    },
    animate: function(a, b, c, d) {
      var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function() {
            var b = $b(this, n.extend({}, a), f);
            (e || O.get(this, "finish")) && b.stop(!0);
          };
      return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    },
    stop: function(a, b, c) {
      var d = function(a) {
        var b = a.stop;
        delete a.stop, b(c);
      };
      return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = O.get(this);
        if (e)
          g[e] && g[e].stop && d(g[e]);
        else
          for (e in g)
            g[e] && g[e].stop && Sb.test(e) && d(g[e]);
        for (e = f.length; e--; )
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        (b || !c) && n.dequeue(this, a);
      });
    },
    finish: function(a) {
      return a !== !1 && (a = a || "fx"), this.each(function() {
        var b,
            c = O.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;
        for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; )
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        for (b = 0; g > b; b++)
          d[b] && d[b].finish && d[b].finish.call(this);
        delete c.finish;
      });
    }
  }), n.each(["toggle", "show", "hide"], function(a, b) {
    var c = n.fn[b];
    n.fn[b] = function(a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Wb(b, !0), a, d, e);
    };
  }), n.each({
    slideDown: Wb("show"),
    slideUp: Wb("hide"),
    slideToggle: Wb("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(a, b) {
    n.fn[a] = function(a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), n.timers = [], n.fx.tick = function() {
    var a,
        b = 0,
        c = n.timers;
    for (Ob = n.now(); b < c.length; b++)
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    c.length || n.fx.stop(), Ob = void 0;
  }, n.fx.timer = function(a) {
    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
  }, n.fx.interval = 13, n.fx.start = function() {
    Pb || (Pb = setInterval(n.fx.tick, n.fx.interval));
  }, n.fx.stop = function() {
    clearInterval(Pb), Pb = null;
  }, n.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, n.fn.delay = function(a, b) {
    return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
      var d = setTimeout(b, a);
      c.stop = function() {
        clearTimeout(d);
      };
    });
  }, function() {
    var a = l.createElement("input"),
        b = l.createElement("select"),
        c = b.appendChild(l.createElement("option"));
    a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value;
  }();
  var _b,
      ac,
      bc = n.expr.attrHandle;
  n.fn.extend({
    attr: function(a, b) {
      return M(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function(a) {
      return this.each(function() {
        n.removeAttr(this, a);
      });
    }
  }), n.extend({
    attr: function(a, b, c) {
      var d,
          e,
          f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f)
        return typeof a.getAttribute === X ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ac : _b)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b));
    },
    removeAttr: function(a, b) {
      var c,
          d,
          e = 0,
          f = b && b.match(H);
      if (f && 1 === a.nodeType)
        while (c = f[e++])
          d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);
    },
    attrHooks: {type: {set: function(a, b) {
          if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b;
          }
        }}}
  }), ac = {set: function(a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
    }}, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = bc[b] || n.find.attr;
    bc[b] = function(a, b, d) {
      var e,
          f;
      return d || (f = bc[b], bc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, bc[b] = f), e;
    };
  });
  var cc = /^(?:input|select|textarea|button)$/i;
  n.fn.extend({
    prop: function(a, b) {
      return M(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function(a) {
      return this.each(function() {
        delete this[n.propFix[a] || a];
      });
    }
  }), n.extend({
    propFix: {
      for: "htmlFor",
      class: "className"
    },
    prop: function(a, b, c) {
      var d,
          e,
          f,
          g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g)
        return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    },
    propHooks: {tabIndex: {get: function(a) {
          return a.hasAttribute("tabindex") || cc.test(a.nodeName) || a.href ? a.tabIndex : -1;
        }}}
  }), k.optSelected || (n.propHooks.selected = {get: function(a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null;
    }}), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    n.propFix[this.toLowerCase()] = this;
  });
  var dc = /[\t\r\n\f]/g;
  n.fn.extend({
    addClass: function(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = "string" == typeof a && a,
          i = 0,
          j = this.length;
      if (n.isFunction(a))
        return this.each(function(b) {
          n(this).addClass(a.call(this, b, this.className));
        });
      if (h)
        for (b = (a || "").match(H) || []; j > i; i++)
          if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(dc, " ") : " ")) {
            f = 0;
            while (e = b[f++])
              d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = n.trim(d), c.className !== g && (c.className = g);
          }
      return this;
    },
    removeClass: function(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = 0 === arguments.length || "string" == typeof a && a,
          i = 0,
          j = this.length;
      if (n.isFunction(a))
        return this.each(function(b) {
          n(this).removeClass(a.call(this, b, this.className));
        });
      if (h)
        for (b = (a || "").match(H) || []; j > i; i++)
          if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(dc, " ") : "")) {
            f = 0;
            while (e = b[f++])
              while (d.indexOf(" " + e + " ") >= 0)
                d = d.replace(" " + e + " ", " ");
            g = a ? n.trim(d) : "", c.className !== g && (c.className = g);
          }
      return this;
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
        n(this).toggleClass(a.call(this, c, this.className, b), b);
      } : function() {
        if ("string" === c) {
          var b,
              d = 0,
              e = n(this),
              f = a.match(H) || [];
          while (b = f[d++])
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        } else
          (c === X || "boolean" === c) && (this.className && O.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : O.get(this, "__className__") || "");
      });
    },
    hasClass: function(a) {
      for (var b = " " + a + " ",
          c = 0,
          d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(dc, " ").indexOf(b) >= 0)
          return !0;
      return !1;
    }
  });
  var ec = /\r/g;
  n.fn.extend({val: function(a) {
      var b,
          c,
          d,
          e = this[0];
      {
        if (arguments.length)
          return d = n.isFunction(a), this.each(function(c) {
            var e;
            1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
              return null == a ? "" : a + "";
            })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
          });
        if (e)
          return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ec, "") : null == c ? "" : c);
      }
    }}), n.extend({valHooks: {
      option: {get: function(a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a));
        }},
      select: {
        get: function(a) {
          for (var b,
              c,
              d = a.options,
              e = a.selectedIndex,
              f = "select-one" === a.type || 0 > e,
              g = f ? null : [],
              h = f ? e + 1 : d.length,
              i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f)
                return b;
              g.push(b);
            }
          return g;
        },
        set: function(a, b) {
          var c,
              d,
              e = a.options,
              f = n.makeArray(b),
              g = e.length;
          while (g--)
            d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
          return c || (a.selectedIndex = -1), f;
        }
      }
    }}), n.each(["radio", "checkbox"], function() {
    n.valHooks[this] = {set: function(a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
      }}, k.checkOn || (n.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    n.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), n.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    },
    bind: function(a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function(a, b) {
      return this.off(a, null, b);
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    }
  });
  var fc = n.now(),
      gc = /\?/;
  n.parseJSON = function(a) {
    return JSON.parse(a + "");
  }, n.parseXML = function(a) {
    var b,
        c;
    if (!a || "string" != typeof a)
      return null;
    try {
      c = new DOMParser, b = c.parseFromString(a, "text/xml");
    } catch (d) {
      b = void 0;
    }
    return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b;
  };
  var hc,
      ic,
      jc = /#.*$/,
      kc = /([?&])_=[^&]*/,
      lc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      nc = /^(?:GET|HEAD)$/,
      oc = /^\/\//,
      pc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      qc = {},
      rc = {},
      sc = "*/".concat("*");
  try {
    ic = location.href;
  } catch (tc) {
    ic = l.createElement("a"), ic.href = "", ic = ic.href;
  }
  hc = pc.exec(ic.toLowerCase()) || [];
  function uc(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d,
          e = 0,
          f = b.toLowerCase().match(H) || [];
      if (n.isFunction(c))
        while (d = f[e++])
          "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
    };
  }
  function vc(a, b, c, d) {
    var e = {},
        f = a === rc;
    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*");
  }
  function wc(a, b) {
    var c,
        d,
        e = n.ajaxSettings.flatOptions || {};
    for (c in b)
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    return d && n.extend(!0, a, d), a;
  }
  function xc(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;
    while ("*" === i[0])
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    if (d)
      for (e in h)
        if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break;
        }
    if (i[0] in c)
      f = i[0];
    else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break;
        }
        g || (g = e);
      }
      f = f || g;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function yc(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters)
        j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f)
          f = i;
        else if ("*" !== i && i !== f) {
          if (g = j[i + " " + f] || j["* " + f], !g)
            for (e in j)
              if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
              }
          if (g !== !0)
            if (g && a["throws"])
              b = g(b);
            else
              try {
                b = g(b);
              } catch (l) {
                return {
                  state: "parsererror",
                  error: g ? l : "No conversion from " + i + " to " + f
                };
              }
        }
    return {
      state: "success",
      data: b
    };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ic,
      type: "GET",
      isLocal: mc.test(hc[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": sc,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? wc(wc(a, n.ajaxSettings), b) : wc(n.ajaxSettings, a);
    },
    ajaxPrefilter: uc(qc),
    ajaxTransport: uc(rc),
    ajax: function(a, b) {
      "object" == typeof a && (b = a, a = void 0), b = b || {};
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = n.ajaxSetup({}, b),
          l = k.context || k,
          m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
          o = n.Deferred(),
          p = n.Callbacks("once memory"),
          q = k.statusCode || {},
          r = {},
          s = {},
          t = 0,
          u = "canceled",
          v = {
            readyState: 0,
            getResponseHeader: function(a) {
              var b;
              if (2 === t) {
                if (!f) {
                  f = {};
                  while (b = lc.exec(e))
                    f[b[1].toLowerCase()] = b[2];
                }
                b = f[a.toLowerCase()];
              }
              return null == b ? null : b;
            },
            getAllResponseHeaders: function() {
              return 2 === t ? e : null;
            },
            setRequestHeader: function(a, b) {
              var c = a.toLowerCase();
              return t || (a = s[c] = s[c] || a, r[a] = b), this;
            },
            overrideMimeType: function(a) {
              return t || (k.mimeType = a), this;
            },
            statusCode: function(a) {
              var b;
              if (a)
                if (2 > t)
                  for (b in a)
                    q[b] = [q[b], a[b]];
                else
                  v.always(a[v.status]);
              return this;
            },
            abort: function(a) {
              var b = a || u;
              return c && c.abort(b), x(0, b), this;
            }
          };
      if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ic) + "").replace(jc, "").replace(oc, hc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(H) || [""], null == k.crossDomain && (h = pc.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === hc[1] && h[2] === hc[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (hc[3] || ("http:" === hc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), vc(qc, k, b, v), 2 === t)
        return v;
      i = k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !nc.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (gc.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = kc.test(d) ? d.replace(kc, "$1_=" + fc++) : d + (gc.test(d) ? "&" : "?") + "_=" + fc++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + sc + "; q=0.01" : "") : k.accepts["*"]);
      for (j in k.headers)
        v.setRequestHeader(j, k.headers[j]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
        return v.abort();
      u = "abort";
      for (j in {
        success: 1,
        error: 1,
        complete: 1
      })
        v[j](k[j]);
      if (c = vc(rc, k, b, v)) {
        v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
          v.abort("timeout");
        }, k.timeout));
        try {
          t = 1, c.send(r, x);
        } catch (w) {
          if (!(2 > t))
            throw w;
          x(-1, w);
        }
      } else
        x(-1, "No Transport");
      function x(a, b, f, h) {
        var j,
            r,
            s,
            u,
            w,
            x = b;
        2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = xc(k, v, f)), u = yc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")));
      }
      return v;
    },
    getJSON: function(a, b, c) {
      return n.get(a, b, c, "json");
    },
    getScript: function(a, b) {
      return n.get(a, void 0, b, "script");
    }
  }), n.each(["get", "post"], function(a, b) {
    n[b] = function(a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      });
    };
  }), n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    n.fn[b] = function(a) {
      return this.on(b, a);
    };
  }), n._evalUrl = function(a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      throws: !0
    });
  };
  var zc = /%20/g,
      Ac = /\[\]$/,
      Bc = /\r?\n/g,
      Cc = /^(?:submit|button|image|reset|file)$/i,
      Dc = /^(?:input|select|textarea|keygen)/i;
  function Ec(a, b, c, d) {
    var e;
    if (n.isArray(b))
      n.each(b, function(b, e) {
        c || Ac.test(a) ? d(a, e) : Ec(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
      });
    else if (c || "object" !== n.type(b))
      d(a, b);
    else
      for (e in b)
        Ec(a + "[" + e + "]", b[e], c, d);
  }
  n.param = function(a, b) {
    var c,
        d = [],
        e = function(a, b) {
          b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))
      n.each(a, function() {
        e(this.name, this.value);
      });
    else
      for (c in a)
        Ec(c, a[c], b, e);
    return d.join("&").replace(zc, "+");
  }, n.fn.extend({
    serialize: function() {
      return n.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this;
      }).filter(function() {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && Dc.test(this.nodeName) && !Cc.test(a) && (this.checked || !W.test(a));
      }).map(function(a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(Bc, "\r\n")
          };
        }) : {
          name: b.name,
          value: c.replace(Bc, "\r\n")
        };
      }).get();
    }
  }), n.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest;
    } catch (a) {}
  };
  var Fc = 0,
      Gc = {},
      Hc = {
        0: 200,
        1223: 204
      },
      Ic = n.ajaxSettings.xhr();
  a.ActiveXObject && n(a).on("unload", function() {
    for (var a in Gc)
      Gc[a]();
  }), k.cors = !!Ic && "withCredentials" in Ic, k.ajax = Ic = !!Ic, n.ajaxTransport(function(a) {
    var b;
    return k.cors || Ic && !a.crossDomain ? {
      send: function(c, d) {
        var e,
            f = a.xhr(),
            g = ++Fc;
        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
          for (e in a.xhrFields)
            f[e] = a.xhrFields[e];
        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
        for (e in c)
          f.setRequestHeader(e, c[e]);
        b = function(a) {
          return function() {
            b && (delete Gc[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Hc[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {text: f.responseText} : void 0, f.getAllResponseHeaders()));
          };
        }, f.onload = b(), f.onerror = b("error"), b = Gc[g] = b("abort");
        try {
          f.send(a.hasContent && a.data || null);
        } catch (h) {
          if (b)
            throw h;
        }
      },
      abort: function() {
        b && b();
      }
    } : void 0;
  }), n.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {"text script": function(a) {
        return n.globalEval(a), a;
      }}
  }), n.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), n.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b,
          c;
      return {
        send: function(d, e) {
          b = n("<script>").prop({
            async: !0,
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", c = function(a) {
            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
          }), l.head.appendChild(b[0]);
        },
        abort: function() {
          c && c();
        }
      };
    }
  });
  var Jc = [],
      Kc = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = Jc.pop() || n.expando + "_" + fc++;
      return this[a] = !0, a;
    }
  }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Kc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Kc.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Kc, "$1" + e) : b.jsonp !== !1 && (b.url += (gc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
      return g || n.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
      g = arguments;
    }, d.always(function() {
      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Jc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script") : void 0;
  }), n.parseHTML = function(a, b, c) {
    if (!a || "string" != typeof a)
      return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || l;
    var d = y.exec(a),
        e = !c && [];
    return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));
  };
  var Lc = n.fn.load;
  n.fn.load = function(a, b, c) {
    if ("string" != typeof a && Lc)
      return Lc.apply(this, arguments);
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");
    return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e,
      dataType: "html",
      data: b
    }).done(function(a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
    }).complete(c && function(a, b) {
      g.each(c, f || [a.responseText, b, a]);
    }), this;
  }, "function" == typeof define && define.amd && define("assets/lib/jquery/jquery-css-ajax-effects.min.js", [], function() {
    return n;
  });
  var Mc = a.jQuery,
      Nc = a.$;
  return n.noConflict = function(b) {
    return a.$ === n && (a.$ = Nc), b && a.jQuery === n && (a.jQuery = Mc), n;
  }, typeof b === X && (a.jQuery = a.$ = n), n;
});

_removeDefine();
})();
System.register("components/map/extensions/hexagons/utils/hexagonMath.js", [], function (_export) {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/

  /**
   * Utility module, for making different calculations and tests when hexagon based grid map in use
   *
   * @class hexagonMath
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
   * @method getHexagonPoints
   * @static
   * @param {Float} radius			radius of the hexagon
   * @param {object} options		extra options, like generating horizontal hexagon points and
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
  return {
    setters: [],
    execute: function () {
      _export("default", {
        calcShortDiagonal: calcShortDiagonal,
        calcLongDiagonal: calcLongDiagonal,
        getHexagonPoints: getHexagonPoints,
        hexaHitTest: hexaHitTest
      });

      _export("calcShortDiagonal", calcShortDiagonal);

      _export("calcShortDiagonal", calcLongDiagonal);

      _export("getHexagonPoints", getHexagonPoints);

      _export("hexaHitTest", hexaHitTest);
    }
  };
});
System.register('components/map/extensions/hexagons/utils/createHexagon.js', ['components/map/extensions/hexagons/utils/hexagonMath.js'], function (_export) {

  /*-----------------------
  ----------- API ---------
  -----------------------*/
  'use strict';

  /*-----------------------
  -------- IMPORTS --------
  -----------------------*/
  var getHexagonPoints;

  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * This manages some utility functionalities for creating hexagons
   *
   * @class createHexagons
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
  return {
    setters: [function (_componentsMapExtensionsHexagonsUtilsHexagonMathJs) {
      getHexagonPoints = _componentsMapExtensionsHexagonsUtilsHexagonMathJs.getHexagonPoints;
    }],
    execute: function () {
      _export('createHexagon', createHexagon);

      _export('createVisibleHexagon', createVisibleHexagon);
    }
  };
});
System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.object.keys.js", ["npm:core-js@1.1.4/library/modules/$.to-object.js", "npm:core-js@1.1.4/library/modules/$.object-sap.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toObject = $__require('npm:core-js@1.1.4/library/modules/$.to-object.js');
  $__require('npm:core-js@1.1.4/library/modules/$.object-sap.js')('keys', function($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/object/keys.js", ["npm:core-js@1.1.4/library/modules/es6.object.keys.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.object.keys.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').Object.keys;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/keys.js", ["npm:core-js@1.1.4/library/fn/object/keys.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/keys.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('components/map/core/utils/dataManipulation.js', ['npm:babel-runtime@5.8.24/core-js/object/keys.js'], function (_export) {
  var _Object$keys, dataManipulation;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * These are utils for manipulating the data, that our classes and functions use.
   *
   * @class core.utils.dataManipulation
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
      return _Object$keys(objects).map(function (objGroup) {
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
  return {
    setters: [function (_npmBabelRuntime5824CoreJsObjectKeysJs) {
      _Object$keys = _npmBabelRuntime5824CoreJsObjectKeysJs['default'];
    }],
    execute: function () {
      'use strict';

      /*---------------------
      --------- API ---------
      ----------------------*/
      dataManipulation = setupDataManipulation();

      _export('dataManipulation', dataManipulation);
    }
  };
});
System.register("components/map/core/utils/effects.js", [], function (_export) {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/
  var effects;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * This module will hold the most common graphical effects used in the map. It is still very stub as the development
   * hasn't proceeded to this stage yet.
   *
   * @class core.utils.effects
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
  return {
    setters: [],
    execute: function () {
      effects = setupEffects();

      _export("effects", effects);
    }
  };
});
System.register("components/map/core/utils/utils.js", [], function (_export) {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/
  var mouse, resize, environmentDetection, general;

  /**
   * @class core.utils.mouse
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
   * @class core.utils.resize
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
      var isInFullScreen = document.fullScreenElement && document.fullScreenElement !== null || (document.mozFullScreen || document.webkitIsFullScreen);

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
   * @class core.utils.environment
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
   * @class core.utils.general
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
  return {
    setters: [],
    execute: function () {
      mouse = setupMouseUtils();

      _export("mouse", mouse);

      resize = setupResizeUtils();

      _export("resize", resize);

      environmentDetection = setupEnvironmentDetection();

      _export("environmentDetection", environmentDetection);

      general = setupGeneral();

      _export("general", general);
    }
  };
});
System.register('components/map/core/utils/index.js', ['components/map/core/utils/dataManipulation.js', 'components/map/core/utils/effects.js', 'components/map/core/utils/utils.js'], function (_export) {

  /* Bundle utils in utils-parent and export them */
  'use strict';var dataManipulation, effects, mouse, resize, environmentDetection, general, utils;
  return {
    setters: [function (_componentsMapCoreUtilsDataManipulationJs) {
      dataManipulation = _componentsMapCoreUtilsDataManipulationJs.dataManipulation;
    }, function (_componentsMapCoreUtilsEffectsJs) {
      effects = _componentsMapCoreUtilsEffectsJs.effects;
    }, function (_componentsMapCoreUtilsUtilsJs) {
      mouse = _componentsMapCoreUtilsUtilsJs.mouse;
      resize = _componentsMapCoreUtilsUtilsJs.resize;
      environmentDetection = _componentsMapCoreUtilsUtilsJs.environmentDetection;
      general = _componentsMapCoreUtilsUtilsJs.general;
    }],
    execute: function () {
      utils = {
        dataManipulation: dataManipulation,
        effects: effects,
        mouse: mouse, resize: resize, environmentDetection: environmentDetection, general: general
      };

      _export('utils', utils);
    }
  };
});
System.register('components/map/core/Objects.js', ['npm:babel-runtime@5.8.24/helpers/get.js', 'npm:babel-runtime@5.8.24/helpers/inherits.js', 'npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'npm:babel-runtime@5.8.24/core-js/object/assign.js', 'bundles/strippedCoreBundle.js'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Object$assign, utils, Object_sprite, ObjectSpriteTerrain, ObjectSpriteUnit;

  return {
    setters: [function (_npmBabelRuntime5824HelpersGetJs) {
      _get = _npmBabelRuntime5824HelpersGetJs['default'];
    }, function (_npmBabelRuntime5824HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5824HelpersInheritsJs['default'];
    }, function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs['default'];
    }, function (_bundlesStrippedCoreBundleJs) {
      utils = _bundlesStrippedCoreBundleJs.utils;
    }],
    execute: function () {

      /*-----------------------
      ---------- API ----------
      -----------------------*/
      'use strict';

      /*-----------------------
      --------- IMPORT --------
      -----------------------*/

      Object_sprite = (function (_PIXI$Sprite) {
        _inherits(Object_sprite, _PIXI$Sprite);

        /**
         * The base class of all sprite objects
         *
         * @class core.Object_sprite
         * @constructor
         * @extends PIXI.Sprite
         * @param {PIXI.Point} coords                         the coordinate where the object is located at, relative to it's parent
         * @param {Object} data                               objects data, that will be used in the game. It will not actually be mainly used in graphical but rather things  like unit-data and city-data presentations etc.
         * @param {Object} options.currFrame       currFrame the current frames number. This is basically the initial image, we can change it later for animation or such
         */

        function Object_sprite() {
          var coord = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
          var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var options = arguments.length <= 2 || arguments[2] === undefined ? { currentFrame: {} } : arguments[2];

          _classCallCheck(this, Object_sprite);

          var currentFrame = options.currentFrame;

          _get(Object.getPrototypeOf(Object_sprite.prototype), 'constructor', this).call(this, currentFrame);

          /* We need to round the numbers. If there are decimal values, the graphics will get blurry */
          var exactCoords = {
            x: Math.round(coord.x),
            y: Math.round(coord.y)
          };
          this.position.set(exactCoords.x, exactCoords.y);
          /**
           * Name of the object. Used mostly for debugging
           *
           * @attribute
           * @type {String}
           */
          this.name = "Objects_sprite_" + this.id;
          /**
           * Type of the object. Can be used for filtering, ordering or finding correct objects.
           *
           * @attribute
           * @type {String}
           */
          this.type = "None";
          /**
           * Is the object highligtable.
           *
           * @attribute
           * @type {Boolean}
           */
          this.highlightable = true;
          /**
           * Objects custom data. Holds unit statistics and most data. Like unit movement speed etc.
           *
           * @attribute
           * @type {Object}
           */
          this.data = data;
          /**
           * Current frame (from spritesheet) we are showing.
           *
           * @attribute
           * @type {Number}
           */
          this.currentFrame = currentFrame;
          /**
           * Object area width in pixels.
           *
           * @attribute
           * @type {Number}
           */
          this.areaWidth = this.width;
          /**
           * Object area height in pixels.
           *
           * @attribute
           * @type {Number}
           */
          this.areaHeight = this.height;
        }

        /**
         * Drawing the object
         *
         * @method innerDraw
         * @param {Number} x coordinate x
         * @param {Number} y coordinate y
         * @return this object instance
         */

        _createClass(Object_sprite, [{
          key: 'innerDraw',
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
          key: 'drawNewFrame',
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
          key: 'getGraphicalArea',
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
          key: 'localToLocal',
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
          key: 'clone',
          value: function clone(renderer) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? { position: false, anchor: false } : arguments[1];

            var newSprite = new PIXI.Sprite();

            newSprite.texture = this.generateTexture(renderer);

            if (options.anchor) {
              newSprite.anchor = _Object$assign({}, this.anchor);
            }
            if (options.position) {
              newSprite.position = _Object$assign({}, this.position);
            }

            return newSprite;
          }
        }]);

        return Object_sprite;
      })(PIXI.Sprite);

      _export('Object_sprite', Object_sprite);

      ObjectSpriteTerrain = (function (_Object_sprite) {
        _inherits(ObjectSpriteTerrain, _Object_sprite);

        /**
         * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
         * inherited, depending on the map type. For example you might want to add some click area for these
         *
         * @class core.ObjectSpriteTerrain
         * @constructor
         * @extends core.Object_sprite
         * @param {Coordinates} coords        format: {x: Number, y: Number}. Coordinates for the object relative to it's parent
         * @param {object} data               This units custom data
         * @param {object} options            other specific options for constructing this terrain
         */

        function ObjectSpriteTerrain(coords, data, options) {
          _classCallCheck(this, ObjectSpriteTerrain);

          _get(Object.getPrototypeOf(ObjectSpriteTerrain.prototype), 'constructor', this).call(this, coords, data, options);

          this.name = "DefaultTerrainObject";
          this.type = "terrain";
          this.highlightable = false;
        }

        return ObjectSpriteTerrain;
      })(Object_sprite);

      _export('ObjectSpriteTerrain', ObjectSpriteTerrain);

      ObjectSpriteUnit = (function (_Object_sprite2) {
        _inherits(ObjectSpriteUnit, _Object_sprite2);

        /**
         * Map unit like infantry or worker, usually something with actions or movable. Usually these are extended, depending on the map type. For example you might want to add some click area for these (e.g. hexagon)
         *
         * @class core.ObjectSpriteUnit
         * @constructor
         * @extends core.Object_sprite
         * @requires core.graphics
         * @param {Object} coords               Coordinates for the object relative to it's parent
         * @param {Integer} coords.x            X coordinate
         * @param {Integer} coords.y            Y coordinate
         * @param {object} data                 This units data
         * @param {object} options              other specific options for constructing this unit, like options.throwShadow
         * @param {object} options.throwShadow  Can we throw a shadow under this object
         */

        function ObjectSpriteUnit(coords, data, options) {
          _classCallCheck(this, ObjectSpriteUnit);

          _get(Object.getPrototypeOf(ObjectSpriteUnit.prototype), 'constructor', this).call(this, coords, data, options);

          this.name = "DefaultUnitObjects";
          this.type = "unit";
          /**
           * actions bound to this object. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
           *
           * @attribute actions
           * @type {Object}
           */
          this.actions = {
            move: [],
            attack: []
          };
        }

        /**
         * Execute action on units (move, attack etc.). @todo THIS HAS NOT BEEN IMPLEMENTED YET!
         *
         * @method  doAction
         * @param {String} type
         */

        _createClass(ObjectSpriteUnit, [{
          key: 'doAction',
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
          key: 'addActionType',
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
          key: 'addCallbackToAction',
          value: function addCallbackToAction(type, cb) {
            this.actions[type].push(cb);
          }

          /**
           * @method dropShadow
           */
        }, {
          key: 'dropShadow',
          value: function dropShadow() {
            var _utils$effects;

            return (_utils$effects = utils.effects).dropShadow.apply(_utils$effects, arguments);
          }
        }]);

        return ObjectSpriteUnit;
      })(Object_sprite);

      _export('ObjectSpriteUnit', ObjectSpriteUnit);
    }
  };
});
System.register('components/map/core/eventlisteners.js', ['npm:babel-runtime@5.8.24/core-js/set.js', 'bundles/strippedCoreBundle.js'], function (_export) {
  var _Set, mapEvents, stateOfEvents, activeEventListeners, detectors, eventListeners;

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * This keeps all the event listeners and detectors in one class. You add detectors / event listener types with addDetector and you add event listeners with on.
   *
   * @class core.eventListeners
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
      detectors[type].on(_createWrapper("Map" + type, cb));
      activeEventListeners[type] = activeEventListeners[type] || new _Set();
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
      cb ? activeEventListeners[type]['delete'](cb) : delete activeEventListeners[type];
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
    function setActivityState(type, newState) {
      if (type === undefined) type = "";

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
     * @method _createWrapper
     * @private
     * @static
     * @param  {String}   type Event type
     * @param  {Function} cb   Event callback
     */
    function _createWrapper(type, cb) {
      /* NOTE! There can be more than one arguments in an event. E.g. Hamster.js */
      return function () {
        mapEvents.publish(type);
        cb.apply(undefined, arguments);
      };
    }
  }
  return {
    setters: [function (_npmBabelRuntime5824CoreJsSetJs) {
      _Set = _npmBabelRuntime5824CoreJsSetJs['default'];
    }, function (_bundlesStrippedCoreBundleJs) {
      mapEvents = _bundlesStrippedCoreBundleJs.mapEvents;
    }],
    execute: function () {
      /* global Hammer, Hamster */

      /*-----------------------
      ---------- API ----------
      -----------------------*/
      'use strict';

      /*-----------------------
      ------- VARIABLES -------
      -----------------------*/

      /*-----------------------
      --------- IMPORT --------
      -----------------------*/
      stateOfEvents = {};
      activeEventListeners = {};
      detectors = {};
      eventListeners = eventListenersModule();

      _export('eventListeners', eventListeners);
    }
  };
});
System.registerDynamic("npm:core-js@1.1.4/library/modules/$.collection-strong.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.hide.js", "npm:core-js@1.1.4/library/modules/$.ctx.js", "npm:core-js@1.1.4/library/modules/$.species.js", "npm:core-js@1.1.4/library/modules/$.strict-new.js", "npm:core-js@1.1.4/library/modules/$.defined.js", "npm:core-js@1.1.4/library/modules/$.for-of.js", "npm:core-js@1.1.4/library/modules/$.iter-step.js", "npm:core-js@1.1.4/library/modules/$.uid.js", "npm:core-js@1.1.4/library/modules/$.has.js", "npm:core-js@1.1.4/library/modules/$.is-object.js", "npm:core-js@1.1.4/library/modules/$.support-desc.js", "npm:core-js@1.1.4/library/modules/$.mix.js", "npm:core-js@1.1.4/library/modules/$.iter-define.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
      hide = $__require('npm:core-js@1.1.4/library/modules/$.hide.js'),
      ctx = $__require('npm:core-js@1.1.4/library/modules/$.ctx.js'),
      species = $__require('npm:core-js@1.1.4/library/modules/$.species.js'),
      strictNew = $__require('npm:core-js@1.1.4/library/modules/$.strict-new.js'),
      defined = $__require('npm:core-js@1.1.4/library/modules/$.defined.js'),
      forOf = $__require('npm:core-js@1.1.4/library/modules/$.for-of.js'),
      step = $__require('npm:core-js@1.1.4/library/modules/$.iter-step.js'),
      ID = $__require('npm:core-js@1.1.4/library/modules/$.uid.js')('id'),
      $has = $__require('npm:core-js@1.1.4/library/modules/$.has.js'),
      isObject = $__require('npm:core-js@1.1.4/library/modules/$.is-object.js'),
      isExtensible = Object.isExtensible || isObject,
      SUPPORT_DESC = $__require('npm:core-js@1.1.4/library/modules/$.support-desc.js'),
      SIZE = SUPPORT_DESC ? '_s' : 'size',
      id = 0;
  var fastKey = function(it, create) {
    if (!isObject(it))
      return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!$has(it, ID)) {
      if (!isExtensible(it))
        return 'F';
      if (!create)
        return 'E';
      hide(it, ID, ++id);
    }
    return 'O' + it[ID];
  };
  var getEntry = function(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that._i[index];
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  };
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        strictNew(that, C, NAME);
        that._i = $.create(null);
        that._f = undefined;
        that._l = undefined;
        that[SIZE] = 0;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      $__require('npm:core-js@1.1.4/library/modules/$.mix.js')(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that._i,
              entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that._f == entry)
              that._f = next;
            if (that._l == entry)
              that._l = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if (SUPPORT_DESC)
        $.setDesc(C.prototype, 'size', {get: function() {
            return defined(this[SIZE]);
          }});
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key),
          prev,
          index;
      if (entry) {
        entry.v = value;
      } else {
        that._l = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that._l,
          n: undefined,
          r: false
        };
        if (!that._f)
          that._f = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that._i[index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setStrong: function(C, NAME, IS_MAP) {
      $__require('npm:core-js@1.1.4/library/modules/$.iter-define.js')(C, NAME, function(iterated, kind) {
        this._t = iterated;
        this._k = kind;
        this._l = undefined;
      }, function() {
        var that = this,
            kind = that._k,
            entry = that._l;
        while (entry && entry.r)
          entry = entry.p;
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          that._t = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
      species(C);
      species($__require('npm:core-js@1.1.4/library/modules/$.core.js')[NAME]);
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.collection.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.hide.js", "npm:core-js@1.1.4/library/modules/$.for-of.js", "npm:core-js@1.1.4/library/modules/$.strict-new.js", "npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.support-desc.js", "npm:core-js@1.1.4/library/modules/$.fails.js", "npm:core-js@1.1.4/library/modules/$.mix.js", "npm:core-js@1.1.4/library/modules/$.tag.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
      $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js'),
      hide = $__require('npm:core-js@1.1.4/library/modules/$.hide.js'),
      forOf = $__require('npm:core-js@1.1.4/library/modules/$.for-of.js'),
      strictNew = $__require('npm:core-js@1.1.4/library/modules/$.strict-new.js');
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = $__require('npm:core-js@1.1.4/library/modules/$.global.js')[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    if (!$__require('npm:core-js@1.1.4/library/modules/$.support-desc.js') || typeof C != 'function' || !(IS_WEAK || proto.forEach && !$__require('npm:core-js@1.1.4/library/modules/$.fails.js')(function() {
      new C().entries().next();
    }))) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      $__require('npm:core-js@1.1.4/library/modules/$.mix.js')(C.prototype, methods);
    } else {
      C = wrapper(function(target, iterable) {
        strictNew(target, C, NAME);
        target._c = new Base;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, target[ADDER], target);
      });
      $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function(KEY) {
        var chain = KEY == 'add' || KEY == 'set';
        if (KEY in proto && !(IS_WEAK && KEY == 'clear'))
          hide(C.prototype, KEY, function(a, b) {
            var result = this._c[KEY](a === 0 ? 0 : a, b);
            return chain ? this : result;
          });
      });
      if ('size' in proto)
        $.setDesc(C.prototype, 'size', {get: function() {
            return this._c.size;
          }});
    }
    $__require('npm:core-js@1.1.4/library/modules/$.tag.js')(C, NAME);
    O[NAME] = C;
    $def($def.G + $def.W + $def.F, O);
    if (!IS_WEAK)
      common.setStrong(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.set.js", ["npm:core-js@1.1.4/library/modules/$.collection-strong.js", "npm:core-js@1.1.4/library/modules/$.collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var strong = $__require('npm:core-js@1.1.4/library/modules/$.collection-strong.js');
  $__require('npm:core-js@1.1.4/library/modules/$.collection.js')('Set', function(get) {
    return function Set() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.collection-to-json.js", ["npm:core-js@1.1.4/library/modules/$.for-of.js", "npm:core-js@1.1.4/library/modules/$.classof.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var forOf = $__require('npm:core-js@1.1.4/library/modules/$.for-of.js'),
      classof = $__require('npm:core-js@1.1.4/library/modules/$.classof.js');
  module.exports = function(NAME) {
    return function toJSON() {
      if (classof(this) != NAME)
        throw TypeError(NAME + "#toJSON isn't generic");
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es7.set.to-json.js", ["npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.collection-to-json.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js');
  $def($def.P, 'Set', {toJSON: $__require('npm:core-js@1.1.4/library/modules/$.collection-to-json.js')('Set')});
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/set.js", ["npm:core-js@1.1.4/library/modules/es6.object.to-string.js", "npm:core-js@1.1.4/library/modules/es6.string.iterator.js", "npm:core-js@1.1.4/library/modules/web.dom.iterable.js", "npm:core-js@1.1.4/library/modules/es6.set.js", "npm:core-js@1.1.4/library/modules/es7.set.to-json.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.object.to-string.js');
  $__require('npm:core-js@1.1.4/library/modules/es6.string.iterator.js');
  $__require('npm:core-js@1.1.4/library/modules/web.dom.iterable.js');
  $__require('npm:core-js@1.1.4/library/modules/es6.set.js');
  $__require('npm:core-js@1.1.4/library/modules/es7.set.to-json.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').Set;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/set.js", ["npm:core-js@1.1.4/library/fn/set.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/set.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.object.to-string.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.string-at.js", ["npm:core-js@1.1.4/library/modules/$.to-integer.js", "npm:core-js@1.1.4/library/modules/$.defined.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('npm:core-js@1.1.4/library/modules/$.to-integer.js'),
      defined = $__require('npm:core-js@1.1.4/library/modules/$.defined.js');
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.string.iterator.js", ["npm:core-js@1.1.4/library/modules/$.string-at.js", "npm:core-js@1.1.4/library/modules/$.iter-define.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('npm:core-js@1.1.4/library/modules/$.string-at.js')(true);
  $__require('npm:core-js@1.1.4/library/modules/$.iter-define.js')(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.unscope.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iter-step.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(done, value) {
    return {
      value: value,
      done: !!done
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iter-create.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.hide.js", "npm:core-js@1.1.4/library/modules/$.wks.js", "npm:core-js@1.1.4/library/modules/$.property-desc.js", "npm:core-js@1.1.4/library/modules/$.tag.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
      IteratorPrototype = {};
  $__require('npm:core-js@1.1.4/library/modules/$.hide.js')(IteratorPrototype, $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: $__require('npm:core-js@1.1.4/library/modules/$.property-desc.js')(1, next)});
    $__require('npm:core-js@1.1.4/library/modules/$.tag.js')(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iter-define.js", ["npm:core-js@1.1.4/library/modules/$.library.js", "npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.redef.js", "npm:core-js@1.1.4/library/modules/$.hide.js", "npm:core-js@1.1.4/library/modules/$.has.js", "npm:core-js@1.1.4/library/modules/$.wks.js", "npm:core-js@1.1.4/library/modules/$.iterators.js", "npm:core-js@1.1.4/library/modules/$.iter-create.js", "npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.tag.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('npm:core-js@1.1.4/library/modules/$.library.js'),
      $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js'),
      $redef = $__require('npm:core-js@1.1.4/library/modules/$.redef.js'),
      hide = $__require('npm:core-js@1.1.4/library/modules/$.hide.js'),
      has = $__require('npm:core-js@1.1.4/library/modules/$.has.js'),
      SYMBOL_ITERATOR = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('iterator'),
      Iterators = $__require('npm:core-js@1.1.4/library/modules/$.iterators.js'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    $__require('npm:core-js@1.1.4/library/modules/$.iter-create.js')(Constructor, NAME, next);
    var createMethod = function(kind) {
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = $__require('npm:core-js@1.1.4/library/modules/$.js').getProto(_default.call(new Base));
      $__require('npm:core-js@1.1.4/library/modules/$.tag.js')(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
    }
    if (!LIBRARY || FORCE)
      hide(proto, SYMBOL_ITERATOR, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        keys: IS_SET ? _default : createMethod(KEYS),
        values: DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if (FORCE)
        for (key in methods) {
          if (!(key in proto))
            $redef(proto, key, methods[key]);
        }
      else
        $def($def.P + $def.F * BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.array.iterator.js", ["npm:core-js@1.1.4/library/modules/$.unscope.js", "npm:core-js@1.1.4/library/modules/$.iter-step.js", "npm:core-js@1.1.4/library/modules/$.iterators.js", "npm:core-js@1.1.4/library/modules/$.to-iobject.js", "npm:core-js@1.1.4/library/modules/$.iter-define.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var setUnscope = $__require('npm:core-js@1.1.4/library/modules/$.unscope.js'),
      step = $__require('npm:core-js@1.1.4/library/modules/$.iter-step.js'),
      Iterators = $__require('npm:core-js@1.1.4/library/modules/$.iterators.js'),
      toIObject = $__require('npm:core-js@1.1.4/library/modules/$.to-iobject.js');
  $__require('npm:core-js@1.1.4/library/modules/$.iter-define.js')(Array, 'Array', function(iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/web.dom.iterable.js", ["npm:core-js@1.1.4/library/modules/es6.array.iterator.js", "npm:core-js@1.1.4/library/modules/$.iterators.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.array.iterator.js');
  var Iterators = $__require('npm:core-js@1.1.4/library/modules/$.iterators.js');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.library.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.strict-new.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iter-call.js", ["npm:core-js@1.1.4/library/modules/$.an-object.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('npm:core-js@1.1.4/library/modules/$.an-object.js');
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.is-array-iter.js", ["npm:core-js@1.1.4/library/modules/$.iterators.js", "npm:core-js@1.1.4/library/modules/$.wks.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('npm:core-js@1.1.4/library/modules/$.iterators.js'),
      ITERATOR = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('iterator');
  module.exports = function(it) {
    return (Iterators.Array || Array.prototype[ITERATOR]) === it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.to-integer.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.to-length.js", ["npm:core-js@1.1.4/library/modules/$.to-integer.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('npm:core-js@1.1.4/library/modules/$.to-integer.js'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.classof.js", ["npm:core-js@1.1.4/library/modules/$.cof.js", "npm:core-js@1.1.4/library/modules/$.wks.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('npm:core-js@1.1.4/library/modules/$.cof.js'),
      TAG = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iterators.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/core.get-iterator-method.js", ["npm:core-js@1.1.4/library/modules/$.classof.js", "npm:core-js@1.1.4/library/modules/$.wks.js", "npm:core-js@1.1.4/library/modules/$.iterators.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('npm:core-js@1.1.4/library/modules/$.classof.js'),
      ITERATOR = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('iterator'),
      Iterators = $__require('npm:core-js@1.1.4/library/modules/$.iterators.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.for-of.js", ["npm:core-js@1.1.4/library/modules/$.ctx.js", "npm:core-js@1.1.4/library/modules/$.iter-call.js", "npm:core-js@1.1.4/library/modules/$.is-array-iter.js", "npm:core-js@1.1.4/library/modules/$.an-object.js", "npm:core-js@1.1.4/library/modules/$.to-length.js", "npm:core-js@1.1.4/library/modules/core.get-iterator-method.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('npm:core-js@1.1.4/library/modules/$.ctx.js'),
      call = $__require('npm:core-js@1.1.4/library/modules/$.iter-call.js'),
      isArrayIter = $__require('npm:core-js@1.1.4/library/modules/$.is-array-iter.js'),
      anObject = $__require('npm:core-js@1.1.4/library/modules/$.an-object.js'),
      toLength = $__require('npm:core-js@1.1.4/library/modules/$.to-length.js'),
      getIterFn = $__require('npm:core-js@1.1.4/library/modules/core.get-iterator-method.js');
  module.exports = function(iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function')
      throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
      for (length = toLength(iterable.length); length > index; index++) {
        entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        call(iterator, f, step.value, entries);
      }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.same.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.species.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.wks.js", "npm:core-js@1.1.4/library/modules/$.support-desc.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
      SPECIES = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('species');
  module.exports = function(C) {
    if ($__require('npm:core-js@1.1.4/library/modules/$.support-desc.js') && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.invoke.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.html.js", ["npm:core-js@1.1.4/library/modules/$.global.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.global.js').document && document.documentElement;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.dom-create.js", ["npm:core-js@1.1.4/library/modules/$.is-object.js", "npm:core-js@1.1.4/library/modules/$.global.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('npm:core-js@1.1.4/library/modules/$.is-object.js'),
      document = $__require('npm:core-js@1.1.4/library/modules/$.global.js').document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.task.js", ["npm:core-js@1.1.4/library/modules/$.ctx.js", "npm:core-js@1.1.4/library/modules/$.invoke.js", "npm:core-js@1.1.4/library/modules/$.html.js", "npm:core-js@1.1.4/library/modules/$.dom-create.js", "npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.cof.js", "github:jspm/nodelibs-process@0.1.1.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ctx = $__require('npm:core-js@1.1.4/library/modules/$.ctx.js'),
        invoke = $__require('npm:core-js@1.1.4/library/modules/$.invoke.js'),
        html = $__require('npm:core-js@1.1.4/library/modules/$.html.js'),
        cel = $__require('npm:core-js@1.1.4/library/modules/$.dom-create.js'),
        global = $__require('npm:core-js@1.1.4/library/modules/$.global.js'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function(event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('npm:core-js@1.1.4/library/modules/$.cof.js')(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScript) {
        defer = function(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('github:jspm/nodelibs-process@0.1.1.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.microtask.js", ["npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.task.js", "npm:core-js@1.1.4/library/modules/$.cof.js", "github:jspm/nodelibs-process@0.1.1.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = $__require('npm:core-js@1.1.4/library/modules/$.global.js'),
        macrotask = $__require('npm:core-js@1.1.4/library/modules/$.task.js').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        isNode = $__require('npm:core-js@1.1.4/library/modules/$.cof.js')(process) == 'process',
        head,
        last,
        notify;
    var flush = function() {
      var parent,
          domain;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        if (domain)
          domain.enter();
        head.fn.call();
        if (domain)
          domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent)
        parent.enter();
    };
    if (isNode) {
      notify = function() {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, {characterData: true});
      notify = function() {
        node.data = toggle = -toggle;
      };
    } else {
      notify = function() {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last)
        last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('github:jspm/nodelibs-process@0.1.1.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.redef.js", ["npm:core-js@1.1.4/library/modules/$.hide.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.hide.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.mix.js", ["npm:core-js@1.1.4/library/modules/$.redef.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $redef = $__require('npm:core-js@1.1.4/library/modules/$.redef.js');
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.has.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.property-desc.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.support-desc.js", ["npm:core-js@1.1.4/library/modules/$.fails.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('npm:core-js@1.1.4/library/modules/$.fails.js')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.hide.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.property-desc.js", "npm:core-js@1.1.4/library/modules/$.support-desc.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
      createDesc = $__require('npm:core-js@1.1.4/library/modules/$.property-desc.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.support-desc.js') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.tag.js", ["npm:core-js@1.1.4/library/modules/$.has.js", "npm:core-js@1.1.4/library/modules/$.hide.js", "npm:core-js@1.1.4/library/modules/$.wks.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var has = $__require('npm:core-js@1.1.4/library/modules/$.has.js'),
      hide = $__require('npm:core-js@1.1.4/library/modules/$.hide.js'),
      TAG = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      hide(it, TAG, tag);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.shared.js", ["npm:core-js@1.1.4/library/modules/$.global.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('npm:core-js@1.1.4/library/modules/$.global.js'),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.uid.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.wks.js", ["npm:core-js@1.1.4/library/modules/$.shared.js", "npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.uid.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('npm:core-js@1.1.4/library/modules/$.shared.js')('wks'),
      Symbol = $__require('npm:core-js@1.1.4/library/modules/$.global.js').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || $__require('npm:core-js@1.1.4/library/modules/$.uid.js'))('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iter-detect.js", ["npm:core-js@1.1.4/library/modules/$.wks.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec) {
    if (!SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[SYMBOL_ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[SYMBOL_ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.10.1/browser.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.10.1.js", ["npm:process@0.10.1/browser.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:process@0.10.1/browser.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.1/index.js", ["npm:process@0.10.1.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.10.1.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.1.js", ["github:jspm/nodelibs-process@0.1.1/index.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.1/index.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.promise.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.library.js", "npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.ctx.js", "npm:core-js@1.1.4/library/modules/$.classof.js", "npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.is-object.js", "npm:core-js@1.1.4/library/modules/$.an-object.js", "npm:core-js@1.1.4/library/modules/$.a-function.js", "npm:core-js@1.1.4/library/modules/$.strict-new.js", "npm:core-js@1.1.4/library/modules/$.for-of.js", "npm:core-js@1.1.4/library/modules/$.set-proto.js", "npm:core-js@1.1.4/library/modules/$.same.js", "npm:core-js@1.1.4/library/modules/$.species.js", "npm:core-js@1.1.4/library/modules/$.wks.js", "npm:core-js@1.1.4/library/modules/$.uid.js", "npm:core-js@1.1.4/library/modules/$.microtask.js", "npm:core-js@1.1.4/library/modules/$.support-desc.js", "npm:core-js@1.1.4/library/modules/$.mix.js", "npm:core-js@1.1.4/library/modules/$.tag.js", "npm:core-js@1.1.4/library/modules/$.core.js", "npm:core-js@1.1.4/library/modules/$.iter-detect.js", "github:jspm/nodelibs-process@0.1.1.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = $__require('npm:core-js@1.1.4/library/modules/$.js'),
        LIBRARY = $__require('npm:core-js@1.1.4/library/modules/$.library.js'),
        global = $__require('npm:core-js@1.1.4/library/modules/$.global.js'),
        ctx = $__require('npm:core-js@1.1.4/library/modules/$.ctx.js'),
        classof = $__require('npm:core-js@1.1.4/library/modules/$.classof.js'),
        $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js'),
        isObject = $__require('npm:core-js@1.1.4/library/modules/$.is-object.js'),
        anObject = $__require('npm:core-js@1.1.4/library/modules/$.an-object.js'),
        aFunction = $__require('npm:core-js@1.1.4/library/modules/$.a-function.js'),
        strictNew = $__require('npm:core-js@1.1.4/library/modules/$.strict-new.js'),
        forOf = $__require('npm:core-js@1.1.4/library/modules/$.for-of.js'),
        setProto = $__require('npm:core-js@1.1.4/library/modules/$.set-proto.js').set,
        same = $__require('npm:core-js@1.1.4/library/modules/$.same.js'),
        species = $__require('npm:core-js@1.1.4/library/modules/$.species.js'),
        SPECIES = $__require('npm:core-js@1.1.4/library/modules/$.wks.js')('species'),
        RECORD = $__require('npm:core-js@1.1.4/library/modules/$.uid.js')('record'),
        asap = $__require('npm:core-js@1.1.4/library/modules/$.microtask.js'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        Wrapper;
    var testResolve = function(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    };
    var useNative = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('npm:core-js@1.1.4/library/modules/$.support-desc.js')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var isPromise = function(it) {
      return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
    };
    var sameConstructor = function(a, b) {
      if (LIBRARY && a === P && b === Wrapper)
        return true;
      return same(a, b);
    };
    var getConstructor = function(C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function(it) {
      var then;
      return isObject(it) && typeof(then = it.then) == 'function' ? then : false;
    };
    var notify = function(record, isReject) {
      if (record.n)
        return;
      record.n = true;
      var chain = record.c;
      asap(function() {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function(react) {
          var cb = ok ? react.ok : react.fail,
              ret,
              then;
          try {
            if (cb) {
              if (!ok)
                record.h = true;
              ret = cb === true ? value : cb(value);
              if (ret === react.P) {
                react.rej(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(ret)) {
                then.call(ret, react.res, react.rej);
              } else
                react.res(ret);
            } else
              react.rej(value);
          } catch (err) {
            react.rej(err);
          }
        };
        while (chain.length > i)
          run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject)
          setTimeout(function() {
            if (isUnhandled(record.p)) {
              if (isNode) {
                process.emit('unhandledRejection', value, record.p);
              } else if (global.console && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            }
            record.a = undefined;
          }, 1);
      });
    };
    var isUnhandled = function(promise) {
      var record = promise[RECORD],
          chain = record.a || record.c,
          i = 0,
          react;
      if (record.h)
        return false;
      while (chain.length > i) {
        react = chain[i++];
        if (react.fail || !isUnhandled(react.P))
          return false;
      }
      return true;
    };
    var $reject = function(value) {
      var record = this;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function(value) {
      var record = this,
          then;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      try {
        if (then = isThenable(value)) {
          asap(function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!useNative) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        this[RECORD] = record;
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('npm:core-js@1.1.4/library/modules/$.mix.js')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = anObject(anObject(this).constructor)[SPECIES];
          var react = {
            ok: typeof onFulfilled == 'function' ? onFulfilled : true,
            fail: typeof onRejected == 'function' ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = aFunction(res);
            react.rej = aFunction(rej);
          });
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          if (record.s)
            notify(record, false);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    $__require('npm:core-js@1.1.4/library/modules/$.tag.js')(P, PROMISE);
    species(P);
    species(Wrapper = $__require('npm:core-js@1.1.4/library/modules/$.core.js')[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {reject: function reject(r) {
        return new this(function(res, rej) {
          rej(r);
        });
      }});
    $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function(res) {
          res(x);
        });
      }});
    $def($def.S + $def.F * !(useNative && $__require('npm:core-js@1.1.4/library/modules/$.iter-detect.js')(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            values = [];
        return new C(function(res, rej) {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              C.resolve(promise).then(function(value) {
                results[index] = value;
                --remaining || res(results);
              }, rej);
            });
          else
            res(results);
        });
      },
      race: function race(iterable) {
        var C = getConstructor(this);
        return new C(function(res, rej) {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(res, rej);
          });
        });
      }
    });
  })($__require('github:jspm/nodelibs-process@0.1.1.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/promise.js", ["npm:core-js@1.1.4/library/modules/es6.object.to-string.js", "npm:core-js@1.1.4/library/modules/es6.string.iterator.js", "npm:core-js@1.1.4/library/modules/web.dom.iterable.js", "npm:core-js@1.1.4/library/modules/es6.promise.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.object.to-string.js');
  $__require('npm:core-js@1.1.4/library/modules/es6.string.iterator.js');
  $__require('npm:core-js@1.1.4/library/modules/web.dom.iterable.js');
  $__require('npm:core-js@1.1.4/library/modules/es6.promise.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').Promise;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/promise.js", ["npm:core-js@1.1.4/library/fn/promise.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/promise.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('components/map/core/Map.js', ['npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'npm:babel-runtime@5.8.24/core-js/set.js', 'npm:babel-runtime@5.8.24/core-js/object/assign.js', 'npm:babel-runtime@5.8.24/core-js/promise.js', 'bundles/strippedCoreBundle.js', 'npm:q@1.4.1.js'], function (_export) {
  var _createClass, _classCallCheck, _Set, _Object$assign, _Promise, MapLayer, MapLayerParent, ObjectManager, mapEvents, utils, MapDataManipulator, Q, LAYER_TYPE_STATIC, LAYER_TYPE_MOVABLE, _drawMapOnNextTick, isMapReadyPromises, _staticLayer, _movableLayer, _renderer, ParentLayerConstructor, Map;

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
  return {
    setters: [function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_npmBabelRuntime5824CoreJsSetJs) {
      _Set = _npmBabelRuntime5824CoreJsSetJs['default'];
    }, function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs['default'];
    }, function (_npmBabelRuntime5824CoreJsPromiseJs) {
      _Promise = _npmBabelRuntime5824CoreJsPromiseJs['default'];
    }, function (_bundlesStrippedCoreBundleJs) {
      MapLayer = _bundlesStrippedCoreBundleJs.MapLayer;
      MapLayerParent = _bundlesStrippedCoreBundleJs.MapLayerParent;
      ObjectManager = _bundlesStrippedCoreBundleJs.ObjectManager;
      mapEvents = _bundlesStrippedCoreBundleJs.mapEvents;
      utils = _bundlesStrippedCoreBundleJs.utils;
      MapDataManipulator = _bundlesStrippedCoreBundleJs.MapDataManipulator;
    }, function (_npmQ141Js) {
      Q = _npmQ141Js;
    }],
    execute: function () {
      /* global System, Q */

      /*---------------------
      ------ VARIABLES ------
      ----------------------*/
      'use strict';

      /*---------------------
      ------- IMPORT --------
      ----------------------*/
      LAYER_TYPE_STATIC = 0;
      LAYER_TYPE_MOVABLE = 1;
      _drawMapOnNextTick = false;
      isMapReadyPromises = [];

      /*---------------------
      --------- API ---------
      ----------------------*/

      Map = (function () {
        /**
         * #Main class for the engine
         *
         * Initializes the whole structure and plugins and is used as primary API for all operations. This class is e.g. passed to every plugin that get initialized with their init-method.
         *
         * You use the class by instantiating it (new) and then finishing initialization with init-method. Please see examples below.
         *
         * The biggest part of creating the map, is the data structure. There is a clear data structure that you can see from the tests/data-folder, but the factory is responsible for creating the objects, so you can use your own factory implementation. So to understand more, please see e.g. core.horizontalHexaFactory.
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
         * @class core.Map
         * @constructor
         * @requires PIXI.JS framework in global namespace
         * @requires Canvas (webGL support recommended) HTML5-element supported.
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

        function Map() {
          var canvasContainer = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
          var props = arguments.length <= 1 || arguments[1] === undefined ? {
            bounds: { width: 0, height: 0 },
            rendererOptions: { refreshEventListeners: true },
            subcontainers: false,
            cache: false,
            trackFPSCB: false } : arguments[1];

          _classCallCheck(this, Map);

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
          ParentLayerConstructor = subcontainers ? MapLayerParent : MapLayer;

          /* These are the 2 topmost layers on the map:
           * - staticLayer: Keeps at the same coordinates always and is responsible for holding map scale value and possible
           * objects that do not move with the map. StaticLayer has only one child: _movableLayer
           * - movableLayer: Moves the map, when the user commands. Can hold e.g. UI objects that move with the map. Like
           * graphics that show which area or object is currently selected. */
          _staticLayer = new MapLayer({ name: "staticLayer", coord: { x: 0, y: 0 } });
          _movableLayer = new MapLayer({ name: "movableLayer", coord: { x: 0, y: 0 } });
          _staticLayer.addChild(_movableLayer);

          /* needed to make the canvas fullsize canvas with PIXI */
          _renderer.view.style.position = "absolute";
          _renderer.view.style.display = "block";
          _renderer.view.style.left = "0px";
          _renderer.view.style.top = "0px";
          /* stop scrollbars of showing */
          document.getElementsByTagName("body")[0].style.overflow = "hidden";

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
           * @see class/core/Map.js~Map.html#instance-method-activatePlugins
           *
           * @attribute plugins
           * @type {Set}
           **/
          this.plugins = new _Set();
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

        _createClass(Map, [{
          key: 'init',
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
            coord && _Object$assign(_movableLayer, coord);

            /* We activate the default tick for the map, but if custom tick callback has been given, we activate it too */
            this._defaultTick();
            tickCB && this.customTickOn(tickCB);
            isMapReadyPromises = allPromises;

            if (this.cache) {
              this.cacheMap();
            }

            this.drawOnNextTick();

            return allPromises || _Promise.resolve();
          }

          /**
           * Returns a promise that resolves after the map is fully initialized
           *
           * @method whenReady
           * @return {Promise}        Promise that holds all the individual plugin loading promises
           **/
        }, {
          key: 'whenReady',
          value: function whenReady() {
            return Q.all(isMapReadyPromises);
          }

          /**
           * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
           *
           * @method drawOnNextTick
           **/
        }, {
          key: 'drawOnNextTick',
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
          key: 'addUIObject',
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
          key: 'removeUIObject',
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
          key: 'addUIObjects',
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
          key: 'createSpecialLayer',
          value: function createSpecialLayer() {
            var name = arguments.length <= 0 || arguments[0] === undefined ? "default special layer" : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? { coord: { x: 0, y: 0 }, toLayer: toLayer } : arguments[1];
            return (function () {
              var coord = options.coord;
              var toLayer = options.toLayer;

              var layer = new MapLayer(name, coord);

              layer.specialLayer = true;
              toLayer && toLayer.addChild(layer);

              return layer;
            })();
          }

          /**
           * All parameters are passed to ParentLayerConstructor (normally constructor of MapLayer).
           *
           * @method addLayer
           * @uses MapLayer
           * @return {MapLayer}          created MapLayer instance
           **/
        }, {
          key: 'addLayer',
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
          key: 'usesSubcontainers',
          value: function usesSubcontainers() {
            return this.getSubcontainerConfigs() ? true : false;
          }

          /**
           * Returns current subcontainers configurations (like subcontainers size).
           *
           * @method getSubcontainerConfigs
           **/
        }, {
          key: 'getSubcontainerConfigs',
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
          key: 'getViewportArea',
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
          key: 'removeLayer',
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
          key: 'moveMap',
          value: function moveMap() {
            var coord = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
            var informCoordinates = arguments.length <= 1 || arguments[1] === undefined ? coord : arguments[1];
            return (function () {
              var realCoordinates = {
                x: Math.round(coord.x / this.getStaticLayer().getZoom()),
                y: Math.round(coord.y / this.getStaticLayer().getZoom())
              };
              _movableLayer.move(realCoordinates);
              mapEvents.publish("mapMoved", informCoordinates || realCoordinates);
              this.drawOnNextTick();
            }).apply(this, arguments);
          }

          /**
           * Is cache on
           *
           * @method isCacheActivated
           * @return {Boolean}
           **/
        }, {
          key: 'isCacheActivated',
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
          key: 'cacheMap',
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
          key: 'unCacheMap',
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
          key: 'activatePlugins',
          value: function activatePlugins() {
            var _this2 = this;

            var pluginsArray = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var allPromises = [];

            /* Iterates over given plugins Array and calls their init-method, depeding if it is String or Object */
            pluginsArray.forEach(function (plugin) {
              if (typeof plugin === "object") {
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
          key: 'activatePlugin',
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
          key: 'setPrototype',
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
          key: 'getObjectsUnderArea',
          value: function getObjectsUnderArea() {
            var globalCoords = arguments.length <= 0 || arguments[0] === undefined ? { x: 0, y: 0, width: 0, height: 0 } : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? { filter: filter } : arguments[1];
            return (function () {
              var filter = options.filter;

              /* We need both coordinates later on and it's logical to do the work here */
              var allCoords = {
                globalCoords: globalCoords,
                localCoords: this.getMovableLayer().toLocal(new PIXI.Point(globalCoords.x, globalCoords.y))
              };
              var objects = {};
              var selectableContainerfilter;

              allCoords.localCoords.width = globalCoords.width;
              allCoords.localCoords.height = globalCoords.height;
              selectableContainerfilter = new MapDataManipulator({
                type: "filter",
                object: "container",
                property: "selectable",
                value: true
              });
              filter.addRule(selectableContainerfilter);

              if (this.usesSubcontainers()) {
                var allMatchingSubcontainers = this._getSubcontainersUnderArea(allCoords, { filter: filter });

                objects = this._retrieveObjects(allCoords, {
                  subcontainers: allMatchingSubcontainers
                });
              }

              return objects;
            }).apply(this, arguments);
          }

          /**
           * This returns the normal parent layers that we mostly use for manipulation everything. MovableLayer and staticLayer are built-in layers designed to provide the basic functionalities like zooming and moving the map. These layers provide everything that extends the map more.
           *
           * @method getPrimaryLayers
           * @return {Object} Basically anything in the map that is used as a layer (not really counting subcontainers).
           */
        }, {
          key: 'getPrimaryLayers',
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
          key: 'getMapCoordinates',
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
          key: 'getZoomLayer',
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
          key: 'setZoom',
          value: function setZoom(scale) {
            return this.getZoomLayer().setZoom(scale);
          }

          /**
           * Get map zoom. 1 = no zoom. <1 zoom out, >1 zoom in.
           *
           * @method getZoom
           * @return {MapLayer|PIXI.Container|PIXI.ParticleContainer}
           */
        }, {
          key: 'getZoom',
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
          key: 'getMovableLayer',
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
          key: 'getRenderer',
          value: function getRenderer() {
            return _renderer;
          }

          /**
           * Return static layer. The static layer is the topmost of all layers. It handles zooming and other non-movable operations.
           *
           * @method getStaticLayer
           */
        }, {
          key: 'getStaticLayer',
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
          key: 'zoomIn',
          value: function zoomIn() {
            return "notImplementedYet. Activate with plugin";
          }

          /**
           * This is abstract method and needs to be implemented with a plugin. Core module has an implementation for this and if you don't implement your own, I suggest you use it.
           *
           * @method zoomOut
           */
        }, {
          key: 'zoomOut',
          value: function zoomOut() {
            return "notImplementedYet. Activate with plugin";
          }

          /**
           * Resize the canvas to fill the whole browser content area. Defined by the baseEventlisteners core plugin
           *
           * @method toggleFullsize
           **/
        }, {
          key: 'toggleFullsize',
          value: function toggleFullsize() {
            return "notImplementedYet. Activate with plugin";
          }

          /**
           * Toggles fullscreen mode. Defined by the baseEventlisteners core plugin
           *
           * @method toggleFullScreen
           **/
        }, {
          key: 'toggleFullScreen',
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
          key: '_retrieveObjects',
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
          key: '_getLayersWithAttributes',
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
          key: '_getSubcontainersUnderArea',
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
          key: '_setFullScreen',
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
          key: '_resizeCanvas',
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
          key: '_defaultTick',
          value: function _defaultTick() {
            var ONE_SECOND = 1000;
            var FPSCount = 0;
            var fpsTimer = new Date().getTime();
            var renderStart, totalRenderTime;

            PIXI.ticker.shared.add((function () {
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
            }).bind(this));
          }
        }]);

        return Map;
      })();

      _export('Map', Map);
    }
  };
});
System.register('components/map/core/MapDataManipulator.js', ['npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'bundles/strippedCoreBundle.js'], function (_export) {
  var _createClass, _classCallCheck, MapLayer, MapLayerParent, MapDataManipulator;

  return {
    setters: [function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_bundlesStrippedCoreBundleJs) {
      MapLayer = _bundlesStrippedCoreBundleJs.MapLayer;
      MapLayerParent = _bundlesStrippedCoreBundleJs.MapLayerParent;
    }],
    execute: function () {

      /*---------------------
      --------- API ---------
      ----------------------*/
      'use strict';

      MapDataManipulator = (function () {
        /**
         * Class to get a consistent standard for the engine to be able to filter objects, when retrieving or sorting them.
         *
         * @class core.MapDataManipulator
         * @constructor
         * @param {Array|Object} rules        REQUIRED. The rules that apply for this instance. Multiple rules in Array or one as Object.
         **/

        function MapDataManipulator(rules) {
          _classCallCheck(this, MapDataManipulator);

          this.rules = Array.isArray(rules) ? rules : [rules];
          this.layerClasses = [MapLayer, MapLayerParent];
        }

        _createClass(MapDataManipulator, [{
          key: 'filterSubcontainers',
          value: function filterSubcontainers(subcontainers) {
            if (!Array.isArray(subcontainers)) {
              return this._runRules(subcontainers);
            }
          }
        }, {
          key: 'addRule',
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
          key: '_runRules',
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
          key: '_getContainer',
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
          key: '_getContainer',
          value: function _getContainer(object, rule) {
            if (object && (object.parent instanceof this.layerClasses[0] || object && object.parent instanceof this.layerClasses[1])) {
              return object.parent[rule.property] === rule.value;
            } else if (object && object.parent && (object.parent.parent instanceof this.layerClasses[0] || object.parent.parent instanceof this.layerClasses[0])) {
              return object.parent.parent[rule.property] === rule.value;
            }
          }
        }]);

        return MapDataManipulator;
      })();

      _export('MapDataManipulator', MapDataManipulator);
    }
  };
});
System.registerDynamic("npm:core-js@1.1.4/library/modules/$.to-iobject.js", ["npm:core-js@1.1.4/library/modules/$.iobject.js", "npm:core-js@1.1.4/library/modules/$.defined.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('npm:core-js@1.1.4/library/modules/$.iobject.js'),
      defined = $__require('npm:core-js@1.1.4/library/modules/$.defined.js');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.object-sap.js", ["npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.core.js", "npm:core-js@1.1.4/library/modules/$.fails.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(KEY, exec) {
    var $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js'),
        fn = ($__require('npm:core-js@1.1.4/library/modules/$.core.js').Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $def($def.S + $def.F * $__require('npm:core-js@1.1.4/library/modules/$.fails.js')(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.object.get-own-property-descriptor.js", ["npm:core-js@1.1.4/library/modules/$.to-iobject.js", "npm:core-js@1.1.4/library/modules/$.object-sap.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toIObject = $__require('npm:core-js@1.1.4/library/modules/$.to-iobject.js');
  $__require('npm:core-js@1.1.4/library/modules/$.object-sap.js')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/object/get-own-property-descriptor.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/es6.object.get-own-property-descriptor.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js');
  $__require('npm:core-js@1.1.4/library/modules/es6.object.get-own-property-descriptor.js');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/get-own-property-descriptor.js", ["npm:core-js@1.1.4/library/fn/object/get-own-property-descriptor.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/get-own-property-descriptor.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/helpers/get.js", ["npm:babel-runtime@5.8.24/core-js/object/get-own-property-descriptor.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$getOwnPropertyDescriptor = $__require('npm:babel-runtime@5.8.24/core-js/object/get-own-property-descriptor.js')["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      desc = parent = getter = undefined;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/object/create.js", ["npm:core-js@1.1.4/library/modules/$.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/create.js", ["npm:core-js@1.1.4/library/fn/object/create.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/create.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.is-object.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.an-object.js", ["npm:core-js@1.1.4/library/modules/$.is-object.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('npm:core-js@1.1.4/library/modules/$.is-object.js');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.a-function.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.ctx.js", ["npm:core-js@1.1.4/library/modules/$.a-function.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('npm:core-js@1.1.4/library/modules/$.a-function.js');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.set-proto.js", ["npm:core-js@1.1.4/library/modules/$.js", "npm:core-js@1.1.4/library/modules/$.is-object.js", "npm:core-js@1.1.4/library/modules/$.an-object.js", "npm:core-js@1.1.4/library/modules/$.ctx.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('npm:core-js@1.1.4/library/modules/$.js').getDesc,
      isObject = $__require('npm:core-js@1.1.4/library/modules/$.is-object.js'),
      anObject = $__require('npm:core-js@1.1.4/library/modules/$.an-object.js');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = $__require('npm:core-js@1.1.4/library/modules/$.ctx.js')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set({}, []);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }() : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.object.set-prototype-of.js", ["npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.set-proto.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js');
  $def($def.S, 'Object', {setPrototypeOf: $__require('npm:core-js@1.1.4/library/modules/$.set-proto.js').set});
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/object/set-prototype-of.js", ["npm:core-js@1.1.4/library/modules/es6.object.set-prototype-of.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.object.set-prototype-of.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').Object.setPrototypeOf;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/set-prototype-of.js", ["npm:core-js@1.1.4/library/fn/object/set-prototype-of.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/set-prototype-of.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/helpers/inherits.js", ["npm:babel-runtime@5.8.24/core-js/object/create.js", "npm:babel-runtime@5.8.24/core-js/object/set-prototype-of.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$create = $__require('npm:babel-runtime@5.8.24/core-js/object/create.js')["default"];
  var _Object$setPrototypeOf = $__require('npm:babel-runtime@5.8.24/core-js/object/set-prototype-of.js')["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("components/map/core/MapLayers.js", ["npm:babel-runtime@5.8.24/helpers/get.js", "npm:babel-runtime@5.8.24/helpers/inherits.js", "npm:babel-runtime@5.8.24/helpers/create-class.js", "npm:babel-runtime@5.8.24/helpers/class-call-check.js", "npm:babel-runtime@5.8.24/core-js/object/assign.js"], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Object$assign, _UIObjects, MapLayer, MapLayerParent, MapSubcontainer;

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

    var _layer$getSubcontainerConfigs = layer.getSubcontainerConfigs();

    var width = _layer$getSubcontainerConfigs.width;
    var height = _layer$getSubcontainerConfigs.height;

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
  return {
    setters: [function (_npmBabelRuntime5824HelpersGetJs) {
      _get = _npmBabelRuntime5824HelpersGetJs["default"];
    }, function (_npmBabelRuntime5824HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5824HelpersInheritsJs["default"];
    }, function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs["default"];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs["default"];
    }, function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs["default"];
    }],
    execute: function () {
      'use strict';

      /*---------------------
      ------ VARIABLES ------
      ---------------------*/
      _UIObjects = [];

      /*---------------------
      -------- EXPORT -------
      ---------------------*/

      MapLayer = (function (_PIXI$Container) {
        _inherits(MapLayer, _PIXI$Container);

        /**
         * Creates a basic layer for the Map. This type of layer can not hold subcontainers. Note that different devices and graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE. This is important also when caching.
         *
         * @class core.MapLayer
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

          _get(Object.getPrototypeOf(MapLayer.prototype), "constructor", this).call(this);
          _Object$assign(this, coord);

          /**
           * Layers name, used for identifying the layer. Useful in debugging, but can be used for finding correct layers too
           *
           * @attribute name
           * @type {String}
           */
          this.name = "" + name;
          /**
           * Is this layer special (e.g. UILayer not included in normal operations)
           *
           * @attribute specialLayer
           * @type {Boolean}
           */
          this.specialLayer = !!specialLayer;
          /**
           * Can you select objects from this layer. For example with Map.getObjectsUnderArea
           *
           * @attribute selectable
           * @type {Boolean}
           */
          this.selectable = selectable;
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
            var _this = this;

            _UIObjects.map(function (obj) {
              _this.getUILayer().removeChild(obj);
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
      })(PIXI.Container);

      _export("MapLayer", MapLayer);

      MapLayerParent = (function (_MapLayer) {
        _inherits(MapLayerParent, _MapLayer);

        /**
         * Layer designed to hold subcontainers. But can handle objects too. Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap. Thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
         *
         * @class core.MapLayerParent
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

          _get(Object.getPrototypeOf(MapLayerParent.prototype), "constructor", this).call(this, options);

          this.oldAddChild = _get(Object.getPrototypeOf(MapLayerParent.prototype), "addChild", this).bind(this);
          this.subcontainersConfig = subcontainers;
          this.subcontainerList = [];
          this.selectable = selectable;
          this.specialLayer = specialLayer;
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
      })(MapLayer);

      _export("MapLayerParent", MapLayerParent);

      MapSubcontainer = (function (_PIXI$Container2) {
        _inherits(MapSubcontainer, _PIXI$Container2);

        /**
         * Subcontainers are containers that hold objects like units and terrain etc. under them. They have some restrictions atm. since they are PIXI.ParticleContainers. But when needed we can extend MapLayers with another class which is subcontainer, but not ParticleContainer at the present there is no need, so we won't extend yet. Subcontainers help the layers to make better movement of the map, by making subcontainers visible or invisible and even helping with selecting objects on the map. Thus we don't need to use our inefficient Quadtree. The intention was to use PIXI.ParticleContainer for this, but it seems it doesn't clean up the memory afterwards the same way as normal Container.
         *
         * @private
         * @class core.MapSubcontainer
         * @constructor
         * @param  {Object} size              Subontainer size. If given activated subcontainers, otherwise not.
         * @param  {Integer} size.width       width (in pixels)
         * @param  {Integer} size.height      height (in pixels)
         */

        function MapSubcontainer(size) {
          _classCallCheck(this, MapSubcontainer);

          _get(Object.getPrototypeOf(MapSubcontainer.prototype), "constructor", this).call(this);

          this.specialLayer = true;
          this.size = size;
          this.selectable = false;
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
      })(PIXI.Container);
    }
  };
});
System.register('components/map/core/mapEvents.js', [], function (_export) {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/
  var mapEvents;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * This module handles map events. Like informing map movement, object selection and other changes.
   * Events atm:
   * - mapMoved
   * - mapResize
   * - mapFullscreeActivated
   *
   * @class core.mapEvents
   * @return {Object}     subsribe and publish
   * @todo I want the pubsub module to go the ES6 way, not the only global exception!
   */
  function setupMapEvents() {
    return {
      subscribe: subscribe,
      publish: publish
    };

    function subscribe(type, cb) {
      document.addEventListener(type, cb);
    }
    function publish(type) {
      var eventToDispatch = new Event(type);

      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      eventToDispatch.customData = data;
      document.dispatchEvent(eventToDispatch);
    }
  }
  return {
    setters: [],
    execute: function () {
      mapEvents = setupMapEvents();

      _export('mapEvents', mapEvents);
    }
  };
});
System.register('components/utilities/general.js', [], function (_export) {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  var arrays;

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
  return {
    setters: [],
    execute: function () {
      arrays = setupArrays();

      _export('arrays', arrays);
    }
  };
});
System.register('components/map/core/ObjectManager.js', ['npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'bundles/strippedCoreBundle.js', 'components/utilities/general.js'], function (_export) {
  var _createClass, _classCallCheck, utils, arrays, ObjectManager;

  return {
    setters: [function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_bundlesStrippedCoreBundleJs) {
      utils = _bundlesStrippedCoreBundleJs.utils;
    }, function (_componentsUtilitiesGeneralJs) {
      arrays = _componentsUtilitiesGeneralJs.arrays;
    }],
    execute: function () {

      /*---------------------
      --------- API ---------
      ----------------------*/

      /*---------------------
      ------- IMPORT --------
      ----------------------*/
      'use strict';
      ObjectManager = (function () {
        /**
         * this module is responsible for doing hitTesting, like returning the units on certain clicked coordinates or when objects or areas collide with each other.
         *
         * @class core.ObjectManager
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
      })();

      _export('ObjectManager', ObjectManager);
    }
  };
});
System.register("components/map/core/UI.js", [], function (_export) {
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
   * @class core.UI
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
  return {
    setters: [],
    execute: function () {

      /*---------------------
      --------- API ---------
      ----------------------*/

      _export("UI", UI);
    }
  };
});
System.register('components/map/core/UI_themeBase.js', ['npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'components/map/UIs/default/layout/CSSRules.js'], function (_export) {
  var _createClass, _classCallCheck, createCSSRules, styleSheetElement, allCSSClasses, UI_templateBase;

  return {
    setters: [function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_componentsMapUIsDefaultLayoutCSSRulesJs) {
      createCSSRules = _componentsMapUIsDefaultLayoutCSSRulesJs.createCSSRules;
    }],
    execute: function () {

      /*---------------------
      ------ VARIABLES ------
      ----------------------*/
      'use strict';

      /*---------------------
      ------- IMPORT --------
      ----------------------*/

      /*---------------------
      --------- API ---------
      ----------------------*/

      UI_templateBase = (function () {
        /**
         * The template base class for UI templates
         *
         * @todo This needs a bit of redesign.
         *
         * @class core.UI_templateBase
         * @constructor
         * @param  {*} CSSClasses
         */

        function UI_templateBase(CSSClasses) {
          _classCallCheck(this, UI_templateBase);

          allCSSClasses = CSSClasses;
          styleSheetElement = this.addStyleElement();
          var createdCSS = createCSSRules(allCSSClasses);
          this.addCSSRulesToScriptTag(styleSheetElement, createdCSS);
        }

        /**
         * Get the stylesheet element. Where are the defined CSS is
         *
         * @method getStyleSheetElement
         * @return {HTMLElement}
         */

        _createClass(UI_templateBase, [{
          key: 'getStyleSheetElement',
          value: function getStyleSheetElement() {
            return styleSheetElement;
          }

          /**
           * @method getCSSClasses
           */
        }, {
          key: 'getCSSClasses',
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
          key: 'addCSSRulesToScriptTag',
          value: function addCSSRulesToScriptTag(sheet, rules) {
            sheet.insertRule(rules, 0);
          }

          /**
           * @method addStyleElement
           */
        }, {
          key: 'addStyleElement',
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
          key: 'showModal',
          value: function showModal(modalElem, cssClasses) {
            modalElem.classList.add(cssClasses.select);
            /* Would be HTML 5.1 standard, but that might be a long way
              this.modal.show();*/
          }
        }]);

        return UI_templateBase;
      })();

      _export('UI_templateBase', UI_templateBase);
    }
  };
});
System.register('bundles/strippedCoreBundle.js', ['components/map/core/utils/index.js', 'components/map/core/Objects.js', 'components/map/core/eventlisteners.js', 'components/map/core/Map.js', 'components/map/core/MapDataManipulator.js', 'components/map/core/MapLayers.js', 'components/map/core/mapEvents.js', 'components/map/core/ObjectManager.js', 'components/map/core/UI.js', 'components/map/core/UI_themeBase.js'], function (_export) {
  'use strict';

  /*
   * This one bundles the core functionality by importing and re-exporting the core functionality. You can then use
   * some bundler or transpiler, like JSPM to bundle the core functionality to one build-file.
   */

  return {
    setters: [function (_componentsMapCoreUtilsIndexJs) {
      var _exportObj = {};

      for (var _key in _componentsMapCoreUtilsIndexJs) {
        if (_key !== 'default') _exportObj[_key] = _componentsMapCoreUtilsIndexJs[_key];
      }

      _export(_exportObj);
    }, function (_componentsMapCoreObjectsJs) {
      var _exportObj2 = {};

      for (var _key2 in _componentsMapCoreObjectsJs) {
        if (_key2 !== 'default') _exportObj2[_key2] = _componentsMapCoreObjectsJs[_key2];
      }

      _export(_exportObj2);
    }, function (_componentsMapCoreEventlistenersJs) {
      var _exportObj3 = {};

      for (var _key3 in _componentsMapCoreEventlistenersJs) {
        if (_key3 !== 'default') _exportObj3[_key3] = _componentsMapCoreEventlistenersJs[_key3];
      }

      _export(_exportObj3);
    }, function (_componentsMapCoreMapJs) {
      var _exportObj4 = {};

      for (var _key4 in _componentsMapCoreMapJs) {
        if (_key4 !== 'default') _exportObj4[_key4] = _componentsMapCoreMapJs[_key4];
      }

      _export(_exportObj4);
    }, function (_componentsMapCoreMapDataManipulatorJs) {
      var _exportObj5 = {};

      for (var _key5 in _componentsMapCoreMapDataManipulatorJs) {
        if (_key5 !== 'default') _exportObj5[_key5] = _componentsMapCoreMapDataManipulatorJs[_key5];
      }

      _export(_exportObj5);
    }, function (_componentsMapCoreMapLayersJs) {
      var _exportObj6 = {};

      for (var _key6 in _componentsMapCoreMapLayersJs) {
        if (_key6 !== 'default') _exportObj6[_key6] = _componentsMapCoreMapLayersJs[_key6];
      }

      _export(_exportObj6);
    }, function (_componentsMapCoreMapEventsJs) {
      var _exportObj7 = {};

      for (var _key7 in _componentsMapCoreMapEventsJs) {
        if (_key7 !== 'default') _exportObj7[_key7] = _componentsMapCoreMapEventsJs[_key7];
      }

      _export(_exportObj7);
    }, function (_componentsMapCoreObjectManagerJs) {
      var _exportObj8 = {};

      for (var _key8 in _componentsMapCoreObjectManagerJs) {
        if (_key8 !== 'default') _exportObj8[_key8] = _componentsMapCoreObjectManagerJs[_key8];
      }

      _export(_exportObj8);
    }, function (_componentsMapCoreUIJs) {
      var _exportObj9 = {};

      for (var _key9 in _componentsMapCoreUIJs) {
        if (_key9 !== 'default') _exportObj9[_key9] = _componentsMapCoreUIJs[_key9];
      }

      _export(_exportObj9);
    }, function (_componentsMapCoreUI_themeBaseJs) {
      var _exportObj10 = {};

      for (var _key10 in _componentsMapCoreUI_themeBaseJs) {
        if (_key10 !== 'default') _exportObj10[_key10] = _componentsMapCoreUI_themeBaseJs[_key10];
      }

      _export(_exportObj10);
    }],
    execute: function () {}
  };
});
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
(function(window, document, exportName, undefined) {
  'use strict';
  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = document.createElement('div');
  var TYPE_FUNCTION = 'function';
  var round = Math.round;
  var abs = Math.abs;
  var now = Date.now;
  function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
  }
  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }
    return false;
  }
  function each(obj, iterator, context) {
    var i;
    if (!obj) {
      return;
    }
    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
      i = 0;
      while (i < obj.length) {
        iterator.call(context, obj[i], i, obj);
        i++;
      }
    } else {
      for (i in obj) {
        obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
      }
    }
  }
  function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
      var e = new Error('get-stack-trace');
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
      var log = window.console && (window.console.warn || window.console.log);
      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }
      return method.apply(this, arguments);
    };
  }
  var assign;
  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
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
  } else {
    assign = Object.assign;
  }
  var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
      if (!merge || (merge && dest[keys[i]] === undefined)) {
        dest[keys[i]] = src[keys[i]];
      }
      i++;
    }
    return dest;
  }, 'extend', 'Use `assign`.');
  var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
  }, 'merge', 'Use `assign`.');
  function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;
    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;
    if (properties) {
      assign(childP, properties);
    }
  }
  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
      return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
  }
  function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
  }
  function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
      target.addEventListener(type, handler, false);
    });
  }
  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
      target.removeEventListener(type, handler, false);
    });
  }
  function hasParent(node, parent) {
    while (node) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;
      while (i < src.length) {
        if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
          return i;
        }
        i++;
      }
      return -1;
    }
  }
  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;
    while (i < src.length) {
      var val = key ? src[i][key] : src[i];
      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }
      values[i] = val;
      i++;
    }
    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function sortUniqueArray(a, b) {
          return a[key] > b[key];
        });
      }
    }
    return results;
  }
  function prefixed(obj, property) {
    var prefix,
        prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = (prefix) ? prefix + camelProp : property;
      if (prop in obj) {
        return prop;
      }
      i++;
    }
    return undefined;
  }
  var _uniqueId = 1;
  function uniqueId() {
    return _uniqueId++;
  }
  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
  }
  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH = ('ontouchstart' in window);
  var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;
    this.domHandler = function(ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };
    this.init();
  }
  Input.prototype = {
    handler: function() {},
    init: function() {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },
    destroy: function() {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
  };
  function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;
    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
  }
  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;
    if (isFirst) {
      manager.session = {};
    }
    input.eventType = eventType;
    computeInputData(manager, input);
    manager.emit('hammer.input', input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;
    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    }
    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }
    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length > session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
    computeIntervalInputData(session, input);
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
      target = input.srcEvent.target;
    }
    input.target = target;
  }
  function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};
    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }
    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity,
        velocityX,
        velocityY,
        direction;
    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }
    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  function simpleCloneInputData(input) {
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }
    return {
      timeStamp: now(),
      pointers: pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  function getCenter(pointers) {
    var pointersLength = pointers.length;
    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }
    var x = 0,
        y = 0,
        i = 0;
    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }
    return {
      x: round(x / pointersLength),
      y: round(y / pointersLength)
    };
  }
  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }
    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }
  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.sqrt((x * x) + (y * y));
  }
  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }
  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
  function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;
    this.allow = true;
    this.pressed = false;
    Input.apply(this, arguments);
  }
  inherit(MouseInput, Input, {handler: function MEhandler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type];
      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }
      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      }
      if (!this.pressed || !this.allow) {
        return;
      }
      if (eventType & INPUT_END) {
        this.pressed = false;
      }
      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    }});
  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  };
  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT
  };
  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
  if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }
  function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;
    Input.apply(this, arguments);
    this.store = (this.manager.session.pointerEvents = []);
  }
  inherit(PointerEventInput, Input, {handler: function PEhandler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = (pointerType == INPUT_TYPE_TOUCH);
      var storeIndex = inArray(store, ev.pointerId, 'pointerId');
      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      }
      if (storeIndex < 0) {
        return;
      }
      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });
      if (removePointer) {
        store.splice(storeIndex, 1);
      }
    }});
  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
  function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;
    Input.apply(this, arguments);
  }
  inherit(SingleTouchInput, Input, {handler: function TEhandler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
      if (type === INPUT_START) {
        this.started = true;
      }
      if (!this.started) {
        return;
      }
      var touches = normalizeSingleTouches.call(this, ev, type);
      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }
      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }});
  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);
    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), 'identifier', true);
    }
    return [all, changed];
  }
  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
  function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};
    Input.apply(this, arguments);
  }
  inherit(TouchInput, Input, {handler: function MTEhandler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);
      if (!touches) {
        return;
      }
      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }});
  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }
    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;
    targetTouches = allTouches.filter(function(touch) {
      return hasParent(touch.target, target);
    });
    if (type === INPUT_START) {
      i = 0;
      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    }
    i = 0;
    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      }
      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }
      i++;
    }
    if (!changedTargetTouches.length) {
      return;
    }
    return [uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
  }
  function TouchMouseInput() {
    Input.apply(this, arguments);
    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);
  }
  inherit(TouchMouseInput, Input, {
    handler: function TMEhandler(manager, inputEvent, inputData) {
      var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
          isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
      if (isTouch) {
        this.mouse.allow = false;
      } else if (isMouse && !this.mouse.allow) {
        return;
      }
      if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
        this.mouse.allow = true;
      }
      this.callback(manager, inputEvent, inputData);
    },
    destroy: function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    }
  });
  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation';
  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  TouchAction.prototype = {
    set: function(value) {
      if (value == TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }
      if (NATIVE_TOUCH_ACTION && this.manager.element.style) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }
      this.actions = value.toLowerCase().trim();
    },
    update: function() {
      this.set(this.manager.options.touchAction);
    },
    compute: function() {
      var actions = [];
      each(this.manager.recognizers, function(recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(' '));
    },
    preventDefaults: function(input) {
      if (NATIVE_TOUCH_ACTION) {
        return;
      }
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection;
      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }
      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE);
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
      if (hasNone) {
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;
        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }
      if (hasPanX && hasPanY) {
        return;
      }
      if (hasNone || (hasPanY && direction & DIRECTION_HORIZONTAL) || (hasPanX && direction & DIRECTION_VERTICAL)) {
        return this.preventSrc(srcEvent);
      }
    },
    preventSrc: function(srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    }
  };
  function cleanTouchActions(actions) {
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    }
    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }
    return TOUCH_ACTION_AUTO;
  }
  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});
    this.id = uniqueId();
    this.manager = null;
    this.options.enable = ifUndefined(this.options.enable, true);
    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  Recognizer.prototype = {
    defaults: {},
    set: function(options) {
      assign(this.options, options);
      this.manager && this.manager.touchAction.update();
      return this;
    },
    recognizeWith: function(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }
      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }
      return this;
    },
    dropRecognizeWith: function(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    },
    requireFailure: function(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }
      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }
      return this;
    },
    dropRequireFailure: function(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);
      if (index > -1) {
        this.requireFail.splice(index, 1);
      }
      return this;
    },
    hasRequireFailures: function() {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function(otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    },
    emit: function(input) {
      var self = this;
      var state = this.state;
      function emit(event) {
        self.manager.emit(event, input);
      }
      if (state < STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
      emit(self.options.event);
      if (input.additionalEvent) {
        emit(input.additionalEvent);
      }
      if (state >= STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
    },
    tryEmit: function(input) {
      if (this.canEmit()) {
        return this.emit(input);
      }
      this.state = STATE_FAILED;
    },
    canEmit: function() {
      var i = 0;
      while (i < this.requireFail.length) {
        if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }
        i++;
      }
      return true;
    },
    recognize: function(inputData) {
      var inputDataClone = assign({}, inputData);
      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      }
      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }
      this.state = this.process(inputDataClone);
      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    },
    process: function(inputData) {},
    getTouchAction: function() {},
    reset: function() {}
  };
  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return 'cancel';
    } else if (state & STATE_ENDED) {
      return 'end';
    } else if (state & STATE_CHANGED) {
      return 'move';
    } else if (state & STATE_BEGAN) {
      return 'start';
    }
    return '';
  }
  function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
      return 'down';
    } else if (direction == DIRECTION_UP) {
      return 'up';
    } else if (direction == DIRECTION_LEFT) {
      return 'left';
    } else if (direction == DIRECTION_RIGHT) {
      return 'right';
    }
    return '';
  }
  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
      return manager.get(otherRecognizer);
    }
    return otherRecognizer;
  }
  function AttrRecognizer() {
    Recognizer.apply(this, arguments);
  }
  inherit(AttrRecognizer, Recognizer, {
    defaults: {pointers: 1},
    attrTest: function(input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    },
    process: function(input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input);
      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }
        return state | STATE_CHANGED;
      }
      return STATE_FAILED;
    }
  });
  function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);
    this.pX = null;
    this.pY = null;
  }
  inherit(PanRecognizer, AttrRecognizer, {
    defaults: {
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    },
    getTouchAction: function() {
      var direction = this.options.direction;
      var actions = [];
      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }
      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }
      return actions;
    },
    directionTest: function(input) {
      var options = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x = input.deltaX;
      var y = input.deltaY;
      if (!(direction & options.direction)) {
        if (options.direction & DIRECTION_HORIZONTAL) {
          direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x != this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y != this.pY;
          distance = Math.abs(input.deltaY);
        }
      }
      input.direction = direction;
      return hasMoved && distance > options.threshold && direction & options.direction;
    },
    attrTest: function(input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },
    emit: function(input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);
      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }
      this._super.emit.call(this, input);
    }
  });
  function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }
  inherit(PinchRecognizer, AttrRecognizer, {
    defaults: {
      event: 'pinch',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function(input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },
    emit: function(input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? 'in' : 'out';
        input.additionalEvent = this.options.event + inOut;
      }
      this._super.emit.call(this, input);
    }
  });
  function PressRecognizer() {
    Recognizer.apply(this, arguments);
    this._timer = null;
    this._input = null;
  }
  inherit(PressRecognizer, Recognizer, {
    defaults: {
      event: 'press',
      pointers: 1,
      time: 251,
      threshold: 9
    },
    getTouchAction: function() {
      return [TOUCH_ACTION_AUTO];
    },
    process: function(input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTime = input.deltaTime > options.time;
      this._input = input;
      if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeoutContext(function() {
          this.state = STATE_RECOGNIZED;
          this.tryEmit();
        }, options.time, this);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }
      return STATE_FAILED;
    },
    reset: function() {
      clearTimeout(this._timer);
    },
    emit: function(input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }
      if (input && (input.eventType & INPUT_END)) {
        this.manager.emit(this.options.event + 'up', input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }
  inherit(RotateRecognizer, AttrRecognizer, {
    defaults: {
      event: 'rotate',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function(input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
  });
  function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }
  inherit(SwipeRecognizer, AttrRecognizer, {
    defaults: {
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    },
    getTouchAction: function() {
      return PanRecognizer.prototype.getTouchAction.call(this);
    },
    attrTest: function(input) {
      var direction = this.options.direction;
      var velocity;
      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }
      return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },
    emit: function(input) {
      var direction = directionStr(input.offsetDirection);
      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }
      this.manager.emit(this.options.event, input);
    }
  });
  function TapRecognizer() {
    Recognizer.apply(this, arguments);
    this.pTime = false;
    this.pCenter = false;
    this._timer = null;
    this._input = null;
    this.count = 0;
  }
  inherit(TapRecognizer, Recognizer, {
    defaults: {
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 9,
      posThreshold: 10
    },
    getTouchAction: function() {
      return [TOUCH_ACTION_MANIPULATION];
    },
    process: function(input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTouchTime = input.deltaTime < options.time;
      this.reset();
      if ((input.eventType & INPUT_START) && (this.count === 0)) {
        return this.failTimeout();
      }
      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType != INPUT_END) {
          return this.failTimeout();
        }
        var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;
        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }
        this._input = input;
        var tapCount = this.count % options.taps;
        if (tapCount === 0) {
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeoutContext(function() {
              this.state = STATE_RECOGNIZED;
              this.tryEmit();
            }, options.interval, this);
            return STATE_BEGAN;
          }
        }
      }
      return STATE_FAILED;
    },
    failTimeout: function() {
      this._timer = setTimeoutContext(function() {
        this.state = STATE_FAILED;
      }, this.options.interval, this);
      return STATE_FAILED;
    },
    reset: function() {
      clearTimeout(this._timer);
    },
    emit: function() {
      if (this.state == STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
  }
  Hammer.VERSION = '2.0.6';
  Hammer.defaults = {
    domEvents: false,
    touchAction: TOUCH_ACTION_COMPUTE,
    enable: true,
    inputTarget: null,
    inputClass: null,
    preset: [[RotateRecognizer, {enable: false}], [PinchRecognizer, {enable: false}, ['rotate']], [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}], [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']], [TapRecognizer], [TapRecognizer, {
      event: 'doubletap',
      taps: 2
    }, ['tap']], [PressRecognizer]],
    cssProps: {
      userSelect: 'none',
      touchSelect: 'none',
      touchCallout: 'none',
      contentZooming: 'none',
      userDrag: 'none',
      tapHighlightColor: 'rgba(0,0,0,0)'
    }
  };
  var STOP = 1;
  var FORCED_STOP = 2;
  function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function(item) {
      var recognizer = this.add(new (item[0])(item[1]));
      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  Manager.prototype = {
    set: function(options) {
      assign(this.options, options);
      if (options.touchAction) {
        this.touchAction.update();
      }
      if (options.inputTarget) {
        this.input.destroy();
        this.input.target = options.inputTarget;
        this.input.init();
      }
      return this;
    },
    stop: function(force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    },
    recognize: function(inputData) {
      var session = this.session;
      if (session.stopped) {
        return;
      }
      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers;
      var curRecognizer = session.curRecognizer;
      if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
        curRecognizer = session.curRecognizer = null;
      }
      var i = 0;
      while (i < recognizers.length) {
        recognizer = recognizers[i];
        if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer == curRecognizer || recognizer.canRecognizeWith(curRecognizer))) {
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        }
        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          curRecognizer = session.curRecognizer = recognizer;
        }
        i++;
      }
    },
    get: function(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }
      var recognizers = this.recognizers;
      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event == recognizer) {
          return recognizers[i];
        }
      }
      return null;
    },
    add: function(recognizer) {
      if (invokeArrayArg(recognizer, 'add', this)) {
        return this;
      }
      var existing = this.get(recognizer.options.event);
      if (existing) {
        this.remove(existing);
      }
      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    },
    remove: function(recognizer) {
      if (invokeArrayArg(recognizer, 'remove', this)) {
        return this;
      }
      recognizer = this.get(recognizer);
      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, recognizer);
        if (index !== -1) {
          recognizers.splice(index, 1);
          this.touchAction.update();
        }
      }
      return this;
    },
    on: function(events, handler) {
      var handlers = this.handlers;
      each(splitStr(events), function(event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    },
    off: function(events, handler) {
      var handlers = this.handlers;
      each(splitStr(events), function(event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    },
    emit: function(event, data) {
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      }
      var handlers = this.handlers[event] && this.handlers[event].slice();
      if (!handlers || !handlers.length) {
        return;
      }
      data.type = event;
      data.preventDefault = function() {
        data.srcEvent.preventDefault();
      };
      var i = 0;
      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
    },
    destroy: function() {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    }
  };
  function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
      return;
    }
    each(manager.options.cssProps, function(value, name) {
      element.style[prefixed(element.style, name)] = add ? value : '';
    });
  }
  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }
  assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,
    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,
    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,
    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,
    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,
    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,
    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
  });
  var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {}));
  freeGlobal.Hammer = Hammer;
  if (typeof define === 'function' && define.amd) {
    define("github:hammerjs/hammer.js@2.0.6/hammer.js", [], function() {
      return Hammer;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
  } else {
    window[exportName] = Hammer;
  }
})(window, document, 'Hammer');

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("github:hammerjs/hammer.js@2.0.6.js", ["github:hammerjs/hammer.js@2.0.6/hammer.js"], function(main) {
  return main;
});

_removeDefine();
})();
System.register('components/map/core/baseEventlisteners/baseEventlisteners.js', ['github:hammerjs/hammer.js@2.0.6.js', 'bundles/coreBundle.js'], function (_export) {
  /* global Hammer, Hamster */

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/
  var eventListeners, baseEventlisteners;

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Core plugin. Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for the eventlistener management.
   *
   * @class core.baseEventlisteners
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

      eventListeners.setDetector("fullSize", fullSize().on, fullSize().off);
      eventListeners.setDetector("fullscreen", fullscreen().on, fullscreen().off);
      eventListeners.setDetector("zoom", zoom().on, zoom().off);
      eventListeners.setDetector("drag", drag().on, drag().off);
      eventListeners.setDetector("select", select().on, select().off);

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
     * @method fullSizeListener
     * @private
     * @static
     */
    function fullSize() {
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
    function fullscreen() {
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
    function zoom() {
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
    function drag() {
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
    function select() {
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
  return {
    setters: [function (_githubHammerjsHammerJs206Js) {}, function (_bundlesCoreBundleJs) {
      eventListeners = _bundlesCoreBundleJs.eventListeners;
    }],
    execute: function () {
      baseEventlisteners = baseEventlistenersModule();

      _export('baseEventlisteners', baseEventlisteners);
    }
  };
});
System.register('components/map/core/move/mapDrag.js', ['bundles/coreBundle.js'], function (_export) {

  /*---------------------
  --------- API ---------
  ----------------------*/

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  'use strict';var eventListeners, utils, mapDrag;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Core plugin for the engine. Handles moving the map by dragging the map with mouse or touch event. Core plugins can always be overwrote if needed.
   *
   * @class core.mapDrag
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
  return {
    setters: [function (_bundlesCoreBundleJs) {
      eventListeners = _bundlesCoreBundleJs.eventListeners;
      utils = _bundlesCoreBundleJs.utils;
    }],
    execute: function () {
      mapDrag = setupMap_drag();

      _export('mapDrag', mapDrag);
    }
  };
});
System.register('components/map/core/zoom/mapZoom.js', ['bundles/coreBundle.js'], function (_export) {

  /*---------------------
  --------- API ---------
  ----------------------*/
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var eventListeners, utils, mapEvents, mapZoom;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Core plugin for the engine. Handles zooming for the map. Core plugins can always be overwrote if needed. Zooming happens when the user scrolls the mousewheel or in mobile, pinches the screen.
   *
   * @class core.mapZoom
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
  return {
    setters: [function (_bundlesCoreBundleJs) {
      eventListeners = _bundlesCoreBundleJs.eventListeners;
      utils = _bundlesCoreBundleJs.utils;
      mapEvents = _bundlesCoreBundleJs.mapEvents;
    }],
    execute: function () {
      mapZoom = setupMap_zoom();

      _export('mapZoom', mapZoom);
    }
  };
});
System.register('bundles/coreBundle.js', ['bundles/strippedCoreBundle.js', 'components/map/core/baseEventlisteners/baseEventlisteners.js', 'components/map/core/move/mapDrag.js', 'components/map/core/zoom/mapZoom.js'], function (_export) {
  'use strict';

  /*
   * This one bundles the core functionality by importing and re-exporting the core functionality. You can then use
   * some bundler or transpiler, like JSPM to bundle the core functionality to one build-file.
   */

  return {
    setters: [function (_bundlesStrippedCoreBundleJs) {
      var _exportObj = {};

      for (var _key in _bundlesStrippedCoreBundleJs) {
        if (_key !== 'default') _exportObj[_key] = _bundlesStrippedCoreBundleJs[_key];
      }

      _export(_exportObj);
    }, function (_componentsMapCoreBaseEventlistenersBaseEventlistenersJs) {
      var _exportObj2 = {};

      for (var _key2 in _componentsMapCoreBaseEventlistenersBaseEventlistenersJs) {
        if (_key2 !== 'default') _exportObj2[_key2] = _componentsMapCoreBaseEventlistenersBaseEventlistenersJs[_key2];
      }

      _export(_exportObj2);
    }, function (_componentsMapCoreMoveMapDragJs) {
      var _exportObj3 = {};

      for (var _key3 in _componentsMapCoreMoveMapDragJs) {
        if (_key3 !== 'default') _exportObj3[_key3] = _componentsMapCoreMoveMapDragJs[_key3];
      }

      _export(_exportObj3);
    }, function (_componentsMapCoreZoomMapZoomJs) {
      var _exportObj4 = {};

      for (var _key4 in _componentsMapCoreZoomMapZoomJs) {
        if (_key4 !== 'default') _exportObj4[_key4] = _componentsMapCoreZoomMapZoomJs[_key4];
      }

      _export(_exportObj4);
    }],
    execute: function () {}
  };
});
System.register('components/map/UIs/default/default.js', ['npm:babel-runtime@5.8.24/helpers/get.js', 'npm:babel-runtime@5.8.24/helpers/inherits.js', 'npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'assets/lib/jquery/jquery-css-ajax-effects.min.js', 'components/map/UIs/default/layout/templates.js', 'components/map/extensions/hexagons/utils/createHexagon.js', 'bundles/coreBundle.js'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, $, templates, createVisibleHexagon, UI_templateBase, UI, FADE_ANIMATION, cssClasses, $elements, UI_default;

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
  return {
    setters: [function (_npmBabelRuntime5824HelpersGetJs) {
      _get = _npmBabelRuntime5824HelpersGetJs['default'];
    }, function (_npmBabelRuntime5824HelpersInheritsJs) {
      _inherits = _npmBabelRuntime5824HelpersInheritsJs['default'];
    }, function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_assetsLibJqueryJqueryCssAjaxEffectsMinJs) {
      $ = _assetsLibJqueryJqueryCssAjaxEffectsMinJs['default'];
    }, function (_componentsMapUIsDefaultLayoutTemplatesJs) {
      templates = _componentsMapUIsDefaultLayoutTemplatesJs.templates;
    }, function (_componentsMapExtensionsHexagonsUtilsCreateHexagonJs) {
      createVisibleHexagon = _componentsMapExtensionsHexagonsUtilsCreateHexagonJs.createVisibleHexagon;
    }, function (_bundlesCoreBundleJs) {
      UI_templateBase = _bundlesCoreBundleJs.UI_templateBase;
      UI = _bundlesCoreBundleJs.UI;
    }],
    execute: function () {
      /* global $ */

      //import { drawShapes } from 'components/map/UIs/default/utils/arrows';

      /*---------------------
      ------ VARIABLES ------
      ----------------------*/
      'use strict';

      /*---------------------
      ------- IMPORT --------
      ----------------------*/
      FADE_ANIMATION = "slow";
      cssClasses = {
        select: "#dialog_select"
      };
      $elements = {};

      /*---------------------
      --------- API ---------
      ----------------------*/

      UI_default = (function (_UI_templateBase) {
        _inherits(UI_default, _UI_templateBase);

        /**
         * The simplest default UI implementation. Implemented UI functionalities for: showSelections, highlightSelectedObject
         *
         * @class UI_default
         * @constructor
         * @requires Handlebars
         * @requires jQuery
         * @todo  should take jQuery away from this, as soon as we refactor the animations and graphics for selections
         * @param  {HTMLElement} modal
         * @param  {Map} map
         * @param  {Object} options
         */

        function UI_default(modal, map) {
          var options = arguments.length <= 2 || arguments[2] === undefined ? { styles: "#F0F0F0" } : arguments[2];

          _classCallCheck(this, UI_default);

          _get(Object.getPrototypeOf(UI_default.prototype), 'constructor', this).call(this, cssClasses);
          // Add a media (and/or media query) here if you'd like!
          // style.setAttribute("media", "screen")
          // style.setAttribute("media", "only screen and (max-width : 1024px)")

          this.map = map;
          this.modal = modal || document.getElementById("dialog_select");
          this.styles = options.styles;
        }

        /**
         * @method getTemplates
         * Required by the map/core/UI.js API
         */

        _createClass(UI_default, [{
          key: 'getTemplates',
          value: function getTemplates() {
            return templates;
          }

          /**
           * Required by the map/core/UI.js API
           *
           * @method showSelections
           * @param  {Object} objects     Objects that have been selected. See core.UI for more information
           * @param {Object} getDatas       See explanation in core.UI
           * @param {Object} options        Extra options
           */
        }, {
          key: 'showSelections',
          value: function showSelections(objects, getDatas, options) {
            var _this = this;

            var updateCB = this.map.drawOnNextTick.bind(this.map);
            var UILayer = this.map.getMovableLayer();
            var cb;

            /* We add the objects to be highlighted to the correct UI layer */
            //objectsToUI(UILayer, objects);

            if (objects && objects.length > 1) {
              cb = function () {
                _this.modal.innerHTML = templates.multiSelection({
                  title: "Objects",
                  objects: objects
                });

                _this.showModal(_this.modal, cssClasses);

                console.log(objects);

                _get$Element("select").fadeIn(FADE_ANIMATION);
              };
            } else if (objects.length === 1) {
              cb = function () {
                _this.highlightSelectedObject(objects[0]);

                console.log(objects);
              };
            } else {
              cb = function () {
                UILayer.emptyUIObjects();
                updateCB();
                console.log("Error occured selecting the objects on this coordinates! Nothing found");
              };
            }

            _get$Element("select").fadeOut(FADE_ANIMATION, cb);
          }

          /**
           * Required by the map/core/UI.js API
           *
           * @method highlightSelectedObject
           * @param  {Object} object        Object that has been selected. See core.UI for more information
           * @param {Object} getDatas       See explanation in core.UI
           * @param {Object} options        Extra options. Like dropping a shadow etc.
           */
        }, {
          key: 'highlightSelectedObject',
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
          key: 'showUnitMovement',
          value: function showUnitMovement() {}

          /**
           * @method init
           */
        }, {
          key: 'init',
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
          key: '_highlightSelectedObject',
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
          key: 'createHighlight',
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

        return UI_default;
      })(UI_templateBase);

      _export('UI_default', UI_default);
    }
  };
});
System.register('components/map/UIs/default/layout/CSSRules.js', [], function (_export) {
  'use strict';

  _export('createCSSRules', createCSSRules);

  function createCSSRules(classNames) {
    var dialogOptions = arguments.length <= 1 || arguments[1] === undefined ? { zIndex: 9999, opacity: 0.9 } : arguments[1];

    return '\n    ' + classNames.select + ' {\n      z-index: ' + dialogOptions.zIndex + ';\n      opacity: ' + dialogOptions.opacity + ';\n      position: fixed;\n      left: 0px;\n      bottom: 0px;\n      background-color: brown;\n      border: 1px solid rgb(255, 186, 148);;\n      border-bottom: 0px;\n      padding:15px;\n      margin-left:10px;\n    }';
  }

  return {
    setters: [],
    execute: function () {}
  };
});
System.registerDynamic("github:components/handlebars.js@4.0.5/handlebars.js", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, "Handlebars", null);
  (function() {
    "format global";
    "exports Handlebars";
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
      else if (typeof define === 'function' && define.amd)
        define([], factory);
      else if (typeof exports === 'object')
        exports["Handlebars"] = factory();
      else
        root["Handlebars"] = factory();
    })(this, function() {
      return (function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId])
            return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.loaded = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
      })([function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _handlebarsRuntime = __webpack_require__(2);
        var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
        var _handlebarsCompilerAst = __webpack_require__(21);
        var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
        var _handlebarsCompilerBase = __webpack_require__(22);
        var _handlebarsCompilerCompiler = __webpack_require__(27);
        var _handlebarsCompilerJavascriptCompiler = __webpack_require__(28);
        var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
        var _handlebarsCompilerVisitor = __webpack_require__(25);
        var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
        var _handlebarsNoConflict = __webpack_require__(20);
        var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
        var _create = _handlebarsRuntime2['default'].create;
        function create() {
          var hb = _create();
          hb.compile = function(input, options) {
            return _handlebarsCompilerCompiler.compile(input, options, hb);
          };
          hb.precompile = function(input, options) {
            return _handlebarsCompilerCompiler.precompile(input, options, hb);
          };
          hb.AST = _handlebarsCompilerAst2['default'];
          hb.Compiler = _handlebarsCompilerCompiler.Compiler;
          hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
          hb.Parser = _handlebarsCompilerBase.parser;
          hb.parse = _handlebarsCompilerBase.parse;
          return hb;
        }
        var inst = create();
        inst.create = create;
        _handlebarsNoConflict2['default'](inst);
        inst.Visitor = _handlebarsCompilerVisitor2['default'];
        inst['default'] = inst;
        exports['default'] = inst;
        module.exports = exports['default'];
      }, function(module, exports) {
        "use strict";
        exports["default"] = function(obj) {
          return obj && obj.__esModule ? obj : {"default": obj};
        };
        exports.__esModule = true;
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireWildcard = __webpack_require__(3)['default'];
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _handlebarsBase = __webpack_require__(4);
        var base = _interopRequireWildcard(_handlebarsBase);
        var _handlebarsSafeString = __webpack_require__(18);
        var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
        var _handlebarsException = __webpack_require__(6);
        var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
        var _handlebarsUtils = __webpack_require__(5);
        var Utils = _interopRequireWildcard(_handlebarsUtils);
        var _handlebarsRuntime = __webpack_require__(19);
        var runtime = _interopRequireWildcard(_handlebarsRuntime);
        var _handlebarsNoConflict = __webpack_require__(20);
        var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
        function create() {
          var hb = new base.HandlebarsEnvironment();
          Utils.extend(hb, base);
          hb.SafeString = _handlebarsSafeString2['default'];
          hb.Exception = _handlebarsException2['default'];
          hb.Utils = Utils;
          hb.escapeExpression = Utils.escapeExpression;
          hb.VM = runtime;
          hb.template = function(spec) {
            return runtime.template(spec, hb);
          };
          return hb;
        }
        var inst = create();
        inst.create = create;
        _handlebarsNoConflict2['default'](inst);
        inst['default'] = inst;
        exports['default'] = inst;
        module.exports = exports['default'];
      }, function(module, exports) {
        "use strict";
        exports["default"] = function(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj["default"] = obj;
            return newObj;
          }
        };
        exports.__esModule = true;
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.HandlebarsEnvironment = HandlebarsEnvironment;
        var _utils = __webpack_require__(5);
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        var _helpers = __webpack_require__(7);
        var _decorators = __webpack_require__(15);
        var _logger = __webpack_require__(17);
        var _logger2 = _interopRequireDefault(_logger);
        var VERSION = '4.0.5';
        exports.VERSION = VERSION;
        var COMPILER_REVISION = 7;
        exports.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = {
          1: '<= 1.0.rc.2',
          2: '== 1.0.0-rc.3',
          3: '== 1.0.0-rc.4',
          4: '== 1.x.x',
          5: '== 2.0.0-alpha.x',
          6: '>= 2.0.0-beta.1',
          7: '>= 4.0.0'
        };
        exports.REVISION_CHANGES = REVISION_CHANGES;
        var objectType = '[object Object]';
        function HandlebarsEnvironment(helpers, partials, decorators) {
          this.helpers = helpers || {};
          this.partials = partials || {};
          this.decorators = decorators || {};
          _helpers.registerDefaultHelpers(this);
          _decorators.registerDefaultDecorators(this);
        }
        HandlebarsEnvironment.prototype = {
          constructor: HandlebarsEnvironment,
          logger: _logger2['default'],
          log: _logger2['default'].log,
          registerHelper: function registerHelper(name, fn) {
            if (_utils.toString.call(name) === objectType) {
              if (fn) {
                throw new _exception2['default']('Arg not supported with multiple helpers');
              }
              _utils.extend(this.helpers, name);
            } else {
              this.helpers[name] = fn;
            }
          },
          unregisterHelper: function unregisterHelper(name) {
            delete this.helpers[name];
          },
          registerPartial: function registerPartial(name, partial) {
            if (_utils.toString.call(name) === objectType) {
              _utils.extend(this.partials, name);
            } else {
              if (typeof partial === 'undefined') {
                throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
              }
              this.partials[name] = partial;
            }
          },
          unregisterPartial: function unregisterPartial(name) {
            delete this.partials[name];
          },
          registerDecorator: function registerDecorator(name, fn) {
            if (_utils.toString.call(name) === objectType) {
              if (fn) {
                throw new _exception2['default']('Arg not supported with multiple decorators');
              }
              _utils.extend(this.decorators, name);
            } else {
              this.decorators[name] = fn;
            }
          },
          unregisterDecorator: function unregisterDecorator(name) {
            delete this.decorators[name];
          }
        };
        var log = _logger2['default'].log;
        exports.log = log;
        exports.createFrame = _utils.createFrame;
        exports.logger = _logger2['default'];
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        exports.extend = extend;
        exports.indexOf = indexOf;
        exports.escapeExpression = escapeExpression;
        exports.isEmpty = isEmpty;
        exports.createFrame = createFrame;
        exports.blockParams = blockParams;
        exports.appendContextPath = appendContextPath;
        var escape = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '`': '&#x60;',
          '=': '&#x3D;'
        };
        var badChars = /[&<>"'`=]/g,
            possible = /[&<>"'`=]/;
        function escapeChar(chr) {
          return escape[chr];
        }
        function extend(obj) {
          for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
              if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                obj[key] = arguments[i][key];
              }
            }
          }
          return obj;
        }
        var toString = Object.prototype.toString;
        exports.toString = toString;
        var isFunction = function isFunction(value) {
          return typeof value === 'function';
        };
        if (isFunction(/x/)) {
          exports.isFunction = isFunction = function(value) {
            return typeof value === 'function' && toString.call(value) === '[object Function]';
          };
        }
        exports.isFunction = isFunction;
        var isArray = Array.isArray || function(value) {
          return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
        };
        exports.isArray = isArray;
        function indexOf(array, value) {
          for (var i = 0,
              len = array.length; i < len; i++) {
            if (array[i] === value) {
              return i;
            }
          }
          return -1;
        }
        function escapeExpression(string) {
          if (typeof string !== 'string') {
            if (string && string.toHTML) {
              return string.toHTML();
            } else if (string == null) {
              return '';
            } else if (!string) {
              return string + '';
            }
            string = '' + string;
          }
          if (!possible.test(string)) {
            return string;
          }
          return string.replace(badChars, escapeChar);
        }
        function isEmpty(value) {
          if (!value && value !== 0) {
            return true;
          } else if (isArray(value) && value.length === 0) {
            return true;
          } else {
            return false;
          }
        }
        function createFrame(object) {
          var frame = extend({}, object);
          frame._parent = object;
          return frame;
        }
        function blockParams(params, ids) {
          params.path = ids;
          return params;
        }
        function appendContextPath(contextPath, id) {
          return (contextPath ? contextPath + '.' : '') + id;
        }
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
        function Exception(message, node) {
          var loc = node && node.loc,
              line = undefined,
              column = undefined;
          if (loc) {
            line = loc.start.line;
            column = loc.start.column;
            message += ' - ' + line + ':' + column;
          }
          var tmp = Error.prototype.constructor.call(this, message);
          for (var idx = 0; idx < errorProps.length; idx++) {
            this[errorProps[idx]] = tmp[errorProps[idx]];
          }
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Exception);
          }
          if (loc) {
            this.lineNumber = line;
            this.column = column;
          }
        }
        Exception.prototype = new Error();
        exports['default'] = Exception;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.registerDefaultHelpers = registerDefaultHelpers;
        var _helpersBlockHelperMissing = __webpack_require__(8);
        var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
        var _helpersEach = __webpack_require__(9);
        var _helpersEach2 = _interopRequireDefault(_helpersEach);
        var _helpersHelperMissing = __webpack_require__(10);
        var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
        var _helpersIf = __webpack_require__(11);
        var _helpersIf2 = _interopRequireDefault(_helpersIf);
        var _helpersLog = __webpack_require__(12);
        var _helpersLog2 = _interopRequireDefault(_helpersLog);
        var _helpersLookup = __webpack_require__(13);
        var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
        var _helpersWith = __webpack_require__(14);
        var _helpersWith2 = _interopRequireDefault(_helpersWith);
        function registerDefaultHelpers(instance) {
          _helpersBlockHelperMissing2['default'](instance);
          _helpersEach2['default'](instance);
          _helpersHelperMissing2['default'](instance);
          _helpersIf2['default'](instance);
          _helpersLog2['default'](instance);
          _helpersLookup2['default'](instance);
          _helpersWith2['default'](instance);
        }
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        exports['default'] = function(instance) {
          instance.registerHelper('blockHelperMissing', function(context, options) {
            var inverse = options.inverse,
                fn = options.fn;
            if (context === true) {
              return fn(this);
            } else if (context === false || context == null) {
              return inverse(this);
            } else if (_utils.isArray(context)) {
              if (context.length > 0) {
                if (options.ids) {
                  options.ids = [options.name];
                }
                return instance.helpers.each(context, options);
              } else {
                return inverse(this);
              }
            } else {
              if (options.data && options.ids) {
                var data = _utils.createFrame(options.data);
                data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
                options = {data: data};
              }
              return fn(context, options);
            }
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        exports['default'] = function(instance) {
          instance.registerHelper('each', function(context, options) {
            if (!options) {
              throw new _exception2['default']('Must pass iterator to #each');
            }
            var fn = options.fn,
                inverse = options.inverse,
                i = 0,
                ret = '',
                data = undefined,
                contextPath = undefined;
            if (options.data && options.ids) {
              contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
            }
            if (_utils.isFunction(context)) {
              context = context.call(this);
            }
            if (options.data) {
              data = _utils.createFrame(options.data);
            }
            function execIteration(field, index, last) {
              if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;
                if (contextPath) {
                  data.contextPath = contextPath + field;
                }
              }
              ret = ret + fn(context[field], {
                data: data,
                blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
              });
            }
            if (context && typeof context === 'object') {
              if (_utils.isArray(context)) {
                for (var j = context.length; i < j; i++) {
                  if (i in context) {
                    execIteration(i, i, i === context.length - 1);
                  }
                }
              } else {
                var priorKey = undefined;
                for (var key in context) {
                  if (context.hasOwnProperty(key)) {
                    if (priorKey !== undefined) {
                      execIteration(priorKey, i - 1);
                    }
                    priorKey = key;
                    i++;
                  }
                }
                if (priorKey !== undefined) {
                  execIteration(priorKey, i - 1, true);
                }
              }
            }
            if (i === 0) {
              ret = inverse(this);
            }
            return ret;
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        exports['default'] = function(instance) {
          instance.registerHelper('helperMissing', function() {
            if (arguments.length === 1) {
              return undefined;
            } else {
              throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
            }
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        exports['default'] = function(instance) {
          instance.registerHelper('if', function(conditional, options) {
            if (_utils.isFunction(conditional)) {
              conditional = conditional.call(this);
            }
            if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
              return options.inverse(this);
            } else {
              return options.fn(this);
            }
          });
          instance.registerHelper('unless', function(conditional, options) {
            return instance.helpers['if'].call(this, conditional, {
              fn: options.inverse,
              inverse: options.fn,
              hash: options.hash
            });
          });
        };
        module.exports = exports['default'];
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        exports['default'] = function(instance) {
          instance.registerHelper('log', function() {
            var args = [undefined],
                options = arguments[arguments.length - 1];
            for (var i = 0; i < arguments.length - 1; i++) {
              args.push(arguments[i]);
            }
            var level = 1;
            if (options.hash.level != null) {
              level = options.hash.level;
            } else if (options.data && options.data.level != null) {
              level = options.data.level;
            }
            args[0] = level;
            instance.log.apply(instance, args);
          });
        };
        module.exports = exports['default'];
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        exports['default'] = function(instance) {
          instance.registerHelper('lookup', function(obj, field) {
            return obj && obj[field];
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        exports['default'] = function(instance) {
          instance.registerHelper('with', function(context, options) {
            if (_utils.isFunction(context)) {
              context = context.call(this);
            }
            var fn = options.fn;
            if (!_utils.isEmpty(context)) {
              var data = options.data;
              if (options.data && options.ids) {
                data = _utils.createFrame(options.data);
                data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
              }
              return fn(context, {
                data: data,
                blockParams: _utils.blockParams([context], [data && data.contextPath])
              });
            } else {
              return options.inverse(this);
            }
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.registerDefaultDecorators = registerDefaultDecorators;
        var _decoratorsInline = __webpack_require__(16);
        var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
        function registerDefaultDecorators(instance) {
          _decoratorsInline2['default'](instance);
        }
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        exports['default'] = function(instance) {
          instance.registerDecorator('inline', function(fn, props, container, options) {
            var ret = fn;
            if (!props.partials) {
              props.partials = {};
              ret = function(context, options) {
                var original = container.partials;
                container.partials = _utils.extend({}, original, props.partials);
                var ret = fn(context, options);
                container.partials = original;
                return ret;
              };
            }
            props.partials[options.args[0]] = options.fn;
            return ret;
          });
        };
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        var logger = {
          methodMap: ['debug', 'info', 'warn', 'error'],
          level: 'info',
          lookupLevel: function lookupLevel(level) {
            if (typeof level === 'string') {
              var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
              if (levelMap >= 0) {
                level = levelMap;
              } else {
                level = parseInt(level, 10);
              }
            }
            return level;
          },
          log: function log(level) {
            level = logger.lookupLevel(level);
            if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
              var method = logger.methodMap[level];
              if (!console[method]) {
                method = 'log';
              }
              for (var _len = arguments.length,
                  message = Array(_len > 1 ? _len - 1 : 0),
                  _key = 1; _key < _len; _key++) {
                message[_key - 1] = arguments[_key];
              }
              console[method].apply(console, message);
            }
          }
        };
        exports['default'] = logger;
        module.exports = exports['default'];
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        function SafeString(string) {
          this.string = string;
        }
        SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
          return '' + this.string;
        };
        exports['default'] = SafeString;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireWildcard = __webpack_require__(3)['default'];
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.checkRevision = checkRevision;
        exports.template = template;
        exports.wrapProgram = wrapProgram;
        exports.resolvePartial = resolvePartial;
        exports.invokePartial = invokePartial;
        exports.noop = noop;
        var _utils = __webpack_require__(5);
        var Utils = _interopRequireWildcard(_utils);
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        var _base = __webpack_require__(4);
        function checkRevision(compilerInfo) {
          var compilerRevision = compilerInfo && compilerInfo[0] || 1,
              currentRevision = _base.COMPILER_REVISION;
          if (compilerRevision !== currentRevision) {
            if (compilerRevision < currentRevision) {
              var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
                  compilerVersions = _base.REVISION_CHANGES[compilerRevision];
              throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
            } else {
              throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
            }
          }
        }
        function template(templateSpec, env) {
          if (!env) {
            throw new _exception2['default']('No environment passed to template');
          }
          if (!templateSpec || !templateSpec.main) {
            throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
          }
          templateSpec.main.decorator = templateSpec.main_d;
          env.VM.checkRevision(templateSpec.compiler);
          function invokePartialWrapper(partial, context, options) {
            if (options.hash) {
              context = Utils.extend({}, context, options.hash);
              if (options.ids) {
                options.ids[0] = true;
              }
            }
            partial = env.VM.resolvePartial.call(this, partial, context, options);
            var result = env.VM.invokePartial.call(this, partial, context, options);
            if (result == null && env.compile) {
              options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
              result = options.partials[options.name](context, options);
            }
            if (result != null) {
              if (options.indent) {
                var lines = result.split('\n');
                for (var i = 0,
                    l = lines.length; i < l; i++) {
                  if (!lines[i] && i + 1 === l) {
                    break;
                  }
                  lines[i] = options.indent + lines[i];
                }
                result = lines.join('\n');
              }
              return result;
            } else {
              throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
            }
          }
          var container = {
            strict: function strict(obj, name) {
              if (!(name in obj)) {
                throw new _exception2['default']('"' + name + '" not defined in ' + obj);
              }
              return obj[name];
            },
            lookup: function lookup(depths, name) {
              var len = depths.length;
              for (var i = 0; i < len; i++) {
                if (depths[i] && depths[i][name] != null) {
                  return depths[i][name];
                }
              }
            },
            lambda: function lambda(current, context) {
              return typeof current === 'function' ? current.call(context) : current;
            },
            escapeExpression: Utils.escapeExpression,
            invokePartial: invokePartialWrapper,
            fn: function fn(i) {
              var ret = templateSpec[i];
              ret.decorator = templateSpec[i + '_d'];
              return ret;
            },
            programs: [],
            program: function program(i, data, declaredBlockParams, blockParams, depths) {
              var programWrapper = this.programs[i],
                  fn = this.fn(i);
              if (data || depths || blockParams || declaredBlockParams) {
                programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
              } else if (!programWrapper) {
                programWrapper = this.programs[i] = wrapProgram(this, i, fn);
              }
              return programWrapper;
            },
            data: function data(value, depth) {
              while (value && depth--) {
                value = value._parent;
              }
              return value;
            },
            merge: function merge(param, common) {
              var obj = param || common;
              if (param && common && param !== common) {
                obj = Utils.extend({}, common, param);
              }
              return obj;
            },
            noop: env.VM.noop,
            compilerInfo: templateSpec.compiler
          };
          function ret(context) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var data = options.data;
            ret._setup(options);
            if (!options.partial && templateSpec.useData) {
              data = initData(context, data);
            }
            var depths = undefined,
                blockParams = templateSpec.useBlockParams ? [] : undefined;
            if (templateSpec.useDepths) {
              if (options.depths) {
                depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
              } else {
                depths = [context];
              }
            }
            function main(context) {
              return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
            }
            main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
            return main(context, options);
          }
          ret.isTop = true;
          ret._setup = function(options) {
            if (!options.partial) {
              container.helpers = container.merge(options.helpers, env.helpers);
              if (templateSpec.usePartial) {
                container.partials = container.merge(options.partials, env.partials);
              }
              if (templateSpec.usePartial || templateSpec.useDecorators) {
                container.decorators = container.merge(options.decorators, env.decorators);
              }
            } else {
              container.helpers = options.helpers;
              container.partials = options.partials;
              container.decorators = options.decorators;
            }
          };
          ret._child = function(i, data, blockParams, depths) {
            if (templateSpec.useBlockParams && !blockParams) {
              throw new _exception2['default']('must pass block params');
            }
            if (templateSpec.useDepths && !depths) {
              throw new _exception2['default']('must pass parent depths');
            }
            return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
          };
          return ret;
        }
        function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
          function prog(context) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var currentDepths = depths;
            if (depths && context !== depths[0]) {
              currentDepths = [context].concat(depths);
            }
            return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
          }
          prog = executeDecorators(fn, prog, container, depths, data, blockParams);
          prog.program = i;
          prog.depth = depths ? depths.length : 0;
          prog.blockParams = declaredBlockParams || 0;
          return prog;
        }
        function resolvePartial(partial, context, options) {
          if (!partial) {
            if (options.name === '@partial-block') {
              partial = options.data['partial-block'];
            } else {
              partial = options.partials[options.name];
            }
          } else if (!partial.call && !options.name) {
            options.name = partial;
            partial = options.partials[partial];
          }
          return partial;
        }
        function invokePartial(partial, context, options) {
          options.partial = true;
          if (options.ids) {
            options.data.contextPath = options.ids[0] || options.data.contextPath;
          }
          var partialBlock = undefined;
          if (options.fn && options.fn !== noop) {
            options.data = _base.createFrame(options.data);
            partialBlock = options.data['partial-block'] = options.fn;
            if (partialBlock.partials) {
              options.partials = Utils.extend({}, options.partials, partialBlock.partials);
            }
          }
          if (partial === undefined && partialBlock) {
            partial = partialBlock;
          }
          if (partial === undefined) {
            throw new _exception2['default']('The partial ' + options.name + ' could not be found');
          } else if (partial instanceof Function) {
            return partial(context, options);
          }
        }
        function noop() {
          return '';
        }
        function initData(context, data) {
          if (!data || !('root' in data)) {
            data = data ? _base.createFrame(data) : {};
            data.root = context;
          }
          return data;
        }
        function executeDecorators(fn, prog, container, depths, data, blockParams) {
          if (fn.decorator) {
            var props = {};
            prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
            Utils.extend(prog, props);
          }
          return prog;
        }
      }, function(module, exports) {
        (function(global) {
          'use strict';
          exports.__esModule = true;
          exports['default'] = function(Handlebars) {
            var root = typeof global !== 'undefined' ? global : window,
                $Handlebars = root.Handlebars;
            Handlebars.noConflict = function() {
              if (root.Handlebars === Handlebars) {
                root.Handlebars = $Handlebars;
              }
              return Handlebars;
            };
          };
          module.exports = exports['default'];
        }.call(exports, (function() {
          return this;
        }())));
      }, function(module, exports) {
        'use strict';
        exports.__esModule = true;
        var AST = {helpers: {
            helperExpression: function helperExpression(node) {
              return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
            },
            scopedId: function scopedId(path) {
              return (/^\.|this\b/.test(path.original));
            },
            simpleId: function simpleId(path) {
              return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
            }
          }};
        exports['default'] = AST;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        var _interopRequireWildcard = __webpack_require__(3)['default'];
        exports.__esModule = true;
        exports.parse = parse;
        var _parser = __webpack_require__(23);
        var _parser2 = _interopRequireDefault(_parser);
        var _whitespaceControl = __webpack_require__(24);
        var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
        var _helpers = __webpack_require__(26);
        var Helpers = _interopRequireWildcard(_helpers);
        var _utils = __webpack_require__(5);
        exports.parser = _parser2['default'];
        var yy = {};
        _utils.extend(yy, Helpers);
        function parse(input, options) {
          if (input.type === 'Program') {
            return input;
          }
          _parser2['default'].yy = yy;
          yy.locInfo = function(locInfo) {
            return new yy.SourceLocation(options && options.srcName, locInfo);
          };
          var strip = new _whitespaceControl2['default'](options);
          return strip.accept(_parser2['default'].parse(input));
        }
      }, function(module, exports) {
        "use strict";
        var handlebars = (function() {
          var parser = {
            trace: function trace() {},
            yy: {},
            symbols_: {
              "error": 2,
              "root": 3,
              "program": 4,
              "EOF": 5,
              "program_repetition0": 6,
              "statement": 7,
              "mustache": 8,
              "block": 9,
              "rawBlock": 10,
              "partial": 11,
              "partialBlock": 12,
              "content": 13,
              "COMMENT": 14,
              "CONTENT": 15,
              "openRawBlock": 16,
              "rawBlock_repetition_plus0": 17,
              "END_RAW_BLOCK": 18,
              "OPEN_RAW_BLOCK": 19,
              "helperName": 20,
              "openRawBlock_repetition0": 21,
              "openRawBlock_option0": 22,
              "CLOSE_RAW_BLOCK": 23,
              "openBlock": 24,
              "block_option0": 25,
              "closeBlock": 26,
              "openInverse": 27,
              "block_option1": 28,
              "OPEN_BLOCK": 29,
              "openBlock_repetition0": 30,
              "openBlock_option0": 31,
              "openBlock_option1": 32,
              "CLOSE": 33,
              "OPEN_INVERSE": 34,
              "openInverse_repetition0": 35,
              "openInverse_option0": 36,
              "openInverse_option1": 37,
              "openInverseChain": 38,
              "OPEN_INVERSE_CHAIN": 39,
              "openInverseChain_repetition0": 40,
              "openInverseChain_option0": 41,
              "openInverseChain_option1": 42,
              "inverseAndProgram": 43,
              "INVERSE": 44,
              "inverseChain": 45,
              "inverseChain_option0": 46,
              "OPEN_ENDBLOCK": 47,
              "OPEN": 48,
              "mustache_repetition0": 49,
              "mustache_option0": 50,
              "OPEN_UNESCAPED": 51,
              "mustache_repetition1": 52,
              "mustache_option1": 53,
              "CLOSE_UNESCAPED": 54,
              "OPEN_PARTIAL": 55,
              "partialName": 56,
              "partial_repetition0": 57,
              "partial_option0": 58,
              "openPartialBlock": 59,
              "OPEN_PARTIAL_BLOCK": 60,
              "openPartialBlock_repetition0": 61,
              "openPartialBlock_option0": 62,
              "param": 63,
              "sexpr": 64,
              "OPEN_SEXPR": 65,
              "sexpr_repetition0": 66,
              "sexpr_option0": 67,
              "CLOSE_SEXPR": 68,
              "hash": 69,
              "hash_repetition_plus0": 70,
              "hashSegment": 71,
              "ID": 72,
              "EQUALS": 73,
              "blockParams": 74,
              "OPEN_BLOCK_PARAMS": 75,
              "blockParams_repetition_plus0": 76,
              "CLOSE_BLOCK_PARAMS": 77,
              "path": 78,
              "dataName": 79,
              "STRING": 80,
              "NUMBER": 81,
              "BOOLEAN": 82,
              "UNDEFINED": 83,
              "NULL": 84,
              "DATA": 85,
              "pathSegments": 86,
              "SEP": 87,
              "$accept": 0,
              "$end": 1
            },
            terminals_: {
              2: "error",
              5: "EOF",
              14: "COMMENT",
              15: "CONTENT",
              18: "END_RAW_BLOCK",
              19: "OPEN_RAW_BLOCK",
              23: "CLOSE_RAW_BLOCK",
              29: "OPEN_BLOCK",
              33: "CLOSE",
              34: "OPEN_INVERSE",
              39: "OPEN_INVERSE_CHAIN",
              44: "INVERSE",
              47: "OPEN_ENDBLOCK",
              48: "OPEN",
              51: "OPEN_UNESCAPED",
              54: "CLOSE_UNESCAPED",
              55: "OPEN_PARTIAL",
              60: "OPEN_PARTIAL_BLOCK",
              65: "OPEN_SEXPR",
              68: "CLOSE_SEXPR",
              72: "ID",
              73: "EQUALS",
              75: "OPEN_BLOCK_PARAMS",
              77: "CLOSE_BLOCK_PARAMS",
              80: "STRING",
              81: "NUMBER",
              82: "BOOLEAN",
              83: "UNDEFINED",
              84: "NULL",
              85: "DATA",
              87: "SEP"
            },
            productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
            performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
              var $0 = $$.length - 1;
              switch (yystate) {
                case 1:
                  return $$[$0 - 1];
                  break;
                case 2:
                  this.$ = yy.prepareProgram($$[$0]);
                  break;
                case 3:
                  this.$ = $$[$0];
                  break;
                case 4:
                  this.$ = $$[$0];
                  break;
                case 5:
                  this.$ = $$[$0];
                  break;
                case 6:
                  this.$ = $$[$0];
                  break;
                case 7:
                  this.$ = $$[$0];
                  break;
                case 8:
                  this.$ = $$[$0];
                  break;
                case 9:
                  this.$ = {
                    type: 'CommentStatement',
                    value: yy.stripComment($$[$0]),
                    strip: yy.stripFlags($$[$0], $$[$0]),
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 10:
                  this.$ = {
                    type: 'ContentStatement',
                    original: $$[$0],
                    value: $$[$0],
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 11:
                  this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                  break;
                case 12:
                  this.$ = {
                    path: $$[$0 - 3],
                    params: $$[$0 - 2],
                    hash: $$[$0 - 1]
                  };
                  break;
                case 13:
                  this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                  break;
                case 14:
                  this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                  break;
                case 15:
                  this.$ = {
                    open: $$[$0 - 5],
                    path: $$[$0 - 4],
                    params: $$[$0 - 3],
                    hash: $$[$0 - 2],
                    blockParams: $$[$0 - 1],
                    strip: yy.stripFlags($$[$0 - 5], $$[$0])
                  };
                  break;
                case 16:
                  this.$ = {
                    path: $$[$0 - 4],
                    params: $$[$0 - 3],
                    hash: $$[$0 - 2],
                    blockParams: $$[$0 - 1],
                    strip: yy.stripFlags($$[$0 - 5], $$[$0])
                  };
                  break;
                case 17:
                  this.$ = {
                    path: $$[$0 - 4],
                    params: $$[$0 - 3],
                    hash: $$[$0 - 2],
                    blockParams: $$[$0 - 1],
                    strip: yy.stripFlags($$[$0 - 5], $$[$0])
                  };
                  break;
                case 18:
                  this.$ = {
                    strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
                    program: $$[$0]
                  };
                  break;
                case 19:
                  var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                      program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                  program.chained = true;
                  this.$ = {
                    strip: $$[$0 - 2].strip,
                    program: program,
                    chain: true
                  };
                  break;
                case 20:
                  this.$ = $$[$0];
                  break;
                case 21:
                  this.$ = {
                    path: $$[$0 - 1],
                    strip: yy.stripFlags($$[$0 - 2], $$[$0])
                  };
                  break;
                case 22:
                  this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                  break;
                case 23:
                  this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                  break;
                case 24:
                  this.$ = {
                    type: 'PartialStatement',
                    name: $$[$0 - 3],
                    params: $$[$0 - 2],
                    hash: $$[$0 - 1],
                    indent: '',
                    strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 25:
                  this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                  break;
                case 26:
                  this.$ = {
                    path: $$[$0 - 3],
                    params: $$[$0 - 2],
                    hash: $$[$0 - 1],
                    strip: yy.stripFlags($$[$0 - 4], $$[$0])
                  };
                  break;
                case 27:
                  this.$ = $$[$0];
                  break;
                case 28:
                  this.$ = $$[$0];
                  break;
                case 29:
                  this.$ = {
                    type: 'SubExpression',
                    path: $$[$0 - 3],
                    params: $$[$0 - 2],
                    hash: $$[$0 - 1],
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 30:
                  this.$ = {
                    type: 'Hash',
                    pairs: $$[$0],
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 31:
                  this.$ = {
                    type: 'HashPair',
                    key: yy.id($$[$0 - 2]),
                    value: $$[$0],
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 32:
                  this.$ = yy.id($$[$0 - 1]);
                  break;
                case 33:
                  this.$ = $$[$0];
                  break;
                case 34:
                  this.$ = $$[$0];
                  break;
                case 35:
                  this.$ = {
                    type: 'StringLiteral',
                    value: $$[$0],
                    original: $$[$0],
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 36:
                  this.$ = {
                    type: 'NumberLiteral',
                    value: Number($$[$0]),
                    original: Number($$[$0]),
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 37:
                  this.$ = {
                    type: 'BooleanLiteral',
                    value: $$[$0] === 'true',
                    original: $$[$0] === 'true',
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 38:
                  this.$ = {
                    type: 'UndefinedLiteral',
                    original: undefined,
                    value: undefined,
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 39:
                  this.$ = {
                    type: 'NullLiteral',
                    original: null,
                    value: null,
                    loc: yy.locInfo(this._$)
                  };
                  break;
                case 40:
                  this.$ = $$[$0];
                  break;
                case 41:
                  this.$ = $$[$0];
                  break;
                case 42:
                  this.$ = yy.preparePath(true, $$[$0], this._$);
                  break;
                case 43:
                  this.$ = yy.preparePath(false, $$[$0], this._$);
                  break;
                case 44:
                  $$[$0 - 2].push({
                    part: yy.id($$[$0]),
                    original: $$[$0],
                    separator: $$[$0 - 1]
                  });
                  this.$ = $$[$0 - 2];
                  break;
                case 45:
                  this.$ = [{
                    part: yy.id($$[$0]),
                    original: $$[$0]
                  }];
                  break;
                case 46:
                  this.$ = [];
                  break;
                case 47:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 48:
                  this.$ = [$$[$0]];
                  break;
                case 49:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 50:
                  this.$ = [];
                  break;
                case 51:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 58:
                  this.$ = [];
                  break;
                case 59:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 64:
                  this.$ = [];
                  break;
                case 65:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 70:
                  this.$ = [];
                  break;
                case 71:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 78:
                  this.$ = [];
                  break;
                case 79:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 82:
                  this.$ = [];
                  break;
                case 83:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 86:
                  this.$ = [];
                  break;
                case 87:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 90:
                  this.$ = [];
                  break;
                case 91:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 94:
                  this.$ = [];
                  break;
                case 95:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 98:
                  this.$ = [$$[$0]];
                  break;
                case 99:
                  $$[$0 - 1].push($$[$0]);
                  break;
                case 100:
                  this.$ = [$$[$0]];
                  break;
                case 101:
                  $$[$0 - 1].push($$[$0]);
                  break;
              }
            },
            table: [{
              3: 1,
              4: 2,
              5: [2, 46],
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {1: [3]}, {5: [1, 4]}, {
              5: [2, 2],
              7: 5,
              8: 6,
              9: 7,
              10: 8,
              11: 9,
              12: 10,
              13: 11,
              14: [1, 12],
              15: [1, 20],
              16: 17,
              19: [1, 23],
              24: 15,
              27: 16,
              29: [1, 21],
              34: [1, 22],
              39: [2, 2],
              44: [2, 2],
              47: [2, 2],
              48: [1, 13],
              51: [1, 14],
              55: [1, 18],
              59: 19,
              60: [1, 24]
            }, {1: [2, 1]}, {
              5: [2, 47],
              14: [2, 47],
              15: [2, 47],
              19: [2, 47],
              29: [2, 47],
              34: [2, 47],
              39: [2, 47],
              44: [2, 47],
              47: [2, 47],
              48: [2, 47],
              51: [2, 47],
              55: [2, 47],
              60: [2, 47]
            }, {
              5: [2, 3],
              14: [2, 3],
              15: [2, 3],
              19: [2, 3],
              29: [2, 3],
              34: [2, 3],
              39: [2, 3],
              44: [2, 3],
              47: [2, 3],
              48: [2, 3],
              51: [2, 3],
              55: [2, 3],
              60: [2, 3]
            }, {
              5: [2, 4],
              14: [2, 4],
              15: [2, 4],
              19: [2, 4],
              29: [2, 4],
              34: [2, 4],
              39: [2, 4],
              44: [2, 4],
              47: [2, 4],
              48: [2, 4],
              51: [2, 4],
              55: [2, 4],
              60: [2, 4]
            }, {
              5: [2, 5],
              14: [2, 5],
              15: [2, 5],
              19: [2, 5],
              29: [2, 5],
              34: [2, 5],
              39: [2, 5],
              44: [2, 5],
              47: [2, 5],
              48: [2, 5],
              51: [2, 5],
              55: [2, 5],
              60: [2, 5]
            }, {
              5: [2, 6],
              14: [2, 6],
              15: [2, 6],
              19: [2, 6],
              29: [2, 6],
              34: [2, 6],
              39: [2, 6],
              44: [2, 6],
              47: [2, 6],
              48: [2, 6],
              51: [2, 6],
              55: [2, 6],
              60: [2, 6]
            }, {
              5: [2, 7],
              14: [2, 7],
              15: [2, 7],
              19: [2, 7],
              29: [2, 7],
              34: [2, 7],
              39: [2, 7],
              44: [2, 7],
              47: [2, 7],
              48: [2, 7],
              51: [2, 7],
              55: [2, 7],
              60: [2, 7]
            }, {
              5: [2, 8],
              14: [2, 8],
              15: [2, 8],
              19: [2, 8],
              29: [2, 8],
              34: [2, 8],
              39: [2, 8],
              44: [2, 8],
              47: [2, 8],
              48: [2, 8],
              51: [2, 8],
              55: [2, 8],
              60: [2, 8]
            }, {
              5: [2, 9],
              14: [2, 9],
              15: [2, 9],
              19: [2, 9],
              29: [2, 9],
              34: [2, 9],
              39: [2, 9],
              44: [2, 9],
              47: [2, 9],
              48: [2, 9],
              51: [2, 9],
              55: [2, 9],
              60: [2, 9]
            }, {
              20: 25,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 36,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              4: 37,
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              39: [2, 46],
              44: [2, 46],
              47: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {
              4: 38,
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              44: [2, 46],
              47: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {
              13: 40,
              15: [1, 20],
              17: 39
            }, {
              20: 42,
              56: 41,
              64: 43,
              65: [1, 44],
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              4: 45,
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              47: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {
              5: [2, 10],
              14: [2, 10],
              15: [2, 10],
              18: [2, 10],
              19: [2, 10],
              29: [2, 10],
              34: [2, 10],
              39: [2, 10],
              44: [2, 10],
              47: [2, 10],
              48: [2, 10],
              51: [2, 10],
              55: [2, 10],
              60: [2, 10]
            }, {
              20: 46,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 47,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 48,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 42,
              56: 49,
              64: 43,
              65: [1, 44],
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              33: [2, 78],
              49: 50,
              65: [2, 78],
              72: [2, 78],
              80: [2, 78],
              81: [2, 78],
              82: [2, 78],
              83: [2, 78],
              84: [2, 78],
              85: [2, 78]
            }, {
              23: [2, 33],
              33: [2, 33],
              54: [2, 33],
              65: [2, 33],
              68: [2, 33],
              72: [2, 33],
              75: [2, 33],
              80: [2, 33],
              81: [2, 33],
              82: [2, 33],
              83: [2, 33],
              84: [2, 33],
              85: [2, 33]
            }, {
              23: [2, 34],
              33: [2, 34],
              54: [2, 34],
              65: [2, 34],
              68: [2, 34],
              72: [2, 34],
              75: [2, 34],
              80: [2, 34],
              81: [2, 34],
              82: [2, 34],
              83: [2, 34],
              84: [2, 34],
              85: [2, 34]
            }, {
              23: [2, 35],
              33: [2, 35],
              54: [2, 35],
              65: [2, 35],
              68: [2, 35],
              72: [2, 35],
              75: [2, 35],
              80: [2, 35],
              81: [2, 35],
              82: [2, 35],
              83: [2, 35],
              84: [2, 35],
              85: [2, 35]
            }, {
              23: [2, 36],
              33: [2, 36],
              54: [2, 36],
              65: [2, 36],
              68: [2, 36],
              72: [2, 36],
              75: [2, 36],
              80: [2, 36],
              81: [2, 36],
              82: [2, 36],
              83: [2, 36],
              84: [2, 36],
              85: [2, 36]
            }, {
              23: [2, 37],
              33: [2, 37],
              54: [2, 37],
              65: [2, 37],
              68: [2, 37],
              72: [2, 37],
              75: [2, 37],
              80: [2, 37],
              81: [2, 37],
              82: [2, 37],
              83: [2, 37],
              84: [2, 37],
              85: [2, 37]
            }, {
              23: [2, 38],
              33: [2, 38],
              54: [2, 38],
              65: [2, 38],
              68: [2, 38],
              72: [2, 38],
              75: [2, 38],
              80: [2, 38],
              81: [2, 38],
              82: [2, 38],
              83: [2, 38],
              84: [2, 38],
              85: [2, 38]
            }, {
              23: [2, 39],
              33: [2, 39],
              54: [2, 39],
              65: [2, 39],
              68: [2, 39],
              72: [2, 39],
              75: [2, 39],
              80: [2, 39],
              81: [2, 39],
              82: [2, 39],
              83: [2, 39],
              84: [2, 39],
              85: [2, 39]
            }, {
              23: [2, 43],
              33: [2, 43],
              54: [2, 43],
              65: [2, 43],
              68: [2, 43],
              72: [2, 43],
              75: [2, 43],
              80: [2, 43],
              81: [2, 43],
              82: [2, 43],
              83: [2, 43],
              84: [2, 43],
              85: [2, 43],
              87: [1, 51]
            }, {
              72: [1, 35],
              86: 52
            }, {
              23: [2, 45],
              33: [2, 45],
              54: [2, 45],
              65: [2, 45],
              68: [2, 45],
              72: [2, 45],
              75: [2, 45],
              80: [2, 45],
              81: [2, 45],
              82: [2, 45],
              83: [2, 45],
              84: [2, 45],
              85: [2, 45],
              87: [2, 45]
            }, {
              52: 53,
              54: [2, 82],
              65: [2, 82],
              72: [2, 82],
              80: [2, 82],
              81: [2, 82],
              82: [2, 82],
              83: [2, 82],
              84: [2, 82],
              85: [2, 82]
            }, {
              25: 54,
              38: 56,
              39: [1, 58],
              43: 57,
              44: [1, 59],
              45: 55,
              47: [2, 54]
            }, {
              28: 60,
              43: 61,
              44: [1, 59],
              47: [2, 56]
            }, {
              13: 63,
              15: [1, 20],
              18: [1, 62]
            }, {
              15: [2, 48],
              18: [2, 48]
            }, {
              33: [2, 86],
              57: 64,
              65: [2, 86],
              72: [2, 86],
              80: [2, 86],
              81: [2, 86],
              82: [2, 86],
              83: [2, 86],
              84: [2, 86],
              85: [2, 86]
            }, {
              33: [2, 40],
              65: [2, 40],
              72: [2, 40],
              80: [2, 40],
              81: [2, 40],
              82: [2, 40],
              83: [2, 40],
              84: [2, 40],
              85: [2, 40]
            }, {
              33: [2, 41],
              65: [2, 41],
              72: [2, 41],
              80: [2, 41],
              81: [2, 41],
              82: [2, 41],
              83: [2, 41],
              84: [2, 41],
              85: [2, 41]
            }, {
              20: 65,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              26: 66,
              47: [1, 67]
            }, {
              30: 68,
              33: [2, 58],
              65: [2, 58],
              72: [2, 58],
              75: [2, 58],
              80: [2, 58],
              81: [2, 58],
              82: [2, 58],
              83: [2, 58],
              84: [2, 58],
              85: [2, 58]
            }, {
              33: [2, 64],
              35: 69,
              65: [2, 64],
              72: [2, 64],
              75: [2, 64],
              80: [2, 64],
              81: [2, 64],
              82: [2, 64],
              83: [2, 64],
              84: [2, 64],
              85: [2, 64]
            }, {
              21: 70,
              23: [2, 50],
              65: [2, 50],
              72: [2, 50],
              80: [2, 50],
              81: [2, 50],
              82: [2, 50],
              83: [2, 50],
              84: [2, 50],
              85: [2, 50]
            }, {
              33: [2, 90],
              61: 71,
              65: [2, 90],
              72: [2, 90],
              80: [2, 90],
              81: [2, 90],
              82: [2, 90],
              83: [2, 90],
              84: [2, 90],
              85: [2, 90]
            }, {
              20: 75,
              33: [2, 80],
              50: 72,
              63: 73,
              64: 76,
              65: [1, 44],
              69: 74,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {72: [1, 80]}, {
              23: [2, 42],
              33: [2, 42],
              54: [2, 42],
              65: [2, 42],
              68: [2, 42],
              72: [2, 42],
              75: [2, 42],
              80: [2, 42],
              81: [2, 42],
              82: [2, 42],
              83: [2, 42],
              84: [2, 42],
              85: [2, 42],
              87: [1, 51]
            }, {
              20: 75,
              53: 81,
              54: [2, 84],
              63: 82,
              64: 76,
              65: [1, 44],
              69: 83,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              26: 84,
              47: [1, 67]
            }, {47: [2, 55]}, {
              4: 85,
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              39: [2, 46],
              44: [2, 46],
              47: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {47: [2, 20]}, {
              20: 86,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              4: 87,
              6: 3,
              14: [2, 46],
              15: [2, 46],
              19: [2, 46],
              29: [2, 46],
              34: [2, 46],
              47: [2, 46],
              48: [2, 46],
              51: [2, 46],
              55: [2, 46],
              60: [2, 46]
            }, {
              26: 88,
              47: [1, 67]
            }, {47: [2, 57]}, {
              5: [2, 11],
              14: [2, 11],
              15: [2, 11],
              19: [2, 11],
              29: [2, 11],
              34: [2, 11],
              39: [2, 11],
              44: [2, 11],
              47: [2, 11],
              48: [2, 11],
              51: [2, 11],
              55: [2, 11],
              60: [2, 11]
            }, {
              15: [2, 49],
              18: [2, 49]
            }, {
              20: 75,
              33: [2, 88],
              58: 89,
              63: 90,
              64: 76,
              65: [1, 44],
              69: 91,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              65: [2, 94],
              66: 92,
              68: [2, 94],
              72: [2, 94],
              80: [2, 94],
              81: [2, 94],
              82: [2, 94],
              83: [2, 94],
              84: [2, 94],
              85: [2, 94]
            }, {
              5: [2, 25],
              14: [2, 25],
              15: [2, 25],
              19: [2, 25],
              29: [2, 25],
              34: [2, 25],
              39: [2, 25],
              44: [2, 25],
              47: [2, 25],
              48: [2, 25],
              51: [2, 25],
              55: [2, 25],
              60: [2, 25]
            }, {
              20: 93,
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 75,
              31: 94,
              33: [2, 60],
              63: 95,
              64: 76,
              65: [1, 44],
              69: 96,
              70: 77,
              71: 78,
              72: [1, 79],
              75: [2, 60],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 75,
              33: [2, 66],
              36: 97,
              63: 98,
              64: 76,
              65: [1, 44],
              69: 99,
              70: 77,
              71: 78,
              72: [1, 79],
              75: [2, 66],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 75,
              22: 100,
              23: [2, 52],
              63: 101,
              64: 76,
              65: [1, 44],
              69: 102,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              20: 75,
              33: [2, 92],
              62: 103,
              63: 104,
              64: 76,
              65: [1, 44],
              69: 105,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {33: [1, 106]}, {
              33: [2, 79],
              65: [2, 79],
              72: [2, 79],
              80: [2, 79],
              81: [2, 79],
              82: [2, 79],
              83: [2, 79],
              84: [2, 79],
              85: [2, 79]
            }, {33: [2, 81]}, {
              23: [2, 27],
              33: [2, 27],
              54: [2, 27],
              65: [2, 27],
              68: [2, 27],
              72: [2, 27],
              75: [2, 27],
              80: [2, 27],
              81: [2, 27],
              82: [2, 27],
              83: [2, 27],
              84: [2, 27],
              85: [2, 27]
            }, {
              23: [2, 28],
              33: [2, 28],
              54: [2, 28],
              65: [2, 28],
              68: [2, 28],
              72: [2, 28],
              75: [2, 28],
              80: [2, 28],
              81: [2, 28],
              82: [2, 28],
              83: [2, 28],
              84: [2, 28],
              85: [2, 28]
            }, {
              23: [2, 30],
              33: [2, 30],
              54: [2, 30],
              68: [2, 30],
              71: 107,
              72: [1, 108],
              75: [2, 30]
            }, {
              23: [2, 98],
              33: [2, 98],
              54: [2, 98],
              68: [2, 98],
              72: [2, 98],
              75: [2, 98]
            }, {
              23: [2, 45],
              33: [2, 45],
              54: [2, 45],
              65: [2, 45],
              68: [2, 45],
              72: [2, 45],
              73: [1, 109],
              75: [2, 45],
              80: [2, 45],
              81: [2, 45],
              82: [2, 45],
              83: [2, 45],
              84: [2, 45],
              85: [2, 45],
              87: [2, 45]
            }, {
              23: [2, 44],
              33: [2, 44],
              54: [2, 44],
              65: [2, 44],
              68: [2, 44],
              72: [2, 44],
              75: [2, 44],
              80: [2, 44],
              81: [2, 44],
              82: [2, 44],
              83: [2, 44],
              84: [2, 44],
              85: [2, 44],
              87: [2, 44]
            }, {54: [1, 110]}, {
              54: [2, 83],
              65: [2, 83],
              72: [2, 83],
              80: [2, 83],
              81: [2, 83],
              82: [2, 83],
              83: [2, 83],
              84: [2, 83],
              85: [2, 83]
            }, {54: [2, 85]}, {
              5: [2, 13],
              14: [2, 13],
              15: [2, 13],
              19: [2, 13],
              29: [2, 13],
              34: [2, 13],
              39: [2, 13],
              44: [2, 13],
              47: [2, 13],
              48: [2, 13],
              51: [2, 13],
              55: [2, 13],
              60: [2, 13]
            }, {
              38: 56,
              39: [1, 58],
              43: 57,
              44: [1, 59],
              45: 112,
              46: 111,
              47: [2, 76]
            }, {
              33: [2, 70],
              40: 113,
              65: [2, 70],
              72: [2, 70],
              75: [2, 70],
              80: [2, 70],
              81: [2, 70],
              82: [2, 70],
              83: [2, 70],
              84: [2, 70],
              85: [2, 70]
            }, {47: [2, 18]}, {
              5: [2, 14],
              14: [2, 14],
              15: [2, 14],
              19: [2, 14],
              29: [2, 14],
              34: [2, 14],
              39: [2, 14],
              44: [2, 14],
              47: [2, 14],
              48: [2, 14],
              51: [2, 14],
              55: [2, 14],
              60: [2, 14]
            }, {33: [1, 114]}, {
              33: [2, 87],
              65: [2, 87],
              72: [2, 87],
              80: [2, 87],
              81: [2, 87],
              82: [2, 87],
              83: [2, 87],
              84: [2, 87],
              85: [2, 87]
            }, {33: [2, 89]}, {
              20: 75,
              63: 116,
              64: 76,
              65: [1, 44],
              67: 115,
              68: [2, 96],
              69: 117,
              70: 77,
              71: 78,
              72: [1, 79],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {33: [1, 118]}, {
              32: 119,
              33: [2, 62],
              74: 120,
              75: [1, 121]
            }, {
              33: [2, 59],
              65: [2, 59],
              72: [2, 59],
              75: [2, 59],
              80: [2, 59],
              81: [2, 59],
              82: [2, 59],
              83: [2, 59],
              84: [2, 59],
              85: [2, 59]
            }, {
              33: [2, 61],
              75: [2, 61]
            }, {
              33: [2, 68],
              37: 122,
              74: 123,
              75: [1, 121]
            }, {
              33: [2, 65],
              65: [2, 65],
              72: [2, 65],
              75: [2, 65],
              80: [2, 65],
              81: [2, 65],
              82: [2, 65],
              83: [2, 65],
              84: [2, 65],
              85: [2, 65]
            }, {
              33: [2, 67],
              75: [2, 67]
            }, {23: [1, 124]}, {
              23: [2, 51],
              65: [2, 51],
              72: [2, 51],
              80: [2, 51],
              81: [2, 51],
              82: [2, 51],
              83: [2, 51],
              84: [2, 51],
              85: [2, 51]
            }, {23: [2, 53]}, {33: [1, 125]}, {
              33: [2, 91],
              65: [2, 91],
              72: [2, 91],
              80: [2, 91],
              81: [2, 91],
              82: [2, 91],
              83: [2, 91],
              84: [2, 91],
              85: [2, 91]
            }, {33: [2, 93]}, {
              5: [2, 22],
              14: [2, 22],
              15: [2, 22],
              19: [2, 22],
              29: [2, 22],
              34: [2, 22],
              39: [2, 22],
              44: [2, 22],
              47: [2, 22],
              48: [2, 22],
              51: [2, 22],
              55: [2, 22],
              60: [2, 22]
            }, {
              23: [2, 99],
              33: [2, 99],
              54: [2, 99],
              68: [2, 99],
              72: [2, 99],
              75: [2, 99]
            }, {73: [1, 109]}, {
              20: 75,
              63: 126,
              64: 76,
              65: [1, 44],
              72: [1, 35],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              5: [2, 23],
              14: [2, 23],
              15: [2, 23],
              19: [2, 23],
              29: [2, 23],
              34: [2, 23],
              39: [2, 23],
              44: [2, 23],
              47: [2, 23],
              48: [2, 23],
              51: [2, 23],
              55: [2, 23],
              60: [2, 23]
            }, {47: [2, 19]}, {47: [2, 77]}, {
              20: 75,
              33: [2, 72],
              41: 127,
              63: 128,
              64: 76,
              65: [1, 44],
              69: 129,
              70: 77,
              71: 78,
              72: [1, 79],
              75: [2, 72],
              78: 26,
              79: 27,
              80: [1, 28],
              81: [1, 29],
              82: [1, 30],
              83: [1, 31],
              84: [1, 32],
              85: [1, 34],
              86: 33
            }, {
              5: [2, 24],
              14: [2, 24],
              15: [2, 24],
              19: [2, 24],
              29: [2, 24],
              34: [2, 24],
              39: [2, 24],
              44: [2, 24],
              47: [2, 24],
              48: [2, 24],
              51: [2, 24],
              55: [2, 24],
              60: [2, 24]
            }, {68: [1, 130]}, {
              65: [2, 95],
              68: [2, 95],
              72: [2, 95],
              80: [2, 95],
              81: [2, 95],
              82: [2, 95],
              83: [2, 95],
              84: [2, 95],
              85: [2, 95]
            }, {68: [2, 97]}, {
              5: [2, 21],
              14: [2, 21],
              15: [2, 21],
              19: [2, 21],
              29: [2, 21],
              34: [2, 21],
              39: [2, 21],
              44: [2, 21],
              47: [2, 21],
              48: [2, 21],
              51: [2, 21],
              55: [2, 21],
              60: [2, 21]
            }, {33: [1, 131]}, {33: [2, 63]}, {
              72: [1, 133],
              76: 132
            }, {33: [1, 134]}, {33: [2, 69]}, {15: [2, 12]}, {
              14: [2, 26],
              15: [2, 26],
              19: [2, 26],
              29: [2, 26],
              34: [2, 26],
              47: [2, 26],
              48: [2, 26],
              51: [2, 26],
              55: [2, 26],
              60: [2, 26]
            }, {
              23: [2, 31],
              33: [2, 31],
              54: [2, 31],
              68: [2, 31],
              72: [2, 31],
              75: [2, 31]
            }, {
              33: [2, 74],
              42: 135,
              74: 136,
              75: [1, 121]
            }, {
              33: [2, 71],
              65: [2, 71],
              72: [2, 71],
              75: [2, 71],
              80: [2, 71],
              81: [2, 71],
              82: [2, 71],
              83: [2, 71],
              84: [2, 71],
              85: [2, 71]
            }, {
              33: [2, 73],
              75: [2, 73]
            }, {
              23: [2, 29],
              33: [2, 29],
              54: [2, 29],
              65: [2, 29],
              68: [2, 29],
              72: [2, 29],
              75: [2, 29],
              80: [2, 29],
              81: [2, 29],
              82: [2, 29],
              83: [2, 29],
              84: [2, 29],
              85: [2, 29]
            }, {
              14: [2, 15],
              15: [2, 15],
              19: [2, 15],
              29: [2, 15],
              34: [2, 15],
              39: [2, 15],
              44: [2, 15],
              47: [2, 15],
              48: [2, 15],
              51: [2, 15],
              55: [2, 15],
              60: [2, 15]
            }, {
              72: [1, 138],
              77: [1, 137]
            }, {
              72: [2, 100],
              77: [2, 100]
            }, {
              14: [2, 16],
              15: [2, 16],
              19: [2, 16],
              29: [2, 16],
              34: [2, 16],
              44: [2, 16],
              47: [2, 16],
              48: [2, 16],
              51: [2, 16],
              55: [2, 16],
              60: [2, 16]
            }, {33: [1, 139]}, {33: [2, 75]}, {33: [2, 32]}, {
              72: [2, 101],
              77: [2, 101]
            }, {
              14: [2, 17],
              15: [2, 17],
              19: [2, 17],
              29: [2, 17],
              34: [2, 17],
              39: [2, 17],
              44: [2, 17],
              47: [2, 17],
              48: [2, 17],
              51: [2, 17],
              55: [2, 17],
              60: [2, 17]
            }],
            defaultActions: {
              4: [2, 1],
              55: [2, 55],
              57: [2, 20],
              61: [2, 57],
              74: [2, 81],
              83: [2, 85],
              87: [2, 18],
              91: [2, 89],
              102: [2, 53],
              105: [2, 93],
              111: [2, 19],
              112: [2, 77],
              117: [2, 97],
              120: [2, 63],
              123: [2, 69],
              124: [2, 12],
              136: [2, 75],
              137: [2, 32]
            },
            parseError: function parseError(str, hash) {
              throw new Error(str);
            },
            parse: function parse(input) {
              var self = this,
                  stack = [0],
                  vstack = [null],
                  lstack = [],
                  table = this.table,
                  yytext = "",
                  yylineno = 0,
                  yyleng = 0,
                  recovering = 0,
                  TERROR = 2,
                  EOF = 1;
              this.lexer.setInput(input);
              this.lexer.yy = this.yy;
              this.yy.lexer = this.lexer;
              this.yy.parser = this;
              if (typeof this.lexer.yylloc == "undefined")
                this.lexer.yylloc = {};
              var yyloc = this.lexer.yylloc;
              lstack.push(yyloc);
              var ranges = this.lexer.options && this.lexer.options.ranges;
              if (typeof this.yy.parseError === "function")
                this.parseError = this.yy.parseError;
              function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
              }
              function lex() {
                var token;
                token = self.lexer.lex() || 1;
                if (typeof token !== "number") {
                  token = self.symbols_[token] || token;
                }
                return token;
              }
              var symbol,
                  preErrorSymbol,
                  state,
                  action,
                  a,
                  r,
                  yyval = {},
                  p,
                  len,
                  newState,
                  expected;
              while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                  action = this.defaultActions[state];
                } else {
                  if (symbol === null || typeof symbol == "undefined") {
                    symbol = lex();
                  }
                  action = table[state] && table[state][symbol];
                }
                if (typeof action === "undefined" || !action.length || !action[0]) {
                  var errStr = "";
                  if (!recovering) {
                    expected = [];
                    for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                      }
                    if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                    } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                    }
                    this.parseError(errStr, {
                      text: this.lexer.match,
                      token: this.terminals_[symbol] || symbol,
                      line: this.lexer.yylineno,
                      loc: yyloc,
                      expected: expected
                    });
                  }
                }
                if (action[0] instanceof Array && action.length > 1) {
                  throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                }
                switch (action[0]) {
                  case 1:
                    stack.push(symbol);
                    vstack.push(this.lexer.yytext);
                    lstack.push(this.lexer.yylloc);
                    stack.push(action[1]);
                    symbol = null;
                    if (!preErrorSymbol) {
                      yyleng = this.lexer.yyleng;
                      yytext = this.lexer.yytext;
                      yylineno = this.lexer.yylineno;
                      yyloc = this.lexer.yylloc;
                      if (recovering > 0)
                        recovering--;
                    } else {
                      symbol = preErrorSymbol;
                      preErrorSymbol = null;
                    }
                    break;
                  case 2:
                    len = this.productions_[action[1]][1];
                    yyval.$ = vstack[vstack.length - len];
                    yyval._$ = {
                      first_line: lstack[lstack.length - (len || 1)].first_line,
                      last_line: lstack[lstack.length - 1].last_line,
                      first_column: lstack[lstack.length - (len || 1)].first_column,
                      last_column: lstack[lstack.length - 1].last_column
                    };
                    if (ranges) {
                      yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                    }
                    r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                    if (typeof r !== "undefined") {
                      return r;
                    }
                    if (len) {
                      stack = stack.slice(0, -1 * len * 2);
                      vstack = vstack.slice(0, -1 * len);
                      lstack = lstack.slice(0, -1 * len);
                    }
                    stack.push(this.productions_[action[1]][0]);
                    vstack.push(yyval.$);
                    lstack.push(yyval._$);
                    newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                    stack.push(newState);
                    break;
                  case 3:
                    return true;
                }
              }
              return true;
            }
          };
          var lexer = (function() {
            var lexer = {
              EOF: 1,
              parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                  this.yy.parser.parseError(str, hash);
                } else {
                  throw new Error(str);
                }
              },
              setInput: function setInput(input) {
                this._input = input;
                this._more = this._less = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                  first_line: 1,
                  first_column: 0,
                  last_line: 1,
                  last_column: 0
                };
                if (this.options.ranges)
                  this.yylloc.range = [0, 0];
                this.offset = 0;
                return this;
              },
              input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                  this.yylineno++;
                  this.yylloc.last_line++;
                } else {
                  this.yylloc.last_column++;
                }
                if (this.options.ranges)
                  this.yylloc.range[1]++;
                this._input = this._input.slice(1);
                return ch;
              },
              unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1)
                  this.yylineno -= lines.length - 1;
                var r = this.yylloc.range;
                this.yylloc = {
                  first_line: this.yylloc.first_line,
                  last_line: this.yylineno + 1,
                  first_column: this.yylloc.first_column,
                  last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                  this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                return this;
              },
              more: function more() {
                this._more = true;
                return this;
              },
              less: function less(n) {
                this.unput(this.match.slice(n));
              },
              pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
              },
              upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                  next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
              },
              showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
              },
              next: function next() {
                if (this.done) {
                  return this.EOF;
                }
                if (!this._input)
                  this.done = true;
                var token,
                    match,
                    tempMatch,
                    index,
                    col,
                    lines;
                if (!this._more) {
                  this.yytext = '';
                  this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                  tempMatch = this._input.match(this.rules[rules[i]]);
                  if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    match = tempMatch;
                    index = i;
                    if (!this.options.flex)
                      break;
                  }
                }
                if (match) {
                  lines = match[0].match(/(?:\r\n?|\n).*/g);
                  if (lines)
                    this.yylineno += lines.length;
                  this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                  };
                  this.yytext += match[0];
                  this.match += match[0];
                  this.matches = match;
                  this.yyleng = this.yytext.length;
                  if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                  }
                  this._more = false;
                  this._input = this._input.slice(match[0].length);
                  this.matched += match[0];
                  token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                  if (this.done && this._input)
                    this.done = false;
                  if (token)
                    return token;
                  else
                    return;
                }
                if (this._input === "") {
                  return this.EOF;
                } else {
                  return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                  });
                }
              },
              lex: function lex() {
                var r = this.next();
                if (typeof r !== 'undefined') {
                  return r;
                } else {
                  return this.lex();
                }
              },
              begin: function begin(condition) {
                this.conditionStack.push(condition);
              },
              popState: function popState() {
                return this.conditionStack.pop();
              },
              _currentRules: function _currentRules() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
              },
              topState: function topState() {
                return this.conditionStack[this.conditionStack.length - 2];
              },
              pushState: function begin(condition) {
                this.begin(condition);
              }
            };
            lexer.options = {};
            lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
              function strip(start, end) {
                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
              }
              var YYSTATE = YY_START;
              switch ($avoiding_name_collisions) {
                case 0:
                  if (yy_.yytext.slice(-2) === "\\\\") {
                    strip(0, 1);
                    this.begin("mu");
                  } else if (yy_.yytext.slice(-1) === "\\") {
                    strip(0, 1);
                    this.begin("emu");
                  } else {
                    this.begin("mu");
                  }
                  if (yy_.yytext)
                    return 15;
                  break;
                case 1:
                  return 15;
                  break;
                case 2:
                  this.popState();
                  return 15;
                  break;
                case 3:
                  this.begin('raw');
                  return 15;
                  break;
                case 4:
                  this.popState();
                  if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                    return 15;
                  } else {
                    yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
                    return 'END_RAW_BLOCK';
                  }
                  break;
                case 5:
                  return 15;
                  break;
                case 6:
                  this.popState();
                  return 14;
                  break;
                case 7:
                  return 65;
                  break;
                case 8:
                  return 68;
                  break;
                case 9:
                  return 19;
                  break;
                case 10:
                  this.popState();
                  this.begin('raw');
                  return 23;
                  break;
                case 11:
                  return 55;
                  break;
                case 12:
                  return 60;
                  break;
                case 13:
                  return 29;
                  break;
                case 14:
                  return 47;
                  break;
                case 15:
                  this.popState();
                  return 44;
                  break;
                case 16:
                  this.popState();
                  return 44;
                  break;
                case 17:
                  return 34;
                  break;
                case 18:
                  return 39;
                  break;
                case 19:
                  return 51;
                  break;
                case 20:
                  return 48;
                  break;
                case 21:
                  this.unput(yy_.yytext);
                  this.popState();
                  this.begin('com');
                  break;
                case 22:
                  this.popState();
                  return 14;
                  break;
                case 23:
                  return 48;
                  break;
                case 24:
                  return 73;
                  break;
                case 25:
                  return 72;
                  break;
                case 26:
                  return 72;
                  break;
                case 27:
                  return 87;
                  break;
                case 28:
                  break;
                case 29:
                  this.popState();
                  return 54;
                  break;
                case 30:
                  this.popState();
                  return 33;
                  break;
                case 31:
                  yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                  return 80;
                  break;
                case 32:
                  yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                  return 80;
                  break;
                case 33:
                  return 85;
                  break;
                case 34:
                  return 82;
                  break;
                case 35:
                  return 82;
                  break;
                case 36:
                  return 83;
                  break;
                case 37:
                  return 84;
                  break;
                case 38:
                  return 81;
                  break;
                case 39:
                  return 75;
                  break;
                case 40:
                  return 77;
                  break;
                case 41:
                  return 72;
                  break;
                case 42:
                  yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');
                  return 72;
                  break;
                case 43:
                  return 'INVALID';
                  break;
                case 44:
                  return 5;
                  break;
              }
            };
            lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
            lexer.conditions = {
              "mu": {
                "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                "inclusive": false
              },
              "emu": {
                "rules": [2],
                "inclusive": false
              },
              "com": {
                "rules": [6],
                "inclusive": false
              },
              "raw": {
                "rules": [3, 4, 5],
                "inclusive": false
              },
              "INITIAL": {
                "rules": [0, 1, 44],
                "inclusive": true
              }
            };
            return lexer;
          })();
          parser.lexer = lexer;
          function Parser() {
            this.yy = {};
          }
          Parser.prototype = parser;
          parser.Parser = Parser;
          return new Parser();
        })();
        exports.__esModule = true;
        exports['default'] = handlebars;
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _visitor = __webpack_require__(25);
        var _visitor2 = _interopRequireDefault(_visitor);
        function WhitespaceControl() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          this.options = options;
        }
        WhitespaceControl.prototype = new _visitor2['default']();
        WhitespaceControl.prototype.Program = function(program) {
          var doStandalone = !this.options.ignoreStandalone;
          var isRoot = !this.isRootSeen;
          this.isRootSeen = true;
          var body = program.body;
          for (var i = 0,
              l = body.length; i < l; i++) {
            var current = body[i],
                strip = this.accept(current);
            if (!strip) {
              continue;
            }
            var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
                _isNextWhitespace = isNextWhitespace(body, i, isRoot),
                openStandalone = strip.openStandalone && _isPrevWhitespace,
                closeStandalone = strip.closeStandalone && _isNextWhitespace,
                inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
            if (strip.close) {
              omitRight(body, i, true);
            }
            if (strip.open) {
              omitLeft(body, i, true);
            }
            if (doStandalone && inlineStandalone) {
              omitRight(body, i);
              if (omitLeft(body, i)) {
                if (current.type === 'PartialStatement') {
                  current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
                }
              }
            }
            if (doStandalone && openStandalone) {
              omitRight((current.program || current.inverse).body);
              omitLeft(body, i);
            }
            if (doStandalone && closeStandalone) {
              omitRight(body, i);
              omitLeft((current.inverse || current.program).body);
            }
          }
          return program;
        };
        WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
          this.accept(block.program);
          this.accept(block.inverse);
          var program = block.program || block.inverse,
              inverse = block.program && block.inverse,
              firstInverse = inverse,
              lastInverse = inverse;
          if (inverse && inverse.chained) {
            firstInverse = inverse.body[0].program;
            while (lastInverse.chained) {
              lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
            }
          }
          var strip = {
            open: block.openStrip.open,
            close: block.closeStrip.close,
            openStandalone: isNextWhitespace(program.body),
            closeStandalone: isPrevWhitespace((firstInverse || program).body)
          };
          if (block.openStrip.close) {
            omitRight(program.body, null, true);
          }
          if (inverse) {
            var inverseStrip = block.inverseStrip;
            if (inverseStrip.open) {
              omitLeft(program.body, null, true);
            }
            if (inverseStrip.close) {
              omitRight(firstInverse.body, null, true);
            }
            if (block.closeStrip.open) {
              omitLeft(lastInverse.body, null, true);
            }
            if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
              omitLeft(program.body);
              omitRight(firstInverse.body);
            }
          } else if (block.closeStrip.open) {
            omitLeft(program.body, null, true);
          }
          return strip;
        };
        WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
          return mustache.strip;
        };
        WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
          var strip = node.strip || {};
          return {
            inlineStandalone: true,
            open: strip.open,
            close: strip.close
          };
        };
        function isPrevWhitespace(body, i, isRoot) {
          if (i === undefined) {
            i = body.length;
          }
          var prev = body[i - 1],
              sibling = body[i - 2];
          if (!prev) {
            return isRoot;
          }
          if (prev.type === 'ContentStatement') {
            return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
          }
        }
        function isNextWhitespace(body, i, isRoot) {
          if (i === undefined) {
            i = -1;
          }
          var next = body[i + 1],
              sibling = body[i + 2];
          if (!next) {
            return isRoot;
          }
          if (next.type === 'ContentStatement') {
            return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
          }
        }
        function omitRight(body, i, multiple) {
          var current = body[i == null ? 0 : i + 1];
          if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
            return;
          }
          var original = current.value;
          current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
          current.rightStripped = current.value !== original;
        }
        function omitLeft(body, i, multiple) {
          var current = body[i == null ? body.length - 1 : i - 1];
          if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
            return;
          }
          var original = current.value;
          current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
          current.leftStripped = current.value !== original;
          return current.leftStripped;
        }
        exports['default'] = WhitespaceControl;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        function Visitor() {
          this.parents = [];
        }
        Visitor.prototype = {
          constructor: Visitor,
          mutating: false,
          acceptKey: function acceptKey(node, name) {
            var value = this.accept(node[name]);
            if (this.mutating) {
              if (value && !Visitor.prototype[value.type]) {
                throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
              }
              node[name] = value;
            }
          },
          acceptRequired: function acceptRequired(node, name) {
            this.acceptKey(node, name);
            if (!node[name]) {
              throw new _exception2['default'](node.type + ' requires ' + name);
            }
          },
          acceptArray: function acceptArray(array) {
            for (var i = 0,
                l = array.length; i < l; i++) {
              this.acceptKey(array, i);
              if (!array[i]) {
                array.splice(i, 1);
                i--;
                l--;
              }
            }
          },
          accept: function accept(object) {
            if (!object) {
              return;
            }
            if (!this[object.type]) {
              throw new _exception2['default']('Unknown type: ' + object.type, object);
            }
            if (this.current) {
              this.parents.unshift(this.current);
            }
            this.current = object;
            var ret = this[object.type](object);
            this.current = this.parents.shift();
            if (!this.mutating || ret) {
              return ret;
            } else if (ret !== false) {
              return object;
            }
          },
          Program: function Program(program) {
            this.acceptArray(program.body);
          },
          MustacheStatement: visitSubExpression,
          Decorator: visitSubExpression,
          BlockStatement: visitBlock,
          DecoratorBlock: visitBlock,
          PartialStatement: visitPartial,
          PartialBlockStatement: function PartialBlockStatement(partial) {
            visitPartial.call(this, partial);
            this.acceptKey(partial, 'program');
          },
          ContentStatement: function ContentStatement() {},
          CommentStatement: function CommentStatement() {},
          SubExpression: visitSubExpression,
          PathExpression: function PathExpression() {},
          StringLiteral: function StringLiteral() {},
          NumberLiteral: function NumberLiteral() {},
          BooleanLiteral: function BooleanLiteral() {},
          UndefinedLiteral: function UndefinedLiteral() {},
          NullLiteral: function NullLiteral() {},
          Hash: function Hash(hash) {
            this.acceptArray(hash.pairs);
          },
          HashPair: function HashPair(pair) {
            this.acceptRequired(pair, 'value');
          }
        };
        function visitSubExpression(mustache) {
          this.acceptRequired(mustache, 'path');
          this.acceptArray(mustache.params);
          this.acceptKey(mustache, 'hash');
        }
        function visitBlock(block) {
          visitSubExpression.call(this, block);
          this.acceptKey(block, 'program');
          this.acceptKey(block, 'inverse');
        }
        function visitPartial(partial) {
          this.acceptRequired(partial, 'name');
          this.acceptArray(partial.params);
          this.acceptKey(partial, 'hash');
        }
        exports['default'] = Visitor;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.SourceLocation = SourceLocation;
        exports.id = id;
        exports.stripFlags = stripFlags;
        exports.stripComment = stripComment;
        exports.preparePath = preparePath;
        exports.prepareMustache = prepareMustache;
        exports.prepareRawBlock = prepareRawBlock;
        exports.prepareBlock = prepareBlock;
        exports.prepareProgram = prepareProgram;
        exports.preparePartialBlock = preparePartialBlock;
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        function validateClose(open, close) {
          close = close.path ? close.path.original : close;
          if (open.path.original !== close) {
            var errorNode = {loc: open.path.loc};
            throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
          }
        }
        function SourceLocation(source, locInfo) {
          this.source = source;
          this.start = {
            line: locInfo.first_line,
            column: locInfo.first_column
          };
          this.end = {
            line: locInfo.last_line,
            column: locInfo.last_column
          };
        }
        function id(token) {
          if (/^\[.*\]$/.test(token)) {
            return token.substr(1, token.length - 2);
          } else {
            return token;
          }
        }
        function stripFlags(open, close) {
          return {
            open: open.charAt(2) === '~',
            close: close.charAt(close.length - 3) === '~'
          };
        }
        function stripComment(comment) {
          return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
        }
        function preparePath(data, parts, loc) {
          loc = this.locInfo(loc);
          var original = data ? '@' : '',
              dig = [],
              depth = 0,
              depthString = '';
          for (var i = 0,
              l = parts.length; i < l; i++) {
            var part = parts[i].part,
                isLiteral = parts[i].original !== part;
            original += (parts[i].separator || '') + part;
            if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
              if (dig.length > 0) {
                throw new _exception2['default']('Invalid path: ' + original, {loc: loc});
              } else if (part === '..') {
                depth++;
                depthString += '../';
              }
            } else {
              dig.push(part);
            }
          }
          return {
            type: 'PathExpression',
            data: data,
            depth: depth,
            parts: dig,
            original: original,
            loc: loc
          };
        }
        function prepareMustache(path, params, hash, open, strip, locInfo) {
          var escapeFlag = open.charAt(3) || open.charAt(2),
              escaped = escapeFlag !== '{' && escapeFlag !== '&';
          var decorator = /\*/.test(open);
          return {
            type: decorator ? 'Decorator' : 'MustacheStatement',
            path: path,
            params: params,
            hash: hash,
            escaped: escaped,
            strip: strip,
            loc: this.locInfo(locInfo)
          };
        }
        function prepareRawBlock(openRawBlock, contents, close, locInfo) {
          validateClose(openRawBlock, close);
          locInfo = this.locInfo(locInfo);
          var program = {
            type: 'Program',
            body: contents,
            strip: {},
            loc: locInfo
          };
          return {
            type: 'BlockStatement',
            path: openRawBlock.path,
            params: openRawBlock.params,
            hash: openRawBlock.hash,
            program: program,
            openStrip: {},
            inverseStrip: {},
            closeStrip: {},
            loc: locInfo
          };
        }
        function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
          if (close && close.path) {
            validateClose(openBlock, close);
          }
          var decorator = /\*/.test(openBlock.open);
          program.blockParams = openBlock.blockParams;
          var inverse = undefined,
              inverseStrip = undefined;
          if (inverseAndProgram) {
            if (decorator) {
              throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
            }
            if (inverseAndProgram.chain) {
              inverseAndProgram.program.body[0].closeStrip = close.strip;
            }
            inverseStrip = inverseAndProgram.strip;
            inverse = inverseAndProgram.program;
          }
          if (inverted) {
            inverted = inverse;
            inverse = program;
            program = inverted;
          }
          return {
            type: decorator ? 'DecoratorBlock' : 'BlockStatement',
            path: openBlock.path,
            params: openBlock.params,
            hash: openBlock.hash,
            program: program,
            inverse: inverse,
            openStrip: openBlock.strip,
            inverseStrip: inverseStrip,
            closeStrip: close && close.strip,
            loc: this.locInfo(locInfo)
          };
        }
        function prepareProgram(statements, loc) {
          if (!loc && statements.length) {
            var firstLoc = statements[0].loc,
                lastLoc = statements[statements.length - 1].loc;
            if (firstLoc && lastLoc) {
              loc = {
                source: firstLoc.source,
                start: {
                  line: firstLoc.start.line,
                  column: firstLoc.start.column
                },
                end: {
                  line: lastLoc.end.line,
                  column: lastLoc.end.column
                }
              };
            }
          }
          return {
            type: 'Program',
            body: statements,
            strip: {},
            loc: loc
          };
        }
        function preparePartialBlock(open, program, close, locInfo) {
          validateClose(open, close);
          return {
            type: 'PartialBlockStatement',
            name: open.path,
            params: open.params,
            hash: open.hash,
            program: program,
            openStrip: open.strip,
            closeStrip: close && close.strip,
            loc: this.locInfo(locInfo)
          };
        }
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        exports.Compiler = Compiler;
        exports.precompile = precompile;
        exports.compile = compile;
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        var _utils = __webpack_require__(5);
        var _ast = __webpack_require__(21);
        var _ast2 = _interopRequireDefault(_ast);
        var slice = [].slice;
        function Compiler() {}
        Compiler.prototype = {
          compiler: Compiler,
          equals: function equals(other) {
            var len = this.opcodes.length;
            if (other.opcodes.length !== len) {
              return false;
            }
            for (var i = 0; i < len; i++) {
              var opcode = this.opcodes[i],
                  otherOpcode = other.opcodes[i];
              if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
                return false;
              }
            }
            len = this.children.length;
            for (var i = 0; i < len; i++) {
              if (!this.children[i].equals(other.children[i])) {
                return false;
              }
            }
            return true;
          },
          guid: 0,
          compile: function compile(program, options) {
            this.sourceNode = [];
            this.opcodes = [];
            this.children = [];
            this.options = options;
            this.stringParams = options.stringParams;
            this.trackIds = options.trackIds;
            options.blockParams = options.blockParams || [];
            var knownHelpers = options.knownHelpers;
            options.knownHelpers = {
              'helperMissing': true,
              'blockHelperMissing': true,
              'each': true,
              'if': true,
              'unless': true,
              'with': true,
              'log': true,
              'lookup': true
            };
            if (knownHelpers) {
              for (var _name in knownHelpers) {
                if (_name in knownHelpers) {
                  options.knownHelpers[_name] = knownHelpers[_name];
                }
              }
            }
            return this.accept(program);
          },
          compileProgram: function compileProgram(program) {
            var childCompiler = new this.compiler(),
                result = childCompiler.compile(program, this.options),
                guid = this.guid++;
            this.usePartial = this.usePartial || result.usePartial;
            this.children[guid] = result;
            this.useDepths = this.useDepths || result.useDepths;
            return guid;
          },
          accept: function accept(node) {
            if (!this[node.type]) {
              throw new _exception2['default']('Unknown type: ' + node.type, node);
            }
            this.sourceNode.unshift(node);
            var ret = this[node.type](node);
            this.sourceNode.shift();
            return ret;
          },
          Program: function Program(program) {
            this.options.blockParams.unshift(program.blockParams);
            var body = program.body,
                bodyLength = body.length;
            for (var i = 0; i < bodyLength; i++) {
              this.accept(body[i]);
            }
            this.options.blockParams.shift();
            this.isSimple = bodyLength === 1;
            this.blockParams = program.blockParams ? program.blockParams.length : 0;
            return this;
          },
          BlockStatement: function BlockStatement(block) {
            transformLiteralToPath(block);
            var program = block.program,
                inverse = block.inverse;
            program = program && this.compileProgram(program);
            inverse = inverse && this.compileProgram(inverse);
            var type = this.classifySexpr(block);
            if (type === 'helper') {
              this.helperSexpr(block, program, inverse);
            } else if (type === 'simple') {
              this.simpleSexpr(block);
              this.opcode('pushProgram', program);
              this.opcode('pushProgram', inverse);
              this.opcode('emptyHash');
              this.opcode('blockValue', block.path.original);
            } else {
              this.ambiguousSexpr(block, program, inverse);
              this.opcode('pushProgram', program);
              this.opcode('pushProgram', inverse);
              this.opcode('emptyHash');
              this.opcode('ambiguousBlockValue');
            }
            this.opcode('append');
          },
          DecoratorBlock: function DecoratorBlock(decorator) {
            var program = decorator.program && this.compileProgram(decorator.program);
            var params = this.setupFullMustacheParams(decorator, program, undefined),
                path = decorator.path;
            this.useDecorators = true;
            this.opcode('registerDecorator', params.length, path.original);
          },
          PartialStatement: function PartialStatement(partial) {
            this.usePartial = true;
            var program = partial.program;
            if (program) {
              program = this.compileProgram(partial.program);
            }
            var params = partial.params;
            if (params.length > 1) {
              throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
            } else if (!params.length) {
              if (this.options.explicitPartialContext) {
                this.opcode('pushLiteral', 'undefined');
              } else {
                params.push({
                  type: 'PathExpression',
                  parts: [],
                  depth: 0
                });
              }
            }
            var partialName = partial.name.original,
                isDynamic = partial.name.type === 'SubExpression';
            if (isDynamic) {
              this.accept(partial.name);
            }
            this.setupFullMustacheParams(partial, program, undefined, true);
            var indent = partial.indent || '';
            if (this.options.preventIndent && indent) {
              this.opcode('appendContent', indent);
              indent = '';
            }
            this.opcode('invokePartial', isDynamic, partialName, indent);
            this.opcode('append');
          },
          PartialBlockStatement: function PartialBlockStatement(partialBlock) {
            this.PartialStatement(partialBlock);
          },
          MustacheStatement: function MustacheStatement(mustache) {
            this.SubExpression(mustache);
            if (mustache.escaped && !this.options.noEscape) {
              this.opcode('appendEscaped');
            } else {
              this.opcode('append');
            }
          },
          Decorator: function Decorator(decorator) {
            this.DecoratorBlock(decorator);
          },
          ContentStatement: function ContentStatement(content) {
            if (content.value) {
              this.opcode('appendContent', content.value);
            }
          },
          CommentStatement: function CommentStatement() {},
          SubExpression: function SubExpression(sexpr) {
            transformLiteralToPath(sexpr);
            var type = this.classifySexpr(sexpr);
            if (type === 'simple') {
              this.simpleSexpr(sexpr);
            } else if (type === 'helper') {
              this.helperSexpr(sexpr);
            } else {
              this.ambiguousSexpr(sexpr);
            }
          },
          ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
            var path = sexpr.path,
                name = path.parts[0],
                isBlock = program != null || inverse != null;
            this.opcode('getContext', path.depth);
            this.opcode('pushProgram', program);
            this.opcode('pushProgram', inverse);
            path.strict = true;
            this.accept(path);
            this.opcode('invokeAmbiguous', name, isBlock);
          },
          simpleSexpr: function simpleSexpr(sexpr) {
            var path = sexpr.path;
            path.strict = true;
            this.accept(path);
            this.opcode('resolvePossibleLambda');
          },
          helperSexpr: function helperSexpr(sexpr, program, inverse) {
            var params = this.setupFullMustacheParams(sexpr, program, inverse),
                path = sexpr.path,
                name = path.parts[0];
            if (this.options.knownHelpers[name]) {
              this.opcode('invokeKnownHelper', params.length, name);
            } else if (this.options.knownHelpersOnly) {
              throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
            } else {
              path.strict = true;
              path.falsy = true;
              this.accept(path);
              this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
            }
          },
          PathExpression: function PathExpression(path) {
            this.addDepth(path.depth);
            this.opcode('getContext', path.depth);
            var name = path.parts[0],
                scoped = _ast2['default'].helpers.scopedId(path),
                blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
            if (blockParamId) {
              this.opcode('lookupBlockParam', blockParamId, path.parts);
            } else if (!name) {
              this.opcode('pushContext');
            } else if (path.data) {
              this.options.data = true;
              this.opcode('lookupData', path.depth, path.parts, path.strict);
            } else {
              this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
            }
          },
          StringLiteral: function StringLiteral(string) {
            this.opcode('pushString', string.value);
          },
          NumberLiteral: function NumberLiteral(number) {
            this.opcode('pushLiteral', number.value);
          },
          BooleanLiteral: function BooleanLiteral(bool) {
            this.opcode('pushLiteral', bool.value);
          },
          UndefinedLiteral: function UndefinedLiteral() {
            this.opcode('pushLiteral', 'undefined');
          },
          NullLiteral: function NullLiteral() {
            this.opcode('pushLiteral', 'null');
          },
          Hash: function Hash(hash) {
            var pairs = hash.pairs,
                i = 0,
                l = pairs.length;
            this.opcode('pushHash');
            for (; i < l; i++) {
              this.pushParam(pairs[i].value);
            }
            while (i--) {
              this.opcode('assignToHash', pairs[i].key);
            }
            this.opcode('popHash');
          },
          opcode: function opcode(name) {
            this.opcodes.push({
              opcode: name,
              args: slice.call(arguments, 1),
              loc: this.sourceNode[0].loc
            });
          },
          addDepth: function addDepth(depth) {
            if (!depth) {
              return;
            }
            this.useDepths = true;
          },
          classifySexpr: function classifySexpr(sexpr) {
            var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);
            var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
            var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);
            var isEligible = !isBlockParam && (isHelper || isSimple);
            if (isEligible && !isHelper) {
              var _name2 = sexpr.path.parts[0],
                  options = this.options;
              if (options.knownHelpers[_name2]) {
                isHelper = true;
              } else if (options.knownHelpersOnly) {
                isEligible = false;
              }
            }
            if (isHelper) {
              return 'helper';
            } else if (isEligible) {
              return 'ambiguous';
            } else {
              return 'simple';
            }
          },
          pushParams: function pushParams(params) {
            for (var i = 0,
                l = params.length; i < l; i++) {
              this.pushParam(params[i]);
            }
          },
          pushParam: function pushParam(val) {
            var value = val.value != null ? val.value : val.original || '';
            if (this.stringParams) {
              if (value.replace) {
                value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
              }
              if (val.depth) {
                this.addDepth(val.depth);
              }
              this.opcode('getContext', val.depth || 0);
              this.opcode('pushStringParam', value, val.type);
              if (val.type === 'SubExpression') {
                this.accept(val);
              }
            } else {
              if (this.trackIds) {
                var blockParamIndex = undefined;
                if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
                  blockParamIndex = this.blockParamIndex(val.parts[0]);
                }
                if (blockParamIndex) {
                  var blockParamChild = val.parts.slice(1).join('.');
                  this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
                } else {
                  value = val.original || value;
                  if (value.replace) {
                    value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
                  }
                  this.opcode('pushId', val.type, value);
                }
              }
              this.accept(val);
            }
          },
          setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
            var params = sexpr.params;
            this.pushParams(params);
            this.opcode('pushProgram', program);
            this.opcode('pushProgram', inverse);
            if (sexpr.hash) {
              this.accept(sexpr.hash);
            } else {
              this.opcode('emptyHash', omitEmpty);
            }
            return params;
          },
          blockParamIndex: function blockParamIndex(name) {
            for (var depth = 0,
                len = this.options.blockParams.length; depth < len; depth++) {
              var blockParams = this.options.blockParams[depth],
                  param = blockParams && _utils.indexOf(blockParams, name);
              if (blockParams && param >= 0) {
                return [depth, param];
              }
            }
          }
        };
        function precompile(input, options, env) {
          if (input == null || typeof input !== 'string' && input.type !== 'Program') {
            throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
          }
          options = options || {};
          if (!('data' in options)) {
            options.data = true;
          }
          if (options.compat) {
            options.useDepths = true;
          }
          var ast = env.parse(input, options),
              environment = new env.Compiler().compile(ast, options);
          return new env.JavaScriptCompiler().compile(environment, options);
        }
        function compile(input, options, env) {
          if (options === undefined)
            options = {};
          if (input == null || typeof input !== 'string' && input.type !== 'Program') {
            throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
          }
          if (!('data' in options)) {
            options.data = true;
          }
          if (options.compat) {
            options.useDepths = true;
          }
          var compiled = undefined;
          function compileInput() {
            var ast = env.parse(input, options),
                environment = new env.Compiler().compile(ast, options),
                templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
            return env.template(templateSpec);
          }
          function ret(context, execOptions) {
            if (!compiled) {
              compiled = compileInput();
            }
            return compiled.call(this, context, execOptions);
          }
          ret._setup = function(setupOptions) {
            if (!compiled) {
              compiled = compileInput();
            }
            return compiled._setup(setupOptions);
          };
          ret._child = function(i, data, blockParams, depths) {
            if (!compiled) {
              compiled = compileInput();
            }
            return compiled._child(i, data, blockParams, depths);
          };
          return ret;
        }
        function argEquals(a, b) {
          if (a === b) {
            return true;
          }
          if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
            for (var i = 0; i < a.length; i++) {
              if (!argEquals(a[i], b[i])) {
                return false;
              }
            }
            return true;
          }
        }
        function transformLiteralToPath(sexpr) {
          if (!sexpr.path.parts) {
            var literal = sexpr.path;
            sexpr.path = {
              type: 'PathExpression',
              data: false,
              depth: 0,
              parts: [literal.original + ''],
              original: literal.original + '',
              loc: literal.loc
            };
          }
        }
      }, function(module, exports, __webpack_require__) {
        'use strict';
        var _interopRequireDefault = __webpack_require__(1)['default'];
        exports.__esModule = true;
        var _base = __webpack_require__(4);
        var _exception = __webpack_require__(6);
        var _exception2 = _interopRequireDefault(_exception);
        var _utils = __webpack_require__(5);
        var _codeGen = __webpack_require__(29);
        var _codeGen2 = _interopRequireDefault(_codeGen);
        function Literal(value) {
          this.value = value;
        }
        function JavaScriptCompiler() {}
        JavaScriptCompiler.prototype = {
          nameLookup: function nameLookup(parent, name) {
            if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
              return [parent, '.', name];
            } else {
              return [parent, '[', JSON.stringify(name), ']'];
            }
          },
          depthedLookup: function depthedLookup(name) {
            return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
          },
          compilerInfo: function compilerInfo() {
            var revision = _base.COMPILER_REVISION,
                versions = _base.REVISION_CHANGES[revision];
            return [revision, versions];
          },
          appendToBuffer: function appendToBuffer(source, location, explicit) {
            if (!_utils.isArray(source)) {
              source = [source];
            }
            source = this.source.wrap(source, location);
            if (this.environment.isSimple) {
              return ['return ', source, ';'];
            } else if (explicit) {
              return ['buffer += ', source, ';'];
            } else {
              source.appendToBuffer = true;
              return source;
            }
          },
          initializeBuffer: function initializeBuffer() {
            return this.quotedString('');
          },
          compile: function compile(environment, options, context, asObject) {
            this.environment = environment;
            this.options = options;
            this.stringParams = this.options.stringParams;
            this.trackIds = this.options.trackIds;
            this.precompile = !asObject;
            this.name = this.environment.name;
            this.isChild = !!context;
            this.context = context || {
              decorators: [],
              programs: [],
              environments: []
            };
            this.preamble();
            this.stackSlot = 0;
            this.stackVars = [];
            this.aliases = {};
            this.registers = {list: []};
            this.hashes = [];
            this.compileStack = [];
            this.inlineStack = [];
            this.blockParams = [];
            this.compileChildren(environment, options);
            this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
            this.useBlockParams = this.useBlockParams || environment.useBlockParams;
            var opcodes = environment.opcodes,
                opcode = undefined,
                firstLoc = undefined,
                i = undefined,
                l = undefined;
            for (i = 0, l = opcodes.length; i < l; i++) {
              opcode = opcodes[i];
              this.source.currentLocation = opcode.loc;
              firstLoc = firstLoc || opcode.loc;
              this[opcode.opcode].apply(this, opcode.args);
            }
            this.source.currentLocation = firstLoc;
            this.pushSource('');
            if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
              throw new _exception2['default']('Compile completed with content left on stack');
            }
            if (!this.decorators.isEmpty()) {
              this.useDecorators = true;
              this.decorators.prepend('var decorators = container.decorators;\n');
              this.decorators.push('return fn;');
              if (asObject) {
                this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
              } else {
                this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
                this.decorators.push('}\n');
                this.decorators = this.decorators.merge();
              }
            } else {
              this.decorators = undefined;
            }
            var fn = this.createFunctionContext(asObject);
            if (!this.isChild) {
              var ret = {
                compiler: this.compilerInfo(),
                main: fn
              };
              if (this.decorators) {
                ret.main_d = this.decorators;
                ret.useDecorators = true;
              }
              var _context = this.context;
              var programs = _context.programs;
              var decorators = _context.decorators;
              for (i = 0, l = programs.length; i < l; i++) {
                if (programs[i]) {
                  ret[i] = programs[i];
                  if (decorators[i]) {
                    ret[i + '_d'] = decorators[i];
                    ret.useDecorators = true;
                  }
                }
              }
              if (this.environment.usePartial) {
                ret.usePartial = true;
              }
              if (this.options.data) {
                ret.useData = true;
              }
              if (this.useDepths) {
                ret.useDepths = true;
              }
              if (this.useBlockParams) {
                ret.useBlockParams = true;
              }
              if (this.options.compat) {
                ret.compat = true;
              }
              if (!asObject) {
                ret.compiler = JSON.stringify(ret.compiler);
                this.source.currentLocation = {start: {
                    line: 1,
                    column: 0
                  }};
                ret = this.objectLiteral(ret);
                if (options.srcName) {
                  ret = ret.toStringWithSourceMap({file: options.destName});
                  ret.map = ret.map && ret.map.toString();
                } else {
                  ret = ret.toString();
                }
              } else {
                ret.compilerOptions = this.options;
              }
              return ret;
            } else {
              return fn;
            }
          },
          preamble: function preamble() {
            this.lastContext = 0;
            this.source = new _codeGen2['default'](this.options.srcName);
            this.decorators = new _codeGen2['default'](this.options.srcName);
          },
          createFunctionContext: function createFunctionContext(asObject) {
            var varDeclarations = '';
            var locals = this.stackVars.concat(this.registers.list);
            if (locals.length > 0) {
              varDeclarations += ', ' + locals.join(', ');
            }
            var aliasCount = 0;
            for (var alias in this.aliases) {
              var node = this.aliases[alias];
              if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
                varDeclarations += ', alias' + ++aliasCount + '=' + alias;
                node.children[0] = 'alias' + aliasCount;
              }
            }
            var params = ['container', 'depth0', 'helpers', 'partials', 'data'];
            if (this.useBlockParams || this.useDepths) {
              params.push('blockParams');
            }
            if (this.useDepths) {
              params.push('depths');
            }
            var source = this.mergeSource(varDeclarations);
            if (asObject) {
              params.push(source);
              return Function.apply(this, params);
            } else {
              return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
            }
          },
          mergeSource: function mergeSource(varDeclarations) {
            var isSimple = this.environment.isSimple,
                appendOnly = !this.forceBuffer,
                appendFirst = undefined,
                sourceSeen = undefined,
                bufferStart = undefined,
                bufferEnd = undefined;
            this.source.each(function(line) {
              if (line.appendToBuffer) {
                if (bufferStart) {
                  line.prepend('  + ');
                } else {
                  bufferStart = line;
                }
                bufferEnd = line;
              } else {
                if (bufferStart) {
                  if (!sourceSeen) {
                    appendFirst = true;
                  } else {
                    bufferStart.prepend('buffer += ');
                  }
                  bufferEnd.add(';');
                  bufferStart = bufferEnd = undefined;
                }
                sourceSeen = true;
                if (!isSimple) {
                  appendOnly = false;
                }
              }
            });
            if (appendOnly) {
              if (bufferStart) {
                bufferStart.prepend('return ');
                bufferEnd.add(';');
              } else if (!sourceSeen) {
                this.source.push('return "";');
              }
            } else {
              varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());
              if (bufferStart) {
                bufferStart.prepend('return buffer + ');
                bufferEnd.add(';');
              } else {
                this.source.push('return buffer;');
              }
            }
            if (varDeclarations) {
              this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
            }
            return this.source.merge();
          },
          blockValue: function blockValue(name) {
            var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
                params = [this.contextName(0)];
            this.setupHelperArgs(name, 0, params);
            var blockName = this.popStack();
            params.splice(1, 0, blockName);
            this.push(this.source.functionCall(blockHelperMissing, 'call', params));
          },
          ambiguousBlockValue: function ambiguousBlockValue() {
            var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
                params = [this.contextName(0)];
            this.setupHelperArgs('', 0, params, true);
            this.flushInline();
            var current = this.topStack();
            params.splice(1, 0, current);
            this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
          },
          appendContent: function appendContent(content) {
            if (this.pendingContent) {
              content = this.pendingContent + content;
            } else {
              this.pendingLocation = this.source.currentLocation;
            }
            this.pendingContent = content;
          },
          append: function append() {
            if (this.isInline()) {
              this.replaceStack(function(current) {
                return [' != null ? ', current, ' : ""'];
              });
              this.pushSource(this.appendToBuffer(this.popStack()));
            } else {
              var local = this.popStack();
              this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
              if (this.environment.isSimple) {
                this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
              }
            }
          },
          appendEscaped: function appendEscaped() {
            this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
          },
          getContext: function getContext(depth) {
            this.lastContext = depth;
          },
          pushContext: function pushContext() {
            this.pushStackLiteral(this.contextName(this.lastContext));
          },
          lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
            var i = 0;
            if (!scoped && this.options.compat && !this.lastContext) {
              this.push(this.depthedLookup(parts[i++]));
            } else {
              this.pushContext();
            }
            this.resolvePath('context', parts, i, falsy, strict);
          },
          lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
            this.useBlockParams = true;
            this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
            this.resolvePath('context', parts, 1);
          },
          lookupData: function lookupData(depth, parts, strict) {
            if (!depth) {
              this.pushStackLiteral('data');
            } else {
              this.pushStackLiteral('container.data(data, ' + depth + ')');
            }
            this.resolvePath('data', parts, 0, true, strict);
          },
          resolvePath: function resolvePath(type, parts, i, falsy, strict) {
            var _this = this;
            if (this.options.strict || this.options.assumeObjects) {
              this.push(strictLookup(this.options.strict && strict, this, parts, type));
              return;
            }
            var len = parts.length;
            for (; i < len; i++) {
              this.replaceStack(function(current) {
                var lookup = _this.nameLookup(current, parts[i], type);
                if (!falsy) {
                  return [' != null ? ', lookup, ' : ', current];
                } else {
                  return [' && ', lookup];
                }
              });
            }
          },
          resolvePossibleLambda: function resolvePossibleLambda() {
            this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
          },
          pushStringParam: function pushStringParam(string, type) {
            this.pushContext();
            this.pushString(type);
            if (type !== 'SubExpression') {
              if (typeof string === 'string') {
                this.pushString(string);
              } else {
                this.pushStackLiteral(string);
              }
            }
          },
          emptyHash: function emptyHash(omitEmpty) {
            if (this.trackIds) {
              this.push('{}');
            }
            if (this.stringParams) {
              this.push('{}');
              this.push('{}');
            }
            this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
          },
          pushHash: function pushHash() {
            if (this.hash) {
              this.hashes.push(this.hash);
            }
            this.hash = {
              values: [],
              types: [],
              contexts: [],
              ids: []
            };
          },
          popHash: function popHash() {
            var hash = this.hash;
            this.hash = this.hashes.pop();
            if (this.trackIds) {
              this.push(this.objectLiteral(hash.ids));
            }
            if (this.stringParams) {
              this.push(this.objectLiteral(hash.contexts));
              this.push(this.objectLiteral(hash.types));
            }
            this.push(this.objectLiteral(hash.values));
          },
          pushString: function pushString(string) {
            this.pushStackLiteral(this.quotedString(string));
          },
          pushLiteral: function pushLiteral(value) {
            this.pushStackLiteral(value);
          },
          pushProgram: function pushProgram(guid) {
            if (guid != null) {
              this.pushStackLiteral(this.programExpression(guid));
            } else {
              this.pushStackLiteral(null);
            }
          },
          registerDecorator: function registerDecorator(paramSize, name) {
            var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
                options = this.setupHelperArgs(name, paramSize);
            this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
          },
          invokeHelper: function invokeHelper(paramSize, name, isSimple) {
            var nonHelper = this.popStack(),
                helper = this.setupHelper(paramSize, name),
                simple = isSimple ? [helper.name, ' || '] : '';
            var lookup = ['('].concat(simple, nonHelper);
            if (!this.options.strict) {
              lookup.push(' || ', this.aliasable('helpers.helperMissing'));
            }
            lookup.push(')');
            this.push(this.source.functionCall(lookup, 'call', helper.callParams));
          },
          invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
            var helper = this.setupHelper(paramSize, name);
            this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
          },
          invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
            this.useRegister('helper');
            var nonHelper = this.popStack();
            this.emptyHash();
            var helper = this.setupHelper(0, name, helperCall);
            var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
            var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
            if (!this.options.strict) {
              lookup[0] = '(helper = ';
              lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
            }
            this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
          },
          invokePartial: function invokePartial(isDynamic, name, indent) {
            var params = [],
                options = this.setupParams(name, 1, params);
            if (isDynamic) {
              name = this.popStack();
              delete options.name;
            }
            if (indent) {
              options.indent = JSON.stringify(indent);
            }
            options.helpers = 'helpers';
            options.partials = 'partials';
            options.decorators = 'container.decorators';
            if (!isDynamic) {
              params.unshift(this.nameLookup('partials', name, 'partial'));
            } else {
              params.unshift(name);
            }
            if (this.options.compat) {
              options.depths = 'depths';
            }
            options = this.objectLiteral(options);
            params.push(options);
            this.push(this.source.functionCall('container.invokePartial', '', params));
          },
          assignToHash: function assignToHash(key) {
            var value = this.popStack(),
                context = undefined,
                type = undefined,
                id = undefined;
            if (this.trackIds) {
              id = this.popStack();
            }
            if (this.stringParams) {
              type = this.popStack();
              context = this.popStack();
            }
            var hash = this.hash;
            if (context) {
              hash.contexts[key] = context;
            }
            if (type) {
              hash.types[key] = type;
            }
            if (id) {
              hash.ids[key] = id;
            }
            hash.values[key] = value;
          },
          pushId: function pushId(type, name, child) {
            if (type === 'BlockParam') {
              this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
            } else if (type === 'PathExpression') {
              this.pushString(name);
            } else if (type === 'SubExpression') {
              this.pushStackLiteral('true');
            } else {
              this.pushStackLiteral('null');
            }
          },
          compiler: JavaScriptCompiler,
          compileChildren: function compileChildren(environment, options) {
            var children = environment.children,
                child = undefined,
                compiler = undefined;
            for (var i = 0,
                l = children.length; i < l; i++) {
              child = children[i];
              compiler = new this.compiler();
              var index = this.matchExistingProgram(child);
              if (index == null) {
                this.context.programs.push('');
                index = this.context.programs.length;
                child.index = index;
                child.name = 'program' + index;
                this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
                this.context.decorators[index] = compiler.decorators;
                this.context.environments[index] = child;
                this.useDepths = this.useDepths || compiler.useDepths;
                this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
              } else {
                child.index = index;
                child.name = 'program' + index;
                this.useDepths = this.useDepths || child.useDepths;
                this.useBlockParams = this.useBlockParams || child.useBlockParams;
              }
            }
          },
          matchExistingProgram: function matchExistingProgram(child) {
            for (var i = 0,
                len = this.context.environments.length; i < len; i++) {
              var environment = this.context.environments[i];
              if (environment && environment.equals(child)) {
                return i;
              }
            }
          },
          programExpression: function programExpression(guid) {
            var child = this.environment.children[guid],
                programParams = [child.index, 'data', child.blockParams];
            if (this.useBlockParams || this.useDepths) {
              programParams.push('blockParams');
            }
            if (this.useDepths) {
              programParams.push('depths');
            }
            return 'container.program(' + programParams.join(', ') + ')';
          },
          useRegister: function useRegister(name) {
            if (!this.registers[name]) {
              this.registers[name] = true;
              this.registers.list.push(name);
            }
          },
          push: function push(expr) {
            if (!(expr instanceof Literal)) {
              expr = this.source.wrap(expr);
            }
            this.inlineStack.push(expr);
            return expr;
          },
          pushStackLiteral: function pushStackLiteral(item) {
            this.push(new Literal(item));
          },
          pushSource: function pushSource(source) {
            if (this.pendingContent) {
              this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
              this.pendingContent = undefined;
            }
            if (source) {
              this.source.push(source);
            }
          },
          replaceStack: function replaceStack(callback) {
            var prefix = ['('],
                stack = undefined,
                createdStack = undefined,
                usedLiteral = undefined;
            if (!this.isInline()) {
              throw new _exception2['default']('replaceStack on non-inline');
            }
            var top = this.popStack(true);
            if (top instanceof Literal) {
              stack = [top.value];
              prefix = ['(', stack];
              usedLiteral = true;
            } else {
              createdStack = true;
              var _name = this.incrStack();
              prefix = ['((', this.push(_name), ' = ', top, ')'];
              stack = this.topStack();
            }
            var item = callback.call(this, stack);
            if (!usedLiteral) {
              this.popStack();
            }
            if (createdStack) {
              this.stackSlot--;
            }
            this.push(prefix.concat(item, ')'));
          },
          incrStack: function incrStack() {
            this.stackSlot++;
            if (this.stackSlot > this.stackVars.length) {
              this.stackVars.push('stack' + this.stackSlot);
            }
            return this.topStackName();
          },
          topStackName: function topStackName() {
            return 'stack' + this.stackSlot;
          },
          flushInline: function flushInline() {
            var inlineStack = this.inlineStack;
            this.inlineStack = [];
            for (var i = 0,
                len = inlineStack.length; i < len; i++) {
              var entry = inlineStack[i];
              if (entry instanceof Literal) {
                this.compileStack.push(entry);
              } else {
                var stack = this.incrStack();
                this.pushSource([stack, ' = ', entry, ';']);
                this.compileStack.push(stack);
              }
            }
          },
          isInline: function isInline() {
            return this.inlineStack.length;
          },
          popStack: function popStack(wrapped) {
            var inline = this.isInline(),
                item = (inline ? this.inlineStack : this.compileStack).pop();
            if (!wrapped && item instanceof Literal) {
              return item.value;
            } else {
              if (!inline) {
                if (!this.stackSlot) {
                  throw new _exception2['default']('Invalid stack pop');
                }
                this.stackSlot--;
              }
              return item;
            }
          },
          topStack: function topStack() {
            var stack = this.isInline() ? this.inlineStack : this.compileStack,
                item = stack[stack.length - 1];
            if (item instanceof Literal) {
              return item.value;
            } else {
              return item;
            }
          },
          contextName: function contextName(context) {
            if (this.useDepths && context) {
              return 'depths[' + context + ']';
            } else {
              return 'depth' + context;
            }
          },
          quotedString: function quotedString(str) {
            return this.source.quotedString(str);
          },
          objectLiteral: function objectLiteral(obj) {
            return this.source.objectLiteral(obj);
          },
          aliasable: function aliasable(name) {
            var ret = this.aliases[name];
            if (ret) {
              ret.referenceCount++;
              return ret;
            }
            ret = this.aliases[name] = this.source.wrap(name);
            ret.aliasable = true;
            ret.referenceCount = 1;
            return ret;
          },
          setupHelper: function setupHelper(paramSize, name, blockHelper) {
            var params = [],
                paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
            var foundHelper = this.nameLookup('helpers', name, 'helper'),
                callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');
            return {
              params: params,
              paramsInit: paramsInit,
              name: foundHelper,
              callParams: [callContext].concat(params)
            };
          },
          setupParams: function setupParams(helper, paramSize, params) {
            var options = {},
                contexts = [],
                types = [],
                ids = [],
                objectArgs = !params,
                param = undefined;
            if (objectArgs) {
              params = [];
            }
            options.name = this.quotedString(helper);
            options.hash = this.popStack();
            if (this.trackIds) {
              options.hashIds = this.popStack();
            }
            if (this.stringParams) {
              options.hashTypes = this.popStack();
              options.hashContexts = this.popStack();
            }
            var inverse = this.popStack(),
                program = this.popStack();
            if (program || inverse) {
              options.fn = program || 'container.noop';
              options.inverse = inverse || 'container.noop';
            }
            var i = paramSize;
            while (i--) {
              param = this.popStack();
              params[i] = param;
              if (this.trackIds) {
                ids[i] = this.popStack();
              }
              if (this.stringParams) {
                types[i] = this.popStack();
                contexts[i] = this.popStack();
              }
            }
            if (objectArgs) {
              options.args = this.source.generateArray(params);
            }
            if (this.trackIds) {
              options.ids = this.source.generateArray(ids);
            }
            if (this.stringParams) {
              options.types = this.source.generateArray(types);
              options.contexts = this.source.generateArray(contexts);
            }
            if (this.options.data) {
              options.data = 'data';
            }
            if (this.useBlockParams) {
              options.blockParams = 'blockParams';
            }
            return options;
          },
          setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
            var options = this.setupParams(helper, paramSize, params);
            options = this.objectLiteral(options);
            if (useRegister) {
              this.useRegister('options');
              params.push('options');
              return ['options=', options];
            } else if (params) {
              params.push(options);
              return '';
            } else {
              return options;
            }
          }
        };
        (function() {
          var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');
          var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
          for (var i = 0,
              l = reservedWords.length; i < l; i++) {
            compilerWords[reservedWords[i]] = true;
          }
        })();
        JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
          return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
        };
        function strictLookup(requireTerminal, compiler, parts, type) {
          var stack = compiler.popStack(),
              i = 0,
              len = parts.length;
          if (requireTerminal) {
            len--;
          }
          for (; i < len; i++) {
            stack = compiler.nameLookup(stack, parts[i], type);
          }
          if (requireTerminal) {
            return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
          } else {
            return stack;
          }
        }
        exports['default'] = JavaScriptCompiler;
        module.exports = exports['default'];
      }, function(module, exports, __webpack_require__) {
        'use strict';
        exports.__esModule = true;
        var _utils = __webpack_require__(5);
        var SourceNode = undefined;
        try {
          if (false) {
            var SourceMap = require('source-map');
            SourceNode = SourceMap.SourceNode;
          }
        } catch (err) {}
        if (!SourceNode) {
          SourceNode = function(line, column, srcFile, chunks) {
            this.src = '';
            if (chunks) {
              this.add(chunks);
            }
          };
          SourceNode.prototype = {
            add: function add(chunks) {
              if (_utils.isArray(chunks)) {
                chunks = chunks.join('');
              }
              this.src += chunks;
            },
            prepend: function prepend(chunks) {
              if (_utils.isArray(chunks)) {
                chunks = chunks.join('');
              }
              this.src = chunks + this.src;
            },
            toStringWithSourceMap: function toStringWithSourceMap() {
              return {code: this.toString()};
            },
            toString: function toString() {
              return this.src;
            }
          };
        }
        function castChunk(chunk, codeGen, loc) {
          if (_utils.isArray(chunk)) {
            var ret = [];
            for (var i = 0,
                len = chunk.length; i < len; i++) {
              ret.push(codeGen.wrap(chunk[i], loc));
            }
            return ret;
          } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
            return chunk + '';
          }
          return chunk;
        }
        function CodeGen(srcFile) {
          this.srcFile = srcFile;
          this.source = [];
        }
        CodeGen.prototype = {
          isEmpty: function isEmpty() {
            return !this.source.length;
          },
          prepend: function prepend(source, loc) {
            this.source.unshift(this.wrap(source, loc));
          },
          push: function push(source, loc) {
            this.source.push(this.wrap(source, loc));
          },
          merge: function merge() {
            var source = this.empty();
            this.each(function(line) {
              source.add(['  ', line, '\n']);
            });
            return source;
          },
          each: function each(iter) {
            for (var i = 0,
                len = this.source.length; i < len; i++) {
              iter(this.source[i]);
            }
          },
          empty: function empty() {
            var loc = this.currentLocation || {start: {}};
            return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
          },
          wrap: function wrap(chunk) {
            var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {start: {}} : arguments[1];
            if (chunk instanceof SourceNode) {
              return chunk;
            }
            chunk = castChunk(chunk, this, loc);
            return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
          },
          functionCall: function functionCall(fn, type, params) {
            params = this.generateList(params);
            return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
          },
          quotedString: function quotedString(str) {
            return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + '"';
          },
          objectLiteral: function objectLiteral(obj) {
            var pairs = [];
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                var value = castChunk(obj[key], this);
                if (value !== 'undefined') {
                  pairs.push([this.quotedString(key), ':', value]);
                }
              }
            }
            var ret = this.generateList(pairs);
            ret.prepend('{');
            ret.add('}');
            return ret;
          },
          generateList: function generateList(entries) {
            var ret = this.empty();
            for (var i = 0,
                len = entries.length; i < len; i++) {
              if (i) {
                ret.add(',');
              }
              ret.add(castChunk(entries[i], this));
            }
            return ret;
          },
          generateArray: function generateArray(entries) {
            var ret = this.generateList(entries);
            ret.prepend('[');
            ret.add(']');
            return ret;
          }
        };
        exports['default'] = CodeGen;
        module.exports = exports['default'];
      }]);
    });
    ;
  })();
  return _retrieveGlobal();
});

System.registerDynamic("github:components/handlebars.js@4.0.5.js", ["github:components/handlebars.js@4.0.5/handlebars.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:components/handlebars.js@4.0.5/handlebars.js');
  global.define = __define;
  return module.exports;
});

System.register('components/map/UIs/default/layout/templates.js', ['github:components/handlebars.js@4.0.5.js'], function (_export) {
  'use strict';

  var templates;
  return {
    setters: [function (_githubComponentsHandlebarsJs405Js) {}],
    execute: function () {
      templates = {
        multiSelection: Handlebars.compile('\n    <span style=\'font-size:200%;display:block;margin-bottom:20px;\'>\n      {{title}}\n    </span>\n    <ul>\n      {{#each objects}}\n      <li>\n        {{this.data.typeData.name}}\n      </li>\n      {{/each}}\n    </ul>'),
        singleSelection: Handlebars.compile('\n    <span style=\'font-size:200%;display:block;margin-bottom:20px;\'>\n      {{title}}\n    </span>\n    <ul>\n      <li>\n        {{object.name}}\n      </li>\n    </ul>')
      };

      _export('templates', templates);
    }
  };
});
System.register('components/map/UIs/default/layout/index.js', ['components/map/UIs/default/layout/CSSRules.js', 'components/map/UIs/default/layout/templates.js'], function (_export) {
  'use strict';

  /*
   * This should bundle layout files
   */

  return {
    setters: [function (_componentsMapUIsDefaultLayoutCSSRulesJs) {
      var _exportObj = {};

      for (var _key in _componentsMapUIsDefaultLayoutCSSRulesJs) {
        if (_key !== 'default') _exportObj[_key] = _componentsMapUIsDefaultLayoutCSSRulesJs[_key];
      }

      _export(_exportObj);
    }, function (_componentsMapUIsDefaultLayoutTemplatesJs) {
      var _exportObj2 = {};

      for (var _key2 in _componentsMapUIsDefaultLayoutTemplatesJs) {
        if (_key2 !== 'default') _exportObj2[_key2] = _componentsMapUIsDefaultLayoutTemplatesJs[_key2];
      }

      _export(_exportObj2);
    }],
    execute: function () {}
  };
});
System.register('components/map/UIs/default/utils/arrows.js', [], function (_export) {
  'use strict';

  var drawShapes;
  return {
    setters: [],
    execute: function () {
      drawShapes = (function () {
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
      })();

      _export('drawShapes', drawShapes);
    }
  };
});
System.registerDynamic("npm:core-js@1.1.4/library/fn/object/define-property.js", ["npm:core-js@1.1.4/library/modules/$.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/define-property.js", ["npm:core-js@1.1.4/library/fn/object/define-property.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/define-property.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/helpers/create-class.js", ["npm:babel-runtime@5.8.24/core-js/object/define-property.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('npm:babel-runtime@5.8.24/core-js/object/define-property.js')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/helpers/class-call-check.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2/browser.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2.js", ["npm:process@0.11.2/browser.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:process@0.11.2/browser.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["npm:process@0.11.2.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.2.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index.js');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:q@1.4.1/q.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    (function(definition) {
      "use strict";
      if (typeof bootstrap === "function") {
        bootstrap("promise", definition);
      } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();
      } else if (typeof define === "function" && define.amd) {
        define(definition);
      } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
          return;
        } else {
          ses.makeQ = definition;
        }
      } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        var global = typeof window !== "undefined" ? window : self;
        var previousQ = global.Q;
        global.Q = definition();
        global.Q.noConflict = function() {
          global.Q = previousQ;
          return this;
        };
      } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
      }
    })(function() {
      "use strict";
      var hasStacks = false;
      try {
        throw new Error();
      } catch (e) {
        hasStacks = !!e.stack;
      }
      var qStartingLine = captureLine();
      var qFileName;
      var noop = function() {};
      var nextTick = (function() {
        var head = {
          task: void 0,
          next: null
        };
        var tail = head;
        var flushing = false;
        var requestTick = void 0;
        var isNodeJS = false;
        var laterQueue = [];
        function flush() {
          var task,
              domain;
          while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;
            if (domain) {
              head.domain = void 0;
              domain.enter();
            }
            runSingle(task, domain);
          }
          while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
          }
          flushing = false;
        }
        function runSingle(task, domain) {
          try {
            task();
          } catch (e) {
            if (isNodeJS) {
              if (domain) {
                domain.exit();
              }
              setTimeout(flush, 0);
              if (domain) {
                domain.enter();
              }
              throw e;
            } else {
              setTimeout(function() {
                throw e;
              }, 0);
            }
          }
          if (domain) {
            domain.exit();
          }
        }
        nextTick = function(task) {
          tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
          };
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
          isNodeJS = true;
          requestTick = function() {
            process.nextTick(flush);
          };
        } else if (typeof setImmediate === "function") {
          if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
          } else {
            requestTick = function() {
              setImmediate(flush);
            };
          }
        } else if (typeof MessageChannel !== "undefined") {
          var channel = new MessageChannel();
          channel.port1.onmessage = function() {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
          };
          var requestPortTick = function() {
            channel.port2.postMessage(0);
          };
          requestTick = function() {
            setTimeout(flush, 0);
            requestPortTick();
          };
        } else {
          requestTick = function() {
            setTimeout(flush, 0);
          };
        }
        nextTick.runAfter = function(task) {
          laterQueue.push(task);
          if (!flushing) {
            flushing = true;
            requestTick();
          }
        };
        return nextTick;
      })();
      var call = Function.call;
      function uncurryThis(f) {
        return function() {
          return call.apply(f, arguments);
        };
      }
      var array_slice = uncurryThis(Array.prototype.slice);
      var array_reduce = uncurryThis(Array.prototype.reduce || function(callback, basis) {
        var index = 0,
            length = this.length;
        if (arguments.length === 1) {
          do {
            if (index in this) {
              basis = this[index++];
              break;
            }
            if (++index >= length) {
              throw new TypeError();
            }
          } while (1);
        }
        for (; index < length; index++) {
          if (index in this) {
            basis = callback(basis, this[index], index);
          }
        }
        return basis;
      });
      var array_indexOf = uncurryThis(Array.prototype.indexOf || function(value) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === value) {
            return i;
          }
        }
        return -1;
      });
      var array_map = uncurryThis(Array.prototype.map || function(callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function(undefined, value, index) {
          collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
      });
      var object_create = Object.create || function(prototype) {
        function Type() {}
        Type.prototype = prototype;
        return new Type();
      };
      var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      var object_keys = Object.keys || function(object) {
        var keys = [];
        for (var key in object) {
          if (object_hasOwnProperty(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      var object_toString = uncurryThis(Object.prototype.toString);
      function isObject(value) {
        return value === Object(value);
      }
      function isStopIteration(exception) {
        return (object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue);
      }
      var QReturnValue;
      if (typeof ReturnValue !== "undefined") {
        QReturnValue = ReturnValue;
      } else {
        QReturnValue = function(value) {
          this.value = value;
        };
      }
      var STACK_JUMP_SEPARATOR = "From previous event:";
      function makeStackTraceLong(error, promise) {
        if (hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
          var stacks = [];
          for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
              stacks.unshift(p.stack);
            }
          }
          stacks.unshift(error.stack);
          var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
          error.stack = filterStackString(concatedStacks);
        }
      }
      function filterStackString(stackString) {
        var lines = stackString.split("\n");
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
          var line = lines[i];
          if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
          }
        }
        return desiredLines.join("\n");
      }
      function isNodeFrame(stackLine) {
        return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
      }
      function getFileNameAndLineNumber(stackLine) {
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
        }
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
          return [attempt2[1], Number(attempt2[2])];
        }
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          return [attempt3[1], Number(attempt3[2])];
        }
      }
      function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
          return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
      }
      function captureLine() {
        if (!hasStacks) {
          return;
        }
        try {
          throw new Error();
        } catch (e) {
          var lines = e.stack.split("\n");
          var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
          var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
          if (!fileNameAndLineNumber) {
            return;
          }
          qFileName = fileNameAndLineNumber[0];
          return fileNameAndLineNumber[1];
        }
      }
      function deprecate(callback, name, alternative) {
        return function() {
          if (typeof console !== "undefined" && typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
          }
          return callback.apply(callback, arguments);
        };
      }
      function Q(value) {
        if (value instanceof Promise) {
          return value;
        }
        if (isPromiseAlike(value)) {
          return coerce(value);
        } else {
          return fulfill(value);
        }
      }
      Q.resolve = Q;
      Q.nextTick = nextTick;
      Q.longStackSupport = false;
      if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
        Q.longStackSupport = true;
      }
      Q.defer = defer;
      function defer() {
        var messages = [],
            progressListeners = [],
            resolvedPromise;
        var deferred = object_create(defer.prototype);
        var promise = object_create(Promise.prototype);
        promise.promiseDispatch = function(resolve, op, operands) {
          var args = array_slice(arguments);
          if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) {
              progressListeners.push(operands[1]);
            }
          } else {
            Q.nextTick(function() {
              resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
          }
        };
        promise.valueOf = function() {
          if (messages) {
            return promise;
          }
          var nearerValue = nearer(resolvedPromise);
          if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue;
          }
          return nearerValue;
        };
        promise.inspect = function() {
          if (!resolvedPromise) {
            return {state: "pending"};
          }
          return resolvedPromise.inspect();
        };
        if (Q.longStackSupport && hasStacks) {
          try {
            throw new Error();
          } catch (e) {
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
          }
        }
        function become(newPromise) {
          resolvedPromise = newPromise;
          promise.source = newPromise;
          array_reduce(messages, function(undefined, message) {
            Q.nextTick(function() {
              newPromise.promiseDispatch.apply(newPromise, message);
            });
          }, void 0);
          messages = void 0;
          progressListeners = void 0;
        }
        deferred.promise = promise;
        deferred.resolve = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(Q(value));
        };
        deferred.fulfill = function(value) {
          if (resolvedPromise) {
            return;
          }
          become(fulfill(value));
        };
        deferred.reject = function(reason) {
          if (resolvedPromise) {
            return;
          }
          become(reject(reason));
        };
        deferred.notify = function(progress) {
          if (resolvedPromise) {
            return;
          }
          array_reduce(progressListeners, function(undefined, progressListener) {
            Q.nextTick(function() {
              progressListener(progress);
            });
          }, void 0);
        };
        return deferred;
      }
      defer.prototype.makeNodeResolver = function() {
        var self = this;
        return function(error, value) {
          if (error) {
            self.reject(error);
          } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
          } else {
            self.resolve(value);
          }
        };
      };
      Q.Promise = promise;
      Q.promise = promise;
      function promise(resolver) {
        if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function.");
        }
        var deferred = defer();
        try {
          resolver(deferred.resolve, deferred.reject, deferred.notify);
        } catch (reason) {
          deferred.reject(reason);
        }
        return deferred.promise;
      }
      promise.race = race;
      promise.all = all;
      promise.reject = reject;
      promise.resolve = Q;
      Q.passByCopy = function(object) {
        return object;
      };
      Promise.prototype.passByCopy = function() {
        return this;
      };
      Q.join = function(x, y) {
        return Q(x).join(y);
      };
      Promise.prototype.join = function(that) {
        return Q([this, that]).spread(function(x, y) {
          if (x === y) {
            return x;
          } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
          }
        });
      };
      Q.race = race;
      function race(answerPs) {
        return promise(function(resolve, reject) {
          for (var i = 0,
              len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
          }
        });
      }
      Promise.prototype.race = function() {
        return this.then(Q.race);
      };
      Q.makePromise = Promise;
      function Promise(descriptor, fallback, inspect) {
        if (fallback === void 0) {
          fallback = function(op) {
            return reject(new Error("Promise does not support operation: " + op));
          };
        }
        if (inspect === void 0) {
          inspect = function() {
            return {state: "unknown"};
          };
        }
        var promise = object_create(Promise.prototype);
        promise.promiseDispatch = function(resolve, op, args) {
          var result;
          try {
            if (descriptor[op]) {
              result = descriptor[op].apply(promise, args);
            } else {
              result = fallback.call(promise, op, args);
            }
          } catch (exception) {
            result = reject(exception);
          }
          if (resolve) {
            resolve(result);
          }
        };
        promise.inspect = inspect;
        if (inspect) {
          var inspected = inspect();
          if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
          }
          promise.valueOf = function() {
            var inspected = inspect();
            if (inspected.state === "pending" || inspected.state === "rejected") {
              return promise;
            }
            return inspected.value;
          };
        }
        return promise;
      }
      Promise.prototype.toString = function() {
        return "[object Promise]";
      };
      Promise.prototype.then = function(fulfilled, rejected, progressed) {
        var self = this;
        var deferred = defer();
        var done = false;
        function _fulfilled(value) {
          try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
          } catch (exception) {
            return reject(exception);
          }
        }
        function _rejected(exception) {
          if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
              return rejected(exception);
            } catch (newException) {
              return reject(newException);
            }
          }
          return reject(exception);
        }
        function _progressed(value) {
          return typeof progressed === "function" ? progressed(value) : value;
        }
        Q.nextTick(function() {
          self.promiseDispatch(function(value) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_fulfilled(value));
          }, "when", [function(exception) {
            if (done) {
              return;
            }
            done = true;
            deferred.resolve(_rejected(exception));
          }]);
        });
        self.promiseDispatch(void 0, "when", [void 0, function(value) {
          var newValue;
          var threw = false;
          try {
            newValue = _progressed(value);
          } catch (e) {
            threw = true;
            if (Q.onerror) {
              Q.onerror(e);
            } else {
              throw e;
            }
          }
          if (!threw) {
            deferred.notify(newValue);
          }
        }]);
        return deferred.promise;
      };
      Q.tap = function(promise, callback) {
        return Q(promise).tap(callback);
      };
      Promise.prototype.tap = function(callback) {
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall(value).thenResolve(value);
        });
      };
      Q.when = when;
      function when(value, fulfilled, rejected, progressed) {
        return Q(value).then(fulfilled, rejected, progressed);
      }
      Promise.prototype.thenResolve = function(value) {
        return this.then(function() {
          return value;
        });
      };
      Q.thenResolve = function(promise, value) {
        return Q(promise).thenResolve(value);
      };
      Promise.prototype.thenReject = function(reason) {
        return this.then(function() {
          throw reason;
        });
      };
      Q.thenReject = function(promise, reason) {
        return Q(promise).thenReject(reason);
      };
      Q.nearer = nearer;
      function nearer(value) {
        if (isPromise(value)) {
          var inspected = value.inspect();
          if (inspected.state === "fulfilled") {
            return inspected.value;
          }
        }
        return value;
      }
      Q.isPromise = isPromise;
      function isPromise(object) {
        return object instanceof Promise;
      }
      Q.isPromiseAlike = isPromiseAlike;
      function isPromiseAlike(object) {
        return isObject(object) && typeof object.then === "function";
      }
      Q.isPending = isPending;
      function isPending(object) {
        return isPromise(object) && object.inspect().state === "pending";
      }
      Promise.prototype.isPending = function() {
        return this.inspect().state === "pending";
      };
      Q.isFulfilled = isFulfilled;
      function isFulfilled(object) {
        return !isPromise(object) || object.inspect().state === "fulfilled";
      }
      Promise.prototype.isFulfilled = function() {
        return this.inspect().state === "fulfilled";
      };
      Q.isRejected = isRejected;
      function isRejected(object) {
        return isPromise(object) && object.inspect().state === "rejected";
      }
      Promise.prototype.isRejected = function() {
        return this.inspect().state === "rejected";
      };
      var unhandledReasons = [];
      var unhandledRejections = [];
      var reportedUnhandledRejections = [];
      var trackUnhandledRejections = true;
      function resetUnhandledRejections() {
        unhandledReasons.length = 0;
        unhandledRejections.length = 0;
        if (!trackUnhandledRejections) {
          trackUnhandledRejections = true;
        }
      }
      function trackRejection(promise, reason) {
        if (!trackUnhandledRejections) {
          return;
        }
        if (typeof process === "object" && typeof process.emit === "function") {
          Q.nextTick.runAfter(function() {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
              process.emit("unhandledRejection", reason, promise);
              reportedUnhandledRejections.push(promise);
            }
          });
        }
        unhandledRejections.push(promise);
        if (reason && typeof reason.stack !== "undefined") {
          unhandledReasons.push(reason.stack);
        } else {
          unhandledReasons.push("(no stack) " + reason);
        }
      }
      function untrackRejection(promise) {
        if (!trackUnhandledRejections) {
          return;
        }
        var at = array_indexOf(unhandledRejections, promise);
        if (at !== -1) {
          if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function() {
              var atReport = array_indexOf(reportedUnhandledRejections, promise);
              if (atReport !== -1) {
                process.emit("rejectionHandled", unhandledReasons[at], promise);
                reportedUnhandledRejections.splice(atReport, 1);
              }
            });
          }
          unhandledRejections.splice(at, 1);
          unhandledReasons.splice(at, 1);
        }
      }
      Q.resetUnhandledRejections = resetUnhandledRejections;
      Q.getUnhandledReasons = function() {
        return unhandledReasons.slice();
      };
      Q.stopUnhandledRejectionTracking = function() {
        resetUnhandledRejections();
        trackUnhandledRejections = false;
      };
      resetUnhandledRejections();
      Q.reject = reject;
      function reject(reason) {
        var rejection = Promise({"when": function(rejected) {
            if (rejected) {
              untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
          }}, function fallback() {
          return this;
        }, function inspect() {
          return {
            state: "rejected",
            reason: reason
          };
        });
        trackRejection(rejection, reason);
        return rejection;
      }
      Q.fulfill = fulfill;
      function fulfill(value) {
        return Promise({
          "when": function() {
            return value;
          },
          "get": function(name) {
            return value[name];
          },
          "set": function(name, rhs) {
            value[name] = rhs;
          },
          "delete": function(name) {
            delete value[name];
          },
          "post": function(name, args) {
            if (name === null || name === void 0) {
              return value.apply(void 0, args);
            } else {
              return value[name].apply(value, args);
            }
          },
          "apply": function(thisp, args) {
            return value.apply(thisp, args);
          },
          "keys": function() {
            return object_keys(value);
          }
        }, void 0, function inspect() {
          return {
            state: "fulfilled",
            value: value
          };
        });
      }
      function coerce(promise) {
        var deferred = defer();
        Q.nextTick(function() {
          try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
          } catch (exception) {
            deferred.reject(exception);
          }
        });
        return deferred.promise;
      }
      Q.master = master;
      function master(object) {
        return Promise({"isDef": function() {}}, function fallback(op, args) {
          return dispatch(object, op, args);
        }, function() {
          return Q(object).inspect();
        });
      }
      Q.spread = spread;
      function spread(value, fulfilled, rejected) {
        return Q(value).spread(fulfilled, rejected);
      }
      Promise.prototype.spread = function(fulfilled, rejected) {
        return this.all().then(function(array) {
          return fulfilled.apply(void 0, array);
        }, rejected);
      };
      Q.async = async;
      function async(makeGenerator) {
        return function() {
          function continuer(verb, arg) {
            var result;
            if (typeof StopIteration === "undefined") {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                return reject(exception);
              }
              if (result.done) {
                return Q(result.value);
              } else {
                return when(result.value, callback, errback);
              }
            } else {
              try {
                result = generator[verb](arg);
              } catch (exception) {
                if (isStopIteration(exception)) {
                  return Q(exception.value);
                } else {
                  return reject(exception);
                }
              }
              return when(result, callback, errback);
            }
          }
          var generator = makeGenerator.apply(this, arguments);
          var callback = continuer.bind(continuer, "next");
          var errback = continuer.bind(continuer, "throw");
          return callback();
        };
      }
      Q.spawn = spawn;
      function spawn(makeGenerator) {
        Q.done(Q.async(makeGenerator)());
      }
      Q["return"] = _return;
      function _return(value) {
        throw new QReturnValue(value);
      }
      Q.promised = promised;
      function promised(callback) {
        return function() {
          return spread([this, all(arguments)], function(self, args) {
            return callback.apply(self, args);
          });
        };
      }
      Q.dispatch = dispatch;
      function dispatch(object, op, args) {
        return Q(object).dispatch(op, args);
      }
      Promise.prototype.dispatch = function(op, args) {
        var self = this;
        var deferred = defer();
        Q.nextTick(function() {
          self.promiseDispatch(deferred.resolve, op, args);
        });
        return deferred.promise;
      };
      Q.get = function(object, key) {
        return Q(object).dispatch("get", [key]);
      };
      Promise.prototype.get = function(key) {
        return this.dispatch("get", [key]);
      };
      Q.set = function(object, key, value) {
        return Q(object).dispatch("set", [key, value]);
      };
      Promise.prototype.set = function(key, value) {
        return this.dispatch("set", [key, value]);
      };
      Q.del = Q["delete"] = function(object, key) {
        return Q(object).dispatch("delete", [key]);
      };
      Promise.prototype.del = Promise.prototype["delete"] = function(key) {
        return this.dispatch("delete", [key]);
      };
      Q.mapply = Q.post = function(object, name, args) {
        return Q(object).dispatch("post", [name, args]);
      };
      Promise.prototype.mapply = Promise.prototype.post = function(name, args) {
        return this.dispatch("post", [name, args]);
      };
      Q.send = Q.mcall = Q.invoke = function(object, name) {
        return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
      };
      Promise.prototype.send = Promise.prototype.mcall = Promise.prototype.invoke = function(name) {
        return this.dispatch("post", [name, array_slice(arguments, 1)]);
      };
      Q.fapply = function(object, args) {
        return Q(object).dispatch("apply", [void 0, args]);
      };
      Promise.prototype.fapply = function(args) {
        return this.dispatch("apply", [void 0, args]);
      };
      Q["try"] = Q.fcall = function(object) {
        return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
      };
      Promise.prototype.fcall = function() {
        return this.dispatch("apply", [void 0, array_slice(arguments)]);
      };
      Q.fbind = function(object) {
        var promise = Q(object);
        var args = array_slice(arguments, 1);
        return function fbound() {
          return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
        };
      };
      Promise.prototype.fbind = function() {
        var promise = this;
        var args = array_slice(arguments);
        return function fbound() {
          return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
        };
      };
      Q.keys = function(object) {
        return Q(object).dispatch("keys", []);
      };
      Promise.prototype.keys = function() {
        return this.dispatch("keys", []);
      };
      Q.all = all;
      function all(promises) {
        return when(promises, function(promises) {
          var pendingCount = 0;
          var deferred = defer();
          array_reduce(promises, function(undefined, promise, index) {
            var snapshot;
            if (isPromise(promise) && (snapshot = promise.inspect()).state === "fulfilled") {
              promises[index] = snapshot.value;
            } else {
              ++pendingCount;
              when(promise, function(value) {
                promises[index] = value;
                if (--pendingCount === 0) {
                  deferred.resolve(promises);
                }
              }, deferred.reject, function(progress) {
                deferred.notify({
                  index: index,
                  value: progress
                });
              });
            }
          }, void 0);
          if (pendingCount === 0) {
            deferred.resolve(promises);
          }
          return deferred.promise;
        });
      }
      Promise.prototype.all = function() {
        return all(this);
      };
      Q.any = any;
      function any(promises) {
        if (promises.length === 0) {
          return Q.resolve();
        }
        var deferred = Q.defer();
        var pendingCount = 0;
        array_reduce(promises, function(prev, current, index) {
          var promise = promises[index];
          pendingCount++;
          when(promise, onFulfilled, onRejected, onProgress);
          function onFulfilled(result) {
            deferred.resolve(result);
          }
          function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
              deferred.reject(new Error("Can't get fulfillment value from any promise, all " + "promises were rejected."));
            }
          }
          function onProgress(progress) {
            deferred.notify({
              index: index,
              value: progress
            });
          }
        }, undefined);
        return deferred.promise;
      }
      Promise.prototype.any = function() {
        return any(this);
      };
      Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
      function allResolved(promises) {
        return when(promises, function(promises) {
          promises = array_map(promises, Q);
          return when(all(array_map(promises, function(promise) {
            return when(promise, noop, noop);
          })), function() {
            return promises;
          });
        });
      }
      Promise.prototype.allResolved = function() {
        return allResolved(this);
      };
      Q.allSettled = allSettled;
      function allSettled(promises) {
        return Q(promises).allSettled();
      }
      Promise.prototype.allSettled = function() {
        return this.then(function(promises) {
          return all(array_map(promises, function(promise) {
            promise = Q(promise);
            function regardless() {
              return promise.inspect();
            }
            return promise.then(regardless, regardless);
          }));
        });
      };
      Q.fail = Q["catch"] = function(object, rejected) {
        return Q(object).then(void 0, rejected);
      };
      Promise.prototype.fail = Promise.prototype["catch"] = function(rejected) {
        return this.then(void 0, rejected);
      };
      Q.progress = progress;
      function progress(object, progressed) {
        return Q(object).then(void 0, void 0, progressed);
      }
      Promise.prototype.progress = function(progressed) {
        return this.then(void 0, void 0, progressed);
      };
      Q.fin = Q["finally"] = function(object, callback) {
        return Q(object)["finally"](callback);
      };
      Promise.prototype.fin = Promise.prototype["finally"] = function(callback) {
        callback = Q(callback);
        return this.then(function(value) {
          return callback.fcall().then(function() {
            return value;
          });
        }, function(reason) {
          return callback.fcall().then(function() {
            throw reason;
          });
        });
      };
      Q.done = function(object, fulfilled, rejected, progress) {
        return Q(object).done(fulfilled, rejected, progress);
      };
      Promise.prototype.done = function(fulfilled, rejected, progress) {
        var onUnhandledError = function(error) {
          Q.nextTick(function() {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
              Q.onerror(error);
            } else {
              throw error;
            }
          });
        };
        var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;
        if (typeof process === "object" && process && process.domain) {
          onUnhandledError = process.domain.bind(onUnhandledError);
        }
        promise.then(void 0, onUnhandledError);
      };
      Q.timeout = function(object, ms, error) {
        return Q(object).timeout(ms, error);
      };
      Promise.prototype.timeout = function(ms, error) {
        var deferred = defer();
        var timeoutId = setTimeout(function() {
          if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
          }
          deferred.reject(error);
        }, ms);
        this.then(function(value) {
          clearTimeout(timeoutId);
          deferred.resolve(value);
        }, function(exception) {
          clearTimeout(timeoutId);
          deferred.reject(exception);
        }, deferred.notify);
        return deferred.promise;
      };
      Q.delay = function(object, timeout) {
        if (timeout === void 0) {
          timeout = object;
          object = void 0;
        }
        return Q(object).delay(timeout);
      };
      Promise.prototype.delay = function(timeout) {
        return this.then(function(value) {
          var deferred = defer();
          setTimeout(function() {
            deferred.resolve(value);
          }, timeout);
          return deferred.promise;
        });
      };
      Q.nfapply = function(callback, args) {
        return Q(callback).nfapply(args);
      };
      Promise.prototype.nfapply = function(args) {
        var deferred = defer();
        var nodeArgs = array_slice(args);
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfcall = function(callback) {
        var args = array_slice(arguments, 1);
        return Q(callback).nfapply(args);
      };
      Promise.prototype.nfcall = function() {
        var nodeArgs = array_slice(arguments);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nfbind = Q.denodeify = function(callback) {
        var baseArgs = array_slice(arguments, 1);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          Q(callback).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise.prototype.nfbind = Promise.prototype.denodeify = function() {
        var args = array_slice(arguments);
        args.unshift(this);
        return Q.denodeify.apply(void 0, args);
      };
      Q.nbind = function(callback, thisp) {
        var baseArgs = array_slice(arguments, 2);
        return function() {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          function bound() {
            return callback.apply(thisp, arguments);
          }
          Q(bound).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
        };
      };
      Promise.prototype.nbind = function() {
        var args = array_slice(arguments, 0);
        args.unshift(this);
        return Q.nbind.apply(void 0, args);
      };
      Q.nmapply = Q.npost = function(object, name, args) {
        return Q(object).npost(name, args);
      };
      Promise.prototype.nmapply = Promise.prototype.npost = function(name, args) {
        var nodeArgs = array_slice(args || []);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nsend = Q.nmcall = Q.ninvoke = function(object, name) {
        var nodeArgs = array_slice(arguments, 2);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Promise.prototype.nsend = Promise.prototype.nmcall = Promise.prototype.ninvoke = function(name) {
        var nodeArgs = array_slice(arguments, 1);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
      };
      Q.nodeify = nodeify;
      function nodeify(object, nodeback) {
        return Q(object).nodeify(nodeback);
      }
      Promise.prototype.nodeify = function(nodeback) {
        if (nodeback) {
          this.then(function(value) {
            Q.nextTick(function() {
              nodeback(null, value);
            });
          }, function(error) {
            Q.nextTick(function() {
              nodeback(error);
            });
          });
        } else {
          return this;
        }
      };
      Q.noConflict = function() {
        throw new Error("Q.noConflict only works when Q is used as a global");
      };
      var qEndingLine = captureLine();
      return Q;
    });
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:q@1.4.1.js", ["npm:q@1.4.1/q.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:q@1.4.1/q.js');
  global.define = __define;
  return module.exports;
});

System.register('components/preloading/preloading.js', ['npm:babel-runtime@5.8.24/helpers/create-class.js', 'npm:babel-runtime@5.8.24/helpers/class-call-check.js', 'npm:q@1.4.1.js'], function (_export) {
  var _createClass, _classCallCheck, Q, Preload;

  return {
    setters: [function (_npmBabelRuntime5824HelpersCreateClassJs) {
      _createClass = _npmBabelRuntime5824HelpersCreateClassJs['default'];
    }, function (_npmBabelRuntime5824HelpersClassCallCheckJs) {
      _classCallCheck = _npmBabelRuntime5824HelpersClassCallCheckJs['default'];
    }, function (_npmQ141Js) {
      Q = _npmQ141Js;
    }],
    execute: function () {
      /* global PIXI, Q */

      /*-----------------------
      ---------- API ----------
      -----------------------*/
      "use strict";

      /*-----------------------
      --------- IMPORT --------
      -----------------------*/

      Preload = (function () {
        /**
         * Preloads assets before initializing map.
         *
         * @class Preload
         * @constructor
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
          key: 'resolveOnComplete',
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
          key: 'addResource',
          value: function addResource(resource) {
            this.preloaderClass.add(resource);
          }

          /**
           * Preload assets
           *
           * @method loadManifest
           **/
        }, {
          key: 'loadManifest',
          value: function loadManifest() {
            return this;
          }

          /**
           * Error handler if something goes wrong when preloading
           *
           * @method setErrorHandler
           **/
        }, {
          key: 'setErrorHandler',
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
          key: 'setProgressHandler',
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
          key: 'activateSound',
          value: function activateSound() {
            this.preloaderClass.installPlugin();
          }
        }]);

        return Preload;
      })();

      _export('Preload', Preload);
    }
  };
});
System.registerDynamic("npm:core-js@1.1.4/library/modules/$.global.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var UNDEFINED = 'undefined';
  var global = module.exports = typeof window != UNDEFINED && window.Math == Math ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.def.js", ["npm:core-js@1.1.4/library/modules/$.global.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('npm:core-js@1.1.4/library/modules/$.global.js'),
      core = $__require('npm:core-js@1.1.4/library/modules/$.core.js'),
      PROTOTYPE = 'prototype';
  var ctx = function(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  };
  var $def = function(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        isProto = type & $def.P,
        target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {})[PROTOTYPE],
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      if (isGlobal && typeof target[key] != 'function')
        exp = source[key];
      else if (type & $def.B && own)
        exp = ctx(out, global);
      else if (type & $def.W && target[key] == out)
        !function(C) {
          exp = function(param) {
            return this instanceof C ? new C(param) : C(param);
          };
          exp[PROTOTYPE] = C[PROTOTYPE];
        }(out);
      else
        exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
      exports[key] = exp;
      if (isProto)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.defined.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.to-object.js", ["npm:core-js@1.1.4/library/modules/$.defined.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('npm:core-js@1.1.4/library/modules/$.defined.js');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.cof.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.iobject.js", ["npm:core-js@1.1.4/library/modules/$.cof.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('npm:core-js@1.1.4/library/modules/$.cof.js');
  module.exports = 0 in Object('z') ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.enum-keys.js", ["npm:core-js@1.1.4/library/modules/$.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.1.4/library/modules/$.js');
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getSymbols = $.getSymbols;
    if (getSymbols) {
      var symbols = getSymbols(it),
          isEnum = $.isEnum,
          i = 0,
          key;
      while (symbols.length > i)
        if (isEnum.call(it, key = symbols[i++]))
          keys.push(key);
    }
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.fails.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.assign.js", ["npm:core-js@1.1.4/library/modules/$.to-object.js", "npm:core-js@1.1.4/library/modules/$.iobject.js", "npm:core-js@1.1.4/library/modules/$.enum-keys.js", "npm:core-js@1.1.4/library/modules/$.fails.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toObject = $__require('npm:core-js@1.1.4/library/modules/$.to-object.js'),
      IObject = $__require('npm:core-js@1.1.4/library/modules/$.iobject.js'),
      enumKeys = $__require('npm:core-js@1.1.4/library/modules/$.enum-keys.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.fails.js')(function() {
    return Symbol() in Object.assign({});
  }) ? function assign(target, source) {
    var T = toObject(target),
        l = arguments.length,
        i = 1;
    while (l > i) {
      var S = IObject(arguments[i++]),
          keys = enumKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        T[key = keys[j++]] = S[key];
    }
    return T;
  } : Object.assign;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/es6.object.assign.js", ["npm:core-js@1.1.4/library/modules/$.def.js", "npm:core-js@1.1.4/library/modules/$.assign.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $def = $__require('npm:core-js@1.1.4/library/modules/$.def.js');
  $def($def.S + $def.F, 'Object', {assign: $__require('npm:core-js@1.1.4/library/modules/$.assign.js')});
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/modules/$.core.js", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.1.4/library/fn/object/assign.js", ["npm:core-js@1.1.4/library/modules/es6.object.assign.js", "npm:core-js@1.1.4/library/modules/$.core.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.1.4/library/modules/es6.object.assign.js');
  module.exports = $__require('npm:core-js@1.1.4/library/modules/$.core.js').Object.assign;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.24/core-js/object/assign.js", ["npm:core-js@1.1.4/library/fn/object/assign.js"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.1.4/library/fn/object/assign.js'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('components/utilities/polyfills.js', ['npm:babel-runtime@5.8.24/core-js/object/assign.js'], function (_export) {
  var _Object$assign, polyfills;

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Add polyfills for the map, as necessary. Easy to drop out.
   *
   * @class utilities.polyfills
   * @return {Object} arrayFind, objectAssign
   */
  function setupPolyfills() {
    return {
      arrayFind: arrayFind,
      objectAssign: objectAssign
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
      if (typeof _Object$assign != 'function') {
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
  }
  /* jshint ignore:end */
  return {
    setters: [function (_npmBabelRuntime5824CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5824CoreJsObjectAssignJs['default'];
    }],
    execute: function () {
      /* jshint ignore:start */
      'use strict';

      /*-----------------------
      ---------- API ----------
      -----------------------*/
      polyfills = setupPolyfills();

      _export('polyfills', polyfills);
    }
  };
});
System.register('factories/horizontalHexaFactory.js', ['bundles/fullModuleBundle.js'], function (_export) {
  /* global PIXI */

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  'use strict';var UI_default, ObjectTerrain, ObjectUnit, Map, UI, utils, functionsInObj;

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
  function createHorizontalHexagonMap(canvasContainerElement, datas) {
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

    map = new Map(canvasContainerElement, mapProperties, mapOptions);
    dialog_selection = document.getElementById("selectionDialog");
    defaultUI = new UI_default(dialog_selection, map);

    /* Initialize UI as singleton */
    UI(defaultUI, map);

    DATA_MAP.layers.forEach(function (layerData) {
      if (typeof layerData !== "object") {
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
  return {
    setters: [function (_bundlesFullModuleBundleJs) {
      UI_default = _bundlesFullModuleBundleJs.UI_default;
      ObjectTerrain = _bundlesFullModuleBundleJs.ObjectTerrain;
      ObjectUnit = _bundlesFullModuleBundleJs.ObjectUnit;
      Map = _bundlesFullModuleBundleJs.Map;
      UI = _bundlesFullModuleBundleJs.UI;
      utils = _bundlesFullModuleBundleJs.utils;
    }],
    execute: function () {
      functionsInObj = {
        ObjectTerrain: ObjectTerrain,
        ObjectUnit: ObjectUnit
      };

      /*---------------------
      --------- API ---------
      ----------------------*/

      _export('createHorizontalHexagonMap', createHorizontalHexagonMap);
    }
  };
});
System.register('bundles/fullModuleBundle.js', ['bundles/coreBundle.js', 'components/logger/log.js', 'components/map/extensions/basicActions/basicActions.js', 'components/map/extensions/hexagons/index.js', 'components/map/extensions/mapMovement/mapMovement.js', 'components/map/UIs/default/default.js', 'components/map/UIs/default/layout/index.js', 'components/map/UIs/default/utils/arrows.js', 'components/preloading/preloading.js', 'components/utilities/polyfills.js', 'factories/horizontalHexaFactory.js'], function (_export) {
  'use strict';

  /*
   * This should bundle all engines functions
   */

  return {
    setters: [function (_bundlesCoreBundleJs) {
      var _exportObj = {};

      for (var _key in _bundlesCoreBundleJs) {
        if (_key !== 'default') _exportObj[_key] = _bundlesCoreBundleJs[_key];
      }

      _export(_exportObj);
    }, function (_componentsLoggerLogJs) {
      var _exportObj2 = {};

      for (var _key2 in _componentsLoggerLogJs) {
        if (_key2 !== 'default') _exportObj2[_key2] = _componentsLoggerLogJs[_key2];
      }

      _export(_exportObj2);
    }, function (_componentsMapExtensionsBasicActionsBasicActionsJs) {
      var _exportObj3 = {};

      for (var _key3 in _componentsMapExtensionsBasicActionsBasicActionsJs) {
        if (_key3 !== 'default') _exportObj3[_key3] = _componentsMapExtensionsBasicActionsBasicActionsJs[_key3];
      }

      _export(_exportObj3);
    }, function (_componentsMapExtensionsHexagonsIndexJs) {
      var _exportObj4 = {};

      for (var _key4 in _componentsMapExtensionsHexagonsIndexJs) {
        if (_key4 !== 'default') _exportObj4[_key4] = _componentsMapExtensionsHexagonsIndexJs[_key4];
      }

      _export(_exportObj4);
    }, function (_componentsMapExtensionsMapMovementMapMovementJs) {
      var _exportObj5 = {};

      for (var _key5 in _componentsMapExtensionsMapMovementMapMovementJs) {
        if (_key5 !== 'default') _exportObj5[_key5] = _componentsMapExtensionsMapMovementMapMovementJs[_key5];
      }

      _export(_exportObj5);
    }, function (_componentsMapUIsDefaultDefaultJs) {
      var _exportObj6 = {};

      for (var _key6 in _componentsMapUIsDefaultDefaultJs) {
        if (_key6 !== 'default') _exportObj6[_key6] = _componentsMapUIsDefaultDefaultJs[_key6];
      }

      _export(_exportObj6);
    }, function (_componentsMapUIsDefaultLayoutIndexJs) {
      var _exportObj7 = {};

      for (var _key7 in _componentsMapUIsDefaultLayoutIndexJs) {
        if (_key7 !== 'default') _exportObj7[_key7] = _componentsMapUIsDefaultLayoutIndexJs[_key7];
      }

      _export(_exportObj7);
    }, function (_componentsMapUIsDefaultUtilsArrowsJs) {
      var _exportObj8 = {};

      for (var _key8 in _componentsMapUIsDefaultUtilsArrowsJs) {
        if (_key8 !== 'default') _exportObj8[_key8] = _componentsMapUIsDefaultUtilsArrowsJs[_key8];
      }

      _export(_exportObj8);
    }, function (_componentsPreloadingPreloadingJs) {
      var _exportObj9 = {};

      for (var _key9 in _componentsPreloadingPreloadingJs) {
        if (_key9 !== 'default') _exportObj9[_key9] = _componentsPreloadingPreloadingJs[_key9];
      }

      _export(_exportObj9);
    }, function (_componentsUtilitiesPolyfillsJs) {
      var _exportObj10 = {};
      _exportObj10['polyfills'] = _componentsUtilitiesPolyfillsJs.polyfills;

      _export(_exportObj10);
    }, function (_factoriesHorizontalHexaFactoryJs) {
      var _exportObj11 = {};

      for (var _key10 in _factoriesHorizontalHexaFactoryJs) {
        if (_key10 !== 'default') _exportObj11[_key10] = _factoriesHorizontalHexaFactoryJs[_key10];
      }

      _export(_exportObj11);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=testi.js.map