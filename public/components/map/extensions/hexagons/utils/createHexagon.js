'use strict'

import { calcHeight, getHexagonPoints } from './hexagonMath';

export function createHexagon(radius) {
  return getHexagonPoints(radius);
}

export function createVisibleHexagon(coords = { x:0, y:0 }, radius, color = "#444444", angle = 30) {
  var shape = new createjs.Shape();

  shape.graphics.beginFill(color)
    .drawPolyStar ( coords.x, coords.y, radius, 6, 0, angle );

  return shape;
}