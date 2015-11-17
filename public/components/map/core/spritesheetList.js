/* global createjs */

'use strict';

/**
 * @todo  We want to put spritesheets to their own module, so they are separated and e.g. we can remove createjs from the
 * spritesheet if needed
 * */

import hash from 'blueimp-md5';

var allSpritesheets = {};

/* Singleton so we don't use class definition */
export function spritesheetList () {
  var scope = {};

  /**
   * Create new spritesheet (new createjs.SpriteSheet()) and keeps it in object collection. So we don't create acciden-
   * tally another one and we can safely remove it later.
   * @param {Object} spritesheetData Object that contains createjs-compatible spritesheetData
   * @return new spritesheet instance to use.
   * */
  scope.createSpritesheet = function createSpritesheet(spritesheetData) {
    var spriteSheet;
    var ID = scope.getSpritesheetID(spritesheetData.images);

    if ( allSpritesheets[ID] ) {
      return allSpritesheets[ID];
    }

    spriteSheet = new createjs.SpriteSheet(spritesheetData);
    allSpritesheets[ID] = spriteSheet;

    return spriteSheet;
  };
  /**
   * Generates identifier for keeping track of spritesheets
   * @param {Object} spritesheetData spritesheetData that is used
   * @return generated hash identifier for spritesheet
   * */
  scope.getSpritesheetID = function getSpritesheetID(spritesheetData) {
    return hash.md5(spritesheetData);
  };
  scope.removeSpritesheet = function removeSpritesheet(spritesheetData) {
    var ID = scope.getSpritesheetID(spritesheetData);
    delete allSpritesheets[ID];
  };
  scope.getAllSpritesheets = function getAllSpritesheets () {
    return allSpritesheets;
  };

  return scope;
}