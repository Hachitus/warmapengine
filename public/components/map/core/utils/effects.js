/* global createjs */

'use strict';

/**
 * This module will hold the most common graphical effects used in the map. It is still very stub as the development
 * hasn't proceeded to this stage yet.
 */

export var graphics = {
  dropShadow: function(color, a, b, c) {
    return new createjs.Shadow(color, a, b, c);
  }
};