'use strict';

export class Object_sprite extends PIXI.Sprite {
  constructor(coords, data, currentFrame, throwShadowOptions) {
    super(currentFrame);
    this.name = "Objects_sprite_" + this.id;
    this.type = "None";
    this.highlightable = true;
    this.selectable = true;
    /* Set data for the object next */
    this.data = data || {};
    this.currentFrame = currentFrame;
    /* Execute initial draw function */
    //this.innerDraw(coords.x, coords.y);
    this.position.set(coords.x,  coords.y);
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.setupShadow(throwShadowOptions);

    this.tickEnabled = false;
    this.mouseEnabled = false;
  }
  /** Drawing the object with createjs-methods
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @return this object instance */
  innerDraw(x, y) {
    this.fromFrame ( this.currentFrame );
    this.x = x;
    this.y = y;

    return this;
  }
  /** Draws new frame to animate or such
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @param {Number} newFrameNumber New frame number to animate to
   * @return this object instance */
  drawNewFrame(x, y, newFrame) {
    this.currentFrame = newFrame;

    return this.innerDraw(x, y);
  }
  setupShadow(options = {color: "#000000", offsetX: 5, offsetY: 5, blur: 10} ) {
    if(this.throwShadow === true) {
      console.warn("NO SHADOW FUNCTION SET!")
    }
  }
}