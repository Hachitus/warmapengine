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
/** Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic */

/* ====== Own module imports ====== */

var _mapCoreMap = require('../map/core/Map');

var _mapExtensionsHexagonsObjectObject_terrain_hexa = require('../map/extensions/hexagons/object/Object_terrain_hexa');

var _mapExtensionsHexagonsObjectObject_unit_hexa = require('../map/extensions/hexagons/object/Object_unit_hexa');

var _mapCoreSpritesheetList = require('../map/core/spritesheetList');

var _mapCoreUI = require('../map/core/UI');

var _mapUIsDefaultDefaultJs = require('../map/UIs/default/default.js');

var allSpritesheets = (0, _mapCoreSpritesheetList.spritesheetList)();

var functionsInObj = {
  Object_terrain: _mapExtensionsHexagonsObjectObject_terrain_hexa.Object_terrain_hexa,
  Object_unit: _mapExtensionsHexagonsObjectObject_unit_hexa.Object_unit_hexa
};

/* ===== EXPORT ===== */
/**
 * @param {DOMElement Canvas} canvasElement the canvas element for the map
 * @param {Object} gameDataArg gameData. More specific data in data-folders test-datas
 * @param {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
 * More specific data in data-folders test-datas
 * @param {Object} typeDataArg typeData. More specific data in data-folders test-datas.
*/

function createMap(canvasElement, gameDataArg, mapDataArg, typeDataArg) {
  console.log('============================================');
  var mapData = typeof mapDataArg === 'string' ? JSON.parse(mapDataArg) : mapDataArg;
  var typeData = typeof typeDataArg === 'string' ? JSON.parse(typeDataArg) : typeDataArg;
  var gameData = typeof gameDataArg === 'string' ? JSON.parse(gameDataArg) : gameDataArg;
  var map = new _mapCoreMap.Map(canvasElement, { mapSize: gameData.mapSize });
  var dialog_selection = document.getElementById('selectionDialog');
  var defaultUI = new _mapUIsDefaultDefaultJs.UI_default(dialog_selection);
  defaultUI.init();

  /* Initialize UI as singleton */
  (0, _mapCoreUI.UI)(defaultUI, map);

  /* We iterate through the given map data and create objects accordingly */
  mapData.layers.forEach(function (layerData) {
    var thisLayer = undefined;

    try {
      thisLayer = map.addLayer(layerData.name, false, layerData.coord);
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

        spritesheet = allSpritesheets.createSpritesheet(spritesheetData);
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
}

},{"../map/UIs/default/default.js":4,"../map/core/Map":5,"../map/core/UI":9,"../map/core/spritesheetList":12,"../map/extensions/hexagons/object/Object_terrain_hexa":16,"../map/extensions/hexagons/object/Object_unit_hexa":17}],4:[function(require,module,exports){
/** The simplest default UI implementation. Implement UI functionalities for:
 * showSelections
 * highlightSelectedObject
 *
 * @todo IN PROGRESS, not implemented well yet. Uses chromes built-in modal support only atm. just for the kicks :)  */

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
    key: "highlightSelectedObject",
    value: function highlightSelectedObject(object) {}
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

// Not implemented yet

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
    this.mommyLayer = new _Map_layer.Map_layer('mommyLayer', options.subContainers, options.startCoord);
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
    value: function addLayer(name, subContainers, coord) {
      var layer = new _Map_layer.Map_layer(name, subContainers, coord);

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

    /** Activate plugins for the map. Plugins need .pluginName property and .init-method
    @param [Array] pluginsArray - Array that consists of the plugin modules */
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

    /** Custom tick handler that can be given to map. The default tick handler is by default
    always on and will not be affected
    @param [Function] tickCB - Callback function to use in tick */
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

    /** getter and setter for detecting if map is moved and setting the maps status as moved or not moved */
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

},{"./Map_layer":6,"./Map_stage":7,"./eventlisteners":10,"./move/map_drag":11,"./utils/utils":13,"./zoom/map_zoom":14}],6:[function(require,module,exports){
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
*/

/**
 * @todo this.preventSelection. This should determine wether this stage holds data that can be selected by the player
 */

/**
 * @todo subContainers. Subcontainers are containers inside layers designed to group up objects to smaller containers. So e.g.
 * getObjectsUnderPoint is faster. This has not been efficiently tested from performance wise so the feature will be
 * added after the basic map module works and we can verify the effect well */

/* ===== EXPORT ===== */

var Map_layer = (function (_createjs$Container) {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */

  function Map_layer(name, subContainers, coord) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this._cacheEnabled = true;
    this.subContainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = true;
    this.preventSelection = false;
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.visible = true;
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }

  _inherits(Map_layer, _createjs$Container);

  _createClass(Map_layer, [{
    key: "cacheEnabled",

    /** setter and getter
     * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }
  }, {
    key: "move",

    /** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
     { x: 5, y: 0 }
     @return this layer instance */
    value: function move(coordinates) {
      if (this.movable) {
        this.x += coordinates.x;
        this.y += coordinates.y;
        this.drawThisChild = true;
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
      return !!this.subContainers;
    }
  }]);

  return Map_layer;
})(createjs.Container);

exports.Map_layer = Map_layer;

/**
 * @todo implement spriteContainer! It should be more efficient when using spritesheets. Only issue was that minified
 * easeljs doesn't have the spriteStage (and spriteContainer?) and neither the node-easel (and node doesn't have the extend) */
/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';

export class Map_spritesheetLayer extends createjs.SpriteContainer {
  constructor(name, type, subContainers, spritesheet) {
  }
}
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

/**
@require the createjs framework in global namespace
*/

/* ===== EXPORT ===== */

var Map_stage = (function (_createjs$Stage) {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {DOM Canvas element} canvas REQUIRED! Canvas element used by the map
   * @param {x: Number, y: Number} stageBounds Set stage bounds based on these coordinates
  */

  function Map_stage(name, canvas, stageBounds) {
    _classCallCheck(this, Map_stage);

    if (!canvas) {
      throw new Error(Map_stage.constructor.name + " needs canvas!");
    }

    _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).call(this, canvas);

    if (stageBounds) {
      this.setBounds(0, 0, stageBounds.x, stageBounds.y);
    }

    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.mouseEnabled = true;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }

  _inherits(Map_stage, _createjs$Stage);

  _createClass(Map_stage, [{
    key: "cacheEnabled",

    /** setter and getter
     * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }
  }, {
    key: "ChildNamed",
    value: function ChildNamed(name) {
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

/**
 * @todo implement spriteStage! It should be more efficient when using spritesheets. Only issue was that minified
 * easeljs doesn't have the spriteStage and neither the node-easel (and node doesn't have the extend) */

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** The actual objects used on the map (suchs as terrain and units), under stages and containers.
@param {createjs.Point} coords - the coordinate where the object is located at
@param {} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
but rather things like unit-data and city-data presentations etc.
@param {createjs.SpriteSheet} spriteSheet
@param {Int] currFrameNumber - the current frames number. This is basically the initial image, we can change it later
for animation or such

All of the objects need to have same argumentAPI for creating objects: coords, data, imageData */

var Object_sprite = (function (_createjs$Sprite) {
  function Object_sprite(coords, data, spritesheet, currentFrameNumber) {
    _classCallCheck(this, Object_sprite);

    _get(Object.getPrototypeOf(Object_sprite.prototype), "constructor", this).call(this, spritesheet);

    this.name = "Objects_sprite_" + this.id;
    /* Set data for the object next */
    this.data = data || {};
    this.currFrameNumber = currentFrameNumber;
    /* Execute initial draw function */
    this.innerDraw(coords.x, coords.y);
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.shadow = true;
    this.tickEnabled = false;
    this.mouseEnabled = false;
  }

  _inherits(Object_sprite, _createjs$Sprite);

  _createClass(Object_sprite, [{
    key: "innerDraw",

    /** Drawing the object with createjs-methods
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @return this object instance */
    value: function innerDraw(x, y) {
      this.gotoAndStop(this.currFrameNumber);
      this.x = x;
      this.y = y;

      return this;
    }
  }, {
    key: "drawNewFrame",

    /** Draws new frame to animate or such
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @param {Number} newFrameNumber New frame number to animate to
     * @return this object instance */
    value: function drawNewFrame(x, y, newFrameNumber) {
      this.currFrameNumber = newFrameNumber;

      return this.innerDraw(x, y);
    }
  }]);

  return Object_sprite;
})(createjs.Sprite);

exports.Object_sprite = Object_sprite;

},{}],9:[function(require,module,exports){
/** Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
 * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and
 * bringing the unit on top in the map.
 *
 * @param {Module} givenUITheme the module that will be used for the UI theme
 * @param {Map} givenMap Map instance that is used
 * @return UI module
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = UI;
/** The abstract UI module for the core map functionality. This is used by defining UI Themes that implement this
 * core UI module.
 * Default methods to use in UI are:
 * showSelections and highlightSelectedObject. More methods can be extended to UI with plugins
 *
 * @todo Not implemented fully yet and probably need refactoring */
var scope;

function UI(givenUITheme, givenMap) {
  /* SINGLETON MODULE */
  if (scope) {
    return scope;
  }

  if (!givenUITheme || !givenMap) {
    throw new Error("UI-module requires UITheme and map object");
  }

  var map = givenMap;
  var UITheme = givenUITheme;
  scope = {};

  /** Responsible for showing selectiong element, where the player select the wanted object out of array of objects.
   * For example if there are several objects in one tile on the map and the player needs to be able to select one
   * specific unit on the stack */
  scope.showSelections = function showSelections(objects) {
    return UITheme.showSelections(map, objects);
  };
  /** Resonsible for hignlighting the selected object. For example the unit that is being commanded. The hightlight
   * can mean e.g. bringing the unit on top on the map and showing selection circle around it. */
  scope.highlightSelectedObject = function highlightSelectedObject(object) {
    return UITheme.highlightSelectedObject(map, object);
  };

  return scope;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently. */

var singletonScope;

/* ===== EXPORT ===== */
/**
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this
 * class. I.e.
 {
   select: function() {},
   zoom: function() {}
 }*/
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
/** The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 * @todo See if this plugin need refactoring and more documentation */

var _eventlisteners = require('../eventlisteners');

var map_drag = (function map_drag() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();
  var eventlisteners;

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = map_drag.name;

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    eventlisteners = (0, _eventlisteners.eventListeners)(map.eventCBs);
    map.eventCBs.drag = _startDragListener(map);

    //map.setListener("mousedown", _startDragListener(map));
    eventlisteners.toggleDragListener();
  };

  return scope;

  /** Starts the whole functionality of this class
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
  /** Function for setting and getting the mouse offset. */
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
/** We want to put spritesheets to their own module, so they are separated and e.g. we can remove createjs from the
 * spritesheet if needed */

'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.spritesheetList = spritesheetList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _blueimpMd5 = require('blueimp-md5');

var _blueimpMd52 = _interopRequireDefault(_blueimpMd5);

var allSpritesheets = {};

/* Singleton so we don't use class definition */

function spritesheetList() {
  var scope = {};

  /** Create new spritesheet (new createjs.SpriteSheet()) and keeps it in object collection. So we don't create acciden-
   * tally another one and we can safely remove it later.
   * @param {Object} spritesheetData Object that contains createjs-compatible spritesheetData
   * @return new spritesheet instance to use. */
  scope.createSpritesheet = function createSpritesheet(spritesheetData) {
    var spriteSheet;
    var ID = scope.getSpritesheetID(spritesheetData);

    if (allSpritesheets[ID]) {
      return allSpritesheets[ID];
    }

    spriteSheet = new createjs.SpriteSheet(spritesheetData);
    allSpritesheets[ID] = spriteSheet;

    return spriteSheet;
  };
  /** Generates identifier for keeping track of spritesheets
   * @param {Object} spritesheetData spritesheetData that is used
   * @return generated hash identifier for spritesheet */
  scope.getSpritesheetID = function getSpritesheetID(spritesheetData) {
    return _blueimpMd52['default'].md5(spritesheetData);
  };
  scope.removeSpritesheet = function removeSpritesheet(spritesheetData) {
    var ID = scope.getSpritesheetID(spritesheetData);
    delete allSpritesheets[ID];
  };
  scope.getAllSpritesheets = function getAllSpritesheets() {
    return allSpritesheets;
  };

  return scope;
}

},{"blueimp-md5":2}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** The core utils for the 2D map engine. */

var mouseUtils = (function mouseUtils() {
  var scope = {};

  /** This function is from: http://www.adomas.org/javascript-mouse-wheel/
    It detects which way the mousewheel has been moved.
    zero delta = mouse wheel not moved
    positive delta = scrolled up
    negative delta = scrolled down
     @param {Event} event pass the event to deltaFromWheel
    @return delta. Positive if wheel was scrolled up, and negative, if wheel was scrolled down. */
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
  /** Has the mouse click been right mouse button
   * @param {Event} event The event where the click occured */
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
  /** Sets canvas size to maximum width and height on the browser, not using fullscreen
   * @param {DOMElement Canvas context} context */
  setToFullSize: function setToFullSize(context) {
    return function fullSize() {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
    };
  }
};

exports.resizeUtils = resizeUtils;
/** Utils for adding event handlers on the map and keeping track of them.
 * @todo Go over the module and see if it is really needed or should be changed. Might be legacy and not needed now */
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

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** ===== OWN imports ===== */

var _utilsUtilsJs = require('../utils/utils.js');

var _eventlisteners = require('../eventlisteners');

'user strict';var map_zoom = (function map_zoom() {
  var scope = {};
  /* Maximum and minimum the player can zoomt he map */
  var zoomLimit = {
    farther: 0.4,
    closer: 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;
  var eventlisteners;
  scope.pluginName = map_zoom.name;

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
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

  /* ==== PROTOTYPE extensions for map */
  /** How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms */
  function setZoomModifier(amount) {
    zoomModifier = amount;

    return this;
  }
  /** How much can be zoomed in maximum and minimum
   * @param {Number 1+} farther How much one mouse wheel step zooms out
   * @param {Number 0 - 1} closer How much one mouse wheel step zooms in */
  function setZoomLimits(farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  /** Zoom in to the map
   * @param {Number} amount how much map is zoomed in */
  function zoomIn(amount) {
    if (_isOverZoomLimit(amount)) this.getLayersWithAttributes('zoomable', true).forEach(function (layer) {
      layer.scaleX -= zoomModifier;
      layer.scaleY -= zoomModifier;
    });

    return this;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
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

var _coreObject = require('../../../core/Object');

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

},{"../../../core/Object":8,"../utils/createHexagon":18,"../utils/hexagonMath":19}],16:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvaG9yaXpvbnRhbEhleGFGYWN0b3J5LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXBfbGF5ZXIuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX3N0YWdlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL09iamVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9VSS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9ldmVudGxpc3RlbmVycy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tb3ZlL21hcF9kcmFnLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS91dGlscy91dGlscy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS96b29tL21hcF96b29tLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7MERBTWEscURBQXFEOzs7O21DQUd0RCw4QkFBOEI7O21DQUM5Qiw4QkFBOEI7O2tDQUMvQiw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBVztBQUNqRCxNQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0QsYUFBUyxFQUFDO0FBQ1IsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzFIO0FBQ0QsaUJBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7S0FDcEI7QUFDRCxZQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUM7QUFDOUYsZ0JBQVksRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHVDQUF1QyxFQUFDLG1DQUFtQyxFQUFDLHNDQUFzQyxDQUFDO0FBQzdILGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUN0RDtLQUNGO0FBQ0QsY0FBVSxFQUFDO0FBQ1QsY0FBUSxFQUFDLENBQUMsd0NBQXdDLENBQUM7QUFDbkQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUM1QjtLQUNGO0FBQ0QsV0FBTyxFQUFDLEVBQUU7QUFDVixVQUFNLEVBQUM7QUFDTCxjQUFRLEVBQUMsQ0FBQyw0Q0FBNEMsQ0FBQztBQUN2RCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVSO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUN2STtLQUNGLEVBQUMsVUFBVSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDdkk7S0FDRjtBQUNELFVBQU0sRUFBQztBQUNMLGNBQVEsRUFBQyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3ZELGNBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVB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QUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyw0Q0FBNEMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsWUFBWSxFQUFDLDBCQUEwQixFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsNEJBQTRCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsMEJBQTBCLEVBQUMsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsZ0ZBQWdGLEVBQUMsU0FBUyxFQUFDLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLGdFQUFnRSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDO0NBQ244SCxDQUFDO1FBOUhTLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IExpYnJhcnkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIE1hcCA9IHJlcXVpcmUoICcuLi9wdWJsaWMvY29tcG9uZW50cy9tYXAvTWFwJyk7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMnO1xuXG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhLmpzJztcblxuLypcbjEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbllvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuaXMgYW5vdGhlciBjbGFzcyAvIG1vZHVsZSB0aGF0IGhhbmRsZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCB5b3UgZGVmaW5lIGEgZ29vZCBzZXQgb2YgcHJpbmNpcGxlIGhvdyBpdCdzIGRvbmUuIERhdGEgaW4gdGhpczpcblwie1xuICBcIm9ialR5cGVcIjoyLFxuICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxufVwiXG5XaGF0IGRvIHdlIGRvIHdpdGggdGhlIF9pZCBhbmQgc2hvdWxkIHRoYXQgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgZGF0YSwgd2hlbiB3ZSBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0cy5cblxuQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbi8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbmRlc2NyaWJlKFwiYmFzaWMgbWFwIC0gd2l0aG91dCBwbHVnaW5zXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIC8qbGV0IG1hcERhdGEgPSB7XG4gICAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICAgIHBsdWdpbnNUb0FjdGl2YXRlOiBmYWxzZSxcbiAgICBzdGFnZXM6IFt7XG4gICAgICB0eXBlOiBcIk1hcF9zdGFnZVwiLFxuICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICAgIGxheWVyczogW3tcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDEsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0se1xuICAgICAgICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIG5hbWU6IFwidW5pdExheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdW5pdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ1bml0XCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcbiAgKi9cblxuXG4gIGRlc2NyaWJlKFwiPT4gbWFrZSBtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1hcCA9IGNyZWF0ZU1hcChtYXBDYW52YXMsIGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG5cbiAgICBpdChcIj0+IGV4aXN0c1wiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KG1hcCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHN0YWdlIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLm5hbWUgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKS5uYW1lICA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KHR5cGVvZiBtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKSA9PT0gXCJvYmplY3RcIikudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gbGF5ZXIgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KHR5cGVvZiBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKSA9PT0gXCJvYmplY3RcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdGVycmFpbiBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInRlcnJhaW5CYXNlTGF5ZXJcIikuY2hpbGRyZW5bMV0ueSApID09PSA0ODApLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuZ2V0TGF5ZXJOYW1lZChcInRlcnJhaW5CYXNlTGF5ZXJcIikuY2hpbGRyZW4ubGVuZ3RoID4gMSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdW5pdCBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ICkgPT09IDYwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICBtYXAuaW5pdCggdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICBmdW5jdGlvbiB0aWNrRG9uZUZ1bmModGlja0RvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG5cblxuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1IDEuMC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqIFxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4vKmdsb2JhbCB1bmVzY2FwZSwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSkge1xuICAgICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpLFxuICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KSB7XG4gICAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sX21kNSh4LCBsZW4pIHtcbiAgICAgICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgICAgICAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAobGVuICUgMzIpO1xuICAgICAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XG5cbiAgICAgICAgdmFyIGksIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQsXG4gICAgICAgICAgICBhID0gIDE3MzI1ODQxOTMsXG4gICAgICAgICAgICBiID0gLTI3MTczMzg3OSxcbiAgICAgICAgICAgIGMgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICAgIGQgPSAgMjcxNzMzODc4O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgb2xkYSA9IGE7XG4gICAgICAgICAgICBvbGRiID0gYjtcbiAgICAgICAgICAgIG9sZGMgPSBjO1xuICAgICAgICAgICAgb2xkZCA9IGQ7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNywgLTY4MDg3NjkzNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE3LCAgNjA2MTA1ODE5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA3LCAtMTc2NDE4ODk3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDcsICAxNzcwMDM1NDE2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDcsICAxODA0NjAzNjgyKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNSwgLTE2NTc5NjUxMCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICA2XSwgIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgIDY0MzcxNzcxMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaV0sICAgICAgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCAgOSwgIDM4MDE2MDgzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA1LCAgNTY4NDQ2NDM4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICAyXSwgIDksIC01MTQwMzc4NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTQsICAxNzM1MzI4NDczKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDQsIC0zNzg1NTgpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDQsICA2ODEyNzkxNzQpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2ldLCAgICAgIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDQsIC02NDAzNjQ0ODcpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICAyXSwgMjMsIC05OTUzMzg2NTEpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA2LCAgMTg3MzMxMzM1OSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG5cbiAgICAgICAgICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICAgICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICAgICAgICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICAgICAgICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2EsIGIsIGMsIGRdO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmwycnN0cihpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogMzI7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDg7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhGRikgPDwgKGkgJSAzMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX21kNShzKSB7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUocnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX2htYWNfbWQ1KGtleSwgZGF0YSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGJrZXkgPSByc3RyMmJpbmwoa2V5KSxcbiAgICAgICAgICAgIGlwYWQgPSBbXSxcbiAgICAgICAgICAgIG9wYWQgPSBbXSxcbiAgICAgICAgICAgIGhhc2g7XG4gICAgICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgICBia2V5ID0gYmlubF9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgICAgICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaCA9IGJpbmxfbWQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgICAgIHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxuICAgICAgICAgICAgb3V0cHV0ID0gJycsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXG4gICAgICAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxuICAgICovXG4gICAgZnVuY3Rpb24gc3RyMnJzdHJfdXRmOChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xuICAgICovXG4gICAgZnVuY3Rpb24gcmF3X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyX21kNShzdHIycnN0cl91dGY4KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfbWQ1KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmF3X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfaG1hY19tZDUoc3RyMnJzdHJfdXRmOChrKSwgc3RyMnJzdHJfdXRmOChkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfaG1hY19tZDUoaywgZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoZXhfbWQ1KHN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmF3X21kNShzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWQ1O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkLm1kNSA9IG1kNTtcbiAgICB9XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEZhY3Rvcnkgd2hlcmUgd2UgY29uc3RydWN0IGEgaG9yaXpvbnRhbCBoZXhhZ29uIG1hcCBmb3IgdGVzdCBhbmQgZGV2ZWxvcG1lbnQgcHVycG9zZXNcbiAqXG4gKiBAcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4gKiBAdG9kbyBBZGQgZG9jdW1lbnRhdGlvbiBhbmQgcmVmYWN0b3IgKG1heWJlIG1vZHVsYXJpemUgLyBmdW5jdGlvbmFsaXplKSB0aGUgYWN0dWFsIGxvZ2ljICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW5faGV4YSB9IGZyb20gJy4uL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhJztcbmltcG9ydCB7IE9iamVjdF91bml0X2hleGEgfSBmcm9tICcuLi9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YSc7XG5pbXBvcnQgeyBzcHJpdGVzaGVldExpc3QgfSBmcm9tICcuLi9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QnO1xudmFyIGFsbFNwcml0ZXNoZWV0cyA9IHNwcml0ZXNoZWV0TGlzdCgpO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi9tYXAvY29yZS9VSSc7XG5pbXBvcnQgeyBVSV9kZWZhdWx0IH0gZnJvbSBcIi4uL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbnZhciBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgT2JqZWN0X3RlcnJhaW46IE9iamVjdF90ZXJyYWluX2hleGEsXG4gIE9iamVjdF91bml0OiBPYmplY3RfdW5pdF9oZXhhXG59O1xuXG4vKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qKlxuICogQHBhcmFtIHtET01FbGVtZW50IENhbnZhc30gY2FudmFzRWxlbWVudCB0aGUgY2FudmFzIGVsZW1lbnQgZm9yIHRoZSBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lRGF0YUFyZyBnYW1lRGF0YS4gTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzXG4gKiBAcGFyYW0ge2JpZ2FzcyBPYmplY3R9IG1hcERhdGEgLSBob2xkcyBhbGwgdGhlIHN0YWdlLCBsYXllciBhbmQgb2JqZWN0IGRhdGEgbmVlZGVkIHRvIGNvbnN0cnVjdCBhIGZ1bGwgbWFwLlxuICogTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZURhdGFBcmcgdHlwZURhdGEuIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhcy5cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY2FudmFzRWxlbWVudCwgZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcChjYW52YXNFbGVtZW50LCB7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBnaXZlbiBtYXAgZGF0YSBhbmQgY3JlYXRlIG9iamVjdHMgYWNjb3JkaW5nbHkgKi9cbiAgbWFwRGF0YS5sYXllcnMuZm9yRWFjaCggbGF5ZXJEYXRhID0+IHtcbiAgICBsZXQgdGhpc0xheWVyO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXNMYXllciA9IG1hcC5hZGRMYXllciggbGF5ZXJEYXRhLm5hbWUsIGZhbHNlLCBsYXllckRhdGEuY29vcmQgKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbTpcIiwgbGF5ZXJEYXRhLnR5cGUsIGUuc3RhY2spO1xuICAgIH1cblxuICAgIGxheWVyRGF0YS5vYmplY3RHcm91cHMuZm9yRWFjaCggb2JqZWN0R3JvdXAgPT4ge1xuICAgICAgbGV0IHNwcml0ZXNoZWV0O1xuICAgICAgbGV0IHNwcml0ZXNoZWV0VHlwZSA9IG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGE7XG5cbiAgICAgIGlmKCFzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIHNwcml0ZXNoZWV0VHlwZS1kYXRhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKHNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXREYXRhID0gdHlwZURhdGEuZ3JhcGhpY0RhdGFbc3ByaXRlc2hlZXRUeXBlXTtcblxuICAgICAgICBzcHJpdGVzaGVldCA9IGFsbFNwcml0ZXNoZWV0cy5jcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpO1xuICAgICAgfVxuXG4gICAgICBvYmplY3RHcm91cC5vYmplY3RzLmZvckVhY2goIG9iamVjdCA9PiB7XG4gICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XG5cbiAgICAgICAgaWYoIW9ialR5cGVEYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVOdW1iZXIgPSBvYmpUeXBlRGF0YS5pbWFnZTtcbiAgICAgICAgbGV0IG9iakRhdGEgPSB7XG4gICAgICAgICAgdHlwZURhdGE6IG9ialR5cGVEYXRhLFxuICAgICAgICAgIGFjdGl2ZURhdGE6IG9iamVjdC5kYXRhXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZCwgb2JqRGF0YSwgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgeyByYWRpdXM6IDQ3IH0gKTtcbiAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXdPYmplY3QgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBtYXAubW92ZU1hcChtYXBEYXRhLnN0YXJ0UG9pbnQpO1xuXG4gIHJldHVybiBtYXA7XG59IiwiLyoqIFRoZSBzaW1wbGVzdCBkZWZhdWx0IFVJIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnQgVUkgZnVuY3Rpb25hbGl0aWVzIGZvcjpcbiAqIHNob3dTZWxlY3Rpb25zXG4gKiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdFxuICpcbiAqIEB0b2RvIElOIFBST0dSRVNTLCBub3QgaW1wbGVtZW50ZWQgd2VsbCB5ZXQuIFVzZXMgY2hyb21lcyBidWlsdC1pbiBtb2RhbCBzdXBwb3J0IG9ubHkgYXRtLiBqdXN0IGZvciB0aGUga2lja3MgOikgICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIFVJX2RlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcihtb2RhbCwgc3R5bGVzKSB7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGlhbG9nXCIpWzBdO1xuICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzIHx8IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjBGMEYwXCJcbiAgICB9O1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMgPSBfRE9NRWxlbWVudHNUb0FycmF5KHRoaXMubW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX2Nsb3NlXCIpKTtcbiAgfVxuICBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgaWYgKG9iamVjdHMgJiYgb2JqZWN0cy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwib2JqZWN0czo8YnI+XCI7XG4gICAgICBvYmplY3RzLm1hcCggb2JqZWN0ID0+IHtcbiAgICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0LmRhdGEudHlwZURhdGEubmFtZSArIFwiPGJyPlwiO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwiU0VMRUNURUQ6PGJyPlwiO1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0c1swXS5kYXRhLnR5cGVEYXRhLm5hbWU7XG4gICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgIH1cbiAgfVxuICBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcbiAgICAvLyBOb3QgaW1wbGVtZW50ZWQgeWV0XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KCBlbGVtZW50LCBzZWxmLm1vZGFsLmNsb3NlLmJpbmQoc2VsZi5tb2RhbCkgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudChlbGVtZW50LCBjbG9zZUNCKSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2xvc2VDQigpO1xuICAgICAgfSk7XG59XG5mdW5jdGlvbiBfRE9NRWxlbWVudHNUb0FycmF5KGVsZW1lbnRzKSB7XG4gIGlmICghZWxlbWVudHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3RvciArIFwiIGZ1bmN0aW9uIG5lZWRzIGVsZW1lbnRzXCIpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgdmFyIGVsZW1lbnRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50QXJyYXkucHVzaChlbGVtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudEFycmF5O1xufSIsIi8qKiBNYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG4gKlxuICogTWFwIGlzIGluc3RhbnRpYXRlZCBhbmQgdGhlbiBpbml0aWFsaXplZCB3aXRoIGluaXQtbWV0aG9kLlxuICpcbiAqIFBsdWdpbnMgY2FuIGJlIGFkZGVkIHdpdGggYWN0aXZhdGVQbHVnaW5zLW1ldGhvZCBieSBwcm9kaXZpbmcgaW5pdChtYXApIG1ldGhvZCBpbiB0aGUgcGx1Z2luLiBQbHVnaW5zIGFyZSBhbHdheXNcbiAqIGZ1bmN0aW9ucywgbm90IG9iamVjdHMgdGhhdCBhcmUgaW5zdGFudGlhdGVkLiBQbHVnaW5zIGFyZSBzdXBwb3NlZCB0byBleHRlbmQgdGhlIG1hcCBvYmplY3Qgb3IgYW55dGhpbmcgaW4gaXQgdmlhXG4gKiBpdCdzIHB1YmxpYyBtZXRob2RzLlxuICpcbiAqIEByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4gKiBAcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXBfc3RhZ2UgfSBmcm9tICcuL01hcF9zdGFnZSc7XG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL01hcF9sYXllcic7XG5pbXBvcnQgeyByZXNpemVVdGlscywgcmVzaXplVXRpbHMgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7IG1hcF9kcmFnIH0gZnJvbSBcIi4vbW92ZS9tYXBfZHJhZ1wiO1xuaW1wb3J0IHsgbWFwX3pvb20gfSBmcm9tICcuL3pvb20vbWFwX3pvb20nO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXJzJztcblxudmFyIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xudmFyIGV2ZW50bGlzdGVuZXJzO1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7RE9NIENhbnZhcyBlbGVtZW50fSBjYW52YXMgLSBDYW52YXMgdXNlZCBieSB0aGUgbWFwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZGlmZmVyZW50IG9wdGlvbnMgZm9yIHRoZSBtYXAgdG8gYmUgZ2l2ZW4uXG4gICAqIEByZXR1cm4gTWFwIGluc3RhbmNlICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0aW9ucykge1xuICAgIGlmKCFjYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9zdGFnZSA9IG5ldyBNYXBfc3RhZ2UoXCJkYWRkeVN0YWdlXCIsIGNhbnZhcyk7XG4gICAgdGhpcy5tb21teUxheWVyID0gbmV3IE1hcF9sYXllcihcIm1vbW15TGF5ZXJcIiwgb3B0aW9ucy5zdWJDb250YWluZXJzLCBvcHRpb25zLnN0YXJ0Q29vcmQpO1xuICAgIHRoaXMuX3N0YWdlLmFkZENoaWxkKHRoaXMubW9tbXlMYXllcik7XG4gICAgdGhpcy5wbHVnaW5zID0gW107XG4gICAgdGhpcy5hY3RpdmF0ZWRQbHVnaW5zID0gW107XG4gICAgLyogQWN0aXZhdGUgdGhlIG1hcCB6b29tIGFuZCBtYXAgZHJhZyBjb3JlIHBsdWdpbnMgKi9cbiAgICB0aGlzLnBsdWdpbnNUb0FjdGl2YXRlID0gW21hcF96b29tLCBtYXBfZHJhZ107XG4gICAgdGhpcy5tYXBTaXplID0gb3B0aW9ucy5tYXBTaXplIHx8IHsgeDowLCB5OjAgfTtcbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRDQnMgPSB7XG4gICAgICBmdWxsU2l6ZTogcmVzaXplVXRpbHMuc2V0VG9GdWxsU2l6ZShjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSxcbiAgICAgIGZ1bGxzY3JlZW46IHJlc2l6ZVV0aWxzLnRvZ2dsZUZ1bGxTY3JlZW4sXG4gICAgICBzZWxlY3Q6IG51bGwsXG4gICAgICBkcmFnOiBudWxsLFxuICAgICAgem9vbTogbnVsbFxuICAgIH07XG4gICAgdGhpcy5fZnVsbFNpemVGdW5jdGlvbiA9IG51bGw7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyh0aGlzLmV2ZW50Q0JzKTtcbiAgfVxuICAvKiogaW5pdGlhbGl6YXRpb24gbWV0aG9kXG4gICAqIEBwYXJhbSBbQXJyYXldIHBsdWdpbnMgLSBQbHVnaW5zIHRvIGJlIGFjdGl2YXRlZCBmb3IgdGhlIG1hcC4gTm9ybWFsbHkgeW91IHNob3VsZCBnaXZlIHRoZSBwbHVnaW5zIGhlcmUgaW5zdGVhZCBvZlxuICAgKiBzZXBhcmF0ZWx5IHBhc3NpbmcgdGhlbSB0byBhY3RpdmF0ZVBsdWdpbnMgbWV0aG9kXG4gICAqIEBwYXJhbSB7eDogPyB5Oj99IGNvb3JkIC0gU3RhcnRpbmcgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGlja0NCIC0gY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRpY2suIFRpY2sgY2FsbGJhY2sgaXMgaW5pdGlhdGVkIGluIGV2ZXJ5IGZyYW1lLiBTbyBtYXAgZHJhd3MgaGFwcGVuXG4gICAqIGR1cmluZyB0aWNrc1xuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBpbml0KHBsdWdpbnMsIGNvb3JkLCB0aWNrQ0IpIHtcbiAgICBpZiAocGx1Z2lucykge1xuICAgICAgdGhpcy5hY3RpdmF0ZVBsdWdpbnMocGx1Z2lucyk7XG4gICAgfVxuXG4gICAgaWYoY29vcmQpIHtcbiAgICAgIHRoaXMubW9tbXlMYXllci54ID0gY29vcmQueDtcbiAgICAgIHRoaXMubW9tbXlMYXllci55ID0gY29vcmQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgX2RlZmF1bHRUaWNrKHRoaXMpO1xuICAgIHRpY2tDQiAmJiB0aGlzLmN1c3RvbVRpY2tPbih0aWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBkcmF3T25OZXh0VGljaygpIHtcbiAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBnZXRMYXllcnNXaXRoQXR0cmlidXRlcyhhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWdlLmNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihsYXllciA9PiB7XG4gICAgICByZXR1cm4gbGF5ZXJbYXR0cmlidXRlXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhZ2U7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cbiAgLyoqIEFsbCBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQgdG8gTWFwX2xheWVyIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4gY3JlYXRlZCBNYXBfbGF5ZXIgaW5zdGFuY2UgKi9cbiAgYWRkTGF5ZXIobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgTWFwX2xheWVyKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKTtcblxuICAgIHRoaXMubW9tbXlMYXllci5hZGRDaGlsZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwX2xheWVyfSBsYXllciAtIHRoZSBsYXllciBvYmplY3QgdG8gYmUgcmVtb3ZlZCAqL1xuICByZW1vdmVMYXllcihsYXllcikge1xuICAgIHRoaXMubW9tbXlMYXllci5yZW1vdmVDaGlsZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgLyoqIEByZXR1cm4gbGF5ZXIgd2l0aCB0aGUgcGFzc2VkIGxheWVyIG5hbWUgKi9cbiAgZ2V0TGF5ZXJOYW1lZChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubW9tbXlMYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgbW92ZU1hcChjb29yZGluYXRlcykge1xuICAgIHRoaXMubW9tbXlMYXllci5tb3ZlKGNvb3JkaW5hdGVzKTtcbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgdGhpcy5tYXBNb3ZlZCh0cnVlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBDYWNoZSB0aGUgbWFwLiBUaGlzIHByb3ZpZGVzIHNpZ25pZmljYW50IHBlcmZvcm1hbmNlIGJvb3N0LCB3aGVuIHVzZWQgY29ycmVjdGx5LiBjYWNoZU1hcCBpdGVyYXRlcyB0aHJvdWdoIGFsbCB0aGVcbiAgICogbGF5ZXIgb24gdGhlIG1hcCBhbmQgY2FjaGVzIHRoZSBvbmVzIHRoYXQgcmV0dXJuIHRydWUgZnJvbSBnZXRDYWNoZUVuYWJsZWQtbWV0aG9kLlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgY2FjaGVNYXAoKSB7XG4gICAgaWYodGhpcy5tb21teUxheWVyLmdldENhY2hlRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb21teUxheWVyLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgICAgIGNoaWxkLmNhY2hlKDAsIDAsIHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBpdGVyYXRlcyB0aHJvdWdoIHRoZSBtYXAgbGF5ZXJzIGFuZCByZXR1cm5zIG1hdGNoaW5nIG9iamVjdHMgb24gZ2l2ZW4gY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgbWFwIGNvb3JkaW5hdGUgdW5kZXIgd2hpY2ggd2Ugd2FudCB0byByZXRyaWV2ZSBhbGwgdGhlIG9iamVjdHMuXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoY29vcmQpIHtcbiAgICBsZXQgb2JqZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5tb21teUxheWVyLmdldE9iamVjdHNVbmRlclBvaW50KGNvb3JkKTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG4gIC8qKiBSZXNpemUgdGhlIGNhbnZhcyB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIGFyZWEuIFVzZXMgdGhpcy5ldmVudENCcy5mdWxsc2l6ZSBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cbiAgdG9nZ2xlRnVsbFNpemUoKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpO1xuICB9XG4gIC8qKiBUb2dnbGVzIGZ1bGxzY3JlZW4gbW9kZS4gVXNlcyB0aGlzLmV2ZW50Q0JzLmZ1bGxzY3JlZW4gYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXG4gIHRoZSBldmVudGxpc3RlbmVyIGNhbGxiYWNrIHVzZSB0aGlzLmV2ZW50Q0JzICovXG4gIHRvZ2dsZUZ1bGxTY3JlZW4gKCkge1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgfVxuICAvKiogQWN0aXZhdGUgcGx1Z2lucyBmb3IgdGhlIG1hcC4gUGx1Z2lucyBuZWVkIC5wbHVnaW5OYW1lIHByb3BlcnR5IGFuZCAuaW5pdC1tZXRob2RcbiAgQHBhcmFtIFtBcnJheV0gcGx1Z2luc0FycmF5IC0gQXJyYXkgdGhhdCBjb25zaXN0cyBvZiB0aGUgcGx1Z2luIG1vZHVsZXMgKi9cbiAgYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnNBcnJheSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZS5jb25jYXQocGx1Z2luc0FycmF5KTtcblxuICAgIGFsbFBsdWdpbnMuZm9yRWFjaChwbHVnaW5Ub1VzZSA9PiB7XG4gICAgICBpZih0aGlzLmFjdGl2YXRlZFBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gcGx1Z2luVG9Vc2U7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXS5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0gPSB0cnVlO1xuICAgICAgICB0aGlzLnBsdWdpbnNUb0FjdGl2YXRlID0gW107XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogQ3VzdG9tIHRpY2sgaGFuZGxlciB0aGF0IGNhbiBiZSBnaXZlbiB0byBtYXAuIFRoZSBkZWZhdWx0IHRpY2sgaGFuZGxlciBpcyBieSBkZWZhdWx0XG4gIGFsd2F5cyBvbiBhbmQgd2lsbCBub3QgYmUgYWZmZWN0ZWRcbiAgQHBhcmFtIFtGdW5jdGlvbl0gdGlja0NCIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gdXNlIGluIHRpY2sgKi9cbiAgY3VzdG9tVGlja09uKHRpY2tDQikge1xuICAgIGlmICh0aGlzLmFjdGl2ZVRpY2tDQikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgYWxyZWFkeSBleGlzdHMgb25lIHRpY2sgY2FsbGJhY2suIE5lZWQgdG8gcmVtb3ZlIGl0IGZpcnN0LCBiZWZvcmUgc2V0dGluZyB1cCBhIG5ldyBvbmVcIik7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSB0aWNrQ0IgfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGN1c3RvbVRpY2tPZmYoKSB7XG4gICAgY3JlYXRlanMuVGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIHRoaXMuYWN0aXZlVGlja0NCKTtcblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIGdldHRlciBhbmQgc2V0dGVyIGZvciBkZXRlY3RpbmcgaWYgbWFwIGlzIG1vdmVkIGFuZCBzZXR0aW5nIHRoZSBtYXBzIHN0YXR1cyBhcyBtb3ZlZCBvciBub3QgbW92ZWQgKi9cbiAgbWFwTW92ZWQoeWVzT3JObykge1xuICAgIGlmKHllc09yTm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tYXBJbk1vdmUgPSB5ZXNPck5vO1xuICAgICAgcmV0dXJuIHllc09yTm87XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwSW5Nb3ZlO1xuICB9XG4gIHNldFByb3RvdHlwZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB0aGlzLl9fcHJvdG9fX1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbi8qIFRoaXMgaGFuZGxlcyB0aGUgZGVmYXVsdCBkcmF3aW5nIG9mIHRoZSBtYXAsIHNvIHRoYXQgbWFwIGFsd2F5cyB1cGRhdGVzIHdoZW4gZHJhd09uTmV4dFRpY2sgPT09IHRydWUuIFRoaXMgdGlja1xuY2FsbGJhY2sgaXMgYWx3YXlzIHNldCBhbmQgc2hvdWxkIG5vdCBiZSByZW1vdmVkIG9yIG92ZXJydWxlZCAqL1xuZnVuY3Rpb24gX2RlZmF1bHRUaWNrKG1hcCkge1xuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgX3RpY2tGdW5jKTtcblxuICByZXR1cm4gX3RpY2tGdW5jO1xuXG4gIGZ1bmN0aW9uIF90aWNrRnVuYygpIHtcbiAgICBpZihfZHJhd01hcE9uTmV4dFRpY2sgPT09IHRydWUpIHtcbiAgICAgIF9kcmF3TWFwKG1hcCk7XG4gICAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbi8qIFByaXZhdGUgZnVuY3Rpb24gdG8gZHJhdyB0aGUgbWFwICovXG5mdW5jdGlvbiBfZHJhd01hcChtYXApIHtcbiAgbWFwLl9zdGFnZS51cGRhdGUoKTtcblxuICByZXR1cm4gbWFwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiovXG5cbi8qKlxuICogQHRvZG8gdGhpcy5wcmV2ZW50U2VsZWN0aW9uLiBUaGlzIHNob3VsZCBkZXRlcm1pbmUgd2V0aGVyIHRoaXMgc3RhZ2UgaG9sZHMgZGF0YSB0aGF0IGNhbiBiZSBzZWxlY3RlZCBieSB0aGUgcGxheWVyXG4gKi9cblxuLyoqXG4gKiBAdG9kbyBzdWJDb250YWluZXJzLiBTdWJjb250YWluZXJzIGFyZSBjb250YWluZXJzIGluc2lkZSBsYXllcnMgZGVzaWduZWQgdG8gZ3JvdXAgdXAgb2JqZWN0cyB0byBzbWFsbGVyIGNvbnRhaW5lcnMuIFNvIGUuZy5cbiAqIGdldE9iamVjdHNVbmRlclBvaW50IGlzIGZhc3Rlci4gVGhpcyBoYXMgbm90IGJlZW4gZWZmaWNpZW50bHkgdGVzdGVkIGZyb20gcGVyZm9ybWFuY2Ugd2lzZSBzbyB0aGUgZmVhdHVyZSB3aWxsIGJlXG4gKiBhZGRlZCBhZnRlciB0aGUgYmFzaWMgbWFwIG1vZHVsZSB3b3JrcyBhbmQgd2UgY2FuIHZlcmlmeSB0aGUgZWZmZWN0IHdlbGwgKi9cblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJDb250YWluZXJzIFRvIGJlIGltcGxlbWVudGVkLiBUaGUgZGF0YSB3aGljaCB3ZSB1c2UgdG8gZGl2aWRlIHRoZSBjb250YWluZXIgdG8gc3ViQ29udGFpbmVyc1xuICAgKiBlLmcuIGZvciBtb3JlIGVmZmljaWVudCBhY2Nlc3NpYmlsaXR5IG9mIG9iamVjdHMgYmFzZWQgb24gY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIHN0YXJ0aW5nIGNvb3JkcyBvZiBsYXllci4gUmVsYXRpdmUgdG8gcGFyZW50IG1hcCBsYXllci5cbiAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJDb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgdGhpcy56b29tYWJsZSA9IHRydWU7XG4gICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gZmFsc2U7XG4gICAgLyogY3JlYXRlanMgLyBzdXBlciBwcm9wZXJ0aWVzLiBVc2VkIGFsc28gZm9yIGNvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xuICBjYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIC8qKiBNb3ZlIGxheWVyXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkaW5hdGVzIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBsYXllciB0byBtb3ZlLiBJLmUuXG4gICB7IHg6IDUsIHk6IDAgfVxuICAgQHJldHVybiB0aGlzIGxheWVyIGluc3RhbmNlICovXG4gIG1vdmUoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5tb3ZhYmxlKSB7XG4gICAgICB0aGlzLnggKz0gY29vcmRpbmF0ZXMueDtcbiAgICAgIHRoaXMueSArPSBjb29yZGluYXRlcy55O1xuICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIGNyZWF0ZWpzLkNvbnRhaW5lcikge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xuICAgIHJldHVybiAhIXRoaXMuc3ViQ29udGFpbmVycztcbiAgfVxufVxuXG4vKipcbiAqIEB0b2RvIGltcGxlbWVudCBzcHJpdGVDb250YWluZXIhIEl0IHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aGVuIHVzaW5nIHNwcml0ZXNoZWV0cy4gT25seSBpc3N1ZSB3YXMgdGhhdCBtaW5pZmllZFxuICogZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIHNwcml0ZVN0YWdlIChhbmQgc3ByaXRlQ29udGFpbmVyPykgYW5kIG5laXRoZXIgdGhlIG5vZGUtZWFzZWwgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICB9XG59XG4qLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiovXG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9zdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlN0YWdlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7RE9NIENhbnZhcyBlbGVtZW50fSBjYW52YXMgUkVRVUlSRUQhIENhbnZhcyBlbGVtZW50IHVzZWQgYnkgdGhlIG1hcFxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBzdGFnZUJvdW5kcyBTZXQgc3RhZ2UgYm91bmRzIGJhc2VkIG9uIHRoZXNlIGNvb3JkaW5hdGVzXG4gICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhcywgc3RhZ2VCb3VuZHMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTWFwX3N0YWdlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpO1xuICAgIH1cblxuICAgIHN1cGVyKGNhbnZhcyk7XG5cbiAgICBpZihzdGFnZUJvdW5kcykge1xuICAgICAgdGhpcy5zZXRCb3VuZHMoMCwgMCwgc3RhZ2VCb3VuZHMueCwgc3RhZ2VCb3VuZHMueSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgfVxuICAvKiogc2V0dGVyIGFuZCBnZXR0ZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBzdGF0dXMgSWYgcHJvdmlkZWQgc2V0cyB0aGUgY2FjaGluZyBzdGF0dXMgb3RoZXJ3aXNlIHJldHVybnMgdGhlIGN1cnJlbnQgc3RhdHVzICovXG4gIGNhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICBpZihzdGF0dXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gIH1cbiAgQ2hpbGROYW1lZChuYW1lKSB7XG4gICAgZm9yIChsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICBpZiAobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAdG9kbyBpbXBsZW1lbnQgc3ByaXRlU3RhZ2UhIEl0IHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aGVuIHVzaW5nIHNwcml0ZXNoZWV0cy4gT25seSBpc3N1ZSB3YXMgdGhhdCBtaW5pZmllZFxuICogZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIHNwcml0ZVN0YWdlIGFuZCBuZWl0aGVyIHRoZSBub2RlLWVhc2VsIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgYWN0dWFsIG9iamVjdHMgdXNlZCBvbiB0aGUgbWFwIChzdWNocyBhcyB0ZXJyYWluIGFuZCB1bml0cyksIHVuZGVyIHN0YWdlcyBhbmQgY29udGFpbmVycy5cbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YSAqL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIk9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IGN1cnJlbnRGcmFtZU51bWJlcjtcbiAgICAvKiBFeGVjdXRlIGluaXRpYWwgZHJhdyBmdW5jdGlvbiAqL1xuICAgIHRoaXMuaW5uZXJEcmF3KGNvb3Jkcy54LCBjb29yZHMueSk7XG4gICAgLyogY3JlYXRlanMgLyBzdXBlciBwcm9wZXJ0aWVzLiBVc2VkIGFsc28gZm9yIGNvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIERyYXdpbmcgdGhlIG9iamVjdCB3aXRoIGNyZWF0ZWpzLW1ldGhvZHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGUgeVxuICAgKiBAcmV0dXJuIHRoaXMgb2JqZWN0IGluc3RhbmNlICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogRHJhd3MgbmV3IGZyYW1lIHRvIGFuaW1hdGUgb3Igc3VjaFxuICAgKiBAcGFyYW0ge051bWJlcn0geCBjb29yZGluYXRlIHhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuZXdGcmFtZU51bWJlciBOZXcgZnJhbWUgbnVtYmVyIHRvIGFuaW1hdGUgdG9cbiAgICogQHJldHVybiB0aGlzIG9iamVjdCBpbnN0YW5jZSAqL1xuICBkcmF3TmV3RnJhbWUoeCwgeSwgbmV3RnJhbWVOdW1iZXIpIHtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IG5ld0ZyYW1lTnVtYmVyO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJEcmF3KHgsIHkpO1xuICB9XG59IiwiLyoqIE1haW4gY2xhc3MgZm9yIHNob3dpbmcgVUkgb24gdGhlIG1hcC4gTGlrZSB1bml0IHNlbGVjdGlvbnMgYW5kIHN1Y2guIEhhcyBub3RoaW5nIHRvIGRvIHdpdGggc2hvd2luZyBvZmYtbWFwIGRhdGEuXG4gKiBHb29kIGV4YW1wbGVzIGZvciB3aGF0IHRoaXMgc2hvd3MgYXJlOiBzZWxlY3RlZCB1bml0cy1saXN0LCBzZWxlY3Rpb24gaGlnaGxpZ2h0IChsaWtlIGEgY2lyY2xlIG9uIHRoZSBzZWxlY3RlZCB1bml0KSBhbmRcbiAqIGJyaW5naW5nIHRoZSB1bml0IG9uIHRvcCBpbiB0aGUgbWFwLlxuICpcbiAqIEBwYXJhbSB7TW9kdWxlfSBnaXZlblVJVGhlbWUgdGhlIG1vZHVsZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGhlIFVJIHRoZW1lXG4gKiBAcGFyYW0ge01hcH0gZ2l2ZW5NYXAgTWFwIGluc3RhbmNlIHRoYXQgaXMgdXNlZFxuICogQHJldHVybiBVSSBtb2R1bGVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqIFRoZSBhYnN0cmFjdCBVSSBtb2R1bGUgZm9yIHRoZSBjb3JlIG1hcCBmdW5jdGlvbmFsaXR5LiBUaGlzIGlzIHVzZWQgYnkgZGVmaW5pbmcgVUkgVGhlbWVzIHRoYXQgaW1wbGVtZW50IHRoaXNcbiAqIGNvcmUgVUkgbW9kdWxlLlxuICogRGVmYXVsdCBtZXRob2RzIHRvIHVzZSBpbiBVSSBhcmU6XG4gKiBzaG93U2VsZWN0aW9ucyBhbmQgaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QuIE1vcmUgbWV0aG9kcyBjYW4gYmUgZXh0ZW5kZWQgdG8gVUkgd2l0aCBwbHVnaW5zXG4gKlxuICogQHRvZG8gTm90IGltcGxlbWVudGVkIGZ1bGx5IHlldCBhbmQgcHJvYmFibHkgbmVlZCByZWZhY3RvcmluZyAqL1xudmFyIHNjb3BlO1xuXG5leHBvcnQgZnVuY3Rpb24gVUkgKGdpdmVuVUlUaGVtZSwgZ2l2ZW5NYXApIHtcbiAgLyogU0lOR0xFVE9OIE1PRFVMRSAqL1xuICBpZiAoc2NvcGUpIHtcbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICBpZiAoIWdpdmVuVUlUaGVtZSB8fCAhZ2l2ZW5NYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSS1tb2R1bGUgcmVxdWlyZXMgVUlUaGVtZSBhbmQgbWFwIG9iamVjdFwiKTtcbiAgfVxuXG4gIHZhciBtYXAgPSBnaXZlbk1hcDtcbiAgdmFyIFVJVGhlbWUgPSBnaXZlblVJVGhlbWU7XG4gIHNjb3BlID0ge307XG5cbiAgLyoqIFJlc3BvbnNpYmxlIGZvciBzaG93aW5nIHNlbGVjdGlvbmcgZWxlbWVudCwgd2hlcmUgdGhlIHBsYXllciBzZWxlY3QgdGhlIHdhbnRlZCBvYmplY3Qgb3V0IG9mIGFycmF5IG9mIG9iamVjdHMuXG4gICAqIEZvciBleGFtcGxlIGlmIHRoZXJlIGFyZSBzZXZlcmFsIG9iamVjdHMgaW4gb25lIHRpbGUgb24gdGhlIG1hcCBhbmQgdGhlIHBsYXllciBuZWVkcyB0byBiZSBhYmxlIHRvIHNlbGVjdCBvbmVcbiAgICogc3BlY2lmaWMgdW5pdCBvbiB0aGUgc3RhY2sgKi9cbiAgc2NvcGUuc2hvd1NlbGVjdGlvbnMgPSBmdW5jdGlvbiBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgcmV0dXJuIFVJVGhlbWUuc2hvd1NlbGVjdGlvbnMobWFwLCBvYmplY3RzKTtcbiAgfTtcbiAgLyoqIFJlc29uc2libGUgZm9yIGhpZ25saWdodGluZyB0aGUgc2VsZWN0ZWQgb2JqZWN0LiBGb3IgZXhhbXBsZSB0aGUgdW5pdCB0aGF0IGlzIGJlaW5nIGNvbW1hbmRlZC4gVGhlIGhpZ2h0bGlnaHRcbiAgICogY2FuIG1lYW4gZS5nLiBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3Agb24gdGhlIG1hcCBhbmQgc2hvd2luZyBzZWxlY3Rpb24gY2lyY2xlIGFyb3VuZCBpdC4gKi9cbiAgc2NvcGUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QgPSBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gVUlUaGVtZS5oaWdobGlnaHRTZWxlY3RlZE9iamVjdChtYXAsIG9iamVjdCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBIb3VzZXMgdGhlIGRlZmF1bHQgZXZlbnRsaXN0ZW5lcnMgdXNlZCBpbiB0aGUgbWFwLiBXaGVuIHBsdWdpbnMgYXJlIGFkZGVkIHRvIHRoZSBtYXAgdGhpcyBjbGFzcyBjYW4gYmUgdXNlZCBmb3JcbiAqIHRoZSBldmVudGxpc3RlbmVyIG1hbmFnZW1lbnQuIFRoaXMgd2F5IGFsbCB0aGUgZXZlbnRsaXN0ZW5lcnMgYXJlIGluIHRoZSBzYW1lIG9iamVjdCwgY29udmVuaWVudGx5LiAqL1xuXG52YXIgc2luZ2xldG9uU2NvcGU7XG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuLyoqXG4gKiBldmVudExpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiB0aGF0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIHdpdGggYW4gb2JqZWN0LCB0aGF0IGhvbGRzIGFsbCB0aGUgY2FsbGJhY2tzIHVzZWQgaW4gdGhpc1xuICogY2xhc3MuIEkuZS5cbiB7XG4gICBzZWxlY3Q6IGZ1bmN0aW9uKCkge30sXG4gICB6b29tOiBmdW5jdGlvbigpIHt9XG4gfSovXG5leHBvcnQgbGV0IGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gZXZlbnRMaXN0ZW5lck1vZHVsZShtYXBDQnMpIHtcbiAgaWYoc2luZ2xldG9uU2NvcGUpIHtcbiAgICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XG4gIH1cblxuICBzaW5nbGV0b25TY29wZSA9IHtcbiAgICBzdGF0ZXM6IHt9XG4gIH07XG5cbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRnVsbFNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxTaXplO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxzY3JlZW47XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVpvb21MaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVpvb21MaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG1hcENCcy56b29tKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG1hcENCcy56b29tKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy56b29tO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVEcmFnTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVEcmFnTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmRyYWc7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVNlbGVjdExpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0TGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5zZWxlY3Q7XG4gIH07XG5cbiAgcmV0dXJuIHNpbmdsZXRvblNjb3BlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgY29yZSBwbHVnaW4gZm9yIHRoZSAyRCBtYXAgZW5naW5lLiBIYW5kbGVzIG1vdmluZyB0aGUgbWFwIGJ5IGRyYWdnaW5nIHRoZSBtYXAuXG4gKiBDb3JlIHBsdWdpbnMgY2FuIGFsd2F5cyBiZSBvdmVyd3JvdGUgaWYgbmVlZGVkXG4gKiBAdG9kbyBTZWUgaWYgdGhpcyBwbHVnaW4gbmVlZCByZWZhY3RvcmluZyBhbmQgbW9yZSBkb2N1bWVudGF0aW9uICovXG5cbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vZXZlbnRsaXN0ZW5lcnMnO1xuXG5leHBvcnQgbGV0IG1hcF9kcmFnID0gKGZ1bmN0aW9uIG1hcF9kcmFnKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgLyogRnVuY3Rpb24gZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgdGhlIG1vdXNlIG9mZnNldC4gUHJpdmF0ZSBmdW5jdGlvbnMgZGVjbGFyZWQgYm90dG9tICovXG4gIHZhciBvZmZzZXRDb29yZHMgPSBfb2Zmc2V0Q29vcmRzKCk7XG4gIHZhciBldmVudGxpc3RlbmVycztcblxuICAvKiA9PT09PSBGb3IgdGVzdGluZyA9PT09PSAqL1xuICBzY29wZS5fc3RhcnREcmFnTGlzdGVuZXIgPSBfc3RhcnREcmFnTGlzdGVuZXI7XG5cbiAgc2NvcGUucGx1Z2luTmFtZSA9IG1hcF9kcmFnLm5hbWU7XG5cbiAgLyoqIFJlcXVpcmVkIGluaXQgZnVuY3Rpb25zIGZvciB0aGUgcGx1Z2luXG4gICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdCAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXAuZXZlbnRDQnMpO1xuICAgIG1hcC5ldmVudENCcy5kcmFnID0gX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcCk7XG5cbiAgICAvL21hcC5zZXRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBfc3RhcnREcmFnTGlzdGVuZXIobWFwKSk7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRHJhZ0xpc3RlbmVyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qKiBTdGFydHMgdGhlIHdob2xlIGZ1bmN0aW9uYWxpdHkgb2YgdGhpcyBjbGFzc1xuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnREcmFnTGlzdGVuZXIoIG1hcCApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3RhcnREcmFnKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgIHg6IGUueCxcbiAgICAgICAgICB5OiBlLnlcbiAgICAgICAgfSk7XG4gICAgICAgIC8qIFdlIHRha2UgYWxsIHRoZSBldmVudGxpc3RlbmVycyB1bmJpbmRpbmdzIHRvIHRoaXMgYXJyYXksIHNvIHdlIGNhbiB1bmJpbmQgdGhlbSB3aGVuIHRoZSBtb3VzZSBpcyB1cCAqL1xuXG4gICAgICAgIHZhciBtb3ZlQ2FsbGJhY2sxID0gX2RyYWdMaXN0ZW5lcihtYXApO1xuICAgICAgICB2YXIgbW91c2V1cENhbGxiYWNrID0gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCk7XG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZXVwQ2FsbGJhY2spO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmVDYWxsYmFjazEpO1xuICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgICAgICBfbWFwTW92ZWQobWFwKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8qIEV2ZW50IGxpc3RlbmVycyBhcmUgaW4gdGhlaXIgc2VwYXJhdGUgZmlsZTsgZXZlbnRMaXN0ZW5lcnMuanMgKi9cbiAgICAgIGZ1bmN0aW9uIF9kcmFnTGlzdGVuZXIobWFwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRyYWdnZXIoZSkge1xuICAgICAgICAgICAgbWFwLm1hcE1vdmVkKHRydWUpO1xuICAgICAgICAgICAgLyogU28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgc3RvcCB3aGVuIG1vdXNlIGlzIHVwLCBldmVuIHRob3VnaCBtb3VzZXVwIGV2ZW50IHdvdWxkbid0IGZpcmUgKi9cbiAgICAgICAgICAgIGlmKGUuYnV0dG9ucyA9PT0gMCkge1xuICAgICAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgbW92ZWQgPSB7XG4gICAgICAgICAgICAgIHg6IGUueCAtIG9mZnNldC54LFxuICAgICAgICAgICAgICB5OiBlLnkgLSBvZmZzZXQueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYobW92ZWQueCAhPT0gMCB8fCBtb3ZlZC55ICE9PSAwKSB7XG4gICAgICAgICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1hcC5tYXBNb3ZlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgICAgICB4OiBlLngsXG4gICAgICAgICAgICAgIHk6IGUueVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIFRoZSBtb3VzZSBoYXMgYmVlbiBtb3ZlZCBhZnRlciBwcmVzc2luZy4gVGhpcyBwcmV2ZW50IHRoZSBjbGlja1xuICAgICAgICAgICAgICBldmVudCB0byBmaXJlIGF0IHRoZSBzYW1lIHRpbWUgd2l0aCB0aGUgbW91c2VEb3duIC8gZHJhZ2dpbmcgZXZlbnRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAvL21hcC5tb3VzZU1vdmVkKCB0cnVlICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cbiAgLyoqIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuICovXG4gIGZ1bmN0aW9uIF9vZmZzZXRDb29yZHMoKSB7XG4gICAgdmFyIHNjb3BlID0ge307XG4gICAgdmFyIG9mZnNldENvb3JkcztcblxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHMgPSBjb29yZHM7XG4gICAgfTtcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH07XG59KSgpO1xuXG4vKiBXaXRob3V0IHRoaXMsIHRoZSBvdGhlciBldmVudExpc3RlbmVycyBtaWdodCBmaXJlIGluYXBwcm9wcmlhdGUgZXZlbnRzLiAqL1xuZnVuY3Rpb24gX21hcE1vdmVkKG1hcCkge1xuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICB9LCAxKTtcbn0iLCIvKiogV2Ugd2FudCB0byBwdXQgc3ByaXRlc2hlZXRzIHRvIHRoZWlyIG93biBtb2R1bGUsIHNvIHRoZXkgYXJlIHNlcGFyYXRlZCBhbmQgZS5nLiB3ZSBjYW4gcmVtb3ZlIGNyZWF0ZWpzIGZyb20gdGhlXG4gKiBzcHJpdGVzaGVldCBpZiBuZWVkZWQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG52YXIgYWxsU3ByaXRlc2hlZXRzID0ge307XG5cbi8qIFNpbmdsZXRvbiBzbyB3ZSBkb24ndCB1c2UgY2xhc3MgZGVmaW5pdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZXNoZWV0TGlzdCAoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBDcmVhdGUgbmV3IHNwcml0ZXNoZWV0IChuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoKSkgYW5kIGtlZXBzIGl0IGluIG9iamVjdCBjb2xsZWN0aW9uLiBTbyB3ZSBkb24ndCBjcmVhdGUgYWNjaWRlbi1cbiAgICogdGFsbHkgYW5vdGhlciBvbmUgYW5kIHdlIGNhbiBzYWZlbHkgcmVtb3ZlIGl0IGxhdGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ByaXRlc2hlZXREYXRhIE9iamVjdCB0aGF0IGNvbnRhaW5zIGNyZWF0ZWpzLWNvbXBhdGlibGUgc3ByaXRlc2hlZXREYXRhXG4gICAqIEByZXR1cm4gbmV3IHNwcml0ZXNoZWV0IGluc3RhbmNlIHRvIHVzZS4gKi9cbiAgc2NvcGUuY3JlYXRlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiBjcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpIHtcbiAgICB2YXIgc3ByaXRlU2hlZXQ7XG4gICAgdmFyIElEID0gc2NvcGUuZ2V0U3ByaXRlc2hlZXRJRChzcHJpdGVzaGVldERhdGEpO1xuXG4gICAgaWYgKCBhbGxTcHJpdGVzaGVldHNbSURdICkge1xuICAgICAgcmV0dXJuIGFsbFNwcml0ZXNoZWV0c1tJRF07XG4gICAgfVxuXG4gICAgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICBhbGxTcHJpdGVzaGVldHNbSURdID0gc3ByaXRlU2hlZXQ7XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXQ7XG4gIH07XG4gIC8qKiBHZW5lcmF0ZXMgaWRlbnRpZmllciBmb3Iga2VlcGluZyB0cmFjayBvZiBzcHJpdGVzaGVldHNcbiAgICogQHBhcmFtIHtPYmplY3R9IHNwcml0ZXNoZWV0RGF0YSBzcHJpdGVzaGVldERhdGEgdGhhdCBpcyB1c2VkXG4gICAqIEByZXR1cm4gZ2VuZXJhdGVkIGhhc2ggaWRlbnRpZmllciBmb3Igc3ByaXRlc2hlZXQgKi9cbiAgc2NvcGUuZ2V0U3ByaXRlc2hlZXRJRCA9IGZ1bmN0aW9uIGdldFNwcml0ZXNoZWV0SUQoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgcmV0dXJuIGhhc2gubWQ1KHNwcml0ZXNoZWV0RGF0YSk7XG4gIH07XG4gIHNjb3BlLnJlbW92ZVNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gcmVtb3ZlU3ByaXRlc2hlZXQoc3ByaXRlc2hlZXREYXRhKSB7XG4gICAgdmFyIElEID0gc2NvcGUuZ2V0U3ByaXRlc2hlZXRJRChzcHJpdGVzaGVldERhdGEpO1xuICAgIGRlbGV0ZSBhbGxTcHJpdGVzaGVldHNbSURdO1xuICB9O1xuICBzY29wZS5nZXRBbGxTcHJpdGVzaGVldHMgPSBmdW5jdGlvbiBnZXRBbGxTcHJpdGVzaGVldHMgKCkge1xuICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHM7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoZSBjb3JlIHV0aWxzIGZvciB0aGUgMkQgbWFwIGVuZ2luZS4gKi9cblxuZXhwb3J0IHZhciBtb3VzZVV0aWxzID0gKCBmdW5jdGlvbiBtb3VzZVV0aWxzKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICAvKiogVGhpcyBmdW5jdGlvbiBpcyBmcm9tOiBodHRwOi8vd3d3LmFkb21hcy5vcmcvamF2YXNjcmlwdC1tb3VzZS13aGVlbC9cbiAgICBJdCBkZXRlY3RzIHdoaWNoIHdheSB0aGUgbW91c2V3aGVlbCBoYXMgYmVlbiBtb3ZlZC5cbiAgICB6ZXJvIGRlbHRhID0gbW91c2Ugd2hlZWwgbm90IG1vdmVkXG4gICAgcG9zaXRpdmUgZGVsdGEgPSBzY3JvbGxlZCB1cFxuICAgIG5lZ2F0aXZlIGRlbHRhID0gc2Nyb2xsZWQgZG93blxuXG4gICAgQHBhcmFtIHtFdmVudH0gZXZlbnQgcGFzcyB0aGUgZXZlbnQgdG8gZGVsdGFGcm9tV2hlZWxcbiAgICBAcmV0dXJuIGRlbHRhLiBQb3NpdGl2ZSBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uICovXG4gIHNjb3BlLmRlbHRhRnJvbVdoZWVsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICB2YXIgZGVsdGEgPSAwO1xuXG4gICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuXG4gICAgIGlmICggZXZlbnQud2hlZWxEZWx0YSApIHsgLyogSUUvT3BlcmEuICovXG4gICAgICAgIGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgfSBlbHNlIGlmICggZXZlbnQuZGV0YWlsICkgeyAvKiogTW96aWxsYSBjYXNlLiAqL1xuICAgICAgICAvKiBJbiBNb3ppbGxhLCBzaWduIG9mIGRlbHRhIGlzIGRpZmZlcmVudCB0aGFuIGluIElFLlxuICAgICAgICAgKiBBbHNvLCBkZWx0YSBpcyBtdWx0aXBsZSBvZiAzLiAqL1xuICAgICAgICBkZWx0YSA9IC1ldmVudC5kZXRhaWwgLyAzO1xuICAgICB9XG4gICAgIC8qIFByZXZlbnQgZGVmYXVsdCBhY3Rpb25zIGNhdXNlZCBieSBtb3VzZSB3aGVlbC4gSXQgbWlnaHQgYmUgdWdseSAqL1xuICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgIC8qIElmIGRlbHRhIGlzIG5vbnplcm8sIGhhbmRsZSBpdCwgb3RoZXJ3aXNlIHNjcmFwIGl0IEJhc2ljYWxseSwgZGVsdGEgaXMgbm93IHBvc2l0aXZlIGlmXG4gICAgIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi4gKi9cbiAgICAgaWYgKCBkZWx0YSApIHJldHVybiBkZWx0YTtcbiAgfTtcbiAgLyoqIEhhcyB0aGUgbW91c2UgY2xpY2sgYmVlbiByaWdodCBtb3VzZSBidXR0b25cbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHdoZXJlIHRoZSBjbGljayBvY2N1cmVkICovXG4gIHNjb3BlLmlzUmlnaHRDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIHJpZ2h0Y2xpY2s7XG5cbiAgICAgZXZlbnQgPSBldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50OyAvKiBGb3IgSUUuICovXG4gICAgIGlmICggZXZlbnQuYnV0dG9ucyApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbnMgPT0gMiApO1xuICAgICBlbHNlIGlmICggZXZlbnQud2hpY2ggKSByaWdodGNsaWNrID0gKCBldmVudC53aGljaCA9PSAzICk7XG4gICAgIGVsc2UgaWYgKCBldmVudC5idXR0b24gKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b24gPT0gMiApO1xuXG4gICAgIGlmICggcmlnaHRjbGljayApIHJldHVybiB0cnVlO1xuXG4gICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIHNjb3BlO1xufSApKCk7XG5leHBvcnQgdmFyIHJlc2l6ZVV0aWxzID0ge1xuICB0b2dnbGVGdWxsU2NyZWVuOiBmdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuYm9keTsgLy8gTWFrZSB0aGUgYm9keSBnbyBmdWxsIHNjcmVlbi5cbiAgICB2YXIgaXNJbkZ1bGxTY3JlZW4gPSAoIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICYmIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICE9PSBudWxsICkgfHxcbiAgICAgICAoXG4gICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gKTtcblxuICAgIGlzSW5GdWxsU2NyZWVuID8gY2FuY2VsRnVsbFNjcmVlbiggZG9jdW1lbnQgKSA6IHJlcXVlc3RGdWxsU2NyZWVuKCBlbGVtICk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTdWIgZnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gY2FuY2VsRnVsbFNjcmVlbiggZWwgKSB7XG4gICAgICAgdmFyIHJlcXVlc3RNZXRob2QgPSBlbC5jYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwud2Via2l0Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5leGl0RnVsbHNjcmVlbjtcbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIGNhbmNlbCBmdWxsIHNjcmVlbi5cbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoIGVsICk7XG4gICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICkgeyAvLyBPbGRlciBJRS5cbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xuICAgICAgICAgIHdzY3JpcHQgIT09IG51bGwgJiYgd3NjcmlwdC5TZW5kS2V5cyggXCJ7RjExfVwiICk7XG4gICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RGdWxsU2NyZWVuKCBlbCApIHtcbiAgICAgICAvLyBTdXBwb3J0cyBtb3N0IGJyb3dzZXJzIGFuZCB0aGVpciB2ZXJzaW9ucy5cbiAgICAgICB2YXIgcmVxdWVzdE1ldGhvZCA9IGVsLnJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1zUmVxdWVzdEZ1bGxTY3JlZW47XG5cbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIE5hdGl2ZSBmdWxsIHNjcmVlbi5cbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoIGVsICk7XG4gICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICkgeyAvLyBPbGRlciBJRS5cbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xuICAgICAgICAgIHdzY3JpcHQgIT09IG51bGwgJiYgd3NjcmlwdC5TZW5kS2V5cyggXCJ7RjExfVwiICk7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIC8qKiBTZXRzIGNhbnZhcyBzaXplIHRvIG1heGltdW0gd2lkdGggYW5kIGhlaWdodCBvbiB0aGUgYnJvd3Nlciwgbm90IHVzaW5nIGZ1bGxzY3JlZW5cbiAgICogQHBhcmFtIHtET01FbGVtZW50IENhbnZhcyBjb250ZXh0fSBjb250ZXh0ICovXG4gIHNldFRvRnVsbFNpemU6IGZ1bmN0aW9uIHNldFRvRnVsbFNpemUoY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBmdWxsU2l6ZSgpIHtcbiAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfTtcbiAgfVxufTtcblxuLyoqIFV0aWxzIGZvciBhZGRpbmcgZXZlbnQgaGFuZGxlcnMgb24gdGhlIG1hcCBhbmQga2VlcGluZyB0cmFjayBvZiB0aGVtLlxuICogQHRvZG8gR28gb3ZlciB0aGUgbW9kdWxlIGFuZCBzZWUgaWYgaXQgaXMgcmVhbGx5IG5lZWRlZCBvciBzaG91bGQgYmUgY2hhbmdlZC4gTWlnaHQgYmUgbGVnYWN5IGFuZCBub3QgbmVlZGVkIG5vdyAqL1xuZXhwb3J0IHZhciBsaXN0ZW5lcnMgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IExJU1RFTkVSX1RZUEVTID0ge1xuICAgIFwibW91c2Vtb3ZlXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZW1vdmVcIlxuICAgIH0sXG4gICAgXCJtb3VzZXVwXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZXVwXCJcbiAgICB9LFxuICAgIFwibW91c2Vkb3duXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJtb3VzZWRvd25cIlxuICAgIH0sXG4gICAgXCJtb3VzZXdoZWVsXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJ3aGVlbFwiXG4gICAgfSxcbiAgICBcIm1vdXNlY2xpY2tcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcImNsaWNrXCJcbiAgICB9LFxuICB9O1xuICB2YXIgX2V2ZW50TGlzdGVuZXJzID0gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCk7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIHNjb3BlLnNldE9uZSA9IGZ1bmN0aW9uIHNldE9uZShhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgLyogVGhlcmUgaGFzIGJlZW4gc2V2ZXJhbCBkaWZmZXJlbnQgbW91c2V3aGVlbCBldmVudHMgYmVmb3JlLCBidXQgbm93IGFsbCBleGNlcHQgb3BlcmEgc2hvdWxkIHN1cHBvcnQgXCJ3aGVlbFwiICovXG4gICAgX2V2ZW50TGlzdGVuZXJzW2FjdGlvbl0ucHVzaChjYWxsYmFjayk7XG4gICAgdGhpc1tMSVNURU5FUl9UWVBFU1thY3Rpb25dLmVsZW1lbnRdLmFkZEV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbYWN0aW9uXS5ldmVudCwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHNjb3BlLnJlbW92ZU9uZSA9IGZ1bmN0aW9uIHJlbW92ZU9uZSh0eXBlLCBvcmlnQ2FsbGJhY2spIHtcblxuICAgIGlmKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiICkge1xuICAgICAgaWYob3JpZ0NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXNbTElTVEVORVJfVFlQRVNbdHlwZV0uZWxlbWVudF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1t0eXBlXS5ldmVudCwgb3JpZ0NhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjYWxsYmFjayBzcGVjaWZpZWQhIC0gMVwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgaW5zdGFuY2VvZiBBcnJheSApIHtcbiAgICAgIHR5cGUuZm9yRWFjaCh0aGlzVHlwZSA9PiB7XG4gICAgICAgIGlmKG9yaWdDYWxsYmFjaykge1xuICAgICAgICAgIHRoaXNbTElTVEVORVJfVFlQRVNbdGhpc1R5cGVdLmVsZW1lbnRdLnJlbW92ZUV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbdGhpc1R5cGVdLmV2ZW50LCBvcmlnQ2FsbGJhY2spO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGNhbGxiYWNrIHNwZWNpZmllZCEgLSAyXCIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qIFBSSVZBVEUgZnVuY3Rpb25zICovXG4gIGZ1bmN0aW9uIF9nZXRFbXB0eUV2ZW50TGlzdGVuZXJBcnJheSgpIHtcbiAgICB2YXIgb2JqZWN0cyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoTElTVEVORVJfVFlQRVMpLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgICAgb2JqZWN0c1t0eXBlXSA9IFtdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbn0pKCk7IiwiJ3VzZXIgc3RyaWN0JztcblxuLyoqIFRoZSBjb3JlIHBsdWdpbiBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuIEhhbmRsZXMgem9vbWluZyBmb3IgdGhlIG1hcC4gQ29yZSBwbHVnaW5zIGNhbiBhbHdheXMgYmUgb3Zlcndyb3RlIGlmIG5lZWRlZCAqL1xuXG4vKiogPT09PT0gT1dOIGltcG9ydHMgPT09PT0gKi9cbmltcG9ydCB7IG1vdXNlVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHMuanNcIjtcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vZXZlbnRsaXN0ZW5lcnMnO1xuXG5leHBvcnQgbGV0IG1hcF96b29tID0gKGZ1bmN0aW9uIG1hcF96b29tKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgLyogTWF4aW11bSBhbmQgbWluaW11bSB0aGUgcGxheWVyIGNhbiB6b29tdCBoZSBtYXAgKi9cbiAgdmFyIHpvb21MaW1pdCA9IHtcbiAgICBmYXJ0aGVyOiAwLjQsXG4gICAgY2xvc2VyIDogMi41XG4gIH07XG4gIC8qIEhvdyBtdWNoIG9uZSBzdGVwIG9mIHpvb21pbmcgYWZmZWN0czogKi9cbiAgdmFyIHpvb21Nb2RpZmllciA9IDAuMTtcbiAgdmFyIGV2ZW50bGlzdGVuZXJzO1xuICBzY29wZS5wbHVnaW5OYW1lID0gbWFwX3pvb20ubmFtZTtcblxuICAvKiogUmVxdWlyZWQgaW5pdCBmdW5jdGlvbnMgZm9yIHRoZSBwbHVnaW5cbiAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0ICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwiem9vbUluXCIsIHpvb21Jbik7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21PdXRcIiwgem9vbU91dCk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21MaW1pdHNcIiwgc2V0Wm9vbUxpbWl0cyk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21Nb2RpZmllclwiLCBzZXRab29tTW9kaWZpZXIpO1xuXG4gICAgbWFwLmV2ZW50Q0JzLnpvb20gPSBfc2V0dXBab29tRXZlbnQobWFwKTtcblxuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMobWFwLmV2ZW50Q0JzKTtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVab29tTGlzdGVuZXIoKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyogPT09PSBQUk9UT1RZUEUgZXh0ZW5zaW9ucyBmb3IgbWFwICovXG4gIC8qKiBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tc1xuICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zICovXG4gIGZ1bmN0aW9uIHNldFpvb21Nb2RpZmllciAoYW1vdW50KSB7XG4gICAgem9vbU1vZGlmaWVyID0gYW1vdW50O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIEhvdyBtdWNoIGNhbiBiZSB6b29tZWQgaW4gbWF4aW11bSBhbmQgbWluaW11bVxuICAgKiBAcGFyYW0ge051bWJlciAxK30gZmFydGhlciBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tcyBvdXRcbiAgICogQHBhcmFtIHtOdW1iZXIgMCAtIDF9IGNsb3NlciBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tcyBpbiAqL1xuICBmdW5jdGlvbiBzZXRab29tTGltaXRzIChmYXJ0aGVyLCBjbG9zZXIpIHtcbiAgICB6b29tTGltaXQuZmFydGhlciA9IGZhcnRoZXI7XG4gICAgem9vbUxpbWl0LmNsb3NlciA9IGNsb3NlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBab29tIGluIHRvIHRoZSBtYXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBob3cgbXVjaCBtYXAgaXMgem9vbWVkIGluICovXG4gIGZ1bmN0aW9uIHpvb21JbiAoYW1vdW50KSB7XG4gICAgaWYoX2lzT3Zlclpvb21MaW1pdCggYW1vdW50ICkgKVxuXG4gICAgdGhpcy5nZXRMYXllcnNXaXRoQXR0cmlidXRlcyhcInpvb21hYmxlXCIsIHRydWUpLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgbGF5ZXIuc2NhbGVYIC09IHpvb21Nb2RpZmllcjtcbiAgICAgIGxheWVyLnNjYWxlWSAtPSB6b29tTW9kaWZpZXI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogWm9vbSBvdXQgb2YgdGhlIG1hcFxuICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IGhvdyBtdWNoIG1hcCBpcyB6b29tZWQgb3V0ICovXG4gIGZ1bmN0aW9uIHpvb21PdXQgKGFtb3VudCkge1xuICAgIGlmKF9pc092ZXJab29tTGltaXQoIGFtb3VudCApIClcblxuICAgIHRoaXMuZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoXCJ6b29tYWJsZVwiLCB0cnVlKS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGxheWVyLnNjYWxlWCArPSB6b29tTW9kaWZpZXI7XG4gICAgICBsYXllci5zY2FsZVkgKz0gem9vbU1vZGlmaWVyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICBmdW5jdGlvbiBfaXNPdmVyWm9vbUxpbWl0KGFtb3VudCkge1xuICAgIGlmKGFtb3VudCA+IHpvb21MaW1pdC5mYXJ0aGVyICYmIGFtb3VudCA8IHpvb21MaW1pdC5jbG9zZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnQobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZVpvb21FdmVudChldmVudCkge1xuICAgICAgdmFyIG1vdXNlV2hlZWxEZWx0YSA9IG1vdXNlVXRpbHMuZGVsdGFGcm9tV2hlZWwoZXZlbnQpO1xuXG4gICAgICBpZihtb3VzZVdoZWVsRGVsdGEgPiAwKSB7XG4gICAgICAgIG1hcC56b29tSW4oKTtcbiAgICAgIH0gZWxzZSBpZihtb3VzZVdoZWVsRGVsdGEgPCAwKSB7XG4gICAgICAgIG1hcC56b29tT3V0KCk7XG4gICAgICB9XG5cbiAgICAgIG1hcC5kcmF3T25OZXh0VGljaygpO1xuICAgIH07XG4gIH1cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9PYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uL3V0aWxzL2NyZWF0ZUhleGFnb24nO1xuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcblxudmFyIHNoYXBlO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZV9oZXhhIGV4dGVuZHMgT2JqZWN0X3Nwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCBleHRyYSA9IHsgcmFkaXVzOiAwIH0pIHtcbiAgICB2YXIgc2hhcGU7XG5cbiAgICBjb25zdCBIRUlHSFQgPSBoZXhhZ29uTWF0aC5jYWxjSGVpZ2h0KGV4dHJhLnJhZGl1cyk7XG4gICAgY29uc3QgU0lERSA9IGhleGFnb25NYXRoLmNhbGNTaWRlKGV4dHJhLnJhZGl1cyk7XG5cbiAgICBzdXBlcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHZhciBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKGV4dHJhLnJhZGl1cyk7XG4gICAgdGhpcy5yZWdYID0gaGV4YWdvblNpemUueCAvIDI7XG4gICAgdGhpcy5yZWdZID0gaGV4YWdvblNpemUueSAvIDI7XG4gICAgdGhpcy5IRUlHSFQgPSBIRUlHSFQ7XG4gICAgdGhpcy5TSURFID0gU0lERTtcblxuICAgIGlmICghZXh0cmEucmFkaXVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWVkIHJhZGl1cyFcIik7XG4gICAgfVxuXG4gICAgLyogRHJhdyBoZXhhZ29uIHRvIHRlc3QgdGhlIGhpdHMgd2l0aCBoaXRBcmVhICovXG4gICAgdGhpcy5oaXRBcmVhID0gc2V0QW5kR2V0U2hhcGUoZXh0cmEucmFkaXVzKTtcbiAgfVxuICBzdGF0aWMgZ2V0U2hhcGUoKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEFuZEdldFNoYXBlKHJhZGl1cykge1xuICBpZiAoIXNoYXBlKSB7XG4gICAgbGV0IGhleGFnb25TaXplID0gaGV4YWdvbk1hdGguZ2V0SGV4YVNpemUocmFkaXVzKTtcbiAgICAvKiB4IGFuZCB5IGFyZSByZXZlcnNlZCwgc2luY2UgdGhpcyBpcyBob3Jpem9udGFsIGhleGFnb24gYW5kIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsICovXG4gICAgc2hhcGUgPSBjcmVhdGVIZXhhZ29uKHsgeDogaGV4YWdvblNpemUueSAvIDIsIHk6IGhleGFnb25TaXplLnggLyAyIH0sIHJhZGl1cyk7XG4gIH1cblxuICByZXR1cm4gc2hhcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF90ZXJyYWluX2hleGEgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX2hleGEge1xuICBjb25zdHJ1Y3QoLi4uYXJncykge1xuICAgIHN1cGVyLnNwcml0ZVNoZWV0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdF9oZXhhXCI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vT2JqZWN0X2hleGEnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3VuaXRfaGV4YSBleHRlbmRzIE9iamVjdF9zcHJpdGVfaGV4YSB7XG4gIGNvbnN0cnVjdCguLi5hcmdzKSB7XG4gICAgc3VwZXIuc3ByaXRlU2hlZXQoLi4uYXJncyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRVbml0T2JqZWN0c19oZXhhXCI7XG4gIH1cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGFuZ2xlID0gMzApIHtcbiAgdmFyIHNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIHZhciBjb2xvciA9IFwiIzQ0NDQ0NFwiO1xuICB2YXIgcG9pbnRTaXplID0gMDtcblxuICBzaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoY29sb3IpXG4gICAgLmRyYXdQb2x5U3RhciAoIGNvb3Jkcy54LCBjb29yZHMueSwgcmFkaXVzLCA2LCBwb2ludFNpemUsIGFuZ2xlICk7XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogTk9URTogVGhlc2UgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgaGV4YWdvbnMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNIZWlnaHQocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY1NpZGUocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiAzIC8gMjtcbn1cblxuLyogTW9kaWZpZWQgRnJvbSBqYXZhIGV4YW1wbGU6IGh0dHA6Ly9ibG9nLnJ1c2xhbnMuY29tLzIwMTEvMDIvaGV4YWdvbmFsLWdyaWQtbWF0aC5odG1sXG4gICBUaGlzIGlzIHN1cHBvc2VkIHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCBoZXhhZ29uYWwgaW5kZXgsIHRoYXQgcmVwcmVzZW50cyB0aGUgaGV4YWdvbiB0aGUgcGxheWVyIGNsaWNrZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpIHtcbiAgdmFyIEhFSUdIVCA9IHJhZGl1cyAqIE1hdGguc3FydCgzKTtcbiAgdmFyIFNJREUgPSByYWRpdXMgKiAzIC8gMjtcblxuICB2YXIgY2kgPSBNYXRoLmZsb29yKHgvU0lERSk7XG4gIHZhciBjeCA9IHggLSBTSURFICogY2k7XG5cbiAgdmFyIHR5ID0geSAtIChjaSAlIDIpICogSEVJR0hUIC8gMjtcbiAgdmFyIGNqID0gTWF0aC5mbG9vciggdHkgLyBIRUlHSFQpO1xuICB2YXIgY3kgPSB0eSAtIEhFSUdIVCAqIGNqO1xuXG4gIGlmIChjeCA+IE1hdGguYWJzKHJhZGl1cyAvIDIgLSByYWRpdXMgKiBjeSAvIEhFSUdIVCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmIChjb29yZGluYXRlSW5kZXhlcy54IDwgMCAmJiBjb29yZGluYXRlSW5kZXhlcy54IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImNsaWNrIG91dHNpZGUgb2YgdGhlIGhleGFnb24gYXJlYVwiKTtcbiAgfVxuICBjZW50ZXJDb29yZHMgPSB7XG4gICAgeDogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy54ICogaGV4YVNpemUueCArIGhhbGZIZXhhU2l6ZS54KSxcbiAgICB5OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnkgKiBoZXhhU2l6ZS55ICsgaGFsZkhleGFTaXplLnkpXG4gIH07XG5cbiAgcmV0dXJuIGNlbnRlckNvb3Jkcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FsY0hlaWdodDogY2FsY0hlaWdodCxcbiAgY2FsY1NpZGU6IGNhbGNTaWRlLFxuICBzZXRDZWxsQnlQb2ludDogc2V0Q2VsbEJ5UG9pbnQsXG4gIGdldEhleGFTaXplOiBnZXRIZXhhU2l6ZSxcbiAgdG9IZXhhQ2VudGVyQ29vcmQ6IHRvSGV4YUNlbnRlckNvb3JkXG59OyIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XG4gIElEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBtYXBTaXplOiB7IHg6IDUwLCB5OiAyMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX2RyYWdcIiwgXCJvYmplY3Rfc2VsZWN0X2hleGFnb25cIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhcnRQb2ludDogeyB4OiAwLCB5OiAwIH0sXG4gIGVsZW1lbnQ6IFwiI21hcENhbnZhc1wiLFxuICBsYXllcnM6IFt7XG4gICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICBjb29yZDogeyB4OiAwLCB5OiAwIH0sXG4gICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgc3BlY2lhbHM6IFt7XG4gICAgICBcImludGVyYWN0aXZlXCI6IGZhbHNlXG4gICAgfV0sXG4gICAgb3B0aW9uczoge1xuICAgICAgY2FjaGU6IHRydWVcbiAgICB9LFxuICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgIHR5cGU6IFwiT2JqZWN0X3RlcnJhaW5cIixcbiAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSx7XG4gICAgICAgICBcIm9ialR5cGVcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzJcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjQxXCIsXG4gICAgICAgICAgICBcInlcIjpcIjcwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfSx7XG4gICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgXCJuYW1lXCI6IFwidW5pdExheWVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgfSxcbiAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRcIixcbiAgICAgIFwibmFtZVwiOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICBcIm9iamVjdHNcIjogW3tcbiAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgIFwiY29vcmRcIjoge1xuICAgICAgICAgIFwieFwiOiBcIjQxXCIsIFwieVwiOiBcIjcwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICBcInNvbWVDdXN0b21EYXRhXCI6IFwidHJ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjgyLFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo5NFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCIvYXNzZXRzL2ltZy9tYXAvdGVzdEhleGFnb25zL3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFswLDAsODIsOTRdLFs4MiwwLDgyLDk0XSxbMTY0LDAsODIsOTRdLFsyNDYsMCw4Miw5NF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls4Miw5NF1cbiAgICB9LFxuICAgIFwidGVycmFpblwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICB9LFxuICAgIFwiZGl0aGVyXCI6e1wiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2RpdGhlcjIucG5nXCJdLFwiZnJhbWVzXCI6W1swLDAsOTYsNDhdXSxcImltYWdlU2l6ZVwiOls5Niw0OF19LFxuICAgIFwicHJldHRpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvaGlsbHMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMi5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw2NiwwLDAsMThdLFsxLDEsOTYsNDgsMSwtNCw0XSxbMSwxNDgsOTYsNDgsMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicmVzb3VyY2VcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9yZXNvdXJjZXMvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxOTUsMSw5Niw0OF0sWzM4OSwxLDk2LDQ4XVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJwbGFjZVwiOnt9LFxuICAgIFwiY2l0eVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbWVkaWV2YWxjaXRpZXMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1cbiAgICAgIF1cbiAgICB9LFwiYnVpbGRpbmdcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXCJtb2RpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInVuaXRcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC91bml0cy90ZXN0SGV4YWdvblVuaXRzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6e1wid2lkdGhcIjo4MixcImhlaWdodFwiOjk0fVxuICAgIH1cbiAgfSxcbiAgXCJvYmplY3REYXRhXCI6IHtcbiAgICBcInVuaXRcIjpbe1xuICAgICAgICBcIm5hbWVcIjpcInRhbmtcIixcbiAgICAgICAgXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxuICAgICAgICBcImRlZlwiOlwiUG9vclwiLFxuICAgICAgICBcInNpZWdlXCI6XCJEZWNlbnRcIixcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcbiAgICAgICAgXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICAgIH0se1xuICAgICAgICBcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJ1bml0XCI6e1xuICAgICAgICAgICAgXCJfZW5lbXlfXCI6W3tcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgXCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOlt7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAwXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMlwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDJcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAzXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDVcIlxuICAgIH1dLFxuICAgIFwidGVycmFpblwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwiZGVzZXJ0XCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwidmVyeSBkcnkgbGFuZFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiVW5pdFwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcImRlc2NcIjpcIlNpYmVyaWEgdGVhY2hlcyB5b3VcIixcImltYWdlXCI6XCI2XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXCJkZXNjXCI6XCJDcmFuYmVycmllcyBhbmQgY2xvdWRiZXJyaWVzXCIsXCJpbWFnZVwiOlwiOFwiXG4gICAgICAgIH1dLFxuICAgIFwiZGl0aGVyXCI6W1xuICAgICAge1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXG4gICAgXCJwcmV0dGlmaWVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMjUlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJ6SW5kZXhcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNjAlXCJ9XSxcInJlc291cmNlXCI6W3tcIm5hbWVcIjpcIk9hc2lzXCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwiT2FzaXMgaW4gdGhlIG1pZGRsZSBvZiBkZXNlcnQsIG9yIG5vdCBhdG0uXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJmb29kIHByb2R1Y3Rpb24gNSAvIHdlZWtcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiT2lsXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQmxhY2sgZ29sZFwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiVGhlcmUgaXMgYSBsb3Qgb2Ygb2lsIGhlcmVcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiNFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwiY2l0eVwiOlt7XCJuYW1lXCI6XCJNZWRpZXZhbFwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIwXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk1lZGlldmFsMlwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIxXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcInBsYWNlXCI6W10sXCJidWlsZGluZ1wiOlt7XCJuYW1lXCI6XCJCYXJyYWNrc1wiLFwiaW1hZ2VcIjpcIjBcIixcInRvb2x0aXBcIjpcIkVuYWJsZXMgdHJvb3AgcmVjcnVpdG1lbnRcIn0se1wibmFtZVwiOlwiRmFjdG9yeVwiLFwiaW1hZ2VcIjpcIjFcIixcInRvb2x0aXBcIjpcIlByb2R1Y2VzIHdlYXBvbnJ5XCJ9XSxcImdvdmVybm1lbnRcIjpbe1wibmFtZVwiOlwiRGVtb2NyYXp5XCIsXCJkZXNjcmlwdGlvblwiOlwid2VsbCBpdCdzIGEgZGVtb2NyYXp5IDopXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyArMjAlIGhhcHBpbmVzc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMCwxXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaGFwcGluZXNzXCI6XCIyMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ29tbXVuaXNtXCIsXCJkZXNjcmlwdGlvblwiOlwiWW91IGtub3cgdGhlIG9uZSB1c2VkIGluIHRoZSBncmVhdCBVU1NSIGFuZCBpbnNpZGUgdGhlIGdyZWF0IGZpcmV3YWxsIG9mIENoaW5hXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyBwcm9kdWN0aW9uIGJvbnVzZXNcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzIsM10sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOnt9fV19fSxcIkNpdHlcIjp7XCJidWlsZGluZ1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiMjAlXCJ9fV19fX19XSxcInBvbGl0aWNzXCI6e1widGF4UmF0ZVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImNvcnJ1cHRpb25cIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJhbGlnbm1lbnRcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJoYXBwaW5lc3NcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJyZXZvbHRSaXNrXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwidW5pdHlcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJuYXRWYWx1ZVwiOlt7XCJuYW1lXCI6XCJJbnRlZ3JpdHlcIixcInRvb2x0aXBcIjpcIkdvdmVybm1lbnQgYW5kIHBvcHVsYXRpb25zIHNob3dzIGludGVncml0eSBhbmQgdHJ1c3R3b3J0aGluZXNzXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImludGVybmFsUmVsYXRpb25zXCI6XCIrMTAlXCIsXCJkaXBsb21hY3lcIjpcIisxMCVcIixcInJldm9sdCByaXNrXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIi0yMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ2FwaXRhbGlzbVwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkaXBsb21hY3lcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJtb3JhbGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJIYXJkd29ya2luZ1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIisxMCVcIixcImhhcHBpbmVzc1wiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiTGVhZGVyc2hpcFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIis1JVwiLFwiaGFwcGluZXNzXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwidHJhZGluZ1wiOlwiKzEwJVwifX1dfX19fV19fVxufTsiXX0=
