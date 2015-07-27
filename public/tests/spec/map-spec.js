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

var _componentsMapMoveMap_move = require('../../components/map/move/map_move');

var _componentsMapHexagonsObject_selectObject_select_hexagon = require('../../components/map/hexagons/object_select/object_select_hexagon');

window.map = {};

window.testMap = function () {
  describe('preloader => ', function (done) {
    var runWhenComplete = false;

    it('=> exists', function () {
      expect(_componentsPreloadingPreloading.preload).toBeDefined();
    });

    it('=> preloader completes', function (done) {
      runWhenComplete = function () {
        var i = 0;
        while (i < 1000000) {
          i++;
          i + i + 2 + 'y';
        }
        expect(true).toBeTruthy();
        done();
      };

      var prel = new _componentsPreloadingPreloading.preload(false);
      prel.setErrorHandler(preloadErrorHandler);
      //.setProgressHandler( progressHandler )
      prel.loadManifest([{
        id: 'terrain_spritesheet',
        src: 'http://warmapengine.level7.fi/assets/img/map/collection.png'
      }]);
      prel.resolveOnComplete().then(runWhenComplete);
    });

    /* ====== private functions, or to be moved elsewhere ====== */
    function preloadErrorHandler(err) {
      console.log('PRELOADER ERROR', err);
    }

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
    it('=> exists', function (done) {
      map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(_testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);
      expect(map).toBeDefined();
      done();
    });
    it('=> are stage properties correct?', function () {
      expect(map.stages[0].name === 'terrainStage').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
      expect(map.getChildNamed('terrainStage').name === 'terrainStage').toBeTruthy();
      expect(typeof map.getChildNamed('terrainStage') === 'object').toBeTruthy();
    });
    it('=> are layer properties correct?', function () {
      expect(typeof map.getLayerNamed('unitLayer') === 'object').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
    });
    it('=> are terrain properties correct?', function () {
      expect(Number(map.getLayerNamed('terrainBaseLayer').children[1].y) === 141).toBeTruthy();
      expect(map.getLayerNamed('terrainBaseLayer').children.length > 1).toBeTruthy();
    });
    it('=> unit properties are correct?', function () {
      expect(Number(map.getLayerNamed('unitLayer').children[0].x) === 82).toBeTruthy();
    });
    it('=> unit properties are correct', function (done) {
      map.init(tickDoneFunc);

      function tickDoneFunc(tickDone) {
        done();
      }

      expect(true).toBeTruthy();
    });
    it('jeje', function (done) {
      var timeoutter = (function (map) {
        return function () {
          map.stages[0].drawThisChild = true;
          map.drawMap();
          done();
        };
      })(map);

      window.setTimeout(timeoutter, 400);

      expect(true).toBeTruthy();
    });

    it('=> re-initialize map with plugins', function (done) {
      map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(_testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);
      expect(map).toBeDefined();
      done();
    });

    it('=> unit properties ok', function (done) {
      try {
        var tickDoneFunc = function (tickDone) {
          done();
        };

        map.init(tickDoneFunc, [_componentsMapMoveMap_move.map_move, _componentsMapHexagonsObject_selectObject_select_hexagon.object_select_hexagon]);

        expect(true).toBeTruthy();
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });
}

/* ===== Private functions ===== */
// none

/* some functions to help tests */
;

},{"../../components/factories/horizontalHexaFactory":3,"../../components/map/hexagons/object_select/object_select_hexagon":18,"../../components/map/move/map_move":21,"../../components/preloading/preloading":24,"../../tests/data/gameData":25,"../../tests/data/mapData":26,"../../tests/data/typeData":27}],2:[function(require,module,exports){
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

},{"../map/UIs/default/default.js":5,"../map/core/Map":6,"../map/core/Map_layer":7,"../map/core/Map_stage":8,"../map/core/UI":10,"../map/core/map_validators":12,"../map/core/spritesheetList":13,"../map/hexagons/object/Object_terrain_hexa":16,"../map/hexagons/object/Object_unit_hexa":17,"../map/object/Object_terrain":22,"../map/object/Object_unit":23}],4:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./map_validators":12}],7:[function(require,module,exports){
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

},{"./mapFunctions":11,"./map_validators":12}],8:[function(require,module,exports){
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

},{"./mapFunctions":11,"./map_validators":12}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
exports.setupHexagonClick = setupHexagonClick;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loggerLogJs = require("../../../logger/log.js");

var _loggerLogJs2 = _interopRequireDefault(_loggerLogJs);

function setupHexagonClick(map, element, callback) {
  try {
    onMouseDown.apply(undefined, arguments);
    onMouseUp(element);
  } catch (e) {
    _loggerLogJs2["default"].debug(e, "onMouseDown or onMouseUp hexagonClick error:");
  }

  return true;
}

function onMouseDown(map, element, callback) {
  element.addEventListener("stagemousedown", function (e) {
    var globalCoords = element.localToGlobal(e.stageX, e.stageY);
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }
  });
}

function onMouseUp(element) {
  element.addEventListener("stagemousedown", function (e) {
    element.removeEventListener("stagemousedown", onMouseDown);
  });
}

},{"../../../logger/log.js":4}],15:[function(require,module,exports){
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

},{"../../core/Object":9,"../utils/createHexagon":19,"../utils/hexagonMath":20}],16:[function(require,module,exports){
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

var object_select_hexagon = (function object_select_hexagon() {
  var scope = {};
  scope.pluginName = 'object_select';

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (mapObj) {
    /* We take the top-most stage on the map and add the listener to it */
    var topMostStage = mapObj.stages.slice(-1)[0];

    _createPrototypes(mapObj);

    _startClickListener(mapObj, topMostStage);
  };

  return scope;

  function getObjectsForMap(clickCoords) {
    var objectArrays = [];

    this.stages.forEach(function (stage) {
      var objects = stage.getObjectsUnderPoint(clickCoords.x, clickCoords.y);
      objectArrays = objectArrays.concat(objects);
    });

    return objectArrays;
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
    map.stages[0].children[0].__proto__.getObjectsUnderPoint = getObjectsForLayer;
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener(map, canvas) {
    var singletonUI = (0, _coreUI.UI)();

    return (0, _eventListenersSelect.setupHexagonClick)(map, canvas, singletonUI.showSelections);
  }
})();
exports.object_select_hexagon = object_select_hexagon;

},{"../../core/UI":10,"../eventListeners/select":14}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var map_move = (function map_move() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = "map_move";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (mapObj) {
    /* We take the top-most stage on the map and add the drag event listener to it */
    var topMostStage = mapObj.stages.slice(-1)[0];

    _createPrototypes(mapObj);

    topMostStage.on("stagemousedown", _startDragListener(topMostStage, mapObj));
  };

  return scope;

  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener(topMostStage, map) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset({
          x: e.stageX,
          y: e.stageY
        });
        /* We take all the eventlisteners unbindings to this array, so we can unbind them when the mouse is up */
        var moveListeners = [];

        moveListeners.push({
          "action": "stagemousemove",
          "cb": topMostStage.on("stagemousemove", _dragListener.call(topMostStage, map))
        });
        moveListeners.push({
          "action": "stagemousemove",
          "cb": topMostStage.on("stagemousemove", function () {
            console.log("moved");
          })
        });

        moveListeners.push({
          "action": "stagemouseup",
          "cb": topMostStage.on("stagemouseup", function () {
            moveListeners.forEach(function (cbData) {
              topMostStage.off(cbData.action, cbData.cb);
            });
          })
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
  /**
   * Adds function for the map object and prototype-functions for it's stages and layers. Creates moveMap function
   * for the given map object and moveStage & moveLayer - prototype functions for the stages and layers in the map.
   */
  function _createPrototypes(mapObj) {
    if (mapObj.stages && mapObj.stages[0]) {
      mapObj.stages[0].addPrototype("moveStage", _moveStage(mapObj));
    }

    /* Not a prototype function, but regular */
    mapObj.moveMap = _moveMap;

    /**
     * prototype function for moving map / all stages in map, that are movable
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
    function _moveMap(coords) {
      this.stages.forEach(function (stage) {
        if (stage.movable) {
          stage.moveStage(coords);
        }
      });

      return this;
    }
    /**
     * prototype function for moving stage / stages all layers
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
    function _moveStage(map) {
      return function (coords) {
        var preciseCoords = {
          x: this.x + coords.x,
          y: this.y + coords.y
        };

        this.x = preciseCoords.x;
        this.y = preciseCoords.y;

        this.drawThisChild = true;
        map.drawMap();

        return this;
      };
    }
    /**
     * prototype function for moving layer, if it is movable
     * @param {object} coords Format { x: Number, y: Number }
     * @return this for chaining
     */
    /*
    function _moveLayer(coords) {
     if(this.movable) {
       this.x = coords.x;
       this.y = coords.y;
     }
      return this;
    }*/
  }

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
exports.map_move = map_move;

},{}],22:[function(require,module,exports){
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

},{"../core/Object":9}],23:[function(require,module,exports){
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

},{"../core/Object":9}],24:[function(require,module,exports){
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
  mapSize: { x: 500, y: 200 },
  pluginsToActivate: {
    map: ["map_move"]
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXAtc3BlYy5lczYuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbG9nZ2VyL2xvZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvVUlzL2RlZmF1bHQvZGVmYXVsdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvbWFwRnVuY3Rpb25zLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21hcF92YWxpZGF0b3JzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvZXZlbnRMaXN0ZW5lcnMvc2VsZWN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0X3NlbGVjdC9vYmplY3Rfc2VsZWN0X2hleGFnb24uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL3V0aWxzL2NyZWF0ZUhleGFnb24uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9tb3ZlL21hcF9tb3ZlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9vYmplY3QvT2JqZWN0X3RlcnJhaW4uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdC9PYmplY3RfdW5pdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvZ2FtZURhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvbWFwRGF0YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvdGVzdHMvZGF0YS90eXBlRGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozt3REFNYSxrREFBa0Q7Ozs7aUNBRW5ELDJCQUEyQjs7aUNBQzNCLDJCQUEyQjs7Z0NBQzVCLDBCQUEwQjs7OENBQzFCLHdDQUF3Qzs7Ozt5Q0FHdkMsb0NBQW9DOzt1RUFDdkIsbUVBQW1FOztBQUV6RyxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQzFCLFVBQVEsQ0FBQyxlQUFlLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDdkMsUUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztBQUU1QixNQUFFLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDeEIsWUFBTSxpQ0FiSCxPQUFPLENBYUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMvQixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHdCQUF3QixFQUFFLFVBQVMsSUFBSSxFQUFDO0FBQ3pDLHFCQUFlLEdBQUcsWUFBVztBQUMzQixZQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixlQUFNLENBQUMsR0FBRyxPQUFPLEVBQUU7QUFDakIsV0FBQyxFQUFFLENBQUM7QUFDSixXQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDakI7QUFDRCxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDMUIsWUFBSSxFQUFFLENBQUM7T0FDUixDQUFDOztBQUVGLFVBQUksSUFBSSxHQUFHLG9DQTNCUixPQUFPLENBMkJjLEtBQUssQ0FBRSxDQUFDO0FBQ2hDLFVBQUksQ0FBQyxlQUFlLENBQUUsbUJBQW1CLENBQUUsQ0FBQzs7QUFFNUMsVUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBQ2xCLFVB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNVI7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFF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LEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQywwQkFBMEIsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnRkFBZ0YsRUFBQyxTQUFTLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0VBQWdFLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDbjhILENBQUM7UUE5SFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL2hvcml6b250YWxIZXhhRmFjdG9yeSc7XG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YSc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhJztcbmltcG9ydCB7IHByZWxvYWQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3ByZWxvYWRpbmcvcHJlbG9hZGluZyc7XG5cbi8qID09PT09IEltcG9ydCBwbHVnaW5zID09PT09ICovXG5pbXBvcnQgeyBtYXBfbW92ZSB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL21hcC9tb3ZlL21hcF9tb3ZlXCI7XG5pbXBvcnQgeyBvYmplY3Rfc2VsZWN0X2hleGFnb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3Rfc2VsZWN0L29iamVjdF9zZWxlY3RfaGV4YWdvbic7XG5cbndpbmRvdy5tYXAgPSB7fTtcblxud2luZG93LnRlc3RNYXAgPSBmdW5jdGlvbigpIHtcbiAgZGVzY3JpYmUoXCJwcmVsb2FkZXIgPT4gXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICB2YXIgcnVuV2hlbkNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICBpdChcIj0+IGV4aXN0c1wiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KHByZWxvYWQpLnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdChcIj0+IHByZWxvYWRlciBjb21wbGV0ZXNcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICBydW5XaGVuQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZShpIDwgMTAwMDAwMCkge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBpICsgaSArIDIgKyBcInlcIjtcbiAgICAgICAgfVxuICAgICAgICBleHBlY3QodHJ1ZSkudG9CZVRydXRoeSgpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgcHJlbCA9IG5ldyBwcmVsb2FkKCBmYWxzZSApO1xuICAgICAgcHJlbC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKTtcbiAgICAgICAgLy8uc2V0UHJvZ3Jlc3NIYW5kbGVyKCBwcm9ncmVzc0hhbmRsZXIgKVxuICAgICAgcHJlbC5sb2FkTWFuaWZlc3QoWyB7XG4gICAgICAgIGlkOiBcInRlcnJhaW5fc3ByaXRlc2hlZXRcIixcbiAgICAgICAgc3JjOlwiaHR0cDovL3dhcm1hcGVuZ2luZS5sZXZlbDcuZmkvYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIlxuICAgICAgfSBdKTtcbiAgICAgIHByZWwucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgICAgICAudGhlbihydW5XaGVuQ29tcGxldGUpO1xuXG4gICAgfSk7XG5cbiAgICAgIC8qID09PT09PSBwcml2YXRlIGZ1bmN0aW9ucywgb3IgdG8gYmUgbW92ZWQgZWxzZXdoZXJlID09PT09PSAqL1xuICAgIGZ1bmN0aW9uIHByZWxvYWRFcnJvckhhbmRsZXIoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBSRUxPQURFUiBFUlJPUlwiLCBlcnIgKTtcbiAgICB9XG5cblxuXG4gIC8qXG4gIDEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbiAgWW91IHNob3VsZCB1c2UgdGhpcyBkYXRhIGluc3RlYWQgb2YgdGhlIHRlc3REYXRhIGJlbG93LiBZb3Ugc2hvdWxkIGNvbnZlcnQgdGhpcyBkYXRhIHRvIHN1aXQgdGhlIHN0YW5kYXJkcyBzbyB0aGF0IHRoZXJlXG4gIGlzIGFub3RoZXIgY2xhc3MgLyBtb2R1bGUgdGhhdCBoYW5kbGVzIHRoZSB0cmFuc2Zvcm1hdGlvbiBhbmQgeW91IGRlZmluZSBhIGdvb2Qgc2V0IG9mIHByaW5jaXBsZSBob3cgaXQncyBkb25lLiBEYXRhIGluIHRoaXM6XG4gIFwie1xuICAgIFwib2JqVHlwZVwiOjIsXG4gICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiM1wiLFxuICAgIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxuICB9XCJcbiAgV2hhdCBkbyB3ZSBkbyB3aXRoIHRoZSBfaWQgYW5kIHNob3VsZCB0aGF0IGJlIHJlcGxhY2VkIHdpdGggYWN0dWFsIGRhdGEsIHdoZW4gd2UgaW5zdGFudGlhdGUgdGhlIG9iamVjdHMuXG5cbiAgQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbiAgLyogPT09PT09IFRlc3RzID09PT09PSAqL1xuICAgIGl0KFwiPT4gZXhpc3RzXCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgbWFwID0gY3JlYXRlTWFwKGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG4gICAgICBleHBlY3QobWFwKS50b0JlRGVmaW5lZCgpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gYXJlIHN0YWdlIHByb3BlcnRpZXMgY29ycmVjdD9cIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLm5hbWUgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKS5uYW1lICA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KHR5cGVvZiBtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKSA9PT0gXCJvYmplY3RcIikudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gYXJlIGxheWVyIHByb3BlcnRpZXMgY29ycmVjdD9cIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldExheWVyTmFtZWQoXCJ1bml0TGF5ZXJcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IGFyZSB0ZXJyYWluIHByb3BlcnRpZXMgY29ycmVjdD9cIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChOdW1iZXIoIG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlblsxXS55ICkgPT09IDE0MSkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5nZXRMYXllck5hbWVkKFwidGVycmFpbkJhc2VMYXllclwiKS5jaGlsZHJlbi5sZW5ndGggPiAxKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3Q/XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ICkgPT09IDgyKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICBtYXAuaW5pdCggdGlja0RvbmVGdW5jICk7XG5cbiAgICAgIGZ1bmN0aW9uIHRpY2tEb25lRnVuYyh0aWNrRG9uZSkge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG5cbiAgICAgIGV4cGVjdCggdHJ1ZSApLnRvQmVUcnV0aHkoKTtcblxuXG4gICAgfSk7XG4gICAgaXQoXCJqZWplXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIHZhciB0aW1lb3V0dGVyID0gKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG1hcC5zdGFnZXNbMF0uZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgICAgICAgbWFwLmRyYXdNYXAoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH07XG4gICAgICB9KShtYXApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCh0aW1lb3V0dGVyLCA0MDApO1xuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG4gICAgfSlcblxuICAgIGl0KFwiPT4gcmUtaW5pdGlhbGl6ZSBtYXAgd2l0aCBwbHVnaW5zXCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgbWFwID0gY3JlYXRlTWFwKGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG4gICAgICBleHBlY3QobWFwKS50b0JlRGVmaW5lZCgpO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgb2tcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICB0cnkge1xuICAgICAgICBtYXAuaW5pdCggdGlja0RvbmVGdW5jLCBbIG1hcF9tb3ZlLCBvYmplY3Rfc2VsZWN0X2hleGFnb24gXSApO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRpY2tEb25lRnVuYyh0aWNrRG9uZSkge1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cGVjdCggdHJ1ZSApLnRvQmVUcnV0aHkoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGUpXG4gICAgICB9XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4vLyBub25lXG5cbi8qIHNvbWUgZnVuY3Rpb25zIHRvIGhlbHAgdGVzdHMgKi8iLCIvKlxuICogSmF2YVNjcmlwdCBNRDUgMS4wLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLypcbiAgICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpIHtcbiAgICAgICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgICovXG4gICAgZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xuICAgICAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgICAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XG4gICAgICAgIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcblxuICAgICAgICB2YXIgaSwgb2xkYSwgb2xkYiwgb2xkYywgb2xkZCxcbiAgICAgICAgICAgIGEgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgICAgIGIgPSAtMjcxNzMzODc5LFxuICAgICAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBvbGRhID0gYTtcbiAgICAgICAgICAgIG9sZGIgPSBiO1xuICAgICAgICAgICAgb2xkYyA9IGM7XG4gICAgICAgICAgICBvbGRkID0gZDtcblxuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsICAxMjM2NTM1MzI5KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCAgNjQzNzE3NzEzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgICAgICAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDUsIC03MDE1NTg2OTEpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sICA5LCAgMzgwMTYwODMpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDUsICA1Njg0NDY0MzgpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sICA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDJdLCAgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNCwgLTM3ODU1OCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA0XSwgMTEsICAxMjcyODkzMzUzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNCwgIDY4MTI3OTE3NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sICAgICAgMTEsIC0zNTg1MzcyMjIpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDZdLCAyMywgIDc2MDI5MTg5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCAgNTMwNzQyNTIwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICA3XSwgMTAsICAxMTI2ODkxNDE1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDYsICAxODczMzEzMzU5KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgICAgICAgICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgICAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgICAgICAgICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYSwgYiwgYywgZF07XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiAzMjsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgb3V0cHV0W2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogODsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweEZGKSA8PCAoaSAlIDMyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgYmtleSA9IHJzdHIyYmlubChrZXkpLFxuICAgICAgICAgICAgaXBhZCA9IFtdLFxuICAgICAgICAgICAgb3BhZCA9IFtdLFxuICAgICAgICAgICAgaGFzaDtcbiAgICAgICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgICAgIGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuICAgICAgICBoYXNoID0gYmlubF9tZDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcbiAgICAgICAgdmFyIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICAgICAgICBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhleF90YWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MEYpICtcbiAgICAgICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICAgKi9cbiAgICBmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICAgKi9cbiAgICBmdW5jdGlvbiByYXdfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYXdfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1KHN0cmluZywga2V5LCByYXcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleF9tZDUoc3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYXdfbWQ1KHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXhfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXdfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZDU7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQubWQ1ID0gbWQ1O1xuICAgIH1cbn0odGhpcykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbk1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcblxuQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuKi9cblxuLyogPT09PT0gM3JkIHBhcnR5IGxpYnJhcnkgaW1wb3J0cyA9PT09PSAqL1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdzeXN0ZW1qcyc7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwX3N0YWdlJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4uL21hcC9jb3JlL01hcF9sYXllcic7XG5pbXBvcnQgeyBPYmplY3RfdGVycmFpbl9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhJztcbmltcG9ydCB7IE9iamVjdF91bml0X2hleGEgfSBmcm9tICcuLi9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF91bml0X2hleGEnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW4gfSBmcm9tICcuLi9tYXAvb2JqZWN0L09iamVjdF90ZXJyYWluJztcbmltcG9ydCB7IE9iamVjdF91bml0IH0gZnJvbSAnLi4vbWFwL29iamVjdC9PYmplY3RfdW5pdCc7XG5pbXBvcnQgeyBzcHJpdGVzaGVldExpc3QgfSBmcm9tICcuLi9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QnO1xubGV0IGFsbFNwcml0ZXNoZWV0cyA9IHNwcml0ZXNoZWV0TGlzdCgpO1xuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4uL21hcC9jb3JlL21hcF92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL21hcC9jb3JlL1VJJztcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL1VJcy9kZWZhdWx0L2RlZmF1bHQuanNcIjtcblxubGV0IGZ1bmN0aW9uc0luT2JqID0ge1xuICBNYXBfc3RhZ2UsXG4gIE1hcF9sYXllcixcbiAgT2JqZWN0X3RlcnJhaW4sXG4gIE9iamVjdF91bml0LFxuICBPYmplY3RfdGVycmFpbl9oZXhhLFxuICBPYmplY3RfdW5pdF9oZXhhXG59O1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICAgIF9nZXRTdGFnZUluZGV4XG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4XG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG4vKlxuQGFyZ3VtZW50IHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbkNvb3JkaW5hdGVzIGFyZSBhbHdheXMgZGVmYXVsdGVkIHRvIDAsMCBpZiBub25lIGFyZSBnaXZlbi5cbntcbiAgbWFwU2l6ZTogY3JlYXRlanMuUmVjdGFuZ2xlLFxuICBwbHVnaW5zVG9BY3RpdmF0ZTogW1xuICAgIFwibWFwL21vdmUvbWFwX21vdmVcIixcbiAgICBcIm1hcC9GT1cvbWFwX0ZPV1wiXG4gIF0sXG4gIHN0YWdlczogW3tcbiAgICB0eXBlOiBcIm1hcC9jb3JlL01hcF9TdGFnZVwiLFxuICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICBsYXllcnM6IFt7XG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dLFxuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV0sXG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c191bml0XCIsXG4gICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcCh7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyAqL1xuICAvKiBUaGUgc3lzdGVtIGRvZXMgbm90IHdvcmsgOihcbiAgaWYoZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwICYmIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcC5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLm1hcCh4ID0+IFN5c3RlbS5pbXBvcnQoeCkpKVxuICAgICAgLnRoZW4oKFttb2R1bGUxLCBtb2R1bGUyLCBtb2R1bGUzXSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBsdWdpbnMgbG9hZGVkXCIpO1xuICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xuICAgICAgfSk7XG4gIH1cbiAgKi9cblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuICBtYXBEYXRhLnN0YWdlcy5mb3JFYWNoKCBzdGFnZURhdGEgPT4ge1xuICAgIGxldCB0aGlzU3RhZ2UgPSBuZXcgZnVuY3Rpb25zSW5PYmpbc3RhZ2VEYXRhLnR5cGVdKHN0YWdlRGF0YS5uYW1lLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzdGFnZURhdGEuZWxlbWVudCApICk7XG5cbiAgICBtYXAuYWRkU3RhZ2UoIHRoaXNTdGFnZSApO1xuXG4gICAgc3RhZ2VEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgICAgbGV0IHRoaXNMYXllcjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpc0xheWVyID0gbmV3IGZ1bmN0aW9uc0luT2JqW2xheWVyRGF0YS50eXBlXShsYXllckRhdGEubmFtZSwgbGF5ZXJEYXRhLnR5cGUsIGZhbHNlLCBsYXllckRhdGEuY29vcmQpO1xuICAgICAgICB0aGlzU3RhZ2UuYWRkQ2hpbGQoIHRoaXNMYXllciApO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbTpcIiwgbGF5ZXJEYXRhLnR5cGUsIGUuc3RhY2spXG4gICAgICB9XG5cbiAgICAgIGxheWVyRGF0YS5vYmplY3RHcm91cHMuZm9yRWFjaCggb2JqZWN0R3JvdXAgPT4ge1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXQ7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldFR5cGUgPSBvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhO1xuXG4gICAgICAgIGlmKCFzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggc3ByaXRlc2hlZXRUeXBlLWRhdGFcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgICAgbGV0IHNwcml0ZXNoZWV0RGF0YSA9IHR5cGVEYXRhLmdyYXBoaWNEYXRhW3Nwcml0ZXNoZWV0VHlwZV07XG5cbiAgICAgICAgICBzcHJpdGVzaGVldCA9IGFsbFNwcml0ZXNoZWV0cy5hZGRTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XG5cbiAgICAgICAgICBpZighb2JqVHlwZURhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgY3VycmVudEZyYW1lTnVtYmVyID0gb2JqVHlwZURhdGEuaW1hZ2U7XG4gICAgICAgICAgbGV0IG9iakRhdGEgPSB7XG4gICAgICAgICAgICB0eXBlRGF0YTogb2JqVHlwZURhdGEsXG4gICAgICAgICAgICBhY3RpdmVEYXRhOiBvYmplY3QuZGF0YVxuICAgICAgICAgIH07XG4gICAgICAgICAgbGV0IG5ld09iamVjdCA9IG5ldyBmdW5jdGlvbnNJbk9ialtvYmplY3RHcm91cC50eXBlXSggb2JqZWN0LmNvb3JkLCBvYmpEYXRhLCBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCB7IHJhZGl1czogNDcgfSApO1xuICAgICAgICAgIHRoaXNMYXllci5hZGRDaGlsZCggbmV3T2JqZWN0ICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBtYXA7XG5cbi8qXG4gIENyZWF0ZVRlcnJhaW5TdGFnZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfYmFzZVxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfdGVycmFpblxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfZGl0aGVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9wcmV0dGlmaWVyXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9yZXNvdXJjZVxuICBDcmVhdGVVbml0U3RhZ2VcbiAgICBfQ3JlYXRlVW5pdExheWVyX1VuaXRcbiAgICBfQ3JlYXRlVW5pdExheWVyX0NpdHlcbiAgQ3JlYXRlRk9XU3RhZ2VcbiAgQ3JlYXRlRGF0YVN0YWdlXG4gIENyZWF0ZVVJU3RhZ2VcbiAgICBfQ3JlYXRlVUlMYXllcl9hcnJvd1xuICAgIF9DcmVhdGVVSUxheWVyX3NlbGVjdGlvblxuKi9cblxuICBmdW5jdGlvbiBfY2FsY3VsYXRlTWFwU2l6ZSgpIHtcblxuICB9XG59XG5cbi8qID09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PSAqL1xuZnVuY3Rpb24gX2dldFN0YWdlSW5kZXgoKSB7fSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWJ1ZzogZnVuY3Rpb24oZSwgZXJyb3JUZXh0KSB7XG4gICAgbG9nLmRlYnVnKGVycm9yVGV4dCwgZSk7XG4gIH1cbn07IiwiLyoqXG4gIFRoZSBzaW1wbGVzdCBkZWZhdWx0IFVJIGltcGxlbWVudGF0aW9uLiBIb2xkczpcbiAgLSBTZWxlY3Rpb24gaGlnaGxpZ2h0IG9mIG9iamVjdFxuICAtIFNlbGVjdGlvbiBsaXN0IG9mIHVuaXRzIGF0IHRoZSBoZXhhZ29uXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIFVJX2RlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcihtb2RhbCwgc3R5bGVzKSB7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGlhbG9nXCIpWzBdO1xuICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzIHx8IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjBGMEYwXCJcbiAgICB9O1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMgPSBfRE9NRWxlbWVudHNUb0FycmF5KHRoaXMubW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX2Nsb3NlXCIpKTtcbiAgfVxuICBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgaWYob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJvYmplY3RzOjxicj5cIjtcbiAgICAgIG9iamVjdHMubWFwKCBvYmplY3QgPT4ge1xuICAgICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3QuZGF0YS50eXBlRGF0YS5uYW1lICsgXCI8YnI+XCI7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJTRUxFQ1RFRDo8YnI+XCI7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3RzWzBdLmRhdGEudHlwZURhdGEubmFtZTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGluaXQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudCggZWxlbWVudCwgc2VsZi5tb2RhbC5jbG9zZS5iaW5kKHNlbGYubW9kYWwpICk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FjdGl2YXRlQ2xvc2luZ0VsZW1lbnQoZWxlbWVudCwgY2xvc2VDQikge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjbG9zZUNCKCk7XG4gICAgICB9KTtcbn1cbmZ1bmN0aW9uIF9ET01FbGVtZW50c1RvQXJyYXkoZWxlbWVudHMpIHtcbiAgaWYoIWVsZW1lbnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IgKyBcIiBmdW5jdGlvbiBuZWVkcyBlbGVtZW50c1wiKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG4gIHZhciBlbGVtZW50QXJyYXkgPSBbXTtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50QXJyYXkucHVzaChlbGVtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudEFycmF5O1xufSIsIi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG4vL3ZhciBTeXN0ZW0gPSByZXF1aXJlKCdlczYtbW9kdWxlLWxvYWRlcicpLlN5c3RlbTtcbi8vaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSAnZXM2LW1vZHVsZS1sb2FkZXInO1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4vbWFwX3ZhbGlkYXRvcnNcIjtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICAgIF9nZXRTdGFnZUluZGV4XG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICAgIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gICAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICAgIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gICAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzLFxuICAgIF9pc19jYW52YXM6IHZhbGlkYXRvck1vZC5pc0NhbnZhc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiB7XG4gKiAgbWFwU2l6ZToge1xuICogICAgeDogTnVtYmVyLFxuICogICAgeTogTnVtYmVyXG4gKiB9XG4gKlxuICogUGx1Z2lucyBhcmUgcHJvdmlkZWQgaW4gYW4gYXJyYXkgb2YgcGx1Z2luIGZ1bmN0aW9uc1xuKi9cblxuZXhwb3J0IGNsYXNzIE1hcCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0YWdlcyA9IFtdO1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICAgIHRoaXMubWFwU2l6ZSA9IChvcHRpb25zICYmIG9wdGlvbnMubWFwU2l6ZSkgfHwgeyB4OjAsIHk6MCB9O1xuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gZmFsc2U7XG4gIH1cbiAgLyogb3B0aW9ucy5tYXBTaXplID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSovXG4gIGluaXQodGlja0NCLCBwbHVnaW5zLCBjb29yZCkge1xuICAgIGlmKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cbiAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKHN0YWdlID0+IHtcbiAgICAgIHN0YWdlLnggPSBjb29yZC54O1xuICAgICAgc3RhZ2UueSA9IGNvb3JkLnk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYXdNYXAoKTtcbiAgICB0aGlzLnRpY2tPbih0aWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZHJhd01hcCgpIHtcbiAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICBpZihzdGFnZS5kcmF3VGhpc0NoaWxkKSB7XG4gICAgICAgIHN0YWdlLnVwZGF0ZSgpO1xuICAgICAgICBzdGFnZS5kcmF3VGhpc0NoaWxkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRTaXplKCApIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cbiAgc2V0U2l6ZSh4MSwgeTEpIHtcbiAgICB0aGlzLm1hcFNpemUgPSB7IHg6eDEsIHk6eTEgfTtcblxuICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgZm9yKGxldCBzdGFnZSBvZiB0aGlzLnN0YWdlcykge1xuICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICBpZihzdGFnZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXR1cm4gc3RhZ2U7XG4gICAgICB9XG5cbiAgICAgIGlmKGNoaWxkID0gc3RhZ2UuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGFkZFN0YWdlKHN0YWdlKSB7XG4gICAgbGV0IHN0YWdlcyA9IFtdO1xuXG4gICAgaWYoISAoc3RhZ2UgaW5zdGFuY2VvZiBBcnJheSkgKSB7XG4gICAgICBzdGFnZXMucHVzaChzdGFnZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFnZXMucHVzaCguLi5zdGFnZXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVwbGFjZVN0YWdlKG5ld0NhbnZhcywgb2xkQ2FudmFzKSB7XG4gICAgbGV0IG9sZEluZGV4ID0gcHJpdmF0ZUZ1bmN0aW9ucy5fZ2V0U3RhZ2VJbmRleCh0aGlzLnN0YWdlcywgb2xkQ2FudmFzKTtcbiAgICB0aGlzLnN0YWdlc1tvbGRJbmRleF0gPSBuZXdDYW52YXM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGRMYXllcihsYXllciwgc3RhZ2UpIHtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJlcGxhY2VMYXllcihuZXdMYXllciwgb2xkTGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRvZ2dsZUxheWVyKGxheWVyKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRMYXllck5hbWVkKG5hbWUpIHtcbiAgICBsZXQgdGhlTGF5ZXI7XG5cbiAgICBmb3IobGV0IHN0YWdlIG9mIHRoaXMuc3RhZ2VzKSB7XG4gICAgICBpZih0aGVMYXllciA9IHN0YWdlLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoZUxheWVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY2FjaGVNYXAoKSB7XG4gICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgICAgaWYoc3RhZ2UuY2FjaGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgY2FjaGVMYXllcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRPYmplY3RzVW5kZXJNYXBQb2ludChjbGlja0Nvb3Jkcykge1xuICAgICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICBvYmplY3RzW3N0YWdlLm5hbWVdID0gb2JqZWN0c1tzdGFnZS5uYW1lXSB8fCBbXTtcbiAgICAgICAgb2JqZWN0c1tzdGFnZS5uYW1lXS5wdXNoKHN0YWdlLmdldE9iamVjdHNVbmRlclBvaW50KGNsaWNrQ29vcmRzKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgYWN0aXZhdGVGdWxsU2l6ZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBfc2V0U3RhZ2VzVG9GdWxsU2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuICBkZWFjdGl2YXRlRnVsbFNpemUoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fc2V0U3RhZ2VzVG9GdWxsU2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zIGZvciB0aGUgbWFwLiBNdXN0IGJlIGluIGFycmF5IGZvcm1hdDpcbiAgW3tcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lLFxuICAgIGFyZ3M6IFtcbiAgICAgIEZpcnN0IGFyZ3VtZW50LFxuICAgICAgc2Vjb25kIGFyZ3VtZW50LFxuICAgICAgLi4uXG4gICAgXVxuXG4gICAgUGFyYW1ldGVyIHBsdWdpblRvVXNlLmZ1bmMubmFtZSBpcyBwYXJ0IG9mIEVTNiBzdGFuZGFyZCB0byBnZXQgZnVuY3Rpb24gbmFtZS5cbiAgfV0gKi9cblxuICBhY3RpdmF0ZVBsdWdpbnMocGx1Z2luc0FycmF5KSB7XG4gICAgcGx1Z2luc0FycmF5LmZvckVhY2gocGx1Z2luVG9Vc2UgPT4ge1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gcGx1Z2luVG9Vc2U7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0uaW5pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuICB0aWNrT24odGlja0NCKSB7XG4gICAgaWYodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IF9oYW5kbGVUaWNrLmJpbmQodGhpcyk7XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGlja09mZigpIHtcbiAgICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KHN0YWdlcywgc3RhZ2VUb0ZpbmQpIHtcbiAgdmFyIGZvdW5kSW5kZXggPSBzdGFnZXMuaW5kZXhPZihzdGFnZVRvRmluZCk7XG5cbiAgcmV0dXJuICggZm91bmRJbmRleCA9PT0gLTEgKSA/IGZhbHNlIDogZm91bmRJbmRleDtcbn1cbi8qKiA9PSBDb250ZXh0IHNlbnNpdGl2ZSwgeW91IG5lZWQgdG8gYmluZCwgY2FsbCBvciBhcHBseSB0aGVzZSA9PSAqL1xuZnVuY3Rpb24gX2hhbmRsZVRpY2soKSB7XG4gIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICBpZihzdGFnZS51cGRhdGVTdGFnZSA9PT0gdHJ1ZSkge1xuICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIF9zZXRTdGFnZXNUb0Z1bGxTaXplKCkge1xuICBmb3IoIGxldCBjYW52YXMgb2YgdGhpcy5zdGFnZXMgKSB7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcblxuICAgIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi9tYXBfdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgYWRkUHJvdG90eXBlIGFzIG1hcEZ1bmNfYWRkUHJvdG90eXBlIH0gZnJvbSBcIi4vbWFwRnVuY3Rpb25zXCI7XG5cbi8qID09PT09IENvbnN0YW50cyA9PT09PSAqL1xuY29uc3QgVFlQRVMgPSB7XG4gIGp1c3RTdWJDb250YWluZXJzOiAxLFxuICBub1N1YkNvbnRhaW5lcnM6IDIsXG4gIGltYWdlc0luU3ViQ29udGFpbmVyczogM1xufTtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgX2dldFN0YWdlSW5kZXgsXG4gIF9jcmVhdGVTdWJDb250YWluZXJzLFxuICBfY2FjaGVMYXllcixcbiAgX3NldENvcnJlY3RTdWJDb250YWluZXIsXG4gIF9nZXRDb3JyZWN0Q29udGFpbmVyXG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuc3VwZXJQcm90b3R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyYWN0aXZlID0gZmFsc2U7XG5cbiAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBhZGRQcm90b3R5cGUobmFtZSwgZnVuY3Rpb25Ub0FkZCkge1xuICAgIHN1cGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uVG9BZGQ7XG4gIH1cbiAgLyogb3ZlcmxvYWRlZCBpbmhlcml0ZWQgbWV0aG9kICovXG4gIGFkZENoaWxkVG9TdWJDb250YWluZXIob2JqZWN0LCBpbmRleCkge1xuICAgIGxldCBmdW5jdGlvblRvVXNlID0gaW5kZXggPyBcIl9hZGRDaGlsZEF0XCIgOiBcIl9hZGRDaGlsZFwiO1xuXG4gICAgaWYoIXRoaXMudXNlU3ViY29udGFpbmVycykge1xuICAgICAgLyogV2UgYWRkIHRoZSBvYmplY3QgdG8gdGhlIENvbnRhaW5lciBkaXJlY3RseS4gV2V0aGVyIGl0IGlzIENvbnRhaW5lciBvciBCaXRtYXAgZXRjLiAqL1xuICAgICAgdGhpc1tmdW5jdGlvblRvVXNlXShvYmplY3QsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLyogV2UgYWRkIHRoZSBvYmplY3QgdG8gdGhlIGNvcnJlY3Qgc3ViQ29udGFpbmVyLiBGb3IgYmV0dGVyIGxvZ2ljIGFuZCBwZXJmb3JtYW5jZSAqL1xuICAgICAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSBwcml2YXRlRnVuY3Rpb25zLl9nZXRDb3JyZWN0Q29udGFpbmVyLmNhbGwodGhpcywgb2JqZWN0LngsIG9iamVjdC55KTtcbiAgICAgIGNvcnJlY3RTdWJDb250YWluZXIuYWRkQ2hpbGQob2JqZWN0LCBpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnVzZVN1YmNvbnRhaW5lcnM7XG4gIH1cbiAgaXNTZXRWaXNpYmxlKCkgeyB9XG4gIHNldFZpc2libGUoKSB7IH1cbiAgc3RhdGljIGdldFR5cGUobmFtZSkge1xuICAgIHJldHVybiBUWVBFU1tuYW1lXTtcbiAgfVxufVxuTWFwX2xheWVyLnByb3RvdHlwZS5hZGRQcm90b3R5cGUgPSBtYXBGdW5jX2FkZFByb3RvdHlwZTtcblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxufVxuKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0U3RhZ2VJbmRleChtYXAsIGNhbnZhcykgeyB9XG5mdW5jdGlvbiBfY3JlYXRlU3ViQ29udGFpbmVycygpIHsgfVxuZnVuY3Rpb24gX2NhY2hlTGF5ZXIoKSB7IH1cbmZ1bmN0aW9uIF9zZXRDb3JyZWN0U3ViQ29udGFpbmVyKCkgeyB9XG5mdW5jdGlvbiBfZ2V0Q29ycmVjdENvbnRhaW5lcih4LCB5KSB7XG4gIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gdGhpcy5nZXRPYmplY3RVbmRlclBvaW50KHgsIHkpO1xuXG4gIHJldHVybiBjb3JyZWN0U3ViQ29udGFpbmVyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBhZGRQcm90b3R5cGUgYXMgbWFwRnVuY19hZGRQcm90b3R5cGUgfSBmcm9tIFwiLi9tYXBGdW5jdGlvbnNcIjtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHsgfTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gIF9pc19pbmRleDogdmFsaWRhdG9yTW9kLmlzSW5kZXgsXG4gIF9pc19ib29sZWFuOiB2YWxpZGF0b3JNb2QuaXNCb29sZWFuLFxuICBfaXNfY29vcmRpbmF0ZXM6IHZhbGlkYXRvck1vZC5pc0Nvb3JkaW5hdGVzLFxuICBfaXNfU3ViQ29udGFpbmVyQW1vdW50OiB2YWxpZGF0b3JNb2QuaXNTdWJDb250YWluZXJBbW91bnQsXG4gIF9pc19Vc2VPZlN1YkxheWVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJMYXllcnMsXG4gIF9pc19Vc2VPZlN1YkNvbnRhaW5lcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViQ29udGFpbmVyc1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9zdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlN0YWdlIHtcbiAgLyogVGFrZXMgdGhlIGNhbnZhcyBlbGVtZW50IGFzIGFyZ3VtZW50ICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnN1cGVyUHJvdG90eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nIEFORCBnZXR0aW5nIGNoaWxkcmVuIGJ5IG5hbWUuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG5cbiAgICAgICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgICAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gICAgfVxuICAgIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgICAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICAgIGlmKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn1cbk1hcF9zdGFnZS5wcm90b3R5cGUuYWRkUHJvdG90eXBlID0gbWFwRnVuY19hZGRQcm90b3R5cGU7XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cblxuXG4vKlxuXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuaW1wb3J0IFNwcml0ZVN0YWdlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlU3RhZ2UnO1xuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVTdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZVN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGlzIGNsYXNzIG5lZWRzIHRvIGJlIGdvbmUgdGhyb3VnaCBjYXJlZnVsbHksIGl0IGhhcyBiZWVuIGNvcGllZCBmcm9tIGFuIG9sZGVyIHZlcnNpb24gc3RyYWlnaHQuIFRoZSB2ZXJzaW9uIHdhcyBFUzVcbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YVxuKi9cblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJnZW5lcmFsIE9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcblxuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gY3VycmVudEZyYW1lTnVtYmVyO1xuXG4gICAgLyogRXhlY3V0ZSBpbml0aWFsIGRyYXcgZnVuY3Rpb24gKi9cbiAgICB0aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuXG4gICAgLyogb3B0aW1pemF0aW9ucyAqL1xuICAgIHRoaXMuc2hhZG93ID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gU2hvdWxkIGJlIGVuYWJsZWQsIGlmIHRoZSBsYXllciBpcyBiZWluZyBpbnRlcmFjdGVkIHdpdGguIExpa2UgdW5pdCBsYXllci4gVGhpcyB3YXkgd2UgY2FuIHVzZSBjdXJzb3IgcG9pbnRlciBldGMuXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBGT1IgREVCVUdHSU5HIEFORCBTRUVJTkcgVEhBVCBMSVNURU5FUlMgQVJFIEFUVEFDSEVEOlxuICAgIC8vdGhpcy53aWxsVHJpZ2dlclxuICB9XG4gIHNldERhdGEoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICBjb25zb2xlLmxvZyhcIkhBQUFcIilcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgLyogVGhlIG1vdXNlIGNoZWNrIGhhcyBiZWVuIGVuYWJsZWQgb24gaGlnaGVyIHRpZXIsIHNvIG5vIG5lZWQgZm9yIHRoaXNcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlOyAqL1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZHJhd05ld0ZyYW1lKHgsIHksIG5ld0ZyYW1lTnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBuZXdGcmFtZU51bWJlcjtcblxuICAgIHJldHVybiB0aGlzLmlubmVyRHJhdyh4LCB5KTtcbiAgfVxuICAvKiBEdW5ubyBpZiB3ZSBuZWVkIHRoaXMgYW5kIHNvIG9uLiBUaGlzIHdhcyBpbiB0aGUgb2xkIHZlcnNpb24gKi9cbiAgZ2xvYmFsQ29vcmRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBOdW1iZXIoIHRoaXMueCArIHRoaXMucGFyZW50LnggKSxcbiAgICAgIHk6IE51bWJlciggdGhpcy55ICsgdGhpcy5wYXJlbnQueSApXG4gICAgfTtcbiAgfVxuICBnZXRCb3VuZHNGcm9tRnJhbWVzKCkge1xuICAgICByZXR1cm4gdGhpcy5zcHJpdGVTaGVldC5nZXRGcmFtZUJvdW5kcyggdGhpcy5jdXJyZW50RnJhbWUgKTtcbiAgfVxufSIsIi8qKlxuICBNYWluIGNsYXNzIGZvciBzaG93aW5nIFVJIG9uIHRoZSBtYXAuIExpa2UgdW5pdCBzZWxlY3Rpb25zIGFuZCBzdWNoLiBIYXMgbm90aGluZyB0byBkbyB3aXRoIHNob3dpbmcgb2ZmLW1hcCBkYXRhLlxuICBHb29kIGV4YW1wbGVzIGZvciB3aGF0IHRoaXMgc2hvd3MgYXJlOiBzZWxlY3RlZCB1bml0cy1saXN0LCBzZWxlY3Rpb24gaGlnaGxpZ2h0IChsaWtlIGEgY2lyY2xlIG9uIHRoZSBzZWxlY3RlZCB1bml0KSBhbmRcbiAgYnJpbmdpbmcgdGhlIHVuaXQgb24gdG9wIGluIHRoZSBtYXAuXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjb3BlO1xuXG5leHBvcnQgZnVuY3Rpb24gVUkgKGdpdmVuVUlUaGVtZSwgZ2l2ZW5NYXApIHtcbiAgLyogVGhpcyBpcyBhIHNpbmdsZXRvbiBjbGFzcywgc28gaWYgYWxyZWFkeSBpbnN0YW50aWF0ZWQgcmV0dXJuIHNjb3BlICovXG4gIGlmKHNjb3BlKSB7XG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgaWYoIWdpdmVuVUlUaGVtZSB8fCAhZ2l2ZW5NYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSS1tb2R1bGUgcmVxdWlyZXMgVUlUaGVtZSBhbmQgbWFwT2JqXCIpO1xuICB9XG5cbiAgdmFyIG1hcCA9IGdpdmVuTWFwO1xuICB2YXIgVUlUaGVtZSA9IGdpdmVuVUlUaGVtZTtcbiAgc2NvcGUgPSB7fTtcblxuICBzY29wZS5zaG93U2VsZWN0aW9ucyA9IGZ1bmN0aW9uIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcbiAgICByZXR1cm4gVUlUaGVtZS5zaG93U2VsZWN0aW9ucyhvYmplY3RzKTtcbiAgfTtcbiAgc2NvcGUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QgPSBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGFkZFByb3RvdHlwZSAobmFtZSwgZnVuY3Rpb25Ub0FkZCkge1xuICB0aGlzLnN1cGVyUHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb25Ub0FkZDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBIb2xkIGRpZmZlcmVudCB2YWxpZGF0b3IgZnVuY3Rpb25zIHRvIGJlIHVzZWQgaW4gbW9kdWxlcyAqL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICBfaXNJbnRcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBsZXQgdmFsaWRhdG9yTW9kID0gKGZ1bmN0aW9uIHZhbGlkYXRvck1vZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0luZGV4KGludCkge1xuICAgICAgICByZXR1cm4gcHJpdmF0ZUZ1bmN0aW9ucy5pc0ludChpbnQpO1xuICAgIH0sXG4gICAgaXNCb29sZWFuKGJvb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvb2wgPT09IEJvb2xlYW4oYm9vbCk7XG4gICAgfSxcbiAgICBpc0Nvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICAgICAgaWYocHJpdmF0ZUZ1bmN0aW9ucy5pc0ludCh4KSAmJiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KHkpICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBpc1N1YkNvbnRhaW5lckFtb3VudCgpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkxheWVycygpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkNvbnRhaW5lcnMoKSB7XG5cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9pc0ludCh3YW5uYWJlSW50KSB7XG4gIC8qIEVTNiAqL1xuICBpZihOdW1iZXIuaXNJbnRlZ2VyKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIod2FubmFiZUludCk7XG4gIH1cblxuICAvKiBFUzUgKi9cbiAgcmV0dXJuIHR5cGVvZiB3YW5uYWJlSW50ID09PSAnbnVtYmVyJyAmJiAod2FubmFiZUludCAlIDEpID09PSAwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYoc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzKCBfY3JlYXRlSUQoIHNwcml0ZXNoZWV0RGF0YSApICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxuICAgIGFsbFNwcml0ZXNoZWV0cy5wdXNoKCBzcHJpdGVTaGVldCApO1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldCkge1xuXG4gIH07XG4gIHNjb3BlLmdldEFsbFNwcml0ZXNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuICBzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXRJRCkge1xuICAgIHJldHVybiAoIGFsbFNwcml0ZXNoZWV0SURzLmluZGV4T2YoIHNwcml0ZXNoZWV0SUQgKSA+IC0xICk7XG4gIH07XG4gIGZ1bmN0aW9uIF9jcmVhdGVJRCAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuICggc3ByaXRlc2hlZXREYXRhLmltYWdlcy50b1N0cmluZygpICk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vLi4vbG9nZ2VyL2xvZy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBIZXhhZ29uQ2xpY2sobWFwLCBlbGVtZW50LCBjYWxsYmFjaykge1xuICB0cnkge1xuICAgIG9uTW91c2VEb3duKC4uLmFyZ3VtZW50cyk7XG4gICAgb25Nb3VzZVVwKGVsZW1lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGUsIFwib25Nb3VzZURvd24gb3Igb25Nb3VzZVVwIGhleGFnb25DbGljayBlcnJvcjpcIik7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZURvd24obWFwLCBlbGVtZW50LCBjYWxsYmFjaykge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdGFnZW1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGdsb2JhbENvb3JkcyA9IGVsZW1lbnQubG9jYWxUb0dsb2JhbChlLnN0YWdlWCwgZS5zdGFnZVkpO1xuICAgIHZhciBvYmplY3RzO1xuXG4gICAgb2JqZWN0cyA9IG1hcC5nZXRPYmplY3RzVW5kZXJNYXBQb2ludChnbG9iYWxDb29yZHMpO1xuXG4gICAgaWYob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrKG9iamVjdHMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN0YWdlbW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdGFnZW1vdXNlZG93blwiLCBvbk1vdXNlRG93bilcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vLi4vY29yZS9PYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uL3V0aWxzL2NyZWF0ZUhleGFnb24nO1xuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcblxudmFyIHNoYXBlO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZV9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCBleHRyYSA9IHsgcmFkaXVzOiAwIH0pIHtcbiAgICB2YXIgc2hhcGU7XG5cbiAgICBjb25zdCBIRUlHSFQgPSBoZXhhZ29uTWF0aC5jYWxjSGVpZ2h0KGV4dHJhLnJhZGl1cyk7XG4gICAgY29uc3QgU0lERSA9IGhleGFnb25NYXRoLmNhbGNTaWRlKGV4dHJhLnJhZGl1cyk7XG5cbiAgICBzdXBlcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHZhciBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKGV4dHJhLnJhZGl1cyk7XG4gICAgdGhpcy5yZWdYID0gaGV4YWdvblNpemUueCAvIDI7XG4gICAgdGhpcy5yZWdZID0gaGV4YWdvblNpemUueSAvIDI7XG4gICAgdGhpcy5IRUlHSFQgPSBIRUlHSFQ7XG4gICAgdGhpcy5TSURFID0gU0lERTtcblxuICAgIGlmKCFleHRyYS5yYWRpdXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgcmFkaXVzIVwiKTtcbiAgICB9XG5cbiAgICAvKiBEcmF3IGhleGFnb24gdG8gdGVzdCB0aGUgaGl0cyB3aXRoIGhpdEFyZWEgKi9cbiAgICAvL3NoYXBlID0gY3JlYXRlSGV4YWdvbih7IHg6MCwgeTowIH0sIGV4dHJhLnJhZGl1cywgNiwgZXh0cmEucG9pbnRTaXplLCAzMCwgZXh0cmEuY29sb3IpO1xuXG4gICAgdGhpcy5oaXRBcmVhID0gc2V0QW5kR2V0U2hhcGUoZXh0cmEucmFkaXVzKTtcbiAgfVxuICBzdGF0aWMgZ2V0U2hhcGUoKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEFuZEdldFNoYXBlKHJhZGl1cykge1xuICBpZighc2hhcGUpIHtcbiAgICBsZXQgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgIC8qIHggYW5kIHkgYXJlIHJldmVyc2VkLCBzaW5jZSB0aGlzIGlzIGhvcml6b250YWwgaGV4YWdvbiBhbmQgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgKi9cbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24oeyB4OmhleGFnb25TaXplLnkgKyBoZXhhZ29uU2l6ZS55IC8yLCB5OmhleGFnb25TaXplLnggKyBoZXhhZ29uU2l6ZS54IC8gMiB9LCByYWRpdXMpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbl9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0X2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNfaGV4YVwiO1xuICB9XG59IiwiLypDYWxjdWxhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjZW50ZXIgaGV4YWdvbiBhbHdheXMgYW5kIGdldCBvYmplY3RzIGJhc2VkIG9uIHRoZSBjb29yZGluYXRlcy4gRm9yIGV4YW1wbGUgd2l0aFxuICBzb21lIG1ldGhvZCBsaWtlIGdldEFsbE9iamVjdHNJbkhleGFnb24uXG5TTzpcbldlIGNyZWF0ZSBhIGZ1bmN0aW9uIGZvciBsYXllcnMsIGxpa2UgXCJtYXBfdXRpbHNfaGV4YWdvbj8gLT4gZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljayh4LHkpLCBnZXRPYmplY3RzSW5IZXhhZ29uKGhleGFnb24/KVwiXG4tIFRoZXJlIHdlIG9ubHkgZmluZCBvdXQgYWJvdXQgdGhlIGNvb3JkaW5hdGVzIGZvciB0aGUgb2JqZWN0LCB3ZSBkb250IHVzZSBnZXRPQmplY3RVbmRlclBvaW50LiBJZiB0aGUgY29vcmRzIGVxdWFsIHRvXG50aG9zZSBnb3R0ZW4gZnJvbTogZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljaywgdGhlbiB0aGF0IG9iamVjdCBpcyBhZGRlZCB0byByZXR1cm5lZCBhcnJheS4gV2UgY2FuIGFsc28gY2FjaGUgdGhlc2UgaWZcbm5lZWRlZCBmb3IgcGVyZm9ybWFuY2VcblxuSE9XIHdlIGRvIHRoZSB3aG9sZSBvcmdhbml6YXRpb25hbCBzdHVmZj9cbi0gbWFwX21vdmVcbi0gbWFwX3V0aWxzX2hleGFnb24/IC0+IGdldEhleGFnb25Db29yZHNGcm9tQ2xpY2soeCx5KSwgZ2V0T2JqZWN0c0luSGV4YWdvbihoZXhhZ29uPylcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgeyBtYXBfY29vcmRzX2hvcml6b250YWxIZXggfSBmcm9tICcuLi9jb29yZGluYXRlcy9NYXBfY29vcmRzX2hvcml6b250YWxIZXgnO1xuaW1wb3J0IHsgc2V0dXBIZXhhZ29uQ2xpY2sgfSBmcm9tICcuLi9ldmVudExpc3RlbmVycy9zZWxlY3QnO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi8uLi9jb3JlL1VJJztcblxuZXhwb3J0IGxldCBvYmplY3Rfc2VsZWN0X2hleGFnb24gPSAoZnVuY3Rpb24gb2JqZWN0X3NlbGVjdF9oZXhhZ29uKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwT2JqKSB7XG4gICAgLyogV2UgdGFrZSB0aGUgdG9wLW1vc3Qgc3RhZ2Ugb24gdGhlIG1hcCBhbmQgYWRkIHRoZSBsaXN0ZW5lciB0byBpdCAqL1xuICAgIHZhciB0b3BNb3N0U3RhZ2UgPSBtYXBPYmouc3RhZ2VzLnNsaWNlKC0xKVswXTtcblxuICAgIF9jcmVhdGVQcm90b3R5cGVzKG1hcE9iaik7XG5cbiAgICBfc3RhcnRDbGlja0xpc3RlbmVyKG1hcE9iaiwgdG9wTW9zdFN0YWdlKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0Zvck1hcChjbGlja0Nvb3Jkcykge1xuICAgIHZhciBvYmplY3RBcnJheXMgPSBbXTtcblxuICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgIHZhciBvYmplY3RzID0gc3RhZ2UuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY2xpY2tDb29yZHMueCwgY2xpY2tDb29yZHMueSk7XG4gICAgICBvYmplY3RBcnJheXMgPSBvYmplY3RBcnJheXMuY29uY2F0KG9iamVjdHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdEFycmF5cztcbiAgfVxuICBmdW5jdGlvbiBnZXRPYmplY3RzRm9yTGF5ZXIoY2xpY2tDb29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGlmKGNoaWxkLnggPT09IGNsaWNrQ29vcmRzLnggJiYgY2hpbGQueSA9PT0gY2xpY2tDb29yZHMueSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cbiAgLyoqXG4gICAqIEF0dGFjaGVkIHRoZSBjb3JyZWN0IHByb3RvdHlwZXMgdG8gbWFwLiBJIGRvIG5vdCB0aGluayB3ZSBuZWVkIHRvIG92ZXJyaWRlIGdldE9iamVjdHNVbmRlclBvaW50IGZvciBzdGFnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9jcmVhdGVQcm90b3R5cGVzKG1hcCkge1xuICAgIG1hcC5fX3Byb3RvX18uZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQgPSBnZXRPYmplY3RzRm9yTWFwO1xuICAgIG1hcC5zdGFnZXNbMF0uY2hpbGRyZW5bMF0uX19wcm90b19fLmdldE9iamVjdHNVbmRlclBvaW50ID0gZ2V0T2JqZWN0c0ZvckxheWVyO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnRDbGlja0xpc3RlbmVyKCBtYXAsIGNhbnZhcyApIHtcbiAgICB2YXIgc2luZ2xldG9uVUkgPSBVSSgpO1xuXG4gICAgcmV0dXJuIHNldHVwSGV4YWdvbkNsaWNrKG1hcCwgY2FudmFzLCBzaW5nbGV0b25VSS5zaG93U2VsZWN0aW9ucyk7XG4gIH1cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwKSB7XG4gIHZhciBzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB2YXIgY29sb3IgPSBcIiM0NDQ0NDRcIjtcbiAgdmFyIHBvaW50U2l6ZSA9IDA7XG5cbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxuICAgIC5kcmF3UG9seVN0YXIgKCBjb29yZHMueCwgY29vcmRzLnksIHJhZGl1cywgNiwgcG9pbnRTaXplLCBhbmdsZSApO1xuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmKGNvb3JkaW5hdGVJbmRleGVzLnggPCAwICYmIGNvb3JkaW5hdGVJbmRleGVzLnggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY2xpY2sgb3V0c2lkZSBvZiB0aGUgaGV4YWdvbiBhcmVhXCIpO1xuICB9XG4gIGNlbnRlckNvb3JkcyA9IHtcbiAgICB4OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnggKiBoZXhhU2l6ZS54ICsgaGFsZkhleGFTaXplLngpLFxuICAgIHk6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueSAqIGhleGFTaXplLnkgKyBoYWxmSGV4YVNpemUueSlcbiAgfTtcblxuICByZXR1cm4gY2VudGVyQ29vcmRzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjYWxjSGVpZ2h0OiBjYWxjSGVpZ2h0LFxuICBjYWxjU2lkZTogY2FsY1NpZGUsXG4gIHNldENlbGxCeVBvaW50OiBzZXRDZWxsQnlQb2ludCxcbiAgZ2V0SGV4YVNpemU6IGdldEhleGFTaXplLFxuICB0b0hleGFDZW50ZXJDb29yZDogdG9IZXhhQ2VudGVyQ29vcmRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgbGV0IG1hcF9tb3ZlID0gKGZ1bmN0aW9uIG1hcF9tb3ZlKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgLyogRnVuY3Rpb24gZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgdGhlIG1vdXNlIG9mZnNldC4gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgYm90dG9tICovXG4gIHZhciBvZmZzZXRDb29yZHMgPSBfb2Zmc2V0Q29vcmRzKCk7XG5cbiAgLyogPT09PT0gRm9yIHRlc3RpbmcgPT09PT0gKi9cbiAgc2NvcGUuX3N0YXJ0RHJhZ0xpc3RlbmVyID0gX3N0YXJ0RHJhZ0xpc3RlbmVyO1xuXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBcIm1hcF9tb3ZlXCI7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXBPYmopIHtcbiAgICAvKiBXZSB0YWtlIHRoZSB0b3AtbW9zdCBzdGFnZSBvbiB0aGUgbWFwIGFuZCBhZGQgdGhlIGRyYWcgZXZlbnQgbGlzdGVuZXIgdG8gaXQgKi9cbiAgICB2YXIgdG9wTW9zdFN0YWdlID0gbWFwT2JqLnN0YWdlcy5zbGljZSgtMSlbMF07XG5cbiAgICBfY3JlYXRlUHJvdG90eXBlcyhtYXBPYmopO1xuXG4gICAgdG9wTW9zdFN0YWdlLm9uKFwic3RhZ2Vtb3VzZWRvd25cIiwgX3N0YXJ0RHJhZ0xpc3RlbmVyKHRvcE1vc3RTdGFnZSwgbWFwT2JqKSk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnREcmFnTGlzdGVuZXIoIHRvcE1vc3RTdGFnZSwgbWFwICkge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgeDogZS5zdGFnZVgsXG4gICAgICAgICAgeTogZS5zdGFnZVlcbiAgICAgICAgfSk7XG4gICAgICAgIC8qIFdlIHRha2UgYWxsIHRoZSBldmVudGxpc3RlbmVycyB1bmJpbmRpbmdzIHRvIHRoaXMgYXJyYXksIHNvIHdlIGNhbiB1bmJpbmQgdGhlbSB3aGVuIHRoZSBtb3VzZSBpcyB1cCAqL1xuICAgICAgICB2YXIgbW92ZUxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgIG1vdmVMaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBcImFjdGlvblwiOiBcInN0YWdlbW91c2Vtb3ZlXCIsXG4gICAgICAgICAgICBcImNiXCI6IHRvcE1vc3RTdGFnZS5vbihcInN0YWdlbW91c2Vtb3ZlXCIsIF9kcmFnTGlzdGVuZXIuY2FsbCh0b3BNb3N0U3RhZ2UsIG1hcCkpXG4gICAgICAgIH0pO1xuICAgICAgICBtb3ZlTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJzdGFnZW1vdXNlbW92ZVwiLFxuICAgICAgICAgICAgXCJjYlwiOiB0b3BNb3N0U3RhZ2Uub24oXCJzdGFnZW1vdXNlbW92ZVwiLGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdmVkXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW92ZUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwic3RhZ2Vtb3VzZXVwXCIsXG4gICAgICAgICAgICBcImNiXCI6IHRvcE1vc3RTdGFnZS5vbihcInN0YWdlbW91c2V1cFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgbW92ZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGNiRGF0YSkge1xuICAgICAgICAgICAgICAgICAgdG9wTW9zdFN0YWdlLm9mZihjYkRhdGEuYWN0aW9uLCBjYkRhdGEuY2IpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgLyogRXZlbnQgbGlzdGVuZXJzIGFyZSBpbiB0aGVpciBzZXBhcmF0ZSBmaWxlOyBldmVudExpc3RlbmVycy5qcyAqL1xuICBmdW5jdGlvbiBfZHJhZ0xpc3RlbmVyKG1hcCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZHJhZ2dlcihlKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgIHZhciBtb3ZlZCA9IHtcbiAgICAgICAgICB4OiBlLnN0YWdlWCAtIG9mZnNldC54LFxuICAgICAgICAgIHk6IGUuc3RhZ2VZIC0gb2Zmc2V0LnlcbiAgICAgICAgfTtcblxuICAgICAgICBtYXAubW92ZU1hcChtb3ZlZCk7XG5cbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgeDogZS5zdGFnZVgsXG4gICAgICAgICAgeTogZS5zdGFnZVlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogVGhlIG1vdXNlIGhhcyBiZWVuIG1vdmVkIGFmdGVyIHByZXNzaW5nLiBUaGlzIHByZXZlbnQgdGhlIGNsaWNrXG4gICAgICAgICAgZXZlbnQgdG8gZmlyZSBhdCB0aGUgc2FtZSB0aW1lIHdpdGggdGhlIG1vdXNlRG93biAvIGRyYWdnaW5nIGV2ZW50XG4gICAgICAgICovXG4gICAgICAgIC8vbWFwLm1vdXNlTW92ZWQoIHRydWUgKTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgLyogPT09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09PSAqL1xuICAvKipcbiAgICogQWRkcyBmdW5jdGlvbiBmb3IgdGhlIG1hcCBvYmplY3QgYW5kIHByb3RvdHlwZS1mdW5jdGlvbnMgZm9yIGl0J3Mgc3RhZ2VzIGFuZCBsYXllcnMuIENyZWF0ZXMgbW92ZU1hcCBmdW5jdGlvblxuICAgKiBmb3IgdGhlIGdpdmVuIG1hcCBvYmplY3QgYW5kIG1vdmVTdGFnZSAmIG1vdmVMYXllciAtIHByb3RvdHlwZSBmdW5jdGlvbnMgZm9yIHRoZSBzdGFnZXMgYW5kIGxheWVycyBpbiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZVByb3RvdHlwZXMgKG1hcE9iaikge1xuICAgIGlmKG1hcE9iai5zdGFnZXMgJiYgbWFwT2JqLnN0YWdlc1swXSkge1xuICAgICAgbWFwT2JqLnN0YWdlc1swXS5hZGRQcm90b3R5cGUoXCJtb3ZlU3RhZ2VcIiwgX21vdmVTdGFnZShtYXBPYmopKTtcbiAgICB9XG5cbiAgICAvKiBOb3QgYSBwcm90b3R5cGUgZnVuY3Rpb24sIGJ1dCByZWd1bGFyICovXG4gICAgbWFwT2JqLm1vdmVNYXAgPSBfbW92ZU1hcDtcblxuICAgIC8qKlxuICAgICAqIHByb3RvdHlwZSBmdW5jdGlvbiBmb3IgbW92aW5nIG1hcCAvIGFsbCBzdGFnZXMgaW4gbWFwLCB0aGF0IGFyZSBtb3ZhYmxlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvb3JkcyBGb3JtYXQgeyB4OiBOdW1iZXIsIHk6IE51bWJlciB9XG4gICAgICogQHJldHVybiB0aGlzIGZvciBjaGFpbmluZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tb3ZlTWFwKGNvb3Jkcykge1xuICAgICAgdGhpcy5zdGFnZXMuZm9yRWFjaChmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICBpZihzdGFnZS5tb3ZhYmxlKSB7XG4gICAgICAgICAgc3RhZ2UubW92ZVN0YWdlKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogcHJvdG90eXBlIGZ1bmN0aW9uIGZvciBtb3Zpbmcgc3RhZ2UgLyBzdGFnZXMgYWxsIGxheWVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHMgRm9ybWF0IHsgeDogTnVtYmVyLCB5OiBOdW1iZXIgfVxuICAgICAqIEByZXR1cm4gdGhpcyBmb3IgY2hhaW5pbmdcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbW92ZVN0YWdlIChtYXApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb29yZHMpIHtcbiAgICAgICAgbGV0IHByZWNpc2VDb29yZHMgPSB7XG4gICAgICAgICAgeDogdGhpcy54ICsgY29vcmRzLngsXG4gICAgICAgICAgeTogdGhpcy55ICsgY29vcmRzLnlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnggPSBwcmVjaXNlQ29vcmRzLng7XG4gICAgICAgIHRoaXMueSA9IHByZWNpc2VDb29yZHMueTtcblxuICAgICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgICAgICBtYXAuZHJhd01hcCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcHJvdG90eXBlIGZ1bmN0aW9uIGZvciBtb3ZpbmcgbGF5ZXIsIGlmIGl0IGlzIG1vdmFibGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRzIEZvcm1hdCB7IHg6IE51bWJlciwgeTogTnVtYmVyIH1cbiAgICAgKiBAcmV0dXJuIHRoaXMgZm9yIGNoYWluaW5nXG4gICAgICovXG4gICAgIC8qXG4gICAgZnVuY3Rpb24gX21vdmVMYXllcihjb29yZHMpIHtcbiAgICAgIGlmKHRoaXMubW92YWJsZSkge1xuICAgICAgICB0aGlzLnggPSBjb29yZHMueDtcbiAgICAgICAgdGhpcy55ID0gY29vcmRzLnk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0qL1xuICB9XG5cbiAgZnVuY3Rpb24gX29mZnNldENvb3JkcygpIHtcbiAgICB2YXIgc2NvcGUgPSB7fTtcbiAgICB2YXIgb2Zmc2V0Q29vcmRzO1xuXG4gICAgc2NvcGUuc2V0T2Zmc2V0ID0gZnVuY3Rpb24gc2V0T2Zmc2V0KGNvb3Jkcykge1xuICAgICAgcmV0dXJuIG9mZnNldENvb3JkcyA9IGNvb3JkcztcbiAgICB9O1xuICAgIHNjb3BlLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCgpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHM7XG4gICAgfTtcblxuICAgIHJldHVybiBzY29wZTtcbiAgfTtcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vY29yZS9PYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlIHtcbiAgY29uc3RydWN0KGNvb3JkcywgZGF0YSwgc3ByaXRlU2hlZXQsIGN1cnJGcmFtZU51bWJlcikge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KGNvb3JkcywgZGF0YSwgc3ByaXRlU2hlZXQsIGN1cnJGcmFtZU51bWJlcik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0XCI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9iamVjdF9zcHJpdGUgfSBmcm9tICcuLi9jb3JlL09iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3QoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzXCI7XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbkNyZWF0aW5nIHRoZSBjcmVhdGVqc1F1ZXVlLW9iamVjdCBmcm9tIHNwcml0ZXNoZWV0LiBUaGlzIHByZWxvYWRzIGFzc2VzdHMuXG5cbkByZXF1aXJlcyBjcmVhdGVqcyBDcmVhdGVqcyBsaWJyYXJ5IC8gZnJhbWV3b3JrIG9iamVjdCAtIGdsb2JhbCBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBiYXNlUGF0aFxuQHRvZG8gTWFrZSBhIGxvYWRlciBncmFwaGljcyAvIG5vdGlmaWVyIHdoZW4gbG9hZGluZyBhc3NldHMgdXNpbmcgcHJlbG9hZGVyLlxuXG5Vc2FnZTogcHJlbG9hZC5nZW5lcmF0ZShcImh0dHA6Ly9wYXRoLmZpL3BhdGhcIikub25Db21wbGV0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7fSk7XG4qL1xuZXhwb3J0IGNsYXNzIHByZWxvYWQgZXh0ZW5kcyBjcmVhdGVqcy5Mb2FkUXVldWUge1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICB9XG4gIHJlc29sdmVPbkNvbXBsZXRlICgpIHtcbiAgICB2YXIgYmluZGVkT25Db21wbGV0ZSA9IF9vbkNvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShiaW5kZWRPbkNvbXBsZXRlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gX29uQ29tcGxldGUocmVzb2x2ZSkge1xuICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGxvYWRNYW5pZmVzdCAoLi4uYXJncykge1xuICAgIHN1cGVyLmxvYWRNYW5pZmVzdCguLi5hcmdzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldEVycm9ySGFuZGxlciAoZXJyb3JDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBlcnJvckNCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFByb2dyZXNzSGFuZGxlciAocHJvZ3Jlc3NDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBwcm9ncmVzc0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFjdGl2YXRlU291bmQgKCkge1xuICAgIHRoaXMuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIH1cbn0iLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiA1MDAsIHk6IDIwMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX21vdmVcIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhZ2VzOiBbe1xuICAgIHR5cGU6IFwiTWFwX3N0YWdlXCIsXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgZWxlbWVudDogXCIjbWFwQ2FudmFzXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgIGNvb3JkOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgc3BlY2lhbHM6IFt7XG4gICAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJPYmplY3RfdGVycmFpbl9oZXhhXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIHR5cGVJbWFnZURhdGE6IFwidGVycmFpbkJhc2VcIixcbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjEsXG4gICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICAgIFwieFwiOlwiNDFcIixcbiAgICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzdcIixcbiAgICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgICBcInlcIjpcIjE0MFwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9LHtcbiAgICAgIFwidHlwZVwiOiBcIk1hcF9sYXllclwiLFxuICAgICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgICBcIm5hbWVcIjogXCJ1bml0TGF5ZXJcIixcbiAgICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgICB9LFxuICAgICAgXCJvYmplY3RHcm91cHNcIjogW3tcbiAgICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRfaGV4YVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICAgIFwib2JqZWN0c1wiOiBbe1xuICAgICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgICAgXCJjb29yZFwiOiB7XG4gICAgICAgICAgICBcInhcIjogXCI0MVwiLCBcInlcIjogXCI3MFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgXCJzb21lQ3VzdG9tRGF0YVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9XVxuICB9XVxufTsiLCJleHBvcnQgbGV0IHR5cGVEYXRhID0ge1xuICBcImdyYXBoaWNEYXRhXCI6IHtcbiAgICBcImdlbmVyYWxcIjp7XG4gICAgICBcInRlcnJhaW5cIjp7XG4gICAgICAgIFwidGlsZVdpZHRoXCI6ODIsXG4gICAgICAgIFwidGlsZUhlaWdodFwiOjk0XG4gICAgICB9XG4gICAgfSxcbiAgICBcInRlcnJhaW5CYXNlXCI6e1xuICAgICAgXCJpbWFnZXNcIjpcbiAgICAgIFtcIi9hc3NldHMvaW1nL21hcC90ZXN0SGV4YWdvbnMvdGVzdEhleGFnb25TcHJpdGVzaGVldC5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzAsMCw4Miw5NF0sWzgyLDAsODIsOTRdLFsxNjQsMCw4Miw5NF0sWzI0NiwwLDgyLDk0XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6WzgyLDk0XVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw0OF0sWzEsNTAsOTYsNDhdLFsxLDk5LDk2LDQ4XSxbMSwxNDgsOTYsNDhdLFsxLDE5Nyw5Niw0OF0sWzEsMjQ2LDk2LDQ4XSxbMSwyOTUsOTYsNDhdLFsxLDM0NCw5Niw0OF0sWzEsMzkzLDk2LDQ4XVxuICAgICAgXSxcbiAgICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICAgIH0sXG4gICAgXCJkaXRoZXJcIjp7XCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvZGl0aGVyMi5wbmdcIl0sXCJmcmFtZXNcIjpbWzAsMCw5Niw0OF1dLFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XX0sXG4gICAgXCJwcmV0dGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tb3VudGFpbnMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9oaWxscy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4yLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDY2LDAsMCwxOF0sWzEsMSw5Niw0OCwxLC00LDRdLFsxLDE0OCw5Niw0OCwyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJyZXNvdXJjZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL3Jlc291cmNlcy90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzE5NSwxLDk2LDQ4XSxbMzg5LDEsOTYsNDhdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInBsYWNlXCI6e30sXG4gICAgXCJjaXR5XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi9tZWRpZXZhbGNpdGllcy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw3Ml0sWzk4LDEsOTYsNzJdLFsxOTUsMSw5Niw3Ml0sWzI5MiwxLDk2LDcyXSxbMzg5LDEsOTYsNzJdLFs0ODUsMSw5Niw3Ml0sWzU4MiwxLDk2LDcyXSxbNjc5LDEsOTYsNzJdLFs3NzYsMSw5Niw3Ml0sWzg3MywxLDk2LDcyXSxbMSw3NCw5Niw3Ml0sWzk4LDc0LDk2LDcyXSxbMTk1LDc0LDk2LDcyXSxbMjkyLDc0LDk2LDcyXSxbMzg5LDc0LDk2LDcyXSxbNDg1LDc0LDk2LDcyXSxbNTgyLDc0LDk2LDcyXSxbNjc5LDc0LDk2LDcyXSxbNzc2LDc0LDk2LDcyXSxbODczLDc0LDk2LDcyXVxuICAgICAgXVxuICAgIH0sXCJidWlsZGluZ1wiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcIm1vZGlmaWVyXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwidW5pdFwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL3VuaXRzL3Rlc3RIZXhhZ29uVW5pdHMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjp7XCJ3aWR0aFwiOjgyLFwiaGVpZ2h0XCI6OTR9XG4gICAgfVxuICB9LFxuICBcIm9iamVjdERhdGFcIjoge1xuICAgIFwidW5pdFwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwidGFua1wiLFxuICAgICAgICBcImRlc2NcIjpcIlZyb29vbS4uLlwiLFxuICAgICAgICBcImltYWdlXCI6XCIwXCIsXG4gICAgICAgIFwiYXR0XCI6XCJHb29kXCIsXG4gICAgICAgIFwiZGVmXCI6XCJQb29yXCIsXG4gICAgICAgIFwic2llZ2VcIjpcIkRlY2VudFwiLFxuICAgICAgICBcImluaXRpYXRlXCI6XCI5MFwiLFxuICAgICAgICBcIm1vdmVcIjpcIjEwMFwiLFxuICAgICAgICBcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFxuICAgICAgICBcInZpc2lvblwiOlwiMTUwXCIsXG4gICAgICAgIFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgICAgfSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2FycmllclwiLFwiZGVzY1wiOlwiYW5ncnkgYmVlaGl2ZVwiLFwiaW1hZ2VcIjpcIjZcIixcImF0dFwiOlwiMVwiLFwiZGVmXCI6XCIyXCIsXCJzaWVnZVwiOlwiMlwiLFwiaW5pdGlhdGVcIjpcIjExMFwiLFwibW92ZVwiOlwiMTAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMjUwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcInVuaXRcIjp7XG4gICAgICAgICAgICBcIl9lbmVteV9cIjpbe1xuICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICBcIm1vcmFsZVwiOlwic3VmZmVycyBtb3JhbGUgZHJvcFwiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImNhdmFscnlcIixcImRlc2NcIjpcIkdpdmUgbWUgYW4gYXBwbGUhXCIsXCJpbWFnZVwiOlwiMjZcIixcImF0dFwiOlwiM1wiLFwiZGVmXCI6XCIxXCIsXCJzaWVnZVwiOlwiMFwiLFwiaW5pdGlhdGVcIjpcIjUwXCIsXCJtb3ZlXCI6XCIzMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIxMDBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5CYXNlXCI6W3tcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDBcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAxXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIyXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMlwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiM1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDNcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjRcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjVcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSA0XCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI1XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNVwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluXCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJkZXNlcnRcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJ2ZXJ5IGRyeSBsYW5kXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcInBsYWluXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQnVmZmFsbyByb2FtaW5nIGFyZWFcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEyJSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcImltYWdlXCI6XCIyXCIsXCJkZXNjXCI6XCJSb2JpbiBob29kIGxpa2VzIGl0IGhlcmVcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJVbml0XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRlZmVuZFwiOlwiVW5pdCBkZWZlbmQgKzJcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFwiZGVzY1wiOlwiU2liZXJpYSB0ZWFjaGVzIHlvdVwiLFwiaW1hZ2VcIjpcIjZcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcImFyY3RpY1wiLFwiZGVzY1wiOlwiWW91ciBiYWxsIHdpbGwgZnJlZXplIG9mXCIsXCJpbWFnZVwiOlwiN1wiXG4gICAgICAgIH0se1xuICAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcImRlc2NcIjpcIkNyYW5iZXJyaWVzIGFuZCBjbG91ZGJlcnJpZXNcIixcImltYWdlXCI6XCI4XCJcbiAgICAgICAgfV0sXG4gICAgXCJkaXRoZXJcIjpbXG4gICAgICB7XCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9XSxcbiAgICBcInByZXR0aWZpZXJcIjpbe1wiaW1hZ2VcIjpcIjBcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIyNSVcIn0se1wiaW1hZ2VcIjpcIjFcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCI0MCVcIn0se1wiaW1hZ2VcIjpcIjJcIixcInpJbmRleFwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCI2MCVcIn1dLFwicmVzb3VyY2VcIjpbe1wibmFtZVwiOlwiT2FzaXNcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJPYXNpcyBpbiB0aGUgbWlkZGxlIG9mIGRlc2VydCwgb3Igbm90IGF0bS5cIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcImZvb2QgcHJvZHVjdGlvbiA1IC8gd2Vla1wifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJPaWxcIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCbGFjayBnb2xkXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJUaGVyZSBpcyBhIGxvdCBvZiBvaWwgaGVyZVwifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCI0XCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJjaXR5XCI6W3tcIm5hbWVcIjpcIk1lZGlldmFsXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjBcIixcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiTWVkaWV2YWwyXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjFcIixcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwicGxhY2VcIjpbXSxcImJ1aWxkaW5nXCI6W3tcIm5hbWVcIjpcIkJhcnJhY2tzXCIsXCJpbWFnZVwiOlwiMFwiLFwidG9vbHRpcFwiOlwiRW5hYmxlcyB0cm9vcCByZWNydWl0bWVudFwifSx7XCJuYW1lXCI6XCJGYWN0b3J5XCIsXCJpbWFnZVwiOlwiMVwiLFwidG9vbHRpcFwiOlwiUHJvZHVjZXMgd2VhcG9ucnlcIn1dLFwiZ292ZXJubWVudFwiOlt7XCJuYW1lXCI6XCJEZW1vY3JhenlcIixcImRlc2NyaXB0aW9uXCI6XCJ3ZWxsIGl0J3MgYSBkZW1vY3JhenkgOilcIixcInRvb2x0aXBcIjpcIkdpdmVzICsyMCUgaGFwcGluZXNzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlswLDFdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJoYXBwaW5lc3NcIjpcIjIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDb21tdW5pc21cIixcImRlc2NyaXB0aW9uXCI6XCJZb3Uga25vdyB0aGUgb25lIHVzZWQgaW4gdGhlIGdyZWF0IFVTU1IgYW5kIGluc2lkZSB0aGUgZ3JlYXQgZmlyZXdhbGwgb2YgQ2hpbmFcIixcInRvb2x0aXBcIjpcIkdpdmVzIHByb2R1Y3Rpb24gYm9udXNlc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMiwzXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e319XX19LFwiQ2l0eVwiOntcImJ1aWxkaW5nXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCIyMCVcIn19XX19fX1dLFwicG9saXRpY3NcIjp7XCJ0YXhSYXRlXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiY29ycnVwdGlvblwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImFsaWdubWVudFwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImhhcHBpbmVzc1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInJldm9sdFJpc2tcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJ1bml0eVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcIm5hdFZhbHVlXCI6W3tcIm5hbWVcIjpcIkludGVncml0eVwiLFwidG9vbHRpcFwiOlwiR292ZXJubWVudCBhbmQgcG9wdWxhdGlvbnMgc2hvd3MgaW50ZWdyaXR5IGFuZCB0cnVzdHdvcnRoaW5lc3NcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaW50ZXJuYWxSZWxhdGlvbnNcIjpcIisxMCVcIixcImRpcGxvbWFjeVwiOlwiKzEwJVwiLFwicmV2b2x0IHJpc2tcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiLTIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDYXBpdGFsaXNtXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRpcGxvbWFjeVwiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcIm1vcmFsZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkhhcmR3b3JraW5nXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzEwJVwiLFwiaGFwcGluZXNzXCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJMZWFkZXJzaGlwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzUlXCIsXCJoYXBwaW5lc3NcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJ0cmFkaW5nXCI6XCIrMTAlXCJ9fV19fX19XX19XG59OyJdfQ==
