'use strict';

import { getHexagonPoints } from './hexagonMath';

/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */
// Creates a hex shaped polygon that is used for the hex's hit area.
export function createHexagon(radius, isFlatTop = false) {
  var points = [];

  points = coordsToPixiPoints(radius);

  return new PIXI.Polygon(points);
}
export function createVisibleHexagon(radius, options = { color: "#000000", isFlatTop: false }) {
  var graphics = new PIXI.Graphics();
  var points = coordsToPixiPoints(radius);

  graphics.beginFill(options.color, 1);
  graphics.drawPolygon(points);
  graphics.endFill();

  return graphics;
}

/******* PRIVATE *******/
function coordsToPixiPoints(radius) {
  return getHexagonPoints(radius).map(function(point) {
    return new PIXI.Point(point.x, point.y);
  });
}