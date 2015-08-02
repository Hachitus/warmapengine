'use strict';

import { Object_sprite_hexa } from './Object_hexa';

export class Object_terrain_hexa extends Object_sprite_hexa {
  construct(...args) {
    super.spriteSheet(...args);

    this.name = "DefaultTerrainObject_hexa";
  }
}