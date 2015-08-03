'use strict';

import { Object_sprite } from '../Object';

export class Object_sprite_terrain extends Object_sprite {
  constructor(coords, data, spriteSheet, currFrameNumber) {
    super(coords, data, spriteSheet, currFrameNumber);

    this.name = "DefaultTerrainObject";
  }
}