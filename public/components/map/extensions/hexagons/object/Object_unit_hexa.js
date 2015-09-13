'use strict';

import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_unit } from '../../../core/objects/Object_sprite_unit';
import { hexaHitTest, getHexagonPoints } from '../utils/hexagonMath';

export class Object_unit extends Object_sprite_unit {
  constructor(coords = {x:0, y:0}, data,  spritesheet, currentFrameNumber, extra = {radius: 0 }) {
    super(coords, data,  spritesheet, currentFrameNumber);

    this.name = "DefaultUnitObjects_hexa";
    this.customHitArea = getHexagonPoints(extra.radius);

    object_sprite_hexa.build.call(this, extra.radius);
  }
  contains(x, y) {
    var offsetCoords = {
      x: Number(this.x) + Number(this.regX),
      y: Number(this.y) + Number(this.regY)
    };
    var hitCoords = { x, y };

    return hexaHitTest(this.customHitArea, hitCoords, offsetCoords);
  }
}