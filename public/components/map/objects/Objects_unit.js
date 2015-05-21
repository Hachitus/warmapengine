'use strict';

import { Objects_sprite } from '../core/Objects';

export class Objects_unit extends Objects_sprite {
  construct(coords, data, spriteSheet, currFrameNumber) {
    super.spriteSheet(coords, data, spriteSheet, currFrameNumber);

    this.name = "DefaultUnitObjects";
  }
}