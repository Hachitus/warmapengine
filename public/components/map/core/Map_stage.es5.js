(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    function Map_stage() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Map_stage);

        _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).apply(this, args);

        this._cacheEnabled = true;
        this.name = "Map_stage"; // For debugging. Shows up in toString
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
    }]);

    return Map_stage;
})(createjs.Stage);

exports.Map_stage = Map_stage;
;

},{"./map_validators":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
