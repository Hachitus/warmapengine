(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _createMap = require('../../components/factories/MapFactory.js');

/* Read data from files, to use with testing */

var _typeData = require('../../tests/data/typeData.js');

var _graphicData = require('../../tests/data/graphics.js');

var _terrainData = require('../../tests/data/terrainData.js');

var convertedTerrainData = dataCoverterForTestData_terrain(_terrainData.terrainData);
debugger;

/* ====== Tests ====== */
describe('basic map - without plugins', function () {

  var mapData = {
    mapSize: { x: 100, y: 100 },
    pluginsToActivate: false,
    stages: [{
      type: 'Map_stage',
      coordinates: { x: 0, y: 0 },
      name: 'terrainStage',
      element: '#canvasTerrain',
      layers: [{
        type: 'Map_layer',
        coordinates: { x: 0, y: 0 },
        name: 'terrainBaseLayer',
        options: {
          cache: true
        },
        objectGroups: [{
          type: 'Objects_terrain',
          name: 'TerrainBase', // I guess only for debugging?
          typeImageData: {
            images: ['/assets/img/map/collection.png'],
            frames: [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
            imageSize: [96, 48]
          },
          objects: [{
            name: 'Plain',
            coordinates: { x: 40, y: 40 },
            imageData: 1,
            data: {
              someCustomData: true
            }
          }, {
            name: 'Plain',
            coordinates: { x: 40, y: 40 },
            imageData: 2,
            data: {
              someCustomData: true
            }
          }]
        }]
      }, {
        type: 'Map_layer',
        coordinates: { x: 0, y: 0 },
        name: 'unitLayer',
        options: {
          cache: false
        },
        objectGroups: [{
          type: 'Objects_unit',
          name: 'Unit', // I guess only for debugging?
          typeImageData: {
            images: ['/assets/img/map/collection.png'],
            frames: [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
            imageSize: [96, 48]
          },
          objects: [{
            name: 'Infantry 1',
            coordinates: { x: 60, y: 60 },
            imageData: 3,
            data: {
              someCustomData: true
            }
          }]
        }]
      }]
    }]
  };

  describe('=> make map', function () {
    var map = _createMap.createMap(mapData);

    it('=> exists', function () {
      expect(map).toBeDefined();
    });
    it('=> stage properties are correct', function () {
      expect(map.stages[0].name === 'terrainStage').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
      expect(map.getChildNamed('terrainStage').name === 'terrainStage').toBeTruthy();
      expect(typeof map.getChildNamed('terrainStage') === 'object').toBeTruthy();
    });
    it('=> layer properties are correct', function () {
      expect(typeof map.getLayerNamed('unitLayer') === 'object').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
    });
    it('=> terrain properties are correct', function () {
      debugger;
      expect(map.getLayerNamed('terrainBaseLayer').children[0].x === 40).toBeTruthy();
      expect(map.getLayerNamed('terrainBaseLayer').children.length > 1).toBeTruthy();
    });
    it('=> unit properties are correct', function () {
      expect(map.getLayerNamed('unitLayer').children[0].x === 60).toBeTruthy();
    });
  });

  /* ===== Private functions ===== */
  // none
});

/* some functions to help tests */
function dataCoverterForTestData_terrain(jsonedData) {
  /* strip the required data to the object and return it */
  return jsonedData.objects.map(function (thisData) {
    return {
      objType: thisData.objType,
      _id: thisData._id,
      coord: thisData.coord
    };
  });
}

},{"../../components/factories/MapFactory.js":3,"../../tests/data/graphics.js":12,"../../tests/data/terrainData.js":13,"../../tests/data/typeData.js":14}],2:[function(require,module,exports){
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

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

exports.createMap = createMap;

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ===== 3rd party library imports ===== */

/* ====== Own module imports ====== */

var _Map = require('../map/core/Map');

var _Map_stage = require('../map/core/Map_stage');

var _Map_layer = require('../map/core/Map_layer');

var _Objects_terrain = require('../map/objects/Objects_terrain');

var _Objects_unit = require('../map/objects/Objects_unit');

var _spritesheetList = require('../map/core/spritesheetList');

var _validatorMod = require('../map/core/map_validators');

'use strict';
var allSpritesheets = _spritesheetList.spritesheetList();

var functionsInObj = {
  Map_stage: _Map_stage.Map_stage,
  Map_layer: _Map_layer.Map_layer,
  Objects_terrain: _Objects_terrain.Objects_terrain,
  Objects_unit: _Objects_unit.Objects_unit
};

/** ===== Private functions declared ===== */
var privateFunctions = {
  _getStageIndex: _getStageIndex
};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _validatorMod.validatorMod.isIndex
};
function createMap(givenMapData) {
  console.log('============================================');
  var map = new _Map.Map();
  var basePath = '/var/www/warMapEngine/public/components/';
  var mapData = typeof givenMapData === 'string' ? JSON.parse(givenMapData) : givenMapData;

  /* Activate plugins */
  if (mapData.pluginsToActivate && mapData.pluginsToActivate.length > 0) {
    Promise.all(mapData.pluginsToActivate.map(function (x) {
      return System['import'](x);
    })).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3);

      var module1 = _ref2[0];
      var module2 = _ref2[1];
      var module3 = _ref2[2];

      console.log('all plugins loaded');
    })['catch'](function (e) {
      console.log(e.stack);
    });
  }

  /* We iterate through the given map data and create objects accordingly */
  mapData.stages.forEach(function (stageData) {
    var thisStage = new functionsInObj[stageData.type](stageData.name);

    map.addStage(thisStage);

    stageData.layers.forEach(function (layerData) {
      var thisLayer = undefined;

      try {
        thisLayer = new functionsInObj[layerData.type](layerData.name, layerData.type, false);
        thisStage.addChild(thisLayer);
      } catch (e) {
        console.log('Problem:', layerData.type, e.stack);
      }

      layerData.objectGroups.forEach(function (objectGroup) {
        objectGroup.objects.forEach(function (object) {
          var imageData = undefined;

          /* If the object is a sprite */
          if (objectGroup.typeImageData) {
            imageData = {
              spritesheet: allSpritesheets.addSpritesheet(objectGroup.typeImageData),
              currentFrameNumber: object.imageData
            };
          } else {
            imageData = object.imageData;
          }

          thisLayer.addChild(new functionsInObj[objectGroup.type](object.coordinates, object.data, imageData.spritesheet, imageData.currentFrameNumber));
        });
      });
    });
  });

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

  function _calculateMapSize() {}
}

/* ==== Private functions ==== */
function _getStageIndex() {}

},{"../map/core/Map":4,"../map/core/Map_layer":5,"../map/core/Map_stage":6,"../map/core/map_validators":8,"../map/core/spritesheetList":9,"../map/objects/Objects_terrain":10,"../map/objects/Objects_unit":11}],4:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== Own module imports ====== */

var _Map_stage = require('./Map_stage');

var _Map_layer = require('./Map_layer');

var _validatorMod = require('./map_validators');

'use strict';

/** ===== Private functions declared ===== */
var privateFunctions = {
  _getStageIndex: _getStageIndex
};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _validatorMod.validatorMod.isIndex,
  _is_coordinates: _validatorMod.validatorMod.isCoordinates,
  _is_SubContainerAmount: _validatorMod.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _validatorMod.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _validatorMod.validatorMod.isUseOfSubContainers,
  _is_canvas: _validatorMod.validatorMod.isCanvas
};

/** ===== EXPORT ===== */
/*
*/

var Map = (function () {
  function Map(options) {
    _classCallCheck(this, Map);

    this.zoomLevel = 1;
    this.stages = [];
    this.plugins = {};
    this.mapSize = options && options.mapSize || { x: 0, y: 0, width: 0, height: 0 };
    this.activeTickCB;
  }

  _createClass(Map, [{
    key: 'init',

    /* options.mapSize = new createjs.Rectangle*/
    value: function init(options) {
      this.mapSize = options && options.mapSize || { x: 0, y: 0, width: 0, height: 0 };

      return this;
    }
  }, {
    key: 'drawMap',
    value: function drawMap() {
      this.stages.forEach(function (stage) {
        if (stage.drawThisChild) {
          stage.update();
          stage.drawThisChild = false;
        }
      });
      return this;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.mapSize;
    }
  }, {
    key: 'setSize',
    value: function setSize(x1, y1, x2, y2) {
      this.mapSize = { x: x1, y: y1, width: x2, height: y2 };

      return this.mapSize;
    }
  }, {
    key: 'getChildNamed',
    value: function getChildNamed(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.stages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var stage = _step.value;

          var child = undefined;

          if (stage.name.toLowerCase() === name.toLowerCase()) {
            return stage;
          }

          if (child = stage.getChildNamed(name)) {
            return child;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'addStage',
    value: function addStage(stage) {
      var _stages;

      var stages = [];

      if (!(stage instanceof Array)) {
        stages.push(stage);
      }

      (_stages = this.stages).push.apply(_stages, stages);

      return this;
    }
  }, {
    key: 'replaceStage',
    value: function replaceStage(newCanvas, oldCanvas) {
      var oldIndex = privateFunctions._getStageIndex(this.stages, oldCanvas);
      this.stages[oldIndex] = newCanvas;

      return this;
    }
  }, {
    key: 'addLayer',
    value: function addLayer(layer, stage) {

      return this;
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      return this;
    }
  }, {
    key: 'replaceLayer',
    value: function replaceLayer(newLayer, oldLayer) {
      return this;
    }
  }, {
    key: 'toggleLayer',
    value: function toggleLayer(layer) {
      return this;
    }
  }, {
    key: 'getLayerNamed',
    value: function getLayerNamed(name) {
      var theLayer = undefined;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.stages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var stage = _step2.value;

          if (theLayer = stage.getChildNamed(name)) {
            return theLayer;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return false;
    }
  }, {
    key: 'cacheMap',
    value: function cacheMap() {
      this.stages.forEach(function (stage) {
        if (stage.cacheEnabled) {
          this.cache(this.mapSize.x, this.mapSize.y);
        }
      });

      return this;
    }
  }, {
    key: 'cacheLayers',
    value: function cacheLayers() {
      return this;
    }
  }, {
    key: 'getObjectsUnderMapPoint',
    value: function getObjectsUnderMapPoint() {
      var objects = [];

      this.stages.forEach(function (value, index) {
        objects[index] = value;
      });

      return objects;
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.stages.forEach(function (stage) {
        if (stage.updateStage === true) {
          stage.update();
        }
      });
    }
  }, {
    key: 'setCanvasesToFullSize',
    value: function setCanvasesToFullSize(canvases) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.stages[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var canvas = _step3.value;

          var ctx = canvas.getContext('2d');

          ctx.canvas.width = window.innerWidth;
          ctx.canvas.height = window.innerHeight;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'activatePlugin',

    /* Activates a given plugin / module for this map instance */
    value: function activatePlugin(plugin) {
      this.plugins[plugin.name] = new plugin(this);
      this.plugins[plugin.name].init();
    }
  }, {
    key: 'startTick',
    value: function startTick(tickCB) {
      if (this.activeTickCB) {
        return false;
      }

      this.activeTickCB = tickCB;
      createjs.Ticker.addEventListener('tick', this.activeTickCB);

      return this;
    }
  }, {
    key: 'stopTick',
    value: function stopTick() {
      this.activeTickCB = undefined;
      createjs.Ticker.removeEventListener('tick', this.activeTickCB);

      return this;
    }
  }]);

  return Map;
})();

exports.Map = Map;

/** ===== Private functions ===== */
function _getStageIndex(stages, stageToFind) {
  var foundIndex = stages.indexOf(stageToFind);

  return foundIndex === -1 ? false : foundIndex;
}

},{"./Map_layer":5,"./Map_stage":6,"./map_validators":8}],5:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
@require the createjs framework in global namespace
@require validator module
*/

/* ====== Own module imports ====== */

var _validatorMod = require("./map_validators");

"use strict";

/* ===== Constants ===== */
var TYPES = {
  justSubContainers: 1,
  noSubContainers: 2,
  imagesInSubContainers: 3
};

/** ===== Private functions declared ===== */
var privateFunctions = {
  _getStageIndex: _getStageIndex,
  _createSubContainers: _createSubContainers,
  _cacheLayer: _cacheLayer,
  _setCorrectSubContainer: _setCorrectSubContainer,
  _getCorrectContainer: _getCorrectContainer
};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _validatorMod.validatorMod.isIndex,
  _is_boolean: _validatorMod.validatorMod.isBoolean,
  _is_coordinates: _validatorMod.validatorMod.isCoordinates,
  _is_SubContainerAmount: _validatorMod.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _validatorMod.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _validatorMod.validatorMod.isUseOfSubContainers
};

/** ===== EXPORT ===== */

var Map_layer = (function (_createjs$Container) {
  function Map_layer(name, type, subContainers) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.type = subContainers ? TYPES.imagesInSubContainers : type;
    this.visible = true;
    this.useSubcontainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }

  _inherits(Map_layer, _createjs$Container);

  _createClass(Map_layer, [{
    key: "addChildToSubContainer",

    /* overloaded inherited method */
    value: function addChildToSubContainer(object, index) {
      var functionToUse = index ? "_addChildAt" : "_addChild";

      if (!this.useSubcontainers) {
        /* We add the object to the Container directly. Wether it is Container or Bitmap etc. */
        this[functionToUse](object, index);
      } else {
        /* We add the object to the correct subContainer. For better logic and performance */
        var correctSubContainer = privateFunctions._getCorrectContainer.call(this, object.x, object.y);
        correctSubContainer.addChild(object, index);
      }

      return this;
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
      let correctSubContainer = privateFunctions._getCorrectContainer.call(this, object.x, object.y);
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
function _getStageIndex(map, canvas) {}
function _createSubContainers() {}
function _cacheLayer() {}
function _setCorrectSubContainer() {}
function _getCorrectContainer(x, y) {
  var correctSubContainer = this.getObjectUnderPoint(x, y);

  return correctSubContainer;
}

},{"./map_validators":8}],6:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
@require the createjs framework in global namespace
@require validator module
*/

var _validatorMod = require("./map_validators");

"use strict";

/** ===== Private functions declared ===== */
var privateFunctions = {};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _validatorMod.validatorMod.isIndex,
  _is_boolean: _validatorMod.validatorMod.isBoolean,
  _is_coordinates: _validatorMod.validatorMod.isCoordinates,
  _is_SubContainerAmount: _validatorMod.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _validatorMod.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _validatorMod.validatorMod.isUseOfSubContainers
};

/** ===== EXPORT ===== */

var Map_stage = (function (_createjs$Stage) {
  /* Takes the canvas element as argument */

  function Map_stage(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, Map_stage);

    _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).apply(this, args);

    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    this.drawThisChild = true;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.preventSelection = true;
    this.autoClear = false;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }

  _inherits(Map_stage, _createjs$Stage);

  _createClass(Map_stage, [{
    key: "getCacheEnabled",
    value: function getCacheEnabled() {
      return this._cacheEnabled;
    }
  }, {
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
;

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

},{"./map_validators":8}],7:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

/** This class needs to be gone through carefully, it has been copied from an older version straight. The version was ES5
@param {createjs.Point} coords - the coordinate where the object is located at
@param {} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
but rather things like unit-data and city-data presentations etc.
@param {createjs.SpriteSheet} spriteSheet
@param {Int] currFrameNumber - the current frames number. This is basically the initial image, we can change it later
for animation or such

All of the objects need to have same argumentAPI for creating objects: coords, data, imageData
*/

var Objects_sprite = (function (_createjs$Sprite) {
  function Objects_sprite(coords, data, spritesheet, currentFrameNumber) {
    _classCallCheck(this, Objects_sprite);

    _get(Object.getPrototypeOf(Objects_sprite.prototype), "constructor", this).call(this, spritesheet);

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

  _inherits(Objects_sprite, _createjs$Sprite);

  _createClass(Objects_sprite, [{
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

  return Objects_sprite;
})(createjs.Sprite);

exports.Objects_sprite = Objects_sprite;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

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

},{}],9:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

/* Singleton so we don't use class definition */
exports.spritesheetList = spritesheetList;

var _hash = require('blueimp-md5');

var _hash2 = _interopRequireWildcard(_hash);

'use strict';

var allSpritesheets = [];
var allSpritesheetIDs = [];
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

},{"blueimp-md5":2}],10:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Objects_sprite2 = require('../core/Objects');

'use strict';

var Objects_terrain = (function (_Objects_sprite) {
  function Objects_terrain() {
    _classCallCheck(this, Objects_terrain);

    if (_Objects_sprite != null) {
      _Objects_sprite.apply(this, arguments);
    }
  }

  _inherits(Objects_terrain, _Objects_sprite);

  _createClass(Objects_terrain, [{
    key: 'construct',
    value: function construct(coords, data, spriteSheet, currFrameNumber) {
      _get(Object.getPrototypeOf(Objects_terrain.prototype), 'spriteSheet', this).call(this, coords, data, spriteSheet, currFrameNumber);

      this.name = 'DefaultTerrainObject';
    }
  }]);

  return Objects_terrain;
})(_Objects_sprite2.Objects_sprite);

exports.Objects_terrain = Objects_terrain;

},{"../core/Objects":7}],11:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Objects_sprite2 = require('../core/Objects');

'use strict';

var Objects_unit = (function (_Objects_sprite) {
  function Objects_unit() {
    _classCallCheck(this, Objects_unit);

    if (_Objects_sprite != null) {
      _Objects_sprite.apply(this, arguments);
    }
  }

  _inherits(Objects_unit, _Objects_sprite);

  _createClass(Objects_unit, [{
    key: 'construct',
    value: function construct(coords, data, spriteSheet, currFrameNumber) {
      _get(Object.getPrototypeOf(Objects_unit.prototype), 'spriteSheet', this).call(this, coords, data, spriteSheet, currFrameNumber);

      this.name = 'DefaultUnitObjects';
    }
  }]);

  return Objects_unit;
})(_Objects_sprite2.Objects_sprite);

exports.Objects_unit = Objects_unit;

},{"../core/Objects":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphicData = {
  general: {
    terrain: {
      tileWidth: 96, tileHeight: 48

    }
  },
  terrainBase: {
    images: ["assets/img/map/collection.png"],
    frames: [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
    imageSize: [96, 48]
  },
  terrain: {
    images: ["assets/img/map/amplio2/terrain1.png"],
    frames: [[1, 1, 96, 48], [1, 50, 96, 48], [1, 99, 96, 48], [1, 148, 96, 48], [1, 197, 96, 48], [1, 246, 96, 48], [1, 295, 96, 48], [1, 344, 96, 48], [1, 393, 96, 48]],
    imageSize: [96, 48]
  },
  dither: { images: ["img/map/dither2.png"], frames: [[0, 0, 96, 48]], imageSize: [96, 48] },
  prettifier: {
    images: ["assets/img/map/amplio2/mountains.png", "img/map/amplio2/hills.png", "img/map/amplio2/terrain2.png"],
    frames: [[1, 1, 96, 66, 0, 0, 18], [1, 1, 96, 48, 1, -4, 4], [1, 148, 96, 48, 2]]
  },
  resource: {
    images: ["assets/img/map/resources/terrain1.png"],
    frames: [[195, 1, 96, 48], [389, 1, 96, 48]]
  },
  place: {},
  city: {
    images: ["assets/img/map/amplio2/medievalcities.png"],
    frames: [[1, 1, 96, 72], [98, 1, 96, 72], [195, 1, 96, 72], [292, 1, 96, 72], [389, 1, 96, 72], [485, 1, 96, 72], [582, 1, 96, 72], [679, 1, 96, 72], [776, 1, 96, 72], [873, 1, 96, 72], [1, 74, 96, 72], [98, 74, 96, 72], [195, 74, 96, 72], [292, 74, 96, 72], [389, 74, 96, 72], [485, 74, 96, 72], [582, 74, 96, 72], [679, 74, 96, 72], [776, 74, 96, 72], [873, 74, 96, 72]] }, building: { images: ["img/map/isophex/terrain1.png"], frames: [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]] }, modifier: { images: ["img/map/isophex/terrain1.png"], frames: [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]] }, unit: { images: ["img/map/amplio2/units.png"], frames: { width: 66, height: 50 } } };
exports.graphicData = graphicData;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var terrainData = {
   gameID: "53837d47976fed3b24000005",
   objects: [{
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006b3",
      coord: {
         x: 0,
         y: 0
      },
      timestamp: "2014-05-26T17:43:37.633Z"
   }, {
      objType: 5,
      name: "swamp",
      _id: "53837d49976fed3b240006b8",
      coord: {
         x: 0,
         y: 240
      },
      timestamp: "2014-05-26T17:43:37.639Z"
   }, {
      objType: 5,
      name: "swamp",
      _id: "53837d49976fed3b240006bd",
      coord: {
         x: 0,
         y: 480
      },
      timestamp: "2014-05-26T17:43:37.641Z"
   }, {
      objType: 3,
      name: "tundra",
      _id: "53837d49976fed3b240006c2",
      coord: {
         x: 0,
         y: 720
      },
      timestamp: "2014-05-26T17:43:37.645Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006c7",
      coord: {
         x: 0,
         y: 960
      },
      timestamp: "2014-05-26T17:43:37.647Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006cc",
      coord: {
         x: 0,
         y: 1200
      },
      timestamp: "2014-05-26T17:43:37.649Z"
   }, {
      objType: 3,
      name: "tundra",
      _id: "53837d49976fed3b240006d1",
      coord: {
         x: 0,
         y: 1440
      },
      timestamp: "2014-05-26T17:43:37.652Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006d6",
      coord: {
         x: 48,
         y: 72
      },
      timestamp: "2014-05-26T17:43:37.654Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006b4",
      coord: {
         x: 0,
         y: 48
      },
      timestamp: "2014-05-26T17:43:37.637Z"
   }, {
      objType: 5,
      name: "swamp",
      _id: "53837d49976fed3b240006b9",
      coord: {
         x: 0,
         y: 288
      },
      timestamp: "2014-05-26T17:43:37.639Z"
   }, {
      objType: 3,
      name: "tundra",
      _id: "53837d49976fed3b240006be",
      coord: {
         x: 0,
         y: 528
      },
      timestamp: "2014-05-26T17:43:37.644Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006c3",
      coord: {
         x: 0,
         y: 768
      },
      timestamp: "2014-05-26T17:43:37.646Z"
   }, {
      objType: 3,
      name: "tundra",
      _id: "53837d49976fed3b240006c8",
      coord: {
         x: 0,
         y: 1008
      },
      timestamp: "2014-05-26T17:43:37.648Z"
   }, {
      objType: 2,
      name: "forest",
      _id: "53837d49976fed3b240006cd",
      coord: {
         x: 0,
         y: 1248
      },
      timestamp: "2014-05-26T17:43:37.650Z"
   }]
};
exports.terrainData = terrainData;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = { mapviews: [0, 1, 2, 3, 4], unit: [{ name: "tank", desc: "Vrooom...", image: "0", att: "Good", def: "Poor", siege: "Decent", initiate: "90", move: "100", morale: "Average", vision: "150", influenceArea: "30" }, { name: "carrier", desc: "angry beehive", image: "6", att: "1", def: "2", siege: "2", initiate: "110", move: "100", morale: "Average", vision: "250", influenceArea: "30", modifiers: { unit: { _enemy_: [{ from: "thisOnePlace", modifiers: { morale: "suffers morale drop" } }] } } }, { name: "cavalry", desc: "Give me an apple!", image: "26", att: "3", def: "1", siege: "0", initiate: "50", move: "300", morale: "Average", vision: "100", influenceArea: "30" }], terrainBase: [{ image: "0", attachedToTerrains: ["0"], propability: "100%" }, { image: "1", attachedToTerrains: ["2"], propability: "100%" }, { image: "2", attachedToTerrains: ["1"], propability: "100%" }, { image: "3", attachedToTerrains: ["4"], propability: "100%" }, { image: "4", attachedToTerrains: ["5"], propability: "100%" }, { image: "5", attachedToTerrains: ["3"], propability: "100%" }], terrain: [{ name: "desert", image: "0", desc: "very dry land", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "Provides +1 food for cities" } }] } } }, { name: "plain", image: "1", desc: "Buffalo roaming area", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "Provides +12% food for cities" } }] } } }, { name: "forest", image: "2", desc: "Robin hood likes it here", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { defend: "Unit defend +2" } }] } } }, { name: "tundra", desc: "Siberia teaches you", image: "6" }, { name: "arctic", desc: "Your ball will freeze of", image: "7" }, { name: "swamp", desc: "Cranberries and cloudberries", image: "8" }], dither: [{ image: "0", attachedToTerrains: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], propability: "100%" }], prettifier: [{ image: "0", zIndex: "1", attachedToTerrains: ["3"], propability: "25%" }, { image: "1", zIndex: "1", attachedToTerrains: ["1"], propability: "40%" }, { image: "2", zIndex: "0", attachedToTerrains: ["2"], propability: "60%" }], resource: [{ name: "Oasis", image: "0", desc: "Oasis in the middle of desert, or not atm.", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "food production 5 / week" } }] } }, attachedToTerrains: ["0"], influenceArea: 50 }, { name: "Oil", image: "1", desc: "Black gold", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "There is a lot of oil here" } }] } }, attachedToTerrains: ["0", "4"], influenceArea: 50 }], city: [{ name: "Medieval", vision: "100", image: "0", influenceArea: 50 }, { name: "Medieval2", vision: "100", image: "1", influenceArea: 50 }], place: [], building: [{ name: "Barracks", image: "0", tooltip: "Enables troop recruitment" }, { name: "Factory", image: "1", tooltip: "Produces weaponry" }], government: [{ name: "Democrazy", description: "well it's a democrazy :)", tooltip: "Gives +20% happiness", image: "0", requirements: [], possibleNatValues: [0, 1], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { happiness: "20%" } }] } } } }, { name: "Communism", description: "You know the one used in the great USSR and inside the great firewall of China", tooltip: "Gives production bonuses", image: "0", requirements: [], possibleNatValues: [2, 3], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: {} }] } }, City: { building: { _player_: [{ from: "thisOnePlace", modifiers: { production: "20%" } }] } } } }], politics: { taxRate: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], corruption: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], alignment: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], happiness: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], revoltRisk: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], unity: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], natValue: [{ name: "Integrity", tooltip: "Government and populations shows integrity and trustworthiness", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { internalRelations: "+10%", diplomacy: "+10%", "revolt risk": "-5%", relationsToElite: "-20%" } }] } } } }, { name: "Capitalism", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { diplomacy: "+5%", relationsToElite: "+5%", morale: "+5%" } }] } } } }, { name: "Hardworking", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+10%", happiness: "+5%", relationsToElite: "+5%" } }] } } } }, { name: "Leadership", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+5%", happiness: "-5%", relationsToElite: "+5%", trading: "+10%" } }] } } } }] } };
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvTWFwRmFjdG9yeS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3RzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21hcF92YWxpZGF0b3JzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW4uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdHMvT2JqZWN0c191bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dyYXBoaWNzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL3RlcnJhaW5EYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL3R5cGVEYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7O3lCQU1hLDBDQUEwQzs7Ozt3QkFHM0MsOEJBQThCOzsyQkFDM0IsOEJBQThCOzsyQkFDOUIsaUNBQWlDOztBQUU3RCxJQUFJLG9CQUFvQixHQUFHLCtCQUErQixjQUZqRCxXQUFXLENBRW1ELENBQUM7QUFDeEUsU0FBUzs7O0FBR1QsUUFBUSxDQUFDLDZCQUE2QixFQUFFLFlBQVc7O0FBRWpELE1BQUksT0FBTyxHQUFHO0FBQ1osV0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO0FBQzNCLHFCQUFpQixFQUFFLEtBQUs7QUFDeEIsVUFBTSxFQUFFLENBQUM7QUFDUCxVQUFJLEVBQUUsV0FBVztBQUNqQixpQkFBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzNCLFVBQUksRUFBRSxjQUFjO0FBQ3BCLGFBQU8sRUFBRSxnQkFBZ0I7QUFDekIsWUFBTSxFQUFFLENBQUM7QUFDTCxZQUFJLEVBQUUsV0FBVztBQUNqQixtQkFBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzNCLFlBQUksRUFBRSxrQkFBa0I7QUFDeEIsZUFBTyxFQUFFO0FBQ1AsZUFBSyxFQUFFLElBQUk7U0FDWjtBQUNELG9CQUFZLEVBQUUsQ0FBQztBQUNiLGNBQUksRUFBRSxpQkFBaUI7QUFDdkIsY0FBSSxFQUFFLGFBQWE7QUFDbkIsdUJBQWEsRUFBRTtBQUNiLGtCQUFNLEVBQUUsQ0FDTixnQ0FBZ0MsQ0FDakM7QUFDRCxvQkFBVSxDQUNSLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQ1gsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDL0tnQixTQUFTLEdBQVQsU0FBUzs7Ozs7Ozs7Ozs7OzttQkF2RkwsaUJBQWlCOzt5QkFDWCx1QkFBdUI7O3lCQUN2Qix1QkFBdUI7OytCQUNq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QUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUMxSDtBQUNELGVBQVksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0dBQ3BCO0FBQ0QsVUFBUyxFQUFDLFFBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsV0FBWSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQztBQUN0RixjQUFhO0FBQ1gsWUFBUyxDQUFDLHNDQUFzQyxFQUFDLDJCQUEyQixFQUFDLDhCQUE4QixDQUFDO0FBQzVHLFlBQVMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FDdEQ7R0FDRjtBQUNELFlBQVc7QUFDVCxZQUFTLENBQUMsdUNBQXVDLENBQUM7QUFDbEQsWUFBUyxDQUNQLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNUI7R0FDRjtBQUNELFNBQVEsRUFBRTtBQUNWLFFBQU87QUFDTCxZQUFTLENBQUMsMkNBQTJDLENBQUM7QUFDdEQsWUFBUyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUMsVUFBVyxFQUFDLFFBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxVQUFX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QVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFhLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBWSxDQUFDLEVBQUMsS0FBTSxHQUFHLEVBQUMsS0FBTSxJQUFJLEVBQUMsV0FBWSxFQUFDLE1BQU8sRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsUUFBUyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFNLElBQUksRUFBQyxLQUFNLEtBQUssRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFdBQVksRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVksQ0FBQyxFQUFDLEtBQU0sR0FBRyxFQUFDLEtBQU0sSUFBSSxFQUFDLFdBQVksRUFBQyxNQUFPLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFFBQVMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBTSxJQUFJLEVBQUMsS0FBTSxLQUFLLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxXQUFZLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLE9BQVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFhLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBUSxDQUFDLEVBQUMsS0FBTSxHQUFHLEVBQUMsS0FBTSxJQUFJLEVBQUMsV0FBWSxFQUFDLE1BQU8sRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsUUFBUyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFNLElBQUksRUFBQyxLQUFNLEtBQUssRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFdBQVksRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sV0FBVyxFQUFDLFNBQVUsZ0VBQWdFLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxVQUFXLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLG1CQUFvQixNQUFNLEVBQUMsV0FBWSxNQUFNLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxrQkFBbUIsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFPLFlBQVksRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFVBQVcsRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsV0FBWSxLQUFLLEVBQUMsa0JBQW1CLEtBQUssRUFBQyxRQUFTLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTyxhQUFhLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxVQUFXLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLGNBQWUsTUFBTSxFQUFDLFdBQVksS0FBSyxFQUFDLGtCQUFtQixLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU8sWUFBWSxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsVUFBVyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxjQUFlLEtBQUssRUFBQyxXQUFZLEtBQUssRUFBQyxrQkFBbUIsS0FBSyxFQUFDLFNBQVUsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUM7UUFBeHhMLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IExpYnJhcnkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIE1hcCA9IHJlcXVpcmUoICcuLi9wdWJsaWMvY29tcG9uZW50cy9tYXAvTWFwJyk7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhY3Rvcmllcy9NYXBGYWN0b3J5LmpzJztcblxuLyogUmVhZCBkYXRhIGZyb20gZmlsZXMsIHRvIHVzZSB3aXRoIHRlc3RpbmcgKi9cbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBncmFwaGljRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ3JhcGhpY3MuanMnO1xuaW1wb3J0IHsgdGVycmFpbkRhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3RlcnJhaW5EYXRhLmpzJztcblxubGV0IGNvbnZlcnRlZFRlcnJhaW5EYXRhID0gZGF0YUNvdmVydGVyRm9yVGVzdERhdGFfdGVycmFpbih0ZXJyYWluRGF0YSk7XG5kZWJ1Z2dlcjtcblxuLyogPT09PT09IFRlc3RzID09PT09PSAqL1xuZGVzY3JpYmUoXCJiYXNpYyBtYXAgLSB3aXRob3V0IHBsdWdpbnNcIiwgZnVuY3Rpb24oKSB7XG5cbiAgbGV0IG1hcERhdGEgPSB7XG4gICAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICAgIHBsdWdpbnNUb0FjdGl2YXRlOiBmYWxzZSxcbiAgICBzdGFnZXM6IFt7XG4gICAgICB0eXBlOiBcIk1hcF9zdGFnZVwiLFxuICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICAgIGxheWVyczogW3tcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiB7XG4gICAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgIFwiL2Fzc2V0cy9pbWcvbWFwL2NvbGxlY3Rpb24ucG5nXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJmcmFtZXNcIjogW1xuICAgICAgICAgICAgICAgIFswLDAsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDQ4LDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCw5Niw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsMTQ0LDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCwxOTIsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDI0MCw5Niw0OF1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNDAsIHk6IDQwIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAxLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNDAsIHk6IDQwIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAyLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XVxuICAgICAgICB9LHtcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInVuaXRMYXllclwiLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3VuaXRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgICAgIHR5cGVJbWFnZURhdGE6IHtcbiAgICAgICAgICAgICAgaW1hZ2VzOiBbXG4gICAgICAgICAgICAgICAgXCIvYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImZyYW1lc1wiOiBbXG4gICAgICAgICAgICAgICAgWzAsMCw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsNDgsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDk2LDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCwxNDQsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDE5Miw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsMjQwLDk2LDQ4XVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcblxuXG4gIGRlc2NyaWJlKFwiPT4gbWFrZSBtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1hcCA9IGNyZWF0ZU1hcChtYXBEYXRhKTtcblxuICAgIGl0KFwiPT4gZXhpc3RzXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gc3RhZ2UgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0ubmFtZSA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpLm5hbWUgID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiBsYXllciBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRMYXllck5hbWVkKFwidW5pdExheWVyXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB0ZXJyYWluIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlblswXS54ID09PSA0MCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlbi5sZW5ndGggPiAxKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ID09PSA2MCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovXG5mdW5jdGlvbiBkYXRhQ292ZXJ0ZXJGb3JUZXN0RGF0YV90ZXJyYWluKGpzb25lZERhdGEpIHtcbiAgLyogc3RyaXAgdGhlIHJlcXVpcmVkIGRhdGEgdG8gdGhlIG9iamVjdCBhbmQgcmV0dXJuIGl0ICovXG4gIHJldHVybiBqc29uZWREYXRhLm9iamVjdHMubWFwKGZ1bmN0aW9uKHRoaXNEYXRhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9ialR5cGU6IHRoaXNEYXRhLm9ialR5cGUsXG4gICAgICBfaWQ6IHRoaXNEYXRhLl9pZCxcbiAgICAgIGNvb3JkOiB0aGlzRGF0YS5jb29yZFxuICAgIH07XG4gIH0pO1xufSIsIi8qXG4gKiBKYXZhU2NyaXB0IE1ENSAxLjAuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKiBcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cblxuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSAqL1xuLypnbG9iYWwgdW5lc2NhcGUsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKlxuICAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICAgICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpIHtcbiAgICAgICAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKSxcbiAgICAgICAgICAgIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICAgICAgICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICAgICovXG4gICAgZnVuY3Rpb24gYml0X3JvbChudW0sIGNudCkge1xuICAgICAgICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBtZDVfY21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksIGIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgZCkgfCAoYyAmICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2lpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICAgICovXG4gICAgZnVuY3Rpb24gYmlubF9tZDUoeCwgbGVuKSB7XG4gICAgICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gICAgICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKTtcbiAgICAgICAgeFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuO1xuXG4gICAgICAgIHZhciBpLCBvbGRhLCBvbGRiLCBvbGRjLCBvbGRkLFxuICAgICAgICAgICAgYSA9ICAxNzMyNTg0MTkzLFxuICAgICAgICAgICAgYiA9IC0yNzE3MzM4NzksXG4gICAgICAgICAgICBjID0gLTE3MzI1ODQxOTQsXG4gICAgICAgICAgICBkID0gIDI3MTczMzg3ODtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIG9sZGEgPSBhO1xuICAgICAgICAgICAgb2xkYiA9IGI7XG4gICAgICAgICAgICBvbGRjID0gYztcbiAgICAgICAgICAgIG9sZGQgPSBkO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDcsIC02ODA4NzY5MzYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNywgIDYwNjEwNTgxOSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNywgLTE3NjQxODg5Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA1XSwgMTIsICAxMjAwMDgwNDI2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA3LCAgMTc3MDAzNTQxNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA3LCAgMTgwNDYwMzY4Mik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDUsIC0xNjU3OTY1MTApO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgNl0sICA5LCAtMTA2OTUwMTYzMik7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsICA2NDM3MTc3MTMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2ldLCAgICAgIDIwLCAtMzczODk3MzAyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNSwgLTcwMTU1ODY5MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgIDksICAzODAxNjA4Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNSwgIDU2ODQ0NjQzOCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgIDksIC0xMDE5ODAzNjkwKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA4XSwgMjAsICAxMTYzNTMxNTAxKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgMl0sICA5LCAtNTE0MDM3ODQpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE0LCAgMTczNTMyODQ3Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA0LCAtMzc4NTU4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA0LCAgNjgxMjc5MTc0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpXSwgICAgICAxMSwgLTM1ODUzNzIyMik7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgNl0sIDIzLCAgNzYwMjkxODkpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA0LCAtNjQwMzY0NDg3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsICA1MzA3NDI1MjApO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgMl0sIDIzLCAtOTk1MzM4NjUxKTtcblxuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA2LCAtMTk4NjMwODQ0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDddLCAxMCwgIDExMjY4OTE0MTUpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDYsICAxNzAwNDg1NTcxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNiwgLTE0NTUyMzA3MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNSwgIDcxODc4NzI1OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuXG4gICAgICAgICAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgICAgICAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgICAgICAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgICAgICAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sMnJzdHIoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDMyOyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChpbnB1dFtpID4+IDVdID4+PiAoaSAlIDMyKSkgJiAweEZGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gICAgKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyYmlubChpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xuICAgICAgICBvdXRwdXRbKGlucHV0Lmxlbmd0aCA+PiAyKSAtIDFdID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBvdXRwdXRbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiA4OyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4RkYpIDw8IChpICUgMzIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGEgcmF3IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9tZDUocykge1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KHJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgSE1BQy1NRDUsIG9mIGEga2V5IGFuZCBzb21lIGRhdGEgKHJhdyBzdHJpbmdzKVxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9obWFjX21kNShrZXksIGRhdGEpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBia2V5ID0gcnN0cjJiaW5sKGtleSksXG4gICAgICAgICAgICBpcGFkID0gW10sXG4gICAgICAgICAgICBvcGFkID0gW10sXG4gICAgICAgICAgICBoYXNoO1xuICAgICAgICBpcGFkWzE1XSA9IG9wYWRbMTVdID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoYmtleS5sZW5ndGggPiAxNikge1xuICAgICAgICAgICAgYmtleSA9IGJpbmxfbWQ1KGJrZXksIGtleS5sZW5ndGggKiA4KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgICAgICAgICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xuICAgICAgICB9XG4gICAgICAgIGhhc2ggPSBiaW5sX21kNShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpO1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBoZXggc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmhleChpbnB1dCkge1xuICAgICAgICB2YXIgaGV4X3RhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJyxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaGV4X3RhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwRikgK1xuICAgICAgICAgICAgICAgIGhleF90YWIuY2hhckF0KHggJiAweDBGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBFbmNvZGUgYSBzdHJpbmcgYXMgdXRmLThcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cjJyc3RyX3V0ZjgoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJhd19tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cl9tZDUoc3RyMnJzdHJfdXRmOChzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X21kNShzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJhd19obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyX2htYWNfbWQ1KHN0cjJyc3RyX3V0ZjgoayksIHN0cjJyc3RyX3V0ZjgoZCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X2htYWNfbWQ1KGssIGQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZDUoc3RyaW5nLCBrZXksIHJhdykge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGV4X21kNShzdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJhd19tZDUoc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuIGhleF9obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhd19obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1kNTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJC5tZDUgPSBtZDU7XG4gICAgfVxufSh0aGlzKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PSAzcmQgcGFydHkgbGlicmFyeSBpbXBvcnRzID09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwX3N0YWdlJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4uL21hcC9jb3JlL01hcF9sYXllcic7XG5pbXBvcnQgeyBPYmplY3RzX3RlcnJhaW4gfSBmcm9tICcuLi9tYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW4nO1xuaW1wb3J0IHsgT2JqZWN0c191bml0IH0gZnJvbSAnLi4vbWFwL29iamVjdHMvT2JqZWN0c191bml0JztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi4vbWFwL2NvcmUvbWFwX3ZhbGlkYXRvcnNcIjtcblxubGV0IGZ1bmN0aW9uc0luT2JqID0ge1xuICBNYXBfc3RhZ2UsXG4gIE1hcF9sYXllcixcbiAgT2JqZWN0c190ZXJyYWluLFxuICBPYmplY3RzX3VuaXRcbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgICBfZ2V0U3RhZ2VJbmRleFxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gICAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleFxufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuLypcbkBhcmd1bWVudCB7YmlnYXNzIE9iamVjdH0gbWFwRGF0YSAtIGhvbGRzIGFsbCB0aGUgc3RhZ2UsIGxheWVyIGFuZCBvYmplY3QgZGF0YSBuZWVkZWQgdG8gY29uc3RydWN0IGEgZnVsbCBtYXAuXG5Db29yZGluYXRlcyBhcmUgYWx3YXlzIGRlZmF1bHRlZCB0byAwLDAgaWYgbm9uZSBhcmUgZ2l2ZW4uXG57XG4gIG1hcFNpemU6IGNyZWF0ZWpzLlJlY3RhbmdsZSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IFtcbiAgICBcIm1hcC9tb3ZlL21hcF9tb3ZlXCIsXG4gICAgXCJtYXAvRk9XL21hcF9GT1dcIlxuICBdLFxuICBzdGFnZXM6IFt7XG4gICAgdHlwZTogXCJtYXAvY29yZS9NYXBfU3RhZ2VcIixcbiAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XSxcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dLFxuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdW5pdFwiLFxuICAgICAgICBuYW1lOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJJbmZhbnRyeSAxXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59XG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGdpdmVuTWFwRGF0YSkge1xuICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG4gIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBiYXNlUGF0aCA9IFwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL1wiO1xuICBsZXQgbWFwRGF0YSA9ICh0eXBlb2YgZ2l2ZW5NYXBEYXRhID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZ2l2ZW5NYXBEYXRhKSA6IGdpdmVuTWFwRGF0YTtcblxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zICovXG4gIGlmKG1hcERhdGEucGx1Z2luc1RvQWN0aXZhdGUgJiYgbWFwRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgbWFwRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAoeCA9PiBTeXN0ZW0uaW1wb3J0KHgpKSlcbiAgICAgIC50aGVuKChbbW9kdWxlMSwgbW9kdWxlMiwgbW9kdWxlM10pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwbHVnaW5zIGxvYWRlZFwiKTtcbiAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnN0YWNrKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyogV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBnaXZlbiBtYXAgZGF0YSBhbmQgY3JlYXRlIG9iamVjdHMgYWNjb3JkaW5nbHkgKi9cbiAgbWFwRGF0YS5zdGFnZXMuZm9yRWFjaCggc3RhZ2VEYXRhID0+IHtcbiAgICBsZXQgdGhpc1N0YWdlID0gbmV3IGZ1bmN0aW9uc0luT2JqW3N0YWdlRGF0YS50eXBlXShzdGFnZURhdGEubmFtZSk7XG5cbiAgICBtYXAuYWRkU3RhZ2UoIHRoaXNTdGFnZSApO1xuXG4gICAgc3RhZ2VEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgICAgbGV0IHRoaXNMYXllcjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpc0xheWVyID0gbmV3IGZ1bmN0aW9uc0luT2JqW2xheWVyRGF0YS50eXBlXShsYXllckRhdGEubmFtZSwgbGF5ZXJEYXRhLnR5cGUsIGZhbHNlKTtcbiAgICAgICAgdGhpc1N0YWdlLmFkZENoaWxkKCB0aGlzTGF5ZXIgKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW06XCIsIGxheWVyRGF0YS50eXBlLCBlLnN0YWNrKVxuICAgICAgfVxuXG4gICAgICBsYXllckRhdGEub2JqZWN0R3JvdXBzLmZvckVhY2goIG9iamVjdEdyb3VwID0+IHtcbiAgICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICAgIGxldCBpbWFnZURhdGE7XG5cbiAgICAgICAgICAvKiBJZiB0aGUgb2JqZWN0IGlzIGEgc3ByaXRlICovXG4gICAgICAgICAgaWYob2JqZWN0R3JvdXAudHlwZUltYWdlRGF0YSkge1xuICAgICAgICAgICAgaW1hZ2VEYXRhID0ge1xuICAgICAgICAgICAgICBzcHJpdGVzaGVldDogYWxsU3ByaXRlc2hlZXRzLmFkZFNwcml0ZXNoZWV0KG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGEpLFxuICAgICAgICAgICAgICBjdXJyZW50RnJhbWVOdW1iZXI6IG9iamVjdC5pbWFnZURhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IG9iamVjdC5pbWFnZURhdGE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZGluYXRlcywgb2JqZWN0LmRhdGEsIGltYWdlRGF0YS5zcHJpdGVzaGVldCwgaW1hZ2VEYXRhLmN1cnJlbnRGcmFtZU51bWJlciApICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBtYXA7XG5cbi8qXG4gIENyZWF0ZVRlcnJhaW5TdGFnZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfYmFzZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfdGVycmFpblxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfZGl0aGVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9wcmV0dGlmaWVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9yZXNvdXJjZVxuICBDcmVhdGVVbml0U3RhZ2VcbiAgICBfQ3JlYXRlVW5pdExheWVyX1VuaXRcbiAgICBfQ3JlYXRlVW5pdExheWVyX0NpdHlcbiAgQ3JlYXRlRk9XU3RhZ2VcbiAgQ3JlYXRlRGF0YVN0YWdlXG4gIENyZWF0ZVVJU3RhZ2VcbiAgICBfQ3JlYXRlVUlMYXllcl9hcnJvd1xuICAgIF9DcmVhdGVVSUxheWVyX3NlbGVjdGlvblxuKi9cblxuICBmdW5jdGlvbiBfY2FsY3VsYXRlTWFwU2l6ZSgpIHtcblxuICB9XG59XG5cbi8qID09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoKSB7fSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL01hcF9sYXllcic7XG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICAgIF9nZXRTdGFnZUluZGV4XG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICAgIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gICAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICAgIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gICAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzLFxuICAgIF9pc19jYW52YXM6IHZhbGlkYXRvck1vZC5pc0NhbnZhc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuLypcbiovXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICB0aGlzLnpvb21MZXZlbCA9IDE7XG4gICAgICB0aGlzLnN0YWdlcyA9IFtdO1xuICAgICAgdGhpcy5wbHVnaW5zID0ge307XG4gICAgICB0aGlzLm1hcFNpemUgPSAob3B0aW9ucyAmJiBvcHRpb25zLm1hcFNpemUpIHx8IHsgeDowLCB5OjAsIHdpZHRoOjAsIGhlaWdodDowIH07XG4gICAgICB0aGlzLmFjdGl2ZVRpY2tDQjtcbiAgICB9XG4gICAgLyogb3B0aW9ucy5tYXBTaXplID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSovXG4gICAgaW5pdChvcHRpb25zKSB7XG4gICAgICB0aGlzLm1hcFNpemUgPSAob3B0aW9ucyAmJiBvcHRpb25zLm1hcFNpemUpIHx8IHsgeDowLCB5OjAsIHdpZHRoOjAsIGhlaWdodDowIH07XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkcmF3TWFwKCkge1xuICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICBpZihzdGFnZS5kcmF3VGhpc0NoaWxkKSB7XG4gICAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgICAgc3RhZ2UuZHJhd1RoaXNDaGlsZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFNpemUoICkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xuICAgIH1cbiAgICBzZXRTaXplKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICB0aGlzLm1hcFNpemUgPSB7IHg6eDEsIHk6eTEsIHdpZHRoOngyLCBoZWlnaHQ6eTIgfTtcblxuICAgICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IHN0YWdlIG9mIHRoaXMuc3RhZ2VzKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihzdGFnZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBzdGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gc3RhZ2UuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGFkZFN0YWdlKHN0YWdlKSB7XG4gICAgICBsZXQgc3RhZ2VzID0gW107XG5cbiAgICAgIGlmKCEgKHN0YWdlIGluc3RhbmNlb2YgQXJyYXkpICkge1xuICAgICAgICBzdGFnZXMucHVzaChzdGFnZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhZ2VzLnB1c2goLi4uc3RhZ2VzKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlcGxhY2VTdGFnZShuZXdDYW52YXMsIG9sZENhbnZhcykge1xuICAgICAgbGV0IG9sZEluZGV4ID0gcHJpdmF0ZUZ1bmN0aW9ucy5fZ2V0U3RhZ2VJbmRleCh0aGlzLnN0YWdlcywgb2xkQ2FudmFzKTtcbiAgICAgIHRoaXMuc3RhZ2VzW29sZEluZGV4XSA9IG5ld0NhbnZhcztcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZExheWVyKGxheWVyLCBzdGFnZSkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVMYXllcihsYXllcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVwbGFjZUxheWVyKG5ld0xheWVyLCBvbGRMYXllcikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdG9nZ2xlTGF5ZXIobGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgICAgbGV0IHRoZUxheWVyO1xuXG4gICAgICBmb3IobGV0IHN0YWdlIG9mIHRoaXMuc3RhZ2VzKSB7XG4gICAgICAgIGlmKHRoZUxheWVyID0gc3RhZ2UuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiB0aGVMYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYWNoZU1hcCgpIHtcbiAgICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICAgICAgaWYoc3RhZ2UuY2FjaGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZSh0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGVMYXllcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRPYmplY3RzVW5kZXJNYXBQb2ludCgpIHtcbiAgICAgICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgICAgb2JqZWN0c1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgIGlmKHN0YWdlLnVwZGF0ZVN0YWdlID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRDYW52YXNlc1RvRnVsbFNpemUoY2FudmFzZXMpIHtcbiAgICAgIGZvciggbGV0IGNhbnZhcyBvZiB0aGlzLnN0YWdlcyApIHtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcblxuICAgICAgICBjdHguY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBBY3RpdmF0ZXMgYSBnaXZlbiBwbHVnaW4gLyBtb2R1bGUgZm9yIHRoaXMgbWFwIGluc3RhbmNlICovXG4gICAgYWN0aXZhdGVQbHVnaW4ocGx1Z2luKSB7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luLm5hbWVdID0gbmV3IHBsdWdpbih0aGlzKTtcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW4ubmFtZV0uaW5pdCgpO1xuICAgIH1cbiAgICBzdGFydFRpY2sodGlja0NCKSB7XG4gICAgICBpZih0aGlzLmFjdGl2ZVRpY2tDQikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCO1xuXHQgICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIHRoaXMuYWN0aXZlVGlja0NCKTtcblxuXHQgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0b3BUaWNrKCkge1xuICAgICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB1bmRlZmluZWQ7XG5cdCAgICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG5cdCAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoc3RhZ2VzLCBzdGFnZVRvRmluZCkge1xuICB2YXIgZm91bmRJbmRleCA9IHN0YWdlcy5pbmRleE9mKHN0YWdlVG9GaW5kKTtcblxuICByZXR1cm4gKCBmb3VuZEluZGV4ID09PSAtMSApID8gZmFsc2UgOiBmb3VuZEluZGV4O1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4vKiA9PT09PSBDb25zdGFudHMgPT09PT0gKi9cbmNvbnN0IFRZUEVTID0ge1xuICBqdXN0U3ViQ29udGFpbmVyczogMSxcbiAgbm9TdWJDb250YWluZXJzOiAyLFxuICBpbWFnZXNJblN1YkNvbnRhaW5lcnM6IDNcbn07XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gIF9nZXRTdGFnZUluZGV4LFxuICBfY3JlYXRlU3ViQ29udGFpbmVycyxcbiAgX2NhY2hlTGF5ZXIsXG4gIF9zZXRDb3JyZWN0U3ViQ29udGFpbmVyLFxuICBfZ2V0Q29ycmVjdENvbnRhaW5lclxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gIF9pc19ib29sZWFuOiB2YWxpZGF0b3JNb2QuaXNCb29sZWFuLFxuICBfaXNfY29vcmRpbmF0ZXM6IHZhbGlkYXRvck1vZC5pc0Nvb3JkaW5hdGVzLFxuICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gIF9pc19Vc2VPZlN1YkNvbnRhaW5lcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViQ29udGFpbmVyc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9sYXllciBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6IHR5cGU7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICAvKiBvdmVybG9hZGVkIGluaGVyaXRlZCBtZXRob2QgKi9cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgQ29udGFpbmVyIGRpcmVjdGx5LiBXZXRoZXIgaXQgaXMgQ29udGFpbmVyIG9yIEJpdG1hcCBldGMuICovXG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgY29ycmVjdCBzdWJDb250YWluZXIuIEZvciBiZXR0ZXIgbG9naWMgYW5kIHBlcmZvcm1hbmNlICovXG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxuICBzdGF0aWMgZ2V0VHlwZShuYW1lKSB7XG4gICAgcmV0dXJuIFRZUEVTW25hbWVdO1xuICB9XG59XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cbi8qXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvZXh0ZW5kJztcbmltcG9ydCBwcm9tb3RlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvcHJvbW90ZSc7XG5pbXBvcnQgU3ByaXRlQ29udGFpbmVyIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlQ29udGFpbmVyJztcblxuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVzaGVldExheWVyIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgc3ByaXRlc2hlZXQpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6IHR5cGU7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGFkZENoaWxkVG9TdWJDb250YWluZXIob2JqZWN0LCBpbmRleCkge1xuICAgIGxldCBmdW5jdGlvblRvVXNlID0gaW5kZXggPyBcIl9hZGRDaGlsZEF0XCIgOiBcIl9hZGRDaGlsZFwiO1xuXG4gICAgaWYoIXRoaXMudXNlU3ViY29udGFpbmVycykge1xuICAgICAgdGhpc1tmdW5jdGlvblRvVXNlXShvYmplY3QsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSBwcml2YXRlRnVuY3Rpb25zLl9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnVzZVN1YmNvbnRhaW5lcnM7XG4gIH1cbiAgaXNTZXRWaXNpYmxlKCkgeyB9XG4gIHNldFZpc2libGUoKSB7IH1cbn1cbiovXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgobWFwLCBjYW52YXMpIHsgfVxuZnVuY3Rpb24gX2NyZWF0ZVN1YkNvbnRhaW5lcnMoKSB7IH1cbmZ1bmN0aW9uIF9jYWNoZUxheWVyKCkgeyB9XG5mdW5jdGlvbiBfc2V0Q29ycmVjdFN1YkNvbnRhaW5lcigpIHsgfVxuZnVuY3Rpb24gX2dldENvcnJlY3RDb250YWluZXIoeCwgeSkge1xuICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHRoaXMuZ2V0T2JqZWN0VW5kZXJQb2ludCh4LCB5KTtcblxuICByZXR1cm4gY29ycmVjdFN1YkNvbnRhaW5lcjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSB2YWxpZGF0b3IgbW9kdWxlXG4qL1xuXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0geyB9O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX3N0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3RhZ2Uge1xuICAvKiBUYWtlcyB0aGUgY2FudmFzIGVsZW1lbnQgYXMgYXJndW1lbnQgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nIEFORCBnZXR0aW5nIGNoaWxkcmVuIGJ5IG5hbWUuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAgICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgICAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dG9DbGVhciA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgICB9XG4gICAgZ2V0Q2FjaGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICAgIH1cbiAgICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgICAgIHZhbGlkYXRvcnMuX2lzX2Jvb2xlYW4oc3RhdHVzKTtcbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICAgIGZvcihsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgICAgaWYobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGlsZCA9IGxheWVyLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cblxuXG4vKlxuXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuaW1wb3J0IFNwcml0ZVN0YWdlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlU3RhZ2UnO1xuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVTdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZVN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGlzIGNsYXNzIG5lZWRzIHRvIGJlIGdvbmUgdGhyb3VnaCBjYXJlZnVsbHksIGl0IGhhcyBiZWVuIGNvcGllZCBmcm9tIGFuIG9sZGVyIHZlcnNpb24gc3RyYWlnaHQuIFRoZSB2ZXJzaW9uIHdhcyBFUzVcbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YVxuKi9cblxuZXhwb3J0IGNsYXNzIE9iamVjdHNfc3ByaXRlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcikge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcblxuICAgIHRoaXMubmFtZSA9IFwiZ2VuZXJhbCBPYmplY3RzX3Nwcml0ZV9cIiArIHRoaXMuaWQ7XG5cbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IGN1cnJlbnRGcmFtZU51bWJlcjtcblxuICAgIC8qIEV4ZWN1dGUgaW5pdGlhbCBkcmF3IGZ1bmN0aW9uICovXG4gICAgdGhpcy5pbm5lckRyYXcoY29vcmRzLngsIGNvb3Jkcy55KTtcblxuICAgIC8qIG9wdGltaXphdGlvbnMgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIFNob3VsZCBiZSBlbmFibGVkLCBpZiB0aGUgbGF5ZXIgaXMgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLiBMaWtlIHVuaXQgbGF5ZXIuIFRoaXMgd2F5IHdlIGNhbiB1c2UgY3Vyc29yIHBvaW50ZXIgZXRjLlxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gRk9SIERFQlVHR0lORyBBTkQgU0VFSU5HIFRIQVQgTElTVEVORVJTIEFSRSBBVFRBQ0hFRDpcbiAgICAvL3RoaXMud2lsbFRyaWdnZXJcbiAgfVxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyogRHJhd2luZyB0aGUgb2JqZWN0IHdpdGggY3JlYXRlanMtbWV0aG9kcyAqL1xuICBpbm5lckRyYXcoeCwgeSkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoIHRoaXMuY3VyckZyYW1lTnVtYmVyICk7XG4gICAgY29uc29sZS5sb2coXCJIQUFBXCIpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIC8qIFRoZSBtb3VzZSBjaGVjayBoYXMgYmVlbiBlbmFibGVkIG9uIGhpZ2hlciB0aWVyLCBzbyBubyBuZWVkIGZvciB0aGlzXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTsgKi9cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZU51bWJlcikge1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gbmV3RnJhbWVOdW1iZXI7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XG4gIH1cbiAgLyogRHVubm8gaWYgd2UgbmVlZCB0aGlzIGFuZCBzbyBvbi4gVGhpcyB3YXMgaW4gdGhlIG9sZCB2ZXJzaW9uICovXG4gIGdsb2JhbENvb3JkcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogTnVtYmVyKCB0aGlzLnggKyB0aGlzLnBhcmVudC54ICksXG4gICAgICB5OiBOdW1iZXIoIHRoaXMueSArIHRoaXMucGFyZW50LnkgKVxuICAgIH07XG4gIH1cbiAgZ2V0Qm91bmRzRnJvbUZyYW1lcygpIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU2hlZXQuZ2V0RnJhbWVCb3VuZHMoIHRoaXMuY3VycmVudEZyYW1lICk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBIb2xkIGRpZmZlcmVudCB2YWxpZGF0b3IgZnVuY3Rpb25zIHRvIGJlIHVzZWQgaW4gbW9kdWxlcyAqL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICBfaXNJbnRcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBsZXQgdmFsaWRhdG9yTW9kID0gKGZ1bmN0aW9uIHZhbGlkYXRvck1vZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0luZGV4KGludCkge1xuICAgICAgICByZXR1cm4gcHJpdmF0ZUZ1bmN0aW9ucy5pc0ludChpbnQpO1xuICAgIH0sXG4gICAgaXNCb29sZWFuKGJvb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvb2wgPT09IEJvb2xlYW4oYm9vbCk7XG4gICAgfSxcbiAgICBpc0Nvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICAgICAgaWYocHJpdmF0ZUZ1bmN0aW9ucy5pc0ludCh4KSAmJiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KHkpICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBpc1N1YkNvbnRhaW5lckFtb3VudCgpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkxheWVycygpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkNvbnRhaW5lcnMoKSB7XG5cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9pc0ludCh3YW5uYWJlSW50KSB7XG4gIC8qIEVTNiAqL1xuICBpZihOdW1iZXIuaXNJbnRlZ2VyKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIod2FubmFiZUludCk7XG4gIH1cblxuICAvKiBFUzUgKi9cbiAgcmV0dXJuIHR5cGVvZiB3YW5uYWJlSW50ID09PSAnbnVtYmVyJyAmJiAod2FubmFiZUludCAlIDEpID09PSAwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYoc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzKCBfY3JlYXRlSUQoIHNwcml0ZXNoZWV0RGF0YSApICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxuICAgIGFsbFNwcml0ZXNoZWV0cy5wdXNoKCBzcHJpdGVTaGVldCApO1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldCkge1xuXG4gIH07XG4gIHNjb3BlLmdldEFsbFNwcml0ZXNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuICBzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXRJRCkge1xuICAgIHJldHVybiAoIGFsbFNwcml0ZXNoZWV0SURzLmluZGV4T2YoIHNwcml0ZXNoZWV0SUQgKSA+IC0xICk7XG4gIH07XG4gIGZ1bmN0aW9uIF9jcmVhdGVJRCAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuICggc3ByaXRlc2hlZXREYXRhLmltYWdlcy50b1N0cmluZygpICk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0c19zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdHMnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c190ZXJyYWluIGV4dGVuZHMgT2JqZWN0c19zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RcIjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0c19zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdHMnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c191bml0IGV4dGVuZHMgT2JqZWN0c19zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzXCI7XG4gIH1cbn0iLCJleHBvcnQgbGV0IGdyYXBoaWNEYXRhID0ge1xuICBcImdlbmVyYWxcIjp7XG4gICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgXCJ0aWxlV2lkdGhcIjo5NixcInRpbGVIZWlnaHRcIjo0OFxuXG4gICAgfVxuICB9LFxuICBcInRlcnJhaW5CYXNlXCI6e1xuICAgIFwiaW1hZ2VzXCI6XG4gICAgW1wiYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIl0sXG4gICAgXCJmcmFtZXNcIjpbXG4gICAgICBbMCwwLDk2LDQ4XSxbMCw0OCw5Niw0OF0sWzAsOTYsOTYsNDhdLFswLDE0NCw5Niw0OF0sWzAsMTkyLDk2LDQ4XSxbMCwyNDAsOTYsNDhdXG4gICAgXSxcbiAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgfSxcbiAgXCJ0ZXJyYWluXCI6e1xuICAgIFwiaW1hZ2VzXCI6W1wiYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMS5wbmdcIl0sXG4gICAgXCJmcmFtZXNcIjpbXG4gICAgICBbMSwxLDk2LDQ4XSxbMSw1MCw5Niw0OF0sWzEsOTksOTYsNDhdLFsxLDE0OCw5Niw0OF0sWzEsMTk3LDk2LDQ4XSxbMSwyNDYsOTYsNDhdLFsxLDI5NSw5Niw0OF0sWzEsMzQ0LDk2LDQ4XSxbMSwzOTMsOTYsNDhdXG4gICAgXSxcbiAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgfSxcbiAgXCJkaXRoZXJcIjp7XCJpbWFnZXNcIjpbXCJpbWcvbWFwL2RpdGhlcjIucG5nXCJdLFwiZnJhbWVzXCI6W1swLDAsOTYsNDhdXSxcImltYWdlU2l6ZVwiOls5Niw0OF19LFxuICBcInByZXR0aWZpZXJcIjp7XG4gICAgXCJpbWFnZXNcIjpbXCJhc3NldHMvaW1nL21hcC9hbXBsaW8yL21vdW50YWlucy5wbmdcIixcImltZy9tYXAvYW1wbGlvMi9oaWxscy5wbmdcIixcImltZy9tYXAvYW1wbGlvMi90ZXJyYWluMi5wbmdcIl0sXG4gICAgXCJmcmFtZXNcIjpbXG4gICAgICBbMSwxLDk2LDY2LDAsMCwxOF0sWzEsMSw5Niw0OCwxLC00LDRdLFsxLDE0OCw5Niw0OCwyXVxuICAgIF1cbiAgfSxcbiAgXCJyZXNvdXJjZVwiOntcbiAgICBcImltYWdlc1wiOltcImFzc2V0cy9pbWcvbWFwL3Jlc291cmNlcy90ZXJyYWluMS5wbmdcIl0sXG4gICAgXCJmcmFtZXNcIjpbXG4gICAgICBbMTk1LDEsOTYsNDhdLFszODksMSw5Niw0OF1cbiAgICBdXG4gIH0sXG4gIFwicGxhY2VcIjp7fSxcbiAgXCJjaXR5XCI6e1xuICAgIFwiaW1hZ2VzXCI6W1wiYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tZWRpZXZhbGNpdGllcy5wbmdcIl0sXG4gICAgXCJmcmFtZXNcIjpbXG4gICAgICBbMSwxLDk2LDcyXSxbOTgsMSw5Niw3Ml0sWzE5NSwxLDk2LDcyXSxbMjkyLDEsOTYsNzJdLFszODksMSw5Niw3Ml0sWzQ4NSwxLDk2LDcyXSxbNTgyLDEsOTYsNzJdLFs2NzksMSw5Niw3Ml0sWzc3NiwxLDk2LDcyXSxbODczLDEsOTYsNzJdLFsxLDc0LDk2LDcyXSxbOTgsNzQsOTYsNzJdLFsxOTUsNzQsOTYsNzJdLFsyOTIsNzQsOTYsNzJdLFszODksNzQsOTYsNzJdLFs0ODUsNzQsOTYsNzJdLFs1ODIsNzQsOTYsNzJdLFs2NzksNzQsOTYsNzJdLFs3NzYsNzQsOTYsNzJdLFs4NzMsNzQsOTYsNzJdXX0sXCJidWlsZGluZ1wiOntcImltYWdlc1wiOltcImltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXCJmcmFtZXNcIjpbWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1dfSxcIm1vZGlmaWVyXCI6e1wiaW1hZ2VzXCI6W1wiaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcImZyYW1lc1wiOltbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXV19LFwidW5pdFwiOntcImltYWdlc1wiOltcImltZy9tYXAvYW1wbGlvMi91bml0cy5wbmdcIl0sXCJmcmFtZXNcIjp7XCJ3aWR0aFwiOjY2LFwiaGVpZ2h0XCI6NTB9fX07IiwiZXhwb3J0IGxldCB0ZXJyYWluRGF0YSA9IHtcbiAgIFwiZ2FtZUlEXCI6XCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgIFwib2JqZWN0c1wiOltcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiM1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjowXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjMzWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6NSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6MjQwXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjM5WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6NSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6NDgwXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjQxWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjcyMFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY0NVpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjN1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjo5NjBcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NDdaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2Y2NcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6MTIwMFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY0OVpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZkMVwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjoxNDQwXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjUyWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmQ2XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6NDgsXG4gICAgICAgICAgICBcInlcIjo3MlxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY1NFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiNFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjo0OFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjYzN1pcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjUsXG4gICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI5XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjI4OFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjYzOVpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZVwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjo1MjhcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NDRaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzNcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6NzY4XG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjQ2WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM4XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjEwMDhcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NDhaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2Y2RcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6MTI0OFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY1MFpcIlxuICAgICAgfVxuICAgXVxufSIsImV4cG9ydCBsZXQgdHlwZURhdGEgPSB7XCJtYXB2aWV3c1wiOlswLDEsMiwzLDRdLFwidW5pdFwiOlt7XCJuYW1lXCI6XCJ0YW5rXCIsXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcImltYWdlXCI6XCIwXCIsXCJhdHRcIjpcIkdvb2RcIixcImRlZlwiOlwiUG9vclwiLFwic2llZ2VcIjpcIkRlY2VudFwiLFwiaW5pdGlhdGVcIjpcIjkwXCIsXCJtb3ZlXCI6XCIxMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIxNTBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJ9LHtcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcIm1vZGlmaWVyc1wiOntcInVuaXRcIjp7XCJfZW5lbXlfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wibW9yYWxlXCI6XCJzdWZmZXJzIG1vcmFsZSBkcm9wXCJ9fV19fX0se1wibmFtZVwiOlwiY2F2YWxyeVwiLFwiZGVzY1wiOlwiR2l2ZSBtZSBhbiBhcHBsZSFcIixcImltYWdlXCI6XCIyNlwiLFwiYXR0XCI6XCIzXCIsXCJkZWZcIjpcIjFcIixcInNpZWdlXCI6XCIwXCIsXCJpbml0aWF0ZVwiOlwiNTBcIixcIm1vdmVcIjpcIjMwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIn1dLFwidGVycmFpbkJhc2VcIjpbe1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifSx7XCJpbWFnZVwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn0se1wiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifSx7XCJpbWFnZVwiOlwiNFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9LHtcImltYWdlXCI6XCI1XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn1dLFwidGVycmFpblwiOlt7XCJuYW1lXCI6XCJkZXNlcnRcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJ2ZXJ5IGRyeSBsYW5kXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIn19XX19fSx7XCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMTIlIGZvb2QgZm9yIGNpdGllc1wifX1dfX19LHtcIm5hbWVcIjpcImZvcmVzdFwiLFwiaW1hZ2VcIjpcIjJcIixcImRlc2NcIjpcIlJvYmluIGhvb2QgbGlrZXMgaXQgaGVyZVwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGVmZW5kXCI6XCJVbml0IGRlZmVuZCArMlwifX1dfX19LHtcIm5hbWVcIjpcInR1bmRyYVwiLFwiZGVzY1wiOlwiU2liZXJpYSB0ZWFjaGVzIHlvdVwiLFwiaW1hZ2VcIjpcIjZcIn0se1wibmFtZVwiOlwiYXJjdGljXCIsXCJkZXNjXCI6XCJZb3VyIGJhbGwgd2lsbCBmcmVlemUgb2ZcIixcImltYWdlXCI6XCI3XCJ9LHtcIm5hbWVcIjpcInN3YW1wXCIsXCJkZXNjXCI6XCJDcmFuYmVycmllcyBhbmQgY2xvdWRiZXJyaWVzXCIsXCJpbWFnZVwiOlwiOFwifV0sXCJkaXRoZXJcIjpbe1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXCJwcmV0dGlmaWVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMjUlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJ6SW5kZXhcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNjAlXCJ9XSxcInJlc291cmNlXCI6W3tcIm5hbWVcIjpcIk9hc2lzXCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwiT2FzaXMgaW4gdGhlIG1pZGRsZSBvZiBkZXNlcnQsIG9yIG5vdCBhdG0uXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJmb29kIHByb2R1Y3Rpb24gNSAvIHdlZWtcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiT2lsXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQmxhY2sgZ29sZFwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiVGhlcmUgaXMgYSBsb3Qgb2Ygb2lsIGhlcmVcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiNFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwiY2l0eVwiOlt7XCJuYW1lXCI6XCJNZWRpZXZhbFwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIwXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk1lZGlldmFsMlwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIxXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcInBsYWNlXCI6W10sXCJidWlsZGluZ1wiOlt7XCJuYW1lXCI6XCJCYXJyYWNrc1wiLFwiaW1hZ2VcIjpcIjBcIixcInRvb2x0aXBcIjpcIkVuYWJsZXMgdHJvb3AgcmVjcnVpdG1lbnRcIn0se1wibmFtZVwiOlwiRmFjdG9yeVwiLFwiaW1hZ2VcIjpcIjFcIixcInRvb2x0aXBcIjpcIlByb2R1Y2VzIHdlYXBvbnJ5XCJ9XSxcImdvdmVybm1lbnRcIjpbe1wibmFtZVwiOlwiRGVtb2NyYXp5XCIsXCJkZXNjcmlwdGlvblwiOlwid2VsbCBpdCdzIGEgZGVtb2NyYXp5IDopXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyArMjAlIGhhcHBpbmVzc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMCwxXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaGFwcGluZXNzXCI6XCIyMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ29tbXVuaXNtXCIsXCJkZXNjcmlwdGlvblwiOlwiWW91IGtub3cgdGhlIG9uZSB1c2VkIGluIHRoZSBncmVhdCBVU1NSIGFuZCBpbnNpZGUgdGhlIGdyZWF0IGZpcmV3YWxsIG9mIENoaW5hXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyBwcm9kdWN0aW9uIGJvbnVzZXNcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzIsM10sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOnt9fV19fSxcIkNpdHlcIjp7XCJidWlsZGluZ1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiMjAlXCJ9fV19fX19XSxcInBvbGl0aWNzXCI6e1widGF4UmF0ZVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImNvcnJ1cHRpb25cIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJhbGlnbm1lbnRcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJoYXBwaW5lc3NcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJyZXZvbHRSaXNrXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwidW5pdHlcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJuYXRWYWx1ZVwiOlt7XCJuYW1lXCI6XCJJbnRlZ3JpdHlcIixcInRvb2x0aXBcIjpcIkdvdmVybm1lbnQgYW5kIHBvcHVsYXRpb25zIHNob3dzIGludGVncml0eSBhbmQgdHJ1c3R3b3J0aGluZXNzXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImludGVybmFsUmVsYXRpb25zXCI6XCIrMTAlXCIsXCJkaXBsb21hY3lcIjpcIisxMCVcIixcInJldm9sdCByaXNrXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIi0yMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ2FwaXRhbGlzbVwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkaXBsb21hY3lcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJtb3JhbGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJIYXJkd29ya2luZ1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIisxMCVcIixcImhhcHBpbmVzc1wiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiTGVhZGVyc2hpcFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIis1JVwiLFwiaGFwcGluZXNzXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwidHJhZGluZ1wiOlwiKzEwJVwifX1dfX19fV19fTsiXX0=
