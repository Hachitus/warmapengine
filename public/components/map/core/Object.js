'use strict';

/***********************
******** IMPORT ********
***********************/
import { graphics } from '/components/map/core/utils/effects';

/**
 * The actual objects used on the map (such as terrain and units), under containers.
 *
 * All of the objects need to have same argumentAPI for creating objects: coords, data, options
 */

/***********************
********* API **********
***********************/
/**
 * The base class of all sprite objects
 * @class
 */
export class Object_sprite extends PIXI.Sprite {
  /**
   * @constructs
   * @param {PIXI.Point} coords                  the coordinate where the object is located at, relative to it's parent
   * @param {Object} data                        objects data, that will be used in the game. It will not actually be mainly used in graphical but rather things  like unit-data and city-data presentations etc.
   * @param {currFrame: Object} options          Options for the object
   *                                             currFrame the current frames number. This is basically the initial image, we can change it later for animation or such
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
   * @method
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
   * @method
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @param {Number} newFrameNumber New frame number to animate to
   * @return this object instance
   */
  drawNewFrame(x, y, newFrame) {
    this.currentFrame = newFrame;

    return this.innerDraw(x, y);
  }
  /**
   * Get the area that is reserved for the graphical presenation of this object as a rectangle.
   * @method
   * @param  {Object} options       toGlobal: Boolean. Should the method return global coordinates or local (movableLayer)
   * @return {Object}               { x: Number, y: Number, width: Number, height: Number}
   */
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
  /**
   * Coordinate conversion: localToLocal
   * @method
   * @param  {Number} x                     X coordinate
   * @param  {Number} y                     Y coordinate
   * @param  {PIXI.DisplayObject} target    The DisplayObject where we should target the coordinates for
   * @return {PIXI.Point}                   Coordinates
   */
  localToLocal(x, y, target) {
    var globalCoords = this.toGlobal( { x, y } );
    var targetLocalCoords = target.toLocal( globalCoords );

    return targetLocalCoords;
  }
  /**
   * Clone object
   * @param  {PIXI renderer} renderer
   * @param  {Object} options               position: Boolean, anchor: Boolean
   * @return {cloned Object}                cloned object
   */
  clone(renderer, options = { position: false, anchor: false }) {
    var newSprite = new PIXI.Sprite();

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

/**
 * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these
 * @class
 */
export class Object_sprite_terrain extends Object_sprite {
  /**
   * @param {x: Number, y: Number} coords format: {x: Number, y: Number}. Coordinates for the object relative to it's parent
   * @param {object} data This units custom data
   * @param {object} options other specific options for constructing this terrain
   */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultTerrainObject";
    this.type = "terrain";
    this.highlightable = false;
    this.selectable = false;
  }
}

/**
 * Map unit like infantry or worker, usually something with actions or movable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these
 * @class
 */
export class Object_sprite_unit extends Object_sprite {
  /**
   * @param {x: Number, y: Number} coords Coordinates for the object relative to it's parent
   * @param {object} data This units data
   * @param {object} options other specific options for constructing this unit, like options.throwShadow
   */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultUnitObjects";
    this.type = "unit";
    this.highlightable = true;
    this.selectable = true;
    this.actions = {
      move: [],
      attack: []
    };
    options.throwShadow = true;
  }
  /* Implementations for the future: Execute action on units (move, attack etc.) */
  doAction(type) {
    this.actions[type].forEach(action => {
      action();
    });
  }
  /* Implementations for the future: Add certain action type */
  addActionType(type) {
    this.actions[type] = this.actions[type] || [];
  }
  /* Implementations for the future: Attach callback for the certain action type */
  addCallbackToAction(type, cb) {
    this.actions[type].push(cb);
  }
}
/**
 * graphical effect that drops a shadow under this unit
 * @method
 */
Object_sprite_unit.prototype.dropShadow = graphics.dropShadow;