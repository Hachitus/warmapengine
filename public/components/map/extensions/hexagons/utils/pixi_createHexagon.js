'use strict'

/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */
export function createHexagon(coords = { x:0, y:0 }, radius, angle = 30, isFlatTop = false) {
  var i = 0,
      offset = isFlatTop ? 0 : 0.5,
      angle = 2 * Math.PI / 6 * offset,
      center = coords,
      x = center.x * Math.cos(angle),
      y = center.y * Math.sin(angle),
      points = [];

  points.push(new PIXI.Point(x, y));

  for (i = 1; i < 7; i++) {
      angle = 2 * Math.PI / 6 * (i + offset);
      x = center.x * Math.cos(angle);
      y = center.y * Math.sin(angle);

      points.push(new PIXI.Point(x, y));
  }

  return new PIXI.Polygon(points);
}