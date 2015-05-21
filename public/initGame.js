(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* ====== Library imports ====== */
// @required createjs
// None

/* ====== Own module imports ====== */

var _Map = require('/var/www/warMapEngine/public/components/map/core/Map');

var _Map_stage = require('/var/www/warMapEngine/public/components/map/core/Map_stage');

var _Map_layer = require('/var/www/warMapEngine/public/components/map/core/Map_layer');

var _Objects_sprite = require('/var/www/warMapEngine/public/components/map/core/Objects');

var _createMap = require('/var/www/warMapEngine/public/components/factories/MapFactory');

var _preload = require('/var/www/warMapEngine/public/components/preloading/preloading');

/* test datas */

var _typeData = require('/var/www/warMapEngine/public/tests/data/typeData');

var _graphicData = require('/var/www/warMapEngine/public/tests/data/graphics');

var _terrainData = require('/var/www/warMapEngine/public/tests/data/terrainData');

var spritesheetData = _graphicData.graphicData.terrainBase;
var terrainObjectsData = _terrainData.terrainData.objects;

var canvasEleID = 'mapCanvas';
var stageNamesAndEle = [{
  name: 'perusStage',
  ele: canvasEleID
}];
var layerNamesAndEle = [{
  name: 'perusLayer',
  type: _Map_layer.Map_layer.getType('imagesInSubContainers')
}];
var stages = undefined,
    layers = undefined;
/* ====== Preload images, before constructing the stage ====== */
/* We need to set the preloads first argument to false (preferXHR), cause for some reason, it doesn't work with XHR.
@todo figure out the reason behind it, so it's more solid to implement a correct solution and not a hack-fix */
new _preload.preload(false).setErrorHandler(preloadErrorHandler)
//.setProgressHandler( progressHandler )
.loadManifest(['assets/img/map/collection.png']).resolveOnComplete().then(handleComplete);

console.log(_typeData.typeData);
console.log(_graphicData.graphicData);
console.log(_terrainData.terrainData);

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
          images: ['/var/www/warMapEngine/public/assets/img/map/collection.png'],
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
          type: 'Objects_terrain',
          name: 'Terrain', // I guess only for debugging?
          objects: [{
            name: 'Plain',
            coordinates: { x: 40, y: 40 },
            imageData: 2,
            data: {
              someCustomData: true
            }
          }]
        }]
      }]
    }, {
      type: 'Objects_terrain',
      coordinates: { x: 0, y: 0 },
      name: 'terrainBaseLayer',
      typeImageData: {
        images: ['/var/www/warMapEngine/public/assets/img/map/collection.png'],
        frames: [[0, 0, 96, 48], [0, 48, 96, 48], [0, 96, 96, 48], [0, 144, 96, 48], [0, 192, 96, 48], [0, 240, 96, 48]],
        imageSize: [96, 48]
      },
      options: {
        cache: false
      },
      objectGroups: [{
        type: 'Objects_unit',
        name: 'Unit', // I guess only for debugging?
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

var map = _createMap.createMap(mapData);

stages = stageNamesAndEle.map(function (stageData) {
  return new _Map_stage.Map_stage(stageData.name, stageData.ele);
});
layers = layerNamesAndEle.map(function (layerData) {
  return new _Map_layer.Map_layer(layerData.name, layerData.type);
});

window.map = new _Map.Map();

var spriteSheet = new createjs.SpriteSheet(spritesheetData);

var sprite = new _Objects_sprite.Objects_sprite({ x: 1, y: 1 }, {}, { spritesheet: spriteSheet, currentFrameNumber: 0 });

var image = new createjs.Sprite(spriteSheet);
image.gotoAndStop(0);
image.x = 100;
image.y = 100;

window.map.addStage(stages[0]);
stages[0].addChild(layers[0]);

function handleComplete() {
  layers[0].addChild(image, sprite);

  stages[0].update();
}

/* ====== private functions, or to be moved elsewhere ====== */
function preloadErrorHandler(err) {
  console.log('PRELOADER ERROR', err);
};

},{"/var/www/warMapEngine/public/components/factories/MapFactory":3,"/var/www/warMapEngine/public/components/map/core/Map":4,"/var/www/warMapEngine/public/components/map/core/Map_layer":5,"/var/www/warMapEngine/public/components/map/core/Map_stage":6,"/var/www/warMapEngine/public/components/map/core/Objects":7,"/var/www/warMapEngine/public/components/preloading/preloading":12,"/var/www/warMapEngine/public/tests/data/graphics":13,"/var/www/warMapEngine/public/tests/data/terrainData":14,"/var/www/warMapEngine/public/tests/data/typeData":15}],2:[function(require,module,exports){
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
    var thisStage = new functionsInObj[stageData.type](stageData);

    map.addStage(thisStage);

    stageData.layers.forEach(function (layerData) {
      var thisLayer = undefined;

      try {
        thisLayer = new functionsInObj[layerData.type](layerData);
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

          thisLayer.addChild(new functionsInObj[objectGroup.type](object.coordinates, object.data, imageData));
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

          if (theLayer = stage.getLayer(name)) {
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
  function Objects_sprite(coords, data, imageData) {
    _classCallCheck(this, Objects_sprite);

    _get(Object.getPrototypeOf(Objects_sprite.prototype), "constructor", this).call(this, imageData.spritesheet);

    this.name = "general Objects_sprite_" + this.id;

    /* Set data for the object next */
    this.data = data || {};
    this.currFrameNumber = imageData.currentFrameNumber;

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

/* */

var _Objects_sprite2 = require('/var/www/warMapEngine/public/components/map/core/Objects');

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

},{"/var/www/warMapEngine/public/components/map/core/Objects":7}],11:[function(require,module,exports){
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

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = { mapviews: [0, 1, 2, 3, 4], unit: [{ name: "tank", desc: "Vrooom...", image: "0", att: "Good", def: "Poor", siege: "Decent", initiate: "90", move: "100", morale: "Average", vision: "150", influenceArea: "30" }, { name: "carrier", desc: "angry beehive", image: "6", att: "1", def: "2", siege: "2", initiate: "110", move: "100", morale: "Average", vision: "250", influenceArea: "30", modifiers: { unit: { _enemy_: [{ from: "thisOnePlace", modifiers: { morale: "suffers morale drop" } }] } } }, { name: "cavalry", desc: "Give me an apple!", image: "26", att: "3", def: "1", siege: "0", initiate: "50", move: "300", morale: "Average", vision: "100", influenceArea: "30" }], terrainBase: [{ image: "0", attachedToTerrains: ["0"], propability: "100%" }, { image: "1", attachedToTerrains: ["2"], propability: "100%" }, { image: "2", attachedToTerrains: ["1"], propability: "100%" }, { image: "3", attachedToTerrains: ["4"], propability: "100%" }, { image: "4", attachedToTerrains: ["5"], propability: "100%" }, { image: "5", attachedToTerrains: ["3"], propability: "100%" }], terrain: [{ name: "desert", image: "0", desc: "very dry land", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "Provides +1 food for cities" } }] } } }, { name: "plain", image: "1", desc: "Buffalo roaming area", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "Provides +12% food for cities" } }] } } }, { name: "forest", image: "2", desc: "Robin hood likes it here", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { defend: "Unit defend +2" } }] } } }, { name: "tundra", desc: "Siberia teaches you", image: "6" }, { name: "arctic", desc: "Your ball will freeze of", image: "7" }, { name: "swamp", desc: "Cranberries and cloudberries", image: "8" }], dither: [{ image: "0", attachedToTerrains: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], propability: "100%" }], prettifier: [{ image: "0", zIndex: "1", attachedToTerrains: ["3"], propability: "25%" }, { image: "1", zIndex: "1", attachedToTerrains: ["1"], propability: "40%" }, { image: "2", zIndex: "0", attachedToTerrains: ["2"], propability: "60%" }], resource: [{ name: "Oasis", image: "0", desc: "Oasis in the middle of desert, or not atm.", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "food production 5 / week" } }] } }, attachedToTerrains: ["0"], influenceArea: 50 }, { name: "Oil", image: "1", desc: "Black gold", modifiers: { City: { _player_: [{ from: "thisOnePlace", modifiers: { production: "There is a lot of oil here" } }] } }, attachedToTerrains: ["0", "4"], influenceArea: 50 }], city: [{ name: "Medieval", vision: "100", image: "0", influenceArea: 50 }, { name: "Medieval2", vision: "100", image: "1", influenceArea: 50 }], place: [], building: [{ name: "Barracks", image: "0", tooltip: "Enables troop recruitment" }, { name: "Factory", image: "1", tooltip: "Produces weaponry" }], government: [{ name: "Democrazy", description: "well it's a democrazy :)", tooltip: "Gives +20% happiness", image: "0", requirements: [], possibleNatValues: [0, 1], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { happiness: "20%" } }] } } } }, { name: "Communism", description: "You know the one used in the great USSR and inside the great firewall of China", tooltip: "Gives production bonuses", image: "0", requirements: [], possibleNatValues: [2, 3], modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: {} }] } }, City: { building: { _player_: [{ from: "thisOnePlace", modifiers: { production: "20%" } }] } } } }], politics: { taxRate: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], corruption: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], alignment: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], happiness: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], revoltRisk: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], unity: [{ min: "0", max: "20", modifiers: { Unit: { _player_: [{ from: "thisOnePlace", modifiers: { attack: "+1" } }] } } }, { min: "21", max: "100", modifiers: { faction: { diplomacy: { _player_: [{ from: "thisOnePlace", modifiers: { skill: "+5" } }] } } } }], natValue: [{ name: "Integrity", tooltip: "Government and populations shows integrity and trustworthiness", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { internalRelations: "+10%", diplomacy: "+10%", "revolt risk": "-5%", relationsToElite: "-20%" } }] } } } }, { name: "Capitalism", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { diplomacy: "+5%", relationsToElite: "+5%", morale: "+5%" } }] } } } }, { name: "Hardworking", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+10%", happiness: "+5%", relationsToElite: "+5%" } }] } } } }, { name: "Leadership", modifiers: { faction: { politics: { _player_: [{ from: "thisOnePlace", modifiers: { productivity: "+5%", happiness: "-5%", relationsToElite: "+5%", trading: "+10%" } }] } } } }] } };
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2luaXRHYW1lLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9ibHVlaW1wLW1kNS9qcy9tZDUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvZmFjdG9yaWVzL01hcEZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9sYXllci5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXBfc3RhZ2UuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvT2JqZWN0cy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tYXBfdmFsaWRhdG9ycy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9vYmplY3RzL09iamVjdHNfdW5pdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvZ3JhcGhpY3MuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdGVycmFpbkRhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7O21CQU9PLHNEQUFzRDs7eUJBQ2hELDREQUE0RDs7eUJBQzVELDREQUE0RDs7OEJBQ3ZELDBEQUEwRDs7eUJBQy9ELDhEQUE4RDs7dUJBQ2hFLCtEQUErRDs7Ozt3QkFHOUQsa0RBQWtEOzsyQkFDL0Msa0RBQWtEOzsyQkFDbEQscURBQXFEOztBQUNqRixJQUFJLGVBQWUsR0FBRyxhQUZiLFdBQVcsQ0FFYyxXQUFXLENBQUM7QUFDOUMsSUFBSSxrQkFBa0IsR0FBRyxhQUZoQixXQUFXLENBRWlCLE9BQU8sQ0FBQzs7QUFFN0MsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQzlCLElBQUksZ0JBQWdCLEdBQUcsQ0FBQztBQUN0QixNQUFJLEVBQUUsWUFBWTtBQUNsQixLQUFHLEVBQUUsV0FBVztDQUNqQixDQUFDLENBQUM7QUFDSCxJQUFJLGdCQUFnQixHQUFHLENBQUM7QUFDdEIsTUFBSSxFQUFFLFlBQVk7QUFDbEIsTUFBSSxFQUFFLFdBbkJDLFNBQVMsQ0FtQkEsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0NBQ2pELENBQUMsQ0FBQztBQUNILElBQUksTUFBTSxZQUFBO0lBQUUsTUFBTSxZQUFBLENBQUM7Ozs7QUFJbkIsYUF0QlMsT0FBTyxDQXNCSCxLQUFLLENBQUUsQ0FDakIsZUFBZSxDQUFFLG1CQUFtQixDQUFFOztDQUV0QyxZQUFZLENBQUUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQ2hELGlCQUFpQixFQUFFLENBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFeEIsT0FBTyxDQUFDLEdBQUcsV0ExQkYsUUFBUSxDQTBCSSxDQUFDO0FBQ3RCLE9BQU8sQ0FBQyxHQUFHLGNBMUJGLFdBQVcsQ0EwQkksQ0FBQztB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFDLFVBQVcsRUFBQyxRQUFTLENBQUMsOEJBQThCLENBQUMsRUFBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUMsVUFBVyxFQUFDLFFBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxNQUFPLEVBQUMsUUFBUyxDQUFDLDJCQUEyQixDQUFDLEVBQUMsUUFBUyxFQUFDLE9BQVEsRUFBRSxFQUFDLFFBQVMsRUFBRSxFQUFD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QUFDLFVBQVcsRUFBQyxTQUFVLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBYSxDQUFDLEVBQUMsS0FBTSxHQUFHLEVBQUMsS0FBTSxJQUFJLEVBQUMsV0FBWSxFQUFDLE1BQU8sRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsUUFBUyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFNLElBQUksRUFBQyxLQUFNLEtBQUssRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFdBQVksRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVksQ0FBQyxFQUFDLEtBQU0sR0FBRyxFQUFDLEtBQU0sSUFBSSxFQUFDLFdBQVksRUFBQyxNQUFPLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFFBQVMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBTSxJQUFJLEVBQUMsS0FBTSxLQUFLLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxXQUFZLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLE9BQVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFZLENBQUMsRUFBQyxLQUFNLEdBQUcsRUFBQyxLQUFNLElBQUksRUFBQyxXQUFZLEVBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxRQUFTLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQU0sSUFBSSxFQUFDLEtBQU0sS0FBSyxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsV0FBWSxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxPQUFRLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBYSxDQUFDLEVBQUMsS0FBTSxHQUFHLEVBQUMsS0FBTSxJQUFJLEVBQUMsV0FBWSxFQUFDLE1BQU8sRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsUUFBUyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFNLElBQUksRUFBQyxLQUFNLEtBQUssRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFdBQVksRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsT0FBUSxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE9BQVEsQ0FBQyxFQUFDLEtBQU0sR0FBRyxFQUFDLEtBQU0sSUFBSSxFQUFDLFdBQVksRUFBQyxNQUFPLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFFBQVMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBTSxJQUFJLEVBQUMsS0FBTSxLQUFLLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxXQUFZLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLE9BQVEsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLFdBQVcsRUFBQyxTQUFVLGdFQUFnRSxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsVUFBVyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxtQkFBb0IsTUFBTSxFQUFDLFdBQVksTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQW1CLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTyxZQUFZLEVBQUMsV0FBWSxFQUFDLFNBQVUsRUFBQyxVQUFXLEVBQUMsVUFBVyxDQUFDLEVBQUMsTUFBTyxjQUFjLEVBQUMsV0FBWSxFQUFDLFdBQVksS0FBSyxFQUFDLGtCQUFtQixLQUFLLEVBQUMsUUFBUyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU8sYUFBYSxFQUFDLFdBQVksRUFBQyxTQUFVLEVBQUMsVUFBVyxFQUFDLFVBQVcsQ0FBQyxFQUFDLE1BQU8sY0FBYyxFQUFDLFdBQVksRUFBQyxjQUFlLE1BQU0sRUFBQyxXQUFZLEtBQUssRUFBQyxrQkFBbUIsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFPLFlBQVksRUFBQyxXQUFZLEVBQUMsU0FBVSxFQUFDLFVBQVcsRUFBQyxVQUFXLENBQUMsRUFBQyxNQUFPLGNBQWMsRUFBQyxXQUFZLEVBQUMsY0FBZSxLQUFLLEVBQUMsV0FBWSxLQUFLLEVBQUMsa0JBQW1CLEtBQUssRUFBQyxTQUFVLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDO1FBQXh4TCxRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qID09PT09PSBMaWJyYXJ5IGltcG9ydHMgPT09PT09ICovXG4vLyBAcmVxdWlyZWQgY3JlYXRlanNcbi8vIE5vbmVcblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcCB9IGZyb20gJy92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyJztcbmltcG9ydCB7IE9iamVjdHNfc3ByaXRlIH0gZnJvbSAnL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL09iamVjdHMnO1xuaW1wb3J0IHsgY3JlYXRlTWFwIH0gZnJvbSAnL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9NYXBGYWN0b3J5JztcbmltcG9ydCB7IHByZWxvYWQgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxuLyogdGVzdCBkYXRhcyAqL1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEnO1xuaW1wb3J0IHsgZ3JhcGhpY0RhdGEgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvZ3JhcGhpY3MnO1xuaW1wb3J0IHsgdGVycmFpbkRhdGEgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdGVycmFpbkRhdGEnO1xubGV0IHNwcml0ZXNoZWV0RGF0YSA9IGdyYXBoaWNEYXRhLnRlcnJhaW5CYXNlO1xubGV0IHRlcnJhaW5PYmplY3RzRGF0YSA9IHRlcnJhaW5EYXRhLm9iamVjdHM7XG5cbmxldCBjYW52YXNFbGVJRCA9IFwibWFwQ2FudmFzXCI7XG5sZXQgc3RhZ2VOYW1lc0FuZEVsZSA9IFt7XG4gIG5hbWU6IFwicGVydXNTdGFnZVwiLFxuICBlbGU6IGNhbnZhc0VsZUlEXG59XTtcbmxldCBsYXllck5hbWVzQW5kRWxlID0gW3tcbiAgbmFtZTogXCJwZXJ1c0xheWVyXCIsXG4gIHR5cGU6IE1hcF9sYXllci5nZXRUeXBlKFwiaW1hZ2VzSW5TdWJDb250YWluZXJzXCIpXG59XTtcbmxldCBzdGFnZXMsIGxheWVycztcbi8qID09PT09PSBQcmVsb2FkIGltYWdlcywgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgc3RhZ2UgPT09PT09ICovXG4vKiBXZSBuZWVkIHRvIHNldCB0aGUgcHJlbG9hZHMgZmlyc3QgYXJndW1lbnQgdG8gZmFsc2UgKHByZWZlclhIUiksIGNhdXNlIGZvciBzb21lIHJlYXNvbiwgaXQgZG9lc24ndCB3b3JrIHdpdGggWEhSLlxuQHRvZG8gZmlndXJlIG91dCB0aGUgcmVhc29uIGJlaGluZCBpdCwgc28gaXQncyBtb3JlIHNvbGlkIHRvIGltcGxlbWVudCBhIGNvcnJlY3Qgc29sdXRpb24gYW5kIG5vdCBhIGhhY2stZml4ICovXG5uZXcgcHJlbG9hZCggZmFsc2UgKVxuICAuc2V0RXJyb3JIYW5kbGVyKCBwcmVsb2FkRXJyb3JIYW5kbGVyIClcbiAgLy8uc2V0UHJvZ3Jlc3NIYW5kbGVyKCBwcm9ncmVzc0hhbmRsZXIgKVxuICAubG9hZE1hbmlmZXN0KCBbXCJhc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXSlcbiAgLnJlc29sdmVPbkNvbXBsZXRlKClcbiAgLnRoZW4oaGFuZGxlQ29tcGxldGUpO1xuXG5jb25zb2xlLmxvZyh0eXBlRGF0YSk7XG5jb25zb2xlLmxvZyhncmFwaGljRGF0YSk7XG5jb25zb2xlLmxvZyh0ZXJyYWluRGF0YSk7XG5cbmxldCBtYXBEYXRhID0ge1xuICAgIG1hcFNpemU6IHsgeDogMTAwLCB5OiAxMDAgfSxcbiAgICBwbHVnaW5zVG9BY3RpdmF0ZTogZmFsc2UsXG4gICAgc3RhZ2VzOiBbe1xuICAgICAgdHlwZTogXCJNYXBfc3RhZ2VcIixcbiAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG5hbWU6IFwidGVycmFpblN0YWdlXCIsXG4gICAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgICBsYXllcnM6IFt7XG4gICAgICAgICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICAgICAgICBjb29yZGluYXRlczogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgICAgIHR5cGU6IFwiT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YToge1xuICAgICAgICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICAgICAgICBcIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImZyYW1lc1wiOiBbXG4gICAgICAgICAgICAgICAgWzAsMCw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsNDgsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDk2LDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCwxNDQsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDE5Miw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsMjQwLDk2LDQ4XVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDEsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJUZXJyYWluXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIlBsYWluXCIsXG4gICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICAgIGltYWdlRGF0YTogMixcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XVxuICAgICAgICB9LHtcbiAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdGVycmFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiB7XG4gICAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgIFwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9hc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZnJhbWVzXCI6IFtcbiAgICAgICAgICAgICAgICBbMCwwLDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCw0OCw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsOTYsOTYsNDhdLFxuICAgICAgICAgICAgICAgIFswLDE0NCw5Niw0OF0sXG4gICAgICAgICAgICAgICAgWzAsMTkyLDk2LDQ4XSxcbiAgICAgICAgICAgICAgICBbMCwyNDAsOTYsNDhdXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgICAgICAgIHR5cGU6IFwiT2JqZWN0c191bml0XCIsXG4gICAgICAgICAgICBuYW1lOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcblxubGV0IG1hcCA9IGNyZWF0ZU1hcChtYXBEYXRhKTtcblxuXG5cbnN0YWdlcyA9IHN0YWdlTmFtZXNBbmRFbGUubWFwKGZ1bmN0aW9uKHN0YWdlRGF0YSkge1xuICByZXR1cm4gbmV3IE1hcF9zdGFnZShzdGFnZURhdGEubmFtZSwgc3RhZ2VEYXRhLmVsZSk7XG59KVxubGF5ZXJzID0gbGF5ZXJOYW1lc0FuZEVsZS5tYXAoZnVuY3Rpb24obGF5ZXJEYXRhKSB7XG4gIHJldHVybiBuZXcgTWFwX2xheWVyKGxheWVyRGF0YS5uYW1lLCBsYXllckRhdGEudHlwZSk7XG59KVxuXG53aW5kb3cubWFwID0gbmV3IE1hcCgpO1xuXG5sZXQgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxubGV0IHNwcml0ZSA9IG5ldyBPYmplY3RzX3Nwcml0ZSh7IHg6MSwgeToxIH0sIHt9LCB7IHNwcml0ZXNoZWV0OiBzcHJpdGVTaGVldCwgY3VycmVudEZyYW1lTnVtYmVyOiAwIH0pO1xuXG5sZXQgaW1hZ2UgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNwcml0ZVNoZWV0KTtcbmltYWdlLmdvdG9BbmRTdG9wKDApO1xuaW1hZ2UueCA9IDEwMDtcbmltYWdlLnkgPSAxMDA7XG5cbndpbmRvdy5tYXAuYWRkU3RhZ2Uoc3RhZ2VzWzBdKTtcbnN0YWdlc1swXS5hZGRDaGlsZChsYXllcnNbMF0pO1xuXG5mdW5jdGlvbiBoYW5kbGVDb21wbGV0ZSgpIHtcbiAgbGF5ZXJzWzBdLmFkZENoaWxkKGltYWdlLCBzcHJpdGUpO1xuXG4gIHN0YWdlc1swXS51cGRhdGUoKTtcbn1cblxuLyogPT09PT09IHByaXZhdGUgZnVuY3Rpb25zLCBvciB0byBiZSBtb3ZlZCBlbHNld2hlcmUgPT09PT09ICovXG5mdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICBjb25zb2xlLmxvZyhcIlBSRUxPQURFUiBFUlJPUlwiLCBlcnIgKVxufTsiLCIvKlxuICogSmF2YVNjcmlwdCBNRDUgMS4wLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLypcbiAgICAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAgICAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgICAgIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRiksXG4gICAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpIHtcbiAgICAgICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgICovXG4gICAgZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xuICAgICAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgICAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XG4gICAgICAgIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcblxuICAgICAgICB2YXIgaSwgb2xkYSwgb2xkYiwgb2xkYywgb2xkZCxcbiAgICAgICAgICAgIGEgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgICAgIGIgPSAtMjcxNzMzODc5LFxuICAgICAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBvbGRhID0gYTtcbiAgICAgICAgICAgIG9sZGIgPSBiO1xuICAgICAgICAgICAgb2xkYyA9IGM7XG4gICAgICAgICAgICBvbGRkID0gZDtcblxuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsICAxMjM2NTM1MzI5KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCAgNjQzNzE3NzEzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgICAgICAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDUsIC03MDE1NTg2OTEpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sICA5LCAgMzgwMTYwODMpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDUsICA1Njg0NDY0MzgpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sICA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgIDJdLCAgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNCwgLTM3ODU1OCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgMV0sICA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArICA0XSwgMTEsICAxMjcyODkzMzUzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNCwgIDY4MTI3OTE3NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sICAgICAgMTEsIC0zNTg1MzcyMjIpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDZdLCAyMywgIDc2MDI5MTg5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCAgNTMwNzQyNTIwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNiwgLTE5ODYzMDg0NCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICA3XSwgMTAsICAxMTI2ODkxNDE1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArICAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDYsICAxODczMzEzMzU5KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArICA0XSwgIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgICAgICAgICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAgOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgICAgICAgICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgICAgICAgICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgICAgICAgICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYSwgYiwgYywgZF07XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiAzMjsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhGRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgb3V0cHV0W2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogODsgaSArPSA4KSB7XG4gICAgICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweEZGKSA8PCAoaSAlIDMyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgYmtleSA9IHJzdHIyYmlubChrZXkpLFxuICAgICAgICAgICAgaXBhZCA9IFtdLFxuICAgICAgICAgICAgb3BhZCA9IFtdLFxuICAgICAgICAgICAgaGFzaDtcbiAgICAgICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgICAgIGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjtcbiAgICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuICAgICAgICBoYXNoID0gYmlubF9tZDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcbiAgICAgICAgcmV0dXJuIGJpbmwycnN0cihiaW5sX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcbiAgICAgICAgdmFyIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICAgICAgICBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgb3V0cHV0ICs9IGhleF90YWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MEYpICtcbiAgICAgICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XG4gICAgKi9cbiAgICBmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIHJhdyBvciBoZXggZW5jb2RlZCBzdHJpbmdzXG4gICAgKi9cbiAgICBmdW5jdGlvbiByYXdfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfbWQ1KHMpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYXdfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWQ1KHN0cmluZywga2V5LCByYXcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleF9tZDUoc3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByYXdfbWQ1KHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXhfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXdfaG1hY19tZDUoa2V5LCBzdHJpbmcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZDU7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQubWQ1ID0gbWQ1O1xuICAgIH1cbn0odGhpcykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbk1hcCBpcyB0aGUgbWFpbiBjbGFzcyBmb3IgY29uc3RydWN0aW5nIDJEIG1hcCBmb3Igc3RyYXRlZ3kgZ2FtZXNcblxuQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuKi9cblxuLyogPT09PT0gM3JkIHBhcnR5IGxpYnJhcnkgaW1wb3J0cyA9PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwJztcbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4uL21hcC9jb3JlL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuLi9tYXAvY29yZS9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgT2JqZWN0c190ZXJyYWluIH0gZnJvbSAnLi4vbWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluJztcbmltcG9ydCB7IE9iamVjdHNfdW5pdH0gZnJvbSAnLi4vbWFwL29iamVjdHMvT2JqZWN0c191bml0JztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyB2YWxpZGF0b3JNb2QgfSBmcm9tIFwiLi4vbWFwL2NvcmUvbWFwX3ZhbGlkYXRvcnNcIjtcblxubGV0IGZ1bmN0aW9uc0luT2JqID0ge1xuICBNYXBfc3RhZ2UsXG4gIE1hcF9sYXllcixcbiAgT2JqZWN0c190ZXJyYWluLFxuICBPYmplY3RzX3VuaXRcbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgICBfZ2V0U3RhZ2VJbmRleFxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gICAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleFxufTtcblxuLyoqID09PT09IEVYUE9SVCA9PT09PSAqL1xuLypcbkBhcmd1bWVudCB7YmlnYXNzIE9iamVjdH0gbWFwRGF0YSAtIGhvbGRzIGFsbCB0aGUgc3RhZ2UsIGxheWVyIGFuZCBvYmplY3QgZGF0YSBuZWVkZWQgdG8gY29uc3RydWN0IGEgZnVsbCBtYXAuXG5Db29yZGluYXRlcyBhcmUgYWx3YXlzIGRlZmF1bHRlZCB0byAwLDAgaWYgbm9uZSBhcmUgZ2l2ZW4uXG57XG4gIG1hcFNpemU6IGNyZWF0ZWpzLlJlY3RhbmdsZSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IFtcbiAgICBcIm1hcC9tb3ZlL21hcF9tb3ZlXCIsXG4gICAgXCJtYXAvRk9XL21hcF9GT1dcIlxuICBdLFxuICBzdGFnZXM6IFt7XG4gICAgdHlwZTogXCJtYXAvY29yZS9NYXBfU3RhZ2VcIixcbiAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICBlbGVtZW50OiBcIiNjYW52YXNUZXJyYWluXCIsXG4gICAgbGF5ZXJzOiBbe1xuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgIHR5cGU6IFwibWFwL29iamVjdHMvT2JqZWN0c190ZXJyYWluXCIsXG4gICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJQbGFpblwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjcmVhdGVqcy5Qb2ludCxcbiAgICAgICAgICBpbWFnZURhdGE6IGRhdGFfZm9yRXhhbXBsZUltYWdlRmlsZU5hbWUsXG4gICAgICAgICAgZGF0YTogY3VzdG9tRGF0YU9iamVjdFxuICAgICAgICB9XSxcbiAgICAgICAgdHlwZTogXCJtYXAvb2JqZWN0cy9PYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgbmFtZTogXCJUZXJyYWluXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICAgICAgaW1hZ2VEYXRhOiBkYXRhX2ZvckV4YW1wbGVJbWFnZUZpbGVOYW1lLFxuICAgICAgICAgIGRhdGE6IGN1c3RvbURhdGFPYmplY3RcbiAgICAgICAgfV1cbiAgICAgIH1dLFxuICAgICAgdHlwZTogXCJtYXAvbGF5ZXJzL01hcF9sYXllcl90ZXJyYWluXCIsXG4gICAgICBjb29yZGluYXRlczogY3JlYXRlanMuUG9pbnQsXG4gICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICB0eXBlOiBcIm1hcC9vYmplY3RzL09iamVjdHNfdW5pdFwiLFxuICAgICAgICBuYW1lOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgbmFtZTogXCJJbmZhbnRyeSAxXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNyZWF0ZWpzLlBvaW50LFxuICAgICAgICAgIGltYWdlRGF0YTogZGF0YV9mb3JFeGFtcGxlSW1hZ2VGaWxlTmFtZSxcbiAgICAgICAgICBkYXRhOiBjdXN0b21EYXRhT2JqZWN0XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59XG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGdpdmVuTWFwRGF0YSkge1xuICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG4gIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBiYXNlUGF0aCA9IFwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL1wiO1xuICBsZXQgbWFwRGF0YSA9ICh0eXBlb2YgZ2l2ZW5NYXBEYXRhID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZ2l2ZW5NYXBEYXRhKSA6IGdpdmVuTWFwRGF0YTtcblxuICAvKiBBY3RpdmF0ZSBwbHVnaW5zICovXG4gIGlmKG1hcERhdGEucGx1Z2luc1RvQWN0aXZhdGUgJiYgbWFwRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5sZW5ndGggPiAwKSB7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgbWFwRGF0YS5wbHVnaW5zVG9BY3RpdmF0ZS5tYXAoeCA9PiBTeXN0ZW0uaW1wb3J0KHgpKSlcbiAgICAgIC50aGVuKChbbW9kdWxlMSwgbW9kdWxlMiwgbW9kdWxlM10pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwbHVnaW5zIGxvYWRlZFwiKTtcbiAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnN0YWNrKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuXG4gIG1hcERhdGEuc3RhZ2VzLmZvckVhY2goIHN0YWdlRGF0YSA9PiB7XG4gICAgbGV0IHRoaXNTdGFnZSA9IG5ldyBmdW5jdGlvbnNJbk9ialtzdGFnZURhdGEudHlwZV0oc3RhZ2VEYXRhKTtcblxuICAgIG1hcC5hZGRTdGFnZSggdGhpc1N0YWdlICk7XG5cbiAgICBzdGFnZURhdGEubGF5ZXJzLmZvckVhY2goIGxheWVyRGF0YSA9PiB7XG4gICAgICBsZXQgdGhpc0xheWVyO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzTGF5ZXIgPSBuZXcgZnVuY3Rpb25zSW5PYmpbbGF5ZXJEYXRhLnR5cGVdKGxheWVyRGF0YSk7XG4gICAgICAgIHRoaXNTdGFnZS5hZGRDaGlsZCggdGhpc0xheWVyICk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtOlwiLCBsYXllckRhdGEudHlwZSwgZS5zdGFjaylcbiAgICAgIH1cblxuICAgICAgbGF5ZXJEYXRhLm9iamVjdEdyb3Vwcy5mb3JFYWNoKCBvYmplY3RHcm91cCA9PiB7XG4gICAgICAgIG9iamVjdEdyb3VwLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0ID0+IHtcbiAgICAgICAgICBsZXQgaW1hZ2VEYXRhO1xuXG4gICAgICAgICAgLyogSWYgdGhlIG9iamVjdCBpcyBhIHNwcml0ZSAqL1xuICAgICAgICAgIGlmKG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGEpIHtcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IHtcbiAgICAgICAgICAgICAgc3ByaXRlc2hlZXQ6IGFsbFNwcml0ZXNoZWV0cy5hZGRTcHJpdGVzaGVldChvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhKSxcbiAgICAgICAgICAgICAgY3VycmVudEZyYW1lTnVtYmVyOiBvYmplY3QuaW1hZ2VEYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWFnZURhdGEgPSBvYmplY3QuaW1hZ2VEYXRhO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXNMYXllci5hZGRDaGlsZCggbmV3IGZ1bmN0aW9uc0luT2JqW29iamVjdEdyb3VwLnR5cGVdKCBvYmplY3QuY29vcmRpbmF0ZXMsIG9iamVjdC5kYXRhLCBpbWFnZURhdGEgKSApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gbWFwO1xuXG4vKlxuICBDcmVhdGVUZXJyYWluU3RhZ2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2Jhc2VcbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX3RlcnJhaW5cbiAgICBfQ3JlYXRlVGVycmFpbkxheWVyX2RpdGhlclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcHJldHRpZmllclxuICAgIF9DcmVhdGVUZXJyYWluTGF5ZXJfcmVzb3VyY2VcbiAgQ3JlYXRlVW5pdFN0YWdlXG4gICAgX0NyZWF0ZVVuaXRMYXllcl9Vbml0XG4gICAgX0NyZWF0ZVVuaXRMYXllcl9DaXR5XG4gIENyZWF0ZUZPV1N0YWdlXG4gIENyZWF0ZURhdGFTdGFnZVxuICBDcmVhdGVVSVN0YWdlXG4gICAgX0NyZWF0ZVVJTGF5ZXJfYXJyb3dcbiAgICBfQ3JlYXRlVUlMYXllcl9zZWxlY3Rpb25cbiovXG5cbiAgZnVuY3Rpb24gX2NhbGN1bGF0ZU1hcFNpemUoKSB7XG5cbiAgfVxufVxuXG4vKiA9PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT0gKi9cbmZ1bmN0aW9uIF9nZXRTdGFnZUluZGV4KCkge30iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuXG5AcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4qL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgdmFsaWRhdG9yTW9kIH0gZnJvbSBcIi4vbWFwX3ZhbGlkYXRvcnNcIjtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgICBfZ2V0U3RhZ2VJbmRleFxufTtcblxuLyoqID09PT09IFZhbGlkYXRvcnMgdXNlZCBpbiB0aGlzIG1vZHVsZS4gSW1wb3J0ZWQgZnJvbSBtYXBfdmFsaWRhdG9ycyA9PT09PSAqL1xubGV0IHZhbGlkYXRvcnMgPSB7XG4gICAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgICBfaXNfY29vcmRpbmF0ZXM6IHZhbGlkYXRvck1vZC5pc0Nvb3JkaW5hdGVzLFxuICAgIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgICBfaXNfVXNlT2ZTdWJMYXllcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViTGF5ZXJzLFxuICAgIF9pc19Vc2VPZlN1YkNvbnRhaW5lcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViQ29udGFpbmVycyxcbiAgICBfaXNfY2FudmFzOiB2YWxpZGF0b3JNb2QuaXNDYW52YXNcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qXG4qL1xuZXhwb3J0IGNsYXNzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgdGhpcy56b29tTGV2ZWwgPSAxO1xuICAgICAgdGhpcy5zdGFnZXMgPSBbXTtcbiAgICAgIHRoaXMucGx1Z2lucyA9IHt9O1xuICAgICAgdGhpcy5tYXBTaXplID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBTaXplKSB8fCB7IHg6MCwgeTowLCB3aWR0aDowLCBoZWlnaHQ6MCB9O1xuICAgICAgdGhpcy5hY3RpdmVUaWNrQ0I7XG4gICAgfVxuICAgIC8qIG9wdGlvbnMubWFwU2l6ZSA9IG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUqL1xuICAgIGluaXQob3B0aW9ucykge1xuICAgICAgdGhpcy5tYXBTaXplID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBTaXplKSB8fCB7IHg6MCwgeTowLCB3aWR0aDowLCBoZWlnaHQ6MCB9O1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZHJhd01hcCgpIHtcbiAgICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgaWYoc3RhZ2UuZHJhd1RoaXNDaGlsZCkge1xuICAgICAgICAgIHN0YWdlLnVwZGF0ZSgpO1xuICAgICAgICAgIHN0YWdlLmRyYXdUaGlzQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRTaXplKCApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgICB9XG4gICAgc2V0U2l6ZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgdGhpcy5tYXBTaXplID0geyB4OngxLCB5OnkxLCB3aWR0aDp4MiwgaGVpZ2h0OnkyIH07XG5cbiAgICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBzdGFnZSBvZiB0aGlzLnN0YWdlcykge1xuICAgICAgICBsZXQgY2hpbGQ7XG5cbiAgICAgICAgaWYoc3RhZ2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gc3RhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGlsZCA9IHN0YWdlLmdldENoaWxkTmFtZWQobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhZGRTdGFnZShzdGFnZSkge1xuICAgICAgbGV0IHN0YWdlcyA9IFtdO1xuXG4gICAgICBpZighIChzdGFnZSBpbnN0YW5jZW9mIEFycmF5KSApIHtcbiAgICAgICAgc3RhZ2VzLnB1c2goc3RhZ2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWdlcy5wdXNoKC4uLnN0YWdlcyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXBsYWNlU3RhZ2UobmV3Q2FudmFzLCBvbGRDYW52YXMpIHtcbiAgICAgIGxldCBvbGRJbmRleCA9IHByaXZhdGVGdW5jdGlvbnMuX2dldFN0YWdlSW5kZXgodGhpcy5zdGFnZXMsIG9sZENhbnZhcyk7XG4gICAgICB0aGlzLnN0YWdlc1tvbGRJbmRleF0gPSBuZXdDYW52YXM7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRMYXllcihsYXllciwgc3RhZ2UpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlcGxhY2VMYXllcihuZXdMYXllciwgb2xkTGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRvZ2dsZUxheWVyKGxheWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRMYXllck5hbWVkKG5hbWUpIHtcbiAgICAgIGxldCB0aGVMYXllcjtcblxuICAgICAgZm9yKGxldCBzdGFnZSBvZiB0aGlzLnN0YWdlcykge1xuICAgICAgICBpZih0aGVMYXllciA9IHN0YWdlLmdldExheWVyKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoZUxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhY2hlTWFwKCkge1xuICAgICAgICB0aGlzLnN0YWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgICAgICBpZihzdGFnZS5jYWNoZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlKHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZUxheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldE9iamVjdHNVbmRlck1hcFBvaW50KCkge1xuICAgICAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgICAgICBvYmplY3RzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0cztcbiAgICB9XG4gICAgdGljaygpIHtcbiAgICAgIHRoaXMuc3RhZ2VzLmZvckVhY2goZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgaWYoc3RhZ2UudXBkYXRlU3RhZ2UgPT09IHRydWUpIHtcbiAgICAgICAgICBzdGFnZS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHNldENhbnZhc2VzVG9GdWxsU2l6ZShjYW52YXNlcykge1xuICAgICAgZm9yKCBsZXQgY2FudmFzIG9mIHRoaXMuc3RhZ2VzICkge1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xuXG4gICAgICAgIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIEFjdGl2YXRlcyBhIGdpdmVuIHBsdWdpbiAvIG1vZHVsZSBmb3IgdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgICBhY3RpdmF0ZVBsdWdpbihwbHVnaW4pIHtcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW4ubmFtZV0gPSBuZXcgcGx1Z2luKHRoaXMpO1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbi5uYW1lXS5pbml0KCk7XG4gICAgfVxuICAgIHN0YXJ0VGljayh0aWNrQ0IpIHtcbiAgICAgIGlmKHRoaXMuYWN0aXZlVGlja0NCKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB0aWNrQ0I7XG5cdCAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG5cdCAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RvcFRpY2soKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblx0ICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cblx0ICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0U3RhZ2VJbmRleChzdGFnZXMsIHN0YWdlVG9GaW5kKSB7XG4gIHZhciBmb3VuZEluZGV4ID0gc3RhZ2VzLmluZGV4T2Yoc3RhZ2VUb0ZpbmQpO1xuXG4gIHJldHVybiAoIGZvdW5kSW5kZXggPT09IC0xICkgPyBmYWxzZSA6IGZvdW5kSW5kZXg7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuQHJlcXVpcmUgdmFsaWRhdG9yIG1vZHVsZVxuKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5cbi8qID09PT09IENvbnN0YW50cyA9PT09PSAqL1xuY29uc3QgVFlQRVMgPSB7XG4gIGp1c3RTdWJDb250YWluZXJzOiAxLFxuICBub1N1YkNvbnRhaW5lcnM6IDIsXG4gIGltYWdlc0luU3ViQ29udGFpbmVyczogM1xufTtcblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkID09PT09ICovXG5sZXQgcHJpdmF0ZUZ1bmN0aW9ucyA9IHtcbiAgX2dldFN0YWdlSW5kZXgsXG4gIF9jcmVhdGVTdWJDb250YWluZXJzLFxuICBfY2FjaGVMYXllcixcbiAgX3NldENvcnJlY3RTdWJDb250YWluZXIsXG4gIF9nZXRDb3JyZWN0Q29udGFpbmVyXG59O1xuXG4vKiogPT09PT0gVmFsaWRhdG9ycyB1c2VkIGluIHRoaXMgbW9kdWxlLiBJbXBvcnRlZCBmcm9tIG1hcF92YWxpZGF0b3JzID09PT09ICovXG5sZXQgdmFsaWRhdG9ycyA9IHtcbiAgX2lzX2luZGV4OiB2YWxpZGF0b3JNb2QuaXNJbmRleCxcbiAgX2lzX2Jvb2xlYW46IHZhbGlkYXRvck1vZC5pc0Jvb2xlYW4sXG4gIF9pc19jb29yZGluYXRlczogdmFsaWRhdG9yTW9kLmlzQ29vcmRpbmF0ZXMsXG4gIF9pc19TdWJDb250YWluZXJBbW91bnQ6IHZhbGlkYXRvck1vZC5pc1N1YkNvbnRhaW5lckFtb3VudCxcbiAgX2lzX1VzZU9mU3ViTGF5ZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkxheWVycyxcbiAgX2lzX1VzZU9mU3ViQ29udGFpbmVyczogdmFsaWRhdG9yTW9kLmlzVXNlT2ZTdWJDb250YWluZXJzXG59O1xuXG4vKiogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIC8qIENvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIC8qIG92ZXJsb2FkZWQgaW5oZXJpdGVkIG1ldGhvZCAqL1xuICBhZGRDaGlsZFRvU3ViQ29udGFpbmVyKG9iamVjdCwgaW5kZXgpIHtcbiAgICBsZXQgZnVuY3Rpb25Ub1VzZSA9IGluZGV4ID8gXCJfYWRkQ2hpbGRBdFwiIDogXCJfYWRkQ2hpbGRcIjtcblxuICAgIGlmKCF0aGlzLnVzZVN1YmNvbnRhaW5lcnMpIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBDb250YWluZXIgZGlyZWN0bHkuIFdldGhlciBpdCBpcyBDb250YWluZXIgb3IgQml0bWFwIGV0Yy4gKi9cbiAgICAgIHRoaXNbZnVuY3Rpb25Ub1VzZV0ob2JqZWN0LCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIFdlIGFkZCB0aGUgb2JqZWN0IHRvIHRoZSBjb3JyZWN0IHN1YkNvbnRhaW5lci4gRm9yIGJldHRlciBsb2dpYyBhbmQgcGVyZm9ybWFuY2UgKi9cbiAgICAgIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gcHJpdmF0ZUZ1bmN0aW9ucy5fZ2V0Q29ycmVjdENvbnRhaW5lci5jYWxsKHRoaXMsIG9iamVjdC54LCBvYmplY3QueSk7XG4gICAgICBjb3JyZWN0U3ViQ29udGFpbmVyLmFkZENoaWxkKG9iamVjdCwgaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgIGlmKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZihjaGlsZC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICEhdGhpcy51c2VTdWJjb250YWluZXJzO1xuICB9XG4gIGlzU2V0VmlzaWJsZSgpIHsgfVxuICBzZXRWaXNpYmxlKCkgeyB9XG4gIHN0YXRpYyBnZXRUeXBlKG5hbWUpIHtcbiAgICByZXR1cm4gVFlQRVNbbmFtZV07XG4gIH1cbn1cblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICAgIHN1cGVyKHNwcml0ZXNoZWV0KTtcbiAgICB0aGlzLnR5cGUgPSBzdWJDb250YWluZXJzID8gVFlQRVMuaW1hZ2VzSW5TdWJDb250YWluZXJzIDogdHlwZTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudXNlU3ViY29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgYWRkQ2hpbGRUb1N1YkNvbnRhaW5lcihvYmplY3QsIGluZGV4KSB7XG4gICAgbGV0IGZ1bmN0aW9uVG9Vc2UgPSBpbmRleCA/IFwiX2FkZENoaWxkQXRcIiA6IFwiX2FkZENoaWxkXCI7XG5cbiAgICBpZighdGhpcy51c2VTdWJjb250YWluZXJzKSB7XG4gICAgICB0aGlzW2Z1bmN0aW9uVG9Vc2VdKG9iamVjdCwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY29ycmVjdFN1YkNvbnRhaW5lciA9IHByaXZhdGVGdW5jdGlvbnMuX2dldENvcnJlY3RDb250YWluZXIuY2FsbCh0aGlzLCBvYmplY3QueCwgb2JqZWN0LnkpO1xuICAgICAgY29ycmVjdFN1YkNvbnRhaW5lci5hZGRDaGlsZChvYmplY3QsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZih0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgY3JlYXRlanMuQ29udGFpbmVyKSB7XG4gICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMudXNlU3ViY29udGFpbmVycztcbiAgfVxuICBpc1NldFZpc2libGUoKSB7IH1cbiAgc2V0VmlzaWJsZSgpIHsgfVxufVxuKi9cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG5mdW5jdGlvbiBfZ2V0U3RhZ2VJbmRleChtYXAsIGNhbnZhcykgeyB9XG5mdW5jdGlvbiBfY3JlYXRlU3ViQ29udGFpbmVycygpIHsgfVxuZnVuY3Rpb24gX2NhY2hlTGF5ZXIoKSB7IH1cbmZ1bmN0aW9uIF9zZXRDb3JyZWN0U3ViQ29udGFpbmVyKCkgeyB9XG5mdW5jdGlvbiBfZ2V0Q29ycmVjdENvbnRhaW5lcih4LCB5KSB7XG4gIGxldCBjb3JyZWN0U3ViQ29udGFpbmVyID0gdGhpcy5nZXRPYmplY3RVbmRlclBvaW50KHgsIHkpO1xuXG4gIHJldHVybiBjb3JyZWN0U3ViQ29udGFpbmVyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbkByZXF1aXJlIHZhbGlkYXRvciBtb2R1bGVcbiovXG5cbmltcG9ydCB7IHZhbGlkYXRvck1vZCB9IGZyb20gXCIuL21hcF92YWxpZGF0b3JzXCI7XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCA9PT09PSAqL1xubGV0IHByaXZhdGVGdW5jdGlvbnMgPSB7IH07XG5cbi8qKiA9PT09PSBWYWxpZGF0b3JzIHVzZWQgaW4gdGhpcyBtb2R1bGUuIEltcG9ydGVkIGZyb20gbWFwX3ZhbGlkYXRvcnMgPT09PT0gKi9cbmxldCB2YWxpZGF0b3JzID0ge1xuICBfaXNfaW5kZXg6IHZhbGlkYXRvck1vZC5pc0luZGV4LFxuICBfaXNfYm9vbGVhbjogdmFsaWRhdG9yTW9kLmlzQm9vbGVhbixcbiAgX2lzX2Nvb3JkaW5hdGVzOiB2YWxpZGF0b3JNb2QuaXNDb29yZGluYXRlcyxcbiAgX2lzX1N1YkNvbnRhaW5lckFtb3VudDogdmFsaWRhdG9yTW9kLmlzU3ViQ29udGFpbmVyQW1vdW50LFxuICBfaXNfVXNlT2ZTdWJMYXllcnM6IHZhbGlkYXRvck1vZC5pc1VzZU9mU3ViTGF5ZXJzLFxuICBfaXNfVXNlT2ZTdWJDb250YWluZXJzOiB2YWxpZGF0b3JNb2QuaXNVc2VPZlN1YkNvbnRhaW5lcnNcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfc3RhZ2UgZXh0ZW5kcyBjcmVhdGVqcy5TdGFnZSB7XG4gIC8qIFRha2VzIHRoZSBjYW52YXMgZWxlbWVudCBhcyBhcmd1bWVudCAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcblxuICAgICAgICAvKiBDb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5kcmF3UmVjdCA9IE1BWUJFIFRISVMgc2hvdWxkIGJlIHRoZSBhcmVhIG9mIHRoZSBjYW52YXMgc2l6ZT8gU28gdGhlIHdob2xlIHN0YWdlIGlzbid0IGRyYXduIG9ubHkgdmlzaWJsZSBwYXJ0P1xuICAgIH1cbiAgICBnZXRDYWNoZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gICAgfVxuICAgIHNldENhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5faXNfYm9vbGVhbihzdGF0dXMpO1xuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENoaWxkTmFtZWQobmFtZSkge1xuICAgICAgZm9yKGxldCBsYXllciBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjaGlsZDtcblxuICAgICAgICBpZihsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLyogVGhlIG5vZGUtZWFzZWwsIG5vciBtaW5pZmllZCBlYXNlbGpzIGRvZXNuJ3QgaGF2ZSB0aGUgU3ByaXRlU3RhZ2UgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuXG5cbi8qXG5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL2V4dGVuZCc7XG5pbXBvcnQgcHJvbW90ZSBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2NyZWF0ZWpzL3V0aWxzL3Byb21vdGUnO1xuaW1wb3J0IFNwcml0ZUNvbnRhaW5lciBmcm9tICcuLi8uLi8uLi9hc3NldHMvbGliL2Vhc2VsanMvU3ByaXRlQ29udGFpbmVyL1Nwcml0ZUNvbnRhaW5lcic7XG5pbXBvcnQgU3ByaXRlU3RhZ2UgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVTdGFnZSc7XG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZVN0YWdlIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlU3RhZ2Uge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuXG5cbiAgICAgICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gICAgfVxuICAgIGdldENhY2hlRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0Q2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgICAgICB2YWxpZGF0b3JzLl9pc19ib29sZWFuKHN0YXR1cyk7XG4gICAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgICBmb3IobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICAgIGlmKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoaXMgY2xhc3MgbmVlZHMgdG8gYmUgZ29uZSB0aHJvdWdoIGNhcmVmdWxseSwgaXQgaGFzIGJlZW4gY29waWVkIGZyb20gYW4gb2xkZXIgdmVyc2lvbiBzdHJhaWdodC4gVGhlIHZlcnNpb24gd2FzIEVTNVxuQHBhcmFtIHtjcmVhdGVqcy5Qb2ludH0gY29vcmRzIC0gdGhlIGNvb3JkaW5hdGUgd2hlcmUgdGhlIG9iamVjdCBpcyBsb2NhdGVkIGF0XG5AcGFyYW0ge30gZGF0YSAtIG9iamVjdHMgZGF0YSwgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGdhbWUuIEl0IHdpbGwgbm90IGFjdHVhbGx5IGJlIG1haW5seSB1c2VkIGluIGdyYXBoaWNhbFxuYnV0IHJhdGhlciB0aGluZ3MgbGlrZSB1bml0LWRhdGEgYW5kIGNpdHktZGF0YSBwcmVzZW50YXRpb25zIGV0Yy5cbkBwYXJhbSB7Y3JlYXRlanMuU3ByaXRlU2hlZXR9IHNwcml0ZVNoZWV0XG5AcGFyYW0ge0ludF0gY3VyckZyYW1lTnVtYmVyIC0gdGhlIGN1cnJlbnQgZnJhbWVzIG51bWJlci4gVGhpcyBpcyBiYXNpY2FsbHkgdGhlIGluaXRpYWwgaW1hZ2UsIHdlIGNhbiBjaGFuZ2UgaXQgbGF0ZXJcbmZvciBhbmltYXRpb24gb3Igc3VjaFxuXG5BbGwgb2YgdGhlIG9iamVjdHMgbmVlZCB0byBoYXZlIHNhbWUgYXJndW1lbnRBUEkgZm9yIGNyZWF0aW5nIG9iamVjdHM6IGNvb3JkcywgZGF0YSwgaW1hZ2VEYXRhXG4qL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0c19zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBpbWFnZURhdGEpIHtcbiAgICBzdXBlcihpbWFnZURhdGEuc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJnZW5lcmFsIE9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcblxuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gaW1hZ2VEYXRhLmN1cnJlbnRGcmFtZU51bWJlcjtcblxuICAgIC8qIEV4ZWN1dGUgaW5pdGlhbCBkcmF3IGZ1bmN0aW9uICovXG4gICAgdGhpcy5pbm5lckRyYXcoY29vcmRzLngsIGNvb3Jkcy55KTtcblxuICAgIC8qIG9wdGltaXphdGlvbnMgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIFNob3VsZCBiZSBlbmFibGVkLCBpZiB0aGUgbGF5ZXIgaXMgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLiBMaWtlIHVuaXQgbGF5ZXIuIFRoaXMgd2F5IHdlIGNhbiB1c2UgY3Vyc29yIHBvaW50ZXIgZXRjLlxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgLy8gRk9SIERFQlVHR0lORyBBTkQgU0VFSU5HIFRIQVQgTElTVEVORVJTIEFSRSBBVFRBQ0hFRDpcbiAgICAvL3RoaXMud2lsbFRyaWdnZXJcbiAgfVxuICBzZXREYXRhKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyogRHJhd2luZyB0aGUgb2JqZWN0IHdpdGggY3JlYXRlanMtbWV0aG9kcyAqL1xuICBpbm5lckRyYXcoeCwgeSkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoIHRoaXMuY3VyckZyYW1lTnVtYmVyICk7XG4gICAgY29uc29sZS5sb2coXCJIQUFBXCIpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIC8qIFRoZSBtb3VzZSBjaGVjayBoYXMgYmVlbiBlbmFibGVkIG9uIGhpZ2hlciB0aWVyLCBzbyBubyBuZWVkIGZvciB0aGlzXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTsgKi9cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZU51bWJlcikge1xuICAgIHRoaXMuY3VyckZyYW1lTnVtYmVyID0gbmV3RnJhbWVOdW1iZXI7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XG4gIH1cbiAgLyogRHVubm8gaWYgd2UgbmVlZCB0aGlzIGFuZCBzbyBvbi4gVGhpcyB3YXMgaW4gdGhlIG9sZCB2ZXJzaW9uICovXG4gIGdsb2JhbENvb3JkcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogTnVtYmVyKCB0aGlzLnggKyB0aGlzLnBhcmVudC54ICksXG4gICAgICB5OiBOdW1iZXIoIHRoaXMueSArIHRoaXMucGFyZW50LnkgKVxuICAgIH07XG4gIH1cbiAgZ2V0Qm91bmRzRnJvbUZyYW1lcygpIHtcbiAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU2hlZXQuZ2V0RnJhbWVCb3VuZHMoIHRoaXMuY3VycmVudEZyYW1lICk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBIb2xkIGRpZmZlcmVudCB2YWxpZGF0b3IgZnVuY3Rpb25zIHRvIGJlIHVzZWQgaW4gbW9kdWxlcyAqL1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgPT09PT0gKi9cbmxldCBwcml2YXRlRnVuY3Rpb25zID0ge1xuICBfaXNJbnRcbn07XG5cbi8qKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBsZXQgdmFsaWRhdG9yTW9kID0gKGZ1bmN0aW9uIHZhbGlkYXRvck1vZCgpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0luZGV4KGludCkge1xuICAgICAgICByZXR1cm4gcHJpdmF0ZUZ1bmN0aW9ucy5pc0ludChpbnQpO1xuICAgIH0sXG4gICAgaXNCb29sZWFuKGJvb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvb2wgPT09IEJvb2xlYW4oYm9vbCk7XG4gICAgfSxcbiAgICBpc0Nvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICAgICAgaWYocHJpdmF0ZUZ1bmN0aW9ucy5pc0ludCh4KSAmJiBwcml2YXRlRnVuY3Rpb25zLmlzSW50KHkpICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBpc1N1YkNvbnRhaW5lckFtb3VudCgpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkxheWVycygpIHtcblxuICAgIH0sXG4gICAgaXNVc2VPZlN1YkNvbnRhaW5lcnMoKSB7XG5cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbmZ1bmN0aW9uIF9pc0ludCh3YW5uYWJlSW50KSB7XG4gIC8qIEVTNiAqL1xuICBpZihOdW1iZXIuaXNJbnRlZ2VyKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIod2FubmFiZUludCk7XG4gIH1cblxuICAvKiBFUzUgKi9cbiAgcmV0dXJuIHR5cGVvZiB3YW5uYWJlSW50ID09PSAnbnVtYmVyJyAmJiAod2FubmFiZUludCAlIDEpID09PSAwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG5sZXQgYWxsU3ByaXRlc2hlZXRzID0gW107XG5sZXQgYWxsU3ByaXRlc2hlZXRJRHMgPSBbXTtcblxuLyogU2luZ2xldG9uIHNvIHdlIGRvbid0IHVzZSBjbGFzcyBkZWZpbml0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlc2hlZXRMaXN0ICgpIHtcbiAgbGV0IHNjb3BlID0ge307XG5cbiAgc2NvcGUuYWRkU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgbGV0IHNwcml0ZVNoZWV0O1xuXG4gICAgaWYoc2NvcGUuc3ByaXRlc2hlZXRBbHJlYWR5RXhpc3RzKCBfY3JlYXRlSUQoIHNwcml0ZXNoZWV0RGF0YSApICkgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcblxuICAgIGFsbFNwcml0ZXNoZWV0cy5wdXNoKCBzcHJpdGVTaGVldCApO1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChzcHJpdGVzaGVldCkge1xuXG4gIH07XG4gIHNjb3BlLmdldEFsbFNwcml0ZXNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuICBzY29wZS5zcHJpdGVzaGVldEFscmVhZHlFeGlzdHMgPSBmdW5jdGlvbiAoc3ByaXRlc2hlZXRJRCkge1xuICAgIHJldHVybiAoIGFsbFNwcml0ZXNoZWV0SURzLmluZGV4T2YoIHNwcml0ZXNoZWV0SUQgKSA+IC0xICk7XG4gIH07XG4gIGZ1bmN0aW9uIF9jcmVhdGVJRCAoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuICggc3ByaXRlc2hlZXREYXRhLmltYWdlcy50b1N0cmluZygpICk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogKi9cblxuaW1wb3J0IHsgT2JqZWN0c19zcHJpdGUgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvT2JqZWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RzX3RlcnJhaW4gZXh0ZW5kcyBPYmplY3RzX3Nwcml0ZSB7XG4gIGNvbnN0cnVjdChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdFwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3RzX3Nwcml0ZSB9IGZyb20gJy4uL2NvcmUvT2JqZWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RzX3VuaXQgZXh0ZW5kcyBPYmplY3RzX3Nwcml0ZSB7XG4gIGNvbnN0cnVjdChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlci5zcHJpdGVTaGVldChjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNcIjtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuQ3JlYXRpbmcgdGhlIGNyZWF0ZWpzUXVldWUtb2JqZWN0IGZyb20gc3ByaXRlc2hlZXQuIFRoaXMgcHJlbG9hZHMgYXNzZXN0cy5cblxuQHJlcXVpcmVzIGNyZWF0ZWpzIENyZWF0ZWpzIGxpYnJhcnkgLyBmcmFtZXdvcmsgb2JqZWN0IC0gZ2xvYmFsIG9iamVjdFxuQHBhcmFtIHtzdHJpbmd9IGJhc2VQYXRoXG5AdG9kbyBNYWtlIGEgbG9hZGVyIGdyYXBoaWNzIC8gbm90aWZpZXIgd2hlbiBsb2FkaW5nIGFzc2V0cyB1c2luZyBwcmVsb2FkZXIuXG5cblVzYWdlOiBwcmVsb2FkLmdlbmVyYXRlKFwiaHR0cDovL3BhdGguZmkvcGF0aFwiKS5vbkNvbXBsZXRlKCkudGhlbihmdW5jdGlvbigpIHt9KTtcbiovXG5leHBvcnQgY2xhc3MgcHJlbG9hZCBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gIH1cbiAgcmVzb2x2ZU9uQ29tcGxldGUgKCkge1xuICAgIHZhciBiaW5kZWRPbkNvbXBsZXRlID0gX29uQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGJpbmRlZE9uQ29tcGxldGUpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICBmdW5jdGlvbiBfb25Db21wbGV0ZShyZXNvbHZlKSB7XG4gICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbG9hZE1hbmlmZXN0ICguLi5hcmdzKSB7XG4gICAgc3VwZXIubG9hZE1hbmlmZXN0KC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0RXJyb3JIYW5kbGVyIChlcnJvckNCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIGVycm9yQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0UHJvZ3Jlc3NIYW5kbGVyIChwcm9ncmVzc0NCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIHByb2dyZXNzQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWN0aXZhdGVTb3VuZCAoKSB7XG4gICAgdGhpcy5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgfVxufSIsImV4cG9ydCBsZXQgZ3JhcGhpY0RhdGEgPSB7XG4gIFwiZ2VuZXJhbFwiOntcbiAgICBcInRlcnJhaW5cIjp7XG4gICAgICBcInRpbGVXaWR0aFwiOjk2LFwidGlsZUhlaWdodFwiOjQ4XG5cbiAgICB9XG4gIH0sXG4gIFwidGVycmFpbkJhc2VcIjp7XG4gICAgXCJpbWFnZXNcIjpcbiAgICBbXCJhc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXSxcbiAgICBcImZyYW1lc1wiOltcbiAgICAgIFswLDAsOTYsNDhdLFswLDQ4LDk2LDQ4XSxbMCw5Niw5Niw0OF0sWzAsMTQ0LDk2LDQ4XSxbMCwxOTIsOTYsNDhdLFswLDI0MCw5Niw0OF1cbiAgICBdLFxuICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICB9LFxuICBcInRlcnJhaW5cIjp7XG4gICAgXCJpbWFnZXNcIjpbXCJhc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICBcImZyYW1lc1wiOltcbiAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICBdLFxuICAgIFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XVxuICB9LFxuICBcImRpdGhlclwiOntcImltYWdlc1wiOltcImltZy9tYXAvZGl0aGVyMi5wbmdcIl0sXCJmcmFtZXNcIjpbWzAsMCw5Niw0OF1dLFwiaW1hZ2VTaXplXCI6Wzk2LDQ4XX0sXG4gIFwicHJldHRpZmllclwiOntcbiAgICBcImltYWdlc1wiOltcImFzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiaW1nL21hcC9hbXBsaW8yL2hpbGxzLnBuZ1wiLFwiaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4yLnBuZ1wiXSxcbiAgICBcImZyYW1lc1wiOltcbiAgICAgIFsxLDEsOTYsNjYsMCwwLDE4XSxbMSwxLDk2LDQ4LDEsLTQsNF0sWzEsMTQ4LDk2LDQ4LDJdXG4gICAgXVxuICB9LFxuICBcInJlc291cmNlXCI6e1xuICAgIFwiaW1hZ2VzXCI6W1wiYXNzZXRzL2ltZy9tYXAvcmVzb3VyY2VzL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICBcImZyYW1lc1wiOltcbiAgICAgIFsxOTUsMSw5Niw0OF0sWzM4OSwxLDk2LDQ4XVxuICAgIF1cbiAgfSxcbiAgXCJwbGFjZVwiOnt9LFxuICBcImNpdHlcIjp7XG4gICAgXCJpbWFnZXNcIjpbXCJhc3NldHMvaW1nL21hcC9hbXBsaW8yL21lZGlldmFsY2l0aWVzLnBuZ1wiXSxcbiAgICBcImZyYW1lc1wiOltcbiAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1dfSxcImJ1aWxkaW5nXCI6e1wiaW1hZ2VzXCI6W1wiaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcImZyYW1lc1wiOltbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXV19LFwibW9kaWZpZXJcIjp7XCJpbWFnZXNcIjpbXCJpbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFwiZnJhbWVzXCI6W1sxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXX0sXCJ1bml0XCI6e1wiaW1hZ2VzXCI6W1wiaW1nL21hcC9hbXBsaW8yL3VuaXRzLnBuZ1wiXSxcImZyYW1lc1wiOntcIndpZHRoXCI6NjYsXCJoZWlnaHRcIjo1MH19fTsiLCJleHBvcnQgbGV0IHRlcnJhaW5EYXRhID0ge1xuICAgXCJnYW1lSURcIjpcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICAgXCJvYmplY3RzXCI6W1xuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjBcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42MzNaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiOFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjoyNDBcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42MzlaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjo1LFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjo0ODBcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NDFaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjozLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzJcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6NzIwXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjQ1WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjk2MFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY0N1pcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjY1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjoxMjAwXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjQ5WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmQxXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjE0NDBcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NTJaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2ZDZcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjo0OCxcbiAgICAgICAgICAgIFwieVwiOjcyXG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjU0WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI0XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjQ4XG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjM3WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6NSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjlcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6Mjg4XG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjM5WlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmJlXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgICAgIFwieVwiOjUyOFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY0NFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjM1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjo3NjhcbiAgICAgICAgIH0sXG4gICAgICAgICBcInRpbWVzdGFtcFwiOlwiMjAxNC0wNS0yNlQxNzo0MzozNy42NDZaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjozLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjowLFxuICAgICAgICAgICAgXCJ5XCI6MTAwOFxuICAgICAgICAgfSxcbiAgICAgICAgIFwidGltZXN0YW1wXCI6XCIyMDE0LTA1LTI2VDE3OjQzOjM3LjY0OFpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICAgICBcInlcIjoxMjQ4XG4gICAgICAgICB9LFxuICAgICAgICAgXCJ0aW1lc3RhbXBcIjpcIjIwMTQtMDUtMjZUMTc6NDM6MzcuNjUwWlwiXG4gICAgICB9XG4gICBdXG59IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcIm1hcHZpZXdzXCI6WzAsMSwyLDMsNF0sXCJ1bml0XCI6W3tcIm5hbWVcIjpcInRhbmtcIixcImRlc2NcIjpcIlZyb29vbS4uLlwiLFwiaW1hZ2VcIjpcIjBcIixcImF0dFwiOlwiR29vZFwiLFwiZGVmXCI6XCJQb29yXCIsXCJzaWVnZVwiOlwiRGVjZW50XCIsXCJpbml0aWF0ZVwiOlwiOTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjE1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIn0se1wibmFtZVwiOlwiY2FycmllclwiLFwiZGVzY1wiOlwiYW5ncnkgYmVlaGl2ZVwiLFwiaW1hZ2VcIjpcIjZcIixcImF0dFwiOlwiMVwiLFwiZGVmXCI6XCIyXCIsXCJzaWVnZVwiOlwiMlwiLFwiaW5pdGlhdGVcIjpcIjExMFwiLFwibW92ZVwiOlwiMTAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMjUwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiLFwibW9kaWZpZXJzXCI6e1widW5pdFwiOntcIl9lbmVteV9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIn19XX19fSx7XCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwifV0sXCJ0ZXJyYWluQmFzZVwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn0se1wiaW1hZ2VcIjpcIjJcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifSx7XCJpbWFnZVwiOlwiM1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9LHtcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn0se1wiaW1hZ2VcIjpcIjVcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXCJ0ZXJyYWluXCI6W3tcIm5hbWVcIjpcImRlc2VydFwiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcInZlcnkgZHJ5IGxhbmRcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxIGZvb2QgZm9yIGNpdGllc1wifX1dfX19LHtcIm5hbWVcIjpcInBsYWluXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQnVmZmFsbyByb2FtaW5nIGFyZWFcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJ9fV19fX0se1wibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJ9fV19fX0se1wibmFtZVwiOlwidHVuZHJhXCIsXCJkZXNjXCI6XCJTaWJlcmlhIHRlYWNoZXMgeW91XCIsXCJpbWFnZVwiOlwiNlwifSx7XCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIn0se1wibmFtZVwiOlwic3dhbXBcIixcImRlc2NcIjpcIkNyYW5iZXJyaWVzIGFuZCBjbG91ZGJlcnJpZXNcIixcImltYWdlXCI6XCI4XCJ9XSxcImRpdGhlclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCJ9XSxcInByZXR0aWZpZXJcIjpbe1wiaW1hZ2VcIjpcIjBcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIyNSVcIn0se1wiaW1hZ2VcIjpcIjFcIixcInpJbmRleFwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCI0MCVcIn0se1wiaW1hZ2VcIjpcIjJcIixcInpJbmRleFwiOlwiMFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCI2MCVcIn1dLFwicmVzb3VyY2VcIjpbe1wibmFtZVwiOlwiT2FzaXNcIixcImltYWdlXCI6XCIwXCIsXCJkZXNjXCI6XCJPYXNpcyBpbiB0aGUgbWlkZGxlIG9mIGRlc2VydCwgb3Igbm90IGF0bS5cIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcImZvb2QgcHJvZHVjdGlvbiA1IC8gd2Vla1wifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJPaWxcIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCbGFjayBnb2xkXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJUaGVyZSBpcyBhIGxvdCBvZiBvaWwgaGVyZVwifX1dfX0sXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCI0XCJdLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJjaXR5XCI6W3tcIm5hbWVcIjpcIk1lZGlldmFsXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjBcIixcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiTWVkaWV2YWwyXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW1hZ2VcIjpcIjFcIixcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwicGxhY2VcIjpbXSxcImJ1aWxkaW5nXCI6W3tcIm5hbWVcIjpcIkJhcnJhY2tzXCIsXCJpbWFnZVwiOlwiMFwiLFwidG9vbHRpcFwiOlwiRW5hYmxlcyB0cm9vcCByZWNydWl0bWVudFwifSx7XCJuYW1lXCI6XCJGYWN0b3J5XCIsXCJpbWFnZVwiOlwiMVwiLFwidG9vbHRpcFwiOlwiUHJvZHVjZXMgd2VhcG9ucnlcIn1dLFwiZ292ZXJubWVudFwiOlt7XCJuYW1lXCI6XCJEZW1vY3JhenlcIixcImRlc2NyaXB0aW9uXCI6XCJ3ZWxsIGl0J3MgYSBkZW1vY3JhenkgOilcIixcInRvb2x0aXBcIjpcIkdpdmVzICsyMCUgaGFwcGluZXNzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlswLDFdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJoYXBwaW5lc3NcIjpcIjIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDb21tdW5pc21cIixcImRlc2NyaXB0aW9uXCI6XCJZb3Uga25vdyB0aGUgb25lIHVzZWQgaW4gdGhlIGdyZWF0IFVTU1IgYW5kIGluc2lkZSB0aGUgZ3JlYXQgZmlyZXdhbGwgb2YgQ2hpbmFcIixcInRvb2x0aXBcIjpcIkdpdmVzIHByb2R1Y3Rpb24gYm9udXNlc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMiwzXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e319XX19LFwiQ2l0eVwiOntcImJ1aWxkaW5nXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCIyMCVcIn19XX19fX1dLFwicG9saXRpY3NcIjp7XCJ0YXhSYXRlXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiY29ycnVwdGlvblwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImFsaWdubWVudFwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImhhcHBpbmVzc1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInJldm9sdFJpc2tcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJ1bml0eVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcIm5hdFZhbHVlXCI6W3tcIm5hbWVcIjpcIkludGVncml0eVwiLFwidG9vbHRpcFwiOlwiR292ZXJubWVudCBhbmQgcG9wdWxhdGlvbnMgc2hvd3MgaW50ZWdyaXR5IGFuZCB0cnVzdHdvcnRoaW5lc3NcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaW50ZXJuYWxSZWxhdGlvbnNcIjpcIisxMCVcIixcImRpcGxvbWFjeVwiOlwiKzEwJVwiLFwicmV2b2x0IHJpc2tcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiLTIwJVwifX1dfX19fSx7XCJuYW1lXCI6XCJDYXBpdGFsaXNtXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImRpcGxvbWFjeVwiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcIm1vcmFsZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkhhcmR3b3JraW5nXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzEwJVwiLFwiaGFwcGluZXNzXCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJMZWFkZXJzaGlwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpdml0eVwiOlwiKzUlXCIsXCJoYXBwaW5lc3NcIjpcIi01JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJ0cmFkaW5nXCI6XCIrMTAlXCJ9fV19fX19XX19OyJdfQ==
