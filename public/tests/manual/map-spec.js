(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _componentsFactoriesHorizontalHexaFactory = require('../../components/factories/horizontalHexaFactory');

/* Read data from files, to use with testing */

var _testsDataGameData = require('../../tests/data/gameData');

var _testsDataTypeData = require('../../tests/data/typeData');

var _testsDataMapData = require('../../tests/data/mapData');

var _componentsPreloadingPreloading = require('../../components/preloading/preloading');

/* ===== Import plugins ===== */

var _componentsMapCoreMoveMap_drag = require('../../components/map/core/move/map_drag');

var _componentsMapCoreZoomMap_zoom = require('../../components/map/core/zoom/map_zoom');

var _componentsMapHexagonsObject_selectObject_select_hexagon = require('../../components/map/hexagons/object_select/object_select_hexagon');

var map;
window.initMap = function () {
  var canvasElement = document.getElementById('mapCanvas');

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

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log('PRELOADER ERROR', err);
  }
};

},{"../../components/factories/horizontalHexaFactory":3,"../../components/map/core/move/map_drag":13,"../../components/map/core/zoom/map_zoom":16,"../../components/map/hexagons/object_select/object_select_hexagon":21,"../../components/preloading/preloading":24,"../../tests/data/gameData":25,"../../tests/data/mapData":26,"../../tests/data/typeData":27}],2:[function(require,module,exports){
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
      thisLayer = map.addLayers(layerData.name, 2, false, layerData.coord);
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

},{"../map/core/Map":5,"../map/core/UI":9,"../map/core/UI/default/default.js":10,"../map/core/spritesheetList":14,"../map/hexagons/object/Object_terrain_hexa":19,"../map/hexagons/object/Object_unit_hexa":20}],4:[function(require,module,exports){
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
'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== 3rd party imports ====== */

//var System = require('es6-module-loader').System;
//import { System } from 'es6-module-loader';

/* ====== Own module imports ====== */

var _Map_stage = require('./Map_stage');

var _Map_layer = require('./Map_layer');

/** ===== EXPORT ===== */

/**
 * @param {object} options
 * {
 *  mapSize: {
 *    x: Number,
 *    y: Number
 * }
 *
 * Plugins are provided in an array of plugin functions
*/

var LISTENER_TYPES = {
  'mousemove': 'stagemousemove',
  'mouseup': 'stagemouseup',
  'mousedown': 'stagemousedown',
  'mousewheel': 'wheel'
};

var Map = (function () {
  function Map(canvas, options) {
    _classCallCheck(this, Map);

    if (!canvas) {
      throw new Error(this.constructor.name + ' needs canvas!');
    }
    options = options || {};
    this._stage = new _Map_stage.Map_stage('daddyStage', canvas);
    this.mommyLayer = new _Map_layer.Map_layer('mommyLayer', options.type, options.subContainers, options.startCoord);
    this._stage.addChild(this.mommyLayer);
    this.plugins = [];
    this.mapSize = options.mapSize || { x: 0, y: 0 };
    this.activeTickCB = false;
    this._fullScreenFunction = null;
    this._eventListeners = _getEmptyEventListenerArray();
    this._drawMapOnNextTick = false;
  }

  _createClass(Map, [{
    key: 'init',
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
    value: function drawOnNextTick() {
      this._drawMapOnNextTick = true;
    }
  }, {
    key: 'drawMap',
    value: function drawMap() {
      this._stage.update();

      return this;
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
    key: 'setSize',
    value: function setSize(width, height) {
      this.mapSize = { x: width, y: height };

      return this.mapSize;
    }
  }, {
    key: 'addLayers',
    value: function addLayers(name, type, subContainers, coord) {
      var layer = new _Map_layer.Map_layer(name, type, subContainers, coord);

      this.mommyLayer.addChild(layer);

      return layer;
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      this.mommyLayer.removeChild(layer);

      return layer;
    }
  }, {
    key: 'getLayerNamed',
    value: function getLayerNamed(name) {
      return this.mommyLayer.getChildNamed(name);
    }
  }, {
    key: 'moveMap',
    value: function moveMap(coordinates) {
      this.mommyLayer.move(coordinates);

      this.drawMap();

      return this;
    }
  }, {
    key: 'cacheMap',
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
    value: function getObjectsUnderMapPoint(clickCoords) {
      var objects = [];

      this.mommyLayer.getObjectsUnderPoint(clickCoords);

      return objects;
    }
  }, {
    key: 'activateFullSize',
    value: function activateFullSize() {
      this._fullScreenFunction = _setToFullSize.bind(this);
      window.addEventListener('resize', this._fullScreenFunction);
    }
  }, {
    key: 'deactivateFullSize',
    value: function deactivateFullSize() {
      window.removeEventListener('resize', this._fullScreenFunction);
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

      pluginsArray.forEach(function (pluginToUse) {
        _this2.plugins[pluginToUse.pluginName] = pluginToUse;
        _this2.plugins[pluginToUse.pluginName].init(_this2);
      });
    }
  }, {
    key: 'customTickOn',
    value: function customTickOn(tickCB) {
      if (this.activeTickCB) {
        throw new Error('there already exists one tick callback. Need to remove it first, before setting up a new one');
      }

      this.activeTickCB = tickCB || _handleTick.bind(this);

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
    key: 'setListener',
    value: function setListener(action, callback) {
      /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
      this._eventListeners[action].push(callback);
      this._stage.addEventListener(LISTENER_TYPES[action], callback);

      return this;
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      var _this3 = this;

      var listeners = this._eventListeners;

      Object.keys(listeners).forEach(function (typeIndex) {
        listeners[typeIndex].forEach(function (callback) {
          _this3._stage.off(LISTENER_TYPES[typeIndex], callback);
        });
      });
      listeners = _getEmptyEventListenerArray();

      return this;
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners(type) {
      var _this4 = this;

      var listeners = this._eventListeners;

      if (typeof type === 'string') {
        listeners[type].forEach(function (callback) {
          _this4._stage.off(LISTENER_TYPES[type], callback);
        });
      } else if (type instanceof Array) {
        type.forEach(function (thisType) {
          _this4._eventListeners[thisType].forEach(function (callback) {
            _this4._stage.off(LISTENER_TYPES[thisType], callback);
          });
        });
      }

      listeners = [];

      return this;
    }
  }]);

  return Map;
})();

exports.Map = Map;

/** ===== Private functions ===== */
/** == Context sensitive, you need to bind, call or apply these == */
function _handleTick() {
  if (this.mommyLayer.drawThisChild === true) {
    this.drawMap();
  }
}

function _setToFullSize() {
  var ctx = this._stage.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function _getEmptyEventListenerArray() {
  var objects = {};

  Object.keys(LISTENER_TYPES).forEach(function (type) {
    objects[type] = [];
  });

  return objects;
}
/* This should handle the default drawing of the map, so that map always updates when drawOnNextTick === true */
function _defaultTick(map) {
  createjs.Ticker.addEventListener('tick', _tickFunc);

  return _tickFunc;

  function _tickFunc() {
    if (map._drawMapOnNextTick === true) {
      map.drawMap();
      map._drawMapOnNextTick = false;
    }
  }
}

},{"./Map_layer":6,"./Map_stage":7}],6:[function(require,module,exports){
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

var _mapFunctions = require("./mapFunctions");

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

Map_layer.prototype.addPrototype = _mapFunctions.addPrototype;

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

},{"./mapFunctions":11}],7:[function(require,module,exports){
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

var _map_validators = require("./map_validators");

var _mapFunctions = require("./mapFunctions");

/** ===== Private functions declared ===== */
var privateFunctions = {};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _map_validators.validatorMod.isIndex,
  _is_boolean: _map_validators.validatorMod.isBoolean,
  _is_coordinates: _map_validators.validatorMod.isCoordinates,
  _is_SubContainerAmount: _map_validators.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _map_validators.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _map_validators.validatorMod.isUseOfSubContainers
};

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
    key: "setCacheEnabled",
    value: function setCacheEnabled(status) {
      validators._is_boolean(status);
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

Map_stage.prototype.addPrototype = _mapFunctions.addPrototype;

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

},{"./mapFunctions":11,"./map_validators":12}],8:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPrototype = addPrototype;

function addPrototype(name, functionToAdd) {
  this.superPrototype[name] = functionToAdd;
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** Hold different validator functions to be used in modules */

/** ===== Private functions declared ===== */
var privateFunctions = {
  _isInt: _isInt
};

/** ===== EXPORT ===== */
var validatorMod = (function validatorMod() {
  return {
    isIndex: function isIndex(int) {
      return privateFunctions.isInt(int);
    },
    isBoolean: function isBoolean(bool) {
      return bool === Boolean(bool);
    },
    isCoordinates: function isCoordinates(x, y) {
      if (privateFunctions.isInt(x) && privateFunctions.isInt(y)) {
        return true;
      }

      return false;
    },
    isSubContainerAmount: function isSubContainerAmount() {},
    isUseOfSubLayers: function isUseOfSubLayers() {},
    isUseOfSubContainers: function isUseOfSubContainers() {}
  };
})();

exports.validatorMod = validatorMod;
/** ===== Private functions ===== */
function _isInt(wannabeInt) {
  /* ES6 */
  if (Number.isInteger) {
    return Number.isInteger(wannabeInt);
  }

  /* ES5 */
  return typeof wannabeInt === 'number' && wannabeInt % 1 === 0;
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  scope.init = function (mapObj) {
    mapObj.setListener("mousedown", _startDragListener(mapObj));
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
          x: e.stageX,
          y: e.stageY
        });
        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */

        map.setListener("mousemove", _dragListener(map));
        map.setListener("mousemove", function (e) {
          /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
          if (e.nativeEvent.buttons === 0) {
            map.removeListeners(["mousemove", "mouseup"]);
          }
        });
        map.setListener("mouseup", function () {
          map.removeListeners(["mousemove", "mouseup"]);
        });
      } catch (e) {
        console.log(e);
      }
    };
  }
  /* Event listeners are in their separate file; eventListeners.js */
  function _dragListener(map) {
    try {
      return function dragger(e) {
        var offset = offsetCoords.getOffset();
        var moved = {
          x: e.stageX - offset.x,
          y: e.stageY - offset.y
        };

        map.moveMap(moved);

        offsetCoords.setOffset({
          x: e.stageX,
          y: e.stageY
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

},{}],14:[function(require,module,exports){
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

},{"blueimp-md5":2}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilsUtilsJs = require("../utils/utils.js");

"user strict";

var map_zoom = (function map_zoom() {
  var scope = {};
  var zoomLimit = {
    farther: 0.4,
    closer: 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;

  scope.pluginName = map_zoom.name;

  /** ==== Public functions */
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
    if (_isOverZoomLimit(amount)) this.scaleX -= zoomModifier;
    this.scaleY -= zoomModifier;
  }
  function zoomOut(amount) {
    if (_isOverZoomLimit(amount)) this.scaleX += zoomModifier;
    this.scaleY += zoomModifier;
  }
  /**
  * @param {Map object} mapObj - the Map class object
  */
  scope.init = function (map) {
    map.__proto__.zoomIn = zoomIn;
    map.__proto__.zoomOut = zoomOut;
    map.__proto__.setZoomLimits = setZoomLimits;
    map.__proto__.setZoomModifier = setZoomModifier;
    _startZoomListener(map);
  };

  return scope;

  function _startZoomListener(map) {
    try {
      /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
      map.setListener("mousewheel", _setupZoomEvent(map));
    } catch (e) {
      console.log(e);
    }
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

      map.update();
    };
  }
})();
exports.map_zoom = map_zoom;

},{"../utils/utils.js":15}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupHexagonClick = setupHexagonClick;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loggerLogJs = require("../../../logger/log.js");

var _loggerLogJs2 = _interopRequireDefault(_loggerLogJs);

function setupHexagonClick(map, callback) {
  try {
    onMouseDown(map, callback);
    onMouseUp(map, callback);
  } catch (e) {
    _loggerLogJs2["default"].debug(e, "onMouseDown or onMouseUp hexagonClick error:");
  }

  return true;
}

function onMouseDown(map, callback) {
  map.setListener("mousedown", function (e) {
    var globalCoords = { x: e.stageX, y: e.stageY };
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }
  });
}

function onMouseUp(map, element) {
  map.setListener("mouseup", function (e) {
    map.removeListeners("mouseup");
  });
}

},{"../../../logger/log.js":4}],18:[function(require,module,exports){
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

},{"../../core/Object":8,"../utils/createHexagon":22,"../utils/hexagonMath":23}],19:[function(require,module,exports){
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

},{"./Object_hexa":18}],20:[function(require,module,exports){
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

},{"./Object_hexa":18}],21:[function(require,module,exports){
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

},{"../../core/Map_layer":6,"../../core/UI":9,"../eventListeners/select":17}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL21hbnVhbC9jcmVhdGVNYXAtdGVzdC5lczYuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbG9nZ2VyL2xvZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21hcEZ1bmN0aW9ucy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tYXBfdmFsaWRhdG9ycy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tb3ZlL21hcF9kcmFnLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS91dGlscy91dGlscy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS96b29tL21hcF96b29tLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9ldmVudExpc3RlbmVycy9zZWxlY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF90ZXJyYWluX2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3Rfc2VsZWN0L29iamVjdF9zZWxlY3RfaGV4YWdvbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvdXRpbHMvY3JlYXRlSGV4YWdvbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvdXRpbHMvaGV4YWdvbk1hdGguanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7d0RBTWEsa0RBQWtEOzs7O2lDQUVuRCwyQkFBMkI7O2lDQUMzQiwyQkFBMkI7O2dDQUM1QiwwQkFBMEI7OzhDQUMxQix3Q0FBd0M7Ozs7NkNBR3ZDLHlDQUF5Qzs7NkNBQ3pDLHlDQUF5Qzs7dUVBQzVCLG1FQUFtRTs7QUFFekcsSUFBSSxHQUFHLENBQUM7QUFDUixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVk7QUFDM0IsTUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFekQsS0FBRyxHQUFHLDhDQWhCQyxTQUFTLEVBZ0JBLGFBQWEscUJBZHRCLFFBQVEsb0JBRVIsT0FBTyxxQkFEUCxRQUFRLENBYTRDLENBQUM7O0FBRTVELE1BQUksSUFBSSxHQUFHLG9DQWJKLE9BQU8sQ0FhVSxLQUFLLENBQUUsQ0FBQztBQUNoQyxNQUFJLENBQUMsZUFBZSxDQUFFLG1CQUFtQixDQUFFLENBQUM7O0FBRTVDLE1BQUksQ0FBQyxZQUFZLENBQUMsQ0FBRTtBQUNsQixNQUFFLEVBQUUscUJBQXFCO0FBQ3pCLE9BQUcsRUFBQyxzRkFBc0Y7R0FDM0YsRUFBQztBQUNBLE1BQUUsRUFBRSxrQkFBa0I7QUFDdEIsT0FBRyxFQUFDLGdFQUFnRTtHQUNyRSxDQUFDLENBQUMsQ0FBQztBQUNKLE1BQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUNyQixJQUFJLENBQUMsWUFBVztBQUNmLFdBQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztBQUNqRSxPQUFHLENBQUMsSUFBSSxDQUFFLGdDQXRCUCxRQUFRLGlDQURSLFFBQVEsMkRBRVIscUJBQXFCLENBcUIrQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFFLENBQUM7R0FDeEYsQ0FBQyxDQUFDOzs7QUFHTCxXQUFTLG1CQUFtQixDQUFDLEdBQUcsRUFBRTtBQUNoQyxXQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBRSxDQUFDO0dBQ3RDO0NBQ0YsQ0FBQzs7O0FDNUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUM1UjtLQUNGLEVBQUMsVUFBVSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDdkk7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxD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QUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDLGdGQUFnRixFQUFDLFNBQVMsRUFBQywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGNBQWMsRUFBQyxFQUFFLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxnRUFBZ0UsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQztDQUNuOEgsQ0FBQztRQTlIUyxRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qID09PT09PSBMaWJyYXJ5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG4vL3ZhciBNYXAgPSByZXF1aXJlKCAnLi4vcHVibGljL2NvbXBvbmVudHMvbWFwL01hcCcpO1xuaW1wb3J0IHsgY3JlYXRlTWFwIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9mYWN0b3JpZXMvaG9yaXpvbnRhbEhleGFGYWN0b3J5Jztcbi8qIFJlYWQgZGF0YSBmcm9tIGZpbGVzLCB0byB1c2Ugd2l0aCB0ZXN0aW5nICovXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ2FtZURhdGEnO1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3R5cGVEYXRhJztcbmltcG9ydCB7IG1hcERhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL21hcERhdGEnO1xuaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxuLyogPT09PT0gSW1wb3J0IHBsdWdpbnMgPT09PT0gKi9cbmltcG9ydCB7IG1hcF9kcmFnIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvbWFwL2NvcmUvbW92ZS9tYXBfZHJhZ1wiO1xuaW1wb3J0IHsgbWFwX3pvb20gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL3pvb20vbWFwX3pvb20nO1xuaW1wb3J0IHsgb2JqZWN0X3NlbGVjdF9oZXhhZ29uIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0X3NlbGVjdC9vYmplY3Rfc2VsZWN0X2hleGFnb24nO1xuXG52YXIgbWFwO1xud2luZG93LmluaXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG5cbiAgbWFwID0gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG5cbiAgbGV0IHByZWwgPSBuZXcgcHJlbG9hZCggZmFsc2UgKTtcbiAgcHJlbC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKTtcbiAgICAvLy5zZXRQcm9ncmVzc0hhbmRsZXIoIHByb2dyZXNzSGFuZGxlciApXG4gIHByZWwubG9hZE1hbmlmZXN0KFsge1xuICAgIGlkOiBcInRlcnJhaW5fc3ByaXRlc2hlZXRcIixcbiAgICBzcmM6XCJodHRwOi8vd2FybWFwZW5naW5lLmxldmVsNy5maS9hc3NldHMvaW1nL21hcC90ZXN0SGV4YWdvbnMvdGVzdEhleGFnb25TcHJpdGVzaGVldC5wbmdcIlxuICB9LHtcbiAgICBpZDogXCJ1bml0X3Nwcml0ZXNoZWV0XCIsXG4gICAgc3JjOlwiaHR0cDovL3dhcm1hcGVuZ2luZS5sZXZlbDcuZmkvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi91bml0cy5wbmdcIlxuICB9XSk7XG4gIHByZWwucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJwcmVsb2FkaW5nIGNvbXBsZXRlPyBNYXAgc2hvdWxkIGJlIHJlYWR5IHRvIGluaXQ/XCIpO1xuICAgICAgbWFwLmluaXQoIFsgbWFwX3pvb20sIG1hcF9kcmFnLCBvYmplY3Rfc2VsZWN0X2hleGFnb24gXSwgeyB4OiA0MSwgeTogNDcgfSwgdW5kZWZpbmVkICk7XG4gICAgfSk7XG5cbiAgICAvKiA9PT09PT0gcHJpdmF0ZSBmdW5jdGlvbnMsIG9yIHRvIGJlIG1vdmVkIGVsc2V3aGVyZSA9PT09PT0gKi9cbiAgZnVuY3Rpb24gcHJlbG9hZEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhcIlBSRUxPQURFUiBFUlJPUlwiLCBlcnIgKTtcbiAgfVxufTsiLCIvKlxuICogSmF2YVNjcmlwdCBNRDUgMS4wLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLypcbiAgICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpIHtcbiAgICAgICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgICovXG4gICAgZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xuICAgICAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgICAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XG4gICAgICAgIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcblxuICAgICAgICB2YXIgaSwgb2xkYSwgb2xkYiwgb2xkYywgb2xkZCxcbiAgICAgICAgICAgIGEgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgICAgIGIgPSAtMjcxNzMzODc5LFxuICAgICAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBvbGRhID0gYTtcbiAgICAgICAgICAgIG9sZGIgPSBiO1xuICAgICAgICAgICAgb2xkYyA9IGM7XG4gICAgICAgICAgICBvbGRkID0gZDtcblxuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsICAxMjM2NTM1MzI5KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCAgNjQzNzE3NzEzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgICAgICAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDUsIC03MDE1NTg2OTEpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sICA5LCAgMzgwMTYwODMpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDUsICA1Njg0NDY0MzgpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sICA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDJdLCAgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNCwgLTM3ODU1OCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA0XSwgMTEsICAxMjcyODkzMzUzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNCwgIDY4MTI3OTE3NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sICAgICAgMTEsIC0zNTg1MzcyMjIpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDZdLCAyMywgIDc2MDI5MTg5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCAgNTMwNzQyNTIwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICA3XSwgMTAsICAxMTI2ODkxNDE1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDYsICAxODczMzEzMzU5KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgICAgICAgICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgICAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgICAgICAgICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYSwgYiwgYywgZF07XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiAzMjsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgb3V0cHV0W2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogODsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweEZGKSA8PCAoaSAlIDMyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgYmtleSA9IHJzdHIyYmlubChrZXkpLFxuICAgICAgICAgICAgaXBhZCA9IFtdLFxuICAgICAgICAgICAgb3BhZCA9IFtdLFxuICAgICAgICAgICAgaGFzaDtcbiAgICAgICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgICAgIGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuICAgICAgICBoYXNoID0gYmlubF9tZDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcbiAgICAgICAgdmFyIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICAgICAgICBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhleF90YWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MEYpICtcbiAgICAgICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICAgKi9cbiAgICBmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICAgKi9cbiAgICBmdW5jdGlvbiByYXdfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYXdfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1KHN0cmluZywga2V5LCByYXcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleF9tZDUoc3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYXdfbWQ1KHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXhfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXdfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZDU7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQubWQ1ID0gbWQ1O1xuICAgIH1cbn0odGhpcykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbk1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcblxuQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuKi9cblxuLyogPT09PT0gM3JkIHBhcnR5IGxpYnJhcnkgaW1wb3J0cyA9PT09PSAqL1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdzeXN0ZW1qcyc7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW5faGV4YSB9IGZyb20gJy4uL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdF9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhJztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL21hcC9jb3JlL1VJJztcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbmxldCBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgT2JqZWN0X3RlcnJhaW46IE9iamVjdF90ZXJyYWluX2hleGEsXG4gIE9iamVjdF91bml0OiBPYmplY3RfdW5pdF9oZXhhXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG4vKlxuQGFyZ3VtZW50IHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbkNvb3JkaW5hdGVzIGFyZSBhbHdheXMgZGVmYXVsdGVkIHRvIDAsMCBpZiBub25lIGFyZSBnaXZlbi5cbntcbiAgbWFwU2l6ZTogY3JlYXRlanMuUmVjdGFuZ2xlLFxuICBwbHVnaW5zVG9BY3RpdmF0ZTogW1xuICAgIFwibWFwL21vdmUvbWFwX21vdmVcIixcbiAgICBcIm1hcC9GT1cvbWFwX0ZPV1wiXG4gIF0sXG4gIHN0YWdlczogW3tcbiAgICB0eXBlOiBcIm1hcC9jb3JlL01hcF9TdGFnZVwiLFxuICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICBsYXllcnM6IFt7XG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dLFxuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV0sXG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c191bml0XCIsXG4gICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY2FudmFzRWxlbWVudCwgZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcChjYW52YXNFbGVtZW50LCB7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyAqL1xuICAvKiBUaGUgc3lzdGVtIGRvZXMgbm90IHdvcmsgOihcbiAgaWYoZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwICYmIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcC5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLm1hcCh4ID0+IFN5c3RlbS5pbXBvcnQoeCkpKVxuICAgICAgLnRoZW4oKFttb2R1bGUxLCBtb2R1bGUyLCBtb2R1bGUzXSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBsdWdpbnMgbG9hZGVkXCIpO1xuICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xuICAgICAgfSk7XG4gIH1cbiAgKi9cblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICB0cnkge1xuICAgICAgdGhpc0xheWVyID0gbWFwLmFkZExheWVycyggbGF5ZXJEYXRhLm5hbWUsIDIsIGZhbHNlLCBsYXllckRhdGEuY29vcmQgKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbTpcIiwgbGF5ZXJEYXRhLnR5cGUsIGUuc3RhY2spO1xuICAgIH1cblxuICAgIGxheWVyRGF0YS5vYmplY3RHcm91cHMuZm9yRWFjaCggb2JqZWN0R3JvdXAgPT4ge1xuICAgICAgbGV0IHNwcml0ZXNoZWV0O1xuICAgICAgbGV0IHNwcml0ZXNoZWV0VHlwZSA9IG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGE7XG5cbiAgICAgIGlmKCFzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIHNwcml0ZXNoZWV0VHlwZS1kYXRhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKHNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXREYXRhID0gdHlwZURhdGEuZ3JhcGhpY0RhdGFbc3ByaXRlc2hlZXRUeXBlXTtcblxuICAgICAgICBzcHJpdGVzaGVldCA9IGFsbFNwcml0ZXNoZWV0cy5hZGRTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpO1xuICAgICAgfVxuXG4gICAgICBvYmplY3RHcm91cC5vYmplY3RzLmZvckVhY2goIG9iamVjdCA9PiB7XG4gICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XG5cbiAgICAgICAgaWYoIW9ialR5cGVEYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVOdW1iZXIgPSBvYmpUeXBlRGF0YS5pbWFnZTtcbiAgICAgICAgbGV0IG9iakRhdGEgPSB7XG4gICAgICAgICAgdHlwZURhdGE6IG9ialR5cGVEYXRhLFxuICAgICAgICAgIGFjdGl2ZURhdGE6IG9iamVjdC5kYXRhXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZCwgb2JqRGF0YSwgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgeyByYWRpdXM6IDQ3IH0gKTtcbiAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXdPYmplY3QgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBtYXAubW92ZU1hcChtYXBEYXRhLnN0YXJ0UG9pbnQpO1xuXG4gIHJldHVybiBtYXA7XG5cbi8qXG4gIENyZWF0ZVRlcnJhaW5TdGFnZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfYmFzZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfdGVycmFpblxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfZGl0aGVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9wcmV0dGlmaWVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9yZXNvdXJjZVxuICBDcmVhdGVVbml0U3RhZ2VcbiAgICBfQ3JlYXRlVW5pdExheWVyX1VuaXRcbiAgICBfQ3JlYXRlVW5pdExheWVyX0NpdHlcbiAgQ3JlYXRlRk9XU3RhZ2VcbiAgQ3JlYXRlRGF0YVN0YWdlXG4gIENyZWF0ZVVJU3RhZ2VcbiAgICBfQ3JlYXRlVUlMYXllcl9hcnJvd1xuICAgIF9DcmVhdGVVSUxheWVyX3NlbGVjdGlvblxuKi9cbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVidWc6IGZ1bmN0aW9uKGUsIGVycm9yVGV4dCkge1xuICAgIGxvZy5kZWJ1ZyhlcnJvclRleHQsIGUpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8vdmFyIFN5c3RlbSA9IHJlcXVpcmUoJ2VzNi1tb2R1bGUtbG9hZGVyJykuU3lzdGVtO1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdlczYtbW9kdWxlLWxvYWRlcic7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL01hcF9sYXllcic7XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICoge1xuICogIG1hcFNpemU6IHtcbiAqICAgIHg6IE51bWJlcixcbiAqICAgIHk6IE51bWJlclxuICogfVxuICpcbiAqIFBsdWdpbnMgYXJlIHByb3ZpZGVkIGluIGFuIGFycmF5IG9mIHBsdWdpbiBmdW5jdGlvbnNcbiovXG5cbmNvbnN0IExJU1RFTkVSX1RZUEVTID0ge1xuICBcIm1vdXNlbW92ZVwiOiBcInN0YWdlbW91c2Vtb3ZlXCIsXG4gIFwibW91c2V1cFwiOiBcInN0YWdlbW91c2V1cFwiLFxuICBcIm1vdXNlZG93blwiOiBcInN0YWdlbW91c2Vkb3duXCIsXG4gIFwibW91c2V3aGVlbFwiOiBcIndoZWVsXCJcbn07XG5cbmV4cG9ydCBjbGFzcyBNYXAge1xuICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbnMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fc3RhZ2UgPSBuZXcgTWFwX3N0YWdlKFwiZGFkZHlTdGFnZVwiLCBjYW52YXMpO1xuICAgIHRoaXMubW9tbXlMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJtb21teUxheWVyXCIsIG9wdGlvbnMudHlwZSwgb3B0aW9ucy5zdWJDb250YWluZXJzLCBvcHRpb25zLnN0YXJ0Q29vcmQpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMubW9tbXlMYXllcik7XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gICAgdGhpcy5tYXBTaXplID0gb3B0aW9ucy5tYXBTaXplIHx8IHsgeDowLCB5OjAgfTtcbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IGZhbHNlO1xuICAgIHRoaXMuX2Z1bGxTY3JlZW5GdW5jdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnMgPSBfZ2V0RW1wdHlFdmVudExpc3RlbmVyQXJyYXkoKTtcbiAgICB0aGlzLl9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xuICB9XG4gIGluaXQocGx1Z2lucywgY29vcmQsIHRpY2tDQikge1xuICAgIGlmIChwbHVnaW5zKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zKTtcbiAgICB9XG5cbiAgICBpZihjb29yZCkge1xuICAgICAgdGhpcy5tb21teUxheWVyLnggPSBjb29yZC54O1xuICAgICAgdGhpcy5tb21teUxheWVyLnkgPSBjb29yZC55O1xuICAgIH1cblxuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcbiAgICBfZGVmYXVsdFRpY2sodGhpcyk7XG4gICAgdGlja0NCICYmIHRoaXMuY3VzdG9tVGlja09uKHRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRyYXdPbk5leHRUaWNrKCkge1xuICAgIHRoaXMuX2RyYXdNYXBPbk5leHRUaWNrID0gdHJ1ZTtcbiAgfVxuICBkcmF3TWFwKCkge1xuICAgIHRoaXMuX3N0YWdlLnVwZGF0ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRTdGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhZ2U7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cblxuICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLm1hcFNpemUgPSB7IHg6d2lkdGgsIHk6aGVpZ2h0IH07XG5cbiAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xuICB9XG5cbiAgYWRkTGF5ZXJzKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XG4gICAgdmFyIGxheWVyID0gbmV3IE1hcF9sYXllcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBjb29yZCk7XG5cbiAgICB0aGlzLm1vbW15TGF5ZXIuYWRkQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG5cbiAgZ2V0TGF5ZXJOYW1lZChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubW9tbXlMYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpO1xuICB9XG4gIG1vdmVNYXAoY29vcmRpbmF0ZXMpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIubW92ZShjb29yZGluYXRlcyk7XG5cbiAgICB0aGlzLmRyYXdNYXAoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2FjaGVNYXAoKSB7XG4gICAgaWYodGhpcy5tb21teUxheWVyLmdldENhY2hlRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb21teUxheWVyLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgICAgIGNoaWxkLmNhY2hlKDAsIDAsIHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoY2xpY2tDb29yZHMpIHtcbiAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5tb21teUxheWVyLmdldE9iamVjdHNVbmRlclBvaW50KGNsaWNrQ29vcmRzKTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG5cbiAgYWN0aXZhdGVGdWxsU2l6ZSgpIHtcbiAgICB0aGlzLl9mdWxsU2NyZWVuRnVuY3Rpb24gPSBfc2V0VG9GdWxsU2l6ZS5iaW5kKHRoaXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2Z1bGxTY3JlZW5GdW5jdGlvbik7XG4gIH1cblxuICBkZWFjdGl2YXRlRnVsbFNpemUoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fZnVsbFNjcmVlbkZ1bmN0aW9uKTtcbiAgfVxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zIGZvciB0aGUgbWFwLiBNdXN0IGJlIGluIGFycmF5IGZvcm1hdDpcbiAgW3tcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lLFxuICAgIGFyZ3M6IFtcbiAgICAgIEZpcnN0IGFyZ3VtZW50LFxuICAgICAgc2Vjb25kIGFyZ3VtZW50LFxuICAgICAgLi4uXG4gICAgXVxuICB9XSAqL1xuICBhY3RpdmF0ZVBsdWdpbnMocGx1Z2luc0FycmF5KSB7XG4gICAgcGx1Z2luc0FycmF5LmZvckVhY2gocGx1Z2luVG9Vc2UgPT4ge1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gcGx1Z2luVG9Vc2U7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0uaW5pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGN1c3RvbVRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IF9oYW5kbGVUaWNrLmJpbmQodGhpcyk7XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjdXN0b21UaWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldExpc3RlbmVyKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvKiBUaGVyZSBoYXMgYmVlbiBzZXZlcmFsIGRpZmZlcmVudCBtb3VzZXdoZWVsIGV2ZW50cyBiZWZvcmUsIGJ1dCBub3cgYWxsIGV4Y2VwdCBvcGVyYSBzaG91bGQgc3VwcG9ydCBcIndoZWVsXCIgKi9cbiAgICB0aGlzLl9ldmVudExpc3RlbmVyc1thY3Rpb25dLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMuX3N0YWdlLmFkZEV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbYWN0aW9uXSwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudExpc3RlbmVycztcblxuICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCggdHlwZUluZGV4ID0+IHtcbiAgICAgIGxpc3RlbmVyc1t0eXBlSW5kZXhdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICB0aGlzLl9zdGFnZS5vZmYoTElTVEVORVJfVFlQRVNbdHlwZUluZGV4XSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgbGlzdGVuZXJzID0gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVMaXN0ZW5lcnModHlwZSkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudExpc3RlbmVycztcblxuICAgIGlmKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuICAgICAgbGlzdGVuZXJzW3R5cGVdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICB0aGlzLl9zdGFnZS5vZmYoTElTVEVORVJfVFlQRVNbdHlwZV0sIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgdHlwZS5mb3JFYWNoKHRoaXNUeXBlID0+IHtcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbdGhpc1R5cGVdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0YWdlLm9mZihMSVNURU5FUl9UWVBFU1t0aGlzVHlwZV0sIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMgPSBbXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4vKiogPT0gQ29udGV4dCBzZW5zaXRpdmUsIHlvdSBuZWVkIHRvIGJpbmQsIGNhbGwgb3IgYXBwbHkgdGhlc2UgPT0gKi9cbmZ1bmN0aW9uIF9oYW5kbGVUaWNrKCkge1xuICBpZiAodGhpcy5tb21teUxheWVyLmRyYXdUaGlzQ2hpbGQgPT09IHRydWUpIHtcbiAgICB0aGlzLmRyYXdNYXAoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfc2V0VG9GdWxsU2l6ZSgpIHtcbiAgbGV0IGN0eCA9IHRoaXMuX3N0YWdlLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBjdHguY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xufVxuZnVuY3Rpb24gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCkge1xuICB2YXIgb2JqZWN0cyA9IHt9O1xuXG4gIE9iamVjdC5rZXlzKExJU1RFTkVSX1RZUEVTKS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBvYmplY3RzW3R5cGVdID0gW107XG4gIH0pO1xuXG4gIHJldHVybiBvYmplY3RzO1xufVxuLyogVGhpcyBzaG91bGQgaGFuZGxlIHRoZSBkZWZhdWx0IGRyYXdpbmcgb2YgdGhlIG1hcCwgc28gdGhhdCBtYXAgYWx3YXlzIHVwZGF0ZXMgd2hlbiBkcmF3T25OZXh0VGljayA9PT0gdHJ1ZSAqL1xuZnVuY3Rpb24gX2RlZmF1bHRUaWNrKG1hcCkge1xuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgX3RpY2tGdW5jKTtcblxuICByZXR1cm4gX3RpY2tGdW5jO1xuXG4gIGZ1bmN0aW9uIF90aWNrRnVuYygpIHtcbiAgICBpZihtYXAuX2RyYXdNYXBPbk5leHRUaWNrID09PSB0cnVlKSB7XG4gICAgICBtYXAuZHJhd01hcCgpO1xuICAgICAgbWFwLl9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBhZGRQcm90b3R5cGUgYXMgbWFwRnVuY19hZGRQcm90b3R5cGUgfSBmcm9tIFwiLi9tYXBGdW5jdGlvbnNcIjtcblxuLyogPT09PT0gQ29uc3RhbnRzID09PT09ICovXG5jb25zdCBUWVBFUyA9IHtcbiAganVzdFN1YkNvbnRhaW5lcnM6IDEsXG4gIG5vU3ViQ29udGFpbmVyczogMixcbiAgaW1hZ2VzSW5TdWJDb250YWluZXJzOiAzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuc3VwZXJQcm90b3R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiAoIHR5cGUgfHwgVFlQRVMubm9TdWJDb250YWluZXJzICk7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgfVxuICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgfVxuICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkUHJvdG90eXBlKG5hbWUsIGZ1bmN0aW9uVG9BZGQpIHtcbiAgICBzdXBlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvblRvQWRkO1xuICB9XG4gIC8qIG92ZXJsb2FkZWQgaW5oZXJpdGVkIG1ldGhvZCAqL1xuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmICghdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgQ29udGFpbmVyIGRpcmVjdGx5LiBXZXRoZXIgaXQgaXMgQ29udGFpbmVyIG9yIEJpdG1hcCBldGMuICovXG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgY29ycmVjdCBzdWJDb250YWluZXIuIEZvciBiZXR0ZXIgbG9naWMgYW5kIHBlcmZvcm1hbmNlICovXG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IF9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgbW92ZShjb29yZGluYXRlcykge1xuICAgIGlmICh0aGlzLm1vdmFibGUpIHtcbiAgICAgIHRoaXMueCArPSBjb29yZGluYXRlcy54O1xuICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGVzLnk7XG4gICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxuICBzdGF0aWMgZ2V0VHlwZShuYW1lKSB7XG4gICAgcmV0dXJuIFRZUEVTW25hbWVdO1xuICB9XG59XG5NYXBfbGF5ZXIucHJvdG90eXBlLmFkZFByb3RvdHlwZSA9IG1hcEZ1bmNfYWRkUHJvdG90eXBlO1xuXG4vKiBUaGUgbm9kZS1lYXNlbCwgbm9yIG1pbmlmaWVkIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBTcHJpdGVTdGFnZSAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovXG4vKlxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5cbmV4cG9ydCBjbGFzcyBNYXBfc3ByaXRlc2hlZXRMYXllciBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIHNwcml0ZXNoZWV0KSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiB0eXBlO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy51c2VTdWJjb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxufVxuKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0Q29ycmVjdENvbnRhaW5lcih4LCB5KSB7XG4gIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gdGhpcy5nZXRPYmplY3RVbmRlclBvaW50KHgsIHkpO1xuXG4gIHJldHVybiBjb3JyZWN0U3ViQ29udGFpbmVyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBhZGRQcm90b3R5cGUgYXMgbWFwRnVuY19hZGRQcm90b3R5cGUgfSBmcm9tIFwiLi9tYXBGdW5jdGlvbnNcIjtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHsgfTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gIF9pc19ib29sZWFuOiB2YWxpZGF0b3JNb2QuaXNCb29sZWFuLFxuICBfaXNfY29vcmRpbmF0ZXM6IHZhbGlkYXRvck1vZC5pc0Nvb3JkaW5hdGVzLFxuICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gIF9pc19Vc2VPZlN1YkNvbnRhaW5lcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViQ29udGFpbmVyc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9zdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlN0YWdlIHtcbiAgLyogVGFrZXMgdGhlIGNhbnZhcyBlbGVtZW50IGFzIGFyZ3VtZW50ICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhcywgc3RhZ2VCb3VuZHMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTWFwX3N0YWdlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpXG4gICAgfVxuXG4gICAgc3VwZXIoY2FudmFzKTtcblxuICAgIGlmKHN0YWdlQm91bmRzKSB7XG4gICAgICB0aGlzLnNldEJvdW5kcygwLCAwLCBzdGFnZUJvdW5kcy54LCBzdGFnZUJvdW5kcy55KTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cGVyUHJvdG90eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICB9XG4gIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgZm9yIChsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICBpZiAobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbk1hcF9zdGFnZS5wcm90b3R5cGUuYWRkUHJvdG90eXBlID0gbWFwRnVuY19hZGRQcm90b3R5cGU7XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cblxuXG4vKlxuXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuaW1wb3J0IFNwcml0ZVN0YWdlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlU3RhZ2UnO1xuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVTdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZVN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGlzIGNsYXNzIG5lZWRzIHRvIGJlIGdvbmUgdGhyb3VnaCBjYXJlZnVsbHksIGl0IGhhcyBiZWVuIGNvcGllZCBmcm9tIGFuIG9sZGVyIHZlcnNpb24gc3RyYWlnaHQuIFRoZSB2ZXJzaW9uIHdhcyBFUzVcbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YVxuKi9cblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJnZW5lcmFsIE9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcblxuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gY3VycmVudEZyYW1lTnVtYmVyO1xuXG4gICAgLyogRXhlY3V0ZSBpbml0aWFsIGRyYXcgZnVuY3Rpb24gKi9cbiAgICB0aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuXG4gICAgLyogb3B0aW1pemF0aW9ucyAqL1xuICAgIHRoaXMuc2hhZG93ID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gU2hvdWxkIGJlIGVuYWJsZWQsIGlmIHRoZSBsYXllciBpcyBiZWluZyBpbnRlcmFjdGVkIHdpdGguIExpa2UgdW5pdCBsYXllci4gVGhpcyB3YXkgd2UgY2FuIHVzZSBjdXJzb3IgcG9pbnRlciBldGMuXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBGT1IgREVCVUdHSU5HIEFORCBTRUVJTkcgVEhBVCBMSVNURU5FUlMgQVJFIEFUVEFDSEVEOlxuICAgIC8vdGhpcy53aWxsVHJpZ2dlclxuICB9XG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICBjb25zb2xlLmxvZyhcIkhBQUFcIilcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgLyogVGhlIG1vdXNlIGNoZWNrIGhhcyBiZWVuIGVuYWJsZWQgb24gaGlnaGVyIHRpZXIsIHNvIG5vIG5lZWQgZm9yIHRoaXNcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlOyAqL1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZHJhd05ld0ZyYW1lKHgsIHksIG5ld0ZyYW1lTnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBuZXdGcmFtZU51bWJlcjtcblxuICAgIHJldHVybiB0aGlzLmlubmVyRHJhdyh4LCB5KTtcbiAgfVxuICAvKiBEdW5ubyBpZiB3ZSBuZWVkIHRoaXMgYW5kIHNvIG9uLiBUaGlzIHdhcyBpbiB0aGUgb2xkIHZlcnNpb24gKi9cbiAgZ2xvYmFsQ29vcmRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBOdW1iZXIoIHRoaXMueCArIHRoaXMucGFyZW50LnggKSxcbiAgICAgIHk6IE51bWJlciggdGhpcy55ICsgdGhpcy5wYXJlbnQueSApXG4gICAgfTtcbiAgfVxuICBnZXRCb3VuZHNGcm9tRnJhbWVzKCkge1xuICAgIHJldHVybiB0aGlzLnNwcml0ZVNoZWV0LmdldEZyYW1lQm91bmRzKCB0aGlzLmN1cnJlbnRGcmFtZSApO1xuICB9XG59IiwiLyoqXG4gIE1haW4gY2xhc3MgZm9yIHNob3dpbmcgVUkgb24gdGhlIG1hcC4gTGlrZSB1bml0IHNlbGVjdGlvbnMgYW5kIHN1Y2guIEhhcyBub3RoaW5nIHRvIGRvIHdpdGggc2hvd2luZyBvZmYtbWFwIGRhdGEuXG4gIEdvb2QgZXhhbXBsZXMgZm9yIHdoYXQgdGhpcyBzaG93cyBhcmU6IHNlbGVjdGVkIHVuaXRzLWxpc3QsIHNlbGVjdGlvbiBoaWdobGlnaHQgKGxpa2UgYSBjaXJjbGUgb24gdGhlIHNlbGVjdGVkIHVuaXQpIGFuZFxuICBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3AgaW4gdGhlIG1hcC5cbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NvcGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBVSSAoZ2l2ZW5VSVRoZW1lLCBnaXZlbk1hcCkge1xuICAvKiBUaGlzIGlzIGEgc2luZ2xldG9uIGNsYXNzLCBzbyBpZiBhbHJlYWR5IGluc3RhbnRpYXRlZCByZXR1cm4gc2NvcGUgKi9cbiAgaWYgKHNjb3BlKSB7XG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgaWYgKCFnaXZlblVJVGhlbWUgfHwgIWdpdmVuTWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVUktbW9kdWxlIHJlcXVpcmVzIFVJVGhlbWUgYW5kIG1hcE9ialwiKTtcbiAgfVxuXG4gIHZhciBtYXAgPSBnaXZlbk1hcDtcbiAgdmFyIFVJVGhlbWUgPSBnaXZlblVJVGhlbWU7XG4gIHNjb3BlID0ge307XG5cbiAgc2NvcGUuc2hvd1NlbGVjdGlvbnMgPSBmdW5jdGlvbiBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgcmV0dXJuIFVJVGhlbWUuc2hvd1NlbGVjdGlvbnMob2JqZWN0cyk7XG4gIH07XG4gIHNjb3BlLmhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0ID0gZnVuY3Rpb24gaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3Qob2JqZWN0KSB7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIi8qKlxuICBUaGUgc2ltcGxlc3QgZGVmYXVsdCBVSSBpbXBsZW1lbnRhdGlvbi4gSG9sZHM6XG4gIC0gU2VsZWN0aW9uIGhpZ2hsaWdodCBvZiBvYmplY3RcbiAgLSBTZWxlY3Rpb24gbGlzdCBvZiB1bml0cyBhdCB0aGUgaGV4YWdvblxuKi9cblxuLyogPT09PT09IDNyZCBwYXJ0eSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjbGFzcyBVSV9kZWZhdWx0IHtcbiAgY29uc3RydWN0b3IobW9kYWwsIHN0eWxlcykge1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpYWxvZ1wiKVswXTtcbiAgICB0aGlzLnN0eWxlcyA9IHN0eWxlcyB8fCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0YwRjBGMFwiXG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2luZ0VsZW1lbnRzID0gX0RPTUVsZW1lbnRzVG9BcnJheSh0aGlzLm1vZGFsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9jbG9zZVwiKSk7XG4gIH1cbiAgc2hvd1NlbGVjdGlvbnMob2JqZWN0cykge1xuICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIm9iamVjdHM6PGJyPlwiO1xuICAgICAgb2JqZWN0cy5tYXAoIG9iamVjdCA9PiB7XG4gICAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdC5kYXRhLnR5cGVEYXRhLm5hbWUgKyBcIjxicj5cIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIlNFTEVDVEVEOjxicj5cIjtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdHNbMF0uZGF0YS50eXBlRGF0YS5uYW1lO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KCBlbGVtZW50LCBzZWxmLm1vZGFsLmNsb3NlLmJpbmQoc2VsZi5tb2RhbCkgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudChlbGVtZW50LCBjbG9zZUNCKSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2xvc2VDQigpO1xuICAgICAgfSk7XG59XG5mdW5jdGlvbiBfRE9NRWxlbWVudHNUb0FycmF5KGVsZW1lbnRzKSB7XG4gIGlmICghZWxlbWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3RvciArIFwiIGZ1bmN0aW9uIG5lZWRzIGVsZW1lbnRzXCIpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgdmFyIGVsZW1lbnRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50QXJyYXkucHVzaChlbGVtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudEFycmF5O1xufSIsImV4cG9ydCBmdW5jdGlvbiBhZGRQcm90b3R5cGUgKG5hbWUsIGZ1bmN0aW9uVG9BZGQpIHtcbiAgdGhpcy5zdXBlclByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uVG9BZGQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogSG9sZCBkaWZmZXJlbnQgdmFsaWRhdG9yIGZ1bmN0aW9ucyB0byBiZSB1c2VkIGluIG1vZHVsZXMgKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgX2lzSW50XG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgbGV0IHZhbGlkYXRvck1vZCA9IChmdW5jdGlvbiB2YWxpZGF0b3JNb2QoKSB7XG4gIHJldHVybiB7XG4gICAgaXNJbmRleChpbnQpIHtcbiAgICAgIHJldHVybiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KGludCk7XG4gICAgfSxcbiAgICBpc0Jvb2xlYW4oYm9vbCkge1xuICAgICAgcmV0dXJuIGJvb2wgPT09IEJvb2xlYW4oYm9vbCk7XG4gICAgfSxcbiAgICBpc0Nvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICAgIGlmIChwcml2YXRlRnVuY3Rpb25zLmlzSW50KHgpICYmIHByaXZhdGVGdW5jdGlvbnMuaXNJbnQoeSkgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBpc1N1YkNvbnRhaW5lckFtb3VudCgpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkxheWVycygpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkNvbnRhaW5lcnMoKSB7XG5cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9pc0ludCh3YW5uYWJlSW50KSB7XG4gIC8qIEVTNiAqL1xuICBpZiAoTnVtYmVyLmlzSW50ZWdlcikge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHdhbm5hYmVJbnQpO1xuICB9XG5cbiAgLyogRVM1ICovXG4gIHJldHVybiB0eXBlb2Ygd2FubmFiZUludCA9PT0gJ251bWJlcicgJiYgKHdhbm5hYmVJbnQgJSAxKSA9PT0gMDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBsZXQgbWFwX2RyYWcgPSAoZnVuY3Rpb24gbWFwX2RyYWcoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICAvKiBGdW5jdGlvbiBmb3Igc2V0dGluZyBhbmQgZ2V0dGluZyB0aGUgbW91c2Ugb2Zmc2V0LiBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCBib3R0b20gKi9cbiAgdmFyIG9mZnNldENvb3JkcyA9IF9vZmZzZXRDb29yZHMoKTtcblxuICAvKiA9PT09PSBGb3IgdGVzdGluZyA9PT09PSAqL1xuICBzY29wZS5fc3RhcnREcmFnTGlzdGVuZXIgPSBfc3RhcnREcmFnTGlzdGVuZXI7XG5cbiAgc2NvcGUucGx1Z2luTmFtZSA9IG1hcF9kcmFnLm5hbWU7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXBPYmopIHtcbiAgICBtYXBPYmouc2V0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcE9iaikpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX3N0YXJ0RHJhZ0xpc3RlbmVyKCBtYXAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICB4OiBlLnN0YWdlWCxcbiAgICAgICAgICB5OiBlLnN0YWdlWVxuICAgICAgICB9KTtcbiAgICAgICAgLyogV2UgdGFrZSBhbGwgdGhlIGV2ZW50bGlzdGVuZXJzIHVuYmluZGluZ3MgdG8gdGhpcyBhcnJheSwgc28gd2UgY2FuIHVuYmluZCB0aGVtIHdoZW4gdGhlIG1vdXNlIGlzIHVwICovXG5cbiAgICAgICAgbWFwLnNldExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF9kcmFnTGlzdGVuZXIobWFwKSk7XG4gICAgICAgIG1hcC5zZXRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgLyogU28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgc3RvcCB3aGVuIG1vdXNlIGlzIHVwLCBldmVuIHRob3VnaCBtb3VzZXVwIGV2ZW50IHdvdWxkbid0IGZpcmUgKi9cbiAgICAgICAgICBpZihlLm5hdGl2ZUV2ZW50LmJ1dHRvbnMgPT09IDApIHtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVMaXN0ZW5lcnMoW1wibW91c2Vtb3ZlXCIsIFwibW91c2V1cFwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbWFwLnNldExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBtYXAucmVtb3ZlTGlzdGVuZXJzKFtcIm1vdXNlbW92ZVwiLCBcIm1vdXNldXBcIl0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICAvKiBFdmVudCBsaXN0ZW5lcnMgYXJlIGluIHRoZWlyIHNlcGFyYXRlIGZpbGU7IGV2ZW50TGlzdGVuZXJzLmpzICovXG4gIGZ1bmN0aW9uIF9kcmFnTGlzdGVuZXIobWFwKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBkcmFnZ2VyKGUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldENvb3Jkcy5nZXRPZmZzZXQoKTtcbiAgICAgICAgdmFyIG1vdmVkID0ge1xuICAgICAgICAgIHg6IGUuc3RhZ2VYIC0gb2Zmc2V0LngsXG4gICAgICAgICAgeTogZS5zdGFnZVkgLSBvZmZzZXQueVxuICAgICAgICB9O1xuXG4gICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcblxuICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICB4OiBlLnN0YWdlWCxcbiAgICAgICAgICB5OiBlLnN0YWdlWVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBUaGUgbW91c2UgaGFzIGJlZW4gbW92ZWQgYWZ0ZXIgcHJlc3NpbmcuIFRoaXMgcHJldmVudCB0aGUgY2xpY2tcbiAgICAgICAgICBldmVudCB0byBmaXJlIGF0IHRoZSBzYW1lIHRpbWUgd2l0aCB0aGUgbW91c2VEb3duIC8gZHJhZ2dpbmcgZXZlbnRcbiAgICAgICAgKi9cbiAgICAgICAgLy9tYXAubW91c2VNb3ZlZCggdHJ1ZSApO1xuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICAvKiA9PT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09ICovXG4gIGZ1bmN0aW9uIF9vZmZzZXRDb29yZHMoKSB7XG4gICAgdmFyIHNjb3BlID0ge307XG4gICAgdmFyIG9mZnNldENvb3JkcztcblxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHMgPSBjb29yZHM7XG4gICAgfTtcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH07XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYgKHNjb3BlLnNwcml0ZXNoZWV0QWxyZWFkeUV4aXN0cyggX2NyZWF0ZUlEKCBzcHJpdGVzaGVldERhdGEgKSApICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG5cbiAgICBhbGxTcHJpdGVzaGVldHMucHVzaCggc3ByaXRlU2hlZXQgKTtcblxuICAgIHJldHVybiBzcHJpdGVTaGVldDtcbiAgfTtcbiAgc2NvcGUucmVtb3ZlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXQpIHtcblxuICB9O1xuICBzY29wZS5nZXRBbGxTcHJpdGVzaGVldHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFsbFNwcml0ZXNoZWV0cztcbiAgfTtcbiAgc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0SUQpIHtcbiAgICByZXR1cm4gKCBhbGxTcHJpdGVzaGVldElEcy5pbmRleE9mKCBzcHJpdGVzaGVldElEICkgPiAtMSApO1xuICB9O1xuICBmdW5jdGlvbiBfY3JlYXRlSUQgKHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHJldHVybiAoIHNwcml0ZXNoZWV0RGF0YS5pbWFnZXMudG9TdHJpbmcoKSApO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCJleHBvcnQgdmFyIG1vdXNlVXRpbHMgPSAoIGZ1bmN0aW9uIG1vdXNlVXRpbHMoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGlzIGZyb206IGh0dHA6Ly93d3cuYWRvbWFzLm9yZy9qYXZhc2NyaXB0LW1vdXNlLXdoZWVsL1xuICAgIEl0IGRldGVjdHMgd2hpY2ggd2F5IHRoZSBtb3VzZXdoZWVsIGhhcyBiZWVuIG1vdmVkXG5cbiAgICBAcGFyYW0ge0V2ZW50fSBldmVudCBwYXNzIHRoZSBldmVudCB0byBkZWx0YUZyb21XaGVlbFxuICAgIEByZXR1cm4gZGVsdGEuIFBvc2l0aXZlIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi5cbiAgICAqL1xuICBzY29wZS5kZWx0YUZyb21XaGVlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIGRlbHRhID0gMDtcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cblxuICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgKSB7IC8qIElFL09wZXJhLiAqL1xuICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCApIHsgLyoqIE1vemlsbGEgY2FzZS4gKi9cbiAgICAgICAgLyogSW4gTW96aWxsYSwgc2lnbiBvZiBkZWx0YSBpcyBkaWZmZXJlbnQgdGhhbiBpbiBJRS5cbiAgICAgICAgICogQWxzbywgZGVsdGEgaXMgbXVsdGlwbGUgb2YgMy4gKi9cbiAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMztcbiAgICAgfVxuICAgICAvKiBQcmV2ZW50IGRlZmF1bHQgYWN0aW9ucyBjYXVzZWQgYnkgbW91c2Ugd2hlZWwuIEl0IG1pZ2h0IGJlIHVnbHkgKi9cbiAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxuICAgICB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uICovXG4gICAgIGlmICggZGVsdGEgKSByZXR1cm4gZGVsdGE7XG4gIH07XG4gIC8qKiBEZXRlY3QgcmlnaHQgY2xpY2sgKi9cbiAgc2NvcGUuaXNSaWdodENsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICB2YXIgcmlnaHRjbGljaztcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cbiAgICAgaWYgKCBldmVudC5idXR0b25zICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9ucyA9PSAyICk7XG4gICAgIGVsc2UgaWYgKCBldmVudC53aGljaCApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LndoaWNoID09IDMgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LmJ1dHRvbiApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbiA9PSAyICk7XG5cbiAgICAgaWYgKCByaWdodGNsaWNrICkgcmV0dXJuIHRydWU7XG5cbiAgICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICByZXR1cm4gc2NvcGU7XG59ICkoKTsiLCIndXNlciBzdHJpY3QnO1xuXG5pbXBvcnQgeyBtb3VzZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLmpzXCI7XG5cbmV4cG9ydCBsZXQgbWFwX3pvb20gPSAoZnVuY3Rpb24gbWFwX3pvb20oKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICB2YXIgem9vbUxpbWl0ID0ge1xuICAgIGZhcnRoZXI6IDAuNCxcbiAgICBjbG9zZXIgOiAyLjVcbiAgfTtcbiAgLyogSG93IG11Y2ggb25lIHN0ZXAgb2Ygem9vbWluZyBhZmZlY3RzOiAqL1xuICB2YXIgem9vbU1vZGlmaWVyID0gMC4xO1xuXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBtYXBfem9vbS5uYW1lO1xuXG4gIC8qKiA9PT09IFB1YmxpYyBmdW5jdGlvbnMgKi9cbiAgZnVuY3Rpb24gc2V0Wm9vbU1vZGlmaWVyIChhbW91bnQpIHtcbiAgICB6b29tTW9kaWZpZXIgPSBhbW91bnQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBzZXRab29tTGltaXRzIChmYXJ0aGVyLCBjbG9zZXIpIHtcbiAgICB6b29tTGltaXQuZmFydGhlciA9IGZhcnRoZXI7XG4gICAgem9vbUxpbWl0LmNsb3NlciA9IGNsb3NlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHpvb21JbiAoYW1vdW50KSB7XG4gICAgaWYoX2lzT3Zlclpvb21MaW1pdCggYW1vdW50ICkgKVxuXG4gICAgdGhpcy5zY2FsZVggLT0gem9vbU1vZGlmaWVyO1xuICAgIHRoaXMuc2NhbGVZIC09IHpvb21Nb2RpZmllcjtcbiAgfVxuICBmdW5jdGlvbiB6b29tT3V0IChhbW91bnQpIHtcbiAgICBpZihfaXNPdmVyWm9vbUxpbWl0KCBhbW91bnQgKSApXG5cbiAgICB0aGlzLnNjYWxlWCArPSB6b29tTW9kaWZpZXI7XG4gICAgdGhpcy5zY2FsZVkgKz0gem9vbU1vZGlmaWVyO1xuICB9XG4gIC8qKlxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIG1hcC5fX3Byb3RvX18uem9vbUluID0gem9vbUluO1xuICAgIG1hcC5fX3Byb3RvX18uem9vbU91dCA9IHpvb21PdXQ7XG4gICAgbWFwLl9fcHJvdG9fXy5zZXRab29tTGltaXRzID0gc2V0Wm9vbUxpbWl0cztcbiAgICBtYXAuX19wcm90b19fLnNldFpvb21Nb2RpZmllciA9IHNldFpvb21Nb2RpZmllcjtcbiAgICBfc3RhcnRab29tTGlzdGVuZXIobWFwKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgZnVuY3Rpb24gX3N0YXJ0Wm9vbUxpc3RlbmVyKCBtYXAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qIFRoZXJlIGhhcyBiZWVuIHNldmVyYWwgZGlmZmVyZW50IG1vdXNld2hlZWwgZXZlbnRzIGJlZm9yZSwgYnV0IG5vdyBhbGwgZXhjZXB0IG9wZXJhIHNob3VsZCBzdXBwb3J0IFwid2hlZWxcIiAqL1xuICAgICAgbWFwLnNldExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBfc2V0dXBab29tRXZlbnQobWFwKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgLyogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbiAgZnVuY3Rpb24gX2lzT3Zlclpvb21MaW1pdChhbW91bnQpIHtcbiAgICBpZihhbW91bnQgPiB6b29tTGltaXQuZmFydGhlciAmJiBhbW91bnQgPCB6b29tTGltaXQuY2xvc2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gX3NldHVwWm9vbUV2ZW50KG1hcCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnQoZXZlbnQpIHtcbiAgICAgIHZhciBtb3VzZVdoZWVsRGVsdGEgPSBtb3VzZVV0aWxzLmRlbHRhRnJvbVdoZWVsKGV2ZW50KTtcblxuICAgICAgaWYobW91c2VXaGVlbERlbHRhID4gMCkge1xuICAgICAgICBtYXAuem9vbUluKCk7XG4gICAgICB9IGVsc2UgaWYobW91c2VXaGVlbERlbHRhIDwgMCkge1xuICAgICAgICBtYXAuem9vbU91dCgpO1xuICAgICAgfVxuXG4gICAgICBtYXAudXBkYXRlKCk7XG4gICAgfTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uLy4uLy4uL2xvZ2dlci9sb2cuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwSGV4YWdvbkNsaWNrKG1hcCwgY2FsbGJhY2spIHtcbiAgdHJ5IHtcbiAgICBvbk1vdXNlRG93bihtYXAsIGNhbGxiYWNrKTtcbiAgICBvbk1vdXNlVXAobWFwLCBjYWxsYmFjayk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZGVidWcoZSwgXCJvbk1vdXNlRG93biBvciBvbk1vdXNlVXAgaGV4YWdvbkNsaWNrIGVycm9yOlwiKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihtYXAsIGNhbGxiYWNrKSB7XG4gIG1hcC5zZXRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGdsb2JhbENvb3JkcyA9ICB7eDogZS5zdGFnZVgsIHk6IGUuc3RhZ2VZIH07XG4gICAgdmFyIG9iamVjdHM7XG5cbiAgICBvYmplY3RzID0gbWFwLmdldE9iamVjdHNVbmRlck1hcFBvaW50KGdsb2JhbENvb3Jkcyk7XG5cbiAgICBpZiAob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrKG9iamVjdHMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChtYXAsIGVsZW1lbnQpIHtcbiAgbWFwLnNldExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XG4gICAgbWFwLnJlbW92ZUxpc3RlbmVycyhcIm1vdXNldXBcIik7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uLy4uL2NvcmUvT2JqZWN0JztcbmltcG9ydCB7IGNyZWF0ZUhleGFnb24gfSBmcm9tICcuLi91dGlscy9jcmVhdGVIZXhhZ29uJztcbmltcG9ydCBoZXhhZ29uTWF0aCBmcm9tICcuLi91dGlscy9oZXhhZ29uTWF0aCc7XG5cbnZhciBzaGFwZTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfaGV4YSBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7IHJhZGl1czogMCB9KSB7XG4gICAgdmFyIHNoYXBlO1xuXG4gICAgY29uc3QgSEVJR0hUID0gaGV4YWdvbk1hdGguY2FsY0hlaWdodChleHRyYS5yYWRpdXMpO1xuICAgIGNvbnN0IFNJREUgPSBoZXhhZ29uTWF0aC5jYWxjU2lkZShleHRyYS5yYWRpdXMpO1xuXG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcik7XG5cbiAgICB2YXIgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShleHRyYS5yYWRpdXMpO1xuICAgIHRoaXMucmVnWCA9IGhleGFnb25TaXplLnggLyAyO1xuICAgIHRoaXMucmVnWSA9IGhleGFnb25TaXplLnkgLyAyO1xuICAgIHRoaXMuSEVJR0hUID0gSEVJR0hUO1xuICAgIHRoaXMuU0lERSA9IFNJREU7XG5cbiAgICBpZiAoIWV4dHJhLnJhZGl1cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVlZCByYWRpdXMhXCIpO1xuICAgIH1cblxuICAgIC8qIERyYXcgaGV4YWdvbiB0byB0ZXN0IHRoZSBoaXRzIHdpdGggaGl0QXJlYSAqL1xuICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKGV4dHJhLnJhZGl1cyk7XG4gIH1cbiAgc3RhdGljIGdldFNoYXBlKCkge1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRBbmRHZXRTaGFwZShyYWRpdXMpIHtcbiAgaWYgKCFzaGFwZSkge1xuICAgIGxldCBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKHJhZGl1cyk7XG4gICAgLyogeCBhbmQgeSBhcmUgcmV2ZXJzZWQsIHNpbmNlIHRoaXMgaXMgaG9yaXpvbnRhbCBoZXhhZ29uIGFuZCBjYWxjdWxhdGlvbnMgYXJlIGZvciB2ZXJ0aWNhbCAqL1xuICAgIHNoYXBlID0gY3JlYXRlSGV4YWdvbih7IHg6IGhleGFnb25TaXplLnkgLyAyLCB5OiBoZXhhZ29uU2l6ZS54IC8gMiB9LCByYWRpdXMpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbl9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0X2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNfaGV4YVwiO1xuICB9XG59IiwiLypDYWxjdWxhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjZW50ZXIgaGV4YWdvbiBhbHdheXMgYW5kIGdldCBvYmplY3RzIGJhc2VkIG9uIHRoZSBjb29yZGluYXRlcy4gRm9yIGV4YW1wbGUgd2l0aFxuICBzb21lIG1ldGhvZCBsaWtlIGdldEFsbE9iamVjdHNJbkhleGFnb24uXG5TTzpcbldlIGNyZWF0ZSBhIGZ1bmN0aW9uIGZvciBsYXllcnMsIGxpa2UgXCJtYXBfdXRpbHNfaGV4YWdvbj8gLT4gZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljayh4LHkpLCBnZXRPYmplY3RzSW5IZXhhZ29uKGhleGFnb24/KVwiXG4tIFRoZXJlIHdlIG9ubHkgZmluZCBvdXQgYWJvdXQgdGhlIGNvb3JkaW5hdGVzIGZvciB0aGUgb2JqZWN0LCB3ZSBkb250IHVzZSBnZXRPQmplY3RVbmRlclBvaW50LiBJZiB0aGUgY29vcmRzIGVxdWFsIHRvXG50aG9zZSBnb3R0ZW4gZnJvbTogZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljaywgdGhlbiB0aGF0IG9iamVjdCBpcyBhZGRlZCB0byByZXR1cm5lZCBhcnJheS4gV2UgY2FuIGFsc28gY2FjaGUgdGhlc2UgaWZcbm5lZWRlZCBmb3IgcGVyZm9ybWFuY2VcblxuSE9XIHdlIGRvIHRoZSB3aG9sZSBvcmdhbml6YXRpb25hbCBzdHVmZj9cbi0gbWFwX21vdmVcbi0gbWFwX3V0aWxzX2hleGFnb24/IC0+IGdldEhleGFnb25Db29yZHNGcm9tQ2xpY2soeCx5KSwgZ2V0T2JqZWN0c0luSGV4YWdvbihoZXhhZ29uPylcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgeyBtYXBfY29vcmRzX2hvcml6b250YWxIZXggfSBmcm9tICcuLi9jb29yZGluYXRlcy9NYXBfY29vcmRzX2hvcml6b250YWxIZXgnO1xuaW1wb3J0IHsgc2V0dXBIZXhhZ29uQ2xpY2sgfSBmcm9tICcuLi9ldmVudExpc3RlbmVycy9zZWxlY3QnO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi8uLi9jb3JlL1VJJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4uLy4uL2NvcmUvTWFwX2xheWVyJztcblxuZXhwb3J0IGxldCBvYmplY3Rfc2VsZWN0X2hleGFnb24gPSAoZnVuY3Rpb24gb2JqZWN0X3NlbGVjdF9oZXhhZ29uKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwT2JqKSB7XG4gICAgLyogV2UgdGFrZSB0aGUgdG9wLW1vc3Qgc3RhZ2Ugb24gdGhlIG1hcCBhbmQgYWRkIHRoZSBsaXN0ZW5lciB0byBpdCAqL1xuICAgIF9jcmVhdGVQcm90b3R5cGVzKG1hcE9iaik7XG5cbiAgICBfc3RhcnRDbGlja0xpc3RlbmVyKG1hcE9iaik7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIGZ1bmN0aW9uIGdldE9iamVjdHNGb3JNYXAoY2xpY2tDb29yZHMpIHtcbiAgICB2YXIgb2JqZWN0cyA9IHRoaXMuX3N0YWdlLmdldE9iamVjdHNVbmRlclBvaW50KGNsaWNrQ29vcmRzLngsIGNsaWNrQ29vcmRzLnkpO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0ZvckxheWVyKGNsaWNrQ29vcmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQueCA9PT0gY2xpY2tDb29yZHMueCAmJiBjaGlsZC55ID09PSBjbGlja0Nvb3Jkcy55KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgLyogPT09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09PSAqL1xuICAvKipcbiAgICogQXR0YWNoZWQgdGhlIGNvcnJlY3QgcHJvdG90eXBlcyB0byBtYXAuIEkgZG8gbm90IHRoaW5rIHdlIG5lZWQgdG8gb3ZlcnJpZGUgZ2V0T2JqZWN0c1VuZGVyUG9pbnQgZm9yIHN0YWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZVByb3RvdHlwZXMobWFwKSB7XG4gICAgbWFwLl9fcHJvdG9fXy5nZXRPYmplY3RzVW5kZXJNYXBQb2ludCA9IGdldE9iamVjdHNGb3JNYXA7XG4gICAgTWFwX2xheWVyLl9fcHJvdG9fXy5nZXRPYmplY3RzVW5kZXJQb2ludCA9IGdldE9iamVjdHNGb3JMYXllcjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX3N0YXJ0Q2xpY2tMaXN0ZW5lciggbWFwLCBjYW52YXMgKSB7XG4gICAgdmFyIHNpbmdsZXRvblVJID0gVUkoKTtcblxuICAgIHJldHVybiBzZXR1cEhleGFnb25DbGljayhtYXAsIHNpbmdsZXRvblVJLnNob3dTZWxlY3Rpb25zKTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGFuZ2xlID0gMzApIHtcbiAgdmFyIHNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIHZhciBjb2xvciA9IFwiIzQ0NDQ0NFwiO1xuICB2YXIgcG9pbnRTaXplID0gMDtcblxuICBzaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoY29sb3IpXG4gICAgLmRyYXdQb2x5U3RhciAoIGNvb3Jkcy54LCBjb29yZHMueSwgcmFkaXVzLCA2LCBwb2ludFNpemUsIGFuZ2xlICk7XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogTk9URTogVGhlc2UgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgaGV4YWdvbnMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNIZWlnaHQocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY1NpZGUocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiAzIC8gMjtcbn1cblxuLyogTW9kaWZpZWQgRnJvbSBqYXZhIGV4YW1wbGU6IGh0dHA6Ly9ibG9nLnJ1c2xhbnMuY29tLzIwMTEvMDIvaGV4YWdvbmFsLWdyaWQtbWF0aC5odG1sXG4gICBUaGlzIGlzIHN1cHBvc2VkIHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCBoZXhhZ29uYWwgaW5kZXgsIHRoYXQgcmVwcmVzZW50cyB0aGUgaGV4YWdvbiB0aGUgcGxheWVyIGNsaWNrZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpIHtcbiAgdmFyIEhFSUdIVCA9IHJhZGl1cyAqIE1hdGguc3FydCgzKTtcbiAgdmFyIFNJREUgPSByYWRpdXMgKiAzIC8gMjtcblxuICB2YXIgY2kgPSBNYXRoLmZsb29yKHgvU0lERSk7XG4gIHZhciBjeCA9IHggLSBTSURFICogY2k7XG5cbiAgdmFyIHR5ID0geSAtIChjaSAlIDIpICogSEVJR0hUIC8gMjtcbiAgdmFyIGNqID0gTWF0aC5mbG9vciggdHkgLyBIRUlHSFQpO1xuICB2YXIgY3kgPSB0eSAtIEhFSUdIVCAqIGNqO1xuXG4gIGlmIChjeCA+IE1hdGguYWJzKHJhZGl1cyAvIDIgLSByYWRpdXMgKiBjeSAvIEhFSUdIVCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmIChjb29yZGluYXRlSW5kZXhlcy54IDwgMCAmJiBjb29yZGluYXRlSW5kZXhlcy54IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImNsaWNrIG91dHNpZGUgb2YgdGhlIGhleGFnb24gYXJlYVwiKTtcbiAgfVxuICBjZW50ZXJDb29yZHMgPSB7XG4gICAgeDogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy54ICogaGV4YVNpemUueCArIGhhbGZIZXhhU2l6ZS54KSxcbiAgICB5OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnkgKiBoZXhhU2l6ZS55ICsgaGFsZkhleGFTaXplLnkpXG4gIH07XG5cbiAgcmV0dXJuIGNlbnRlckNvb3Jkcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FsY0hlaWdodDogY2FsY0hlaWdodCxcbiAgY2FsY1NpZGU6IGNhbGNTaWRlLFxuICBzZXRDZWxsQnlQb2ludDogc2V0Q2VsbEJ5UG9pbnQsXG4gIGdldEhleGFTaXplOiBnZXRIZXhhU2l6ZSxcbiAgdG9IZXhhQ2VudGVyQ29vcmQ6IHRvSGV4YUNlbnRlckNvb3JkXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuQ3JlYXRpbmcgdGhlIGNyZWF0ZWpzUXVldWUtb2JqZWN0IGZyb20gc3ByaXRlc2hlZXQuIFRoaXMgcHJlbG9hZHMgYXNzZXN0cy5cblxuQHJlcXVpcmVzIGNyZWF0ZWpzIENyZWF0ZWpzIGxpYnJhcnkgLyBmcmFtZXdvcmsgb2JqZWN0IC0gZ2xvYmFsIG9iamVjdFxuQHBhcmFtIHtzdHJpbmd9IGJhc2VQYXRoXG5AdG9kbyBNYWtlIGEgbG9hZGVyIGdyYXBoaWNzIC8gbm90aWZpZXIgd2hlbiBsb2FkaW5nIGFzc2V0cyB1c2luZyBwcmVsb2FkZXIuXG5cblVzYWdlOiBwcmVsb2FkLmdlbmVyYXRlKFwiaHR0cDovL3BhdGguZmkvcGF0aFwiKS5vbkNvbXBsZXRlKCkudGhlbihmdW5jdGlvbigpIHt9KTtcbiovXG5leHBvcnQgY2xhc3MgcHJlbG9hZCBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gIH1cbiAgcmVzb2x2ZU9uQ29tcGxldGUgKCkge1xuICAgIHZhciBiaW5kZWRPbkNvbXBsZXRlID0gX29uQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGJpbmRlZE9uQ29tcGxldGUpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICBmdW5jdGlvbiBfb25Db21wbGV0ZShyZXNvbHZlKSB7XG4gICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbG9hZE1hbmlmZXN0ICguLi5hcmdzKSB7XG4gICAgc3VwZXIubG9hZE1hbmlmZXN0KC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0RXJyb3JIYW5kbGVyIChlcnJvckNCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIGVycm9yQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0UHJvZ3Jlc3NIYW5kbGVyIChwcm9ncmVzc0NCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIHByb2dyZXNzQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWN0aXZhdGVTb3VuZCAoKSB7XG4gICAgdGhpcy5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgfVxufSIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XG4gIElEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBtYXBTaXplOiB7IHg6IDUwLCB5OiAyMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX2RyYWdcIiwgXCJvYmplY3Rfc2VsZWN0X2hleGFnb25cIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhcnRQb2ludDogeyB4OiAwLCB5OiAwIH0sXG4gIGVsZW1lbnQ6IFwiI21hcENhbnZhc1wiLFxuICBsYXllcnM6IFt7XG4gICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICBjb29yZDogeyB4OiAwLCB5OiAwIH0sXG4gICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgc3BlY2lhbHM6IFt7XG4gICAgICBcImludGVyYWN0aXZlXCI6IGZhbHNlXG4gICAgfV0sXG4gICAgb3B0aW9uczoge1xuICAgICAgY2FjaGU6IHRydWVcbiAgICB9LFxuICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgIHR5cGU6IFwiT2JqZWN0X3RlcnJhaW5cIixcbiAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSx7XG4gICAgICAgICBcIm9ialR5cGVcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzJcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjQxXCIsXG4gICAgICAgICAgICBcInlcIjpcIjcwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfSx7XG4gICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgXCJuYW1lXCI6IFwidW5pdExheWVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgfSxcbiAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRcIixcbiAgICAgIFwibmFtZVwiOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICBcIm9iamVjdHNcIjogW3tcbiAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgIFwiY29vcmRcIjoge1xuICAgICAgICAgIFwieFwiOiBcIjQxXCIsIFwieVwiOiBcIjcwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICBcInNvbWVDdXN0b21EYXRhXCI6IFwidHJ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjgyLFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo5NFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCIvYXNzZXRzL2ltZy9tYXAvdGVzdEhleGFnb25zL3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFswLDAsODIsOTRdLFs4MiwwLDgyLDk0XSxbMTY0LDAsODIsOTRdLFsyNDYsMCw4Miw5NF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls4Miw5NF1cbiAgICB9LFxuICAgIFwidGVycmFpblwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICB9LFxuICAgIFwiZGl0aGVyXCI6e1wiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2RpdGhlcjIucG5nXCJdLFwiZnJhbWVzXCI6W1swLDAsOTYsNDhdXSxcImltYWdlU2l6ZVwiOls5Niw0OF19LFxuICAgIFwicHJldHRpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvaGlsbHMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMi5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw2NiwwLDAsMThdLFsxLDEsOTYsNDgsMSwtNCw0XSxbMSwxNDgsOTYsNDgsMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicmVzb3VyY2VcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9yZXNvdXJjZXMvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxOTUsMSw5Niw0OF0sWzM4OSwxLDk2LDQ4XVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJwbGFjZVwiOnt9LFxuICAgIFwiY2l0eVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbWVkaWV2YWxjaXRpZXMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1cbiAgICAgIF1cbiAgICB9LFwiYnVpbGRpbmdcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXCJtb2RpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInVuaXRcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC91bml0cy90ZXN0SGV4YWdvblVuaXRzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6e1wid2lkdGhcIjo4MixcImhlaWdodFwiOjk0fVxuICAgIH1cbiAgfSxcbiAgXCJvYmplY3REYXRhXCI6IHtcbiAgICBcInVuaXRcIjpbe1xuICAgICAgICBcIm5hbWVcIjpcInRhbmtcIixcbiAgICAgICAgXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxuICAgICAgICBcImRlZlwiOlwiUG9vclwiLFxuICAgICAgICBcInNpZWdlXCI6XCJEZWNlbnRcIixcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcbiAgICAgICAgXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICAgIH0se1xuICAgICAgICBcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJ1bml0XCI6e1xuICAgICAgICAgICAgXCJfZW5lbXlfXCI6W3tcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgXCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOlt7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAwXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMlwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDJcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAzXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDVcIlxuICAgIH1dLFxuICAgIFwidGVycmFpblwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwiZGVzZXJ0XCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwidmVyeSBkcnkgbGFuZFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiVW5pdFwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcImRlc2NcIjpcIlNpYmVyaWEgdGVhY2hlcyB5b3VcIixcImltYWdlXCI6XCI2XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXCJkZXNjXCI6XCJDcmFuYmVycmllcyBhbmQgY2xvdWRiZXJyaWVzXCIsXCJpbWFnZVwiOlwiOFwiXG4gICAgICAgIH1dLFxuICAgIFwiZGl0aGVyXCI6W1xuICAgICAge1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXG4gICAgXCJwcmV0dGlmaWVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMjUlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJ6SW5kZXhcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNjAlXCJ9XSxcInJlc291cmNlXCI6W3tcIm5hbWVcIjpcIk9hc2lzXCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwiT2FzaXMgaW4gdGhlIG1pZGRsZSBvZiBkZXNlcnQsIG9yIG5vdCBhdG0uXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJmb29kIHByb2R1Y3Rpb24gNSAvIHdlZWtcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiT2lsXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQmxhY2sgZ29sZFwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiVGhlcmUgaXMgYSBsb3Qgb2Ygb2lsIGhlcmVcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiNFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwiY2l0eVwiOlt7XCJuYW1lXCI6XCJNZWRpZXZhbFwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIwXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk1lZGlldmFsMlwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIxXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcInBsYWNlXCI6W10sXCJidWlsZGluZ1wiOlt7XCJuYW1lXCI6XCJCYXJyYWNrc1wiLFwiaW1hZ2VcIjpcIjBcIixcInRvb2x0aXBcIjpcIkVuYWJsZXMgdHJvb3AgcmVjcnVpdG1lbnRcIn0se1wibmFtZVwiOlwiRmFjdG9yeVwiLFwiaW1hZ2VcIjpcIjFcIixcInRvb2x0aXBcIjpcIlByb2R1Y2VzIHdlYXBvbnJ5XCJ9XSxcImdvdmVybm1lbnRcIjpbe1wibmFtZVwiOlwiRGVtb2NyYXp5XCIsXCJkZXNjcmlwdGlvblwiOlwid2VsbCBpdCdzIGEgZGVtb2NyYXp5IDopXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyArMjAlIGhhcHBpbmVzc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMCwxXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaGFwcGluZXNzXCI6XCIyMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ29tbXVuaXNtXCIsXCJkZXNjcmlwdGlvblwiOlwiWW91IGtub3cgdGhlIG9uZSB1c2VkIGluIHRoZSBncmVhdCBVU1NSIGFuZCBpbnNpZGUgdGhlIGdyZWF0IGZpcmV3YWxsIG9mIENoaW5hXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyBwcm9kdWN0aW9uIGJvbnVzZXNcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzIsM10sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOnt9fV19fSxcIkNpdHlcIjp7XCJidWlsZGluZ1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiMjAlXCJ9fV19fX19XSxcInBvbGl0aWNzXCI6e1widGF4UmF0ZVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImNvcnJ1cHRpb25cIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJhbGlnbm1lbnRcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJoYXBwaW5lc3NcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJyZXZvbHRSaXNrXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwidW5pdHlcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJuYXRWYWx1ZVwiOlt7XCJuYW1lXCI6XCJJbnRlZ3JpdHlcIixcInRvb2x0aXBcIjpcIkdvdmVybm1lbnQgYW5kIHBvcHVsYXRpb25zIHNob3dzIGludGVncml0eSBhbmQgdHJ1c3R3b3J0aGluZXNzXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImludGVybmFsUmVsYXRpb25zXCI6XCIrMTAlXCIsXCJkaXBsb21hY3lcIjpcIisxMCVcIixcInJldm9sdCByaXNrXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIi0yMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ2FwaXRhbGlzbVwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkaXBsb21hY3lcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJtb3JhbGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJIYXJkd29ya2luZ1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIisxMCVcIixcImhhcHBpbmVzc1wiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiTGVhZGVyc2hpcFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIis1JVwiLFwiaGFwcGluZXNzXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwidHJhZGluZ1wiOlwiKzEwJVwifX1dfX19fV19fVxufTsiXX0=
