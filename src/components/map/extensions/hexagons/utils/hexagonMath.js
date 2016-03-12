(function () {
  'use strict';

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  window.flatworld.extensions.hexagons.utils.calcShortDiagonal = calcShortDiagonal;
  window.flatworld.extensions.hexagons.utils.calcLongDiagonal = calcLongDiagonal;
  window.flatworld.extensions.hexagons.utils.hexaHitTest = hexaHitTest;
  window.flatworld.extensions.hexagons.utils.getClosestHexagonCenter = getClosestHexagonCenter;
  window.flatworld.extensions.hexagons.utils.init = init;

  /*-----------------------
  ------- VARIABLES -------
  -----------------------*/
  var point, radius;

  /**
   * Utility module, for making different calculations and tests when hexagon based grid map in use
   *
   * @class hexagonPlugin.utils
   */
  /*-----------------------
  --------- PUBLIC --------
  -----------------------*/
  /**
   * Calculates the hexagons:
   * innerDiameter
   * - Vertical / Flat hexagons height
   * - Horizontal / pointy hexagons width
   *
   * @method calcLongDiagonal
   * @static
   * @param {float} value - Usually the radius of the hexagon
   * @param {string} type - If you provide something else than radius, where the calculation is based from
   * @param {integer} precision - How many decimals to round
   */
  function calcShortDiagonal(value, type = "radius", precision = 3) {
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
   * @method calcLongDiagonal
   * @static
   * @param {float} value         Usually the radius of the hexagon
   * @param {string} type         If you provide something else than radius, where the calculation is based from
   * @param {integer} precision   How many decimals to round
   */
  function calcLongDiagonal(value, type = "radius", precision = 3) {
    var answer;

    if (type === "radius") {
      answer = value * 2;
    }

    return Number( answer.toFixed(precision) );
  }
  /**
   * Test do the given coordinates hit the hexagon, given by the points container / array
   *
   * @static
   * @method hexaHitTest
   * @param  {PIXI.Point[]} points             Array of PIXI.points
   * @param  {Object} hitCoords         The coordinates to test against
   * @param  {Integer} hitCoords.x      X coordinate
   * @param  {Integer} hitCoords.y      Y coordinate
   * @param  {Object} offsetCoords      offsetCoordinates that are added to the hitCoordinates. Separate because these are outside the
   * given array.
   * @param  {Integer} offsetCoords.x   X coordinate
   * @param  {Integer} offsetCoords.y   Y coordinate
   * @return {Boolean}                  Is the coordinate inside the hexagon or not
   */

  function hexaHitTest(points, hitCoords = {x:0, y:0}, offsetCoords = {x:0, y:0}) {
    var realPolygonPoints;

    realPolygonPoints = points.map(point => {
      return {
        x: point.x + offsetCoords.x,
        y: point.y + offsetCoords.y
      };
    });

    return pointInPolygon(hitCoords, realPolygonPoints);
  }
  /**
   * Set hexagon radius
   *
   * @static
   * @method setRadius
   * @param {Number} givenRadius    The radius of the hexagon
   */
  function init(givenRadius, givenPoint) {
    radius = givenRadius;
    point = givenPoint;
  }
  /**
   * Calculates the closest hexagon center coordinates, for the given coordinates. So aligning the given coordinates to proper hexagon
   * coordinates
   *
   * @static
   * @method getClosestHexagonCenter
   * @requires setRadius has to be set
   */
  function getClosestHexagonCenter(coordinates) {}
  /*-----------------------
  --------- PRIVATE -------
  -----------------------*/
  /**
   * credits to: https://github.com/substack/point-in-polygon
   * Tests whether the given point / coordinate is inside the given points. Assuming the points form a polygon
   *
   * @static
   * @private
   * @method pointInPolygon
   * @param  {Object} point             The coordinates to test against
   * @param  {Integer} hitCoords.x      X coordinate
   * @param  {Integer} hitCoords.y      Y coordinate
   * @param  {Integer[]} vs             The points of the polygon to test [0] === x-point, [1] === y-point
   * @return {Boolean}                  Is the coordinate inside the hexagon or not
   */
  function pointInPolygon(point, vs) {
    var x = point.x;
    var y = point.y;
    var inside = false;
    var xi, xj, yi, yj, intersect;

    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      xi = vs[i].x;
      yi = vs[i].y;
      xj = vs[j].x;
      yj = vs[j].y;
      intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }
})();