'use strict';
/* NOTE: These calculations are for vertical hexagons */

export function calcHeight(radius) {
  //return radius;
  return radius * Math.sqrt(3);
}
export function calcWidth(radius) {
  return radius * Math.sqrt(3);
}
export function calcSide(radius) {
  return radius * 3 / 2;
}

export function getHexagonPoints(radius, x = 0, y = 0, isFlatTop = false) {
  var i = 0,
    offset = isFlatTop ? 0 : 0.5,
    angle = 2 * Math.PI / 6 * offset,
    hexagonSize = {
      x: calcWidth(radius) / 2,
      y: radius
    },
    x = ( hexagonSize.x * Math.cos(angle) ) + x,
    y = ( hexagonSize.y * Math.sin(angle) ) + y,
    points = [];

  y = y - hexagonSize.y / 2;

  points.push({
    x,
    y
  });

  for (i = 1; i < 7; i++) {
    angle = 2 * Math.PI / 6 * (i + offset);
    x = ( hexagonSize.x * Math.cos(angle) ) + x;
    y = ( hexagonSize.y * Math.sin(angle) ) + y;

    points.push({
      x,
      y
    });
  }

  return points;
}

/* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
   This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked */
export function setCellByPoint(radius, x, y) {
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

export function getHexaSize(radius) {
  return {
    radius: radius,
    x: radius * 2,
    y: radius * Math.sqrt(3)
  };
}

export function toHexaCenterCoord(hexRadius, x, y) {
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
};

export function hexaHitTest(points, hitCoords = {x:0, y:0}, offsetCoords = {x:0, y:0}) {
  var offsetPoints = points.map(point => {
    return {
      x: point.x + offsetCoords.x,
      y: point.y + offsetCoords.y
    };
  });

  return pointInPolygon(hitCoords, offsetPoints);
}

export default {
  calcHeight: calcHeight,
  calcSide: calcSide,
  setCellByPoint: setCellByPoint,
  getHexaSize: getHexaSize,
  toHexaCenterCoord: toHexaCenterCoord
};

/* credits to: https://github.com/substack/point-in-polygon */
function pointInPolygon(point, vs) {
  var x = point.x, y = point.y;
    
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].x, yi = vs[i].y;
      var xj = vs[j].x, yj = vs[j].y;
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
}