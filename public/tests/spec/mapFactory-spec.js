(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _createMap = require('../../components/factories/MapFactory.js');

/* Read data from files, to use with testing */

var _gameData = require('../../tests/data/gameData.js');

var _typeData = require('../../tests/data/typeData.js');

var _mapData = require('../../tests/data/mapData.js');

/*
1. Datat yhdessä pötkössä, kuten tää nykyinen testi-data. Eli noi testit datat tiedostoon ja pitää muuttaa oikeaan muotoon!

You should use this data instead of the testData below. You should convert this data to suit the standards so that there
is another class / module that handles the transformation and you define a good set of principle how it's done. Data in this:
"{
  "objType":2,
  "_id":"53837d49976fed3b240006b3",
  "coord":{"x":0,"y":0}
}"
What do we do with the _id and should that be replaced with actual data, when we instantiate the objects.

Always request data from backend with gameID and turn, like: domain.fi/API/mapData/832948hfdjsh93/1

/* ====== Tests ====== */
describe('basic map - without plugins', function () {
  /*let mapData = {
    mapSize: { x: 100, y: 100 },
    pluginsToActivate: false,
    stages: [{
      type: "Map_stage",
      coordinates: { x: 0, y: 0 },
      name: "terrainStage",
      element: "#canvasTerrain",
      layers: [{
          type: "Map_layer",
          coordinates: { x: 0, y: 0 },
          name: "terrainBaseLayer",
          options: {
            cache: true
          },
          objectGroups: [{
            type: "Objects_terrain",
            name: "TerrainBase", // I guess only for debugging?
            typeImageData: "terrainBase",
            objects: [{
                name: "Plain",
                coordinates: { x: 40, y: 40 },
                imageData: 1,
                data: {
                  someCustomData: true
                }
              },{
                name: "Plain",
                coordinates: { x: 40, y: 40 },
                imageData: 2,
                data: {
                  someCustomData: true
                }
            }]
          }]
        },{
          type: "Map_layer",
          coordinates: { x: 0, y: 0 },
          name: "unitLayer",
          options: {
            cache: false
          },
          objectGroups: [{
            type: "Objects_unit",
            name: "Unit", // I guess only for debugging?
            typeImageData: "unit",
            objects: [{
              name: "Infantry 1",
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
  */

  describe('=> make map', function () {
    var map = _createMap.createMap(_gameData.gameData, _mapData.mapData, _typeData.typeData);

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

},{"../../components/factories/MapFactory.js":3,"../../tests/data/gameData.js":12,"../../tests/data/mapData.js":13,"../../tests/data/typeData.js":14}],2:[function(require,module,exports){
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
function createMap(gameDataArg, mapDataArg, typeDataArg) {
  console.log('============================================');
  var map = new _Map.Map();
  var basePath = '/var/www/warMapEngine/public/components/';
  var mapData = typeof mapDataArg === 'string' ? JSON.parse(mapDataArg) : mapDataArg;
  var typeData = typeof typeDataArg === 'string' ? JSON.parse(typeDataArg) : typeDataArg;
  var gameData = typeof gameDataArg === 'string' ? JSON.parse(gameDataArg) : gameDataArg;
  console.log('gameData', gameData.pluginsToActivate, gameData.pluginsToActivate.map);
  /* Activate plugins */
  if (gameData.pluginsToActivate.map && gameData.pluginsToActivate.map.length > 0) {
    Promise.all(gameData.pluginsToActivate.map.map(function (x) {
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
        var spritesheet = undefined,
            objTypeData = undefined;
        var spritesheetType = objectGroup.typeImageData;

        if (spritesheetType) {
          var spritesheetData = typeData.graphicData[spritesheetType];

          objTypeData = typeData.objectData[spritesheetType][objType];
          spritesheet = allSpritesheets.addSpritesheet(spritesheetData);
        }

        objectGroup.objects.forEach(function (object) {
          var currentFrameNumber = objTypeData.image;

          thisLayer.addChild(new functionsInObj[objectGroup.type](object.coord, object.data, spritesheet, currentFrameNumber));
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

var _bind = Function.prototype.bind;

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

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

/* ====== 3rd party imports ====== */
//var System = require('es6-module-loader').System;
//import { System } from 'es6-module-loader';

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

/**
 * @param {object} options
 * {
 *  mapSize: {
 *    x: Number,
 *    y: Number
 * }
*/

var Map = (function () {
  function Map(options) {
    _classCallCheck(this, Map);

    this.stages = [];
    this.plugins = [];
    this.mapSize = options && options.mapSize || { x: 0, y: 0, width: 0, height: 0 };
    this.activeTickCB = false;
  }

  _createClass(Map, [{
    key: 'init',

    /* options.mapSize = new createjs.Rectangle*/
    value: function init(plugins) {
      if (plugins) {
        this.activatePlugins(plugins);
      }
      this.drawMap();
      this.tickOn();

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
    key: 'activateFullSize',
    value: function activateFullSize() {
      window.addEventListener('resize', _setStagesToFullSize.bind(this));
    }
  }, {
    key: 'deactivateFullSize',
    value: function deactivateFullSize() {
      window.removeEventListener('resize', this._setStagesToFullSize.bind(this));
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
       Parameter pluginToUse.func.name is part of ES6 standard to get function name.
    }] */
    value: function activatePlugins(pluginsArray) {
      pluginsArray.forEach(function (pluginToUse) {
        this.plugins[pluginToUse.func.name] = new (_bind.apply(pluginToUse.func, [null].concat(_toConsumableArray(pluginToUse.args))))();
        this.plugins[pluginToUse.func.name].init();
      });
    }
  }, {
    key: 'tickOn',
    value: function tickOn(tickCB) {
      if (this.activeTickCB) {
        throw new Error('there already exists one tick callback. Need to remove it first, before setting up a new one');
      }

      this.activeTickCB = tickCB || _handleTick.bind(this);

      createjs.Ticker.addEventListener('tick', this.activeTickCB);

      return this;
    }
  }, {
    key: 'tickOff',
    value: function tickOff() {
      createjs.Ticker.removeEventListener('tick', this.activeTickCB);

      this.activeTickCB = undefined;

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
/** == Context sensitive, you need to bind, call or apply these == */
function _handleTick() {
  this.stages.forEach(function (stage) {
    if (stage.updateStage === true) {
      stage.update();
    }
  });
}
function _setStagesToFullSize() {
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
var gameData = {
  ID: "53837d47976fed3b24000005",
  turn: 1,
  mapSize: { x: 100, y: 100 },
  pluginsToActivate: {
    map: ["map_move"]
  }
};
exports.gameData = gameData;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var mapData = {
   gameID: "53837d47976fed3b24000005",
   turn: 1,
   stages: [{
      type: "Map_stage",
      coordinates: { x: 0, y: 0 },
      name: "terrainStage",
      element: "#canvasTerrain",
      layers: [{
         type: "Map_layer",
         coordinates: { x: 0, y: 0 },
         name: "terrainBaseLayer",
         specials: [{
            interactive: false
         }],
         options: {
            cache: true
         },
         objectGroups: [{
            type: "Objects_terrain",
            name: "TerrainBase", // I guess only for debugging?
            typeImageData: "terrainBase",
            objects: [{
               objType: 5,
               name: "swamp",
               _id: "53837d49976fed3b240006b8",
               coord: {
                  x: "0",
                  y: "240"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 5,
               name: "swamp",
               _id: "53837d49976fed3b240006bd",
               coord: {
                  x: "0",
                  y: "480"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 3,
               name: "tundra",
               _id: "53837d49976fed3b240006c2",
               coord: {
                  x: "0",
                  y: "720"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006c7",
               coord: {
                  x: "0",
                  y: "960"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006cc",
               coord: {
                  x: "0",
                  y: "1200"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 3,
               name: "tundra",
               _id: "53837d49976fed3b240006d1",
               coord: {
                  x: "0",
                  y: "1440"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006d6",
               coord: {
                  x: "48",
                  y: "72"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006b4",
               coord: {
                  x: "0",
                  y: "48"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 5,
               name: "swamp",
               _id: "53837d49976fed3b240006b9",
               coord: {
                  x: "0",
                  y: "288"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 3,
               name: "tundra",
               _id: "53837d49976fed3b240006be",
               coord: {
                  x: "0",
                  y: "528"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006c3",
               coord: {
                  x: "0",
                  y: "768"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 3,
               name: "tundra",
               _id: "53837d49976fed3b240006c8",
               coord: {
                  x: "0",
                  y: "1008"
               },
               data: {},
               lastSeenTurn: "1"
            }, {
               objType: 2,
               name: "forest",
               _id: "53837d49976fed3b240006cd",
               coord: {
                  x: "0",
                  y: "1248"
               },
               data: {}
            }]
         }]
      }, {
         type: "Map_layer",
         coord: { x: "0", y: "0" },
         name: "unitLayer",
         options: {
            cache: "false"
         },
         objectGroups: [{
            type: "Objects_unit",
            name: "Unit", // I guess only for debugging?
            typeImageData: {
               images: ["/assets/img/map/collection.png"],
               frames: [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
               imageSize: [96, 48]
            },
            objects: [{
               objType: 3,
               name: "Infantry 1",
               coord: { x: "60", y: "60" },
               data: {
                  someCustomData: "true"
               },
               lastSeenTurn: "1"
            }]
         }]
      }]
   }]
};
exports.mapData = mapData;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = {
  graphicData: {
    general: {
      terrain: {
        tileWidth: 96,
        tileHeight: 48
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
      frames: [[1, 1, 96, 72], [98, 1, 96, 72], [195, 1, 96, 72], [292, 1, 96, 72], [389, 1, 96, 72], [485, 1, 96, 72], [582, 1, 96, 72], [679, 1, 96, 72], [776, 1, 96, 72], [873, 1, 96, 72], [1, 74, 96, 72], [98, 74, 96, 72], [195, 74, 96, 72], [292, 74, 96, 72], [389, 74, 96, 72], [485, 74, 96, 72], [582, 74, 96, 72], [679, 74, 96, 72], [776, 74, 96, 72], [873, 74, 96, 72]]
    }, building: {
      images: ["img/map/isophex/terrain1.png"],
      frames: [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]]
    }, modifier: {
      images: ["img/map/isophex/terrain1.png"],
      frames: [[1, 1, 64, 32], [66, 1, 64, 32], [132, 1, 64, 32], [198, 1, 64, 32], [264, 1, 64, 32], [1, 34, 64, 32], [1, 67, 64, 32], [1, 100, 64, 32], [1, 133, 64, 32], [1, 166, 64, 32]]
    },
    unit: {
      images: ["img/map/amplio2/units.png"],
      frames: { width: 66, height: 50 }
    }
  },
  objectData: {
    unit: [{
      name: "tank",
      desc: "Vrooom...",
      image: "0",
      att: "Good",
      def: "Poor",
      siege: "Decent",
      initiate: "90",
      move: "100",
      morale: "Average",
      vision: "150",
      influenceArea: "30"
    }, {
      name: "carrier", desc: "angry beehive", image: "6", att: "1", def: "2", siege: "2", initiate: "110", move: "100", morale: "Average", vision: "250", influenceArea: "30",
      modifiers: {
        unit: {
          _enemy_: [{
            from: "thisOnePlace",
            modifiers: {
              morale: "suffers morale drop"
            } }] } } }, {
      name: "cavalry", desc: "Give me an apple!", image: "26", att: "3", def: "1", siege: "0", initiate: "50", move: "300", morale: "Average", vision: "100", influenceArea: "30"
    }],
    terrainBase: [{
      image: "0", attachedToTerrains: ["0"], propability: "100%"
    }, {
      image: "1", attachedToTerrains: ["2"], propability: "100%"
    }, {
      image: "2", attachedToTerrains: ["1"], propability: "100%"
    }, {
      image: "3", attachedToTerrains: ["4"], propability: "100%"
    }, {
      image: "4", attachedToTerrains: ["5"], propability: "100%"
    }, {
      image: "5", attachedToTerrains: ["3"], propability: "100%"
    }],
    terrain: [{
      name: "desert", image: "0", desc: "very dry land",
      modifiers: {
        City: {
          _player_: [{
            from: "thisOnePlace",
            modifiers: {
              production: "Provides +1 food for cities"
            } }] } } }, {
      name: "plain", image: "1", desc: "Buffalo roaming area",
      modifiers: {
        City: {
          _player_: [{
            from: "thisOnePlace", modifiers: {
              production: "Provides +12% food for cities"
            } }] } } }, {
      name: "forest", image: "2", desc: "Robin hood likes it here",
      modifiers: {
        Unit: {
          _player_: [{
            from: "thisOnePlace", modifiers: { defend: "Unit defend +2" } }] } } }, { name: "tundra", desc: "Siberia teaches you", image: "6" }, { name: "arctic", desc: "Your ball will freeze of", image: "7" }, { name: "swamp", desc: "Cranberries and cloudberries", image: "8" }], dither: [{ image: "0", attachedToTerrains: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], propability: "100%" }], prettifier: [{ image: "0", zIndex: "1", attachedToTerrains: ["3"], propability: "25%" }, { image: "1", zIndex: "1", attachedToTerrains: ["1"], propability: "40%" }, { image: "2", zIndex: "0", attachedToTerrains: ["2"], propability: "60%" }], resource: [{ name: "Oasis", image: "0", desc: "Oasis in the middle of desert, or not atm.", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "food production 5 / week" } }] } }, attachedToTerrains: ["0"], influenceArea: 50 }, { name: "Oil", image: "1", desc: "Black gold", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "There is a lot of oil here" } }] } }, attachedToTerrains: ["0", "4"], influenceArea: 50 }], city: [{ name: "Medieval", vision: "100", image: "0", influenceArea: 50 }, { name: "Medieval2", vision: "100", image: "1", influenceArea: 50 }], place: [], building: [{ name: "Barracks", image: "0", tooltip: "Enables troop recruitment" }, { name: "Factory", image: "1", tooltip: "Produces weaponry" }], government: [{ name: "Democrazy", description: "well it's a democrazy :)", tooltip: "Gives +20% happiness", image: "0", requirements: [], possibleNatValues: [0, 1], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { happiness: "20%" } }] } } } }, { name: "Communism", description: "You know the one used in the great USSR and inside the great firewall of China", tooltip: "Gives production bonuses", image: "0", requirements: [], possibleNatValues: [2, 3], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: {} }] } }, City: { building: { _player_: [{ from: "thisOnePlace", modifiers: { production: "20%" } }] } } } }], politics: { taxRate: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], corruption: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], alignment: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], happiness: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], revoltRisk: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], unity: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], natValue: [{ name: "Integrity", tooltip: "Government and populations shows integrity and trustworthiness", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { internalRelations: "+10%", diplomacy: "+10%", "revolt risk": "-5%", relationsToElite: "-20%" } }] } } } }, { name: "Capitalism", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { diplomacy: "+5%", relationsToElite: "+5%", morale: "+5%" } }] } } } }, { name: "Hardworking", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+10%", happiness: "+5%", relationsToElite: "+5%" } }] } } } }, { name: "Leadership", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+5%", happiness: "-5%", relationsToElite: "+5%", trading: "+10%" } }] } } } }] } }
};
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvTWFwRmFjdG9yeS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3RzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21hcF92YWxpZGF0b3JzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW4uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdHMvT2JqZWN0c191bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7eUJBTWEsMENBQTBDOzs7O3dCQUczQyw4QkFBOEI7O3dCQUM5Qiw4QkFBOEI7O3VCQUMvQiw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThEakQsVUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFXO0FBQ2pDLFFBQUksR0FBRyxHQUFHLFdBckZMLFNBQVMsV0FHVCxRQUFRLFdBRVIsT0FBTyxZQURQLFFBQVEsQ0FpRm1DLENBQUM7O0FBRWpELE1BQUUsQ0FBQyxXQUFXLEVBQUUsWUFBVTtBQUN4QixZQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDM0IsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGlDQUFpQyxFQUFFLFlBQVU7QUFDOUMsWUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzNELFlBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDdkQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxLQUFNLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2hGLFlBQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDNUUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGlDQUFpQyxFQUFFLFlBQVU7QUFDOUMsWUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN4RSxZQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ3hELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRSxZQUFVO0FBQ2hELGVBQVM7QUFDVCxZQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDaEYsWUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ2hGLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxZQUFVO0FBQzdDLFlBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDMUUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOzs7O0NBSUosQ0FBQyxDQUFDOzs7OztBQ3RISDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQy9LZ0IsU0FBUyxHQUFULFNBQVM7Ozs7Ozs7Ozs7Ozs7bUJBdkZMLGlCQUFpQjs7eUJBQ1gsdUJBQXVCOzt5QkFDdkIsdUJBQXVCOzsrQkFDakIsZ0NBQWdDOzs0QkFDbkMsNkJBQTZCOzsrQkFDMUIsNkJBQTZCOzs0QkFFaEMsNEJBQTRCOztBQW5CekQsWUFBWSxDQUFDO0FBa0JiLElBQUksZUFBZSxHQUFHLGlCQURiLGVBQWUsRUFDZSxDQUFDOztBQUd4QyxJQUFJLGNBQWMsR0FBRztBQUNuQixXQUFTLGFBVEYsU0FBUyxBQVNQO0FBQ1QsV0FBUyxhQVRGLFNBQVMsQUFTUDtBQUNULGlCQUFlLG1CQVRSLGVBQWUsQUFTUDtBQUNmLGNBQVksZ0JBVEwsWUFBWSxBQVNQO0NBQ2IsQ0FBQTs7O0FBR0QsSUFBSSxnQkFBZ0IsR0FBRztBQUNuQixnQkFBYyxFQUFkLGNBQWM7Q0FDakIsQ0FBQzs7O0FBR0YsSUFBSSxVQUFVLEdBQUc7QUFDYixXQUFTLEVBQUUsY0FoQk4sWUFBWSxDQWdCTyxPQUFPO0NBQ2xDLENBQUM7QUErREssU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDOUQsU0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQzNELE1BQUksR0FBRyxHQUFHLFNBekZILEdBQUcsRUF5RlMsQ0FBQztBQUNwQixNQUFJLFFBQVEsR0FBRywwQ0FBMEMsQ0FBQztBQUMxRCxNQUFJLE9BQU8sR0FBRyxBQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUNyRixNQUFJLFFBQVEsR0FBRyxBQUFDLE9BQU8sV0FBVyxLQUFLLFFBQVEsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUN6RixNQUFJLFFBQVEsR0FBRyxBQUFDLE9BQU8sV0FBVyxLQUFLLFFBQVEsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUMzRixTQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFBOztBQUVqRixNQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzlFLFdBQU8sQ0FBQyxHQUFHLENBQ0wsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2FBQUksTUFBTSxVQUFPLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDLENBQzdELElBQUksQ0FBQyxnQkFBaUM7OztVQUEvQixPQUFPO1VBQUUsT0FBTztVQUFFLE9BQU87O0FBQzdCLGFBQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNyQyxDQUFDLFNBQU0sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUNaLGFBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztHQUNOOzs7QUFHRCxTQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFNBQVMsRUFBSTtBQUNuQyxRQUFJLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVuRSxPQUFHLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxDQUFDOztBQUUxQixhQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFNBQVMsRUFBSTtBQUNyQyxVQUFJLFNBQVMsWUFBQSxDQUFDOztBQUVkLFVBQUk7QUFDRixpQkFBUyxHQUFHLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdEYsaUJBQVMsQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLENBQUM7T0FDakMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGVBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO09BQ2pEOztBQUVELGVBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFFLFVBQUEsV0FBVyxFQUFJO0FBQzdDLFlBQUksV0FBVyxZQUFBO1lBQUUsV0FBVyxZQUFBLENBQUM7QUFDN0IsWUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7QUFFaEQsWUFBRyxlQUFlLEVBQUU7QUFDbEIsY0FBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFNUQscUJBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVELHFCQUFXLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMvRDs7QUFFRCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUUsVUFBQSxNQUFNLEVBQUk7QUFDckMsY0FBSSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDOztBQUUzQyxtQkFBUyxDQUFDLFFBQVEsQ0FBRSxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBRSxDQUFFLENBQUM7U0FDMUgsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFNBQU8sR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJYLFdBQVMsaUJBQWlCLEdBQUcsRUFFNUI7Q0FDRjs7O0FBR0QsU0FBUyxjQUFjLEdBQUcsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQ3JLRixhQUFhOzt5QkFDYixhQUFhOzs0QkFDVixrQkFBa0I7O0FBaEIvQyxZQUFZLENBQUM7OztBQW9CYixJQUFJLGdCQUFnQixHQUFHO0FBQ25CLGdCQUFjLEVBQWQsY0FBYztDQUNqQixDQUFDOzs7QUFHRixJQUFJLFVBQVUsR0FBRztBQUNiLFdBQVMsRUFBRSxjQVZOLFlBQVksQ0FVTyxPQUFPO0FBQy9CLGlCQUFlLEVBQUUsY0FYWixZQUFZLENBV2EsYUFBYTtBQUMzQyx3QkFBc0IsRUFBRSxjQVpuQixZQUFZLENBWW9CLG9CQUFvQjtBQUN6RCxvQkFBa0IsRUFBRSxjQWJmLFlBQVksQ0FhZ0IsZ0JBQWdCO0FBQ2pELHdCQUFzQixFQUFFLGNBZG5CLFlBQVksQ0Fjb0Isb0JBQW9CO0FBQ3pELFlBQVUsRUFBRSxjQWZQLFlBQVksQ0FlUSxRQUFRO0NBQ3BDLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFZVyxHQUFHO0FBQ0gsV0FEQSxHQUFHLENBQ0YsT0FBTyxFQUFFOzBCQURWLEdBQUc7O0FBRVosUUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxBQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFDLENBQUMsRUFBRSxDQUFDO0FBQy9FLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0dBQzNCOztlQU5VLEdBQUc7Ozs7V0FRVixjQUFDLE9BQU8sRUFBRTtBQUNaLFVBQUcsT0FBTyxFQUFFO0FBQ1YsWUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUMvQjtBQUNELFVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNmLFVBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFHZCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ2xDLFlBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUN0QixlQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZixlQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM3QjtPQUNGLENBQUMsQ0FBQztBQUNELGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNNLG1CQUFJO0FBQ1AsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3ZCOzs7V0FDTSxpQkFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDdEIsVUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLEVBQUUsQ0FBQzs7QUFFbkQsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7Ozs7OztBQUNsQiw2QkFBaUIsSUFBSSxDQUFDLE1BQU0sOEhBQUU7Y0FBdEIsS0FBSzs7QUFDWCxjQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLGNBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7O0FBRUQsY0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNwQyxtQkFBTyxLQUFLLENBQUM7V0FDZDtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBQ08sa0JBQUMsS0FBSyxFQUFFOzs7QUFDZCxVQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRWhCLFVBQUcsRUFBRyxLQUFLLFlBQVksS0FBSyxDQUFBLEFBQUMsRUFBRztBQUM5QixjQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3BCOztBQUVELGlCQUFBLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxNQUFBLFVBQUksTUFBTSxDQUFDLENBQUM7O0FBRTVCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNXLHNCQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDakMsVUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdkUsVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7O0FBRWxDLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNPLGtCQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7O0FBRW5CLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNVLHFCQUFDLEtBQUssRUFBRTtBQUNmLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNXLHNCQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDN0IsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1UscUJBQUMsS0FBSyxFQUFFO0FBQ2YsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1ksdUJBQUMsSUFBSSxFQUFFO0FBQ2xCLFVBQUksUUFBUSxZQUFBLENBQUM7Ozs7Ozs7QUFFYiw4QkFBaUIsSUFBSSxDQUFDLE1BQU0sbUlBQUU7Y0FBdEIsS0FBSzs7QUFDWCxjQUFHLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3ZDLG1CQUFPLFFBQVEsQ0FBQztXQUNqQjtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBQ08sb0JBQUc7QUFDUCxVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUNoQyxZQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUU7QUFDbkIsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlDO09BQ0osQ0FBQyxDQUFDOztBQUVILGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNVLHVCQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ3NCLG1DQUFHO0FBQ3RCLFVBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLGVBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7T0FDMUIsQ0FBQyxDQUFDOztBQUVILGFBQU8sT0FBTyxDQUFDO0tBQ2xCOzs7V0FDZSw0QkFBRztBQUNqQixZQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOzs7V0FDaUIsOEJBQUc7QUFDbkIsWUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDNUU7Ozs7Ozs7Ozs7Ozs7O1dBWWMseUJBQUMsWUFBWSxFQUFFO0FBQzVCLGtCQUFZLENBQUMsT0FBTyxDQUFDLFVBQVMsV0FBVyxFQUFFO0FBQ3pDLFlBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQU8sV0FBVyxDQUFDLElBQUksbUNBQUksV0FBVyxDQUFDLElBQUksTUFBQyxDQUFDO0FBQ2hGLFlBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUM1QyxDQUFDLENBQUM7S0FDSjs7O1dBQ0ssZ0JBQUMsTUFBTSxFQUFFO0FBQ2IsVUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3BCLGNBQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQztPQUNqSDs7QUFFRCxVQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVyRCxjQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNNLG1CQUFHO0FBQ1IsY0FBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUvRCxVQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQzs7QUFFOUIsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBdkpVLEdBQUc7OztRQUFILEdBQUcsR0FBSCxHQUFHOzs7QUEySmhCLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDM0MsTUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFN0MsU0FBTyxBQUFFLFVBQVUsS0FBSyxDQUFDLENBQUMsR0FBSyxLQUFLLEdBQUcsVUFBVSxDQUFDO0NBQ25EOztBQUVELFNBQVMsV0FBVyxHQUFHO0FBQ3JCLE1BQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ2xDLFFBQUcsS0FBSyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDN0IsV0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0o7QUFDRCxTQUFTLG9CQUFvQixHQUFHOzs7Ozs7QUFDOUIsMEJBQW1CLElBQUksQ0FBQyxNQUFNLG1JQUFHO1VBQXhCLE1BQU07O0FBQ2IsVUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQzs7QUFFcEMsU0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNyQyxTQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ25ONEIsa0JBQWtCOztBQVIvQyxZQUFZLENBQUM7OztBQVdiLElBQU0sS0FBSyxHQUFHO0FBQ1osbUJBQWlCLEVBQUUsQ0FBQztBQUNwQixpQkFBZSxFQUFFLENBQUM7QUFDbEIsdUJBQXFCLEVBQUUsQ0FBQztDQUN6QixDQUFDOzs7QUFHRixJQUFJLGdCQUFnQixHQUFHO0FBQ3JCLGdCQUFjLEVBQWQsY0FBYztBQUNkLHNCQUFvQixFQUFwQixvQkFBb0I7QUFDcEIsYUFBVyxFQUFYLFdBQVc7QUFDWCx5QkFBdUIsRUFBdkIsdUJBQXVCO0FBQ3ZCLHNCQUFvQixFQUFwQixvQkFBb0I7Q0FDckIsQ0FBQzs7O0FBR0YsSUFBSSxVQUFVLEdBQUc7QUFDZixXQUFTLEVBQUUsY0FwQkosWUFBWSxDQW9CSyxPQUFPO0FBQy9CLGFBQVcsRUFBRSxjQXJCTixZQUFZLENBcUJPLFNBQVM7QUFDbkMsaUJBQWUsRUFBRSxjQXRCVixZQUFZLENBc0JXLGFBQWE7QUFDM0Msd0JBQXNCLEVBQUUsY0F2QmpCLFlBQVksQ0F1QmtCLG9CQUFvQjtBQUN6RCxvQkFBa0IsRUFBRSxjQXhCYixZQUFZLENBd0JjLGdCQUFnQjtBQUNqRCx3QkFBc0IsRUFBRSxjQXpCakIsWUFBWSxDQXlCa0Isb0JBQW9CO0NBQzFELENBQUM7Ozs7SUFHVyxTQUFTO0FBQ1QsV0FEQSxTQUFTLENBQ1IsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUU7MEJBRDVCLFNBQVM7O0FBRWxCLCtCQUZTLFNBQVMsNkNBRVY7O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUMvRCxRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxJQUFJLEtBQUssQ0FBQztBQUMvQyxRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7OztBQUcxQixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN6QixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztHQUMzQjs7WUFmVSxTQUFTOztlQUFULFNBQVM7Ozs7V0FpQkUsZ0NBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNwQyxVQUFJLGFBQWEsR0FBRyxLQUFLLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQzs7QUFFeEQsVUFBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTs7QUFFekIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztPQUNwQyxNQUFNOztBQUVMLFlBQUksbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRiwyQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzdDOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNZLHVCQUFDLElBQUksRUFBRTtBQUNsQixVQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFDLFNBQVMsRUFBRTs7Ozs7O0FBQ2pELCtCQUFpQixJQUFJLENBQUMsUUFBUSw4SEFBRTtnQkFBeEIsS0FBSzs7QUFDWCxnQkFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsRCxxQkFBTyxLQUFLLENBQUM7YUFDZDtXQUNGOzs7Ozs7Ozs7Ozs7Ozs7T0FDRjtBQUNELGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztXQUNtQixnQ0FBRztBQUNyQixhQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDaEM7OztXQUNXLHdCQUFHLEVBQUc7OztXQUNSLHNCQUFHLEVBQUc7OztXQUNGLGlCQUFDLElBQUksRUFBRTtBQUNuQixhQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQjs7O1NBaERVLFNBQVM7R0FBUyxRQUFRLENBQUMsU0FBUzs7UUFBcEMsU0FBUyxHQUFULFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0d0QixTQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUc7QUFDeEMsU0FBUyxvQkFBb0IsR0FBRyxFQUFHO0FBQ25DLFNBQVMsV0FBVyxHQUFHLEVBQUc7QUFDMUIsU0FBUyx1QkFBdUIsR0FBRyxFQUFHO0FBQ3RDLFNBQVMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQyxNQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXpELFNBQU8sbUJBQW1CLENBQUM7Q0FDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDNUk0QixrQkFBa0I7O0FBUC9DLFlBQVksQ0FBQzs7O0FBVWIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFHLENBQUM7OztBQUczQixJQUFJLFVBQVUsR0FBRztBQUNmLFdBQVMsRUFBRSxjQVBKLFlBQVksQ0FPSyxPQUFPO0FBQy9CLGFBQVcsRUFBRSxjQVJOLFlBQVksQ0FRTyxTQUFTO0FBQ25DLGlCQUFlLEVBQUUsY0FUVixZQUFZLENBU1csYUFBYTtBQUMzQyx3QkFBc0IsRUFBRSxjQVZqQixZQUFZLENBVWtCLG9CQUFvQjtBQUN6RCxvQkFBa0IsRUFBRSxjQVhiLFlBQVksQ0FXYyxnQkFBZ0I7QUFDakQsd0JBQXNCLEVBQUUsY0FaakIsWUFBWSxDQVlrQixvQkFBb0I7Q0FDMUQsQ0FBQzs7OztJQUdXLFNBQVM7OztBQUVQLFdBRkYsU0FBUyxDQUVOLElBQUksRUFBVztzQ0FBTixJQUFJO0FBQUosVUFBSTs7OzBCQUZoQixTQUFTOztBQUdkLCtCQUhLLFNBQVMsOENBR0wsSUFBSSxFQUFFOztBQUVmLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7O0FBRzFCLFFBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzNCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDN0IsUUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O0dBRTFCOztZQWxCUSxTQUFTOztlQUFULFNBQVM7O1dBbUJILDJCQUFHO0FBQ2QsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzdCOzs7V0FDYyx5QkFBQyxNQUFNLEVBQUU7QUFDcEIsZ0JBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsVUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7O0FBRTVCLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNZLHVCQUFDLElBQUksRUFBRTs7Ozs7O0FBQ2xCLDZCQUFpQixJQUFJLENBQUMsUUFBUSw4SEFBRTtjQUF4QixLQUFLOztBQUNYLGNBQUksS0FBSyxZQUFBLENBQUM7O0FBRVYsY0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsRCxtQkFBTyxLQUFLLENBQUM7V0FDZDs7QUFFRCxjQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3BDLG1CQUFPLEtBQUssQ0FBQztXQUNkO1NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0ExQ1EsU0FBUztHQUFTLFFBQVEsQ0FBQyxLQUFLOztRQUFoQyxTQUFTLEdBQVQsU0FBUztBQTJDckIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRUYsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYUEsY0FBYztBQUNkLFdBREEsY0FBYyxDQUNiLE1BQU0sRUFBRSxJQUFJLEVBQUcsV0FBVyxFQUFFLGtCQUFrQixFQUFFOzBCQURqRCxjQUFjOztBQUV2QiwrQkFGUyxjQUFjLDZDQUVqQixXQUFXLEVBQUU7O0FBRW5CLFFBQUksQ0FBQyxJQUFJLEdBQUcseUJBQXlCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7O0FBR2hELFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN2QixRQUFJLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDOzs7QUFHMUMsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O0FBR25DLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFFBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztBQUV6QixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs7O0dBRzNCOztZQXBCVSxjQUFjOztlQUFkLGNBQWM7O1dBcUJsQixpQkFBQyxJQUFJLEVBQUU7QUFDWixVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7V0FFUSxtQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2QsVUFBSSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsZUFBZSxDQUFFLENBQUM7QUFDekMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNuQixVQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNYLFVBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O0FBSVgsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBQ1csc0JBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUU7QUFDakMsVUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7O0FBRXRDLGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7Ozs7O1dBRVcsd0JBQUc7QUFDYixhQUFPO0FBQ0wsU0FBQyxFQUFFLE1BQU0sQ0FBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFO0FBQ25DLFNBQUMsRUFBRSxNQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRTtPQUNwQyxDQUFDO0tBQ0g7OztXQUNrQiwrQkFBRztBQUNuQixhQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztLQUM5RDs7O1NBbkRVLGNBQWM7R0FBUyxRQUFRLENBQUMsTUFBTTs7UUFBdEMsY0FBYyxHQUFkLGNBQWM7Ozs7Ozs7O0FDYjNCLFlBQVksQ0FBQzs7Ozs7QUFLYixJQUFJLGdCQUFnQixHQUFHO0FBQ3JCLFFBQU0sRUFBTixNQUFNO0NBQ1AsQ0FBQzs7O0FBR0ssSUFBSSxZQUFZLEdBQUcsQ0FBQyxTQUFTLFlBQVksR0FBRztBQUNqRCxTQUFPO0FBQ0wsV0FBTyxFQUFBLGlCQUFDLEdBQUcsRUFBRTtBQUNULGFBQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDO0FBQ0QsYUFBUyxFQUFBLG1CQUFDLElBQUksRUFBRTtBQUNaLGFBQU8sSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztBQUNELGlCQUFhLEVBQUEsdUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQixVQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUc7QUFDeEQsZUFBTyxJQUFJLENBQUM7T0FDZjs7QUFFRCxhQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNELHdCQUFvQixFQUFBLGdDQUFHLEVBRXRCO0FBQ0Qsb0JBQWdCLEVBQUEsNEJBQUcsRUFFbEI7QUFDRCx3QkFBb0IsRUFBQSxnQ0FBRyxFQUV0QjtHQUNGLENBQUM7Q0FDSCxDQUFBLEVBQUcsQ0FBQzs7UUF6Qk0sWUFBWSxHQUFaLFlBQVk7O0FBNEJ2QixTQUFTLE1BQU0sQ0FBQyxVQUFVLEVBQUU7O0FBRTFCLE1BQUcsTUFBTSxDQUFDLFNBQVMsRUFBRTtBQUNuQixXQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDckM7OztBQUdELFNBQU8sT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLEFBQUMsVUFBVSxHQUFHLENBQUMsS0FBTSxDQUFDLENBQUM7Q0FDakU7Ozs7Ozs7Ozs7OztRQ3RDZSxlQUFlLEdBQWYsZUFBZTs7b0JBTmQsYUFBYTs7OztBQUY5QixZQUFZLENBQUM7O0FBSWIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBR3BCLFNBQVMsZUFBZSxHQUFJO0FBQ2pDLE1BQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFZixPQUFLLENBQUMsY0FBYyxHQUFHLFVBQVUsZUFBZSxFQUFFO0FBQ2hELFFBQUksV0FBVyxZQUFBLENBQUM7O0FBRWhCLFFBQUcsS0FBSyxDQUFDLHdCQUF3QixDQUFFLFNBQVMsQ0FBRSxlQUFlLENBQUUsQ0FBRSxFQUFHO0FBQ2xFLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7O0FBRUQsZUFBVyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEQsbUJBQWUsQ0FBQyxJQUFJLENBQUUsV0FBVyxDQUFFLENBQUM7O0FBRXBDLFdBQU8sV0FBVyxDQUFDO0dBQ3BCLENBQUM7QUFDRixPQUFLLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxXQUFXLEVBQUUsRUFFaEQsQ0FBQztBQUNGLE9BQUssQ0FBQyxrQkFBa0IsR0FBRyxZQUFZO0FBQ3JDLFdBQU8sZUFBZSxDQUFDO0dBQ3hCLENBQUM7QUFDRixPQUFLLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxhQUFhLEVBQUU7QUFDeEQsV0FBUyxpQkFBaUIsQ0FBQyxPQUFPLENBQUUsYUFBYSxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUc7R0FDNUQsQ0FBQztBQUNGLFdBQVMsU0FBUyxDQUFFLGVBQWUsRUFBRTtBQUNuQyxXQUFTLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUc7R0FDOUMsQ0FBQzs7QUFFRixTQUFPLEtBQUssQ0FBQztDQUNkOzs7Ozs7Ozs7Ozs7Ozs7OzsrQkNwQzhCLGlCQUFpQjs7QUFGaEQsWUFBWSxDQUFDOztJQUlBLGVBQWU7V0FBZixlQUFlOzBCQUFmLGVBQWU7Ozs7Ozs7WUFBZixlQUFlOztlQUFmLGVBQWU7O1dBQ2pCLG1CQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTtBQUNwRCxpQ0FGUyxlQUFlLDZDQUVOLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTs7QUFFOUQsVUFBSSxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztLQUNwQzs7O1NBTFUsZUFBZTtvQkFGbkIsY0FBYzs7UUFFVixlQUFlLEdBQWYsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JDRkcsaUJBQWlCOztBQUZoRCxZQUFZLENBQUM7O0lBSUEsWUFBWTtXQUFaLFlBQVk7MEJBQVosWUFBWTs7Ozs7OztZQUFaLFlBQVk7O2VBQVosWUFBWTs7V0FDZCxtQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7QUFDcEQsaUNBRlMsWUFBWSw2Q0FFSCxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7O0FBRTlELFVBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7S0FDbEM7OztTQUxVLFlBQVk7b0JBRmhCLGNBQWM7O1FBRVYsWUFBWSxHQUFaLFlBQVk7Ozs7Ozs7O0FDSmxCLElBQUksUUFBUSxHQUFHO0FBQ3BCLElBQUUsRUFBRSwwQkFBMEI7QUFDOUIsTUFBSSxFQUFFLENBQUM7QUFDUCxTQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7QUFDM0IsbUJBQWlCLEVBQUU7QUFDakIsT0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0dBQ2xCO0NBQ0YsQ0FBQztRQVBTLFFBQVEsR0FBUixRQUFROzs7Ozs7OztBQ0FaLElBQUksT0FBTyxHQUFHO0FBQ25CLFNBQU0sRUFBRSwwQkFBMEI7QUFDbEMsT0FBSSxFQUFFLENBQUM7QUFDUCxTQUFNLEVBQUUsQ0FBQztBQUNQLFVBQUksRUFBRSxXQUFXO0FBQ2pCLGlCQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsVUFBSSxFQUFFLGNBQWM7QUFDcEIsYUFBTyxFQUFFLGdCQUFnQjtBQUN6QixZQUFNLEVBQUUsQ0FBQztBQUNQLGFBQUksRUFBRSxXQUFXO0FBQ2pCLG9CQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsYUFBSSxFQUFFLGtCQUFrQjtBQUN4QixpQkFBUSxFQUFFLENBQUM7QUFDVCx5QkFBZSxLQUFLO1VBQ3JCLENBQUM7QUFDRixnQkFBTyxFQUFFO0FBQ1AsaUJBQUssRUFBRSxJQUFJO1VBQ1o7QUFDRCxxQkFBWSxFQUFFLENBQUM7QUFDYixnQkFBSSxFQUFFLGlCQUFpQjtBQUN2QixnQkFBSSxFQUFFLGFBQWE7QUFDbkIseUJBQWEsRUFBRSxhQUFhO0FBQzVCLG1CQUFPLEVBQUUsQ0FBQztBQUNQLHdCQUFVLENBQUM7QUFDWCxxQkFBTyxPQUFPO0FBQ2Qsb0JBQU0sMEJBQTBCO0FBQ2hDLHNCQUFRO0FBQ0wscUJBQUksR0FBRztBQUNQLHFCQUFJLEtBQUs7Z0JBQ1g7QUFDRCxxQkFBUSxFQUFFO0FBQ1YsNkJBQWUsR0FBRzthQUNwQixFQUFDO0FBQ0Msd0JBQVUsQ0FBQztBQUNYLHFCQUFPLE9BQU87QUFDZCxvQkFBTSwwQkFBMEI7QUFDaEMsc0JBQVE7QUFDTCxxQkFBSSxHQUFHO0FBQ1AscUJBQUksS0FBSztnQkFDWDtBQUNELHFCQUFRLEVBQUU7QUFDViw2QkFBZSxHQUFHO2FBQ3BCLEVBQ0Q7QUFDRyx3QkFBVSxDQUFDO0FBQ1gscUJBQU8sUUFBUTtBQUNmLG9CQUFNLDBCQUEwQjtBQUNoQyxzQkFBUTtBQUNMLHFCQUFJLEdBQUc7QUFDUCxxQkFBSSxLQUFLO2dCQUNYO0FBQ0QscUJBQVEsRUFBRTtBQUNWLDZCQUFlLEdBQUc7YUFDcEIsRUFDRDtBQUNHLHdCQUFVLENBQUM7QUFDWCxxQkFBTyxRQUFRO0FBQ2Ysb0JBQU0sMEJBQTBCO0FBQ2hDLHNCQUFRO0FBQ0wscUJBQUksR0FBRztBQUNQLHFCQUFJLEtBQUs7Z0JBQ1g7QUFDRCxxQkFBUSxFQUFFO0FBQ1YsNkJBQWUsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVUsQ0FBQztBQUNYLHFCQUFPLFFBQVE7QUFDZixvQkFBTSwwQkFBMEI7QUFDaEMsc0JBQVE7QUFDTCxxQkFBSSxHQUFHO0FBQ1AscUJBQUksTUFBTTtnQkFDWjtBQUNELHFCQUFRLEVBQUU7QUFDViw2QkFBZSxHQUFHO2FBQ3BCLEVBQ0Q7QUFDRyx3QkFBVSxDQUFDO0FBQ1gscUJBQU8sUUFBUTtBQUNmLG9CQUFNLDBCQUEwQjtBQUNoQyxzQkFBUTtBQUNMLHFCQUFJLEdBQUc7QUFDUCxxQkFBSSxNQUFNO2dCQUNaO0FBQ0QscUJBQVEsRUFBRTtBQUNWLDZCQUFlLEdBQUc7YUFDcEIsRUFDRDtBQUNHLHdCQUFVLENBQUM7QUFDWCxxQkFBTyxRQUFRO0FBQ2Ysb0JBQU0sMEJBQTBCO0FBQ2hDLHNCQUFRO0FBQ0wscUJBQUksSUFBSTtBQUNSLHFCQUFJLElBQUk7Z0JBQ1Y7QUFDRCxxQkFBUSxFQUFFO0FBQ1YsNkJBQWUsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVUsQ0FBQztBQUNYLHFCQUFPLFFBQVE7QUFDZixvQkFBTSwwQkFBMEI7QUFDaEMsc0JBQVE7QUFDTCxxQkFBSSxHQUFHO0FBQ1AscUJBQUksSUFBSTtnQkFDVjtBQUNELHFCQUFRLEVBQUU7QUFDViw2QkFBZSxHQUFHO2FBQ3BCLEVBQ0Q7QUFDRyx3QkFBVSxDQUFDO0FBQ1gscUJBQU8sT0FBTztBQUNkLG9CQUFNLDBCQUEwQjtBQUNoQyxzQkFBUTtBQUNMLHFCQUFJLEdBQUc7QUFDUCxxQkFBSSxLQUFLO2dCQUNYO0FBQ0QscUJBQVEsRUFBRTtBQUNWLDZCQUFlLEdBQUc7YUFDcEIsRUFDRDtBQUNHLHdCQUFVLENBQUM7QUFDWCxxQkFBTyxRQUFRO0FBQ2Ysb0JBQU0sMEJBQTBCO0FBQ2hDLHNCQUFRO0FBQ0wscUJBQUksR0FBRztBQUNQLHFCQUFJLEtBQUs7Z0JBQ1g7QUFDRCxxQkFBUSxFQUFFO0FBQ1YsNkJBQWUsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVUsQ0FBQztBQUNYLHFCQUFPLFFBQVE7QUFDZixvQkFBTSwwQkFBMEI7QUFDaEMsc0JBQVE7QUFDTCxxQkFBSSxHQUFHO0FBQ1AscUJBQUksS0FBSztnQkFDWDtBQUNELHFCQUFRLEVBQUU7QUFDViw2QkFBZSxHQUFHO2FBQ3BCLEVBQ0Q7QUFDRyx3QkFBVSxDQUFDO0FBQ1gscUJBQU8sUUFBUTtBQUNmLG9CQUFNLDBCQUEwQjtBQUNoQyxzQkFBUTtBQUNMLHFCQUFJLEdBQUc7QUFDUCxxQkFBSSxNQUFNO2dCQUNaO0FBQ0QscUJBQVEsRUFBRTtBQUNWLDZCQUFlLEdBQUc7YUFDcEIsRUFDRDtBQUNHLHdCQUFVLENBQUM7QUFDWCxxQkFBTyxRQUFRO0FBQ2Ysb0JBQU0sMEJBQTBCO0FBQ2hDLHNCQUFRO0FBQ0wscUJBQUksR0FBRztBQUNQLHFCQUFJLE1BQU07Z0JBQ1o7QUFDRCxxQkFBUSxFQUFFO2FBQ1osQ0FBQztVQUNILENBQUM7T0FDSCxFQUFDO0FBQ0EsZUFBUSxXQUFXO0FBQ25CLGdCQUFTLEVBQUUsR0FBSyxHQUFHLEVBQUUsR0FBSyxHQUFHLEVBQUU7QUFDL0IsZUFBUSxXQUFXO0FBQ25CLGtCQUFXO0FBQ1QsbUJBQVMsT0FBTztVQUNqQjtBQUNELHVCQUFnQixDQUFDO0FBQ2Ysa0JBQVEsY0FBYztBQUN0QixrQkFBUSxNQUFNO0FBQ2QsMkJBQWlCO0FBQ2YsdUJBQVUsQ0FDUixnQ0FBZ0MsQ0FDakM7QUFDRCx1QkFBVSxDQUNSLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQ1gsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFDWixDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQ2IsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFDYixDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUNkO0FBQ0QsMEJBQVksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO2FBQ3BCO0FBQ0QscUJBQVcsQ0FBQztBQUNWLHdCQUFVLENBQUM7QUFDWCxxQkFBUSxZQUFZO0FBQ3BCLHNCQUFTLEVBQUUsR0FBSyxJQUFJLEVBQUUsR0FBSyxJQUFJLEVBQUU7QUFDakMscUJBQVE7QUFDTixrQ0FBa0IsTUFBTTtnQkFDekI7QUFDRCw2QkFBZSxHQUFHO2FBQ25CLENBQUM7VUFDSCxDQUFDO09BQ0gsQ0FBQztJQUNILENBQUM7Q0FDSCxDQUFDO1FBeE1TLE9BQU8sR0FBUCxPQUFPOzs7Ozs7OztBQ0FYLElBQUksUUFBUSxHQUFHO0FBQ3BCLGVBQWU7QUFDYixhQUFVO0FBQ1IsZUFBVTtBQUNSLG1CQUFZLEVBQUU7QUFDZCxvQkFBYSxFQUFFO09BQ2hCO0tBQ0Y7QUFDRCxpQkFBYztBQUNaLGNBQ0EsQ0FBQywrQkFBK0IsQ0FBQztBQUNqQyxjQUFTLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ2hGO0FBQ0QsaUJBQVksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0QsYUFBVTtBQUNSLGNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQztBQUNoRCxjQUFTLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzFIO0FBQ0QsaUJBQVksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0QsWUFBUyxFQUFDLFFBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsV0FBWSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQztBQUN0RixnQkFBYTtBQUNYLGNBQVMsQ0FBQyxzQ0FBc0MsRUFBQywyQkFBMkIsRUFBQyw4QkFBOEIsQ0FBQztBQUM1RyxjQUFTLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQ3REO0tBQ0Y7QUFDRCxjQUFXO0FBQ1QsY0FBUyxDQUFDLHVDQUF1QyxDQUFDO0FBQ2xELGNBQVMsQ0FDUCxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVCO0tBQ0Y7QUFDRCxXQUFRLEVBQUU7QUFDVixVQUFPO0FBQ0wsY0FBUyxDQUFDLDJDQUEyQyxDQUFDO0FBQ3RELGNBQVMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVSO0tBQ0YsRUFBQyxVQUFXO0FBQ1gsY0FBUyxDQUFDLDhCQUE4QixDQUFDO0FBQ3pDLGNBQVMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxD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QyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQWEsQ0FBQyxFQUFDLEtBQU0sR0FBRyxFQUFDLEtBQU0sSUFBSSxFQUFDLFdBQVksRUFBQyxNQUFPLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFFBQVMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBTSxJQUFJLEVBQUMsS0FBTSxLQUFLLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxXQUFZLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLE9BQVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFZLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBWSxDQUFDLEVBQUMsS0FBTSxHQUFHLEVBQUMsS0FBTSxJQUFJLEVBQUMsV0FBWSxFQUFDLE1BQU8sRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsUUFBUyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFNLElBQUksRUFBQyxLQUFNLEtBQUssRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFdBQVksRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQWEsQ0FBQyxFQUFDLEtBQU0sR0FBRyxFQUFDLEtBQU0sSUFBSSxFQUFDLFdBQVksRUFBQyxNQUFPLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFFBQVMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBTSxJQUFJLEVBQUMsS0FBTSxLQUFLLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxXQUFZLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLE9BQVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxPQUFRLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxXQUFXLEVBQUMsU0FBVSxnRUFBZ0UsRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFVBQVcsRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsbUJBQW9CLE1BQU0sRUFBQyxXQUFZLE1BQU0sRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLGtCQUFtQixNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU8sWUFBWSxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsVUFBVyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxXQUFZLEtBQUssRUFBQyxrQkFBbUIsS0FBSyxFQUFDLFFBQVMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFPLGFBQWEsRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFVBQVcsRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsY0FBZSxNQUFNLEVBQUMsV0FBWSxLQUFLLEVBQUMsa0JBQW1CLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTyxZQUFZLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxVQUFXLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLGNBQWUsS0FBSyxFQUFDLFdBQVksS0FBSyxFQUFDLGtCQUFtQixLQUFLLEVBQUMsU0FBVSxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDOXpJLENBQUM7UUFwSFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL01hcEZhY3RvcnkuanMnO1xuXG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhLmpzJztcblxuLypcbjEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbllvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuaXMgYW5vdGhlciBjbGFzcyAvIG1vZHVsZSB0aGF0IGhhbmRsZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCB5b3UgZGVmaW5lIGEgZ29vZCBzZXQgb2YgcHJpbmNpcGxlIGhvdyBpdCdzIGRvbmUuIERhdGEgaW4gdGhpczpcblwie1xuICBcIm9ialR5cGVcIjoyLFxuICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxufVwiXG5XaGF0IGRvIHdlIGRvIHdpdGggdGhlIF9pZCBhbmQgc2hvdWxkIHRoYXQgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgZGF0YSwgd2hlbiB3ZSBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0cy5cblxuQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbi8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbmRlc2NyaWJlKFwiYmFzaWMgbWFwIC0gd2l0aG91dCBwbHVnaW5zXCIsIGZ1bmN0aW9uKCkge1xuICAvKmxldCBtYXBEYXRhID0ge1xuICAgIG1hcFNpemU6IHsgeDogMTAwLCB5OiAxMDAgfSxcbiAgICBwbHVnaW5zVG9BY3RpdmF0ZTogZmFsc2UsXG4gICAgc3RhZ2VzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfc3RhZ2VcIixcbiAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgICBsYXllcnM6IFt7XG4gICAgICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgICAgICBjb29yZGluYXRlczogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgICAgIHR5cGU6IFwiT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNDAsIHk6IDQwIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAxLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNDAsIHk6IDQwIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAyLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XVxuICAgICAgICB9LHtcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInVuaXRMYXllclwiLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3VuaXRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgICAgIHR5cGVJbWFnZURhdGE6IFwidW5pdFwiLFxuICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgbmFtZTogXCJJbmZhbnRyeSAxXCIsXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDYwLCB5OiA2MCB9LFxuICAgICAgICAgICAgICBpbWFnZURhdGE6IDMsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzb21lQ3VzdG9tRGF0YTogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICB9XVxuICAgIH1dXG4gIH07XG4gICovXG5cblxuICBkZXNjcmliZShcIj0+IG1ha2UgbWFwXCIsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBtYXAgPSBjcmVhdGVNYXAoZ2FtZURhdGEsIG1hcERhdGEsIHR5cGVEYXRhKTtcblxuICAgIGl0KFwiPT4gZXhpc3RzXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gc3RhZ2UgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0ubmFtZSA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpLm5hbWUgID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiBsYXllciBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRMYXllck5hbWVkKFwidW5pdExheWVyXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB0ZXJyYWluIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlblswXS54ID09PSA0MCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlbi5sZW5ndGggPiAxKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ID09PSA2MCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1IDEuMC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqIFxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4vKmdsb2JhbCB1bmVzY2FwZSwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSkge1xuICAgICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpLFxuICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KSB7XG4gICAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sX21kNSh4LCBsZW4pIHtcbiAgICAgICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgICAgICAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAobGVuICUgMzIpO1xuICAgICAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XG5cbiAgICAgICAgdmFyIGksIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQsXG4gICAgICAgICAgICBhID0gIDE3MzI1ODQxOTMsXG4gICAgICAgICAgICBiID0gLTI3MTczMzg3OSxcbiAgICAgICAgICAgIGMgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICAgIGQgPSAgMjcxNzMzODc4O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgb2xkYSA9IGE7XG4gICAgICAgICAgICBvbGRiID0gYjtcbiAgICAgICAgICAgIG9sZGMgPSBjO1xuICAgICAgICAgICAgb2xkZCA9IGQ7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNywgLTY4MDg3NjkzNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE3LCAgNjA2MTA1ODE5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA3LCAtMTc2NDE4ODk3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDcsICAxNzcwMDM1NDE2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDcsICAxODA0NjAzNjgyKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNSwgLTE2NTc5NjUxMCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICA2XSwgIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgIDY0MzcxNzcxMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaV0sICAgICAgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCAgOSwgIDM4MDE2MDgzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA1LCAgNTY4NDQ2NDM4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICAyXSwgIDksIC01MTQwMzc4NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTQsICAxNzM1MzI4NDczKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDQsIC0zNzg1NTgpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDQsICA2ODEyNzkxNzQpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2ldLCAgICAgIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDQsIC02NDAzNjQ0ODcpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICAyXSwgMjMsIC05OTUzMzg2NTEpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA2LCAgMTg3MzMxMzM1OSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG5cbiAgICAgICAgICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICAgICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICAgICAgICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICAgICAgICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2EsIGIsIGMsIGRdO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmwycnN0cihpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogMzI7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDg7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhGRikgPDwgKGkgJSAzMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX21kNShzKSB7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUocnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX2htYWNfbWQ1KGtleSwgZGF0YSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGJrZXkgPSByc3RyMmJpbmwoa2V5KSxcbiAgICAgICAgICAgIGlwYWQgPSBbXSxcbiAgICAgICAgICAgIG9wYWQgPSBbXSxcbiAgICAgICAgICAgIGhhc2g7XG4gICAgICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgICBia2V5ID0gYmlubF9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgICAgICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaCA9IGJpbmxfbWQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgICAgIHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxuICAgICAgICAgICAgb3V0cHV0ID0gJycsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXG4gICAgICAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxuICAgICovXG4gICAgZnVuY3Rpb24gc3RyMnJzdHJfdXRmOChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xuICAgICovXG4gICAgZnVuY3Rpb24gcmF3X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyX21kNShzdHIycnN0cl91dGY4KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfbWQ1KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmF3X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfaG1hY19tZDUoc3RyMnJzdHJfdXRmOChrKSwgc3RyMnJzdHJfdXRmOChkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfaG1hY19tZDUoaywgZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoZXhfbWQ1KHN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmF3X21kNShzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWQ1O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkLm1kNSA9IG1kNTtcbiAgICB9XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09IDNyZCBwYXJ0eSBsaWJyYXJ5IGltcG9ydHMgPT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcCB9IGZyb20gJy4uL21hcC9jb3JlL01hcCc7XG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuLi9tYXAvY29yZS9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwX2xheWVyJztcbmltcG9ydCB7IE9iamVjdHNfdGVycmFpbiB9IGZyb20gJy4uL21hcC9vYmplY3RzL09iamVjdHNfdGVycmFpbic7XG5pbXBvcnQgeyBPYmplY3RzX3VuaXQgfSBmcm9tICcuLi9tYXAvb2JqZWN0cy9PYmplY3RzX3VuaXQnO1xuaW1wb3J0IHsgc3ByaXRlc2hlZXRMaXN0IH0gZnJvbSAnLi4vbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0JztcbmxldCBhbGxTcHJpdGVzaGVldHMgPSBzcHJpdGVzaGVldExpc3QoKTtcbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuLi9tYXAvY29yZS9tYXBfdmFsaWRhdG9yc1wiO1xuXG5sZXQgZnVuY3Rpb25zSW5PYmogPSB7XG4gIE1hcF9zdGFnZSxcbiAgTWFwX2xheWVyLFxuICBPYmplY3RzX3RlcnJhaW4sXG4gIE9iamVjdHNfdW5pdFxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICAgIF9nZXRTdGFnZUluZGV4XG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4XG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG4vKlxuQGFyZ3VtZW50IHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbkNvb3JkaW5hdGVzIGFyZSBhbHdheXMgZGVmYXVsdGVkIHRvIDAsMCBpZiBub25lIGFyZSBnaXZlbi5cbntcbiAgbWFwU2l6ZTogY3JlYXRlanMuUmVjdGFuZ2xlLFxuICBwbHVnaW5zVG9BY3RpdmF0ZTogW1xuICAgIFwibWFwL21vdmUvbWFwX21vdmVcIixcbiAgICBcIm1hcC9GT1cvbWFwX0ZPV1wiXG4gIF0sXG4gIHN0YWdlczogW3tcbiAgICB0eXBlOiBcIm1hcC9jb3JlL01hcF9TdGFnZVwiLFxuICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICBsYXllcnM6IFt7XG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dLFxuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV0sXG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c191bml0XCIsXG4gICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIGJhc2VQYXRoID0gXCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvXCI7XG4gIGxldCBtYXBEYXRhID0gKHR5cGVvZiBtYXBEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UobWFwRGF0YUFyZykgOiBtYXBEYXRhQXJnO1xuICBsZXQgdHlwZURhdGEgPSAodHlwZW9mIHR5cGVEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UodHlwZURhdGFBcmcpIDogdHlwZURhdGFBcmc7XG4gIGxldCBnYW1lRGF0YSA9ICh0eXBlb2YgZ2FtZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShnYW1lRGF0YUFyZykgOiBnYW1lRGF0YUFyZztcbmNvbnNvbGUubG9nKFwiZ2FtZURhdGFcIiwgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUsIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcClcbiAgLyogQWN0aXZhdGUgcGx1Z2lucyAqL1xuICBpZihnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAgJiYgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLmxlbmd0aCA+IDApIHtcbiAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICBnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAubWFwKHggPT4gU3lzdGVtLmltcG9ydCh4KSkpXG4gICAgICAudGhlbigoW21vZHVsZTEsIG1vZHVsZTIsIG1vZHVsZTNdKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcGx1Z2lucyBsb2FkZWRcIik7XG4gICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS5zdGFjayk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZ2l2ZW4gbWFwIGRhdGEgYW5kIGNyZWF0ZSBvYmplY3RzIGFjY29yZGluZ2x5ICovXG4gIG1hcERhdGEuc3RhZ2VzLmZvckVhY2goIHN0YWdlRGF0YSA9PiB7XG4gICAgbGV0IHRoaXNTdGFnZSA9IG5ldyBmdW5jdGlvbnNJbk9ialtzdGFnZURhdGEudHlwZV0oc3RhZ2VEYXRhLm5hbWUpO1xuXG4gICAgbWFwLmFkZFN0YWdlKCB0aGlzU3RhZ2UgKTtcblxuICAgIHN0YWdlRGF0YS5sYXllcnMuZm9yRWFjaCggbGF5ZXJEYXRhID0+IHtcbiAgICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXNMYXllciA9IG5ldyBmdW5jdGlvbnNJbk9ialtsYXllckRhdGEudHlwZV0obGF5ZXJEYXRhLm5hbWUsIGxheWVyRGF0YS50eXBlLCBmYWxzZSk7XG4gICAgICAgIHRoaXNTdGFnZS5hZGRDaGlsZCggdGhpc0xheWVyICk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtOlwiLCBsYXllckRhdGEudHlwZSwgZS5zdGFjaylcbiAgICAgIH1cblxuICAgICAgbGF5ZXJEYXRhLm9iamVjdEdyb3Vwcy5mb3JFYWNoKCBvYmplY3RHcm91cCA9PiB7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldCwgb2JqVHlwZURhdGE7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldFR5cGUgPSBvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhO1xuXG4gICAgICAgIGlmKHNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICAgIGxldCBzcHJpdGVzaGVldERhdGEgPSB0eXBlRGF0YS5ncmFwaGljRGF0YVtzcHJpdGVzaGVldFR5cGVdO1xuXG4gICAgICAgICAgb2JqVHlwZURhdGEgPSB0eXBlRGF0YS5vYmplY3REYXRhW3Nwcml0ZXNoZWV0VHlwZV1bb2JqVHlwZV07XG4gICAgICAgICAgc3ByaXRlc2hlZXQgPSBhbGxTcHJpdGVzaGVldHMuYWRkU3ByaXRlc2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdEdyb3VwLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0ID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudEZyYW1lTnVtYmVyID0gb2JqVHlwZURhdGEuaW1hZ2U7XG5cbiAgICAgICAgICB0aGlzTGF5ZXIuYWRkQ2hpbGQoIG5ldyBmdW5jdGlvbnNJbk9ialtvYmplY3RHcm91cC50eXBlXSggb2JqZWN0LmNvb3JkLCBvYmplY3QuZGF0YSwgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciApICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBtYXA7XG5cbi8qXG4gIENyZWF0ZVRlcnJhaW5TdGFnZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfYmFzZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfdGVycmFpblxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfZGl0aGVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9wcmV0dGlmaWVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9yZXNvdXJjZVxuICBDcmVhdGVVbml0U3RhZ2VcbiAgICBfQ3JlYXRlVW5pdExheWVyX1VuaXRcbiAgICBfQ3JlYXRlVW5pdExheWVyX0NpdHlcbiAgQ3JlYXRlRk9XU3RhZ2VcbiAgQ3JlYXRlRGF0YVN0YWdlXG4gIENyZWF0ZVVJU3RhZ2VcbiAgICBfQ3JlYXRlVUlMYXllcl9hcnJvd1xuICAgIF9DcmVhdGVVSUxheWVyX3NlbGVjdGlvblxuKi9cblxuICBmdW5jdGlvbiBfY2FsY3VsYXRlTWFwU2l6ZSgpIHtcblxuICB9XG59XG5cbi8qID09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoKSB7fSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIFN5c3RlbSA9IHJlcXVpcmUoJ2VzNi1tb2R1bGUtbG9hZGVyJykuU3lzdGVtO1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdlczYtbW9kdWxlLWxvYWRlcic7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL01hcF9sYXllcic7XG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gICAgX2dldFN0YWdlSW5kZXhcbn07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICAgIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gICAgX2lzX2Nvb3JkaW5hdGVzOiB2YWxpZGF0b3JNb2QuaXNDb29yZGluYXRlcyxcbiAgICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gICAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgICBfaXNfVXNlT2ZTdWJDb250YWluZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkNvbnRhaW5lcnMsXG4gICAgX2lzX2NhbnZhczogdmFsaWRhdG9yTW9kLmlzQ2FudmFzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIHtcbiAqICBtYXBTaXplOiB7XG4gKiAgICB4OiBOdW1iZXIsXG4gKiAgICB5OiBOdW1iZXJcbiAqIH1cbiovXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc3RhZ2VzID0gW107XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gICAgdGhpcy5tYXBTaXplID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBTaXplKSB8fCB7IHg6MCwgeTowLCB3aWR0aDowLCBoZWlnaHQ6MCB9O1xuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gZmFsc2U7XG4gIH1cbiAgLyogb3B0aW9ucy5tYXBTaXplID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSovXG4gIGluaXQocGx1Z2lucykge1xuICAgIGlmKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdNYXAoKTtcbiAgICB0aGlzLnRpY2tPbigpO1xuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkcmF3TWFwKCkge1xuICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgIGlmKHN0YWdlLmRyYXdUaGlzQ2hpbGQpIHtcbiAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgIHN0YWdlLmRyYXdUaGlzQ2hpbGQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldFNpemUoICkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICBzZXRTaXplKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgdGhpcy5tYXBTaXplID0geyB4OngxLCB5OnkxLCB3aWR0aDp4MiwgaGVpZ2h0OnkyIH07XG5cbiAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGZvcihsZXQgc3RhZ2Ugb2YgdGhpcy5zdGFnZXMpIHtcbiAgICAgIGxldCBjaGlsZDtcblxuICAgICAgaWYoc3RhZ2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIHN0YWdlO1xuICAgICAgfVxuXG4gICAgICBpZihjaGlsZCA9IHN0YWdlLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBhZGRTdGFnZShzdGFnZSkge1xuICAgIGxldCBzdGFnZXMgPSBbXTtcblxuICAgIGlmKCEgKHN0YWdlIGluc3RhbmNlb2YgQXJyYXkpICkge1xuICAgICAgc3RhZ2VzLnB1c2goc3RhZ2UpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhZ2VzLnB1c2goLi4uc3RhZ2VzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJlcGxhY2VTdGFnZShuZXdDYW52YXMsIG9sZENhbnZhcykge1xuICAgIGxldCBvbGRJbmRleCA9IHByaXZhdGVGdW5jdGlvbnMuX2dldFN0YWdlSW5kZXgodGhpcy5zdGFnZXMsIG9sZENhbnZhcyk7XG4gICAgdGhpcy5zdGFnZXNbb2xkSW5kZXhdID0gbmV3Q2FudmFzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkTGF5ZXIobGF5ZXIsIHN0YWdlKSB7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJlbW92ZUxheWVyKGxheWVyKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXBsYWNlTGF5ZXIobmV3TGF5ZXIsIG9sZExheWVyKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0b2dnbGVMYXllcihsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0TGF5ZXJOYW1lZChuYW1lKSB7XG4gICAgbGV0IHRoZUxheWVyO1xuXG4gICAgZm9yKGxldCBzdGFnZSBvZiB0aGlzLnN0YWdlcykge1xuICAgICAgaWYodGhlTGF5ZXIgPSBzdGFnZS5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0aGVMYXllcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNhY2hlTWFwKCkge1xuICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICAgIGlmKHN0YWdlLmNhY2hlRW5hYmxlZCkge1xuICAgICAgICAgICAgICB0aGlzLmNhY2hlKHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNhY2hlTGF5ZXJzKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoKSB7XG4gICAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgIG9iamVjdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgYWN0aXZhdGVGdWxsU2l6ZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBfc2V0U3RhZ2VzVG9GdWxsU2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuICBkZWFjdGl2YXRlRnVsbFNpemUoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fc2V0U3RhZ2VzVG9GdWxsU2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zIGZvciB0aGUgbWFwLiBNdXN0IGJlIGluIGFycmF5IGZvcm1hdDpcbiAgW3tcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lLFxuICAgIGFyZ3M6IFtcbiAgICAgIEZpcnN0IGFyZ3VtZW50LFxuICAgICAgc2Vjb25kIGFyZ3VtZW50LFxuICAgICAgLi4uXG4gICAgXVxuXG4gICAgUGFyYW1ldGVyIHBsdWdpblRvVXNlLmZ1bmMubmFtZSBpcyBwYXJ0IG9mIEVTNiBzdGFuZGFyZCB0byBnZXQgZnVuY3Rpb24gbmFtZS5cbiAgfV0gKi9cbiAgYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnNBcnJheSkge1xuICAgIHBsdWdpbnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHBsdWdpblRvVXNlKSB7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UuZnVuYy5uYW1lXSA9IG5ldyBwbHVnaW5Ub1VzZS5mdW5jKC4uLnBsdWdpblRvVXNlLmFyZ3MpO1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLmZ1bmMubmFtZV0uaW5pdCgpO1xuICAgIH0pO1xuICB9XG4gIHRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZih0aGlzLmFjdGl2ZVRpY2tDQikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgYWxyZWFkeSBleGlzdHMgb25lIHRpY2sgY2FsbGJhY2suIE5lZWQgdG8gcmVtb3ZlIGl0IGZpcnN0LCBiZWZvcmUgc2V0dGluZyB1cCBhIG5ldyBvbmVcIik7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB0aWNrQ0IgfHwgX2hhbmRsZVRpY2suYmluZCh0aGlzKTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoc3RhZ2VzLCBzdGFnZVRvRmluZCkge1xuICB2YXIgZm91bmRJbmRleCA9IHN0YWdlcy5pbmRleE9mKHN0YWdlVG9GaW5kKTtcblxuICByZXR1cm4gKCBmb3VuZEluZGV4ID09PSAtMSApID8gZmFsc2UgOiBmb3VuZEluZGV4O1xufVxuLyoqID09IENvbnRleHQgc2Vuc2l0aXZlLCB5b3UgbmVlZCB0byBiaW5kLCBjYWxsIG9yIGFwcGx5IHRoZXNlID09ICovXG5mdW5jdGlvbiBfaGFuZGxlVGljaygpIHtcbiAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgIGlmKHN0YWdlLnVwZGF0ZVN0YWdlID09PSB0cnVlKSB7XG4gICAgICBzdGFnZS51cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gX3NldFN0YWdlc1RvRnVsbFNpemUoKSB7XG4gIGZvciggbGV0IGNhbnZhcyBvZiB0aGlzLnN0YWdlcyApIHtcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xuXG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5cbi8qID09PT09IENvbnN0YW50cyA9PT09PSAqL1xuY29uc3QgVFlQRVMgPSB7XG4gIGp1c3RTdWJDb250YWluZXJzOiAxLFxuICBub1N1YkNvbnRhaW5lcnM6IDIsXG4gIGltYWdlc0luU3ViQ29udGFpbmVyczogM1xufTtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgX2dldFN0YWdlSW5kZXgsXG4gIF9jcmVhdGVTdWJDb250YWluZXJzLFxuICBfY2FjaGVMYXllcixcbiAgX3NldENvcnJlY3RTdWJDb250YWluZXIsXG4gIF9nZXRDb3JyZWN0Q29udGFpbmVyXG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIC8qIENvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIC8qIG92ZXJsb2FkZWQgaW5oZXJpdGVkIG1ldGhvZCAqL1xuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBDb250YWluZXIgZGlyZWN0bHkuIFdldGhlciBpdCBpcyBDb250YWluZXIgb3IgQml0bWFwIGV0Yy4gKi9cbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBjb3JyZWN0IHN1YkNvbnRhaW5lci4gRm9yIGJldHRlciBsb2dpYyBhbmQgcGVyZm9ybWFuY2UgKi9cbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gcHJpdmF0ZUZ1bmN0aW9ucy5fZ2V0Q29ycmVjdENvbnRhaW5lci5jYWxsKHRoaXMsIG9iamVjdC54LCBvYmplY3QueSk7XG4gICAgICBjb3JyZWN0U3ViQ29udGFpbmVyLmFkZENoaWxkKG9iamVjdCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGlmKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZihjaGlsZC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICEhdGhpcy51c2VTdWJjb250YWluZXJzO1xuICB9XG4gIGlzU2V0VmlzaWJsZSgpIHsgfVxuICBzZXRWaXNpYmxlKCkgeyB9XG4gIHN0YXRpYyBnZXRUeXBlKG5hbWUpIHtcbiAgICByZXR1cm4gVFlQRVNbbmFtZV07XG4gIH1cbn1cblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxufVxuKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0U3RhZ2VJbmRleChtYXAsIGNhbnZhcykgeyB9XG5mdW5jdGlvbiBfY3JlYXRlU3ViQ29udGFpbmVycygpIHsgfVxuZnVuY3Rpb24gX2NhY2hlTGF5ZXIoKSB7IH1cbmZ1bmN0aW9uIF9zZXRDb3JyZWN0U3ViQ29udGFpbmVyKCkgeyB9XG5mdW5jdGlvbiBfZ2V0Q29ycmVjdENvbnRhaW5lcih4LCB5KSB7XG4gIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gdGhpcy5nZXRPYmplY3RVbmRlclBvaW50KHgsIHkpO1xuXG4gIHJldHVybiBjb3JyZWN0U3ViQ29udGFpbmVyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7IH07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICBfaXNfYm9vbGVhbjogdmFsaWRhdG9yTW9kLmlzQm9vbGVhbixcbiAgX2lzX2Nvb3JkaW5hdGVzOiB2YWxpZGF0b3JNb2QuaXNDb29yZGluYXRlcyxcbiAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICBfaXNfVXNlT2ZTdWJMYXllcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViTGF5ZXJzLFxuICBfaXNfVXNlT2ZTdWJDb250YWluZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkNvbnRhaW5lcnNcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfc3RhZ2UgZXh0ZW5kcyBjcmVhdGVqcy5TdGFnZSB7XG4gIC8qIFRha2VzIHRoZSBjYW52YXMgZWxlbWVudCBhcyBhcmd1bWVudCAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgICAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuXG5cbi8qXG5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5pbXBvcnQgU3ByaXRlU3RhZ2UgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVTdGFnZSc7XG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZVN0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlU3RhZ2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG5cbiAgICAgICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gICAgfVxuICAgIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgICAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICAgIGlmKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoaXMgY2xhc3MgbmVlZHMgdG8gYmUgZ29uZSB0aHJvdWdoIGNhcmVmdWxseSwgaXQgaGFzIGJlZW4gY29waWVkIGZyb20gYW4gb2xkZXIgdmVyc2lvbiBzdHJhaWdodC4gVGhlIHZlcnNpb24gd2FzIEVTNVxuQHBhcmFtIHtjcmVhdGVqcy5Qb2ludH0gY29vcmRzIC0gdGhlIGNvb3JkaW5hdGUgd2hlcmUgdGhlIG9iamVjdCBpcyBsb2NhdGVkIGF0XG5AcGFyYW0ge30gZGF0YSAtIG9iamVjdHMgZGF0YSwgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGdhbWUuIEl0IHdpbGwgbm90IGFjdHVhbGx5IGJlIG1haW5seSB1c2VkIGluIGdyYXBoaWNhbFxuYnV0IHJhdGhlciB0aGluZ3MgbGlrZSB1bml0LWRhdGEgYW5kIGNpdHktZGF0YSBwcmVzZW50YXRpb25zIGV0Yy5cbkBwYXJhbSB7Y3JlYXRlanMuU3ByaXRlU2hlZXR9IHNwcml0ZVNoZWV0XG5AcGFyYW0ge0ludF0gY3VyckZyYW1lTnVtYmVyIC0gdGhlIGN1cnJlbnQgZnJhbWVzIG51bWJlci4gVGhpcyBpcyBiYXNpY2FsbHkgdGhlIGluaXRpYWwgaW1hZ2UsIHdlIGNhbiBjaGFuZ2UgaXQgbGF0ZXJcbmZvciBhbmltYXRpb24gb3Igc3VjaFxuXG5BbGwgb2YgdGhlIG9iamVjdHMgbmVlZCB0byBoYXZlIHNhbWUgYXJndW1lbnRBUEkgZm9yIGNyZWF0aW5nIG9iamVjdHM6IGNvb3JkcywgZGF0YSwgaW1hZ2VEYXRhXG4qL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c19zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJnZW5lcmFsIE9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcblxuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gY3VycmVudEZyYW1lTnVtYmVyO1xuXG4gICAgLyogRXhlY3V0ZSBpbml0aWFsIGRyYXcgZnVuY3Rpb24gKi9cbiAgICB0aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuXG4gICAgLyogb3B0aW1pemF0aW9ucyAqL1xuICAgIHRoaXMuc2hhZG93ID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gU2hvdWxkIGJlIGVuYWJsZWQsIGlmIHRoZSBsYXllciBpcyBiZWluZyBpbnRlcmFjdGVkIHdpdGguIExpa2UgdW5pdCBsYXllci4gVGhpcyB3YXkgd2UgY2FuIHVzZSBjdXJzb3IgcG9pbnRlciBldGMuXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBGT1IgREVCVUdHSU5HIEFORCBTRUVJTkcgVEhBVCBMSVNURU5FUlMgQVJFIEFUVEFDSEVEOlxuICAgIC8vdGhpcy53aWxsVHJpZ2dlclxuICB9XG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICBjb25zb2xlLmxvZyhcIkhBQUFcIilcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgLyogVGhlIG1vdXNlIGNoZWNrIGhhcyBiZWVuIGVuYWJsZWQgb24gaGlnaGVyIHRpZXIsIHNvIG5vIG5lZWQgZm9yIHRoaXNcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlOyAqL1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZHJhd05ld0ZyYW1lKHgsIHksIG5ld0ZyYW1lTnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBuZXdGcmFtZU51bWJlcjtcblxuICAgIHJldHVybiB0aGlzLmlubmVyRHJhdyh4LCB5KTtcbiAgfVxuICAvKiBEdW5ubyBpZiB3ZSBuZWVkIHRoaXMgYW5kIHNvIG9uLiBUaGlzIHdhcyBpbiB0aGUgb2xkIHZlcnNpb24gKi9cbiAgZ2xvYmFsQ29vcmRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBOdW1iZXIoIHRoaXMueCArIHRoaXMucGFyZW50LnggKSxcbiAgICAgIHk6IE51bWJlciggdGhpcy55ICsgdGhpcy5wYXJlbnQueSApXG4gICAgfTtcbiAgfVxuICBnZXRCb3VuZHNGcm9tRnJhbWVzKCkge1xuICAgICByZXR1cm4gdGhpcy5zcHJpdGVTaGVldC5nZXRGcmFtZUJvdW5kcyggdGhpcy5jdXJyZW50RnJhbWUgKTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEhvbGQgZGlmZmVyZW50IHZhbGlkYXRvciBmdW5jdGlvbnMgdG8gYmUgdXNlZCBpbiBtb2R1bGVzICovXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gIF9pc0ludFxufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGxldCB2YWxpZGF0b3JNb2QgPSAoZnVuY3Rpb24gdmFsaWRhdG9yTW9kKCkge1xuICByZXR1cm4ge1xuICAgIGlzSW5kZXgoaW50KSB7XG4gICAgICAgIHJldHVybiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KGludCk7XG4gICAgfSxcbiAgICBpc0Jvb2xlYW4oYm9vbCkge1xuICAgICAgICByZXR1cm4gYm9vbCA9PT0gQm9vbGVhbihib29sKTtcbiAgICB9LFxuICAgIGlzQ29vcmRpbmF0ZXMoeCwgeSkge1xuICAgICAgICBpZihwcml2YXRlRnVuY3Rpb25zLmlzSW50KHgpICYmIHByaXZhdGVGdW5jdGlvbnMuaXNJbnQoeSkgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGlzU3ViQ29udGFpbmVyQW1vdW50KCkge1xuXG4gICAgfSxcbiAgICBpc1VzZU9mU3ViTGF5ZXJzKCkge1xuXG4gICAgfSxcbiAgICBpc1VzZU9mU3ViQ29udGFpbmVycygpIHtcblxuICAgIH1cbiAgfTtcbn0pKCk7XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2lzSW50KHdhbm5hYmVJbnQpIHtcbiAgLyogRVM2ICovXG4gIGlmKE51bWJlci5pc0ludGVnZXIpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih3YW5uYWJlSW50KTtcbiAgfVxuXG4gIC8qIEVTNSAqL1xuICByZXR1cm4gdHlwZW9mIHdhbm5hYmVJbnQgPT09ICdudW1iZXInICYmICh3YW5uYWJlSW50ICUgMSkgPT09IDA7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFzaCBmcm9tICdibHVlaW1wLW1kNSc7XG5cbmxldCBhbGxTcHJpdGVzaGVldHMgPSBbXTtcbmxldCBhbGxTcHJpdGVzaGVldElEcyA9IFtdO1xuXG4vKiBTaW5nbGV0b24gc28gd2UgZG9uJ3QgdXNlIGNsYXNzIGRlZmluaXRpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVzaGVldExpc3QgKCkge1xuICBsZXQgc2NvcGUgPSB7fTtcblxuICBzY29wZS5hZGRTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICBsZXQgc3ByaXRlU2hlZXQ7XG5cbiAgICBpZihzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMoIF9jcmVhdGVJRCggc3ByaXRlc2hlZXREYXRhICkgKSApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldChzcHJpdGVzaGVldERhdGEpO1xuXG4gICAgYWxsU3ByaXRlc2hlZXRzLnB1c2goIHNwcml0ZVNoZWV0ICk7XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXQ7XG4gIH07XG4gIHNjb3BlLnJlbW92ZVNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0KSB7XG5cbiAgfTtcbiAgc2NvcGUuZ2V0QWxsU3ByaXRlc2hlZXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHM7XG4gIH07XG4gIHNjb3BlLnNwcml0ZXNoZWV0QWxyZWFkeUV4aXN0cyA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldElEKSB7XG4gICAgcmV0dXJuICggYWxsU3ByaXRlc2hlZXRJRHMuaW5kZXhPZiggc3ByaXRlc2hlZXRJRCApID4gLTEgKTtcbiAgfTtcbiAgZnVuY3Rpb24gX2NyZWF0ZUlEIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICByZXR1cm4gKCBzcHJpdGVzaGVldERhdGEuaW1hZ2VzLnRvU3RyaW5nKCkgKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3RzX3Nwcml0ZSB9IGZyb20gJy4uL2NvcmUvT2JqZWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RzX3RlcnJhaW4gZXh0ZW5kcyBPYmplY3RzX3Nwcml0ZSB7XG4gIGNvbnN0cnVjdChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdFwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3RzX3Nwcml0ZSB9IGZyb20gJy4uL2NvcmUvT2JqZWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RzX3VuaXQgZXh0ZW5kcyBPYmplY3RzX3Nwcml0ZSB7XG4gIGNvbnN0cnVjdChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNcIjtcbiAgfVxufSIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XG4gIElEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBtYXBTaXplOiB7IHg6IDEwMCwgeTogMTAwIH0sXG4gIHBsdWdpbnNUb0FjdGl2YXRlOiB7XG4gICAgbWFwOiBbXCJtYXBfbW92ZVwiXVxuICB9XG59OyIsImV4cG9ydCBsZXQgbWFwRGF0YSA9IHtcbiAgZ2FtZUlEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBzdGFnZXM6IFt7XG4gICAgdHlwZTogXCJNYXBfc3RhZ2VcIixcbiAgICBjb29yZGluYXRlczogeyB4OiAwLCB5OiAwIH0sXG4gICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgc3BlY2lhbHM6IFt7XG4gICAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMjQwXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0se1xuICAgICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiNDgwXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjMlwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI3MjBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjk2MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2Y2NcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMTIwMFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2ZDFcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMTQ0MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2ZDZcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCI0OFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjcyXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiNFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI0OFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjUsXG4gICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiOVwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIyODhcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjozLFxuICAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmJlXCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjUyOFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzNcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiNzY4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjOFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxMDA4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjZFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxMjQ4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH0se1xuICAgICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgICBcImNvb3JkXCI6IHsgXCJ4XCI6IFwiMFwiLCBcInlcIjogXCIwXCIgfSxcbiAgICAgIFwibmFtZVwiOiBcInVuaXRMYXllclwiLFxuICAgICAgXCJvcHRpb25zXCI6IHtcbiAgICAgICAgXCJjYWNoZVwiOiBcImZhbHNlXCJcbiAgICAgIH0sXG4gICAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgICBcInR5cGVcIjogXCJPYmplY3RzX3VuaXRcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgXCJ0eXBlSW1hZ2VEYXRhXCI6IHtcbiAgICAgICAgICBcImltYWdlc1wiOiBbXG4gICAgICAgICAgICBcIi9hc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImZyYW1lc1wiOiBbXG4gICAgICAgICAgICBbMCwwLDk2LDQ4XSxcbiAgICAgICAgICAgIFswLDQ4LDk2LDQ4XSxcbiAgICAgICAgICAgIFswLDk2LDk2LDQ4XSxcbiAgICAgICAgICAgIFswLDE0NCw5Niw0OF0sXG4gICAgICAgICAgICBbMCwxOTIsOTYsNDhdLFxuICAgICAgICAgICAgWzAsMjQwLDk2LDQ4XVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgICAgIH0sXG4gICAgICAgIFwib2JqZWN0c1wiOiBbe1xuICAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW5mYW50cnkgMVwiLFxuICAgICAgICAgIFwiY29vcmRcIjogeyBcInhcIjogXCI2MFwiLCBcInlcIjogXCI2MFwiIH0sXG4gICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgIFwic29tZUN1c3RvbURhdGFcIjogXCJ0cnVlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjk2LFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo0OFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCJhc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMCwwLDk2LDQ4XSxbMCw0OCw5Niw0OF0sWzAsOTYsOTYsNDhdLFswLDE0NCw5Niw0OF0sWzAsMTkyLDk2LDQ4XSxbMCwyNDAsOTYsNDhdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgfSxcbiAgICBcInRlcnJhaW5cIjp7XG4gICAgICBcImltYWdlc1wiOltcImFzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICB9LFxuICAgIFwiZGl0aGVyXCI6e1wiaW1hZ2VzXCI6W1wiaW1nL21hcC9kaXRoZXIyLnBuZ1wiXSxcImZyYW1lc1wiOltbMCwwLDk2LDQ4XV0sXCJpbWFnZVNpemVcIjpbOTYsNDhdfSxcbiAgICBcInByZXR0aWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcImFzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiaW1nL21hcC9hbXBsaW8yL2hpbGxzLnBuZ1wiLFwiaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4yLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDY2LDAsMCwxOF0sWzEsMSw5Niw0OCwxLC00LDRdLFsxLDE0OCw5Niw0OCwyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJyZXNvdXJjZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiYXNzZXRzL2ltZy9tYXAvcmVzb3VyY2VzL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMTk1LDEsOTYsNDhdLFszODksMSw5Niw0OF1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicGxhY2VcIjp7fSxcbiAgICBcImNpdHlcIjp7XG4gICAgICBcImltYWdlc1wiOltcImFzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbWVkaWV2YWxjaXRpZXMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1cbiAgICAgIF1cbiAgICB9LFwiYnVpbGRpbmdcIjp7XG4gICAgICBcImltYWdlc1wiOltcImltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFwibW9kaWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcImltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwidW5pdFwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiaW1nL21hcC9hbXBsaW8yL3VuaXRzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6e1wid2lkdGhcIjo2NixcImhlaWdodFwiOjUwfVxuICAgIH1cbiAgfSxcbiAgXCJvYmplY3REYXRhXCI6IHtcbiAgICBcInVuaXRcIjpbe1xuICAgICAgICBcIm5hbWVcIjpcInRhbmtcIixcbiAgICAgICAgXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxuICAgICAgICBcImRlZlwiOlwiUG9vclwiLFxuICAgICAgICBcInNpZWdlXCI6XCJEZWNlbnRcIixcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcbiAgICAgICAgXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICAgIH0se1xuICAgICAgICBcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJ1bml0XCI6e1xuICAgICAgICAgICAgXCJfZW5lbXlfXCI6W3tcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgXCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOlt7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIyXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI1XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIlxuICAgIH1dLFxuICAgIFwidGVycmFpblwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwiZGVzZXJ0XCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwidmVyeSBkcnkgbGFuZFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiVW5pdFwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJ9fV19fX0se1wibmFtZVwiOlwidHVuZHJhXCIsXCJkZXNjXCI6XCJTaWJlcmlhIHRlYWNoZXMgeW91XCIsXCJpbWFnZVwiOlwiNlwifSx7XCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIn0se1wibmFtZVwiOlwic3dhbXBcIixcImRlc2NcIjpcIkNyYW5iZXJyaWVzIGFuZCBjbG91ZGJlcnJpZXNcIixcImltYWdlXCI6XCI4XCJ9XSxcImRpdGhlclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9XSxcInByZXR0aWZpZXJcIjpbe1wiaW1hZ2VcIjpcIjBcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIyNSVcIn0se1wiaW1hZ2VcIjpcIjFcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCI0MCVcIn0se1wiaW1hZ2VcIjpcIjJcIixcInpJbmRleFwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCI2MCVcIn1dLFwicmVzb3VyY2VcIjpbe1wibmFtZVwiOlwiT2FzaXNcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJPYXNpcyBpbiB0aGUgbWlkZGxlIG9mIGRlc2VydCwgb3Igbm90IGF0bS5cIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcImZvb2QgcHJvZHVjdGlvbiA1IC8gd2Vla1wifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJPaWxcIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCbGFjayBnb2xkXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJUaGVyZSBpcyBhIGxvdCBvZiBvaWwgaGVyZVwifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCI0XCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJjaXR5XCI6W3tcIm5hbWVcIjpcIk1lZGlldmFsXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjBcIixcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiTWVkaWV2YWwyXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjFcIixcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwicGxhY2VcIjpbXSxcImJ1aWxkaW5nXCI6W3tcIm5hbWVcIjpcIkJhcnJhY2tzXCIsXCJpbWFnZVwiOlwiMFwiLFwidG9vbHRpcFwiOlwiRW5hYmxlcyB0cm9vcCByZWNydWl0bWVudFwifSx7XCJuYW1lXCI6XCJGYWN0b3J5XCIsXCJpbWFnZVwiOlwiMVwiLFwidG9vbHRpcFwiOlwiUHJvZHVjZXMgd2VhcG9ucnlcIn1dLFwiZ292ZXJubWVudFwiOlt7XCJuYW1lXCI6XCJEZW1vY3JhenlcIixcImRlc2NyaXB0aW9uXCI6XCJ3ZWxsIGl0J3MgYSBkZW1vY3JhenkgOilcIixcInRvb2x0aXBcIjpcIkdpdmVzICsyMCUgaGFwcGluZXNzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlswLDFdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJoYXBwaW5lc3NcIjpcIjIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDb21tdW5pc21cIixcImRlc2NyaXB0aW9uXCI6XCJZb3Uga25vdyB0aGUgb25lIHVzZWQgaW4gdGhlIGdyZWF0IFVTU1IgYW5kIGluc2lkZSB0aGUgZ3JlYXQgZmlyZXdhbGwgb2YgQ2hpbmFcIixcInRvb2x0aXBcIjpcIkdpdmVzIHByb2R1Y3Rpb24gYm9udXNlc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMiwzXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e319XX19LFwiQ2l0eVwiOntcImJ1aWxkaW5nXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCIyMCVcIn19XX19fX1dLFwicG9saXRpY3NcIjp7XCJ0YXhSYXRlXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiY29ycnVwdGlvblwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImFsaWdubWVudFwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImhhcHBpbmVzc1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInJldm9sdFJpc2tcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJ1bml0eVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcIm5hdFZhbHVlXCI6W3tcIm5hbWVcIjpcIkludGVncml0eVwiLFwidG9vbHRpcFwiOlwiR292ZXJubWVudCBhbmQgcG9wdWxhdGlvbnMgc2hvd3MgaW50ZWdyaXR5IGFuZCB0cnVzdHdvcnRoaW5lc3NcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaW50ZXJuYWxSZWxhdGlvbnNcIjpcIisxMCVcIixcImRpcGxvbWFjeVwiOlwiKzEwJVwiLFwicmV2b2x0IHJpc2tcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiLTIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDYXBpdGFsaXNtXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRpcGxvbWFjeVwiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcIm1vcmFsZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkhhcmR3b3JraW5nXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzEwJVwiLFwiaGFwcGluZXNzXCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJMZWFkZXJzaGlwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzUlXCIsXCJoYXBwaW5lc3NcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJ0cmFkaW5nXCI6XCIrMTAlXCJ9fV19fX19XX19XG59OyJdfQ==
