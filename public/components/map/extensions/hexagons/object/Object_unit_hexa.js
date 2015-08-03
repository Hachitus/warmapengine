'use strict';

import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_unit } from '../../../core/objects/Object_sprite_unit';

export class Object_unit extends Object_sprite_unit {
  constructor(coords = {x:0, y:0}, data,  spritesheet, currentFrameNumber, extra = {radius: 0 }) {
    super(coords, data,  spritesheet, currentFrameNumber);

    this.name = "DefaultUnitObjects_hexa";

    object_sprite_hexa.build.call(this, extra.radius);
  }
}