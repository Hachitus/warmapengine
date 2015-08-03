'use strict';

import { Object_sprite } from '../Object';

export class Object_sprite_unit extends Object_sprite {
  constructor(coords, data, spriteSheet, currFrameNumber) {
    super(coords, data, spriteSheet, currFrameNumber);

    this.name = "DefaultUnitObjects";
    this.actions = {
      move: [],
      attack: []
    };
  }
  doAction(type) {
    this.actions[type].forEach(action => {
      action();
    });
  }
  addActionType(type) {
    this.actions[type] = this.actions[type] || [];
  }
  addCallbackToAction(type, cb) {
    this.actions[type].push(cb);
  }
}