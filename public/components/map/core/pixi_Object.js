/* jshint ignore:start */

'use strict';

/**
 * The actual objects used on the map (suchs as terrain and units), under containers.
 *
 * All of the objects need to have same argumentAPI for creating objects: coords, data, imageData
 */

export class Object_sprite extends PIXI.Sprite {
  /**
   * @param {PIXI.Point} coords - the coordinate where the object is located at, relative to it's parent
   * @param {Object} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
   * but rather things like unit-data and city-data presentations etc.
   * @param {Integer} currFrame - the current frames number. This is basically the initial image, we can change it later
   * for animation or such
   */
  constructor(coord = { x: 0, y: 0 }, data = {}, options = { currentFrame: {}, throwShadowOptions: false }) {
    var { currentFrame, throwShadowOptions } = options;

    super(currentFrame);

    this.name = "Objects_sprite_" + this.id;
    this.type = "None";
    this.highlightable = true;
    this.selectable = true;
    /* Set data for the object next */
    this.data = data;
    this.currentFrame = currentFrame;
    /* Execute initial draw function */
    this.position.set(coord.x,  coord.y);
    this.setupShadow(throwShadowOptions);

    this.tickEnabled = false;
    this.mouseEnabled = false;
  }
  /**
   * Drawing the object with createjs-methods
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @return this object instance
   */
  innerDraw(x, y) {
    this.fromFrame ( this.currentFrame );
    this.x = x;
    this.y = y;

    return this;
  }
  /**
   * Draws new frame to animate or such
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @param {Number} newFrameNumber New frame number to animate to
   * @return this object instance
   */
  drawNewFrame(x, y, newFrame) {
    this.currentFrame = newFrame;

    return this.innerDraw(x, y);
  }
  setupShadow(options = {color: "#000000", offsetX: 5, offsetY: 5, blur: 10} ) {
    if (this.throwShadow === true) {
      console.warn("NO SHADOW FUNCTION SET!")
    }
  }
  localToLocal(x, y, target) {
    var globalCoords = this.toGlobal( { x, y } );
    var targetLocalCoords = target.toLocal( globalCoords );

    return targetLocalCoords;
  }
  clone(options = { position: false, anchor: false }) {
    var newSprite = new PIXI.Sprite();
    var firstParent = _findFirstParent(this);
    var renderer = firstParent.renderer;

    newSprite.texture = this.generateTexture(renderer);

    if (options.anchor) {
      newSprite.anchor = Object.assign({}, this.anchor);
    }
    if (options.position) {
      newSprite.position = Object.assign({}, this.position);
    }

    return newSprite;
  }
}

function _findFirstParent(thisObj) {
  let parentObj = {};

  if (thisObj.parent) {
    parentObj = _findFirstParent(thisObj.parent);
  } else {
    return thisObj;
  }

  return parentObj;
}