'use strict'

export function createHexagon(coords = { x:0, y:0 }, radius, sides, pointSize = 0, angle = 0, color = "#444444") {
  var shape = new createjs.Shape();

  shape.graphics.beginFill(color)
    .drawPolyStar ( coords.x, coords.y, radius, sides, pointSize, angle );

  return shape;
}