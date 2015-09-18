'use strict';

/** The actual objects used on the map (suchs as terrain and units), under stages and containers.
@param {createjs.Point} coords - the coordinate where the object is located at
@param {} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
but rather things like unit-data and city-data presentations etc.
@param {createjs.SpriteSheet} spriteSheet
@param {Int] currFrameNumber - the current frames number. This is basically the initial image, we can change it later
for animation or such

All of the objects need to have same argumentAPI for creating objects: coords, data, imageData */

var extensions = [];

export class Object_sprite extends createjs.Sprite {
  constructor(coords, data,  spritesheet, currentFrameNumber, throwShadowOptions) {
    super(spritesheet);

    this.name = "Objects_sprite_" + this.id;
    this.type = "None";
    this.highlightable = true;
    this.selectable = true;
    /* Set data for the object next */
    this.data = data || {};
    this.currFrameNumber = currentFrameNumber;
    /* Execute initial draw function */
    this.innerDraw(coords.x, coords.y);
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
    this.gotoAndStop( Number( this.currFrameNumber ) );
    this.x = x;
    this.y = y;

    return this;
  }
  /** Draws new frame to animate or such
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @param {Number} newFrameNumber New frame number to animate to
   * @return this object instance */
  drawNewFrame(x, y, newFrameNumber) {
    this.currFrameNumber = newFrameNumber;

    return this.innerDraw(x, y);
  }
  setupShadow(options = {color: "#000000", offsetX: 5, offsetY: 5, blur: 10} ) {
    if(this.throwShadow === true) {
      this.shadow = new createjs.Shadow(options.color, options.offsetX, options.offsetY, options.blur);
    }
  }
}