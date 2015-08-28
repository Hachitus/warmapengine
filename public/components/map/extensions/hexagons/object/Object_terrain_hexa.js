'use strict';

import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_terrain } from '../../../core/objects/Object_sprite_terrain';

export class Object_terrain extends Object_sprite_terrain {
  constructor(coords = {x:0, y:0}, data,  spritesheet, currentFrameNumber, extra = {radius: 0 }) {
    super(coords, data,  spritesheet, currentFrameNumber);

    this.name = "DefaultTerrainObject_hexa";

    object_sprite_hexa.build.call(this, extra.radius);
  }
}