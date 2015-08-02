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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi9wcmVsb2FkZXItc3BlYy5lczYuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7c0VDQXdCLCtEQUErRDs7QUFFdkYsUUFBUSxDQUFDLHdCQUF3QixFQUFFLFlBQVc7QUFDNUMsTUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztBQUU1QixJQUFFLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDeEIsVUFBTSx5REFORCxPQUFPLENBTUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUMvQixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHdCQUF3QixFQUFFLFVBQVMsSUFBSSxFQUFDO0FBQ3pDLG1CQUFlLEdBQUcsWUFBVztBQUMzQixVQUFJLEVBQUUsQ0FBQztLQUNSLENBQUE7O0FBRUQsUUFBSSxJQUFJLEdBQUcsNERBZE4sT0FBTyxDQWNZLEtBQUssQ0FBRSxDQUFDO0FBQ2hDLFFBQUksQ0FBQyxlQUFlLENBQUUsbUJBQW1CLENBQUUsQ0FBQzs7QUFFNUMsUUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFFLEVBQUMsRUFBRSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsRUFBQyw2REFBNkQsRUFBQyxDQUFFLENBQUMsQ0FBQztBQUN0SCxRQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0dBRTFCLENBQUMsQ0FBQzs7O0FBR0gsV0FBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUUsQ0FBQTtHQUNyQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDOzs7QUMzQkgsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQSxPQUFPO0FBQ04sV0FERCxPQUFPLEdBQ0k7c0NBQU4sSUFBSTtBQUFKLFVBQUk7OzswQkFEVCxPQUFPOztBQUVoQiwrQkFGUyxPQUFPLDhDQUVQLElBQUksRUFBRTtHQUNoQjs7WUFIVSxPQUFPOztlQUFQLE9BQU87Ozs7V0FLQSw2QkFBRztBQUNuQixVQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUMsVUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFNUMsYUFBTyxPQUFPLENBQUM7O0FBRWYsZUFBUyxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQzVCLFlBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVc7QUFDN0IsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmLENBQUMsQ0FBQztPQUNKO0tBQ0Y7Ozs7O1dBRVksd0JBQVU7eUNBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNuQixpQ0FuQlMsT0FBTywrQ0FtQk0sSUFBSSxFQUFFOztBQUU1QixhQUFPLElBQUksQ0FBQztLQUNiOzs7OztXQUVlLHlCQUFDLE9BQU8sRUFBRTtBQUN4QixVQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFMUIsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7V0FFa0IsNEJBQUMsVUFBVSxFQUFFO0FBQzlCLFVBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUU3QixhQUFPLElBQUksQ0FBQztLQUNiOzs7OztXQUVhLHlCQUFHO0FBQ2YsVUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7OztTQXRDVSxPQUFPO0dBQVMsUUFBUSxDQUFDLFNBQVM7O1FBQWxDLE9BQU8sR0FBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHByZWxvYWQgfSBmcm9tICcvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxuZGVzY3JpYmUoXCJ1bml0VGVzdCBwcmVsb2FkZXIgLT4gXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgcnVuV2hlbkNvbXBsZXRlID0gZmFsc2U7XG5cbiAgaXQoXCI9PiBleGlzdHNcIiwgZnVuY3Rpb24oKXtcbiAgICBleHBlY3QocHJlbG9hZCkudG9CZURlZmluZWQoKTtcbiAgfSk7XG5cbiAgaXQoXCI9PiBwcmVsb2FkZXIgY29tcGxldGVzXCIsIGZ1bmN0aW9uKGRvbmUpe1xuICAgIHJ1bldoZW5Db21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgZG9uZSgpO1xuICAgIH1cblxuICAgIGxldCBwcmVsID0gbmV3IHByZWxvYWQoIGZhbHNlICk7XG4gICAgcHJlbC5zZXRFcnJvckhhbmRsZXIoIHByZWxvYWRFcnJvckhhbmRsZXIgKTtcbiAgICAgIC8vLnNldFByb2dyZXNzSGFuZGxlciggcHJvZ3Jlc3NIYW5kbGVyIClcbiAgICBwcmVsLmxvYWRNYW5pZmVzdChbIHtpZDogXCJ0ZXJyYWluX3Nwcml0ZXNoZWV0XCIsIHNyYzpcImh0dHA6Ly93YXJtYXBlbmdpbmUubGV2ZWw3LmZpL2Fzc2V0cy9pbWcvbWFwL2NvbGxlY3Rpb24ucG5nXCJ9IF0pO1xuICAgIHByZWwucmVzb2x2ZU9uQ29tcGxldGUoKVxuICAgICAgLnRoZW4ocnVuV2hlbkNvbXBsZXRlKTtcblxuICB9KTtcblxuICAgIC8qID09PT09PSBwcml2YXRlIGZ1bmN0aW9ucywgb3IgdG8gYmUgbW92ZWQgZWxzZXdoZXJlID09PT09PSAqL1xuICBmdW5jdGlvbiBwcmVsb2FkRXJyb3JIYW5kbGVyKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiUFJFTE9BREVSIEVSUk9SXCIsIGVyciApXG4gIH07XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqIENyZWF0aW5nIHRoZSBjcmVhdGVqc1F1ZXVlLW9iamVjdCBmcm9tIHNwcml0ZXNoZWV0LiBUaGlzIHByZWxvYWRzIGFzc2VzdHMuXG4gKiBAcmVxdWlyZXMgY3JlYXRlanMgQ3JlYXRlanMgbGlicmFyeSAvIGZyYW1ld29yayBvYmplY3QgLSBnbG9iYWwgb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVBhdGhcbiAqIEB0b2RvIE1ha2UgYSBsb2FkZXIgZ3JhcGhpY3MgLyBub3RpZmllciB3aGVuIGxvYWRpbmcgYXNzZXRzIHVzaW5nIHByZWxvYWRlci5cbiAqXG4gKiBVc2FnZTogcHJlbG9hZC5nZW5lcmF0ZShcImh0dHA6Ly9wYXRoLmZpL3BhdGhcIikub25Db21wbGV0ZSgpLnRoZW4oZnVuY3Rpb24oKSB7fSk7ICovXG5leHBvcnQgY2xhc3MgcHJlbG9hZCBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gIH1cbiAgLyoqQHJldHVybiB7UHJvbWlzZX0gUmV0dXJuIHByb21pc2Ugb2JqZWN0LCB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB0aGUgcHJlbG9hZGluZyBpcyBmaW5pc2hlZCAqL1xuICByZXNvbHZlT25Db21wbGV0ZSAoKSB7XG4gICAgdmFyIGJpbmRlZE9uQ29tcGxldGUgPSBfb25Db21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYmluZGVkT25Db21wbGV0ZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIF9vbkNvbXBsZXRlKHJlc29sdmUpIHtcbiAgICAgIHRoaXMub24oXCJjb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKiogUHJlbG9hZCBhc3NldHMuIFVzZXMgZWFzZWxqcyBtYW5pZmVzdCBmb3JtYXQgKi9cbiAgbG9hZE1hbmlmZXN0ICguLi5hcmdzKSB7XG4gICAgc3VwZXIubG9hZE1hbmlmZXN0KC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIEVycm9yIGhhbmRsZXIgaWYgc29tZXRoaW5nIGdvZXMgd3Jvbmcgd2hlbiBwcmVsb2FkaW5nICovXG4gIHNldEVycm9ySGFuZGxlciAoZXJyb3JDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBlcnJvckNCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBQcm9ncmVzcyBoYW5kbGVyIGZvciBsb2FkaW5nLiBZb3Ugc2hvdWxkIGxvb2sgZWFzZWxqcyBkb2NzIGZvciBtb3JlIGluZm9ybWF0aW9uICovXG4gIHNldFByb2dyZXNzSGFuZGxlciAocHJvZ3Jlc3NDQikge1xuICAgIHRoaXMub24oXCJlcnJvclwiLCBwcm9ncmVzc0NCKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBBY3RpdmF0IHNvdW5kIHByZWxvYWRpbmcgYWxzbyAqL1xuICBhY3RpdmF0ZVNvdW5kICgpIHtcbiAgICB0aGlzLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICB9XG59Il19
