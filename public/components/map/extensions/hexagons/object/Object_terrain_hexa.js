'use strict';

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these
 * @class
 */

/***********************
******* IMPORTS ********
***********************/
import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_terrain } from '/components/map/core/objects/Object_sprite_terrain';

/***********************
********* API **********
***********************/
/**
 * @class
 *
 * @param {x: Number, y: Number} coords     Coordinates for the object relative to it's parent
 * @param {object} data                     This units custom data
 * @param {Object} options                  options.radius REQUIRED. This is the radius of the game maps hexagon
 */
export class Object_terrain extends Object_sprite_terrain {
  constructor(coords, data, options) {
    var { radius } = options;

    super(coords, data, options);

    this.name = "DefaultTerrainObject_hexa";

    object_sprite_hexa.build.call(this, radius);
  }
}