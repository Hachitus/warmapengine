(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _varWwwWarMapEnginePublicComponentsPreloadingPreloading = require("/var/www/warMapEngine/public/components/preloading/preloading");

describe("basic map - without plugins", function () {
  var runWhenComplete = false;

  it("=> exists", function () {
    expect(_varWwwWarMapEnginePublicComponentsPreloadingPreloading.preload).toBeDefined();
  });

  new _varWwwWarMapEnginePublicComponentsPreloadingPreloading.preload(false).setErrorHandler(preloadErrorHandler)
  //.setProgressHandler( progressHandler )
  .loadManifest(["assets/img/map/collection.png"]).resolveOnComplete().then(runWhenComplete);

  it("=> completes", function (done) {
    runWhenComplete = function () {
      done();
    };
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9wcmVsb2FkZXItc3BlYy5lczYuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7c0VDQXdCLCtEQUErRDs7QUFFdkYsUUFBUSxDQUFDLDZCQUE2QixFQUFFLFlBQVc7QUFDakQsTUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztBQUU1QixJQUFFLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDeEIsVUFBTSx5REFORCxPQUFPLENBTUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUMvQixDQUFDLENBQUM7O0FBRUgsOERBVE8sT0FBTyxDQVNELEtBQUssQ0FBRSxDQUNqQixlQUFlLENBQUUsbUJBQW1CLENBQUU7O0dBRXRDLFlBQVksQ0FBRSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FDaEQsaUJBQWlCLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV6QixJQUFFLENBQUMsY0FBYyxFQUFFLFVBQVMsSUFBSSxFQUFDO0FBQy9CLG1CQUFlLEdBQUcsWUFBVztBQUMzQixVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUE7R0FDRixDQUFDLENBQUM7OztBQUdILFdBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFO0FBQ2hDLFdBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFFLENBQUE7R0FDckMsQ0FBQztDQUNILENBQUMsQ0FBQzs7O0FDMUJILFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV0EsT0FBTztBQUNOLFdBREQsT0FBTyxHQUNJO3NDQUFOLElBQUk7QUFBSixVQUFJOzs7MEJBRFQsT0FBTzs7QUFFaEIsK0JBRlMsT0FBTyw4Q0FFUCxJQUFJLEVBQUU7R0FDaEI7O1lBSFUsT0FBTzs7ZUFBUCxPQUFPOztXQUlBLDZCQUFHO0FBQ25CLFVBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QyxVQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUU1QyxhQUFPLE9BQU8sQ0FBQzs7QUFFZixlQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDNUIsWUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBVztBQUM3QixpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2YsQ0FBQyxDQUFDO09BQ0o7S0FDRjs7O1dBQ1ksd0JBQVU7eUNBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNuQixpQ0FqQlMsT0FBTywrQ0FpQk0sSUFBSSxFQUFFOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FDZSx5QkFBQyxPQUFPLEVBQUU7QUFDeEIsVUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRTFCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNrQiw0QkFBQyxVQUFVLEVBQUU7QUFDOUIsVUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRTdCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUNhLHlCQUFHO0FBQ2YsVUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7OztTQWpDVSxPQUFPO0dBQVMsUUFBUSxDQUFDLFNBQVM7O1FBQWxDLE9BQU8sR0FBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHByZWxvYWQgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxuZGVzY3JpYmUoXCJiYXNpYyBtYXAgLSB3aXRob3V0IHBsdWdpbnNcIiwgZnVuY3Rpb24oKSB7XG4gIHZhciBydW5XaGVuQ29tcGxldGUgPSBmYWxzZTtcblxuICBpdChcIj0+IGV4aXN0c1wiLCBmdW5jdGlvbigpe1xuICAgIGV4cGVjdChwcmVsb2FkKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcblxuICBuZXcgcHJlbG9hZCggZmFsc2UgKVxuICAgIC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKVxuICAgIC8vLnNldFByb2dyZXNzSGFuZGxlciggcHJvZ3Jlc3NIYW5kbGVyIClcbiAgICAubG9hZE1hbmlmZXN0KCBbXCJhc3NldHMvaW1nL21hcC9jb2xsZWN0aW9uLnBuZ1wiXSlcbiAgICAucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgIC50aGVuKHJ1bldoZW5Db21wbGV0ZSk7XG5cbiAgaXQoXCI9PiBjb21wbGV0ZXNcIiwgZnVuY3Rpb24oZG9uZSl7XG4gICAgcnVuV2hlbkNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9KTtcblxuICAgIC8qID09PT09PSBwcml2YXRlIGZ1bmN0aW9ucywgb3IgdG8gYmUgbW92ZWQgZWxzZXdoZXJlID09PT09PSAqL1xuICBmdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiUFJFTE9BREVSIEVSUk9SXCIsIGVyciApXG4gIH07XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbkNyZWF0aW5nIHRoZSBjcmVhdGVqc1F1ZXVlLW9iamVjdCBmcm9tIHNwcml0ZXNoZWV0LiBUaGlzIHByZWxvYWRzIGFzc2VzdHMuXG5cbkByZXF1aXJlcyBjcmVhdGVqcyBDcmVhdGVqcyBsaWJyYXJ5IC8gZnJhbWV3b3JrIG9iamVjdCAtIGdsb2JhbCBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBiYXNlUGF0aFxuQHRvZG8gTWFrZSBhIGxvYWRlciBncmFwaGljcyAvIG5vdGlmaWVyIHdoZW4gbG9hZGluZyBhc3NldHMgdXNpbmcgcHJlbG9hZGVyLlxuXG5Vc2FnZTogcHJlbG9hZC5nZW5lcmF0ZShcImh0dHA6Ly9wYXRoLmZpL3BhdGhcIikub25Db21wbGV0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7fSk7XG4qL1xuZXhwb3J0IGNsYXNzIHByZWxvYWQgZXh0ZW5kcyBjcmVhdGVqcy5Mb2FkUXVldWUge1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICB9XG4gIHJlc29sdmVPbkNvbXBsZXRlICgpIHtcbiAgICB2YXIgYmluZGVkT25Db21wbGV0ZSA9IF9vbkNvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShiaW5kZWRPbkNvbXBsZXRlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gX29uQ29tcGxldGUocmVzb2x2ZSkge1xuICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGxvYWRNYW5pZmVzdCAoLi4uYXJncykge1xuICAgIHN1cGVyLmxvYWRNYW5pZmVzdCguLi5hcmdzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldEVycm9ySGFuZGxlciAoZXJyb3JDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBlcnJvckNCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFByb2dyZXNzSGFuZGxlciAocHJvZ3Jlc3NDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBwcm9ncmVzc0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFjdGl2YXRlU291bmQgKCkge1xuICAgIHRoaXMuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIH1cbn0iXX0=
