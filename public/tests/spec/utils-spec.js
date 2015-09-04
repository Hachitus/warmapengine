(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsMapExtensionsHexagonsUtilsCreateHexagon = require('../../components/map/extensions/hexagons/utils/createHexagon');

var _componentsMapExtensionsHexagonsUtilsPixi_createHexagon = require('../../components/map/extensions/hexagons/utils/pixi_createHexagon');

var _componentsMapExtensionsHexagonsUtilsHexagonMath = require('../../components/map/extensions/hexagons/utils/hexagonMath');

var _componentsMapExtensionsHexagonsUtilsHexagonMath2 = _interopRequireDefault(_componentsMapExtensionsHexagonsUtilsHexagonMath);

describe('unitTest pixi.js utils.createHexagon -> ', function () {
  it('=> ... ', function () {
    expect(_componentsMapExtensionsHexagonsUtilsCreateHexagon.createHexagon).toBeDefined();
  });
});

},{"../../components/map/extensions/hexagons/utils/createHexagon":2,"../../components/map/extensions/hexagons/utils/hexagonMath":3,"../../components/map/extensions/hexagons/utils/pixi_createHexagon":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createHexagon = createHexagon;
/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */

function createHexagon(_x, radius) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var angle = arguments[2] === undefined ? 30 : arguments[2];
    var isFlatTop = arguments[3] === undefined ? false : arguments[3];

    var i = 0,
        offset = isFlatTop ? 0 : 0.5,
        angle = 2 * Math.PI / 6 * offset,
        center = coords,
        x = center.x * Math.cos(angle),
        y = center.y * Math.sin(angle),
        points = [];

    points.push(new PIXI.Point(x, y));

    for (i = 1; i < 7; i++) {
        angle = 2 * Math.PI / 6 * (i + offset);
        x = center.x * Math.cos(angle);
        y = center.y * Math.sin(angle);

        points.push(new PIXI.Point(x, y));
    }

    return new PIXI.Polygon(points);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2VzNi91dGlscy1zcGVjLmVzNi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL3BpeGlfY3JlYXRlSGV4YWdvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztpRUFFaUIsOERBQThEOztzRUFDeEMsbUVBQW1FOzsrREFDL0YsNERBQTREOzs7O0FBRXBGLFFBQVEsQ0FBQywwQ0FBMEMsRUFBRSxZQUFXO0FBQzlELElBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBVTtBQUN0QixVQUFNLG9EQU5ELGFBQWEsQ0FNRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0dBQ3JDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQzs7O0FDVkgsWUFBWSxDQUFBOzs7OztRQUVJLGFBQWEsR0FBYixhQUFhOztBQUF0QixTQUFTLGFBQWEsS0FBd0IsTUFBTSxFQUFjO01BQTNDLE1BQU0sZ0NBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUU7TUFBVSxLQUFLLGdDQUFHLEVBQUU7O0FBQ3JFLE1BQUksS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pDLE1BQUksS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN0QixNQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7O0FBRWxCLE9BQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUM1QixZQUFZLENBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBRSxDQUFDOztBQUVwRSxTQUFPLEtBQUssQ0FBQztDQUNkOzs7QUNYRCxZQUFZLENBQUM7Ozs7O1FBSUcsVUFBVSxHQUFWLFVBQVU7UUFHVixRQUFRLEdBQVIsUUFBUTtRQU1SLGNBQWMsR0FBZCxjQUFjO1FBd0JkLFdBQVcsR0FBWCxXQUFXO1FBUVgsaUJBQWlCLEdBQWpCLGlCQUFpQjs7O0FBekMxQixTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDakMsU0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5Qjs7QUFDTSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDL0IsU0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN2Qjs7Ozs7QUFJTSxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQyxNQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFMUIsTUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsTUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRXZCLE1BQUksRUFBRSxHQUFHLENBQUMsR0FBRyxBQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuQyxNQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNsQyxNQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsTUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUU7QUFDcEQsV0FBTztBQUNILE9BQUMsRUFBRSxFQUFFO0FBQ0wsT0FBQyxFQUFFLEVBQUU7S0FDTixDQUFDO0dBQ0wsTUFBTTtBQUNMLFdBQU87QUFDTCxPQUFDLEVBQUUsRUFBRSxHQUFHLENBQUM7QUFDVCxPQUFDLEVBQUUsRUFBRSxHQUFJLEVBQUUsR0FBRyxDQUFDLEFBQUMsSUFBSSxBQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQztLQUMvQyxDQUFDO0dBQ0g7Q0FDRjs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsU0FBTztBQUNMLFVBQU0sRUFBRSxNQUFNO0FBQ2QsS0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ2IsS0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztHQUN6QixDQUFDO0NBQ0g7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqRCxNQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEMsTUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUM3QixNQUFJLFlBQVksR0FBRztBQUNqQixLQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbEIsS0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztHQUNwQixDQUFDO0FBQ0YsTUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQUksaUJBQWlCLENBQUM7O0FBRXRCLG1CQUFpQixHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxNQUFJLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RCxVQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FDdEQ7QUFDRCxjQUFZLEdBQUc7QUFDYixLQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLEtBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7R0FDakUsQ0FBQzs7QUFFRixTQUFPLFlBQVksQ0FBQztDQUNyQjs7QUFBQSxDQUFDOztxQkFFYTtBQUNiLFlBQVUsRUFBRSxVQUFVO0FBQ3RCLFVBQVEsRUFBRSxRQUFRO0FBQ2xCLGdCQUFjLEVBQUUsY0FBYztBQUM5QixhQUFXLEVBQUUsV0FBVztBQUN4QixtQkFBaUIsRUFBRSxpQkFBaUI7Q0FDckM7OztBQzFFRCxZQUFZLENBQUE7Ozs7O1FBR0ksYUFBYSxHQUFiLGFBQWE7OztBQUF0QixTQUFTLGFBQWEsS0FBd0IsTUFBTSxFQUFpQztRQUE5RCxNQUFNLGdDQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFO1FBQVUsS0FBSyxnQ0FBRyxFQUFFO1FBQUUsU0FBUyxnQ0FBRyxLQUFLOztBQUN4RixRQUFJLENBQUMsR0FBRyxDQUFDO1FBQ0wsTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUM1QixLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU07UUFDaEMsTUFBTSxHQUFHLE1BQU07UUFDZixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixVQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEMsU0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEIsYUFBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFBLEFBQUMsQ0FBQztBQUN2QyxTQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLFNBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRS9CLGNBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDOztBQUVELFdBQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2pDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvdXRpbHMvY3JlYXRlSGV4YWdvbic7XG5pbXBvcnQgeyBjcmVhdGVIZXhhZ29uIGFzIHBpeGlfY3JlYXRlSGV4YWdvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvdXRpbHMvcGl4aV9jcmVhdGVIZXhhZ29uJztcbmltcG9ydCBoZXhhZ29uTWF0aCBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoJztcblxuZGVzY3JpYmUoXCJ1bml0VGVzdCBwaXhpLmpzIHV0aWxzLmNyZWF0ZUhleGFnb24gLT4gXCIsIGZ1bmN0aW9uKCkge1xuICBpdChcIj0+IC4uLiBcIiwgZnVuY3Rpb24oKXtcbiAgICBleHBlY3QoY3JlYXRlSGV4YWdvbikudG9CZURlZmluZWQoKTtcbiAgfSk7XG59KTsiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGFuZ2xlID0gMzApIHtcbiAgdmFyIHNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIHZhciBjb2xvciA9IFwiIzQ0NDQ0NFwiO1xuICB2YXIgcG9pbnRTaXplID0gMDtcblxuICBzaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoY29sb3IpXG4gICAgLmRyYXdQb2x5U3RhciAoIGNvb3Jkcy54LCBjb29yZHMueSwgcmFkaXVzLCA2LCBwb2ludFNpemUsIGFuZ2xlICk7XG5cbiAgcmV0dXJuIHNoYXBlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyogTk9URTogVGhlc2UgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgaGV4YWdvbnMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNIZWlnaHQocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY1NpZGUocmFkaXVzKSB7XG4gIHJldHVybiByYWRpdXMgKiAzIC8gMjtcbn1cblxuLyogTW9kaWZpZWQgRnJvbSBqYXZhIGV4YW1wbGU6IGh0dHA6Ly9ibG9nLnJ1c2xhbnMuY29tLzIwMTEvMDIvaGV4YWdvbmFsLWdyaWQtbWF0aC5odG1sXG4gICBUaGlzIGlzIHN1cHBvc2VkIHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCBoZXhhZ29uYWwgaW5kZXgsIHRoYXQgcmVwcmVzZW50cyB0aGUgaGV4YWdvbiB0aGUgcGxheWVyIGNsaWNrZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpIHtcbiAgdmFyIEhFSUdIVCA9IHJhZGl1cyAqIE1hdGguc3FydCgzKTtcbiAgdmFyIFNJREUgPSByYWRpdXMgKiAzIC8gMjtcblxuICB2YXIgY2kgPSBNYXRoLmZsb29yKHgvU0lERSk7XG4gIHZhciBjeCA9IHggLSBTSURFICogY2k7XG5cbiAgdmFyIHR5ID0geSAtIChjaSAlIDIpICogSEVJR0hUIC8gMjtcbiAgdmFyIGNqID0gTWF0aC5mbG9vciggdHkgLyBIRUlHSFQpO1xuICB2YXIgY3kgPSB0eSAtIEhFSUdIVCAqIGNqO1xuXG4gIGlmIChjeCA+IE1hdGguYWJzKHJhZGl1cyAvIDIgLSByYWRpdXMgKiBjeSAvIEhFSUdIVCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBjaSxcbiAgICAgICAgeTogY2pcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNpIC0gMSxcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZXhhU2l6ZShyYWRpdXMpIHtcbiAgcmV0dXJuIHtcbiAgICByYWRpdXM6IHJhZGl1cyxcbiAgICB4OiByYWRpdXMgKiAyLFxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhQ2VudGVyQ29vcmQoaGV4UmFkaXVzLCB4LCB5KSB7XG4gIHZhciBoZXhhU2l6ZSA9IGdldEhleGFTaXplKGhleFJhZGl1cyk7XG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XG4gIHZhciBoYWxmSGV4YVNpemUgPSB7XG4gICAgeDogaGV4YVNpemUucmFkaXVzLFxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcbiAgfTtcbiAgdmFyIGNlbnRlckNvb3JkcyA9IHt9O1xuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XG5cbiAgY29vcmRpbmF0ZUluZGV4ZXMgPSBzZXRDZWxsQnlQb2ludChyYWRpdXMsIHgsIHkpO1xuXG4gIGlmIChjb29yZGluYXRlSW5kZXhlcy54IDwgMCAmJiBjb29yZGluYXRlSW5kZXhlcy54IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImNsaWNrIG91dHNpZGUgb2YgdGhlIGhleGFnb24gYXJlYVwiKTtcbiAgfVxuICBjZW50ZXJDb29yZHMgPSB7XG4gICAgeDogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy54ICogaGV4YVNpemUueCArIGhhbGZIZXhhU2l6ZS54KSxcbiAgICB5OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnkgKiBoZXhhU2l6ZS55ICsgaGFsZkhleGFTaXplLnkpXG4gIH07XG5cbiAgcmV0dXJuIGNlbnRlckNvb3Jkcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FsY0hlaWdodDogY2FsY0hlaWdodCxcbiAgY2FsY1NpZGU6IGNhbGNTaWRlLFxuICBzZXRDZWxsQnlQb2ludDogc2V0Q2VsbEJ5UG9pbnQsXG4gIGdldEhleGFTaXplOiBnZXRIZXhhU2l6ZSxcbiAgdG9IZXhhQ2VudGVyQ29vcmQ6IHRvSGV4YUNlbnRlckNvb3JkXG59OyIsIid1c2Ugc3RyaWN0J1xuXG4vKiogQ3JlZGl0cyBiZWxvZ24gdG86IGh0dHBzOi8vZ2l0aHViLmNvbS9hbGZvcm5vLXByb2R1Y3Rpb25zL0hleFBpeGlKcy9ibG9iL21hc3Rlci9saWIvaGV4UGl4aS5qcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGFuZ2xlID0gMzAsIGlzRmxhdFRvcCA9IGZhbHNlKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG9mZnNldCA9IGlzRmxhdFRvcCA/IDAgOiAwLjUsXG4gICAgICBhbmdsZSA9IDIgKiBNYXRoLlBJIC8gNiAqIG9mZnNldCxcbiAgICAgIGNlbnRlciA9IGNvb3JkcyxcbiAgICAgIHggPSBjZW50ZXIueCAqIE1hdGguY29zKGFuZ2xlKSxcbiAgICAgIHkgPSBjZW50ZXIueSAqIE1hdGguc2luKGFuZ2xlKSxcbiAgICAgIHBvaW50cyA9IFtdO1xuXG4gIHBvaW50cy5wdXNoKG5ldyBQSVhJLlBvaW50KHgsIHkpKTtcblxuICBmb3IgKGkgPSAxOyBpIDwgNzsgaSsrKSB7XG4gICAgICBhbmdsZSA9IDIgKiBNYXRoLlBJIC8gNiAqIChpICsgb2Zmc2V0KTtcbiAgICAgIHggPSBjZW50ZXIueCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgIHkgPSBjZW50ZXIueSAqIE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgcG9pbnRzLnB1c2gobmV3IFBJWEkuUG9pbnQoeCwgeSkpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQSVhJLlBvbHlnb24ocG9pbnRzKTtcbn0iXX0=
