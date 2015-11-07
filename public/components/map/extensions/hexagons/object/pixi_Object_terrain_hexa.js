'use strict';

import { object_sprite_hexa } from './pixi_Object_hexa';
import { Object_sprite_terrain } from '../../../core/objects/pixi_Object_sprite_terrain';

export class Object_terrain extends Object_sprite_terrain {
  constructor(coords = {x:0, y:0}, data, options) {
    var { radius } = options;

    super(coords, data, options);

    this.name = "DefaultTerrainObject_hexa";

    object_sprite_hexa.build.call(this, radius);
  }
}