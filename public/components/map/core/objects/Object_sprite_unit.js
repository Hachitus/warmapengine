/* jshint ignore:start */
// JSHINT IGNORE: Since does not seem to handle ES6 classes properly.

'use strict';

/** Map unit like infantry or worker, usually something with actions or movable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

import { Object_sprite } from '../Object';
import { graphics } from "/components/map/core/utils/effects";

export class Object_sprite_unit extends Object_sprite {
  /**
   * @param {x: Number, y: Number} coords Coordinates for the object relative to it's parent
   * @param {object} data This units data
   * @param {object} options other specific options for constructing this unit, like options.throwShadow */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultUnitObjects";
    this.type = "unit";
    this.highlightable = true;
    this.selectable = true;
    this.actions = {
      move: [],
      attack: []
    };
    options.throwShadow = true;
    if (options.throwShadow === true) {
      this.shadow = graphics.dropShadow("#000000", 5, 5, 10);
    }
  }
  /* Implementations for the future: Execute action on units (move, attack etc.) */
  doAction(type) {
    this.actions[type].forEach(action => {
      action();
    });
  }
  /* Implementations for the future: Add certain action type */
  addActionType(type) {
    this.actions[type] = this.actions[type] || [];
  }
  /* Implementations for the future: Attach callback for the certain action type */
  addCallbackToAction(type, cb) {
    this.actions[type].push(cb);
  }
}