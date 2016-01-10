'use strict';

/*---------------------
--------- API ---------
----------------------*/
export const effects = setupEffects();

/*---------------------
-------- PUBLIC -------
----------------------*/
/**
 * This module will hold the most common graphical effects used in the map. It is still very stub as the development
 * hasn't proceeded to this stage yet.
 *
 * @class core.utils.effects
 * @memberof Map.core.utils
 * @return {Object}      init, _startDragListener
 */
function setupEffects() {
  /*---------------------
  ------- API ----------
  --------------------*/
  return {
    dropShadow
  };

  /*----------------------
  ------- PUBLIC ---------
  ----------------------*/
  /**
   * @param  {Object} options       [description]
   */
  function dropShadow(options = { color: "#000000", distance: 5, alpha: 0.5, amgöe: 45, blur: 5 } ) {
      var shadow  = new PIXI.filters.DropShadowFilter();

      shadow.color  = options.color;
      shadow.distance = options.distance;
      shadow.alpha  = options.alpha;
      shadow.angle  = options.angle;
      shadow.blur   = options.blur;

      this.filters = [shadow];
    }
}