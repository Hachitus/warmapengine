'use strict';

import { Object_sprite } from '../../core/Object';
import { createHexagon } from '../utils/createHexagon';
import hexagonMath from '../utils/hexagonMath';

export class Object_sprite_hexa extends Object_sprite {
  constructor(coords, data,  spritesheet, currentFrameNumber, extra = { radius: 0, pointSize: 0, color: "#444444" }) {
    var shape;

    const HEIGHT = hexagonMath.calcHeight(extra.radius);
    const SIDE = hexagonMath.calcSide(extra.radius);

    super(coords, data,  spritesheet, currentFrameNumber);

    this.regX = extra.radius;
    this.regY = extra.radius;
    this.HEIGHT = HEIGHT;
    this.SIDE = SIDE;

    if(!extra.radius) {
      throw new Error("Need radius!");
    }

    /* Draw hexagon to test the hits with hitArea */
    shape = createHexagon({ x:0, y:0 }, extra.radius, 6, extra.pointSize, 30, extra.color);

    this.hitArea = shape;
  }
}