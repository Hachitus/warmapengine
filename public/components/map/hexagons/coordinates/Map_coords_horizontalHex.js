'use strict';

/*
  This calculates in which hexagon the given coordinate is in. For example if the player clicks the map we need to
  determine which hexagon he clicked.

  This is for the horizontally aligned hexagons

  @param {coordinates} coords { x: Number, y: Number }
  @param {object} mapSize { x: Number, y: Number, blocks: { xCount: Number, yCount: Number } }. Blocks are the amount of hexagons
  in horizontal and vertical
*/
export function Map_coords_horizontalHex(radius) {
  this.hexaSize = getHexaSize(radius);

  this.prototype.toHexaCenterCoord = function() {
    var radius = this.hexaSize.radius;
    var halfHexaSize = {
      x: this.hexaSize.radius,
      y: this.hexaSize.y * 0.5
    };
    var centerCoords = {};
    var coordinateIndexes;

    /* x-center calculated to hexagon */
    coordinateIndexes = setCellByPoint(radius, x, y);

    if(coordinateIndexes.x < 0 && coordinateIndexes.x < 0) {
      throw new Error("click outside of the hexagon area");
    }
    centerCoords = {
      x: Math.round(coordinateIndexes.x * this.hexaSize.x + halfHexaSize.x),
      y: Math.round(coordinateIndexes.y * this.hexaSize.y + halfHexaSize.y)
    };

    return centerCoords;

    /* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
       This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked */
    function setCellByPoint(radius, x, y) {
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
  };

  this.prototype.init = function (mapObj) {
    mapObj.toHexaCenterCoord = this.toHexaCenterCoord;
  }
};

/* ===== Private functions ===== */
function getHexaSize(radius) {
  return {
    radius: radius,
    x: radius * 2,
    y: radius * Math.sqrt(3)
  };
}