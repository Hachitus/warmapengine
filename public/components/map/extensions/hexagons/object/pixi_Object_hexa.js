'use strict';

import { createHexagon } from '../utils/createHexagon';
import hexagonMath from '../utils/hexagonMath';

var shape;

export var object_sprite_hexa = {
  build: function calculateHexa(radius) {
      if (!radius) {
        throw new Error("Need radius!");
      }

      const HEIGHT = hexagonMath.calcHeight(radius);
      const SIDE = hexagonMath.calcSide(radius);

      var hexagonSize = hexagonMath.getHexaSize(radius);
      this.anchor.x = hexagonSize.x / 2;
      this.anchor.y = hexagonSize.y / 2;
      this.HEIGHT = HEIGHT;
      this.SIDE = SIDE;

      /* Draw hexagon to test the hits with hitArea */
      this.hitArea = setAndGetShape(radius);
    }
};

function setAndGetShape(radius) {
  if (!shape) {
    let hexagonSize = hexagonMath.getHexaSize(radius);
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = createHexagon({ x: hexagonSize.y / 2, y: hexagonSize.x / 2 }, radius);
  }

  return shape;
}