'use strict';

import { createHexagon } from '../utils/pixi_createHexagon';
import hexagonMath from '../utils/hexagonMath';

var shape;

export var object_sprite_hexa = {
  build: function calculateHexa(radius) {
      if (!radius) {
        throw new Error("Need radius!");
      }

      const HEIGHT = hexagonMath.calcLongDiagonal(radius);
      const WIDTH = hexagonMath.calcShortDiagonal(radius);
      const SIDE = hexagonMath.calcSide(radius);

      this.anchor.set(0.5, 0.5);
      this.HEIGHT = HEIGHT;
      this.WIDTH = WIDTH;
      this.SIDE = SIDE;

      /* Draw hexagon to test the hits with hitArea */
      this.hitArea = setAndGetShape(radius);
    }
};

function setAndGetShape(radius) {
  if (!shape) {
    shape = createHexagon(radius);
  }

  return shape;
}