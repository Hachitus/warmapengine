'use strict';

import { Object_sprite } from '../core/Object';

export class Object_unit extends Object_sprite {
  construct(coords, data, spriteSheet, currFrameNumber) {
    super.spriteSheet(coords, data, spriteSheet, currFrameNumber);

    this.name = "DefaultUnitObjects";
  }
}