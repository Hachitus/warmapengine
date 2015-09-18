'use strict';

import { createHexagon } from '../utils/createHexagon';
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

      this.regX = WIDTH / 2;
      this.regY = HEIGHT / 2;
      this.HEIGHT = HEIGHT;
			this.WIDTH = WIDTH;
      this.SIDE = SIDE;

      /* Draw hexagon to test the hits with hitArea */
      this.hitArea = setAndGetShape(radius);
			this.hitArea.x -= this.regX;
			this.hitArea.y -= this.regY;
    }
};

function setAndGetShape(radius) {
  if (!shape) {
    shape = createHexagon(radius);
  }

  return shape;
}