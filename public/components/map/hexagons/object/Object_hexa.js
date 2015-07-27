'use strict';

import { Object_sprite } from '../../core/Object';
import { createHexagon } from '../utils/createHexagon';
import hexagonMath from '../utils/hexagonMath';

var shape;

export class Object_sprite_hexa extends Object_sprite {
  constructor(coords = {x:0, y:0}, data,  spritesheet, currentFrameNumber, extra = { radius: 0 }) {
    var shape;

    const HEIGHT = hexagonMath.calcHeight(extra.radius);
    const SIDE = hexagonMath.calcSide(extra.radius);

    super(coords, data,  spritesheet, currentFrameNumber);

    var hexagonSize = hexagonMath.getHexaSize(extra.radius);
    this.regX = hexagonSize.x / 2;
    this.regY = hexagonSize.y / 2;
    this.HEIGHT = HEIGHT;
    this.SIDE = SIDE;

    if (!extra.radius) {
      throw new Error("Need radius!");
    }

    /* Draw hexagon to test the hits with hitArea */
    //shape = createHexagon({ x:0, y:0 }, extra.radius, 6, extra.pointSize, 30, extra.color);

    this.hitArea = setAndGetShape(extra.radius);
  }
  static getShape() {
    return shape;
  }
}

function setAndGetShape(radius) {
  if (!shape) {
    let hexagonSize = hexagonMath.getHexaSize(radius);
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = createHexagon({ x:hexagonSize.y + hexagonSize.y /2, y:hexagonSize.x + hexagonSize.x / 2 }, radius);
  }

  return shape;
}