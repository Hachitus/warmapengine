'use strict';

/* @todo should be removed. This is not used */

/* HORIZONTAL HEXAGONS
  This calculates in which hexagon the given coordinate is in. For example if the player clicks the map we need to
  determine which hexagon he clicked.

  This is for the horizontally aligned hexagons

  @param {coordinates} coords { x: Number, y: Number }
  @param {object} mapSize { x: Number, y: Number, blocks: { xCount: Number, yCount: Number } }. Blocks are the amount of hexagons
  in horizontal and vertical

  @todo I think this should be multiton. If needed we need to instantiate more than one instance of this.
*/
export let map_coords_horizontalHex = function map_coords_horizontalHex(hexRadius) {
  var hexaSize;

  hexaSize = _getHexaSize(hexRadius);

  return function toHexaCenterCoord(x, y) {
    var radius = hexaSize.radius;
    var halfHexaSize = {
      x: hexaSize.radius,
      y: hexaSize.y * 0.5
    };
    var centerCoords = {};
    var coordinateIndexes;

    coordinateIndexes = _setCellByPoint(radius, x, y);

    if(coordinateIndexes.x < 0 && coordinateIndexes.x < 0) {
      throw new Error("click outside of the hexagon area");
    }
    centerCoords = {
      x: Math.round(coordinateIndexes.x * hexaSize.x + halfHexaSize.x),
      y: Math.round(coordinateIndexes.y * hexaSize.y + halfHexaSize.y)
    };

    return centerCoords;
  };
};

/* ===== Private functions ===== */
function _getHexaSize(radius) {
  return {
    radius: radius,
    x: radius * 2,
    y: radius * Math.sqrt(3)
  };
}

/* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
   This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked */
function _setCellByPoint(radius, x, y) {
  var HEIGHT = radius * Math.sqrt(3);
  var SIDE = radius * 3 / 2;

  var ci = Math.floor(x/SIDE);
  var cx = x - SIDE * ci;

  var ty = y - (ci % 2) * HEIGHT / 2;
  var cj = Math.floor( ty / HEIGHT);
  var cy = ty - HEIGHT * cj;

  if (cx > Math.abs(radius / 2 - radius * cy / HEIGHT)) {
      return {
        x: ci,
        y: cj
      };
  } else {
    return {
      x: ci - 1,
      y: cj + (ci % 2) - ((cy < HEIGHT / 2) ? 1 : 0)
    };
  }
}