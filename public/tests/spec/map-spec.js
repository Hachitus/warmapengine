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

window.map = {};

window.testMap = function () {
  var canvasElement = document.getElementById('mapCanvas');

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
    it('exists', function (done) {
      map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(canvasElement, _testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);
      expect(map).toBeDefined();
      done();
    });
    it('are stage properties correct?', function () {
      expect(map._stage[0].name === 'terrainStage').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
      expect(map.getChildNamed('terrainStage').name === 'terrainStage').toBeTruthy();
      expect(typeof map.getChildNamed('terrainStage') === 'object').toBeTruthy();
    });
    it('are layer properties correct?', function () {
      expect(typeof map.getLayerNamed('unitLayer') === 'object').toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
    });
    it('are terrain properties correct?', function () {
      expect(Number(map.getLayerNamed('terrainBaseLayer').children[1].y) === 141, 'y = 141').toBeTruthy();
      expect(map.getLayerNamed('terrainBaseLayer').children.length > 1, 'length > 1').toBeTruthy();
    });
    it('unit properties are correct?', function () {
      expect(Number(map.getLayerNamed('unitLayer').children[0].x) === 82).toBeTruthy();
    });
    it('unit properties are correct', function (done) {
      map.init(undefined, undefined, tickDoneFunc);

      function tickDoneFunc(tickDone) {
        done();
      }

      expect(true).toBeTruthy();
    });
    it('test', function (done) {
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

    it('re-initialize map with plugins', function (done) {
      map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(canvasElement, _testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);
      expect(map).toBeDefined();
      done();
    });

    it('unit properties ok', function (done) {
      try {
        var tickDoneFunc = function (tickDone) {
          done();
        };

        debugger;
        map.init([_componentsMapCoreZoomMap_zoom.map_zoom, _componentsMapCoreMoveMap_drag.map_drag, _componentsMapHexagonsObject_selectObject_select_hexagon.object_select_hexagon], tickDoneFunc);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXAtc3BlYy5lczYuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbG9nZ2VyL2xvZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL2V2ZW50bGlzdGVuZXJzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvc3ByaXRlc2hlZXRMaXN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL3V0aWxzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3pvb20vbWFwX3pvb20uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL2V2ZW50TGlzdGVuZXJzL3NlbGVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvaGV4YWdvbnMvb2JqZWN0L09iamVjdF91bml0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9oZXhhZ29ucy91dGlscy9oZXhhZ29uTWF0aC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvZ2FtZURhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvbWFwRGF0YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2lu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LE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtPQUN4QjtLQUVGLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKOzs7Ozs7QUFBQSxDQUFBOzs7QUNoSkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNVI7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUN2STtLQUNGO0FBQ0QsVUFBTSxFQUFDO0FBQ0wsY0FBUSxFQUFDLENBQUMsNENBQTRDLENBQUM7QUFDdkQsY0FBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDO0tBQ2xDO0dBQ0Y7QUFDRCxjQUFZLEVBQUU7QUFDWixVQUFNLEVBQUMsQ0FBQztBQUNKLFlBQU0sRUFBQyxNQUFNO0FBQ2IsWUFBTSxFQUFDLFdBQVc7QUFDbEIsYUFBTyxFQUFDLEdBQUc7QUFDWCxXQUFLLEVBQUMsTUFBTTtBQUNaLFdBQUssRUFBQyxNQUFNO0FBQ1osYUFBTyxFQUFDLFFBQVE7QUFDaEIsZ0JBQVUsRUFBQyxJQUFJO0FBQ2YsWUFBTSxFQUFDLEtBQUs7QUFDWixjQUFRLEVBQUMsU0FBUztBQUNsQixjQUFRLEVBQUMsS0FBSztBQUNkLHFCQUFlLEVBQUMsSUFBSTtLQUNyQixFQUFDO0FBQ0EsWUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUMsSUFBSTtBQUN4SyxpQkFBVyxFQUFDO0FBQ1YsY0FBTSxFQUFDO0FBQ0wsbUJBQVMsRUFBQyxDQUFDO0FBQ1Qsa0JBQU0sRUFBQyxjQUFjO0FBQ3JCLHVCQUFXLEVBQUM7QUFDVixzQkFBUSxFQUFDLHFCQUFxQjthQUN2QyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQztBQUNMLFlBQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUMsSUFBSTtLQUMvSyxDQUFDO0FBQ0YsaUJBQWEsRUFBQyxDQUFDO0FBQ1gsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUNwRyxFQUFDO0FBQ0EsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUNwRyxFQUFDO0FBQ0EsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUNwRyxFQUFDO0FBQ0EsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUNwRyxFQUFDO0FBQ0EsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUNwRyxFQUFDO0FBQ0EsYUFBTyxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLDhCQUE4QjtLQUN0RyxDQUFDO0FBQ0YsYUFBUyxFQUFDLENBQUM7QUFDUCxZQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGVBQWU7QUFDbEQsaUJBQVcsRUFBQztBQUNWLGNBQU0sRUFBQztBQUNMLG9CQUFVLEVBQUMsQ0FBQztBQUNSLGtCQUFNLEVBQUMsY0FBYztBQUNyQix1QkFBVyxFQUFDO0FBQ1YsMEJBQVksRUFBQyw2QkFBNkI7YUFDckQsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUM7QUFDTCxZQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHNCQUFzQjtBQUN4RCxpQkFBVyxFQUFDO0FBQ1YsY0FBTSxFQUFDO0FBQ0wsb0JBQVUsRUFBQyxDQUFDO0FBQ1Isa0JBQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDO0FBQ2hDLDBCQUFZLEVBQUMsK0JBQStCO2FBQ3ZELEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDO0FBQ0wsWUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQywwQkFBMEI7QUFDN0QsaUJBQVcsRUFBQztBQUNWLGNBQU0sRUFBQztBQUNMLG9CQUFVLEVBQUMsQ0FBQztBQUNSLGtCQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxnQkFBZ0I7YUFDckUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUM7QUFDSCxZQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsRUFBQyxPQUFPLEVBQUMsR0FBRztLQUN6RCxFQUFDO0FBQ0EsWUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUc7S0FDOUQsRUFBQztBQUNBLFlBQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBQyxHQUFHO0tBQ2pFLENBQUM7QUFDTixZQUFRLEVBQUMsQ0FDUCxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLENBQUM7QUFDcEcsZ0JBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLDRDQUE0QyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsMEJBQTBCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQywwQkFBMEIsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnRkFBZ0YsRUFBQyxTQUFTLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0VBQWdFLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDbjhILENBQUM7UUE5SFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL2hvcml6b250YWxIZXhhRmFjdG9yeSc7XG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YSc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhJztcbmltcG9ydCB7IHByZWxvYWQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3ByZWxvYWRpbmcvcHJlbG9hZGluZyc7XG5cbi8qID09PT09IEltcG9ydCBwbHVnaW5zID09PT09ICovXG5pbXBvcnQgeyBtYXBfZHJhZyB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWdcIjtcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAvY29yZS96b29tL21hcF96b29tJztcbmltcG9ydCB7IG9iamVjdF9zZWxlY3RfaGV4YWdvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uJztcblxud2luZG93Lm1hcCA9IHt9O1xuXG53aW5kb3cudGVzdE1hcCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwQ2FudmFzXCIpO1xuXG4gIGRlc2NyaWJlKFwicHJlbG9hZGVyID0+IFwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgdmFyIHJ1bldoZW5Db21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgaXQoXCI9PiBleGlzdHNcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChwcmVsb2FkKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCI9PiBwcmVsb2FkZXIgY29tcGxldGVzXCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgcnVuV2hlbkNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUoaSA8IDEwMDAwMDApIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgaSArIGkgKyAyICsgXCJ5XCI7XG4gICAgICAgIH1cbiAgICAgICAgZXhwZWN0KHRydWUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfTtcblxuICAgICAgbGV0IHByZWwgPSBuZXcgcHJlbG9hZCggZmFsc2UgKTtcbiAgICAgIHByZWwuc2V0RXJyb3JIYW5kbGVyKCBwcmVsb2FkRXJyb3JIYW5kbGVyICk7XG4gICAgICAgIC8vLnNldFByb2dyZXNzSGFuZGxlciggcHJvZ3Jlc3NIYW5kbGVyIClcbiAgICAgIHByZWwubG9hZE1hbmlmZXN0KFsge1xuICAgICAgICBpZDogXCJ0ZXJyYWluX3Nwcml0ZXNoZWV0XCIsXG4gICAgICAgIHNyYzpcImh0dHA6Ly93YXJtYXBlbmdpbmUubGV2ZWw3LmZpL2Fzc2V0cy9pbWcvbWFwL2NvbGxlY3Rpb24ucG5nXCJcbiAgICAgIH0gXSk7XG4gICAgICBwcmVsLnJlc29sdmVPbkNvbXBsZXRlKClcbiAgICAgICAgLnRoZW4ocnVuV2hlbkNvbXBsZXRlKTtcblxuICAgIH0pO1xuXG4gICAgICAvKiA9PT09PT0gcHJpdmF0ZSBmdW5jdGlvbnMsIG9yIHRvIGJlIG1vdmVkIGVsc2V3aGVyZSA9PT09PT0gKi9cbiAgICBmdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJQUkVMT0FERVIgRVJST1JcIiwgZXJyICk7XG4gICAgfVxuXG5cblxuICAvKlxuICAxLiBEYXRhdCB5aGRlc3PDpCBww7Z0a8O2c3PDpCwga3V0ZW4gdMOkw6QgbnlreWluZW4gdGVzdGktZGF0YS4gRWxpIG5vaSB0ZXN0aXQgZGF0YXQgdGllZG9zdG9vbiBqYSBwaXTDpMOkIG11dXR0YWEgb2lrZWFhbiBtdW90b29uIVxuXG4gIFlvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuICBpcyBhbm90aGVyIGNsYXNzIC8gbW9kdWxlIHRoYXQgaGFuZGxlcyB0aGUgdHJhbnNmb3JtYXRpb24gYW5kIHlvdSBkZWZpbmUgYSBnb29kIHNldCBvZiBwcmluY2lwbGUgaG93IGl0J3MgZG9uZS4gRGF0YSBpbiB0aGlzOlxuICBcIntcbiAgICBcIm9ialR5cGVcIjoyLFxuICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjNcIixcbiAgICBcImNvb3JkXCI6e1wieFwiOjAsXCJ5XCI6MH1cbiAgfVwiXG4gIFdoYXQgZG8gd2UgZG8gd2l0aCB0aGUgX2lkIGFuZCBzaG91bGQgdGhhdCBiZSByZXBsYWNlZCB3aXRoIGFjdHVhbCBkYXRhLCB3aGVuIHdlIGluc3RhbnRpYXRlIHRoZSBvYmplY3RzLlxuXG4gIEFsd2F5cyByZXF1ZXN0IGRhdGEgZnJvbSBiYWNrZW5kIHdpdGggZ2FtZUlEIGFuZCB0dXJuLCBsaWtlOiBkb21haW4uZmkvQVBJL21hcERhdGEvODMyOTQ4aGZkanNoOTMvMVxuXG4gIC8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbiAgICBpdChcImV4aXN0c1wiLCBmdW5jdGlvbihkb25lKXtcbiAgICAgIG1hcCA9IGNyZWF0ZU1hcChjYW52YXNFbGVtZW50LCBnYW1lRGF0YSwgbWFwRGF0YSwgdHlwZURhdGEpO1xuICAgICAgZXhwZWN0KG1hcCkudG9CZURlZmluZWQoKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgICBpdChcImFyZSBzdGFnZSBwcm9wZXJ0aWVzIGNvcnJlY3Q/XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QobWFwLl9zdGFnZVswXS5uYW1lID09PSBcInRlcnJhaW5TdGFnZVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikubmFtZSAgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdCh0eXBlb2YgbWFwLmdldENoaWxkTmFtZWQoXCJ0ZXJyYWluU3RhZ2VcIikgPT09IFwib2JqZWN0XCIpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdChcImFyZSBsYXllciBwcm9wZXJ0aWVzIGNvcnJlY3Q/XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QodHlwZW9mIG1hcC5nZXRMYXllck5hbWVkKFwidW5pdExheWVyXCIpID09PSBcIm9iamVjdFwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLnN0YWdlc1swXS5jaGlsZHJlbi5sZW5ndGggPiAwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCJhcmUgdGVycmFpbiBwcm9wZXJ0aWVzIGNvcnJlY3Q/XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInRlcnJhaW5CYXNlTGF5ZXJcIikuY2hpbGRyZW5bMV0ueSApID09PSAxNDEsIFwieSA9IDE0MVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgICBleHBlY3QobWFwLmdldExheWVyTmFtZWQoXCJ0ZXJyYWluQmFzZUxheWVyXCIpLmNoaWxkcmVuLmxlbmd0aCA+IDEsIFwibGVuZ3RoID4gMVwiKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCJ1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3Q/XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ICkgPT09IDgyKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCJ1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICBtYXAuaW5pdCggdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICBmdW5jdGlvbiB0aWNrRG9uZUZ1bmModGlja0RvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG5cblxuICAgIH0pO1xuICAgIGl0KFwidGVzdFwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICB2YXIgdGltZW91dHRlciA9IChmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBtYXAuc3RhZ2VzWzBdLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgICAgICAgIG1hcC5kcmF3TWFwKCk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9O1xuICAgICAgfSkobWFwKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQodGltZW91dHRlciwgNDAwKTtcblxuICAgICAgZXhwZWN0KCB0cnVlICkudG9CZVRydXRoeSgpO1xuICAgIH0pXG5cbiAgICBpdChcInJlLWluaXRpYWxpemUgbWFwIHdpdGggcGx1Z2luc1wiLCBmdW5jdGlvbihkb25lKXtcbiAgICAgIG1hcCA9IGNyZWF0ZU1hcChjYW52YXNFbGVtZW50LCBnYW1lRGF0YSwgbWFwRGF0YSwgdHlwZURhdGEpO1xuICAgICAgZXhwZWN0KG1hcCkudG9CZURlZmluZWQoKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KFwidW5pdCBwcm9wZXJ0aWVzIG9rXCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIG1hcC5pbml0KCBbIG1hcF96b29tLCBtYXBfZHJhZywgb2JqZWN0X3NlbGVjdF9oZXhhZ29uIF0sIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRpY2tEb25lRnVuYyh0aWNrRG9uZSkge1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cGVjdCggdHJ1ZSApLnRvQmVUcnV0aHkoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGUpXG4gICAgICB9XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4vLyBub25lXG5cbi8qIHNvbWUgZnVuY3Rpb25zIHRvIGhlbHAgdGVzdHMgKi8iLCIvKlxuICogSmF2YVNjcmlwdCBNRDUgMS4wLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLypcbiAgICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpIHtcbiAgICAgICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgICovXG4gICAgZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xuICAgICAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgICAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XG4gICAgICAgIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcblxuICAgICAgICB2YXIgaSwgb2xkYSwgb2xkYiwgb2xkYywgb2xkZCxcbiAgICAgICAgICAgIGEgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgICAgIGIgPSAtMjcxNzMzODc5LFxuICAgICAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBvbGRhID0gYTtcbiAgICAgICAgICAgIG9sZGIgPSBiO1xuICAgICAgICAgICAgb2xkYyA9IGM7XG4gICAgICAgICAgICBvbGRkID0gZDtcblxuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsICAxMjM2NTM1MzI5KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCAgNjQzNzE3NzEzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgICAgICAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDUsIC03MDE1NTg2OTEpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sICA5LCAgMzgwMTYwODMpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDUsICA1Njg0NDY0MzgpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sICA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDJdLCAgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNCwgLTM3ODU1OCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA0XSwgMTEsICAxMjcyODkzMzUzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNCwgIDY4MTI3OTE3NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sICAgICAgMTEsIC0zNTg1MzcyMjIpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDZdLCAyMywgIDc2MDI5MTg5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCAgNTMwNzQyNTIwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICA3XSwgMTAsICAxMTI2ODkxNDE1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDYsICAxODczMzEzMzU5KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgICAgICAgICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgICAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgICAgICAgICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYSwgYiwgYywgZF07XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiAzMjsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgb3V0cHV0W2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogODsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweEZGKSA8PCAoaSAlIDMyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgYmtleSA9IHJzdHIyYmlubChrZXkpLFxuICAgICAgICAgICAgaXBhZCA9IFtdLFxuICAgICAgICAgICAgb3BhZCA9IFtdLFxuICAgICAgICAgICAgaGFzaDtcbiAgICAgICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgICAgIGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuICAgICAgICBoYXNoID0gYmlubF9tZDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcbiAgICAgICAgdmFyIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICAgICAgICBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhleF90YWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MEYpICtcbiAgICAgICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICAgKi9cbiAgICBmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICAgKi9cbiAgICBmdW5jdGlvbiByYXdfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYXdfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1KHN0cmluZywga2V5LCByYXcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleF9tZDUoc3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYXdfbWQ1KHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXhfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXdfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZDU7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQubWQ1ID0gbWQ1O1xuICAgIH1cbn0odGhpcykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbk1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcblxuQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuKi9cblxuLyogPT09PT0gM3JkIHBhcnR5IGxpYnJhcnkgaW1wb3J0cyA9PT09PSAqL1xuLy9pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICdzeXN0ZW1qcyc7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW5faGV4YSB9IGZyb20gJy4uL21hcC9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdF9oZXhhIH0gZnJvbSAnLi4vbWFwL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhJztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL21hcC9jb3JlL1VJJztcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL2NvcmUvVUkvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbmxldCBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgT2JqZWN0X3RlcnJhaW46IE9iamVjdF90ZXJyYWluX2hleGEsXG4gIE9iamVjdF91bml0OiBPYmplY3RfdW5pdF9oZXhhXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG4vKlxuQGFyZ3VtZW50IHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbkNvb3JkaW5hdGVzIGFyZSBhbHdheXMgZGVmYXVsdGVkIHRvIDAsMCBpZiBub25lIGFyZSBnaXZlbi5cbntcbiAgbWFwU2l6ZTogY3JlYXRlanMuUmVjdGFuZ2xlLFxuICBwbHVnaW5zVG9BY3RpdmF0ZTogW1xuICAgIFwibWFwL21vdmUvbWFwX21vdmVcIixcbiAgICBcIm1hcC9GT1cvbWFwX0ZPV1wiXG4gIF0sXG4gIHN0YWdlczogW3tcbiAgICB0eXBlOiBcIm1hcC9jb3JlL01hcF9TdGFnZVwiLFxuICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICBuYW1lOiBcInRlcnJhaW5TdGFnZVwiLFxuICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICBsYXllcnM6IFt7XG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dLFxuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdGVycmFpblwiLFxuICAgICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XVxuICAgICAgfV0sXG4gICAgICB0eXBlOiBcIm1hcC9sYXllcnMvTWFwX2xheWVyX3RlcnJhaW5cIixcbiAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c191bml0XCIsXG4gICAgICAgIG5hbWU6IFwiVW5pdFwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY2FudmFzRWxlbWVudCwgZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcChjYW52YXNFbGVtZW50LCB7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogQWN0aXZhdGUgcGx1Z2lucyAqL1xuICAvKiBUaGUgc3lzdGVtIGRvZXMgbm90IHdvcmsgOihcbiAgaWYoZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwICYmIGdhbWVEYXRhLnBsdWdpbnNUb0FjdGl2YXRlLm1hcC5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgZ2FtZURhdGEucGx1Z2luc1RvQWN0aXZhdGUubWFwLm1hcCh4ID0+IFN5c3RlbS5pbXBvcnQoeCkpKVxuICAgICAgLnRoZW4oKFttb2R1bGUxLCBtb2R1bGUyLCBtb2R1bGUzXSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBsdWdpbnMgbG9hZGVkXCIpO1xuICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xuICAgICAgfSk7XG4gIH1cbiAgKi9cblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICB0cnkge1xuICAgICAgdGhpc0xheWVyID0gbWFwLmFkZExheWVyKCBsYXllckRhdGEubmFtZSwgMiwgZmFsc2UsIGxheWVyRGF0YS5jb29yZCApO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtOlwiLCBsYXllckRhdGEudHlwZSwgZS5zdGFjayk7XG4gICAgfVxuXG4gICAgbGF5ZXJEYXRhLm9iamVjdEdyb3Vwcy5mb3JFYWNoKCBvYmplY3RHcm91cCA9PiB7XG4gICAgICBsZXQgc3ByaXRlc2hlZXQ7XG4gICAgICBsZXQgc3ByaXRlc2hlZXRUeXBlID0gb2JqZWN0R3JvdXAudHlwZUltYWdlRGF0YTtcblxuICAgICAgaWYoIXNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggc3ByaXRlc2hlZXRUeXBlLWRhdGFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgIGxldCBzcHJpdGVzaGVldERhdGEgPSB0eXBlRGF0YS5ncmFwaGljRGF0YVtzcHJpdGVzaGVldFR5cGVdO1xuXG4gICAgICAgIHNwcml0ZXNoZWV0ID0gYWxsU3ByaXRlc2hlZXRzLmFkZFNwcml0ZXNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG4gICAgICB9XG5cbiAgICAgIG9iamVjdEdyb3VwLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0ID0+IHtcbiAgICAgICAgbGV0IG9ialR5cGVEYXRhID0gdHlwZURhdGEub2JqZWN0RGF0YVtzcHJpdGVzaGVldFR5cGVdW29iamVjdC5vYmpUeXBlXTtcblxuICAgICAgICBpZighb2JqVHlwZURhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZU51bWJlciA9IG9ialR5cGVEYXRhLmltYWdlO1xuICAgICAgICBsZXQgb2JqRGF0YSA9IHtcbiAgICAgICAgICB0eXBlRGF0YTogb2JqVHlwZURhdGEsXG4gICAgICAgICAgYWN0aXZlRGF0YTogb2JqZWN0LmRhdGFcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5ld09iamVjdCA9IG5ldyBmdW5jdGlvbnNJbk9ialtvYmplY3RHcm91cC50eXBlXSggb2JqZWN0LmNvb3JkLCBvYmpEYXRhLCBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCB7IHJhZGl1czogNDcgfSApO1xuICAgICAgICB0aGlzTGF5ZXIuYWRkQ2hpbGQoIG5ld09iamVjdCApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIG1hcC5tb3ZlTWFwKG1hcERhdGEuc3RhcnRQb2ludCk7XG5cbiAgcmV0dXJuIG1hcDtcblxuLypcbiAgQ3JlYXRlVGVycmFpblN0YWdlXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9iYXNlXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl90ZXJyYWluXG4gICAgX0NyZWF0ZVRlcnJhaW5MYXllcl9kaXRoZXJcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3ByZXR0aWZpZXJcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3Jlc291cmNlXG4gIENyZWF0ZVVuaXRTdGFnZVxuICAgIF9DcmVhdGVVbml0TGF5ZXJfVW5pdFxuICAgIF9DcmVhdGVVbml0TGF5ZXJfQ2l0eVxuICBDcmVhdGVGT1dTdGFnZVxuICBDcmVhdGVEYXRhU3RhZ2VcbiAgQ3JlYXRlVUlTdGFnZVxuICAgIF9DcmVhdGVVSUxheWVyX2Fycm93XG4gICAgX0NyZWF0ZVVJTGF5ZXJfc2VsZWN0aW9uXG4qL1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWJ1ZzogZnVuY3Rpb24oZSwgZXJyb3JUZXh0KSB7XG4gICAgbG9nLmRlYnVnKGVycm9yVGV4dCwgZSk7XG4gIH1cbn07IiwiLyoqIE1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcbiAqXG4gKiBNYXAgaXMgaW5zdGFudGlhdGVkIGFuZCB0aGVuIGluaXRpYWxpemVkIHdpdGggaW5pdC1tZXRob2QuXG4gKlxuICogUGx1Z2lucyBjYW4gYmUgYWRkZWQgd2l0aCBhY3RpdmF0ZVBsdWdpbnMtbWV0aG9kIGJ5IHByb2RpdmluZyBpbml0KG1hcCkgbWV0aG9kIGluIHRoZSBwbHVnaW4uIFBsdWdpbnMgYXJlIGFsd2F5c1xuICogZnVuY3Rpb25zLCBub3Qgb2JqZWN0cyB0aGF0IGFyZSBpbnN0YW50aWF0ZWQuIFBsdWdpbnMgYXJlIHN1cHBvc2VkIHRvIGV4dGVuZCB0aGUgbWFwIG9iamVjdCBvciBhbnl0aGluZyBpbiBpdCB2aWFcbiAqIGl0J3MgcHVibGljIG1ldGhvZHMuXG4gKlxuICogQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiAqIEByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IDNyZCBwYXJ0eSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgcmVzaXplVXRpbHMsIHJlc2l6ZVV0aWxzIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBtYXBfZHJhZyB9IGZyb20gXCIuL21vdmUvbWFwX2RyYWdcIjtcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi96b29tL21hcF96b29tJztcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9ldmVudGxpc3RlbmVycyc7XG5cbnZhciBfZHJhd01hcE9uTmV4dFRpY2sgPSBmYWxzZTtcbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGNsYXNzIE1hcCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0RPTSBDYW52YXMgZWxlbWVudH0gY2FudmFzIC0gQ2FudmFzIHVzZWQgYnkgdGhlIG1hcFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGRpZmZlcmVudCBvcHRpb25zIGZvciB0aGUgbWFwIHRvIGJlIGdpdmVuLlxuICAgKiBAcmV0dXJuIE1hcCBpbnN0YW5jZSAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbnMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5fc3RhZ2UgPSBuZXcgTWFwX3N0YWdlKFwiZGFkZHlTdGFnZVwiLCBjYW52YXMpO1xuICAgIHRoaXMubW9tbXlMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJtb21teUxheWVyXCIsIG9wdGlvbnMudHlwZSwgb3B0aW9ucy5zdWJDb250YWluZXJzLCBvcHRpb25zLnN0YXJ0Q29vcmQpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMubW9tbXlMYXllcik7XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gICAgdGhpcy5hY3RpdmF0ZWRQbHVnaW5zID0gW107XG4gICAgLyogQWN0aXZhdGUgdGhlIG1hcCB6b29tIGFuZCBtYXAgZHJhZyBjb3JlIHBsdWdpbnMgKi9cbiAgICB0aGlzLnBsdWdpbnNUb0FjdGl2YXRlID0gW21hcF96b29tLCBtYXBfZHJhZ107XG4gICAgdGhpcy5tYXBTaXplID0gb3B0aW9ucy5tYXBTaXplIHx8IHsgeDowLCB5OjAgfTtcbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRDQnMgPSB7XG4gICAgICBmdWxsU2l6ZTogcmVzaXplVXRpbHMuc2V0VG9GdWxsU2l6ZShjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSxcbiAgICAgIGZ1bGxzY3JlZW46IHJlc2l6ZVV0aWxzLnRvZ2dsZUZ1bGxTY3JlZW4sXG4gICAgICBzZWxlY3Q6IG51bGwsXG4gICAgICBkcmFnOiBudWxsLFxuICAgICAgem9vbTogbnVsbFxuICAgIH07XG4gICAgdGhpcy5fZnVsbFNpemVGdW5jdGlvbiA9IG51bGw7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyh0aGlzLmV2ZW50Q0JzKTtcbiAgfVxuICAvKiogaW5pdGlhbGl6YXRpb24gbWV0aG9kXG4gICAqIEBwYXJhbSBbQXJyYXldIHBsdWdpbnMgLSBQbHVnaW5zIHRvIGJlIGFjdGl2YXRlZCBmb3IgdGhlIG1hcC4gTm9ybWFsbHkgeW91IHNob3VsZCBnaXZlIHRoZSBwbHVnaW5zIGhlcmUgaW5zdGVhZCBvZlxuICAgKiBzZXBhcmF0ZWx5IHBhc3NpbmcgdGhlbSB0byBhY3RpdmF0ZVBsdWdpbnMgbWV0aG9kXG4gICAqIEBwYXJhbSB7eDogPyB5Oj99IGNvb3JkIC0gU3RhcnRpbmcgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGlja0NCIC0gY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRpY2suIFRpY2sgY2FsbGJhY2sgaXMgaW5pdGlhdGVkIGluIGV2ZXJ5IGZyYW1lLiBTbyBtYXAgZHJhd3MgaGFwcGVuXG4gICAqIGR1cmluZyB0aWNrc1xuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBpbml0KHBsdWdpbnMsIGNvb3JkLCB0aWNrQ0IpIHtcbiAgICBpZiAocGx1Z2lucykge1xuICAgICAgdGhpcy5hY3RpdmF0ZVBsdWdpbnMocGx1Z2lucyk7XG4gICAgfVxuXG4gICAgaWYoY29vcmQpIHtcbiAgICAgIHRoaXMubW9tbXlMYXllci54ID0gY29vcmQueDtcbiAgICAgIHRoaXMubW9tbXlMYXllci55ID0gY29vcmQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgX2RlZmF1bHRUaWNrKHRoaXMpO1xuICAgIHRpY2tDQiAmJiB0aGlzLmN1c3RvbVRpY2tPbih0aWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBkcmF3T25OZXh0VGljaygpIHtcbiAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBnZXRMYXllcnNXaXRoQXR0cmlidXRlcyhhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWdlLmNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihsYXllciA9PiB7XG4gICAgICByZXR1cm4gbGF5ZXJbYXR0cmlidXRlXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhZ2U7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cbiAgLyoqIEFsbCBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQgdG8gTWFwX2xheWVyIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4gY3JlYXRlZCBNYXBfbGF5ZXIgaW5zdGFuY2UgKi9cbiAgYWRkTGF5ZXIobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgTWFwX2xheWVyKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKTtcblxuICAgIHRoaXMubW9tbXlMYXllci5hZGRDaGlsZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwX2xheWVyfSBsYXllciAtIHRoZSBsYXllciBvYmplY3QgdG8gYmUgcmVtb3ZlZCAqL1xuICByZW1vdmVMYXllcihsYXllcikge1xuICAgIHRoaXMubW9tbXlMYXllci5yZW1vdmVDaGlsZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgLyoqIEByZXR1cm4gbGF5ZXIgd2l0aCB0aGUgcGFzc2VkIGxheWVyIG5hbWUgKi9cbiAgZ2V0TGF5ZXJOYW1lZChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubW9tbXlMYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgbW92ZU1hcChjb29yZGluYXRlcykge1xuICAgIHRoaXMubW9tbXlMYXllci5tb3ZlKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgdGhpcy5tYXBNb3ZlZCh0cnVlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBDYWNoZSB0aGUgbWFwLiBUaGlzIHByb3ZpZGVzIHNpZ25pZmljYW50IHBlcmZvcm1hbmNlIGJvb3N0LCB3aGVuIHVzZWQgY29ycmVjdGx5LiBjYWNoZU1hcCBpdGVyYXRlcyB0aHJvdWdoIGFsbCB0aGVcbiAgICogbGF5ZXIgb24gdGhlIG1hcCBhbmQgY2FjaGVzIHRoZSBvbmVzIHRoYXQgcmV0dXJuIHRydWUgZnJvbSBnZXRDYWNoZUVuYWJsZWQtbWV0aG9kLlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgY2FjaGVNYXAoKSB7XG4gICAgaWYodGhpcy5tb21teUxheWVyLmdldENhY2hlRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb21teUxheWVyLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgICAgIGNoaWxkLmNhY2hlKDAsIDAsIHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBpdGVyYXRlcyB0aHJvdWdoIHRoZSBtYXAgbGF5ZXJzIGFuZCByZXR1cm5zIG1hdGNoaW5nIG9iamVjdHMgb24gZ2l2ZW4gY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgbWFwIGNvb3JkaW5hdGUgdW5kZXIgd2hpY2ggd2Ugd2FudCB0byByZXRyaWV2ZSBhbGwgdGhlIG9iamVjdHMuXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoY29vcmQpIHtcbiAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5tb21teUxheWVyLmdldE9iamVjdHNVbmRlclBvaW50KGNvb3JkKTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG4gIC8qKiBSZXNpemUgdGhlIGNhbnZhcyB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIGFyZWEuIFVzZXMgdGhpcy5ldmVudENCcy5mdWxsc2l6ZSBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cbiAgdG9nZ2xlRnVsbFNpemUoKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpO1xuICB9XG4gIC8qKiBUb2dnbGVzIGZ1bGxzY3JlZW4gbW9kZS4gVXNlcyB0aGlzLmV2ZW50Q0JzLmZ1bGxzY3JlZW4gYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXG4gIHRoZSBldmVudGxpc3RlbmVyIGNhbGxiYWNrIHVzZSB0aGlzLmV2ZW50Q0JzICovXG4gIHRvZ2dsZUZ1bGxTY3JlZW4gKCkge1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgfVxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zIGZvciB0aGUgbWFwLiBNdXN0IGJlIGluIGFycmF5IGZvcm1hdDpcbiAgW3tcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lLFxuICAgIGFyZ3M6IFtcbiAgICAgIEZpcnN0IGFyZ3VtZW50LFxuICAgICAgc2Vjb25kIGFyZ3VtZW50LFxuICAgICAgLi4uXG4gICAgXVxuICB9XSAqL1xuICBhY3RpdmF0ZVBsdWdpbnMocGx1Z2luc0FycmF5KSB7XG4gICAgdmFyIGFsbFBsdWdpbnMgPSB0aGlzLnBsdWdpbnNUb0FjdGl2YXRlLmNvbmNhdChwbHVnaW5zQXJyYXkpO1xuXG4gICAgYWxsUGx1Z2lucy5mb3JFYWNoKHBsdWdpblRvVXNlID0+IHtcbiAgICAgIGlmKHRoaXMuYWN0aXZhdGVkUGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gPSBwbHVnaW5Ub1VzZTtcbiAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdLmluaXQodGhpcyk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXSA9IHRydWU7XG4gICAgICAgIHRoaXMucGx1Z2luc1RvQWN0aXZhdGUgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY3VzdG9tVGlja09uKHRpY2tDQikge1xuICAgIGlmICh0aGlzLmFjdGl2ZVRpY2tDQikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgYWxyZWFkeSBleGlzdHMgb25lIHRpY2sgY2FsbGJhY2suIE5lZWQgdG8gcmVtb3ZlIGl0IGZpcnN0LCBiZWZvcmUgc2V0dGluZyB1cCBhIG5ldyBvbmVcIik7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB0aWNrQ0IgfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGN1c3RvbVRpY2tPZmYoKSB7XG4gICAgY3JlYXRlanMuVGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIHRoaXMuYWN0aXZlVGlja0NCKTtcblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyogZ2V0dGVyIGFuZCBzZXR0ZXIgKi9cbiAgbWFwTW92ZWQoeWVzT3JObykge1xuICAgIGlmKHllc09yTm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tYXBJbk1vdmUgPSB5ZXNPck5vO1xuICAgICAgcmV0dXJuIHllc09yTm87XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwSW5Nb3ZlO1xuICB9XG4gIHNldFByb3RvdHlwZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB0aGlzLl9fcHJvdG9fX1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbi8qIFRoaXMgaGFuZGxlcyB0aGUgZGVmYXVsdCBkcmF3aW5nIG9mIHRoZSBtYXAsIHNvIHRoYXQgbWFwIGFsd2F5cyB1cGRhdGVzIHdoZW4gZHJhd09uTmV4dFRpY2sgPT09IHRydWUuIFRoaXMgdGlja1xuY2FsbGJhY2sgaXMgYWx3YXlzIHNldCBhbmQgc2hvdWxkIG5vdCBiZSByZW1vdmVkIG9yIG92ZXJydWxlZCAqL1xuZnVuY3Rpb24gX2RlZmF1bHRUaWNrKG1hcCkge1xuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgX3RpY2tGdW5jKTtcblxuICByZXR1cm4gX3RpY2tGdW5jO1xuXG4gIGZ1bmN0aW9uIF90aWNrRnVuYygpIHtcbiAgICBpZihfZHJhd01hcE9uTmV4dFRpY2sgPT09IHRydWUpIHtcbiAgICAgIF9kcmF3TWFwKG1hcCk7XG4gICAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbi8qIFByaXZhdGUgZnVuY3Rpb24gdG8gZHJhdyB0aGUgbWFwICovXG5mdW5jdGlvbiBfZHJhd01hcChtYXApIHtcbiAgbWFwLl9zdGFnZS51cGRhdGUoKTtcblxuICByZXR1cm4gbWFwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09IENvbnN0YW50cyA9PT09PSAqL1xuY29uc3QgVFlQRVMgPSB7XG4gIGp1c3RTdWJDb250YWluZXJzOiAxLFxuICBub1N1YkNvbnRhaW5lcnM6IDIsXG4gIGltYWdlc0luU3ViQ29udGFpbmVyczogM1xufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9sYXllciBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IGNvb3JkID8gKCBjb29yZC54IHx8IDAgKSA6IDA7XG4gICAgdGhpcy55ID0gY29vcmQgPyAoIGNvb3JkLnkgfHwgMCApIDogMDtcbiAgICB0aGlzLnN1cGVyUHJvdG90eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogKCB0eXBlIHx8IFRZUEVTLm5vU3ViQ29udGFpbmVycyApO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy51c2VTdWJjb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJhY3RpdmUgPSBmYWxzZTtcblxuICAgIC8qIENvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgdGhpcy56b29tYWJsZSA9IHRydWU7XG4gIH1cbiAgZ2V0Q2FjaGVFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gIH1cbiAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFByb3RvdHlwZShuYW1lLCBmdW5jdGlvblRvQWRkKSB7XG4gICAgc3VwZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb25Ub0FkZDtcbiAgfVxuICAvKiBvdmVybG9hZGVkIGluaGVyaXRlZCBtZXRob2QgKi9cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZiAoIXRoaXMudXNlU3ViY29udGFpbmVycykge1xuICAgICAgLyogV2UgYWRkIHRoZSBvYmplY3QgdG8gdGhlIENvbnRhaW5lciBkaXJlY3RseS4gV2V0aGVyIGl0IGlzIENvbnRhaW5lciBvciBCaXRtYXAgZXRjLiAqL1xuICAgICAgdGhpc1tmdW5jdGlvblRvVXNlXShvYmplY3QsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLyogV2UgYWRkIHRoZSBvYmplY3QgdG8gdGhlIGNvcnJlY3Qgc3ViQ29udGFpbmVyLiBGb3IgYmV0dGVyIGxvZ2ljIGFuZCBwZXJmb3JtYW5jZSAqL1xuICAgICAgbGV0IGNvcnJlY3RTdWJDb250YWluZXIgPSBfZ2V0Q29ycmVjdENvbnRhaW5lci5jYWxsKHRoaXMsIG9iamVjdC54LCBvYmplY3QueSk7XG4gICAgICBjb3JyZWN0U3ViQ29udGFpbmVyLmFkZENoaWxkKG9iamVjdCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG1vdmUoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5tb3ZhYmxlKSB7XG4gICAgICB0aGlzLnggKz0gY29vcmRpbmF0ZXMueDtcbiAgICAgIHRoaXMueSArPSBjb29yZGluYXRlcy55O1xuICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnVzZVN1YmNvbnRhaW5lcnM7XG4gIH1cbiAgaXNTZXRWaXNpYmxlKCkgeyB9XG4gIHNldFZpc2libGUoKSB7IH1cbiAgc3RhdGljIGdldFR5cGUobmFtZSkge1xuICAgIHJldHVybiBUWVBFU1tuYW1lXTtcbiAgfVxufVxuXG4vKiBUaGUgbm9kZS1lYXNlbCwgbm9yIG1pbmlmaWVkIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBTcHJpdGVTdGFnZSAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovXG4vKlxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5cbmV4cG9ydCBjbGFzcyBNYXBfc3ByaXRlc2hlZXRMYXllciBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIHN1YkNvbnRhaW5lcnMsIHNwcml0ZXNoZWV0KSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuICAgIHRoaXMudHlwZSA9IHN1YkNvbnRhaW5lcnMgPyBUWVBFUy5pbWFnZXNJblN1YkNvbnRhaW5lcnMgOiB0eXBlO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy51c2VTdWJjb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxufVxuKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0Q29ycmVjdENvbnRhaW5lcih4LCB5KSB7XG4gIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gdGhpcy5nZXRPYmplY3RVbmRlclBvaW50KHgsIHkpO1xuXG4gIHJldHVybiBjb3JyZWN0U3ViQ29udGFpbmVyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfc3RhZ2UgZXh0ZW5kcyBjcmVhdGVqcy5TdGFnZSB7XG4gIC8qIFRha2VzIHRoZSBjYW52YXMgZWxlbWVudCBhcyBhcmd1bWVudCAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXMsIHN0YWdlQm91bmRzKSB7XG4gICAgaWYoIWNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1hcF9zdGFnZS5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKVxuICAgIH1cblxuICAgIHN1cGVyKGNhbnZhcyk7XG5cbiAgICBpZihzdGFnZUJvdW5kcykge1xuICAgICAgdGhpcy5zZXRCb3VuZHMoMCwgMCwgc3RhZ2VCb3VuZHMueCwgc3RhZ2VCb3VuZHMueSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdXBlclByb3RvdHlwZSA9IHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG4gICAgLyogQ29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLm1vdmFibGUgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgfVxuICBhZGRQcm90b3R5cGUobmFtZSwgZnVuY3Rpb25Ub0FkZCkge1xuICAgIHN1cGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uVG9BZGQ7XG4gIH1cbiAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGZvciAobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGxldCBjaGlsZDtcblxuICAgICAgaWYgKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qIFRoZSBub2RlLWVhc2VsLCBub3IgbWluaWZpZWQgZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIFNwcml0ZVN0YWdlIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cblxuXG4vKlxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5pbXBvcnQgU3ByaXRlU3RhZ2UgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVTdGFnZSc7XG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZVN0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlU3RhZ2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG5cbiAgICAgICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gICAgfVxuICAgIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgICAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICAgIGlmKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoaXMgY2xhc3MgbmVlZHMgdG8gYmUgZ29uZSB0aHJvdWdoIGNhcmVmdWxseSwgaXQgaGFzIGJlZW4gY29waWVkIGZyb20gYW4gb2xkZXIgdmVyc2lvbiBzdHJhaWdodC4gVGhlIHZlcnNpb24gd2FzIEVTNVxuQHBhcmFtIHtjcmVhdGVqcy5Qb2ludH0gY29vcmRzIC0gdGhlIGNvb3JkaW5hdGUgd2hlcmUgdGhlIG9iamVjdCBpcyBsb2NhdGVkIGF0XG5AcGFyYW0ge30gZGF0YSAtIG9iamVjdHMgZGF0YSwgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGdhbWUuIEl0IHdpbGwgbm90IGFjdHVhbGx5IGJlIG1haW5seSB1c2VkIGluIGdyYXBoaWNhbFxuYnV0IHJhdGhlciB0aGluZ3MgbGlrZSB1bml0LWRhdGEgYW5kIGNpdHktZGF0YSBwcmVzZW50YXRpb25zIGV0Yy5cbkBwYXJhbSB7Y3JlYXRlanMuU3ByaXRlU2hlZXR9IHNwcml0ZVNoZWV0XG5AcGFyYW0ge0ludF0gY3VyckZyYW1lTnVtYmVyIC0gdGhlIGN1cnJlbnQgZnJhbWVzIG51bWJlci4gVGhpcyBpcyBiYXNpY2FsbHkgdGhlIGluaXRpYWwgaW1hZ2UsIHdlIGNhbiBjaGFuZ2UgaXQgbGF0ZXJcbmZvciBhbmltYXRpb24gb3Igc3VjaFxuXG5BbGwgb2YgdGhlIG9iamVjdHMgbmVlZCB0byBoYXZlIHNhbWUgYXJndW1lbnRBUEkgZm9yIGNyZWF0aW5nIG9iamVjdHM6IGNvb3JkcywgZGF0YSwgaW1hZ2VEYXRhXG4qL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcImdlbmVyYWwgT2JqZWN0c19zcHJpdGVfXCIgKyB0aGlzLmlkO1xuXG4gICAgLyogU2V0IGRhdGEgZm9yIHRoZSBvYmplY3QgbmV4dCAqL1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwge307XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBjdXJyZW50RnJhbWVOdW1iZXI7XG5cbiAgICAvKiBFeGVjdXRlIGluaXRpYWwgZHJhdyBmdW5jdGlvbiAqL1xuICAgIHRoaXMuaW5uZXJEcmF3KGNvb3Jkcy54LCBjb29yZHMueSk7XG5cbiAgICAvKiBvcHRpbWl6YXRpb25zICovXG4gICAgdGhpcy5zaGFkb3cgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBTaG91bGQgYmUgZW5hYmxlZCwgaWYgdGhlIGxheWVyIGlzIGJlaW5nIGludGVyYWN0ZWQgd2l0aC4gTGlrZSB1bml0IGxheWVyLiBUaGlzIHdheSB3ZSBjYW4gdXNlIGN1cnNvciBwb2ludGVyIGV0Yy5cbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIEZPUiBERUJVR0dJTkcgQU5EIFNFRUlORyBUSEFUIExJU1RFTkVSUyBBUkUgQVRUQUNIRUQ6XG4gICAgLy90aGlzLndpbGxUcmlnZ2VyXG4gIH1cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qIERyYXdpbmcgdGhlIG9iamVjdCB3aXRoIGNyZWF0ZWpzLW1ldGhvZHMgKi9cbiAgaW5uZXJEcmF3KHgsIHkpIHtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCB0aGlzLmN1cnJGcmFtZU51bWJlciApO1xuICAgIGNvbnNvbGUubG9nKFwiSEFBQVwiKVxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICAvKiBUaGUgbW91c2UgY2hlY2sgaGFzIGJlZW4gZW5hYmxlZCBvbiBoaWdoZXIgdGllciwgc28gbm8gbmVlZCBmb3IgdGhpc1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7ICovXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkcmF3TmV3RnJhbWUoeCwgeSwgbmV3RnJhbWVOdW1iZXIpIHtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IG5ld0ZyYW1lTnVtYmVyO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJEcmF3KHgsIHkpO1xuICB9XG4gIC8qIER1bm5vIGlmIHdlIG5lZWQgdGhpcyBhbmQgc28gb24uIFRoaXMgd2FzIGluIHRoZSBvbGQgdmVyc2lvbiAqL1xuICBnbG9iYWxDb29yZHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE51bWJlciggdGhpcy54ICsgdGhpcy5wYXJlbnQueCApLFxuICAgICAgeTogTnVtYmVyKCB0aGlzLnkgKyB0aGlzLnBhcmVudC55IClcbiAgICB9O1xuICB9XG4gIGdldEJvdW5kc0Zyb21GcmFtZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3ByaXRlU2hlZXQuZ2V0RnJhbWVCb3VuZHMoIHRoaXMuY3VycmVudEZyYW1lICk7XG4gIH1cbn0iLCIvKipcbiAgTWFpbiBjbGFzcyBmb3Igc2hvd2luZyBVSSBvbiB0aGUgbWFwLiBMaWtlIHVuaXQgc2VsZWN0aW9ucyBhbmQgc3VjaC4gSGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBzaG93aW5nIG9mZi1tYXAgZGF0YS5cbiAgR29vZCBleGFtcGxlcyBmb3Igd2hhdCB0aGlzIHNob3dzIGFyZTogc2VsZWN0ZWQgdW5pdHMtbGlzdCwgc2VsZWN0aW9uIGhpZ2hsaWdodCAobGlrZSBhIGNpcmNsZSBvbiB0aGUgc2VsZWN0ZWQgdW5pdCkgYW5kXG4gIGJyaW5naW5nIHRoZSB1bml0IG9uIHRvcCBpbiB0aGUgbWFwLlxuKi9cblxuLyogPT09PT09IDNyZCBwYXJ0eSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzY29wZTtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJIChnaXZlblVJVGhlbWUsIGdpdmVuTWFwKSB7XG4gIC8qIFRoaXMgaXMgYSBzaW5nbGV0b24gY2xhc3MsIHNvIGlmIGFscmVhZHkgaW5zdGFudGlhdGVkIHJldHVybiBzY29wZSAqL1xuICBpZiAoc2NvcGUpIHtcbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICBpZiAoIWdpdmVuVUlUaGVtZSB8fCAhZ2l2ZW5NYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSS1tb2R1bGUgcmVxdWlyZXMgVUlUaGVtZSBhbmQgbWFwT2JqXCIpO1xuICB9XG5cbiAgdmFyIG1hcCA9IGdpdmVuTWFwO1xuICB2YXIgVUlUaGVtZSA9IGdpdmVuVUlUaGVtZTtcbiAgc2NvcGUgPSB7fTtcblxuICBzY29wZS5zaG93U2VsZWN0aW9ucyA9IGZ1bmN0aW9uIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcbiAgICByZXR1cm4gVUlUaGVtZS5zaG93U2VsZWN0aW9ucyhvYmplY3RzKTtcbiAgfTtcbiAgc2NvcGUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QgPSBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiLyoqXG4gIFRoZSBzaW1wbGVzdCBkZWZhdWx0IFVJIGltcGxlbWVudGF0aW9uLiBIb2xkczpcbiAgLSBTZWxlY3Rpb24gaGlnaGxpZ2h0IG9mIG9iamVjdFxuICAtIFNlbGVjdGlvbiBsaXN0IG9mIHVuaXRzIGF0IHRoZSBoZXhhZ29uXG4qL1xuXG4vKiA9PT09PT0gM3JkIHBhcnR5IGltcG9ydHMgPT09PT09ICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIFVJX2RlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcihtb2RhbCwgc3R5bGVzKSB7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGlhbG9nXCIpWzBdO1xuICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzIHx8IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjBGMEYwXCJcbiAgICB9O1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMgPSBfRE9NRWxlbWVudHNUb0FycmF5KHRoaXMubW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX2Nsb3NlXCIpKTtcbiAgfVxuICBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgaWYgKG9iamVjdHMgJiYgb2JqZWN0cy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwib2JqZWN0czo8YnI+XCI7XG4gICAgICBvYmplY3RzLm1hcCggb2JqZWN0ID0+IHtcbiAgICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0LmRhdGEudHlwZURhdGEubmFtZSArIFwiPGJyPlwiO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwiU0VMRUNURUQ6PGJyPlwiO1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0c1swXS5kYXRhLnR5cGVEYXRhLm5hbWU7XG4gICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuY2xvc2luZ0VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgX2FjdGl2YXRlQ2xvc2luZ0VsZW1lbnQoIGVsZW1lbnQsIHNlbGYubW9kYWwuY2xvc2UuYmluZChzZWxmLm1vZGFsKSApO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KGVsZW1lbnQsIGNsb3NlQ0IpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjbG9zZUNCKCk7XG4gICAgICB9KTtcbn1cbmZ1bmN0aW9uIF9ET01FbGVtZW50c1RvQXJyYXkoZWxlbWVudHMpIHtcbiAgaWYgKCFlbGVtZW50cykge1xuICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yICsgXCIgZnVuY3Rpb24gbmVlZHMgZWxlbWVudHNcIik7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuICB2YXIgZWxlbWVudEFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnRBcnJheS5wdXNoKGVsZW1lbnRzW2ldKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50QXJyYXk7XG59IiwiJ3VzZXIgc3RyaWN0JztcblxudmFyIHNpbmdsZXRvblNjb3BlO1xuXG5leHBvcnQgbGV0IGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gZXZlbnRMaXN0ZW5lck1vZHVsZShtYXBDQnMpIHtcbiAgaWYoc2luZ2xldG9uU2NvcGUpIHtcbiAgICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XG4gIH1cblxuICBzaW5nbGV0b25TY29wZSA9IHtcbiAgICBzdGF0ZXM6IHt9XG4gIH07XG5cbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRnVsbFNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxTaXplO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxzY3JlZW47XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVpvb21MaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVpvb21MaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG1hcENCcy56b29tKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG1hcENCcy56b29tKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy56b29tO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVEcmFnTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVEcmFnTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmRyYWc7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVNlbGVjdExpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0TGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5zZWxlY3Q7XG4gIH07XG5cbiAgcmV0dXJuIHNpbmdsZXRvblNjb3BlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vZXZlbnRsaXN0ZW5lcnMnO1xuXG4vKiBldmVudGxpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiwgc28gd2UgbWlnaHQgYXMgd2VsbCBkZWNsYXJlIGl0IGhlcmUgKi9cbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGxldCBtYXBfZHJhZyA9IChmdW5jdGlvbiBtYXBfZHJhZygpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIC8qIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuIFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkIGJvdHRvbSAqL1xuICB2YXIgb2Zmc2V0Q29vcmRzID0gX29mZnNldENvb3JkcygpO1xuXG4gIC8qID09PT09IEZvciB0ZXN0aW5nID09PT09ICovXG4gIHNjb3BlLl9zdGFydERyYWdMaXN0ZW5lciA9IF9zdGFydERyYWdMaXN0ZW5lcjtcblxuICBzY29wZS5wbHVnaW5OYW1lID0gbWFwX2RyYWcubmFtZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMobWFwLmV2ZW50Q0JzKTtcbiAgICBtYXAuZXZlbnRDQnMuZHJhZyA9IF9zdGFydERyYWdMaXN0ZW5lcihtYXApO1xuXG4gICAgLy9tYXAuc2V0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcCkpO1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZURyYWdMaXN0ZW5lcigpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX3N0YXJ0RHJhZ0xpc3RlbmVyKCBtYXAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICB4OiBlLngsXG4gICAgICAgICAgeTogZS55XG4gICAgICAgIH0pO1xuICAgICAgICAvKiBXZSB0YWtlIGFsbCB0aGUgZXZlbnRsaXN0ZW5lcnMgdW5iaW5kaW5ncyB0byB0aGlzIGFycmF5LCBzbyB3ZSBjYW4gdW5iaW5kIHRoZW0gd2hlbiB0aGUgbW91c2UgaXMgdXAgKi9cblxuICAgICAgICB2YXIgbW92ZUNhbGxiYWNrMSA9IF9kcmFnTGlzdGVuZXIobWFwKTtcbiAgICAgICAgdmFyIG1vdXNldXBDYWxsYmFjayA9IF9zZXR1cE1vdXNldXBMaXN0ZW5lcihtYXApO1xuICAgICAgICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF9zZXR1cE1vdXNldXBMaXN0ZW5lcihtYXApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvKiBFdmVudCBsaXN0ZW5lcnMgYXJlIGluIHRoZWlyIHNlcGFyYXRlIGZpbGU7IGV2ZW50TGlzdGVuZXJzLmpzICovXG4gICAgICBmdW5jdGlvbiBfZHJhZ0xpc3RlbmVyKG1hcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkcmFnZ2VyKGUpIHtcbiAgICAgICAgICAgIG1hcC5tYXBNb3ZlZCh0cnVlKTtcbiAgICAgICAgICAgIC8qIFNvIHRoYXQgdGhlIGV2ZW50cyB3aWxsIHN0b3Agd2hlbiBtb3VzZSBpcyB1cCwgZXZlbiB0aG91Z2ggbW91c2V1cCBldmVudCB3b3VsZG4ndCBmaXJlICovXG4gICAgICAgICAgICBpZihlLmJ1dHRvbnMgPT09IDApIHtcbiAgICAgICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmVDYWxsYmFjazEpO1xuICAgICAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICAgICAgICAgIF9tYXBNb3ZlZChtYXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0Q29vcmRzLmdldE9mZnNldCgpO1xuICAgICAgICAgICAgdmFyIG1vdmVkID0ge1xuICAgICAgICAgICAgICB4OiBlLnggLSBvZmZzZXQueCxcbiAgICAgICAgICAgICAgeTogZS55IC0gb2Zmc2V0LnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmKG1vdmVkLnggIT09IDAgfHwgbW92ZWQueSAhPT0gMCkge1xuICAgICAgICAgICAgICBtYXAubW92ZU1hcChtb3ZlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICAgICAgeDogZS54LFxuICAgICAgICAgICAgICB5OiBlLnlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBUaGUgbW91c2UgaGFzIGJlZW4gbW92ZWQgYWZ0ZXIgcHJlc3NpbmcuIFRoaXMgcHJldmVudCB0aGUgY2xpY2tcbiAgICAgICAgICAgICAgZXZlbnQgdG8gZmlyZSBhdCB0aGUgc2FtZSB0aW1lIHdpdGggdGhlIG1vdXNlRG93biAvIGRyYWdnaW5nIGV2ZW50XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy9tYXAubW91c2VNb3ZlZCggdHJ1ZSApO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKiA9PT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09ICovXG4gIGZ1bmN0aW9uIF9vZmZzZXRDb29yZHMoKSB7XG4gICAgdmFyIHNjb3BlID0ge307XG4gICAgdmFyIG9mZnNldENvb3JkcztcblxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHMgPSBjb29yZHM7XG4gICAgfTtcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH07XG59KSgpO1xuXG4vKiBXaXRob3V0IHRoaXMsIHRoZSBvdGhlciBldmVudExpc3RlbmVycyBtaWdodCBmaXJlIGluYXBwcm9wcmlhdGUgZXZlbnRzLiAqL1xuZnVuY3Rpb24gX21hcE1vdmVkKG1hcCkge1xuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICB9LCAxKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBoYXNoIGZyb20gJ2JsdWVpbXAtbWQ1JztcblxubGV0IGFsbFNwcml0ZXNoZWV0cyA9IFtdO1xubGV0IGFsbFNwcml0ZXNoZWV0SURzID0gW107XG5cbi8qIFNpbmdsZXRvbiBzbyB3ZSBkb24ndCB1c2UgY2xhc3MgZGVmaW5pdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZXNoZWV0TGlzdCAoKSB7XG4gIGxldCBzY29wZSA9IHt9O1xuXG4gIHNjb3BlLmFkZFNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIGxldCBzcHJpdGVTaGVldDtcblxuICAgIGlmIChzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMoIF9jcmVhdGVJRCggc3ByaXRlc2hlZXREYXRhICkgKSApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldChzcHJpdGVzaGVldERhdGEpO1xuXG4gICAgYWxsU3ByaXRlc2hlZXRzLnB1c2goIHNwcml0ZVNoZWV0ICk7XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXQ7XG4gIH07XG4gIHNjb3BlLnJlbW92ZVNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHNwcml0ZXNoZWV0KSB7XG5cbiAgfTtcbiAgc2NvcGUuZ2V0QWxsU3ByaXRlc2hlZXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHM7XG4gIH07XG4gIHNjb3BlLnNwcml0ZXNoZWV0QWxyZWFkeUV4aXN0cyA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldElEKSB7XG4gICAgcmV0dXJuICggYWxsU3ByaXRlc2hlZXRJRHMuaW5kZXhPZiggc3ByaXRlc2hlZXRJRCApID4gLTEgKTtcbiAgfTtcbiAgZnVuY3Rpb24gX2NyZWF0ZUlEIChzcHJpdGVzaGVldERhdGEpIHtcbiAgICByZXR1cm4gKCBzcHJpdGVzaGVldERhdGEuaW1hZ2VzLnRvU3RyaW5nKCkgKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiZXhwb3J0IHZhciBtb3VzZVV0aWxzID0gKCBmdW5jdGlvbiBtb3VzZVV0aWxzKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICAvKiogVGhpcyBmdW5jdGlvbiBpcyBmcm9tOiBodHRwOi8vd3d3LmFkb21hcy5vcmcvamF2YXNjcmlwdC1tb3VzZS13aGVlbC9cbiAgICBJdCBkZXRlY3RzIHdoaWNoIHdheSB0aGUgbW91c2V3aGVlbCBoYXMgYmVlbiBtb3ZlZFxuXG4gICAgQHBhcmFtIHtFdmVudH0gZXZlbnQgcGFzcyB0aGUgZXZlbnQgdG8gZGVsdGFGcm9tV2hlZWxcbiAgICBAcmV0dXJuIGRlbHRhLiBQb3NpdGl2ZSBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uXG4gICAgKi9cbiAgc2NvcGUuZGVsdGFGcm9tV2hlZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgIHZhciBkZWx0YSA9IDA7XG5cbiAgICAgZXZlbnQgPSBldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50OyAvKiBGb3IgSUUuICovXG5cbiAgICAgaWYgKCBldmVudC53aGVlbERlbHRhICkgeyAvKiBJRS9PcGVyYS4gKi9cbiAgICAgICAgZGVsdGEgPSBldmVudC53aGVlbERlbHRhIC8gMTIwO1xuICAgICB9IGVsc2UgaWYgKCBldmVudC5kZXRhaWwgKSB7IC8qKiBNb3ppbGxhIGNhc2UuICovXG4gICAgICAgIC8qIEluIE1vemlsbGEsIHNpZ24gb2YgZGVsdGEgaXMgZGlmZmVyZW50IHRoYW4gaW4gSUUuXG4gICAgICAgICAqIEFsc28sIGRlbHRhIGlzIG11bHRpcGxlIG9mIDMuICovXG4gICAgICAgIGRlbHRhID0gLWV2ZW50LmRldGFpbCAvIDM7XG4gICAgIH1cbiAgICAgLyogUHJldmVudCBkZWZhdWx0IGFjdGlvbnMgY2F1c2VkIGJ5IG1vdXNlIHdoZWVsLiBJdCBtaWdodCBiZSB1Z2x5ICovXG4gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgLyogSWYgZGVsdGEgaXMgbm9uemVybywgaGFuZGxlIGl0LCBvdGhlcndpc2Ugc2NyYXAgaXQgQmFzaWNhbGx5LCBkZWx0YSBpcyBub3cgcG9zaXRpdmUgaWZcbiAgICAgd2hlZWwgd2FzIHNjcm9sbGVkIHVwLCBhbmQgbmVnYXRpdmUsIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCBkb3duLiAqL1xuICAgICBpZiAoIGRlbHRhICkgcmV0dXJuIGRlbHRhO1xuICB9O1xuICAvKiogRGV0ZWN0IHJpZ2h0IGNsaWNrICovXG4gIHNjb3BlLmlzUmlnaHRDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIHJpZ2h0Y2xpY2s7XG5cbiAgICAgZXZlbnQgPSBldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50OyAvKiBGb3IgSUUuICovXG4gICAgIGlmICggZXZlbnQuYnV0dG9ucyApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbnMgPT0gMiApO1xuICAgICBlbHNlIGlmICggZXZlbnQud2hpY2ggKSByaWdodGNsaWNrID0gKCBldmVudC53aGljaCA9PSAzICk7XG4gICAgIGVsc2UgaWYgKCBldmVudC5idXR0b24gKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b24gPT0gMiApO1xuXG4gICAgIGlmICggcmlnaHRjbGljayApIHJldHVybiB0cnVlO1xuXG4gICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIHNjb3BlO1xufSApKCk7XG5leHBvcnQgdmFyIHJlc2l6ZVV0aWxzID0ge1xuICB0b2dnbGVGdWxsU2NyZWVuOiBmdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuYm9keTsgLy8gTWFrZSB0aGUgYm9keSBnbyBmdWxsIHNjcmVlbi5cbiAgICB2YXIgaXNJbkZ1bGxTY3JlZW4gPSAoIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICYmIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICE9PSBudWxsICkgfHxcbiAgICAgICAoXG4gICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gKTtcblxuICAgIGlzSW5GdWxsU2NyZWVuID8gY2FuY2VsRnVsbFNjcmVlbiggZG9jdW1lbnQgKSA6IHJlcXVlc3RGdWxsU2NyZWVuKCBlbGVtICk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTdWIgZnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gY2FuY2VsRnVsbFNjcmVlbiggZWwgKSB7XG4gICAgICAgdmFyIHJlcXVlc3RNZXRob2QgPSBlbC5jYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwud2Via2l0Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5leGl0RnVsbHNjcmVlbjtcbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIGNhbmNlbCBmdWxsIHNjcmVlbi5cbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoIGVsICk7XG4gICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICkgeyAvLyBPbGRlciBJRS5cbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xuICAgICAgICAgIHdzY3JpcHQgIT09IG51bGwgJiYgd3NjcmlwdC5TZW5kS2V5cyggXCJ7RjExfVwiICk7XG4gICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RGdWxsU2NyZWVuKCBlbCApIHtcbiAgICAgICAvLyBTdXBwb3J0cyBtb3N0IGJyb3dzZXJzIGFuZCB0aGVpciB2ZXJzaW9ucy5cbiAgICAgICB2YXIgcmVxdWVzdE1ldGhvZCA9IGVsLnJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1zUmVxdWVzdEZ1bGxTY3JlZW47XG5cbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIE5hdGl2ZSBmdWxsIHNjcmVlbi5cbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoIGVsICk7XG4gICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICkgeyAvLyBPbGRlciBJRS5cbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xuICAgICAgICAgIHdzY3JpcHQgIT09IG51bGwgJiYgd3NjcmlwdC5TZW5kS2V5cyggXCJ7RjExfVwiICk7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIHNldFRvRnVsbFNpemU6IGZ1bmN0aW9uIHNldFRvRnVsbFNpemUoY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBmdWxsU2l6ZSgpIHtcbiAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBsaXN0ZW5lcnMgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IExJU1RFTkVSX1RZUEVTID0ge1xuICAgIFwibW91c2Vtb3ZlXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZW1vdmVcIlxuICAgIH0sXG4gICAgXCJtb3VzZXVwXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZXVwXCJcbiAgICB9LFxuICAgIFwibW91c2Vkb3duXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZWRvd25cIlxuICAgIH0sXG4gICAgXCJtb3VzZXdoZWVsXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJ3aGVlbFwiXG4gICAgfSxcbiAgICBcIm1vdXNlY2xpY2tcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcImNsaWNrXCJcbiAgICB9LFxuICB9O1xuICB2YXIgX2V2ZW50TGlzdGVuZXJzID0gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCk7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIHNjb3BlLnNldE9uZSA9IGZ1bmN0aW9uIHNldE9uZShhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgLyogVGhlcmUgaGFzIGJlZW4gc2V2ZXJhbCBkaWZmZXJlbnQgbW91c2V3aGVlbCBldmVudHMgYmVmb3JlLCBidXQgbm93IGFsbCBleGNlcHQgb3BlcmEgc2hvdWxkIHN1cHBvcnQgXCJ3aGVlbFwiICovXG4gICAgX2V2ZW50TGlzdGVuZXJzW2FjdGlvbl0ucHVzaChjYWxsYmFjayk7XG4gICAgdGhpc1tMSVNURU5FUl9UWVBFU1thY3Rpb25dLmVsZW1lbnRdLmFkZEV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbYWN0aW9uXS5ldmVudCwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHNjb3BlLnJlbW92ZU9uZSA9IGZ1bmN0aW9uIHJlbW92ZU9uZSh0eXBlLCBvcmlnQ2FsbGJhY2spIHtcblxuICAgIGlmKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuICAgICAgaWYob3JpZ0NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXNbTElTVEVORVJfVFlQRVNbdHlwZV0uZWxlbWVudF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1t0eXBlXS5ldmVudCwgb3JpZ0NhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjYWxsYmFjayBzcGVjaWZpZWQhIC0gMVwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBBcnJheSApIHtcbiAgICAgIHR5cGUuZm9yRWFjaCh0aGlzVHlwZSA9PiB7XG4gICAgICAgIGlmKG9yaWdDYWxsYmFjaykge1xuICAgICAgICAgIHRoaXNbTElTVEVORVJfVFlQRVNbdGhpc1R5cGVdLmVsZW1lbnRdLnJlbW92ZUV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbdGhpc1R5cGVdLmV2ZW50LCBvcmlnQ2FsbGJhY2spO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGNhbGxiYWNrIHNwZWNpZmllZCEgLSAyXCIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qIFBSSVZBVEUgZnVuY3Rpb25zICovXG4gIGZ1bmN0aW9uIF9nZXRFbXB0eUV2ZW50TGlzdGVuZXJBcnJheSgpIHtcbiAgICB2YXIgb2JqZWN0cyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoTElTVEVORVJfVFlQRVMpLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgICAgb2JqZWN0c1t0eXBlXSA9IFtdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbn0pKCk7IiwiJ3VzZXIgc3RyaWN0JztcblxuaW1wb3J0IHsgbW91c2VVdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlscy5qc1wiO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuLi9ldmVudGxpc3RlbmVycyc7XG5cbi8qIGV2ZW50bGlzdGVuZXJzIGlzIGEgc2luZ2xldG9uLCBzbyB3ZSBtaWdodCBhcyB3ZWxsIGRlY2xhcmUgaXQgaGVyZSAqL1xudmFyIGV2ZW50bGlzdGVuZXJzO1xuXG5leHBvcnQgbGV0IG1hcF96b29tID0gKGZ1bmN0aW9uIG1hcF96b29tKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgdmFyIHpvb21MaW1pdCA9IHtcbiAgICBmYXJ0aGVyOiAwLjQsXG4gICAgY2xvc2VyIDogMi41XG4gIH07XG4gIC8qIEhvdyBtdWNoIG9uZSBzdGVwIG9mIHpvb21pbmcgYWZmZWN0czogKi9cbiAgdmFyIHpvb21Nb2RpZmllciA9IDAuMTtcblxuICBzY29wZS5wbHVnaW5OYW1lID0gbWFwX3pvb20ubmFtZTtcblxuICAvKipcbiAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwiem9vbUluXCIsIHpvb21Jbik7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21PdXRcIiwgem9vbU91dCk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21MaW1pdHNcIiwgc2V0Wm9vbUxpbWl0cyk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21Nb2RpZmllclwiLCBzZXRab29tTW9kaWZpZXIpO1xuXG4gICAgbWFwLmV2ZW50Q0JzLnpvb20gPSBfc2V0dXBab29tRXZlbnQobWFwKTtcblxuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMobWFwLmV2ZW50Q0JzKTtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVab29tTGlzdGVuZXIoKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyoqID09PT0gUFJPVE9UWVBFIGV4dGVuc2lvbnMgZm9yIG1hcCAqL1xuICBmdW5jdGlvbiBzZXRab29tTW9kaWZpZXIgKGFtb3VudCkge1xuICAgIHpvb21Nb2RpZmllciA9IGFtb3VudDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHNldFpvb21MaW1pdHMgKGZhcnRoZXIsIGNsb3Nlcikge1xuICAgIHpvb21MaW1pdC5mYXJ0aGVyID0gZmFydGhlcjtcbiAgICB6b29tTGltaXQuY2xvc2VyID0gY2xvc2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gem9vbUluIChhbW91bnQpIHtcbiAgICBpZihfaXNPdmVyWm9vbUxpbWl0KCBhbW91bnQgKSApXG5cbiAgICB0aGlzLmdldExheWVyc1dpdGhBdHRyaWJ1dGVzKFwiem9vbWFibGVcIiwgdHJ1ZSkuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBsYXllci5zY2FsZVggLT0gem9vbU1vZGlmaWVyO1xuICAgICAgbGF5ZXIuc2NhbGVZIC09IHpvb21Nb2RpZmllcjtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHpvb21PdXQgKGFtb3VudCkge1xuICAgIGlmKF9pc092ZXJab29tTGltaXQoIGFtb3VudCApIClcblxuICAgIHRoaXMuZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoXCJ6b29tYWJsZVwiLCB0cnVlKS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGxheWVyLnNjYWxlWCArPSB6b29tTW9kaWZpZXI7XG4gICAgICBsYXllci5zY2FsZVkgKz0gem9vbU1vZGlmaWVyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICBmdW5jdGlvbiBfaXNPdmVyWm9vbUxpbWl0KGFtb3VudCkge1xuICAgIGlmKGFtb3VudCA+IHpvb21MaW1pdC5mYXJ0aGVyICYmIGFtb3VudCA8IHpvb21MaW1pdC5jbG9zZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnQobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZVpvb21FdmVudChldmVudCkge1xuICAgICAgdmFyIG1vdXNlV2hlZWxEZWx0YSA9IG1vdXNlVXRpbHMuZGVsdGFGcm9tV2hlZWwoZXZlbnQpO1xuXG4gICAgICBpZihtb3VzZVdoZWVsRGVsdGEgPiAwKSB7XG4gICAgICAgIG1hcC56b29tSW4oKTtcbiAgICAgIH0gZWxzZSBpZihtb3VzZVdoZWVsRGVsdGEgPCAwKSB7XG4gICAgICAgIG1hcC56b29tT3V0KCk7XG4gICAgICB9XG5cbiAgICAgIG1hcC5kcmF3T25OZXh0VGljaygpO1xuICAgIH07XG4gIH1cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi8uLi8uLi9sb2dnZXIvbG9nLmpzXCI7XG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uLy4uL2NvcmUvZXZlbnRsaXN0ZW5lcnMnO1xuXG4vKiBldmVudGxpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiwgc28gd2UgbWlnaHQgYXMgd2VsbCBkZWNsYXJlIGl0IGhlcmUgKi9cbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwSGV4YWdvbkNsaWNrKG1hcCwgY2FsbGJhY2spIHtcbiAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXAuZXZlbnRDQnMpO1xuXG4gIG1hcC5ldmVudENCcy5zZWxlY3QgPSBtb3VzZURvd25MaXN0ZW5lcjtcbiAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlU2VsZWN0TGlzdGVuZXIoKTtcblxuICAvL3JldHVybiBvbk1vdXNlRG93bihtYXAsIGNhbGxiYWNrKTtcblxuICByZXR1cm4gZmFsc2U7XG5cbiAgZnVuY3Rpb24gbW91c2VEb3duTGlzdGVuZXIoKSB7XG4gICAgb25Nb3VzZVVwKG1hcCwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChtYXAsIGNhbGxiYWNrKSB7XG4gIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcmV0cmlldmVDbGlja0RhdGEpO1xuXG4gIGZ1bmN0aW9uIHJldHJpZXZlQ2xpY2tEYXRhKGUpIHtcbiAgICBpZiggbWFwLm1hcE1vdmVkKCkgKSB7XG4gICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGdsb2JhbENvb3JkcyA9ICB7eDogZS54LCB5OiBlLnkgfTtcbiAgICB2YXIgb2JqZWN0cztcblxuICAgIG9iamVjdHMgPSBtYXAuZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoZ2xvYmFsQ29vcmRzKTtcblxuICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgY2FsbGJhY2sob2JqZWN0cyk7XG4gICAgfVxuXG4gICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCByZXRyaWV2ZUNsaWNrRGF0YSk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9iamVjdF9zcHJpdGUgfSBmcm9tICcuLi8uLi9jb3JlL09iamVjdCc7XG5pbXBvcnQgeyBjcmVhdGVIZXhhZ29uIH0gZnJvbSAnLi4vdXRpbHMvY3JlYXRlSGV4YWdvbic7XG5pbXBvcnQgaGV4YWdvbk1hdGggZnJvbSAnLi4vdXRpbHMvaGV4YWdvbk1hdGgnO1xuXG52YXIgc2hhcGU7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3Rfc3ByaXRlX2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzID0ge3g6MCwgeTowfSwgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIsIGV4dHJhID0geyByYWRpdXM6IDAgfSkge1xuICAgIHZhciBzaGFwZTtcblxuICAgIGNvbnN0IEhFSUdIVCA9IGhleGFnb25NYXRoLmNhbGNIZWlnaHQoZXh0cmEucmFkaXVzKTtcbiAgICBjb25zdCBTSURFID0gaGV4YWdvbk1hdGguY2FsY1NpZGUoZXh0cmEucmFkaXVzKTtcblxuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpO1xuXG4gICAgdmFyIGhleGFnb25TaXplID0gaGV4YWdvbk1hdGguZ2V0SGV4YVNpemUoZXh0cmEucmFkaXVzKTtcbiAgICB0aGlzLnJlZ1ggPSBoZXhhZ29uU2l6ZS54IC8gMjtcbiAgICB0aGlzLnJlZ1kgPSBoZXhhZ29uU2l6ZS55IC8gMjtcbiAgICB0aGlzLkhFSUdIVCA9IEhFSUdIVDtcbiAgICB0aGlzLlNJREUgPSBTSURFO1xuXG4gICAgaWYgKCFleHRyYS5yYWRpdXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgcmFkaXVzIVwiKTtcbiAgICB9XG5cbiAgICAvKiBEcmF3IGhleGFnb24gdG8gdGVzdCB0aGUgaGl0cyB3aXRoIGhpdEFyZWEgKi9cbiAgICB0aGlzLmhpdEFyZWEgPSBzZXRBbmRHZXRTaGFwZShleHRyYS5yYWRpdXMpO1xuICB9XG4gIHN0YXRpYyBnZXRTaGFwZSgpIHtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QW5kR2V0U2hhcGUocmFkaXVzKSB7XG4gIGlmICghc2hhcGUpIHtcbiAgICBsZXQgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgIC8qIHggYW5kIHkgYXJlIHJldmVyc2VkLCBzaW5jZSB0aGlzIGlzIGhvcml6b250YWwgaGV4YWdvbiBhbmQgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgKi9cbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24oeyB4OiBoZXhhZ29uU2l6ZS55IC8gMiwgeTogaGV4YWdvblNpemUueCAvIDIgfSwgcmFkaXVzKTtcbiAgfVxuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vT2JqZWN0X2hleGEnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW5faGV4YSBleHRlbmRzIE9iamVjdF9zcHJpdGVfaGV4YSB7XG4gIGNvbnN0cnVjdCguLi5hcmdzKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoLi4uYXJncyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0X2hleGFcIjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdW5pdF9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV9oZXhhIHtcbiAgY29uc3RydWN0KC4uLmFyZ3MpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldCguLi5hcmdzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzX2hleGFcIjtcbiAgfVxufSIsIi8qQ2FsY3VsYXRlIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudGVyIGhleGFnb24gYWx3YXlzIGFuZCBnZXQgb2JqZWN0cyBiYXNlZCBvbiB0aGUgY29vcmRpbmF0ZXMuIEZvciBleGFtcGxlIHdpdGhcbiAgc29tZSBtZXRob2QgbGlrZSBnZXRBbGxPYmplY3RzSW5IZXhhZ29uLlxuU086XG5XZSBjcmVhdGUgYSBmdW5jdGlvbiBmb3IgbGF5ZXJzLCBsaWtlIFwibWFwX3V0aWxzX2hleGFnb24/IC0+IGdldEhleGFnb25Db29yZHNGcm9tQ2xpY2soeCx5KSwgZ2V0T2JqZWN0c0luSGV4YWdvbihoZXhhZ29uPylcIlxuLSBUaGVyZSB3ZSBvbmx5IGZpbmQgb3V0IGFib3V0IHRoZSBjb29yZGluYXRlcyBmb3IgdGhlIG9iamVjdCwgd2UgZG9udCB1c2UgZ2V0T0JqZWN0VW5kZXJQb2ludC4gSWYgdGhlIGNvb3JkcyBlcXVhbCB0b1xudGhvc2UgZ290dGVuIGZyb206IGdldEhleGFnb25Db29yZHNGcm9tQ2xpY2ssIHRoZW4gdGhhdCBvYmplY3QgaXMgYWRkZWQgdG8gcmV0dXJuZWQgYXJyYXkuIFdlIGNhbiBhbHNvIGNhY2hlIHRoZXNlIGlmXG5uZWVkZWQgZm9yIHBlcmZvcm1hbmNlXG5cbkhPVyB3ZSBkbyB0aGUgd2hvbGUgb3JnYW5pemF0aW9uYWwgc3R1ZmY/XG4tIG1hcF9tb3ZlXG4tIG1hcF91dGlsc19oZXhhZ29uPyAtPiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrKHgseSksIGdldE9iamVjdHNJbkhleGFnb24oaGV4YWdvbj8pXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0IHsgbWFwX2Nvb3Jkc19ob3Jpem9udGFsSGV4IH0gZnJvbSAnLi4vY29vcmRpbmF0ZXMvTWFwX2Nvb3Jkc19ob3Jpem9udGFsSGV4JztcbmltcG9ydCB7IHNldHVwSGV4YWdvbkNsaWNrIH0gZnJvbSAnLi4vZXZlbnRMaXN0ZW5lcnMvc2VsZWN0JztcbmltcG9ydCB7IFVJIH0gZnJvbSAnLi4vLi4vY29yZS9VSSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuLi8uLi9jb3JlL01hcF9sYXllcic7XG5cbmV4cG9ydCBsZXQgb2JqZWN0X3NlbGVjdF9oZXhhZ29uID0gKGZ1bmN0aW9uIG9iamVjdF9zZWxlY3RfaGV4YWdvbigpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBcIm9iamVjdF9zZWxlY3RcIjtcblxuICAvKipcbiAgICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcE9iaikge1xuICAgIC8qIFdlIHRha2UgdGhlIHRvcC1tb3N0IHN0YWdlIG9uIHRoZSBtYXAgYW5kIGFkZCB0aGUgbGlzdGVuZXIgdG8gaXQgKi9cbiAgICBfY3JlYXRlUHJvdG90eXBlcyhtYXBPYmopO1xuXG4gICAgX3N0YXJ0Q2xpY2tMaXN0ZW5lcihtYXBPYmopO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICBmdW5jdGlvbiBnZXRPYmplY3RzRm9yTWFwKGNsaWNrQ29vcmRzKSB7XG4gICAgdmFyIG9iamVjdHMgPSB0aGlzLl9zdGFnZS5nZXRPYmplY3RzVW5kZXJQb2ludChjbGlja0Nvb3Jkcy54LCBjbGlja0Nvb3Jkcy55KTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG4gIGZ1bmN0aW9uIGdldE9iamVjdHNGb3JMYXllcihjbGlja0Nvb3Jkcykge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLnggPT09IGNsaWNrQ29vcmRzLnggJiYgY2hpbGQueSA9PT0gY2xpY2tDb29yZHMueSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cbiAgLyoqXG4gICAqIEF0dGFjaGVkIHRoZSBjb3JyZWN0IHByb3RvdHlwZXMgdG8gbWFwLiBJIGRvIG5vdCB0aGluayB3ZSBuZWVkIHRvIG92ZXJyaWRlIGdldE9iamVjdHNVbmRlclBvaW50IGZvciBzdGFnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9jcmVhdGVQcm90b3R5cGVzKG1hcCkge1xuICAgIG1hcC5fX3Byb3RvX18uZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQgPSBnZXRPYmplY3RzRm9yTWFwO1xuICAgIE1hcF9sYXllci5fX3Byb3RvX18uZ2V0T2JqZWN0c1VuZGVyUG9pbnQgPSBnZXRPYmplY3RzRm9yTGF5ZXI7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9zdGFydENsaWNrTGlzdGVuZXIoIG1hcCwgY2FudmFzICkge1xuICAgIHZhciBzaW5nbGV0b25VSSA9IFVJKCk7XG5cbiAgICByZXR1cm4gc2V0dXBIZXhhZ29uQ2xpY2sobWFwLCBzaW5nbGV0b25VSS5zaG93U2VsZWN0aW9ucyk7XG4gIH1cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwKSB7XG4gIHZhciBzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB2YXIgY29sb3IgPSBcIiM0NDQ0NDRcIjtcbiAgdmFyIHBvaW50U2l6ZSA9IDA7XG5cbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxuICAgIC5kcmF3UG9seVN0YXIgKCBjb29yZHMueCwgY29vcmRzLnksIHJhZGl1cywgNiwgcG9pbnRTaXplLCBhbmdsZSApO1xuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogY2ksXG4gICAgICAgIHk6IGNqXG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjaSAtIDEsXG4gICAgICB5OiBjaiArIChjaSAlIDIpIC0gKChjeSA8IEhFSUdIVCAvIDIpID8gMSA6IDApXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGV4YVNpemUocmFkaXVzKSB7XG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiByYWRpdXMsXG4gICAgeDogcmFkaXVzICogMixcbiAgICB5OiByYWRpdXMgKiBNYXRoLnNxcnQoMylcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4YUNlbnRlckNvb3JkKGhleFJhZGl1cywgeCwgeSkge1xuICB2YXIgaGV4YVNpemUgPSBnZXRIZXhhU2l6ZShoZXhSYWRpdXMpO1xuICB2YXIgcmFkaXVzID0gaGV4YVNpemUucmFkaXVzO1xuICB2YXIgaGFsZkhleGFTaXplID0ge1xuICAgIHg6IGhleGFTaXplLnJhZGl1cyxcbiAgICB5OiBoZXhhU2l6ZS55ICogMC41XG4gIH07XG4gIHZhciBjZW50ZXJDb29yZHMgPSB7fTtcbiAgdmFyIGNvb3JkaW5hdGVJbmRleGVzO1xuXG4gIGNvb3JkaW5hdGVJbmRleGVzID0gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KTtcblxuICBpZiAoY29vcmRpbmF0ZUluZGV4ZXMueCA8IDAgJiYgY29vcmRpbmF0ZUluZGV4ZXMueCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGljayBvdXRzaWRlIG9mIHRoZSBoZXhhZ29uIGFyZWFcIik7XG4gIH1cbiAgY2VudGVyQ29vcmRzID0ge1xuICAgIHg6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueCAqIGhleGFTaXplLnggKyBoYWxmSGV4YVNpemUueCksXG4gICAgeTogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy55ICogaGV4YVNpemUueSArIGhhbGZIZXhhU2l6ZS55KVxuICB9O1xuXG4gIHJldHVybiBjZW50ZXJDb29yZHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNhbGNIZWlnaHQ6IGNhbGNIZWlnaHQsXG4gIGNhbGNTaWRlOiBjYWxjU2lkZSxcbiAgc2V0Q2VsbEJ5UG9pbnQ6IHNldENlbGxCeVBvaW50LFxuICBnZXRIZXhhU2l6ZTogZ2V0SGV4YVNpemUsXG4gIHRvSGV4YUNlbnRlckNvb3JkOiB0b0hleGFDZW50ZXJDb29yZFxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbkNyZWF0aW5nIHRoZSBjcmVhdGVqc1F1ZXVlLW9iamVjdCBmcm9tIHNwcml0ZXNoZWV0LiBUaGlzIHByZWxvYWRzIGFzc2VzdHMuXG5cbkByZXF1aXJlcyBjcmVhdGVqcyBDcmVhdGVqcyBsaWJyYXJ5IC8gZnJhbWV3b3JrIG9iamVjdCAtIGdsb2JhbCBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBiYXNlUGF0aFxuQHRvZG8gTWFrZSBhIGxvYWRlciBncmFwaGljcyAvIG5vdGlmaWVyIHdoZW4gbG9hZGluZyBhc3NldHMgdXNpbmcgcHJlbG9hZGVyLlxuXG5Vc2FnZTogcHJlbG9hZC5nZW5lcmF0ZShcImh0dHA6Ly9wYXRoLmZpL3BhdGhcIikub25Db21wbGV0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7fSk7XG4qL1xuZXhwb3J0IGNsYXNzIHByZWxvYWQgZXh0ZW5kcyBjcmVhdGVqcy5Mb2FkUXVldWUge1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICB9XG4gIHJlc29sdmVPbkNvbXBsZXRlICgpIHtcbiAgICB2YXIgYmluZGVkT25Db21wbGV0ZSA9IF9vbkNvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShiaW5kZWRPbkNvbXBsZXRlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gX29uQ29tcGxldGUocmVzb2x2ZSkge1xuICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGxvYWRNYW5pZmVzdCAoLi4uYXJncykge1xuICAgIHN1cGVyLmxvYWRNYW5pZmVzdCguLi5hcmdzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldEVycm9ySGFuZGxlciAoZXJyb3JDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBlcnJvckNCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFByb2dyZXNzSGFuZGxlciAocHJvZ3Jlc3NDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBwcm9ncmVzc0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFjdGl2YXRlU291bmQgKCkge1xuICAgIHRoaXMuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIH1cbn0iLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiA1MCwgeTogMjAgfSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IHtcbiAgICBtYXA6IFtcIm1hcF9kcmFnXCIsIFwib2JqZWN0X3NlbGVjdF9oZXhhZ29uXCJdXG4gIH1cbn07IiwiZXhwb3J0IGxldCBtYXBEYXRhID0ge1xuICBnYW1lSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXG4gIHR1cm46IDEsXG4gIHN0YXJ0UG9pbnQ6IHsgeDogMCwgeTogMCB9LFxuICBlbGVtZW50OiBcIiNtYXBDYW52YXNcIixcbiAgbGF5ZXJzOiBbe1xuICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgIHNwZWNpYWxzOiBbe1xuICAgICAgXCJpbnRlcmFjdGl2ZVwiOiBmYWxzZVxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNhY2hlOiB0cnVlXG4gICAgfSxcbiAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICB0eXBlOiBcIk9iamVjdF90ZXJyYWluXCIsXG4gICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICBcInlcIjpcIjBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0se1xuICAgICAgICAgXCJvYmpUeXBlXCI6MSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI0MVwiLFxuICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjN1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiODJcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH0se1xuICAgIFwidHlwZVwiOiBcIk1hcF9sYXllclwiLFxuICAgIFwiY29vcmRcIjogeyBcInhcIjogXCIwXCIsIFwieVwiOiBcIjBcIiB9LFxuICAgIFwibmFtZVwiOiBcInVuaXRMYXllclwiLFxuICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICBcImNhY2hlXCI6IFwiZmFsc2VcIlxuICAgIH0sXG4gICAgXCJvYmplY3RHcm91cHNcIjogW3tcbiAgICAgIFwidHlwZVwiOiBcIk9iamVjdF91bml0XCIsXG4gICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgXCJ0eXBlSW1hZ2VEYXRhXCI6IFwidW5pdFwiLFxuICAgICAgXCJvYmplY3RzXCI6IFt7XG4gICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgIFwibmFtZVwiOiBcIkhvcnNleSB0aGUgd2lsZFwiLFxuICAgICAgICBcImNvb3JkXCI6IHtcbiAgICAgICAgICBcInhcIjogXCI0MVwiLCBcInlcIjogXCI3MFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgXCJzb21lQ3VzdG9tRGF0YVwiOiBcInRydWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59OyIsImV4cG9ydCBsZXQgdHlwZURhdGEgPSB7XG4gIFwiZ3JhcGhpY0RhdGFcIjoge1xuICAgIFwiZ2VuZXJhbFwiOntcbiAgICAgIFwidGVycmFpblwiOntcbiAgICAgICAgXCJ0aWxlV2lkdGhcIjo4MixcbiAgICAgICAgXCJ0aWxlSGVpZ2h0XCI6OTRcbiAgICAgIH1cbiAgICB9LFxuICAgIFwidGVycmFpbkJhc2VcIjp7XG4gICAgICBcImltYWdlc1wiOlxuICAgICAgW1wiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy90ZXN0SGV4YWdvblNwcml0ZXNoZWV0LnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMCwwLDgyLDk0XSxbODIsMCw4Miw5NF0sWzE2NCwwLDgyLDk0XSxbMjQ2LDAsODIsOTRdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbODIsOTRdXG4gICAgfSxcbiAgICBcInRlcnJhaW5cIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDQ4XSxbMSw1MCw5Niw0OF0sWzEsOTksOTYsNDhdLFsxLDE0OCw5Niw0OF0sWzEsMTk3LDk2LDQ4XSxbMSwyNDYsOTYsNDhdLFsxLDI5NSw5Niw0OF0sWzEsMzQ0LDk2LDQ4XSxbMSwzOTMsOTYsNDhdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgfSxcbiAgICBcImRpdGhlclwiOntcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9kaXRoZXIyLnBuZ1wiXSxcImZyYW1lc1wiOltbMCwwLDk2LDQ4XV0sXCJpbWFnZVNpemVcIjpbOTYsNDhdfSxcbiAgICBcInByZXR0aWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21vdW50YWlucy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL2hpbGxzLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjIucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNjYsMCwwLDE4XSxbMSwxLDk2LDQ4LDEsLTQsNF0sWzEsMTQ4LDk2LDQ4LDJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInJlc291cmNlXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvcmVzb3VyY2VzL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMTk1LDEsOTYsNDhdLFszODksMSw5Niw0OF1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicGxhY2VcIjp7fSxcbiAgICBcImNpdHlcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21lZGlldmFsY2l0aWVzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDcyXSxbOTgsMSw5Niw3Ml0sWzE5NSwxLDk2LDcyXSxbMjkyLDEsOTYsNzJdLFszODksMSw5Niw3Ml0sWzQ4NSwxLDk2LDcyXSxbNTgyLDEsOTYsNzJdLFs2NzksMSw5Niw3Ml0sWzc3NiwxLDk2LDcyXSxbODczLDEsOTYsNzJdLFsxLDc0LDk2LDcyXSxbOTgsNzQsOTYsNzJdLFsxOTUsNzQsOTYsNzJdLFsyOTIsNzQsOTYsNzJdLFszODksNzQsOTYsNzJdLFs0ODUsNzQsOTYsNzJdLFs1ODIsNzQsOTYsNzJdLFs2NzksNzQsOTYsNzJdLFs3NzYsNzQsOTYsNzJdLFs4NzMsNzQsOTYsNzJdXG4gICAgICBdXG4gICAgfSxcImJ1aWxkaW5nXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFwibW9kaWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJ1bml0XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvdW5pdHMvdGVzdEhleGFnb25Vbml0cy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOntcIndpZHRoXCI6ODIsXCJoZWlnaHRcIjo5NH1cbiAgICB9XG4gIH0sXG4gIFwib2JqZWN0RGF0YVwiOiB7XG4gICAgXCJ1bml0XCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJ0YW5rXCIsXG4gICAgICAgIFwiZGVzY1wiOlwiVnJvb29tLi4uXCIsXG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcbiAgICAgICAgXCJhdHRcIjpcIkdvb2RcIixcbiAgICAgICAgXCJkZWZcIjpcIlBvb3JcIixcbiAgICAgICAgXCJzaWVnZVwiOlwiRGVjZW50XCIsXG4gICAgICAgIFwiaW5pdGlhdGVcIjpcIjkwXCIsXG4gICAgICAgIFwibW92ZVwiOlwiMTAwXCIsXG4gICAgICAgIFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXG4gICAgICAgIFwidmlzaW9uXCI6XCIxNTBcIixcbiAgICAgICAgXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXJyaWVyXCIsXCJkZXNjXCI6XCJhbmdyeSBiZWVoaXZlXCIsXCJpbWFnZVwiOlwiNlwiLFwiYXR0XCI6XCIxXCIsXCJkZWZcIjpcIjJcIixcInNpZWdlXCI6XCIyXCIsXCJpbml0aWF0ZVwiOlwiMTEwXCIsXCJtb3ZlXCI6XCIxMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIyNTBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwidW5pdFwiOntcbiAgICAgICAgICAgIFwiX2VuZW15X1wiOlt7XG4gICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgIFwibW9yYWxlXCI6XCJzdWZmZXJzIG1vcmFsZSBkcm9wXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2F2YWxyeVwiLFwiZGVzY1wiOlwiR2l2ZSBtZSBhbiBhcHBsZSFcIixcImltYWdlXCI6XCIyNlwiLFwiYXR0XCI6XCIzXCIsXCJkZWZcIjpcIjFcIixcInNpZWdlXCI6XCIwXCIsXCJpbml0aWF0ZVwiOlwiNTBcIixcIm1vdmVcIjpcIjMwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgIH1dLFxuICAgIFwidGVycmFpbkJhc2VcIjpbe1xuICAgICAgICBcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDFcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjJcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAyXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIzXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI0XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgM1wiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDRcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjVcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSA1XCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5cIjpbe1xuICAgICAgICBcIm5hbWVcIjpcImRlc2VydFwiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcInZlcnkgZHJ5IGxhbmRcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwicGxhaW5cIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCdWZmYWxvIHJvYW1pbmcgYXJlYVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMTIlIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFwiaW1hZ2VcIjpcIjJcIixcImRlc2NcIjpcIlJvYmluIGhvb2QgbGlrZXMgaXQgaGVyZVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIlVuaXRcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGVmZW5kXCI6XCJVbml0IGRlZmVuZCArMlwiXG4gICAgICB9fV19fX0se1xuICAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXCJkZXNjXCI6XCJTaWJlcmlhIHRlYWNoZXMgeW91XCIsXCJpbWFnZVwiOlwiNlwiXG4gICAgICAgIH0se1xuICAgICAgICAgIFwibmFtZVwiOlwiYXJjdGljXCIsXCJkZXNjXCI6XCJZb3VyIGJhbGwgd2lsbCBmcmVlemUgb2ZcIixcImltYWdlXCI6XCI3XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFwiZGVzY1wiOlwiQ3JhbmJlcnJpZXMgYW5kIGNsb3VkYmVycmllc1wiLFwiaW1hZ2VcIjpcIjhcIlxuICAgICAgICB9XSxcbiAgICBcImRpdGhlclwiOltcbiAgICAgIHtcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCIsXCI3XCIsXCI4XCIsXCI5XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn1dLFxuICAgIFwicHJldHRpZmllclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjI1JVwifSx7XCJpbWFnZVwiOlwiMVwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjQwJVwifSx7XCJpbWFnZVwiOlwiMlwiLFwiekluZGV4XCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjYwJVwifV0sXCJyZXNvdXJjZVwiOlt7XCJuYW1lXCI6XCJPYXNpc1wiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcIk9hc2lzIGluIHRoZSBtaWRkbGUgb2YgZGVzZXJ0LCBvciBub3QgYXRtLlwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiZm9vZCBwcm9kdWN0aW9uIDUgLyB3ZWVrXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk9pbFwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJsYWNrIGdvbGRcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlRoZXJlIGlzIGEgbG90IG9mIG9pbCBoZXJlXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjRcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcImNpdHlcIjpbe1wibmFtZVwiOlwiTWVkaWV2YWxcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMFwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJNZWRpZXZhbDJcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMVwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJwbGFjZVwiOltdLFwiYnVpbGRpbmdcIjpbe1wibmFtZVwiOlwiQmFycmFja3NcIixcImltYWdlXCI6XCIwXCIsXCJ0b29sdGlwXCI6XCJFbmFibGVzIHRyb29wIHJlY3J1aXRtZW50XCJ9LHtcIm5hbWVcIjpcIkZhY3RvcnlcIixcImltYWdlXCI6XCIxXCIsXCJ0b29sdGlwXCI6XCJQcm9kdWNlcyB3ZWFwb25yeVwifV0sXCJnb3Zlcm5tZW50XCI6W3tcIm5hbWVcIjpcIkRlbW9jcmF6eVwiLFwiZGVzY3JpcHRpb25cIjpcIndlbGwgaXQncyBhIGRlbW9jcmF6eSA6KVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgKzIwJSBoYXBwaW5lc3NcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzAsMV0sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImhhcHBpbmVzc1wiOlwiMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNvbW11bmlzbVwiLFwiZGVzY3JpcHRpb25cIjpcIllvdSBrbm93IHRoZSBvbmUgdXNlZCBpbiB0aGUgZ3JlYXQgVVNTUiBhbmQgaW5zaWRlIHRoZSBncmVhdCBmaXJld2FsbCBvZiBDaGluYVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgcHJvZHVjdGlvbiBib251c2VzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlsyLDNdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7fX1dfX0sXCJDaXR5XCI6e1wiYnVpbGRpbmdcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIjIwJVwifX1dfX19fV0sXCJwb2xpdGljc1wiOntcInRheFJhdGVcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJjb3JydXB0aW9uXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiYWxpZ25tZW50XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiaGFwcGluZXNzXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwicmV2b2x0Umlza1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInVuaXR5XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwibmF0VmFsdWVcIjpbe1wibmFtZVwiOlwiSW50ZWdyaXR5XCIsXCJ0b29sdGlwXCI6XCJHb3Zlcm5tZW50IGFuZCBwb3B1bGF0aW9ucyBzaG93cyBpbnRlZ3JpdHkgYW5kIHRydXN0d29ydGhpbmVzc1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJpbnRlcm5hbFJlbGF0aW9uc1wiOlwiKzEwJVwiLFwiZGlwbG9tYWN5XCI6XCIrMTAlXCIsXCJyZXZvbHQgcmlza1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCItMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNhcGl0YWxpc21cIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGlwbG9tYWN5XCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwibW9yYWxlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiSGFyZHdvcmtpbmdcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrMTAlXCIsXCJoYXBwaW5lc3NcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkxlYWRlcnNoaXBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrNSVcIixcImhhcHBpbmVzc1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcInRyYWRpbmdcIjpcIisxMCVcIn19XX19fX1dfX1cbn07Il19
