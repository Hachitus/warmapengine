'use strict';

/*-----------------------
-------- IMPORTS --------
-----------------------*/
import { getHexagonPoints } from './hexagonMath';

/*-----------------------
----------- API ---------
-----------------------*/
export default {
  createHexagon,
  createVisibleHexagon
};
export { createHexagon as createHexagon };
export { createVisibleHexagon as createVisibleHexagon };

/*-----------------------
--------- PUBLIC --------
-----------------------*/
/**
 * This manages some utility functionalities for creating hexagons
 *
 * @class hexagonPlugin.utils
 */
/**
 * Credits belong to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js
 * Creates a hex shaped polygon that is used for the hex's hit area.
 *
 * @private
 * @static
 * @method createHexagon
 * @param {Number} radius       Radius of the hexagon
 * @param {Object} options      Options, such as: isFlatTop (Boolean), is the heaxgon flat-topped
 * @return {PIXI.Polygon}       Hexagon shaped PIXI.Polygon object. That houses the hexagons corner points.
 */
function createHexagon(radius, options = { isFlatTop: false }) {
  var points = [];

  points = coordsToPixiPoints(radius);

  return new PIXI.Polygon(points);
}
/**
 * @private
 * @static
 * @method createVisibleHexagon
 * @param {Number} radius       Radius of the hexagon
 * @param {Object} options      Options, such as:
 *                              color: The fill color of the hexagon
 *                              isFlatTop (Boolean), is the heaxgon flat-topped
 * @return {PIXI.Graphics}      Graphics object that is shaped as hexagon, based on given radius and options.
 */
function createVisibleHexagon(radius, options = { color: "#000000", isFlatTop: false }) {
  var graphics = new PIXI.Graphics();
  var points = coordsToPixiPoints(radius);

  graphics.beginFill(options.color, 1);
  graphics.drawPolygon(points);
  graphics.endFill();

  return graphics;
}

/*-----------------------
--------- PRIVATE -------
-----------------------*/
/**
 * Converts Array of x- and y-coordinates to new PIXI.Point coordinates
 *
 * @private
 * @static
 * @method coordsToPixiPoints
 * @param  {Number} radius        Hexagons radius
 * @return {Array}                Array of PIXI.Point coordinates
 */
function coordsToPixiPoints(radius) {
  return getHexagonPoints(radius).map(function(point) {
    return new PIXI.Point(point.x, point.y);
  });
}