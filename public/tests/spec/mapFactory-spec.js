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

},{"../../components/factories/horizontalHexaFactory.js":3,"../../tests/data/gameData.js":22,"../../tests/data/mapData.js":23,"../../tests/data/typeData.js":24}],2:[function(require,module,exports){
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

var _mapCoreEventlisteners = require('../map/core/eventlisteners');

var allSpritesheets = (0, _mapCoreSpritesheetList.spritesheetList)();

var functionsInObj = {
  Object_terrain: _mapExtensionsHexagonsObjectObject_terrain_hexa.Object_terrain,
  Object_unit: _mapExtensionsHexagonsObjectObject_unit_hexa.Object_unit
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

  document.getElementById('testFullscreen').addEventListener('click', function () {
    _mapCoreEventlisteners.eventListeners.toggleFullScreen();
  });

  return map;
}

},{"../map/UIs/default/default.js":4,"../map/core/Map":5,"../map/core/UI":9,"../map/core/eventlisteners":10,"../map/core/spritesheetList":14,"../map/extensions/hexagons/object/Object_terrain_hexa":18,"../map/extensions/hexagons/object/Object_unit_hexa":19}],4:[function(require,module,exports){
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

var _styleSheet = {};
var cssClasses = {
  select: "dialog_select"
};

var UI_default = (function () {
  function UI_default(modal, styles) {
    _classCallCheck(this, UI_default);

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    _styleSheet = _addStyleElement();
    _addCSSRulesToScriptTag(_styleSheet, _createCSSRules());

    this.modal = modal || document.getElementById("dialog_select");
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }

  _createClass(UI_default, [{
    key: "showSelections",
    value: function showSelections(map, objects) {
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
        // HTML 5.1 dialogs
        if (this.modal.show) {
          this.modal.show();
        } else {
          this.modal.classList.add(cssClasses.select);
        }

        console.log(objects);
      }
    }
  }, {
    key: "highlightSelectedObject",
    value: function highlightSelectedObject(map, object) {}
  }, {
    key: "init",
    value: function init() {
      var self = this;

      this.closingElements.forEach(function (element) {
        /**
         * @todo change this modal system totally. As it is based on HTML 5.1 modal specifications atm. for easy testing
         * Maybe create a class that abstracts the modal behind it or then just use this? */
        if (self.modal && self.modal.close) {
          _activateClosingElement(element, self.modal.close.bind(self.modal));
        }
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
function _addCSSRulesToScriptTag(sheet, rules) {
  sheet.insertRule(rules, 0);
}
function _addStyleElement() {
  var _styleElement = document.createElement("style");
  // WebKit hack :(
  _styleElement.appendChild(document.createTextNode(""));
  document.head.appendChild(_styleElement);

  return _styleElement.sheet;
}
function _createCSSRules() {
  var dialogOptions = arguments[0] === undefined ? { zIndex: 9999, opacity: 0.8 } : arguments[0];

  return "\n    " + cssClasses.select + " {\n      z-index: " + dialogOptions.zIndex + ";\n      opacity: " + dialogOptions.opacity + ";\n      position: fixed;\n      left: 0;\n      bottom: 0;\n    }";
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
 * @require canvas HTML5-element to work.
 *
 * @require Plugins that use eventlistener by default, use pointer events polyfill, such as: https://github.com/jquery/PEP
 * Plugins and eventlistener can be overriden, but they user pointer events by default (either the browser must support
 * them or use polyfill) */

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
var eventlisteners, _stage, _staticLayer, _movableLayer;

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
    _stage = new _Map_stage.Map_stage('mainStage', canvas);
    _staticLayer = new _Map_layer.Map_layer('staticLayer', options.subContainers, options.startCoord);
    _stage.addChild(_staticLayer);
    _movableLayer = new _Map_layer.Map_layer('movableLayer', options.subContainers, options.startCoord);
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    /* Activate the map zoom and map drag core plugins */
    this.defaultPlugins = [_zoomMap_zoom.map_zoom, _moveMap_drag.map_drag];
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
    eventlisteners = (0, _eventlisteners.eventListeners)(this, canvas);
    this.environment = 'desktop';
    this.mapEnvironment(_utilsUtils.environmentDetection.isMobile() && 'mobile');
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
        _movableLayer.x = coord.x;
        _movableLayer.y = coord.y;
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
      return _stage.children[0].children.filter(function (layer) {
        return layer[attribute] === value;
      });
    }
  }, {
    key: 'getStage',
    value: function getStage() {
      return _stage;
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

      _movableLayer.addChild(layer);

      return layer;
    }
  }, {
    key: 'removeLayer',

    /**
     * @param {Map_layer} layer - the layer object to be removed */
    value: function removeLayer(layer) {
      _movableLayer.removeChild(layer);

      return layer;
    }
  }, {
    key: 'getLayerNamed',

    /** @return layer with the passed layer name */
    value: function getLayerNamed(name) {
      return _movableLayer.getChildNamed(name);
    }
  }, {
    key: 'moveMap',

    /**
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
    value: function moveMap(coordinates) {
      var realCoordinates = {
        x: coordinates.x / _staticLayer.getScale(),
        y: coordinates.y / _staticLayer.getScale()
      };
      _movableLayer.move(realCoordinates);
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

      if (_movableLayer.getCacheEnabled()) {
        _movableLayer.cache(0, 0, this.mapSize.x, this.mapSize.y);
      } else {
        _movableLayer.children.forEach(function (child) {
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

      _movableLayer.getObjectsUnderPoint(coord);

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
    value: function activatePlugins() {
      var _this2 = this;

      var pluginsArray = arguments[0] === undefined ? [] : arguments[0];

      pluginsArray.forEach(function (plugin) {
        console.log('doing plugins');
        if (_this2.plugins.add(plugin)) {
          console.log('doing plugins2');
          plugin.init(_this2);
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
  }, {
    key: 'mapEnvironment',

    /** getter and setter for marking environment as mobile or desktop */
    value: function mapEnvironment(env) {
      if (env !== undefined) {
        this.environment = env;
        return env;
      }

      return this.environment;
    }
  }, {
    key: 'getMapPosition',

    /** @return { x: Number, y: Number }, current coordinates for the map */
    value: function getMapPosition() {
      return {
        x: _movableLayer.x,
        y: _movableLayer.y
      };
    }
  }, {
    key: 'getZoomLayers',
    value: function getZoomLayers() {
      return [_staticLayer];
    }
  }, {
    key: 'getScale',
    value: function getScale() {
      return _staticLayer.getScale();
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
  map.getStage().update();

  return map;
}

},{"./Map_layer":6,"./Map_stage":7,"./eventlisteners":10,"./move/map_drag":11,"./utils/utils":15,"./zoom/map_zoom":16}],6:[function(require,module,exports){
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
    this.zoomable = false;
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
  }, {
    key: "setScale",
    value: function setScale(amount) {
      this.scaleX = amount;
      this.scaleY = amount;

      return amount;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      return this.scaleX;
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

var extensions = [];

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
/* global Hammer, createjs */

/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @require Hammer.js for touch events*/

var singletonScope;

/* ===== EXPORT ===== */
/**
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this
 * class. I.e.
 {
   select: function() {},
   zoom: function() {}
 }*/
var eventListeners = function eventListenerModule(map, canvasElement) {
  if (singletonScope) {
    return singletonScope;
  }
  if (!map || !canvasElement) {
    throw new Error("eventlisteners require map callbacks and canvas element as arguments");
  }

  var mapCBs = map.eventCBs;

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
    singletonScope.states.fullScreen = mapCBs.fullscreen();

    return mapCBs.fullscreen;
  };
  singletonScope.toggleZoomListener = function toggleZoomListener() {
    if (singletonScope.states.zoom !== true) {
      if (isMobile()) {
        var hammer = new Hammer.Manager(canvasElement);
        var pinch = new Hammer.Pinch();
        hammer.add(pinch);
        hammer.on("pinch", mapCBs.zoom);
      } else {
        canvasElement.addEventListener("mousewheel", mapCBs.zoom);
      }

      singletonScope.states.zoom = true;
    } else {
      if (isMobile()) {
        hammer.on("pinch", mapCBs.zoom);
      } else {
        canvasElement.removeEventListener("mousewheel", mapCBs.zoom);
      }

      singletonScope.states.zoom = false;
    }

    return mapCBs.zoom;
  };
  singletonScope.toggleDragListener = function toggleDragListener() {
    if (singletonScope.states.drag !== true) {
      if (isMobile()) {
        var hammer = new Hammer.Manager(canvasElement);
        var pan = new Hammer.Pan({
          pointers: 1,
          threshold: 5,
          direction: Hammer.DIRECTION_ALL });
        hammer.add(pan);
        hammer.on("pan", mapCBs.drag);
      } else {
        canvasElement.addEventListener("mousedown", mapCBs.drag);
      }

      singletonScope.states.drag = true;
    } else {
      if (isMobile()) {
        hammer.off("pan", mapCBs.drag);
      } else {
        canvasElement.removeEventListener("mousedown", mapCBs.drag);
      }

      singletonScope.states.drag = false;
    }

    return mapCBs.drag;
  };
  singletonScope.toggleSelectListener = function toggleSelectListener() {
    if (singletonScope.states.select !== true) {
      if (isMobile()) {
        var hammer = new Hammer.Manager(canvasElement);
        var tap = new Hammer.Tap();
        hammer.add(tap);
        hammer.on("tap", mapCBs.select);
      } else {
        canvasElement.addEventListener("mousedown", mapCBs.select);
      }

      singletonScope.states.select = true;
    } else {
      if (isMobile()) {
        hammer.off("tap", mapCBs.select);
      } else {
        canvasElement.removeEventListener("mousedown", mapCBs.select);
      }

      singletonScope.states.select = false;
    }

    return mapCBs.select;
  };

  return singletonScope;
};

exports.eventListeners = eventListeners;
function isMobile() {
  return typeof Hammer != "undefined";
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @todo See if this plugin need refactoring and more documentation */

var _eventlisteners = require('../eventlisteners');

var map_drag = (function map_drag() {
  var scope = {};
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();
  var eventlisteners;

  /* ===== For testing ===== */
  scope._startDragListener = _startDragListener;

  scope.pluginName = 'map_drag';

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    console.log('DRAG INIT');
    eventlisteners = (0, _eventlisteners.eventListeners)(map);
    if (map.mapEnvironment() === 'mobile') {
      map.eventCBs.drag = _startDragListener_mobile(map);
    } else {
      map.eventCBs.drag = _startDragListener(map);
    }

    eventlisteners.toggleDragListener();
  };

  return scope;

  /** Starts the whole functionality of this class
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener(map) {
    console.log('STARTED DRAG');
    return function startDrag(e) {
      console.log('CONTINUE');
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
        return function (e) {
          e.preventDefault();

          map.canvas.removeEventListener('mousemove', moveCallback1);
          map.canvas.removeEventListener('mouseup', mouseupCallback);
          _mapMoved(map);
        };
      }
      /* Event listeners are in their separate file; eventListeners.js */
      function _dragListener(map) {
        try {
          return function dragger(e) {
            var eventCoords = {
              x: e.pageX,
              y: e.pageY
            };

            e.preventDefault();

            map.mapMoved(true);

            if (e.buttons === 0) {
              map.canvas.removeEventListener('mousemove', moveCallback1);
              map.canvas.removeEventListener('mouseup', mouseupCallback);
              /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
              _mapMoved(map);
            }

            var offset = offsetCoords.getOffset();
            var moved = {
              x: eventCoords.x - offset.x,
              y: eventCoords.y - offset.y
            };

            if (moved.x > 0 || moved.y > 0 || moved.x < 0 || moved.y < 0) {
              map.moveMap(moved);
            } else {
              map.mapMoved(false);
            }

            offsetCoords.setOffset({
              x: eventCoords.x,
              y: eventCoords.y
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

  function _startDragListener_mobile(map) {
    var initialized = false;

    return function startDrag(e) {
      var coords = e.center;

      e.preventDefault();

      try {
        if (!initialized) {
          offsetCoords.setOffset({
            x: coords.x,
            y: coords.y
          });
          initialized = true;
          map.mapMoved(true);

          return;
        } else if (e.isFinal === true) {
          initialized = false;
          map.mapMoved(false);
        }

        map.mapMoved(true);

        var offset = offsetCoords.getOffset();
        var moved = {
          x: coords.x - offset.x,
          y: coords.y - offset.y
        };

        if (moved.x !== 0 || moved.y !== 0) {
          map.moveMap(moved);
        }

        offsetCoords.setOffset({
          x: coords.x,
          y: coords.y
        });
      } catch (e) {
        console.log(e);
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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

var _Object = require('../Object');

var Object_sprite_terrain = (function (_Object_sprite) {
  function Object_sprite_terrain(coords, data, spriteSheet, currFrameNumber) {
    _classCallCheck(this, Object_sprite_terrain);

    _get(Object.getPrototypeOf(Object_sprite_terrain.prototype), 'constructor', this).call(this, coords, data, spriteSheet, currFrameNumber);

    this.name = 'DefaultTerrainObject';
  }

  _inherits(Object_sprite_terrain, _Object_sprite);

  return Object_sprite_terrain;
})(_Object.Object_sprite);

exports.Object_sprite_terrain = Object_sprite_terrain;

},{"../Object":8}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** Map unit like infantry or worker, usually something with actions or movable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

var _Object = require('../Object');

var Object_sprite_unit = (function (_Object_sprite) {
  function Object_sprite_unit(coords, data, spriteSheet, currFrameNumber) {
    _classCallCheck(this, Object_sprite_unit);

    _get(Object.getPrototypeOf(Object_sprite_unit.prototype), 'constructor', this).call(this, coords, data, spriteSheet, currFrameNumber);

    this.name = 'DefaultUnitObjects';
    this.actions = {
      move: [],
      attack: []
    };
  }

  _inherits(Object_sprite_unit, _Object_sprite);

  _createClass(Object_sprite_unit, [{
    key: 'doAction',
    value: function doAction(type) {
      this.actions[type].forEach(function (action) {
        action();
      });
    }
  }, {
    key: 'addActionType',
    value: function addActionType(type) {
      this.actions[type] = this.actions[type] || [];
    }
  }, {
    key: 'addCallbackToAction',
    value: function addCallbackToAction(type, cb) {
      this.actions[type].push(cb);
    }
  }]);

  return Object_sprite_unit;
})(_Object.Object_sprite);

exports.Object_sprite_unit = Object_sprite_unit;

},{"../Object":8}],14:[function(require,module,exports){
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
    var ID = scope.getSpritesheetID(spritesheetData.images);

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

},{"blueimp-md5":2}],15:[function(require,module,exports){
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
      var size = _getWindowSize();

      context.canvas.width = size.x;
      context.canvas.height = size.y;
    };
  },
  getWindowSize: _getWindowSize
};

exports.resizeUtils = resizeUtils;
/** Utils for adding event handlers on the map and keeping track of them.
 * @todo Go over the module and see if it is really needed or should be changed. Might be legacy and not needed now */
var listeners = (function () {
  var LISTENER_TYPES = {
    "mousemove": {
      element: "canvas",
      event: "pointermove"
    },
    "mouseup": {
      element: "canvas",
      event: "pointerup"
    },
    "mousedown": {
      element: "canvas",
      event: "pointerdown"
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
var environmentDetection = (function () {
  var scope = {};

  scope.isMobile = function () {
    var screenSize = screen.width <= 640 || window.matchMedia && window.matchMedia("only screen and (max-width: 640px)").matches;
    var features = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    return features && screenSize;
  };

  return scope;
})();

exports.environmentDetection = environmentDetection;
/** PRIVATE */
function _getWindowSize() {
  return {
    x: window.innerWidth,
    y: window.innerHeight
  };
}

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** @todo Change the map move after zooming to be mouse based or such. Now it is based on the map corners coordinates */

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
  scope.pluginName = 'map_drag';

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    console.log('ZOOOOOM INIT');
    map.setPrototype('zoomIn', zoomIn);
    map.setPrototype('zoomOut', zoomOut);
    map.setPrototype('setZoomLimits', setZoomLimits);
    map.setPrototype('setZoomModifier', setZoomModifier);
    map.setPrototype('getZoomableLayers', getZoomableLayers);

    if (map.mapEnvironment() === 'mobile') {
      map.eventCBs.zoom = _setupZoomEvent_mobile(map);
    } else {
      map.eventCBs.zoom = _setupZoomEvent(map);
    }

    eventlisteners = (0, _eventlisteners.eventListeners)(map.eventCBs);
    eventlisteners.toggleZoomListener();
  };

  return scope;

  /* ==== PROTOTYPE extensions for map */
  /** How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms. Needs to be in between 0 - 0.5 */
  function setZoomModifier(amount) {
    if (!(amount > 0 || amount <= 0.5)) {
      throw new Error('Wrong zoom modifier! (needs to be >0 and <=0.5, given:' + amount);
    }
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
    var divider = arguments[1] === undefined ? 1 : arguments[1];

    var newScale;

    this.getZoomableLayers().forEach(function (layer) {
      if (_isOverZoomLimit(layer.scaleX, true)) {
        return false;
      }
      newScale = layer.scaleY = layer.scaleX += (amount || zoomModifier) * divider;
    });

    return newScale;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
  function zoomOut(amount) {
    var divider = arguments[1] === undefined ? 1 : arguments[1];

    var newScale;

    this.getZoomableLayers().forEach(function (layer) {
      if (_isOverZoomLimit(layer.scaleX)) {
        return false;
      }
      newScale = layer.scaleY = layer.scaleX -= (amount || zoomModifier) * divider;
    });

    return newScale;
  }
  function getZoomableLayers() {
    return this.getZoomLayers();
  }

  /* ===== Initializers ===== */
  function _setupZoomEvent(map) {
    return function handleZoomEvent(e) {
      var mouseWheelDelta = _utilsUtilsJs.mouseUtils.deltaFromWheel(e);

      if (mouseWheelDelta > 0) {
        if (map.zoomIn()) {
          map.moveMap(_calculateCenterMoveCoordinates(true));
        }
      } else if (mouseWheelDelta < 0) {
        if (map.zoomOut()) {
          map.moveMap(_calculateCenterMoveCoordinates());
        }
      }

      // no need when we use map.move:
      //map.drawOnNextTick();
    };
  }

  function _setupZoomEvent_mobile(map) {
    var initialized = false;
    var difference = {};

    return function handleZoomEvent_mobile(e) {
      var pointers = e.pointers;
      var coords = [{
        x: pointers[0].pageX,
        y: pointers[0].pageY
      }, {
        x: pointers[1].pageX,
        y: pointers[1].pageY
      }];
      var changeX = Math.abs(coords[0].x - coords[1].x);
      var changeY = Math.abs(coords[0].y - coords[1].y);

      e.preventDefault();

      try {
        if (!initialized) {
          difference = {
            x: changeX,
            y: changeY
          };
          initialized = true;

          return;
        } else if (e.isFinal === true) {
          alert('STOP');
          initialized = false;
        }

        if (difference.x + difference.y < changeX + changeY) {
          if (map.zoomIn(undefined, 0.5)) {
            map.moveMap(_calculateCenterMoveCoordinates(true));
          }
        } else {
          if (map.zoomIn(undefined, 0.5)) {
            map.moveMap(_calculateCenterMoveCoordinates());
          }
          map.zoomOut(undefined, 0.5);
        }

        // no need when we use map.move:
        //map.drawOnNextTick();

        difference = {
          x: changeX,
          y: changeY
        };
      } catch (e) {
        console.log('Error! ', e);
      }
    };
  }

  /* ===== Private functions ===== */
  function _isOverZoomLimit(amount, isZoomIn) {
    if (isZoomIn && amount > zoomLimit.closer || !isZoomIn && amount < zoomLimit.farther) {
      return true;
    }

    return false;
  }
  function _calculateCenterMoveCoordinates(isZoomIn) {
    var windowSize = _utilsUtilsJs.resizeUtils.getWindowSize();
    var halfWindowSize = {
      x: windowSize.x / 2,
      y: windowSize.y / 2
    };
    var realMovement = {
      x: halfWindowSize.x * (isZoomIn ? -zoomModifier : zoomModifier),
      y: halfWindowSize.y * (isZoomIn ? -zoomModifier : zoomModifier)
    };

    return realMovement;
  }
})();
exports.map_zoom = map_zoom;

},{"../eventlisteners":10,"../utils/utils.js":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsCreateHexagon = require('../utils/createHexagon');

var _utilsHexagonMath = require('../utils/hexagonMath');

var _utilsHexagonMath2 = _interopRequireDefault(_utilsHexagonMath);

var shape;

var object_sprite_hexa = {
  build: function calculateHexa(radius) {
    if (!radius) {
      throw new Error('Need radius!');
    }

    var HEIGHT = _utilsHexagonMath2['default'].calcHeight(radius);
    var SIDE = _utilsHexagonMath2['default'].calcSide(radius);

    var hexagonSize = _utilsHexagonMath2['default'].getHexaSize(radius);
    this.regX = hexagonSize.x / 2;
    this.regY = hexagonSize.y / 2;
    this.HEIGHT = HEIGHT;
    this.SIDE = SIDE;

    /* Draw hexagon to test the hits with hitArea */
    this.hitArea = setAndGetShape(radius);
  }
};

exports.object_sprite_hexa = object_sprite_hexa;
function setAndGetShape(radius) {
  if (!shape) {
    var hexagonSize = _utilsHexagonMath2['default'].getHexaSize(radius);
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = (0, _utilsCreateHexagon.createHexagon)({ x: hexagonSize.y / 2, y: hexagonSize.x / 2 }, radius);
  }

  return shape;
}

},{"../utils/createHexagon":20,"../utils/hexagonMath":21}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Object_hexa = require('./Object_hexa');

var _coreObjectsObject_sprite_terrain = require('../../../core/objects/Object_sprite_terrain');

var Object_terrain = (function (_Object_sprite_terrain) {
  function Object_terrain(_x, data, spritesheet, currentFrameNumber) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var extra = arguments[4] === undefined ? { radius: 0 } : arguments[4];

    _classCallCheck(this, Object_terrain);

    _get(Object.getPrototypeOf(Object_terrain.prototype), 'constructor', this).call(this, coords, data, spritesheet, currentFrameNumber);

    this.name = 'DefaultTerrainObject_hexa';

    _Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  _inherits(Object_terrain, _Object_sprite_terrain);

  return Object_terrain;
})(_coreObjectsObject_sprite_terrain.Object_sprite_terrain);

exports.Object_terrain = Object_terrain;

},{"../../../core/objects/Object_sprite_terrain":12,"./Object_hexa":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Object_hexa = require('./Object_hexa');

var _coreObjectsObject_sprite_unit = require('../../../core/objects/Object_sprite_unit');

var Object_unit = (function (_Object_sprite_unit) {
  function Object_unit(_x, data, spritesheet, currentFrameNumber) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var extra = arguments[4] === undefined ? { radius: 0 } : arguments[4];

    _classCallCheck(this, Object_unit);

    _get(Object.getPrototypeOf(Object_unit.prototype), 'constructor', this).call(this, coords, data, spritesheet, currentFrameNumber);

    this.name = 'DefaultUnitObjects_hexa';

    _Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  _inherits(Object_unit, _Object_sprite_unit);

  return Object_unit;
})(_coreObjectsObject_sprite_unit.Object_sprite_unit);

exports.Object_unit = Object_unit;

},{"../../../core/objects/Object_sprite_unit":13,"./Object_hexa":17}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9tYXBGYWN0b3J5LXNwZWMuZXM2LmpzIiwibm9kZV9tb2R1bGVzL2JsdWVpbXAtbWQ1L2pzL21kNS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9mYWN0b3JpZXMvaG9yaXpvbnRhbEhleGFGYWN0b3J5LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXBfbGF5ZXIuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX3N0YWdlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL09iamVjdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9VSS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9ldmVudGxpc3RlbmVycy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9tb3ZlL21hcF9kcmFnLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL29iamVjdHMvT2JqZWN0X3Nwcml0ZV90ZXJyYWluLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL29iamVjdHMvT2JqZWN0X3Nwcml0ZV91bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS91dGlscy91dGlscy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS96b29tL21hcF96b29tLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENB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Q0FBQzs7OztDQUlKLENBQUMsQ0FBQzs7Ozs7QUNqSUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUNyRDtBQUNELGlCQUFXLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0QsYUFBUyxFQUFDO0FBQ1IsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzFIO0FBQ0QsaUJBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7S0FDcEI7QUFDRCxZQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUM7QUFDOUYsZ0JBQVksRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHVDQUF1QyxFQUFDLG1DQUFtQyxFQUFDLHNDQUFzQyxDQUFDO0FBQzdILGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUN0RDtLQUNGO0FBQ0QsY0FBVSxFQUFDO0FBQ1QsY0FBUSxFQUFDLENBQUMsd0NBQXdDLENBQUM7QUFDbkQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUM1QjtLQUNGO0FBQ0QsV0FBTyxFQUFDLEVBQUU7QUFDVixVQUFNLEVBQUM7QUFDTCxjQUFRLEVBQUMsQ0FBQyw0Q0FBNEMsQ0FBQztBQUN2RCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQzVSO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUN2STtLQUNGLEVBQUMsVUFBVSxFQUFDO0FBQ1gsY0FBUSxFQUFDLENBQUMsc0NBQXNDLENBQUM7QUFDakQsY0FBUSxFQUFDLENBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDdkk7S0FDRjtBQUNELFVBQU0sRUFBQztBQUNMLGNB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Q0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyw0Q0FBNEMsRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsWUFBWSxFQUFDLDBCQUEwQixFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxvQkFBb0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsNEJBQTRCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsMEJBQTBCLEVBQUMsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsZ0ZBQWdGLEVBQUMsU0FBUyxFQUFDLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLGdFQUFnRSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDO0NBQ244SCxDQUFDO1FBOUhTLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IExpYnJhcnkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIE1hcCA9IHJlcXVpcmUoICcuLi9wdWJsaWMvY29tcG9uZW50cy9tYXAvTWFwJyk7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMnO1xuXG4vKiBSZWFkIGRhdGEgZnJvbSBmaWxlcywgdG8gdXNlIHdpdGggdGVzdGluZyAqL1xuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzJztcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS90eXBlRGF0YS5qcyc7XG5pbXBvcnQgeyBtYXBEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9tYXBEYXRhLmpzJztcblxuLypcbjEuIERhdGF0IHloZGVzc8OkIHDDtnRrw7Zzc8OkLCBrdXRlbiB0w6TDpCBueWt5aW5lbiB0ZXN0aS1kYXRhLiBFbGkgbm9pIHRlc3RpdCBkYXRhdCB0aWVkb3N0b29uIGphIHBpdMOkw6QgbXV1dHRhYSBvaWtlYWFuIG11b3Rvb24hXG5cbllvdSBzaG91bGQgdXNlIHRoaXMgZGF0YSBpbnN0ZWFkIG9mIHRoZSB0ZXN0RGF0YSBiZWxvdy4gWW91IHNob3VsZCBjb252ZXJ0IHRoaXMgZGF0YSB0byBzdWl0IHRoZSBzdGFuZGFyZHMgc28gdGhhdCB0aGVyZVxuaXMgYW5vdGhlciBjbGFzcyAvIG1vZHVsZSB0aGF0IGhhbmRsZXMgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCB5b3UgZGVmaW5lIGEgZ29vZCBzZXQgb2YgcHJpbmNpcGxlIGhvdyBpdCdzIGRvbmUuIERhdGEgaW4gdGhpczpcblwie1xuICBcIm9ialR5cGVcIjoyLFxuICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmIzXCIsXG4gIFwiY29vcmRcIjp7XCJ4XCI6MCxcInlcIjowfVxufVwiXG5XaGF0IGRvIHdlIGRvIHdpdGggdGhlIF9pZCBhbmQgc2hvdWxkIHRoYXQgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgZGF0YSwgd2hlbiB3ZSBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0cy5cblxuQWx3YXlzIHJlcXVlc3QgZGF0YSBmcm9tIGJhY2tlbmQgd2l0aCBnYW1lSUQgYW5kIHR1cm4sIGxpa2U6IGRvbWFpbi5maS9BUEkvbWFwRGF0YS84MzI5NDhoZmRqc2g5My8xXG5cbi8qID09PT09PSBUZXN0cyA9PT09PT0gKi9cbmRlc2NyaWJlKFwiYmFzaWMgbWFwIC0gd2l0aG91dCBwbHVnaW5zXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIC8qbGV0IG1hcERhdGEgPSB7XG4gICAgbWFwU2l6ZTogeyB4OiAxMDAsIHk6IDEwMCB9LFxuICAgIHBsdWdpbnNUb0FjdGl2YXRlOiBmYWxzZSxcbiAgICBzdGFnZXM6IFt7XG4gICAgICB0eXBlOiBcIk1hcF9zdGFnZVwiLFxuICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgbmFtZTogXCJ0ZXJyYWluU3RhZ2VcIixcbiAgICAgIGVsZW1lbnQ6IFwiI2NhbnZhc1RlcnJhaW5cIixcbiAgICAgIGxheWVyczogW3tcbiAgICAgICAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgICAgICAgdHlwZTogXCJPYmplY3RzX3RlcnJhaW5cIixcbiAgICAgICAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICAgICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDEsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUGxhaW5cIixcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogeyB4OiA0MCwgeTogNDAgfSxcbiAgICAgICAgICAgICAgICBpbWFnZURhdGE6IDIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgc29tZUN1c3RvbURhdGE6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0se1xuICAgICAgICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIG5hbWU6IFwidW5pdExheWVyXCIsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICAgICAgICB0eXBlOiBcIk9iamVjdHNfdW5pdFwiLFxuICAgICAgICAgICAgbmFtZTogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgICAgICAgdHlwZUltYWdlRGF0YTogXCJ1bml0XCIsXG4gICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICBuYW1lOiBcIkluZmFudHJ5IDFcIixcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogNjAsIHk6IDYwIH0sXG4gICAgICAgICAgICAgIGltYWdlRGF0YTogMyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDdXN0b21EYXRhOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfV1cbiAgfTtcbiAgKi9cblxuXG4gIGRlc2NyaWJlKFwiPT4gbWFrZSBtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1hcCA9IGNyZWF0ZU1hcChtYXBDYW52YXMsIGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG5cbiAgICBpdChcIj0+IGV4aXN0c1wiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KG1hcCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgICBpdChcIj0+IHN0YWdlIHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLm5hbWUgPT09IFwidGVycmFpblN0YWdlXCIpLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuc3RhZ2VzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKS5uYW1lICA9PT0gXCJ0ZXJyYWluU3RhZ2VcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KHR5cGVvZiBtYXAuZ2V0Q2hpbGROYW1lZChcInRlcnJhaW5TdGFnZVwiKSA9PT0gXCJvYmplY3RcIikudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gbGF5ZXIgcHJvcGVydGllcyBhcmUgY29ycmVjdFwiLCBmdW5jdGlvbigpe1xuICAgICAgZXhwZWN0KHR5cGVvZiBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKSA9PT0gXCJvYmplY3RcIikudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KG1hcC5zdGFnZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdGVycmFpbiBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInRlcnJhaW5CYXNlTGF5ZXJcIikuY2hpbGRyZW5bMV0ueSApID09PSA0ODApLnRvQmVUcnV0aHkoKTtcbiAgICAgIGV4cGVjdChtYXAuZ2V0TGF5ZXJOYW1lZChcInRlcnJhaW5CYXNlTGF5ZXJcIikuY2hpbGRyZW4ubGVuZ3RoID4gMSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KFwiPT4gdW5pdCBwcm9wZXJ0aWVzIGFyZSBjb3JyZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBleHBlY3QoTnVtYmVyKCBtYXAuZ2V0TGF5ZXJOYW1lZChcInVuaXRMYXllclwiKS5jaGlsZHJlblswXS54ICkgPT09IDYwKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoXCI9PiB1bml0IHByb3BlcnRpZXMgYXJlIGNvcnJlY3RcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgICBtYXAuaW5pdCggdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRpY2tEb25lRnVuYyApO1xuXG4gICAgICBmdW5jdGlvbiB0aWNrRG9uZUZ1bmModGlja0RvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBleHBlY3QoIHRydWUgKS50b0JlVHJ1dGh5KCk7XG5cblxuICAgIH0pO1xuICB9KTtcblxuICAvKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuICAvLyBub25lXG59KTtcblxuXG4vKiBzb21lIGZ1bmN0aW9ucyB0byBoZWxwIHRlc3RzICovIiwiLypcbiAqIEphdmFTY3JpcHQgTUQ1IDEuMC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqIFxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4vKmdsb2JhbCB1bmVzY2FwZSwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qXG4gICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSkge1xuICAgICAgICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpLFxuICAgICAgICAgICAgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KSB7XG4gICAgICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sX21kNSh4LCBsZW4pIHtcbiAgICAgICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgICAgICAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAobGVuICUgMzIpO1xuICAgICAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XG5cbiAgICAgICAgdmFyIGksIG9sZGEsIG9sZGIsIG9sZGMsIG9sZGQsXG4gICAgICAgICAgICBhID0gIDE3MzI1ODQxOTMsXG4gICAgICAgICAgICBiID0gLTI3MTczMzg3OSxcbiAgICAgICAgICAgIGMgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICAgIGQgPSAgMjcxNzMzODc4O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgb2xkYSA9IGE7XG4gICAgICAgICAgICBvbGRiID0gYjtcbiAgICAgICAgICAgIG9sZGMgPSBjO1xuICAgICAgICAgICAgb2xkZCA9IGQ7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgICAgICAgNywgLTY4MDg3NjkzNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE3LCAgNjA2MTA1ODE5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA3LCAtMTc2NDE4ODk3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArICA4XSwgIDcsICAxNzcwMDM1NDE2KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICAgICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDcsICAxODA0NjAzNjgyKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XG5cbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNSwgLTE2NTc5NjUxMCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICA2XSwgIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgIDY0MzcxNzcxMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaV0sICAgICAgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCAgOSwgIDM4MDE2MDgzKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA1LCAgNTY4NDQ2NDM4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xuICAgICAgICAgICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArICAyXSwgIDksIC01MTQwMzc4NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTQsICAxNzM1MzI4NDczKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA1XSwgIDQsIC0zNzg1NTgpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpICsgIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgIDQsICA2ODEyNzkxNzQpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2ldLCAgICAgIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICA5XSwgIDQsIC02NDAzNjQ0ODcpO1xuICAgICAgICAgICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArICAyXSwgMjMsIC05OTUzMzg2NTEpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA2LCAgMTg3MzMxMzM1OSk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgICAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArICA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyAgNF0sICA2LCAtMTQ1NTIzMDcwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcbiAgICAgICAgICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG5cbiAgICAgICAgICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICAgICAgICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICAgICAgICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICAgICAgICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2EsIGIsIGMsIGRdO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmwycnN0cihpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoICogMzI7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAgICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDg7IGkgKz0gOCkge1xuICAgICAgICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhGRikgPDwgKGkgJSAzMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX21kNShzKSB7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUocnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyX2htYWNfbWQ1KGtleSwgZGF0YSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGJrZXkgPSByc3RyMmJpbmwoa2V5KSxcbiAgICAgICAgICAgIGlwYWQgPSBbXSxcbiAgICAgICAgICAgIG9wYWQgPSBbXSxcbiAgICAgICAgICAgIGhhc2g7XG4gICAgICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgICBia2V5ID0gYmlubF9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzY7XG4gICAgICAgICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUM7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaCA9IGJpbmxfbWQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5sMnJzdHIoYmlubF9tZDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgICAgIHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLFxuICAgICAgICAgICAgb3V0cHV0ID0gJycsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXG4gICAgICAgICAgICAgICAgaGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxuICAgICovXG4gICAgZnVuY3Rpb24gc3RyMnJzdHJfdXRmOChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xuICAgICovXG4gICAgZnVuY3Rpb24gcmF3X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyX21kNShzdHIycnN0cl91dGY4KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGV4X21kNShzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfbWQ1KHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmF3X2htYWNfbWQ1KGssIGQpIHtcbiAgICAgICAgcmV0dXJuIHJzdHJfaG1hY19tZDUoc3RyMnJzdHJfdXRmOChrKSwgc3RyMnJzdHJfdXRmOChkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyYXdfaG1hY19tZDUoaywgZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoZXhfbWQ1KHN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmF3X21kNShzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3X2htYWNfbWQ1KGtleSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWQ1O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkLm1kNSA9IG1kNTtcbiAgICB9XG59KHRoaXMpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEZhY3Rvcnkgd2hlcmUgd2UgY29uc3RydWN0IGEgaG9yaXpvbnRhbCBoZXhhZ29uIG1hcCBmb3IgdGVzdCBhbmQgZGV2ZWxvcG1lbnQgcHVycG9zZXNcbiAqXG4gKiBAcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4gKiBAdG9kbyBBZGQgZG9jdW1lbnRhdGlvbiBhbmQgcmVmYWN0b3IgKG1heWJlIG1vZHVsYXJpemUgLyBmdW5jdGlvbmFsaXplKSB0aGUgYWN0dWFsIGxvZ2ljICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9NYXAnO1xuaW1wb3J0IHsgT2JqZWN0X3RlcnJhaW4gfSBmcm9tICcuLi9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdCB9IGZyb20gJy4uL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhJztcbmltcG9ydCB7IHNwcml0ZXNoZWV0TGlzdCB9IGZyb20gJy4uL21hcC9jb3JlL3Nwcml0ZXNoZWV0TGlzdCc7XG52YXIgYWxsU3ByaXRlc2hlZXRzID0gc3ByaXRlc2hlZXRMaXN0KCk7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uL21hcC9jb3JlL1VJJztcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL1VJcy9kZWZhdWx0L2RlZmF1bHQuanNcIjtcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vbWFwL2NvcmUvZXZlbnRsaXN0ZW5lcnMnO1xuXG52YXIgZnVuY3Rpb25zSW5PYmogPSB7XG4gIE9iamVjdF90ZXJyYWluLFxuICBPYmplY3RfdW5pdFxufTtcblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG4vKipcbiAqIEBwYXJhbSB7RE9NRWxlbWVudCBDYW52YXN9IGNhbnZhc0VsZW1lbnQgdGhlIGNhbnZhcyBlbGVtZW50IGZvciB0aGUgbWFwXG4gKiBAcGFyYW0ge09iamVjdH0gZ2FtZURhdGFBcmcgZ2FtZURhdGEuIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhc1xuICogQHBhcmFtIHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbiAqIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhc1xuICogQHBhcmFtIHtPYmplY3R9IHR5cGVEYXRhQXJnIHR5cGVEYXRhLiBNb3JlIHNwZWNpZmljIGRhdGEgaW4gZGF0YS1mb2xkZXJzIHRlc3QtZGF0YXMuXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIGdhbWVEYXRhQXJnLCBtYXBEYXRhQXJnLCB0eXBlRGF0YUFyZykge1xuICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG4gIHZhciBtYXBEYXRhID0gKHR5cGVvZiBtYXBEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UobWFwRGF0YUFyZykgOiBtYXBEYXRhQXJnO1xuICB2YXIgdHlwZURhdGEgPSAodHlwZW9mIHR5cGVEYXRhQXJnID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UodHlwZURhdGFBcmcpIDogdHlwZURhdGFBcmc7XG4gIHZhciBnYW1lRGF0YSA9ICh0eXBlb2YgZ2FtZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShnYW1lRGF0YUFyZykgOiBnYW1lRGF0YUFyZztcbiAgdmFyIG1hcCA9IG5ldyBNYXAoY2FudmFzRWxlbWVudCwgeyBtYXBTaXplOiBnYW1lRGF0YS5tYXBTaXplIH0pO1xuICB2YXIgZGlhbG9nX3NlbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0aW9uRGlhbG9nXCIpO1xuICB2YXIgZGVmYXVsdFVJID0gbmV3IFVJX2RlZmF1bHQoZGlhbG9nX3NlbGVjdGlvbik7XG4gIGRlZmF1bHRVSS5pbml0KCk7XG5cbiAgLyogSW5pdGlhbGl6ZSBVSSBhcyBzaW5nbGV0b24gKi9cbiAgVUkoZGVmYXVsdFVJLCBtYXApO1xuXG4gIC8qIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZ2l2ZW4gbWFwIGRhdGEgYW5kIGNyZWF0ZSBvYmplY3RzIGFjY29yZGluZ2x5ICovXG4gIG1hcERhdGEubGF5ZXJzLmZvckVhY2goIGxheWVyRGF0YSA9PiB7XG4gICAgbGV0IHRoaXNMYXllcjtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzTGF5ZXIgPSBtYXAuYWRkTGF5ZXIoIGxheWVyRGF0YS5uYW1lLCBmYWxzZSwgbGF5ZXJEYXRhLmNvb3JkICk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW06XCIsIGxheWVyRGF0YS50eXBlLCBlLnN0YWNrKTtcbiAgICB9XG5cbiAgICBsYXllckRhdGEub2JqZWN0R3JvdXBzLmZvckVhY2goIG9iamVjdEdyb3VwID0+IHtcbiAgICAgIGxldCBzcHJpdGVzaGVldDtcbiAgICAgIGxldCBzcHJpdGVzaGVldFR5cGUgPSBvYmplY3RHcm91cC50eXBlSW1hZ2VEYXRhO1xuXG4gICAgICBpZighc3ByaXRlc2hlZXRUeXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBzcHJpdGVzaGVldFR5cGUtZGF0YVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZihzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgbGV0IHNwcml0ZXNoZWV0RGF0YSA9IHR5cGVEYXRhLmdyYXBoaWNEYXRhW3Nwcml0ZXNoZWV0VHlwZV07XG5cbiAgICAgICAgc3ByaXRlc2hlZXQgPSBhbGxTcHJpdGVzaGVldHMuY3JlYXRlU3ByaXRlc2hlZXQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICAgIH1cblxuICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICBsZXQgb2JqVHlwZURhdGEgPSB0eXBlRGF0YS5vYmplY3REYXRhW3Nwcml0ZXNoZWV0VHlwZV1bb2JqZWN0Lm9ialR5cGVdO1xuXG4gICAgICAgIGlmKCFvYmpUeXBlRGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEZyYW1lTnVtYmVyID0gb2JqVHlwZURhdGEuaW1hZ2U7XG4gICAgICAgIGxldCBvYmpEYXRhID0ge1xuICAgICAgICAgIHR5cGVEYXRhOiBvYmpUeXBlRGF0YSxcbiAgICAgICAgICBhY3RpdmVEYXRhOiBvYmplY3QuZGF0YVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IGZ1bmN0aW9uc0luT2JqW29iamVjdEdyb3VwLnR5cGVdKCBvYmplY3QuY29vcmQsIG9iakRhdGEsIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIsIHsgcmFkaXVzOiA0NyB9ICk7XG4gICAgICAgIHRoaXNMYXllci5hZGRDaGlsZCggbmV3T2JqZWN0ICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgbWFwLm1vdmVNYXAobWFwRGF0YS5zdGFydFBvaW50KTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlc3RGdWxsc2NyZWVuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVycy50b2dnbGVGdWxsU2NyZWVuKCk7XG4gIH0pO1xuXG4gIHJldHVybiBtYXA7XG59IiwiLyoqIFRoZSBzaW1wbGVzdCBkZWZhdWx0IFVJIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnQgVUkgZnVuY3Rpb25hbGl0aWVzIGZvcjpcbiAqIHNob3dTZWxlY3Rpb25zXG4gKiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdFxuICpcbiAqIEB0b2RvIElOIFBST0dSRVNTLCBub3QgaW1wbGVtZW50ZWQgd2VsbCB5ZXQuIFVzZXMgY2hyb21lcyBidWlsdC1pbiBtb2RhbCBzdXBwb3J0IG9ubHkgYXRtLiBqdXN0IGZvciB0aGUga2lja3MgOikgICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zdHlsZVNoZWV0ID0ge307XG52YXIgY3NzQ2xhc3NlcyA9IHtcbiAgc2VsZWN0OiBcImRpYWxvZ19zZWxlY3RcIlxufTtcblxuZXhwb3J0IGNsYXNzIFVJX2RlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcihtb2RhbCwgc3R5bGVzKSB7XG4gIFx0Ly8gQWRkIGEgbWVkaWEgKGFuZC9vciBtZWRpYSBxdWVyeSkgaGVyZSBpZiB5b3UnZCBsaWtlIVxuXHQgIC8vIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIFwic2NyZWVuXCIpXG5cdCAgLy8gc3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6IDEwMjRweClcIilcblx0ICBfc3R5bGVTaGVldCA9IF9hZGRTdHlsZUVsZW1lbnQoKTtcblx0ICBfYWRkQ1NTUnVsZXNUb1NjcmlwdFRhZyhfc3R5bGVTaGVldCwgX2NyZWF0ZUNTU1J1bGVzKCkpO1xuXG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlhbG9nX3NlbGVjdFwiKTtcbiAgICB0aGlzLnN0eWxlcyA9IHN0eWxlcyB8fCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0YwRjBGMFwiXG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2luZ0VsZW1lbnRzID0gX0RPTUVsZW1lbnRzVG9BcnJheSh0aGlzLm1vZGFsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9jbG9zZVwiKSk7XG4gIH1cbiAgc2hvd1NlbGVjdGlvbnMobWFwLCBvYmplY3RzKSB7XG4gICAgaWYgKG9iamVjdHMgJiYgb2JqZWN0cy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwib2JqZWN0czo8YnI+XCI7XG4gICAgICBvYmplY3RzLm1hcCggb2JqZWN0ID0+IHtcbiAgICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0LmRhdGEudHlwZURhdGEubmFtZSArIFwiPGJyPlwiO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IFwiU0VMRUNURUQ6PGJyPlwiO1xuICAgICAgdGhpcy5tb2RhbC5pbm5lckhUTUwgKz0gb2JqZWN0c1swXS5kYXRhLnR5cGVEYXRhLm5hbWU7XG4gICAgICAvLyBIVE1MIDUuMSBkaWFsb2dzXG4gICAgICBpZih0aGlzLm1vZGFsLnNob3cpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3Nlcy5zZWxlY3QpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QobWFwLCBvYmplY3QpIHtcbiAgICAvLyBOb3QgaW1wbGVtZW50ZWQgeWV0XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIC8qKlxuICAgICAgICogQHRvZG8gY2hhbmdlIHRoaXMgbW9kYWwgc3lzdGVtIHRvdGFsbHkuIEFzIGl0IGlzIGJhc2VkIG9uIEhUTUwgNS4xIG1vZGFsIHNwZWNpZmljYXRpb25zIGF0bS4gZm9yIGVhc3kgdGVzdGluZ1xuICAgICAgICogTWF5YmUgY3JlYXRlIGEgY2xhc3MgdGhhdCBhYnN0cmFjdHMgdGhlIG1vZGFsIGJlaGluZCBpdCBvciB0aGVuIGp1c3QgdXNlIHRoaXM/ICovXG4gICAgICBpZihzZWxmLm1vZGFsICYmIHNlbGYubW9kYWwuY2xvc2UpIHtcbiAgICAgICAgX2FjdGl2YXRlQ2xvc2luZ0VsZW1lbnQoIGVsZW1lbnQsIHNlbGYubW9kYWwuY2xvc2UuYmluZChzZWxmLm1vZGFsKSApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KGVsZW1lbnQsIGNsb3NlQ0IpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjbG9zZUNCKCk7XG4gICAgICB9KTtcbn1cbmZ1bmN0aW9uIF9ET01FbGVtZW50c1RvQXJyYXkoZWxlbWVudHMpIHtcbiAgaWYgKCFlbGVtZW50cykge1xuICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yICsgXCIgZnVuY3Rpb24gbmVlZHMgZWxlbWVudHNcIik7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuICB2YXIgZWxlbWVudEFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnRBcnJheS5wdXNoKGVsZW1lbnRzW2ldKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50QXJyYXk7XG59XG5mdW5jdGlvbiBfYWRkQ1NTUnVsZXNUb1NjcmlwdFRhZyhzaGVldCwgcnVsZXMpIHtcblx0c2hlZXQuaW5zZXJ0UnVsZShydWxlcywgMCk7XG59XG5mdW5jdGlvbiBfYWRkU3R5bGVFbGVtZW50KCkge1xuICAgIHZhciBfc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIC8vIFdlYktpdCBoYWNrIDooXG4gICAgX3N0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChfc3R5bGVFbGVtZW50KTtcblxuICAgIHJldHVybiBfc3R5bGVFbGVtZW50LnNoZWV0O1xufVxuZnVuY3Rpb24gX2NyZWF0ZUNTU1J1bGVzKGRpYWxvZ09wdGlvbnMgPSB7IHpJbmRleDogOTk5OSwgb3BhY2l0eTogMC44IH0gKSB7XG4gIHJldHVybiBgXG4gICAgJHtjc3NDbGFzc2VzLnNlbGVjdH0ge1xuICAgICAgei1pbmRleDogJHtkaWFsb2dPcHRpb25zLnpJbmRleH07XG4gICAgICBvcGFjaXR5OiAke2RpYWxvZ09wdGlvbnMub3BhY2l0eX07XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgIH1gO1xufSIsIi8qKiBNYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG4gKlxuICogTWFwIGlzIGluc3RhbnRpYXRlZCBhbmQgdGhlbiBpbml0aWFsaXplZCB3aXRoIGluaXQtbWV0aG9kLlxuICpcbiAqIFBsdWdpbnMgY2FuIGJlIGFkZGVkIHdpdGggYWN0aXZhdGVQbHVnaW5zLW1ldGhvZCBieSBwcm9kaXZpbmcgaW5pdChtYXApIG1ldGhvZCBpbiB0aGUgcGx1Z2luLiBQbHVnaW5zIGFyZSBhbHdheXNcbiAqIGZ1bmN0aW9ucywgbm90IG9iamVjdHMgdGhhdCBhcmUgaW5zdGFudGlhdGVkLiBQbHVnaW5zIGFyZSBzdXBwb3NlZCB0byBleHRlbmQgdGhlIG1hcCBvYmplY3Qgb3IgYW55dGhpbmcgaW4gaXQgdmlhXG4gKiBpdCdzIHB1YmxpYyBtZXRob2RzLlxuICpcbiAqIEByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4gKiBAcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLlxuICpcbiAqIEByZXF1aXJlIFBsdWdpbnMgdGhhdCB1c2UgZXZlbnRsaXN0ZW5lciBieSBkZWZhdWx0LCB1c2UgcG9pbnRlciBldmVudHMgcG9seWZpbGwsIHN1Y2ggYXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvUEVQXG4gKiBQbHVnaW5zIGFuZCBldmVudGxpc3RlbmVyIGNhbiBiZSBvdmVycmlkZW4sIGJ1dCB0aGV5IHVzZXIgcG9pbnRlciBldmVudHMgYnkgZGVmYXVsdCAoZWl0aGVyIHRoZSBicm93c2VyIG11c3Qgc3VwcG9ydFxuICogdGhlbSBvciB1c2UgcG9seWZpbGwpICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4vTWFwX3N0YWdlJztcbmltcG9ydCB7IE1hcF9sYXllciB9IGZyb20gJy4vTWFwX2xheWVyJztcbmltcG9ydCB7IHJlc2l6ZVV0aWxzLCByZXNpemVVdGlscywgZW52aXJvbm1lbnREZXRlY3Rpb24gfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7IG1hcF9kcmFnIH0gZnJvbSBcIi4vbW92ZS9tYXBfZHJhZ1wiO1xuaW1wb3J0IHsgbWFwX3pvb20gfSBmcm9tICcuL3pvb20vbWFwX3pvb20nO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXJzJztcblxudmFyIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xudmFyIGV2ZW50bGlzdGVuZXJzLCBfc3RhZ2UsIF9zdGF0aWNMYXllciwgX21vdmFibGVMYXllcjtcblxuZXhwb3J0IGNsYXNzIE1hcCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0RPTSBDYW52YXMgZWxlbWVudH0gY2FudmFzIC0gQ2FudmFzIHVzZWQgYnkgdGhlIG1hcFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGRpZmZlcmVudCBvcHRpb25zIGZvciB0aGUgbWFwIHRvIGJlIGdpdmVuLlxuICAgKiBAcmV0dXJuIE1hcCBpbnN0YW5jZSAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbnMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgX3N0YWdlID0gbmV3IE1hcF9zdGFnZShcIm1haW5TdGFnZVwiLCBjYW52YXMpO1xuICAgIF9zdGF0aWNMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJzdGF0aWNMYXllclwiLCBvcHRpb25zLnN1YkNvbnRhaW5lcnMsIG9wdGlvbnMuc3RhcnRDb29yZCk7XG4gICAgX3N0YWdlLmFkZENoaWxkKF9zdGF0aWNMYXllcik7XG4gICAgX21vdmFibGVMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJtb3ZhYmxlTGF5ZXJcIiwgb3B0aW9ucy5zdWJDb250YWluZXJzLCBvcHRpb25zLnN0YXJ0Q29vcmQpO1xuICAgIF9zdGF0aWNMYXllci5hZGRDaGlsZChfbW92YWJsZUxheWVyKTtcbiAgICB0aGlzLnBsdWdpbnMgPSBuZXcgU2V0KCk7XG4gICAgLyogQWN0aXZhdGUgdGhlIG1hcCB6b29tIGFuZCBtYXAgZHJhZyBjb3JlIHBsdWdpbnMgKi9cbiAgICB0aGlzLmRlZmF1bHRQbHVnaW5zID0gW21hcF96b29tLCBtYXBfZHJhZ107XG4gICAgdGhpcy5tYXBTaXplID0gb3B0aW9ucy5tYXBTaXplIHx8IHsgeDowLCB5OjAgfTtcbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRDQnMgPSB7XG4gICAgICBmdWxsU2l6ZTogcmVzaXplVXRpbHMuc2V0VG9GdWxsU2l6ZShjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSxcbiAgICAgIGZ1bGxzY3JlZW46IHJlc2l6ZVV0aWxzLnRvZ2dsZUZ1bGxTY3JlZW4sXG4gICAgICBzZWxlY3Q6IG51bGwsXG4gICAgICBkcmFnOiBudWxsLFxuICAgICAgem9vbTogbnVsbFxuICAgIH07XG4gICAgdGhpcy5fZnVsbFNpemVGdW5jdGlvbiA9IG51bGw7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyh0aGlzLCBjYW52YXMpO1xuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBcImRlc2t0b3BcIjtcbiAgICB0aGlzLm1hcEVudmlyb25tZW50KGVudmlyb25tZW50RGV0ZWN0aW9uLmlzTW9iaWxlKCkgJiYgXCJtb2JpbGVcIik7XG4gIH1cbiAgLyoqIGluaXRpYWxpemF0aW9uIG1ldGhvZFxuICAgKiBAcGFyYW0gW0FycmF5XSBwbHVnaW5zIC0gUGx1Z2lucyB0byBiZSBhY3RpdmF0ZWQgZm9yIHRoZSBtYXAuIE5vcm1hbGx5IHlvdSBzaG91bGQgZ2l2ZSB0aGUgcGx1Z2lucyBoZXJlIGluc3RlYWQgb2ZcbiAgICogc2VwYXJhdGVseSBwYXNzaW5nIHRoZW0gdG8gYWN0aXZhdGVQbHVnaW5zIG1ldGhvZFxuICAgKiBAcGFyYW0ge3g6ID8geTo/fSBjb29yZCAtIFN0YXJ0aW5nIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRpY2tDQiAtIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aWNrLiBUaWNrIGNhbGxiYWNrIGlzIGluaXRpYXRlZCBpbiBldmVyeSBmcmFtZS4gU28gbWFwIGRyYXdzIGhhcHBlblxuICAgKiBkdXJpbmcgdGlja3NcbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgaW5pdChwbHVnaW5zLCBjb29yZCwgdGlja0NCKSB7XG4gICAgaWYgKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cblxuICAgIGlmKGNvb3JkKSB7XG4gICAgICBfbW92YWJsZUxheWVyLnggPSBjb29yZC54O1xuICAgICAgX21vdmFibGVMYXllci55ID0gY29vcmQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgX2RlZmF1bHRUaWNrKHRoaXMpO1xuICAgIHRpY2tDQiAmJiB0aGlzLmN1c3RvbVRpY2tPbih0aWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBkcmF3T25OZXh0VGljaygpIHtcbiAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xuICBnZXRMYXllcnNXaXRoQXR0cmlidXRlcyhhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIF9zdGFnZS5jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIobGF5ZXIgPT4ge1xuICAgICAgcmV0dXJuIGxheWVyW2F0dHJpYnV0ZV0gPT09IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RhZ2UoKSB7XG4gICAgcmV0dXJuIF9zdGFnZTtcbiAgfVxuXG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwU2l6ZTtcbiAgfVxuICAvKiogQWxsIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCB0byBNYXBfbGF5ZXIgY29uc3RydWN0b3JcbiAgICogQHJldHVybiBjcmVhdGVkIE1hcF9sYXllciBpbnN0YW5jZSAqL1xuICBhZGRMYXllcihuYW1lLCBzdWJDb250YWluZXJzLCBjb29yZCkge1xuICAgIHZhciBsYXllciA9IG5ldyBNYXBfbGF5ZXIobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpO1xuXG4gICAgX21vdmFibGVMYXllci5hZGRDaGlsZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwX2xheWVyfSBsYXllciAtIHRoZSBsYXllciBvYmplY3QgdG8gYmUgcmVtb3ZlZCAqL1xuICByZW1vdmVMYXllcihsYXllcikge1xuICAgIF9tb3ZhYmxlTGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKiBAcmV0dXJuIGxheWVyIHdpdGggdGhlIHBhc3NlZCBsYXllciBuYW1lICovXG4gIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgIHJldHVybiBfbW92YWJsZUxheWVyLmdldENoaWxkTmFtZWQobmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIGFtb3VudCBvZiB4IGFuZCB5IGNvb3JkaW5hdGVzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlLiBJLmUuIHsgeDogNSwgeTogMCB9XG4gICAqIHdpdGggdGhpcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZSBob3Jpem9udGFsbHkgNSBwaXplbHMgYW5kIHZlcnRpY2FsbHkgc3RheSBhdCB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICogQHJldHVybiB0aGlzIG1hcCBpbnN0YW5jZSAqL1xuICBtb3ZlTWFwKGNvb3JkaW5hdGVzKSB7XG4gICAgdmFyIHJlYWxDb29yZGluYXRlcyA9IHtcbiAgICAgIHg6IGNvb3JkaW5hdGVzLnggLyBfc3RhdGljTGF5ZXIuZ2V0U2NhbGUoKSxcbiAgICAgIHk6IGNvb3JkaW5hdGVzLnkgLyBfc3RhdGljTGF5ZXIuZ2V0U2NhbGUoKVxuICAgIH07XG4gICAgX21vdmFibGVMYXllci5tb3ZlKHJlYWxDb29yZGluYXRlcyk7XG4gICAgdGhpcy5kcmF3T25OZXh0VGljaygpO1xuICAgIHRoaXMubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogQ2FjaGUgdGhlIG1hcC4gVGhpcyBwcm92aWRlcyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBib29zdCwgd2hlbiB1c2VkIGNvcnJlY3RseS4gY2FjaGVNYXAgaXRlcmF0ZXMgdGhyb3VnaCBhbGwgdGhlXG4gICAqIGxheWVyIG9uIHRoZSBtYXAgYW5kIGNhY2hlcyB0aGUgb25lcyB0aGF0IHJldHVybiB0cnVlIGZyb20gZ2V0Q2FjaGVFbmFibGVkLW1ldGhvZC5cbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUuIEkuZS4geyB4OiA1LCB5OiAwIH1cbiAgICogd2l0aCB0aGlzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlIGhvcml6b250YWxseSA1IHBpemVscyBhbmQgdmVydGljYWxseSBzdGF5IGF0IHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGNhY2hlTWFwKCkge1xuICAgIGlmKF9tb3ZhYmxlTGF5ZXIuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgIF9tb3ZhYmxlTGF5ZXIuY2FjaGUoMCwgMCwgdGhpcy5tYXBTaXplLngsIHRoaXMubWFwU2l6ZS55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgX21vdmFibGVMYXllci5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgaWYoY2hpbGQuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgICAgICBjaGlsZC5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogaXRlcmF0ZXMgdGhyb3VnaCB0aGUgbWFwIGxheWVycyBhbmQgcmV0dXJucyBtYXRjaGluZyBvYmplY3RzIG9uIGdpdmVuIGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIG1hcCBjb29yZGluYXRlIHVuZGVyIHdoaWNoIHdlIHdhbnQgdG8gcmV0cmlldmUgYWxsIHRoZSBvYmplY3RzLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGdldE9iamVjdHNVbmRlck1hcFBvaW50KGNvb3JkKSB7XG4gICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgIF9tb3ZhYmxlTGF5ZXIuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY29vcmQpO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgLyoqIFJlc2l6ZSB0aGUgY2FudmFzIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgYXJlYS4gVXNlcyB0aGlzLmV2ZW50Q0JzLmZ1bGxzaXplIGFzIGNhbGxiYWNrLCBzbyB3aGVuIHlvdSBuZWVkIHRvIG92ZXJ3cml0ZVxuICB0aGUgZXZlbnRsaXN0ZW5lciBjYWxsYmFjayB1c2UgdGhpcy5ldmVudENCcyAqL1xuICB0b2dnbGVGdWxsU2l6ZSgpIHtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVGdWxsU2l6ZUxpc3RlbmVyKCk7XG4gIH1cbiAgLyoqIFRvZ2dsZXMgZnVsbHNjcmVlbiBtb2RlLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNjcmVlbiBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cbiAgdG9nZ2xlRnVsbFNjcmVlbiAoKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNjcmVlbigpO1xuICB9XG4gIC8qKiBBY3RpdmF0ZSBwbHVnaW5zIGZvciB0aGUgbWFwLiBQbHVnaW5zIG5lZWQgLnBsdWdpbk5hbWUgcHJvcGVydHkgYW5kIC5pbml0LW1ldGhvZFxuICBAcGFyYW0gW0FycmF5XSBwbHVnaW5zQXJyYXkgLSBBcnJheSB0aGF0IGNvbnNpc3RzIG9mIHRoZSBwbHVnaW4gbW9kdWxlcyAqL1xuICBhY3RpdmF0ZVBsdWdpbnMocGx1Z2luc0FycmF5ID0gW10pIHtcbiAgICBwbHVnaW5zQXJyYXkuZm9yRWFjaChwbHVnaW4gPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJkb2luZyBwbHVnaW5zXCIpO1xuICAgICAgaWYodGhpcy5wbHVnaW5zLmFkZChwbHVnaW4pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG9pbmcgcGx1Z2luczJcIik7XG4gICAgICAgIHBsdWdpbi5pbml0KHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIEN1c3RvbSB0aWNrIGhhbmRsZXIgdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gbWFwLiBUaGUgZGVmYXVsdCB0aWNrIGhhbmRsZXIgaXMgYnkgZGVmYXVsdFxuICBhbHdheXMgb24gYW5kIHdpbGwgbm90IGJlIGFmZmVjdGVkXG4gIEBwYXJhbSBbRnVuY3Rpb25dIHRpY2tDQiAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHVzZSBpbiB0aWNrICovXG4gIGN1c3RvbVRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IGZ1bmN0aW9uKCkge307XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjdXN0b21UaWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBnZXR0ZXIgYW5kIHNldHRlciBmb3IgZGV0ZWN0aW5nIGlmIG1hcCBpcyBtb3ZlZCBhbmQgc2V0dGluZyB0aGUgbWFwcyBzdGF0dXMgYXMgbW92ZWQgb3Igbm90IG1vdmVkICovXG4gIG1hcE1vdmVkKHllc09yTm8pIHtcbiAgICBpZih5ZXNPck5vICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubWFwSW5Nb3ZlID0geWVzT3JObztcbiAgICAgIHJldHVybiB5ZXNPck5vO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hcEluTW92ZTtcbiAgfVxuICBzZXRQcm90b3R5cGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5fX3Byb3RvX19bcHJvcGVydHldID0gdmFsdWU7XG4gIH1cbiAgLyoqIGdldHRlciBhbmQgc2V0dGVyIGZvciBtYXJraW5nIGVudmlyb25tZW50IGFzIG1vYmlsZSBvciBkZXNrdG9wICovXG4gIG1hcEVudmlyb25tZW50KGVudikge1xuICAgIGlmKGVudiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmVudmlyb25tZW50ID0gZW52O1xuICAgICAgcmV0dXJuIGVudjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbnZpcm9ubWVudDtcbiAgfVxuICAvKiogQHJldHVybiB7IHg6IE51bWJlciwgeTogTnVtYmVyIH0sIGN1cnJlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXAgKi9cbiAgZ2V0TWFwUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IF9tb3ZhYmxlTGF5ZXIueCxcbiAgICAgIHk6IF9tb3ZhYmxlTGF5ZXIueVxuICAgIH07XG4gIH1cbiAgZ2V0Wm9vbUxheWVycygpIHtcbiAgICByZXR1cm4gW19zdGF0aWNMYXllcl07XG4gIH1cbiAgZ2V0U2NhbGUoKSB7XG4gICAgcmV0dXJuIF9zdGF0aWNMYXllci5nZXRTY2FsZSgpO1xuICB9XG59XG5cbi8qKiA9PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PSAqL1xuLyogVGhpcyBoYW5kbGVzIHRoZSBkZWZhdWx0IGRyYXdpbmcgb2YgdGhlIG1hcCwgc28gdGhhdCBtYXAgYWx3YXlzIHVwZGF0ZXMgd2hlbiBkcmF3T25OZXh0VGljayA9PT0gdHJ1ZS4gVGhpcyB0aWNrXG5jYWxsYmFjayBpcyBhbHdheXMgc2V0IGFuZCBzaG91bGQgbm90IGJlIHJlbW92ZWQgb3Igb3ZlcnJ1bGVkICovXG5mdW5jdGlvbiBfZGVmYXVsdFRpY2sobWFwKSB7XG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBfdGlja0Z1bmMpO1xuXG4gIHJldHVybiBfdGlja0Z1bmM7XG5cbiAgZnVuY3Rpb24gX3RpY2tGdW5jKCkge1xuICAgIGlmKF9kcmF3TWFwT25OZXh0VGljayA9PT0gdHJ1ZSkge1xuICAgICAgX2RyYXdNYXAobWFwKTtcbiAgICAgIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuLyogUHJpdmF0ZSBmdW5jdGlvbiB0byBkcmF3IHRoZSBtYXAgKi9cbmZ1bmN0aW9uIF9kcmF3TWFwKG1hcCkge1xuICBtYXAuZ2V0U3RhZ2UoKS51cGRhdGUoKTtcblxuICByZXR1cm4gbWFwO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiovXG5cbi8qKlxuICogQHRvZG8gdGhpcy5wcmV2ZW50U2VsZWN0aW9uLiBUaGlzIHNob3VsZCBkZXRlcm1pbmUgd2V0aGVyIHRoaXMgc3RhZ2UgaG9sZHMgZGF0YSB0aGF0IGNhbiBiZSBzZWxlY3RlZCBieSB0aGUgcGxheWVyXG4gKi9cblxuLyoqXG4gKiBAdG9kbyBzdWJDb250YWluZXJzLiBTdWJjb250YWluZXJzIGFyZSBjb250YWluZXJzIGluc2lkZSBsYXllcnMgZGVzaWduZWQgdG8gZ3JvdXAgdXAgb2JqZWN0cyB0byBzbWFsbGVyIGNvbnRhaW5lcnMuIFNvIGUuZy5cbiAqIGdldE9iamVjdHNVbmRlclBvaW50IGlzIGZhc3Rlci4gVGhpcyBoYXMgbm90IGJlZW4gZWZmaWNpZW50bHkgdGVzdGVkIGZyb20gcGVyZm9ybWFuY2Ugd2lzZSBzbyB0aGUgZmVhdHVyZSB3aWxsIGJlXG4gKiBhZGRlZCBhZnRlciB0aGUgYmFzaWMgbWFwIG1vZHVsZSB3b3JrcyBhbmQgd2UgY2FuIHZlcmlmeSB0aGUgZWZmZWN0IHdlbGwgKi9cblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJDb250YWluZXJzIFRvIGJlIGltcGxlbWVudGVkLiBUaGUgZGF0YSB3aGljaCB3ZSB1c2UgdG8gZGl2aWRlIHRoZSBjb250YWluZXIgdG8gc3ViQ29udGFpbmVyc1xuICAgKiBlLmcuIGZvciBtb3JlIGVmZmljaWVudCBhY2Nlc3NpYmlsaXR5IG9mIG9iamVjdHMgYmFzZWQgb24gY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIHN0YXJ0aW5nIGNvb3JkcyBvZiBsYXllci4gUmVsYXRpdmUgdG8gcGFyZW50IG1hcCBsYXllci5cbiAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJDb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XG4gICAgdGhpcy56b29tYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIC8qKiBzZXR0ZXIgYW5kIGdldHRlclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHN0YXR1cyBJZiBwcm92aWRlZCBzZXRzIHRoZSBjYWNoaW5nIHN0YXR1cyBvdGhlcndpc2UgcmV0dXJucyB0aGUgY3VycmVudCBzdGF0dXMgKi9cbiAgY2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgIGlmKHN0YXR1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgfVxuICAvKiogTW92ZSBsYXllclxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZGluYXRlcyBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbGF5ZXIgdG8gbW92ZS4gSS5lLlxuICAgeyB4OiA1LCB5OiAwIH1cbiAgIEByZXR1cm4gdGhpcyBsYXllciBpbnN0YW5jZSAqL1xuICBtb3ZlKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKHRoaXMubW92YWJsZSkge1xuICAgICAgdGhpcy54ICs9IGNvb3JkaW5hdGVzLng7XG4gICAgICB0aGlzLnkgKz0gY29vcmRpbmF0ZXMueTtcbiAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnN1YkNvbnRhaW5lcnM7XG4gIH1cbiAgc2V0U2NhbGUoYW1vdW50KSB7XG4gICAgdGhpcy5zY2FsZVggPSBhbW91bnQ7XG4gICAgdGhpcy5zY2FsZVkgPSBhbW91bnQ7XG5cbiAgICByZXR1cm4gYW1vdW50O1xuICB9XG4gIGdldFNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLnNjYWxlWDtcbiAgfVxufVxuXG4vKipcbiAqIEB0b2RvIGltcGxlbWVudCBzcHJpdGVDb250YWluZXIhIEl0IHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aGVuIHVzaW5nIHNwcml0ZXNoZWV0cy4gT25seSBpc3N1ZSB3YXMgdGhhdCBtaW5pZmllZFxuICogZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIHNwcml0ZVN0YWdlIChhbmQgc3ByaXRlQ29udGFpbmVyPykgYW5kIG5laXRoZXIgdGhlIG5vZGUtZWFzZWwgKGFuZCBub2RlIGRvZXNuJ3QgaGF2ZSB0aGUgZXh0ZW5kKSAqL1xuLypcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9leHRlbmQnO1xuaW1wb3J0IHByb21vdGUgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9jcmVhdGVqcy91dGlscy9wcm9tb3RlJztcbmltcG9ydCBTcHJpdGVDb250YWluZXIgZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xpYi9lYXNlbGpzL1Nwcml0ZUNvbnRhaW5lci9TcHJpdGVDb250YWluZXInO1xuXG5leHBvcnQgY2xhc3MgTWFwX3Nwcml0ZXNoZWV0TGF5ZXIgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGVDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBzdWJDb250YWluZXJzLCBzcHJpdGVzaGVldCkge1xuICB9XG59XG4qLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG5AcmVxdWlyZSB0aGUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiovXG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9zdGFnZSBleHRlbmRzIGNyZWF0ZWpzLlN0YWdlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7RE9NIENhbnZhcyBlbGVtZW50fSBjYW52YXMgUkVRVUlSRUQhIENhbnZhcyBlbGVtZW50IHVzZWQgYnkgdGhlIG1hcFxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBzdGFnZUJvdW5kcyBTZXQgc3RhZ2UgYm91bmRzIGJhc2VkIG9uIHRoZXNlIGNvb3JkaW5hdGVzXG4gICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhcywgc3RhZ2VCb3VuZHMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTWFwX3N0YWdlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpO1xuICAgIH1cblxuICAgIHN1cGVyKGNhbnZhcyk7XG5cbiAgICBpZihzdGFnZUJvdW5kcykge1xuICAgICAgdGhpcy5zZXRCb3VuZHMoMCwgMCwgc3RhZ2VCb3VuZHMueCwgc3RhZ2VCb3VuZHMueSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZyBBTkQgZ2V0dGluZyBjaGlsZHJlbiBieSBuYW1lLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudGlja09uVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgICAvL3RoaXMuZHJhd1JlY3QgPSBNQVlCRSBUSElTIHNob3VsZCBiZSB0aGUgYXJlYSBvZiB0aGUgY2FudmFzIHNpemU/IFNvIHRoZSB3aG9sZSBzdGFnZSBpc24ndCBkcmF3biBvbmx5IHZpc2libGUgcGFydD9cbiAgfVxuICAvKiogc2V0dGVyIGFuZCBnZXR0ZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBzdGF0dXMgSWYgcHJvdmlkZWQgc2V0cyB0aGUgY2FjaGluZyBzdGF0dXMgb3RoZXJ3aXNlIHJldHVybnMgdGhlIGN1cnJlbnQgc3RhdHVzICovXG4gIGNhY2hlRW5hYmxlZChzdGF0dXMpIHtcbiAgICBpZihzdGF0dXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XG4gIH1cbiAgQ2hpbGROYW1lZChuYW1lKSB7XG4gICAgZm9yIChsZXQgbGF5ZXIgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbGV0IGNoaWxkO1xuXG4gICAgICBpZiAobGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQgPSBsYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAdG9kbyBpbXBsZW1lbnQgc3ByaXRlU3RhZ2UhIEl0IHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCB3aGVuIHVzaW5nIHNwcml0ZXNoZWV0cy4gT25seSBpc3N1ZSB3YXMgdGhhdCBtaW5pZmllZFxuICogZWFzZWxqcyBkb2Vzbid0IGhhdmUgdGhlIHNwcml0ZVN0YWdlIGFuZCBuZWl0aGVyIHRoZSBub2RlLWVhc2VsIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgYWN0dWFsIG9iamVjdHMgdXNlZCBvbiB0aGUgbWFwIChzdWNocyBhcyB0ZXJyYWluIGFuZCB1bml0cyksIHVuZGVyIHN0YWdlcyBhbmQgY29udGFpbmVycy5cbkBwYXJhbSB7Y3JlYXRlanMuUG9pbnR9IGNvb3JkcyAtIHRoZSBjb29yZGluYXRlIHdoZXJlIHRoZSBvYmplY3QgaXMgbG9jYXRlZCBhdFxuQHBhcmFtIHt9IGRhdGEgLSBvYmplY3RzIGRhdGEsIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBnYW1lLiBJdCB3aWxsIG5vdCBhY3R1YWxseSBiZSBtYWlubHkgdXNlZCBpbiBncmFwaGljYWxcbmJ1dCByYXRoZXIgdGhpbmdzIGxpa2UgdW5pdC1kYXRhIGFuZCBjaXR5LWRhdGEgcHJlc2VudGF0aW9ucyBldGMuXG5AcGFyYW0ge2NyZWF0ZWpzLlNwcml0ZVNoZWV0fSBzcHJpdGVTaGVldFxuQHBhcmFtIHtJbnRdIGN1cnJGcmFtZU51bWJlciAtIHRoZSBjdXJyZW50IGZyYW1lcyBudW1iZXIuIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBpbml0aWFsIGltYWdlLCB3ZSBjYW4gY2hhbmdlIGl0IGxhdGVyXG5mb3IgYW5pbWF0aW9uIG9yIHN1Y2hcblxuQWxsIG9mIHRoZSBvYmplY3RzIG5lZWQgdG8gaGF2ZSBzYW1lIGFyZ3VtZW50QVBJIGZvciBjcmVhdGluZyBvYmplY3RzOiBjb29yZHMsIGRhdGEsIGltYWdlRGF0YSAqL1xuXG52YXIgZXh0ZW5zaW9ucyA9IFtdO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZSBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihzcHJpdGVzaGVldCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIk9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IGN1cnJlbnRGcmFtZU51bWJlcjtcbiAgICAvKiBFeGVjdXRlIGluaXRpYWwgZHJhdyBmdW5jdGlvbiAqL1xuICAgIHRoaXMuaW5uZXJEcmF3KGNvb3Jkcy54LCBjb29yZHMueSk7XG4gICAgLyogY3JlYXRlanMgLyBzdXBlciBwcm9wZXJ0aWVzLiBVc2VkIGFsc28gZm9yIGNvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnNoYWRvdyA9IHRydWU7XG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIERyYXdpbmcgdGhlIG9iamVjdCB3aXRoIGNyZWF0ZWpzLW1ldGhvZHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGUgeVxuICAgKiBAcmV0dXJuIHRoaXMgb2JqZWN0IGluc3RhbmNlICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCggdGhpcy5jdXJyRnJhbWVOdW1iZXIgKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogRHJhd3MgbmV3IGZyYW1lIHRvIGFuaW1hdGUgb3Igc3VjaFxuICAgKiBAcGFyYW0ge051bWJlcn0geCBjb29yZGluYXRlIHhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuZXdGcmFtZU51bWJlciBOZXcgZnJhbWUgbnVtYmVyIHRvIGFuaW1hdGUgdG9cbiAgICogQHJldHVybiB0aGlzIG9iamVjdCBpbnN0YW5jZSAqL1xuICBkcmF3TmV3RnJhbWUoeCwgeSwgbmV3RnJhbWVOdW1iZXIpIHtcbiAgICB0aGlzLmN1cnJGcmFtZU51bWJlciA9IG5ld0ZyYW1lTnVtYmVyO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJEcmF3KHgsIHkpO1xuICB9XG59IiwiLyoqIE1haW4gY2xhc3MgZm9yIHNob3dpbmcgVUkgb24gdGhlIG1hcC4gTGlrZSB1bml0IHNlbGVjdGlvbnMgYW5kIHN1Y2guIEhhcyBub3RoaW5nIHRvIGRvIHdpdGggc2hvd2luZyBvZmYtbWFwIGRhdGEuXG4gKiBHb29kIGV4YW1wbGVzIGZvciB3aGF0IHRoaXMgc2hvd3MgYXJlOiBzZWxlY3RlZCB1bml0cy1saXN0LCBzZWxlY3Rpb24gaGlnaGxpZ2h0IChsaWtlIGEgY2lyY2xlIG9uIHRoZSBzZWxlY3RlZCB1bml0KSBhbmRcbiAqIGJyaW5naW5nIHRoZSB1bml0IG9uIHRvcCBpbiB0aGUgbWFwLlxuICpcbiAqIEBwYXJhbSB7TW9kdWxlfSBnaXZlblVJVGhlbWUgdGhlIG1vZHVsZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGhlIFVJIHRoZW1lXG4gKiBAcGFyYW0ge01hcH0gZ2l2ZW5NYXAgTWFwIGluc3RhbmNlIHRoYXQgaXMgdXNlZFxuICogQHJldHVybiBVSSBtb2R1bGVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqIFRoZSBhYnN0cmFjdCBVSSBtb2R1bGUgZm9yIHRoZSBjb3JlIG1hcCBmdW5jdGlvbmFsaXR5LiBUaGlzIGlzIHVzZWQgYnkgZGVmaW5pbmcgVUkgVGhlbWVzIHRoYXQgaW1wbGVtZW50IHRoaXNcbiAqIGNvcmUgVUkgbW9kdWxlLlxuICogRGVmYXVsdCBtZXRob2RzIHRvIHVzZSBpbiBVSSBhcmU6XG4gKiBzaG93U2VsZWN0aW9ucyBhbmQgaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QuIE1vcmUgbWV0aG9kcyBjYW4gYmUgZXh0ZW5kZWQgdG8gVUkgd2l0aCBwbHVnaW5zXG4gKlxuICogQHRvZG8gTm90IGltcGxlbWVudGVkIGZ1bGx5IHlldCBhbmQgcHJvYmFibHkgbmVlZCByZWZhY3RvcmluZyAqL1xudmFyIHNjb3BlO1xuXG5leHBvcnQgZnVuY3Rpb24gVUkgKGdpdmVuVUlUaGVtZSwgZ2l2ZW5NYXApIHtcbiAgLyogU0lOR0xFVE9OIE1PRFVMRSAqL1xuICBpZiAoc2NvcGUpIHtcbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICBpZiAoIWdpdmVuVUlUaGVtZSB8fCAhZ2l2ZW5NYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSS1tb2R1bGUgcmVxdWlyZXMgVUlUaGVtZSBhbmQgbWFwIG9iamVjdFwiKTtcbiAgfVxuXG4gIHZhciBtYXAgPSBnaXZlbk1hcDtcbiAgdmFyIFVJVGhlbWUgPSBnaXZlblVJVGhlbWU7XG4gIHNjb3BlID0ge307XG5cbiAgLyoqIFJlc3BvbnNpYmxlIGZvciBzaG93aW5nIHNlbGVjdGlvbmcgZWxlbWVudCwgd2hlcmUgdGhlIHBsYXllciBzZWxlY3QgdGhlIHdhbnRlZCBvYmplY3Qgb3V0IG9mIGFycmF5IG9mIG9iamVjdHMuXG4gICAqIEZvciBleGFtcGxlIGlmIHRoZXJlIGFyZSBzZXZlcmFsIG9iamVjdHMgaW4gb25lIHRpbGUgb24gdGhlIG1hcCBhbmQgdGhlIHBsYXllciBuZWVkcyB0byBiZSBhYmxlIHRvIHNlbGVjdCBvbmVcbiAgICogc3BlY2lmaWMgdW5pdCBvbiB0aGUgc3RhY2sgKi9cbiAgc2NvcGUuc2hvd1NlbGVjdGlvbnMgPSBmdW5jdGlvbiBzaG93U2VsZWN0aW9ucyhvYmplY3RzKSB7XG4gICAgcmV0dXJuIFVJVGhlbWUuc2hvd1NlbGVjdGlvbnMobWFwLCBvYmplY3RzKTtcbiAgfTtcbiAgLyoqIFJlc29uc2libGUgZm9yIGhpZ25saWdodGluZyB0aGUgc2VsZWN0ZWQgb2JqZWN0LiBGb3IgZXhhbXBsZSB0aGUgdW5pdCB0aGF0IGlzIGJlaW5nIGNvbW1hbmRlZC4gVGhlIGhpZ2h0bGlnaHRcbiAgICogY2FuIG1lYW4gZS5nLiBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3Agb24gdGhlIG1hcCBhbmQgc2hvd2luZyBzZWxlY3Rpb24gY2lyY2xlIGFyb3VuZCBpdC4gKi9cbiAgc2NvcGUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QgPSBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gVUlUaGVtZS5oaWdobGlnaHRTZWxlY3RlZE9iamVjdChtYXAsIG9iamVjdCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIEhhbW1lciwgY3JlYXRlanMgKi9cblxuLyoqXG4gKiBIb3VzZXMgdGhlIGRlZmF1bHQgZXZlbnRsaXN0ZW5lcnMgdXNlZCBpbiB0aGUgbWFwLiBXaGVuIHBsdWdpbnMgYXJlIGFkZGVkIHRvIHRoZSBtYXAgdGhpcyBjbGFzcyBjYW4gYmUgdXNlZCBmb3JcbiAqIHRoZSBldmVudGxpc3RlbmVyIG1hbmFnZW1lbnQuIFRoaXMgd2F5IGFsbCB0aGUgZXZlbnRsaXN0ZW5lcnMgYXJlIGluIHRoZSBzYW1lIG9iamVjdCwgY29udmVuaWVudGx5LlxuICpcbiAqIEByZXF1aXJlIEJyb3dzZXIgdGhhdCBzdXBwb3J0IHBvaW50ZXIgZXZlbnRzIG9yIFBvaW50ZXIgZXZlbnRzIHBvbHlmaWxsLCBzdWNoIGFzOiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L1BFUFxuICogQHJlcXVpcmUgSGFtbWVyLmpzIGZvciB0b3VjaCBldmVudHMqL1xuXG52YXIgc2luZ2xldG9uU2NvcGU7XG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuLyoqXG4gKiBldmVudExpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiB0aGF0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIHdpdGggYW4gb2JqZWN0LCB0aGF0IGhvbGRzIGFsbCB0aGUgY2FsbGJhY2tzIHVzZWQgaW4gdGhpc1xuICogY2xhc3MuIEkuZS5cbiB7XG4gICBzZWxlY3Q6IGZ1bmN0aW9uKCkge30sXG4gICB6b29tOiBmdW5jdGlvbigpIHt9XG4gfSovXG5leHBvcnQgbGV0IGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gZXZlbnRMaXN0ZW5lck1vZHVsZShtYXAsIGNhbnZhc0VsZW1lbnQpIHtcbiAgaWYoc2luZ2xldG9uU2NvcGUpIHtcbiAgICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XG4gIH1cbiAgaWYoIW1hcCB8fCAhY2FudmFzRWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImV2ZW50bGlzdGVuZXJzIHJlcXVpcmUgbWFwIGNhbGxiYWNrcyBhbmQgY2FudmFzIGVsZW1lbnQgYXMgYXJndW1lbnRzXCIpO1xuICB9XG5cbiAgdmFyIG1hcENCcyA9IG1hcC5ldmVudENCcztcblxuICBzaW5nbGV0b25TY29wZSA9IHtcbiAgICBzdGF0ZXM6IHt9XG4gIH07XG5cbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRnVsbFNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxTaXplO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNjcmVlbiA9IG1hcENCcy5mdWxsc2NyZWVuKCk7XG5cbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxzY3JlZW47XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVpvb21MaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVpvb21MaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSAhPT0gdHJ1ZSkge1xuICAgICAgaWYoaXNNb2JpbGUoKSkge1xuICAgICAgICB2YXIgaGFtbWVyICAgID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhc0VsZW1lbnQpO1xuICAgICAgICB2YXIgcGluY2ggICAgID0gbmV3IEhhbW1lci5QaW5jaCgpO1xuICAgICAgICBoYW1tZXIuYWRkKHBpbmNoKTtcbiAgICAgICAgaGFtbWVyLm9uKFwicGluY2hcIiwgbWFwQ0JzLnpvb20pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICB9XG5cbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaXNNb2JpbGUoKSkge1xuICAgICAgICBoYW1tZXIub24oXCJwaW5jaFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW52YXNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG1hcENCcy56b29tKTtcbiAgICAgIH1cblxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnpvb20gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLnpvb207XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZURyYWdMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZURyYWdMaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyAhPT0gdHJ1ZSkge1xuICAgICAgaWYoaXNNb2JpbGUoKSkge1xuICAgICAgICB2YXIgaGFtbWVyID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhc0VsZW1lbnQpO1xuICAgICAgICB2YXIgcGFuID0gbmV3IEhhbW1lci5QYW4oe1xuICAgICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICAgIHRocmVzaG9sZDogNSxcbiAgICAgICAgICBkaXJlY3Rpb246XHRIYW1tZXIuRElSRUNUSU9OX0FMTCB9KTtcbiAgICAgICAgaGFtbWVyLmFkZChwYW4pO1xuICAgICAgICBoYW1tZXIub24oXCJwYW5cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIH1cblxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihpc01vYmlsZSgpKSB7XG4gICAgICAgIGhhbW1lci5vZmYoXCJwYW5cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIH1cblxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmRyYWc7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVNlbGVjdExpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0TGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCAhPT0gdHJ1ZSkge1xuICAgICAgaWYoaXNNb2JpbGUoKSkge1xuICAgICAgICB2YXIgaGFtbWVyICAgID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhc0VsZW1lbnQpO1xuICAgICAgICB2YXIgdGFwICAgICA9IG5ldyBIYW1tZXIuVGFwKCk7XG4gICAgICAgIGhhbW1lci5hZGQodGFwKTtcbiAgICAgICAgaGFtbWVyLm9uKFwidGFwXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgfVxuXG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaXNNb2JpbGUoKSkge1xuICAgICAgICBoYW1tZXIub2ZmKFwidGFwXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgfVxuXG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5zZWxlY3Q7XG4gIH07XG5cbiAgcmV0dXJuIHNpbmdsZXRvblNjb3BlO1xufTtcblxuZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gIHJldHVybiB0eXBlb2YgSGFtbWVyICE9ICd1bmRlZmluZWQnO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoZSBjb3JlIHBsdWdpbiBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuIEhhbmRsZXMgbW92aW5nIHRoZSBtYXAgYnkgZHJhZ2dpbmcgdGhlIG1hcC5cbiAqIENvcmUgcGx1Z2lucyBjYW4gYWx3YXlzIGJlIG92ZXJ3cm90ZSBpZiBuZWVkZWRcbiAqXG4gKiBAcmVxdWlyZSBCcm93c2VyIHRoYXQgc3VwcG9ydCBwb2ludGVyIGV2ZW50cyBvciBQb2ludGVyIGV2ZW50cyBwb2x5ZmlsbCwgc3VjaCBhczogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9QRVBcbiAqIEB0b2RvIFNlZSBpZiB0aGlzIHBsdWdpbiBuZWVkIHJlZmFjdG9yaW5nIGFuZCBtb3JlIGRvY3VtZW50YXRpb24gKi9cblxuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuLi9ldmVudGxpc3RlbmVycyc7XG5cbmV4cG9ydCBsZXQgbWFwX2RyYWcgPSAoZnVuY3Rpb24gbWFwX2RyYWcoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICAvKiBGdW5jdGlvbiBmb3Igc2V0dGluZyBhbmQgZ2V0dGluZyB0aGUgbW91c2Ugb2Zmc2V0LiBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCBib3R0b20gKi9cbiAgdmFyIG9mZnNldENvb3JkcyA9IF9vZmZzZXRDb29yZHMoKTtcbiAgdmFyIGV2ZW50bGlzdGVuZXJzO1xuXG4gIC8qID09PT09IEZvciB0ZXN0aW5nID09PT09ICovXG4gIHNjb3BlLl9zdGFydERyYWdMaXN0ZW5lciA9IF9zdGFydERyYWdMaXN0ZW5lcjtcblxuICBzY29wZS5wbHVnaW5OYW1lID0gXCJtYXBfZHJhZ1wiO1xuXG4gIC8qKiBSZXF1aXJlZCBpbml0IGZ1bmN0aW9ucyBmb3IgdGhlIHBsdWdpblxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3QgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiRFJBRyBJTklUXCIpXG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXApO1xuICAgIGlmKG1hcC5tYXBFbnZpcm9ubWVudCgpID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICBtYXAuZXZlbnRDQnMuZHJhZyA9IF9zdGFydERyYWdMaXN0ZW5lcl9tb2JpbGUobWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLmV2ZW50Q0JzLmRyYWcgPSBfc3RhcnREcmFnTGlzdGVuZXIobWFwKTtcbiAgICB9XG5cbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVEcmFnTGlzdGVuZXIoKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyoqIFN0YXJ0cyB0aGUgd2hvbGUgZnVuY3Rpb25hbGl0eSBvZiB0aGlzIGNsYXNzXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9zdGFydERyYWdMaXN0ZW5lciggbWFwICkge1xuICAgIGNvbnNvbGUubG9nKFwiU1RBUlRFRCBEUkFHXCIpO1xuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xuICAgICAgY29uc29sZS5sb2coXCJDT05USU5VRVwiKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgIHg6IGUueCxcbiAgICAgICAgICB5OiBlLnlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogV2UgdGFrZSBhbGwgdGhlIGV2ZW50bGlzdGVuZXJzIHVuYmluZGluZ3MgdG8gdGhpcyBhcnJheSwgc28gd2UgY2FuIHVuYmluZCB0aGVtIHdoZW4gdGhlIG1vdXNlIGlzIHVwICovXG4gICAgICAgIHZhciBtb3ZlQ2FsbGJhY2sxID0gX2RyYWdMaXN0ZW5lcihtYXApO1xuICAgICAgICB2YXIgbW91c2V1cENhbGxiYWNrID0gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCk7XG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZXVwQ2FsbGJhY2spO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3NldHVwTW91c2V1cExpc3RlbmVyKG1hcCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvKiBFdmVudCBsaXN0ZW5lcnMgYXJlIGluIHRoZWlyIHNlcGFyYXRlIGZpbGU7IGV2ZW50TGlzdGVuZXJzLmpzICovXG4gICAgICBmdW5jdGlvbiBfZHJhZ0xpc3RlbmVyKG1hcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkcmFnZ2VyKGUpIHtcbiAgICAgICAgICAgIHZhciBldmVudENvb3JkcyA9IHtcbiAgICAgICAgICAgICAgeDogZS5wYWdlWCxcbiAgICAgICAgICAgICAgeTogZS5wYWdlWVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmKGUuYnV0dG9ucyA9PT0gMCkge1xuICAgICAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgICAgICAgICAgLyogU28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgc3RvcCB3aGVuIG1vdXNlIGlzIHVwLCBldmVuIHRob3VnaCBtb3VzZXVwIGV2ZW50IHdvdWxkbid0IGZpcmUgKi9cbiAgICAgICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgbW92ZWQgPSB7XG4gICAgICAgICAgICAgIHg6IGV2ZW50Q29vcmRzLnggLSBvZmZzZXQueCxcbiAgICAgICAgICAgICAgeTogZXZlbnRDb29yZHMueSAtIG9mZnNldC55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihtb3ZlZC54ID4gMCB8fCBtb3ZlZC55ID4gMCB8fCBtb3ZlZC54IDwgMCB8fCBtb3ZlZC55IDwgMCkge1xuICAgICAgICAgICAgICBtYXAubW92ZU1hcChtb3ZlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICAgICAgeDogZXZlbnRDb29yZHMueCxcbiAgICAgICAgICAgICAgeTogZXZlbnRDb29yZHMueVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIFRoZSBtb3VzZSBoYXMgYmVlbiBtb3ZlZCBhZnRlciBwcmVzc2luZy4gVGhpcyBwcmV2ZW50IHRoZSBjbGlja1xuICAgICAgICAgICAgICBldmVudCB0byBmaXJlIGF0IHRoZSBzYW1lIHRpbWUgd2l0aCB0aGUgbW91c2VEb3duIC8gZHJhZ2dpbmcgZXZlbnRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAvL21hcC5tb3VzZU1vdmVkKCB0cnVlICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdGFydERyYWdMaXN0ZW5lcl9tb2JpbGUoIG1hcCApIHtcbiAgICB2YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xuICAgICAgdmFyIGNvb3JkcyA9IGUuY2VudGVyO1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKCFpbml0aWFsaXplZCkge1xuICAgICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgICAgeDogY29vcmRzLngsXG4gICAgICAgICAgICB5OiBjb29yZHMueVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoZS5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFwLm1hcE1vdmVkKHRydWUpO1xuXG4gICAgICAgIGxldCBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgIGxldCBtb3ZlZCA9IHtcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54IC0gb2Zmc2V0LngsXG4gICAgICAgICAgICB5OiBjb29yZHMueSAtIG9mZnNldC55XG4gICAgICAgICAgfTtcblxuICAgICAgICBpZihtb3ZlZC54ICE9PSAwIHx8IG1vdmVkLnkgIT09IDApIHtcbiAgICAgICAgICBtYXAubW92ZU1hcChtb3ZlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICB4OiBjb29yZHMueCxcbiAgICAgICAgICB5OiBjb29yZHMueVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cbiAgLyoqIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuICovXG4gIGZ1bmN0aW9uIF9vZmZzZXRDb29yZHMoKSB7XG4gICAgdmFyIHNjb3BlID0ge307XG4gICAgdmFyIG9mZnNldENvb3JkcztcblxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHMgPSBjb29yZHM7XG4gICAgfTtcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH07XG59KSgpO1xuXG4vKiBXaXRob3V0IHRoaXMsIHRoZSBvdGhlciBldmVudExpc3RlbmVycyBtaWdodCBmaXJlIGluYXBwcm9wcmlhdGUgZXZlbnRzLiAqL1xuZnVuY3Rpb24gX21hcE1vdmVkKG1hcCkge1xuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICB9LCAxKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUZXJyYWluIHRpbGUgbGlrZSBkZXNlcnQgb3IgbW91bnRhaW4sIG5vbi1tb3ZhYmxlIGFuZCBjYWNoZWFibGUuIE5vcm1hbGx5LCBidXQgbm90IG5lY2Vzc2FyaWx5LCB0aGVzZSBhcmVcbiAqIGluaGVyaXRlZCwgZGVwZW5kaW5nIG9uIHRoZSBtYXAgdHlwZS4gRm9yIGV4YW1wbGUgeW91IG1pZ2h0IHdhbnQgdG8gYWRkIHNvbWUgY2xpY2sgYXJlYSBmb3IgdGhlc2UgKi9cblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uL09iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCBzcHJpdGVTaGVldCwgY3VyckZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RcIjtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIE1hcCB1bml0IGxpa2UgaW5mYW50cnkgb3Igd29ya2VyLCB1c3VhbGx5IHNvbWV0aGluZyB3aXRoIGFjdGlvbnMgb3IgbW92YWJsZS4gTm9ybWFsbHksIGJ1dCBub3QgbmVjZXNzYXJpbHksIHRoZXNlIGFyZVxuICogaW5oZXJpdGVkLCBkZXBlbmRpbmcgb24gdGhlIG1hcCB0eXBlLiBGb3IgZXhhbXBsZSB5b3UgbWlnaHQgd2FudCB0byBhZGQgc29tZSBjbGljayBhcmVhIGZvciB0aGVzZSAqL1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vT2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNcIjtcbiAgICB0aGlzLmFjdGlvbnMgPSB7XG4gICAgICBtb3ZlOiBbXSxcbiAgICAgIGF0dGFjazogW11cbiAgICB9O1xuICB9XG4gIGRvQWN0aW9uKHR5cGUpIHtcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0uZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfSk7XG4gIH1cbiAgYWRkQWN0aW9uVHlwZSh0eXBlKSB7XG4gICAgdGhpcy5hY3Rpb25zW3R5cGVdID0gdGhpcy5hY3Rpb25zW3R5cGVdIHx8IFtdO1xuICB9XG4gIGFkZENhbGxiYWNrVG9BY3Rpb24odHlwZSwgY2IpIHtcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0ucHVzaChjYik7XG4gIH1cbn0iLCIvKiogV2Ugd2FudCB0byBwdXQgc3ByaXRlc2hlZXRzIHRvIHRoZWlyIG93biBtb2R1bGUsIHNvIHRoZXkgYXJlIHNlcGFyYXRlZCBhbmQgZS5nLiB3ZSBjYW4gcmVtb3ZlIGNyZWF0ZWpzIGZyb20gdGhlXG4gKiBzcHJpdGVzaGVldCBpZiBuZWVkZWQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG52YXIgYWxsU3ByaXRlc2hlZXRzID0ge307XG5cbi8qIFNpbmdsZXRvbiBzbyB3ZSBkb24ndCB1c2UgY2xhc3MgZGVmaW5pdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZXNoZWV0TGlzdCAoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBDcmVhdGUgbmV3IHNwcml0ZXNoZWV0IChuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoKSkgYW5kIGtlZXBzIGl0IGluIG9iamVjdCBjb2xsZWN0aW9uLiBTbyB3ZSBkb24ndCBjcmVhdGUgYWNjaWRlbi1cbiAgICogdGFsbHkgYW5vdGhlciBvbmUgYW5kIHdlIGNhbiBzYWZlbHkgcmVtb3ZlIGl0IGxhdGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ByaXRlc2hlZXREYXRhIE9iamVjdCB0aGF0IGNvbnRhaW5zIGNyZWF0ZWpzLWNvbXBhdGlibGUgc3ByaXRlc2hlZXREYXRhXG4gICAqIEByZXR1cm4gbmV3IHNwcml0ZXNoZWV0IGluc3RhbmNlIHRvIHVzZS4gKi9cbiAgc2NvcGUuY3JlYXRlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiBjcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpIHtcbiAgICB2YXIgc3ByaXRlU2hlZXQ7XG4gICAgdmFyIElEID0gc2NvcGUuZ2V0U3ByaXRlc2hlZXRJRChzcHJpdGVzaGVldERhdGEuaW1hZ2VzKTtcblxuICAgIGlmICggYWxsU3ByaXRlc2hlZXRzW0lEXSApIHtcbiAgICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHNbSURdO1xuICAgIH1cblxuICAgIHNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG4gICAgYWxsU3ByaXRlc2hlZXRzW0lEXSA9IHNwcml0ZVNoZWV0O1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICAvKiogR2VuZXJhdGVzIGlkZW50aWZpZXIgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygc3ByaXRlc2hlZXRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzcHJpdGVzaGVldERhdGEgc3ByaXRlc2hlZXREYXRhIHRoYXQgaXMgdXNlZFxuICAgKiBAcmV0dXJuIGdlbmVyYXRlZCBoYXNoIGlkZW50aWZpZXIgZm9yIHNwcml0ZXNoZWV0ICovXG4gIHNjb3BlLmdldFNwcml0ZXNoZWV0SUQgPSBmdW5jdGlvbiBnZXRTcHJpdGVzaGVldElEKHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHJldHVybiBoYXNoLm1kNShzcHJpdGVzaGVldERhdGEpO1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIHJlbW92ZVNwcml0ZXNoZWV0KHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHZhciBJRCA9IHNjb3BlLmdldFNwcml0ZXNoZWV0SUQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICBkZWxldGUgYWxsU3ByaXRlc2hlZXRzW0lEXTtcbiAgfTtcbiAgc2NvcGUuZ2V0QWxsU3ByaXRlc2hlZXRzID0gZnVuY3Rpb24gZ2V0QWxsU3ByaXRlc2hlZXRzICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgY29yZSB1dGlscyBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuICovXG5cbmV4cG9ydCB2YXIgbW91c2VVdGlscyA9ICggZnVuY3Rpb24gbW91c2VVdGlscygpIHtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgLyoqIFRoaXMgZnVuY3Rpb24gaXMgZnJvbTogaHR0cDovL3d3dy5hZG9tYXMub3JnL2phdmFzY3JpcHQtbW91c2Utd2hlZWwvXG4gICAgSXQgZGV0ZWN0cyB3aGljaCB3YXkgdGhlIG1vdXNld2hlZWwgaGFzIGJlZW4gbW92ZWQuXG4gICAgemVybyBkZWx0YSA9IG1vdXNlIHdoZWVsIG5vdCBtb3ZlZFxuICAgIHBvc2l0aXZlIGRlbHRhID0gc2Nyb2xsZWQgdXBcbiAgICBuZWdhdGl2ZSBkZWx0YSA9IHNjcm9sbGVkIGRvd25cblxuICAgIEBwYXJhbSB7RXZlbnR9IGV2ZW50IHBhc3MgdGhlIGV2ZW50IHRvIGRlbHRhRnJvbVdoZWVsXG4gICAgQHJldHVybiBkZWx0YS4gUG9zaXRpdmUgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIHVwLCBhbmQgbmVnYXRpdmUsIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCBkb3duLiAqL1xuICBzY29wZS5kZWx0YUZyb21XaGVlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIGRlbHRhID0gMDtcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cblxuICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgKSB7IC8qIElFL09wZXJhLiAqL1xuICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCApIHsgLyoqIE1vemlsbGEgY2FzZS4gKi9cbiAgICAgICAgLyogSW4gTW96aWxsYSwgc2lnbiBvZiBkZWx0YSBpcyBkaWZmZXJlbnQgdGhhbiBpbiBJRS5cbiAgICAgICAgICogQWxzbywgZGVsdGEgaXMgbXVsdGlwbGUgb2YgMy4gKi9cbiAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMztcbiAgICAgfVxuICAgICAvKiBQcmV2ZW50IGRlZmF1bHQgYWN0aW9ucyBjYXVzZWQgYnkgbW91c2Ugd2hlZWwuIEl0IG1pZ2h0IGJlIHVnbHkgKi9cbiAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxuICAgICB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uICovXG4gICAgIGlmICggZGVsdGEgKSByZXR1cm4gZGVsdGE7XG4gIH07XG4gIC8qKiBIYXMgdGhlIG1vdXNlIGNsaWNrIGJlZW4gcmlnaHQgbW91c2UgYnV0dG9uXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB3aGVyZSB0aGUgY2xpY2sgb2NjdXJlZCAqL1xuICBzY29wZS5pc1JpZ2h0Q2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgIHZhciByaWdodGNsaWNrO1xuXG4gICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuICAgICBpZiAoIGV2ZW50LmJ1dHRvbnMgKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b25zID09IDIgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LndoaWNoICkgcmlnaHRjbGljayA9ICggZXZlbnQud2hpY2ggPT0gMyApO1xuICAgICBlbHNlIGlmICggZXZlbnQuYnV0dG9uICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9uID09IDIgKTtcblxuICAgICBpZiAoIHJpZ2h0Y2xpY2sgKSByZXR1cm4gdHJ1ZTtcblxuICAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIHJldHVybiBzY29wZTtcbn0gKSgpO1xuZXhwb3J0IHZhciByZXNpemVVdGlscyA9IHtcbiAgdG9nZ2xlRnVsbFNjcmVlbjogZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmJvZHk7IC8vIE1ha2UgdGhlIGJvZHkgZ28gZnVsbCBzY3JlZW4uXG4gICAgdmFyIGlzSW5GdWxsU2NyZWVuID0gKCBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAmJiBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAhPT0gbnVsbCApIHx8XG4gICAgICAgKFxuICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuICk7XG5cbiAgICBpc0luRnVsbFNjcmVlbiA/IGNhbmNlbEZ1bGxTY3JlZW4oIGRvY3VtZW50ICkgOiByZXF1ZXN0RnVsbFNjcmVlbiggZWxlbSApO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU3ViIGZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGNhbmNlbEZ1bGxTY3JlZW4oIGVsICkge1xuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwuY2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tb3pDYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwuZXhpdEZ1bGxzY3JlZW47XG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBjYW5jZWwgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0RnVsbFNjcmVlbiggZWwgKSB7XG4gICAgICAgLy8gU3VwcG9ydHMgbW9zdCBicm93c2VycyBhbmQgdGhlaXIgdmVyc2lvbnMuXG4gICAgICAgdmFyIHJlcXVlc3RNZXRob2QgPSBlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tc1JlcXVlc3RGdWxsU2NyZWVuO1xuXG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBOYXRpdmUgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvKiogU2V0cyBjYW52YXMgc2l6ZSB0byBtYXhpbXVtIHdpZHRoIGFuZCBoZWlnaHQgb24gdGhlIGJyb3dzZXIsIG5vdCB1c2luZyBmdWxsc2NyZWVuXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudCBDYW52YXMgY29udGV4dH0gY29udGV4dCAqL1xuICBzZXRUb0Z1bGxTaXplOiBmdW5jdGlvbiBzZXRUb0Z1bGxTaXplKGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZnVsbFNpemUoKSB7XG4gICAgICB2YXIgc2l6ZSA9IF9nZXRXaW5kb3dTaXplKCk7XG5cbiAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gc2l6ZS54O1xuICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gc2l6ZS55O1xuICAgIH07XG4gIH0sXG4gIGdldFdpbmRvd1NpemU6IF9nZXRXaW5kb3dTaXplXG59O1xuXG4vKiogVXRpbHMgZm9yIGFkZGluZyBldmVudCBoYW5kbGVycyBvbiB0aGUgbWFwIGFuZCBrZWVwaW5nIHRyYWNrIG9mIHRoZW0uXG4gKiBAdG9kbyBHbyBvdmVyIHRoZSBtb2R1bGUgYW5kIHNlZSBpZiBpdCBpcyByZWFsbHkgbmVlZGVkIG9yIHNob3VsZCBiZSBjaGFuZ2VkLiBNaWdodCBiZSBsZWdhY3kgYW5kIG5vdCBuZWVkZWQgbm93ICovXG5leHBvcnQgdmFyIGxpc3RlbmVycyA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgTElTVEVORVJfVFlQRVMgPSB7XG4gICAgXCJtb3VzZW1vdmVcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcInBvaW50ZXJtb3ZlXCJcbiAgICB9LFxuICAgIFwibW91c2V1cFwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwicG9pbnRlcnVwXCJcbiAgICB9LFxuICAgIFwibW91c2Vkb3duXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJwb2ludGVyZG93blwiXG4gICAgfSxcbiAgICBcIm1vdXNld2hlZWxcIjoge1xuICAgICAgZWxlbWVudDogXCJjYW52YXNcIixcbiAgICAgIGV2ZW50OiBcIndoZWVsXCJcbiAgICB9LFxuICAgIFwibW91c2VjbGlja1wiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwiY2xpY2tcIlxuICAgIH0sXG4gIH07XG4gIHZhciBfZXZlbnRMaXN0ZW5lcnMgPSBfZ2V0RW1wdHlFdmVudExpc3RlbmVyQXJyYXkoKTtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgc2NvcGUuc2V0T25lID0gZnVuY3Rpb24gc2V0T25lKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvKiBUaGVyZSBoYXMgYmVlbiBzZXZlcmFsIGRpZmZlcmVudCBtb3VzZXdoZWVsIGV2ZW50cyBiZWZvcmUsIGJ1dCBub3cgYWxsIGV4Y2VwdCBvcGVyYSBzaG91bGQgc3VwcG9ydCBcIndoZWVsXCIgKi9cbiAgICBfZXZlbnRMaXN0ZW5lcnNbYWN0aW9uXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW2FjdGlvbl0uZWxlbWVudF0uYWRkRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1thY3Rpb25dLmV2ZW50LCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgc2NvcGUucmVtb3ZlT25lID0gZnVuY3Rpb24gcmVtb3ZlT25lKHR5cGUsIG9yaWdDYWxsYmFjaykge1xuXG4gICAgaWYodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICBpZihvcmlnQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpc1tMSVNURU5FUl9UWVBFU1t0eXBlXS5lbGVtZW50XS5yZW1vdmVFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW3R5cGVdLmV2ZW50LCBvcmlnQ2FsbGJhY2spO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGNhbGxiYWNrIHNwZWNpZmllZCEgLSAxXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgdHlwZS5mb3JFYWNoKHRoaXNUeXBlID0+IHtcbiAgICAgICAgaWYob3JpZ0NhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpc1tMSVNURU5FUl9UWVBFU1t0aGlzVHlwZV0uZWxlbWVudF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihMSVNURU5FUl9UWVBFU1t0aGlzVHlwZV0uZXZlbnQsIG9yaWdDYWxsYmFjayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2FsbGJhY2sgc3BlY2lmaWVkISAtIDJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyogUFJJVkFURSBmdW5jdGlvbnMgKi9cbiAgZnVuY3Rpb24gX2dldEVtcHR5RXZlbnRMaXN0ZW5lckFycmF5KCkge1xuICAgIHZhciBvYmplY3RzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhMSVNURU5FUl9UWVBFUykuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgICBvYmplY3RzW3R5cGVdID0gW107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxufSkoKTtcbmV4cG9ydCB2YXIgZW52aXJvbm1lbnREZXRlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICBzY29wZS5pc01vYmlsZSA9ZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcmVlblNpemUgPSAoc2NyZWVuLndpZHRoIDw9IDY0MCkgfHwgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCdvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpJykubWF0Y2hlcyApO1xuICAgIHZhciBmZWF0dXJlcyA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKTtcblxuICAgIHJldHVybiBmZWF0dXJlcyAmJiBzY3JlZW5TaXplO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0pKCk7XG5cbi8qKiBQUklWQVRFICovXG5mdW5jdGlvbiBfZ2V0V2luZG93U2l6ZSgpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICB5OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcbn0iLCIndXNlciBzdHJpY3QnO1xuXG4vKiogVGhlIGNvcmUgcGx1Z2luIGZvciB0aGUgMkQgbWFwIGVuZ2luZS4gSGFuZGxlcyB6b29taW5nIGZvciB0aGUgbWFwLiBDb3JlIHBsdWdpbnMgY2FuIGFsd2F5cyBiZSBvdmVyd3JvdGUgaWYgbmVlZGVkICovXG5cbi8qKiBAdG9kbyBDaGFuZ2UgdGhlIG1hcCBtb3ZlIGFmdGVyIHpvb21pbmcgdG8gYmUgbW91c2UgYmFzZWQgb3Igc3VjaC4gTm93IGl0IGlzIGJhc2VkIG9uIHRoZSBtYXAgY29ybmVycyBjb29yZGluYXRlcyAqL1xuXG4vKiogPT09PT0gT1dOIGltcG9ydHMgPT09PT0gKi9cbmltcG9ydCB7IG1vdXNlVXRpbHMsIHJlc2l6ZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuZXhwb3J0IGxldCBtYXBfem9vbSA9IChmdW5jdGlvbiBtYXBfem9vbSgpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIC8qIE1heGltdW0gYW5kIG1pbmltdW0gdGhlIHBsYXllciBjYW4gem9vbXQgaGUgbWFwICovXG4gIHZhciB6b29tTGltaXQgPSB7XG4gICAgZmFydGhlcjogMC40LFxuICAgIGNsb3NlciA6IDIuNVxuICB9O1xuICAvKiBIb3cgbXVjaCBvbmUgc3RlcCBvZiB6b29taW5nIGFmZmVjdHM6ICovXG4gIHZhciB6b29tTW9kaWZpZXIgPSAwLjE7XG4gIHZhciBldmVudGxpc3RlbmVycztcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwibWFwX2RyYWdcIjtcblxuICAvKiogUmVxdWlyZWQgaW5pdCBmdW5jdGlvbnMgZm9yIHRoZSBwbHVnaW5cbiAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0ICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcbiAgICBjb25zb2xlLmxvZyhcIlpPT09PT00gSU5JVFwiKTtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwiem9vbUluXCIsIHpvb21Jbik7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21PdXRcIiwgem9vbU91dCk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21MaW1pdHNcIiwgc2V0Wm9vbUxpbWl0cyk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21Nb2RpZmllclwiLCBzZXRab29tTW9kaWZpZXIpO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJnZXRab29tYWJsZUxheWVyc1wiLCBnZXRab29tYWJsZUxheWVycyk7XG5cbiAgICBpZihtYXAubWFwRW52aXJvbm1lbnQoKSA9PT0gXCJtb2JpbGVcIikge1xuICAgICAgbWFwLmV2ZW50Q0JzLnpvb20gPSBfc2V0dXBab29tRXZlbnRfbW9iaWxlKG1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcC5ldmVudENCcy56b29tID0gX3NldHVwWm9vbUV2ZW50KG1hcCk7XG4gICAgfVxuXG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyhtYXAuZXZlbnRDQnMpO1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZVpvb21MaXN0ZW5lcigpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiA9PT09IFBST1RPVFlQRSBleHRlbnNpb25zIGZvciBtYXAgKi9cbiAgLyoqIEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMuIE5lZWRzIHRvIGJlIGluIGJldHdlZW4gMCAtIDAuNSAqL1xuICBmdW5jdGlvbiBzZXRab29tTW9kaWZpZXIgKGFtb3VudCkge1xuICAgIGlmKCEgKGFtb3VudCA+IDAgfHwgYW1vdW50IDw9IDAuNSkgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyB6b29tIG1vZGlmaWVyISAobmVlZHMgdG8gYmUgPjAgYW5kIDw9MC41LCBnaXZlbjpcIiArIGFtb3VudCk7XG4gICAgfVxuICAgIHpvb21Nb2RpZmllciA9IGFtb3VudDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBIb3cgbXVjaCBjYW4gYmUgem9vbWVkIGluIG1heGltdW0gYW5kIG1pbmltdW1cbiAgICogQHBhcmFtIHtOdW1iZXIgMSt9IGZhcnRoZXIgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMgb3V0XG4gICAqIEBwYXJhbSB7TnVtYmVyIDAgLSAxfSBjbG9zZXIgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMgaW4gKi9cbiAgZnVuY3Rpb24gc2V0Wm9vbUxpbWl0cyAoZmFydGhlciwgY2xvc2VyKSB7XG4gICAgem9vbUxpbWl0LmZhcnRoZXIgPSBmYXJ0aGVyO1xuICAgIHpvb21MaW1pdC5jbG9zZXIgPSBjbG9zZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogWm9vbSBpbiB0byB0aGUgbWFwXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgaG93IG11Y2ggbWFwIGlzIHpvb21lZCBpbiAqL1xuICBmdW5jdGlvbiB6b29tSW4gKGFtb3VudCwgZGl2aWRlciA9IDEpIHtcbiAgICB2YXIgbmV3U2NhbGU7XG5cbiAgICB0aGlzLmdldFpvb21hYmxlTGF5ZXJzKCkuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBpZiggX2lzT3Zlclpvb21MaW1pdChsYXllci5zY2FsZVgsIHRydWUpICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBuZXdTY2FsZSA9IGxheWVyLnNjYWxlWSA9IGxheWVyLnNjYWxlWCArPSAoIGFtb3VudCB8fCB6b29tTW9kaWZpZXIgKSAqIGRpdmlkZXI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3U2NhbGU7XG4gIH1cbiAgLyoqIFpvb20gb3V0IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBob3cgbXVjaCBtYXAgaXMgem9vbWVkIG91dCAqL1xuICBmdW5jdGlvbiB6b29tT3V0IChhbW91bnQsIGRpdmlkZXIgPSAxKSB7XG4gICAgdmFyIG5ld1NjYWxlO1xuXG4gICAgdGhpcy5nZXRab29tYWJsZUxheWVycygpLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgaWYoIF9pc092ZXJab29tTGltaXQobGF5ZXIuc2NhbGVYKSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbmV3U2NhbGUgPSBsYXllci5zY2FsZVkgPSBsYXllci5zY2FsZVggLT0gKCBhbW91bnQgfHwgem9vbU1vZGlmaWVyICkgKiBkaXZpZGVyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1NjYWxlO1xuICB9XG4gIGZ1bmN0aW9uIGdldFpvb21hYmxlTGF5ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFpvb21MYXllcnMoKTtcbiAgfVxuXG4gIC8qID09PT09IEluaXRpYWxpemVycyA9PT09PSAqL1xuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnQobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZVpvb21FdmVudChlKSB7XG4gICAgICB2YXIgbW91c2VXaGVlbERlbHRhID0gbW91c2VVdGlscy5kZWx0YUZyb21XaGVlbChlKTtcblxuICAgICAgaWYobW91c2VXaGVlbERlbHRhID4gMCkge1xuICAgICAgICBpZihtYXAuem9vbUluKCkpIHtcbiAgICAgICAgICBtYXAubW92ZU1hcChfY2FsY3VsYXRlQ2VudGVyTW92ZUNvb3JkaW5hdGVzKHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKG1vdXNlV2hlZWxEZWx0YSA8IDApIHtcbiAgICAgICAgaWYobWFwLnpvb21PdXQoKSkge1xuICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbm8gbmVlZCB3aGVuIHdlIHVzZSBtYXAubW92ZTpcbiAgICAgIC8vbWFwLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXR1cFpvb21FdmVudF9tb2JpbGUobWFwKSB7XG4gICAgdmFyIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdmFyIGRpZmZlcmVuY2UgPSB7fTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnRfbW9iaWxlKGUpIHtcbiAgICAgIHZhciBwb2ludGVycyA9IGUucG9pbnRlcnM7XG4gICAgICB2YXIgY29vcmRzID0gW3tcbiAgICAgICAgICB4OiBwb2ludGVyc1swXS5wYWdlWCxcbiAgICAgICAgICB5OiBwb2ludGVyc1swXS5wYWdlWVxuICAgICAgICB9LHtcbiAgICAgICAgICB4OiBwb2ludGVyc1sxXS5wYWdlWCxcbiAgICAgICAgICB5OiBwb2ludGVyc1sxXS5wYWdlWVxuICAgICAgfV07XG4gICAgICB2YXIgY2hhbmdlWCA9IE1hdGguYWJzKCBjb29yZHNbMF0ueCAtIGNvb3Jkc1sxXS54ICk7XG4gICAgICB2YXIgY2hhbmdlWSA9IE1hdGguYWJzKCBjb29yZHNbMF0ueSAtIGNvb3Jkc1sxXS55ICk7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoIWluaXRpYWxpemVkKSB7XG4gICAgICAgICAgZGlmZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIHg6IGNoYW5nZVgsXG4gICAgICAgICAgICB5OiBjaGFuZ2VZXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoZS5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgYWxlcnQoXCJTVE9QXCIpO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkaWZmZXJlbmNlLnggKyBkaWZmZXJlbmNlLnkgPCBjaGFuZ2VYICsgY2hhbmdlWSkge1xuICAgICAgICAgIGlmKG1hcC56b29tSW4odW5kZWZpbmVkLCAwLjUpKSB7XG4gICAgICAgICAgICBtYXAubW92ZU1hcChfY2FsY3VsYXRlQ2VudGVyTW92ZUNvb3JkaW5hdGVzKHRydWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYobWFwLnpvb21Jbih1bmRlZmluZWQsIDAuNSkpIHtcbiAgICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1hcC56b29tT3V0KHVuZGVmaW5lZCwgMC41KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIG5lZWQgd2hlbiB3ZSB1c2UgbWFwLm1vdmU6XG4gICAgICAgIC8vbWFwLmRyYXdPbk5leHRUaWNrKCk7XG5cbiAgICAgICAgZGlmZmVyZW5jZSA9IHtcbiAgICAgICAgICB4OiBjaGFuZ2VYLFxuICAgICAgICAgIHk6IGNoYW5nZVlcbiAgICAgICAgfTtcblxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yISBcIiwgZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4gIGZ1bmN0aW9uIF9pc092ZXJab29tTGltaXQoYW1vdW50LCBpc1pvb21Jbikge1xuICAgIGlmKCAoaXNab29tSW4gJiYgYW1vdW50ID4gem9vbUxpbWl0LmNsb3NlciApIHx8ICghaXNab29tSW4gJiYgYW1vdW50IDwgem9vbUxpbWl0LmZhcnRoZXIpICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMoaXNab29tSW4pIHtcbiAgICB2YXIgd2luZG93U2l6ZSA9IHJlc2l6ZVV0aWxzLmdldFdpbmRvd1NpemUoKTtcbiAgICB2YXIgaGFsZldpbmRvd1NpemUgPSB7XG4gICAgICB4OiB3aW5kb3dTaXplLnggLyAyLFxuICAgICAgeTogd2luZG93U2l6ZS55IC8gMlxuICAgIH07XG4gICAgdmFyIHJlYWxNb3ZlbWVudCA9IHtcbiAgICAgIHg6ICggaGFsZldpbmRvd1NpemUueCApICogKCAoIGlzWm9vbUluID8gLXpvb21Nb2RpZmllciA6IHpvb21Nb2RpZmllcikgKSxcbiAgICAgIHk6ICggaGFsZldpbmRvd1NpemUueSApICogKCAoIGlzWm9vbUluID8gLXpvb21Nb2RpZmllciA6IHpvb21Nb2RpZmllcikgKVxuICAgIH07XG5cbiAgICByZXR1cm4gcmVhbE1vdmVtZW50O1xuICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uL3V0aWxzL2NyZWF0ZUhleGFnb24nO1xuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcblxudmFyIHNoYXBlO1xuXG5leHBvcnQgdmFyIG9iamVjdF9zcHJpdGVfaGV4YSA9IHtcbiAgYnVpbGQ6IGZ1bmN0aW9uIGNhbGN1bGF0ZUhleGEocmFkaXVzKSB7XG4gICAgICBpZiAoIXJhZGl1cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWVkIHJhZGl1cyFcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IEhFSUdIVCA9IGhleGFnb25NYXRoLmNhbGNIZWlnaHQocmFkaXVzKTtcbiAgICAgIGNvbnN0IFNJREUgPSBoZXhhZ29uTWF0aC5jYWxjU2lkZShyYWRpdXMpO1xuXG4gICAgICB2YXIgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgICAgdGhpcy5yZWdYID0gaGV4YWdvblNpemUueCAvIDI7XG4gICAgICB0aGlzLnJlZ1kgPSBoZXhhZ29uU2l6ZS55IC8gMjtcbiAgICAgIHRoaXMuSEVJR0hUID0gSEVJR0hUO1xuICAgICAgdGhpcy5TSURFID0gU0lERTtcblxuICAgICAgLyogRHJhdyBoZXhhZ29uIHRvIHRlc3QgdGhlIGhpdHMgd2l0aCBoaXRBcmVhICovXG4gICAgICB0aGlzLmhpdEFyZWEgPSBzZXRBbmRHZXRTaGFwZShyYWRpdXMpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHNldEFuZEdldFNoYXBlKHJhZGl1cykge1xuICBpZiAoIXNoYXBlKSB7XG4gICAgbGV0IGhleGFnb25TaXplID0gaGV4YWdvbk1hdGguZ2V0SGV4YVNpemUocmFkaXVzKTtcbiAgICAvKiB4IGFuZCB5IGFyZSByZXZlcnNlZCwgc2luY2UgdGhpcyBpcyBob3Jpem9udGFsIGhleGFnb24gYW5kIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsICovXG4gICAgc2hhcGUgPSBjcmVhdGVIZXhhZ29uKHsgeDogaGV4YWdvblNpemUueSAvIDIsIHk6IGhleGFnb25TaXplLnggLyAyIH0sIHJhZGl1cyk7XG4gIH1cblxuICByZXR1cm4gc2hhcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBvYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfdGVycmFpbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvb2JqZWN0cy9PYmplY3Rfc3ByaXRlX3RlcnJhaW4nO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4ge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7cmFkaXVzOiAwIH0pIHtcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFRlcnJhaW5PYmplY3RfaGV4YVwiO1xuXG4gICAgb2JqZWN0X3Nwcml0ZV9oZXhhLmJ1aWxkLmNhbGwodGhpcywgZXh0cmEucmFkaXVzKTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgb2JqZWN0X3Nwcml0ZV9oZXhhIH0gZnJvbSAnLi9PYmplY3RfaGV4YSc7XG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX3VuaXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL29iamVjdHMvT2JqZWN0X3Nwcml0ZV91bml0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0IGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV91bml0IHtcbiAgY29uc3RydWN0b3IoY29vcmRzID0ge3g6MCwgeTowfSwgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIsIGV4dHJhID0ge3JhZGl1czogMCB9KSB7XG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlcik7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRVbml0T2JqZWN0c19oZXhhXCI7XG5cbiAgICBvYmplY3Rfc3ByaXRlX2hleGEuYnVpbGQuY2FsbCh0aGlzLCBleHRyYS5yYWRpdXMpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwKSB7XG4gIHZhciBzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB2YXIgY29sb3IgPSBcIiM0NDQ0NDRcIjtcbiAgdmFyIHBvaW50U2l6ZSA9IDA7XG5cbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxuICAgIC5kcmF3UG9seVN0YXIgKCBjb29yZHMueCwgY29vcmRzLnksIHJhZGl1cywgNiwgcG9pbnRTaXplLCBhbmdsZSApO1xuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogY2ksXG4gICAgICAgIHk6IGNqXG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjaSAtIDEsXG4gICAgICB5OiBjaiArIChjaSAlIDIpIC0gKChjeSA8IEhFSUdIVCAvIDIpID8gMSA6IDApXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGV4YVNpemUocmFkaXVzKSB7XG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiByYWRpdXMsXG4gICAgeDogcmFkaXVzICogMixcbiAgICB5OiByYWRpdXMgKiBNYXRoLnNxcnQoMylcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4YUNlbnRlckNvb3JkKGhleFJhZGl1cywgeCwgeSkge1xuICB2YXIgaGV4YVNpemUgPSBnZXRIZXhhU2l6ZShoZXhSYWRpdXMpO1xuICB2YXIgcmFkaXVzID0gaGV4YVNpemUucmFkaXVzO1xuICB2YXIgaGFsZkhleGFTaXplID0ge1xuICAgIHg6IGhleGFTaXplLnJhZGl1cyxcbiAgICB5OiBoZXhhU2l6ZS55ICogMC41XG4gIH07XG4gIHZhciBjZW50ZXJDb29yZHMgPSB7fTtcbiAgdmFyIGNvb3JkaW5hdGVJbmRleGVzO1xuXG4gIGNvb3JkaW5hdGVJbmRleGVzID0gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KTtcblxuICBpZiAoY29vcmRpbmF0ZUluZGV4ZXMueCA8IDAgJiYgY29vcmRpbmF0ZUluZGV4ZXMueCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGljayBvdXRzaWRlIG9mIHRoZSBoZXhhZ29uIGFyZWFcIik7XG4gIH1cbiAgY2VudGVyQ29vcmRzID0ge1xuICAgIHg6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueCAqIGhleGFTaXplLnggKyBoYWxmSGV4YVNpemUueCksXG4gICAgeTogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy55ICogaGV4YVNpemUueSArIGhhbGZIZXhhU2l6ZS55KVxuICB9O1xuXG4gIHJldHVybiBjZW50ZXJDb29yZHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNhbGNIZWlnaHQ6IGNhbGNIZWlnaHQsXG4gIGNhbGNTaWRlOiBjYWxjU2lkZSxcbiAgc2V0Q2VsbEJ5UG9pbnQ6IHNldENlbGxCeVBvaW50LFxuICBnZXRIZXhhU2l6ZTogZ2V0SGV4YVNpemUsXG4gIHRvSGV4YUNlbnRlckNvb3JkOiB0b0hleGFDZW50ZXJDb29yZFxufTsiLCJleHBvcnQgbGV0IGdhbWVEYXRhID0ge1xuICBJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgbWFwU2l6ZTogeyB4OiA1MCwgeTogMjAgfSxcbiAgcGx1Z2luc1RvQWN0aXZhdGU6IHtcbiAgICBtYXA6IFtcIm1hcF9kcmFnXCIsIFwib2JqZWN0X3NlbGVjdF9oZXhhZ29uXCJdXG4gIH1cbn07IiwiZXhwb3J0IGxldCBtYXBEYXRhID0ge1xuICBnYW1lSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXG4gIHR1cm46IDEsXG4gIHN0YXJ0UG9pbnQ6IHsgeDogMCwgeTogMCB9LFxuICBlbGVtZW50OiBcIiNtYXBDYW52YXNcIixcbiAgbGF5ZXJzOiBbe1xuICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxuICAgIG5hbWU6IFwidGVycmFpbkJhc2VMYXllclwiLFxuICAgIHNwZWNpYWxzOiBbe1xuICAgICAgXCJpbnRlcmFjdGl2ZVwiOiBmYWxzZVxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNhY2hlOiB0cnVlXG4gICAgfSxcbiAgICBvYmplY3RHcm91cHM6IFt7XG4gICAgICB0eXBlOiBcIk9iamVjdF90ZXJyYWluXCIsXG4gICAgICBuYW1lOiBcIlRlcnJhaW5CYXNlXCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgdHlwZUltYWdlRGF0YTogXCJ0ZXJyYWluQmFzZVwiLFxuICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICBcInlcIjpcIjBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0se1xuICAgICAgICAgXCJvYmpUeXBlXCI6MSxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YmRcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI0MVwiLFxuICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXG4gICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjN1wiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiODJcIixcbiAgICAgICAgICAgIFwieVwiOlwiMTQwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH0se1xuICAgIFwidHlwZVwiOiBcIk1hcF9sYXllclwiLFxuICAgIFwiY29vcmRcIjogeyBcInhcIjogXCIwXCIsIFwieVwiOiBcIjBcIiB9LFxuICAgIFwibmFtZVwiOiBcInVuaXRMYXllclwiLFxuICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICBcImNhY2hlXCI6IFwiZmFsc2VcIlxuICAgIH0sXG4gICAgXCJvYmplY3RHcm91cHNcIjogW3tcbiAgICAgIFwidHlwZVwiOiBcIk9iamVjdF91bml0XCIsXG4gICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xuICAgICAgXCJ0eXBlSW1hZ2VEYXRhXCI6IFwidW5pdFwiLFxuICAgICAgXCJvYmplY3RzXCI6IFt7XG4gICAgICAgIFwib2JqVHlwZVwiOjAsXG4gICAgICAgIFwibmFtZVwiOiBcIkhvcnNleSB0aGUgd2lsZFwiLFxuICAgICAgICBcImNvb3JkXCI6IHtcbiAgICAgICAgICBcInhcIjogXCI0MVwiLCBcInlcIjogXCI3MFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgXCJzb21lQ3VzdG9tRGF0YVwiOiBcInRydWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9XVxuICAgIH1dXG4gIH1dXG59OyIsImV4cG9ydCBsZXQgdHlwZURhdGEgPSB7XG4gIFwiZ3JhcGhpY0RhdGFcIjoge1xuICAgIFwiZ2VuZXJhbFwiOntcbiAgICAgIFwidGVycmFpblwiOntcbiAgICAgICAgXCJ0aWxlV2lkdGhcIjo4MixcbiAgICAgICAgXCJ0aWxlSGVpZ2h0XCI6OTRcbiAgICAgIH1cbiAgICB9LFxuICAgIFwidGVycmFpbkJhc2VcIjp7XG4gICAgICBcImltYWdlc1wiOlxuICAgICAgW1wiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy90ZXN0SGV4YWdvblNwcml0ZXNoZWV0LnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMCwwLDgyLDk0XSxbODIsMCw4Miw5NF0sWzE2NCwwLDgyLDk0XSxbMjQ2LDAsODIsOTRdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbODIsOTRdXG4gICAgfSxcbiAgICBcInRlcnJhaW5cIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDQ4XSxbMSw1MCw5Niw0OF0sWzEsOTksOTYsNDhdLFsxLDE0OCw5Niw0OF0sWzEsMTk3LDk2LDQ4XSxbMSwyNDYsOTYsNDhdLFsxLDI5NSw5Niw0OF0sWzEsMzQ0LDk2LDQ4XSxbMSwzOTMsOTYsNDhdXG4gICAgICBdLFxuICAgICAgXCJpbWFnZVNpemVcIjpbOTYsNDhdXG4gICAgfSxcbiAgICBcImRpdGhlclwiOntcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9kaXRoZXIyLnBuZ1wiXSxcImZyYW1lc1wiOltbMCwwLDk2LDQ4XV0sXCJpbWFnZVNpemVcIjpbOTYsNDhdfSxcbiAgICBcInByZXR0aWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21vdW50YWlucy5wbmdcIixcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL2hpbGxzLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjIucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNjYsMCwwLDE4XSxbMSwxLDk2LDQ4LDEsLTQsNF0sWzEsMTQ4LDk2LDQ4LDJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInJlc291cmNlXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvcmVzb3VyY2VzL3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMTk1LDEsOTYsNDhdLFszODksMSw5Niw0OF1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicGxhY2VcIjp7fSxcbiAgICBcImNpdHlcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9hbXBsaW8yL21lZGlldmFsY2l0aWVzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDk2LDcyXSxbOTgsMSw5Niw3Ml0sWzE5NSwxLDk2LDcyXSxbMjkyLDEsOTYsNzJdLFszODksMSw5Niw3Ml0sWzQ4NSwxLDk2LDcyXSxbNTgyLDEsOTYsNzJdLFs2NzksMSw5Niw3Ml0sWzc3NiwxLDk2LDcyXSxbODczLDEsOTYsNzJdLFsxLDc0LDk2LDcyXSxbOTgsNzQsOTYsNzJdLFsxOTUsNzQsOTYsNzJdLFsyOTIsNzQsOTYsNzJdLFszODksNzQsOTYsNzJdLFs0ODUsNzQsOTYsNzJdLFs1ODIsNzQsOTYsNzJdLFs2NzksNzQsOTYsNzJdLFs3NzYsNzQsOTYsNzJdLFs4NzMsNzQsOTYsNzJdXG4gICAgICBdXG4gICAgfSxcImJ1aWxkaW5nXCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvaXNvcGhleC90ZXJyYWluMS5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw2NCwzMl0sWzY2LDEsNjQsMzJdLFsxMzIsMSw2NCwzMl0sWzE5OCwxLDY0LDMyXSxbMjY0LDEsNjQsMzJdLFsxLDM0LDY0LDMyXSxbMSw2Nyw2NCwzMl0sWzEsMTAwLDY0LDMyXSxbMSwxMzMsNjQsMzJdLFsxLDE2Niw2NCwzMl1cbiAgICAgIF1cbiAgICB9LFwibW9kaWZpZXJcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJ1bml0XCI6e1xuICAgICAgXCJpbWFnZXNcIjpbXCIvYXNzZXRzL2ltZy9tYXAvdW5pdHMvdGVzdEhleGFnb25Vbml0cy5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOntcIndpZHRoXCI6ODIsXCJoZWlnaHRcIjo5NH1cbiAgICB9XG4gIH0sXG4gIFwib2JqZWN0RGF0YVwiOiB7XG4gICAgXCJ1bml0XCI6W3tcbiAgICAgICAgXCJuYW1lXCI6XCJ0YW5rXCIsXG4gICAgICAgIFwiZGVzY1wiOlwiVnJvb29tLi4uXCIsXG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcbiAgICAgICAgXCJhdHRcIjpcIkdvb2RcIixcbiAgICAgICAgXCJkZWZcIjpcIlBvb3JcIixcbiAgICAgICAgXCJzaWVnZVwiOlwiRGVjZW50XCIsXG4gICAgICAgIFwiaW5pdGlhdGVcIjpcIjkwXCIsXG4gICAgICAgIFwibW92ZVwiOlwiMTAwXCIsXG4gICAgICAgIFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXG4gICAgICAgIFwidmlzaW9uXCI6XCIxNTBcIixcbiAgICAgICAgXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXJyaWVyXCIsXCJkZXNjXCI6XCJhbmdyeSBiZWVoaXZlXCIsXCJpbWFnZVwiOlwiNlwiLFwiYXR0XCI6XCIxXCIsXCJkZWZcIjpcIjJcIixcInNpZWdlXCI6XCIyXCIsXCJpbml0aWF0ZVwiOlwiMTEwXCIsXCJtb3ZlXCI6XCIxMDBcIixcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFwidmlzaW9uXCI6XCIyNTBcIixcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwidW5pdFwiOntcbiAgICAgICAgICAgIFwiX2VuZW15X1wiOlt7XG4gICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXG4gICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgIFwibW9yYWxlXCI6XCJzdWZmZXJzIG1vcmFsZSBkcm9wXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiY2F2YWxyeVwiLFwiZGVzY1wiOlwiR2l2ZSBtZSBhbiBhcHBsZSFcIixcImltYWdlXCI6XCIyNlwiLFwiYXR0XCI6XCIzXCIsXCJkZWZcIjpcIjFcIixcInNpZWdlXCI6XCIwXCIsXCJpbml0aWF0ZVwiOlwiNTBcIixcIm1vdmVcIjpcIjMwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjEwMFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxuICAgIH1dLFxuICAgIFwidGVycmFpbkJhc2VcIjpbe1xuICAgICAgICBcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDFcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjJcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAyXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIzXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI0XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgM1wiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNFwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiNVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDRcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjVcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSA1XCJcbiAgICB9XSxcbiAgICBcInRlcnJhaW5cIjpbe1xuICAgICAgICBcIm5hbWVcIjpcImRlc2VydFwiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcInZlcnkgZHJ5IGxhbmRcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJDaXR5XCI6e1xuICAgICAgICAgICAgXCJfcGxheWVyX1wiOlt7XG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiOlwiUHJvdmlkZXMgKzEgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwicGxhaW5cIixcImltYWdlXCI6XCIxXCIsXCJkZXNjXCI6XCJCdWZmYWxvIHJvYW1pbmcgYXJlYVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMTIlIGZvb2QgZm9yIGNpdGllc1wiXG4gICAgICB9fV19fX0se1xuICAgICAgICBcIm5hbWVcIjpcImZvcmVzdFwiLFwiaW1hZ2VcIjpcIjJcIixcImRlc2NcIjpcIlJvYmluIGhvb2QgbGlrZXMgaXQgaGVyZVwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIlVuaXRcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGVmZW5kXCI6XCJVbml0IGRlZmVuZCArMlwiXG4gICAgICB9fV19fX0se1xuICAgICAgICAgIFwibmFtZVwiOlwidHVuZHJhXCIsXCJkZXNjXCI6XCJTaWJlcmlhIHRlYWNoZXMgeW91XCIsXCJpbWFnZVwiOlwiNlwiXG4gICAgICAgIH0se1xuICAgICAgICAgIFwibmFtZVwiOlwiYXJjdGljXCIsXCJkZXNjXCI6XCJZb3VyIGJhbGwgd2lsbCBmcmVlemUgb2ZcIixcImltYWdlXCI6XCI3XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFwiZGVzY1wiOlwiQ3JhbmJlcnJpZXMgYW5kIGNsb3VkYmVycmllc1wiLFwiaW1hZ2VcIjpcIjhcIlxuICAgICAgICB9XSxcbiAgICBcImRpdGhlclwiOltcbiAgICAgIHtcImltYWdlXCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIwXCIsXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCIsXCI3XCIsXCI4XCIsXCI5XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIn1dLFxuICAgIFwicHJldHRpZmllclwiOlt7XCJpbWFnZVwiOlwiMFwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIzXCJdLFwicHJvcGFiaWxpdHlcIjpcIjI1JVwifSx7XCJpbWFnZVwiOlwiMVwiLFwiekluZGV4XCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIxXCJdLFwicHJvcGFiaWxpdHlcIjpcIjQwJVwifSx7XCJpbWFnZVwiOlwiMlwiLFwiekluZGV4XCI6XCIwXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjYwJVwifV0sXCJyZXNvdXJjZVwiOlt7XCJuYW1lXCI6XCJPYXNpc1wiLFwiaW1hZ2VcIjpcIjBcIixcImRlc2NcIjpcIk9hc2lzIGluIHRoZSBtaWRkbGUgb2YgZGVzZXJ0LCBvciBub3QgYXRtLlwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiZm9vZCBwcm9kdWN0aW9uIDUgLyB3ZWVrXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk9pbFwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJsYWNrIGdvbGRcIixcIm1vZGlmaWVyc1wiOntcIkNpdHlcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIlRoZXJlIGlzIGEgbG90IG9mIG9pbCBoZXJlXCJ9fV19fSxcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjRcIl0sXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcImNpdHlcIjpbe1wibmFtZVwiOlwiTWVkaWV2YWxcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMFwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfSx7XCJuYW1lXCI6XCJNZWRpZXZhbDJcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbWFnZVwiOlwiMVwiLFwiaW5mbHVlbmNlQXJlYVwiOjUwfV0sXCJwbGFjZVwiOltdLFwiYnVpbGRpbmdcIjpbe1wibmFtZVwiOlwiQmFycmFja3NcIixcImltYWdlXCI6XCIwXCIsXCJ0b29sdGlwXCI6XCJFbmFibGVzIHRyb29wIHJlY3J1aXRtZW50XCJ9LHtcIm5hbWVcIjpcIkZhY3RvcnlcIixcImltYWdlXCI6XCIxXCIsXCJ0b29sdGlwXCI6XCJQcm9kdWNlcyB3ZWFwb25yeVwifV0sXCJnb3Zlcm5tZW50XCI6W3tcIm5hbWVcIjpcIkRlbW9jcmF6eVwiLFwiZGVzY3JpcHRpb25cIjpcIndlbGwgaXQncyBhIGRlbW9jcmF6eSA6KVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgKzIwJSBoYXBwaW5lc3NcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzAsMV0sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImhhcHBpbmVzc1wiOlwiMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNvbW11bmlzbVwiLFwiZGVzY3JpcHRpb25cIjpcIllvdSBrbm93IHRoZSBvbmUgdXNlZCBpbiB0aGUgZ3JlYXQgVVNTUiBhbmQgaW5zaWRlIHRoZSBncmVhdCBmaXJld2FsbCBvZiBDaGluYVwiLFwidG9vbHRpcFwiOlwiR2l2ZXMgcHJvZHVjdGlvbiBib251c2VzXCIsXCJpbWFnZVwiOlwiMFwiLFwicmVxdWlyZW1lbnRzXCI6W10sXCJwb3NzaWJsZU5hdFZhbHVlc1wiOlsyLDNdLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7fX1dfX0sXCJDaXR5XCI6e1wiYnVpbGRpbmdcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInByb2R1Y3Rpb25cIjpcIjIwJVwifX1dfX19fV0sXCJwb2xpdGljc1wiOntcInRheFJhdGVcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJjb3JydXB0aW9uXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiYWxpZ25tZW50XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwiaGFwcGluZXNzXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwicmV2b2x0Umlza1wiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcInVuaXR5XCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwibmF0VmFsdWVcIjpbe1wibmFtZVwiOlwiSW50ZWdyaXR5XCIsXCJ0b29sdGlwXCI6XCJHb3Zlcm5tZW50IGFuZCBwb3B1bGF0aW9ucyBzaG93cyBpbnRlZ3JpdHkgYW5kIHRydXN0d29ydGhpbmVzc1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJpbnRlcm5hbFJlbGF0aW9uc1wiOlwiKzEwJVwiLFwiZGlwbG9tYWN5XCI6XCIrMTAlXCIsXCJyZXZvbHQgcmlza1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCItMjAlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkNhcGl0YWxpc21cIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiZGlwbG9tYWN5XCI6XCIrNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwibW9yYWxlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiSGFyZHdvcmtpbmdcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrMTAlXCIsXCJoYXBwaW5lc3NcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCJ9fV19fX19LHtcIm5hbWVcIjpcIkxlYWRlcnNoaXBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGl2aXR5XCI6XCIrNSVcIixcImhhcHBpbmVzc1wiOlwiLTUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIixcInRyYWRpbmdcIjpcIisxMCVcIn19XX19fX1dfX1cbn07Il19
