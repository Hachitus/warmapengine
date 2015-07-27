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
    var map = (0, _componentsFactoriesHorizontalHexaFactoryJs.createMap)(_testsDataGameDataJs.gameData, _testsDataMapDataJs.mapData, _testsDataTypeDataJs.typeData);

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

var _mapCoreMap_stage = require('../map/core/Map_stage');

var _mapCoreMap_layer = require('../map/core/Map_layer');

var _mapHexagonsObjectObject_terrain_hexa = require('../map/hexagons/object/Object_terrain_hexa');

var _mapHexagonsObjectObject_unit_hexa = require('../map/hexagons/object/Object_unit_hexa');

var _mapObjectObject_terrain = require('../map/object/Object_terrain');

var _mapObjectObject_unit = require('../map/object/Object_unit');

var _mapCoreSpritesheetList = require('../map/core/spritesheetList');

var _mapCoreMap_validators = require('../map/core/map_validators');

var _mapCoreUI = require('../map/core/UI');

var _mapUIsDefaultDefaultJs = require('../map/UIs/default/default.js');

var allSpritesheets = (0, _mapCoreSpritesheetList.spritesheetList)();

var functionsInObj = {
  Map_stage: _mapCoreMap_stage.Map_stage,
  Map_layer: _mapCoreMap_layer.Map_layer,
  Object_terrain: _mapObjectObject_terrain.Object_terrain,
  Object_unit: _mapObjectObject_unit.Object_unit,
  Object_terrain_hexa: _mapHexagonsObjectObject_terrain_hexa.Object_terrain_hexa,
  Object_unit_hexa: _mapHexagonsObjectObject_unit_hexa.Object_unit_hexa
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
  var dialog_selection = document.getElementById('selectionDialog');
  var defaultUI = new _mapUIsDefaultDefaultJs.UI_default(dialog_selection);
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
  mapData.stages.forEach(function (stageData) {
    var thisStage = new functionsInObj[stageData.type](stageData.name, document.querySelector(stageData.element));

    map.addStage(thisStage);

    stageData.layers.forEach(function (layerData) {
      var thisLayer = undefined;

      try {
        thisLayer = new functionsInObj[layerData.type](layerData.name, layerData.type, false, layerData.coord);
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

},{"../map/UIs/default/default.js":4,"../map/core/Map":5,"../map/core/Map_layer":6,"../map/core/Map_stage":7,"../map/core/UI":9,"../map/core/map_validators":11,"../map/core/spritesheetList":12,"../map/hexagons/object/Object_terrain_hexa":14,"../map/hexagons/object/Object_unit_hexa":15,"../map/object/Object_terrain":18,"../map/object/Object_unit":19}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== 3rd party imports ====== */
//var System = require('es6-module-loader').System;
//import { System } from 'es6-module-loader';

/* ====== Own module imports ====== */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _map_validators = require("./map_validators");

"use strict";

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
 *
 * Plugins are provided in an array of plugin functions
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
    key: "init",

    /* options.mapSize = new createjs.Rectangle*/
    value: function init(tickCB, plugins, coord) {
      if (plugins) {
        this.activatePlugins(plugins);
      }
      this.stages.forEach(function (stage) {
        stage.x = coord.x;
        stage.y = coord.y;
      });

      this.drawMap();
      this.tickOn(tickCB);

      return this;
    }
  }, {
    key: "drawMap",
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
    key: "getSize",
    value: function getSize() {
      return this.mapSize;
    }
  }, {
    key: "setSize",
    value: function setSize(x1, y1) {
      this.mapSize = { x: x1, y: y1 };

      return this.mapSize;
    }
  }, {
    key: "getChildNamed",
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
  }, {
    key: "addStage",
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
    key: "replaceStage",
    value: function replaceStage(newCanvas, oldCanvas) {
      var oldIndex = privateFunctions._getStageIndex(this.stages, oldCanvas);
      this.stages[oldIndex] = newCanvas;

      return this;
    }
  }, {
    key: "addLayer",
    value: function addLayer(layer, stage) {

      return this;
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layer) {
      return this;
    }
  }, {
    key: "replaceLayer",
    value: function replaceLayer(newLayer, oldLayer) {
      return this;
    }
  }, {
    key: "toggleLayer",
    value: function toggleLayer(layer) {
      return this;
    }
  }, {
    key: "getLayerNamed",
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
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
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
    key: "cacheMap",
    value: function cacheMap() {
      this.stages.forEach(function (stage) {
        if (stage.cacheEnabled) {
          this.cache(0, 0, this.mapSize.x, this.mapSize.y);
        }
      });

      return this;
    }
  }, {
    key: "cacheLayers",
    value: function cacheLayers() {
      return this;
    }
  }, {
    key: "getObjectsUnderMapPoint",
    value: function getObjectsUnderMapPoint(clickCoords) {
      var objects = [];

      this.stages.forEach(function (stage) {
        objects[stage.name] = objects[stage.name] || [];
        objects[stage.name].push(stage.getObjectsUnderPoint(clickCoords));
      });

      return objects;
    }
  }, {
    key: "activateFullSize",
    value: function activateFullSize() {
      window.addEventListener("resize", _setStagesToFullSize.bind(this));
    }
  }, {
    key: "deactivateFullSize",
    value: function deactivateFullSize() {
      window.removeEventListener("resize", this._setStagesToFullSize.bind(this));
    }
  }, {
    key: "activatePlugins",

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
      var _this = this;

      pluginsArray.forEach(function (pluginToUse) {
        _this.plugins[pluginToUse.pluginName] = pluginToUse;
        _this.plugins[pluginToUse.pluginName].init(_this);
      });
    }
  }, {
    key: "tickOn",
    value: function tickOn(tickCB) {
      if (this.activeTickCB) {
        throw new Error("there already exists one tick callback. Need to remove it first, before setting up a new one");
      }

      this.activeTickCB = tickCB || _handleTick.bind(this);

      createjs.Ticker.addEventListener("tick", this.activeTickCB);

      return this;
    }
  }, {
    key: "tickOff",
    value: function tickOff() {
      createjs.Ticker.removeEventListener("tick", this.activeTickCB);

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

      var ctx = canvas.getContext("2d");

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

},{"./map_validators":11}],6:[function(require,module,exports){
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

var _mapFunctions = require("./mapFunctions");

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
  function Map_layer(name, type, subContainers, coord) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this.superPrototype = this.constructor.prototype;
    this.type = subContainers ? TYPES.imagesInSubContainers : type;
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
  }

  _inherits(Map_layer, _createjs$Container);

  _createClass(Map_layer, [{
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

},{"./mapFunctions":10,"./map_validators":11}],7:[function(require,module,exports){
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

  function Map_stage(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, Map_stage);

    _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).apply(this, args);

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

},{"./mapFunctions":10,"./map_validators":11}],8:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPrototype = addPrototype;

function addPrototype(name, functionToAdd) {
  this.superPrototype[name] = functionToAdd;
}

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
    //shape = createHexagon({ x:0, y:0 }, extra.radius, 6, extra.pointSize, 30, extra.color);

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
    shape = (0, _utilsCreateHexagon.createHexagon)({ x: hexagonSize.y + hexagonSize.y / 2, y: hexagonSize.x + hexagonSize.x / 2 }, radius);
  }

  return shape;
}

},{"../../core/Object":8,"../utils/createHexagon":16,"../utils/hexagonMath":17}],14:[function(require,module,exports){
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

},{"./Object_hexa":13}],15:[function(require,module,exports){
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

},{"./Object_hexa":13}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _coreObject = require('../core/Object');

var Object_terrain = (function (_Object_sprite) {
  function Object_terrain() {
    _classCallCheck(this, Object_terrain);

    if (_Object_sprite != null) {
      _Object_sprite.apply(this, arguments);
    }
  }

  _inherits(Object_terrain, _Object_sprite);

  _createClass(Object_terrain, [{
    key: 'construct',
    value: function construct(coords, data, spriteSheet, currFrameNumber) {
      _get(Object.getPrototypeOf(Object_terrain.prototype), 'spriteSheet', this).call(this, coords, data, spriteSheet, currFrameNumber);

      this.name = 'DefaultTerrainObject';
    }
  }]);

  return Object_terrain;
})(_coreObject.Object_sprite);

exports.Object_terrain = Object_terrain;

},{"../core/Object":8}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _coreObject = require('../core/Object');

var Object_unit = (function (_Object_sprite) {
  function Object_unit() {
    _classCallCheck(this, Object_unit);

    if (_Object_sprite != null) {
      _Object_sprite.apply(this, arguments);
    }
  }

  _inherits(Object_unit, _Object_sprite);

  _createClass(Object_unit, [{
    key: 'construct',
    value: function construct(coords, data, spriteSheet, currFrameNumber) {
      _get(Object.getPrototypeOf(Object_unit.prototype), 'spriteSheet', this).call(this, coords, data, spriteSheet, currFrameNumber);

      this.name = 'DefaultUnitObjects';
    }
  }]);

  return Object_unit;
})(_coreObject.Object_sprite);

exports.Object_unit = Object_unit;

},{"../core/Object":8}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameData = {
  ID: "53837d47976fed3b24000005",
  turn: 1,
  mapSize: { x: 500, y: 200 },
  pluginsToActivate: {
    map: ["map_move"]
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
  stages: [{
    type: "Map_stage",
    coord: { x: 0, y: 0 },
    name: "terrainStage",
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
        type: "Object_terrain_hexa",
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
        "type": "Object_unit_hexa",
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvaG9yaXpvbnRhbEhleGFGYWN0b3J5LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXBfbGF5ZXIuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX3N0YWdlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL09iamVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9VSS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tYXBGdW5jdGlvbnMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvbWFwX3ZhbGlkYXRvcnMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvdXRpbHMvY3JlYXRlSGV4YWdvbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvdXRpbHMvaGV4YWdvbk1hdGguanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdC9PYmplY3RfdGVycmFpbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvb2JqZWN0L09iamVjdF91bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7MERBTWEscURBQXFEOzs7O21DQUd0RCw4QkFBOEI7O21DQUM5Qiw4QkFBOEI7O2tDQUMvQiw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBVztBQUNqRCxNQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkEsWUFBWSxDQUFDOzs7OztRQTBHRyxTQUFTLEdBQVQsU0FBUzs7Ozs7Ozs7Ozs7OzswQkE3RkwsaUJBQWlCOztnQ0FDWCx1QkFBdUI7O2dDQUN2Qix1QkFBdUI7O29EQUNiLDRDQUE0Qzs7aURBQy9DLHlDQUF5Qzs7dUNBQzNDLDhCQUE4Qjs7b0NBQ2pDLDJCQUEyQjs7c0NBQ3ZCLDZCQUE2Qjs7cUNBRWhDLDRCQUE0Qjs7eUJBQ3RDLGdCQUFnQjs7c0NBQ1IsK0JBQStCOztBQUgxRCxJQUFJLGVBQWUsR0FBRyw0QkFEYixlQUFlLEdBQ2UsQ0FBQzs7QUFLeEMsSUFBSSxjQUFjLEdBQUc7QUFDbkIsV0FBUyxvQkFiRixTQUFTLEFBYVA7QUFDVCxXQUFTLG9CQWJGLFNBQVMsQUFhUDtBQUNULGdCQUFjLDJCQVhQLGNBQWMsQUFXUDtBQUNkLGFBQVcsd0JBWEosV0FBVyxBQVdQO0FBQ1gscUJBQW1CLHdDQWZaLG1CQUFtQixBQWVQO0FBQ25CLGtCQUFnQixxQ0FmVCxnQkFBZ0IsQUFlUDtDQUNqQixDQUFDOzs7QUFHRixJQUFJLGdCQUFnQixHQUFHO0FBQ25CLGdCQUFjLEVBQWQsY0FBYztDQUNqQixDQUFDOzs7QUFHRixJQUFJLFVBQVUsR0FBRztBQUNiLFdBQVMsRUFBRSx1QkFwQk4sWUFBWSxDQW9CTyxPQUFPO0NBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStESyxTQUFTLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUM5RCxTQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUE7QUFDM0QsTUFBSSxPQUFPLEdBQUcsQUFBQyxPQUFPLFVBQVUsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDckYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxRQUFRLEdBQUcsQUFBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDekYsTUFBSSxHQUFHLEdBQUcsZ0JBbEdILEdBQUcsQ0FrR1EsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDakQsTUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbEUsTUFBSSxTQUFTLEdBQUcsNEJBekZULFVBQVUsQ0F5RmMsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRCxXQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdqQixpQkE5Rk8sRUFBRSxFQThGTixTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQm5CLFNBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsU0FBUyxFQUFJO0FBQ25DLFFBQUksU0FBUyxHQUFHLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBRSxDQUFFLENBQUM7O0FBRWpILE9BQUcsQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLENBQUM7O0FBRTFCLGFBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsU0FBUyxFQUFJO0FBQ3JDLFVBQUksU0FBUyxZQUFBLENBQUM7O0FBRWQsVUFBSTtBQUNGLGlCQUFTLEdBQUcsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZHLGlCQUFTLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxDQUFDO09BQ2pDLENBQUMsT0FBTSxDQUFDLEVBQUU7QUFDVCxlQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtPQUNqRDs7QUFFRCxlQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxVQUFBLFdBQVcsRUFBSTtBQUM3QyxZQUFJLFdBQVcsWUFBQSxDQUFDO0FBQ2hCLFlBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7O0FBRWhELFlBQUcsQ0FBQyxlQUFlLEVBQUU7QUFDbkIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMvQyxpQkFBTztTQUNSOztBQUVELFlBQUcsZUFBZSxFQUFFO0FBQ2xCLGNBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTVELHFCQUFXLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMvRDs7QUFFRCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUUsVUFBQSxNQUFNLEVBQUk7QUFDckMsY0FBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZFLGNBQUcsQ0FBQyxXQUFXLEVBQUU7QUFDZixtQkFBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckYsa0JBQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQ3hGOztBQUVELGNBQUksa0JBQWtCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUMzQyxjQUFJLE9BQU8sR0FBRztBQUNaLG9CQUFRLEVBQUUsV0FBVztBQUNyQixzQkFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1dBQ3hCLENBQUM7QUFDRixjQUFJLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUM7QUFDL0gsbUJBQVMsQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFNBQU8sR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJYLFdBQVMsaUJBQWlCLEdBQUcsRUFFNUI7Q0FDRjs7O0FBR0QsU0FBUyxjQUFjLEdBQUcsRUFBRTs7Ozs7Ozs7Ozs7OztBQ3RNNUIsWUFBWSxDQUFDOzs7Ozs7Ozs7O0lBRUEsVUFBVTtBQUNWLFdBREEsVUFBVSxDQUNULEtBQUssRUFBRSxNQUFNLEVBQUU7MEJBRGhCLFVBQVU7O0FBRW5CLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSTtBQUN0QixxQkFBZSxFQUFFLFNBQVM7S0FDM0IsQ0FBQzs7QUFFRixRQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztHQUM5Rjs7ZUFSVSxVQUFVOztXQVNQLHdCQUFDLE9BQU8sRUFBRTs7O0FBQ3RCLFVBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLFlBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUN0QyxlQUFPLENBQUMsR0FBRyxDQUFFLFVBQUEsTUFBTSxFQUFJO0FBQ3JCLGdCQUFLLEtBQUssQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUM1RCxDQUFDLENBQUM7QUFDSCxZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDdEIsTUFBTTtBQUNMLFlBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztBQUN2QyxZQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEQsWUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQixlQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3RCO0tBQ0Y7OztXQUNHLGdCQUFHO0FBQ0wsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixVQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUM3QywrQkFBdUIsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFDO09BQ3ZFLENBQUMsQ0FBQztLQUNKOzs7U0E5QlUsVUFBVTs7O1FBQVYsVUFBVSxHQUFWLFVBQVU7O0FBaUN2QixTQUFTLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDN0MsU0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBRTtBQUM1QyxXQUFPLEVBQUUsQ0FBQztHQUNYLENBQUMsQ0FBQztDQUNSO0FBQ0QsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7QUFDckMsTUFBRyxDQUFDLFFBQVEsRUFBRTtBQUNaLFVBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxDQUFDO0dBQ2hFOztBQUVELE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDN0IsTUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDOztBQUV0QixPQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzlCLGdCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2hDOztBQUVELFNBQU8sWUFBWSxDQUFDO0NBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQ25ENEIsa0JBQWtCOztBQUUvQyxZQUFZLENBQUM7OztBQUdiLElBQUksZ0JBQWdCLEdBQUc7QUFDbkIsZ0JBQWMsRUFBZCxjQUFjO0NBQ2pCLENBQUM7OztBQUdGLElBQUksVUFBVSxHQUFHO0FBQ2IsV0FBUyxFQUFFLGdCQVhOLFlBQVksQ0FXTyxPQUFPO0FBQy9CLGlCQUFlLEVBQUUsZ0JBWlosWUFBWSxDQVlhLGFBQWE7QUFDM0Msd0JBQXNCLEVBQUUsZ0JBYm5CLFlBQVksQ0Fhb0Isb0JBQW9CO0FBQ3pELG9CQUFrQixFQUFFLGdCQWRmLFlBQVksQ0FjZ0IsZ0JBQWdCO0FBQ2pELHdCQUFzQixFQUFFLGdCQWZuQixZQUFZLENBZW9CLG9CQUFvQjtBQUN6RCxZQUFVLEVBQUUsZ0JBaEJQLFlBQVksQ0FnQlEsUUFBUTtDQUNwQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUFlVyxHQUFHO0FBQ0gsV0FEQSxHQUFHLENBQ0YsT0FBTyxFQUFFOzBCQURWLEdBQUc7O0FBRVosUUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxBQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUQsUUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7R0FDM0I7O2VBTlUsR0FBRzs7OztXQVFWLGNBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDM0IsVUFBRyxPQUFPLEVBQUU7QUFDVixZQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQy9CO0FBQ0QsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDM0IsYUFBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLGFBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztPQUNuQixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2YsVUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFcEIsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBQ00sbUJBQUc7QUFDUixVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUNsQyxZQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDdEIsZUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2YsZUFBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDN0I7T0FDRixDQUFDLENBQUM7QUFDRCxhQUFPLElBQUksQ0FBQztLQUNmOzs7V0FDTSxtQkFBSTtBQUNQLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7O1dBQ00saUJBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNkLFVBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsQ0FBQzs7QUFFOUIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7Ozs7OztBQUNsQiw2QkFBaUIsSUFBSSxDQUFDLE1BQU0sOEhBQUU7Y0FBdEIsS0FBSzs7QUFDWCxjQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLGNBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7O0FBRUQsY0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNwQyxtQkFBTyxLQUFLLENBQUM7V0FDZDtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBQ08sa0JBQUMsS0FBSyxFQUFFOzs7QUFDZCxVQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRWhCLFVBQUcsRUFBRyxLQUFLLFlBQVksS0FBSyxDQUFBLEFBQUMsRUFBRztBQUM5QixjQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3BCOztBQUVELGlCQUFBLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxNQUFBLFVBQUksTUFBTSxDQUFDLENBQUM7O0FBRTVCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNXLHNCQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDakMsVUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdkUsVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7O0FBRWxDLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNPLGtCQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7O0FBRW5CLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNVLHFCQUFDLEtBQUssRUFBRTtBQUNmLGFBQU8sSUFBSSxDQUFDO0tBQ2Y7OztXQUNXLHNCQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDN0IsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1UscUJBQUMsS0FBSyxFQUFFO0FBQ2YsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1ksdUJBQUMsSUFBSSxFQUFFO0FBQ2xCLFVBQUksUUFBUSxZQUFBLENBQUM7Ozs7Ozs7QUFFYiw4QkFBaUIsSUFBSSxDQUFDLE1BQU0sbUlBQUU7Y0FBdEIsS0FBSzs7QUFDWCxjQUFHLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3ZDLG1CQUFPLFFBQVEsQ0FBQztXQUNqQjtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBQ08sb0JBQUc7QUFDUCxVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUNoQyxZQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUU7QUFDbkIsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7T0FDSixDQUFDLENBQUM7O0FBRUgsYUFBTyxJQUFJLENBQUM7S0FDZjs7O1dBQ1UsdUJBQUc7QUFDVixhQUFPLElBQUksQ0FBQztLQUNmOzs7V0FDc0IsaUNBQUMsV0FBVyxFQUFFO0FBQ2pDLFVBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDbEMsZUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNoRCxlQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztPQUNuRSxDQUFDLENBQUM7O0FBRUgsYUFBTyxPQUFPLENBQUM7S0FDbEI7OztXQUNlLDRCQUFHO0FBQ2pCLFlBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcEU7OztXQUNpQiw4QkFBRztBQUNuQixZQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM1RTs7Ozs7Ozs7Ozs7Ozs7O1dBYWMseUJBQUMsWUFBWSxFQUFFOzs7QUFDNUIsa0JBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbEMsY0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUNuRCxjQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxPQUFNLENBQUM7T0FDakQsQ0FBQyxDQUFDO0tBQ0o7OztXQUNLLGdCQUFDLE1BQU0sRUFBRTtBQUNiLFVBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNwQixjQUFNLElBQUksS0FBSyxDQUFDLDhGQUE4RixDQUFDLENBQUM7T0FDakg7O0FBRUQsVUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFckQsY0FBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUU1RCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDTSxtQkFBRztBQUNSLGNBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFL0QsVUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7O0FBRTlCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztTQTdKVSxHQUFHOzs7UUFBSCxHQUFHLEdBQUgsR0FBRzs7O0FBaUtoQixTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFO0FBQzNDLE1BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTdDLFNBQU8sQUFBRSxVQUFVLEtBQUssQ0FBQyxDQUFDLEdBQUssS0FBSyxHQUFHLFVBQVUsQ0FBQztDQUNuRDs7QUFFRCxTQUFTLFdBQVcsR0FBRztBQUNyQixNQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUNsQyxRQUFHLEtBQUssQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO0FBQzdCLFdBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNoQjtHQUNGLENBQUMsQ0FBQztDQUNKO0FBQ0QsU0FBUyxvQkFBb0IsR0FBRzs7Ozs7O0FBQzlCLDBCQUFtQixJQUFJLENBQUMsTUFBTSxtSUFBRztVQUF4QixNQUFNOztBQUNiLFVBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUM7O0FBRXBDLFNBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDckMsU0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztLQUN4Qzs7Ozs7Ozs7Ozs7Ozs7O0NBQ0Y7OztBQ2pPRCxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFRZ0Isa0JBQWtCOzs0QkFDTSxnQkFBZ0I7OztBQUdyRSxJQUFNLEtBQUssR0FBRztBQUNaLG1CQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWUsRUFBRSxDQUFDO0FBQ2xCLHVCQUFxQixFQUFFLENBQUM7Q0FDekIsQ0FBQzs7O0FBR0YsSUFBSSxnQkFBZ0IsR0FBRztBQUNyQixnQkFBYyxFQUFkLGNBQWM7QUFDZCxzQkFBb0IsRUFBcEIsb0JBQW9CO0FBQ3BCLGFBQVcsRUFBWCxXQUFXO0FBQ1gseUJBQXVCLEVBQXZCLHVCQUF1QjtBQUN2QixzQkFBb0IsRUFBcEIsb0JBQW9CO0NBQ3JCLENBQUM7OztBQUdGLElBQUksVUFBVSxHQUFHO0FBQ2YsV0FBUyxFQUFFLGdCQXJCSixZQUFZLENBcUJLLE9BQU87QUFDL0IsYUFBVyxFQUFFLGdCQXRCTixZQUFZLENBc0JPLFNBQVM7QUFDbkMsaUJBQWUsRUFBRSxnQkF2QlYsWUFBWSxDQXVCVyxhQUFhO0FBQzNDLHdCQUFzQixFQUFFLGdCQXhCakIsWUFBWSxDQXdCa0Isb0JBQW9CO0FBQ3pELG9CQUFrQixFQUFFLGdCQXpCYixZQUFZLENBeUJjLGdCQUFnQjtBQUNqRCx3QkFBc0IsRUFBRSxnQkExQmpCLFlBQVksQ0EwQmtCLG9CQUFvQjtDQUMxRCxDQUFDOzs7O0lBR1csU0FBUztBQUNULFdBREEsU0FBUyxDQUNSLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTswQkFEbkMsU0FBUzs7QUFFbEIsK0JBRlMsU0FBUyw2Q0FFVjs7QUFFUixRQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBSyxDQUFDLENBQUM7QUFDdEMsUUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUssQ0FBQyxDQUFDO0FBQ3RDLFFBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7QUFDakQsUUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUMvRCxRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxJQUFJLEtBQUssQ0FBQztBQUMvQyxRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsUUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7OztBQUd6QixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN6QixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztHQUMzQjs7WUFuQlUsU0FBUzs7ZUFBVCxTQUFTOztXQW9CUixzQkFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO0FBQ2hDLGlDQXJCUyxTQUFTLGdDQXFCRixJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7S0FDdkM7Ozs7O1dBRXFCLGdDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDcEMsVUFBSSxhQUFhLEdBQUcsS0FBSyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7O0FBRXhELFVBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O0FBRXpCLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDcEMsTUFBTTs7QUFFTCxZQUFJLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0YsMkJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztPQUM3Qzs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7QUFDbEIsVUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQUNqRCwrQkFBaUIsSUFBSSxDQUFDLFFBQVEsOEhBQUU7Z0JBQXhCLEtBQUs7O0FBQ1gsZ0JBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQscUJBQU8sS0FBSyxDQUFDO2FBQ2Q7V0FDRjs7Ozs7Ozs7Ozs7Ozs7O09BQ0Y7QUFDRCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7V0FDbUIsZ0NBQUc7QUFDckIsYUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7V0FDVyx3QkFBRyxFQUFHOzs7V0FDUixzQkFBRyxFQUFHOzs7V0FDRixpQkFBQyxJQUFJLEVBQUU7QUFDbkIsYUFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7OztTQXZEVSxTQUFTO0dBQVMsUUFBUSxDQUFDLFNBQVM7O1FBQXBDLFNBQVMsR0FBVCxTQUFTOztBQXlEdEIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLGlCQXRGdkIsWUFBWSxBQXNGa0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxRHhELFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRztBQUN4QyxTQUFTLG9CQUFvQixHQUFHLEVBQUc7QUFDbkMsU0FBUyxXQUFXLEdBQUcsRUFBRztBQUMxQixTQUFTLHVCQUF1QixHQUFHLEVBQUc7QUFDdEMsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2xDLE1BQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFekQsU0FBTyxtQkFBbUIsQ0FBQztDQUM1Qjs7O0FDNUpELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFPZ0Isa0JBQWtCOzs0QkFDTSxnQkFBZ0I7OztBQUdyRSxJQUFJLGdCQUFnQixHQUFHLEVBQUcsQ0FBQzs7O0FBRzNCLElBQUksVUFBVSxHQUFHO0FBQ2YsV0FBUyxFQUFFLGdCQVJKLFlBQVksQ0FRSyxPQUFPO0FBQy9CLGFBQVcsRUFBRSxnQkFUTixZQUFZLENBU08sU0FBUztBQUNuQyxpQkFBZSxFQUFFLGdCQVZWLFlBQVksQ0FVVyxhQUFhO0FBQzNDLHdCQUFzQixFQUFFLGdCQVhqQixZQUFZLENBV2tCLG9CQUFvQjtBQUN6RCxvQkFBa0IsRUFBRSxnQkFaYixZQUFZLENBWWMsZ0JBQWdCO0FBQ2pELHdCQUFzQixFQUFFLGdCQWJqQixZQUFZLENBYWtCLG9CQUFvQjtDQUMxRCxDQUFDOzs7O0lBR1csU0FBUzs7O0FBRVAsV0FGRixTQUFTLENBRU4sSUFBSSxFQUFXO3NDQUFOLElBQUk7QUFBSixVQUFJOzs7MEJBRmhCLFNBQVM7O0FBR2QsK0JBSEssU0FBUyw4Q0FHTCxJQUFJLEVBQUU7O0FBRWYsUUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztBQUNqRCxRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUMxQixRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7OztBQUcxQixRQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN6QixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUN6QixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztHQUU1Qjs7WUFyQlEsU0FBUzs7ZUFBVCxTQUFTOztXQXNCSCwyQkFBRztBQUNkLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUM3Qjs7O1dBQ2MseUJBQUMsTUFBTSxFQUFFO0FBQ3BCLGdCQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLFVBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNmOzs7V0FDWSx1QkFBQyxJQUFJLEVBQUU7Ozs7OztBQUNsQiw2QkFBaUIsSUFBSSxDQUFDLFFBQVEsOEhBQUU7Y0FBeEIsS0FBSzs7QUFDWCxjQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLGNBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7O0FBRUQsY0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNwQyxtQkFBTyxLQUFLLENBQUM7V0FDZDtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBN0NRLFNBQVM7R0FBUyxRQUFRLENBQUMsS0FBSzs7UUFBaEMsU0FBUyxHQUFULFNBQVM7O0FBZ0R0QixTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksaUJBaEV2QixZQUFZLEFBZ0VrQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEV4RCxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhQSxhQUFhO0FBQ2IsV0FEQSxhQUFhLENBQ1osTUFBTSxFQUFFLElBQUksRUFBRyxXQUFXLEVBQUUsa0JBQWtCLEVBQUU7MEJBRGpELGFBQWE7O0FBRXRCLCtCQUZTLGFBQWEsNkNBRWhCLFdBQVcsRUFBRTs7QUFFbkIsUUFBSSxDQUFDLElBQUksR0FBRyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzs7QUFHaEQsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7OztBQUcxQyxRQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHbkMsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsUUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O0FBRXpCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzs7R0FHM0I7O1lBcEJVLGFBQWE7O2VBQWIsYUFBYTs7V0FxQmpCLGlCQUFDLElBQUksRUFBRTtBQUNaLFVBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixhQUFPLElBQUksQ0FBQztLQUNiOzs7OztXQUVRLG1CQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZCxVQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxlQUFlLENBQUUsQ0FBQztBQUN6QyxhQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ25CLFVBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsVUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7QUFJWCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDVyxzQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRTtBQUNqQyxVQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQzs7QUFFdEMsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3Qjs7Ozs7V0FFVyx3QkFBRztBQUNiLGFBQU87QUFDTCxTQUFDLEVBQUUsTUFBTSxDQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7QUFDbkMsU0FBQyxFQUFFLE1BQU0sQ0FBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFO09BQ3BDLENBQUM7S0FDSDs7O1dBQ2tCLCtCQUFHO0FBQ25CLGFBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFDLFlBQVksQ0FBRSxDQUFDO0tBQzlEOzs7U0FuRFUsYUFBYTtHQUFTLFFBQVEsQ0FBQyxNQUFNOztRQUFyQyxhQUFhLEdBQWIsYUFBYTs7Ozs7Ozs7Ozs7OztBQ0gxQixZQUFZLENBQUM7Ozs7O1FBSUcsRUFBRSxHQUFGLEVBQUU7QUFGbEIsSUFBSSxLQUFLLENBQUM7O0FBRUgsU0FBUyxFQUFFLENBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRTs7QUFFMUMsTUFBRyxLQUFLLEVBQUU7QUFDUixXQUFPLEtBQUssQ0FBQztHQUNkOztBQUVELE1BQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDN0IsVUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0dBQzFEOztBQUVELE1BQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQixNQUFJLE9BQU8sR0FBRyxZQUFZLENBQUM7QUFDM0IsT0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFWCxPQUFLLENBQUMsY0FBYyxHQUFHLFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRTtBQUN0RCxXQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDeEMsQ0FBQztBQUNGLE9BQUssQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxFQUN4RSxDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2Q7Ozs7Ozs7O1FDbkNlLFlBQVksR0FBWixZQUFZOztBQUFyQixTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUUsYUFBYSxFQUFFO0FBQ2pELE1BQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO0NBQzNDOzs7QUNGRCxZQUFZLENBQUM7Ozs7Ozs7O0FBS2IsSUFBSSxnQkFBZ0IsR0FBRztBQUNyQixRQUFNLEVBQU4sTUFBTTtDQUNQLENBQUM7OztBQUdLLElBQUksWUFBWSxHQUFHLENBQUMsU0FBUyxZQUFZLEdBQUc7QUFDakQsU0FBTztBQUNMLFdBQU8sRUFBQSxpQkFBQyxHQUFHLEVBQUU7QUFDVCxhQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN0QztBQUNELGFBQVMsRUFBQSxtQkFBQyxJQUFJLEVBQUU7QUFDWixhQUFPLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7QUFDRCxpQkFBYSxFQUFBLHVCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEIsVUFBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFHO0FBQ3hELGVBQU8sSUFBSSxDQUFDO09BQ2Y7O0FBRUQsYUFBTyxLQUFLLENBQUM7S0FDaEI7QUFDRCx3QkFBb0IsRUFBQSxnQ0FBRyxFQUV0QjtBQUNELG9CQUFnQixFQUFBLDRCQUFHLEVBRWxCO0FBQ0Qsd0JBQW9CLEVBQUEsZ0NBQUcsRUFFdEI7R0FDRixDQUFDO0NBQ0gsQ0FBQSxFQUFHLENBQUM7O1FBekJNLFlBQVksR0FBWixZQUFZOztBQTRCdkIsU0FBUyxNQUFNLENBQUMsVUFBVSxFQUFFOztBQUUxQixNQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbkIsV0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQ3JDOzs7QUFHRCxTQUFPLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxBQUFDLFVBQVUsR0FBRyxDQUFDLEtBQU0sQ0FBQyxDQUFDO0NBQ2pFOzs7QUM5Q0QsWUFBWSxDQUFDOzs7OztRQVFHLGVBQWUsR0FBZixlQUFlOzs7OzBCQU5kLGFBQWE7Ozs7QUFFOUIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOzs7O0FBR3BCLFNBQVMsZUFBZSxHQUFJO0FBQ2pDLE1BQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFZixPQUFLLENBQUMsY0FBYyxHQUFHLFVBQVUsZUFBZSxFQUFFO0FBQ2hELFFBQUksV0FBVyxZQUFBLENBQUM7O0FBRWhCLFFBQUcsS0FBSyxDQUFDLHdCQUF3QixDQUFFLFNBQVMsQ0FBRSxlQUFlLENBQUUsQ0FBRSxFQUFHO0FBQ2xFLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7O0FBRUQsZUFBVyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEQsbUJBQWUsQ0FBQyxJQUFJLENBQUUsV0FBVyxDQUFFLENBQUM7O0FBRXBDLFdBQU8sV0FBVyxDQUFDO0dBQ3BCLENBQUM7QUFDRixPQUFLLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxXQUFXLEVBQUUsRUFFaEQsQ0FBQztBQUNGLE9BQUssQ0FBQyxrQkFBa0IsR0FBRyxZQUFZO0FBQ3JDLFdBQU8sZUFBZSxDQUFDO0dBQ3hCLENBQUM7QUFDRixPQUFLLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxhQUFhLEVBQUU7QUFDeEQsV0FBUyxpQkFBaUIsQ0FBQyxPQUFPLENBQUUsYUFBYSxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUc7R0FDNUQsQ0FBQztBQUNGLFdBQVMsU0FBUyxDQUFFLGVBQWUsRUFBRTtBQUNuQyxXQUFTLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUc7R0FDOUMsQ0FBQzs7QUFFRixTQUFPLEtBQUssQ0FBQztDQUNkOzs7QUN0Q0QsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUVpQixtQkFBbUI7O2tDQUNuQix3QkFBd0I7O2dDQUM5QixzQkFBc0I7Ozs7QUFFOUMsSUFBSSxLQUFLLENBQUM7O0lBRUcsa0JBQWtCO0FBQ2xCLFdBREEsa0JBQWtCLEtBQ0ksSUFBSSxFQUFHLFdBQVcsRUFBRSxrQkFBa0IsRUFBeUI7UUFBcEYsTUFBTSxnQ0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUEwQyxLQUFLLGdDQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTs7MEJBRG5GLGtCQUFrQjs7QUFFM0IsUUFBSSxLQUFLLENBQUM7O0FBRVYsUUFBTSxNQUFNLEdBQUcsOEJBQVksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxRQUFNLElBQUksR0FBRyw4QkFBWSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVoRCwrQkFQUyxrQkFBa0IsNkNBT3JCLE1BQU0sRUFBRSxJQUFJLEVBQUcsV0FBVyxFQUFFLGtCQUFrQixFQUFFOztBQUV0RCxRQUFJLFdBQVcsR0FBRyw4QkFBWSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELFFBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsUUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsUUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDaEIsWUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUNqQzs7Ozs7QUFLRCxRQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDN0M7O1lBdkJVLGtCQUFrQjs7ZUFBbEIsa0JBQWtCOztXQXdCZCxvQkFBRztBQUNoQixhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0ExQlUsa0JBQWtCO2VBTnRCLGFBQWE7O1FBTVQsa0JBQWtCLEdBQWxCLGtCQUFrQjs7QUE2Qi9CLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRTtBQUM5QixNQUFHLENBQUMsS0FBSyxFQUFFO0FBQ1QsUUFBSSxXQUFXLEdBQUcsOEJBQVksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVsRCxTQUFLLEdBQUcsd0JBdENILGFBQWEsRUFzQ0ksRUFBRSxDQUFDLEVBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0dBQzVHOztBQUVELFNBQU8sS0FBSyxDQUFDO0NBQ2Q7OztBQzdDRCxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7OzJCQUVzQixlQUFlOztJQUVyQyxtQkFBbUI7V0FBbkIsbUJBQW1COzBCQUFuQixtQkFBbUI7Ozs7Ozs7WUFBbkIsbUJBQW1COztlQUFuQixtQkFBbUI7O1dBQ3JCLHFCQUFVO3dDQUFOLElBQUk7QUFBSixZQUFJOzs7QUFDZixpQ0FGUyxtQkFBbUIsOENBRVAsSUFBSSxFQUFFOztBQUUzQixVQUFJLENBQUMsSUFBSSxHQUFHLDJCQUEyQixDQUFDO0tBQ3pDOzs7U0FMVSxtQkFBbUI7Z0JBRnZCLGtCQUFrQjs7UUFFZCxtQkFBbUIsR0FBbkIsbUJBQW1COzs7QUNKaEMsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzsyQkFFc0IsZUFBZTs7SUFFckMsZ0JBQWdCO1dBQWhCLGdCQUFnQjswQkFBaEIsZ0JBQWdCOzs7Ozs7O1lBQWhCLGdCQUFnQjs7ZUFBaEIsZ0JBQWdCOztXQUNsQixxQkFBVTt3Q0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQ2YsaUNBRlMsZ0JBQWdCLDhDQUVKLElBQUksRUFBRTs7QUFFM0IsVUFBSSxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQztLQUN2Qzs7O1NBTFUsZ0JBQWdCO2dCQUZwQixrQkFBa0I7O1FBRWQsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7O0FDSjdCLFlBQVksQ0FBQTs7Ozs7UUFFSSxhQUFhLEdBQWIsYUFBYTs7QUFBdEIsU0FBUyxhQUFhLEtBQXdCLE1BQU0sRUFBYztNQUEzQyxNQUFNLGdDQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFO01BQVUsS0FBSyxnQ0FBRyxFQUFFOztBQUNyRSxNQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxNQUFJLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDdEIsTUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixPQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDNUIsWUFBWSxDQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUUsQ0FBQzs7QUFFcEUsU0FBTyxLQUFLLENBQUM7Q0FDZDs7O0FDWEQsWUFBWSxDQUFDOzs7OztRQUlHLFVBQVUsR0FBVixVQUFVO1FBR1YsUUFBUSxHQUFSLFFBQVE7UUFNUixjQUFjLEdBQWQsY0FBYztRQXdCZCxXQUFXLEdBQVgsV0FBVztRQVFYLGlCQUFpQixHQUFqQixpQkFBaUI7OztBQXpDMUIsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQ2pDLFNBQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUI7O0FBQ00sU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQy9CLFNBQU8sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdkI7Ozs7O0FBSU0sU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0MsTUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkMsTUFBSSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFCLE1BQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLE1BQUksRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUV2QixNQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQUFBQyxFQUFFLEdBQUcsQ0FBQyxHQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbkMsTUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDbEMsTUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRTFCLE1BQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFO0FBQ2xELFdBQU87QUFDTCxPQUFDLEVBQUUsRUFBRTtBQUNMLE9BQUMsRUFBRSxFQUFFO0tBQ04sQ0FBQztHQUNMLE1BQU07QUFDTCxXQUFPO0FBQ0wsT0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDO0FBQ1QsT0FBQyxFQUFFLEVBQUUsR0FBSSxFQUFFLEdBQUcsQ0FBQyxBQUFDLElBQUksQUFBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUM7S0FDL0MsQ0FBQztHQUNIO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLFNBQU87QUFDTCxVQUFNLEVBQUUsTUFBTTtBQUNkLEtBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQztBQUNiLEtBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7R0FDekIsQ0FBQztDQUNIOztBQUVNLFNBQVMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDakQsTUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RDLE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDN0IsTUFBSSxZQUFZLEdBQUc7QUFDakIsS0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ2xCLEtBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7R0FDcEIsQ0FBQztBQUNGLE1BQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFJLGlCQUFpQixDQUFDOztBQUV0QixtQkFBaUIsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFakQsTUFBRyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckQsVUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0dBQ3REO0FBQ0QsY0FBWSxHQUFHO0FBQ2IsS0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUNoRSxLQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0dBQ2pFLENBQUM7O0FBRUYsU0FBTyxZQUFZLENBQUM7Q0FDckI7O0FBQUEsQ0FBQzs7cUJBRWE7QUFDYixZQUFVLEVBQUUsVUFBVTtBQUN0QixVQUFRLEVBQUUsUUFBUTtBQUNsQixnQkFBYyxFQUFFLGNBQWM7QUFDOUIsYUFBVyxFQUFFLFdBQVc7QUFDeEIsbUJBQWlCLEVBQUUsaUJBQWlCO0NBQ3JDOzs7QUMxRUQsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzswQkFFaUIsZ0JBQWdCOztJQUVqQyxjQUFjO1dBQWQsY0FBYzswQkFBZCxjQUFjOzs7Ozs7O1lBQWQsY0FBYzs7ZUFBZCxjQUFjOztXQUNoQixtQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7QUFDcEQsaUNBRlMsY0FBYyw2Q0FFTCxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7O0FBRTlELFVBQUksQ0FBQyxJQUFJLEdBQUcsc0JBQXNCLENBQUM7S0FDcEM7OztTQUxVLGNBQWM7ZUFGbEIsYUFBYTs7UUFFVCxjQUFjLEdBQWQsY0FBYzs7O0FDSjNCLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7MEJBRWlCLGdCQUFnQjs7SUFFakMsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7Ozs7OztZQUFYLFdBQVc7O2VBQVgsV0FBVzs7V0FDYixtQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7QUFDcEQsaUNBRlMsV0FBVyw2Q0FFRixNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7O0FBRTlELFVBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7S0FDbEM7OztTQUxVLFdBQVc7ZUFGZixhQUFhOztRQUVULFdBQVcsR0FBWCxXQUFXOzs7Ozs7OztBQ0pqQixJQUFJLFFBQVEsR0FBRztBQUNwQixJQUFFLEVBQUUsMEJBQTBCO0FBQzlCLE1BQUksRUFBRSxDQUFDO0FBQ1AsU0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO0FBQzNCLG1CQUFpQixFQUFFO0FBQ2pCLE9BQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztHQUNsQjtDQUNGLENBQUM7UUFQUyxRQUFRLEdBQVIsUUFBUTs7Ozs7Ozs7QUNBWixJQUFJLE9BQU8sR0FBRztBQUNuQixRQUFNLEVBQUUsMEJBQTBCO0FBQ2xDLE1BQUksRUFBRSxDQUFDO0FBQ1AsUUFBTSxFQUFFLENBQUM7QUFDUCxRQUFJLEVBQUUsV0FBVztBQUNqQixTQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsUUFBSSxFQUFFLGNBQWM7QUFDcEIsV0FBTyxFQUFFLFlBQVk7QUFDckIsVUFBTSxFQUFFLENBQUM7QUFDUCxVQUFJLEVBQUUsV0FBVztBQUNqQixXQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsVUFBSSxFQUFFLGtCQUFrQjtBQUN4QixjQUFRLEVBQUUsQ0FBQztBQUNULHFCQUFhLEVBQUUsS0FBSztPQUNyQixDQUFDO0FBQ0YsYUFBTyxFQUFFO0FBQ1AsYUFBSyxFQUFFLElBQUk7T0FDWjtBQUNELGtCQUFZLEVBQUUsQ0FBQztBQUNiLFlBQUksRUFBRSxxQkFBcUI7QUFDM0IsWUFBSSxFQUFFLGFBQWE7QUFDbkIscUJBQWEsRUFBRSxhQUFhO0FBQzVCLGVBQU8sRUFBRSxDQUFDO0FBQ1AsbUJBQVMsRUFBQyxDQUFDO0FBQ1gsZ0JBQU0sRUFBQyxPQUFPO0FBQ2QsZUFBSyxFQUFDLDBCQUEwQjtBQUNoQyxpQkFBTyxFQUFDO0FBQ0wsZUFBRyxFQUFDLEdBQUc7QUFDUCxlQUFHLEVBQUMsR0FBRztXQUNUO0FBQ0QsZ0JBQU0sRUFBRSxFQUFFO0FBQ1Ysd0JBQWMsRUFBQyxHQUFHO1NBQ3BCLEVBQUM7QUFDQyxtQkFBUyxFQUFDLENBQUM7QUFDWCxnQkFBTSxFQUFDLE9BQU87QUFDZCxlQUFLLEVBQUMsMEJBQTBCO0FBQ2hDLGlCQUFPLEVBQUM7QUFDTCxlQUFHLEVBQUMsR0FBRztBQUNQLGVBQUcsRUFBQyxLQUFLO1dBQ1g7QUFDRCxnQkFBTSxFQUFFLEVBQUU7QUFDVix3QkFBYyxFQUFDLEdBQUc7U0FDcEIsRUFDRDtBQUNHLG1CQUFTLEVBQUMsQ0FBQztBQUNYLGdCQUFNLEVBQUMsUUFBUTtBQUNmLGVBQUssRUFBQywwQkFBMEI7QUFDaEMsaUJBQU8sRUFBQztBQUNMLGVBQUcsRUFBQyxJQUFJO0FBQ1IsZUFBRyxFQUFDLElBQUk7V0FDVjtBQUNELGdCQUFNLEVBQUUsRUFBRTtBQUNWLHdCQUFjLEVBQUMsR0FBRztTQUNwQixFQUNEO0FBQ0csbUJBQVMsRUFBQyxDQUFDO0FBQ1gsZ0JBQU0sRUFBQyxRQUFRO0FBQ2YsZUFBSyxFQUFDLDBCQUEwQjtBQUNoQyxpQkFBTyxFQUFDO0FBQ0wsZUFBRyxFQUFDLElBQUk7QUFDUixlQUFHLEVBQUMsS0FBSztXQUNYO0FBQ0QsZ0JBQU0sRUFBRSxFQUFFO0FBQ1Ysd0JBQWMsRUFBQyxHQUFHO1NBQ3BCLENBQUM7T0FDSCxDQUFDO0tBQ0gsRUFBQztBQUNBLFlBQU0sRUFBRSxXQUFXO0FBQ25CLGFBQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvQixZQUFNLEVBQUUsV0FBVztBQUNuQixlQUFTLEVBQUU7QUFDVCxlQUFPLEVBQUUsT0FBTztPQUNqQjtBQUNELG9CQUFjLEVBQUUsQ0FBQztBQUNmLGNBQU0sRUFBRSxrQkFBa0I7QUFDMUIsY0FBTSxFQUFFLE1BQU07QUFDZCx1QkFBZSxFQUFFLE1BQU07QUFDdkIsaUJBQVMsRUFBRSxDQUFDO0FBQ1YsbUJBQVMsRUFBQyxDQUFDO0FBQ1gsZ0JBQU0sRUFBRSxpQkFBaUI7QUFDekIsaUJBQU8sRUFBRTtBQUNQLGVBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUk7V0FDckI7QUFDRCxnQkFBTSxFQUFFO0FBQ04sNEJBQWdCLEVBQUUsTUFBTTtXQUN6QjtBQUNELHdCQUFjLEVBQUMsR0FBRztTQUNuQixDQUFDO09BQ0gsQ0FBQztLQUNILENBQUM7R0FDSCxDQUFDO0NBQ0gsQ0FBQztRQTNGUyxPQUFPLEdBQVAsT0FBTzs7Ozs7Ozs7QUNBWCxJQUFJLFFBQVEsR0FBRztBQUNwQixlQUFhLEVBQUU7QUFDYixhQUFTLEVBQUM7QUFDUixlQUFTLEVBQUM7QUFDUixtQkFBVyxFQUFDLEVBQUU7QUFDZCxvQkFBWSxFQUFDLEVBQUU7T0FDaEI7S0FDRjtBQUNELGlCQUFhLEVBQUM7QUFDWixjQUFRLEVBQ1IsQ0FBQyx5REFBeUQsQ0FBQztBQUMzRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUNyRDtBQUNELGlCQUFXLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0QsYUFBUyxFQUFDO0FBQ1IsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzFIO0FBQ0QsaUJBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7S0FDcEI7QUFDRCxZQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUM7QUFDOUYsZ0JBQVksRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHVDQUF1QyxFQUFDLG1DQUFtQyxFQUFDLHNDQUFzQyxDQUFDO0FBQzdILGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUN0RDtLQUNGO0FBQ0QsY0FBVSxFQUFDO0FBQ1QsY0FBUSxFQUFDLENBQUMsd0NBQXdDLENBQUM7QUFDbkQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUM1QjtLQUNGO0FBQ0QsV0FBTyxFQUFDLEVBQUU7QUFDVixVQUFNLEVBQUM7QUFDTCxjQUFRLEVBQUMsQ0FBQyw0Q0FBNEMsQ0FBQztBQUN2RCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVSO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUN2STtLQUNGLEVBQUMsVUFBVSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMs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RUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLGdFQUFnRSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDO0NBQ244SCxDQUFDO1FBOUhTLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IExpYnJhcnkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIE1hcCA9IHJlcXVpcmUoICcuLi9wdWJsaWMvY29tcG9uZW50cy9tYXAvTWFwJyk7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMnO1xuXG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhLmpzJztcblxuLypcbjEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbllvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuaXMgYW5vdGhlciBjbGFzcyAvIG1vZHVsZSB0aGF0IGhhbmRsZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCB5b3UgZGVmaW5lIGEgZ29vZCBzZXQgb2YgcHJpbmNpcGxlIGhvdyBpdCdzIGRvbmUuIERhdGEgaW4gdGhpczpcblwie1xuICBcIm9ialR5cGVcIjoyLFxuICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxufVwiXG5XaGF0IGRvIHdlIGRvIHdpdGggdGhlIF9pZCBhbmQgc2hvdWxkIHRoYXQgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgZGF0YSwgd2hlbiB3ZSBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0cy5cblxuQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbi8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbmRlc2NyaWJlKFwiYmFzaWMgbWFwIC0gd2l0aG91dCBwbHVnaW5zXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIC8qbGV0IG1hcERhdGEgPSB7XG4gICAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICAgIHBsdWdpbnNUb0FjdGl2YXRlOiBmYWxzZSxcbiAgICBzdGFnZXM6IFt7XG4gICAgICB0eXBlOiBcIk1hcF9zdGFnZVwiLFxuICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICAgIGxheWVyczogW3tcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDEsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0se1xuICAgICAgICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIG5hbWU6IFwidW5pdExheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdW5pdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ1bml0XCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcbiAgKi9cblxuXG4gIGRlc2NyaWJlKFwiPT4gbWFrZSBtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1hcCA9IGNyZWF0ZU1hcChnYW1lRGF0YSwgbWFwRGF0YSwgdHlwZURhdGEpO1xuXG4gICAgaXQoXCI9PiBleGlzdHNcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXApLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiBzdGFnZSBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5uYW1lID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikubmFtZSAgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IGxheWVyIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldExheWVyTmFtZWQoXCJ1bml0TGF5ZXJcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHRlcnJhaW4gcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KE51bWJlciggbWFwLmdldExheWVyTmFtZWQoXCJ0ZXJyYWluQmFzZUxheWVyXCIpLmNoaWxkcmVuWzFdLnkgKSA9PT0gNDgwKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldExheWVyTmFtZWQoXCJ0ZXJyYWluQmFzZUxheWVyXCIpLmNoaWxkcmVuLmxlbmd0aCA+IDEpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHVuaXQgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KE51bWJlciggbWFwLmdldExheWVyTmFtZWQoXCJ1bml0TGF5ZXJcIikuY2hpbGRyZW5bMF0ueCApID09PSA2MCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdW5pdCBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgbWFwLmluaXQoIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICBmdW5jdGlvbiB0aWNrRG9uZUZ1bmModGlja0RvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG5cblxuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1IDEuMC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqIFxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4vKmdsb2JhbCB1bmVzY2FwZSwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSkge1xuICAgICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpLFxuICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KSB7XG4gICAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sX21kNSh4LCBsZW4pIHtcbiAgICAgICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgICAgICAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAobGVuICUgMzIpO1xuICAgICAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XG5cbiAgICAgICAgdmFyIGksIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQsXG4gICAgICAgICAgICBhID0gIDE3MzI1ODQxOTMsXG4gICAgICAgICAgICBiID0gLTI3MTczMzg3OSxcbiAgICAgICAgICAgIGMgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICAgIGQgPSAgMjcxNzMzODc4O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgb2xkYSA9IGE7XG4gICAgICAgICAgICBvbGRiID0gYjtcbiAgICAgICAgICAgIG9sZGMgPSBjO1xuICAgICAgICAgICAgb2xkZCA9IGQ7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNywgLTY4MDg3NjkzNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE3LCAgNjA2MTA1ODE5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA3LCAtMTc2NDE4ODk3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDcsICAxNzcwMDM1NDE2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDcsICAxODA0NjAzNjgyKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNSwgLTE2NTc5NjUxMCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICA2XSwgIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgIDY0MzcxNzcxMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaV0sICAgICAgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCAgOSwgIDM4MDE2MDgzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA1LCAgNTY4NDQ2NDM4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICAyXSwgIDksIC01MTQwMzc4NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTQsICAxNzM1MzI4NDczKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDQsIC0zNzg1NTgpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDQsICA2ODEyNzkxNzQpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2ldLCAgICAgIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDQsIC02NDAzNjQ0ODcpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICAyXSwgMjMsIC05OTUzMzg2NTEpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA2LCAgMTg3MzMxMzM1OSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG5cbiAgICAgICAgICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICAgICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICAgICAgICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICAgICAgICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2EsIGIsIGMsIGRdO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmwycnN0cihpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogMzI7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDg7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhGRikgPDwgKGkgJSAzMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX21kNShzKSB7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUocnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX2htYWNfbWQ1KGtleSwgZGF0YSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGJrZXkgPSByc3RyMmJpbmwoa2V5KSxcbiAgICAgICAgICAgIGlwYWQgPSBbXSxcbiAgICAgICAgICAgIG9wYWQgPSBbXSxcbiAgICAgICAgICAgIGhhc2g7XG4gICAgICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgICBia2V5ID0gYmlubF9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgICAgICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaCA9IGJpbmxfbWQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgICAgIHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxuICAgICAgICAgICAgb3V0cHV0ID0gJycsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXG4gICAgICAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxuICAgICovXG4gICAgZnVuY3Rpb24gc3RyMnJzdHJfdXRmOChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xuICAgICovXG4gICAgZnVuY3Rpb24gcmF3X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyX21kNShzdHIycnN0cl91dGY4KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfbWQ1KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmF3X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfaG1hY19tZDUoc3RyMnJzdHJfdXRmOChrKSwgc3RyMnJzdHJfdXRmOChkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfaG1hY19tZDUoaywgZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoZXhfbWQ1KHN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmF3X21kNShzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWQ1O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkLm1kNSA9IG1kNTtcbiAgICB9XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09IDNyZCBwYXJ0eSBsaWJyYXJ5IGltcG9ydHMgPT09PT0gKi9cbi8vaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSAnc3lzdGVtanMnO1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwJztcbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4uL21hcC9jb3JlL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuLi9tYXAvY29yZS9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW5faGV4YSB9IGZyb20gJy4uL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdF9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhJztcbmltcG9ydCB7IE9iamVjdF90ZXJyYWluIH0gZnJvbSAnLi4vbWFwL29iamVjdC9PYmplY3RfdGVycmFpbic7XG5pbXBvcnQgeyBPYmplY3RfdW5pdCB9IGZyb20gJy4uL21hcC9vYmplY3QvT2JqZWN0X3VuaXQnO1xuaW1wb3J0IHsgc3ByaXRlc2hlZXRMaXN0IH0gZnJvbSAnLi4vbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0JztcbmxldCBhbGxTcHJpdGVzaGVldHMgPSBzcHJpdGVzaGVldExpc3QoKTtcbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuLi9tYXAvY29yZS9tYXBfdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi9tYXAvY29yZS9VSSc7XG5pbXBvcnQgeyBVSV9kZWZhdWx0IH0gZnJvbSBcIi4uL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbmxldCBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgTWFwX3N0YWdlLFxuICBNYXBfbGF5ZXIsXG4gIE9iamVjdF90ZXJyYWluLFxuICBPYmplY3RfdW5pdCxcbiAgT2JqZWN0X3RlcnJhaW5faGV4YSxcbiAgT2JqZWN0X3VuaXRfaGV4YVxufTtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgICBfZ2V0U3RhZ2VJbmRleFxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gICAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleFxufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuLypcbkBhcmd1bWVudCB7YmlnYXNzIE9iamVjdH0gbWFwRGF0YSAtIGhvbGRzIGFsbCB0aGUgc3RhZ2UsIGxheWVyIGFuZCBvYmplY3QgZGF0YSBuZWVkZWQgdG8gY29uc3RydWN0IGEgZnVsbCBtYXAuXG5Db29yZGluYXRlcyBhcmUgYWx3YXlzIGRlZmF1bHRlZCB0byAwLDAgaWYgbm9uZSBhcmUgZ2l2ZW4uXG57XG4gIG1hcFNpemU6IGNyZWF0ZWpzLlJlY3RhbmdsZSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IFtcbiAgICBcIm1hcC9tb3ZlL21hcF9tb3ZlXCIsXG4gICAgXCJtYXAvRk9XL21hcF9GT1dcIlxuICBdLFxuICBzdGFnZXM6IFt7XG4gICAgdHlwZTogXCJtYXAvY29yZS9NYXBfU3RhZ2VcIixcbiAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XSxcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dLFxuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdW5pdFwiLFxuICAgICAgICBuYW1lOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJJbmZhbnRyeSAxXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59XG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGdhbWVEYXRhQXJnLCBtYXBEYXRhQXJnLCB0eXBlRGF0YUFyZykge1xuICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG4gIHZhciBtYXBEYXRhID0gKHR5cGVvZiBtYXBEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UobWFwRGF0YUFyZykgOiBtYXBEYXRhQXJnO1xuICB2YXIgdHlwZURhdGEgPSAodHlwZW9mIHR5cGVEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UodHlwZURhdGFBcmcpIDogdHlwZURhdGFBcmc7XG4gIHZhciBnYW1lRGF0YSA9ICh0eXBlb2YgZ2FtZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShnYW1lRGF0YUFyZykgOiBnYW1lRGF0YUFyZztcbiAgdmFyIG1hcCA9IG5ldyBNYXAoeyBtYXBTaXplOiBnYW1lRGF0YS5tYXBTaXplIH0pO1xuICB2YXIgZGlhbG9nX3NlbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0aW9uRGlhbG9nXCIpO1xuICB2YXIgZGVmYXVsdFVJID0gbmV3IFVJX2RlZmF1bHQoZGlhbG9nX3NlbGVjdGlvbik7XG4gIGRlZmF1bHRVSS5pbml0KCk7XG5cbiAgLyogSW5pdGlhbGl6ZSBVSSBhcyBzaW5nbGV0b24gKi9cbiAgVUkoZGVmYXVsdFVJLCBtYXApO1xuXG4gIC8qIEFjdGl2YXRlIHBsdWdpbnMgKi9cbiAgLyogVGhlIHN5c3RlbSBkb2VzIG5vdCB3b3JrIDooXG4gIGlmKGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcCAmJiBnYW1lRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAubGVuZ3RoID4gMCkge1xuICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcC5tYXAoeCA9PiBTeXN0ZW0uaW1wb3J0KHgpKSlcbiAgICAgIC50aGVuKChbbW9kdWxlMSwgbW9kdWxlMiwgbW9kdWxlM10pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwbHVnaW5zIGxvYWRlZFwiKTtcbiAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnN0YWNrKTtcbiAgICAgIH0pO1xuICB9XG4gICovXG5cbiAgLyogV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBnaXZlbiBtYXAgZGF0YSBhbmQgY3JlYXRlIG9iamVjdHMgYWNjb3JkaW5nbHkgKi9cbiAgbWFwRGF0YS5zdGFnZXMuZm9yRWFjaCggc3RhZ2VEYXRhID0+IHtcbiAgICBsZXQgdGhpc1N0YWdlID0gbmV3IGZ1bmN0aW9uc0luT2JqW3N0YWdlRGF0YS50eXBlXShzdGFnZURhdGEubmFtZSwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggc3RhZ2VEYXRhLmVsZW1lbnQgKSApO1xuXG4gICAgbWFwLmFkZFN0YWdlKCB0aGlzU3RhZ2UgKTtcblxuICAgIHN0YWdlRGF0YS5sYXllcnMuZm9yRWFjaCggbGF5ZXJEYXRhID0+IHtcbiAgICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXNMYXllciA9IG5ldyBmdW5jdGlvbnNJbk9ialtsYXllckRhdGEudHlwZV0obGF5ZXJEYXRhLm5hbWUsIGxheWVyRGF0YS50eXBlLCBmYWxzZSwgbGF5ZXJEYXRhLmNvb3JkKTtcbiAgICAgICAgdGhpc1N0YWdlLmFkZENoaWxkKCB0aGlzTGF5ZXIgKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW06XCIsIGxheWVyRGF0YS50eXBlLCBlLnN0YWNrKVxuICAgICAgfVxuXG4gICAgICBsYXllckRhdGEub2JqZWN0R3JvdXBzLmZvckVhY2goIG9iamVjdEdyb3VwID0+IHtcbiAgICAgICAgbGV0IHNwcml0ZXNoZWV0O1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXRUeXBlID0gb2JqZWN0R3JvdXAudHlwZUltYWdlRGF0YTtcblxuICAgICAgICBpZighc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIHNwcml0ZXNoZWV0VHlwZS1kYXRhXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICAgIGxldCBzcHJpdGVzaGVldERhdGEgPSB0eXBlRGF0YS5ncmFwaGljRGF0YVtzcHJpdGVzaGVldFR5cGVdO1xuXG4gICAgICAgICAgc3ByaXRlc2hlZXQgPSBhbGxTcHJpdGVzaGVldHMuYWRkU3ByaXRlc2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdEdyb3VwLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0ID0+IHtcbiAgICAgICAgICBsZXQgb2JqVHlwZURhdGEgPSB0eXBlRGF0YS5vYmplY3REYXRhW3Nwcml0ZXNoZWV0VHlwZV1bb2JqZWN0Lm9ialR5cGVdO1xuXG4gICAgICAgICAgaWYoIW9ialR5cGVEYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGN1cnJlbnRGcmFtZU51bWJlciA9IG9ialR5cGVEYXRhLmltYWdlO1xuICAgICAgICAgIGxldCBvYmpEYXRhID0ge1xuICAgICAgICAgICAgdHlwZURhdGE6IG9ialR5cGVEYXRhLFxuICAgICAgICAgICAgYWN0aXZlRGF0YTogb2JqZWN0LmRhdGFcbiAgICAgICAgICB9O1xuICAgICAgICAgIGxldCBuZXdPYmplY3QgPSBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZCwgb2JqRGF0YSwgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgeyByYWRpdXM6IDQ3IH0gKTtcbiAgICAgICAgICB0aGlzTGF5ZXIuYWRkQ2hpbGQoIG5ld09iamVjdCApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gbWFwO1xuXG4vKlxuICBDcmVhdGVUZXJyYWluU3RhZ2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2Jhc2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3RlcnJhaW5cbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2RpdGhlclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcHJldHRpZmllclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcmVzb3VyY2VcbiAgQ3JlYXRlVW5pdFN0YWdlXG4gICAgX0NyZWF0ZVVuaXRMYXllcl9Vbml0XG4gICAgX0NyZWF0ZVVuaXRMYXllcl9DaXR5XG4gIENyZWF0ZUZPV1N0YWdlXG4gIENyZWF0ZURhdGFTdGFnZVxuICBDcmVhdGVVSVN0YWdlXG4gICAgX0NyZWF0ZVVJTGF5ZXJfYXJyb3dcbiAgICBfQ3JlYXRlVUlMYXllcl9zZWxlY3Rpb25cbiovXG5cbiAgZnVuY3Rpb24gX2NhbGN1bGF0ZU1hcFNpemUoKSB7XG5cbiAgfVxufVxuXG4vKiA9PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KCkge30iLCIvKipcbiAgVGhlIHNpbXBsZXN0IGRlZmF1bHQgVUkgaW1wbGVtZW50YXRpb24uIEhvbGRzOlxuICAtIFNlbGVjdGlvbiBoaWdobGlnaHQgb2Ygb2JqZWN0XG4gIC0gU2VsZWN0aW9uIGxpc3Qgb2YgdW5pdHMgYXQgdGhlIGhleGFnb25cbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY2xhc3MgVUlfZGVmYXVsdCB7XG4gIGNvbnN0cnVjdG9yKG1vZGFsLCBzdHlsZXMpIHtcbiAgICB0aGlzLm1vZGFsID0gbW9kYWwgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaWFsb2dcIilbMF07XG4gICAgdGhpcy5zdHlsZXMgPSBzdHlsZXMgfHwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGMEYwRjBcIlxuICAgIH07XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cyA9IF9ET01FbGVtZW50c1RvQXJyYXkodGhpcy5tb2RhbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfY2xvc2VcIikpO1xuICB9XG4gIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcbiAgICBpZihvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIm9iamVjdHM6PGJyPlwiO1xuICAgICAgb2JqZWN0cy5tYXAoIG9iamVjdCA9PiB7XG4gICAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdC5kYXRhLnR5cGVEYXRhLm5hbWUgKyBcIjxicj5cIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgPSBcIlNFTEVDVEVEOjxicj5cIjtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MICs9IG9iamVjdHNbMF0uZGF0YS50eXBlRGF0YS5uYW1lO1xuICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KCBlbGVtZW50LCBzZWxmLm1vZGFsLmNsb3NlLmJpbmQoc2VsZi5tb2RhbCkgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudChlbGVtZW50LCBjbG9zZUNCKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNsb3NlQ0IoKTtcbiAgICAgIH0pO1xufVxuZnVuY3Rpb24gX0RPTUVsZW1lbnRzVG9BcnJheShlbGVtZW50cykge1xuICBpZighZWxlbWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3RvciArIFwiIGZ1bmN0aW9uIG5lZWRzIGVsZW1lbnRzXCIpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgdmFyIGVsZW1lbnRBcnJheSA9IFtdO1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnRBcnJheS5wdXNoKGVsZW1lbnRzW2ldKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50QXJyYXk7XG59IiwiLyoqXG5NYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG5cbkByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG5AcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiBUaGlzIGlzIG1vcmUgZm9yIG5vZGUuanNcbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIFN5c3RlbSA9IHJlcXVpcmUoJ2VzNi1tb2R1bGUtbG9hZGVyJykuU3lzdGVtO1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdlczYtbW9kdWxlLWxvYWRlcic7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gICAgX2dldFN0YWdlSW5kZXhcbn07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICAgIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gICAgX2lzX2Nvb3JkaW5hdGVzOiB2YWxpZGF0b3JNb2QuaXNDb29yZGluYXRlcyxcbiAgICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gICAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgICBfaXNfVXNlT2ZTdWJDb250YWluZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkNvbnRhaW5lcnMsXG4gICAgX2lzX2NhbnZhczogdmFsaWRhdG9yTW9kLmlzQ2FudmFzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIHtcbiAqICBtYXBTaXplOiB7XG4gKiAgICB4OiBOdW1iZXIsXG4gKiAgICB5OiBOdW1iZXJcbiAqIH1cbiAqXG4gKiBQbHVnaW5zIGFyZSBwcm92aWRlZCBpbiBhbiBhcnJheSBvZiBwbHVnaW4gZnVuY3Rpb25zXG4qL1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc3RhZ2VzID0gW107XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gICAgdGhpcy5tYXBTaXplID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBTaXplKSB8fCB7IHg6MCwgeTowIH07XG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSBmYWxzZTtcbiAgfVxuICAvKiBvcHRpb25zLm1hcFNpemUgPSBuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKi9cbiAgaW5pdCh0aWNrQ0IsIHBsdWdpbnMsIGNvb3JkKSB7XG4gICAgaWYocGx1Z2lucykge1xuICAgICAgdGhpcy5hY3RpdmF0ZVBsdWdpbnMocGx1Z2lucyk7XG4gICAgfVxuICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goc3RhZ2UgPT4ge1xuICAgICAgc3RhZ2UueCA9IGNvb3JkLng7XG4gICAgICBzdGFnZS55ID0gY29vcmQueTtcbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd01hcCgpO1xuICAgIHRoaXMudGlja09uKHRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkcmF3TWFwKCkge1xuICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgIGlmKHN0YWdlLmRyYXdUaGlzQ2hpbGQpIHtcbiAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgIHN0YWdlLmRyYXdUaGlzQ2hpbGQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldFNpemUoICkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICBzZXRTaXplKHgxLCB5MSkge1xuICAgIHRoaXMubWFwU2l6ZSA9IHsgeDp4MSwgeTp5MSB9O1xuXG4gICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBmb3IobGV0IHN0YWdlIG9mIHRoaXMuc3RhZ2VzKSB7XG4gICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgIGlmKHN0YWdlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBzdGFnZTtcbiAgICAgIH1cblxuICAgICAgaWYoY2hpbGQgPSBzdGFnZS5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgYWRkU3RhZ2Uoc3RhZ2UpIHtcbiAgICBsZXQgc3RhZ2VzID0gW107XG5cbiAgICBpZighIChzdGFnZSBpbnN0YW5jZW9mIEFycmF5KSApIHtcbiAgICAgIHN0YWdlcy5wdXNoKHN0YWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWdlcy5wdXNoKC4uLnN0YWdlcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXBsYWNlU3RhZ2UobmV3Q2FudmFzLCBvbGRDYW52YXMpIHtcbiAgICBsZXQgb2xkSW5kZXggPSBwcml2YXRlRnVuY3Rpb25zLl9nZXRTdGFnZUluZGV4KHRoaXMuc3RhZ2VzLCBvbGRDYW52YXMpO1xuICAgIHRoaXMuc3RhZ2VzW29sZEluZGV4XSA9IG5ld0NhbnZhcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZExheWVyKGxheWVyLCBzdGFnZSkge1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVMYXllcihsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVwbGFjZUxheWVyKG5ld0xheWVyLCBvbGRMYXllcikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdG9nZ2xlTGF5ZXIobGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgIGxldCB0aGVMYXllcjtcblxuICAgIGZvcihsZXQgc3RhZ2Ugb2YgdGhpcy5zdGFnZXMpIHtcbiAgICAgIGlmKHRoZUxheWVyID0gc3RhZ2UuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGhlTGF5ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjYWNoZU1hcCgpIHtcbiAgICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgICBpZihzdGFnZS5jYWNoZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICBjYWNoZUxheWVycygpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldE9iamVjdHNVbmRlck1hcFBvaW50KGNsaWNrQ29vcmRzKSB7XG4gICAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgIG9iamVjdHNbc3RhZ2UubmFtZV0gPSBvYmplY3RzW3N0YWdlLm5hbWVdIHx8IFtdO1xuICAgICAgICBvYmplY3RzW3N0YWdlLm5hbWVdLnB1c2goc3RhZ2UuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY2xpY2tDb29yZHMpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxuICBhY3RpdmF0ZUZ1bGxTaXplKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIF9zZXRTdGFnZXNUb0Z1bGxTaXplLmJpbmQodGhpcykpO1xuICB9XG4gIGRlYWN0aXZhdGVGdWxsU2l6ZSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9zZXRTdGFnZXNUb0Z1bGxTaXplLmJpbmQodGhpcykpO1xuICB9XG4gIC8qIEFjdGl2YXRlIHBsdWdpbnMgZm9yIHRoZSBtYXAuIE11c3QgYmUgaW4gYXJyYXkgZm9ybWF0OlxuICBbe1xuICAgIG5hbWU6IGZ1bmN0aW9uIG5hbWUsXG4gICAgYXJnczogW1xuICAgICAgRmlyc3QgYXJndW1lbnQsXG4gICAgICBzZWNvbmQgYXJndW1lbnQsXG4gICAgICAuLi5cbiAgICBdXG5cbiAgICBQYXJhbWV0ZXIgcGx1Z2luVG9Vc2UuZnVuYy5uYW1lIGlzIHBhcnQgb2YgRVM2IHN0YW5kYXJkIHRvIGdldCBmdW5jdGlvbiBuYW1lLlxuICB9XSAqL1xuXG4gIGFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zQXJyYXkpIHtcbiAgICBwbHVnaW5zQXJyYXkuZm9yRWFjaChwbHVnaW5Ub1VzZSA9PiB7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gPSBwbHVnaW5Ub1VzZTtcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXS5pbml0KHRoaXMpO1xuICAgIH0pO1xuICB9XG4gIHRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZih0aGlzLmFjdGl2ZVRpY2tDQikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgYWxyZWFkeSBleGlzdHMgb25lIHRpY2sgY2FsbGJhY2suIE5lZWQgdG8gcmVtb3ZlIGl0IGZpcnN0LCBiZWZvcmUgc2V0dGluZyB1cCBhIG5ldyBvbmVcIik7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB0aWNrQ0IgfHwgX2hhbmRsZVRpY2suYmluZCh0aGlzKTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoc3RhZ2VzLCBzdGFnZVRvRmluZCkge1xuICB2YXIgZm91bmRJbmRleCA9IHN0YWdlcy5pbmRleE9mKHN0YWdlVG9GaW5kKTtcblxuICByZXR1cm4gKCBmb3VuZEluZGV4ID09PSAtMSApID8gZmFsc2UgOiBmb3VuZEluZGV4O1xufVxuLyoqID09IENvbnRleHQgc2Vuc2l0aXZlLCB5b3UgbmVlZCB0byBiaW5kLCBjYWxsIG9yIGFwcGx5IHRoZXNlID09ICovXG5mdW5jdGlvbiBfaGFuZGxlVGljaygpIHtcbiAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgIGlmKHN0YWdlLnVwZGF0ZVN0YWdlID09PSB0cnVlKSB7XG4gICAgICBzdGFnZS51cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gX3NldFN0YWdlc1RvRnVsbFNpemUoKSB7XG4gIGZvciggbGV0IGNhbnZhcyBvZiB0aGlzLnN0YWdlcyApIHtcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xuXG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBhZGRQcm90b3R5cGUgYXMgbWFwRnVuY19hZGRQcm90b3R5cGUgfSBmcm9tIFwiLi9tYXBGdW5jdGlvbnNcIjtcblxuLyogPT09PT0gQ29uc3RhbnRzID09PT09ICovXG5jb25zdCBUWVBFUyA9IHtcbiAganVzdFN1YkNvbnRhaW5lcnM6IDEsXG4gIG5vU3ViQ29udGFpbmVyczogMixcbiAgaW1hZ2VzSW5TdWJDb250YWluZXJzOiAzXG59O1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICBfZ2V0U3RhZ2VJbmRleCxcbiAgX2NyZWF0ZVN1YkNvbnRhaW5lcnMsXG4gIF9jYWNoZUxheWVyLFxuICBfc2V0Q29ycmVjdFN1YkNvbnRhaW5lcixcbiAgX2dldENvcnJlY3RDb250YWluZXJcbn07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICBfaXNfYm9vbGVhbjogdmFsaWRhdG9yTW9kLmlzQm9vbGVhbixcbiAgX2lzX2Nvb3JkaW5hdGVzOiB2YWxpZGF0b3JNb2QuaXNDb29yZGluYXRlcyxcbiAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICBfaXNfVXNlT2ZTdWJMYXllcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViTGF5ZXJzLFxuICBfaXNfVXNlT2ZTdWJDb250YWluZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkNvbnRhaW5lcnNcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfbGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBjb29yZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSBjb29yZCA/ICggY29vcmQueCB8fCAwICkgOiAwO1xuICAgIHRoaXMueSA9IGNvb3JkID8gKCBjb29yZC55IHx8IDAgKSA6IDA7XG4gICAgdGhpcy5zdXBlclByb3RvdHlwZSA9IHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiB0eXBlO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy51c2VTdWJjb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJhY3RpdmUgPSBmYWxzZTtcblxuICAgIC8qIENvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGFkZFByb3RvdHlwZShuYW1lLCBmdW5jdGlvblRvQWRkKSB7XG4gICAgc3VwZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb25Ub0FkZDtcbiAgfVxuICAvKiBvdmVybG9hZGVkIGluaGVyaXRlZCBtZXRob2QgKi9cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgQ29udGFpbmVyIGRpcmVjdGx5LiBXZXRoZXIgaXQgaXMgQ29udGFpbmVyIG9yIEJpdG1hcCBldGMuICovXG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBXZSBhZGQgdGhlIG9iamVjdCB0byB0aGUgY29ycmVjdCBzdWJDb250YWluZXIuIEZvciBiZXR0ZXIgbG9naWMgYW5kIHBlcmZvcm1hbmNlICovXG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxuICBzdGF0aWMgZ2V0VHlwZShuYW1lKSB7XG4gICAgcmV0dXJuIFRZUEVTW25hbWVdO1xuICB9XG59XG5NYXBfbGF5ZXIucHJvdG90eXBlLmFkZFByb3RvdHlwZSA9IG1hcEZ1bmNfYWRkUHJvdG90eXBlO1xuXG4vKiBUaGUgbm9kZS1lYXNlbCwgbm9yIG1pbmlmaWVkIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBTcHJpdGVTdGFnZSAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovXG4vKlxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5cbmV4cG9ydCBjbGFzcyBNYXBfc3ByaXRlc2hlZXRMYXllciBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIHNwcml0ZXNoZWV0KSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiB0eXBlO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy51c2VTdWJjb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gcHJpdmF0ZUZ1bmN0aW9ucy5fZ2V0Q29ycmVjdENvbnRhaW5lci5jYWxsKHRoaXMsIG9iamVjdC54LCBvYmplY3QueSk7XG4gICAgICBjb3JyZWN0U3ViQ29udGFpbmVyLmFkZENoaWxkKG9iamVjdCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGlmKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZihjaGlsZC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICEhdGhpcy51c2VTdWJjb250YWluZXJzO1xuICB9XG4gIGlzU2V0VmlzaWJsZSgpIHsgfVxuICBzZXRWaXNpYmxlKCkgeyB9XG59XG4qL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KG1hcCwgY2FudmFzKSB7IH1cbmZ1bmN0aW9uIF9jcmVhdGVTdWJDb250YWluZXJzKCkgeyB9XG5mdW5jdGlvbiBfY2FjaGVMYXllcigpIHsgfVxuZnVuY3Rpb24gX3NldENvcnJlY3RTdWJDb250YWluZXIoKSB7IH1cbmZ1bmN0aW9uIF9nZXRDb3JyZWN0Q29udGFpbmVyKHgsIHkpIHtcbiAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSB0aGlzLmdldE9iamVjdFVuZGVyUG9pbnQoeCwgeSk7XG5cbiAgcmV0dXJuIGNvcnJlY3RTdWJDb250YWluZXI7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4vbWFwX3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB7IGFkZFByb3RvdHlwZSBhcyBtYXBGdW5jX2FkZFByb3RvdHlwZSB9IGZyb20gXCIuL21hcEZ1bmN0aW9uc1wiO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0geyB9O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX3N0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3RhZ2Uge1xuICAvKiBUYWtlcyB0aGUgY2FudmFzIGVsZW1lbnQgYXMgYXJndW1lbnQgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuc3VwZXJQcm90b3R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgICAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgICB9XG4gICAgZ2V0Q2FjaGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICAgIH1cbiAgICBzZXRDYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgICAgIHZhbGlkYXRvcnMuX2lzX2Jvb2xlYW4oc3RhdHVzKTtcbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICAgIGZvcihsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgICAgaWYobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGlsZCA9IGxheWVyLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufVxuTWFwX3N0YWdlLnByb3RvdHlwZS5hZGRQcm90b3R5cGUgPSBtYXBGdW5jX2FkZFByb3RvdHlwZTtcblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuXG5cbi8qXG5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5pbXBvcnQgU3ByaXRlU3RhZ2UgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVTdGFnZSc7XG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZVN0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlU3RhZ2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG5cbiAgICAgICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gICAgfVxuICAgIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgICAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICAgIGlmKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoaXMgY2xhc3MgbmVlZHMgdG8gYmUgZ29uZSB0aHJvdWdoIGNhcmVmdWxseSwgaXQgaGFzIGJlZW4gY29waWVkIGZyb20gYW4gb2xkZXIgdmVyc2lvbiBzdHJhaWdodC4gVGhlIHZlcnNpb24gd2FzIEVTNVxuQHBhcmFtIHtjcmVhdGVqcy5Qb2ludH0gY29vcmRzIC0gdGhlIGNvb3JkaW5hdGUgd2hlcmUgdGhlIG9iamVjdCBpcyBsb2NhdGVkIGF0XG5AcGFyYW0ge30gZGF0YSAtIG9iamVjdHMgZGF0YSwgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGdhbWUuIEl0IHdpbGwgbm90IGFjdHVhbGx5IGJlIG1haW5seSB1c2VkIGluIGdyYXBoaWNhbFxuYnV0IHJhdGhlciB0aGluZ3MgbGlrZSB1bml0LWRhdGEgYW5kIGNpdHktZGF0YSBwcmVzZW50YXRpb25zIGV0Yy5cbkBwYXJhbSB7Y3JlYXRlanMuU3ByaXRlU2hlZXR9IHNwcml0ZVNoZWV0XG5AcGFyYW0ge0ludF0gY3VyckZyYW1lTnVtYmVyIC0gdGhlIGN1cnJlbnQgZnJhbWVzIG51bWJlci4gVGhpcyBpcyBiYXNpY2FsbHkgdGhlIGluaXRpYWwgaW1hZ2UsIHdlIGNhbiBjaGFuZ2UgaXQgbGF0ZXJcbmZvciBhbmltYXRpb24gb3Igc3VjaFxuXG5BbGwgb2YgdGhlIG9iamVjdHMgbmVlZCB0byBoYXZlIHNhbWUgYXJndW1lbnRBUEkgZm9yIGNyZWF0aW5nIG9iamVjdHM6IGNvb3JkcywgZGF0YSwgaW1hZ2VEYXRhXG4qL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcImdlbmVyYWwgT2JqZWN0c19zcHJpdGVfXCIgKyB0aGlzLmlkO1xuXG4gICAgLyogU2V0IGRhdGEgZm9yIHRoZSBvYmplY3QgbmV4dCAqL1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwge307XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBjdXJyZW50RnJhbWVOdW1iZXI7XG5cbiAgICAvKiBFeGVjdXRlIGluaXRpYWwgZHJhdyBmdW5jdGlvbiAqL1xuICAgIHRoaXMuaW5uZXJEcmF3KGNvb3Jkcy54LCBjb29yZHMueSk7XG5cbiAgICAvKiBvcHRpbWl6YXRpb25zICovXG4gICAgdGhpcy5zaGFkb3cgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBTaG91bGQgYmUgZW5hYmxlZCwgaWYgdGhlIGxheWVyIGlzIGJlaW5nIGludGVyYWN0ZWQgd2l0aC4gTGlrZSB1bml0IGxheWVyLiBUaGlzIHdheSB3ZSBjYW4gdXNlIGN1cnNvciBwb2ludGVyIGV0Yy5cbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIEZPUiBERUJVR0dJTkcgQU5EIFNFRUlORyBUSEFUIExJU1RFTkVSUyBBUkUgQVRUQUNIRUQ6XG4gICAgLy90aGlzLndpbGxUcmlnZ2VyXG4gIH1cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qIERyYXdpbmcgdGhlIG9iamVjdCB3aXRoIGNyZWF0ZWpzLW1ldGhvZHMgKi9cbiAgaW5uZXJEcmF3KHgsIHkpIHtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCB0aGlzLmN1cnJGcmFtZU51bWJlciApO1xuICAgIGNvbnNvbGUubG9nKFwiSEFBQVwiKVxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICAvKiBUaGUgbW91c2UgY2hlY2sgaGFzIGJlZW4gZW5hYmxlZCBvbiBoaWdoZXIgdGllciwgc28gbm8gbmVlZCBmb3IgdGhpc1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7ICovXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkcmF3TmV3RnJhbWUoeCwgeSwgbmV3RnJhbWVOdW1iZXIpIHtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IG5ld0ZyYW1lTnVtYmVyO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJEcmF3KHgsIHkpO1xuICB9XG4gIC8qIER1bm5vIGlmIHdlIG5lZWQgdGhpcyBhbmQgc28gb24uIFRoaXMgd2FzIGluIHRoZSBvbGQgdmVyc2lvbiAqL1xuICBnbG9iYWxDb29yZHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE51bWJlciggdGhpcy54ICsgdGhpcy5wYXJlbnQueCApLFxuICAgICAgeTogTnVtYmVyKCB0aGlzLnkgKyB0aGlzLnBhcmVudC55IClcbiAgICB9O1xuICB9XG4gIGdldEJvdW5kc0Zyb21GcmFtZXMoKSB7XG4gICAgIHJldHVybiB0aGlzLnNwcml0ZVNoZWV0LmdldEZyYW1lQm91bmRzKCB0aGlzLmN1cnJlbnRGcmFtZSApO1xuICB9XG59IiwiLyoqXG4gIE1haW4gY2xhc3MgZm9yIHNob3dpbmcgVUkgb24gdGhlIG1hcC4gTGlrZSB1bml0IHNlbGVjdGlvbnMgYW5kIHN1Y2guIEhhcyBub3RoaW5nIHRvIGRvIHdpdGggc2hvd2luZyBvZmYtbWFwIGRhdGEuXG4gIEdvb2QgZXhhbXBsZXMgZm9yIHdoYXQgdGhpcyBzaG93cyBhcmU6IHNlbGVjdGVkIHVuaXRzLWxpc3QsIHNlbGVjdGlvbiBoaWdobGlnaHQgKGxpa2UgYSBjaXJjbGUgb24gdGhlIHNlbGVjdGVkIHVuaXQpIGFuZFxuICBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3AgaW4gdGhlIG1hcC5cbiovXG5cbi8qID09PT09PSAzcmQgcGFydHkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NvcGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBVSSAoZ2l2ZW5VSVRoZW1lLCBnaXZlbk1hcCkge1xuICAvKiBUaGlzIGlzIGEgc2luZ2xldG9uIGNsYXNzLCBzbyBpZiBhbHJlYWR5IGluc3RhbnRpYXRlZCByZXR1cm4gc2NvcGUgKi9cbiAgaWYoc2NvcGUpIHtcbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICBpZighZ2l2ZW5VSVRoZW1lIHx8ICFnaXZlbk1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVJLW1vZHVsZSByZXF1aXJlcyBVSVRoZW1lIGFuZCBtYXBPYmpcIik7XG4gIH1cblxuICB2YXIgbWFwID0gZ2l2ZW5NYXA7XG4gIHZhciBVSVRoZW1lID0gZ2l2ZW5VSVRoZW1lO1xuICBzY29wZSA9IHt9O1xuXG4gIHNjb3BlLnNob3dTZWxlY3Rpb25zID0gZnVuY3Rpb24gc2hvd1NlbGVjdGlvbnMob2JqZWN0cykge1xuICAgIHJldHVybiBVSVRoZW1lLnNob3dTZWxlY3Rpb25zKG9iamVjdHMpO1xuICB9O1xuICBzY29wZS5oaWdobGlnaHRTZWxlY3RlZE9iamVjdCA9IGZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG9iamVjdCkge1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gYWRkUHJvdG90eXBlIChuYW1lLCBmdW5jdGlvblRvQWRkKSB7XG4gIHRoaXMuc3VwZXJQcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvblRvQWRkO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEhvbGQgZGlmZmVyZW50IHZhbGlkYXRvciBmdW5jdGlvbnMgdG8gYmUgdXNlZCBpbiBtb2R1bGVzICovXG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7XG4gIF9pc0ludFxufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGxldCB2YWxpZGF0b3JNb2QgPSAoZnVuY3Rpb24gdmFsaWRhdG9yTW9kKCkge1xuICByZXR1cm4ge1xuICAgIGlzSW5kZXgoaW50KSB7XG4gICAgICAgIHJldHVybiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KGludCk7XG4gICAgfSxcbiAgICBpc0Jvb2xlYW4oYm9vbCkge1xuICAgICAgICByZXR1cm4gYm9vbCA9PT0gQm9vbGVhbihib29sKTtcbiAgICB9LFxuICAgIGlzQ29vcmRpbmF0ZXMoeCwgeSkge1xuICAgICAgICBpZihwcml2YXRlRnVuY3Rpb25zLmlzSW50KHgpICYmIHByaXZhdGVGdW5jdGlvbnMuaXNJbnQoeSkgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGlzU3ViQ29udGFpbmVyQW1vdW50KCkge1xuXG4gICAgfSxcbiAgICBpc1VzZU9mU3ViTGF5ZXJzKCkge1xuXG4gICAgfSxcbiAgICBpc1VzZU9mU3ViQ29udGFpbmVycygpIHtcblxuICAgIH1cbiAgfTtcbn0pKCk7XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuZnVuY3Rpb24gX2lzSW50KHdhbm5hYmVJbnQpIHtcbiAgLyogRVM2ICovXG4gIGlmKE51bWJlci5pc0ludGVnZXIpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih3YW5uYWJlSW50KTtcbiAgfVxuXG4gIC8qIEVTNSAqL1xuICByZXR1cm4gdHlwZW9mIHdhbm5hYmVJbnQgPT09ICdudW1iZXInICYmICh3YW5uYWJlSW50ICUgMSkgPT09IDA7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFzaCBmcm9tICdibHVlaW1wLW1kNSc7XG5cbmxldCBhbGxTcHJpdGVzaGVldHMgPSBbXTtcbmxldCBhbGxTcHJpdGVzaGVldElEcyA9IFtdO1xuXG4vKiBTaW5nbGV0b24gc28gd2UgZG9uJ3QgdXNlIGNsYXNzIGRlZmluaXRpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVzaGVldExpc3QgKCkge1xuICBsZXQgc2NvcGUgPSB7fTtcblxuICBzY29wZS5hZGRTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICBsZXQgc3ByaXRlU2hlZXQ7XG5cbiAgICBpZihzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMoIF9jcmVhdGVJRCggc3ByaXRlc2hlZXREYXRhICkgKSApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldChzcHJpdGVzaGVldERhdGEpO1xuXG4gICAgYWxsU3ByaXRlc2hlZXRzLnB1c2goIHNwcml0ZVNoZWV0ICk7XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXQ7XG4gIH07XG4gIHNjb3BlLnJlbW92ZVNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0KSB7XG5cbiAgfTtcbiAgc2NvcGUuZ2V0QWxsU3ByaXRlc2hlZXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHM7XG4gIH07XG4gIHNjb3BlLnNwcml0ZXNoZWV0QWxyZWFkeUV4aXN0cyA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldElEKSB7XG4gICAgcmV0dXJuICggYWxsU3ByaXRlc2hlZXRJRHMuaW5kZXhPZiggc3ByaXRlc2hlZXRJRCApID4gLTEgKTtcbiAgfTtcbiAgZnVuY3Rpb24gX2NyZWF0ZUlEIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICByZXR1cm4gKCBzcHJpdGVzaGVldERhdGEuaW1hZ2VzLnRvU3RyaW5nKCkgKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vLi4vY29yZS9PYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uL3V0aWxzL2NyZWF0ZUhleGFnb24nO1xuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcblxudmFyIHNoYXBlO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZV9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCBleHRyYSA9IHsgcmFkaXVzOiAwIH0pIHtcbiAgICB2YXIgc2hhcGU7XG5cbiAgICBjb25zdCBIRUlHSFQgPSBoZXhhZ29uTWF0aC5jYWxjSGVpZ2h0KGV4dHJhLnJhZGl1cyk7XG4gICAgY29uc3QgU0lERSA9IGhleGFnb25NYXRoLmNhbGNTaWRlKGV4dHJhLnJhZGl1cyk7XG5cbiAgICBzdXBlcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHZhciBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKGV4dHJhLnJhZGl1cyk7XG4gICAgdGhpcy5yZWdYID0gaGV4YWdvblNpemUueCAvIDI7XG4gICAgdGhpcy5yZWdZID0gaGV4YWdvblNpemUueSAvIDI7XG4gICAgdGhpcy5IRUlHSFQgPSBIRUlHSFQ7XG4gICAgdGhpcy5TSURFID0gU0lERTtcblxuICAgIGlmKCFleHRyYS5yYWRpdXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgcmFkaXVzIVwiKTtcbiAgICB9XG5cbiAgICAvKiBEcmF3IGhleGFnb24gdG8gdGVzdCB0aGUgaGl0cyB3aXRoIGhpdEFyZWEgKi9cbiAgICAvL3NoYXBlID0gY3JlYXRlSGV4YWdvbih7IHg6MCwgeTowIH0sIGV4dHJhLnJhZGl1cywgNiwgZXh0cmEucG9pbnRTaXplLCAzMCwgZXh0cmEuY29sb3IpO1xuXG4gICAgdGhpcy5oaXRBcmVhID0gc2V0QW5kR2V0U2hhcGUoZXh0cmEucmFkaXVzKTtcbiAgfVxuICBzdGF0aWMgZ2V0U2hhcGUoKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEFuZEdldFNoYXBlKHJhZGl1cykge1xuICBpZighc2hhcGUpIHtcbiAgICBsZXQgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgIC8qIHggYW5kIHkgYXJlIHJldmVyc2VkLCBzaW5jZSB0aGlzIGlzIGhvcml6b250YWwgaGV4YWdvbiBhbmQgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgKi9cbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24oeyB4OmhleGFnb25TaXplLnkgKyBoZXhhZ29uU2l6ZS55IC8yLCB5OmhleGFnb25TaXplLnggKyBoZXhhZ29uU2l6ZS54IC8gMiB9LCByYWRpdXMpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbl9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0X2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwKSB7XG4gIHZhciBzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB2YXIgY29sb3IgPSBcIiM0NDQ0NDRcIjtcbiAgdmFyIHBvaW50U2l6ZSA9IDA7XG5cbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxuICAgIC5kcmF3UG9seVN0YXIgKCBjb29yZHMueCwgY29vcmRzLnksIHJhZGl1cywgNiwgcG9pbnRTaXplLCBhbmdsZSApO1xuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmKGNvb3JkaW5hdGVJbmRleGVzLnggPCAwICYmIGNvb3JkaW5hdGVJbmRleGVzLnggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY2xpY2sgb3V0c2lkZSBvZiB0aGUgaGV4YWdvbiBhcmVhXCIpO1xuICB9XG4gIGNlbnRlckNvb3JkcyA9IHtcbiAgICB4OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnggKiBoZXhhU2l6ZS54ICsgaGFsZkhleGFTaXplLngpLFxuICAgIHk6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueSAqIGhleGFTaXplLnkgKyBoYWxmSGV4YVNpemUueSlcbiAgfTtcblxuICByZXR1cm4gY2VudGVyQ29vcmRzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjYWxjSGVpZ2h0OiBjYWxjSGVpZ2h0LFxuICBjYWxjU2lkZTogY2FsY1NpZGUsXG4gIHNldENlbGxCeVBvaW50OiBzZXRDZWxsQnlQb2ludCxcbiAgZ2V0SGV4YVNpemU6IGdldEhleGFTaXplLFxuICB0b0hleGFDZW50ZXJDb29yZDogdG9IZXhhQ2VudGVyQ29vcmRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vY29yZS9PYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlIHtcbiAgY29uc3RydWN0KGNvb3JkcywgZGF0YSwgc3ByaXRlU2hlZXQsIGN1cnJGcmFtZU51bWJlcikge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KGNvb3JkcywgZGF0YSwgc3ByaXRlU2hlZXQsIGN1cnJGcmFtZU51bWJlcik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0XCI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9iamVjdF9zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzXCI7XG4gIH1cbn0iLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiA1MDAsIHk6IDIwMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX21vdmVcIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhZ2VzOiBbe1xuICAgIHR5cGU6IFwiTWFwX3N0YWdlXCIsXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgZWxlbWVudDogXCIjbWFwQ2FudmFzXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgIGNvb3JkOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgc3BlY2lhbHM6IFt7XG4gICAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJPYmplY3RfdGVycmFpbl9oZXhhXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIHR5cGVJbWFnZURhdGE6IFwidGVycmFpbkJhc2VcIixcbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjEsXG4gICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiNDFcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzdcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjE0MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9LHtcbiAgICAgIFwidHlwZVwiOiBcIk1hcF9sYXllclwiLFxuICAgICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgICBcIm5hbWVcIjogXCJ1bml0TGF5ZXJcIixcbiAgICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgICB9LFxuICAgICAgXCJvYmplY3RHcm91cHNcIjogW3tcbiAgICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRfaGV4YVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICAgIFwib2JqZWN0c1wiOiBbe1xuICAgICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgICAgXCJjb29yZFwiOiB7XG4gICAgICAgICAgICBcInhcIjogXCI0MVwiLCBcInlcIjogXCI3MFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgXCJzb21lQ3VzdG9tRGF0YVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9XVxuICB9XVxufTsiLCJleHBvcnQgbGV0IHR5cGVEYXRhID0ge1xuICBcImdyYXBoaWNEYXRhXCI6IHtcbiAgICBcImdlbmVyYWxcIjp7XG4gICAgICBcInRlcnJhaW5cIjp7XG4gICAgICAgIFwidGlsZVdpZHRoXCI6ODIsXG4gICAgICAgIFwidGlsZUhlaWdodFwiOjk0XG4gICAgICB9XG4gICAgfSxcbiAgICBcInRlcnJhaW5CYXNlXCI6e1xuICAgICAgXCJpbWFnZXNcIjpcbiAgICAgIFtcIi9hc3NldHMvaW1nL21hcC90ZXN0SGV4YWdvbnMvdGVzdEhleGFnb25TcHJpdGVzaGVldC5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzAsMCw4Miw5NF0sWzgyLDAsODIsOTRdLFsxNjQsMCw4Miw5NF0sWzI0NiwwLDgyLDk0XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6WzgyLDk0XVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw0OF0sWzEsNTAsOTYsNDhdLFsxLDk5LDk2LDQ4XSxbMSwxNDgsOTYsNDhdLFsxLDE5Nyw5Niw0OF0sWzEsMjQ2LDk2LDQ4XSxbMSwyOTUsOTYsNDhdLFsxLDM0NCw5Niw0OF0sWzEsMzkzLDk2LDQ4XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICAgIH0sXG4gICAgXCJkaXRoZXJcIjp7XCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvZGl0aGVyMi5wbmdcIl0sXCJmcmFtZXNcIjpbWzAsMCw5Niw0OF1dLFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XX0sXG4gICAgXCJwcmV0dGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tb3VudGFpbnMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9oaWxscy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4yLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDY2LDAsMCwxOF0sWzEsMSw5Niw0OCwxLC00LDRdLFsxLDE0OCw5Niw0OCwyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJyZXNvdXJjZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL3Jlc291cmNlcy90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzE5NSwxLDk2LDQ4XSxbMzg5LDEsOTYsNDhdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInBsYWNlXCI6e30sXG4gICAgXCJjaXR5XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tZWRpZXZhbGNpdGllcy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw3Ml0sWzk4LDEsOTYsNzJdLFsxOTUsMSw5Niw3Ml0sWzI5MiwxLDk2LDcyXSxbMzg5LDEsOTYsNzJdLFs0ODUsMSw5Niw3Ml0sWzU4MiwxLDk2LDcyXSxbNjc5LDEsOTYsNzJdLFs3NzYsMSw5Niw3Ml0sWzg3MywxLDk2LDcyXSxbMSw3NCw5Niw3Ml0sWzk4LDc0LDk2LDcyXSxbMTk1LDc0LDk2LDcyXSxbMjkyLDc0LDk2LDcyXSxbMzg5LDc0LDk2LDcyXSxbNDg1LDc0LDk2LDcyXSxbNTgyLDc0LDk2LDcyXSxbNjc5LDc0LDk2LDcyXSxbNzc2LDc0LDk2LDcyXSxbODczLDc0LDk2LDcyXVxuICAgICAgXVxuICAgIH0sXCJidWlsZGluZ1wiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcIm1vZGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwidW5pdFwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL3VuaXRzL3Rlc3RIZXhhZ29uVW5pdHMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjp7XCJ3aWR0aFwiOjgyLFwiaGVpZ2h0XCI6OTR9XG4gICAgfVxuICB9LFxuICBcIm9iamVjdERhdGFcIjoge1xuICAgIFwidW5pdFwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwidGFua1wiLFxuICAgICAgICBcImRlc2NcIjpcIlZyb29vbS4uLlwiLFxuICAgICAgICBcImltYWdlXCI6XCIwXCIsXG4gICAgICAgIFwiYXR0XCI6XCJHb29kXCIsXG4gICAgICAgIFwiZGVmXCI6XCJQb29yXCIsXG4gICAgICAgIFwic2llZ2VcIjpcIkRlY2VudFwiLFxuICAgICAgICBcImluaXRpYXRlXCI6XCI5MFwiLFxuICAgICAgICBcIm1vdmVcIjpcIjEwMFwiLFxuICAgICAgICBcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFxuICAgICAgICBcInZpc2lvblwiOlwiMTUwXCIsXG4gICAgICAgIFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgICAgfSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2FycmllclwiLFwiZGVzY1wiOlwiYW5ncnkgYmVlaGl2ZVwiLFwiaW1hZ2VcIjpcIjZcIixcImF0dFwiOlwiMVwiLFwiZGVmXCI6XCIyXCIsXCJzaWVnZVwiOlwiMlwiLFwiaW5pdGlhdGVcIjpcIjExMFwiLFwibW92ZVwiOlwiMTAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMjUwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcInVuaXRcIjp7XG4gICAgICAgICAgICBcIl9lbmVteV9cIjpbe1xuICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICBcIm1vcmFsZVwiOlwic3VmZmVycyBtb3JhbGUgZHJvcFwiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImNhdmFscnlcIixcImRlc2NcIjpcIkdpdmUgbWUgYW4gYXBwbGUhXCIsXCJpbWFnZVwiOlwiMjZcIixcImF0dFwiOlwiM1wiLFwiZGVmXCI6XCIxXCIsXCJzaWVnZVwiOlwiMFwiLFwiaW5pdGlhdGVcIjpcIjUwXCIsXCJtb3ZlXCI6XCIzMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIxMDBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5CYXNlXCI6W3tcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDBcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAxXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIyXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMlwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiM1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDNcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjRcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjVcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSA0XCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI1XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNVwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluXCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJkZXNlcnRcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJ2ZXJ5IGRyeSBsYW5kXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcInBsYWluXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQnVmZmFsbyByb2FtaW5nIGFyZWFcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEyJSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcImltYWdlXCI6XCIyXCIsXCJkZXNjXCI6XCJSb2JpbiBob29kIGxpa2VzIGl0IGhlcmVcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJVbml0XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRlZmVuZFwiOlwiVW5pdCBkZWZlbmQgKzJcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFwiZGVzY1wiOlwiU2liZXJpYSB0ZWFjaGVzIHlvdVwiLFwiaW1hZ2VcIjpcIjZcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcImFyY3RpY1wiLFwiZGVzY1wiOlwiWW91ciBiYWxsIHdpbGwgZnJlZXplIG9mXCIsXCJpbWFnZVwiOlwiN1wiXG4gICAgICAgIH0se1xuICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcImRlc2NcIjpcIkNyYW5iZXJyaWVzIGFuZCBjbG91ZGJlcnJpZXNcIixcImltYWdlXCI6XCI4XCJcbiAgICAgICAgfV0sXG4gICAgXCJkaXRoZXJcIjpbXG4gICAgICB7XCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9XSxcbiAgICBcInByZXR0aWZpZXJcIjpbe1wiaW1hZ2VcIjpcIjBcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIyNSVcIn0se1wiaW1hZ2VcIjpcIjFcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCI0MCVcIn0se1wiaW1hZ2VcIjpcIjJcIixcInpJbmRleFwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCI2MCVcIn1dLFwicmVzb3VyY2VcIjpbe1wibmFtZVwiOlwiT2FzaXNcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJPYXNpcyBpbiB0aGUgbWlkZGxlIG9mIGRlc2VydCwgb3Igbm90IGF0bS5cIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcImZvb2QgcHJvZHVjdGlvbiA1IC8gd2Vla1wifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJPaWxcIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCbGFjayBnb2xkXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJUaGVyZSBpcyBhIGxvdCBvZiBvaWwgaGVyZVwifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCI0XCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJjaXR5XCI6W3tcIm5hbWVcIjpcIk1lZGlldmFsXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjBcIixcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiTWVkaWV2YWwyXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjFcIixcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwicGxhY2VcIjpbXSxcImJ1aWxkaW5nXCI6W3tcIm5hbWVcIjpcIkJhcnJhY2tzXCIsXCJpbWFnZVwiOlwiMFwiLFwidG9vbHRpcFwiOlwiRW5hYmxlcyB0cm9vcCByZWNydWl0bWVudFwifSx7XCJuYW1lXCI6XCJGYWN0b3J5XCIsXCJpbWFnZVwiOlwiMVwiLFwidG9vbHRpcFwiOlwiUHJvZHVjZXMgd2VhcG9ucnlcIn1dLFwiZ292ZXJubWVudFwiOlt7XCJuYW1lXCI6XCJEZW1vY3JhenlcIixcImRlc2NyaXB0aW9uXCI6XCJ3ZWxsIGl0J3MgYSBkZW1vY3JhenkgOilcIixcInRvb2x0aXBcIjpcIkdpdmVzICsyMCUgaGFwcGluZXNzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlswLDFdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJoYXBwaW5lc3NcIjpcIjIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDb21tdW5pc21cIixcImRlc2NyaXB0aW9uXCI6XCJZb3Uga25vdyB0aGUgb25lIHVzZWQgaW4gdGhlIGdyZWF0IFVTU1IgYW5kIGluc2lkZSB0aGUgZ3JlYXQgZmlyZXdhbGwgb2YgQ2hpbmFcIixcInRvb2x0aXBcIjpcIkdpdmVzIHByb2R1Y3Rpb24gYm9udXNlc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMiwzXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e319XX19LFwiQ2l0eVwiOntcImJ1aWxkaW5nXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCIyMCVcIn19XX19fX1dLFwicG9saXRpY3NcIjp7XCJ0YXhSYXRlXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiY29ycnVwdGlvblwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImFsaWdubWVudFwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImhhcHBpbmVzc1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInJldm9sdFJpc2tcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJ1bml0eVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcIm5hdFZhbHVlXCI6W3tcIm5hbWVcIjpcIkludGVncml0eVwiLFwidG9vbHRpcFwiOlwiR292ZXJubWVudCBhbmQgcG9wdWxhdGlvbnMgc2hvd3MgaW50ZWdyaXR5IGFuZCB0cnVzdHdvcnRoaW5lc3NcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaW50ZXJuYWxSZWxhdGlvbnNcIjpcIisxMCVcIixcImRpcGxvbWFjeVwiOlwiKzEwJVwiLFwicmV2b2x0IHJpc2tcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiLTIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDYXBpdGFsaXNtXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRpcGxvbWFjeVwiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcIm1vcmFsZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkhhcmR3b3JraW5nXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzEwJVwiLFwiaGFwcGluZXNzXCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJMZWFkZXJzaGlwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzUlXCIsXCJoYXBwaW5lc3NcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJ0cmFkaW5nXCI6XCIrMTAlXCJ9fV19fX19XX19XG59OyJdfQ==
