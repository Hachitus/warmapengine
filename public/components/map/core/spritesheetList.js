'use strict';

import hash from 'blueimp-md5';

let allSpritesheets = [];
let allSpritesheetIDs = [];

/* Singleton so we don't use class definition */
export function spritesheetList () {
  let scope = {};

  scope.addSpritesheet = function (spritesheetData) {
    let spriteSheet;

    if(scope.spritesheetAlreadyExists( _createID( spritesheetData ) ) ) {
      return false;
    }

    spriteSheet = new createjs.SpriteSheet(spritesheetData);

    allSpritesheets.push( spriteSheet );

    return spriteSheet;
  };
  scope.removeSpritesheet = function (spritesheet) {

  };
  scope.getAllSpritesheets = function () {
    return allSpritesheets;
  };
  scope.spritesheetAlreadyExists = function (spritesheetID) {
    return ( allSpritesheetIDs.indexOf( spritesheetID ) > -1 );
  };
  function _createID (spritesheetData) {
    return ( spritesheetData.images.toString() );
  };

  return scope;
}