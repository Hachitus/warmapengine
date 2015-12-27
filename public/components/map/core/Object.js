'use strict';

/**
 * The actual objects used on the map (suchs as terrain and units), under containers.
 *
 * All of the objects need to have same argumentAPI for creating objects: coords, data, imageData
 */

/***********************
********* API **********
***********************/
export class Object_sprite extends PIXI.Sprite {
  /**
   * @param {PIXI.Point} coords - the coordinate where the object is located at, relative to it's parent
   * @param {Object} data - objects data, that will be used in the game. It will not actually be mainly used in graphical
   * but rather things like unit-data and city-data presentations etc.
   * @param {Integer} currFrame - the current frames number. This is basically the initial image, we can change it later
   * for animation or such
   */
  constructor(coord = { x: 0, y: 0 }, data = {}, options = { currentFrame: {} }) {
    var { currentFrame } = options;

    super(currentFrame);

    this.name = "Objects_sprite_" + this.id;
    this.type = "None";
    this.highlightable = true;
    this.selectable = true;
    /* Set data for the object next */
    this.data = data;
    this.currentFrame = currentFrame;

    this.areaWidth = this.width;
    this.areaHeight = this.height;
    /* We need to round the numbers. If there are decimal values, the graphics will get blurry */
    let exactCoords = {
      x: Math.round(coord.x),
      y: Math.round(coord.y)
    };
    this.position.set(exactCoords.x,  exactCoords.y);

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
  getGraphicalArea(options = { toGlobal: true } ) {
    var coordinates;

    coordinates = options.toGlobal ? this.toGlobal(new PIXI.Point(0,0)) : this;

    return {
      x: Math.round( coordinates.x ),
      y: Math.round( coordinates.y ),
      width: Math.round( this.width ),
      height: Math.round( this.height )
    };
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

/***********************
******* PRIVATE ********
***********************/
function _findFirstParent(thisObj) {
  let parentObj = {};

  if (thisObj.parent) {
    parentObj = _findFirstParent(thisObj.parent);
  } else {
    return thisObj;
  }

  return parentObj;
}