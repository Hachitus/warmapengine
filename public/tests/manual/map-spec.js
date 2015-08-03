(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');

var _componentsFactoriesHorizontalHexaFactory = require('../../components/factories/horizontalHexaFactory');

/* ===== Import plugins ===== */

var _componentsMapCoreMoveMap_drag = require('../../components/map/core/move/map_drag');

var _componentsMapCoreZoomMap_zoom = require('../../components/map/core/zoom/map_zoom');

var _componentsMapExtensionsHexagonsObject_selectObject_select_hexagon = require('../../components/map/extensions/hexagons/object_select/object_select_hexagon');

/* DATA FILES used for testing */

var _testsDataGameData = require('../../tests/data/gameData');

var _testsDataTypeData = require('../../tests/data/typeData');

var _testsDataMapData = require('../../tests/data/mapData');

var _componentsPreloadingPreloading = require('../../components/preloading/preloading');

window.initMap = function () {
  var canvasElement = document.getElementById('mapCanvas');
  var map;

  map = (0, _componentsFactoriesHorizontalHexaFactory.createMap)(canvasElement, _testsDataGameData.gameData, _testsDataMapData.mapData, _testsDataTypeData.typeData);

  var prel = new _componentsPreloadingPreloading.preload(false);
  prel.setErrorHandler(preloadErrorHandler);
  //.setProgressHandler( progressHandler )
  prel.loadManifest([{
    id: 'terrain_spritesheet',
    src: 'http://warmapengine.level7.fi/assets/img/map/testHexagons/testHexagonSpritesheet.png'
  }, {
    id: 'unit_spritesheet',
    src: 'http://warmapengine.level7.fi/assets/img/map/amplio2/units.png'
  }]);
  prel.resolveOnComplete().then(function () {
    console.log('preloading complete? Map should be ready to init?');
    map.init([_componentsMapCoreZoomMap_zoom.map_zoom, _componentsMapCoreMoveMap_drag.map_drag, _componentsMapExtensionsHexagonsObject_selectObject_select_hexagon.object_select_hexagon], { x: 41, y: 47 }, undefined);
  });

  return map;

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log('PRELOADER ERROR', err);
  }
};

},{"../../components/factories/horizontalHexaFactory":3,"../../components/map/core/move/map_drag":12,"../../components/map/core/zoom/map_zoom":17,"../../components/map/extensions/hexagons/object_select/object_select_hexagon":22,"../../components/preloading/preloading":25,"../../tests/data/gameData":26,"../../tests/data/mapData":27,"../../tests/data/typeData":28}],2:[function(require,module,exports){
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

  return map;
}

},{"../map/UIs/default/default.js":5,"../map/core/Map":6,"../map/core/UI":10,"../map/core/spritesheetList":15,"../map/extensions/hexagons/object/Object_terrain_hexa":20,"../map/extensions/hexagons/object/Object_unit_hexa":21}],4:[function(require,module,exports){
/**
 * @require loglevel.js for frontend logging, or something similar */

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
        this.modal.show();
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

},{}],6:[function(require,module,exports){
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

},{"./Map_layer":7,"./Map_stage":8,"./eventlisteners":11,"./move/map_drag":12,"./utils/utils":16,"./zoom/map_zoom":17}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"../eventlisteners":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

},{"../Object":9}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

},{"../Object":9}],15:[function(require,module,exports){
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

},{"blueimp-md5":2}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../eventlisteners":11,"../utils/utils.js":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setupHexagonClick = setupHexagonClick;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loggerLogJs = require('../../../../logger/log.js');

var _loggerLogJs2 = _interopRequireDefault(_loggerLogJs);

var _coreEventlisteners = require('../../../core/eventlisteners');

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

},{"../../../../logger/log.js":4,"../../../core/eventlisteners":11}],19:[function(require,module,exports){
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

},{"../utils/createHexagon":23,"../utils/hexagonMath":24}],20:[function(require,module,exports){
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

},{"../../../core/objects/Object_sprite_terrain":13,"./Object_hexa":19}],21:[function(require,module,exports){
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

},{"../../../core/objects/Object_sprite_unit":14,"./Object_hexa":19}],22:[function(require,module,exports){
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

var _coreUI = require('../../../core/UI');

var _coreMap_layer = require('../../../core/Map_layer');

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

},{"../../../core/Map_layer":7,"../../../core/UI":10,"../eventListeners/select":18}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** Creating the createjsQueue-object from spritesheet. This preloads assests.
 * @requires createjs Createjs library / framework object - global object
 * @param {string} basePath
 * @todo Make a loader graphics / notifier when loading assets using preloader.
 *
 * Usage: preload.generate("http://path.fi/path").onComplete().then(function() {}); */

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

    /**@return {Promise} Return promise object, that will be resolved when the preloading is finished */
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

    /** Preload assets. Uses easeljs manifest format */
    value: function loadManifest() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(Object.getPrototypeOf(preload.prototype), "loadManifest", this).apply(this, args);

      return this;
    }
  }, {
    key: "setErrorHandler",

    /** Error handler if something goes wrong when preloading */
    value: function setErrorHandler(errorCB) {
      this.on("error", errorCB);

      return this;
    }
  }, {
    key: "setProgressHandler",

    /** Progress handler for loading. You should look easeljs docs for more information */
    value: function setProgressHandler(progressCB) {
      this.on("error", progressCB);

      return this;
    }
  }, {
    key: "activateSound",

    /** Activat sound preloading also */
    value: function activateSound() {
      this.installPlugin(createjs.Sound);
    }
  }]);

  return preload;
})(createjs.LoadQueue);

exports.preload = preload;

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL21hbnVhbC9jcmVhdGVNYXAtdGVzdC5lczYuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbG9nZ2VyL2xvZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvVUlzL2RlZmF1bHQvZGVmYXVsdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9NYXAuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL01hcF9zdGFnZS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9PYmplY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvZXZlbnRsaXN0ZW5lcnMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvbW92ZS9tYXBfZHJhZy5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9vYmplY3RzL09iamVjdF9zcHJpdGVfdGVycmFpbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9vYmplY3RzL09iamVjdF9zcHJpdGVfdW5pdC5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvdXRpbHMvdXRpbHMuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvem9vbS9tYXBfem9vbS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9ldmVudExpc3RlbmVycy9zZWxlY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0L09iamVjdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfdGVycmFpbl9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9PYmplY3RfdW5pdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2NyZWF0ZUhleGFnb24uanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvdXRpbHMvaGV4YWdvbk1hdGguanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvdHlwZURhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozt3REFLYSxrREFBa0Q7Ozs7NkNBR25ELHlDQUF5Qzs7NkNBQ3pDLHlDQUF5Qzs7aUZBQzVCLDhFQUE4RTs7OztpQ0FHM0YsMkJBQTJCOztpQ0FDM0IsMkJBQTJCOztnQ0FDNUIsMEJBQTBCOzs4Q0FDMUIsd0NBQXdDOztBQUVoRSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVk7QUFDM0IsTUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6RCxNQUFJLEdBQUcsQ0FBQzs7QUFFUixLQUFHLEdBQUcsOENBakJDLFNBQVMsRUFpQkEsYUFBYSxxQkFUdEIsUUFBUSxvQkFFUixPQUFPLHFCQURQLFFBQVEsQ0FRNEMsQ0FBQzs7QUFFNUQsTUFBSSxJQUFJLEdBQUcsb0NBUkosT0FBTyxDQVFVLEtBQUssQ0FBRSxDQUFDO0FBQ2hDLE1BQUksQ0FBQyxlQUFlLENBQUUsbUJBQW1CLENBQUUsQ0FBQzs7QUFFNUMsTUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFFO0FBQ2xCLE1BQUUsRUFBRSxxQkFBcUI7QUFDekIsT0FBRyxFQUFDLHNGQUFzRjtHQUMzRixFQUFDO0FBQ0EsTUFBRSxFQUFFLGtCQUFrQjtBQUN0QixPQUFHLEVBQUMsZ0VBQWdFO0dBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBQ0osTUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQ3JCLElBQUksQ0FBQyxZQUFXO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0FBQ2pFLE9BQUcsQ0FBQyxJQUFJLENBQUUsZ0NBNUJQLFFBQVEsaUNBRFIsUUFBUSxxRUFFUixxQkFBcUIsQ0EyQitCLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUUsQ0FBQztHQUN4RixDQUFDLENBQUM7O0FBRUwsU0FBTyxHQUFHLENBQUM7OztBQUdYLFdBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFO0FBQ2hDLFdBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFFLENBQUM7R0FDdEM7Q0FDRixDQUFDOzs7QUM5Q0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkEsWUFBWSxDQUFDOzs7OztRQStCRyxTQUFTLEdBQVQsU0FBUzs7Ozs7Ozs7OzBCQXRCTCxp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QyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FDNVI7S0FDRixFQUFDLFVBQVUsRUFBQztBQUNYLGNBQVEsRUFBQyxDQUFDLHNDQUFzQyxDQUFDO0FBQ2pELGNBQVEsRUFBQyxDQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQ3ZJO0tBQ0YsRUFBQyxVQUFVLEVBQUM7QUFDWCxjQUFRLEVBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztBQUNqRCxjQUFRLEVBQUMsQ0FDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcs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LEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLENBQUM7QUFDcEcsZ0JBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLDRDQUE0QyxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxZQUFZLEVBQUMsMEJBQTBCLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsZUFBZSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQywwQkFBMEIsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnRkFBZ0YsRUFBQyxTQUFTLEVBQUMsMEJBQTBCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUMsRUFBRSxFQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsZ0VBQWdFLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUM7Q0FDbjhILENBQUM7UUE5SFMsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuLyogPT09PT09IExpYnJhcnkgaW1wb3J0cyA9PT09PT0gKi9cblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbi8vdmFyIE1hcCA9IHJlcXVpcmUoICcuLi9wdWJsaWMvY29tcG9uZW50cy9tYXAvTWFwJyk7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhY3Rvcmllcy9ob3Jpem9udGFsSGV4YUZhY3RvcnknO1xuXG4vKiA9PT09PSBJbXBvcnQgcGx1Z2lucyA9PT09PSAqL1xuaW1wb3J0IHsgbWFwX2RyYWcgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9tYXAvY29yZS9tb3ZlL21hcF9kcmFnXCI7XG5pbXBvcnQgeyBtYXBfem9vbSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwL2NvcmUvem9vbS9tYXBfem9vbSc7XG5pbXBvcnQgeyBvYmplY3Rfc2VsZWN0X2hleGFnb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uJztcblxuLyogREFUQSBGSUxFUyB1c2VkIGZvciB0ZXN0aW5nICovXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ2FtZURhdGEnO1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3R5cGVEYXRhJztcbmltcG9ydCB7IG1hcERhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL21hcERhdGEnO1xuaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxud2luZG93LmluaXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIHZhciBtYXA7XG5cbiAgbWFwID0gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIGdhbWVEYXRhLCBtYXBEYXRhLCB0eXBlRGF0YSk7XG5cbiAgbGV0IHByZWwgPSBuZXcgcHJlbG9hZCggZmFsc2UgKTtcbiAgcHJlbC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKTtcbiAgICAvLy5zZXRQcm9ncmVzc0hhbmRsZXIoIHByb2dyZXNzSGFuZGxlciApXG4gIHByZWwubG9hZE1hbmlmZXN0KFsge1xuICAgIGlkOiBcInRlcnJhaW5fc3ByaXRlc2hlZXRcIixcbiAgICBzcmM6XCJodHRwOi8vd2FybWFwZW5naW5lLmxldmVsNy5maS9hc3NldHMvaW1nL21hcC90ZXN0SGV4YWdvbnMvdGVzdEhleGFnb25TcHJpdGVzaGVldC5wbmdcIlxuICB9LHtcbiAgICBpZDogXCJ1bml0X3Nwcml0ZXNoZWV0XCIsXG4gICAgc3JjOlwiaHR0cDovL3dhcm1hcGVuZ2luZS5sZXZlbDcuZmkvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi91bml0cy5wbmdcIlxuICB9XSk7XG4gIHByZWwucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJwcmVsb2FkaW5nIGNvbXBsZXRlPyBNYXAgc2hvdWxkIGJlIHJlYWR5IHRvIGluaXQ/XCIpO1xuICAgICAgbWFwLmluaXQoIFsgbWFwX3pvb20sIG1hcF9kcmFnLCBvYmplY3Rfc2VsZWN0X2hleGFnb24gXSwgeyB4OiA0MSwgeTogNDcgfSwgdW5kZWZpbmVkICk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcblxuICAgIC8qID09PT09PSBwcml2YXRlIGZ1bmN0aW9ucywgb3IgdG8gYmUgbW92ZWQgZWxzZXdoZXJlID09PT09PSAqL1xuICBmdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiUFJFTE9BREVSIEVSUk9SXCIsIGVyciApO1xuICB9XG59OyIsIi8qXG4gKiBKYXZhU2NyaXB0IE1ENSAxLjAuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKiBcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cblxuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSAqL1xuLypnbG9iYWwgdW5lc2NhcGUsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKlxuICAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICAgICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpIHtcbiAgICAgICAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKSxcbiAgICAgICAgICAgIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICAgICAgICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICAgICovXG4gICAgZnVuY3Rpb24gYml0X3JvbChudW0sIGNudCkge1xuICAgICAgICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBtZDVfY21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksIGIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZDVfZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICAgIHJldHVybiBtZDVfY21uKChiICYgZCkgfCAoYyAmICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWQ1X2lpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgICAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICAgICovXG4gICAgZnVuY3Rpb24gYmlubF9tZDUoeCwgbGVuKSB7XG4gICAgICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gICAgICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKTtcbiAgICAgICAgeFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuO1xuXG4gICAgICAgIHZhciBpLCBvbGRhLCBvbGRiLCBvbGRjLCBvbGRkLFxuICAgICAgICAgICAgYSA9ICAxNzMyNTg0MTkzLFxuICAgICAgICAgICAgYiA9IC0yNzE3MzM4NzksXG4gICAgICAgICAgICBjID0gLTE3MzI1ODQxOTQsXG4gICAgICAgICAgICBkID0gIDI3MTczMzg3ODtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIG9sZGEgPSBhO1xuICAgICAgICAgICAgb2xkYiA9IGI7XG4gICAgICAgICAgICBvbGRjID0gYztcbiAgICAgICAgICAgIG9sZGQgPSBkO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaV0sICAgICAgIDcsIC02ODA4NzY5MzYpO1xuICAgICAgICAgICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNywgIDYwNjEwNTgxOSk7XG4gICAgICAgICAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArICAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNywgLTE3NjQxODg5Nyk7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA1XSwgMTIsICAxMjAwMDgwNDI2KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgICAgICAgICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAgOF0sICA3LCAgMTc3MDAzNTQxNik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArICA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICAgICAgICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgICAgICAgICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sICA3LCAgMTgwNDYwMzY4Mik7XG4gICAgICAgICAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgICAgICAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICAgICAgICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xuXG4gICAgICAgICAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDUsIC0xNjU3OTY1MTApO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgNl0sICA5LCAtMTA2OTUwMTYzMik7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsICA2NDM3MTc3MTMpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2ldLCAgICAgIDIwLCAtMzczODk3MzAyKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDVdLCAgNSwgLTcwMTU1ODY5MSk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgIDksICAzODAxNjA4Myk7XG4gICAgICAgICAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgICAgICAgICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2kgKyAgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgIDldLCAgNSwgIDU2ODQ0NjQzOCk7XG4gICAgICAgICAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgIDksIC0xMDE5ODAzNjkwKTtcbiAgICAgICAgICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArICA4XSwgMjAsICAxMTYzNTMxNTAxKTtcbiAgICAgICAgICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xuICAgICAgICAgICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2kgKyAgMl0sICA5LCAtNTE0MDM3ODQpO1xuICAgICAgICAgICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE0LCAgMTczNTMyODQ3Myk7XG4gICAgICAgICAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcblxuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgNV0sICA0LCAtMzc4NTU4KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XG4gICAgICAgICAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgICAgICAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArICAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xuICAgICAgICAgICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2kgKyAgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICAgICAgICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sICA0LCAgNjgxMjc5MTc0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpXSwgICAgICAxMSwgLTM1ODUzNzIyMik7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArICAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgNl0sIDIzLCAgNzYwMjkxODkpO1xuICAgICAgICAgICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyAgOV0sICA0LCAtNjQwMzY0NDg3KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgICAgICAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsICA1MzA3NDI1MjApO1xuICAgICAgICAgICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyAgMl0sIDIzLCAtOTk1MzM4NjUxKTtcblxuICAgICAgICAgICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2ldLCAgICAgICA2LCAtMTk4NjMwODQ0KTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDddLCAxMCwgIDExMjY4OTE0MTUpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgICAgICAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgIDYsICAxNzAwNDg1NTcxKTtcbiAgICAgICAgICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpICsgIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xuICAgICAgICAgICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgICAgICAgICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2kgKyAgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcbiAgICAgICAgICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgIDRdLCAgNiwgLTE0NTUyMzA3MCk7XG4gICAgICAgICAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICAgICAgICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgIDJdLCAxNSwgIDcxODc4NzI1OSk7XG4gICAgICAgICAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArICA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuXG4gICAgICAgICAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgICAgICAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgICAgICAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgICAgICAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiBiaW5sMnJzdHIoaW5wdXQpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBvdXRwdXQgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aCAqIDMyOyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChpbnB1dFtpID4+IDVdID4+PiAoaSAlIDMyKSkgJiAweEZGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gICAgKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJzdHIyYmlubChpbnB1dCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xuICAgICAgICBvdXRwdXRbKGlucHV0Lmxlbmd0aCA+PiAyKSAtIDFdID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBvdXRwdXRbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGggKiA4OyBpICs9IDgpIHtcbiAgICAgICAgICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4RkYpIDw8IChpICUgMzIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGEgcmF3IHN0cmluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9tZDUocykge1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KHJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENhbGN1bGF0ZSB0aGUgSE1BQy1NRDUsIG9mIGEga2V5IGFuZCBzb21lIGRhdGEgKHJhdyBzdHJpbmdzKVxuICAgICovXG4gICAgZnVuY3Rpb24gcnN0cl9obWFjX21kNShrZXksIGRhdGEpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBia2V5ID0gcnN0cjJiaW5sKGtleSksXG4gICAgICAgICAgICBpcGFkID0gW10sXG4gICAgICAgICAgICBvcGFkID0gW10sXG4gICAgICAgICAgICBoYXNoO1xuICAgICAgICBpcGFkWzE1XSA9IG9wYWRbMTVdID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoYmtleS5sZW5ndGggPiAxNikge1xuICAgICAgICAgICAgYmtleSA9IGJpbmxfbWQ1KGJrZXksIGtleS5sZW5ndGggKiA4KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xuICAgICAgICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgICAgICAgICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xuICAgICAgICB9XG4gICAgICAgIGhhc2ggPSBiaW5sX21kNShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpO1xuICAgICAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBoZXggc3RyaW5nXG4gICAgKi9cbiAgICBmdW5jdGlvbiByc3RyMmhleChpbnB1dCkge1xuICAgICAgICB2YXIgaGV4X3RhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJyxcbiAgICAgICAgICAgIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaGV4X3RhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwRikgK1xuICAgICAgICAgICAgICAgIGhleF90YWIuY2hhckF0KHggJiAweDBGKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBFbmNvZGUgYSBzdHJpbmcgYXMgdXRmLThcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cjJyc3RyX3V0ZjgoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJhd19tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cl9tZDUoc3RyMnJzdHJfdXRmOChzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhleF9tZDUocykge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X21kNShzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJhd19obWFjX21kNShrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyX2htYWNfbWQ1KHN0cjJyc3RyX3V0ZjgoayksIHN0cjJyc3RyX3V0ZjgoZCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoZXhfaG1hY19tZDUoaywgZCkge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocmF3X2htYWNfbWQ1KGssIGQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZDUoc3RyaW5nLCBrZXksIHJhdykge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGV4X21kNShzdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJhd19tZDUoc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuIGhleF9obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhd19obWFjX21kNShrZXksIHN0cmluZyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1kNTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJC5tZDUgPSBtZDU7XG4gICAgfVxufSh0aGlzKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBGYWN0b3J5IHdoZXJlIHdlIGNvbnN0cnVjdCBhIGhvcml6b250YWwgaGV4YWdvbiBtYXAgZm9yIHRlc3QgYW5kIGRldmVsb3BtZW50IHB1cnBvc2VzXG4gKlxuICogQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcbiAqIEByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xuICogQHRvZG8gQWRkIGRvY3VtZW50YXRpb24gYW5kIHJlZmFjdG9yIChtYXliZSBtb2R1bGFyaXplIC8gZnVuY3Rpb25hbGl6ZSkgdGhlIGFjdHVhbCBsb2dpYyAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vbWFwL2NvcmUvTWFwJztcbmltcG9ydCB7IE9iamVjdF90ZXJyYWluIH0gZnJvbSAnLi4vbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0L09iamVjdF90ZXJyYWluX2hleGEnO1xuaW1wb3J0IHsgT2JqZWN0X3VuaXQgfSBmcm9tICcuLi9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvT2JqZWN0X3VuaXRfaGV4YSc7XG5pbXBvcnQgeyBzcHJpdGVzaGVldExpc3QgfSBmcm9tICcuLi9tYXAvY29yZS9zcHJpdGVzaGVldExpc3QnO1xudmFyIGFsbFNwcml0ZXNoZWV0cyA9IHNwcml0ZXNoZWV0TGlzdCgpO1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi9tYXAvY29yZS9VSSc7XG5pbXBvcnQgeyBVSV9kZWZhdWx0IH0gZnJvbSBcIi4uL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzXCI7XG5cbnZhciBmdW5jdGlvbnNJbk9iaiA9IHtcbiAgT2JqZWN0X3RlcnJhaW4sXG4gIE9iamVjdF91bml0XG59O1xuXG4vKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qKlxuICogQHBhcmFtIHtET01FbGVtZW50IENhbnZhc30gY2FudmFzRWxlbWVudCB0aGUgY2FudmFzIGVsZW1lbnQgZm9yIHRoZSBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lRGF0YUFyZyBnYW1lRGF0YS4gTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzXG4gKiBAcGFyYW0ge2JpZ2FzcyBPYmplY3R9IG1hcERhdGEgLSBob2xkcyBhbGwgdGhlIHN0YWdlLCBsYXllciBhbmQgb2JqZWN0IGRhdGEgbmVlZGVkIHRvIGNvbnN0cnVjdCBhIGZ1bGwgbWFwLlxuICogTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZURhdGFBcmcgdHlwZURhdGEuIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhcy5cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY2FudmFzRWxlbWVudCwgZ2FtZURhdGFBcmcsIG1hcERhdGFBcmcsIHR5cGVEYXRhQXJnKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIG1hcERhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShtYXBEYXRhQXJnKSA6IG1hcERhdGFBcmc7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgdHlwZURhdGFBcmcgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh0eXBlRGF0YUFyZykgOiB0eXBlRGF0YUFyZztcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBnYW1lRGF0YUFyZyA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGdhbWVEYXRhQXJnKSA6IGdhbWVEYXRhQXJnO1xuICB2YXIgbWFwID0gbmV3IE1hcChjYW52YXNFbGVtZW50LCB7IG1hcFNpemU6IGdhbWVEYXRhLm1hcFNpemUgfSk7XG4gIHZhciBkaWFsb2dfc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rpb25EaWFsb2dcIik7XG4gIHZhciBkZWZhdWx0VUkgPSBuZXcgVUlfZGVmYXVsdChkaWFsb2dfc2VsZWN0aW9uKTtcbiAgZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICBVSShkZWZhdWx0VUksIG1hcCk7XG5cbiAgLyogV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBnaXZlbiBtYXAgZGF0YSBhbmQgY3JlYXRlIG9iamVjdHMgYWNjb3JkaW5nbHkgKi9cbiAgbWFwRGF0YS5sYXllcnMuZm9yRWFjaCggbGF5ZXJEYXRhID0+IHtcbiAgICBsZXQgdGhpc0xheWVyO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXNMYXllciA9IG1hcC5hZGRMYXllciggbGF5ZXJEYXRhLm5hbWUsIGZhbHNlLCBsYXllckRhdGEuY29vcmQgKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbTpcIiwgbGF5ZXJEYXRhLnR5cGUsIGUuc3RhY2spO1xuICAgIH1cblxuICAgIGxheWVyRGF0YS5vYmplY3RHcm91cHMuZm9yRWFjaCggb2JqZWN0R3JvdXAgPT4ge1xuICAgICAgbGV0IHNwcml0ZXNoZWV0O1xuICAgICAgbGV0IHNwcml0ZXNoZWV0VHlwZSA9IG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGE7XG5cbiAgICAgIGlmKCFzcHJpdGVzaGVldFR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIHNwcml0ZXNoZWV0VHlwZS1kYXRhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKHNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBsZXQgc3ByaXRlc2hlZXREYXRhID0gdHlwZURhdGEuZ3JhcGhpY0RhdGFbc3ByaXRlc2hlZXRUeXBlXTtcblxuICAgICAgICBzcHJpdGVzaGVldCA9IGFsbFNwcml0ZXNoZWV0cy5jcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpO1xuICAgICAgfVxuXG4gICAgICBvYmplY3RHcm91cC5vYmplY3RzLmZvckVhY2goIG9iamVjdCA9PiB7XG4gICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XG5cbiAgICAgICAgaWYoIW9ialR5cGVEYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG1hcERhdGEgZm9yIHR5cGU6XCIsIHNwcml0ZXNoZWV0VHlwZSwgb2JqZWN0Lm9ialR5cGUsIG9iamVjdC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVOdW1iZXIgPSBvYmpUeXBlRGF0YS5pbWFnZTtcbiAgICAgICAgbGV0IG9iakRhdGEgPSB7XG4gICAgICAgICAgdHlwZURhdGE6IG9ialR5cGVEYXRhLFxuICAgICAgICAgIGFjdGl2ZURhdGE6IG9iamVjdC5kYXRhXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuZXcgZnVuY3Rpb25zSW5PYmpbb2JqZWN0R3JvdXAudHlwZV0oIG9iamVjdC5jb29yZCwgb2JqRGF0YSwgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgeyByYWRpdXM6IDQ3IH0gKTtcbiAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXdPYmplY3QgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBtYXAubW92ZU1hcChtYXBEYXRhLnN0YXJ0UG9pbnQpO1xuXG4gIHJldHVybiBtYXA7XG59IiwiLyoqXG4gKiBAcmVxdWlyZSBsb2dsZXZlbC5qcyBmb3IgZnJvbnRlbmQgbG9nZ2luZywgb3Igc29tZXRoaW5nIHNpbWlsYXIgKi9cblxuICd1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWJ1ZzogZnVuY3Rpb24oZSwgZXJyb3JUZXh0KSB7XG4gICAgbG9nLmRlYnVnKGVycm9yVGV4dCwgZSk7XG4gIH1cbn07IiwiLyoqIFRoZSBzaW1wbGVzdCBkZWZhdWx0IFVJIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnQgVUkgZnVuY3Rpb25hbGl0aWVzIGZvcjpcbiAqIHNob3dTZWxlY3Rpb25zXG4gKiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdFxuICpcbiAqIEB0b2RvIElOIFBST0dSRVNTLCBub3QgaW1wbGVtZW50ZWQgd2VsbCB5ZXQuIFVzZXMgY2hyb21lcyBidWlsdC1pbiBtb2RhbCBzdXBwb3J0IG9ubHkgYXRtLiBqdXN0IGZvciB0aGUga2lja3MgOikgICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIFVJX2RlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcihtb2RhbCwgc3R5bGVzKSB7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGlhbG9nXCIpWzBdO1xuICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzIHx8IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjBGMEYwXCJcbiAgICB9O1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMgPSBfRE9NRWxlbWVudHNUb0FycmF5KHRoaXMubW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX2Nsb3NlXCIpKTtcbiAgfVxuICBzaG93U2VsZWN0aW9ucyhtYXAsIG9iamVjdHMpIHtcbiAgICBpZiAob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJvYmplY3RzOjxicj5cIjtcbiAgICAgIG9iamVjdHMubWFwKCBvYmplY3QgPT4ge1xuICAgICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3QuZGF0YS50eXBlRGF0YS5uYW1lICsgXCI8YnI+XCI7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gXCJTRUxFQ1RFRDo8YnI+XCI7XG4gICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCArPSBvYmplY3RzWzBdLmRhdGEudHlwZURhdGEubmFtZTtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG1hcCwgb2JqZWN0KSB7XG4gICAgLy8gTm90IGltcGxlbWVudGVkIHlldFxuICB9XG4gIGluaXQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudCggZWxlbWVudCwgc2VsZi5tb2RhbC5jbG9zZS5iaW5kKHNlbGYubW9kYWwpICk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FjdGl2YXRlQ2xvc2luZ0VsZW1lbnQoZWxlbWVudCwgY2xvc2VDQikge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNsb3NlQ0IoKTtcbiAgICAgIH0pO1xufVxuZnVuY3Rpb24gX0RPTUVsZW1lbnRzVG9BcnJheShlbGVtZW50cykge1xuICBpZiAoIWVsZW1lbnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IgKyBcIiBmdW5jdGlvbiBuZWVkcyBlbGVtZW50c1wiKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG4gIHZhciBlbGVtZW50QXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudEFycmF5LnB1c2goZWxlbWVudHNbaV0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRBcnJheTtcbn0iLCIvKiogTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xuICpcbiAqIE1hcCBpcyBpbnN0YW50aWF0ZWQgYW5kIHRoZW4gaW5pdGlhbGl6ZWQgd2l0aCBpbml0LW1ldGhvZC5cbiAqXG4gKiBQbHVnaW5zIGNhbiBiZSBhZGRlZCB3aXRoIGFjdGl2YXRlUGx1Z2lucy1tZXRob2QgYnkgcHJvZGl2aW5nIGluaXQobWFwKSBtZXRob2QgaW4gdGhlIHBsdWdpbi4gUGx1Z2lucyBhcmUgYWx3YXlzXG4gKiBmdW5jdGlvbnMsIG5vdCBvYmplY3RzIHRoYXQgYXJlIGluc3RhbnRpYXRlZC4gUGx1Z2lucyBhcmUgc3VwcG9zZWQgdG8gZXh0ZW5kIHRoZSBtYXAgb2JqZWN0IG9yIGFueXRoaW5nIGluIGl0IHZpYVxuICogaXQncyBwdWJsaWMgbWV0aG9kcy5cbiAqXG4gKiBAcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuaW1wb3J0IHsgTWFwX3N0YWdlIH0gZnJvbSAnLi9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi9NYXBfbGF5ZXInO1xuaW1wb3J0IHsgcmVzaXplVXRpbHMsIHJlc2l6ZVV0aWxzIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBtYXBfZHJhZyB9IGZyb20gXCIuL21vdmUvbWFwX2RyYWdcIjtcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi96b29tL21hcF96b29tJztcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9ldmVudGxpc3RlbmVycyc7XG5cbnZhciBfZHJhd01hcE9uTmV4dFRpY2sgPSBmYWxzZTtcbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGNsYXNzIE1hcCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0RPTSBDYW52YXMgZWxlbWVudH0gY2FudmFzIC0gQ2FudmFzIHVzZWQgYnkgdGhlIG1hcFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGRpZmZlcmVudCBvcHRpb25zIGZvciB0aGUgbWFwIHRvIGJlIGdpdmVuLlxuICAgKiBAcmV0dXJuIE1hcCBpbnN0YW5jZSAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbnMpIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5fc3RhZ2UgPSBuZXcgTWFwX3N0YWdlKFwiZGFkZHlTdGFnZVwiLCBjYW52YXMpO1xuICAgIHRoaXMubW9tbXlMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJtb21teUxheWVyXCIsIG9wdGlvbnMuc3ViQ29udGFpbmVycywgb3B0aW9ucy5zdGFydENvb3JkKTtcbiAgICB0aGlzLl9zdGFnZS5hZGRDaGlsZCh0aGlzLm1vbW15TGF5ZXIpO1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuICAgIHRoaXMuYWN0aXZhdGVkUGx1Z2lucyA9IFtdO1xuICAgIC8qIEFjdGl2YXRlIHRoZSBtYXAgem9vbSBhbmQgbWFwIGRyYWcgY29yZSBwbHVnaW5zICovXG4gICAgdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZSA9IFttYXBfem9vbSwgbWFwX2RyYWddO1xuICAgIHRoaXMubWFwU2l6ZSA9IG9wdGlvbnMubWFwU2l6ZSB8fCB7IHg6MCwgeTowIH07XG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSBmYWxzZTtcbiAgICB0aGlzLmV2ZW50Q0JzID0ge1xuICAgICAgZnVsbFNpemU6IHJlc2l6ZVV0aWxzLnNldFRvRnVsbFNpemUoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSksXG4gICAgICBmdWxsc2NyZWVuOiByZXNpemVVdGlscy50b2dnbGVGdWxsU2NyZWVuLFxuICAgICAgc2VsZWN0OiBudWxsLFxuICAgICAgZHJhZzogbnVsbCxcbiAgICAgIHpvb206IG51bGxcbiAgICB9O1xuICAgIHRoaXMuX2Z1bGxTaXplRnVuY3Rpb24gPSBudWxsO1xuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnModGhpcy5ldmVudENCcyk7XG4gIH1cbiAgLyoqIGluaXRpYWxpemF0aW9uIG1ldGhvZFxuICAgKiBAcGFyYW0gW0FycmF5XSBwbHVnaW5zIC0gUGx1Z2lucyB0byBiZSBhY3RpdmF0ZWQgZm9yIHRoZSBtYXAuIE5vcm1hbGx5IHlvdSBzaG91bGQgZ2l2ZSB0aGUgcGx1Z2lucyBoZXJlIGluc3RlYWQgb2ZcbiAgICogc2VwYXJhdGVseSBwYXNzaW5nIHRoZW0gdG8gYWN0aXZhdGVQbHVnaW5zIG1ldGhvZFxuICAgKiBAcGFyYW0ge3g6ID8geTo/fSBjb29yZCAtIFN0YXJ0aW5nIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRpY2tDQiAtIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aWNrLiBUaWNrIGNhbGxiYWNrIGlzIGluaXRpYXRlZCBpbiBldmVyeSBmcmFtZS4gU28gbWFwIGRyYXdzIGhhcHBlblxuICAgKiBkdXJpbmcgdGlja3NcbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgaW5pdChwbHVnaW5zLCBjb29yZCwgdGlja0NCKSB7XG4gICAgaWYgKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cblxuICAgIGlmKGNvb3JkKSB7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIueCA9IGNvb3JkLng7XG4gICAgICB0aGlzLm1vbW15TGF5ZXIueSA9IGNvb3JkLnk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3T25OZXh0VGljaygpO1xuICAgIF9kZWZhdWx0VGljayh0aGlzKTtcbiAgICB0aWNrQ0IgJiYgdGhpcy5jdXN0b21UaWNrT24odGlja0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBUaGUgY29ycmVjdCB3YXkgdG8gdXBkYXRlIC8gcmVkcmF3IHRoZSBtYXAuIENoZWNrIGhhcHBlbnMgYXQgZXZlcnkgdGljayBhbmQgdGh1cyBpbiBldmVyeSBmcmFtZS5cbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgZHJhd09uTmV4dFRpY2soKSB7XG4gICAgX2RyYXdNYXBPbk5leHRUaWNrID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBUaGUgY29ycmVjdCB3YXkgdG8gdXBkYXRlIC8gcmVkcmF3IHRoZSBtYXAuIENoZWNrIGhhcHBlbnMgYXQgZXZlcnkgdGljayBhbmQgdGh1cyBpbiBldmVyeSBmcmFtZS5cbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9zdGFnZS5jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIobGF5ZXIgPT4ge1xuICAgICAgcmV0dXJuIGxheWVyW2F0dHJpYnV0ZV0gPT09IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWdlO1xuICB9XG5cbiAgZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xuICB9XG4gIC8qKiBBbGwgcGFyYW1ldGVycyBhcmUgcGFzc2VkIHRvIE1hcF9sYXllciBjb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIGNyZWF0ZWQgTWFwX2xheWVyIGluc3RhbmNlICovXG4gIGFkZExheWVyKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XG4gICAgdmFyIGxheWVyID0gbmV3IE1hcF9sYXllcihuYW1lLCBzdWJDb250YWluZXJzLCBjb29yZCk7XG5cbiAgICB0aGlzLm1vbW15TGF5ZXIuYWRkQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcF9sYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgb2JqZWN0IHRvIGJlIHJlbW92ZWQgKi9cbiAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIucmVtb3ZlQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKiBAcmV0dXJuIGxheWVyIHdpdGggdGhlIHBhc3NlZCBsYXllciBuYW1lICovXG4gIGdldExheWVyTmFtZWQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1vbW15TGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUuIEkuZS4geyB4OiA1LCB5OiAwIH1cbiAgICogd2l0aCB0aGlzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlIGhvcml6b250YWxseSA1IHBpemVscyBhbmQgdmVydGljYWxseSBzdGF5IGF0IHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIG1vdmVNYXAoY29vcmRpbmF0ZXMpIHtcbiAgICB0aGlzLm1vbW15TGF5ZXIubW92ZShjb29yZGluYXRlcyk7XG4gICAgdGhpcy5kcmF3T25OZXh0VGljaygpO1xuICAgIHRoaXMubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogQ2FjaGUgdGhlIG1hcC4gVGhpcyBwcm92aWRlcyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBib29zdCwgd2hlbiB1c2VkIGNvcnJlY3RseS4gY2FjaGVNYXAgaXRlcmF0ZXMgdGhyb3VnaCBhbGwgdGhlXG4gICAqIGxheWVyIG9uIHRoZSBtYXAgYW5kIGNhY2hlcyB0aGUgb25lcyB0aGF0IHJldHVybiB0cnVlIGZyb20gZ2V0Q2FjaGVFbmFibGVkLW1ldGhvZC5cbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgLSBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUuIEkuZS4geyB4OiA1LCB5OiAwIH1cbiAgICogd2l0aCB0aGlzIHdlIHdhbnQgdGhlIG1hcCB0byBtb3ZlIGhvcml6b250YWxseSA1IHBpemVscyBhbmQgdmVydGljYWxseSBzdGF5IGF0IHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGNhY2hlTWFwKCkge1xuICAgIGlmKHRoaXMubW9tbXlMYXllci5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5tb21teUxheWVyLmNhY2hlKDAsIDAsIHRoaXMubWFwU2l6ZS54LCB0aGlzLm1hcFNpemUueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9tbXlMYXllci5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgaWYoY2hpbGQuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgICAgICBjaGlsZC5jYWNoZSgwLCAwLCB0aGlzLm1hcFNpemUueCwgdGhpcy5tYXBTaXplLnkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogaXRlcmF0ZXMgdGhyb3VnaCB0aGUgbWFwIGxheWVycyBhbmQgcmV0dXJucyBtYXRjaGluZyBvYmplY3RzIG9uIGdpdmVuIGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIC0gVGhlIG1hcCBjb29yZGluYXRlIHVuZGVyIHdoaWNoIHdlIHdhbnQgdG8gcmV0cmlldmUgYWxsIHRoZSBvYmplY3RzLlxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXG4gIGdldE9iamVjdHNVbmRlck1hcFBvaW50KGNvb3JkKSB7XG4gICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgIHRoaXMubW9tbXlMYXllci5nZXRPYmplY3RzVW5kZXJQb2ludChjb29yZCk7XG5cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxuICAvKiogUmVzaXplIHRoZSBjYW52YXMgdG8gZmlsbCB0aGUgd2hvbGUgYnJvd3NlciBhcmVhLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNpemUgYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXG4gIHRoZSBldmVudGxpc3RlbmVyIGNhbGxiYWNrIHVzZSB0aGlzLmV2ZW50Q0JzICovXG4gIHRvZ2dsZUZ1bGxTaXplKCkge1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKTtcbiAgfVxuICAvKiogVG9nZ2xlcyBmdWxsc2NyZWVuIG1vZGUuIFVzZXMgdGhpcy5ldmVudENCcy5mdWxsc2NyZWVuIGFzIGNhbGxiYWNrLCBzbyB3aGVuIHlvdSBuZWVkIHRvIG92ZXJ3cml0ZVxuICB0aGUgZXZlbnRsaXN0ZW5lciBjYWxsYmFjayB1c2UgdGhpcy5ldmVudENCcyAqL1xuICB0b2dnbGVGdWxsU2NyZWVuICgpIHtcbiAgICBldmVudGxpc3RlbmVycy50b2dnbGVGdWxsU2NyZWVuKCk7XG4gIH1cbiAgLyoqIEFjdGl2YXRlIHBsdWdpbnMgZm9yIHRoZSBtYXAuIFBsdWdpbnMgbmVlZCAucGx1Z2luTmFtZSBwcm9wZXJ0eSBhbmQgLmluaXQtbWV0aG9kXG4gIEBwYXJhbSBbQXJyYXldIHBsdWdpbnNBcnJheSAtIEFycmF5IHRoYXQgY29uc2lzdHMgb2YgdGhlIHBsdWdpbiBtb2R1bGVzICovXG4gIGFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zQXJyYXkpIHtcbiAgICB2YXIgYWxsUGx1Z2lucyA9IHRoaXMucGx1Z2luc1RvQWN0aXZhdGUuY29uY2F0KHBsdWdpbnNBcnJheSk7XG5cbiAgICBhbGxQbHVnaW5zLmZvckVhY2gocGx1Z2luVG9Vc2UgPT4ge1xuICAgICAgaWYodGhpcy5hY3RpdmF0ZWRQbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5Ub1VzZS5wbHVnaW5OYW1lXSA9IHBsdWdpblRvVXNlO1xuICAgICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luVG9Vc2UucGx1Z2luTmFtZV0uaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRQbHVnaW5zW3BsdWdpblRvVXNlLnBsdWdpbk5hbWVdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbHVnaW5zVG9BY3RpdmF0ZSA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIEN1c3RvbSB0aWNrIGhhbmRsZXIgdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gbWFwLiBUaGUgZGVmYXVsdCB0aWNrIGhhbmRsZXIgaXMgYnkgZGVmYXVsdFxuICBhbHdheXMgb24gYW5kIHdpbGwgbm90IGJlIGFmZmVjdGVkXG4gIEBwYXJhbSBbRnVuY3Rpb25dIHRpY2tDQiAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHVzZSBpbiB0aWNrICovXG4gIGN1c3RvbVRpY2tPbih0aWNrQ0IpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVUaWNrQ0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZXJlIGFscmVhZHkgZXhpc3RzIG9uZSB0aWNrIGNhbGxiYWNrLiBOZWVkIHRvIHJlbW92ZSBpdCBmaXJzdCwgYmVmb3JlIHNldHRpbmcgdXAgYSBuZXcgb25lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVGlja0NCID0gdGlja0NCIHx8IGZ1bmN0aW9uKCkge307XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgdGhpcy5hY3RpdmVUaWNrQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjdXN0b21UaWNrT2ZmKCkge1xuICAgIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmFjdGl2ZVRpY2tDQik7XG5cbiAgICB0aGlzLmFjdGl2ZVRpY2tDQiA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBnZXR0ZXIgYW5kIHNldHRlciBmb3IgZGV0ZWN0aW5nIGlmIG1hcCBpcyBtb3ZlZCBhbmQgc2V0dGluZyB0aGUgbWFwcyBzdGF0dXMgYXMgbW92ZWQgb3Igbm90IG1vdmVkICovXG4gIG1hcE1vdmVkKHllc09yTm8pIHtcbiAgICBpZih5ZXNPck5vICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubWFwSW5Nb3ZlID0geWVzT3JObztcbiAgICAgIHJldHVybiB5ZXNPck5vO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hcEluTW92ZTtcbiAgfVxuICBzZXRQcm90b3R5cGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5fX3Byb3RvX19bcHJvcGVydHldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXG4vKiBUaGlzIGhhbmRsZXMgdGhlIGRlZmF1bHQgZHJhd2luZyBvZiB0aGUgbWFwLCBzbyB0aGF0IG1hcCBhbHdheXMgdXBkYXRlcyB3aGVuIGRyYXdPbk5leHRUaWNrID09PSB0cnVlLiBUaGlzIHRpY2tcbmNhbGxiYWNrIGlzIGFsd2F5cyBzZXQgYW5kIHNob3VsZCBub3QgYmUgcmVtb3ZlZCBvciBvdmVycnVsZWQgKi9cbmZ1bmN0aW9uIF9kZWZhdWx0VGljayhtYXApIHtcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIF90aWNrRnVuYyk7XG5cbiAgcmV0dXJuIF90aWNrRnVuYztcblxuICBmdW5jdGlvbiBfdGlja0Z1bmMoKSB7XG4gICAgaWYoX2RyYXdNYXBPbk5leHRUaWNrID09PSB0cnVlKSB7XG4gICAgICBfZHJhd01hcChtYXApO1xuICAgICAgX2RyYXdNYXBPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4vKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGRyYXcgdGhlIG1hcCAqL1xuZnVuY3Rpb24gX2RyYXdNYXAobWFwKSB7XG4gIG1hcC5fc3RhZ2UudXBkYXRlKCk7XG5cbiAgcmV0dXJuIG1hcDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4qL1xuXG4vKipcbiAqIEB0b2RvIHRoaXMucHJldmVudFNlbGVjdGlvbi4gVGhpcyBzaG91bGQgZGV0ZXJtaW5lIHdldGhlciB0aGlzIHN0YWdlIGhvbGRzIGRhdGEgdGhhdCBjYW4gYmUgc2VsZWN0ZWQgYnkgdGhlIHBsYXllclxuICovXG5cbi8qKlxuICogQHRvZG8gc3ViQ29udGFpbmVycy4gU3ViY29udGFpbmVycyBhcmUgY29udGFpbmVycyBpbnNpZGUgbGF5ZXJzIGRlc2lnbmVkIHRvIGdyb3VwIHVwIG9iamVjdHMgdG8gc21hbGxlciBjb250YWluZXJzLiBTbyBlLmcuXG4gKiBnZXRPYmplY3RzVW5kZXJQb2ludCBpcyBmYXN0ZXIuIFRoaXMgaGFzIG5vdCBiZWVuIGVmZmljaWVudGx5IHRlc3RlZCBmcm9tIHBlcmZvcm1hbmNlIHdpc2Ugc28gdGhlIGZlYXR1cmUgd2lsbCBiZVxuICogYWRkZWQgYWZ0ZXIgdGhlIGJhc2ljIG1hcCBtb2R1bGUgd29ya3MgYW5kIHdlIGNhbiB2ZXJpZnkgdGhlIGVmZmVjdCB3ZWxsICovXG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9sYXllciBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBsYXllciBwcm9wZXJ0eSBuYW1lLCB1c2VkIGZvciBpZGVudGlmaXlpbmcgdGhlIGxheWVyLCB1c2VmdWxsIGluIGRlYnVnZ2luZywgYnV0IHVzZWQgYWxzb1xuICAgKiBvdGhlcndpc2UgdG9vIVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ViQ29udGFpbmVycyBUbyBiZSBpbXBsZW1lbnRlZC4gVGhlIGRhdGEgd2hpY2ggd2UgdXNlIHRvIGRpdmlkZSB0aGUgY29udGFpbmVyIHRvIHN1YkNvbnRhaW5lcnNcbiAgICogZS5nLiBmb3IgbW9yZSBlZmZpY2llbnQgYWNjZXNzaWJpbGl0eSBvZiBvYmplY3RzIGJhc2VkIG9uIGNvb3JkaW5hdGVzLlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCBzdGFydGluZyBjb29yZHMgb2YgbGF5ZXIuIFJlbGF0aXZlIHRvIHBhcmVudCBtYXAgbGF5ZXIuXG4gICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IGNvb3JkID8gKCBjb29yZC54IHx8IDAgKSA6IDA7XG4gICAgdGhpcy55ID0gY29vcmQgPyAoIGNvb3JkLnkgfHwgMCApIDogMDtcbiAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuc3ViQ29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcuIFNob3dzIHVwIGluIHRvU3RyaW5nXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB0aGlzLm1vdmFibGUgPSB0cnVlO1xuICAgIHRoaXMuem9vbWFibGUgPSB0cnVlO1xuICAgIHRoaXMucHJldmVudFNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIC8qKiBzZXR0ZXIgYW5kIGdldHRlclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHN0YXR1cyBJZiBwcm92aWRlZCBzZXRzIHRoZSBjYWNoaW5nIHN0YXR1cyBvdGhlcndpc2UgcmV0dXJucyB0aGUgY3VycmVudCBzdGF0dXMgKi9cbiAgY2FjaGVFbmFibGVkKHN0YXR1cykge1xuICAgIGlmKHN0YXR1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jYWNoZUVuYWJsZWQgPSBzdGF0dXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRW5hYmxlZDtcbiAgfVxuICAvKiogTW92ZSBsYXllclxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZGluYXRlcyBUaGUgYW1vdW50IG9mIHggYW5kIHkgY29vcmRpbmF0ZXMgd2Ugd2FudCB0aGUgbGF5ZXIgdG8gbW92ZS4gSS5lLlxuICAgeyB4OiA1LCB5OiAwIH1cbiAgIEByZXR1cm4gdGhpcyBsYXllciBpbnN0YW5jZSAqL1xuICBtb3ZlKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKHRoaXMubW92YWJsZSkge1xuICAgICAgdGhpcy54ICs9IGNvb3JkaW5hdGVzLng7XG4gICAgICB0aGlzLnkgKz0gY29vcmRpbmF0ZXMueTtcbiAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ2V0Q2hpbGROYW1lZChuYW1lKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBjcmVhdGVqcy5Db250YWluZXIpIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnN1YkNvbnRhaW5lcnM7XG4gIH1cbn1cblxuLyoqXG4gKiBAdG9kbyBpbXBsZW1lbnQgc3ByaXRlQ29udGFpbmVyISBJdCBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgd2hlbiB1c2luZyBzcHJpdGVzaGVldHMuIE9ubHkgaXNzdWUgd2FzIHRoYXQgbWluaWZpZWRcbiAqIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBzcHJpdGVTdGFnZSAoYW5kIHNwcml0ZUNvbnRhaW5lcj8pIGFuZCBuZWl0aGVyIHRoZSBub2RlLWVhc2VsIChhbmQgbm9kZSBkb2Vzbid0IGhhdmUgdGhlIGV4dGVuZCkgKi9cbi8qXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvZXh0ZW5kJztcbmltcG9ydCBwcm9tb3RlIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvY3JlYXRlanMvdXRpbHMvcHJvbW90ZSc7XG5pbXBvcnQgU3ByaXRlQ29udGFpbmVyIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9saWIvZWFzZWxqcy9TcHJpdGVDb250YWluZXIvU3ByaXRlQ29udGFpbmVyJztcblxuZXhwb3J0IGNsYXNzIE1hcF9zcHJpdGVzaGVldExheWVyIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgc3ViQ29udGFpbmVycywgc3ByaXRlc2hlZXQpIHtcbiAgfVxufVxuKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4qL1xuXG4vKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbmV4cG9ydCBjbGFzcyBNYXBfc3RhZ2UgZXh0ZW5kcyBjcmVhdGVqcy5TdGFnZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBsYXllciBwcm9wZXJ0eSBuYW1lLCB1c2VkIGZvciBpZGVudGlmaXlpbmcgdGhlIGxheWVyLCB1c2VmdWxsIGluIGRlYnVnZ2luZywgYnV0IHVzZWQgYWxzb1xuICAgKiBvdGhlcndpc2UgdG9vIVxuICAgKiBAcGFyYW0ge0RPTSBDYW52YXMgZWxlbWVudH0gY2FudmFzIFJFUVVJUkVEISBDYW52YXMgZWxlbWVudCB1c2VkIGJ5IHRoZSBtYXBcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gc3RhZ2VCb3VuZHMgU2V0IHN0YWdlIGJvdW5kcyBiYXNlZCBvbiB0aGVzZSBjb29yZGluYXRlc1xuICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXMsIHN0YWdlQm91bmRzKSB7XG4gICAgaWYoIWNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1hcF9zdGFnZS5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcbiAgICB9XG5cbiAgICBzdXBlcihjYW52YXMpO1xuXG4gICAgaWYoc3RhZ2VCb3VuZHMpIHtcbiAgICAgIHRoaXMuc2V0Qm91bmRzKDAsIDAsIHN0YWdlQm91bmRzLngsIHN0YWdlQm91bmRzLnkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAvKiBjcmVhdGVqcyAvIHN1cGVyIHByb3BlcnRpZXMuIFVzZWQgYWxzbyBmb3IgY29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gIH1cbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xuICBjYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIENoaWxkTmFtZWQobmFtZSkge1xuICAgIGZvciAobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGxldCBjaGlsZDtcblxuICAgICAgaWYgKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQHRvZG8gaW1wbGVtZW50IHNwcml0ZVN0YWdlISBJdCBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgd2hlbiB1c2luZyBzcHJpdGVzaGVldHMuIE9ubHkgaXNzdWUgd2FzIHRoYXQgbWluaWZpZWRcbiAqIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBzcHJpdGVTdGFnZSBhbmQgbmVpdGhlciB0aGUgbm9kZS1lYXNlbCAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogVGhlIGFjdHVhbCBvYmplY3RzIHVzZWQgb24gdGhlIG1hcCAoc3VjaHMgYXMgdGVycmFpbiBhbmQgdW5pdHMpLCB1bmRlciBzdGFnZXMgYW5kIGNvbnRhaW5lcnMuXG5AcGFyYW0ge2NyZWF0ZWpzLlBvaW50fSBjb29yZHMgLSB0aGUgY29vcmRpbmF0ZSB3aGVyZSB0aGUgb2JqZWN0IGlzIGxvY2F0ZWQgYXRcbkBwYXJhbSB7fSBkYXRhIC0gb2JqZWN0cyBkYXRhLCB0aGF0IHdpbGwgYmUgdXNlZCBpbiB0aGUgZ2FtZS4gSXQgd2lsbCBub3QgYWN0dWFsbHkgYmUgbWFpbmx5IHVzZWQgaW4gZ3JhcGhpY2FsXG5idXQgcmF0aGVyIHRoaW5ncyBsaWtlIHVuaXQtZGF0YSBhbmQgY2l0eS1kYXRhIHByZXNlbnRhdGlvbnMgZXRjLlxuQHBhcmFtIHtjcmVhdGVqcy5TcHJpdGVTaGVldH0gc3ByaXRlU2hlZXRcbkBwYXJhbSB7SW50XSBjdXJyRnJhbWVOdW1iZXIgLSB0aGUgY3VycmVudCBmcmFtZXMgbnVtYmVyLiBUaGlzIGlzIGJhc2ljYWxseSB0aGUgaW5pdGlhbCBpbWFnZSwgd2UgY2FuIGNoYW5nZSBpdCBsYXRlclxuZm9yIGFuaW1hdGlvbiBvciBzdWNoXG5cbkFsbCBvZiB0aGUgb2JqZWN0cyBuZWVkIHRvIGhhdmUgc2FtZSBhcmd1bWVudEFQSSBmb3IgY3JlYXRpbmcgb2JqZWN0czogY29vcmRzLCBkYXRhLCBpbWFnZURhdGEgKi9cblxudmFyIGV4dGVuc2lvbnMgPSBbXTtcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGUgZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKSB7XG4gICAgc3VwZXIoc3ByaXRlc2hlZXQpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJPYmplY3RzX3Nwcml0ZV9cIiArIHRoaXMuaWQ7XG4gICAgLyogU2V0IGRhdGEgZm9yIHRoZSBvYmplY3QgbmV4dCAqL1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwge307XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBjdXJyZW50RnJhbWVOdW1iZXI7XG4gICAgLyogRXhlY3V0ZSBpbml0aWFsIGRyYXcgZnVuY3Rpb24gKi9cbiAgICB0aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy5zaGFkb3cgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIC8qKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IGNvb3JkaW5hdGUgeFxuICAgKiBAcGFyYW0ge051bWJlcn0geSBjb29yZGluYXRlIHlcbiAgICogQHJldHVybiB0aGlzIG9iamVjdCBpbnN0YW5jZSAqL1xuICBpbm5lckRyYXcoeCwgeSkge1xuICAgIHRoaXMuZ290b0FuZFN0b3AoIHRoaXMuY3VyckZyYW1lTnVtYmVyICk7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIERyYXdzIG5ldyBmcmFtZSB0byBhbmltYXRlIG9yIHN1Y2hcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGUgeVxuICAgKiBAcGFyYW0ge051bWJlcn0gbmV3RnJhbWVOdW1iZXIgTmV3IGZyYW1lIG51bWJlciB0byBhbmltYXRlIHRvXG4gICAqIEByZXR1cm4gdGhpcyBvYmplY3QgaW5zdGFuY2UgKi9cbiAgZHJhd05ld0ZyYW1lKHgsIHksIG5ld0ZyYW1lTnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyRnJhbWVOdW1iZXIgPSBuZXdGcmFtZU51bWJlcjtcblxuICAgIHJldHVybiB0aGlzLmlubmVyRHJhdyh4LCB5KTtcbiAgfVxufSIsIi8qKiBNYWluIGNsYXNzIGZvciBzaG93aW5nIFVJIG9uIHRoZSBtYXAuIExpa2UgdW5pdCBzZWxlY3Rpb25zIGFuZCBzdWNoLiBIYXMgbm90aGluZyB0byBkbyB3aXRoIHNob3dpbmcgb2ZmLW1hcCBkYXRhLlxuICogR29vZCBleGFtcGxlcyBmb3Igd2hhdCB0aGlzIHNob3dzIGFyZTogc2VsZWN0ZWQgdW5pdHMtbGlzdCwgc2VsZWN0aW9uIGhpZ2hsaWdodCAobGlrZSBhIGNpcmNsZSBvbiB0aGUgc2VsZWN0ZWQgdW5pdCkgYW5kXG4gKiBicmluZ2luZyB0aGUgdW5pdCBvbiB0b3AgaW4gdGhlIG1hcC5cbiAqXG4gKiBAcGFyYW0ge01vZHVsZX0gZ2l2ZW5VSVRoZW1lIHRoZSBtb2R1bGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBVSSB0aGVtZVxuICogQHBhcmFtIHtNYXB9IGdpdmVuTWFwIE1hcCBpbnN0YW5jZSB0aGF0IGlzIHVzZWRcbiAqIEByZXR1cm4gVUkgbW9kdWxlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgYWJzdHJhY3QgVUkgbW9kdWxlIGZvciB0aGUgY29yZSBtYXAgZnVuY3Rpb25hbGl0eS4gVGhpcyBpcyB1c2VkIGJ5IGRlZmluaW5nIFVJIFRoZW1lcyB0aGF0IGltcGxlbWVudCB0aGlzXG4gKiBjb3JlIFVJIG1vZHVsZS5cbiAqIERlZmF1bHQgbWV0aG9kcyB0byB1c2UgaW4gVUkgYXJlOlxuICogc2hvd1NlbGVjdGlvbnMgYW5kIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0LiBNb3JlIG1ldGhvZHMgY2FuIGJlIGV4dGVuZGVkIHRvIFVJIHdpdGggcGx1Z2luc1xuICpcbiAqIEB0b2RvIE5vdCBpbXBsZW1lbnRlZCBmdWxseSB5ZXQgYW5kIHByb2JhYmx5IG5lZWQgcmVmYWN0b3JpbmcgKi9cbnZhciBzY29wZTtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJIChnaXZlblVJVGhlbWUsIGdpdmVuTWFwKSB7XG4gIC8qIFNJTkdMRVRPTiBNT0RVTEUgKi9cbiAgaWYgKHNjb3BlKSB7XG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgaWYgKCFnaXZlblVJVGhlbWUgfHwgIWdpdmVuTWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVUktbW9kdWxlIHJlcXVpcmVzIFVJVGhlbWUgYW5kIG1hcCBvYmplY3RcIik7XG4gIH1cblxuICB2YXIgbWFwID0gZ2l2ZW5NYXA7XG4gIHZhciBVSVRoZW1lID0gZ2l2ZW5VSVRoZW1lO1xuICBzY29wZSA9IHt9O1xuXG4gIC8qKiBSZXNwb25zaWJsZSBmb3Igc2hvd2luZyBzZWxlY3Rpb25nIGVsZW1lbnQsIHdoZXJlIHRoZSBwbGF5ZXIgc2VsZWN0IHRoZSB3YW50ZWQgb2JqZWN0IG91dCBvZiBhcnJheSBvZiBvYmplY3RzLlxuICAgKiBGb3IgZXhhbXBsZSBpZiB0aGVyZSBhcmUgc2V2ZXJhbCBvYmplY3RzIGluIG9uZSB0aWxlIG9uIHRoZSBtYXAgYW5kIHRoZSBwbGF5ZXIgbmVlZHMgdG8gYmUgYWJsZSB0byBzZWxlY3Qgb25lXG4gICAqIHNwZWNpZmljIHVuaXQgb24gdGhlIHN0YWNrICovXG4gIHNjb3BlLnNob3dTZWxlY3Rpb25zID0gZnVuY3Rpb24gc2hvd1NlbGVjdGlvbnMob2JqZWN0cykge1xuICAgIHJldHVybiBVSVRoZW1lLnNob3dTZWxlY3Rpb25zKG1hcCwgb2JqZWN0cyk7XG4gIH07XG4gIC8qKiBSZXNvbnNpYmxlIGZvciBoaWdubGlnaHRpbmcgdGhlIHNlbGVjdGVkIG9iamVjdC4gRm9yIGV4YW1wbGUgdGhlIHVuaXQgdGhhdCBpcyBiZWluZyBjb21tYW5kZWQuIFRoZSBoaWdodGxpZ2h0XG4gICAqIGNhbiBtZWFuIGUuZy4gYnJpbmdpbmcgdGhlIHVuaXQgb24gdG9wIG9uIHRoZSBtYXAgYW5kIHNob3dpbmcgc2VsZWN0aW9uIGNpcmNsZSBhcm91bmQgaXQuICovXG4gIHNjb3BlLmhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0ID0gZnVuY3Rpb24gaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIFVJVGhlbWUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QobWFwLCBvYmplY3QpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSG91c2VzIHRoZSBkZWZhdWx0IGV2ZW50bGlzdGVuZXJzIHVzZWQgaW4gdGhlIG1hcC4gV2hlbiBwbHVnaW5zIGFyZSBhZGRlZCB0byB0aGUgbWFwIHRoaXMgY2xhc3MgY2FuIGJlIHVzZWQgZm9yXG4gKiB0aGUgZXZlbnRsaXN0ZW5lciBtYW5hZ2VtZW50LiBUaGlzIHdheSBhbGwgdGhlIGV2ZW50bGlzdGVuZXJzIGFyZSBpbiB0aGUgc2FtZSBvYmplY3QsIGNvbnZlbmllbnRseS4gKi9cblxudmFyIHNpbmdsZXRvblNjb3BlO1xuXG4vKiA9PT09PSBFWFBPUlQgPT09PT0gKi9cbi8qKlxuICogZXZlbnRMaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24gdGhhdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCB3aXRoIGFuIG9iamVjdCwgdGhhdCBob2xkcyBhbGwgdGhlIGNhbGxiYWNrcyB1c2VkIGluIHRoaXNcbiAqIGNsYXNzLiBJLmUuXG4ge1xuICAgc2VsZWN0OiBmdW5jdGlvbigpIHt9LFxuICAgem9vbTogZnVuY3Rpb24oKSB7fVxuIH0qL1xuZXhwb3J0IGxldCBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJNb2R1bGUobWFwQ0JzKSB7XG4gIGlmKHNpbmdsZXRvblNjb3BlKSB7XG4gICAgcmV0dXJuIHNpbmdsZXRvblNjb3BlO1xuICB9XG5cbiAgc2luZ2xldG9uU2NvcGUgPSB7XG4gICAgc3RhdGVzOiB7fVxuICB9O1xuXG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVGdWxsU2l6ZUxpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSAhPT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWFwQ0JzLmZ1bGxTaXplQ0IpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWFwQ0JzLmZ1bGxTaXplQ0IpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmZ1bGxTaXplID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5mdWxsU2l6ZTtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRnVsbHNjcmVlbiA9IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgcmV0dXJuIG1hcENCcy5mdWxsc2NyZWVuO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVab29tTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVab29tTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnpvb20gIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBtYXBDQnMuem9vbSk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuem9vbTtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRHJhZ0xpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRHJhZ0xpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnICE9PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuZHJhZyk7XG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy5kcmFnO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVTZWxlY3RMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdExpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuc2VsZWN0O1xuICB9O1xuXG4gIHJldHVybiBzaW5nbGV0b25TY29wZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogVGhlIGNvcmUgcGx1Z2luIGZvciB0aGUgMkQgbWFwIGVuZ2luZS4gSGFuZGxlcyBtb3ZpbmcgdGhlIG1hcCBieSBkcmFnZ2luZyB0aGUgbWFwLlxuICogQ29yZSBwbHVnaW5zIGNhbiBhbHdheXMgYmUgb3Zlcndyb3RlIGlmIG5lZWRlZFxuICogQHRvZG8gU2VlIGlmIHRoaXMgcGx1Z2luIG5lZWQgcmVmYWN0b3JpbmcgYW5kIG1vcmUgZG9jdW1lbnRhdGlvbiAqL1xuXG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuZXhwb3J0IGxldCBtYXBfZHJhZyA9IChmdW5jdGlvbiBtYXBfZHJhZygpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIC8qIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuIFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkIGJvdHRvbSAqL1xuICB2YXIgb2Zmc2V0Q29vcmRzID0gX29mZnNldENvb3JkcygpO1xuICB2YXIgZXZlbnRsaXN0ZW5lcnM7XG5cbiAgLyogPT09PT0gRm9yIHRlc3RpbmcgPT09PT0gKi9cbiAgc2NvcGUuX3N0YXJ0RHJhZ0xpc3RlbmVyID0gX3N0YXJ0RHJhZ0xpc3RlbmVyO1xuXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBtYXBfZHJhZy5uYW1lO1xuXG4gIC8qKiBSZXF1aXJlZCBpbml0IGZ1bmN0aW9ucyBmb3IgdGhlIHBsdWdpblxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3QgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMobWFwLmV2ZW50Q0JzKTtcbiAgICBtYXAuZXZlbnRDQnMuZHJhZyA9IF9zdGFydERyYWdMaXN0ZW5lcihtYXApO1xuXG4gICAgLy9tYXAuc2V0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcCkpO1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZURyYWdMaXN0ZW5lcigpO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiogU3RhcnRzIHRoZSB3aG9sZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgY2xhc3NcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX3N0YXJ0RHJhZ0xpc3RlbmVyKCBtYXAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICB4OiBlLngsXG4gICAgICAgICAgeTogZS55XG4gICAgICAgIH0pO1xuICAgICAgICAvKiBXZSB0YWtlIGFsbCB0aGUgZXZlbnRsaXN0ZW5lcnMgdW5iaW5kaW5ncyB0byB0aGlzIGFycmF5LCBzbyB3ZSBjYW4gdW5iaW5kIHRoZW0gd2hlbiB0aGUgbW91c2UgaXMgdXAgKi9cblxuICAgICAgICB2YXIgbW92ZUNhbGxiYWNrMSA9IF9kcmFnTGlzdGVuZXIobWFwKTtcbiAgICAgICAgdmFyIG1vdXNldXBDYWxsYmFjayA9IF9zZXR1cE1vdXNldXBMaXN0ZW5lcihtYXApO1xuICAgICAgICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW92ZUNhbGxiYWNrMSk7XG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cENhbGxiYWNrKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF9zZXR1cE1vdXNldXBMaXN0ZW5lcihtYXApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3ZlQ2FsbGJhY2sxKTtcbiAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICAgICAgX21hcE1vdmVkKG1hcCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvKiBFdmVudCBsaXN0ZW5lcnMgYXJlIGluIHRoZWlyIHNlcGFyYXRlIGZpbGU7IGV2ZW50TGlzdGVuZXJzLmpzICovXG4gICAgICBmdW5jdGlvbiBfZHJhZ0xpc3RlbmVyKG1hcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkcmFnZ2VyKGUpIHtcbiAgICAgICAgICAgIG1hcC5tYXBNb3ZlZCh0cnVlKTtcbiAgICAgICAgICAgIC8qIFNvIHRoYXQgdGhlIGV2ZW50cyB3aWxsIHN0b3Agd2hlbiBtb3VzZSBpcyB1cCwgZXZlbiB0aG91Z2ggbW91c2V1cCBldmVudCB3b3VsZG4ndCBmaXJlICovXG4gICAgICAgICAgICBpZihlLmJ1dHRvbnMgPT09IDApIHtcbiAgICAgICAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdmVDYWxsYmFjazEpO1xuICAgICAgICAgICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBDYWxsYmFjayk7XG4gICAgICAgICAgICAgIF9tYXBNb3ZlZChtYXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0Q29vcmRzLmdldE9mZnNldCgpO1xuICAgICAgICAgICAgdmFyIG1vdmVkID0ge1xuICAgICAgICAgICAgICB4OiBlLnggLSBvZmZzZXQueCxcbiAgICAgICAgICAgICAgeTogZS55IC0gb2Zmc2V0LnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmKG1vdmVkLnggIT09IDAgfHwgbW92ZWQueSAhPT0gMCkge1xuICAgICAgICAgICAgICBtYXAubW92ZU1hcChtb3ZlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXRDb29yZHMuc2V0T2Zmc2V0KHtcbiAgICAgICAgICAgICAgeDogZS54LFxuICAgICAgICAgICAgICB5OiBlLnlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBUaGUgbW91c2UgaGFzIGJlZW4gbW92ZWQgYWZ0ZXIgcHJlc3NpbmcuIFRoaXMgcHJldmVudCB0aGUgY2xpY2tcbiAgICAgICAgICAgICAgZXZlbnQgdG8gZmlyZSBhdCB0aGUgc2FtZSB0aW1lIHdpdGggdGhlIG1vdXNlRG93biAvIGRyYWdnaW5nIGV2ZW50XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy9tYXAubW91c2VNb3ZlZCggdHJ1ZSApO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKiA9PT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09ICovXG4gIC8qKiBGdW5jdGlvbiBmb3Igc2V0dGluZyBhbmQgZ2V0dGluZyB0aGUgbW91c2Ugb2Zmc2V0LiAqL1xuICBmdW5jdGlvbiBfb2Zmc2V0Q29vcmRzKCkge1xuICAgIHZhciBzY29wZSA9IHt9O1xuICAgIHZhciBvZmZzZXRDb29yZHM7XG5cbiAgICBzY29wZS5zZXRPZmZzZXQgPSBmdW5jdGlvbiBzZXRPZmZzZXQoY29vcmRzKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzID0gY29vcmRzO1xuICAgIH07XG4gICAgc2NvcGUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gZ2V0T2Zmc2V0KCkge1xuICAgICAgcmV0dXJuIG9mZnNldENvb3JkcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNjb3BlO1xuICB9O1xufSkoKTtcblxuLyogV2l0aG91dCB0aGlzLCB0aGUgb3RoZXIgZXZlbnRMaXN0ZW5lcnMgbWlnaHQgZmlyZSBpbmFwcHJvcHJpYXRlIGV2ZW50cy4gKi9cbmZ1bmN0aW9uIF9tYXBNb3ZlZChtYXApIHtcbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgbWFwLm1hcE1vdmVkKGZhbHNlKTtcbiAgfSwgMSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vT2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdGVycmFpbiBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdFwiO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vT2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpIHtcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsIHNwcml0ZVNoZWV0LCBjdXJyRnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VW5pdE9iamVjdHNcIjtcbiAgICB0aGlzLmFjdGlvbnMgPSB7XG4gICAgICBtb3ZlOiBbXSxcbiAgICAgIGF0dGFjazogW11cbiAgICB9O1xuICB9XG4gIGRvQWN0aW9uKHR5cGUpIHtcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0uZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfSk7XG4gIH1cbiAgYWRkQWN0aW9uVHlwZSh0eXBlKSB7XG4gICAgdGhpcy5hY3Rpb25zW3R5cGVdID0gdGhpcy5hY3Rpb25zW3R5cGVdIHx8IFtdO1xuICB9XG4gIGFkZENhbGxiYWNrVG9BY3Rpb24odHlwZSwgY2IpIHtcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0ucHVzaChjYik7XG4gIH1cbn0iLCIvKiogV2Ugd2FudCB0byBwdXQgc3ByaXRlc2hlZXRzIHRvIHRoZWlyIG93biBtb2R1bGUsIHNvIHRoZXkgYXJlIHNlcGFyYXRlZCBhbmQgZS5nLiB3ZSBjYW4gcmVtb3ZlIGNyZWF0ZWpzIGZyb20gdGhlXG4gKiBzcHJpdGVzaGVldCBpZiBuZWVkZWQgKi9cblxuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IGhhc2ggZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG52YXIgYWxsU3ByaXRlc2hlZXRzID0ge307XG5cbi8qIFNpbmdsZXRvbiBzbyB3ZSBkb24ndCB1c2UgY2xhc3MgZGVmaW5pdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZXNoZWV0TGlzdCAoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBDcmVhdGUgbmV3IHNwcml0ZXNoZWV0IChuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoKSkgYW5kIGtlZXBzIGl0IGluIG9iamVjdCBjb2xsZWN0aW9uLiBTbyB3ZSBkb24ndCBjcmVhdGUgYWNjaWRlbi1cbiAgICogdGFsbHkgYW5vdGhlciBvbmUgYW5kIHdlIGNhbiBzYWZlbHkgcmVtb3ZlIGl0IGxhdGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ByaXRlc2hlZXREYXRhIE9iamVjdCB0aGF0IGNvbnRhaW5zIGNyZWF0ZWpzLWNvbXBhdGlibGUgc3ByaXRlc2hlZXREYXRhXG4gICAqIEByZXR1cm4gbmV3IHNwcml0ZXNoZWV0IGluc3RhbmNlIHRvIHVzZS4gKi9cbiAgc2NvcGUuY3JlYXRlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiBjcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpIHtcbiAgICB2YXIgc3ByaXRlU2hlZXQ7XG4gICAgdmFyIElEID0gc2NvcGUuZ2V0U3ByaXRlc2hlZXRJRChzcHJpdGVzaGVldERhdGEuaW1hZ2VzKTtcblxuICAgIGlmICggYWxsU3ByaXRlc2hlZXRzW0lEXSApIHtcbiAgICAgIHJldHVybiBhbGxTcHJpdGVzaGVldHNbSURdO1xuICAgIH1cblxuICAgIHNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHNwcml0ZXNoZWV0RGF0YSk7XG4gICAgYWxsU3ByaXRlc2hlZXRzW0lEXSA9IHNwcml0ZVNoZWV0O1xuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0O1xuICB9O1xuICAvKiogR2VuZXJhdGVzIGlkZW50aWZpZXIgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygc3ByaXRlc2hlZXRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzcHJpdGVzaGVldERhdGEgc3ByaXRlc2hlZXREYXRhIHRoYXQgaXMgdXNlZFxuICAgKiBAcmV0dXJuIGdlbmVyYXRlZCBoYXNoIGlkZW50aWZpZXIgZm9yIHNwcml0ZXNoZWV0ICovXG4gIHNjb3BlLmdldFNwcml0ZXNoZWV0SUQgPSBmdW5jdGlvbiBnZXRTcHJpdGVzaGVldElEKHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHJldHVybiBoYXNoLm1kNShzcHJpdGVzaGVldERhdGEpO1xuICB9O1xuICBzY29wZS5yZW1vdmVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIHJlbW92ZVNwcml0ZXNoZWV0KHNwcml0ZXNoZWV0RGF0YSkge1xuICAgIHZhciBJRCA9IHNjb3BlLmdldFNwcml0ZXNoZWV0SUQoc3ByaXRlc2hlZXREYXRhKTtcbiAgICBkZWxldGUgYWxsU3ByaXRlc2hlZXRzW0lEXTtcbiAgfTtcbiAgc2NvcGUuZ2V0QWxsU3ByaXRlc2hlZXRzID0gZnVuY3Rpb24gZ2V0QWxsU3ByaXRlc2hlZXRzICgpIHtcbiAgICByZXR1cm4gYWxsU3ByaXRlc2hlZXRzO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgY29yZSB1dGlscyBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuICovXG5cbmV4cG9ydCB2YXIgbW91c2VVdGlscyA9ICggZnVuY3Rpb24gbW91c2VVdGlscygpIHtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgLyoqIFRoaXMgZnVuY3Rpb24gaXMgZnJvbTogaHR0cDovL3d3dy5hZG9tYXMub3JnL2phdmFzY3JpcHQtbW91c2Utd2hlZWwvXG4gICAgSXQgZGV0ZWN0cyB3aGljaCB3YXkgdGhlIG1vdXNld2hlZWwgaGFzIGJlZW4gbW92ZWQuXG4gICAgemVybyBkZWx0YSA9IG1vdXNlIHdoZWVsIG5vdCBtb3ZlZFxuICAgIHBvc2l0aXZlIGRlbHRhID0gc2Nyb2xsZWQgdXBcbiAgICBuZWdhdGl2ZSBkZWx0YSA9IHNjcm9sbGVkIGRvd25cblxuICAgIEBwYXJhbSB7RXZlbnR9IGV2ZW50IHBhc3MgdGhlIGV2ZW50IHRvIGRlbHRhRnJvbVdoZWVsXG4gICAgQHJldHVybiBkZWx0YS4gUG9zaXRpdmUgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIHVwLCBhbmQgbmVnYXRpdmUsIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCBkb3duLiAqL1xuICBzY29wZS5kZWx0YUZyb21XaGVlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgdmFyIGRlbHRhID0gMDtcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cblxuICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgKSB7IC8qIElFL09wZXJhLiAqL1xuICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCApIHsgLyoqIE1vemlsbGEgY2FzZS4gKi9cbiAgICAgICAgLyogSW4gTW96aWxsYSwgc2lnbiBvZiBkZWx0YSBpcyBkaWZmZXJlbnQgdGhhbiBpbiBJRS5cbiAgICAgICAgICogQWxzbywgZGVsdGEgaXMgbXVsdGlwbGUgb2YgMy4gKi9cbiAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMztcbiAgICAgfVxuICAgICAvKiBQcmV2ZW50IGRlZmF1bHQgYWN0aW9ucyBjYXVzZWQgYnkgbW91c2Ugd2hlZWwuIEl0IG1pZ2h0IGJlIHVnbHkgKi9cbiAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxuICAgICB3aGVlbCB3YXMgc2Nyb2xsZWQgdXAsIGFuZCBuZWdhdGl2ZSwgaWYgd2hlZWwgd2FzIHNjcm9sbGVkIGRvd24uICovXG4gICAgIGlmICggZGVsdGEgKSByZXR1cm4gZGVsdGE7XG4gIH07XG4gIC8qKiBIYXMgdGhlIG1vdXNlIGNsaWNrIGJlZW4gcmlnaHQgbW91c2UgYnV0dG9uXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB3aGVyZSB0aGUgY2xpY2sgb2NjdXJlZCAqL1xuICBzY29wZS5pc1JpZ2h0Q2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgIHZhciByaWdodGNsaWNrO1xuXG4gICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuICAgICBpZiAoIGV2ZW50LmJ1dHRvbnMgKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b25zID09IDIgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LndoaWNoICkgcmlnaHRjbGljayA9ICggZXZlbnQud2hpY2ggPT0gMyApO1xuICAgICBlbHNlIGlmICggZXZlbnQuYnV0dG9uICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9uID09IDIgKTtcblxuICAgICBpZiAoIHJpZ2h0Y2xpY2sgKSByZXR1cm4gdHJ1ZTtcblxuICAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIHJldHVybiBzY29wZTtcbn0gKSgpO1xuZXhwb3J0IHZhciByZXNpemVVdGlscyA9IHtcbiAgdG9nZ2xlRnVsbFNjcmVlbjogZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmJvZHk7IC8vIE1ha2UgdGhlIGJvZHkgZ28gZnVsbCBzY3JlZW4uXG4gICAgdmFyIGlzSW5GdWxsU2NyZWVuID0gKCBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAmJiBkb2N1bWVudC5mdWxsU2NyZWVuRWxlbWVudCAhPT0gbnVsbCApIHx8XG4gICAgICAgKFxuICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuICk7XG5cbiAgICBpc0luRnVsbFNjcmVlbiA/IGNhbmNlbEZ1bGxTY3JlZW4oIGRvY3VtZW50ICkgOiByZXF1ZXN0RnVsbFNjcmVlbiggZWxlbSApO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU3ViIGZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGNhbmNlbEZ1bGxTY3JlZW4oIGVsICkge1xuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwuY2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdENhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tb3pDYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwuZXhpdEZ1bGxzY3JlZW47XG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBjYW5jZWwgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0RnVsbFNjcmVlbiggZWwgKSB7XG4gICAgICAgLy8gU3VwcG9ydHMgbW9zdCBicm93c2VycyBhbmQgdGhlaXIgdmVyc2lvbnMuXG4gICAgICAgdmFyIHJlcXVlc3RNZXRob2QgPSBlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC5tc1JlcXVlc3RGdWxsU2NyZWVuO1xuXG4gICAgICAgaWYgKCByZXF1ZXN0TWV0aG9kICkgeyAvLyBOYXRpdmUgZnVsbCBzY3JlZW4uXG4gICAgICAgICAgcmVxdWVzdE1ldGhvZC5jYWxsKCBlbCApO1xuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXG4gICAgICAgICAgdmFyIHdzY3JpcHQgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJXU2NyaXB0LlNoZWxsXCIgKTtcbiAgICAgICAgICB3c2NyaXB0ICE9PSBudWxsICYmIHdzY3JpcHQuU2VuZEtleXMoIFwie0YxMX1cIiApO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvKiogU2V0cyBjYW52YXMgc2l6ZSB0byBtYXhpbXVtIHdpZHRoIGFuZCBoZWlnaHQgb24gdGhlIGJyb3dzZXIsIG5vdCB1c2luZyBmdWxsc2NyZWVuXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudCBDYW52YXMgY29udGV4dH0gY29udGV4dCAqL1xuICBzZXRUb0Z1bGxTaXplOiBmdW5jdGlvbiBzZXRUb0Z1bGxTaXplKGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZnVsbFNpemUoKSB7XG4gICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH07XG4gIH1cbn07XG5cbi8qKiBVdGlscyBmb3IgYWRkaW5nIGV2ZW50IGhhbmRsZXJzIG9uIHRoZSBtYXAgYW5kIGtlZXBpbmcgdHJhY2sgb2YgdGhlbS5cbiAqIEB0b2RvIEdvIG92ZXIgdGhlIG1vZHVsZSBhbmQgc2VlIGlmIGl0IGlzIHJlYWxseSBuZWVkZWQgb3Igc2hvdWxkIGJlIGNoYW5nZWQuIE1pZ2h0IGJlIGxlZ2FjeSBhbmQgbm90IG5lZWRlZCBub3cgKi9cbmV4cG9ydCB2YXIgbGlzdGVuZXJzID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBMSVNURU5FUl9UWVBFUyA9IHtcbiAgICBcIm1vdXNlbW92ZVwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2Vtb3ZlXCJcbiAgICB9LFxuICAgIFwibW91c2V1cFwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2V1cFwiXG4gICAgfSxcbiAgICBcIm1vdXNlZG93blwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwibW91c2Vkb3duXCJcbiAgICB9LFxuICAgIFwibW91c2V3aGVlbFwiOiB7XG4gICAgICBlbGVtZW50OiBcImNhbnZhc1wiLFxuICAgICAgZXZlbnQ6IFwid2hlZWxcIlxuICAgIH0sXG4gICAgXCJtb3VzZWNsaWNrXCI6IHtcbiAgICAgIGVsZW1lbnQ6IFwiY2FudmFzXCIsXG4gICAgICBldmVudDogXCJjbGlja1wiXG4gICAgfSxcbiAgfTtcbiAgdmFyIF9ldmVudExpc3RlbmVycyA9IF9nZXRFbXB0eUV2ZW50TGlzdGVuZXJBcnJheSgpO1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICBzY29wZS5zZXRPbmUgPSBmdW5jdGlvbiBzZXRPbmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIC8qIFRoZXJlIGhhcyBiZWVuIHNldmVyYWwgZGlmZmVyZW50IG1vdXNld2hlZWwgZXZlbnRzIGJlZm9yZSwgYnV0IG5vdyBhbGwgZXhjZXB0IG9wZXJhIHNob3VsZCBzdXBwb3J0IFwid2hlZWxcIiAqL1xuICAgIF9ldmVudExpc3RlbmVyc1thY3Rpb25dLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXNbTElTVEVORVJfVFlQRVNbYWN0aW9uXS5lbGVtZW50XS5hZGRFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW2FjdGlvbl0uZXZlbnQsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBzY29wZS5yZW1vdmVPbmUgPSBmdW5jdGlvbiByZW1vdmVPbmUodHlwZSwgb3JpZ0NhbGxiYWNrKSB7XG5cbiAgICBpZih0eXBlb2YgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGlmKG9yaWdDYWxsYmFjaykge1xuICAgICAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW3R5cGVdLmVsZW1lbnRdLnJlbW92ZUV2ZW50TGlzdGVuZXIoTElTVEVORVJfVFlQRVNbdHlwZV0uZXZlbnQsIG9yaWdDYWxsYmFjayk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2FsbGJhY2sgc3BlY2lmaWVkISAtIDFcIik7XG4gICAgfSBlbHNlIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICB0eXBlLmZvckVhY2godGhpc1R5cGUgPT4ge1xuICAgICAgICBpZihvcmlnQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzW0xJU1RFTkVSX1RZUEVTW3RoaXNUeXBlXS5lbGVtZW50XS5yZW1vdmVFdmVudExpc3RlbmVyKExJU1RFTkVSX1RZUEVTW3RoaXNUeXBlXS5ldmVudCwgb3JpZ0NhbGxiYWNrKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjYWxsYmFjayBzcGVjaWZpZWQhIC0gMlwiKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiBQUklWQVRFIGZ1bmN0aW9ucyAqL1xuICBmdW5jdGlvbiBfZ2V0RW1wdHlFdmVudExpc3RlbmVyQXJyYXkoKSB7XG4gICAgdmFyIG9iamVjdHMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKExJU1RFTkVSX1RZUEVTKS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgIG9iamVjdHNbdHlwZV0gPSBbXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG59KSgpOyIsIid1c2VyIHN0cmljdCc7XG5cbi8qKiBUaGUgY29yZSBwbHVnaW4gZm9yIHRoZSAyRCBtYXAgZW5naW5lLiBIYW5kbGVzIHpvb21pbmcgZm9yIHRoZSBtYXAuIENvcmUgcGx1Z2lucyBjYW4gYWx3YXlzIGJlIG92ZXJ3cm90ZSBpZiBuZWVkZWQgKi9cblxuLyoqID09PT09IE9XTiBpbXBvcnRzID09PT09ICovXG5pbXBvcnQgeyBtb3VzZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBldmVudExpc3RlbmVycyB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuZXhwb3J0IGxldCBtYXBfem9vbSA9IChmdW5jdGlvbiBtYXBfem9vbSgpIHtcbiAgdmFyIHNjb3BlID0ge307XG4gIC8qIE1heGltdW0gYW5kIG1pbmltdW0gdGhlIHBsYXllciBjYW4gem9vbXQgaGUgbWFwICovXG4gIHZhciB6b29tTGltaXQgPSB7XG4gICAgZmFydGhlcjogMC40LFxuICAgIGNsb3NlciA6IDIuNVxuICB9O1xuICAvKiBIb3cgbXVjaCBvbmUgc3RlcCBvZiB6b29taW5nIGFmZmVjdHM6ICovXG4gIHZhciB6b29tTW9kaWZpZXIgPSAwLjE7XG4gIHZhciBldmVudGxpc3RlbmVycztcbiAgc2NvcGUucGx1Z2luTmFtZSA9IG1hcF96b29tLm5hbWU7XG5cbiAgLyoqIFJlcXVpcmVkIGluaXQgZnVuY3Rpb25zIGZvciB0aGUgcGx1Z2luXG4gICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdCAqL1xuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwKSB7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21JblwiLCB6b29tSW4pO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJ6b29tT3V0XCIsIHpvb21PdXQpO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJzZXRab29tTGltaXRzXCIsIHNldFpvb21MaW1pdHMpO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJzZXRab29tTW9kaWZpZXJcIiwgc2V0Wm9vbU1vZGlmaWVyKTtcblxuICAgIG1hcC5ldmVudENCcy56b29tID0gX3NldHVwWm9vbUV2ZW50KG1hcCk7XG5cbiAgICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKG1hcC5ldmVudENCcyk7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlWm9vbUxpc3RlbmVyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHNjb3BlO1xuXG4gIC8qID09PT0gUFJPVE9UWVBFIGV4dGVuc2lvbnMgZm9yIG1hcCAqL1xuICAvKiogSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tcyAqL1xuICBmdW5jdGlvbiBzZXRab29tTW9kaWZpZXIgKGFtb3VudCkge1xuICAgIHpvb21Nb2RpZmllciA9IGFtb3VudDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBIb3cgbXVjaCBjYW4gYmUgem9vbWVkIGluIG1heGltdW0gYW5kIG1pbmltdW1cbiAgICogQHBhcmFtIHtOdW1iZXIgMSt9IGZhcnRoZXIgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMgb3V0XG4gICAqIEBwYXJhbSB7TnVtYmVyIDAgLSAxfSBjbG9zZXIgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMgaW4gKi9cbiAgZnVuY3Rpb24gc2V0Wm9vbUxpbWl0cyAoZmFydGhlciwgY2xvc2VyKSB7XG4gICAgem9vbUxpbWl0LmZhcnRoZXIgPSBmYXJ0aGVyO1xuICAgIHpvb21MaW1pdC5jbG9zZXIgPSBjbG9zZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogWm9vbSBpbiB0byB0aGUgbWFwXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgaG93IG11Y2ggbWFwIGlzIHpvb21lZCBpbiAqL1xuICBmdW5jdGlvbiB6b29tSW4gKGFtb3VudCkge1xuICAgIGlmKF9pc092ZXJab29tTGltaXQoIGFtb3VudCApIClcblxuICAgIHRoaXMuZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoXCJ6b29tYWJsZVwiLCB0cnVlKS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGxheWVyLnNjYWxlWCAtPSB6b29tTW9kaWZpZXI7XG4gICAgICBsYXllci5zY2FsZVkgLT0gem9vbU1vZGlmaWVyO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFpvb20gb3V0IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBob3cgbXVjaCBtYXAgaXMgem9vbWVkIG91dCAqL1xuICBmdW5jdGlvbiB6b29tT3V0IChhbW91bnQpIHtcbiAgICBpZihfaXNPdmVyWm9vbUxpbWl0KCBhbW91bnQgKSApXG5cbiAgICB0aGlzLmdldExheWVyc1dpdGhBdHRyaWJ1dGVzKFwiem9vbWFibGVcIiwgdHJ1ZSkuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICBsYXllci5zY2FsZVggKz0gem9vbU1vZGlmaWVyO1xuICAgICAgbGF5ZXIuc2NhbGVZICs9IHpvb21Nb2RpZmllcjtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbiAgZnVuY3Rpb24gX2lzT3Zlclpvb21MaW1pdChhbW91bnQpIHtcbiAgICBpZihhbW91bnQgPiB6b29tTGltaXQuZmFydGhlciAmJiBhbW91bnQgPCB6b29tTGltaXQuY2xvc2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gX3NldHVwWm9vbUV2ZW50KG1hcCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnQoZXZlbnQpIHtcbiAgICAgIHZhciBtb3VzZVdoZWVsRGVsdGEgPSBtb3VzZVV0aWxzLmRlbHRhRnJvbVdoZWVsKGV2ZW50KTtcblxuICAgICAgaWYobW91c2VXaGVlbERlbHRhID4gMCkge1xuICAgICAgICBtYXAuem9vbUluKCk7XG4gICAgICB9IGVsc2UgaWYobW91c2VXaGVlbERlbHRhIDwgMCkge1xuICAgICAgICBtYXAuem9vbU91dCgpO1xuICAgICAgfVxuXG4gICAgICBtYXAuZHJhd09uTmV4dFRpY2soKTtcbiAgICB9O1xuICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vLi4vLi4vLi4vbG9nZ2VyL2xvZy5qc1wiO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2V2ZW50bGlzdGVuZXJzJztcblxuLyogZXZlbnRsaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24sIHNvIHdlIG1pZ2h0IGFzIHdlbGwgZGVjbGFyZSBpdCBoZXJlICovXG52YXIgZXZlbnRsaXN0ZW5lcnM7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEhleGFnb25DbGljayhtYXAsIGNhbGxiYWNrKSB7XG4gIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMobWFwLmV2ZW50Q0JzKTtcblxuICBtYXAuZXZlbnRDQnMuc2VsZWN0ID0gbW91c2VEb3duTGlzdGVuZXI7XG4gIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZVNlbGVjdExpc3RlbmVyKCk7XG5cbiAgLy9yZXR1cm4gb25Nb3VzZURvd24obWFwLCBjYWxsYmFjayk7XG5cbiAgcmV0dXJuIGZhbHNlO1xuXG4gIGZ1bmN0aW9uIG1vdXNlRG93bkxpc3RlbmVyKCkge1xuICAgIG9uTW91c2VVcChtYXAsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbk1vdXNlVXAobWFwLCBjYWxsYmFjaykge1xuICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcblxuICBmdW5jdGlvbiByZXRyaWV2ZUNsaWNrRGF0YShlKSB7XG4gICAgaWYoIG1hcC5tYXBNb3ZlZCgpICkge1xuICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCByZXRyaWV2ZUNsaWNrRGF0YSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBnbG9iYWxDb29yZHMgPSAge3g6IGUueCwgeTogZS55IH07XG4gICAgdmFyIG9iamVjdHM7XG5cbiAgICBvYmplY3RzID0gbWFwLmdldE9iamVjdHNVbmRlck1hcFBvaW50KGdsb2JhbENvb3Jkcyk7XG5cbiAgICBpZiAob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrKG9iamVjdHMpO1xuICAgIH1cblxuICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcmV0cmlldmVDbGlja0RhdGEpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBjcmVhdGVIZXhhZ29uIH0gZnJvbSAnLi4vdXRpbHMvY3JlYXRlSGV4YWdvbic7XG5pbXBvcnQgaGV4YWdvbk1hdGggZnJvbSAnLi4vdXRpbHMvaGV4YWdvbk1hdGgnO1xuXG52YXIgc2hhcGU7XG5cbmV4cG9ydCB2YXIgb2JqZWN0X3Nwcml0ZV9oZXhhID0ge1xuICBidWlsZDogZnVuY3Rpb24gY2FsY3VsYXRlSGV4YShyYWRpdXMpIHtcbiAgICAgIGlmICghcmFkaXVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgcmFkaXVzIVwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgSEVJR0hUID0gaGV4YWdvbk1hdGguY2FsY0hlaWdodChyYWRpdXMpO1xuICAgICAgY29uc3QgU0lERSA9IGhleGFnb25NYXRoLmNhbGNTaWRlKHJhZGl1cyk7XG5cbiAgICAgIHZhciBoZXhhZ29uU2l6ZSA9IGhleGFnb25NYXRoLmdldEhleGFTaXplKHJhZGl1cyk7XG4gICAgICB0aGlzLnJlZ1ggPSBoZXhhZ29uU2l6ZS54IC8gMjtcbiAgICAgIHRoaXMucmVnWSA9IGhleGFnb25TaXplLnkgLyAyO1xuICAgICAgdGhpcy5IRUlHSFQgPSBIRUlHSFQ7XG4gICAgICB0aGlzLlNJREUgPSBTSURFO1xuXG4gICAgICAvKiBEcmF3IGhleGFnb24gdG8gdGVzdCB0aGUgaGl0cyB3aXRoIGhpdEFyZWEgKi9cbiAgICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKHJhZGl1cyk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc2V0QW5kR2V0U2hhcGUocmFkaXVzKSB7XG4gIGlmICghc2hhcGUpIHtcbiAgICBsZXQgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgIC8qIHggYW5kIHkgYXJlIHJldmVyc2VkLCBzaW5jZSB0aGlzIGlzIGhvcml6b250YWwgaGV4YWdvbiBhbmQgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgKi9cbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24oeyB4OiBoZXhhZ29uU2l6ZS55IC8gMiwgeTogaGV4YWdvblNpemUueCAvIDIgfSwgcmFkaXVzKTtcbiAgfVxuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IG9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vT2JqZWN0X2hleGEnO1xuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV90ZXJyYWluIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9vYmplY3RzL09iamVjdF9zcHJpdGVfdGVycmFpbic7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RfdGVycmFpbiBleHRlbmRzIE9iamVjdF9zcHJpdGVfdGVycmFpbiB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyLCBleHRyYSA9IHtyYWRpdXM6IDAgfSkge1xuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgIHNwcml0ZXNoZWV0LCBjdXJyZW50RnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdF9oZXhhXCI7XG5cbiAgICBvYmplY3Rfc3ByaXRlX2hleGEuYnVpbGQuY2FsbCh0aGlzLCBleHRyYS5yYWRpdXMpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBvYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL09iamVjdF9oZXhhJztcbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfdW5pdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvb2JqZWN0cy9PYmplY3Rfc3ByaXRlX3VuaXQnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3VuaXQgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX3VuaXQge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCAgc3ByaXRlc2hlZXQsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7cmFkaXVzOiAwIH0pIHtcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsICBzcHJpdGVzaGVldCwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzX2hleGFcIjtcblxuICAgIG9iamVjdF9zcHJpdGVfaGV4YS5idWlsZC5jYWxsKHRoaXMsIGV4dHJhLnJhZGl1cyk7XG4gIH1cbn0iLCIvKkNhbGN1bGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRlciBoZXhhZ29uIGFsd2F5cyBhbmQgZ2V0IG9iamVjdHMgYmFzZWQgb24gdGhlIGNvb3JkaW5hdGVzLiBGb3IgZXhhbXBsZSB3aXRoXG4gIHNvbWUgbWV0aG9kIGxpa2UgZ2V0QWxsT2JqZWN0c0luSGV4YWdvbi5cblNPOlxuV2UgY3JlYXRlIGEgZnVuY3Rpb24gZm9yIGxheWVycywgbGlrZSBcIm1hcF91dGlsc19oZXhhZ29uPyAtPiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrKHgseSksIGdldE9iamVjdHNJbkhleGFnb24oaGV4YWdvbj8pXCJcbi0gVGhlcmUgd2Ugb25seSBmaW5kIG91dCBhYm91dCB0aGUgY29vcmRpbmF0ZXMgZm9yIHRoZSBvYmplY3QsIHdlIGRvbnQgdXNlIGdldE9CamVjdFVuZGVyUG9pbnQuIElmIHRoZSBjb29yZHMgZXF1YWwgdG9cbnRob3NlIGdvdHRlbiBmcm9tOiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrLCB0aGVuIHRoYXQgb2JqZWN0IGlzIGFkZGVkIHRvIHJldHVybmVkIGFycmF5LiBXZSBjYW4gYWxzbyBjYWNoZSB0aGVzZSBpZlxubmVlZGVkIGZvciBwZXJmb3JtYW5jZVxuXG5IT1cgd2UgZG8gdGhlIHdob2xlIG9yZ2FuaXphdGlvbmFsIHN0dWZmP1xuLSBtYXBfbW92ZVxuLSBtYXBfdXRpbHNfaGV4YWdvbj8gLT4gZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljayh4LHkpLCBnZXRPYmplY3RzSW5IZXhhZ29uKGhleGFnb24/KVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCB7IG1hcF9jb29yZHNfaG9yaXpvbnRhbEhleCB9IGZyb20gJy4uL2Nvb3JkaW5hdGVzL01hcF9jb29yZHNfaG9yaXpvbnRhbEhleCc7XG5pbXBvcnQgeyBzZXR1cEhleGFnb25DbGljayB9IGZyb20gJy4uL2V2ZW50TGlzdGVuZXJzL3NlbGVjdCc7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvVUknO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9NYXBfbGF5ZXInO1xuXG5leHBvcnQgbGV0IG9iamVjdF9zZWxlY3RfaGV4YWdvbiA9IChmdW5jdGlvbiBvYmplY3Rfc2VsZWN0X2hleGFnb24oKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICBzY29wZS5wbHVnaW5OYW1lID0gXCJvYmplY3Rfc2VsZWN0XCI7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXBPYmopIHtcbiAgICAvKiBXZSB0YWtlIHRoZSB0b3AtbW9zdCBzdGFnZSBvbiB0aGUgbWFwIGFuZCBhZGQgdGhlIGxpc3RlbmVyIHRvIGl0ICovXG4gICAgX2NyZWF0ZVByb3RvdHlwZXMobWFwT2JqKTtcblxuICAgIF9zdGFydENsaWNrTGlzdGVuZXIobWFwT2JqKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0Zvck1hcChjbGlja0Nvb3Jkcykge1xuICAgIHZhciBvYmplY3RzID0gdGhpcy5fc3RhZ2UuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY2xpY2tDb29yZHMueCwgY2xpY2tDb29yZHMueSk7XG5cbiAgICByZXR1cm4gb2JqZWN0cztcbiAgfVxuICBmdW5jdGlvbiBnZXRPYmplY3RzRm9yTGF5ZXIoY2xpY2tDb29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC54ID09PSBjbGlja0Nvb3Jkcy54ICYmIGNoaWxkLnkgPT09IGNsaWNrQ29vcmRzLnkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICAvKiA9PT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09ICovXG4gIC8qKlxuICAgKiBBdHRhY2hlZCB0aGUgY29ycmVjdCBwcm90b3R5cGVzIHRvIG1hcC4gSSBkbyBub3QgdGhpbmsgd2UgbmVlZCB0byBvdmVycmlkZSBnZXRPYmplY3RzVW5kZXJQb2ludCBmb3Igc3RhZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfY3JlYXRlUHJvdG90eXBlcyhtYXApIHtcbiAgICBtYXAuX19wcm90b19fLmdldE9iamVjdHNVbmRlck1hcFBvaW50ID0gZ2V0T2JqZWN0c0Zvck1hcDtcbiAgICBNYXBfbGF5ZXIuX19wcm90b19fLmdldE9iamVjdHNVbmRlclBvaW50ID0gZ2V0T2JqZWN0c0ZvckxheWVyO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnRDbGlja0xpc3RlbmVyKCBtYXAsIGNhbnZhcyApIHtcbiAgICB2YXIgc2luZ2xldG9uVUkgPSBVSSgpO1xuXG4gICAgcmV0dXJuIHNldHVwSGV4YWdvbkNsaWNrKG1hcCwgc2luZ2xldG9uVUkuc2hvd1NlbGVjdGlvbnMpO1xuICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGV4YWdvbihjb29yZHMgPSB7IHg6MCwgeTowIH0sIHJhZGl1cywgYW5nbGUgPSAzMCkge1xuICB2YXIgc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgdmFyIGNvbG9yID0gXCIjNDQ0NDQ0XCI7XG4gIHZhciBwb2ludFNpemUgPSAwO1xuXG4gIHNoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChjb2xvcilcbiAgICAuZHJhd1BvbHlTdGFyICggY29vcmRzLngsIGNvb3Jkcy55LCByYWRpdXMsIDYsIHBvaW50U2l6ZSwgYW5nbGUgKTtcblxuICByZXR1cm4gc2hhcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBOT1RFOiBUaGVzZSBjYWxjdWxhdGlvbnMgYXJlIGZvciB2ZXJ0aWNhbCBoZXhhZ29ucyAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY0hlaWdodChyYWRpdXMpIHtcbiAgcmV0dXJuIHJhZGl1cyAqIE1hdGguc3FydCgzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjU2lkZShyYWRpdXMpIHtcbiAgcmV0dXJuIHJhZGl1cyAqIDMgLyAyO1xufVxuXG4vKiBNb2RpZmllZCBGcm9tIGphdmEgZXhhbXBsZTogaHR0cDovL2Jsb2cucnVzbGFucy5jb20vMjAxMS8wMi9oZXhhZ29uYWwtZ3JpZC1tYXRoLmh0bWxcbiAgIFRoaXMgaXMgc3VwcG9zZWQgdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IGhleGFnb25hbCBpbmRleCwgdGhhdCByZXByZXNlbnRzIHRoZSBoZXhhZ29uIHRoZSBwbGF5ZXIgY2xpY2tlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldENlbGxCeVBvaW50KHJhZGl1cywgeCwgeSkge1xuICB2YXIgSEVJR0hUID0gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xuICB2YXIgU0lERSA9IHJhZGl1cyAqIDMgLyAyO1xuXG4gIHZhciBjaSA9IE1hdGguZmxvb3IoeC9TSURFKTtcbiAgdmFyIGN4ID0geCAtIFNJREUgKiBjaTtcblxuICB2YXIgdHkgPSB5IC0gKGNpICUgMikgKiBIRUlHSFQgLyAyO1xuICB2YXIgY2ogPSBNYXRoLmZsb29yKCB0eSAvIEhFSUdIVCk7XG4gIHZhciBjeSA9IHR5IC0gSEVJR0hUICogY2o7XG5cbiAgaWYgKGN4ID4gTWF0aC5hYnMocmFkaXVzIC8gMiAtIHJhZGl1cyAqIGN5IC8gSEVJR0hUKSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGNpLFxuICAgICAgICB5OiBjalxuICAgICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogY2kgLSAxLFxuICAgICAgeTogY2ogKyAoY2kgJSAyKSAtICgoY3kgPCBIRUlHSFQgLyAyKSA/IDEgOiAwKVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhleGFTaXplKHJhZGl1cykge1xuICByZXR1cm4ge1xuICAgIHJhZGl1czogcmFkaXVzLFxuICAgIHg6IHJhZGl1cyAqIDIsXG4gICAgeTogcmFkaXVzICogTWF0aC5zcXJ0KDMpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0hleGFDZW50ZXJDb29yZChoZXhSYWRpdXMsIHgsIHkpIHtcbiAgdmFyIGhleGFTaXplID0gZ2V0SGV4YVNpemUoaGV4UmFkaXVzKTtcbiAgdmFyIHJhZGl1cyA9IGhleGFTaXplLnJhZGl1cztcbiAgdmFyIGhhbGZIZXhhU2l6ZSA9IHtcbiAgICB4OiBoZXhhU2l6ZS5yYWRpdXMsXG4gICAgeTogaGV4YVNpemUueSAqIDAuNVxuICB9O1xuICB2YXIgY2VudGVyQ29vcmRzID0ge307XG4gIHZhciBjb29yZGluYXRlSW5kZXhlcztcblxuICBjb29yZGluYXRlSW5kZXhlcyA9IHNldENlbGxCeVBvaW50KHJhZGl1cywgeCwgeSk7XG5cbiAgaWYgKGNvb3JkaW5hdGVJbmRleGVzLnggPCAwICYmIGNvb3JkaW5hdGVJbmRleGVzLnggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY2xpY2sgb3V0c2lkZSBvZiB0aGUgaGV4YWdvbiBhcmVhXCIpO1xuICB9XG4gIGNlbnRlckNvb3JkcyA9IHtcbiAgICB4OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnggKiBoZXhhU2l6ZS54ICsgaGFsZkhleGFTaXplLngpLFxuICAgIHk6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueSAqIGhleGFTaXplLnkgKyBoYWxmSGV4YVNpemUueSlcbiAgfTtcblxuICByZXR1cm4gY2VudGVyQ29vcmRzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjYWxjSGVpZ2h0OiBjYWxjSGVpZ2h0LFxuICBjYWxjU2lkZTogY2FsY1NpZGUsXG4gIHNldENlbGxCeVBvaW50OiBzZXRDZWxsQnlQb2ludCxcbiAgZ2V0SGV4YVNpemU6IGdldEhleGFTaXplLFxuICB0b0hleGFDZW50ZXJDb29yZDogdG9IZXhhQ2VudGVyQ29vcmRcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKiBDcmVhdGluZyB0aGUgY3JlYXRlanNRdWV1ZS1vYmplY3QgZnJvbSBzcHJpdGVzaGVldC4gVGhpcyBwcmVsb2FkcyBhc3Nlc3RzLlxuICogQHJlcXVpcmVzIGNyZWF0ZWpzIENyZWF0ZWpzIGxpYnJhcnkgLyBmcmFtZXdvcmsgb2JqZWN0IC0gZ2xvYmFsIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VQYXRoXG4gKiBAdG9kbyBNYWtlIGEgbG9hZGVyIGdyYXBoaWNzIC8gbm90aWZpZXIgd2hlbiBsb2FkaW5nIGFzc2V0cyB1c2luZyBwcmVsb2FkZXIuXG4gKlxuICogVXNhZ2U6IHByZWxvYWQuZ2VuZXJhdGUoXCJodHRwOi8vcGF0aC5maS9wYXRoXCIpLm9uQ29tcGxldGUoKS50aGVuKGZ1bmN0aW9uKCkge30pOyAqL1xuZXhwb3J0IGNsYXNzIHByZWxvYWQgZXh0ZW5kcyBjcmVhdGVqcy5Mb2FkUXVldWUge1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICB9XG4gIC8qKkByZXR1cm4ge1Byb21pc2V9IFJldHVybiBwcm9taXNlIG9iamVjdCwgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdoZW4gdGhlIHByZWxvYWRpbmcgaXMgZmluaXNoZWQgKi9cbiAgcmVzb2x2ZU9uQ29tcGxldGUgKCkge1xuICAgIHZhciBiaW5kZWRPbkNvbXBsZXRlID0gX29uQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGJpbmRlZE9uQ29tcGxldGUpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICBmdW5jdGlvbiBfb25Db21wbGV0ZShyZXNvbHZlKSB7XG4gICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLyoqIFByZWxvYWQgYXNzZXRzLiBVc2VzIGVhc2VsanMgbWFuaWZlc3QgZm9ybWF0ICovXG4gIGxvYWRNYW5pZmVzdCAoLi4uYXJncykge1xuICAgIHN1cGVyLmxvYWRNYW5pZmVzdCguLi5hcmdzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBFcnJvciBoYW5kbGVyIGlmIHNvbWV0aGluZyBnb2VzIHdyb25nIHdoZW4gcHJlbG9hZGluZyAqL1xuICBzZXRFcnJvckhhbmRsZXIgKGVycm9yQ0IpIHtcbiAgICB0aGlzLm9uKFwiZXJyb3JcIiwgZXJyb3JDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogUHJvZ3Jlc3MgaGFuZGxlciBmb3IgbG9hZGluZy4gWW91IHNob3VsZCBsb29rIGVhc2VsanMgZG9jcyBmb3IgbW9yZSBpbmZvcm1hdGlvbiAqL1xuICBzZXRQcm9ncmVzc0hhbmRsZXIgKHByb2dyZXNzQ0IpIHtcbiAgICB0aGlzLm9uKFwiZXJyb3JcIiwgcHJvZ3Jlc3NDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogQWN0aXZhdCBzb3VuZCBwcmVsb2FkaW5nIGFsc28gKi9cbiAgYWN0aXZhdGVTb3VuZCAoKSB7XG4gICAgdGhpcy5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgfVxufSIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XG4gIElEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBtYXBTaXplOiB7IHg6IDUwLCB5OiAyMCB9LFxuICBwbHVnaW5zVG9BY3RpdmF0ZToge1xuICAgIG1hcDogW1wibWFwX2RyYWdcIiwgXCJvYmplY3Rfc2VsZWN0X2hleGFnb25cIl1cbiAgfVxufTsiLCJleHBvcnQgbGV0IG1hcERhdGEgPSB7XG4gIGdhbWVJRDogXCI1MzgzN2Q0Nzk3NmZlZDNiMjQwMDAwMDVcIixcbiAgdHVybjogMSxcbiAgc3RhcnRQb2ludDogeyB4OiAwLCB5OiAwIH0sXG4gIGVsZW1lbnQ6IFwiI21hcENhbnZhc1wiLFxuICBsYXllcnM6IFt7XG4gICAgdHlwZTogXCJNYXBfbGF5ZXJcIixcbiAgICBjb29yZDogeyB4OiAwLCB5OiAwIH0sXG4gICAgbmFtZTogXCJ0ZXJyYWluQmFzZUxheWVyXCIsXG4gICAgc3BlY2lhbHM6IFt7XG4gICAgICBcImludGVyYWN0aXZlXCI6IGZhbHNlXG4gICAgfV0sXG4gICAgb3B0aW9uczoge1xuICAgICAgY2FjaGU6IHRydWVcbiAgICB9LFxuICAgIG9iamVjdEdyb3VwczogW3tcbiAgICAgIHR5cGU6IFwiT2JqZWN0X3RlcnJhaW5cIixcbiAgICAgIG5hbWU6IFwiVGVycmFpbkJhc2VcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICB0eXBlSW1hZ2VEYXRhOiBcInRlcnJhaW5CYXNlXCIsXG4gICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YjhcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjBcIixcbiAgICAgICAgICAgIFwieVwiOlwiMFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSx7XG4gICAgICAgICBcIm9ialR5cGVcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxuICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzJcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjQxXCIsXG4gICAgICAgICAgICBcInlcIjpcIjcwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgXCJvYmpUeXBlXCI6MyxcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmM3XCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfSx7XG4gICAgXCJ0eXBlXCI6IFwiTWFwX2xheWVyXCIsXG4gICAgXCJjb29yZFwiOiB7IFwieFwiOiBcIjBcIiwgXCJ5XCI6IFwiMFwiIH0sXG4gICAgXCJuYW1lXCI6IFwidW5pdExheWVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXG4gICAgfSxcbiAgICBcIm9iamVjdEdyb3Vwc1wiOiBbe1xuICAgICAgXCJ0eXBlXCI6IFwiT2JqZWN0X3VuaXRcIixcbiAgICAgIFwibmFtZVwiOiBcIlVuaXRcIiwgLy8gSSBndWVzcyBvbmx5IGZvciBkZWJ1Z2dpbmc/XG4gICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXG4gICAgICBcIm9iamVjdHNcIjogW3tcbiAgICAgICAgXCJvYmpUeXBlXCI6MCxcbiAgICAgICAgXCJuYW1lXCI6IFwiSG9yc2V5IHRoZSB3aWxkXCIsXG4gICAgICAgIFwiY29vcmRcIjoge1xuICAgICAgICAgIFwieFwiOiBcIjQxXCIsIFwieVwiOiBcIjcwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICBcInNvbWVDdXN0b21EYXRhXCI6IFwidHJ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH1dXG4gICAgfV1cbiAgfV1cbn07IiwiZXhwb3J0IGxldCB0eXBlRGF0YSA9IHtcbiAgXCJncmFwaGljRGF0YVwiOiB7XG4gICAgXCJnZW5lcmFsXCI6e1xuICAgICAgXCJ0ZXJyYWluXCI6e1xuICAgICAgICBcInRpbGVXaWR0aFwiOjgyLFxuICAgICAgICBcInRpbGVIZWlnaHRcIjo5NFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6XG4gICAgICBbXCIvYXNzZXRzL2ltZy9tYXAvdGVzdEhleGFnb25zL3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFswLDAsODIsOTRdLFs4MiwwLDgyLDk0XSxbMTY0LDAsODIsOTRdLFsyNDYsMCw4Miw5NF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls4Miw5NF1cbiAgICB9LFxuICAgIFwidGVycmFpblwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNDhdLFsxLDUwLDk2LDQ4XSxbMSw5OSw5Niw0OF0sWzEsMTQ4LDk2LDQ4XSxbMSwxOTcsOTYsNDhdLFsxLDI0Niw5Niw0OF0sWzEsMjk1LDk2LDQ4XSxbMSwzNDQsOTYsNDhdLFsxLDM5Myw5Niw0OF1cbiAgICAgIF0sXG4gICAgICBcImltYWdlU2l6ZVwiOls5Niw0OF1cbiAgICB9LFxuICAgIFwiZGl0aGVyXCI6e1wiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2RpdGhlcjIucG5nXCJdLFwiZnJhbWVzXCI6W1swLDAsOTYsNDhdXSxcImltYWdlU2l6ZVwiOls5Niw0OF19LFxuICAgIFwicHJldHRpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbW91bnRhaW5zLnBuZ1wiLFwiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvaGlsbHMucG5nXCIsXCIvYXNzZXRzL2ltZy9tYXAvYW1wbGlvMi90ZXJyYWluMi5wbmdcIl0sXG4gICAgICBcImZyYW1lc1wiOltcbiAgICAgICAgWzEsMSw5Niw2NiwwLDAsMThdLFsxLDEsOTYsNDgsMSwtNCw0XSxbMSwxNDgsOTYsNDgsMl1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicmVzb3VyY2VcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9yZXNvdXJjZXMvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxOTUsMSw5Niw0OF0sWzM4OSwxLDk2LDQ4XVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJwbGFjZVwiOnt9LFxuICAgIFwiY2l0eVwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2FtcGxpbzIvbWVkaWV2YWxjaXRpZXMucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsOTYsNzJdLFs5OCwxLDk2LDcyXSxbMTk1LDEsOTYsNzJdLFsyOTIsMSw5Niw3Ml0sWzM4OSwxLDk2LDcyXSxbNDg1LDEsOTYsNzJdLFs1ODIsMSw5Niw3Ml0sWzY3OSwxLDk2LDcyXSxbNzc2LDEsOTYsNzJdLFs4NzMsMSw5Niw3Ml0sWzEsNzQsOTYsNzJdLFs5OCw3NCw5Niw3Ml0sWzE5NSw3NCw5Niw3Ml0sWzI5Miw3NCw5Niw3Ml0sWzM4OSw3NCw5Niw3Ml0sWzQ4NSw3NCw5Niw3Ml0sWzU4Miw3NCw5Niw3Ml0sWzY3OSw3NCw5Niw3Ml0sWzc3Niw3NCw5Niw3Ml0sWzg3Myw3NCw5Niw3Ml1cbiAgICAgIF1cbiAgICB9LFwiYnVpbGRpbmdcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC9pc29waGV4L3RlcnJhaW4xLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6W1xuICAgICAgICBbMSwxLDY0LDMyXSxbNjYsMSw2NCwzMl0sWzEzMiwxLDY0LDMyXSxbMTk4LDEsNjQsMzJdLFsyNjQsMSw2NCwzMl0sWzEsMzQsNjQsMzJdLFsxLDY3LDY0LDMyXSxbMSwxMDAsNjQsMzJdLFsxLDEzMyw2NCwzMl0sWzEsMTY2LDY0LDMyXVxuICAgICAgXVxuICAgIH0sXCJtb2RpZmllclwiOntcbiAgICAgIFwiaW1hZ2VzXCI6W1wiL2Fzc2V0cy9pbWcvbWFwL2lzb3BoZXgvdGVycmFpbjEucG5nXCJdLFxuICAgICAgXCJmcmFtZXNcIjpbXG4gICAgICAgIFsxLDEsNjQsMzJdLFs2NiwxLDY0LDMyXSxbMTMyLDEsNjQsMzJdLFsxOTgsMSw2NCwzMl0sWzI2NCwxLDY0LDMyXSxbMSwzNCw2NCwzMl0sWzEsNjcsNjQsMzJdLFsxLDEwMCw2NCwzMl0sWzEsMTMzLDY0LDMyXSxbMSwxNjYsNjQsMzJdXG4gICAgICBdXG4gICAgfSxcbiAgICBcInVuaXRcIjp7XG4gICAgICBcImltYWdlc1wiOltcIi9hc3NldHMvaW1nL21hcC91bml0cy90ZXN0SGV4YWdvblVuaXRzLnBuZ1wiXSxcbiAgICAgIFwiZnJhbWVzXCI6e1wid2lkdGhcIjo4MixcImhlaWdodFwiOjk0fVxuICAgIH1cbiAgfSxcbiAgXCJvYmplY3REYXRhXCI6IHtcbiAgICBcInVuaXRcIjpbe1xuICAgICAgICBcIm5hbWVcIjpcInRhbmtcIixcbiAgICAgICAgXCJkZXNjXCI6XCJWcm9vb20uLi5cIixcbiAgICAgICAgXCJpbWFnZVwiOlwiMFwiLFxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxuICAgICAgICBcImRlZlwiOlwiUG9vclwiLFxuICAgICAgICBcInNpZWdlXCI6XCJEZWNlbnRcIixcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcbiAgICAgICAgXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCJcbiAgICAgIH0se1xuICAgICAgICBcIm5hbWVcIjpcImNhcnJpZXJcIixcImRlc2NcIjpcImFuZ3J5IGJlZWhpdmVcIixcImltYWdlXCI6XCI2XCIsXCJhdHRcIjpcIjFcIixcImRlZlwiOlwiMlwiLFwic2llZ2VcIjpcIjJcIixcImluaXRpYXRlXCI6XCIxMTBcIixcIm1vdmVcIjpcIjEwMFwiLFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXCJ2aXNpb25cIjpcIjI1MFwiLFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIixcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgXCJ1bml0XCI6e1xuICAgICAgICAgICAgXCJfZW5lbXlfXCI6W3tcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcbiAgICAgICAgICAgICAgXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgXCJtb3JhbGVcIjpcInN1ZmZlcnMgbW9yYWxlIGRyb3BcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJjYXZhbHJ5XCIsXCJkZXNjXCI6XCJHaXZlIG1lIGFuIGFwcGxlIVwiLFwiaW1hZ2VcIjpcIjI2XCIsXCJhdHRcIjpcIjNcIixcImRlZlwiOlwiMVwiLFwic2llZ2VcIjpcIjBcIixcImluaXRpYXRlXCI6XCI1MFwiLFwibW92ZVwiOlwiMzAwXCIsXCJtb3JhbGVcIjpcIkF2ZXJhZ2VcIixcInZpc2lvblwiOlwiMTAwXCIsXCJpbmZsdWVuY2VBcmVhXCI6XCIzMFwiXG4gICAgfV0sXG4gICAgXCJ0ZXJyYWluQmFzZVwiOlt7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAwXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCIxXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCIyXCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMVwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiMlwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMVwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDJcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcIjNcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjRcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAzXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCI0XCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI1XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgNFwiXG4gICAgICB9LHtcbiAgICAgICAgXCJpbWFnZVwiOlwiNVwiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiM1wiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDVcIlxuICAgIH1dLFxuICAgIFwidGVycmFpblwiOlt7XG4gICAgICAgIFwibmFtZVwiOlwiZGVzZXJ0XCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwidmVyeSBkcnkgbGFuZFwiLFxuICAgICAgICBcIm1vZGlmaWVyc1wiOntcbiAgICAgICAgICBcIkNpdHlcIjp7XG4gICAgICAgICAgICBcIl9wbGF5ZXJfXCI6W3tcbiAgICAgICAgICAgICAgICBcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFxuICAgICAgICAgICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0aW9uXCI6XCJQcm92aWRlcyArMSBmb29kIGZvciBjaXRpZXNcIlxuICAgICAgfX1dfX19LHtcbiAgICAgICAgXCJuYW1lXCI6XCJwbGFpblwiLFwiaW1hZ2VcIjpcIjFcIixcImRlc2NcIjpcIkJ1ZmZhbG8gcm9hbWluZyBhcmVhXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiQ2l0eVwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XG4gICAgICAgICAgICAgICAgICBcInByb2R1Y3Rpb25cIjpcIlByb3ZpZGVzICsxMiUgZm9vZCBmb3IgY2l0aWVzXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXCJpbWFnZVwiOlwiMlwiLFwiZGVzY1wiOlwiUm9iaW4gaG9vZCBsaWtlcyBpdCBoZXJlXCIsXG4gICAgICAgIFwibW9kaWZpZXJzXCI6e1xuICAgICAgICAgIFwiVW5pdFwiOntcbiAgICAgICAgICAgIFwiX3BsYXllcl9cIjpbe1xuICAgICAgICAgICAgICAgIFwiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkZWZlbmRcIjpcIlVuaXQgZGVmZW5kICsyXCJcbiAgICAgIH19XX19fSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJ0dW5kcmFcIixcImRlc2NcIjpcIlNpYmVyaWEgdGVhY2hlcyB5b3VcIixcImltYWdlXCI6XCI2XCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgXCJuYW1lXCI6XCJhcmN0aWNcIixcImRlc2NcIjpcIllvdXIgYmFsbCB3aWxsIGZyZWV6ZSBvZlwiLFwiaW1hZ2VcIjpcIjdcIlxuICAgICAgICB9LHtcbiAgICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXCJkZXNjXCI6XCJDcmFuYmVycmllcyBhbmQgY2xvdWRiZXJyaWVzXCIsXCJpbWFnZVwiOlwiOFwiXG4gICAgICAgIH1dLFxuICAgIFwiZGl0aGVyXCI6W1xuICAgICAge1wiaW1hZ2VcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwifV0sXG4gICAgXCJwcmV0dGlmaWVyXCI6W3tcImltYWdlXCI6XCIwXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjNcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMjUlXCJ9LHtcImltYWdlXCI6XCIxXCIsXCJ6SW5kZXhcIjpcIjFcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNDAlXCJ9LHtcImltYWdlXCI6XCIyXCIsXCJ6SW5kZXhcIjpcIjBcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjJcIl0sXCJwcm9wYWJpbGl0eVwiOlwiNjAlXCJ9XSxcInJlc291cmNlXCI6W3tcIm5hbWVcIjpcIk9hc2lzXCIsXCJpbWFnZVwiOlwiMFwiLFwiZGVzY1wiOlwiT2FzaXMgaW4gdGhlIG1pZGRsZSBvZiBkZXNlcnQsIG9yIG5vdCBhdG0uXCIsXCJtb2RpZmllcnNcIjp7XCJDaXR5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aW9uXCI6XCJmb29kIHByb2R1Y3Rpb24gNSAvIHdlZWtcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH0se1wibmFtZVwiOlwiT2lsXCIsXCJpbWFnZVwiOlwiMVwiLFwiZGVzY1wiOlwiQmxhY2sgZ29sZFwiLFwibW9kaWZpZXJzXCI6e1wiQ2l0eVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiVGhlcmUgaXMgYSBsb3Qgb2Ygb2lsIGhlcmVcIn19XX19LFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiLFwiNFwiXSxcImluZmx1ZW5jZUFyZWFcIjo1MH1dLFwiY2l0eVwiOlt7XCJuYW1lXCI6XCJNZWRpZXZhbFwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIwXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9LHtcIm5hbWVcIjpcIk1lZGlldmFsMlwiLFwidmlzaW9uXCI6XCIxMDBcIixcImltYWdlXCI6XCIxXCIsXCJpbmZsdWVuY2VBcmVhXCI6NTB9XSxcInBsYWNlXCI6W10sXCJidWlsZGluZ1wiOlt7XCJuYW1lXCI6XCJCYXJyYWNrc1wiLFwiaW1hZ2VcIjpcIjBcIixcInRvb2x0aXBcIjpcIkVuYWJsZXMgdHJvb3AgcmVjcnVpdG1lbnRcIn0se1wibmFtZVwiOlwiRmFjdG9yeVwiLFwiaW1hZ2VcIjpcIjFcIixcInRvb2x0aXBcIjpcIlByb2R1Y2VzIHdlYXBvbnJ5XCJ9XSxcImdvdmVybm1lbnRcIjpbe1wibmFtZVwiOlwiRGVtb2NyYXp5XCIsXCJkZXNjcmlwdGlvblwiOlwid2VsbCBpdCdzIGEgZGVtb2NyYXp5IDopXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyArMjAlIGhhcHBpbmVzc1wiLFwiaW1hZ2VcIjpcIjBcIixcInJlcXVpcmVtZW50c1wiOltdLFwicG9zc2libGVOYXRWYWx1ZXNcIjpbMCwxXSxcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJwb2xpdGljc1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiaGFwcGluZXNzXCI6XCIyMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ29tbXVuaXNtXCIsXCJkZXNjcmlwdGlvblwiOlwiWW91IGtub3cgdGhlIG9uZSB1c2VkIGluIHRoZSBncmVhdCBVU1NSIGFuZCBpbnNpZGUgdGhlIGdyZWF0IGZpcmV3YWxsIG9mIENoaW5hXCIsXCJ0b29sdGlwXCI6XCJHaXZlcyBwcm9kdWN0aW9uIGJvbnVzZXNcIixcImltYWdlXCI6XCIwXCIsXCJyZXF1aXJlbWVudHNcIjpbXSxcInBvc3NpYmxlTmF0VmFsdWVzXCI6WzIsM10sXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOnt9fV19fSxcIkNpdHlcIjp7XCJidWlsZGluZ1wiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wicHJvZHVjdGlvblwiOlwiMjAlXCJ9fV19fX19XSxcInBvbGl0aWNzXCI6e1widGF4UmF0ZVwiOlt7XCJtaW5cIjpcIjBcIixcIm1heFwiOlwiMjBcIixcIm1vZGlmaWVyc1wiOntcIlVuaXRcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImF0dGFja1wiOlwiKzFcIn19XX19fSx7XCJtaW5cIjpcIjIxXCIsXCJtYXhcIjpcIjEwMFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcImRpcGxvbWFjeVwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wic2tpbGxcIjpcIis1XCJ9fV19fX19XSxcImNvcnJ1cHRpb25cIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJhbGlnbm1lbnRcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJoYXBwaW5lc3NcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJyZXZvbHRSaXNrXCI6W3tcIm1pblwiOlwiMFwiLFwibWF4XCI6XCIyMFwiLFwibW9kaWZpZXJzXCI6e1wiVW5pdFwiOntcIl9wbGF5ZXJfXCI6W3tcImZyb21cIjpcInRoaXNPbmVQbGFjZVwiLFwibW9kaWZpZXJzXCI6e1wiYXR0YWNrXCI6XCIrMVwifX1dfX19LHtcIm1pblwiOlwiMjFcIixcIm1heFwiOlwiMTAwXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wiZGlwbG9tYWN5XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJza2lsbFwiOlwiKzVcIn19XX19fX1dLFwidW5pdHlcIjpbe1wibWluXCI6XCIwXCIsXCJtYXhcIjpcIjIwXCIsXCJtb2RpZmllcnNcIjp7XCJVbml0XCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJhdHRhY2tcIjpcIisxXCJ9fV19fX0se1wibWluXCI6XCIyMVwiLFwibWF4XCI6XCIxMDBcIixcIm1vZGlmaWVyc1wiOntcImZhY3Rpb25cIjp7XCJkaXBsb21hY3lcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcInNraWxsXCI6XCIrNVwifX1dfX19fV0sXCJuYXRWYWx1ZVwiOlt7XCJuYW1lXCI6XCJJbnRlZ3JpdHlcIixcInRvb2x0aXBcIjpcIkdvdmVybm1lbnQgYW5kIHBvcHVsYXRpb25zIHNob3dzIGludGVncml0eSBhbmQgdHJ1c3R3b3J0aGluZXNzXCIsXCJtb2RpZmllcnNcIjp7XCJmYWN0aW9uXCI6e1wicG9saXRpY3NcIjp7XCJfcGxheWVyX1wiOlt7XCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcIm1vZGlmaWVyc1wiOntcImludGVybmFsUmVsYXRpb25zXCI6XCIrMTAlXCIsXCJkaXBsb21hY3lcIjpcIisxMCVcIixcInJldm9sdCByaXNrXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIi0yMCVcIn19XX19fX0se1wibmFtZVwiOlwiQ2FwaXRhbGlzbVwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJkaXBsb21hY3lcIjpcIis1JVwiLFwicmVsYXRpb25zVG9FbGl0ZVwiOlwiKzUlXCIsXCJtb3JhbGVcIjpcIis1JVwifX1dfX19fSx7XCJuYW1lXCI6XCJIYXJkd29ya2luZ1wiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIisxMCVcIixcImhhcHBpbmVzc1wiOlwiKzUlXCIsXCJyZWxhdGlvbnNUb0VsaXRlXCI6XCIrNSVcIn19XX19fX0se1wibmFtZVwiOlwiTGVhZGVyc2hpcFwiLFwibW9kaWZpZXJzXCI6e1wiZmFjdGlvblwiOntcInBvbGl0aWNzXCI6e1wiX3BsYXllcl9cIjpbe1wiZnJvbVwiOlwidGhpc09uZVBsYWNlXCIsXCJtb2RpZmllcnNcIjp7XCJwcm9kdWN0aXZpdHlcIjpcIis1JVwiLFwiaGFwcGluZXNzXCI6XCItNSVcIixcInJlbGF0aW9uc1RvRWxpdGVcIjpcIis1JVwiLFwidHJhZGluZ1wiOlwiKzEwJVwifX1dfX19fV19fVxufTsiXX0=
