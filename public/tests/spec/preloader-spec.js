(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _varWwwWarMapEnginePublicComponentsPreloadingPreloading = require("/var/www/warMapEngine/public/components/preloading/preloading");

describe("unitTest preloader -> ", function () {
  var runWhenComplete = false;

  it("=> exists", function () {
    expect(_varWwwWarMapEnginePublicComponentsPreloadingPreloading.preload).toBeDefined();
  });

  it("=> preloader completes", function (done) {
    runWhenComplete = function () {
      done();
    };

    var prel = new _varWwwWarMapEnginePublicComponentsPreloadingPreloading.preload(false);
    prel.setErrorHandler(preloadErrorHandler);
    //.setProgressHandler( progressHandler )
    prel.loadManifest([{ id: "terrain_spritesheet", src: "http://warmapengine.level7.fi/assets/img/map/collection.png" }]);
    prel.resolveOnComplete().then(runWhenComplete);
  });

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err);
  };
});

},{"/var/www/warMapEngine/public/components/preloading/preloading":2}],2:[function(require,module,exports){
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
 * @requires Q the promise library (can not be added with ES6)
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
      var promise = Q.defer();

      this.on("complete", function () {
        promise.resolve(true);
      });

      return promise.promise;
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9wcmVsb2FkZXItc3BlYy5lczYuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7c0VDQXdCLCtEQUErRDs7QUFFdkYsUUFBUSxDQUFDLHdCQUF3QixFQUFFLFlBQVc7QUFDNUMsTUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztBQUU1QixJQUFFLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDeEIsVUFBTSx5REFORCxPQUFPLENBTUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUMvQixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHdCQUF3QixFQUFFLFVBQVMsSUFBSSxFQUFDO0FBQ3pDLG1CQUFlLEdBQUcsWUFBVztBQUMzQixVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUE7O0FBRUQsUUFBSSxJQUFJLEdBQUcsNERBZE4sT0FBTyxDQWNZLEtBQUssQ0FBRSxDQUFDO0FBQ2hDLFFBQUksQ0FBQyxlQUFlLENBQUUsbUJBQW1CLENBQUUsQ0FBQzs7QUFFNUMsUUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFFLEVBQUMsRUFBRSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsRUFBQyw2REFBNkQsRUFBQyxDQUFFLENBQUMsQ0FBQztBQUN0SCxRQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0dBRTFCLENBQUMsQ0FBQzs7O0FBR0gsV0FBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUUsQ0FBQTtHQUNyQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDOzs7QUMzQkgsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBU0EsT0FBTztBQUNOLFdBREQsT0FBTyxHQUNJO3NDQUFOLElBQUk7QUFBSixVQUFJOzs7MEJBRFQsT0FBTzs7QUFFaEIsK0JBRlMsT0FBTyw4Q0FFUCxJQUFJLEVBQUU7R0FDaEI7O1lBSFUsT0FBTzs7ZUFBUCxPQUFPOzs7O1dBS0EsNkJBQUc7QUFDbkIsVUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUV4QixVQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFXO0FBQzdCLGVBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDdkIsQ0FBQyxDQUFDOztBQUVILGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUN4Qjs7Ozs7V0FFWSx3QkFBVTt5Q0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQ25CLGlDQWhCUyxPQUFPLCtDQWdCTSxJQUFJLEVBQUU7O0FBRTVCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O1dBRWUseUJBQUMsT0FBTyxFQUFFO0FBQ3hCLFVBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUUxQixhQUFPLElBQUksQ0FBQztLQUNiOzs7OztXQUVrQiw0QkFBQyxVQUFVLEVBQUU7QUFDOUIsVUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRTdCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O1dBRWEseUJBQUc7QUFDZixVQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQzs7O1NBbkNVLE9BQU87R0FBUyxRQUFRLENBQUMsU0FBUzs7UUFBbEMsT0FBTyxHQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcnO1xuXG5kZXNjcmliZShcInVuaXRUZXN0IHByZWxvYWRlciAtPiBcIiwgZnVuY3Rpb24oKSB7XG4gIHZhciBydW5XaGVuQ29tcGxldGUgPSBmYWxzZTtcblxuICBpdChcIj0+IGV4aXN0c1wiLCBmdW5jdGlvbigpe1xuICAgIGV4cGVjdChwcmVsb2FkKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcblxuICBpdChcIj0+IHByZWxvYWRlciBjb21wbGV0ZXNcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgcnVuV2hlbkNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuXG4gICAgbGV0IHByZWwgPSBuZXcgcHJlbG9hZCggZmFsc2UgKTtcbiAgICBwcmVsLnNldEVycm9ySGFuZGxlciggcHJlbG9hZEVycm9ySGFuZGxlciApO1xuICAgICAgLy8uc2V0UHJvZ3Jlc3NIYW5kbGVyKCBwcm9ncmVzc0hhbmRsZXIgKVxuICAgIHByZWwubG9hZE1hbmlmZXN0KFsge2lkOiBcInRlcnJhaW5fc3ByaXRlc2hlZXRcIiwgc3JjOlwiaHR0cDovL3dhcm1hcGVuZ2luZS5sZXZlbDcuZmkvYXNzZXRzL2ltZy9tYXAvY29sbGVjdGlvbi5wbmdcIn0gXSk7XG4gICAgcHJlbC5yZXNvbHZlT25Db21wbGV0ZSgpXG4gICAgICAudGhlbihydW5XaGVuQ29tcGxldGUpO1xuXG4gIH0pO1xuXG4gICAgLyogPT09PT09IHByaXZhdGUgZnVuY3Rpb25zLCBvciB0byBiZSBtb3ZlZCBlbHNld2hlcmUgPT09PT09ICovXG4gIGZ1bmN0aW9uIHByZWxvYWRFcnJvckhhbmRsZXIoZXJyKSB7XG4gICAgY29uc29sZS5sb2coXCJQUkVMT0FERVIgRVJST1JcIiwgZXJyIClcbiAgfTtcbn0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiogQ3JlYXRpbmcgdGhlIGNyZWF0ZWpzUXVldWUtb2JqZWN0IGZyb20gc3ByaXRlc2hlZXQuIFRoaXMgcHJlbG9hZHMgYXNzZXN0cy5cbiAqIEByZXF1aXJlcyBjcmVhdGVqcyBDcmVhdGVqcyBsaWJyYXJ5IC8gZnJhbWV3b3JrIG9iamVjdCAtIGdsb2JhbCBvYmplY3RcbiAqIEByZXF1aXJlcyBRIHRoZSBwcm9taXNlIGxpYnJhcnkgKGNhbiBub3QgYmUgYWRkZWQgd2l0aCBFUzYpXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVBhdGhcbiAqIEB0b2RvIE1ha2UgYSBsb2FkZXIgZ3JhcGhpY3MgLyBub3RpZmllciB3aGVuIGxvYWRpbmcgYXNzZXRzIHVzaW5nIHByZWxvYWRlci5cbiAqXG4gKiBVc2FnZTogcHJlbG9hZC5nZW5lcmF0ZShcImh0dHA6Ly9wYXRoLmZpL3BhdGhcIikub25Db21wbGV0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7fSk7ICovXG5leHBvcnQgY2xhc3MgcHJlbG9hZCBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gIH1cbiAgLyoqQHJldHVybiB7UHJvbWlzZX0gUmV0dXJuIHByb21pc2Ugb2JqZWN0LCB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB0aGUgcHJlbG9hZGluZyBpcyBmaW5pc2hlZCAqL1xuICByZXNvbHZlT25Db21wbGV0ZSAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBRLmRlZmVyKCk7XG5cbiAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBwcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZS5wcm9taXNlO1xuICB9XG4gIC8qKiBQcmVsb2FkIGFzc2V0cy4gVXNlcyBlYXNlbGpzIG1hbmlmZXN0IGZvcm1hdCAqL1xuICBsb2FkTWFuaWZlc3QgKC4uLmFyZ3MpIHtcbiAgICBzdXBlci5sb2FkTWFuaWZlc3QoLi4uYXJncyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogRXJyb3IgaGFuZGxlciBpZiBzb21ldGhpbmcgZ29lcyB3cm9uZyB3aGVuIHByZWxvYWRpbmcgKi9cbiAgc2V0RXJyb3JIYW5kbGVyIChlcnJvckNCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIGVycm9yQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFByb2dyZXNzIGhhbmRsZXIgZm9yIGxvYWRpbmcuIFlvdSBzaG91bGQgbG9vayBlYXNlbGpzIGRvY3MgZm9yIG1vcmUgaW5mb3JtYXRpb24gKi9cbiAgc2V0UHJvZ3Jlc3NIYW5kbGVyIChwcm9ncmVzc0NCKSB7XG4gICAgdGhpcy5vbihcImVycm9yXCIsIHByb2dyZXNzQ0IpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIEFjdGl2YXQgc291bmQgcHJlbG9hZGluZyBhbHNvICovXG4gIGFjdGl2YXRlU291bmQgKCkge1xuICAgIHRoaXMuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIH1cbn0iXX0=
