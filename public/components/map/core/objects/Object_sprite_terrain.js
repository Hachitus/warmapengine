'use strict';

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

import { Object_sprite } from '../Object';

export class Object_sprite_terrain extends Object_sprite {
  constructor(coords, data, spriteSheet, currFrameNumber, throwShadowOptions) {
    super(coords, data, spriteSheet, currFrameNumber, throwShadowOptions);

    this.name = "DefaultTerrainObject";
    this.type = "terrain";
    this.highlightable = false;
    this.selectable = false;
  }
}