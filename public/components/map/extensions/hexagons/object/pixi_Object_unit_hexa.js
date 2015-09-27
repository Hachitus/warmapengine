'use strict';

import { object_sprite_hexa } from './pixi_Object_hexa';
import { Object_sprite_unit } from '../../../core/objects/pixi_Object_sprite_unit';

export class Object_unit extends Object_sprite_unit {
  constructor(coords = {x:0, y:0}, data, options) {
		var { radius } = options;
		
    super(coords, data, options);

    this.name = "DefaultUnitObjects_hexa";

    object_sprite_hexa.build.call(this, radius);
  }
}