'use strict'

import { calcHeight, getHexagonPoints } from './hexagonMath';

/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */
// Creates a hex shaped polygon that is used for the hex's hit area.
export function createHexagon(radius, isFlatTop = false) {
  var points = [];

    points = getHexagonPoints(radius).map(function(point) {
      return new PIXI.Point(point.x, point.y);
    })

  return new PIXI.Polygon(points);
}