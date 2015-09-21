'use strict';
/** Calculates the hexagons:
 * innerDiameter
 * - Vertical / Flat hexagons height
 * - Horizontal / pointy hexagons width
 * @param {float} value - Usually the radius of the hexagon
 * @param {string} type - If you provide something else than radius, where the calculation is based from
 * @param {integer} precision - How many decimals to round
 */
export function calcShortDiagonal(value, type = "radius", precision = 3) {
	var answer;
	precision = Math.round(precision);
	
	if(type === "radius") {
		answer = value * Math.sqrt(3);
	}
	
	return Number( answer.toFixed(precision) );
}
/** Calculates the hexagons:
 * outerDiameter
 * - Vertical / Flat hexagons width
 * - Horizontal / pointy hexagons height
 * @param {float} value					Usually the radius of the hexagon
 * @param {string} type					If you provide something else than radius, where the calculation is based from
 * @param {integer} precision 	How many decimals to round
 */
export function calcLongDiagonal(value, type = "radius", precision = 3) {
	var answer;
	
	if(type === "radius") {
		answer = value * 2;
	}
	
	return Number( answer.toFixed(precision) );
}
/** This is used, but might be considered for scrap, unless we want to calculate side from some other value */
export function calcSide(value, type = "radius", precision = 3) {
	var answer;
	
	if(type === "radius") {
		answer = value;
	}
	
	return answer.toFixed(precision);
}
/**
 * @param {Float} radius			radius of the hexagon
 * @param {object} options		extra options, like generating horizontal hexagon points and 
 * how many decimals to round
*/
export function getHexagonPoints(radius, options = { isFlatTop: false, precision: 3 }) {	
	var i = 0;
	var offset = options.isFlatTop ? 0 : 0.5;
	var angle = 2 * Math.PI / 6 * offset;
	var center = {
				x: radius,
				y: radius
			};
	var x = center.x * Math.cos(angle);
	var y = center.y * Math.sin(angle);
	var points = [];
	
	points.push({x, y});

	for (i = 1; i < 7; i++) {
			angle = 2 * Math.PI / 6 * (i + offset);
			x = center.x * Math.cos(angle);
			y = center.y * Math.sin(angle);

			points.push({x, y});
	}

	return points;
}

export function hexaHitTest(points, hitCoords = {x:0, y:0}, offsetCoords = {x:0, y:0}) {
  var realPolygonPoints = points.map(point => {
    return {
      x: point.x + offsetCoords.x,
      y: point.y + offsetCoords.y
    };
  });

  return _pointInPolygon(hitCoords, realPolygonPoints);
}

/**************************
********* PRIVATE *********
**************************/
/* credits to: https://github.com/substack/point-in-polygon */
function _pointInPolygon(point, vs) {
  var x = point.x, y = point.y;
    
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].x, yi = vs[i].y;
      var xj = vs[j].x, yj = vs[j].y;
      var intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
				inside = !inside;
			}
  }
  
  return inside;
}

export default {
  calcShortDiagonal: calcShortDiagonal,
	calcLongDiagonal: calcLongDiagonal,
	calcSide: calcSide,
  getHexagonPoints: getHexagonPoints,
	hexaHitTest: hexaHitTest
};

/************************************
********** NOT IN USE ATM ***********
************************************/
/* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
 * This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked. */
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

/* From the x,y-coordinates calculates the closest hexagons center coordinates */
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
	
	function getHexaSize(radius) {
		return {
			radius: radius,
			x: radius * 2,
			y: radius * Math.sqrt(3)
		};
	}
}