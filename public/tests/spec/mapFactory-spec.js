(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _componentsFactoriesHorizontalHexaFactoryJs = require('../../components/factories/horizontalHexaFactory.js');

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
    var map = (0, _componentsFactoriesHorizontalHexaFactoryJs.createMap)(mapCanvas, _testsDataGameDataJs.gameData, _testsDataMapDataJs.mapData, _testsDataTypeDataJs.typeData);

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
      map.init(undefined, undefined, tickDoneFunc);

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

},{"../../components/factories/horizontalHexaFactory.js":3,"../../tests/data/gameData.js":20,"../../tests/data/mapData.js":21,"../../tests/data/typeData.js":22}],2:[function(require,module,exports){
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

},{"../map/core/Map":4,"../map/core/UI":8,"../map/core/UI/default/default.js":9,"../map/core/spritesheetList":12,"../map/hexagons/object/Object_terrain_hexa":16,"../map/hexagons/object/Object_unit_hexa":17}],4:[function(require,module,exports){
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

},{"./Map_layer":5,"./Map_stage":6,"./eventlisteners":10,"./move/map_drag":11,"./utils/utils":13,"./zoom/map_zoom":14}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../eventlisteners":10}],12:[function(require,module,exports){
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

},{"blueimp-md5":2}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"../eventlisteners":10,"../utils/utils.js":13}],15:[function(require,module,exports){
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

},{"../../core/Object":7,"../utils/createHexagon":18,"../utils/hexagonMath":19}],16:[function(require,module,exports){
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

},{"./Object_hexa":15}],17:[function(require,module,exports){
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

},{"./Object_hexa":15}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvaG9yaXpvbnRhbEhleGFGYWN0b3J5LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXBfbGF5ZXIuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX3N0YWdlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL09iamVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9VSS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9VSS9kZWZhdWx0L2RlZmF1bHQuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvZXZlbnRsaXN0ZW5lcnMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvbW92ZS9tYXBfZHJhZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvdXRpbHMvdXRpbHMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvem9vbS9tYXBfem9vbS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF91bml0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL3V0aWxzL2NyZWF0ZUhleGFnb24uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7MERBTWEscURBQXFEOzs7O21DQUd0RCw4QkFBOEI7O21DQUM5Qiw4QkFBOEI7O2tDQUMvQiw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBVztBQUNqRCxNQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkEsWUFBWSxDQUFDOzs7OztRQXVGRyxTQUFTLEdBQVQsU0FBUzs7Ozs7Ozs7Ozs7OzswQkExRUwsaUJBQWlCOztvREFDRCw0Q0FBNEM7O2lEQUMvQyx5Q0FBeUM7O3NDQUMxQyw2QkFBNkI7O3lCQUUxQyxnQkFBZ0I7O3lDQUNSLG1DQUFtQzs7QUFGOUQsSUFBSSxlQUFlLEdBQUcsNEJBRGIsZUFBZSxHQUNlLENBQUM7O0FBSXhDLElBQUksY0FBYyxHQUFHO0FBQ25CLGdCQUFjLHdDQVJQLG1CQUFtQixBQVFTO0FBQ25DLGFBQVcscUNBUkosZ0JBQWdCLEFBUU07Q0FDOUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0RLLFNBQVMsU0FBUyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUM3RSxTQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUE7QUFDM0QsTUFBSSxPQUFPLEdBQUcsQUFBQyxPQUFPLFVBQVUsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDckYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxHQUFHLEdBQUcsZ0JBL0VILEdBQUcsQ0ErRVEsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2hFLE1BQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2xFLE1BQUksU0FBUyxHQUFHLCtCQTNFVCxVQUFVLENBMkVjLGdCQUFnQixDQUFDLENBQUM7QUFDakQsV0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHakIsaUJBaEZPLEVBQUUsRUFnRk4sU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JuQixTQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFNBQVMsRUFBSTtBQUNuQyxRQUFJLFNBQVMsWUFBQSxDQUFDOztBQUVkLFFBQUk7QUFDRixlQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBRSxDQUFDO0tBQ3ZFLENBQUMsT0FBTSxDQUFDLEVBQUU7QUFDVCxhQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRDs7QUFFRCxhQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFdBQVcsRUFBSTtBQUM3QyxVQUFJLFdBQVcsWUFBQSxDQUFDO0FBQ2hCLFVBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7O0FBRWhELFVBQUcsQ0FBQyxlQUFlLEVBQUU7QUFDbkIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQy9DLGVBQU87T0FDUjs7QUFFRCxVQUFHLGVBQWUsRUFBRTtBQUNsQixZQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUU1RCxtQkFBVyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7T0FDL0Q7O0FBRUQsaUJBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFLFVBQUEsTUFBTSxFQUFJO0FBQ3JDLFlBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUV2RSxZQUFHLENBQUMsV0FBVyxFQUFFO0FBQ2YsaUJBQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JGLGdCQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4Rjs7QUFFRCxZQUFJLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDM0MsWUFBSSxPQUFPLEdBQUc7QUFDWixrQkFBUSxFQUFFLFdBQVc7QUFDckIsb0JBQVUsRUFBRSxNQUFNLENBQUMsSUFBSTtTQUN4QixDQUFDO0FBQ0YsWUFBSSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDO0FBQy9ILGlCQUFTLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxDQUFDO09BQ2pDLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxLQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFaEMsU0FBTyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCWjs7Ozs7Ozs7Ozs7Ozs7QUN0S0QsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozt5QkFLYSxhQUFhOzt5QkFDYixhQUFhOzswQkFDRSxlQUFlOzs0QkFDL0IsaUJBQWlCOzs0QkFDakIsaUJBQWlCOzs4QkFDWCxrQkFBa0I7O0FBRWpELElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQy9CLElBQUksY0FBYyxDQUFDOztJQUVOLEdBQUc7Ozs7OztBQUtILFdBTEEsR0FBRyxDQUtGLE1BQU0sRUFBRSxPQUFPLEVBQUU7MEJBTGxCLEdBQUc7O0FBTVosUUFBRyxDQUFDLE1BQU0sRUFBRTtBQUNWLFlBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztLQUMzRDtBQUNELFdBQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQ3hCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxNQUFNLEdBQUcsZUFyQlQsU0FBUyxDQXFCYyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsUUFBSSxDQUFDLFVBQVUsR0FBRyxlQXJCYixTQUFTLENBcUJrQixZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2RyxRQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs7QUFFM0IsUUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBdkJwQixRQUFRLGdCQURSLFFBQVEsQ0F3QmdDLENBQUM7QUFDOUMsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUM7QUFDL0MsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBSSxDQUFDLFFBQVEsR0FBRztBQUNkLGNBQVEsRUFBRSxZQTdCTSxXQUFXLENBNkJMLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVELGdCQUFVLEVBQUUsWUE5QkksV0FBVyxDQThCSCxnQkFBZ0I7QUFDeEMsWUFBTSxFQUFFLElBQUk7QUFDWixVQUFJLEVBQUUsSUFBSTtBQUNWLFVBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQztBQUNGLFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDOUIsa0JBQWMsR0FBRyxvQkFqQ1osY0FBYyxFQWlDYSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDaEQ7O2VBN0JVLEdBQUc7Ozs7Ozs7Ozs7V0FxQ1YsY0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUMzQixVQUFJLE9BQU8sRUFBRTtBQUNYLFlBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDL0I7O0FBRUQsVUFBRyxLQUFLLEVBQUU7QUFDUixZQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFlBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7T0FDN0I7O0FBRUQsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLGtCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsWUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXBDLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7OztXQUdhLDBCQUFHO0FBQ2Ysd0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUUxQixhQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7V0FHc0IsaUNBQUMsU0FBUyxFQUFFLEtBQUssRUFBRTtBQUN4QyxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDdEQsZUFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxDQUFDO09BQ25DLENBQUMsQ0FBQztLQUNKOzs7V0FFTyxvQkFBRztBQUNULGFBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNwQjs7O1dBRU0sbUJBQUc7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDckI7Ozs7OztXQUdPLGtCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTtBQUN6QyxVQUFJLEtBQUssR0FBRyxlQXZGUCxTQUFTLENBdUZZLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU1RCxVQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFaEMsYUFBTyxLQUFLLENBQUM7S0FDZDs7Ozs7O1dBR1UscUJBQUMsS0FBSyxFQUFFO0FBQ2pCLFVBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVuQyxhQUFPLEtBQUssQ0FBQztLQUNkOzs7OztXQUVZLHVCQUFDLElBQUksRUFBRTtBQUNsQixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7OztXQUtNLGlCQUFDLFdBQVcsRUFBRTtBQUNuQixVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxVQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdEIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFcEIsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBTU8sb0JBQUc7OztBQUNULFVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRTtBQUNwQyxZQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDN0QsTUFBTTtBQUNMLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN4QyxjQUFHLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRTtBQUMxQixpQkFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQUssT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNuRDtTQUNGLENBQUMsQ0FBQztPQUNKOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7V0FJc0IsaUNBQUMsS0FBSyxFQUFFO0FBQzdCLFVBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsVUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFNUMsYUFBTyxPQUFPLENBQUM7S0FDaEI7Ozs7OztXQUdhLDBCQUFHO0FBQ2Ysb0JBQWMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQ3pDOzs7Ozs7V0FHZ0IsNEJBQUc7QUFDbEIsb0JBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQ25DOzs7Ozs7Ozs7Ozs7O1dBVWMseUJBQUMsWUFBWSxFQUFFOzs7QUFDNUIsVUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFN0QsZ0JBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDaEMsWUFBRyxPQUFLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDekQsaUJBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDbkQsaUJBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLFFBQU0sQ0FBQztBQUNoRCxpQkFBSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3JELGlCQUFLLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtPQUNGLENBQUMsQ0FBQzs7QUFFSCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFVyxzQkFBQyxNQUFNLEVBQUU7QUFDbkIsVUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3JCLGNBQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQztPQUNqSDs7QUFFRCxVQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxZQUFXLEVBQUUsQ0FBQzs7QUFFNUMsY0FBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUU1RCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFWSx5QkFBRztBQUNkLGNBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFL0QsVUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7O0FBRTlCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O1dBRU8sa0JBQUMsT0FBTyxFQUFFO0FBQ2hCLFVBQUcsT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUN4QixZQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUN6QixlQUFPLE9BQU8sQ0FBQztPQUNoQjs7QUFFRCxhQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7OztXQUNXLHNCQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDNUIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDbEM7OztTQXRNVSxHQUFHOzs7UUFBSCxHQUFHLEdBQUgsR0FBRzs7Ozs7QUE0TWhCLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUN6QixVQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFcEQsU0FBTyxTQUFTLENBQUM7O0FBRWpCLFdBQVMsU0FBUyxHQUFHO0FBQ25CLFFBQUcsa0JBQWtCLEtBQUssSUFBSSxFQUFFO0FBQzlCLGNBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkLHdCQUFrQixHQUFHLEtBQUssQ0FBQztLQUM1QjtHQUNGO0NBQ0Y7O0FBRUQsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3JCLEtBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXBCLFNBQU8sR0FBRyxDQUFDO0NBQ1o7OztBQ3ZQRCxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVYixJQUFNLEtBQUssR0FBRztBQUNaLG1CQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWUsRUFBRSxDQUFDO0FBQ2xCLHVCQUFxQixFQUFFLENBQUM7Q0FDekIsQ0FBQzs7OztJQUdXLFNBQVM7QUFDVCxXQURBLFNBQVMsQ0FDUixJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUU7MEJBRG5DLFNBQVM7O0FBRWxCLCtCQUZTLFNBQVMsNkNBRVY7O0FBRVIsUUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUssQ0FBQyxDQUFDO0FBQ3RDLFFBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFLLENBQUMsQ0FBQztBQUN0QyxRQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQ2pELFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsR0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLGVBQWUsQUFBRSxDQUFDO0FBQzVGLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLElBQUksS0FBSyxDQUFDO0FBQy9DLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7O0FBR3pCLFFBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzNCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0dBQ3RCOztZQXRCVSxTQUFTOztlQUFULFNBQVM7O1dBdUJMLDJCQUFHO0FBQ2hCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjs7O1dBQ2MseUJBQUMsTUFBTSxFQUFFO0FBQ3RCLFVBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDVyxzQkFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO0FBQ2hDLGlDQWhDUyxTQUFTLGdDQWdDRixJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7S0FDdkM7Ozs7O1dBRXFCLGdDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDcEMsVUFBSSxhQUFhLEdBQUcsS0FBSyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7O0FBRXhELFVBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O0FBRTFCLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDcEMsTUFBTTs7QUFFTCxZQUFJLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsMkJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztPQUM3Qzs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDRyxjQUFDLFdBQVcsRUFBRTtBQUNoQixVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsWUFBSSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLFlBQUksQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztBQUN4QixZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztPQUMzQjtLQUNGOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7QUFDbEIsVUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQUNsRCwrQkFBa0IsSUFBSSxDQUFDLFFBQVEsOEhBQUU7Z0JBQXhCLEtBQUs7O0FBQ1osZ0JBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbkQscUJBQU8sS0FBSyxDQUFDO2FBQ2Q7V0FDRjs7Ozs7Ozs7Ozs7Ozs7O09BQ0Y7QUFDRCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7V0FDbUIsZ0NBQUc7QUFDckIsYUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7V0FDVyx3QkFBRyxFQUFHOzs7V0FDUixzQkFBRyxFQUFHOzs7V0FDRixpQkFBQyxJQUFJLEVBQUU7QUFDbkIsYUFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7OztTQXpFVSxTQUFTO0dBQVMsUUFBUSxDQUFDLFNBQVM7O1FBQXBDLFNBQVMsR0FBVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStIdEIsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2xDLE1BQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFekQsU0FBTyxtQkFBbUIsQ0FBQztDQUM1Qjs7O0FDcEpELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQSxTQUFTOzs7QUFFVCxXQUZBLFNBQVMsQ0FFUixJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTswQkFGNUIsU0FBUzs7QUFHbEIsUUFBRyxDQUFDLE1BQU0sRUFBRTtBQUNWLFlBQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQTtLQUMvRDs7QUFFRCwrQkFQUyxTQUFTLDZDQU9aLE1BQU0sRUFBRTs7QUFFZCxRQUFHLFdBQVcsRUFBRTtBQUNkLFVBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwRDs7QUFFRCxRQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQ2pELFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7O0FBRzFCLFFBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzNCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDN0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsUUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O0dBRTFCOztZQTdCVSxTQUFTOztlQUFULFNBQVM7O1dBOEJSLHNCQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7QUFDaEMsaUNBL0JTLFNBQVMsZ0NBK0JGLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztLQUN2Qzs7O1dBQ2MseUJBQUMsTUFBTSxFQUFFO0FBQ3RCLFVBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7Ozs7OztBQUNsQiw2QkFBa0IsSUFBSSxDQUFDLFFBQVEsOEhBQUU7Y0FBeEIsS0FBSzs7QUFDWixjQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLGNBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbkQsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7O0FBRUQsY0FBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyQyxtQkFBTyxLQUFLLENBQUM7V0FDZDtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBcERVLFNBQVM7R0FBUyxRQUFRLENBQUMsS0FBSzs7UUFBaEMsU0FBUyxHQUFULFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnRCLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWFBLGFBQWE7QUFDYixXQURBLGFBQWEsQ0FDWixNQUFNLEVBQUUsSUFBSSxFQUFHLFdBQVcsRUFBRSxrQkFBa0IsRUFBRTswQkFEakQsYUFBYTs7QUFFdEIsK0JBRlMsYUFBYSw2Q0FFaEIsV0FBVyxFQUFFOztBQUVuQixRQUFJLENBQUMsSUFBSSxHQUFHLHlCQUF5QixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7OztBQUdoRCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdkIsUUFBSSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQzs7O0FBRzFDLFFBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUduQyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7QUFFekIsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7OztHQUczQjs7WUFwQlUsYUFBYTs7ZUFBYixhQUFhOztXQXFCakIsaUJBQUMsSUFBSSxFQUFFO0FBQ1osVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O1dBRVEsbUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNkLFVBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBRSxDQUFDO0FBQ3pDLGFBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkIsVUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxVQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OztBQUlYLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNXLHNCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFO0FBQ2pDLFVBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDOztBQUV0QyxhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdCOzs7OztXQUVXLHdCQUFHO0FBQ2IsYUFBTztBQUNMLFNBQUMsRUFBRSxNQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRTtBQUNuQyxTQUFDLEVBQUUsTUFBTSxDQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7T0FDcEMsQ0FBQztLQUNIOzs7V0FDa0IsK0JBQUc7QUFDcEIsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBRSxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7S0FDN0Q7OztTQW5EVSxhQUFhO0dBQVMsUUFBUSxDQUFDLE1BQU07O1FBQXJDLGFBQWEsR0FBYixhQUFhOzs7Ozs7Ozs7Ozs7O0FDSDFCLFlBQVksQ0FBQzs7Ozs7UUFJRyxFQUFFLEdBQUYsRUFBRTtBQUZsQixJQUFJLEtBQUssQ0FBQzs7QUFFSCxTQUFTLEVBQUUsQ0FBRSxZQUFZLEVBQUUsUUFBUSxFQUFFOztBQUUxQyxNQUFJLEtBQUssRUFBRTtBQUNULFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsTUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM5QixVQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7R0FDMUQ7O0FBRUQsTUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLE1BQUksT0FBTyxHQUFHLFlBQVksQ0FBQztBQUMzQixPQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVYLE9BQUssQ0FBQyxjQUFjLEdBQUcsU0FBUyxjQUFjLENBQUMsT0FBTyxFQUFFO0FBQ3RELFdBQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUN4QyxDQUFDO0FBQ0YsT0FBSyxDQUFDLHVCQUF1QixHQUFHLFNBQVMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLEVBQ3hFLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7Ozs7Ozs7OztBQ3pCRCxZQUFZLENBQUM7Ozs7Ozs7Ozs7SUFFQSxVQUFVO0FBQ1YsV0FEQSxVQUFVLENBQ1QsS0FBSyxFQUFFLE1BQU0sRUFBRTswQkFEaEIsVUFBVTs7QUFFbkIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJO0FBQ3RCLHFCQUFlLEVBQUUsU0FBUztLQUMzQixDQUFDOztBQUVGLFFBQUksQ0FBQyxlQUFlLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0dBQzlGOztlQVJVLFVBQVU7O1dBU1Asd0JBQUMsT0FBTyxFQUFFOzs7QUFDdEIsVUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDakMsWUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQ3RDLGVBQU8sQ0FBQyxHQUFHLENBQUUsVUFBQSxNQUFNLEVBQUk7QUFDckIsZ0JBQUssS0FBSyxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQzVELENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUN0QixNQUFNO0FBQ0wsWUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFlBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUN0RCxZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDdEI7S0FDRjs7O1dBQ0csZ0JBQUc7QUFDTCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLFVBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFO0FBQzdDLCtCQUF1QixDQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7T0FDdkUsQ0FBQyxDQUFDO0tBQ0o7OztTQTlCVSxVQUFVOzs7UUFBVixVQUFVLEdBQVYsVUFBVTs7QUFpQ3ZCLFNBQVMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUNqRCxTQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3hDLFdBQU8sRUFBRSxDQUFDO0dBQ1gsQ0FBQyxDQUFDO0NBQ1I7QUFDRCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsRUFBRTtBQUNyQyxNQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsVUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLDBCQUEwQixDQUFDLENBQUM7R0FDaEU7O0FBRUQsTUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUM3QixNQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBRXRCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0IsZ0JBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDaEM7O0FBRUQsU0FBTyxZQUFZLENBQUM7Q0FDckI7Ozs7O0FDL0RELGFBQWEsQ0FBQzs7Ozs7QUFFZCxJQUFJLGNBQWMsQ0FBQzs7QUFFWixJQUFJLGNBQWMsR0FBRyxTQUFTLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtBQUMvRCxNQUFHLGNBQWMsRUFBRTtBQUNqQixXQUFPLGNBQWMsQ0FBQztHQUN2Qjs7QUFFRCxnQkFBYyxHQUFHO0FBQ2YsVUFBTSxFQUFFLEVBQUU7R0FDWCxDQUFDOztBQUVGLGdCQUFjLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxzQkFBc0IsR0FBRztBQUN4RSxRQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtBQUMxQyxZQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyRCxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3ZDLE1BQU07QUFDTCxZQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4RCxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0tBQ3hDOztBQUVELFdBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztHQUN4QixDQUFDO0FBQ0YsZ0JBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLGdCQUFnQixHQUFHO0FBQzVELFdBQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQztHQUMxQixDQUFDO0FBQ0YsZ0JBQWMsQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLGtCQUFrQixHQUFHO0FBQ2hFLFFBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3RDLFlBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELG9CQUFjLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDbkMsTUFBTTtBQUNMLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RELG9CQUFjLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDcEM7O0FBRUQsV0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO0dBQ3BCLENBQUM7QUFDRixnQkFBYyxDQUFDLGtCQUFrQixHQUFHLFNBQVMsa0JBQWtCLEdBQUc7QUFDaEUsUUFBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDdEMsWUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsb0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNuQyxNQUFNO0FBQ0wsWUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsb0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztLQUNwQzs7QUFFRCxXQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7R0FDcEIsQ0FBQztBQUNGLGdCQUFjLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxvQkFBb0IsR0FBRztBQUNwRSxRQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtBQUN4QyxZQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ3JDLE1BQU07QUFDTCxZQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2RCxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3RDOztBQUVELFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztHQUN0QixDQUFDOztBQUVGLFNBQU8sY0FBYyxDQUFDO0NBQ3ZCLENBQUM7UUExRFMsY0FBYyxHQUFkLGNBQWM7OztBQ0p6QixZQUFZLENBQUM7Ozs7Ozs4QkFFa0IsbUJBQW1COzs7QUFHbEQsSUFBSSxjQUFjLENBQUM7O0FBRVosSUFBSSxRQUFRLEdBQUcsQ0FBQyxTQUFTLFFBQVEsR0FBRztBQUN6QyxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsTUFBSSxZQUFZLEdBQUcsYUFBYSxFQUFFLENBQUM7OztBQUduQyxPQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7O0FBRTlDLE9BQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzs7Ozs7QUFLakMsT0FBSyxDQUFDLElBQUksR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUN6QixrQkFBYyxHQUFHLG9CQW5CWixjQUFjLEVBbUJhLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxPQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBRzVDLGtCQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztHQUNyQyxDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDOzs7Ozs7QUFNYixXQUFTLGtCQUFrQixDQUFFLEdBQUcsRUFBRztBQUNqQyxXQUFPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtBQUMzQixVQUFJO0FBQ0Ysb0JBQVksQ0FBQyxTQUFTLENBQUM7QUFDckIsV0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ04sV0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1AsQ0FBQyxDQUFDOzs7QUFHSCxZQUFJLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsWUFBSSxlQUFlLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsV0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDeEQsV0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7T0FDekQsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNWLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDaEI7O0FBRUQsZUFBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbEMsZUFBTyxZQUFXO0FBQ2hCLGFBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELGFBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzNELG1CQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEIsQ0FBQztPQUNIOztBQUVELGVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUMxQixZQUFJO0FBQ0YsaUJBQU8sU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQ3pCLGVBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5CLGdCQUFHLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO0FBQ2xCLGlCQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMzRCxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDM0QsdUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQjs7QUFFRCxnQkFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3RDLGdCQUFJLEtBQUssR0FBRztBQUNWLGVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ2pCLGVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQ2xCLENBQUM7O0FBRUYsZ0JBQUcsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDakMsaUJBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEIsTUFBTTtBQUNMLGlCQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JCOztBQUVELHdCQUFZLENBQUMsU0FBUyxDQUFDO0FBQ3JCLGVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNOLGVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNQLENBQUMsQ0FBQzs7Ozs7O1dBTUosQ0FBQztTQUNILENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDVixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtPQUNGO0tBQ0YsQ0FBQztHQUNIOzs7QUFHRCxXQUFTLGFBQWEsR0FBRztBQUN2QixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLFlBQVksQ0FBQzs7QUFFakIsU0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDM0MsYUFBTyxZQUFZLEdBQUcsTUFBTSxDQUFDO0tBQzlCLENBQUM7QUFDRixTQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsU0FBUyxHQUFHO0FBQ3JDLGFBQU8sWUFBWSxDQUFDO0tBQ3JCLENBQUM7O0FBRUYsV0FBTyxLQUFLLENBQUM7R0FDZCxDQUFDO0NBQ0gsQ0FBQSxFQUFHLENBQUM7O1FBMUdNLFFBQVEsR0FBUixRQUFROztBQTZHbkIsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3RCLFFBQU0sQ0FBQyxVQUFVLENBQUMsWUFBVztBQUMzQixPQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDUDs7O0FDeEhELFlBQVksQ0FBQzs7Ozs7UUFRRyxlQUFlLEdBQWYsZUFBZTs7OzswQkFOZCxhQUFhOzs7O0FBRTlCLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUN6QixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs7OztBQUdwQixTQUFTLGVBQWUsR0FBSTtBQUNqQyxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsT0FBSyxDQUFDLGNBQWMsR0FBRyxVQUFVLGVBQWUsRUFBRTtBQUNoRCxRQUFJLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBRSxTQUFTLENBQUUsZUFBZSxDQUFFLENBQUUsRUFBRztBQUNuRSxhQUFPLEtBQUssQ0FBQztLQUNkOztBQUVELGVBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhELG1CQUFlLENBQUMsSUFBSSxDQUFFLFdBQVcsQ0FBRSxDQUFDOztBQUVwQyxXQUFPLFdBQVcsQ0FBQztHQUNwQixDQUFDO0FBQ0YsT0FBSyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsV0FBVyxFQUFFLEVBRWhELENBQUM7QUFDRixPQUFLLENBQUMsa0JBQWtCLEdBQUcsWUFBWTtBQUNyQyxXQUFPLGVBQWUsQ0FBQztHQUN4QixDQUFDO0FBQ0YsT0FBSyxDQUFDLHdCQUF3QixHQUFHLFVBQVUsYUFBYSxFQUFFO0FBQ3hELFdBQVMsaUJBQWlCLENBQUMsT0FBTyxDQUFFLGFBQWEsQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFHO0dBQzVELENBQUM7QUFDRixXQUFTLFNBQVMsQ0FBRSxlQUFlLEVBQUU7QUFDbkMsV0FBUyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFHO0dBQzlDLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7Ozs7QUN0Q00sSUFBSSxVQUFVLEdBQUcsQ0FBRSxTQUFTLFVBQVUsR0FBRztBQUM5QyxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Ozs7Ozs7QUFRZixPQUFLLENBQUMsY0FBYyxHQUFHLFVBQVUsS0FBSyxFQUFHO0FBQ3RDLFFBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFFZCxTQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDOztBQUVyQyxRQUFLLEtBQUssQ0FBQyxVQUFVLEVBQUc7O0FBQ3JCLFdBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztLQUNqQyxNQUFNLElBQUssS0FBSyxDQUFDLE1BQU0sRUFBRzs7OztBQUd4QixXQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUM1Qjs7QUFFRCxTQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7OztBQUkxRSxRQUFLLEtBQUssRUFBRyxPQUFPLEtBQUssQ0FBQztHQUM1QixDQUFDOztBQUVGLE9BQUssQ0FBQyxZQUFZLEdBQUcsVUFBVSxLQUFLLEVBQUc7QUFDcEMsUUFBSSxVQUFVLENBQUM7O0FBRWYsU0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNyQyxRQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUcsVUFBVSxHQUFLLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxBQUFFLENBQUMsS0FDcEQsSUFBSyxLQUFLLENBQUMsS0FBSyxFQUFHLFVBQVUsR0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQUFBRSxDQUFDLEtBQ3JELElBQUssS0FBSyxDQUFDLE1BQU0sRUFBRyxVQUFVLEdBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEFBQUUsQ0FBQzs7QUFFNUQsUUFBSyxVQUFVLEVBQUcsT0FBTyxJQUFJLENBQUM7O0FBRTlCLFdBQU8sS0FBSyxDQUFDO0dBQ2YsQ0FBQztBQUNGLFNBQU8sS0FBSyxDQUFDO0NBQ2QsQ0FBQSxFQUFJLENBQUM7UUExQ0ssVUFBVSxHQUFWLFVBQVU7QUEyQ2QsSUFBSSxXQUFXLEdBQUc7QUFDdkIsa0JBQWdCLEVBQUUsU0FBUyxnQkFBZ0IsR0FBRztBQUM1QyxRQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3pCLFFBQUksY0FBYyxHQUFHLEFBQUUsUUFBUSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEtBRXJGLFFBQVEsQ0FBQyxhQUFhLElBQUksUUFBUSxDQUFDLGtCQUFrQixDQUFBLEFBQUUsQ0FBQzs7QUFFM0Qsa0JBQWMsR0FBRyxnQkFBZ0IsQ0FBRSxRQUFRLENBQUUsR0FBRyxpQkFBaUIsQ0FBRSxJQUFJLENBQUUsQ0FBQzs7QUFFMUUsV0FBTyxLQUFLLENBQUM7OztBQUdiLGFBQVMsZ0JBQWdCLENBQUUsRUFBRSxFQUFHO0FBQzdCLFVBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsSUFDcEMsRUFBRSxDQUFDLHNCQUFzQixJQUN6QixFQUFFLENBQUMsbUJBQW1CLElBQ3RCLEVBQUUsQ0FBQyxjQUFjLENBQUM7QUFDckIsVUFBSyxhQUFhLEVBQUc7O0FBQ2xCLHFCQUFhLENBQUMsSUFBSSxDQUFFLEVBQUUsQ0FBRSxDQUFDO09BQzNCLE1BQU0sSUFBSyxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssV0FBVyxFQUFHOztBQUN2RCxZQUFJLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBRSxlQUFlLENBQUUsQ0FBQztBQUNuRCxlQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUUsT0FBTyxDQUFFLENBQUM7T0FDbEQ7S0FDSDs7QUFFRCxhQUFTLGlCQUFpQixDQUFFLEVBQUUsRUFBRzs7QUFFOUIsVUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixJQUNyQyxFQUFFLENBQUMsdUJBQXVCLElBQzFCLEVBQUUsQ0FBQyxvQkFBb0IsSUFDdkIsRUFBRSxDQUFDLG1CQUFtQixDQUFDOztBQUUxQixVQUFLLGFBQWEsRUFBRzs7QUFDbEIscUJBQWEsQ0FBQyxJQUFJLENBQUUsRUFBRSxDQUFFLENBQUM7T0FDM0IsTUFBTSxJQUFLLE9BQU8sTUFBTSxDQUFDLGFBQWEsS0FBSyxXQUFXLEVBQUc7O0FBQ3ZELFlBQUksT0FBTyxHQUFHLElBQUksYUFBYSxDQUFFLGVBQWUsQ0FBRSxDQUFDO0FBQ25ELGVBQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBRSxPQUFPLENBQUUsQ0FBQztPQUNsRDtBQUNELGFBQU8sS0FBSyxDQUFDO0tBQ2Y7R0FDRjtBQUNELGVBQWEsRUFBRSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUU7QUFDN0MsV0FBTyxTQUFTLFFBQVEsR0FBRztBQUN6QixhQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3pDLGFBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDNUMsQ0FBQztHQUNIO0NBQ0YsQ0FBQzs7UUEvQ1MsV0FBVyxHQUFYLFdBQVc7QUFpRGYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxZQUFXO0FBQ2pDLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLGVBQVcsRUFBRTtBQUNYLGFBQU8sRUFBRSxRQUFRO0FBQ2pCLFdBQUssRUFBRSxXQUFXO0tBQ25CO0FBQ0QsYUFBUyxFQUFFO0FBQ1QsYUFBTyxFQUFFLFFBQVE7QUFDakIsV0FBSyxFQUFFLFNBQVM7S0FDakI7QUFDRCxlQUFXLEVBQUU7QUFDWCxhQUFPLEVBQUUsUUFBUTtBQUNqQixXQUFLLEVBQUUsV0FBVztLQUNuQjtBQUNELGdCQUFZLEVBQUU7QUFDWixhQUFPLEVBQUUsUUFBUTtBQUNqQixXQUFLLEVBQUUsT0FBTztLQUNmO0FBQ0QsZ0JBQVksRUFBRTtBQUNaLGFBQU8sRUFBRSxRQUFRO0FBQ2pCLFdBQUssRUFBRSxPQUFPO0tBQ2YsRUFDRixDQUFDO0FBQ0YsTUFBSSxlQUFlLEdBQUcsMkJBQTJCLEVBQUUsQ0FBQztBQUNwRCxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsT0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFOztBQUUvQyxtQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QyxRQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRTlGLFdBQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQztBQUNGLE9BQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTs7O0FBRXZELFFBQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFHO0FBQzVCLFVBQUcsWUFBWSxFQUFFO0FBQ2YsWUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2pHLGVBQU87T0FDUjs7QUFFRCxZQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDL0MsTUFBTSxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUc7QUFDakMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUN2QixZQUFHLFlBQVksRUFBRTtBQUNmLGdCQUFLLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3pHLGlCQUFPO1NBQ1I7O0FBRUQsY0FBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO09BQy9DLENBQUMsQ0FBQztLQUNKOztBQUVELFdBQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQzs7QUFFRixTQUFPLEtBQUssQ0FBQzs7O0FBR2IsV0FBUywyQkFBMkIsR0FBRztBQUNyQyxRQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLFVBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ2pELGFBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDcEIsQ0FBQyxDQUFDOztBQUVILFdBQU8sT0FBTyxDQUFDO0dBQ2hCO0NBQ0YsQ0FBQSxFQUFHLENBQUM7UUFwRU0sU0FBUyxHQUFULFNBQVM7Ozs7Ozs7Ozs0QkMxRk8sbUJBQW1COzs4QkFDZixtQkFBbUI7O0FBSGxELGFBQWEsQ0FBQzs7O0FBTWQsSUFBSSxjQUFjLENBQUM7O0FBRVosSUFBSSxRQUFRLEdBQUcsQ0FBQyxTQUFTLFFBQVEsR0FBRztBQUN6QyxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixNQUFJLFNBQVMsR0FBRztBQUNkLFdBQU8sRUFBRSxHQUFHO0FBQ1osVUFBTSxFQUFHLEdBQUc7R0FDYixDQUFDOztBQUVGLE1BQUksWUFBWSxHQUFHLEdBQUcsQ0FBQzs7QUFFdkIsT0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDOzs7OztBQUtqQyxPQUFLLENBQUMsSUFBSSxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQ3pCLE9BQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE9BQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLE9BQUcsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ2pELE9BQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXJELE9BQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFekMsa0JBQWMsR0FBRyxvQkEzQlosY0FBYyxFQTJCYSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsa0JBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0dBQ3JDLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7OztBQUdiLFdBQVMsZUFBZSxDQUFFLE1BQU0sRUFBRTtBQUNoQyxnQkFBWSxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsV0FBTyxJQUFJLENBQUM7R0FDYjtBQUNELFdBQVMsYUFBYSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDdkMsYUFBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDNUIsYUFBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxDQUFDO0dBQ2I7QUFDRCxXQUFTLE1BQU0sQ0FBRSxNQUFNLEVBQUU7QUFDdkIsUUFBRyxnQkFBZ0IsQ0FBRSxNQUFNLENBQUUsRUFFN0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDOUQsV0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUM7QUFDN0IsV0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUM7S0FDOUIsQ0FBQyxDQUFDOztBQUVILFdBQU8sSUFBSSxDQUFDO0dBQ2I7QUFDRCxXQUFTLE9BQU8sQ0FBRSxNQUFNLEVBQUU7QUFDeEIsUUFBRyxnQkFBZ0IsQ0FBRSxNQUFNLENBQUUsRUFFN0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDOUQsV0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUM7QUFDN0IsV0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUM7S0FDOUIsQ0FBQyxDQUFDOztBQUVILFdBQU8sSUFBSSxDQUFDO0dBQ2I7OztBQUdELFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ2hDLFFBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDMUQsYUFBTyxLQUFLLENBQUM7S0FDZDs7QUFFRCxXQUFPLElBQUksQ0FBQztHQUNiO0FBQ0QsV0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0FBQzVCLFdBQU8sU0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFO0FBQ3JDLFVBQUksZUFBZSxHQUFHLGNBN0VuQixVQUFVLENBNkVvQixjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXZELFVBQUcsZUFBZSxHQUFHLENBQUMsRUFBRTtBQUN0QixXQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7T0FDZCxNQUFNLElBQUcsZUFBZSxHQUFHLENBQUMsRUFBRTtBQUM3QixXQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDZjs7QUFFRCxTQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdEIsQ0FBQztHQUNIO0NBQ0YsQ0FBQSxFQUFHLENBQUM7UUFsRk0sUUFBUSxHQUFSLFFBQVE7OztBQ1JuQixZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBRWlCLG1CQUFtQjs7a0NBQ25CLHdCQUF3Qjs7Z0NBQzlCLHNCQUFzQjs7OztBQUU5QyxJQUFJLEtBQUssQ0FBQzs7SUFFRyxrQkFBa0I7QUFDbEIsV0FEQSxrQkFBa0IsS0FDSSxJQUFJLEVBQUcsV0FBVyxFQUFFLGtCQUFrQixFQUF5QjtRQUFwRixNQUFNLGdDQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQTBDLEtBQUssZ0NBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFOzswQkFEbkYsa0JBQWtCOztBQUUzQixRQUFJLEtBQUssQ0FBQzs7QUFFVixRQUFNLE1BQU0sR0FBRyw4QkFBWSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BELFFBQU0sSUFBSSxHQUFHLDhCQUFZLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWhELCtCQVBTLGtCQUFrQiw2Q0FPckIsTUFBTSxFQUFFLElBQUksRUFBRyxXQUFXLEVBQUUsa0JBQWtCLEVBQUU7O0FBRXRELFFBQUksV0FBVyxHQUFHLDhCQUFZLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsUUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixRQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNqQixZQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2pDOzs7QUFHRCxRQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDN0M7O1lBckJVLGtCQUFrQjs7ZUFBbEIsa0JBQWtCOztXQXNCZCxvQkFBRztBQUNoQixhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0F4QlUsa0JBQWtCO2VBTnRCLGFBQWE7O1FBTVQsa0JBQWtCLEdBQWxCLGtCQUFrQjs7QUEyQi9CLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRTtBQUM5QixNQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1YsUUFBSSxXQUFXLEdBQUcsOEJBQVksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVsRCxTQUFLLEdBQUcsd0JBcENILGFBQWEsRUFvQ0ksRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7R0FDL0U7O0FBRUQsU0FBTyxLQUFLLENBQUM7Q0FDZDs7O0FDM0NELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7MkJBRXNCLGVBQWU7O0lBRXJDLG1CQUFtQjtXQUFuQixtQkFBbUI7MEJBQW5CLG1CQUFtQjs7Ozs7OztZQUFuQixtQkFBbUI7O2VBQW5CLG1CQUFtQjs7V0FDckIscUJBQVU7d0NBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNmLGlDQUZTLG1CQUFtQiw4Q0FFUCxJQUFJLEVBQUU7O0FBRTNCLFVBQUksQ0FBQyxJQUFJLEdBQUcsMkJBQTJCLENBQUM7S0FDekM7OztTQUxVLG1CQUFtQjtnQkFGdkIsa0JBQWtCOztRQUVkLG1CQUFtQixHQUFuQixtQkFBbUI7OztBQ0poQyxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7OzJCQUVzQixlQUFlOztJQUVyQyxnQkFBZ0I7V0FBaEIsZ0JBQWdCOzBCQUFoQixnQkFBZ0I7Ozs7Ozs7WUFBaEIsZ0JBQWdCOztlQUFoQixnQkFBZ0I7O1dBQ2xCLHFCQUFVO3dDQUFOLElBQUk7QUFBSixZQUFJOzs7QUFDZixpQ0FGUyxnQkFBZ0IsOENBRUosSUFBSSxFQUFFOztBQUUzQixVQUFJLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDO0tBQ3ZDOzs7U0FMVSxnQkFBZ0I7Z0JBRnBCLGtCQUFrQjs7UUFFZCxnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7QUNKN0IsWUFBWSxDQUFBOzs7OztRQUVJLGFBQWEsR0FBYixhQUFhOztBQUF0QixTQUFTLGFBQWEsS0FBd0IsTUFBTSxFQUFjO01BQTNDLE1BQU0sZ0NBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUU7TUFBVSxLQUFLLGdDQUFHLEVBQUU7O0FBQ3JFLE1BQUksS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pDLE1BQUksS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN0QixNQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7O0FBRWxCLE9BQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUM1QixZQUFZLENBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBRSxDQUFDOztBQUVwRSxTQUFPLEtBQUssQ0FBQztDQUNkOzs7QUNYRCxZQUFZLENBQUM7Ozs7O1FBSUcsVUFBVSxHQUFWLFVBQVU7UUFHVixRQUFRLEdBQVIsUUFBUTtRQU1SLGNBQWMsR0FBZCxjQUFjO1FBd0JkLFdBQVcsR0FBWCxXQUFXO1FBUVgsaUJBQWlCLEdBQWpCLGlCQUFpQjs7O0FBekMxQixTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDakMsU0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5Qjs7QUFDTSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDL0IsU0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN2Qjs7Ozs7QUFJTSxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQyxNQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFMUIsTUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsTUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRXZCLE1BQUksRUFBRSxHQUFHLENBQUMsR0FBRyxBQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuQyxNQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNsQyxNQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsTUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUU7QUFDcEQsV0FBTztBQUNILE9BQUMsRUFBRSxFQUFFO0FBQ0wsT0FBQyxFQUFFLEVBQUU7S0FDTixDQUFDO0dBQ0wsTUFBTTtBQUNMLFdBQU87QUFDTCxPQUFDLEVBQUUsRUFBRSxHQUFHLENBQUM7QUFDVCxPQUFDLEVBQUUsRUFBRSxHQUFJLEVBQUUsR0FBRyxDQUFDLEFBQUMsSUFBSSxBQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQztLQUMvQyxDQUFDO0dBQ0g7Q0FDRjs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsU0FBTztBQUNMLFVBQU0sRUFBRSxNQUFNO0FBQ2QsS0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ2IsS0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztHQUN6QixDQUFDO0NBQ0g7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqRCxNQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEMsTUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUM3QixNQUFJLFlBQVksR0FBRztBQUNqQixLQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbEIsS0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztHQUNwQixDQUFDO0FBQ0YsTUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQUksaUJBQWlCLENBQUM7O0FBRXRCLG1CQUFpQixHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxNQUFJLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RCxVQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FDdEQ7QUFDRCxjQUFZLEdBQUc7QUFDYixLQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLEtBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7R0FDakUsQ0FBQzs7QUFFRixTQUFPLFlBQVksQ0FBQztDQUNyQjs7QUFBQSxDQUFDOztxQkFFYTtBQUNiLFlBQVUsRUFBRSxVQUFVO0FBQ3RCLFVBQVEsRUFBRSxRQUFRO0FBQ2xCLGdCQUFjLEVBQUUsY0FBYztBQUM5QixhQUFXLEVBQUUsV0FBVztBQUN4QixtQkFBaUIsRUFBRSxpQkFBaUI7Q0FDckM7Ozs7Ozs7O0FDMUVNLElBQUksUUFBUSxHQUFHO0FBQ3BCLElBQUUsRUFBRSwwQkFBMEI7QUFDOUIsTUFBSSxFQUFFLENBQUM7QUFDUCxTQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7QUFDekIsbUJBQWlCLEVBQUU7QUFDakIsT0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLHVCQUF1QixDQUFDO0dBQzNDO0NBQ0YsQ0FBQztRQVBTLFFBQVEsR0FBUixRQUFROzs7Ozs7OztBQ0FaLElBQUksT0FBTyxHQUFHO0FBQ25CLFFBQU0sRUFBRSwwQkFBMEI7QUFDbEMsTUFBSSxFQUFFLENBQUM7QUFDUCxZQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDMUIsU0FBTyxFQUFFLFlBQVk7QUFDckIsUUFBTSxFQUFFLENBQUM7QUFDUCxRQUFJLEVBQUUsV0FBVztBQUNqQixTQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsUUFBSSxFQUFFLGtCQUFrQjtBQUN4QixZQUFRLEVBQUUsQ0FBQztBQUNULG1CQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0FBQ0YsV0FBTyxFQUFFO0FBQ1AsV0FBSyxFQUFFLElBQUk7S0FDWjtBQUNELGdCQUFZLEVBQUUsQ0FBQztBQUNiLFVBQUksRUFBRSxnQkFBZ0I7QUFDdEIsVUFBSSxFQUFFLGFBQWE7QUFDbkIsbUJBQWEsRUFBRSxhQUFhO0FBQzVCLGFBQU8sRUFBRSxDQUFDO0FBQ1AsaUJBQVMsRUFBQyxDQUFDO0FBQ1gsY0FBTSxFQUFDLE9BQU87QUFDZCxhQUFLLEVBQUMsMEJBQTBCO0FBQ2hDLGVBQU8sRUFBQztBQUNMLGFBQUcsRUFBQyxHQUFHO0FBQ1AsYUFBRyxFQUFDLEdBQUc7U0FDVDtBQUNELGNBQU0sRUFBRSxFQUFFO0FBQ1Ysc0JBQWMsRUFBQyxHQUFHO09BQ3BCLEVBQUM7QUFDQyxpQkFBUyxFQUFDLENBQUM7QUFDWCxjQUFNLEVBQUMsT0FBTztBQUNkLGFBQUssRUFBQywwQkFBMEI7QUFDaEMsZUFBTyxFQUFDO0FBQ0wsYUFBRyxFQUFDLEdBQUc7QUFDUCxhQUFHLEVBQUMsS0FBSztTQUNYO0FBQ0QsY0FBTSxFQUFFLEVBQUU7QUFDVixzQkFBYyxFQUFDLEdBQUc7T0FDcEIsRUFDRDtBQUNHLGlCQUFTLEVBQUMsQ0FBQztBQUNYLGNBQU0sRUFBQyxRQUFRO0FBQ2YsYUFBSyxFQUFDLDBCQUEwQjtBQUNoQyxlQUFPLEVBQUM7QUFDTCxhQUFHLEVBQUMsSUFBSTtBQUNSLGFBQUcsRUFBQyxJQUFJO1NBQ1Y7QUFDRCxjQUFNLEVBQUUsRUFBRTtBQUNWLHNCQUFjLEVBQUMsR0FBRztPQUNwQixFQUNEO0FBQ0csaUJBQVMsRUFBQyxDQUFDO0FBQ1gsY0FBTSxFQUFDLFFBQVE7QUFDZixhQUFLLEVBQUMsMEJBQTBCO0FBQ2hDLGVBQU8sRUFBQztBQUNMLGFBQUcsRUFBQyxJQUFJO0FBQ1IsYUFBRyxFQUFDLEtBQUs7U0FDWDtBQUNELGNBQU0sRUFBRSxFQUFFO0FBQ1Ysc0JBQWMsRUFBQyxHQUFHO09BQ3BCLENBQUM7S0FDSCxDQUFDO0dBQ0gsRUFBQztBQUNBLFVBQU0sRUFBRSxXQUFXO0FBQ25CLFdBQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvQixVQUFNLEVBQUUsV0FBVztBQUNuQixhQUFTLEVBQUU7QUFDVCxhQUFPLEVBQUUsT0FBTztLQUNqQjtBQUNELGtCQUFjLEVBQUUsQ0FBQztBQUNmLFlBQU0sRUFBRSxhQUFhO0FBQ3JCLFlBQU0sRUFBRSxNQUFNO0FBQ2QscUJBQWUsRUFBRSxNQUFNO0FBQ3ZCLGVBQVMsRUFBRSxDQUFDO0FBQ1YsaUJBQVMsRUFBQyxDQUFDO0FBQ1gsY0FBTSxFQUFFLGlCQUFpQjtBQUN6QixlQUFPLEVBQUU7QUFDUCxhQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJO1NBQ3JCO0FBQ0QsY0FBTSxFQUFFO0FBQ04sMEJBQWdCLEVBQUUsTUFBTTtTQUN6QjtBQUNELHNCQUFjLEVBQUMsR0FBRztPQUNuQixDQUFDO0tBQ0gsQ0FBQztHQUNILENBQUM7Q0FDSCxDQUFDO1FBdkZTLE9BQU8sR0FBUCxPQUFPOzs7Ozs7OztBQ0FYLElBQUksUUFBUSxHQUFHO0FBQ3BCLGVBQWEsRUFBRTtBQUNiLGFBQVMsRUFBQztBQUNSLGVBQVMsRUFBQztBQUNSLG1CQUFXLEVBQUMsRUFBRTtBQUNkLG9CQUFZLEVBQUMsRUFBRTtPQUNoQjtLQUNGO0FBQ0QsaUJBQWEsRUFBQztBQUNaLGNBQVEsRUFDUixDQUFDLHlEQUF5RCxDQUFDO0FBQzNELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3JEO0FBQ0QsaUJBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7S0FDcEI7QUFDRCxhQUFTLEVBQUM7QUFDUixjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDMUg7QUFDRCxpQkFBVyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQztLQUNwQjtBQUNELFlBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLDZCQUE2QixDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQztBQUM5RixnQkFBWSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsdUNBQXVDLEVBQUMsbUNBQW1DLEVBQUMsc0NBQXNDLENBQUM7QUFDN0gsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQ3REO0tBQ0Y7QUFDRCxjQUFVLEVBQUM7QUFDVCxjQUFRLEVBQUMsQ0FBQyx3Q0FBd0MsQ0FBQztBQUNuRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVCO0tBQ0Y7QUFDRCxXQUFPLEVBQUMsRUFBRTtBQUNWLFVBQU0sRUFBQztBQUNMLGNBQVEsRUFBQyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3ZELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNVI7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxj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LENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLDRDQUE0QyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsMEJBQTBCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQywwQkFBMEIsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnRkFBZ0YsRUFBQyxTQUFTLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0VBQWdFLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDbjhILENBQUM7UUE5SFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL2hvcml6b250YWxIZXhhRmFjdG9yeS5qcyc7XG5cbi8qIFJlYWQgZGF0YSBmcm9tIGZpbGVzLCB0byB1c2Ugd2l0aCB0ZXN0aW5nICovXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ2FtZURhdGEuanMnO1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3R5cGVEYXRhLmpzJztcbmltcG9ydCB7IG1hcERhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL21hcERhdGEuanMnO1xuXG4vKlxuMS4gRGF0YXQgeWhkZXNzw6QgcMO2dGvDtnNzw6QsIGt1dGVuIHTDpMOkIG55a3lpbmVuIHRlc3RpLWRhdGEuIEVsaSBub2kgdGVzdGl0IGRhdGF0IHRpZWRvc3Rvb24gamEgcGl0w6TDpCBtdXV0dGFhIG9pa2VhYW4gbXVvdG9vbiFcblxuWW91IHNob3VsZCB1c2UgdGhpcyBkYXRhIGluc3RlYWQgb2YgdGhlIHRlc3REYXRhIGJlbG93LiBZb3Ugc2hvdWxkIGNvbnZlcnQgdGhpcyBkYXRhIHRvIHN1aXQgdGhlIHN0YW5kYXJkcyBzbyB0aGF0IHRoZXJlXG5pcyBhbm90aGVyIGNsYXNzIC8gbW9kdWxlIHRoYXQgaGFuZGxlcyB0aGUgdHJhbnNmb3JtYXRpb24gYW5kIHlvdSBkZWZpbmUgYSBnb29kIHNldCBvZiBwcmluY2lwbGUgaG93IGl0J3MgZG9uZS4gRGF0YSBpbiB0aGlzOlxuXCJ7XG4gIFwib2JqVHlwZVwiOjIsXG4gIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjNcIixcbiAgXCJjb29yZFwiOntcInhcIjowLFwieVwiOjB9XG59XCJcbldoYXQgZG8gd2UgZG8gd2l0aCB0aGUgX2lkIGFuZCBzaG91bGQgdGhhdCBiZSByZXBsYWNlZCB3aXRoIGFjdHVhbCBkYXRhLCB3aGVuIHdlIGluc3RhbnRpYXRlIHRoZSBvYmplY3RzLlxuXG5BbHdheXMgcmVxdWVzdCBkYXRhIGZyb20gYmFja2VuZCB3aXRoIGdhbWVJRCBhbmQgdHVybiwgbGlrZTogZG9tYWluLmZpL0FQSS9tYXBEYXRhLzgzMjk0OGhmZGpzaDkzLzFcblxuLyogPT09PT09IFRlc3RzID09PT09PSAqL1xuZGVzY3JpYmUoXCJiYXNpYyBtYXAgLSB3aXRob3V0IHBsdWdpbnNcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBtYXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcENhbnZhc1wiKTtcbiAgLypsZXQgbWFwRGF0YSA9IHtcbiAgICBtYXBTaXplOiB7IHg6IDEwMCwgeTogMTAwIH0sXG4gICAgcGx1Z2luc1RvQWN0aXZhdGU6IGZhbHNlLFxuICAgIHN0YWdlczogW3tcbiAgICAgIHR5cGU6IFwiTWFwX3N0YWdlXCIsXG4gICAgICBjb29yZGluYXRlczogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgICAgZWxlbWVudDogXCIjY2FudmFzVGVycmFpblwiLFxuICAgICAgbGF5ZXJzOiBbe1xuICAgICAgICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdGVycmFpblwiLFxuICAgICAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgICAgIHR5cGVJbWFnZURhdGE6IFwidGVycmFpbkJhc2VcIixcbiAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDQwLCB5OiA0MCB9LFxuICAgICAgICAgICAgICAgIGltYWdlRGF0YTogMSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBzb21lQ3VzdG9tRGF0YTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDQwLCB5OiA0MCB9LFxuICAgICAgICAgICAgICAgIGltYWdlRGF0YTogMixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBzb21lQ3VzdG9tRGF0YTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgICAgfSx7XG4gICAgICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgICAgICBjb29yZGluYXRlczogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgbmFtZTogXCJ1bml0TGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgICAgIHR5cGU6IFwiT2JqZWN0c191bml0XCIsXG4gICAgICAgICAgICBuYW1lOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiBcInVuaXRcIixcbiAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSW5mYW50cnkgMVwiLFxuICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA2MCwgeTogNjAgfSxcbiAgICAgICAgICAgICAgaW1hZ2VEYXRhOiAzLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9XVxuICB9O1xuICAqL1xuXG5cbiAgZGVzY3JpYmUoXCI9PiBtYWtlIG1hcFwiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgbWFwID0gY3JlYXRlTWFwKG1hcENhbnZhcywgZ2FtZURhdGEsIG1hcERhdGEsIHR5cGVEYXRhKTtcblxuICAgIGl0KFwiPT4gZXhpc3RzXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gc3RhZ2UgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0ubmFtZSA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpLm5hbWUgID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRDaGlsZE5hbWVkKFwidGVycmFpblN0YWdlXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiBsYXllciBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRMYXllck5hbWVkKFwidW5pdExheWVyXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB0ZXJyYWluIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChOdW1iZXIoIG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlblsxXS55ICkgPT09IDQ4MCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlbi5sZW5ndGggPiAxKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChOdW1iZXIoIG1hcC5nZXRMYXllck5hbWVkKFwidW5pdExheWVyXCIpLmNoaWxkcmVuWzBdLnggKSA9PT0gNjApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHVuaXQgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbihkb25lKXtcbiAgICAgIG1hcC5pbml0KCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGlja0RvbmVGdW5jICk7XG5cbiAgICAgIGZ1bmN0aW9uIHRpY2tEb25lRnVuYyh0aWNrRG9uZSkge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG5cbiAgICAgIGV4cGVjdCggdHJ1ZSApLnRvQmVUcnV0aHkoKTtcblxuXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4gIC8vIG5vbmVcbn0pO1xuXG5cbi8qIHNvbWUgZnVuY3Rpb25zIHRvIGhlbHAgdGVzdHMgKi8iLCIvKlxuICogSmF2YVNjcmlwdCBNRDUgMS4wLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLypcbiAgICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpIHtcbiAgICAgICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgICovXG4gICAgZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xuICAgICAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgICAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XG4gICAgICAgIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcblxuICAgICAgICB2YXIgaSwgb2xkYSwgb2xkYiwgb2xkYywgb2xkZCxcbiAgICAgICAgICAgIGEgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgICAgIGIgPSAtMjcxNzMzODc5LFxuICAgICAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBvbGRhID0gYTtcbiAgICAgICAgICAgIG9sZGIgPSBiO1xuICAgICAgICAgICAgb2xkYyA9IGM7XG4gICAgICAgICAgICBvbGRkID0gZDtcblxuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsICAxMjM2NTM1MzI5KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCAgNjQzNzE3NzEzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgICAgICAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDUsIC03MDE1NTg2OTEpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sICA5LCAgMzgwMTYwODMpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDUsICA1Njg0NDY0MzgpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sICA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDJdLCAgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNCwgLTM3ODU1OCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA0XSwgMTEsICAxMjcyODkzMzUzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNCwgIDY4MTI3OTE3NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sICAgICAgMTEsIC0zNTg1MzcyMjIpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDZdLCAyMywgIDc2MDI5MTg5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCAgNTMwNzQyNTIwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICA3XSwgMTAsICAxMTI2ODkxNDE1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDYsICAxODczMzEzMzU5KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgICAgICAgICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgICAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgICAgICAgICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYSwgYiwgYywgZF07XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiAzMjsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgb3V0cHV0W2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogODsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweEZGKSA8PCAoaSAlIDMyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgYmtleSA9IHJzdHIyYmlubChrZXkpLFxuICAgICAgICAgICAgaXBhZCA9IFtdLFxuICAgICAgICAgICAgb3BhZCA9IFtdLFxuICAgICAgICAgICAgaGFzaDtcbiAgICAgICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgICAgIGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuICAgICAgICBoYXNoID0gYmlubF9tZDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcbiAgICAgICAgdmFyIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICAgICAgICBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhleF90YWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MEYpICtcbiAgICAgICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICAgKi9cbiAgICBmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICAgKi9cbiAgICBmdW5jdGlvbiByYXdfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYXdfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1KHN0cmluZywga2V5LCByYXcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleF9tZDUoc3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYXdfbWQ1KHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXhfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXdfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZDU7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQubWQ1ID0gbWQ1O1xuICAgIH1cbn0odGhpcykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbk1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcblxuQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuKi9cblxuLyogPT09PT0gM3JkIHBhcnR5IGxpYnJhcnkgaW1wb3J0cyA9PT09PSAqL1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdzeXN0ZW1qcyc7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW5faGV4YSB9IGZyb20gJy4uL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdF9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhJztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL21hcC9jb3JlL1VJJztcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbmxldCBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgT2JqZWN0X3RlcnJhaW46IE9iamVjdF90ZXJyYWluX2hleGEsXG4gIE9iamVjdF91bml0OiBPYmplY3RfdW5pdF9oZXhhXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG4vKlxuQGFyZ3VtZW50IHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbkNvb3JkaW5hdGVzIGFyZSBhbHdheXMgZGVmYXVsdGVkIHRvIDAsMCBpZiBub25lIGFyZSBnaXZlbi5cbntcbiAgbWFwU2l6ZTogY3JlYXRlanMuUmVjdGFuZ2xlLFxuICBwbHVnaW5zVG9BY3RpdmF0ZTogW1xuICAgIFwibWFwL21vdmUvbWFwX21vdmVcIixcbiAgICBcIm1hcC9GT1cvbWFwX0ZPV1wiXG4gIF0sXG4gIHN0YWdlczogW3tcbiAgICB0eXBlOiBcIm1hcC9jb3JlL01hcF9TdGFnZVwiLFxuICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICBsYXllcnM6IFt7XG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dLFxuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV0sXG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c191bml0XCIsXG4gICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY2FudmFzRWxlbWVudCwgZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcChjYW52YXNFbGVtZW50LCB7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyAqL1xuICAvKiBUaGUgc3lzdGVtIGRvZXMgbm90IHdvcmsgOihcbiAgaWYoZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwICYmIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcC5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLm1hcCh4ID0+IFN5c3RlbS5pbXBvcnQoeCkpKVxuICAgICAgLnRoZW4oKFttb2R1bGUxLCBtb2R1bGUyLCBtb2R1bGUzXSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBsdWdpbnMgbG9hZGVkXCIpO1xuICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xuICAgICAgfSk7XG4gIH1cbiAgKi9cblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICB0cnkge1xuICAgICAgdGhpc0xheWVyID0gbWFwLmFkZExheWVyKCBsYXllckRhdGEubmFtZSwgMiwgZmFsc2UsIGxheWVyRGF0YS5jb29yZCApO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtOlwiLCBsYXllckRhdGEudHlwZSwgZS5zdGFjayk7XG4gICAgfVxuXG4gICAgbGF5ZXJEYXRhLm9iamVjdEdyb3Vwcy5mb3JFYWNoKCBvYmplY3RHcm91cCA9PiB7XG4gICAgICBsZXQgc3ByaXRlc2hlZXQ7XG4gICAgICBsZXQgc3ByaXRlc2hlZXRUeXBlID0gb2JqZWN0R3JvdXAudHlwZUltYWdlRGF0YTtcblxuICAgICAgaWYoIXNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggc3ByaXRlc2hlZXRUeXBlLWRhdGFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldERhdGEgPSB0eXBlRGF0YS5ncmFwaGljRGF0YVtzcHJpdGVzaGVldFR5cGVdO1xuXG4gICAgICAgIHNwcml0ZXNoZWV0ID0gYWxsU3ByaXRlc2hlZXRzLmFkZFNwcml0ZXNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG4gICAgICB9XG5cbiAgICAgIG9iamVjdEdyb3VwLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0ID0+IHtcbiAgICAgICAgbGV0IG9ialR5cGVEYXRhID0gdHlwZURhdGEub2JqZWN0RGF0YVtzcHJpdGVzaGVldFR5cGVdW29iamVjdC5vYmpUeXBlXTtcblxuICAgICAgICBpZighb2JqVHlwZURhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZU51bWJlciA9IG9ialR5cGVEYXRhLmltYWdlO1xuICAgICAgICBsZXQgb2JqRGF0YSA9IHtcbiAgICAgICAgICB0eXBlRGF0YTogb2JqVHlwZURhdGEsXG4gICAgICAgICAgYWN0aXZlRGF0YTogb2JqZWN0LmRhdGFcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5ld09iamVjdCA9IG5ldyBmdW5jdGlvbnNJbk9ialtvYmplY3RHcm91cC50eXBlXSggb2JqZWN0LmNvb3JkLCBvYmpEYXRhLCBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCB7IHJhZGl1czogNDcgfSApO1xuICAgICAgICB0aGlzTGF5ZXIuYWRkQ2hpbGQoIG5ld09iamVjdCApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIG1hcC5tb3ZlTWFwKG1hcERhdGEuc3RhcnRQb2ludCk7XG5cbiAgcmV0dXJuIG1hcDtcblxuLypcbiAgQ3JlYXRlVGVycmFpblN0YWdlXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9iYXNlXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl90ZXJyYWluXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9kaXRoZXJcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3ByZXR0aWZpZXJcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3Jlc291cmNlXG4gIENyZWF0ZVVuaXRTdGFnZVxuICAgIF9DcmVhdGVVbml0TGF5ZXJfVW5pdFxuICAgIF9DcmVhdGVVbml0TGF5ZXJfQ2l0eVxuICBDcmVhdGVGT1dTdGFnZVxuICBDcmVhdGVEYXRhU3RhZ2VcbiAgQ3JlYXRlVUlTdGFnZVxuICAgIF9DcmVhdGVVSUxheWVyX2Fycm93XG4gICAgX0NyZWF0ZVVJTGF5ZXJfc2VsZWN0aW9uXG4qL1xufSIsIi8qKiBNYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG4gKlxuICogTWFwIGlzIGluc3RhbnRpYXRlZCBhbmQgdGhlbiBpbml0aWFsaXplZCB3aXRoIGluaXQtbWV0aG9kLlxuICpcbiAqIFBsdWdpbnMgY2FuIGJlIGFkZGVkIHdpdGggYWN0aXZhdGVQbHVnaW5zLW1ldGhvZCBieSBwcm9kaXZpbmcgaW5pdChtYXApIG1ldGhvZCBpbiB0aGUgcGx1Z2luLiBQbHVnaW5zIGFyZSBhbHdheXNcbiAqIGZ1bmN0aW9ucywgbm90IG9iamVjdHMgdGhhdCBhcmUgaW5zdGFudGlhdGVkLiBQbHVnaW5zIGFyZSBzdXBwb3NlZCB0byBleHRlbmQgdGhlIG1hcCBvYmplY3Qgb3IgYW55dGhpbmcgaW4gaXQgdmlhXG4gKiBpdCdzIHB1YmxpYyBtZXRob2RzLlxuICpcbiAqIEByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4gKiBAcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4vTWFwX3N0YWdlJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4vTWFwX2xheWVyJztcbmltcG9ydCB7IHJlc2l6ZVV0aWxzLCByZXNpemVVdGlscyB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHsgbWFwX2RyYWcgfSBmcm9tIFwiLi9tb3ZlL21hcF9kcmFnXCI7XG5pbXBvcnQgeyBtYXBfem9vbSB9IGZyb20gJy4vem9vbS9tYXBfem9vbSc7XG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4vZXZlbnRsaXN0ZW5lcnMnO1xuXG52YXIgX2RyYXdNYXBPbk5leHRUaWNrID0gZmFsc2U7XG52YXIgZXZlbnRsaXN0ZW5lcnM7XG5cbmV4cG9ydCBjbGFzcyBNYXAge1xuICAvKipcbiAgICogQHBhcmFtIHtET00gQ2FudmFzIGVsZW1lbnR9IGNhbnZhcyAtIENhbnZhcyB1c2VkIGJ5IHRoZSBtYXBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBkaWZmZXJlbnQgb3B0aW9ucyBmb3IgdGhlIG1hcCB0byBiZSBnaXZlbi5cbiAgICogQHJldHVybiBNYXAgaW5zdGFuY2UgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRpb25zKSB7XG4gICAgaWYoIWNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IubmFtZSArIFwiIG5lZWRzIGNhbnZhcyFcIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX3N0YWdlID0gbmV3IE1hcF9zdGFnZShcImRhZGR5U3RhZ2VcIiwgY2FudmFzKTtcbiAgICB0aGlzLm1vbW15TGF5ZXIgPSBuZXcgTWFwX2xheWVyKFwibW9tbXlMYXllclwiLCBvcHRpb25zLnR5cGUsIG9wdGlvbnMuc3ViQ29udGFpbmVycywgb3B0aW9ucy5zdGFydENvb3JkKTtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLm1vbW15TGF5ZXIpO1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICAgIHRoaXMuYWN0aXZhdGVkUGx1Z2lucyA9IFtdO1xuICAgIC8qIEFjdGl2YXRlIHRoZSBtYXAgem9vbSBhbmQgbWFwIGRyYWcgY29yZSBwbHVnaW5zICovXG4gICAgdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZSA9IFttYXBfem9vbSwgbWFwX2RyYWddO1xuICAgIHRoaXMubWFwU2l6ZSA9IG9wdGlvbnMubWFwU2l6ZSB8fCB7IHg6MCwgeTowIH07XG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSBmYWxzZTtcbiAgICB0aGlzLmV2ZW50Q0JzID0ge1xuICAgICAgZnVsbFNpemU6IHJlc2l6ZVV0aWxzLnNldFRvRnVsbFNpemUoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSksXG4gICAgICBmdWxsc2NyZWVuOiByZXNpemVVdGlscy50b2dnbGVGdWxsU2NyZWVuLFxuICAgICAgc2VsZWN0OiBudWxsLFxuICAgICAgZHJhZzogbnVsbCxcbiAgICAgIHpvb206IG51bGxcbiAgICB9O1xuICAgIHRoaXMuX2Z1bGxTaXplRnVuY3Rpb24gPSBudWxsO1xuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnModGhpcy5ldmVudENCcyk7XG4gIH1cbiAgLyoqIGluaXRpYWxpemF0aW9uIG1ldGhvZFxuICAgKiBAcGFyYW0gW0FycmF5XSBwbHVnaW5zIC0gUGx1Z2lucyB0byBiZSBhY3RpdmF0ZWQgZm9yIHRoZSBtYXAuIE5vcm1hbGx5IHlvdSBzaG91bGQgZ2l2ZSB0aGUgcGx1Z2lucyBoZXJlIGluc3RlYWQgb2ZcbiAgICogc2VwYXJhdGVseSBwYXNzaW5nIHRoZW0gdG8gYWN0aXZhdGVQbHVnaW5zIG1ldGhvZFxuICAgKiBAcGFyYW0ge3g6ID8geTo/fSBjb29yZCAtIFN0YXJ0aW5nIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRpY2tDQiAtIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aWNrLiBUaWNrIGNhbGxiYWNrIGlzIGluaXRpYXRlZCBpbiBldmVyeSBmcmFtZS4gU28gbWFwIGRyYXdzIGhhcHBlblxuICAgKiBkdXJpbmcgdGlja3NcbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgaW5pdChwbHVnaW5zLCBjb29yZCwgdGlja0NCKSB7XG4gICAgaWYgKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cblxuICAgIGlmKGNvb3JkKSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIueCA9IGNvb3JkLng7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIueSA9IGNvb3JkLnk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3T25OZXh0VGljaygpO1xuICAgIF9kZWZhdWx0VGljayh0aGlzKTtcbiAgICB0aWNrQ0IgJiYgdGhpcy5jdXN0b21UaWNrT24odGlja0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBUaGUgY29ycmVjdCB3YXkgdG8gdXBkYXRlIC8gcmVkcmF3IHRoZSBtYXAuIENoZWNrIGhhcHBlbnMgYXQgZXZlcnkgdGljayBhbmQgdGh1cyBpbiBldmVyeSBmcmFtZS5cbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgZHJhd09uTmV4dFRpY2soKSB7XG4gICAgX2RyYXdNYXBPbk5leHRUaWNrID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBUaGUgY29ycmVjdCB3YXkgdG8gdXBkYXRlIC8gcmVkcmF3IHRoZSBtYXAuIENoZWNrIGhhcHBlbnMgYXQgZXZlcnkgdGljayBhbmQgdGh1cyBpbiBldmVyeSBmcmFtZS5cbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9zdGFnZS5jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIobGF5ZXIgPT4ge1xuICAgICAgcmV0dXJuIGxheWVyW2F0dHJpYnV0ZV0gPT09IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWdlO1xuICB9XG5cbiAgZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xuICB9XG4gIC8qKiBBbGwgcGFyYW1ldGVycyBhcmUgcGFzc2VkIHRvIE1hcF9sYXllciBjb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIGNyZWF0ZWQgTWFwX2xheWVyIGluc3RhbmNlICovXG4gIGFkZExheWVyKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XG4gICAgdmFyIGxheWVyID0gbmV3IE1hcF9sYXllcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBjb29yZCk7XG5cbiAgICB0aGlzLm1vbW15TGF5ZXIuYWRkQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcF9sYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgb2JqZWN0IHRvIGJlIHJlbW92ZWQgKi9cbiAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKiBAcmV0dXJuIGxheWVyIHdpdGggdGhlIHBhc3NlZCBsYXllciBuYW1lICovXG4gIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vbW15TGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUuIEkuZS4geyB4OiA1LCB5OiAwIH1cbiAgICogd2l0aCB0aGlzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlIGhvcml6b250YWxseSA1IHBpemVscyBhbmQgdmVydGljYWxseSBzdGF5IGF0IHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIG1vdmVNYXAoY29vcmRpbmF0ZXMpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIubW92ZShjb29yZGluYXRlcyk7XG4gICAgdGhpcy5kcmF3T25OZXh0VGljaygpO1xuICAgIHRoaXMubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogQ2FjaGUgdGhlIG1hcC4gVGhpcyBwcm92aWRlcyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBib29zdCwgd2hlbiB1c2VkIGNvcnJlY3RseS4gY2FjaGVNYXAgaXRlcmF0ZXMgdGhyb3VnaCBhbGwgdGhlXG4gICAqIGxheWVyIG9uIHRoZSBtYXAgYW5kIGNhY2hlcyB0aGUgb25lcyB0aGF0IHJldHVybiB0cnVlIGZyb20gZ2V0Q2FjaGVFbmFibGVkLW1ldGhvZC5cbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUuIEkuZS4geyB4OiA1LCB5OiAwIH1cbiAgICogd2l0aCB0aGlzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlIGhvcml6b250YWxseSA1IHBpemVscyBhbmQgdmVydGljYWxseSBzdGF5IGF0IHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGNhY2hlTWFwKCkge1xuICAgIGlmKHRoaXMubW9tbXlMYXllci5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5tb21teUxheWVyLmNhY2hlKDAsIDAsIHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9tbXlMYXllci5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgaWYoY2hpbGQuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgICAgICBjaGlsZC5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogaXRlcmF0ZXMgdGhyb3VnaCB0aGUgbWFwIGxheWVycyBhbmQgcmV0dXJucyBtYXRjaGluZyBvYmplY3RzIG9uIGdpdmVuIGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIG1hcCBjb29yZGluYXRlIHVuZGVyIHdoaWNoIHdlIHdhbnQgdG8gcmV0cmlldmUgYWxsIHRoZSBvYmplY3RzLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGdldE9iamVjdHNVbmRlck1hcFBvaW50KGNvb3JkKSB7XG4gICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgIHRoaXMubW9tbXlMYXllci5nZXRPYmplY3RzVW5kZXJQb2ludChjb29yZCk7XG5cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxuICAvKiogUmVzaXplIHRoZSBjYW52YXMgdG8gZmlsbCB0aGUgd2hvbGUgYnJvd3NlciBhcmVhLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNpemUgYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXG4gIHRoZSBldmVudGxpc3RlbmVyIGNhbGxiYWNrIHVzZSB0aGlzLmV2ZW50Q0JzICovXG4gIHRvZ2dsZUZ1bGxTaXplKCkge1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKTtcbiAgfVxuICAvKiogVG9nZ2xlcyBmdWxsc2NyZWVuIG1vZGUuIFVzZXMgdGhpcy5ldmVudENCcy5mdWxsc2NyZWVuIGFzIGNhbGxiYWNrLCBzbyB3aGVuIHlvdSBuZWVkIHRvIG92ZXJ3cml0ZVxuICB0aGUgZXZlbnRsaXN0ZW5lciBjYWxsYmFjayB1c2UgdGhpcy5ldmVudENCcyAqL1xuICB0b2dnbGVGdWxsU2NyZWVuICgpIHtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVGdWxsU2NyZWVuKCk7XG4gIH1cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyBmb3IgdGhlIG1hcC4gTXVzdCBiZSBpbiBhcnJheSBmb3JtYXQ6XG4gIFt7XG4gICAgbmFtZTogZnVuY3Rpb24gbmFtZSxcbiAgICBhcmdzOiBbXG4gICAgICBGaXJzdCBhcmd1bWVudCxcbiAgICAgIHNlY29uZCBhcmd1bWVudCxcbiAgICAgIC4uLlxuICAgIF1cbiAgfV0gKi9cbiAgYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnNBcnJheSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZS5jb25jYXQocGx1Z2luc0FycmF5KTtcblxuICAgIGFsbFBsdWdpbnMuZm9yRWFjaChwbHVnaW5Ub1VzZSA9PiB7XG4gICAgICBpZih0aGlzLmFjdGl2YXRlZFBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gcGx1Z2luVG9Vc2U7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXS5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gPSB0cnVlO1xuICAgICAgICB0aGlzLnBsdWdpbnNUb0FjdGl2YXRlID0gW107XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGN1c3RvbVRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IGZ1bmN0aW9uKCkge307XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjdXN0b21UaWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qIGdldHRlciBhbmQgc2V0dGVyICovXG4gIG1hcE1vdmVkKHllc09yTm8pIHtcbiAgICBpZih5ZXNPck5vICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubWFwSW5Nb3ZlID0geWVzT3JObztcbiAgICAgIHJldHVybiB5ZXNPck5vO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hcEluTW92ZTtcbiAgfVxuICBzZXRQcm90b3R5cGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5fX3Byb3RvX19bcHJvcGVydHldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4vKiBUaGlzIGhhbmRsZXMgdGhlIGRlZmF1bHQgZHJhd2luZyBvZiB0aGUgbWFwLCBzbyB0aGF0IG1hcCBhbHdheXMgdXBkYXRlcyB3aGVuIGRyYXdPbk5leHRUaWNrID09PSB0cnVlLiBUaGlzIHRpY2tcbmNhbGxiYWNrIGlzIGFsd2F5cyBzZXQgYW5kIHNob3VsZCBub3QgYmUgcmVtb3ZlZCBvciBvdmVycnVsZWQgKi9cbmZ1bmN0aW9uIF9kZWZhdWx0VGljayhtYXApIHtcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIF90aWNrRnVuYyk7XG5cbiAgcmV0dXJuIF90aWNrRnVuYztcblxuICBmdW5jdGlvbiBfdGlja0Z1bmMoKSB7XG4gICAgaWYoX2RyYXdNYXBPbk5leHRUaWNrID09PSB0cnVlKSB7XG4gICAgICBfZHJhd01hcChtYXApO1xuICAgICAgX2RyYXdNYXBPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4vKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGRyYXcgdGhlIG1hcCAqL1xuZnVuY3Rpb24gX2RyYXdNYXAobWFwKSB7XG4gIG1hcC5fc3RhZ2UudXBkYXRlKCk7XG5cbiAgcmV0dXJuIG1hcDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSB2YWxpZGF0b3IgbW9kdWxlXG4qL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PSBDb25zdGFudHMgPT09PT0gKi9cbmNvbnN0IFRZUEVTID0ge1xuICBqdXN0U3ViQ29udGFpbmVyczogMSxcbiAgbm9TdWJDb250YWluZXJzOiAyLFxuICBpbWFnZXNJblN1YkNvbnRhaW5lcnM6IDNcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfbGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBjb29yZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSBjb29yZCA/ICggY29vcmQueCB8fCAwICkgOiAwO1xuICAgIHRoaXMueSA9IGNvb3JkID8gKCBjb29yZC55IHx8IDAgKSA6IDA7XG4gICAgdGhpcy5zdXBlclByb3RvdHlwZSA9IHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy50eXBlID0gc3ViQ29udGFpbmVycyA/IFRZUEVTLmltYWdlc0luU3ViQ29udGFpbmVycyA6ICggdHlwZSB8fCBUWVBFUy5ub1N1YkNvbnRhaW5lcnMgKTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyYWN0aXZlID0gZmFsc2U7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdmFibGUgPSB0cnVlO1xuICAgIHRoaXMuem9vbWFibGUgPSB0cnVlO1xuICB9XG4gIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGRQcm90b3R5cGUobmFtZSwgZnVuY3Rpb25Ub0FkZCkge1xuICAgIHN1cGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uVG9BZGQ7XG4gIH1cbiAgLyogb3ZlcmxvYWRlZCBpbmhlcml0ZWQgbWV0aG9kICovXG4gIGFkZENoaWxkVG9TdWJDb250YWluZXIob2JqZWN0LCBpbmRleCkge1xuICAgIGxldCBmdW5jdGlvblRvVXNlID0gaW5kZXggPyBcIl9hZGRDaGlsZEF0XCIgOiBcIl9hZGRDaGlsZFwiO1xuXG4gICAgaWYgKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBDb250YWluZXIgZGlyZWN0bHkuIFdldGhlciBpdCBpcyBDb250YWluZXIgb3IgQml0bWFwIGV0Yy4gKi9cbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBjb3JyZWN0IHN1YkNvbnRhaW5lci4gRm9yIGJldHRlciBsb2dpYyBhbmQgcGVyZm9ybWFuY2UgKi9cbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBtb3ZlKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKHRoaXMubW92YWJsZSkge1xuICAgICAgdGhpcy54ICs9IGNvb3JkaW5hdGVzLng7XG4gICAgICB0aGlzLnkgKz0gY29vcmRpbmF0ZXMueTtcbiAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICEhdGhpcy51c2VTdWJjb250YWluZXJzO1xuICB9XG4gIGlzU2V0VmlzaWJsZSgpIHsgfVxuICBzZXRWaXNpYmxlKCkgeyB9XG4gIHN0YXRpYyBnZXRUeXBlKG5hbWUpIHtcbiAgICByZXR1cm4gVFlQRVNbbmFtZV07XG4gIH1cbn1cblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IF9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnVzZVN1YmNvbnRhaW5lcnM7XG4gIH1cbiAgaXNTZXRWaXNpYmxlKCkgeyB9XG4gIHNldFZpc2libGUoKSB7IH1cbn1cbiovXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldENvcnJlY3RDb250YWluZXIoeCwgeSkge1xuICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHRoaXMuZ2V0T2JqZWN0VW5kZXJQb2ludCh4LCB5KTtcblxuICByZXR1cm4gY29ycmVjdFN1YkNvbnRhaW5lcjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSB2YWxpZGF0b3IgbW9kdWxlXG4qL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX3N0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3RhZ2Uge1xuICAvKiBUYWtlcyB0aGUgY2FudmFzIGVsZW1lbnQgYXMgYXJndW1lbnQgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzLCBzdGFnZUJvdW5kcykge1xuICAgIGlmKCFjYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihNYXBfc3RhZ2UuY29uc3RydWN0b3IubmFtZSArIFwiIG5lZWRzIGNhbnZhcyFcIilcbiAgICB9XG5cbiAgICBzdXBlcihjYW52YXMpO1xuXG4gICAgaWYoc3RhZ2VCb3VuZHMpIHtcbiAgICAgIHRoaXMuc2V0Qm91bmRzKDAsIDAsIHN0YWdlQm91bmRzLngsIHN0YWdlQm91bmRzLnkpO1xuICAgIH1cblxuICAgIHRoaXMuc3VwZXJQcm90b3R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nIEFORCBnZXR0aW5nIGNoaWxkcmVuIGJ5IG5hbWUuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIC8qIENvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gIH1cbiAgYWRkUHJvdG90eXBlKG5hbWUsIGZ1bmN0aW9uVG9BZGQpIHtcbiAgICBzdXBlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvblRvQWRkO1xuICB9XG4gIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBmb3IgKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgIGlmIChsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZCA9IGxheWVyLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKiBUaGUgbm9kZS1lYXNlbCwgbm9yIG1pbmlmaWVkIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBTcHJpdGVTdGFnZSAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovXG5cblxuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuaW1wb3J0IFNwcml0ZVN0YWdlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlU3RhZ2UnO1xuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVTdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZVN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGlzIGNsYXNzIG5lZWRzIHRvIGJlIGdvbmUgdGhyb3VnaCBjYXJlZnVsbHksIGl0IGhhcyBiZWVuIGNvcGllZCBmcm9tIGFuIG9sZGVyIHZlcnNpb24gc3RyYWlnaHQuIFRoZSB2ZXJzaW9uIHdhcyBFUzVcbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YVxuKi9cblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJnZW5lcmFsIE9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcblxuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gY3VycmVudEZyYW1lTnVtYmVyO1xuXG4gICAgLyogRXhlY3V0ZSBpbml0aWFsIGRyYXcgZnVuY3Rpb24gKi9cbiAgICB0aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuXG4gICAgLyogb3B0aW1pemF0aW9ucyAqL1xuICAgIHRoaXMuc2hhZG93ID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gU2hvdWxkIGJlIGVuYWJsZWQsIGlmIHRoZSBsYXllciBpcyBiZWluZyBpbnRlcmFjdGVkIHdpdGguIExpa2UgdW5pdCBsYXllci4gVGhpcyB3YXkgd2UgY2FuIHVzZSBjdXJzb3IgcG9pbnRlciBldGMuXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBGT1IgREVCVUdHSU5HIEFORCBTRUVJTkcgVEhBVCBMSVNURU5FUlMgQVJFIEFUVEFDSEVEOlxuICAgIC8vdGhpcy53aWxsVHJpZ2dlclxuICB9XG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICBjb25zb2xlLmxvZyhcIkhBQUFcIilcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgLyogVGhlIG1vdXNlIGNoZWNrIGhhcyBiZWVuIGVuYWJsZWQgb24gaGlnaGVyIHRpZXIsIHNvIG5vIG5lZWQgZm9yIHRoaXNcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlOyAqL1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZHJhd05ld0ZyYW1lKHgsIHksIG5ld0ZyYW1lTnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBuZXdGcmFtZU51bWJlcjtcblxuICAgIHJldHVybiB0aGlzLmlubmVyRHJhdyh4LCB5KTtcbiAgfVxuICAvKiBEdW5ubyBpZiB3ZSBuZWVkIHRoaXMgYW5kIHNvIG9uLiBUaGlzIHdhcyBpbiB0aGUgb2xkIHZlcnNpb24gKi9cbiAgZ2xvYmFsQ29vcmRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBOdW1iZXIoIHRoaXMueCArIHRoaXMucGFyZW50LnggKSxcbiAgICAgIHk6IE51bWJlciggdGhpcy55ICsgdGhpcy5wYXJlbnQueSApXG4gICAgfTtcbiAgfVxuICBnZXRCb3VuZHNGcm9tRnJhbWVzKCkge1xuICAgIHJldHVybiB0aGlzLnNwcml0ZVNoZWV0LmdldEZyYW1lQm91bmRzKCB0aGlzLmN1cnJlbnRGcmFtZSApO1xuICB9XG59IiwiLyoqXG4gIE1haW4gY2xhc3MgZm9yIHNob3dpbmcgVUkgb24gdGhlIG1hcC4gTGlrZSB1bml0IHNlbGVjdGlvbnMgYW5kIHN1Y2guIEhhcyBub3RoaW5nIHRvIGRvIHdpdGggc2hvd2luZyBvZmYtbWFwIGRhdGEuXG4gIEdvb2QgZXhhbXBsZXMgZm9yIHdoYXQgdGhpcyBzaG93cyBhcmU6IHNlbGVjdGVkIHVuaXRzLWxpc3QsIHNlbGVjdGlvbiBoaWdobGlnaHQgKGxpa2UgYSBjaXJjbGUgb24gdGhlIHNlbGVjdGVkIHVuaXQpIGFuZFxuICBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3AgaW4gdGhlIG1hcC5cbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NvcGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBVSSAoZ2l2ZW5VSVRoZW1lLCBnaXZlbk1hcCkge1xuICAvKiBUaGlzIGlzIGEgc2luZ2xldG9uIGNsYXNzLCBzbyBpZiBhbHJlYWR5IGluc3RhbnRpYXRlZCByZXR1cm4gc2NvcGUgKi9cbiAgaWYgKHNjb3BlKSB7XG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgaWYgKCFnaXZlblVJVGhlbWUgfHwgIWdpdmVuTWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVUktbW9kdWxlIHJlcXVpcmVzIFVJVGhlbWUgYW5kIG1hcE9ialwiKTtcbiAgfVxuXG4gIHZhciBtYXAgPSBnaXZlbk1hcDtcbiAgdmFyIFVJVGhlbWUgPSBnaXZlblVJVGhlbWU7XG4gIHNjb3BlID0ge307XG5cbiAgc2NvcGUuc2hvd1NlbGVjdGlvbnMgPSBmdW5jdGlvbiBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgcmV0dXJuIFVJVGhlbWUuc2hvd1NlbGVjdGlvbnMob2JqZWN0cyk7XG4gIH07XG4gIHNjb3BlLmhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0ID0gZnVuY3Rpb24gaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3Qob2JqZWN0KSB7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIi8qKlxuICBUaGUgc2ltcGxlc3QgZGVmYXVsdCBVSSBpbXBsZW1lbnRhdGlvbi4gSG9sZHM6XG4gIC0gU2VsZWN0aW9uIGhpZ2hsaWdodCBvZiBvYmplY3RcbiAgLSBTZWxlY3Rpb24gbGlzdCBvZiB1bml0cyBhdCB0aGUgaGV4YWdvblxuKi9cblxuLyogPT09PT09IDNyZCBwYXJ0eSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjbGFzcyBVSV9kZWZhdWx0IHtcbiAgY29uc3RydWN0b3IobW9kYWwsIHN0eWxlcykge1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpYWxvZ1wiKVswXTtcbiAgICB0aGlzLnN0eWxlcyA9IHN0eWxlcyB8fCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0YwRjBGMFwiXG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2luZ0VsZW1lbnRzID0gX0RPTUVsZW1lbnRzVG9BcnJheSh0aGlzLm1vZGFsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9jbG9zZVwiKSk7XG4gIH1cbiAgc2hvd1NlbGVjdGlvbnMob2JqZWN0cykge1xuICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIm9iamVjdHM6PGJyPlwiO1xuICAgICAgb2JqZWN0cy5tYXAoIG9iamVjdCA9PiB7XG4gICAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdC5kYXRhLnR5cGVEYXRhLm5hbWUgKyBcIjxicj5cIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIlNFTEVDVEVEOjxicj5cIjtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdHNbMF0uZGF0YS50eXBlRGF0YS5uYW1lO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KCBlbGVtZW50LCBzZWxmLm1vZGFsLmNsb3NlLmJpbmQoc2VsZi5tb2RhbCkgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudChlbGVtZW50LCBjbG9zZUNCKSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2xvc2VDQigpO1xuICAgICAgfSk7XG59XG5mdW5jdGlvbiBfRE9NRWxlbWVudHNUb0FycmF5KGVsZW1lbnRzKSB7XG4gIGlmICghZWxlbWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3RvciArIFwiIGZ1bmN0aW9uIG5lZWRzIGVsZW1lbnRzXCIpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgdmFyIGVsZW1lbnRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50QXJyYXkucHVzaChlbGVtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudEFycmF5O1xufSIsIid1c2VyIHN0cmljdCc7XG5cbnZhciBzaW5nbGV0b25TY29wZTtcblxuZXhwb3J0IGxldCBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJNb2R1bGUobWFwQ0JzKSB7XG4gIGlmKHNpbmdsZXRvblNjb3BlKSB7XG4gICAgcmV0dXJuIHNpbmdsZXRvblNjb3BlO1xuICB9XG5cbiAgc2luZ2xldG9uU2NvcGUgPSB7XG4gICAgc3RhdGVzOiB7fVxuICB9O1xuXG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVGdWxsU2l6ZUxpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWFwQ0JzLmZ1bGxTaXplQ0IpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWFwQ0JzLmZ1bGxTaXplQ0IpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5mdWxsU2l6ZTtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRnVsbHNjcmVlbiA9IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgcmV0dXJuIG1hcENCcy5mdWxsc2NyZWVuO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVab29tTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVab29tTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnpvb20gIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuem9vbTtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRHJhZ0xpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRHJhZ0xpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuZHJhZyk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5kcmFnO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVTZWxlY3RMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdExpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuc2VsZWN0O1xuICB9O1xuXG4gIHJldHVybiBzaW5nbGV0b25TY29wZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuLyogZXZlbnRsaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24sIHNvIHdlIG1pZ2h0IGFzIHdlbGwgZGVjbGFyZSBpdCBoZXJlICovXG52YXIgZXZlbnRsaXN0ZW5lcnM7XG5cbmV4cG9ydCBsZXQgbWFwX2RyYWcgPSAoZnVuY3Rpb24gbWFwX2RyYWcoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICAvKiBGdW5jdGlvbiBmb3Igc2V0dGluZyBhbmQgZ2V0dGluZyB0aGUgbW91c2Ugb2Zmc2V0LiBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCBib3R0b20gKi9cbiAgdmFyIG9mZnNldENvb3JkcyA9IF9vZmZzZXRDb29yZHMoKTtcblxuICAvKiA9PT09PSBGb3IgdGVzdGluZyA9PT09PSAqL1xuICBzY29wZS5fc3RhcnREcmFnTGlzdGVuZXIgPSBfc3RhcnREcmFnTGlzdGVuZXI7XG5cbiAgc2NvcGUucGx1Z2luTmFtZSA9IG1hcF9kcmFnLm5hbWU7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcbiAgICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKG1hcC5ldmVudENCcyk7XG4gICAgbWFwLmV2ZW50Q0JzLmRyYWcgPSBfc3RhcnREcmFnTGlzdGVuZXIobWFwKTtcblxuICAgIC8vbWFwLnNldExpc3RlbmVyKFwibW91c2Vkb3duXCIsIF9zdGFydERyYWdMaXN0ZW5lcihtYXApKTtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVEcmFnTGlzdGVuZXIoKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9zdGFydERyYWdMaXN0ZW5lciggbWFwICkge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgeDogZS54LFxuICAgICAgICAgIHk6IGUueVxuICAgICAgICB9KTtcbiAgICAgICAgLyogV2UgdGFrZSBhbGwgdGhlIGV2ZW50bGlzdGVuZXJzIHVuYmluZGluZ3MgdG8gdGhpcyBhcnJheSwgc28gd2UgY2FuIHVuYmluZCB0aGVtIHdoZW4gdGhlIG1vdXNlIGlzIHVwICovXG5cbiAgICAgICAgdmFyIG1vdmVDYWxsYmFjazEgPSBfZHJhZ0xpc3RlbmVyKG1hcCk7XG4gICAgICAgIHZhciBtb3VzZXVwQ2FsbGJhY2sgPSBfc2V0dXBNb3VzZXVwTGlzdGVuZXIobWFwKTtcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmVDYWxsYmFjazEpO1xuICAgICAgICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfc2V0dXBNb3VzZXVwTGlzdGVuZXIobWFwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZXVwQ2FsbGJhY2spO1xuICAgICAgICAgIF9tYXBNb3ZlZChtYXApO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLyogRXZlbnQgbGlzdGVuZXJzIGFyZSBpbiB0aGVpciBzZXBhcmF0ZSBmaWxlOyBldmVudExpc3RlbmVycy5qcyAqL1xuICAgICAgZnVuY3Rpb24gX2RyYWdMaXN0ZW5lcihtYXApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZHJhZ2dlcihlKSB7XG4gICAgICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XG4gICAgICAgICAgICAvKiBTbyB0aGF0IHRoZSBldmVudHMgd2lsbCBzdG9wIHdoZW4gbW91c2UgaXMgdXAsIGV2ZW4gdGhvdWdoIG1vdXNldXAgZXZlbnQgd291bGRuJ3QgZmlyZSAqL1xuICAgICAgICAgICAgaWYoZS5idXR0b25zID09PSAwKSB7XG4gICAgICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZXVwQ2FsbGJhY2spO1xuICAgICAgICAgICAgICBfbWFwTW92ZWQobWFwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldENvb3Jkcy5nZXRPZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBtb3ZlZCA9IHtcbiAgICAgICAgICAgICAgeDogZS54IC0gb2Zmc2V0LngsXG4gICAgICAgICAgICAgIHk6IGUueSAtIG9mZnNldC55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihtb3ZlZC54ICE9PSAwIHx8IG1vdmVkLnkgIT09IDApIHtcbiAgICAgICAgICAgICAgbWFwLm1vdmVNYXAobW92ZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWFwLm1hcE1vdmVkKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgICAgIHg6IGUueCxcbiAgICAgICAgICAgICAgeTogZS55XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogVGhlIG1vdXNlIGhhcyBiZWVuIG1vdmVkIGFmdGVyIHByZXNzaW5nLiBUaGlzIHByZXZlbnQgdGhlIGNsaWNrXG4gICAgICAgICAgICAgIGV2ZW50IHRvIGZpcmUgYXQgdGhlIHNhbWUgdGltZSB3aXRoIHRoZSBtb3VzZURvd24gLyBkcmFnZ2luZyBldmVudFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vbWFwLm1vdXNlTW92ZWQoIHRydWUgKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyogPT09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09PSAqL1xuICBmdW5jdGlvbiBfb2Zmc2V0Q29vcmRzKCkge1xuICAgIHZhciBzY29wZSA9IHt9O1xuICAgIHZhciBvZmZzZXRDb29yZHM7XG5cbiAgICBzY29wZS5zZXRPZmZzZXQgPSBmdW5jdGlvbiBzZXRPZmZzZXQoY29vcmRzKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzID0gY29vcmRzO1xuICAgIH07XG4gICAgc2NvcGUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gZ2V0T2Zmc2V0KCkge1xuICAgICAgcmV0dXJuIG9mZnNldENvb3JkcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNjb3BlO1xuICB9O1xufSkoKTtcblxuLyogV2l0aG91dCB0aGlzLCB0aGUgb3RoZXIgZXZlbnRMaXN0ZW5lcnMgbWlnaHQgZmlyZSBpbmFwcHJvcHJpYXRlIGV2ZW50cy4gKi9cbmZ1bmN0aW9uIF9tYXBNb3ZlZChtYXApIHtcbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgbWFwLm1hcE1vdmVkKGZhbHNlKTtcbiAgfSwgMSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFzaCBmcm9tICdibHVlaW1wLW1kNSc7XG5cbmxldCBhbGxTcHJpdGVzaGVldHMgPSBbXTtcbmxldCBhbGxTcHJpdGVzaGVldElEcyA9IFtdO1xuXG4vKiBTaW5nbGV0b24gc28gd2UgZG9uJ3QgdXNlIGNsYXNzIGRlZmluaXRpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVzaGVldExpc3QgKCkge1xuICBsZXQgc2NvcGUgPSB7fTtcblxuICBzY29wZS5hZGRTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICBsZXQgc3ByaXRlU2hlZXQ7XG5cbiAgICBpZiAoc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzKCBfY3JlYXRlSUQoIHNwcml0ZXNoZWV0RGF0YSApICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxuICAgIGFsbFNwcml0ZXNoZWV0cy5wdXNoKCBzcHJpdGVTaGVldCApO1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldCkge1xuXG4gIH07XG4gIHNjb3BlLmdldEFsbFNwcml0ZXNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuICBzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXRJRCkge1xuICAgIHJldHVybiAoIGFsbFNwcml0ZXNoZWV0SURzLmluZGV4T2YoIHNwcml0ZXNoZWV0SUQgKSA+IC0xICk7XG4gIH07XG4gIGZ1bmN0aW9uIF9jcmVhdGVJRCAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuICggc3ByaXRlc2hlZXREYXRhLmltYWdlcy50b1N0cmluZygpICk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsImV4cG9ydCB2YXIgbW91c2VVdGlscyA9ICggZnVuY3Rpb24gbW91c2VVdGlscygpIHtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgLyoqIFRoaXMgZnVuY3Rpb24gaXMgZnJvbTogaHR0cDovL3d3dy5hZG9tYXMub3JnL2phdmFzY3JpcHQtbW91c2Utd2hlZWwvXG4gICAgSXQgZGV0ZWN0cyB3aGljaCB3YXkgdGhlIG1vdXNld2hlZWwgaGFzIGJlZW4gbW92ZWRcblxuICAgIEBwYXJhbSB7RXZlbnR9IGV2ZW50IHBhc3MgdGhlIGV2ZW50IHRvIGRlbHRhRnJvbVdoZWVsXG4gICAgQHJldHVybiBkZWx0YS4gUG9zaXRpdmUgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIHVwLCBhbmQgbmVnYXRpdmUsIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCBkb3duLlxuICAgICovXG4gIHNjb3BlLmRlbHRhRnJvbVdoZWVsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICB2YXIgZGVsdGEgPSAwO1xuXG4gICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuXG4gICAgIGlmICggZXZlbnQud2hlZWxEZWx0YSApIHsgLyogSUUvT3BlcmEuICovXG4gICAgICAgIGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgfSBlbHNlIGlmICggZXZlbnQuZGV0YWlsICkgeyAvKiogTW96aWxsYSBjYXNlLiAqL1xuICAgICAgICAvKiBJbiBNb3ppbGxhLCBzaWduIG9mIGRlbHRhIGlzIGRpZmZlcmVudCB0aGFuIGluIElFLlxuICAgICAgICAgKiBBbHNvLCBkZWx0YSBpcyBtdWx0aXBsZSBvZiAzLiAqL1xuICAgICAgICBkZWx0YSA9IC1ldmVudC5kZXRhaWwgLyAzO1xuICAgICB9XG4gICAgIC8qIFByZXZlbnQgZGVmYXVsdCBhY3Rpb25zIGNhdXNlZCBieSBtb3VzZSB3aGVlbC4gSXQgbWlnaHQgYmUgdWdseSAqL1xuICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgIC8qIElmIGRlbHRhIGlzIG5vbnplcm8sIGhhbmRsZSBpdCwgb3RoZXJ3aXNlIHNjcmFwIGl0IEJhc2ljYWxseSwgZGVsdGEgaXMgbm93IHBvc2l0aXZlIGlmXG4gICAgIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi4gKi9cbiAgICAgaWYgKCBkZWx0YSApIHJldHVybiBkZWx0YTtcbiAgfTtcbiAgLyoqIERldGVjdCByaWdodCBjbGljayAqL1xuICBzY29wZS5pc1JpZ2h0Q2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgIHZhciByaWdodGNsaWNrO1xuXG4gICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuICAgICBpZiAoIGV2ZW50LmJ1dHRvbnMgKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b25zID09IDIgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LndoaWNoICkgcmlnaHRjbGljayA9ICggZXZlbnQud2hpY2ggPT0gMyApO1xuICAgICBlbHNlIGlmICggZXZlbnQuYnV0dG9uICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9uID09IDIgKTtcblxuICAgICBpZiAoIHJpZ2h0Y2xpY2sgKSByZXR1cm4gdHJ1ZTtcblxuICAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIHJldHVybiBzY29wZTtcbn0gKSgpO1xuZXhwb3J0IHZhciByZXNpemVVdGlscyA9IHtcbiAgdG9nZ2xlRnVsbFNjcmVlbjogZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmJvZHk7IC8vIE1ha2UgdGhlIGJvZHkgZ28gZnVsbCBzY3JlZW4uXG4gICAgdmFyIGlzSW5GdWxsU2NyZWVuID0gKCBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAmJiBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAhPT0gbnVsbCApIHx8XG4gICAgICAgKFxuICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuICk7XG5cbiAgICBpc0luRnVsbFNjcmVlbiA/IGNhbmNlbEZ1bGxTY3JlZW4oIGRvY3VtZW50ICkgOiByZXF1ZXN0RnVsbFNjcmVlbiggZWxlbSApO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU3ViIGZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGNhbmNlbEZ1bGxTY3JlZW4oIGVsICkge1xuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwuY2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tb3pDYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwuZXhpdEZ1bGxzY3JlZW47XG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBjYW5jZWwgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0RnVsbFNjcmVlbiggZWwgKSB7XG4gICAgICAgLy8gU3VwcG9ydHMgbW9zdCBicm93c2VycyBhbmQgdGhlaXIgdmVyc2lvbnMuXG4gICAgICAgdmFyIHJlcXVlc3RNZXRob2QgPSBlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tc1JlcXVlc3RGdWxsU2NyZWVuO1xuXG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBOYXRpdmUgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICBzZXRUb0Z1bGxTaXplOiBmdW5jdGlvbiBzZXRUb0Z1bGxTaXplKGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZnVsbFNpemUoKSB7XG4gICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgbGlzdGVuZXJzID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBMSVNURU5FUl9UWVBFUyA9IHtcbiAgICBcIm1vdXNlbW92ZVwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2Vtb3ZlXCJcbiAgICB9LFxuICAgIFwibW91c2V1cFwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2V1cFwiXG4gICAgfSxcbiAgICBcIm1vdXNlZG93blwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2Vkb3duXCJcbiAgICB9LFxuICAgIFwibW91c2V3aGVlbFwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwid2hlZWxcIlxuICAgIH0sXG4gICAgXCJtb3VzZWNsaWNrXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJjbGlja1wiXG4gICAgfSxcbiAgfTtcbiAgdmFyIF9ldmVudExpc3RlbmVycyA9IF9nZXRFbXB0eUV2ZW50TGlzdGVuZXJBcnJheSgpO1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICBzY29wZS5zZXRPbmUgPSBmdW5jdGlvbiBzZXRPbmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIC8qIFRoZXJlIGhhcyBiZWVuIHNldmVyYWwgZGlmZmVyZW50IG1vdXNld2hlZWwgZXZlbnRzIGJlZm9yZSwgYnV0IG5vdyBhbGwgZXhjZXB0IG9wZXJhIHNob3VsZCBzdXBwb3J0IFwid2hlZWxcIiAqL1xuICAgIF9ldmVudExpc3RlbmVyc1thY3Rpb25dLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXNbTElTVEVORVJfVFlQRVNbYWN0aW9uXS5lbGVtZW50XS5hZGRFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW2FjdGlvbl0uZXZlbnQsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBzY29wZS5yZW1vdmVPbmUgPSBmdW5jdGlvbiByZW1vdmVPbmUodHlwZSwgb3JpZ0NhbGxiYWNrKSB7XG5cbiAgICBpZih0eXBlb2YgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGlmKG9yaWdDYWxsYmFjaykge1xuICAgICAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW3R5cGVdLmVsZW1lbnRdLnJlbW92ZUV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbdHlwZV0uZXZlbnQsIG9yaWdDYWxsYmFjayk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2FsbGJhY2sgc3BlY2lmaWVkISAtIDFcIik7XG4gICAgfSBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICB0eXBlLmZvckVhY2godGhpc1R5cGUgPT4ge1xuICAgICAgICBpZihvcmlnQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW3RoaXNUeXBlXS5lbGVtZW50XS5yZW1vdmVFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW3RoaXNUeXBlXS5ldmVudCwgb3JpZ0NhbGxiYWNrKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjYWxsYmFjayBzcGVjaWZpZWQhIC0gMlwiKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiBQUklWQVRFIGZ1bmN0aW9ucyAqL1xuICBmdW5jdGlvbiBfZ2V0RW1wdHlFdmVudExpc3RlbmVyQXJyYXkoKSB7XG4gICAgdmFyIG9iamVjdHMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKExJU1RFTkVSX1RZUEVTKS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgIG9iamVjdHNbdHlwZV0gPSBbXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG59KSgpOyIsIid1c2VyIHN0cmljdCc7XG5cbmltcG9ydCB7IG1vdXNlVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHMuanNcIjtcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vZXZlbnRsaXN0ZW5lcnMnO1xuXG4vKiBldmVudGxpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiwgc28gd2UgbWlnaHQgYXMgd2VsbCBkZWNsYXJlIGl0IGhlcmUgKi9cbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGxldCBtYXBfem9vbSA9IChmdW5jdGlvbiBtYXBfem9vbSgpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIHZhciB6b29tTGltaXQgPSB7XG4gICAgZmFydGhlcjogMC40LFxuICAgIGNsb3NlciA6IDIuNVxuICB9O1xuICAvKiBIb3cgbXVjaCBvbmUgc3RlcCBvZiB6b29taW5nIGFmZmVjdHM6ICovXG4gIHZhciB6b29tTW9kaWZpZXIgPSAwLjE7XG5cbiAgc2NvcGUucGx1Z2luTmFtZSA9IG1hcF96b29tLm5hbWU7XG5cbiAgLyoqXG4gICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdFxuICAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwKSB7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21JblwiLCB6b29tSW4pO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJ6b29tT3V0XCIsIHpvb21PdXQpO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJzZXRab29tTGltaXRzXCIsIHNldFpvb21MaW1pdHMpO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJzZXRab29tTW9kaWZpZXJcIiwgc2V0Wm9vbU1vZGlmaWVyKTtcblxuICAgIG1hcC5ldmVudENCcy56b29tID0gX3NldHVwWm9vbUV2ZW50KG1hcCk7XG5cbiAgICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKG1hcC5ldmVudENCcyk7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlWm9vbUxpc3RlbmVyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qKiA9PT09IFBST1RPVFlQRSBleHRlbnNpb25zIGZvciBtYXAgKi9cbiAgZnVuY3Rpb24gc2V0Wm9vbU1vZGlmaWVyIChhbW91bnQpIHtcbiAgICB6b29tTW9kaWZpZXIgPSBhbW91bnQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBzZXRab29tTGltaXRzIChmYXJ0aGVyLCBjbG9zZXIpIHtcbiAgICB6b29tTGltaXQuZmFydGhlciA9IGZhcnRoZXI7XG4gICAgem9vbUxpbWl0LmNsb3NlciA9IGNsb3NlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHpvb21JbiAoYW1vdW50KSB7XG4gICAgaWYoX2lzT3Zlclpvb21MaW1pdCggYW1vdW50ICkgKVxuXG4gICAgdGhpcy5nZXRMYXllcnNXaXRoQXR0cmlidXRlcyhcInpvb21hYmxlXCIsIHRydWUpLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgbGF5ZXIuc2NhbGVYIC09IHpvb21Nb2RpZmllcjtcbiAgICAgIGxheWVyLnNjYWxlWSAtPSB6b29tTW9kaWZpZXI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiB6b29tT3V0IChhbW91bnQpIHtcbiAgICBpZihfaXNPdmVyWm9vbUxpbWl0KCBhbW91bnQgKSApXG5cbiAgICB0aGlzLmdldExheWVyc1dpdGhBdHRyaWJ1dGVzKFwiem9vbWFibGVcIiwgdHJ1ZSkuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBsYXllci5zY2FsZVggKz0gem9vbU1vZGlmaWVyO1xuICAgICAgbGF5ZXIuc2NhbGVZICs9IHpvb21Nb2RpZmllcjtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbiAgZnVuY3Rpb24gX2lzT3Zlclpvb21MaW1pdChhbW91bnQpIHtcbiAgICBpZihhbW91bnQgPiB6b29tTGltaXQuZmFydGhlciAmJiBhbW91bnQgPCB6b29tTGltaXQuY2xvc2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gX3NldHVwWm9vbUV2ZW50KG1hcCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnQoZXZlbnQpIHtcbiAgICAgIHZhciBtb3VzZVdoZWVsRGVsdGEgPSBtb3VzZVV0aWxzLmRlbHRhRnJvbVdoZWVsKGV2ZW50KTtcblxuICAgICAgaWYobW91c2VXaGVlbERlbHRhID4gMCkge1xuICAgICAgICBtYXAuem9vbUluKCk7XG4gICAgICB9IGVsc2UgaWYobW91c2VXaGVlbERlbHRhIDwgMCkge1xuICAgICAgICBtYXAuem9vbU91dCgpO1xuICAgICAgfVxuXG4gICAgICBtYXAuZHJhd09uTmV4dFRpY2soKTtcbiAgICB9O1xuICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uLy4uL2NvcmUvT2JqZWN0JztcbmltcG9ydCB7IGNyZWF0ZUhleGFnb24gfSBmcm9tICcuLi91dGlscy9jcmVhdGVIZXhhZ29uJztcbmltcG9ydCBoZXhhZ29uTWF0aCBmcm9tICcuLi91dGlscy9oZXhhZ29uTWF0aCc7XG5cbnZhciBzaGFwZTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfaGV4YSBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7IHJhZGl1czogMCB9KSB7XG4gICAgdmFyIHNoYXBlO1xuXG4gICAgY29uc3QgSEVJR0hUID0gaGV4YWdvbk1hdGguY2FsY0hlaWdodChleHRyYS5yYWRpdXMpO1xuICAgIGNvbnN0IFNJREUgPSBoZXhhZ29uTWF0aC5jYWxjU2lkZShleHRyYS5yYWRpdXMpO1xuXG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcik7XG5cbiAgICB2YXIgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShleHRyYS5yYWRpdXMpO1xuICAgIHRoaXMucmVnWCA9IGhleGFnb25TaXplLnggLyAyO1xuICAgIHRoaXMucmVnWSA9IGhleGFnb25TaXplLnkgLyAyO1xuICAgIHRoaXMuSEVJR0hUID0gSEVJR0hUO1xuICAgIHRoaXMuU0lERSA9IFNJREU7XG5cbiAgICBpZiAoIWV4dHJhLnJhZGl1cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVlZCByYWRpdXMhXCIpO1xuICAgIH1cblxuICAgIC8qIERyYXcgaGV4YWdvbiB0byB0ZXN0IHRoZSBoaXRzIHdpdGggaGl0QXJlYSAqL1xuICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKGV4dHJhLnJhZGl1cyk7XG4gIH1cbiAgc3RhdGljIGdldFNoYXBlKCkge1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRBbmRHZXRTaGFwZShyYWRpdXMpIHtcbiAgaWYgKCFzaGFwZSkge1xuICAgIGxldCBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKHJhZGl1cyk7XG4gICAgLyogeCBhbmQgeSBhcmUgcmV2ZXJzZWQsIHNpbmNlIHRoaXMgaXMgaG9yaXpvbnRhbCBoZXhhZ29uIGFuZCBjYWxjdWxhdGlvbnMgYXJlIGZvciB2ZXJ0aWNhbCAqL1xuICAgIHNoYXBlID0gY3JlYXRlSGV4YWdvbih7IHg6IGhleGFnb25TaXplLnkgLyAyLCB5OiBoZXhhZ29uU2l6ZS54IC8gMiB9LCByYWRpdXMpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbl9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0X2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwKSB7XG4gIHZhciBzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB2YXIgY29sb3IgPSBcIiM0NDQ0NDRcIjtcbiAgdmFyIHBvaW50U2l6ZSA9IDA7XG5cbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxuICAgIC5kcmF3UG9seVN0YXIgKCBjb29yZHMueCwgY29vcmRzLnksIHJhZGl1cywgNiwgcG9pbnRTaXplLCBhbmdsZSApO1xuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogY2ksXG4gICAgICAgIHk6IGNqXG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjaSAtIDEsXG4gICAgICB5OiBjaiArIChjaSAlIDIpIC0gKChjeSA8IEhFSUdIVCAvIDIpID8gMSA6IDApXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGV4YVNpemUocmFkaXVzKSB7XG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiByYWRpdXMsXG4gICAgeDogcmFkaXVzICogMixcbiAgICB5OiByYWRpdXMgKiBNYXRoLnNxcnQoMylcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4YUNlbnRlckNvb3JkKGhleFJhZGl1cywgeCwgeSkge1xuICB2YXIgaGV4YVNpemUgPSBnZXRIZXhhU2l6ZShoZXhSYWRpdXMpO1xuICB2YXIgcmFkaXVzID0gaGV4YVNpemUucmFkaXVzO1xuICB2YXIgaGFsZkhleGFTaXplID0ge1xuICAgIHg6IGhleGFTaXplLnJhZGl1cyxcbiAgICB5OiBoZXhhU2l6ZS55ICogMC41XG4gIH07XG4gIHZhciBjZW50ZXJDb29yZHMgPSB7fTtcbiAgdmFyIGNvb3JkaW5hdGVJbmRleGVzO1xuXG4gIGNvb3JkaW5hdGVJbmRleGVzID0gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KTtcblxuICBpZiAoY29vcmRpbmF0ZUluZGV4ZXMueCA8IDAgJiYgY29vcmRpbmF0ZUluZGV4ZXMueCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGljayBvdXRzaWRlIG9mIHRoZSBoZXhhZ29uIGFyZWFcIik7XG4gIH1cbiAgY2VudGVyQ29vcmRzID0ge1xuICAgIHg6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueCAqIGhleGFTaXplLnggKyBoYWxmSGV4YVNpemUueCksXG4gICAgeTogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy55ICogaGV4YVNpemUueSArIGhhbGZIZXhhU2l6ZS55KVxuICB9O1xuXG4gIHJldHVybiBjZW50ZXJDb29yZHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNhbGNIZWlnaHQ6IGNhbGNIZWlnaHQsXG4gIGNhbGNTaWRlOiBjYWxjU2lkZSxcbiAgc2V0Q2VsbEJ5UG9pbnQ6IHNldENlbGxCeVBvaW50LFxuICBnZXRIZXhhU2l6ZTogZ2V0SGV4YVNpemUsXG4gIHRvSGV4YUNlbnRlckNvb3JkOiB0b0hleGFDZW50ZXJDb29yZFxufTsiLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiA1MCwgeTogMjAgfSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IHtcbiAgICBtYXA6IFtcIm1hcF9kcmFnXCIsIFwib2JqZWN0X3NlbGVjdF9oZXhhZ29uXCJdXG4gIH1cbn07IiwiZXhwb3J0IGxldCBtYXBEYXRhID0ge1xuICBnYW1lSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXG4gIHR1cm46IDEsXG4gIHN0YXJ0UG9pbnQ6IHsgeDogMCwgeTogMCB9LFxuICBlbGVtZW50OiBcIiNtYXBDYW52YXNcIixcbiAgbGF5ZXJzOiBbe1xuICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgIHNwZWNpYWxzOiBbe1xuICAgICAgXCJpbnRlcmFjdGl2ZVwiOiBmYWxzZVxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNhY2hlOiB0cnVlXG4gICAgfSxcbiAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICB0eXBlOiBcIk9iamVjdF90ZXJyYWluXCIsXG4gICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICBcInlcIjpcIjBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0se1xuICAgICAgICAgXCJvYmpUeXBlXCI6MSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI0MVwiLFxuICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjN1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiODJcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH0se1xuICAgIFwidHlwZVwiOiBcIk1hcF9sYXllclwiLFxuICAgIFwiY29vcmRcIjogeyBcInhcIjogXCIwXCIsIFwieVwiOiBcIjBcIiB9LFxuICAgIFwibmFtZVwiOiBcInVuaXRMYXllclwiLFxuICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICBcImNhY2hlXCI6IFwiZmFsc2VcIlxuICAgIH0sXG4gICAgXCJvYmplY3RHcm91cHNcIjogW3tcbiAgICAgIFwidHlwZVwiOiBcIk9iamVjdF91bml0XCIsXG4gICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgXCJ0eXBlSW1hZ2VEYXRhXCI6IFwidW5pdFwiLFxuICAgICAgXCJvYmplY3RzXCI6IFt7XG4gICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgIFwibmFtZVwiOiBcIkhvcnNleSB0aGUgd2lsZFwiLFxuICAgICAgICBcImNvb3JkXCI6IHtcbiAgICAgICAgICBcInhcIjogXCI0MVwiLCBcInlcIjogXCI3MFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgXCJzb21lQ3VzdG9tRGF0YVwiOiBcInRydWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59OyIsImV4cG9ydCBsZXQgdHlwZURhdGEgPSB7XG4gIFwiZ3JhcGhpY0RhdGFcIjoge1xuICAgIFwiZ2VuZXJhbFwiOntcbiAgICAgIFwidGVycmFpblwiOntcbiAgICAgICAgXCJ0aWxlV2lkdGhcIjo4MixcbiAgICAgICAgXCJ0aWxlSGVpZ2h0XCI6OTRcbiAgICAgIH1cbiAgICB9LFxuICAgIFwidGVycmFpbkJhc2VcIjp7XG4gICAgICBcImltYWdlc1wiOlxuICAgICAgW1wiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy90ZXN0SGV4YWdvblNwcml0ZXNoZWV0LnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMCwwLDgyLDk0XSxbODIsMCw4Miw5NF0sWzE2NCwwLDgyLDk0XSxbMjQ2LDAsODIsOTRdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbODIsOTRdXG4gICAgfSxcbiAgICBcInRlcnJhaW5cIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDQ4XSxbMSw1MCw5Niw0OF0sWzEsOTksOTYsNDhdLFsxLDE0OCw5Niw0OF0sWzEsMTk3LDk2LDQ4XSxbMSwyNDYsOTYsNDhdLFsxLDI5NSw5Niw0OF0sWzEsMzQ0LDk2LDQ4XSxbMSwzOTMsOTYsNDhdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgfSxcbiAgICBcImRpdGhlclwiOntcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9kaXRoZXIyLnBuZ1wiXSxcImZyYW1lc1wiOltbMCwwLDk2LDQ4XV0sXCJpbWFnZVNpemVcIjpbOTYsNDhdfSxcbiAgICBcInByZXR0aWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21vdW50YWlucy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL2hpbGxzLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjIucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNjYsMCwwLDE4XSxbMSwxLDk2LDQ4LDEsLTQsNF0sWzEsMTQ4LDk2LDQ4LDJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInJlc291cmNlXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvcmVzb3VyY2VzL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMTk1LDEsOTYsNDhdLFszODksMSw5Niw0OF1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicGxhY2VcIjp7fSxcbiAgICBcImNpdHlcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21lZGlldmFsY2l0aWVzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDcyXSxbOTgsMSw5Niw3Ml0sWzE5NSwxLDk2LDcyXSxbMjkyLDEsOTYsNzJdLFszODksMSw5Niw3Ml0sWzQ4NSwxLDk2LDcyXSxbNTgyLDEsOTYsNzJdLFs2NzksMSw5Niw3Ml0sWzc3NiwxLDk2LDcyXSxbODczLDEsOTYsNzJdLFsxLDc0LDk2LDcyXSxbOTgsNzQsOTYsNzJdLFsxOTUsNzQsOTYsNzJdLFsyOTIsNzQsOTYsNzJdLFszODksNzQsOTYsNzJdLFs0ODUsNzQsOTYsNzJdLFs1ODIsNzQsOTYsNzJdLFs2NzksNzQsOTYsNzJdLFs3NzYsNzQsOTYsNzJdLFs4NzMsNzQsOTYsNzJdXG4gICAgICBdXG4gICAgfSxcImJ1aWxkaW5nXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFwibW9kaWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJ1bml0XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvdW5pdHMvdGVzdEhleGFnb25Vbml0cy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOntcIndpZHRoXCI6ODIsXCJoZWlnaHRcIjo5NH1cbiAgICB9XG4gIH0sXG4gIFwib2JqZWN0RGF0YVwiOiB7XG4gICAgXCJ1bml0XCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJ0YW5rXCIsXG4gICAgICAgIFwiZGVzY1wiOlwiVnJvb29tLi4uXCIsXG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcbiAgICAgICAgXCJhdHRcIjpcIkdvb2RcIixcbiAgICAgICAgXCJkZWZcIjpcIlBvb3JcIixcbiAgICAgICAgXCJzaWVnZVwiOlwiRGVjZW50XCIsXG4gICAgICAgIFwiaW5pdGlhdGVcIjpcIjkwXCIsXG4gICAgICAgIFwibW92ZVwiOlwiMTAwXCIsXG4gICAgICAgIFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXG4gICAgICAgIFwidmlzaW9uXCI6XCIxNTBcIixcbiAgICAgICAgXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXJyaWVyXCIsXCJkZXNjXCI6XCJhbmdyeSBiZWVoaXZlXCIsXCJpbWFnZVwiOlwiNlwiLFwiYXR0XCI6XCIxXCIsXCJkZWZcIjpcIjJcIixcInNpZWdlXCI6XCIyXCIsXCJpbml0aWF0ZVwiOlwiMTEwXCIsXCJtb3ZlXCI6XCIxMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIyNTBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwidW5pdFwiOntcbiAgICAgICAgICAgIFwiX2VuZW15X1wiOlt7XG4gICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgIFwibW9yYWxlXCI6XCJzdWZmZXJzIG1vcmFsZSBkcm9wXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2F2YWxyeVwiLFwiZGVzY1wiOlwiR2l2ZSBtZSBhbiBhcHBsZSFcIixcImltYWdlXCI6XCIyNlwiLFwiYXR0XCI6XCIzXCIsXCJkZWZcIjpcIjFcIixcInNpZWdlXCI6XCIwXCIsXCJpbml0aWF0ZVwiOlwiNTBcIixcIm1vdmVcIjpcIjMwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgIH1dLFxuICAgIFwidGVycmFpbkJhc2VcIjpbe1xuICAgICAgICBcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDFcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjJcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAyXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIzXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI0XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgM1wiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDRcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjVcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSA1XCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5cIjpbe1xuICAgICAgICBcIm5hbWVcIjpcImRlc2VydFwiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcInZlcnkgZHJ5IGxhbmRcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwicGxhaW5cIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCdWZmYWxvIHJvYW1pbmcgYXJlYVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMTIlIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFwiaW1hZ2VcIjpcIjJcIixcImRlc2NcIjpcIlJvYmluIGhvb2QgbGlrZXMgaXQgaGVyZVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIlVuaXRcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGVmZW5kXCI6XCJVbml0IGRlZmVuZCArMlwiXG4gICAgICB9fV19fX0se1xuICAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXCJkZXNjXCI6XCJTaWJlcmlhIHRlYWNoZXMgeW91XCIsXCJpbWFnZVwiOlwiNlwiXG4gICAgICAgIH0se1xuICAgICAgICAgIFwibmFtZVwiOlwiYXJjdGljXCIsXCJkZXNjXCI6XCJZb3VyIGJhbGwgd2lsbCBmcmVlemUgb2ZcIixcImltYWdlXCI6XCI3XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFwiZGVzY1wiOlwiQ3JhbmJlcnJpZXMgYW5kIGNsb3VkYmVycmllc1wiLFwiaW1hZ2VcIjpcIjhcIlxuICAgICAgICB9XSxcbiAgICBcImRpdGhlclwiOltcbiAgICAgIHtcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCIsXCI3XCIsXCI4XCIsXCI5XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn1dLFxuICAgIFwicHJldHRpZmllclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjI1JVwifSx7XCJpbWFnZVwiOlwiMVwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjQwJVwifSx7XCJpbWFnZVwiOlwiMlwiLFwiekluZGV4XCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjYwJVwifV0sXCJyZXNvdXJjZVwiOlt7XCJuYW1lXCI6XCJPYXNpc1wiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcIk9hc2lzIGluIHRoZSBtaWRkbGUgb2YgZGVzZXJ0LCBvciBub3QgYXRtLlwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiZm9vZCBwcm9kdWN0aW9uIDUgLyB3ZWVrXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk9pbFwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJsYWNrIGdvbGRcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlRoZXJlIGlzIGEgbG90IG9mIG9pbCBoZXJlXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjRcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcImNpdHlcIjpbe1wibmFtZVwiOlwiTWVkaWV2YWxcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMFwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJNZWRpZXZhbDJcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMVwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJwbGFjZVwiOltdLFwiYnVpbGRpbmdcIjpbe1wibmFtZVwiOlwiQmFycmFja3NcIixcImltYWdlXCI6XCIwXCIsXCJ0b29sdGlwXCI6XCJFbmFibGVzIHRyb29wIHJlY3J1aXRtZW50XCJ9LHtcIm5hbWVcIjpcIkZhY3RvcnlcIixcImltYWdlXCI6XCIxXCIsXCJ0b29sdGlwXCI6XCJQcm9kdWNlcyB3ZWFwb25yeVwifV0sXCJnb3Zlcm5tZW50XCI6W3tcIm5hbWVcIjpcIkRlbW9jcmF6eVwiLFwiZGVzY3JpcHRpb25cIjpcIndlbGwgaXQncyBhIGRlbW9jcmF6eSA6KVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgKzIwJSBoYXBwaW5lc3NcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzAsMV0sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImhhcHBpbmVzc1wiOlwiMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNvbW11bmlzbVwiLFwiZGVzY3JpcHRpb25cIjpcIllvdSBrbm93IHRoZSBvbmUgdXNlZCBpbiB0aGUgZ3JlYXQgVVNTUiBhbmQgaW5zaWRlIHRoZSBncmVhdCBmaXJld2FsbCBvZiBDaGluYVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgcHJvZHVjdGlvbiBib251c2VzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlsyLDNdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7fX1dfX0sXCJDaXR5XCI6e1wiYnVpbGRpbmdcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIjIwJVwifX1dfX19fV0sXCJwb2xpdGljc1wiOntcInRheFJhdGVcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJjb3JydXB0aW9uXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiYWxpZ25tZW50XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiaGFwcGluZXNzXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwicmV2b2x0Umlza1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInVuaXR5XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwibmF0VmFsdWVcIjpbe1wibmFtZVwiOlwiSW50ZWdyaXR5XCIsXCJ0b29sdGlwXCI6XCJHb3Zlcm5tZW50IGFuZCBwb3B1bGF0aW9ucyBzaG93cyBpbnRlZ3JpdHkgYW5kIHRydXN0d29ydGhpbmVzc1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJpbnRlcm5hbFJlbGF0aW9uc1wiOlwiKzEwJVwiLFwiZGlwbG9tYWN5XCI6XCIrMTAlXCIsXCJyZXZvbHQgcmlza1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCItMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNhcGl0YWxpc21cIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGlwbG9tYWN5XCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwibW9yYWxlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiSGFyZHdvcmtpbmdcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrMTAlXCIsXCJoYXBwaW5lc3NcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkxlYWRlcnNoaXBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrNSVcIixcImhhcHBpbmVzc1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcInRyYWRpbmdcIjpcIisxMCVcIn19XX19fX1dfX1cbn07Il19
