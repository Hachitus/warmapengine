'use strict';

/**
 * Utility module, for making different calculations and tests when hexagon based grid map in use
 */

export default {
  calcShortDiagonal: calcShortDiagonal,
  calcLongDiagonal: calcLongDiagonal,
  calcSide: calcSide,
  getHexagonPoints: getHexagonPoints,
  hexaHitTest: hexaHitTest
};

/** Calculates the hexagons:
 * innerDiameter
 * - Vertical / Flat hexagons height
 * - Horizontal / pointy hexagons width
 *
 * @param {float} value - Usually the radius of the hexagon
 * @param {string} type - If you provide something else than radius, where the calculation is based from
 * @param {integer} precision - How many decimals to round
 */
export function calcShortDiagonal(value, type = "radius", precision = 3) {
  var answer;
  precision = Math.round(precision);

  if (type === "radius") {
    answer = value * Math.sqrt(3);
  }

  return Number( answer.toFixed(precision) );
}
/** Calculates the hexagons:
 * outerDiameter
 * - Vertical / Flat hexagons width
 * - Horizontal / pointy hexagons height
 *
 * @param {float} value					Usually the radius of the hexagon
 * @param {string} type					If you provide something else than radius, where the calculation is based from
 * @param {integer} precision 	How many decimals to round
 */
export function calcLongDiagonal(value, type = "radius", precision = 3) {
  var answer;

  if (type === "radius") {
    answer = value * 2;
  }

  return Number( answer.toFixed(precision) );
}
/** This is used, but might be considered for scrap, unless we want to calculate side from some other value */
export function calcSide(value, type = "radius", precision = 3) {
  var answer;

  if (type === "radius") {
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
/**
 * Test do the given coordinates hit the hexagon, given by the points container / array
 *
 * @param  {Array} points         Array of PIXI.points
 * @param  {Object} hitCoords     The coordinates to test against
 * @param  {Object} offsetCoords  offsetCoordinates that are added to the hitCoordinates. Separate because these are
 *                                outside the given array.
 * @return {Boolean}              Is the coordinate inside the hexagon or not
 */
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
/**
 * credits to: https://github.com/substack/point-in-polygon
 * Tests whether the given point / coordinate is inside the given points. Assuming the points form a polygon
 *
 * @param  {x: Number, y: Number} point       The point to test against
 * @param  {Array} vs                         The points of the polygon to test [0] === x-point, [1] === y-point
 * @return {Boolean}                          Is the coordinate inside the hexagon or not
 */
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