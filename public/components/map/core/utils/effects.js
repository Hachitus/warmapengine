/* global createjs */

'use strict';

export var graphics = {
  dropShadow: function(color, a, b, c) {
    return new createjs.Shadow(color, a, b, c);
  }
};