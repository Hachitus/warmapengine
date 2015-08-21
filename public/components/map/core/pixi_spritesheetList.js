/** We want to put spritesheets to their own module, so they are separated and e.g. we can remove createjs from the
 * spritesheet if needed */

'use strict';

/* Singleton so we don't use class definition */
export function spritesheetList () {
  var scope = {};

  /** Create new spritesheet (new createjs.SpriteSheet()) and keeps it in object collection. So we don't create acciden-
   * tally another one and we can safely remove it later.
   * @param {Object} spritesheetData Object that contains createjs-compatible spritesheetData
   * @return new spritesheet instance to use. */
  scope.createSpritesheet = function createSpritesheet(spritesheetData) {
    var loader = new PIXI.AssetLoader(spritesheetData);
    var promise = Q.defer();

    loader.onComplete = function() {
      promise.resolve(true);
    };
    loader.load();

    return promise.promise;
  }

  return scope;
}