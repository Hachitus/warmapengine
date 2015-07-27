'use strict'

export function createHexagon(coords = { x:0, y:0 }, radius, angle = 30) {
  var shape = new createjs.Shape();
  var color = "#444444";
  var pointSize = 0;

  shape.graphics.beginFill(color)
    .drawPolyStar ( coords.x, coords.y, radius, 6, pointSize, angle );

  return shape;
}