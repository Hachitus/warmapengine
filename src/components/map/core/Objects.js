'use strict';

/*-----------------------
--------- IMPORT --------
-----------------------*/
import { utils } from 'bundles/strippedCoreBundle';

/*-----------------------
---------- API ----------
-----------------------*/
export class Object_sprite extends PIXI.Sprite {
  /**
   * The base class of all sprite objects
   *
   * @class Object_sprite
   * @constructor
   * @extends PIXI.Sprite
   * @param {PIXI.Point} coords                         the coordinate where the object is located at, relative to it's parent
   * @param {Object} data                               objects data, that will be used in the game. It will not actually be mainly used in graphical but rather things  like unit-data and city-data presentations etc.
   * @param {Object} options.currFrame       currFrame the current frames number. This is basically the initial image, we can change it later for animation or such
   */
  constructor(coord = { x: 0, y: 0 }, data = {}, options = { currentFrame: {} }) {
    var { currentFrame } = options;

    super(currentFrame);

    /* We need to round the numbers. If there are decimal values, the graphics will get blurry */
    let exactCoords = {
      x: Math.round(coord.x),
      y: Math.round(coord.y)
    };
    this.position.set(exactCoords.x,  exactCoords.y);
    /**
     * Name of the object. Used mostly for debugging
     *
     * @attribute
     * @type {String}
     */
    this.name = "Objects_sprite_" + this.id;
    /**
     * Type of the object. Can be used for filtering, ordering or finding correct objects.
     *
     * @attribute
     * @type {String}
     */
    this.type = "None";
    /**
     * Is the object highligtable.
     *
     * @attribute
     * @type {Boolean}
     */
    this.highlightable = true;
    /**
     * Objects custom data. Holds unit statistics and most data. Like unit movement speed etc.
     *
     * @attribute
     * @type {Object}
     */
    this.data = data;
    /**
     * Current frame (from spritesheet) we are showing.
     *
     * @attribute
     * @type {Number}
     */
    this.currentFrame = currentFrame;
    /**
     * Object area width in pixels.
     *
     * @attribute
     * @type {Number}
     */
    this.areaWidth = this.width;
    /**
     * Object area height in pixels.
     *
     * @attribute
     * @type {Number}
     */
    this.areaHeight = this.height;
  }
  /**
   * Drawing the object
   *
   * @method innerDraw
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
   *
   * @method drawNewFrame
   * @param {Number} x                coordinate x
   * @param {Number} y                coordinate y
   * @param {Number} newFrame         New frame number to animate to
   * @return this object instance
   */
  drawNewFrame(x, y, newFrame) {
    this.currentFrame = newFrame;

    return this.innerDraw(x, y);
  }
  /**
   * Get the area that is reserved for the graphical presenation of this object as a rectangle.
   *
   * @method getGraphicalArea
   * @param  {Object} options       toGlobal: Boolean. Should the method return global coordinates or local (movableLayer)
   * @return {AreaSize}               { x: Number, y: Number, width: Number, height: Number}
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
   *
   * @method localToLocal
   * @param  {Number} x                  X coordinate
   * @param  {Number} y                  Y coordinate
   * @param  {Object} target             PIXI.DisplayObject. The DisplayObject where we should target the coordinates for
   * @return  {{PIXI.Point}} point       PIXI.Point. Coordinates.
   * @return {Coordinates}
   */
  localToLocal(x, y, target) {
    var globalCoords = this.toGlobal( { x, y } );
    var targetLocalCoords = target.toLocal( globalCoords );

    return targetLocalCoords;
  }
  /**
   * Clone object
   *
   * @method clone
   * @param  {Object} renderer              PIXI renderer
   * @param  {Object} options               position: Boolean, anchor: Boolean
   * @return {Object}                       cloned object
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

export class ObjectSpriteTerrain extends Object_sprite {
  /**
   * Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
   * inherited, depending on the map type. For example you might want to add some click area for these
   *
   * @class ObjectSpriteTerrain
   * @constructor
   * @extends Object_sprite
   * @param {Coordinates} coords        format: {x: Number, y: Number}. Coordinates for the object relative to it's parent
   * @param {object} data               This units custom data
   * @param {object} options            other specific options for constructing this terrain
   */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultTerrainObject";
    this.type = "terrain";
    this.highlightable = false;
  }
}

export class ObjectSpriteUnit extends Object_sprite {
  /**
   * Map unit like infantry or worker, usually something with actions or movable. Usually these are extended, depending on the map type. For example you might want to add some click area for these (e.g. hexagon)
   *
   * @class ObjectSpriteUnit
   * @constructor
   * @extends Object_sprite
   * @requires graphics
   * @param {Object} coords               Coordinates for the object relative to it's parent
   * @param {Integer} coords.x            X coordinate
   * @param {Integer} coords.y            Y coordinate
   * @param {object} data                 This units data
   * @param {object} options              other specific options for constructing this unit, like options.throwShadow
   * @param {object} options.throwShadow  Can we throw a shadow under this object
   */
  constructor(coords, data, options) {
    super(coords, data, options);

    this.name = "DefaultUnitObjects";
    this.type = "unit";
    /**
     * actions bound to this object. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
     *
     * @attribute actions
     * @type {Object}
     */
    this.actions = {
      move: [],
      attack: []
    };
  }
  /**
   * Execute action on units (move, attack etc.). @todo THIS HAS NOT BEEN IMPLEMENTED YET!
   *
   * @method  doAction
   * @param {String} type
   */
  doAction(type) {
    this.actions[type].forEach(action => {
      action();
    });
  }
  /**
   * Add certain action type. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
   *
   * @method addActionType
   * @param {String} type
   */
  addActionType(type) {
    this.actions[type] = this.actions[type] || [];
  }
  /**
   * Attach callback for the certain action type. @todo THIS HAS NOT BEEN IMPLEMENTED YET!
   *
   * @method addCallbackToAction
   * @param {String} type
   * @param {Function} cb
   */
  addCallbackToAction(type, cb) {
    this.actions[type].push(cb);
  }
  /**
   * @method dropShadow
   */
  dropShadow(...args) {
    return utils.effects.dropShadow(...args);
  }
}