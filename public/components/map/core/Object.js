'use strict';

/** This class needs to be gone through carefully, it has been copied from an older version straight. The version was ES5
@param {createjs.Point} coords - the coordinate where the object is located at
@param {} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
but rather things like unit-data and city-data presentations etc.
@param {createjs.SpriteSheet} spriteSheet
@param {Int] currFrameNumber - the current frames number. This is basically the initial image, we can change it later
for animation or such

All of the objects need to have same argumentAPI for creating objects: coords, data, imageData
*/

export class Object_sprite extends createjs.Sprite {
  constructor(coords, data,  spritesheet, currentFrameNumber) {
    super(spritesheet);

    this.name = "general Objects_sprite_" + this.id;

    /* Set data for the object next */
    this.data = data || {};
    this.currFrameNumber = currentFrameNumber;

    /* Execute initial draw function */
    this.innerDraw(coords.x, coords.y);

    /* optimizations */
    this.shadow = true;
    this.tickEnabled = false;
    // Should be enabled, if the layer is being interacted with. Like unit layer. This way we can use cursor pointer etc.
    this.mouseEnabled = false;
    // FOR DEBUGGING AND SEEING THAT LISTENERS ARE ATTACHED:
    //this.willTrigger
  }
  setData(data) {
    this.data = data;

    return this;
  }
  /* Drawing the object with createjs-methods */
  innerDraw(x, y) {
    this.gotoAndStop( this.currFrameNumber );
    console.log("HAAA")
    this.x = x;
    this.y = y;
    /* The mouse check has been enabled on higher tier, so no need for this
    this.mouseEnabled = false; */

    return this;
  }
  drawNewFrame(x, y, newFrameNumber) {
    this.currFrameNumber = newFrameNumber;

    return this.innerDraw(x, y);
  }
  /* Dunno if we need this and so on. This was in the old version */
  globalCoords() {
    return {
      x: Number( this.x + this.parent.x ),
      y: Number( this.y + this.parent.y )
    };
  }
  getBoundsFromFrames() {
     return this.spriteSheet.getFrameBounds( this.currentFrame );
  }
}