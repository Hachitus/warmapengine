'use strict';

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

import { Object_sprite } from '../pixi_Object';

export class Object_sprite_terrain extends Object_sprite {
	/**
	 * @param {x: Number, y: Number} coords Coordinates for the object relative to it's parent
	 * @param {object} data This units data
	 * @param {object} options other specific options for constructing this terrain */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultTerrainObject";
    this.type = "terrain";
    this.highlightable = false;
    this.selectable = false;
  }
}