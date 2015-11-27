'use strict';

import { object_sprite_hexa } from './Object_hexa';
import { Object_sprite_unit } from '/components/map/core/objects/Object_sprite_unit';

/**
 * @param {x: Number, y: Number} coords         This units coordinates, relative to it's parent container
 * @param {object} data                         This units custom data
 * @param {Object} options                      options.radius REQUIRED. This is the radius of the game maps hexagon
 */
export class Object_unit extends Object_sprite_unit {
  constructor(coords, data, options) {
    var { radius } = options;

    super(coords, data, options);

    this.name = "DefaultUnitObjects_hexa";

    object_sprite_hexa.build.call(this, radius);
  }
}