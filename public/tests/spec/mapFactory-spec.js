(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _componentsFactoriesMapFactoryJs = require('../../components/factories/MapFactory.js');

/* Read data from files, to use with testing */

var _testsDataGameDataJs = require('../../tests/data/gameData.js');

var _testsDataTypeDataJs = require('../../tests/data/typeData.js');

var _testsDataMapDataJs = require('../../tests/data/mapData.js');

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
  var mapCanvas = document.getElementById('mapCanvas');
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
    var map = (0, _componentsFactoriesMapFactoryJs.createMap)(_testsDataGameDataJs.gameData, _testsDataMapDataJs.mapData, _testsDataTypeDataJs.typeData);

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
      expect(Number(map.getLayerNamed('terrainBaseLayer').children[1].y) === 480).toBeTruthy();
      expect(map.getLayerNamed('terrainBaseLayer').children.length > 1).toBeTruthy();
    });
    it('=> unit properties are correct', function () {
      expect(Number(map.getLayerNamed('unitLayer').children[0].x) === 60).toBeTruthy();
    });
    it('=> unit properties are correct', function (done) {
      map.init(tickDoneFunc);

      function tickDoneFunc(tickDone) {
        done();
      }

      expect(true).toBeTruthy();
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

var _mapCoreMap_stage = require('../map/core/Map_stage');

var _mapCoreMap_layer = require('../map/core/Map_layer');

var _mapObjectsObjects_terrain = require('../map/objects/Objects_terrain');

var _mapObjectsObjects_unit = require('../map/objects/Objects_unit');

var _mapCoreSpritesheetList = require('../map/core/spritesheetList');

var _mapCoreMap_validators = require('../map/core/map_validators');

var allSpritesheets = (0, _mapCoreSpritesheetList.spritesheetList)();

var functionsInObj = {
  Map_stage: _mapCoreMap_stage.Map_stage,
  Map_layer: _mapCoreMap_layer.Map_layer,
  Objects_terrain: _mapObjectsObjects_terrain.Objects_terrain,
  Objects_unit: _mapObjectsObjects_unit.Objects_unit
};

/** ===== Private functions declared ===== */
var privateFunctions = {
  _getStageIndex: _getStageIndex
};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _mapCoreMap_validators.validatorMod.isIndex
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

function createMap(gameDataArg, mapDataArg, typeDataArg) {
  console.log('============================================');
  var mapData = typeof mapDataArg === 'string' ? JSON.parse(mapDataArg) : mapDataArg;
  var typeData = typeof typeDataArg === 'string' ? JSON.parse(typeDataArg) : typeDataArg;
  var gameData = typeof gameDataArg === 'string' ? JSON.parse(gameDataArg) : gameDataArg;
  var map = new _mapCoreMap.Map({ mapSize: gameData.mapSize });

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
  mapData.stages.forEach(function (stageData) {
    debugger;
    var thisStage = new functionsInObj[stageData.type](stageData.name, document.querySelector(stageData.element));

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
          }
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

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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

var _map_validators = require('./map_validators');

/** ===== Private functions declared ===== */
var privateFunctions = {
  _getStageIndex: _getStageIndex
};

/** ===== Validators used in this module. Imported from map_validators ===== */
var validators = {
  _is_index: _map_validators.validatorMod.isIndex,
  _is_coordinates: _map_validators.validatorMod.isCoordinates,
  _is_SubContainerAmount: _map_validators.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _map_validators.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _map_validators.validatorMod.isUseOfSubContainers,
  _is_canvas: _map_validators.validatorMod.isCanvas
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
    this.mapSize = options && options.mapSize || { x: 0, y: 0 };
    this.activeTickCB = false;
  }

  _createClass(Map, [{
    key: 'init',

    /* options.mapSize = new createjs.Rectangle*/
    value: function init(tickCB, plugins) {
      if (plugins) {
        this.activatePlugins(plugins);
      }
      this.drawMap();
      this.tickOn(tickCB);

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
    value: function setSize(x1, y1) {
      this.mapSize = { x: x1, y: y1 };

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
          this.cache(0, 0, this.mapSize.x, this.mapSize.y);
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

var _map_validators = require("./map_validators");

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
  _is_index: _map_validators.validatorMod.isIndex,
  _is_boolean: _map_validators.validatorMod.isBoolean,
  _is_coordinates: _map_validators.validatorMod.isCoordinates,
  _is_SubContainerAmount: _map_validators.validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: _map_validators.validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: _map_validators.validatorMod.isUseOfSubContainers
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

},{"blueimp-md5":2}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _coreObjects = require('../core/Objects');

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
})(_coreObjects.Objects_sprite);

exports.Objects_terrain = Objects_terrain;

},{"../core/Objects":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _coreObjects = require('../core/Objects');

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
})(_coreObjects.Objects_sprite);

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
      element: "#mapCanvas",
      layers: [{
         type: "Map_layer",
         coordinates: { x: 0, y: 0 },
         name: "terrainBaseLayer",
         specials: [{
            "interactive": false
         }],
         options: {
            cache: true
         },
         objectGroups: [{
            type: "Objects_terrain",
            name: "TerrainBase", // I guess only for debugging?
            typeImageData: "terrainBase",
            objects: [{
               "objType": 5,
               "name": "swamp",
               "_id": "53837d49976fed3b240006b8",
               "coord": {
                  "x": "0",
                  "y": "240"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 5,
               "name": "swamp",
               "_id": "53837d49976fed3b240006bd",
               "coord": {
                  "x": "0",
                  "y": "480"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 3,
               "name": "tundra",
               "_id": "53837d49976fed3b240006c2",
               "coord": {
                  "x": "0",
                  "y": "720"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006c7",
               "coord": {
                  "x": "0",
                  "y": "960"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006cc",
               "coord": {
                  "x": "0",
                  "y": "1200"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 3,
               "name": "tundra",
               "_id": "53837d49976fed3b240006d1",
               "coord": {
                  "x": "0",
                  "y": "1440"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006d6",
               "coord": {
                  "x": "48",
                  "y": "72"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006b4",
               "coord": {
                  "x": "0",
                  "y": "48"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 5,
               "name": "swamp",
               "_id": "53837d49976fed3b240006b9",
               "coord": {
                  "x": "0",
                  "y": "288"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 3,
               "name": "tundra",
               "_id": "53837d49976fed3b240006be",
               "coord": {
                  "x": "0",
                  "y": "528"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006c3",
               "coord": {
                  "x": "0",
                  "y": "768"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 3,
               "name": "tundra",
               "_id": "53837d49976fed3b240006c8",
               "coord": {
                  "x": "0",
                  "y": "1008"
               },
               "data": {},
               "lastSeenTurn": "1"
            }, {
               "objType": 2,
               "name": "forest",
               "_id": "53837d49976fed3b240006cd",
               "coord": {
                  "x": "0",
                  "y": "1248"
               },
               "data": {}
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
            "type": "Objects_unit",
            "name": "Unit", // I guess only for debugging?
            "typeImageData": "unit",
            "objects": [{
               "objType": 2,
               "name": "Horsey the wild",
               "coord": { "x": "60", "y": "60" },
               "data": {
                  "someCustomData": "true"
               },
               "lastSeenTurn": "1"
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
  "graphicData": {
    "general": {
      "terrain": {
        "tileWidth": 96,
        "tileHeight": 48
      }
    },
    "terrainBase": {
      "images": ["/assets/img/map/collection.png"],
      "frames": [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
      "imageSize": [96, 48]
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
      "images": ["/assets/img/map/amplio2/units.png"],
      "frames": { "width": 66, "height": 50 }
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
      "image": "0", "attachedToTerrains": ["0"], "propability": "100%"
    }, {
      "image": "1", "attachedToTerrains": ["2"], "propability": "100%"
    }, {
      "image": "2", "attachedToTerrains": ["1"], "propability": "100%"
    }, {
      "image": "3", "attachedToTerrains": ["4"], "propability": "100%"
    }, {
      "image": "4", "attachedToTerrains": ["5"], "propability": "100%"
    }, {
      "image": "5", "attachedToTerrains": ["3"], "propability": "100%"
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
            "from": "thisOnePlace", "modifiers": { "defend": "Unit defend +2" } }] } } }, { "name": "tundra", "desc": "Siberia teaches you", "image": "6" }, { "name": "arctic", "desc": "Your ball will freeze of", "image": "7" }, { "name": "swamp", "desc": "Cranberries and cloudberries", "image": "8" }], "dither": [{ "image": "0", "attachedToTerrains": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "propability": "100%" }], "prettifier": [{ "image": "0", "zIndex": "1", "attachedToTerrains": ["3"], "propability": "25%" }, { "image": "1", "zIndex": "1", "attachedToTerrains": ["1"], "propability": "40%" }, { "image": "2", "zIndex": "0", "attachedToTerrains": ["2"], "propability": "60%" }], "resource": [{ "name": "Oasis", "image": "0", "desc": "Oasis in the middle of desert, or not atm.", "modifiers": { "City": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "food production 5 / week" } }] } }, "attachedToTerrains": ["0"], "influenceArea": 50 }, { "name": "Oil", "image": "1", "desc": "Black gold", "modifiers": { "City": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "There is a lot of oil here" } }] } }, "attachedToTerrains": ["0", "4"], "influenceArea": 50 }], "city": [{ "name": "Medieval", "vision": "100", "image": "0", "influenceArea": 50 }, { "name": "Medieval2", "vision": "100", "image": "1", "influenceArea": 50 }], "place": [], "building": [{ "name": "Barracks", "image": "0", "tooltip": "Enables troop recruitment" }, { "name": "Factory", "image": "1", "tooltip": "Produces weaponry" }], "government": [{ "name": "Democrazy", "description": "well it's a democrazy :)", "tooltip": "Gives +20% happiness", "image": "0", "requirements": [], "possibleNatValues": [0, 1], "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "happiness": "20%" } }] } } } }, { "name": "Communism", "description": "You know the one used in the great USSR and inside the great firewall of China", "tooltip": "Gives production bonuses", "image": "0", "requirements": [], "possibleNatValues": [2, 3], "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": {} }] } }, "City": { "building": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "production": "20%" } }] } } } }], "politics": { "taxRate": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "corruption": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "alignment": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "happiness": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "revoltRisk": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "unity": [{ "min": "0", "max": "20", "modifiers": { "Unit": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "attack": "+1" } }] } } }, { "min": "21", "max": "100", "modifiers": { "faction": { "diplomacy": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "skill": "+5" } }] } } } }], "natValue": [{ "name": "Integrity", "tooltip": "Government and populations shows integrity and trustworthiness", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "internalRelations": "+10%", "diplomacy": "+10%", "revolt risk": "-5%", "relationsToElite": "-20%" } }] } } } }, { "name": "Capitalism", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "diplomacy": "+5%", "relationsToElite": "+5%", "morale": "+5%" } }] } } } }, { "name": "Hardworking", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "productivity": "+10%", "happiness": "+5%", "relationsToElite": "+5%" } }] } } } }, { "name": "Leadership", "modifiers": { "faction": { "politics": { "_player_": [{ "from": "thisOnePlace", "modifiers": { "productivity": "+5%", "happiness": "-5%", "relationsToElite": "+5%", "trading": "+10%" } }] } } } }] } }
};
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvTWFwRmFjdG9yeS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3RzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21hcF92YWxpZGF0b3JzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW4uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdHMvT2JqZWN0c191bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7K0NBTWEsMENBQTBDOzs7O21DQUczQyw4QkFBOEI7O21DQUM5Qiw4QkFBOEI7O2tDQUMvQiw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBVztBQUNqRCxNQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERyRCxVQUFRLENBQUMsYUFBYSxFQUFFLFlBQVc7QUFDakMsUUFBSSxHQUFHLEdBQUcscUNBdEZMLFNBQVMsdUJBR1QsUUFBUSxzQkFFUixPQUFPLHVCQURQLFFBQVEsQ0FrRm1DLENBQUM7O0FBRWpELE1BQUUsQ0FBQyxXQUFXLEVBQUUsWUFBVTtBQUN4QixZQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDM0IsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGlDQUFpQyxFQUFFLFlBQVU7QUFDOUMsWUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzNELFlBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDdkQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxLQUFNLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2hGLFlBQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDNUUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGlDQUFpQyxFQUFFLFlBQVU7QUFDOUMsWUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN4RSxZQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ3hELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRSxZQUFVO0FBQ2hELFlBQU0sQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMzRixZQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDaEYsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGdDQUFnQyxFQUFFLFlBQVU7QUFDN0MsWUFBTSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNwRixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsZ0NBQWdDLEVBQUUsVUFBUyxJQUFJLEVBQUM7QUFDakQsU0FBRyxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUUsQ0FBQzs7QUFFekIsZUFBUyxZQUFZLENBQUMsUUFBUSxFQUFFO0FBQzlCLFlBQUksRUFBRSxDQUFDO09BQ1I7O0FBRUQsWUFBTSxDQUFFLElBQUksQ0FBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBRzdCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7OztDQUlKLENBQUMsQ0FBQzs7Ozs7QUNqSUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkEsWUFBWSxDQUFDOzs7OztRQW9HRyxTQUFTLEdBQVQsU0FBUzs7Ozs7Ozs7Ozs7OzswQkF2RkwsaUJBQWlCOztnQ0FDWCx1QkFBdUI7O2dDQUN2Qix1QkFBdUI7O3lDQUNqQixnQ0FBZ0M7O3NDQUNuQyw2QkFBNkI7O3NDQUMxQiw2QkFBNkI7O3FDQUVoQyw0QkFBNEI7O0FBRHpELElBQUksZUFBZSxHQUFHLDRCQURiLGVBQWUsR0FDZSxDQUFDOztBQUd4QyxJQUFJLGNBQWMsR0FBRztBQUNuQixXQUFTLG9CQVRGLFNBQVMsQUFTUDtBQUNULFdBQVMsb0JBVEYsU0FBUyxBQVNQO0FBQ1QsaUJBQWUsNkJBVFIsZUFBZSxBQVNQO0FBQ2YsY0FBWSwwQkFUTCxZQUFZLEFBU1A7Q0FDYixDQUFBOzs7QUFHRCxJQUFJLGdCQUFnQixHQUFHO0FBQ25CLGdCQUFjLEVBQWQsY0FBYztDQUNqQixDQUFDOzs7QUFHRixJQUFJLFVBQVUsR0FBRztBQUNiLFdBQVMsRUFBRSx1QkFoQk4sWUFBWSxDQWdCTyxPQUFPO0NBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStESyxTQUFTLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUM5RCxTQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUE7QUFDM0QsTUFBSSxPQUFPLEdBQUcsQUFBQyxPQUFPLFVBQVUsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDckYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxHQUFHLEdBQUcsZ0JBNUZILEdBQUcsQ0E0RlEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQmpELFNBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsU0FBUyxFQUFJO0FBQ25DLGFBQVM7QUFDVCxRQUFJLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUUsQ0FBRSxDQUFDOztBQUVqSCxPQUFHLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxDQUFDOztBQUUxQixhQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFNBQVMsRUFBSTtBQUNyQyxVQUFJLFNBQVMsWUFBQSxDQUFDOztBQUVkLFVBQUk7QUFDRixpQkFBUyxHQUFHLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdEYsaUJBQVMsQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLENBQUM7T0FDakMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGVBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO09BQ2pEOztBQUVELGVBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFFLFVBQUEsV0FBVyxFQUFJO0FBQzdDLFlBQUksV0FBVyxZQUFBLENBQUM7QUFDaEIsWUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7QUFFaEQsWUFBRyxDQUFDLGVBQWUsRUFBRTtBQUNuQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQy9DLGlCQUFPO1NBQ1I7O0FBRUQsWUFBRyxlQUFlLEVBQUU7QUFDbEIsY0FBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFNUQscUJBQVcsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQy9EOztBQUVELG1CQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxVQUFBLE1BQU0sRUFBSTtBQUNyQyxjQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RSxjQUFHLENBQUMsV0FBVyxFQUFFO0FBQ2YsbUJBQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQ3RGO0FBQ0QsY0FBSSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDOztBQUUzQyxtQkFBUyxDQUFDLFFBQVEsQ0FBRSxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBRSxDQUFFLENBQUM7U0FDMUgsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFNBQU8sR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJYLFdBQVMsaUJBQWlCLEdBQUcsRUFFNUI7Q0FDRjs7O0FBR0QsU0FBUyxjQUFjLEdBQUcsRUFBRTs7O0FDOUw1QixZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQWNhLGFBQWE7O3lCQUNiLGFBQWE7OzhCQUNWLGtCQUFrQjs7O0FBSS9DLElBQUksZ0JBQWdCLEdBQUc7QUFDbkIsZ0JBQWMsRUFBZCxjQUFjO0NBQ2pCLENBQUM7OztBQUdGLElBQUksVUFBVSxHQUFHO0FBQ2IsV0FBUyxFQUFFLGdCQVZOLFlBQVksQ0FVTyxPQUFPO0FBQy9CLGlCQUFlLEVBQUUsZ0JBWFosWUFBWSxDQVdhLGFBQWE7QUFDM0Msd0JBQXNCLEVBQUUsZ0JBWm5CLFlBQVksQ0FZb0Isb0JBQW9CO0FBQ3pELG9CQUFrQixFQUFFLGdCQWJmLFlBQVksQ0FhZ0IsZ0JBQWdCO0FBQ2pELHdCQUFzQixFQUFFLGdCQWRuQixZQUFZLENBY29CLG9CQUFvQjtBQUN6RCxZQUFVLEVBQUUsZ0JBZlAsWUFBWSxDQWVRLFFBQVE7Q0FDcEMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQVlXLEdBQUc7QUFDSCxXQURBLEdBQUcsQ0FDRixPQUFPLEVBQUU7MEJBRFYsR0FBRzs7QUFFWixRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixRQUFJLENBQUMsT0FBTyxHQUFHLEFBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQztBQUM1RCxRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztHQUMzQjs7ZUFOVSxHQUFHOzs7O1dBUVYsY0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3BCLFVBQUcsT0FBTyxFQUFFO0FBQ1YsWUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUMvQjtBQUNELFVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNmLFVBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXBCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNNLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDbEMsWUFBRyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3RCLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNmLGVBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzdCO09BQ0YsQ0FBQyxDQUFDO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ00sbUJBQUk7QUFDUCxhQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkI7OztXQUNNLGlCQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDZCxVQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUM7O0FBRTlCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7O1dBQ1ksdUJBQUMsSUFBSSxFQUFFOzs7Ozs7QUFDbEIsNkJBQWlCLElBQUksQ0FBQyxNQUFNLDhIQUFFO2NBQXRCLEtBQUs7O0FBQ1gsY0FBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixjQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO0FBQ2xELG1CQUFPLEtBQUssQ0FBQztXQUNkOztBQUVELGNBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEMsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7U0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztXQUNPLGtCQUFDLEtBQUssRUFBRTs7O0FBQ2QsVUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixVQUFHLEVBQUcsS0FBSyxZQUFZLEtBQUssQ0FBQSxBQUFDLEVBQUc7QUFDOUIsY0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNwQjs7QUFFRCxpQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksTUFBQSxVQUFJLE1BQU0sQ0FBQyxDQUFDOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDVyxzQkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ2pDLFVBQUksUUFBUSxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZFLFVBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDOztBQUVsQyxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDTyxrQkFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFOztBQUVuQixhQUFPLElBQUksQ0FBQztLQUNmOzs7V0FDVSxxQkFBQyxLQUFLLEVBQUU7QUFDZixhQUFPLElBQUksQ0FBQztLQUNmOzs7V0FDVyxzQkFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzdCLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNVLHFCQUFDLEtBQUssRUFBRTtBQUNmLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNZLHVCQUFDLElBQUksRUFBRTtBQUNsQixVQUFJLFFBQVEsWUFBQSxDQUFDOzs7Ozs7O0FBRWIsOEJBQWlCLElBQUksQ0FBQyxNQUFNLG1JQUFFO2NBQXRCLEtBQUs7O0FBQ1gsY0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QyxtQkFBTyxRQUFRLENBQUM7V0FDakI7U0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztXQUNPLG9CQUFHO0FBQ1AsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDaEMsWUFBRyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ25CLGNBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO09BQ0osQ0FBQyxDQUFDOztBQUVILGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNVLHVCQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ3NCLG1DQUFHO0FBQ3RCLFVBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLGVBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7T0FDMUIsQ0FBQyxDQUFDOztBQUVILGFBQU8sT0FBTyxDQUFDO0tBQ2xCOzs7V0FDZSw0QkFBRztBQUNqQixZQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOzs7V0FDaUIsOEJBQUc7QUFDbkIsWUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDNUU7Ozs7Ozs7Ozs7Ozs7O1dBWWMseUJBQUMsWUFBWSxFQUFFO0FBQzVCLGtCQUFZLENBQUMsT0FBTyxDQUFDLFVBQVMsV0FBVyxFQUFFO0FBQ3pDLFlBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQU8sV0FBVyxDQUFDLElBQUksbUNBQUksV0FBVyxDQUFDLElBQUksTUFBQyxDQUFDO0FBQ2hGLFlBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUM1QyxDQUFDLENBQUM7S0FDSjs7O1dBQ0ssZ0JBQUMsTUFBTSxFQUFFO0FBQ2IsVUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3BCLGNBQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQztPQUNqSDs7QUFFRCxVQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVyRCxjQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNNLG1CQUFHO0FBQ1IsY0FBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUvRCxVQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQzs7QUFFOUIsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBdEpVLEdBQUc7OztRQUFILEdBQUcsR0FBSCxHQUFHOzs7QUEwSmhCLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDM0MsTUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFN0MsU0FBTyxBQUFFLFVBQVUsS0FBSyxDQUFDLENBQUMsR0FBSyxLQUFLLEdBQUcsVUFBVSxDQUFDO0NBQ25EOztBQUVELFNBQVMsV0FBVyxHQUFHO0FBQ3JCLE1BQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ2xDLFFBQUcsS0FBSyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDN0IsV0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0o7QUFDRCxTQUFTLG9CQUFvQixHQUFHOzs7Ozs7QUFDOUIsMEJBQW1CLElBQUksQ0FBQyxNQUFNLG1JQUFHO1VBQXhCLE1BQU07O0FBQ2IsVUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQzs7QUFFcEMsU0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNyQyxTQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Q0FDRjs7O0FDMU5ELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVFnQixrQkFBa0I7OztBQUcvQyxJQUFNLEtBQUssR0FBRztBQUNaLG1CQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWUsRUFBRSxDQUFDO0FBQ2xCLHVCQUFxQixFQUFFLENBQUM7Q0FDekIsQ0FBQzs7O0FBR0YsSUFBSSxnQkFBZ0IsR0FBRztBQUNyQixnQkFBYyxFQUFkLGNBQWM7QUFDZCxzQkFBb0IsRUFBcEIsb0JBQW9CO0FBQ3BCLGFBQVcsRUFBWCxXQUFXO0FBQ1gseUJBQXVCLEVBQXZCLHVCQUF1QjtBQUN2QixzQkFBb0IsRUFBcEIsb0JBQW9CO0NBQ3JCLENBQUM7OztBQUdGLElBQUksVUFBVSxHQUFHO0FBQ2YsV0FBUyxFQUFFLGdCQXBCSixZQUFZLENBb0JLLE9BQU87QUFDL0IsYUFBVyxFQUFFLGdCQXJCTixZQUFZLENBcUJPLFNBQVM7QUFDbkMsaUJBQWUsRUFBRSxnQkF0QlYsWUFBWSxDQXNCVyxhQUFhO0FBQzNDLHdCQUFzQixFQUFFLGdCQXZCakIsWUFBWSxDQXVCa0Isb0JBQW9CO0FBQ3pELG9CQUFrQixFQUFFLGdCQXhCYixZQUFZLENBd0JjLGdCQUFnQjtBQUNqRCx3QkFBc0IsRUFBRSxnQkF6QmpCLFlBQVksQ0F5QmtCLG9CQUFvQjtDQUMxRCxDQUFDOzs7O0lBR1csU0FBUztBQUNULFdBREEsU0FBUyxDQUNSLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFOzBCQUQ1QixTQUFTOztBQUVsQiwrQkFGUyxTQUFTLDZDQUVWOztBQUVSLFFBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDL0QsUUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsUUFBSSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsSUFBSSxLQUFLLENBQUM7QUFDL0MsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOzs7QUFHMUIsUUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDM0IsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7R0FDM0I7O1lBZlUsU0FBUzs7ZUFBVCxTQUFTOzs7O1dBaUJFLGdDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDcEMsVUFBSSxhQUFhLEdBQUcsS0FBSyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7O0FBRXhELFVBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O0FBRXpCLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDcEMsTUFBTTs7QUFFTCxZQUFJLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0YsMkJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztPQUM3Qzs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7QUFDbEIsVUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQUNqRCwrQkFBaUIsSUFBSSxDQUFDLFFBQVEsOEhBQUU7Z0JBQXhCLEtBQUs7O0FBQ1gsZ0JBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQscUJBQU8sS0FBSyxDQUFDO2FBQ2Q7V0FDRjs7Ozs7Ozs7Ozs7Ozs7O09BQ0Y7QUFDRCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7V0FDbUIsZ0NBQUc7QUFDckIsYUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7V0FDVyx3QkFBRyxFQUFHOzs7V0FDUixzQkFBRyxFQUFHOzs7V0FDRixpQkFBQyxJQUFJLEVBQUU7QUFDbkIsYUFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7OztTQWhEVSxTQUFTO0dBQVMsUUFBUSxDQUFDLFNBQVM7O1FBQXBDLFNBQVMsR0FBVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNHdEIsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFHO0FBQ3hDLFNBQVMsb0JBQW9CLEdBQUcsRUFBRztBQUNuQyxTQUFTLFdBQVcsR0FBRyxFQUFHO0FBQzFCLFNBQVMsdUJBQXVCLEdBQUcsRUFBRztBQUN0QyxTQUFTLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbEMsTUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV6RCxTQUFPLG1CQUFtQixDQUFDO0NBQzVCOzs7QUNuSkQsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQU9nQixrQkFBa0I7OztBQUcvQyxJQUFJLGdCQUFnQixHQUFHLEVBQUcsQ0FBQzs7O0FBRzNCLElBQUksVUFBVSxHQUFHO0FBQ2YsV0FBUyxFQUFFLGdCQVBKLFlBQVksQ0FPSyxPQUFPO0FBQy9CLGFBQVcsRUFBRSxnQkFSTixZQUFZLENBUU8sU0FBUztBQUNuQyxpQkFBZSxFQUFFLGdCQVRWLFlBQVksQ0FTVyxhQUFhO0FBQzNDLHdCQUFzQixFQUFFLGdCQVZqQixZQUFZLENBVWtCLG9CQUFvQjtBQUN6RCxvQkFBa0IsRUFBRSxnQkFYYixZQUFZLENBV2MsZ0JBQWdCO0FBQ2pELHdCQUFzQixFQUFFLGdCQVpqQixZQUFZLENBWWtCLG9CQUFvQjtDQUMxRCxDQUFDOzs7O0lBR1csU0FBUzs7O0FBRVAsV0FGRixTQUFTLENBRU4sSUFBSSxFQUFXO3NDQUFOLElBQUk7QUFBSixVQUFJOzs7MEJBRmhCLFNBQVM7O0FBR2QsK0JBSEssU0FBUyw4Q0FHTCxJQUFJLEVBQUU7O0FBRWYsUUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOzs7QUFHMUIsUUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDM0IsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUM3QixRQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7R0FFMUI7O1lBbEJRLFNBQVM7O2VBQVQsU0FBUzs7V0FtQkgsMkJBQUc7QUFDZCxhQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDN0I7OztXQUNjLHlCQUFDLE1BQU0sRUFBRTtBQUNwQixnQkFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixVQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7QUFFNUIsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1ksdUJBQUMsSUFBSSxFQUFFOzs7Ozs7QUFDbEIsNkJBQWlCLElBQUksQ0FBQyxRQUFRLDhIQUFFO2NBQXhCLEtBQUs7O0FBQ1gsY0FBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixjQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO0FBQ2xELG1CQUFPLEtBQUssQ0FBQztXQUNkOztBQUVELGNBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEMsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7U0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQTFDUSxTQUFTO0dBQVMsUUFBUSxDQUFDLEtBQUs7O1FBQWhDLFNBQVMsR0FBVCxTQUFTO0FBMkNyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVGLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWFBLGNBQWM7QUFDZCxXQURBLGNBQWMsQ0FDYixNQUFNLEVBQUUsSUFBSSxFQUFHLFdBQVcsRUFBRSxrQkFBa0IsRUFBRTswQkFEakQsY0FBYzs7QUFFdkIsK0JBRlMsY0FBYyw2Q0FFakIsV0FBVyxFQUFFOztBQUVuQixRQUFJLENBQUMsSUFBSSxHQUFHLHlCQUF5QixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7OztBQUdoRCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdkIsUUFBSSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQzs7O0FBRzFDLFFBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUduQyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7QUFFekIsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7OztHQUczQjs7WUFwQlUsY0FBYzs7ZUFBZCxjQUFjOztXQXFCbEIsaUJBQUMsSUFBSSxFQUFFO0FBQ1osVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O1dBRVEsbUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNkLFVBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBRSxDQUFDO0FBQ3pDLGFBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkIsVUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxVQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OztBQUlYLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNXLHNCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFO0FBQ2pDLFVBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDOztBQUV0QyxhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCOzs7OztXQUVXLHdCQUFHO0FBQ2IsYUFBTztBQUNMLFNBQUMsRUFBRSxNQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRTtBQUNuQyxTQUFDLEVBQUUsTUFBTSxDQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7T0FDcEMsQ0FBQztLQUNIOzs7V0FDa0IsK0JBQUc7QUFDbkIsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBRSxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7S0FDOUQ7OztTQW5EVSxjQUFjO0dBQVMsUUFBUSxDQUFDLE1BQU07O1FBQXRDLGNBQWMsR0FBZCxjQUFjOzs7QUNiM0IsWUFBWSxDQUFDOzs7Ozs7OztBQUtiLElBQUksZ0JBQWdCLEdBQUc7QUFDckIsUUFBTSxFQUFOLE1BQU07Q0FDUCxDQUFDOzs7QUFHSyxJQUFJLFlBQVksR0FBRyxDQUFDLFNBQVMsWUFBWSxHQUFHO0FBQ2pELFNBQU87QUFDTCxXQUFPLEVBQUEsaUJBQUMsR0FBRyxFQUFFO0FBQ1QsYUFBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEM7QUFDRCxhQUFTLEVBQUEsbUJBQUMsSUFBSSxFQUFFO0FBQ1osYUFBTyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDO0FBQ0QsaUJBQWEsRUFBQSx1QkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hCLFVBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRztBQUN4RCxlQUFPLElBQUksQ0FBQztPQUNmOztBQUVELGFBQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0Qsd0JBQW9CLEVBQUEsZ0NBQUcsRUFFdEI7QUFDRCxvQkFBZ0IsRUFBQSw0QkFBRyxFQUVsQjtBQUNELHdCQUFvQixFQUFBLGdDQUFHLEVBRXRCO0dBQ0YsQ0FBQztDQUNILENBQUEsRUFBRyxDQUFDOztRQXpCTSxZQUFZLEdBQVosWUFBWTs7QUE0QnZCLFNBQVMsTUFBTSxDQUFDLFVBQVUsRUFBRTs7QUFFMUIsTUFBRyxNQUFNLENBQUMsU0FBUyxFQUFFO0FBQ25CLFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUNyQzs7O0FBR0QsU0FBTyxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksQUFBQyxVQUFVLEdBQUcsQ0FBQyxLQUFNLENBQUMsQ0FBQztDQUNqRTs7O0FDOUNELFlBQVksQ0FBQzs7Ozs7UUFRRyxlQUFlLEdBQWYsZUFBZTs7OzswQkFOZCxhQUFhOzs7O0FBRTlCLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs7OztBQUdwQixTQUFTLGVBQWUsR0FBSTtBQUNqQyxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsT0FBSyxDQUFDLGNBQWMsR0FBRyxVQUFVLGVBQWUsRUFBRTtBQUNoRCxRQUFJLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFHLEtBQUssQ0FBQyx3QkFBd0IsQ0FBRSxTQUFTLENBQUUsZUFBZSxDQUFFLENBQUUsRUFBRztBQUNsRSxhQUFPLEtBQUssQ0FBQztLQUNkOztBQUVELGVBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhELG1CQUFlLENBQUMsSUFBSSxDQUFFLFdBQVcsQ0FBRSxDQUFDOztBQUVwQyxXQUFPLFdBQVcsQ0FBQztHQUNwQixDQUFDO0FBQ0YsT0FBSyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsV0FBVyxFQUFFLEVBRWhELENBQUM7QUFDRixPQUFLLENBQUMsa0JBQWtCLEdBQUcsWUFBWTtBQUNyQyxXQUFPLGVBQWUsQ0FBQztHQUN4QixDQUFDO0FBQ0YsT0FBSyxDQUFDLHdCQUF3QixHQUFHLFVBQVUsYUFBYSxFQUFFO0FBQ3hELFdBQVMsaUJBQWlCLENBQUMsT0FBTyxDQUFFLGFBQWEsQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFHO0dBQzVELENBQUM7QUFDRixXQUFTLFNBQVMsQ0FBRSxlQUFlLEVBQUU7QUFDbkMsV0FBUyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFHO0dBQzlDLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7Q0FDZDs7O0FDdENELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7MkJBRWtCLGlCQUFpQjs7SUFFbkMsZUFBZTtXQUFmLGVBQWU7MEJBQWYsZUFBZTs7Ozs7OztZQUFmLGVBQWU7O2VBQWYsZUFBZTs7V0FDakIsbUJBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO0FBQ3BELGlDQUZTLGVBQWUsNkNBRU4sTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFOztBQUU5RCxVQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO0tBQ3BDOzs7U0FMVSxlQUFlO2dCQUZuQixjQUFjOztRQUVWLGVBQWUsR0FBZixlQUFlOzs7QUNKNUIsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzsyQkFFa0IsaUJBQWlCOztJQUVuQyxZQUFZO1dBQVosWUFBWTswQkFBWixZQUFZOzs7Ozs7O1lBQVosWUFBWTs7ZUFBWixZQUFZOztXQUNkLG1CQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTtBQUNwRCxpQ0FGUyxZQUFZLDZDQUVILE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTs7QUFFOUQsVUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQztLQUNsQzs7O1NBTFUsWUFBWTtnQkFGaEIsY0FBYzs7UUFFVixZQUFZLEdBQVosWUFBWTs7Ozs7Ozs7QUNKbEIsSUFBSSxRQUFRLEdBQUc7QUFDcEIsSUFBRSxFQUFFLDBCQUEwQjtBQUM5QixNQUFJLEVBQUUsQ0FBQztBQUNQLFNBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUMzQixtQkFBaUIsRUFBRTtBQUNqQixPQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7R0FDbEI7Q0FDRixDQUFDO1FBUFMsUUFBUSxHQUFSLFFBQVE7Ozs7Ozs7O0FDQVosSUFBSSxPQUFPLEdBQUc7QUFDbkIsU0FBTSxFQUFFLDBCQUEwQjtBQUNsQyxPQUFJLEVBQUUsQ0FBQztBQUNQLFNBQU0sRUFBRSxDQUFDO0FBQ1AsVUFBSSxFQUFFLFdBQVc7QUFDakIsaUJBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixVQUFJLEVBQUUsY0FBYztBQUNwQixhQUFPLEVBQUUsWUFBWTtBQUNyQixZQUFNLEVBQUUsQ0FBQztBQUNQLGFBQUksRUFBRSxXQUFXO0FBQ2pCLG9CQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsYUFBSSxFQUFFLGtCQUFrQjtBQUN4QixpQkFBUSxFQUFFLENBQUM7QUFDVCx5QkFBYSxFQUFFLEtBQUs7VUFDckIsQ0FBQztBQUNGLGdCQUFPLEVBQUU7QUFDUCxpQkFBSyxFQUFFLElBQUk7VUFDWjtBQUNELHFCQUFZLEVBQUUsQ0FBQztBQUNiLGdCQUFJLEVBQUUsaUJBQWlCO0FBQ3ZCLGdCQUFJLEVBQUUsYUFBYTtBQUNuQix5QkFBYSxFQUFFLGFBQWE7QUFDNUIsbUJBQU8sRUFBRSxDQUFDO0FBQ1Asd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxPQUFPO0FBQ2Qsb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUFDO0FBQ0Msd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxPQUFPO0FBQ2Qsb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsTUFBTTtnQkFDWjtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsTUFBTTtnQkFDWjtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsSUFBSTtBQUNSLHFCQUFHLEVBQUMsSUFBSTtnQkFDVjtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsSUFBSTtnQkFDVjtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxPQUFPO0FBQ2Qsb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsS0FBSztnQkFDWDtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsTUFBTTtnQkFDWjtBQUNELHFCQUFNLEVBQUUsRUFBRTtBQUNWLDZCQUFjLEVBQUMsR0FBRzthQUNwQixFQUNEO0FBQ0csd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBQyxRQUFRO0FBQ2Ysb0JBQUssRUFBQywwQkFBMEI7QUFDaEMsc0JBQU8sRUFBQztBQUNMLHFCQUFHLEVBQUMsR0FBRztBQUNQLHFCQUFHLEVBQUMsTUFBTTtnQkFDWjtBQUNELHFCQUFNLEVBQUUsRUFBRTthQUNaLENBQUM7VUFDSCxDQUFDO09BQ0gsRUFBQztBQUNBLGVBQU0sRUFBRSxXQUFXO0FBQ25CLGdCQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDL0IsZUFBTSxFQUFFLFdBQVc7QUFDbkIsa0JBQVMsRUFBRTtBQUNULG1CQUFPLEVBQUUsT0FBTztVQUNqQjtBQUNELHVCQUFjLEVBQUUsQ0FBQztBQUNmLGtCQUFNLEVBQUUsY0FBYztBQUN0QixrQkFBTSxFQUFFLE1BQU07QUFDZCwyQkFBZSxFQUFFLE1BQU07QUFDdkIscUJBQVMsRUFBRSxDQUFDO0FBQ1Ysd0JBQVMsRUFBQyxDQUFDO0FBQ1gscUJBQU0sRUFBRSxpQkFBaUI7QUFDekIsc0JBQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNqQyxxQkFBTSxFQUFFO0FBQ04sa0NBQWdCLEVBQUUsTUFBTTtnQkFDekI7QUFDRCw2QkFBYyxFQUFDLEdBQUc7YUFDbkIsQ0FBQztVQUNILENBQUM7T0FDSCxDQUFDO0lBQ0gsQ0FBQztDQUNILENBQUM7UUEzTFMsT0FBTyxHQUFQLE9BQU87Ozs7Ozs7O0FDQVgsSUFBSSxRQUFRLEdBQUc7QUFDcEIsZUFBYSxFQUFFO0FBQ2IsYUFBUyxFQUFDO0FBQ1IsZUFBUyxFQUFDO0FBQ1IsbUJBQVcsRUFBQyxFQUFFO0FBQ2Qsb0JBQVksRUFBQyxFQUFFO09BQ2hCO0tBQ0Y7QUFDRCxpQkFBYSxFQUFDO0FBQ1osY0FBUSxFQUNSLENBQUMsZ0NBQWdDLENBQUM7QUFDbEMsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ2hGO0FBQ0QsaUJBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7S0FDcEI7QUFDRCxhQUFTLEVBQUM7QUFDUixjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDMUg7QUFDRCxpQkFBVyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQztLQUNwQjtBQUNELFlBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLDZCQUE2QixDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQztBQUM5RixnQkFBWSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsdUNBQXVDLEVBQUMsbUNBQW1DLEVBQUMsc0NBQXNDLENBQUM7QUFDN0gsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQ3REO0tBQ0Y7QUFDRCxjQUFVLEVBQUM7QUFDVCxjQUFRLEVBQUMsQ0FBQyx3Q0FBd0MsQ0FBQztBQUNuRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVCO0tBQ0Y7QUFDRCxXQUFPLEVBQUMsRUFBRTtBQUNWLFVBQU0sRUFBQztBQUNMLGNBQVEsRUFBQyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3ZELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNVI7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENB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QWEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLDRDQUE0QyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsMEJBQTBCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQywwQkFBMEIsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnRkFBZ0YsRUFBQyxTQUFTLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0VBQWdFLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDOXpJLENBQUM7UUFwSFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL01hcEZhY3RvcnkuanMnO1xuXG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhLmpzJztcblxuLypcbjEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbllvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuaXMgYW5vdGhlciBjbGFzcyAvIG1vZHVsZSB0aGF0IGhhbmRsZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCB5b3UgZGVmaW5lIGEgZ29vZCBzZXQgb2YgcHJpbmNpcGxlIGhvdyBpdCdzIGRvbmUuIERhdGEgaW4gdGhpczpcblwie1xuICBcIm9ialR5cGVcIjoyLFxuICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxufVwiXG5XaGF0IGRvIHdlIGRvIHdpdGggdGhlIF9pZCBhbmQgc2hvdWxkIHRoYXQgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgZGF0YSwgd2hlbiB3ZSBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0cy5cblxuQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbi8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbmRlc2NyaWJlKFwiYmFzaWMgbWFwIC0gd2l0aG91dCBwbHVnaW5zXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIC8qbGV0IG1hcERhdGEgPSB7XG4gICAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICAgIHBsdWdpbnNUb0FjdGl2YXRlOiBmYWxzZSxcbiAgICBzdGFnZXM6IFt7XG4gICAgICB0eXBlOiBcIk1hcF9zdGFnZVwiLFxuICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICAgIGxheWVyczogW3tcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDEsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0se1xuICAgICAgICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIG5hbWU6IFwidW5pdExheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdW5pdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ1bml0XCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcbiAgKi9cblxuXG4gIGRlc2NyaWJlKFwiPT4gbWFrZSBtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1hcCA9IGNyZWF0ZU1hcChnYW1lRGF0YSwgbWFwRGF0YSwgdHlwZURhdGEpO1xuXG4gICAgaXQoXCI9PiBleGlzdHNcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXApLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiBzdGFnZSBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5uYW1lID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikubmFtZSAgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IGxheWVyIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldExheWVyTmFtZWQoXCJ1bml0TGF5ZXJcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHRlcnJhaW4gcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KE51bWJlciggbWFwLmdldExheWVyTmFtZWQoXCJ0ZXJyYWluQmFzZUxheWVyXCIpLmNoaWxkcmVuWzFdLnkgKSA9PT0gNDgwKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldExheWVyTmFtZWQoXCJ0ZXJyYWluQmFzZUxheWVyXCIpLmNoaWxkcmVuLmxlbmd0aCA+IDEpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHVuaXQgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KE51bWJlciggbWFwLmdldExheWVyTmFtZWQoXCJ1bml0TGF5ZXJcIikuY2hpbGRyZW5bMF0ueCApID09PSA2MCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdW5pdCBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgbWFwLmluaXQoIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICBmdW5jdGlvbiB0aWNrRG9uZUZ1bmModGlja0RvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG5cblxuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1IDEuMC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqIFxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4vKmdsb2JhbCB1bmVzY2FwZSwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSkge1xuICAgICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpLFxuICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KSB7XG4gICAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sX21kNSh4LCBsZW4pIHtcbiAgICAgICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgICAgICAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAobGVuICUgMzIpO1xuICAgICAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XG5cbiAgICAgICAgdmFyIGksIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQsXG4gICAgICAgICAgICBhID0gIDE3MzI1ODQxOTMsXG4gICAgICAgICAgICBiID0gLTI3MTczMzg3OSxcbiAgICAgICAgICAgIGMgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICAgIGQgPSAgMjcxNzMzODc4O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgb2xkYSA9IGE7XG4gICAgICAgICAgICBvbGRiID0gYjtcbiAgICAgICAgICAgIG9sZGMgPSBjO1xuICAgICAgICAgICAgb2xkZCA9IGQ7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNywgLTY4MDg3NjkzNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE3LCAgNjA2MTA1ODE5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA3LCAtMTc2NDE4ODk3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDcsICAxNzcwMDM1NDE2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDcsICAxODA0NjAzNjgyKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNSwgLTE2NTc5NjUxMCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICA2XSwgIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgIDY0MzcxNzcxMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaV0sICAgICAgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCAgOSwgIDM4MDE2MDgzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA1LCAgNTY4NDQ2NDM4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICAyXSwgIDksIC01MTQwMzc4NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTQsICAxNzM1MzI4NDczKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDQsIC0zNzg1NTgpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDQsICA2ODEyNzkxNzQpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2ldLCAgICAgIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDQsIC02NDAzNjQ0ODcpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICAyXSwgMjMsIC05OTUzMzg2NTEpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA2LCAgMTg3MzMxMzM1OSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG5cbiAgICAgICAgICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICAgICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICAgICAgICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICAgICAgICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2EsIGIsIGMsIGRdO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmwycnN0cihpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogMzI7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDg7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhGRikgPDwgKGkgJSAzMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX21kNShzKSB7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUocnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX2htYWNfbWQ1KGtleSwgZGF0YSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGJrZXkgPSByc3RyMmJpbmwoa2V5KSxcbiAgICAgICAgICAgIGlwYWQgPSBbXSxcbiAgICAgICAgICAgIG9wYWQgPSBbXSxcbiAgICAgICAgICAgIGhhc2g7XG4gICAgICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgICBia2V5ID0gYmlubF9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgICAgICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaCA9IGJpbmxfbWQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgICAgIHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxuICAgICAgICAgICAgb3V0cHV0ID0gJycsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXG4gICAgICAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxuICAgICovXG4gICAgZnVuY3Rpb24gc3RyMnJzdHJfdXRmOChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xuICAgICovXG4gICAgZnVuY3Rpb24gcmF3X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyX21kNShzdHIycnN0cl91dGY4KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfbWQ1KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmF3X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfaG1hY19tZDUoc3RyMnJzdHJfdXRmOChrKSwgc3RyMnJzdHJfdXRmOChkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfaG1hY19tZDUoaywgZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoZXhfbWQ1KHN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmF3X21kNShzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWQ1O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkLm1kNSA9IG1kNTtcbiAgICB9XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09IDNyZCBwYXJ0eSBsaWJyYXJ5IGltcG9ydHMgPT09PT0gKi9cbi8vaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSAnc3lzdGVtanMnO1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwJztcbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4uL21hcC9jb3JlL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuLi9tYXAvY29yZS9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgT2JqZWN0c190ZXJyYWluIH0gZnJvbSAnLi4vbWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluJztcbmltcG9ydCB7IE9iamVjdHNfdW5pdCB9IGZyb20gJy4uL21hcC9vYmplY3RzL09iamVjdHNfdW5pdCc7XG5pbXBvcnQgeyBzcHJpdGVzaGVldExpc3QgfSBmcm9tICcuLi9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QnO1xubGV0IGFsbFNwcml0ZXNoZWV0cyA9IHNwcml0ZXNoZWV0TGlzdCgpO1xuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4uL21hcC9jb3JlL21hcF92YWxpZGF0b3JzXCI7XG5cbmxldCBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgTWFwX3N0YWdlLFxuICBNYXBfbGF5ZXIsXG4gIE9iamVjdHNfdGVycmFpbixcbiAgT2JqZWN0c191bml0XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gICAgX2dldFN0YWdlSW5kZXhcbn07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICAgIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXhcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qXG5AYXJndW1lbnQge2JpZ2FzcyBPYmplY3R9IG1hcERhdGEgLSBob2xkcyBhbGwgdGhlIHN0YWdlLCBsYXllciBhbmQgb2JqZWN0IGRhdGEgbmVlZGVkIHRvIGNvbnN0cnVjdCBhIGZ1bGwgbWFwLlxuQ29vcmRpbmF0ZXMgYXJlIGFsd2F5cyBkZWZhdWx0ZWQgdG8gMCwwIGlmIG5vbmUgYXJlIGdpdmVuLlxue1xuICBtYXBTaXplOiBjcmVhdGVqcy5SZWN0YW5nbGUsXG4gIHBsdWdpbnNUb0FjdGl2YXRlOiBbXG4gICAgXCJtYXAvbW92ZS9tYXBfbW92ZVwiLFxuICAgIFwibWFwL0ZPVy9tYXBfRk9XXCJcbiAgXSxcbiAgc3RhZ2VzOiBbe1xuICAgIHR5cGU6IFwibWFwL2NvcmUvTWFwX1N0YWdlXCIsXG4gICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgZWxlbWVudDogXCIjY2FudmFzVGVycmFpblwiLFxuICAgIGxheWVyczogW3tcbiAgICAgIHR5cGU6IFwibWFwL2xheWVycy9NYXBfbGF5ZXJfdGVycmFpblwiLFxuICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICB9LFxuICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV0sXG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpblwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dXG4gICAgICB9XSxcbiAgICAgIHR5cGU6IFwibWFwL2xheWVycy9NYXBfbGF5ZXJfdGVycmFpblwiLFxuICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3VuaXRcIixcbiAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiSW5mYW50cnkgMVwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9XVxuICB9XVxufVxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChnYW1lRGF0YUFyZywgbWFwRGF0YUFyZywgdHlwZURhdGFBcmcpIHtcbiAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICBsZXQgbWFwRGF0YSA9ICh0eXBlb2YgbWFwRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKG1hcERhdGFBcmcpIDogbWFwRGF0YUFyZztcbiAgbGV0IHR5cGVEYXRhID0gKHR5cGVvZiB0eXBlRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHR5cGVEYXRhQXJnKSA6IHR5cGVEYXRhQXJnO1xuICBsZXQgZ2FtZURhdGEgPSAodHlwZW9mIGdhbWVEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZ2FtZURhdGFBcmcpIDogZ2FtZURhdGFBcmc7XG4gIGxldCBtYXAgPSBuZXcgTWFwKHsgbWFwU2l6ZTogZ2FtZURhdGEubWFwU2l6ZSB9KTtcblxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zICovXG4gIC8qIFRoZSBzeXN0ZW0gZG9lcyBub3Qgd29yayA6KFxuICBpZihnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAgJiYgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLmxlbmd0aCA+IDApIHtcbiAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICBnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAubWFwKHggPT4gU3lzdGVtLmltcG9ydCh4KSkpXG4gICAgICAudGhlbigoW21vZHVsZTEsIG1vZHVsZTIsIG1vZHVsZTNdKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcGx1Z2lucyBsb2FkZWRcIik7XG4gICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS5zdGFjayk7XG4gICAgICB9KTtcbiAgfVxuICAqL1xuXG4gIC8qIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZ2l2ZW4gbWFwIGRhdGEgYW5kIGNyZWF0ZSBvYmplY3RzIGFjY29yZGluZ2x5ICovXG4gIG1hcERhdGEuc3RhZ2VzLmZvckVhY2goIHN0YWdlRGF0YSA9PiB7XG4gICAgZGVidWdnZXI7XG4gICAgbGV0IHRoaXNTdGFnZSA9IG5ldyBmdW5jdGlvbnNJbk9ialtzdGFnZURhdGEudHlwZV0oc3RhZ2VEYXRhLm5hbWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHN0YWdlRGF0YS5lbGVtZW50ICkgKTtcblxuICAgIG1hcC5hZGRTdGFnZSggdGhpc1N0YWdlICk7XG5cbiAgICBzdGFnZURhdGEubGF5ZXJzLmZvckVhY2goIGxheWVyRGF0YSA9PiB7XG4gICAgICBsZXQgdGhpc0xheWVyO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzTGF5ZXIgPSBuZXcgZnVuY3Rpb25zSW5PYmpbbGF5ZXJEYXRhLnR5cGVdKGxheWVyRGF0YS5uYW1lLCBsYXllckRhdGEudHlwZSwgZmFsc2UpO1xuICAgICAgICB0aGlzU3RhZ2UuYWRkQ2hpbGQoIHRoaXNMYXllciApO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbTpcIiwgbGF5ZXJEYXRhLnR5cGUsIGUuc3RhY2spXG4gICAgICB9XG5cbiAgICAgIGxheWVyRGF0YS5vYmplY3RHcm91cHMuZm9yRWFjaCggb2JqZWN0R3JvdXAgPT4ge1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXQ7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldFR5cGUgPSBvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhO1xuXG4gICAgICAgIGlmKCFzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggc3ByaXRlc2hlZXRUeXBlLWRhdGFcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgICAgbGV0IHNwcml0ZXNoZWV0RGF0YSA9IHR5cGVEYXRhLmdyYXBoaWNEYXRhW3Nwcml0ZXNoZWV0VHlwZV07XG5cbiAgICAgICAgICBzcHJpdGVzaGVldCA9IGFsbFNwcml0ZXNoZWV0cy5hZGRTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XG4gICAgICAgICAgaWYoIW9ialR5cGVEYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGN1cnJlbnRGcmFtZU51bWJlciA9IG9ialR5cGVEYXRhLmltYWdlO1xuXG4gICAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZCwgb2JqZWN0LmRhdGEsIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIgKSApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gbWFwO1xuXG4vKlxuICBDcmVhdGVUZXJyYWluU3RhZ2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2Jhc2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3RlcnJhaW5cbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2RpdGhlclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcHJldHRpZmllclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcmVzb3VyY2VcbiAgQ3JlYXRlVW5pdFN0YWdlXG4gICAgX0NyZWF0ZVVuaXRMYXllcl9Vbml0XG4gICAgX0NyZWF0ZVVuaXRMYXllcl9DaXR5XG4gIENyZWF0ZUZPV1N0YWdlXG4gIENyZWF0ZURhdGFTdGFnZVxuICBDcmVhdGVVSVN0YWdlXG4gICAgX0NyZWF0ZVVJTGF5ZXJfYXJyb3dcbiAgICBfQ3JlYXRlVUlMYXllcl9zZWxlY3Rpb25cbiovXG5cbiAgZnVuY3Rpb24gX2NhbGN1bGF0ZU1hcFNpemUoKSB7XG5cbiAgfVxufVxuXG4vKiA9PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KCkge30iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG4vL3ZhciBTeXN0ZW0gPSByZXF1aXJlKCdlczYtbW9kdWxlLWxvYWRlcicpLlN5c3RlbTtcbi8vaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSAnZXM2LW1vZHVsZS1sb2FkZXInO1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4vbWFwX3ZhbGlkYXRvcnNcIjtcblxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICAgIF9nZXRTdGFnZUluZGV4XG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICAgIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gICAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICAgIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gICAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzLFxuICAgIF9pc19jYW52YXM6IHZhbGlkYXRvck1vZC5pc0NhbnZhc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiB7XG4gKiAgbWFwU2l6ZToge1xuICogICAgeDogTnVtYmVyLFxuICogICAgeTogTnVtYmVyXG4gKiB9XG4qL1xuZXhwb3J0IGNsYXNzIE1hcCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0YWdlcyA9IFtdO1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICAgIHRoaXMubWFwU2l6ZSA9IChvcHRpb25zICYmIG9wdGlvbnMubWFwU2l6ZSkgfHwgeyB4OjAsIHk6MCB9O1xuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gZmFsc2U7XG4gIH1cbiAgLyogb3B0aW9ucy5tYXBTaXplID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSovXG4gIGluaXQodGlja0NCLCBwbHVnaW5zKSB7XG4gICAgaWYocGx1Z2lucykge1xuICAgICAgdGhpcy5hY3RpdmF0ZVBsdWdpbnMocGx1Z2lucyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd01hcCgpO1xuICAgIHRoaXMudGlja09uKHRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkcmF3TWFwKCkge1xuICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgIGlmKHN0YWdlLmRyYXdUaGlzQ2hpbGQpIHtcbiAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgIHN0YWdlLmRyYXdUaGlzQ2hpbGQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldFNpemUoICkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICBzZXRTaXplKHgxLCB5MSkge1xuICAgIHRoaXMubWFwU2l6ZSA9IHsgeDp4MSwgeTp5MSB9O1xuXG4gICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBmb3IobGV0IHN0YWdlIG9mIHRoaXMuc3RhZ2VzKSB7XG4gICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgIGlmKHN0YWdlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBzdGFnZTtcbiAgICAgIH1cblxuICAgICAgaWYoY2hpbGQgPSBzdGFnZS5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgYWRkU3RhZ2Uoc3RhZ2UpIHtcbiAgICBsZXQgc3RhZ2VzID0gW107XG5cbiAgICBpZighIChzdGFnZSBpbnN0YW5jZW9mIEFycmF5KSApIHtcbiAgICAgIHN0YWdlcy5wdXNoKHN0YWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWdlcy5wdXNoKC4uLnN0YWdlcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXBsYWNlU3RhZ2UobmV3Q2FudmFzLCBvbGRDYW52YXMpIHtcbiAgICBsZXQgb2xkSW5kZXggPSBwcml2YXRlRnVuY3Rpb25zLl9nZXRTdGFnZUluZGV4KHRoaXMuc3RhZ2VzLCBvbGRDYW52YXMpO1xuICAgIHRoaXMuc3RhZ2VzW29sZEluZGV4XSA9IG5ld0NhbnZhcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZExheWVyKGxheWVyLCBzdGFnZSkge1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVMYXllcihsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVwbGFjZUxheWVyKG5ld0xheWVyLCBvbGRMYXllcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdG9nZ2xlTGF5ZXIobGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgIGxldCB0aGVMYXllcjtcblxuICAgIGZvcihsZXQgc3RhZ2Ugb2YgdGhpcy5zdGFnZXMpIHtcbiAgICAgIGlmKHRoZUxheWVyID0gc3RhZ2UuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGhlTGF5ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjYWNoZU1hcCgpIHtcbiAgICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgICBpZihzdGFnZS5jYWNoZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICBjYWNoZUxheWVycygpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldE9iamVjdHNVbmRlck1hcFBvaW50KCkge1xuICAgICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICBvYmplY3RzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBvYmplY3RzO1xuICB9XG4gIGFjdGl2YXRlRnVsbFNpemUoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgX3NldFN0YWdlc1RvRnVsbFNpemUuYmluZCh0aGlzKSk7XG4gIH1cbiAgZGVhY3RpdmF0ZUZ1bGxTaXplKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3NldFN0YWdlc1RvRnVsbFNpemUuYmluZCh0aGlzKSk7XG4gIH1cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyBmb3IgdGhlIG1hcC4gTXVzdCBiZSBpbiBhcnJheSBmb3JtYXQ6XG4gIFt7XG4gICAgbmFtZTogZnVuY3Rpb24gbmFtZSxcbiAgICBhcmdzOiBbXG4gICAgICBGaXJzdCBhcmd1bWVudCxcbiAgICAgIHNlY29uZCBhcmd1bWVudCxcbiAgICAgIC4uLlxuICAgIF1cblxuICAgIFBhcmFtZXRlciBwbHVnaW5Ub1VzZS5mdW5jLm5hbWUgaXMgcGFydCBvZiBFUzYgc3RhbmRhcmQgdG8gZ2V0IGZ1bmN0aW9uIG5hbWUuXG4gIH1dICovXG4gIGFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zQXJyYXkpIHtcbiAgICBwbHVnaW5zQXJyYXkuZm9yRWFjaChmdW5jdGlvbihwbHVnaW5Ub1VzZSkge1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLmZ1bmMubmFtZV0gPSBuZXcgcGx1Z2luVG9Vc2UuZnVuYyguLi5wbHVnaW5Ub1VzZS5hcmdzKTtcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5mdW5jLm5hbWVdLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuICB0aWNrT24odGlja0NCKSB7XG4gICAgaWYodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IF9oYW5kbGVUaWNrLmJpbmQodGhpcyk7XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGlja09mZigpIHtcbiAgICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KHN0YWdlcywgc3RhZ2VUb0ZpbmQpIHtcbiAgdmFyIGZvdW5kSW5kZXggPSBzdGFnZXMuaW5kZXhPZihzdGFnZVRvRmluZCk7XG5cbiAgcmV0dXJuICggZm91bmRJbmRleCA9PT0gLTEgKSA/IGZhbHNlIDogZm91bmRJbmRleDtcbn1cbi8qKiA9PSBDb250ZXh0IHNlbnNpdGl2ZSwgeW91IG5lZWQgdG8gYmluZCwgY2FsbCBvciBhcHBseSB0aGVzZSA9PSAqL1xuZnVuY3Rpb24gX2hhbmRsZVRpY2soKSB7XG4gIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICBpZihzdGFnZS51cGRhdGVTdGFnZSA9PT0gdHJ1ZSkge1xuICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIF9zZXRTdGFnZXNUb0Z1bGxTaXplKCkge1xuICBmb3IoIGxldCBjYW52YXMgb2YgdGhpcy5zdGFnZXMgKSB7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcblxuICAgIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4vKiA9PT09PSBDb25zdGFudHMgPT09PT0gKi9cbmNvbnN0IFRZUEVTID0ge1xuICBqdXN0U3ViQ29udGFpbmVyczogMSxcbiAgbm9TdWJDb250YWluZXJzOiAyLFxuICBpbWFnZXNJblN1YkNvbnRhaW5lcnM6IDNcbn07XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gIF9nZXRTdGFnZUluZGV4LFxuICBfY3JlYXRlU3ViQ29udGFpbmVycyxcbiAgX2NhY2hlTGF5ZXIsXG4gIF9zZXRDb3JyZWN0U3ViQ29udGFpbmVyLFxuICBfZ2V0Q29ycmVjdENvbnRhaW5lclxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gIF9pc19ib29sZWFuOiB2YWxpZGF0b3JNb2QuaXNCb29sZWFuLFxuICBfaXNfY29vcmRpbmF0ZXM6IHZhbGlkYXRvck1vZC5pc0Nvb3JkaW5hdGVzLFxuICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gIF9pc19Vc2VPZlN1YkNvbnRhaW5lcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViQ29udGFpbmVyc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9sYXllciBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6IHR5cGU7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICAvKiBvdmVybG9hZGVkIGluaGVyaXRlZCBtZXRob2QgKi9cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgQ29udGFpbmVyIGRpcmVjdGx5LiBXZXRoZXIgaXQgaXMgQ29udGFpbmVyIG9yIEJpdG1hcCBldGMuICovXG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgY29ycmVjdCBzdWJDb250YWluZXIuIEZvciBiZXR0ZXIgbG9naWMgYW5kIHBlcmZvcm1hbmNlICovXG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxuICBzdGF0aWMgZ2V0VHlwZShuYW1lKSB7XG4gICAgcmV0dXJuIFRZUEVTW25hbWVdO1xuICB9XG59XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cbi8qXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvZXh0ZW5kJztcbmltcG9ydCBwcm9tb3RlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvcHJvbW90ZSc7XG5pbXBvcnQgU3ByaXRlQ29udGFpbmVyIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlQ29udGFpbmVyJztcblxuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVzaGVldExheWVyIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgc3ByaXRlc2hlZXQpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6IHR5cGU7XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVN1YmNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGFkZENoaWxkVG9TdWJDb250YWluZXIob2JqZWN0LCBpbmRleCkge1xuICAgIGxldCBmdW5jdGlvblRvVXNlID0gaW5kZXggPyBcIl9hZGRDaGlsZEF0XCIgOiBcIl9hZGRDaGlsZFwiO1xuXG4gICAgaWYoIXRoaXMudXNlU3ViY29udGFpbmVycykge1xuICAgICAgdGhpc1tmdW5jdGlvblRvVXNlXShvYmplY3QsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSBwcml2YXRlRnVuY3Rpb25zLl9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnVzZVN1YmNvbnRhaW5lcnM7XG4gIH1cbiAgaXNTZXRWaXNpYmxlKCkgeyB9XG4gIHNldFZpc2libGUoKSB7IH1cbn1cbiovXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgobWFwLCBjYW52YXMpIHsgfVxuZnVuY3Rpb24gX2NyZWF0ZVN1YkNvbnRhaW5lcnMoKSB7IH1cbmZ1bmN0aW9uIF9jYWNoZUxheWVyKCkgeyB9XG5mdW5jdGlvbiBfc2V0Q29ycmVjdFN1YkNvbnRhaW5lcigpIHsgfVxuZnVuY3Rpb24gX2dldENvcnJlY3RDb250YWluZXIoeCwgeSkge1xuICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHRoaXMuZ2V0T2JqZWN0VW5kZXJQb2ludCh4LCB5KTtcblxuICByZXR1cm4gY29ycmVjdFN1YkNvbnRhaW5lcjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSB2YWxpZGF0b3IgbW9kdWxlXG4qL1xuXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0geyB9O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX3N0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3RhZ2Uge1xuICAvKiBUYWtlcyB0aGUgY2FudmFzIGVsZW1lbnQgYXMgYXJndW1lbnQgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nIEFORCBnZXR0aW5nIGNoaWxkcmVuIGJ5IG5hbWUuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAgICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgICAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dG9DbGVhciA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgICB9XG4gICAgZ2V0Q2FjaGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICAgIH1cbiAgICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgICAgIHZhbGlkYXRvcnMuX2lzX2Jvb2xlYW4oc3RhdHVzKTtcbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICAgIGZvcihsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgICAgaWYobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGlsZCA9IGxheWVyLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cblxuXG4vKlxuXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuaW1wb3J0IFNwcml0ZVN0YWdlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlU3RhZ2UnO1xuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVTdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZVN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGlzIGNsYXNzIG5lZWRzIHRvIGJlIGdvbmUgdGhyb3VnaCBjYXJlZnVsbHksIGl0IGhhcyBiZWVuIGNvcGllZCBmcm9tIGFuIG9sZGVyIHZlcnNpb24gc3RyYWlnaHQuIFRoZSB2ZXJzaW9uIHdhcyBFUzVcbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YVxuKi9cblxuZXhwb3J0IGNsYXNzIE9iamVjdHNfc3ByaXRlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcikge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcblxuICAgIHRoaXMubmFtZSA9IFwiZ2VuZXJhbCBPYmplY3RzX3Nwcml0ZV9cIiArIHRoaXMuaWQ7XG5cbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IGN1cnJlbnRGcmFtZU51bWJlcjtcblxuICAgIC8qIEV4ZWN1dGUgaW5pdGlhbCBkcmF3IGZ1bmN0aW9uICovXG4gICAgdGhpcy5pbm5lckRyYXcoY29vcmRzLngsIGNvb3Jkcy55KTtcblxuICAgIC8qIG9wdGltaXphdGlvbnMgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIFNob3VsZCBiZSBlbmFibGVkLCBpZiB0aGUgbGF5ZXIgaXMgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLiBMaWtlIHVuaXQgbGF5ZXIuIFRoaXMgd2F5IHdlIGNhbiB1c2UgY3Vyc29yIHBvaW50ZXIgZXRjLlxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gRk9SIERFQlVHR0lORyBBTkQgU0VFSU5HIFRIQVQgTElTVEVORVJTIEFSRSBBVFRBQ0hFRDpcbiAgICAvL3RoaXMud2lsbFRyaWdnZXJcbiAgfVxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyogRHJhd2luZyB0aGUgb2JqZWN0IHdpdGggY3JlYXRlanMtbWV0aG9kcyAqL1xuICBpbm5lckRyYXcoeCwgeSkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoIHRoaXMuY3VyckZyYW1lTnVtYmVyICk7XG4gICAgY29uc29sZS5sb2coXCJIQUFBXCIpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIC8qIFRoZSBtb3VzZSBjaGVjayBoYXMgYmVlbiBlbmFibGVkIG9uIGhpZ2hlciB0aWVyLCBzbyBubyBuZWVkIGZvciB0aGlzXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTsgKi9cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZU51bWJlcikge1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gbmV3RnJhbWVOdW1iZXI7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XG4gIH1cbiAgLyogRHVubm8gaWYgd2UgbmVlZCB0aGlzIGFuZCBzbyBvbi4gVGhpcyB3YXMgaW4gdGhlIG9sZCB2ZXJzaW9uICovXG4gIGdsb2JhbENvb3JkcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogTnVtYmVyKCB0aGlzLnggKyB0aGlzLnBhcmVudC54ICksXG4gICAgICB5OiBOdW1iZXIoIHRoaXMueSArIHRoaXMucGFyZW50LnkgKVxuICAgIH07XG4gIH1cbiAgZ2V0Qm91bmRzRnJvbUZyYW1lcygpIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU2hlZXQuZ2V0RnJhbWVCb3VuZHMoIHRoaXMuY3VycmVudEZyYW1lICk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBIb2xkIGRpZmZlcmVudCB2YWxpZGF0b3IgZnVuY3Rpb25zIHRvIGJlIHVzZWQgaW4gbW9kdWxlcyAqL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICBfaXNJbnRcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBsZXQgdmFsaWRhdG9yTW9kID0gKGZ1bmN0aW9uIHZhbGlkYXRvck1vZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0luZGV4KGludCkge1xuICAgICAgICByZXR1cm4gcHJpdmF0ZUZ1bmN0aW9ucy5pc0ludChpbnQpO1xuICAgIH0sXG4gICAgaXNCb29sZWFuKGJvb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvb2wgPT09IEJvb2xlYW4oYm9vbCk7XG4gICAgfSxcbiAgICBpc0Nvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICAgICAgaWYocHJpdmF0ZUZ1bmN0aW9ucy5pc0ludCh4KSAmJiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KHkpICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBpc1N1YkNvbnRhaW5lckFtb3VudCgpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkxheWVycygpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkNvbnRhaW5lcnMoKSB7XG5cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9pc0ludCh3YW5uYWJlSW50KSB7XG4gIC8qIEVTNiAqL1xuICBpZihOdW1iZXIuaXNJbnRlZ2VyKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIod2FubmFiZUludCk7XG4gIH1cblxuICAvKiBFUzUgKi9cbiAgcmV0dXJuIHR5cGVvZiB3YW5uYWJlSW50ID09PSAnbnVtYmVyJyAmJiAod2FubmFiZUludCAlIDEpID09PSAwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYoc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzKCBfY3JlYXRlSUQoIHNwcml0ZXNoZWV0RGF0YSApICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxuICAgIGFsbFNwcml0ZXNoZWV0cy5wdXNoKCBzcHJpdGVTaGVldCApO1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldCkge1xuXG4gIH07XG4gIHNjb3BlLmdldEFsbFNwcml0ZXNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuICBzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXRJRCkge1xuICAgIHJldHVybiAoIGFsbFNwcml0ZXNoZWV0SURzLmluZGV4T2YoIHNwcml0ZXNoZWV0SUQgKSA+IC0xICk7XG4gIH07XG4gIGZ1bmN0aW9uIF9jcmVhdGVJRCAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuICggc3ByaXRlc2hlZXREYXRhLmltYWdlcy50b1N0cmluZygpICk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0c19zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdHMnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c190ZXJyYWluIGV4dGVuZHMgT2JqZWN0c19zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RcIjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0c19zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdHMnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c191bml0IGV4dGVuZHMgT2JqZWN0c19zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzXCI7XG4gIH1cbn0iLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX21vdmVcIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhZ2VzOiBbe1xuICAgIHR5cGU6IFwiTWFwX3N0YWdlXCIsXG4gICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgZWxlbWVudDogXCIjbWFwQ2FudmFzXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgc3BlY2lhbHM6IFt7XG4gICAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMjQwXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0se1xuICAgICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiNDgwXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjMlwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI3MjBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjk2MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2Y2NcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMTIwMFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2ZDFcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiMTQ0MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2ZDZcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCI0OFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjcyXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiNFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI0OFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjUsXG4gICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiOVwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIyODhcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjozLFxuICAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmJlXCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjUyOFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzNcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICAgIFwieVwiOlwiNzY4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjOFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxMDA4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjZFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxMjQ4XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgXCJkYXRhXCI6IHt9XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH0se1xuICAgICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgICBcImNvb3JkXCI6IHsgXCJ4XCI6IFwiMFwiLCBcInlcIjogXCIwXCIgfSxcbiAgICAgIFwibmFtZVwiOiBcInVuaXRMYXllclwiLFxuICAgICAgXCJvcHRpb25zXCI6IHtcbiAgICAgICAgXCJjYWNoZVwiOiBcImZhbHNlXCJcbiAgICAgIH0sXG4gICAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgICBcInR5cGVcIjogXCJPYmplY3RzX3VuaXRcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgXCJ0eXBlSW1hZ2VEYXRhXCI6IFwidW5pdFwiLFxuICAgICAgICBcIm9iamVjdHNcIjogW3tcbiAgICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgIFwibmFtZVwiOiBcIkhvcnNleSB0aGUgd2lsZFwiLFxuICAgICAgICAgIFwiY29vcmRcIjogeyBcInhcIjogXCI2MFwiLCBcInlcIjogXCI2MFwiIH0sXG4gICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgIFwic29tZUN1c3RvbURhdGFcIjogXCJ0cnVlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjk2LFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo0OFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCIvYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzAsMCw5Niw0OF0sWzAsNDgsOTYsNDhdLFswLDk2LDk2LDQ4XSxbMCwxNDQsOTYsNDhdLFswLDE5Miw5Niw0OF0sWzAsMjQwLDk2LDQ4XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw0OF0sWzEsNTAsOTYsNDhdLFsxLDk5LDk2LDQ4XSxbMSwxNDgsOTYsNDhdLFsxLDE5Nyw5Niw0OF0sWzEsMjQ2LDk2LDQ4XSxbMSwyOTUsOTYsNDhdLFsxLDM0NCw5Niw0OF0sWzEsMzkzLDk2LDQ4XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICAgIH0sXG4gICAgXCJkaXRoZXJcIjp7XCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvZGl0aGVyMi5wbmdcIl0sXCJmcmFtZXNcIjpbWzAsMCw5Niw0OF1dLFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XX0sXG4gICAgXCJwcmV0dGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tb3VudGFpbnMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9oaWxscy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4yLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDY2LDAsMCwxOF0sWzEsMSw5Niw0OCwxLC00LDRdLFsxLDE0OCw5Niw0OCwyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJyZXNvdXJjZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL3Jlc291cmNlcy90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzE5NSwxLDk2LDQ4XSxbMzg5LDEsOTYsNDhdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInBsYWNlXCI6e30sXG4gICAgXCJjaXR5XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tZWRpZXZhbGNpdGllcy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw3Ml0sWzk4LDEsOTYsNzJdLFsxOTUsMSw5Niw3Ml0sWzI5MiwxLDk2LDcyXSxbMzg5LDEsOTYsNzJdLFs0ODUsMSw5Niw3Ml0sWzU4MiwxLDk2LDcyXSxbNjc5LDEsOTYsNzJdLFs3NzYsMSw5Niw3Ml0sWzg3MywxLDk2LDcyXSxbMSw3NCw5Niw3Ml0sWzk4LDc0LDk2LDcyXSxbMTk1LDc0LDk2LDcyXSxbMjkyLDc0LDk2LDcyXSxbMzg5LDc0LDk2LDcyXSxbNDg1LDc0LDk2LDcyXSxbNTgyLDc0LDk2LDcyXSxbNjc5LDc0LDk2LDcyXSxbNzc2LDc0LDk2LDcyXSxbODczLDc0LDk2LDcyXVxuICAgICAgXVxuICAgIH0sXCJidWlsZGluZ1wiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcIm1vZGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwidW5pdFwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdW5pdHMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjp7XCJ3aWR0aFwiOjY2LFwiaGVpZ2h0XCI6NTB9XG4gICAgfVxuICB9LFxuICBcIm9iamVjdERhdGFcIjoge1xuICAgIFwidW5pdFwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwidGFua1wiLFxuICAgICAgICBcImRlc2NcIjpcIlZyb29vbS4uLlwiLFxuICAgICAgICBcImltYWdlXCI6XCIwXCIsXG4gICAgICAgIFwiYXR0XCI6XCJHb29kXCIsXG4gICAgICAgIFwiZGVmXCI6XCJQb29yXCIsXG4gICAgICAgIFwic2llZ2VcIjpcIkRlY2VudFwiLFxuICAgICAgICBcImluaXRpYXRlXCI6XCI5MFwiLFxuICAgICAgICBcIm1vdmVcIjpcIjEwMFwiLFxuICAgICAgICBcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFxuICAgICAgICBcInZpc2lvblwiOlwiMTUwXCIsXG4gICAgICAgIFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgICAgfSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2FycmllclwiLFwiZGVzY1wiOlwiYW5ncnkgYmVlaGl2ZVwiLFwiaW1hZ2VcIjpcIjZcIixcImF0dFwiOlwiMVwiLFwiZGVmXCI6XCIyXCIsXCJzaWVnZVwiOlwiMlwiLFwiaW5pdGlhdGVcIjpcIjExMFwiLFwibW92ZVwiOlwiMTAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMjUwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcInVuaXRcIjp7XG4gICAgICAgICAgICBcIl9lbmVteV9cIjpbe1xuICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICBcIm1vcmFsZVwiOlwic3VmZmVycyBtb3JhbGUgZHJvcFwiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImNhdmFscnlcIixcImRlc2NcIjpcIkdpdmUgbWUgYW4gYXBwbGUhXCIsXCJpbWFnZVwiOlwiMjZcIixcImF0dFwiOlwiM1wiLFwiZGVmXCI6XCIxXCIsXCJzaWVnZVwiOlwiMFwiLFwiaW5pdGlhdGVcIjpcIjUwXCIsXCJtb3ZlXCI6XCIzMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIxMDBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5CYXNlXCI6W3tcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjJcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiM1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjVcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluXCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJkZXNlcnRcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJ2ZXJ5IGRyeSBsYW5kXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcInBsYWluXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQnVmZmFsbyByb2FtaW5nIGFyZWFcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEyJSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcImltYWdlXCI6XCIyXCIsXCJkZXNjXCI6XCJSb2JpbiBob29kIGxpa2VzIGl0IGhlcmVcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJVbml0XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRlZmVuZFwiOlwiVW5pdCBkZWZlbmQgKzJcIn19XX19fSx7XCJuYW1lXCI6XCJ0dW5kcmFcIixcImRlc2NcIjpcIlNpYmVyaWEgdGVhY2hlcyB5b3VcIixcImltYWdlXCI6XCI2XCJ9LHtcIm5hbWVcIjpcImFyY3RpY1wiLFwiZGVzY1wiOlwiWW91ciBiYWxsIHdpbGwgZnJlZXplIG9mXCIsXCJpbWFnZVwiOlwiN1wifSx7XCJuYW1lXCI6XCJzd2FtcFwiLFwiZGVzY1wiOlwiQ3JhbmJlcnJpZXMgYW5kIGNsb3VkYmVycmllc1wiLFwiaW1hZ2VcIjpcIjhcIn1dLFwiZGl0aGVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCIsXCI3XCIsXCI4XCIsXCI5XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn1dLFwicHJldHRpZmllclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjI1JVwifSx7XCJpbWFnZVwiOlwiMVwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjQwJVwifSx7XCJpbWFnZVwiOlwiMlwiLFwiekluZGV4XCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjYwJVwifV0sXCJyZXNvdXJjZVwiOlt7XCJuYW1lXCI6XCJPYXNpc1wiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcIk9hc2lzIGluIHRoZSBtaWRkbGUgb2YgZGVzZXJ0LCBvciBub3QgYXRtLlwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiZm9vZCBwcm9kdWN0aW9uIDUgLyB3ZWVrXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk9pbFwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJsYWNrIGdvbGRcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlRoZXJlIGlzIGEgbG90IG9mIG9pbCBoZXJlXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjRcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcImNpdHlcIjpbe1wibmFtZVwiOlwiTWVkaWV2YWxcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMFwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJNZWRpZXZhbDJcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMVwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJwbGFjZVwiOltdLFwiYnVpbGRpbmdcIjpbe1wibmFtZVwiOlwiQmFycmFja3NcIixcImltYWdlXCI6XCIwXCIsXCJ0b29sdGlwXCI6XCJFbmFibGVzIHRyb29wIHJlY3J1aXRtZW50XCJ9LHtcIm5hbWVcIjpcIkZhY3RvcnlcIixcImltYWdlXCI6XCIxXCIsXCJ0b29sdGlwXCI6XCJQcm9kdWNlcyB3ZWFwb25yeVwifV0sXCJnb3Zlcm5tZW50XCI6W3tcIm5hbWVcIjpcIkRlbW9jcmF6eVwiLFwiZGVzY3JpcHRpb25cIjpcIndlbGwgaXQncyBhIGRlbW9jcmF6eSA6KVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgKzIwJSBoYXBwaW5lc3NcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzAsMV0sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImhhcHBpbmVzc1wiOlwiMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNvbW11bmlzbVwiLFwiZGVzY3JpcHRpb25cIjpcIllvdSBrbm93IHRoZSBvbmUgdXNlZCBpbiB0aGUgZ3JlYXQgVVNTUiBhbmQgaW5zaWRlIHRoZSBncmVhdCBmaXJld2FsbCBvZiBDaGluYVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgcHJvZHVjdGlvbiBib251c2VzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlsyLDNdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7fX1dfX0sXCJDaXR5XCI6e1wiYnVpbGRpbmdcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIjIwJVwifX1dfX19fV0sXCJwb2xpdGljc1wiOntcInRheFJhdGVcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJjb3JydXB0aW9uXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiYWxpZ25tZW50XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiaGFwcGluZXNzXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwicmV2b2x0Umlza1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInVuaXR5XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwibmF0VmFsdWVcIjpbe1wibmFtZVwiOlwiSW50ZWdyaXR5XCIsXCJ0b29sdGlwXCI6XCJHb3Zlcm5tZW50IGFuZCBwb3B1bGF0aW9ucyBzaG93cyBpbnRlZ3JpdHkgYW5kIHRydXN0d29ydGhpbmVzc1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJpbnRlcm5hbFJlbGF0aW9uc1wiOlwiKzEwJVwiLFwiZGlwbG9tYWN5XCI6XCIrMTAlXCIsXCJyZXZvbHQgcmlza1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCItMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNhcGl0YWxpc21cIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGlwbG9tYWN5XCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwibW9yYWxlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiSGFyZHdvcmtpbmdcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrMTAlXCIsXCJoYXBwaW5lc3NcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkxlYWRlcnNoaXBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrNSVcIixcImhhcHBpbmVzc1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcInRyYWRpbmdcIjpcIisxMCVcIn19XX19fX1dfX1cbn07Il19
