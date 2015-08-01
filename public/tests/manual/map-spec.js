(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _componentsFactoriesHorizontalHexaFactory = require('../../components/factories/horizontalHexaFactory');

/* ===== Import plugins ===== */

var _componentsMapCoreMoveMap_drag = require('../../components/map/core/move/map_drag');

var _componentsMapCoreZoomMap_zoom = require('../../components/map/core/zoom/map_zoom');

var _componentsMapHexagonsObject_selectObject_select_hexagon = require('../../components/map/hexagons/object_select/object_select_hexagon');

/* DATA FILES used for testing */

var _testsDataGameData = require('../../tests/data/gameData');

var _testsDataTypeData = require('../../tests/data/typeData');

var _testsDataMapData = require('../../tests/data/mapData');

var _componentsPreloadingPreloading = require('../../components/preloading/preloading');

window.initMap = function () {
  var canvasElement = document.getElementById('mapCanvas');
  var map;

  map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(canvasElement, _testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);

  var prel = new _componentsPreloadingPreloading.preload(false);
  prel.setErrorHandler(preloadErrorHandler);
  //.setProgressHandler( progressHandler )
  prel.loadManifest([{
    id: 'terrain_spritesheet',
    src: 'http://warmapengine.level7.fi/assets/img/map/testHexagons/testHexagonSpritesheet.png'
  }, {
    id: 'unit_spritesheet',
    src: 'http://warmapengine.level7.fi/assets/img/map/amplio2/units.png'
  }]);
  prel.resolveOnComplete().then(function () {
    console.log('preloading complete? Map should be ready to init?');
    map.init([_componentsMapCoreZoomMap_zoom.map_zoom, _componentsMapCoreMoveMap_drag.map_drag, _componentsMapHexagonsObject_selectObject_select_hexagon.object_select_hexagon], { x: 41, y: 47 }, undefined);
  });

  return map;

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log('PRELOADER ERROR', err);
  }
};

},{"../../components/factories/horizontalHexaFactory":3,"../../components/map/core/move/map_drag":12,"../../components/map/core/zoom/map_zoom":15,"../../components/map/hexagons/object_select/object_select_hexagon":20,"../../components/preloading/preloading":23,"../../tests/data/gameData":24,"../../tests/data/mapData":25,"../../tests/data/typeData":26}],2:[function(require,module,exports){
/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define */

(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5;
        });
    } else {
        $.md5 = md5;
    }
}(this));

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createMap = createMap;
/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ===== 3rd party library imports ===== */
//import { System } from 'systemjs';

/* ====== Own module imports ====== */

var _mapCoreMap = require('../map/core/Map');

var _mapHexagonsObjectObject_terrain_hexa = require('../map/hexagons/object/Object_terrain_hexa');

var _mapHexagonsObjectObject_unit_hexa = require('../map/hexagons/object/Object_unit_hexa');

var _mapCoreSpritesheetList = require('../map/core/spritesheetList');

var _mapCoreUI = require('../map/core/UI');

var _mapCoreUIDefaultDefaultJs = require('../map/core/UI/default/default.js');

var allSpritesheets = (0, _mapCoreSpritesheetList.spritesheetList)();

var functionsInObj = {
  Object_terrain: _mapHexagonsObjectObject_terrain_hexa.Object_terrain_hexa,
  Object_unit: _mapHexagonsObjectObject_unit_hexa.Object_unit_hexa
};

/** ===== EXPORT ===== */
/*
@argument {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
Coordinates are always defaulted to 0,0 if none are given.
{
  mapSize: createjs.Rectangle,
  pluginsToActivate: [
    "map/move/map_move",
    "map/FOW/map_FOW"
  ],
  stages: [{
    type: "map/core/Map_Stage",
    coordinates: createjs.Point,
    name: "terrainStage",
    element: "#canvasTerrain",
    layers: [{
      type: "map/layers/Map_layer_terrain",
      coordinates: createjs.Point,
      name: "terrainBaseLayer",
      options: {
        cache: true
      },
      objectGroups: [{
        type: "map/objects/Objects_terrain",
        name: "TerrainBase", // I guess only for debugging?
        objects: [{
          name: "Plain",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }],
        type: "map/objects/Objects_terrain",
        name: "Terrain", // I guess only for debugging?
        objects: [{
          name: "Plain",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }]
      }],
      type: "map/layers/Map_layer_terrain",
      coordinates: createjs.Point,
      name: "terrainBaseLayer",
      options: {
        cache: false
      },
      objectGroups: [{
        type: "map/objects/Objects_unit",
        name: "Unit", // I guess only for debugging?
        objects: [{
          name: "Infantry 1",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }]
      }]
    }]
  }]
}
*/

function createMap(canvasElement, gameDataArg, mapDataArg, typeDataArg) {
  console.log('============================================');
  var mapData = typeof mapDataArg === 'string' ? JSON.parse(mapDataArg) : mapDataArg;
  var typeData = typeof typeDataArg === 'string' ? JSON.parse(typeDataArg) : typeDataArg;
  var gameData = typeof gameDataArg === 'string' ? JSON.parse(gameDataArg) : gameDataArg;
  var map = new _mapCoreMap.Map(canvasElement, { mapSize: gameData.mapSize });
  var dialog_selection = document.getElementById('selectionDialog');
  var defaultUI = new _mapCoreUIDefaultDefaultJs.UI_default(dialog_selection);
  defaultUI.init();

  /* Initialize UI as singleton */
  (0, _mapCoreUI.UI)(defaultUI, map);

  /* Activate plugins */
  /* The system does not work :(
  if(gameData.pluginsToActivate.map && gameData.pluginsToActivate.map.length > 0) {
    Promise.all(
          gameData.pluginsToActivate.map.map(x => System.import(x)))
      .then(([module1, module2, module3]) => {
          console.log("all plugins loaded");
      }).catch(e => {
        console.log(e.stack);
      });
  }
  */

  /* We iterate through the given map data and create objects accordingly */
  mapData.layers.forEach(function (layerData) {
    var thisLayer = undefined;

    try {
      thisLayer = map.addLayer(layerData.name, 2, false, layerData.coord);
    } catch (e) {
      console.log('Problem:', layerData.type, e.stack);
    }

    layerData.objectGroups.forEach(function (objectGroup) {
      var spritesheet = undefined;
      var spritesheetType = objectGroup.typeImageData;

      if (!spritesheetType) {
        console.log('Error with spritesheetType-data');
        return;
      }

      if (spritesheetType) {
        var spritesheetData = typeData.graphicData[spritesheetType];

        spritesheet = allSpritesheets.addSpritesheet(spritesheetData);
      }

      objectGroup.objects.forEach(function (object) {
        var objTypeData = typeData.objectData[spritesheetType][object.objType];

        if (!objTypeData) {
          console.debug('Bad mapData for type:', spritesheetType, object.objType, object.name);
          throw new Error('Bad mapData for type:', spritesheetType, object.objType, object.name);
        }

        var currentFrameNumber = objTypeData.image;
        var objData = {
          typeData: objTypeData,
          activeData: object.data
        };
        var newObject = new functionsInObj[objectGroup.type](object.coord, objData, spritesheet, currentFrameNumber, { radius: 47 });
        thisLayer.addChild(newObject);
      });
    });
  });

  map.moveMap(mapData.startPoint);

  return map;

  /*
    CreateTerrainStage
      _CreateTerrainLayer_base
      _CreateTerrainLayer_terrain
      _CreateTerrainLayer_dither
      _CreateTerrainLayer_prettifier
      _CreateTerrainLayer_resource
    CreateUnitStage
      _CreateUnitLayer_Unit
      _CreateUnitLayer_City
    CreateFOWStage
    CreateDataStage
    CreateUIStage
      _CreateUILayer_arrow
      _CreateUILayer_selection
  */
}

},{"../map/core/Map":5,"../map/core/UI":9,"../map/core/UI/default/default.js":10,"../map/core/spritesheetList":13,"../map/hexagons/object/Object_terrain_hexa":18,"../map/hexagons/object/Object_unit_hexa":19}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  debug: function debug(e, errorText) {
    log.debug(errorText, e);
  }
};
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
/** Map is the main class for constructing 2D map for strategy games
 *
 * Map is instantiated and then initialized with init-method.
 *
 * Plugins can be added with activatePlugins-method by prodiving init(map) method in the plugin. Plugins are always
 * functions, not objects that are instantiated. Plugins are supposed to extend the map object or anything in it via
 * it's public methods.
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/* ====== 3rd party imports ====== */

/* ====== Own module imports ====== */

var _Map_stage = require('./Map_stage');

var _Map_layer = require('./Map_layer');

var _utilsUtils = require('./utils/utils');

var _moveMap_drag = require('./move/map_drag');

var _zoomMap_zoom = require('./zoom/map_zoom');

var _eventlisteners = require('./eventlisteners');

var _drawMapOnNextTick = false;
var eventlisteners;

var Map = (function () {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given.
   * @return Map instance */

  function Map(canvas, options) {
    _classCallCheck(this, Map);

    if (!canvas) {
      throw new Error(this.constructor.name + ' needs canvas!');
    }
    options = options || {};
    this.canvas = canvas;
    this._stage = new _Map_stage.Map_stage('daddyStage', canvas);
    this.mommyLayer = new _Map_layer.Map_layer('mommyLayer', options.type, options.subContainers, options.startCoord);
    this._stage.addChild(this.mommyLayer);
    this.plugins = [];
    this.activatedPlugins = [];
    /* Activate the map zoom and map drag core plugins */
    this.pluginsToActivate = [_zoomMap_zoom.map_zoom, _moveMap_drag.map_drag];
    this.mapSize = options.mapSize || { x: 0, y: 0 };
    this.activeTickCB = false;
    this.eventCBs = {
      fullSize: _utilsUtils.resizeUtils.setToFullSize(canvas.getContext('2d')),
      fullscreen: _utilsUtils.resizeUtils.toggleFullScreen,
      select: null,
      drag: null,
      zoom: null
    };
    this._fullSizeFunction = null;
    eventlisteners = (0, _eventlisteners.eventListeners)(this.eventCBs);
  }

  _createClass(Map, [{
    key: 'init',

    /** initialization method
     * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
     * separately passing them to activatePlugins method
     * @param {x: ? y:?} coord - Starting coordinates for the map
     * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
     * during ticks
     * @return the current map instance */
    value: function init(plugins, coord, tickCB) {
      if (plugins) {
        this.activatePlugins(plugins);
      }

      if (coord) {
        this.mommyLayer.x = coord.x;
        this.mommyLayer.y = coord.y;
      }

      this.drawOnNextTick();
      _defaultTick(this);
      tickCB && this.customTickOn(tickCB);

      return this;
    }
  }, {
    key: 'drawOnNextTick',

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
    value: function drawOnNextTick() {
      _drawMapOnNextTick = true;

      return this;
    }
  }, {
    key: 'getLayersWithAttributes',

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
    value: function getLayersWithAttributes(attribute, value) {
      return this._stage.children[0].children.filter(function (layer) {
        return layer[attribute] === value;
      });
    }
  }, {
    key: 'getStage',
    value: function getStage() {
      return this._stage;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.mapSize;
    }
  }, {
    key: 'addLayer',

    /** All parameters are passed to Map_layer constructor
     * @return created Map_layer instance */
    value: function addLayer(name, type, subContainers, coord) {
      var layer = new _Map_layer.Map_layer(name, type, subContainers, coord);

      this.mommyLayer.addChild(layer);

      return layer;
    }
  }, {
    key: 'removeLayer',

    /**
     * @param {Map_layer} layer - the layer object to be removed */
    value: function removeLayer(layer) {
      this.mommyLayer.removeChild(layer);

      return layer;
    }
  }, {
    key: 'getLayerNamed',

    /** @return layer with the passed layer name */
    value: function getLayerNamed(name) {
      return this.mommyLayer.getChildNamed(name);
    }
  }, {
    key: 'moveMap',

    /**
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
    value: function moveMap(coordinates) {
      this.mommyLayer.move(coordinates);
      this.drawOnNextTick();
      this.mapMoved(true);

      return this;
    }
  }, {
    key: 'cacheMap',

    /** Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
     * layer on the map and caches the ones that return true from getCacheEnabled-method.
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
    value: function cacheMap() {
      var _this = this;

      if (this.mommyLayer.getCacheEnabled()) {
        this.mommyLayer.cache(0, 0, this.mapSize.x, this.mapSize.y);
      } else {
        this.mommyLayer.children.forEach(function (child) {
          if (child.getCacheEnabled()) {
            child.cache(0, 0, _this.mapSize.x, _this.mapSize.y);
          }
        });
      }

      return this;
    }
  }, {
    key: 'getObjectsUnderMapPoint',

    /** iterates through the map layers and returns matching objects on given coordinates
     * @param {x: Number, y: Number} coord - The map coordinate under which we want to retrieve all the objects.
     * @return this map instance */
    value: function getObjectsUnderMapPoint(coord) {
      var objects = [];

      this.mommyLayer.getObjectsUnderPoint(coord);

      return objects;
    }
  }, {
    key: 'toggleFullSize',

    /** Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
    value: function toggleFullSize() {
      eventlisteners.toggleFullSizeListener();
    }
  }, {
    key: 'toggleFullScreen',

    /** Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
    value: function toggleFullScreen() {
      eventlisteners.toggleFullScreen();
    }
  }, {
    key: 'activatePlugins',

    /* Activate plugins for the map. Must be in array format:
    [{
      name: function name,
      args: [
        First argument,
        second argument,
        ...
      ]
    }] */
    value: function activatePlugins(pluginsArray) {
      var _this2 = this;

      var allPlugins = this.pluginsToActivate.concat(pluginsArray);

      allPlugins.forEach(function (pluginToUse) {
        if (_this2.activatedPlugins[pluginToUse.pluginName] !== true) {
          _this2.plugins[pluginToUse.pluginName] = pluginToUse;
          _this2.plugins[pluginToUse.pluginName].init(_this2);
          _this2.activatedPlugins[pluginToUse.pluginName] = true;
          _this2.pluginsToActivate = [];
        }
      });

      return this;
    }
  }, {
    key: 'customTickOn',
    value: function customTickOn(tickCB) {
      if (this.activeTickCB) {
        throw new Error('there already exists one tick callback. Need to remove it first, before setting up a new one');
      }

      this.activeTickCB = tickCB || function () {};

      createjs.Ticker.addEventListener('tick', this.activeTickCB);

      return this;
    }
  }, {
    key: 'customTickOff',
    value: function customTickOff() {
      createjs.Ticker.removeEventListener('tick', this.activeTickCB);

      this.activeTickCB = undefined;

      return this;
    }
  }, {
    key: 'mapMoved',

    /* getter and setter */
    value: function mapMoved(yesOrNo) {
      if (yesOrNo !== undefined) {
        this.mapInMove = yesOrNo;
        return yesOrNo;
      }

      return this.mapInMove;
    }
  }, {
    key: 'setPrototype',
    value: function setPrototype(property, value) {
      this.__proto__[property] = value;
    }
  }]);

  return Map;
})();

exports.Map = Map;

/** ===== Private functions ===== */
/* This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
callback is always set and should not be removed or overruled */
function _defaultTick(map) {
  createjs.Ticker.addEventListener('tick', _tickFunc);

  return _tickFunc;

  function _tickFunc() {
    if (_drawMapOnNextTick === true) {
      _drawMap(map);
      _drawMapOnNextTick = false;
    }
  }
}
/* Private function to draw the map */
function _drawMap(map) {
  map._stage.update();

  return map;
}

},{"./Map_layer":6,"./Map_stage":7,"./eventlisteners":11,"./move/map_drag":12,"./utils/utils":14,"./zoom/map_zoom":15}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
@require the createjs framework in global namespace
@require validator module
*/

/* ====== Own module imports ====== */

/* ===== Constants ===== */
var TYPES = {
  justSubContainers: 1,
  noSubContainers: 2,
  imagesInSubContainers: 3
};

/** ===== EXPORT ===== */

var Map_layer = (function (_createjs$Container) {
  function Map_layer(name, type, subContainers, coord) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this.superPrototype = this.constructor.prototype;
    this._cacheEnabled = true;
    this.type = subContainers ? TYPES.imagesInSubContainers : type || TYPES.noSubContainers;
    this.visible = true;
    this.useSubcontainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.interactive = false;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.movable = true;
    this.zoomable = true;
  }

  _inherits(Map_layer, _createjs$Container);

  _createClass(Map_layer, [{
    key: "getCacheEnabled",
    value: function getCacheEnabled() {
      return this._cacheEnabled;
    }
  }, {
    key: "setCacheEnabled",
    value: function setCacheEnabled(status) {
      this._cacheEnabled = status;

      return this;
    }
  }, {
    key: "addPrototype",
    value: function addPrototype(name, functionToAdd) {
      _get(Object.getPrototypeOf(Map_layer.prototype), "prototype", this)[name] = functionToAdd;
    }
  }, {
    key: "addChildToSubContainer",

    /* overloaded inherited method */
    value: function addChildToSubContainer(object, index) {
      var functionToUse = index ? "_addChildAt" : "_addChild";

      if (!this.useSubcontainers) {
        /* We add the object to the Container directly. Wether it is Container or Bitmap etc. */
        this[functionToUse](object, index);
      } else {
        /* We add the object to the correct subContainer. For better logic and performance */
        var correctSubContainer = _getCorrectContainer.call(this, object.x, object.y);
        correctSubContainer.addChild(object, index);
      }

      return this;
    }
  }, {
    key: "move",
    value: function move(coordinates) {
      if (this.movable) {
        this.x += coordinates.x;
        this.y += coordinates.y;
        this.drawThisChild = true;
      }
    }
  }, {
    key: "getChildNamed",
    value: function getChildNamed(name) {
      if (this.children[0] instanceof createjs.Container) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child.name.toLowerCase() === name.toLowerCase()) {
              return child;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: "isUsingSubContainers",
    value: function isUsingSubContainers() {
      return !!this.useSubcontainers;
    }
  }, {
    key: "isSetVisible",
    value: function isSetVisible() {}
  }, {
    key: "setVisible",
    value: function setVisible() {}
  }], [{
    key: "getType",
    value: function getType(name) {
      return TYPES[name];
    }
  }]);

  return Map_layer;
})(createjs.Container);

exports.Map_layer = Map_layer;

/* The node-easel, nor minified easeljs doesn't have the SpriteStage (and node doesn't have the extend) */
/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';

export class Map_spritesheetLayer extends createjs.SpriteContainer {
  constructor(name, type, subContainers, spritesheet) {
    super(spritesheet);
    this.type = subContainers ? TYPES.imagesInSubContainers : type;
    this.visible = true;
    this.useSubcontainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;

    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }
  addChildToSubContainer(object, index) {
    let functionToUse = index ? "_addChildAt" : "_addChild";

    if(!this.useSubcontainers) {
      this[functionToUse](object, index);
    } else {
      let correctSubContainer = _getCorrectContainer.call(this, object.x, object.y);
      correctSubContainer.addChild(object, index);
    }

    return this;
  }
  getChildNamed(name) {
    if(this.children[0] instanceof createjs.Container) {
      for(let child of this.children) {
        if(child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  isUsingSubContainers() {
    return !!this.useSubcontainers;
  }
  isSetVisible() { }
  setVisible() { }
}
*/

/** ===== Private functions ===== */
function _getCorrectContainer(x, y) {
  var correctSubContainer = this.getObjectUnderPoint(x, y);

  return correctSubContainer;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
@require the createjs framework in global namespace
@require validator module
*/

/* ====== Own module imports ====== */

/** ===== EXPORT ===== */

var Map_stage = (function (_createjs$Stage) {
  /* Takes the canvas element as argument */

  function Map_stage(name, canvas, stageBounds) {
    _classCallCheck(this, Map_stage);

    if (!canvas) {
      throw new Error(Map_stage.constructor.name + " needs canvas!");
    }

    _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).call(this, canvas);

    if (stageBounds) {
      this.setBounds(0, 0, stageBounds.x, stageBounds.y);
    }

    this.superPrototype = this.constructor.prototype;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    this.drawThisChild = true;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.mouseEnabled = true;
    this.preventSelection = true;
    this.movable = true;
    this.interactive = false;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }

  _inherits(Map_stage, _createjs$Stage);

  _createClass(Map_stage, [{
    key: "addPrototype",
    value: function addPrototype(name, functionToAdd) {
      _get(Object.getPrototypeOf(Map_stage.prototype), "prototype", this)[name] = functionToAdd;
    }
  }, {
    key: "setCacheEnabled",
    value: function setCacheEnabled(status) {
      this._cacheEnabled = status;

      return this;
    }
  }, {
    key: "getChildNamed",
    value: function getChildNamed(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var layer = _step.value;

          var child = undefined;

          if (layer.name.toLowerCase() === name.toLowerCase()) {
            return layer;
          }

          if (child = layer.getChildNamed(name)) {
            return child;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }]);

  return Map_stage;
})(createjs.Stage);

exports.Map_stage = Map_stage;

/* The node-easel, nor minified easeljs doesn't have the SpriteStage (and node doesn't have the extend) */

/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';
import SpriteStage from '../../../assets/lib/easeljs/SpriteContainer/SpriteStage';
export class Map_spriteStage extends createjs.SpriteStage {

    constructor(name, ...args) {
        super(...args);

        this._cacheEnabled = true;
        this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
        this.drawThisChild = true;


        this.tickEnabled = false;
        this.tickOnUpdate = false;
        this.tickChildren = false;
        this.mouseChildren = false;
        this.mouseEnabled = false;
        this.preventSelection = true;
        this.autoClear = false;
        //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
    }
    getCacheEnabled() {
        return this._cacheEnabled;
    }
    setCacheEnabled(status) {
        validators._is_boolean(status);
        this._cacheEnabled = status;

        return this;
    }
    getChildNamed(name) {
      for(let layer of this.children) {
        let child;

        if(layer.name.toLowerCase() === name.toLowerCase()) {
          return layer;
        }

        if(child = layer.getChildNamed(name)) {
          return child;
        }
      }

      return false;
    }
};
*/

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** This class needs to be gone through carefully, it has been copied from an older version straight. The version was ES5
@param {createjs.Point} coords - the coordinate where the object is located at
@param {} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
but rather things like unit-data and city-data presentations etc.
@param {createjs.SpriteSheet} spriteSheet
@param {Int] currFrameNumber - the current frames number. This is basically the initial image, we can change it later
for animation or such

All of the objects need to have same argumentAPI for creating objects: coords, data, imageData
*/

var Object_sprite = (function (_createjs$Sprite) {
  function Object_sprite(coords, data, spritesheet, currentFrameNumber) {
    _classCallCheck(this, Object_sprite);

    _get(Object.getPrototypeOf(Object_sprite.prototype), "constructor", this).call(this, spritesheet);

    this.name = "general Objects_sprite_" + this.id;

    /* Set data for the object next */
    this.data = data || {};
    this.currFrameNumber = currentFrameNumber;

    /* Execute initial draw function */
    this.innerDraw(coords.x, coords.y);

    /* optimizations */
    this.shadow = true;
    this.tickEnabled = false;
    // Should be enabled, if the layer is being interacted with. Like unit layer. This way we can use cursor pointer etc.
    this.mouseEnabled = false;
    // FOR DEBUGGING AND SEEING THAT LISTENERS ARE ATTACHED:
    //this.willTrigger
  }

  _inherits(Object_sprite, _createjs$Sprite);

  _createClass(Object_sprite, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;

      return this;
    }
  }, {
    key: "innerDraw",

    /* Drawing the object with createjs-methods */
    value: function innerDraw(x, y) {
      this.gotoAndStop(this.currFrameNumber);
      console.log("HAAA");
      this.x = x;
      this.y = y;
      /* The mouse check has been enabled on higher tier, so no need for this
      this.mouseEnabled = false; */

      return this;
    }
  }, {
    key: "drawNewFrame",
    value: function drawNewFrame(x, y, newFrameNumber) {
      this.currFrameNumber = newFrameNumber;

      return this.innerDraw(x, y);
    }
  }, {
    key: "globalCoords",

    /* Dunno if we need this and so on. This was in the old version */
    value: function globalCoords() {
      return {
        x: Number(this.x + this.parent.x),
        y: Number(this.y + this.parent.y)
      };
    }
  }, {
    key: "getBoundsFromFrames",
    value: function getBoundsFromFrames() {
      return this.spriteSheet.getFrameBounds(this.currentFrame);
    }
  }]);

  return Object_sprite;
})(createjs.Sprite);

exports.Object_sprite = Object_sprite;

},{}],9:[function(require,module,exports){
/**
  Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
  Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and
  bringing the unit on top in the map.
*/

/* ====== 3rd party imports ====== */

/* ====== Own module imports ====== */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = UI;
var scope;

function UI(givenUITheme, givenMap) {
  /* This is a singleton class, so if already instantiated return scope */
  if (scope) {
    return scope;
  }

  if (!givenUITheme || !givenMap) {
    throw new Error("UI-module requires UITheme and mapObj");
  }

  var map = givenMap;
  var UITheme = givenUITheme;
  scope = {};

  scope.showSelections = function showSelections(objects) {
    return UITheme.showSelections(objects);
  };
  scope.highlightSelectedObject = function highlightSelectedObject(object) {};

  return scope;
}

},{}],10:[function(require,module,exports){
/**
  The simplest default UI implementation. Holds:
  - Selection highlight of object
  - Selection list of units at the hexagon
*/

/* ====== 3rd party imports ====== */

/* ====== Own module imports ====== */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI_default = (function () {
  function UI_default(modal, styles) {
    _classCallCheck(this, UI_default);

    this.modal = modal || document.getElementsByTagName("dialog")[0];
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }

  _createClass(UI_default, [{
    key: "showSelections",
    value: function showSelections(objects) {
      var _this = this;

      if (objects && objects.length > 1) {
        this.modal.innerHTML = "objects:<br>";
        objects.map(function (object) {
          _this.modal.innerHTML += object.data.typeData.name + "<br>";
        });
        this.modal.show();
        console.log(objects);
      } else {
        this.modal.innerHTML = "SELECTED:<br>";
        this.modal.innerHTML += objects[0].data.typeData.name;
        this.modal.show();
        console.log(objects);
      }
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;

      this.closingElements.forEach(function (element) {
        _activateClosingElement(element, self.modal.close.bind(self.modal));
      });
    }
  }]);

  return UI_default;
})();

exports.UI_default = UI_default;

function _activateClosingElement(element, closeCB) {
  element.addEventListener("click", function (e) {
    closeCB();
  });
}
function _DOMElementsToArray(elements) {
  if (!elements) {
    throw new Error(this.constructor + " function needs elements");
  }

  var length = elements.length;
  var elementArray = [];

  for (var i = 0; i < length; i++) {
    elementArray.push(elements[i]);
  }

  return elementArray;
}

},{}],11:[function(require,module,exports){
"use strict";

"user strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var singletonScope;

var eventListeners = function eventListenerModule(mapCBs) {
  if (singletonScope) {
    return singletonScope;
  }

  singletonScope = {
    states: {}
  };

  singletonScope.toggleFullSizeListener = function toggleFullSizeListener() {
    if (singletonScope.states.fullSize !== true) {
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
    if (singletonScope.states.zoom !== true) {
      window.addEventListener("mousewheel", mapCBs.zoom);
      singletonScope.states.zoom = true;
    } else {
      window.removeEventListener("mousewheel", mapCBs.zoom);
      singletonScope.states.zoom = false;
    }

    return mapCBs.zoom;
  };
  singletonScope.toggleDragListener = function toggleDragListener() {
    if (singletonScope.states.drag !== true) {
      window.addEventListener("mousedown", mapCBs.drag);
      singletonScope.states.drag = true;
    } else {
      window.removeEventListener("mousedown", mapCBs.drag);
      singletonScope.states.drag = false;
    }

    return mapCBs.drag;
  };
  singletonScope.toggleSelectListener = function toggleSelectListener() {
    if (singletonScope.states.select !== true) {
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
exports.eventListeners = eventListeners;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _eventlisteners = require('../eventlisteners');

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

var map_drag = (function map_drag() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = map_drag.name;

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (map) {
    eventlisteners = (0, _eventlisteners.eventListeners)(map.eventCBs);
    map.eventCBs.drag = _startDragListener(map);

    //map.setListener("mousedown", _startDragListener(map));
    eventlisteners.toggleDragListener();
  };

  return scope;

  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener(map) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset({
          x: e.x,
          y: e.y
        });
        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */

        var moveCallback1 = _dragListener(map);
        var mouseupCallback = _setupMouseupListener(map);
        map.canvas.addEventListener('mousemove', moveCallback1);
        map.canvas.addEventListener('mouseup', mouseupCallback);
      } catch (e) {
        console.log(e);
      }

      function _setupMouseupListener(map) {
        return function () {
          map.canvas.removeEventListener('mousemove', moveCallback1);
          map.canvas.removeEventListener('mouseup', mouseupCallback);
          _mapMoved(map);
        };
      }
      /* Event listeners are in their separate file; eventListeners.js */
      function _dragListener(map) {
        try {
          return function dragger(e) {
            map.mapMoved(true);
            /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
            if (e.buttons === 0) {
              map.canvas.removeEventListener('mousemove', moveCallback1);
              map.canvas.removeEventListener('mouseup', mouseupCallback);
              _mapMoved(map);
            }

            var offset = offsetCoords.getOffset();
            var moved = {
              x: e.x - offset.x,
              y: e.y - offset.y
            };

            if (moved.x !== 0 || moved.y !== 0) {
              map.moveMap(moved);
            } else {
              map.mapMoved(false);
            }

            offsetCoords.setOffset({
              x: e.x,
              y: e.y
            });

            /* The mouse has been moved after pressing. This prevent the click
              event to fire at the same time with the mouseDown / dragging event
            */
            //map.mouseMoved( true );
          };
        } catch (e) {
          console.log(e);
        }
      }
    };
  }

  /* ====== Private functions ====== */
  function _offsetCoords() {
    var scope = {};
    var offsetCoords;

    scope.setOffset = function setOffset(coords) {
      return offsetCoords = coords;
    };
    scope.getOffset = function getOffset() {
      return offsetCoords;
    };

    return scope;
  };
})();

exports.map_drag = map_drag;
/* Without this, the other eventListeners might fire inappropriate events. */
function _mapMoved(map) {
  window.setTimeout(function () {
    map.mapMoved(false);
  }, 1);
}

},{"../eventlisteners":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.spritesheetList = spritesheetList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _blueimpMd5 = require('blueimp-md5');

var _blueimpMd52 = _interopRequireDefault(_blueimpMd5);

var allSpritesheets = [];
var allSpritesheetIDs = [];

/* Singleton so we don't use class definition */

function spritesheetList() {
  var scope = {};

  scope.addSpritesheet = function (spritesheetData) {
    var spriteSheet = undefined;

    if (scope.spritesheetAlreadyExists(_createID(spritesheetData))) {
      return false;
    }

    spriteSheet = new createjs.SpriteSheet(spritesheetData);

    allSpritesheets.push(spriteSheet);

    return spriteSheet;
  };
  scope.removeSpritesheet = function (spritesheet) {};
  scope.getAllSpritesheets = function () {
    return allSpritesheets;
  };
  scope.spritesheetAlreadyExists = function (spritesheetID) {
    return allSpritesheetIDs.indexOf(spritesheetID) > -1;
  };
  function _createID(spritesheetData) {
    return spritesheetData.images.toString();
  };

  return scope;
}

},{"blueimp-md5":2}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mouseUtils = (function mouseUtils() {
  var scope = {};

  /** This function is from: http://www.adomas.org/javascript-mouse-wheel/
    It detects which way the mousewheel has been moved
     @param {Event} event pass the event to deltaFromWheel
    @return delta. Positive if wheel was scrolled up, and negative, if wheel was scrolled down.
    */
  scope.deltaFromWheel = function (event) {
    var delta = 0;

    event = event ? event : window.event; /* For IE. */

    if (event.wheelDelta) {
      /* IE/Opera. */
      delta = event.wheelDelta / 120;
    } else if (event.detail) {
      /** Mozilla case. */
      /* In Mozilla, sign of delta is different than in IE.
       * Also, delta is multiple of 3. */
      delta = -event.detail / 3;
    }
    /* Prevent default actions caused by mouse wheel. It might be ugly */
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    /* If delta is nonzero, handle it, otherwise scrap it Basically, delta is now positive if
    wheel was scrolled up, and negative, if wheel was scrolled down. */
    if (delta) return delta;
  };
  /** Detect right click */
  scope.isRightClick = function (event) {
    var rightclick;

    event = event ? event : window.event; /* For IE. */
    if (event.buttons) rightclick = event.buttons == 2;else if (event.which) rightclick = event.which == 3;else if (event.button) rightclick = event.button == 2;

    if (rightclick) return true;

    return false;
  };
  return scope;
})();
exports.mouseUtils = mouseUtils;
var resizeUtils = {
  toggleFullScreen: function toggleFullScreen() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = document.fullScreenElement && document.fullScreenElement !== null || (document.mozFullScreen || document.webkitIsFullScreen);

    isInFullScreen ? cancelFullScreen(document) : requestFullScreen(elem);

    return false;

    // Sub functions
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
  },
  setToFullSize: function setToFullSize(context) {
    return function fullSize() {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
    };
  }
};

exports.resizeUtils = resizeUtils;
var listeners = (function () {
  var LISTENER_TYPES = {
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
    } };
  var _eventListeners = _getEmptyEventListenerArray();
  var scope = {};

  scope.setOne = function setOne(action, callback) {
    /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
    _eventListeners[action].push(callback);
    this[LISTENER_TYPES[action].element].addEventListener(LISTENER_TYPES[action].event, callback);

    return this;
  };
  scope.removeOne = function removeOne(type, origCallback) {
    var _this = this;

    if (typeof type === "string") {
      if (origCallback) {
        this[LISTENER_TYPES[type].element].removeEventListener(LISTENER_TYPES[type].event, origCallback);
        return;
      }

      throw new Error("no callback specified! - 1");
    } else if (type instanceof Array) {
      type.forEach(function (thisType) {
        if (origCallback) {
          _this[LISTENER_TYPES[thisType].element].removeEventListener(LISTENER_TYPES[thisType].event, origCallback);
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

    Object.keys(LISTENER_TYPES).forEach(function (type) {
      objects[type] = [];
    });

    return objects;
  }
})();
exports.listeners = listeners;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilsUtilsJs = require('../utils/utils.js');

var _eventlisteners = require('../eventlisteners');

'user strict';

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

var map_zoom = (function map_zoom() {
  var scope = {};
  var zoomLimit = {
    farther: 0.4,
    closer: 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;

  scope.pluginName = map_zoom.name;

  /**
  * @param {Map object} mapObj - the Map class object
  */
  scope.init = function (map) {
    map.setPrototype('zoomIn', zoomIn);
    map.setPrototype('zoomOut', zoomOut);
    map.setPrototype('setZoomLimits', setZoomLimits);
    map.setPrototype('setZoomModifier', setZoomModifier);

    map.eventCBs.zoom = _setupZoomEvent(map);

    eventlisteners = (0, _eventlisteners.eventListeners)(map.eventCBs);
    eventlisteners.toggleZoomListener();
  };

  return scope;

  /** ==== PROTOTYPE extensions for map */
  function setZoomModifier(amount) {
    zoomModifier = amount;

    return this;
  }
  function setZoomLimits(farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  function zoomIn(amount) {
    if (_isOverZoomLimit(amount)) this.getLayersWithAttributes('zoomable', true).forEach(function (layer) {
      layer.scaleX -= zoomModifier;
      layer.scaleY -= zoomModifier;
    });

    return this;
  }
  function zoomOut(amount) {
    if (_isOverZoomLimit(amount)) this.getLayersWithAttributes('zoomable', true).forEach(function (layer) {
      layer.scaleX += zoomModifier;
      layer.scaleY += zoomModifier;
    });

    return this;
  }

  /* ===== Private functions ===== */
  function _isOverZoomLimit(amount) {
    if (amount > zoomLimit.farther && amount < zoomLimit.closer) {
      return false;
    }

    return true;
  }
  function _setupZoomEvent(map) {
    return function handleZoomEvent(event) {
      var mouseWheelDelta = _utilsUtilsJs.mouseUtils.deltaFromWheel(event);

      if (mouseWheelDelta > 0) {
        map.zoomIn();
      } else if (mouseWheelDelta < 0) {
        map.zoomOut();
      }

      map.drawOnNextTick();
    };
  }
})();
exports.map_zoom = map_zoom;

},{"../eventlisteners":11,"../utils/utils.js":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setupHexagonClick = setupHexagonClick;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loggerLogJs = require('../../../logger/log.js');

var _loggerLogJs2 = _interopRequireDefault(_loggerLogJs);

var _coreEventlisteners = require('../../core/eventlisteners');

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

function setupHexagonClick(map, callback) {
  eventlisteners = (0, _coreEventlisteners.eventListeners)(map.eventCBs);

  map.eventCBs.select = mouseDownListener;
  eventlisteners.toggleSelectListener();

  //return onMouseDown(map, callback);

  return false;

  function mouseDownListener() {
    onMouseUp(map, callback);
  }
}

function onMouseUp(map, callback) {
  map.canvas.addEventListener('mouseup', retrieveClickData);

  function retrieveClickData(e) {
    if (map.mapMoved()) {
      map.canvas.removeEventListener('mouseup', retrieveClickData);
      return false;
    }
    var globalCoords = { x: e.x, y: e.y };
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }

    map.canvas.removeEventListener('mouseup', retrieveClickData);
  }
}

},{"../../../logger/log.js":4,"../../core/eventlisteners":11}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _coreObject = require('../../core/Object');

var _utilsCreateHexagon = require('../utils/createHexagon');

var _utilsHexagonMath = require('../utils/hexagonMath');

var _utilsHexagonMath2 = _interopRequireDefault(_utilsHexagonMath);

var shape;

var Object_sprite_hexa = (function (_Object_sprite) {
  function Object_sprite_hexa(_x, data, spritesheet, currentFrameNumber) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var extra = arguments[4] === undefined ? { radius: 0 } : arguments[4];

    _classCallCheck(this, Object_sprite_hexa);

    var shape;

    var HEIGHT = _utilsHexagonMath2['default'].calcHeight(extra.radius);
    var SIDE = _utilsHexagonMath2['default'].calcSide(extra.radius);

    _get(Object.getPrototypeOf(Object_sprite_hexa.prototype), 'constructor', this).call(this, coords, data, spritesheet, currentFrameNumber);

    var hexagonSize = _utilsHexagonMath2['default'].getHexaSize(extra.radius);
    this.regX = hexagonSize.x / 2;
    this.regY = hexagonSize.y / 2;
    this.HEIGHT = HEIGHT;
    this.SIDE = SIDE;

    if (!extra.radius) {
      throw new Error('Need radius!');
    }

    /* Draw hexagon to test the hits with hitArea */
    this.hitArea = setAndGetShape(extra.radius);
  }

  _inherits(Object_sprite_hexa, _Object_sprite);

  _createClass(Object_sprite_hexa, null, [{
    key: 'getShape',
    value: function getShape() {
      return shape;
    }
  }]);

  return Object_sprite_hexa;
})(_coreObject.Object_sprite);

exports.Object_sprite_hexa = Object_sprite_hexa;

function setAndGetShape(radius) {
  if (!shape) {
    var hexagonSize = _utilsHexagonMath2['default'].getHexaSize(radius);
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = (0, _utilsCreateHexagon.createHexagon)({ x: hexagonSize.y / 2, y: hexagonSize.x / 2 }, radius);
  }

  return shape;
}

},{"../../core/Object":8,"../utils/createHexagon":21,"../utils/hexagonMath":22}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Object_hexa = require('./Object_hexa');

var Object_terrain_hexa = (function (_Object_sprite_hexa) {
  function Object_terrain_hexa() {
    _classCallCheck(this, Object_terrain_hexa);

    if (_Object_sprite_hexa != null) {
      _Object_sprite_hexa.apply(this, arguments);
    }
  }

  _inherits(Object_terrain_hexa, _Object_sprite_hexa);

  _createClass(Object_terrain_hexa, [{
    key: 'construct',
    value: function construct() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(Object_terrain_hexa.prototype), 'spriteSheet', this).apply(this, args);

      this.name = 'DefaultTerrainObject_hexa';
    }
  }]);

  return Object_terrain_hexa;
})(_Object_hexa.Object_sprite_hexa);

exports.Object_terrain_hexa = Object_terrain_hexa;

},{"./Object_hexa":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Object_hexa = require('./Object_hexa');

var Object_unit_hexa = (function (_Object_sprite_hexa) {
  function Object_unit_hexa() {
    _classCallCheck(this, Object_unit_hexa);

    if (_Object_sprite_hexa != null) {
      _Object_sprite_hexa.apply(this, arguments);
    }
  }

  _inherits(Object_unit_hexa, _Object_sprite_hexa);

  _createClass(Object_unit_hexa, [{
    key: 'construct',
    value: function construct() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(Object_unit_hexa.prototype), 'spriteSheet', this).apply(this, args);

      this.name = 'DefaultUnitObjects_hexa';
    }
  }]);

  return Object_unit_hexa;
})(_Object_hexa.Object_sprite_hexa);

exports.Object_unit_hexa = Object_unit_hexa;

},{"./Object_hexa":17}],20:[function(require,module,exports){
/*Calculate the coordinates of the center hexagon always and get objects based on the coordinates. For example with
  some method like getAllObjectsInHexagon.
SO:
We create a function for layers, like "map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)"
- There we only find out about the coordinates for the object, we dont use getOBjectUnderPoint. If the coords equal to
those gotten from: getHexagonCoordsFromClick, then that object is added to returned array. We can also cache these if
needed for performance

HOW we do the whole organizational stuff?
- map_move
- map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
//import { map_coords_horizontalHex } from '../coordinates/Map_coords_horizontalHex';

var _eventListenersSelect = require('../eventListeners/select');

var _coreUI = require('../../core/UI');

var _coreMap_layer = require('../../core/Map_layer');

var object_select_hexagon = (function object_select_hexagon() {
  var scope = {};
  scope.pluginName = 'object_select';

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (mapObj) {
    /* We take the top-most stage on the map and add the listener to it */
    _createPrototypes(mapObj);

    _startClickListener(mapObj);
  };

  return scope;

  function getObjectsForMap(clickCoords) {
    var objects = this._stage.getObjectsUnderPoint(clickCoords.x, clickCoords.y);

    return objects;
  }
  function getObjectsForLayer(clickCoords) {
    return this.children.filter(function (child) {
      if (child.x === clickCoords.x && child.y === clickCoords.y) {
        return true;
      }

      return false;
    });
  }
  /* ====== Private functions ====== */
  /**
   * Attached the correct prototypes to map. I do not think we need to override getObjectsUnderPoint for stages.
   *
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _createPrototypes(map) {
    map.__proto__.getObjectsUnderMapPoint = getObjectsForMap;
    _coreMap_layer.Map_layer.__proto__.getObjectsUnderPoint = getObjectsForLayer;
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener(map, canvas) {
    var singletonUI = (0, _coreUI.UI)();

    return (0, _eventListenersSelect.setupHexagonClick)(map, singletonUI.showSelections);
  }
})();
exports.object_select_hexagon = object_select_hexagon;

},{"../../core/Map_layer":6,"../../core/UI":9,"../eventListeners/select":16}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHexagon = createHexagon;

function createHexagon(_x, radius) {
  var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
  var angle = arguments[2] === undefined ? 30 : arguments[2];

  var shape = new createjs.Shape();
  var color = "#444444";
  var pointSize = 0;

  shape.graphics.beginFill(color).drawPolyStar(coords.x, coords.y, radius, 6, pointSize, angle);

  return shape;
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHeight = calcHeight;
exports.calcSide = calcSide;
exports.setCellByPoint = setCellByPoint;
exports.getHexaSize = getHexaSize;
exports.toHexaCenterCoord = toHexaCenterCoord;
/* NOTE: These calculations are for vertical hexagons */

function calcHeight(radius) {
  return radius * Math.sqrt(3);
}

function calcSide(radius) {
  return radius * 3 / 2;
}

/* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
   This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked */

function setCellByPoint(radius, x, y) {
  var HEIGHT = radius * Math.sqrt(3);
  var SIDE = radius * 3 / 2;

  var ci = Math.floor(x / SIDE);
  var cx = x - SIDE * ci;

  var ty = y - ci % 2 * HEIGHT / 2;
  var cj = Math.floor(ty / HEIGHT);
  var cy = ty - HEIGHT * cj;

  if (cx > Math.abs(radius / 2 - radius * cy / HEIGHT)) {
    return {
      x: ci,
      y: cj
    };
  } else {
    return {
      x: ci - 1,
      y: cj + ci % 2 - (cy < HEIGHT / 2 ? 1 : 0)
    };
  }
}

function getHexaSize(radius) {
  return {
    radius: radius,
    x: radius * 2,
    y: radius * Math.sqrt(3)
  };
}

function toHexaCenterCoord(hexRadius, x, y) {
  var hexaSize = getHexaSize(hexRadius);
  var radius = hexaSize.radius;
  var halfHexaSize = {
    x: hexaSize.radius,
    y: hexaSize.y * 0.5
  };
  var centerCoords = {};
  var coordinateIndexes;

  coordinateIndexes = setCellByPoint(radius, x, y);

  if (coordinateIndexes.x < 0 && coordinateIndexes.x < 0) {
    throw new Error("click outside of the hexagon area");
  }
  centerCoords = {
    x: Math.round(coordinateIndexes.x * hexaSize.x + halfHexaSize.x),
    y: Math.round(coordinateIndexes.y * hexaSize.y + halfHexaSize.y)
  };

  return centerCoords;
}

;

exports["default"] = {
  calcHeight: calcHeight,
  calcSide: calcSide,
  setCellByPoint: setCellByPoint,
  getHexaSize: getHexaSize,
  toHexaCenterCoord: toHexaCenterCoord
};

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/*
Creating the createjsQueue-object from spritesheet. This preloads assests.

@requires createjs Createjs library / framework object - global object
@param {string} basePath
@todo Make a loader graphics / notifier when loading assets using preloader.

Usage: preload.generate("http://path.fi/path").onComplete().then(function() {});
*/

var preload = (function (_createjs$LoadQueue) {
  function preload() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, preload);

    _get(Object.getPrototypeOf(preload.prototype), "constructor", this).apply(this, args);
  }

  _inherits(preload, _createjs$LoadQueue);

  _createClass(preload, [{
    key: "resolveOnComplete",
    value: function resolveOnComplete() {
      var bindedOnComplete = _onComplete.bind(this);
      var promise = new Promise(bindedOnComplete);

      return promise;

      function _onComplete(resolve) {
        this.on("complete", function () {
          resolve(true);
        });
      }
    }
  }, {
    key: "loadManifest",
    value: function loadManifest() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(Object.getPrototypeOf(preload.prototype), "loadManifest", this).apply(this, args);

      return this;
    }
  }, {
    key: "setErrorHandler",
    value: function setErrorHandler(errorCB) {
      this.on("error", errorCB);

      return this;
    }
  }, {
    key: "setProgressHandler",
    value: function setProgressHandler(progressCB) {
      this.on("error", progressCB);

      return this;
    }
  }, {
    key: "activateSound",
    value: function activateSound() {
      this.installPlugin(createjs.Sound);
    }
  }]);

  return preload;
})(createjs.LoadQueue);

exports.preload = preload;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameData = {
  ID: "53837d47976fed3b24000005",
  turn: 1,
  mapSize: { x: 50, y: 20 },
  pluginsToActivate: {
    map: ["map_drag", "object_select_hexagon"]
  }
};
exports.gameData = gameData;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mapData = {
  gameID: "53837d47976fed3b24000005",
  turn: 1,
  startPoint: { x: 0, y: 0 },
  element: "#mapCanvas",
  layers: [{
    type: "Map_layer",
    coord: { x: 0, y: 0 },
    name: "terrainBaseLayer",
    specials: [{
      "interactive": false
    }],
    options: {
      cache: true
    },
    objectGroups: [{
      type: "Object_terrain",
      name: "TerrainBase", // I guess only for debugging?
      typeImageData: "terrainBase",
      objects: [{
        "objType": 0,
        "name": "swamp",
        "_id": "53837d49976fed3b240006b8",
        "coord": {
          "x": "0",
          "y": "0"
        },
        "data": {},
        "lastSeenTurn": "1"
      }, {
        "objType": 1,
        "name": "swamp",
        "_id": "53837d49976fed3b240006bd",
        "coord": {
          "x": "0",
          "y": "140"
        },
        "data": {},
        "lastSeenTurn": "1"
      }, {
        "objType": 2,
        "name": "tundra",
        "_id": "53837d49976fed3b240006c2",
        "coord": {
          "x": "41",
          "y": "70"
        },
        "data": {},
        "lastSeenTurn": "1"
      }, {
        "objType": 3,
        "name": "forest",
        "_id": "53837d49976fed3b240006c7",
        "coord": {
          "x": "82",
          "y": "140"
        },
        "data": {},
        "lastSeenTurn": "1"
      }]
    }]
  }, {
    "type": "Map_layer",
    "coord": { "x": "0", "y": "0" },
    "name": "unitLayer",
    "options": {
      "cache": "false"
    },
    "objectGroups": [{
      "type": "Object_unit",
      "name": "Unit", // I guess only for debugging?
      "typeImageData": "unit",
      "objects": [{
        "objType": 0,
        "name": "Horsey the wild",
        "coord": {
          "x": "41", "y": "70"
        },
        "data": {
          "someCustomData": "true"
        },
        "lastSeenTurn": "1"
      }]
    }]
  }]
};
exports.mapData = mapData;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = {
  "graphicData": {
    "general": {
      "terrain": {
        "tileWidth": 82,
        "tileHeight": 94
      }
    },
    "terrainBase": {
      "images": ["/assets/img/map/testHexagons/testHexagonSpritesheet.png"],
      "frames": [[0, 0, 82, 94], [82, 0, 82, 94], [164, 0, 82, 94], [246, 0, 82, 94]],
      "imageSize": [82, 94]
    },
    "terrain": {
      "images": ["/assets/img/map/amplio2/terrain1.png"],
      "frames": [[1, 1, 96, 48], [1, 50, 96, 48], [1, 99, 96, 48], [1, 148, 96, 48], [1, 197, 96, 48], [1, 246, 96, 48], [1, 295, 96, 48], [1, 344, 96, 48], [1, 393, 96, 48]],
      "imageSize": [96, 48]
    },
    "dither": { "images": ["/assets/img/map/dither2.png"], "frames": [[0, 0, 96, 48]], "imageSize": [96, 48] },
    "prettifier": {
      "images": ["/assets/img/map/amplio2/mountains.png", "/assets/img/map/amplio2/hills.png", "/assets/img/map/amplio2/terrain2.png"],
      "frames": [[1, 1, 96, 66, 0, 0, 18], [1, 1, 96, 48, 1, -4, 4], [1, 148, 96, 48, 2]]
    },
    "resource": {
      "images": ["/assets/img/map/resources/terrain1.png"],
      "frames": [[195, 1, 96, 48], [389, 1, 96, 48]]
    },
    "place": {},
    "city": {
      "images": ["/assets/img/map/amplio2/medievalcities.png"],
      "frames": [[1, 1, 96, 72], [98, 1, 96, 72], [195, 1, 96, 72], [292, 1, 96, 72], [389, 1, 96, 72], [485, 1, 96, 72], [582, 1, 96, 72], [679, 1, 96, 72], [776, 1, 96, 72], [873, 1, 96, 72], [1, 74, 96, 72], [98, 74, 96, 72], [195, 74, 96, 72], [292, 74, 96, 72], [389, 74, 96, 72], [485, 74, 96, 72], [582, 74, 96, 72], [679, 74, 96, 72], [776, 74, 96, 72], [873, 74, 96, 72]]
    }, "building": {
      "images": ["/assets/img/map/isophex/terrain1.png"],
      "frames": [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]]
    }, "modifier": {
      "images": ["/assets/img/map/isophex/terrain1.png"],
      "frames": [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]]
    },
    "unit": {
      "images": ["/assets/img/map/units/testHexagonUnits.png"],
      "frames": { "width": 82, "height": 94 }
    }
  },
  "objectData": {
    "unit": [{
      "name": "tank",
      "desc": "Vrooom...",
      "image": "0",
      "att": "Good",
      "def": "Poor",
      "siege": "Decent",
      "initiate": "90",
      "move": "100",
      "morale": "Average",
      "vision": "150",
      "influenceArea": "30"
    }, {
      "name": "carrier", "desc": "angry beehive", "image": "6", "att": "1", "def": "2", "siege": "2", "initiate": "110", "move": "100", "morale": "Average", "vision": "250", "influenceArea": "30",
      "modifiers": {
        "unit": {
          "_enemy_": [{
            "from": "thisOnePlace",
            "modifiers": {
              "morale": "suffers morale drop"
            } }] } } }, {
      "name": "cavalry", "desc": "Give me an apple!", "image": "26", "att": "3", "def": "1", "siege": "0", "initiate": "50", "move": "300", "morale": "Average", "vision": "100", "influenceArea": "30"
    }],
    "terrainBase": [{
      "image": "0", "attachedToTerrains": ["0"], "propability": "100%", "name": "forDebugging - terrainBase 0"
    }, {
      "image": "1", "attachedToTerrains": ["2"], "propability": "100%", "name": "forDebugging - terrainBase 1"
    }, {
      "image": "2", "attachedToTerrains": ["1"], "propability": "100%", "name": "forDebugging - terrainBase 2"
    }, {
      "image": "3", "attachedToTerrains": ["4"], "propability": "100%", "name": "forDebugging - terrainBase 3"
    }, {
      "image": "4", "attachedToTerrains": ["5"], "propability": "100%", "name": "forDebugging - terrainBase 4"
    }, {
      "image": "5", "attachedToTerrains": ["3"], "propability": "100%", "name": "forDebugging - terrainBase 5"
    }],
    "terrain": [{
      "name": "desert", "image": "0", "desc": "very dry land",
      "modifiers": {
        "City": {
          "_player_": [{
            "from": "thisOnePlace",
            "modifiers": {
              "production": "Provides +1 food for cities"
            } }] } } }, {
      "name": "plain", "image": "1", "desc": "Buffalo roaming area",
      "modifiers": {
        "City": {
          "_player_": [{
            "from": "thisOnePlace", "modifiers": {
              "production": "Provides +12% food for cities"
            } }] } } }, {
      "name": "forest", "image": "2", "desc": "Robin hood likes it here",
      "modifiers": {
        "Unit": {
          "_player_": [{
            "from": "thisOnePlace", "modifiers": { "defend": "Unit defend +2"
            } }] } } }, {
      "name": "tundra", "desc": "Siberia teaches you", "image": "6"
    }, {
      "name": "arctic", "desc": "Your ball will freeze of", "image": "7"
    }, {
      "name": "swamp", "desc": "Cranberries and cloudberries", "image": "8"
    }],
    "dither": [{ "image": "0", "attachedToTerrains": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "propability": "100%" }],
    "prettifier": [{ "image": "0", "zIndex": "1", "attachedToTerrains": ["3"], "propability": "25%" }, { "image": "1", "zIndex": "1", "attachedToTerrains": ["1"], "propability": "40%" }, { "image": "2", "zIndex": "0", "attachedToTerrains": ["2"], "propability": "60%" }], "resource": [{ "name": "Oasis", "image": "0", "desc": "Oasis in the middle of desert, or not atm.", "modifiers": { "City": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "food production 5 / week" } }] } }, "attachedToTerrains": ["0"], "influenceArea": 50 }, { "name": "Oil", "image": "1", "desc": "Black gold", "modifiers": { "City": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "There is a lot of oil here" } }] } }, "attachedToTerrains": ["0", "4"], "influenceArea": 50 }], "city": [{ "name": "Medieval", "vision": "100", "image": "0", "influenceArea": 50 }, { "name": "Medieval2", "vision": "100", "image": "1", "influenceArea": 50 }], "place": [], "building": [{ "name": "Barracks", "image": "0", "tooltip": "Enables troop recruitment" }, { "name": "Factory", "image": "1", "tooltip": "Produces weaponry" }], "government": [{ "name": "Democrazy", "description": "well it's a democrazy :)", "tooltip": "Gives +20% happiness", "image": "0", "requirements": [], "possibleNatValues": [0, 1], "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "happiness": "20%" } }] } } } }, { "name": "Communism", "description": "You know the one used in the great USSR and inside the great firewall of China", "tooltip": "Gives production bonuses", "image": "0", "requirements": [], "possibleNatValues": [2, 3], "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": {} }] } }, "City": { "building": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "20%" } }] } } } }], "politics": { "taxRate": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "corruption": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "alignment": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "happiness": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "revoltRisk": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "unity": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "natValue": [{ "name": "Integrity", "tooltip": "Government and populations shows integrity and trustworthiness", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "internalRelations": "+10%", "diplomacy": "+10%", "revolt risk": "-5%", "relationsToElite": "-20%" } }] } } } }, { "name": "Capitalism", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "diplomacy": "+5%", "relationsToElite": "+5%", "morale": "+5%" } }] } } } }, { "name": "Hardworking", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "productivity": "+10%", "happiness": "+5%", "relationsToElite": "+5%" } }] } } } }, { "name": "Leadership", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "productivity": "+5%", "happiness": "-5%", "relationsToElite": "+5%", "trading": "+10%" } }] } } } }] } }
};
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL21hbnVhbC9jcmVhdGVNYXAtdGVzdC5lczYuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbG9nZ2VyL2xvZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL2V2ZW50bGlzdGVuZXJzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL3V0aWxzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3pvb20vbWFwX3pvb20uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL2V2ZW50TGlzdGVuZXJzL3NlbGVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF91bml0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy91dGlscy9oZXhhZ29uTWF0aC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvZ2FtZURhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvbWFwRGF0YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvdGVzdHMvZGF0YS90eXBlRGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O3dEQUthLGtEQUFrRDs7Ozs2Q0FHbkQseUNBQXlDOzs2Q0FDekMseUNBQXlDOzt1RUFDNUIsbUVBQW1FOzs7O2lDQUdoRiwyQkFBMkI7O2lDQUMzQiwyQkFBMkI7O2dDQUM1QiwwQkFBMEI7OzhDQUMxQix3Q0FBd0M7O0FBRWhFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWTtBQUMzQixNQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELE1BQUksR0FBRyxDQUFDOztBQUVSLEtBQUcsR0FBRyw4Q0FqQkMsU0FBUyxFQWlCQSxhQUFhLHFCQVR0QixRQUFRLG9CQUVSLE9BQU8scUJBRFAsUUFBUSxDQVE0QyxDQUFDOztBQUU1RCxNQUFJLElBQUksR0FBRyxvQ0FSSixPQUFPLENBUVUsS0FBSyxDQUFFLENBQUM7QUFDaEMsTUFBSSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDOztBQUU1QyxNQUFJLENBQUMsWUFBWSxDQUFDLENBQUU7QUFDbEIsTUFBRSxFQUFFLHFCQUFxQjtBQUN6QixPQUFHLEVBQUMsc0ZBQXNGO0dBQzNGLEVBQUM7QUFDQSxNQUFFLEVBQUUsa0JBQWtCO0FBQ3RCLE9BQUcsRUFBQyxnRUFBZ0U7R0FDckUsQ0FBQyxDQUFDLENBQUM7QUFDSixNQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDckIsSUFBSSxDQUFDLFlBQVc7QUFDZixXQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDakUsT0FBRyxDQUFDLElBQUksQ0FBRSxnQ0E1QlAsUUFBUSxpQ0FEUixRQUFRLDJEQUVSLHFCQUFxQixDQTJCK0IsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBRSxDQUFDO0dBQ3hGLENBQUMsQ0FBQzs7QUFFTCxTQUFPLEdBQUcsQ0FBQzs7O0FBR1gsV0FBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUUsQ0FBQztHQUN0QztDQUNGLENBQUM7OztBQzlDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUM1UjtLQUNGLEVBQUMsVUFBVSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDdkk7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0Y7QUFDRCxVQUFNLEVBQUM7QUFDTCxjQUFRLEVBQUMsQ0FBQyw0Q0FBNEMsQ0FBQztBQUN2RCxjQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUM7S0FDbEM7R0FDRjtBQUNELGNBQVksRUFBRTtBQUNaLFVBQU0sRUFBQyxDQUFDO0FBQ0osWUFBTSxFQUFDLE1BQU07QUFDYixZQUFNLEVBQUMsV0FBVztBQUNsQixhQUFPLEVBQUMsR0FBRztBQUNYLFdBQUssRUFBQyxNQUFNO0FBQ1osV0FBSyxFQUFDLE1BQU07QUFDWixhQUFPLEVBQUMsUUFBUTtBQUNoQixnQkFBVSxFQUFDLElBQUk7QUFDZixZQUFNLEVBQUMsS0FBSztBQUNaLGNBQVEsRUFBQyxTQUFTO0FBQ2xCLGNBQVEsRUFBQyxLQUFLO0FBQ2QscUJBQWUsRUFBQyxJQUFJO0tBQ3JCLEVBQUM7QUFDQSxZQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLGVBQWUsRUFBQyxJQUFJO0FBQ3hLLGlCQUFXLEVBQUM7QUFDVixjQUFNLEVBQUM7QUFDTCxtQkFBUyxFQUFDLENBQUM7QUFDVCxrQkFBTSxFQUFDLGNBQWM7QUFDckIsdUJBQVcsRUFBQztBQUNWLHNCQUFRLEVBQUMscUJBQXFCO2FBQ3ZDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDO0FBQ0wsWUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLGVBQWUsRUFBQyxJQUFJO0tBQy9LLENBQUM7QUFDRixpQkFBYSxFQUFDLENBQUM7QUFDWCxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3BHLEVBQUM7QUFDQSxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3BHLEVBQUM7QUFDQSxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3BHLEVBQUM7QUFDQSxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3BHLEVBQUM7QUFDQSxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3BHLEVBQUM7QUFDQSxhQUFPLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsOEJBQThCO0tBQ3RHLENBQUM7QUFDRixhQUFTLEVBQUMsQ0FBQztBQUNQLFlBQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsZUFBZTtBQUNsRCxpQkFBVyxFQUFDO0FBQ1YsY0FBTSxFQUFDO0FBQ0wsb0JBQVUsRUFBQyxDQUFDO0FBQ1Isa0JBQU0sRUFBQyxjQUFjO0FBQ3JCLHVCQUFXLEVBQUM7QUFDViwwQkFBWSxFQUFDLDZCQUE2QjthQUNyRCxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQztBQUNMLFlBQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsc0JBQXNCO0FBQ3hELGlCQUFXLEVBQUM7QUFDVixjQUFNLEVBQUM7QUFDTCxvQkFBVSxFQUFDLENBQUM7QUFDUixrQkFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUM7QUFDaEMsMEJBQVksRUFBQywrQkFBK0I7YUFDdkQsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUM7QUFDTCxZQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLDBCQUEwQjtBQUM3RCxpQkFBVyxFQUFDO0FBQ1YsY0FBTSxFQUFDO0FBQ0wsb0JBQVUsRUFBQyxDQUFDO0FBQ1Isa0JBQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLGdCQUFnQjthQUNyRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQztBQUNILFlBQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLE9BQU8sRUFBQyxHQUFHO0tBQ3pELEVBQUM7QUFDQSxZQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsR0FBRztLQUM5RCxFQUFDO0FBQ0EsWUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFDLEdBQUc7S0FDakUsQ0FBQztBQUNOLFlBQVEsRUFBQyxDQUNQLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsQ0FBQztBQUNwRyxnQkFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsNENBQTRDLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQywwQkFBMEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsWUFBWSxFQUFDLDRCQUE0QixFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLDJCQUEyQixFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDLDBCQUEwQixFQUFDLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGNBQWMsRUFBQyxFQUFFLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDLGdGQUFnRixFQUFDLFNBQVMsRUFBQywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGNBQWMsRUFBQyxFQUFFLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxnRUFBZ0UsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQztDQUNuOEgsQ0FBQztRQTlIUyxRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL2hvcml6b250YWxIZXhhRmFjdG9yeSc7XG5cbi8qID09PT09IEltcG9ydCBwbHVnaW5zID09PT09ICovXG5pbXBvcnQgeyBtYXBfZHJhZyB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWdcIjtcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAvY29yZS96b29tL21hcF96b29tJztcbmltcG9ydCB7IG9iamVjdF9zZWxlY3RfaGV4YWdvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uJztcblxuLyogREFUQSBGSUxFUyB1c2VkIGZvciB0ZXN0aW5nICovXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ2FtZURhdGEnO1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3R5cGVEYXRhJztcbmltcG9ydCB7IG1hcERhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL21hcERhdGEnO1xuaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxud2luZG93LmluaXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIHZhciBtYXA7XG5cbiAgbWFwID0gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG5cbiAgbGV0IHByZWwgPSBuZXcgcHJlbG9hZCggZmFsc2UgKTtcbiAgcHJlbC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKTtcbiAgICAvLy5zZXRQcm9ncmVzc0hhbmRsZXIoIHByb2dyZXNzSGFuZGxlciApXG4gIHByZWwubG9hZE1hbmlmZXN0KFsge1xuICAgIGlkOiBcInRlcnJhaW5fc3ByaXRlc2hlZXRcIixcbiAgICBzcmM6XCJodHRwOi8vd2FybWFwZW5naW5lLmxldmVsNy5maS9hc3NldHMvaW1nL21hcC90ZXN0SGV4YWdvbnMvdGVzdEhleGFnb25TcHJpdGVzaGVldC5wbmdcIlxuICB9LHtcbiAgICBpZDogXCJ1bml0X3Nwcml0ZXNoZWV0XCIsXG4gICAgc3JjOlwiaHR0cDovL3dhcm1hcGVuZ2luZS5sZXZlbDcuZmkvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi91bml0cy5wbmdcIlxuICB9XSk7XG4gIHByZWwucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJwcmVsb2FkaW5nIGNvbXBsZXRlPyBNYXAgc2hvdWxkIGJlIHJlYWR5IHRvIGluaXQ/XCIpO1xuICAgICAgbWFwLmluaXQoIFsgbWFwX3pvb20sIG1hcF9kcmFnLCBvYmplY3Rfc2VsZWN0X2hleGFnb24gXSwgeyB4OiA0MSwgeTogNDcgfSwgdW5kZWZpbmVkICk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcblxuICAgIC8qID09PT09PSBwcml2YXRlIGZ1bmN0aW9ucywgb3IgdG8gYmUgbW92ZWQgZWxzZXdoZXJlID09PT09PSAqL1xuICBmdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiUFJFTE9BREVSIEVSUk9SXCIsIGVyciApO1xuICB9XG59OyIsIi8qXG4gKiBKYXZhU2NyaXB0IE1ENSAxLjAuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKiBcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cblxuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSAqL1xuLypnbG9iYWwgdW5lc2NhcGUsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKlxuICAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICAgICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpIHtcbiAgICAgICAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKSxcbiAgICAgICAgICAgIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICAgICAgICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICAgICovXG4gICAgZnVuY3Rpb24gYml0X3JvbChudW0sIGNudCkge1xuICAgICAgICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBtZDVfY21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksIGIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgZCkgfCAoYyAmICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2lpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICAgICovXG4gICAgZnVuY3Rpb24gYmlubF9tZDUoeCwgbGVuKSB7XG4gICAgICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gICAgICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKTtcbiAgICAgICAgeFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuO1xuXG4gICAgICAgIHZhciBpLCBvbGRhLCBvbGRiLCBvbGRjLCBvbGRkLFxuICAgICAgICAgICAgYSA9ICAxNzMyNTg0MTkzLFxuICAgICAgICAgICAgYiA9IC0yNzE3MzM4NzksXG4gICAgICAgICAgICBjID0gLTE3MzI1ODQxOTQsXG4gICAgICAgICAgICBkID0gIDI3MTczMzg3ODtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIG9sZGEgPSBhO1xuICAgICAgICAgICAgb2xkYiA9IGI7XG4gICAgICAgICAgICBvbGRjID0gYztcbiAgICAgICAgICAgIG9sZGQgPSBkO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDcsIC02ODA4NzY5MzYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNywgIDYwNjEwNTgxOSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNywgLTE3NjQxODg5Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA1XSwgMTIsICAxMjAwMDgwNDI2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA3LCAgMTc3MDAzNTQxNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA3LCAgMTgwNDYwMzY4Mik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDUsIC0xNjU3OTY1MTApO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgNl0sICA5LCAtMTA2OTUwMTYzMik7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsICA2NDM3MTc3MTMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2ldLCAgICAgIDIwLCAtMzczODk3MzAyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNSwgLTcwMTU1ODY5MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgIDksICAzODAxNjA4Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNSwgIDU2ODQ0NjQzOCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgIDksIC0xMDE5ODAzNjkwKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA4XSwgMjAsICAxMTYzNTMxNTAxKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgMl0sICA5LCAtNTE0MDM3ODQpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE0LCAgMTczNTMyODQ3Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA0LCAtMzc4NTU4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA0LCAgNjgxMjc5MTc0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpXSwgICAgICAxMSwgLTM1ODUzNzIyMik7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgNl0sIDIzLCAgNzYwMjkxODkpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA0LCAtNjQwMzY0NDg3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsICA1MzA3NDI1MjApO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgMl0sIDIzLCAtOTk1MzM4NjUxKTtcblxuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA2LCAtMTk4NjMwODQ0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDddLCAxMCwgIDExMjY4OTE0MTUpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDYsICAxNzAwNDg1NTcxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNiwgLTE0NTUyMzA3MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNSwgIDcxODc4NzI1OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuXG4gICAgICAgICAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgICAgICAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgICAgICAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgICAgICAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sMnJzdHIoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDMyOyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChpbnB1dFtpID4+IDVdID4+PiAoaSAlIDMyKSkgJiAweEZGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gICAgKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyYmlubChpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xuICAgICAgICBvdXRwdXRbKGlucHV0Lmxlbmd0aCA+PiAyKSAtIDFdID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBvdXRwdXRbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiA4OyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4RkYpIDw8IChpICUgMzIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGEgcmF3IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9tZDUocykge1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KHJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgSE1BQy1NRDUsIG9mIGEga2V5IGFuZCBzb21lIGRhdGEgKHJhdyBzdHJpbmdzKVxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9obWFjX21kNShrZXksIGRhdGEpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBia2V5ID0gcnN0cjJiaW5sKGtleSksXG4gICAgICAgICAgICBpcGFkID0gW10sXG4gICAgICAgICAgICBvcGFkID0gW10sXG4gICAgICAgICAgICBoYXNoO1xuICAgICAgICBpcGFkWzE1XSA9IG9wYWRbMTVdID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoYmtleS5sZW5ndGggPiAxNikge1xuICAgICAgICAgICAgYmtleSA9IGJpbmxfbWQ1KGJrZXksIGtleS5sZW5ndGggKiA4KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgICAgICAgICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xuICAgICAgICB9XG4gICAgICAgIGhhc2ggPSBiaW5sX21kNShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpO1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBoZXggc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmhleChpbnB1dCkge1xuICAgICAgICB2YXIgaGV4X3RhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJyxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaGV4X3RhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwRikgK1xuICAgICAgICAgICAgICAgIGhleF90YWIuY2hhckF0KHggJiAweDBGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBFbmNvZGUgYSBzdHJpbmcgYXMgdXRmLThcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cjJyc3RyX3V0ZjgoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJhd19tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cl9tZDUoc3RyMnJzdHJfdXRmOChzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X21kNShzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJhd19obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyX2htYWNfbWQ1KHN0cjJyc3RyX3V0ZjgoayksIHN0cjJyc3RyX3V0ZjgoZCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X2htYWNfbWQ1KGssIGQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZDUoc3RyaW5nLCBrZXksIHJhdykge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGV4X21kNShzdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJhd19tZDUoc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuIGhleF9obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhd19obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1kNTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJC5tZDUgPSBtZDU7XG4gICAgfVxufSh0aGlzKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PSAzcmQgcGFydHkgbGlicmFyeSBpbXBvcnRzID09PT09ICovXG4vL2ltcG9ydCB7IFN5c3RlbSB9IGZyb20gJ3N5c3RlbWpzJztcblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcCB9IGZyb20gJy4uL21hcC9jb3JlL01hcCc7XG5pbXBvcnQgeyBPYmplY3RfdGVycmFpbl9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhJztcbmltcG9ydCB7IE9iamVjdF91bml0X2hleGEgfSBmcm9tICcuLi9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF91bml0X2hleGEnO1xuaW1wb3J0IHsgc3ByaXRlc2hlZXRMaXN0IH0gZnJvbSAnLi4vbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0JztcbmxldCBhbGxTcHJpdGVzaGVldHMgPSBzcHJpdGVzaGVldExpc3QoKTtcbmltcG9ydCB7IFVJIH0gZnJvbSAnLi4vbWFwL2NvcmUvVUknO1xuaW1wb3J0IHsgVUlfZGVmYXVsdCB9IGZyb20gXCIuLi9tYXAvY29yZS9VSS9kZWZhdWx0L2RlZmF1bHQuanNcIjtcblxubGV0IGZ1bmN0aW9uc0luT2JqID0ge1xuICBPYmplY3RfdGVycmFpbjogT2JqZWN0X3RlcnJhaW5faGV4YSxcbiAgT2JqZWN0X3VuaXQ6IE9iamVjdF91bml0X2hleGFcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qXG5AYXJndW1lbnQge2JpZ2FzcyBPYmplY3R9IG1hcERhdGEgLSBob2xkcyBhbGwgdGhlIHN0YWdlLCBsYXllciBhbmQgb2JqZWN0IGRhdGEgbmVlZGVkIHRvIGNvbnN0cnVjdCBhIGZ1bGwgbWFwLlxuQ29vcmRpbmF0ZXMgYXJlIGFsd2F5cyBkZWZhdWx0ZWQgdG8gMCwwIGlmIG5vbmUgYXJlIGdpdmVuLlxue1xuICBtYXBTaXplOiBjcmVhdGVqcy5SZWN0YW5nbGUsXG4gIHBsdWdpbnNUb0FjdGl2YXRlOiBbXG4gICAgXCJtYXAvbW92ZS9tYXBfbW92ZVwiLFxuICAgIFwibWFwL0ZPVy9tYXBfRk9XXCJcbiAgXSxcbiAgc3RhZ2VzOiBbe1xuICAgIHR5cGU6IFwibWFwL2NvcmUvTWFwX1N0YWdlXCIsXG4gICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgZWxlbWVudDogXCIjY2FudmFzVGVycmFpblwiLFxuICAgIGxheWVyczogW3tcbiAgICAgIHR5cGU6IFwibWFwL2xheWVycy9NYXBfbGF5ZXJfdGVycmFpblwiLFxuICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICB9LFxuICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV0sXG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpblwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dXG4gICAgICB9XSxcbiAgICAgIHR5cGU6IFwibWFwL2xheWVycy9NYXBfbGF5ZXJfdGVycmFpblwiLFxuICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3VuaXRcIixcbiAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiSW5mYW50cnkgMVwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9XVxuICB9XVxufVxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjYW52YXNFbGVtZW50LCBnYW1lRGF0YUFyZywgbWFwRGF0YUFyZywgdHlwZURhdGFBcmcpIHtcbiAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICB2YXIgbWFwRGF0YSA9ICh0eXBlb2YgbWFwRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKG1hcERhdGFBcmcpIDogbWFwRGF0YUFyZztcbiAgdmFyIHR5cGVEYXRhID0gKHR5cGVvZiB0eXBlRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHR5cGVEYXRhQXJnKSA6IHR5cGVEYXRhQXJnO1xuICB2YXIgZ2FtZURhdGEgPSAodHlwZW9mIGdhbWVEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZ2FtZURhdGFBcmcpIDogZ2FtZURhdGFBcmc7XG4gIHZhciBtYXAgPSBuZXcgTWFwKGNhbnZhc0VsZW1lbnQsIHsgbWFwU2l6ZTogZ2FtZURhdGEubWFwU2l6ZSB9KTtcbiAgdmFyIGRpYWxvZ19zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGlvbkRpYWxvZ1wiKTtcbiAgdmFyIGRlZmF1bHRVSSA9IG5ldyBVSV9kZWZhdWx0KGRpYWxvZ19zZWxlY3Rpb24pO1xuICBkZWZhdWx0VUkuaW5pdCgpO1xuXG4gIC8qIEluaXRpYWxpemUgVUkgYXMgc2luZ2xldG9uICovXG4gIFVJKGRlZmF1bHRVSSwgbWFwKTtcblxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zICovXG4gIC8qIFRoZSBzeXN0ZW0gZG9lcyBub3Qgd29yayA6KFxuICBpZihnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAgJiYgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLmxlbmd0aCA+IDApIHtcbiAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICBnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAubWFwKHggPT4gU3lzdGVtLmltcG9ydCh4KSkpXG4gICAgICAudGhlbigoW21vZHVsZTEsIG1vZHVsZTIsIG1vZHVsZTNdKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcGx1Z2lucyBsb2FkZWRcIik7XG4gICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS5zdGFjayk7XG4gICAgICB9KTtcbiAgfVxuICAqL1xuXG4gIC8qIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZ2l2ZW4gbWFwIGRhdGEgYW5kIGNyZWF0ZSBvYmplY3RzIGFjY29yZGluZ2x5ICovXG4gIG1hcERhdGEubGF5ZXJzLmZvckVhY2goIGxheWVyRGF0YSA9PiB7XG4gICAgbGV0IHRoaXNMYXllcjtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzTGF5ZXIgPSBtYXAuYWRkTGF5ZXIoIGxheWVyRGF0YS5uYW1lLCAyLCBmYWxzZSwgbGF5ZXJEYXRhLmNvb3JkICk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW06XCIsIGxheWVyRGF0YS50eXBlLCBlLnN0YWNrKTtcbiAgICB9XG5cbiAgICBsYXllckRhdGEub2JqZWN0R3JvdXBzLmZvckVhY2goIG9iamVjdEdyb3VwID0+IHtcbiAgICAgIGxldCBzcHJpdGVzaGVldDtcbiAgICAgIGxldCBzcHJpdGVzaGVldFR5cGUgPSBvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhO1xuXG4gICAgICBpZighc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBzcHJpdGVzaGVldFR5cGUtZGF0YVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZihzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgbGV0IHNwcml0ZXNoZWV0RGF0YSA9IHR5cGVEYXRhLmdyYXBoaWNEYXRhW3Nwcml0ZXNoZWV0VHlwZV07XG5cbiAgICAgICAgc3ByaXRlc2hlZXQgPSBhbGxTcHJpdGVzaGVldHMuYWRkU3ByaXRlc2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICAgIH1cblxuICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICBsZXQgb2JqVHlwZURhdGEgPSB0eXBlRGF0YS5vYmplY3REYXRhW3Nwcml0ZXNoZWV0VHlwZV1bb2JqZWN0Lm9ialR5cGVdO1xuXG4gICAgICAgIGlmKCFvYmpUeXBlRGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEZyYW1lTnVtYmVyID0gb2JqVHlwZURhdGEuaW1hZ2U7XG4gICAgICAgIGxldCBvYmpEYXRhID0ge1xuICAgICAgICAgIHR5cGVEYXRhOiBvYmpUeXBlRGF0YSxcbiAgICAgICAgICBhY3RpdmVEYXRhOiBvYmplY3QuZGF0YVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IGZ1bmN0aW9uc0luT2JqW29iamVjdEdyb3VwLnR5cGVdKCBvYmplY3QuY29vcmQsIG9iakRhdGEsIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIsIHsgcmFkaXVzOiA0NyB9ICk7XG4gICAgICAgIHRoaXNMYXllci5hZGRDaGlsZCggbmV3T2JqZWN0ICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbWFwLm1vdmVNYXAobWFwRGF0YS5zdGFydFBvaW50KTtcblxuICByZXR1cm4gbWFwO1xuXG4vKlxuICBDcmVhdGVUZXJyYWluU3RhZ2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2Jhc2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3RlcnJhaW5cbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2RpdGhlclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcHJldHRpZmllclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcmVzb3VyY2VcbiAgQ3JlYXRlVW5pdFN0YWdlXG4gICAgX0NyZWF0ZVVuaXRMYXllcl9Vbml0XG4gICAgX0NyZWF0ZVVuaXRMYXllcl9DaXR5XG4gIENyZWF0ZUZPV1N0YWdlXG4gIENyZWF0ZURhdGFTdGFnZVxuICBDcmVhdGVVSVN0YWdlXG4gICAgX0NyZWF0ZVVJTGF5ZXJfYXJyb3dcbiAgICBfQ3JlYXRlVUlMYXllcl9zZWxlY3Rpb25cbiovXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlYnVnOiBmdW5jdGlvbihlLCBlcnJvclRleHQpIHtcbiAgICBsb2cuZGVidWcoZXJyb3JUZXh0LCBlKTtcbiAgfVxufTsiLCIvKiogTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuICpcbiAqIE1hcCBpcyBpbnN0YW50aWF0ZWQgYW5kIHRoZW4gaW5pdGlhbGl6ZWQgd2l0aCBpbml0LW1ldGhvZC5cbiAqXG4gKiBQbHVnaW5zIGNhbiBiZSBhZGRlZCB3aXRoIGFjdGl2YXRlUGx1Z2lucy1tZXRob2QgYnkgcHJvZGl2aW5nIGluaXQobWFwKSBtZXRob2QgaW4gdGhlIHBsdWdpbi4gUGx1Z2lucyBhcmUgYWx3YXlzXG4gKiBmdW5jdGlvbnMsIG5vdCBvYmplY3RzIHRoYXQgYXJlIGluc3RhbnRpYXRlZC4gUGx1Z2lucyBhcmUgc3VwcG9zZWQgdG8gZXh0ZW5kIHRoZSBtYXAgb2JqZWN0IG9yIGFueXRoaW5nIGluIGl0IHZpYVxuICogaXQncyBwdWJsaWMgbWV0aG9kcy5cbiAqXG4gKiBAcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL01hcF9sYXllcic7XG5pbXBvcnQgeyByZXNpemVVdGlscywgcmVzaXplVXRpbHMgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7IG1hcF9kcmFnIH0gZnJvbSBcIi4vbW92ZS9tYXBfZHJhZ1wiO1xuaW1wb3J0IHsgbWFwX3pvb20gfSBmcm9tICcuL3pvb20vbWFwX3pvb20nO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXJzJztcblxudmFyIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xudmFyIGV2ZW50bGlzdGVuZXJzO1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7RE9NIENhbnZhcyBlbGVtZW50fSBjYW52YXMgLSBDYW52YXMgdXNlZCBieSB0aGUgbWFwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZGlmZmVyZW50IG9wdGlvbnMgZm9yIHRoZSBtYXAgdG8gYmUgZ2l2ZW4uXG4gICAqIEByZXR1cm4gTWFwIGluc3RhbmNlICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0aW9ucykge1xuICAgIGlmKCFjYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9zdGFnZSA9IG5ldyBNYXBfc3RhZ2UoXCJkYWRkeVN0YWdlXCIsIGNhbnZhcyk7XG4gICAgdGhpcy5tb21teUxheWVyID0gbmV3IE1hcF9sYXllcihcIm1vbW15TGF5ZXJcIiwgb3B0aW9ucy50eXBlLCBvcHRpb25zLnN1YkNvbnRhaW5lcnMsIG9wdGlvbnMuc3RhcnRDb29yZCk7XG4gICAgdGhpcy5fc3RhZ2UuYWRkQ2hpbGQodGhpcy5tb21teUxheWVyKTtcbiAgICB0aGlzLnBsdWdpbnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2YXRlZFBsdWdpbnMgPSBbXTtcbiAgICAvKiBBY3RpdmF0ZSB0aGUgbWFwIHpvb20gYW5kIG1hcCBkcmFnIGNvcmUgcGx1Z2lucyAqL1xuICAgIHRoaXMucGx1Z2luc1RvQWN0aXZhdGUgPSBbbWFwX3pvb20sIG1hcF9kcmFnXTtcbiAgICB0aGlzLm1hcFNpemUgPSBvcHRpb25zLm1hcFNpemUgfHwgeyB4OjAsIHk6MCB9O1xuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gZmFsc2U7XG4gICAgdGhpcy5ldmVudENCcyA9IHtcbiAgICAgIGZ1bGxTaXplOiByZXNpemVVdGlscy5zZXRUb0Z1bGxTaXplKGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikpLFxuICAgICAgZnVsbHNjcmVlbjogcmVzaXplVXRpbHMudG9nZ2xlRnVsbFNjcmVlbixcbiAgICAgIHNlbGVjdDogbnVsbCxcbiAgICAgIGRyYWc6IG51bGwsXG4gICAgICB6b29tOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLl9mdWxsU2l6ZUZ1bmN0aW9uID0gbnVsbDtcbiAgICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKHRoaXMuZXZlbnRDQnMpO1xuICB9XG4gIC8qKiBpbml0aWFsaXphdGlvbiBtZXRob2RcbiAgICogQHBhcmFtIFtBcnJheV0gcGx1Z2lucyAtIFBsdWdpbnMgdG8gYmUgYWN0aXZhdGVkIGZvciB0aGUgbWFwLiBOb3JtYWxseSB5b3Ugc2hvdWxkIGdpdmUgdGhlIHBsdWdpbnMgaGVyZSBpbnN0ZWFkIG9mXG4gICAqIHNlcGFyYXRlbHkgcGFzc2luZyB0aGVtIHRvIGFjdGl2YXRlUGx1Z2lucyBtZXRob2RcbiAgICogQHBhcmFtIHt4OiA/IHk6P30gY29vcmQgLSBTdGFydGluZyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aWNrQ0IgLSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGljay4gVGljayBjYWxsYmFjayBpcyBpbml0aWF0ZWQgaW4gZXZlcnkgZnJhbWUuIFNvIG1hcCBkcmF3cyBoYXBwZW5cbiAgICogZHVyaW5nIHRpY2tzXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXG4gIGluaXQocGx1Z2lucywgY29vcmQsIHRpY2tDQikge1xuICAgIGlmIChwbHVnaW5zKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zKTtcbiAgICB9XG5cbiAgICBpZihjb29yZCkge1xuICAgICAgdGhpcy5tb21teUxheWVyLnggPSBjb29yZC54O1xuICAgICAgdGhpcy5tb21teUxheWVyLnkgPSBjb29yZC55O1xuICAgIH1cblxuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcbiAgICBfZGVmYXVsdFRpY2sodGhpcyk7XG4gICAgdGlja0NCICYmIHRoaXMuY3VzdG9tVGlja09uKHRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogVGhlIGNvcnJlY3Qgd2F5IHRvIHVwZGF0ZSAvIHJlZHJhdyB0aGUgbWFwLiBDaGVjayBoYXBwZW5zIGF0IGV2ZXJ5IHRpY2sgYW5kIHRodXMgaW4gZXZlcnkgZnJhbWUuXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXG4gIGRyYXdPbk5leHRUaWNrKCkge1xuICAgIF9kcmF3TWFwT25OZXh0VGljayA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogVGhlIGNvcnJlY3Qgd2F5IHRvIHVwZGF0ZSAvIHJlZHJhdyB0aGUgbWFwLiBDaGVjayBoYXBwZW5zIGF0IGV2ZXJ5IHRpY2sgYW5kIHRodXMgaW4gZXZlcnkgZnJhbWUuXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXG4gIGdldExheWVyc1dpdGhBdHRyaWJ1dGVzKGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhZ2UuY2hpbGRyZW5bMF0uY2hpbGRyZW4uZmlsdGVyKGxheWVyID0+IHtcbiAgICAgIHJldHVybiBsYXllclthdHRyaWJ1dGVdID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0YWdlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFnZTtcbiAgfVxuXG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICAvKiogQWxsIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCB0byBNYXBfbGF5ZXIgY29uc3RydWN0b3JcbiAgICogQHJldHVybiBjcmVhdGVkIE1hcF9sYXllciBpbnN0YW5jZSAqL1xuICBhZGRMYXllcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBjb29yZCkge1xuICAgIHZhciBsYXllciA9IG5ldyBNYXBfbGF5ZXIobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgY29vcmQpO1xuXG4gICAgdGhpcy5tb21teUxheWVyLmFkZENoaWxkKGxheWVyKTtcblxuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtNYXBfbGF5ZXJ9IGxheWVyIC0gdGhlIGxheWVyIG9iamVjdCB0byBiZSByZW1vdmVkICovXG4gIHJlbW92ZUxheWVyKGxheWVyKSB7XG4gICAgdGhpcy5tb21teUxheWVyLnJlbW92ZUNoaWxkKGxheWVyKTtcblxuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICAvKiogQHJldHVybiBsYXllciB3aXRoIHRoZSBwYXNzZWQgbGF5ZXIgbmFtZSAqL1xuICBnZXRMYXllck5hbWVkKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb21teUxheWVyLmdldENoaWxkTmFtZWQobmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIGFtb3VudCBvZiB4IGFuZCB5IGNvb3JkaW5hdGVzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlLiBJLmUuIHsgeDogNSwgeTogMCB9XG4gICAqIHdpdGggdGhpcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZSBob3Jpem9udGFsbHkgNSBwaXplbHMgYW5kIHZlcnRpY2FsbHkgc3RheSBhdCB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICogQHJldHVybiB0aGlzIG1hcCBpbnN0YW5jZSAqL1xuICBtb3ZlTWFwKGNvb3JkaW5hdGVzKSB7XG4gICAgdGhpcy5tb21teUxheWVyLm1vdmUoY29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcbiAgICB0aGlzLm1hcE1vdmVkKHRydWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIENhY2hlIHRoZSBtYXAuIFRoaXMgcHJvdmlkZXMgc2lnbmlmaWNhbnQgcGVyZm9ybWFuY2UgYm9vc3QsIHdoZW4gdXNlZCBjb3JyZWN0bHkuIGNhY2hlTWFwIGl0ZXJhdGVzIHRocm91Z2ggYWxsIHRoZVxuICAgKiBsYXllciBvbiB0aGUgbWFwIGFuZCBjYWNoZXMgdGhlIG9uZXMgdGhhdCByZXR1cm4gdHJ1ZSBmcm9tIGdldENhY2hlRW5hYmxlZC1tZXRob2QuXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIGFtb3VudCBvZiB4IGFuZCB5IGNvb3JkaW5hdGVzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlLiBJLmUuIHsgeDogNSwgeTogMCB9XG4gICAqIHdpdGggdGhpcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZSBob3Jpem9udGFsbHkgNSBwaXplbHMgYW5kIHZlcnRpY2FsbHkgc3RheSBhdCB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICogQHJldHVybiB0aGlzIG1hcCBpbnN0YW5jZSAqL1xuICBjYWNoZU1hcCgpIHtcbiAgICBpZih0aGlzLm1vbW15TGF5ZXIuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMubW9tbXlMYXllci5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmKGNoaWxkLmdldENhY2hlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgY2hpbGQuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIGl0ZXJhdGVzIHRocm91Z2ggdGhlIG1hcCBsYXllcnMgYW5kIHJldHVybnMgbWF0Y2hpbmcgb2JqZWN0cyBvbiBnaXZlbiBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBtYXAgY29vcmRpbmF0ZSB1bmRlciB3aGljaCB3ZSB3YW50IHRvIHJldHJpZXZlIGFsbCB0aGUgb2JqZWN0cy5cbiAgICogQHJldHVybiB0aGlzIG1hcCBpbnN0YW5jZSAqL1xuICBnZXRPYmplY3RzVW5kZXJNYXBQb2ludChjb29yZCkge1xuICAgIGxldCBvYmplY3RzID0gW107XG5cbiAgICB0aGlzLm1vbW15TGF5ZXIuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY29vcmQpO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgLyoqIFJlc2l6ZSB0aGUgY2FudmFzIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgYXJlYS4gVXNlcyB0aGlzLmV2ZW50Q0JzLmZ1bGxzaXplIGFzIGNhbGxiYWNrLCBzbyB3aGVuIHlvdSBuZWVkIHRvIG92ZXJ3cml0ZVxuICB0aGUgZXZlbnRsaXN0ZW5lciBjYWxsYmFjayB1c2UgdGhpcy5ldmVudENCcyAqL1xuICB0b2dnbGVGdWxsU2l6ZSgpIHtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVGdWxsU2l6ZUxpc3RlbmVyKCk7XG4gIH1cbiAgLyoqIFRvZ2dsZXMgZnVsbHNjcmVlbiBtb2RlLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNjcmVlbiBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cbiAgdG9nZ2xlRnVsbFNjcmVlbiAoKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNjcmVlbigpO1xuICB9XG4gIC8qIEFjdGl2YXRlIHBsdWdpbnMgZm9yIHRoZSBtYXAuIE11c3QgYmUgaW4gYXJyYXkgZm9ybWF0OlxuICBbe1xuICAgIG5hbWU6IGZ1bmN0aW9uIG5hbWUsXG4gICAgYXJnczogW1xuICAgICAgRmlyc3QgYXJndW1lbnQsXG4gICAgICBzZWNvbmQgYXJndW1lbnQsXG4gICAgICAuLi5cbiAgICBdXG4gIH1dICovXG4gIGFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zQXJyYXkpIHtcbiAgICB2YXIgYWxsUGx1Z2lucyA9IHRoaXMucGx1Z2luc1RvQWN0aXZhdGUuY29uY2F0KHBsdWdpbnNBcnJheSk7XG5cbiAgICBhbGxQbHVnaW5zLmZvckVhY2gocGx1Z2luVG9Vc2UgPT4ge1xuICAgICAgaWYodGhpcy5hY3RpdmF0ZWRQbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXSA9IHBsdWdpblRvVXNlO1xuICAgICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0uaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRQbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZSA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjdXN0b21UaWNrT24odGlja0NCKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlVGlja0NCKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBhbHJlYWR5IGV4aXN0cyBvbmUgdGljayBjYWxsYmFjay4gTmVlZCB0byByZW1vdmUgaXQgZmlyc3QsIGJlZm9yZSBzZXR0aW5nIHVwIGEgbmV3IG9uZVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHRpY2tDQiB8fCBmdW5jdGlvbigpIHt9O1xuXG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIHRoaXMuYWN0aXZlVGlja0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY3VzdG9tVGlja09mZigpIHtcbiAgICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiBnZXR0ZXIgYW5kIHNldHRlciAqL1xuICBtYXBNb3ZlZCh5ZXNPck5vKSB7XG4gICAgaWYoeWVzT3JObyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1hcEluTW92ZSA9IHllc09yTm87XG4gICAgICByZXR1cm4geWVzT3JObztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXBJbk1vdmU7XG4gIH1cbiAgc2V0UHJvdG90eXBlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIHRoaXMuX19wcm90b19fW3Byb3BlcnR5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuLyogVGhpcyBoYW5kbGVzIHRoZSBkZWZhdWx0IGRyYXdpbmcgb2YgdGhlIG1hcCwgc28gdGhhdCBtYXAgYWx3YXlzIHVwZGF0ZXMgd2hlbiBkcmF3T25OZXh0VGljayA9PT0gdHJ1ZS4gVGhpcyB0aWNrXG5jYWxsYmFjayBpcyBhbHdheXMgc2V0IGFuZCBzaG91bGQgbm90IGJlIHJlbW92ZWQgb3Igb3ZlcnJ1bGVkICovXG5mdW5jdGlvbiBfZGVmYXVsdFRpY2sobWFwKSB7XG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBfdGlja0Z1bmMpO1xuXG4gIHJldHVybiBfdGlja0Z1bmM7XG5cbiAgZnVuY3Rpb24gX3RpY2tGdW5jKCkge1xuICAgIGlmKF9kcmF3TWFwT25OZXh0VGljayA9PT0gdHJ1ZSkge1xuICAgICAgX2RyYXdNYXAobWFwKTtcbiAgICAgIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuLyogUHJpdmF0ZSBmdW5jdGlvbiB0byBkcmF3IHRoZSBtYXAgKi9cbmZ1bmN0aW9uIF9kcmF3TWFwKG1hcCkge1xuICBtYXAuX3N0YWdlLnVwZGF0ZSgpO1xuXG4gIHJldHVybiBtYXA7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT0gQ29uc3RhbnRzID09PT09ICovXG5jb25zdCBUWVBFUyA9IHtcbiAganVzdFN1YkNvbnRhaW5lcnM6IDEsXG4gIG5vU3ViQ29udGFpbmVyczogMixcbiAgaW1hZ2VzSW5TdWJDb250YWluZXJzOiAzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuc3VwZXJQcm90b3R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiAoIHR5cGUgfHwgVFlQRVMubm9TdWJDb250YWluZXJzICk7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21hYmxlID0gdHJ1ZTtcbiAgfVxuICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgfVxuICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkUHJvdG90eXBlKG5hbWUsIGZ1bmN0aW9uVG9BZGQpIHtcbiAgICBzdXBlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvblRvQWRkO1xuICB9XG4gIC8qIG92ZXJsb2FkZWQgaW5oZXJpdGVkIG1ldGhvZCAqL1xuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmICghdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgQ29udGFpbmVyIGRpcmVjdGx5LiBXZXRoZXIgaXQgaXMgQ29udGFpbmVyIG9yIEJpdG1hcCBldGMuICovXG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgY29ycmVjdCBzdWJDb250YWluZXIuIEZvciBiZXR0ZXIgbG9naWMgYW5kIHBlcmZvcm1hbmNlICovXG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IF9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgbW92ZShjb29yZGluYXRlcykge1xuICAgIGlmICh0aGlzLm1vdmFibGUpIHtcbiAgICAgIHRoaXMueCArPSBjb29yZGluYXRlcy54O1xuICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGVzLnk7XG4gICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxuICBzdGF0aWMgZ2V0VHlwZShuYW1lKSB7XG4gICAgcmV0dXJuIFRZUEVTW25hbWVdO1xuICB9XG59XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cbi8qXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvZXh0ZW5kJztcbmltcG9ydCBwcm9tb3RlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvcHJvbW90ZSc7XG5pbXBvcnQgU3ByaXRlQ29udGFpbmVyIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlQ29udGFpbmVyJztcblxuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVzaGVldExheWVyIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgc3ByaXRlc2hlZXQpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6IHR5cGU7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGFkZENoaWxkVG9TdWJDb250YWluZXIob2JqZWN0LCBpbmRleCkge1xuICAgIGxldCBmdW5jdGlvblRvVXNlID0gaW5kZXggPyBcIl9hZGRDaGlsZEF0XCIgOiBcIl9hZGRDaGlsZFwiO1xuXG4gICAgaWYoIXRoaXMudXNlU3ViY29udGFpbmVycykge1xuICAgICAgdGhpc1tmdW5jdGlvblRvVXNlXShvYmplY3QsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSBfZ2V0Q29ycmVjdENvbnRhaW5lci5jYWxsKHRoaXMsIG9iamVjdC54LCBvYmplY3QueSk7XG4gICAgICBjb3JyZWN0U3ViQ29udGFpbmVyLmFkZENoaWxkKG9iamVjdCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGlmKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZihjaGlsZC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICEhdGhpcy51c2VTdWJjb250YWluZXJzO1xuICB9XG4gIGlzU2V0VmlzaWJsZSgpIHsgfVxuICBzZXRWaXNpYmxlKCkgeyB9XG59XG4qL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9nZXRDb3JyZWN0Q29udGFpbmVyKHgsIHkpIHtcbiAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSB0aGlzLmdldE9iamVjdFVuZGVyUG9pbnQoeCwgeSk7XG5cbiAgcmV0dXJuIGNvcnJlY3RTdWJDb250YWluZXI7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9zdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlN0YWdlIHtcbiAgLyogVGFrZXMgdGhlIGNhbnZhcyBlbGVtZW50IGFzIGFyZ3VtZW50ICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhcywgc3RhZ2VCb3VuZHMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTWFwX3N0YWdlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpXG4gICAgfVxuXG4gICAgc3VwZXIoY2FudmFzKTtcblxuICAgIGlmKHN0YWdlQm91bmRzKSB7XG4gICAgICB0aGlzLnNldEJvdW5kcygwLCAwLCBzdGFnZUJvdW5kcy54LCBzdGFnZUJvdW5kcy55KTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cGVyUHJvdG90eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICB9XG4gIGFkZFByb3RvdHlwZShuYW1lLCBmdW5jdGlvblRvQWRkKSB7XG4gICAgc3VwZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb25Ub0FkZDtcbiAgfVxuICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgZm9yIChsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICBpZiAobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuXG5cbi8qXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvZXh0ZW5kJztcbmltcG9ydCBwcm9tb3RlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvcHJvbW90ZSc7XG5pbXBvcnQgU3ByaXRlQ29udGFpbmVyIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlQ29udGFpbmVyJztcbmltcG9ydCBTcHJpdGVTdGFnZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZVN0YWdlJztcbmV4cG9ydCBjbGFzcyBNYXBfc3ByaXRlU3RhZ2UgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVTdGFnZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nIEFORCBnZXR0aW5nIGNoaWxkcmVuIGJ5IG5hbWUuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cblxuICAgICAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dG9DbGVhciA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgICB9XG4gICAgZ2V0Q2FjaGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICAgIH1cbiAgICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgICAgIHZhbGlkYXRvcnMuX2lzX2Jvb2xlYW4oc3RhdHVzKTtcbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICAgIGZvcihsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgICAgaWYobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGlsZCA9IGxheWVyLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG4qL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogVGhpcyBjbGFzcyBuZWVkcyB0byBiZSBnb25lIHRocm91Z2ggY2FyZWZ1bGx5LCBpdCBoYXMgYmVlbiBjb3BpZWQgZnJvbSBhbiBvbGRlciB2ZXJzaW9uIHN0cmFpZ2h0LiBUaGUgdmVyc2lvbiB3YXMgRVM1XG5AcGFyYW0ge2NyZWF0ZWpzLlBvaW50fSBjb29yZHMgLSB0aGUgY29vcmRpbmF0ZSB3aGVyZSB0aGUgb2JqZWN0IGlzIGxvY2F0ZWQgYXRcbkBwYXJhbSB7fSBkYXRhIC0gb2JqZWN0cyBkYXRhLCB0aGF0IHdpbGwgYmUgdXNlZCBpbiB0aGUgZ2FtZS4gSXQgd2lsbCBub3QgYWN0dWFsbHkgYmUgbWFpbmx5IHVzZWQgaW4gZ3JhcGhpY2FsXG5idXQgcmF0aGVyIHRoaW5ncyBsaWtlIHVuaXQtZGF0YSBhbmQgY2l0eS1kYXRhIHByZXNlbnRhdGlvbnMgZXRjLlxuQHBhcmFtIHtjcmVhdGVqcy5TcHJpdGVTaGVldH0gc3ByaXRlU2hlZXRcbkBwYXJhbSB7SW50XSBjdXJyRnJhbWVOdW1iZXIgLSB0aGUgY3VycmVudCBmcmFtZXMgbnVtYmVyLiBUaGlzIGlzIGJhc2ljYWxseSB0aGUgaW5pdGlhbCBpbWFnZSwgd2UgY2FuIGNoYW5nZSBpdCBsYXRlclxuZm9yIGFuaW1hdGlvbiBvciBzdWNoXG5cbkFsbCBvZiB0aGUgb2JqZWN0cyBuZWVkIHRvIGhhdmUgc2FtZSBhcmd1bWVudEFQSSBmb3IgY3JlYXRpbmcgb2JqZWN0czogY29vcmRzLCBkYXRhLCBpbWFnZURhdGFcbiovXG5cbmV4cG9ydCBjbGFzcyBPYmplY3Rfc3ByaXRlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcikge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcblxuICAgIHRoaXMubmFtZSA9IFwiZ2VuZXJhbCBPYmplY3RzX3Nwcml0ZV9cIiArIHRoaXMuaWQ7XG5cbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IGN1cnJlbnRGcmFtZU51bWJlcjtcblxuICAgIC8qIEV4ZWN1dGUgaW5pdGlhbCBkcmF3IGZ1bmN0aW9uICovXG4gICAgdGhpcy5pbm5lckRyYXcoY29vcmRzLngsIGNvb3Jkcy55KTtcblxuICAgIC8qIG9wdGltaXphdGlvbnMgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIFNob3VsZCBiZSBlbmFibGVkLCBpZiB0aGUgbGF5ZXIgaXMgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLiBMaWtlIHVuaXQgbGF5ZXIuIFRoaXMgd2F5IHdlIGNhbiB1c2UgY3Vyc29yIHBvaW50ZXIgZXRjLlxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gRk9SIERFQlVHR0lORyBBTkQgU0VFSU5HIFRIQVQgTElTVEVORVJTIEFSRSBBVFRBQ0hFRDpcbiAgICAvL3RoaXMud2lsbFRyaWdnZXJcbiAgfVxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyogRHJhd2luZyB0aGUgb2JqZWN0IHdpdGggY3JlYXRlanMtbWV0aG9kcyAqL1xuICBpbm5lckRyYXcoeCwgeSkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoIHRoaXMuY3VyckZyYW1lTnVtYmVyICk7XG4gICAgY29uc29sZS5sb2coXCJIQUFBXCIpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIC8qIFRoZSBtb3VzZSBjaGVjayBoYXMgYmVlbiBlbmFibGVkIG9uIGhpZ2hlciB0aWVyLCBzbyBubyBuZWVkIGZvciB0aGlzXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTsgKi9cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZU51bWJlcikge1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gbmV3RnJhbWVOdW1iZXI7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XG4gIH1cbiAgLyogRHVubm8gaWYgd2UgbmVlZCB0aGlzIGFuZCBzbyBvbi4gVGhpcyB3YXMgaW4gdGhlIG9sZCB2ZXJzaW9uICovXG4gIGdsb2JhbENvb3JkcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogTnVtYmVyKCB0aGlzLnggKyB0aGlzLnBhcmVudC54ICksXG4gICAgICB5OiBOdW1iZXIoIHRoaXMueSArIHRoaXMucGFyZW50LnkgKVxuICAgIH07XG4gIH1cbiAgZ2V0Qm91bmRzRnJvbUZyYW1lcygpIHtcbiAgICByZXR1cm4gdGhpcy5zcHJpdGVTaGVldC5nZXRGcmFtZUJvdW5kcyggdGhpcy5jdXJyZW50RnJhbWUgKTtcbiAgfVxufSIsIi8qKlxuICBNYWluIGNsYXNzIGZvciBzaG93aW5nIFVJIG9uIHRoZSBtYXAuIExpa2UgdW5pdCBzZWxlY3Rpb25zIGFuZCBzdWNoLiBIYXMgbm90aGluZyB0byBkbyB3aXRoIHNob3dpbmcgb2ZmLW1hcCBkYXRhLlxuICBHb29kIGV4YW1wbGVzIGZvciB3aGF0IHRoaXMgc2hvd3MgYXJlOiBzZWxlY3RlZCB1bml0cy1saXN0LCBzZWxlY3Rpb24gaGlnaGxpZ2h0IChsaWtlIGEgY2lyY2xlIG9uIHRoZSBzZWxlY3RlZCB1bml0KSBhbmRcbiAgYnJpbmdpbmcgdGhlIHVuaXQgb24gdG9wIGluIHRoZSBtYXAuXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjb3BlO1xuXG5leHBvcnQgZnVuY3Rpb24gVUkgKGdpdmVuVUlUaGVtZSwgZ2l2ZW5NYXApIHtcbiAgLyogVGhpcyBpcyBhIHNpbmdsZXRvbiBjbGFzcywgc28gaWYgYWxyZWFkeSBpbnN0YW50aWF0ZWQgcmV0dXJuIHNjb3BlICovXG4gIGlmIChzY29wZSkge1xuICAgIHJldHVybiBzY29wZTtcbiAgfVxuXG4gIGlmICghZ2l2ZW5VSVRoZW1lIHx8ICFnaXZlbk1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVJLW1vZHVsZSByZXF1aXJlcyBVSVRoZW1lIGFuZCBtYXBPYmpcIik7XG4gIH1cblxuICB2YXIgbWFwID0gZ2l2ZW5NYXA7XG4gIHZhciBVSVRoZW1lID0gZ2l2ZW5VSVRoZW1lO1xuICBzY29wZSA9IHt9O1xuXG4gIHNjb3BlLnNob3dTZWxlY3Rpb25zID0gZnVuY3Rpb24gc2hvd1NlbGVjdGlvbnMob2JqZWN0cykge1xuICAgIHJldHVybiBVSVRoZW1lLnNob3dTZWxlY3Rpb25zKG9iamVjdHMpO1xuICB9O1xuICBzY29wZS5oaWdobGlnaHRTZWxlY3RlZE9iamVjdCA9IGZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG9iamVjdCkge1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCIvKipcbiAgVGhlIHNpbXBsZXN0IGRlZmF1bHQgVUkgaW1wbGVtZW50YXRpb24uIEhvbGRzOlxuICAtIFNlbGVjdGlvbiBoaWdobGlnaHQgb2Ygb2JqZWN0XG4gIC0gU2VsZWN0aW9uIGxpc3Qgb2YgdW5pdHMgYXQgdGhlIGhleGFnb25cbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY2xhc3MgVUlfZGVmYXVsdCB7XG4gIGNvbnN0cnVjdG9yKG1vZGFsLCBzdHlsZXMpIHtcbiAgICB0aGlzLm1vZGFsID0gbW9kYWwgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaWFsb2dcIilbMF07XG4gICAgdGhpcy5zdHlsZXMgPSBzdHlsZXMgfHwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGMEYwRjBcIlxuICAgIH07XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cyA9IF9ET01FbGVtZW50c1RvQXJyYXkodGhpcy5tb2RhbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfY2xvc2VcIikpO1xuICB9XG4gIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcbiAgICBpZiAob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJvYmplY3RzOjxicj5cIjtcbiAgICAgIG9iamVjdHMubWFwKCBvYmplY3QgPT4ge1xuICAgICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3QuZGF0YS50eXBlRGF0YS5uYW1lICsgXCI8YnI+XCI7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJTRUxFQ1RFRDo8YnI+XCI7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3RzWzBdLmRhdGEudHlwZURhdGEubmFtZTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGluaXQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudCggZWxlbWVudCwgc2VsZi5tb2RhbC5jbG9zZS5iaW5kKHNlbGYubW9kYWwpICk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FjdGl2YXRlQ2xvc2luZ0VsZW1lbnQoZWxlbWVudCwgY2xvc2VDQikge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNsb3NlQ0IoKTtcbiAgICAgIH0pO1xufVxuZnVuY3Rpb24gX0RPTUVsZW1lbnRzVG9BcnJheShlbGVtZW50cykge1xuICBpZiAoIWVsZW1lbnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IgKyBcIiBmdW5jdGlvbiBuZWVkcyBlbGVtZW50c1wiKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG4gIHZhciBlbGVtZW50QXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudEFycmF5LnB1c2goZWxlbWVudHNbaV0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRBcnJheTtcbn0iLCIndXNlciBzdHJpY3QnO1xuXG52YXIgc2luZ2xldG9uU2NvcGU7XG5cbmV4cG9ydCBsZXQgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBldmVudExpc3RlbmVyTW9kdWxlKG1hcENCcykge1xuICBpZihzaW5nbGV0b25TY29wZSkge1xuICAgIHJldHVybiBzaW5nbGV0b25TY29wZTtcbiAgfVxuXG4gIHNpbmdsZXRvblNjb3BlID0ge1xuICAgIHN0YXRlczoge31cbiAgfTtcblxuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsU2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1hcENCcy5mdWxsU2l6ZUNCKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1hcENCcy5mdWxsU2l6ZUNCKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuZnVsbFNpemU7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHJldHVybiBtYXBDQnMuZnVsbHNjcmVlbjtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlWm9vbUxpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlWm9vbUxpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgbWFwQ0JzLnpvb20pO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnpvb20gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgbWFwQ0JzLnpvb20pO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnpvb20gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLnpvb207XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZURyYWdMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZURyYWdMaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuZHJhZyk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuZHJhZztcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlU2VsZWN0TGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVTZWxlY3RMaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuc2VsZWN0KTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuc2VsZWN0KTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLnNlbGVjdDtcbiAgfTtcblxuICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuLi9ldmVudGxpc3RlbmVycyc7XG5cbi8qIGV2ZW50bGlzdGVuZXJzIGlzIGEgc2luZ2xldG9uLCBzbyB3ZSBtaWdodCBhcyB3ZWxsIGRlY2xhcmUgaXQgaGVyZSAqL1xudmFyIGV2ZW50bGlzdGVuZXJzO1xuXG5leHBvcnQgbGV0IG1hcF9kcmFnID0gKGZ1bmN0aW9uIG1hcF9kcmFnKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgLyogRnVuY3Rpb24gZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgdGhlIG1vdXNlIG9mZnNldC4gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgYm90dG9tICovXG4gIHZhciBvZmZzZXRDb29yZHMgPSBfb2Zmc2V0Q29vcmRzKCk7XG5cbiAgLyogPT09PT0gRm9yIHRlc3RpbmcgPT09PT0gKi9cbiAgc2NvcGUuX3N0YXJ0RHJhZ0xpc3RlbmVyID0gX3N0YXJ0RHJhZ0xpc3RlbmVyO1xuXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBtYXBfZHJhZy5uYW1lO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXAuZXZlbnRDQnMpO1xuICAgIG1hcC5ldmVudENCcy5kcmFnID0gX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcCk7XG5cbiAgICAvL21hcC5zZXRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBfc3RhcnREcmFnTGlzdGVuZXIobWFwKSk7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRHJhZ0xpc3RlbmVyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnREcmFnTGlzdGVuZXIoIG1hcCApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3RhcnREcmFnKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgIHg6IGUueCxcbiAgICAgICAgICB5OiBlLnlcbiAgICAgICAgfSk7XG4gICAgICAgIC8qIFdlIHRha2UgYWxsIHRoZSBldmVudGxpc3RlbmVycyB1bmJpbmRpbmdzIHRvIHRoaXMgYXJyYXksIHNvIHdlIGNhbiB1bmJpbmQgdGhlbSB3aGVuIHRoZSBtb3VzZSBpcyB1cCAqL1xuXG4gICAgICAgIHZhciBtb3ZlQ2FsbGJhY2sxID0gX2RyYWdMaXN0ZW5lcihtYXApO1xuICAgICAgICB2YXIgbW91c2V1cENhbGxiYWNrID0gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCk7XG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZXVwQ2FsbGJhY2spO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmVDYWxsYmFjazEpO1xuICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgICAgICBfbWFwTW92ZWQobWFwKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8qIEV2ZW50IGxpc3RlbmVycyBhcmUgaW4gdGhlaXIgc2VwYXJhdGUgZmlsZTsgZXZlbnRMaXN0ZW5lcnMuanMgKi9cbiAgICAgIGZ1bmN0aW9uIF9kcmFnTGlzdGVuZXIobWFwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRyYWdnZXIoZSkge1xuICAgICAgICAgICAgbWFwLm1hcE1vdmVkKHRydWUpO1xuICAgICAgICAgICAgLyogU28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgc3RvcCB3aGVuIG1vdXNlIGlzIHVwLCBldmVuIHRob3VnaCBtb3VzZXVwIGV2ZW50IHdvdWxkbid0IGZpcmUgKi9cbiAgICAgICAgICAgIGlmKGUuYnV0dG9ucyA9PT0gMCkge1xuICAgICAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgbW92ZWQgPSB7XG4gICAgICAgICAgICAgIHg6IGUueCAtIG9mZnNldC54LFxuICAgICAgICAgICAgICB5OiBlLnkgLSBvZmZzZXQueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYobW92ZWQueCAhPT0gMCB8fCBtb3ZlZC55ICE9PSAwKSB7XG4gICAgICAgICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1hcC5tYXBNb3ZlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgICAgICB4OiBlLngsXG4gICAgICAgICAgICAgIHk6IGUueVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIFRoZSBtb3VzZSBoYXMgYmVlbiBtb3ZlZCBhZnRlciBwcmVzc2luZy4gVGhpcyBwcmV2ZW50IHRoZSBjbGlja1xuICAgICAgICAgICAgICBldmVudCB0byBmaXJlIGF0IHRoZSBzYW1lIHRpbWUgd2l0aCB0aGUgbW91c2VEb3duIC8gZHJhZ2dpbmcgZXZlbnRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAvL21hcC5tb3VzZU1vdmVkKCB0cnVlICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cbiAgZnVuY3Rpb24gX29mZnNldENvb3JkcygpIHtcbiAgICB2YXIgc2NvcGUgPSB7fTtcbiAgICB2YXIgb2Zmc2V0Q29vcmRzO1xuXG4gICAgc2NvcGUuc2V0T2Zmc2V0ID0gZnVuY3Rpb24gc2V0T2Zmc2V0KGNvb3Jkcykge1xuICAgICAgcmV0dXJuIG9mZnNldENvb3JkcyA9IGNvb3JkcztcbiAgICB9O1xuICAgIHNjb3BlLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCgpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHM7XG4gICAgfTtcblxuICAgIHJldHVybiBzY29wZTtcbiAgfTtcbn0pKCk7XG5cbi8qIFdpdGhvdXQgdGhpcywgdGhlIG90aGVyIGV2ZW50TGlzdGVuZXJzIG1pZ2h0IGZpcmUgaW5hcHByb3ByaWF0ZSBldmVudHMuICovXG5mdW5jdGlvbiBfbWFwTW92ZWQobWFwKSB7XG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgIG1hcC5tYXBNb3ZlZChmYWxzZSk7XG4gIH0sIDEpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYgKHNjb3BlLnNwcml0ZXNoZWV0QWxyZWFkeUV4aXN0cyggX2NyZWF0ZUlEKCBzcHJpdGVzaGVldERhdGEgKSApICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG5cbiAgICBhbGxTcHJpdGVzaGVldHMucHVzaCggc3ByaXRlU2hlZXQgKTtcblxuICAgIHJldHVybiBzcHJpdGVTaGVldDtcbiAgfTtcbiAgc2NvcGUucmVtb3ZlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXQpIHtcblxuICB9O1xuICBzY29wZS5nZXRBbGxTcHJpdGVzaGVldHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFsbFNwcml0ZXNoZWV0cztcbiAgfTtcbiAgc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0SUQpIHtcbiAgICByZXR1cm4gKCBhbGxTcHJpdGVzaGVldElEcy5pbmRleE9mKCBzcHJpdGVzaGVldElEICkgPiAtMSApO1xuICB9O1xuICBmdW5jdGlvbiBfY3JlYXRlSUQgKHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHJldHVybiAoIHNwcml0ZXNoZWV0RGF0YS5pbWFnZXMudG9TdHJpbmcoKSApO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCJleHBvcnQgdmFyIG1vdXNlVXRpbHMgPSAoIGZ1bmN0aW9uIG1vdXNlVXRpbHMoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGlzIGZyb206IGh0dHA6Ly93d3cuYWRvbWFzLm9yZy9qYXZhc2NyaXB0LW1vdXNlLXdoZWVsL1xuICAgIEl0IGRldGVjdHMgd2hpY2ggd2F5IHRoZSBtb3VzZXdoZWVsIGhhcyBiZWVuIG1vdmVkXG5cbiAgICBAcGFyYW0ge0V2ZW50fSBldmVudCBwYXNzIHRoZSBldmVudCB0byBkZWx0YUZyb21XaGVlbFxuICAgIEByZXR1cm4gZGVsdGEuIFBvc2l0aXZlIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi5cbiAgICAqL1xuICBzY29wZS5kZWx0YUZyb21XaGVlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIGRlbHRhID0gMDtcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cblxuICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgKSB7IC8qIElFL09wZXJhLiAqL1xuICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCApIHsgLyoqIE1vemlsbGEgY2FzZS4gKi9cbiAgICAgICAgLyogSW4gTW96aWxsYSwgc2lnbiBvZiBkZWx0YSBpcyBkaWZmZXJlbnQgdGhhbiBpbiBJRS5cbiAgICAgICAgICogQWxzbywgZGVsdGEgaXMgbXVsdGlwbGUgb2YgMy4gKi9cbiAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMztcbiAgICAgfVxuICAgICAvKiBQcmV2ZW50IGRlZmF1bHQgYWN0aW9ucyBjYXVzZWQgYnkgbW91c2Ugd2hlZWwuIEl0IG1pZ2h0IGJlIHVnbHkgKi9cbiAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxuICAgICB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uICovXG4gICAgIGlmICggZGVsdGEgKSByZXR1cm4gZGVsdGE7XG4gIH07XG4gIC8qKiBEZXRlY3QgcmlnaHQgY2xpY2sgKi9cbiAgc2NvcGUuaXNSaWdodENsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICB2YXIgcmlnaHRjbGljaztcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cbiAgICAgaWYgKCBldmVudC5idXR0b25zICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9ucyA9PSAyICk7XG4gICAgIGVsc2UgaWYgKCBldmVudC53aGljaCApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LndoaWNoID09IDMgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LmJ1dHRvbiApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbiA9PSAyICk7XG5cbiAgICAgaWYgKCByaWdodGNsaWNrICkgcmV0dXJuIHRydWU7XG5cbiAgICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICByZXR1cm4gc2NvcGU7XG59ICkoKTtcbmV4cG9ydCB2YXIgcmVzaXplVXRpbHMgPSB7XG4gIHRvZ2dsZUZ1bGxTY3JlZW46IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTY3JlZW4oKSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5ib2R5OyAvLyBNYWtlIHRoZSBib2R5IGdvIGZ1bGwgc2NyZWVuLlxuICAgIHZhciBpc0luRnVsbFNjcmVlbiA9ICggZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgIT09IG51bGwgKSB8fFxuICAgICAgIChcbiAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiApO1xuXG4gICAgaXNJbkZ1bGxTY3JlZW4gPyBjYW5jZWxGdWxsU2NyZWVuKCBkb2N1bWVudCApIDogcmVxdWVzdEZ1bGxTY3JlZW4oIGVsZW0gKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFN1YiBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBjYW5jZWxGdWxsU2NyZWVuKCBlbCApIHtcbiAgICAgICB2YXIgcmVxdWVzdE1ldGhvZCA9IGVsLmNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubW96Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLmV4aXRGdWxsc2NyZWVuO1xuICAgICAgIGlmICggcmVxdWVzdE1ldGhvZCApIHsgLy8gY2FuY2VsIGZ1bGwgc2NyZWVuLlxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcbiAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgKSB7IC8vIE9sZGVyIElFLlxuICAgICAgICAgIHZhciB3c2NyaXB0ID0gbmV3IEFjdGl2ZVhPYmplY3QoIFwiV1NjcmlwdC5TaGVsbFwiICk7XG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdEZ1bGxTY3JlZW4oIGVsICkge1xuICAgICAgIC8vIFN1cHBvcnRzIG1vc3QgYnJvd3NlcnMgYW5kIHRoZWlyIHZlcnNpb25zLlxuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwucmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubXNSZXF1ZXN0RnVsbFNjcmVlbjtcblxuICAgICAgIGlmICggcmVxdWVzdE1ldGhvZCApIHsgLy8gTmF0aXZlIGZ1bGwgc2NyZWVuLlxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcbiAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgKSB7IC8vIE9sZGVyIElFLlxuICAgICAgICAgIHZhciB3c2NyaXB0ID0gbmV3IEFjdGl2ZVhPYmplY3QoIFwiV1NjcmlwdC5TaGVsbFwiICk7XG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgc2V0VG9GdWxsU2l6ZTogZnVuY3Rpb24gc2V0VG9GdWxsU2l6ZShjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZ1bGxTaXplKCkge1xuICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGxpc3RlbmVycyA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgTElTVEVORVJfVFlQRVMgPSB7XG4gICAgXCJtb3VzZW1vdmVcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcIm1vdXNlbW92ZVwiXG4gICAgfSxcbiAgICBcIm1vdXNldXBcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcIm1vdXNldXBcIlxuICAgIH0sXG4gICAgXCJtb3VzZWRvd25cIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcIm1vdXNlZG93blwiXG4gICAgfSxcbiAgICBcIm1vdXNld2hlZWxcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcIndoZWVsXCJcbiAgICB9LFxuICAgIFwibW91c2VjbGlja1wiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwiY2xpY2tcIlxuICAgIH0sXG4gIH07XG4gIHZhciBfZXZlbnRMaXN0ZW5lcnMgPSBfZ2V0RW1wdHlFdmVudExpc3RlbmVyQXJyYXkoKTtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgc2NvcGUuc2V0T25lID0gZnVuY3Rpb24gc2V0T25lKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvKiBUaGVyZSBoYXMgYmVlbiBzZXZlcmFsIGRpZmZlcmVudCBtb3VzZXdoZWVsIGV2ZW50cyBiZWZvcmUsIGJ1dCBub3cgYWxsIGV4Y2VwdCBvcGVyYSBzaG91bGQgc3VwcG9ydCBcIndoZWVsXCIgKi9cbiAgICBfZXZlbnRMaXN0ZW5lcnNbYWN0aW9uXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW2FjdGlvbl0uZWxlbWVudF0uYWRkRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1thY3Rpb25dLmV2ZW50LCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgc2NvcGUucmVtb3ZlT25lID0gZnVuY3Rpb24gcmVtb3ZlT25lKHR5cGUsIG9yaWdDYWxsYmFjaykge1xuXG4gICAgaWYodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICBpZihvcmlnQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpc1tMSVNURU5FUl9UWVBFU1t0eXBlXS5lbGVtZW50XS5yZW1vdmVFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW3R5cGVdLmV2ZW50LCBvcmlnQ2FsbGJhY2spO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGNhbGxiYWNrIHNwZWNpZmllZCEgLSAxXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgdHlwZS5mb3JFYWNoKHRoaXNUeXBlID0+IHtcbiAgICAgICAgaWYob3JpZ0NhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpc1tMSVNURU5FUl9UWVBFU1t0aGlzVHlwZV0uZWxlbWVudF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1t0aGlzVHlwZV0uZXZlbnQsIG9yaWdDYWxsYmFjayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2FsbGJhY2sgc3BlY2lmaWVkISAtIDJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyogUFJJVkFURSBmdW5jdGlvbnMgKi9cbiAgZnVuY3Rpb24gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCkge1xuICAgIHZhciBvYmplY3RzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhMSVNURU5FUl9UWVBFUykuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgICBvYmplY3RzW3R5cGVdID0gW107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxufSkoKTsiLCIndXNlciBzdHJpY3QnO1xuXG5pbXBvcnQgeyBtb3VzZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuLyogZXZlbnRsaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24sIHNvIHdlIG1pZ2h0IGFzIHdlbGwgZGVjbGFyZSBpdCBoZXJlICovXG52YXIgZXZlbnRsaXN0ZW5lcnM7XG5cbmV4cG9ydCBsZXQgbWFwX3pvb20gPSAoZnVuY3Rpb24gbWFwX3pvb20oKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICB2YXIgem9vbUxpbWl0ID0ge1xuICAgIGZhcnRoZXI6IDAuNCxcbiAgICBjbG9zZXIgOiAyLjVcbiAgfTtcbiAgLyogSG93IG11Y2ggb25lIHN0ZXAgb2Ygem9vbWluZyBhZmZlY3RzOiAqL1xuICB2YXIgem9vbU1vZGlmaWVyID0gMC4xO1xuXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBtYXBfem9vbS5uYW1lO1xuXG4gIC8qKlxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJ6b29tSW5cIiwgem9vbUluKTtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwiem9vbU91dFwiLCB6b29tT3V0KTtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwic2V0Wm9vbUxpbWl0c1wiLCBzZXRab29tTGltaXRzKTtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwic2V0Wm9vbU1vZGlmaWVyXCIsIHNldFpvb21Nb2RpZmllcik7XG5cbiAgICBtYXAuZXZlbnRDQnMuem9vbSA9IF9zZXR1cFpvb21FdmVudChtYXApO1xuXG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXAuZXZlbnRDQnMpO1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZVpvb21MaXN0ZW5lcigpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiogPT09PSBQUk9UT1RZUEUgZXh0ZW5zaW9ucyBmb3IgbWFwICovXG4gIGZ1bmN0aW9uIHNldFpvb21Nb2RpZmllciAoYW1vdW50KSB7XG4gICAgem9vbU1vZGlmaWVyID0gYW1vdW50O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gc2V0Wm9vbUxpbWl0cyAoZmFydGhlciwgY2xvc2VyKSB7XG4gICAgem9vbUxpbWl0LmZhcnRoZXIgPSBmYXJ0aGVyO1xuICAgIHpvb21MaW1pdC5jbG9zZXIgPSBjbG9zZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiB6b29tSW4gKGFtb3VudCkge1xuICAgIGlmKF9pc092ZXJab29tTGltaXQoIGFtb3VudCApIClcblxuICAgIHRoaXMuZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoXCJ6b29tYWJsZVwiLCB0cnVlKS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGxheWVyLnNjYWxlWCAtPSB6b29tTW9kaWZpZXI7XG4gICAgICBsYXllci5zY2FsZVkgLT0gem9vbU1vZGlmaWVyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gem9vbU91dCAoYW1vdW50KSB7XG4gICAgaWYoX2lzT3Zlclpvb21MaW1pdCggYW1vdW50ICkgKVxuXG4gICAgdGhpcy5nZXRMYXllcnNXaXRoQXR0cmlidXRlcyhcInpvb21hYmxlXCIsIHRydWUpLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgbGF5ZXIuc2NhbGVYICs9IHpvb21Nb2RpZmllcjtcbiAgICAgIGxheWVyLnNjYWxlWSArPSB6b29tTW9kaWZpZXI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4gIGZ1bmN0aW9uIF9pc092ZXJab29tTGltaXQoYW1vdW50KSB7XG4gICAgaWYoYW1vdW50ID4gem9vbUxpbWl0LmZhcnRoZXIgJiYgYW1vdW50IDwgem9vbUxpbWl0LmNsb3Nlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIF9zZXR1cFpvb21FdmVudChtYXApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlWm9vbUV2ZW50KGV2ZW50KSB7XG4gICAgICB2YXIgbW91c2VXaGVlbERlbHRhID0gbW91c2VVdGlscy5kZWx0YUZyb21XaGVlbChldmVudCk7XG5cbiAgICAgIGlmKG1vdXNlV2hlZWxEZWx0YSA+IDApIHtcbiAgICAgICAgbWFwLnpvb21JbigpO1xuICAgICAgfSBlbHNlIGlmKG1vdXNlV2hlZWxEZWx0YSA8IDApIHtcbiAgICAgICAgbWFwLnpvb21PdXQoKTtcbiAgICAgIH1cblxuICAgICAgbWFwLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgfTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci9sb2cuanNcIjtcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vLi4vY29yZS9ldmVudGxpc3RlbmVycyc7XG5cbi8qIGV2ZW50bGlzdGVuZXJzIGlzIGEgc2luZ2xldG9uLCBzbyB3ZSBtaWdodCBhcyB3ZWxsIGRlY2xhcmUgaXQgaGVyZSAqL1xudmFyIGV2ZW50bGlzdGVuZXJzO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBIZXhhZ29uQ2xpY2sobWFwLCBjYWxsYmFjaykge1xuICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKG1hcC5ldmVudENCcyk7XG5cbiAgbWFwLmV2ZW50Q0JzLnNlbGVjdCA9IG1vdXNlRG93bkxpc3RlbmVyO1xuICBldmVudGxpc3RlbmVycy50b2dnbGVTZWxlY3RMaXN0ZW5lcigpO1xuXG4gIC8vcmV0dXJuIG9uTW91c2VEb3duKG1hcCwgY2FsbGJhY2spO1xuXG4gIHJldHVybiBmYWxzZTtcblxuICBmdW5jdGlvbiBtb3VzZURvd25MaXN0ZW5lcigpIHtcbiAgICBvbk1vdXNlVXAobWFwLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25Nb3VzZVVwKG1hcCwgY2FsbGJhY2spIHtcbiAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCByZXRyaWV2ZUNsaWNrRGF0YSk7XG5cbiAgZnVuY3Rpb24gcmV0cmlldmVDbGlja0RhdGEoZSkge1xuICAgIGlmKCBtYXAubWFwTW92ZWQoKSApIHtcbiAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcmV0cmlldmVDbGlja0RhdGEpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZ2xvYmFsQ29vcmRzID0gIHt4OiBlLngsIHk6IGUueSB9O1xuICAgIHZhciBvYmplY3RzO1xuXG4gICAgb2JqZWN0cyA9IG1hcC5nZXRPYmplY3RzVW5kZXJNYXBQb2ludChnbG9iYWxDb29yZHMpO1xuXG4gICAgaWYgKG9iamVjdHMgJiYgb2JqZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjYWxsYmFjayhvYmplY3RzKTtcbiAgICB9XG5cbiAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uLy4uL2NvcmUvT2JqZWN0JztcbmltcG9ydCB7IGNyZWF0ZUhleGFnb24gfSBmcm9tICcuLi91dGlscy9jcmVhdGVIZXhhZ29uJztcbmltcG9ydCBoZXhhZ29uTWF0aCBmcm9tICcuLi91dGlscy9oZXhhZ29uTWF0aCc7XG5cbnZhciBzaGFwZTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfaGV4YSBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7IHJhZGl1czogMCB9KSB7XG4gICAgdmFyIHNoYXBlO1xuXG4gICAgY29uc3QgSEVJR0hUID0gaGV4YWdvbk1hdGguY2FsY0hlaWdodChleHRyYS5yYWRpdXMpO1xuICAgIGNvbnN0IFNJREUgPSBoZXhhZ29uTWF0aC5jYWxjU2lkZShleHRyYS5yYWRpdXMpO1xuXG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcik7XG5cbiAgICB2YXIgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShleHRyYS5yYWRpdXMpO1xuICAgIHRoaXMucmVnWCA9IGhleGFnb25TaXplLnggLyAyO1xuICAgIHRoaXMucmVnWSA9IGhleGFnb25TaXplLnkgLyAyO1xuICAgIHRoaXMuSEVJR0hUID0gSEVJR0hUO1xuICAgIHRoaXMuU0lERSA9IFNJREU7XG5cbiAgICBpZiAoIWV4dHJhLnJhZGl1cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVlZCByYWRpdXMhXCIpO1xuICAgIH1cblxuICAgIC8qIERyYXcgaGV4YWdvbiB0byB0ZXN0IHRoZSBoaXRzIHdpdGggaGl0QXJlYSAqL1xuICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKGV4dHJhLnJhZGl1cyk7XG4gIH1cbiAgc3RhdGljIGdldFNoYXBlKCkge1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRBbmRHZXRTaGFwZShyYWRpdXMpIHtcbiAgaWYgKCFzaGFwZSkge1xuICAgIGxldCBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKHJhZGl1cyk7XG4gICAgLyogeCBhbmQgeSBhcmUgcmV2ZXJzZWQsIHNpbmNlIHRoaXMgaXMgaG9yaXpvbnRhbCBoZXhhZ29uIGFuZCBjYWxjdWxhdGlvbnMgYXJlIGZvciB2ZXJ0aWNhbCAqL1xuICAgIHNoYXBlID0gY3JlYXRlSGV4YWdvbih7IHg6IGhleGFnb25TaXplLnkgLyAyLCB5OiBoZXhhZ29uU2l6ZS54IC8gMiB9LCByYWRpdXMpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbl9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0X2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNfaGV4YVwiO1xuICB9XG59IiwiLypDYWxjdWxhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjZW50ZXIgaGV4YWdvbiBhbHdheXMgYW5kIGdldCBvYmplY3RzIGJhc2VkIG9uIHRoZSBjb29yZGluYXRlcy4gRm9yIGV4YW1wbGUgd2l0aFxuICBzb21lIG1ldGhvZCBsaWtlIGdldEFsbE9iamVjdHNJbkhleGFnb24uXG5TTzpcbldlIGNyZWF0ZSBhIGZ1bmN0aW9uIGZvciBsYXllcnMsIGxpa2UgXCJtYXBfdXRpbHNfaGV4YWdvbj8gLT4gZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljayh4LHkpLCBnZXRPYmplY3RzSW5IZXhhZ29uKGhleGFnb24/KVwiXG4tIFRoZXJlIHdlIG9ubHkgZmluZCBvdXQgYWJvdXQgdGhlIGNvb3JkaW5hdGVzIGZvciB0aGUgb2JqZWN0LCB3ZSBkb250IHVzZSBnZXRPQmplY3RVbmRlclBvaW50LiBJZiB0aGUgY29vcmRzIGVxdWFsIHRvXG50aG9zZSBnb3R0ZW4gZnJvbTogZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljaywgdGhlbiB0aGF0IG9iamVjdCBpcyBhZGRlZCB0byByZXR1cm5lZCBhcnJheS4gV2UgY2FuIGFsc28gY2FjaGUgdGhlc2UgaWZcbm5lZWRlZCBmb3IgcGVyZm9ybWFuY2VcblxuSE9XIHdlIGRvIHRoZSB3aG9sZSBvcmdhbml6YXRpb25hbCBzdHVmZj9cbi0gbWFwX21vdmVcbi0gbWFwX3V0aWxzX2hleGFnb24/IC0+IGdldEhleGFnb25Db29yZHNGcm9tQ2xpY2soeCx5KSwgZ2V0T2JqZWN0c0luSGV4YWdvbihoZXhhZ29uPylcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgeyBtYXBfY29vcmRzX2hvcml6b250YWxIZXggfSBmcm9tICcuLi9jb29yZGluYXRlcy9NYXBfY29vcmRzX2hvcml6b250YWxIZXgnO1xuaW1wb3J0IHsgc2V0dXBIZXhhZ29uQ2xpY2sgfSBmcm9tICcuLi9ldmVudExpc3RlbmVycy9zZWxlY3QnO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi8uLi9jb3JlL1VJJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4uLy4uL2NvcmUvTWFwX2xheWVyJztcblxuZXhwb3J0IGxldCBvYmplY3Rfc2VsZWN0X2hleGFnb24gPSAoZnVuY3Rpb24gb2JqZWN0X3NlbGVjdF9oZXhhZ29uKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwT2JqKSB7XG4gICAgLyogV2UgdGFrZSB0aGUgdG9wLW1vc3Qgc3RhZ2Ugb24gdGhlIG1hcCBhbmQgYWRkIHRoZSBsaXN0ZW5lciB0byBpdCAqL1xuICAgIF9jcmVhdGVQcm90b3R5cGVzKG1hcE9iaik7XG5cbiAgICBfc3RhcnRDbGlja0xpc3RlbmVyKG1hcE9iaik7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIGZ1bmN0aW9uIGdldE9iamVjdHNGb3JNYXAoY2xpY2tDb29yZHMpIHtcbiAgICB2YXIgb2JqZWN0cyA9IHRoaXMuX3N0YWdlLmdldE9iamVjdHNVbmRlclBvaW50KGNsaWNrQ29vcmRzLngsIGNsaWNrQ29vcmRzLnkpO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0ZvckxheWVyKGNsaWNrQ29vcmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQueCA9PT0gY2xpY2tDb29yZHMueCAmJiBjaGlsZC55ID09PSBjbGlja0Nvb3Jkcy55KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgLyogPT09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09PSAqL1xuICAvKipcbiAgICogQXR0YWNoZWQgdGhlIGNvcnJlY3QgcHJvdG90eXBlcyB0byBtYXAuIEkgZG8gbm90IHRoaW5rIHdlIG5lZWQgdG8gb3ZlcnJpZGUgZ2V0T2JqZWN0c1VuZGVyUG9pbnQgZm9yIHN0YWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZVByb3RvdHlwZXMobWFwKSB7XG4gICAgbWFwLl9fcHJvdG9fXy5nZXRPYmplY3RzVW5kZXJNYXBQb2ludCA9IGdldE9iamVjdHNGb3JNYXA7XG4gICAgTWFwX2xheWVyLl9fcHJvdG9fXy5nZXRPYmplY3RzVW5kZXJQb2ludCA9IGdldE9iamVjdHNGb3JMYXllcjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX3N0YXJ0Q2xpY2tMaXN0ZW5lciggbWFwLCBjYW52YXMgKSB7XG4gICAgdmFyIHNpbmdsZXRvblVJID0gVUkoKTtcblxuICAgIHJldHVybiBzZXR1cEhleGFnb25DbGljayhtYXAsIHNpbmdsZXRvblVJLnNob3dTZWxlY3Rpb25zKTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGFuZ2xlID0gMzApIHtcbiAgdmFyIHNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIHZhciBjb2xvciA9IFwiIzQ0NDQ0NFwiO1xuICB2YXIgcG9pbnRTaXplID0gMDtcblxuICBzaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoY29sb3IpXG4gICAgLmRyYXdQb2x5U3RhciAoIGNvb3Jkcy54LCBjb29yZHMueSwgcmFkaXVzLCA2LCBwb2ludFNpemUsIGFuZ2xlICk7XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogTk9URTogVGhlc2UgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgaGV4YWdvbnMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNIZWlnaHQocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY1NpZGUocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiAzIC8gMjtcbn1cblxuLyogTW9kaWZpZWQgRnJvbSBqYXZhIGV4YW1wbGU6IGh0dHA6Ly9ibG9nLnJ1c2xhbnMuY29tLzIwMTEvMDIvaGV4YWdvbmFsLWdyaWQtbWF0aC5odG1sXG4gICBUaGlzIGlzIHN1cHBvc2VkIHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCBoZXhhZ29uYWwgaW5kZXgsIHRoYXQgcmVwcmVzZW50cyB0aGUgaGV4YWdvbiB0aGUgcGxheWVyIGNsaWNrZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpIHtcbiAgdmFyIEhFSUdIVCA9IHJhZGl1cyAqIE1hdGguc3FydCgzKTtcbiAgdmFyIFNJREUgPSByYWRpdXMgKiAzIC8gMjtcblxuICB2YXIgY2kgPSBNYXRoLmZsb29yKHgvU0lERSk7XG4gIHZhciBjeCA9IHggLSBTSURFICogY2k7XG5cbiAgdmFyIHR5ID0geSAtIChjaSAlIDIpICogSEVJR0hUIC8gMjtcbiAgdmFyIGNqID0gTWF0aC5mbG9vciggdHkgLyBIRUlHSFQpO1xuICB2YXIgY3kgPSB0eSAtIEhFSUdIVCAqIGNqO1xuXG4gIGlmIChjeCA+IE1hdGguYWJzKHJhZGl1cyAvIDIgLSByYWRpdXMgKiBjeSAvIEhFSUdIVCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmIChjb29yZGluYXRlSW5kZXhlcy54IDwgMCAmJiBjb29yZGluYXRlSW5kZXhlcy54IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImNsaWNrIG91dHNpZGUgb2YgdGhlIGhleGFnb24gYXJlYVwiKTtcbiAgfVxuICBjZW50ZXJDb29yZHMgPSB7XG4gICAgeDogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy54ICogaGV4YVNpemUueCArIGhhbGZIZXhhU2l6ZS54KSxcbiAgICB5OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnkgKiBoZXhhU2l6ZS55ICsgaGFsZkhleGFTaXplLnkpXG4gIH07XG5cbiAgcmV0dXJuIGNlbnRlckNvb3Jkcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FsY0hlaWdodDogY2FsY0hlaWdodCxcbiAgY2FsY1NpZGU6IGNhbGNTaWRlLFxuICBzZXRDZWxsQnlQb2ludDogc2V0Q2VsbEJ5UG9pbnQsXG4gIGdldEhleGFTaXplOiBnZXRIZXhhU2l6ZSxcbiAgdG9IZXhhQ2VudGVyQ29vcmQ6IHRvSGV4YUNlbnRlckNvb3JkXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuQ3JlYXRpbmcgdGhlIGNyZWF0ZWpzUXVldWUtb2JqZWN0IGZyb20gc3ByaXRlc2hlZXQuIFRoaXMgcHJlbG9hZHMgYXNzZXN0cy5cblxuQHJlcXVpcmVzIGNyZWF0ZWpzIENyZWF0ZWpzIGxpYnJhcnkgLyBmcmFtZXdvcmsgb2JqZWN0IC0gZ2xvYmFsIG9iamVjdFxuQHBhcmFtIHtzdHJpbmd9IGJhc2VQYXRoXG5AdG9kbyBNYWtlIGEgbG9hZGVyIGdyYXBoaWNzIC8gbm90aWZpZXIgd2hlbiBsb2FkaW5nIGFzc2V0cyB1c2luZyBwcmVsb2FkZXIuXG5cblVzYWdlOiBwcmVsb2FkLmdlbmVyYXRlKFwiaHR0cDovL3BhdGguZmkvcGF0aFwiKS5vbkNvbXBsZXRlKCkudGhlbihmdW5jdGlvbigpIHt9KTtcbiovXG5leHBvcnQgY2xhc3MgcHJlbG9hZCBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gIH1cbiAgcmVzb2x2ZU9uQ29tcGxldGUgKCkge1xuICAgIHZhciBiaW5kZWRPbkNvbXBsZXRlID0gX29uQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGJpbmRlZE9uQ29tcGxldGUpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICBmdW5jdGlvbiBfb25Db21wbGV0ZShyZXNvbHZlKSB7XG4gICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbG9hZE1hbmlmZXN0ICguLi5hcmdzKSB7XG4gICAgc3VwZXIubG9hZE1hbmlmZXN0KC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0RXJyb3JIYW5kbGVyIChlcnJvckNCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIGVycm9yQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0UHJvZ3Jlc3NIYW5kbGVyIChwcm9ncmVzc0NCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIHByb2dyZXNzQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWN0aXZhdGVTb3VuZCAoKSB7XG4gICAgdGhpcy5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgfVxufSIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XG4gIElEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBtYXBTaXplOiB7IHg6IDUwLCB5OiAyMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX2RyYWdcIiwgXCJvYmplY3Rfc2VsZWN0X2hleGFnb25cIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhcnRQb2ludDogeyB4OiAwLCB5OiAwIH0sXG4gIGVsZW1lbnQ6IFwiI21hcENhbnZhc1wiLFxuICBsYXllcnM6IFt7XG4gICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICBjb29yZDogeyB4OiAwLCB5OiAwIH0sXG4gICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgc3BlY2lhbHM6IFt7XG4gICAgICBcImludGVyYWN0aXZlXCI6IGZhbHNlXG4gICAgfV0sXG4gICAgb3B0aW9uczoge1xuICAgICAgY2FjaGU6IHRydWVcbiAgICB9LFxuICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgIHR5cGU6IFwiT2JqZWN0X3RlcnJhaW5cIixcbiAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSx7XG4gICAgICAgICBcIm9ialR5cGVcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzJcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjQxXCIsXG4gICAgICAgICAgICBcInlcIjpcIjcwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfSx7XG4gICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgXCJuYW1lXCI6IFwidW5pdExheWVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgfSxcbiAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRcIixcbiAgICAgIFwibmFtZVwiOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICBcIm9iamVjdHNcIjogW3tcbiAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgIFwiY29vcmRcIjoge1xuICAgICAgICAgIFwieFwiOiBcIjQxXCIsIFwieVwiOiBcIjcwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICBcInNvbWVDdXN0b21EYXRhXCI6IFwidHJ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjgyLFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo5NFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCIvYXNzZXRzL2ltZy9tYXAvdGVzdEhleGFnb25zL3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFswLDAsODIsOTRdLFs4MiwwLDgyLDk0XSxbMTY0LDAsODIsOTRdLFsyNDYsMCw4Miw5NF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls4Miw5NF1cbiAgICB9LFxuICAgIFwidGVycmFpblwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICB9LFxuICAgIFwiZGl0aGVyXCI6e1wiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2RpdGhlcjIucG5nXCJdLFwiZnJhbWVzXCI6W1swLDAsOTYsNDhdXSxcImltYWdlU2l6ZVwiOls5Niw0OF19LFxuICAgIFwicHJldHRpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvaGlsbHMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMi5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw2NiwwLDAsMThdLFsxLDEsOTYsNDgsMSwtNCw0XSxbMSwxNDgsOTYsNDgsMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicmVzb3VyY2VcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9yZXNvdXJjZXMvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxOTUsMSw5Niw0OF0sWzM4OSwxLDk2LDQ4XVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJwbGFjZVwiOnt9LFxuICAgIFwiY2l0eVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbWVkaWV2YWxjaXRpZXMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1cbiAgICAgIF1cbiAgICB9LFwiYnVpbGRpbmdcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXCJtb2RpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInVuaXRcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC91bml0cy90ZXN0SGV4YWdvblVuaXRzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6e1wid2lkdGhcIjo4MixcImhlaWdodFwiOjk0fVxuICAgIH1cbiAgfSxcbiAgXCJvYmplY3REYXRhXCI6IHtcbiAgICBcInVuaXRcIjpbe1xuICAgICAgICBcIm5hbWVcIjpcInRhbmtcIixcbiAgICAgICAgXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxuICAgICAgICBcImRlZlwiOlwiUG9vclwiLFxuICAgICAgICBcInNpZWdlXCI6XCJEZWNlbnRcIixcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcbiAgICAgICAgXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICAgIH0se1xuICAgICAgICBcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJ1bml0XCI6e1xuICAgICAgICAgICAgXCJfZW5lbXlfXCI6W3tcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgXCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOlt7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAwXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMlwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDJcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAzXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDVcIlxuICAgIH1dLFxuICAgIFwidGVycmFpblwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwiZGVzZXJ0XCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwidmVyeSBkcnkgbGFuZFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiVW5pdFwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcImRlc2NcIjpcIlNpYmVyaWEgdGVhY2hlcyB5b3VcIixcImltYWdlXCI6XCI2XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXCJkZXNjXCI6XCJDcmFuYmVycmllcyBhbmQgY2xvdWRiZXJyaWVzXCIsXCJpbWFnZVwiOlwiOFwiXG4gICAgICAgIH1dLFxuICAgIFwiZGl0aGVyXCI6W1xuICAgICAge1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXG4gICAgXCJwcmV0dGlmaWVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMjUlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJ6SW5kZXhcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNjAlXCJ9XSxcInJlc291cmNlXCI6W3tcIm5hbWVcIjpcIk9hc2lzXCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwiT2FzaXMgaW4gdGhlIG1pZGRsZSBvZiBkZXNlcnQsIG9yIG5vdCBhdG0uXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJmb29kIHByb2R1Y3Rpb24gNSAvIHdlZWtcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiT2lsXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQmxhY2sgZ29sZFwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiVGhlcmUgaXMgYSBsb3Qgb2Ygb2lsIGhlcmVcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiNFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwiY2l0eVwiOlt7XCJuYW1lXCI6XCJNZWRpZXZhbFwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIwXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk1lZGlldmFsMlwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIxXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcInBsYWNlXCI6W10sXCJidWlsZGluZ1wiOlt7XCJuYW1lXCI6XCJCYXJyYWNrc1wiLFwiaW1hZ2VcIjpcIjBcIixcInRvb2x0aXBcIjpcIkVuYWJsZXMgdHJvb3AgcmVjcnVpdG1lbnRcIn0se1wibmFtZVwiOlwiRmFjdG9yeVwiLFwiaW1hZ2VcIjpcIjFcIixcInRvb2x0aXBcIjpcIlByb2R1Y2VzIHdlYXBvbnJ5XCJ9XSxcImdvdmVybm1lbnRcIjpbe1wibmFtZVwiOlwiRGVtb2NyYXp5XCIsXCJkZXNjcmlwdGlvblwiOlwid2VsbCBpdCdzIGEgZGVtb2NyYXp5IDopXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyArMjAlIGhhcHBpbmVzc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMCwxXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaGFwcGluZXNzXCI6XCIyMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ29tbXVuaXNtXCIsXCJkZXNjcmlwdGlvblwiOlwiWW91IGtub3cgdGhlIG9uZSB1c2VkIGluIHRoZSBncmVhdCBVU1NSIGFuZCBpbnNpZGUgdGhlIGdyZWF0IGZpcmV3YWxsIG9mIENoaW5hXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyBwcm9kdWN0aW9uIGJvbnVzZXNcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzIsM10sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOnt9fV19fSxcIkNpdHlcIjp7XCJidWlsZGluZ1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiMjAlXCJ9fV19fX19XSxcInBvbGl0aWNzXCI6e1widGF4UmF0ZVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImNvcnJ1cHRpb25cIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJhbGlnbm1lbnRcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJoYXBwaW5lc3NcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJyZXZvbHRSaXNrXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwidW5pdHlcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJuYXRWYWx1ZVwiOlt7XCJuYW1lXCI6XCJJbnRlZ3JpdHlcIixcInRvb2x0aXBcIjpcIkdvdmVybm1lbnQgYW5kIHBvcHVsYXRpb25zIHNob3dzIGludGVncml0eSBhbmQgdHJ1c3R3b3J0aGluZXNzXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImludGVybmFsUmVsYXRpb25zXCI6XCIrMTAlXCIsXCJkaXBsb21hY3lcIjpcIisxMCVcIixcInJldm9sdCByaXNrXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIi0yMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ2FwaXRhbGlzbVwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkaXBsb21hY3lcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJtb3JhbGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJIYXJkd29ya2luZ1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIisxMCVcIixcImhhcHBpbmVzc1wiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiTGVhZGVyc2hpcFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIis1JVwiLFwiaGFwcGluZXNzXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwidHJhZGluZ1wiOlwiKzEwJVwifX1dfX19fV19fVxufTsiXX0=
