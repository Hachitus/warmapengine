'use strict'

import { calcHeight } from './hexagonMath';

/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */
// Creates a hex shaped polygon that is used for the hex's hit area.
export function createHexagon(radius, isFlatTop = false) {
  var i = 0,
      offset = isFlatTop ? 0 : 0.5,
      angle = 2 * Math.PI / 6 * offset,
      hexagonSize = {
        x: radius,
        y: calcHeight(radius)
      },
      x = hexagonSize.x * Math.cos(angle),
      y = hexagonSize.y * Math.sin(angle),
      points = [];

  points.push(new PIXI.Point(x, y));

  for (i = 1; i < 7; i++) {
      angle = 2 * Math.PI / 6 * (i + offset);
      x = hexagonSize.x * Math.cos(angle);
      y = hexagonSize.y * Math.sin(angle);

      points.push(new PIXI.Point(x, y));
  }

  return new PIXI.Polygon(points);
}