'use strict';

/**
 * This module will hold the most common graphical effects used in the map. It is still very stub as the development
 * hasn't proceeded to this stage yet.
 */

/***********************
********* API **********
***********************/
export const graphics = setupGraphics();

/***********************
******** PUBLIC ********
***********************/
function setupGraphics() {
  /***********************
  ********* API **********
  ***********************/
  return {
    dropShadow
  };

  /***********************
  ******** PUBLIC ********
  ***********************/
  /**
   * INHERIT THIS TO OBJECT
   *
   * @param  {Object} options [description]
   * @return {[type]}         [description]
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