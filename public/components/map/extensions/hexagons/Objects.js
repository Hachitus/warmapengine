'use strict';

/**
 * @typedef {Object}              Coordinates
 * @property {Integer} x          X coordinate
 * @property {Integer} y          Y coordinate
 *
 * @typedef {Object}             ObjectSize
 * @property {Integer} width     Width
 * @property {Integer} height    Height
 */

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these
 * @class
 */

/***********************
******* IMPORTS ********
***********************/
import { Object_sprite_terrain, Object_sprite_unit } from '/components/bundles/coreBundle';
import { createHexagon } from '/components/map/extensions/hexagons/utils/createHexagon';
import hexagonMath from '/components/map/extensions/hexagons/utils/hexagonMath';

/***********************
****** VARIABLES *******
***********************/
var shape;

/***********************
********* API **********
***********************/
/**
 * @class
 *
 * @param {Coordinates} coords              Coordinates for the object relative to it's parent
 * @param {object} data                     This units custom data
 * @param {Object} options                  options.radius REQUIRED. This is the radius of the game maps hexagon
 */
export class Object_terrain extends Object_sprite_terrain {
  constructor(coords, data, options) {
    const { radius } = options;

    super(coords, data, options);

    this.name = "DefaultTerrainObject_hexa";
    calculateHexa.call(this, radius);
  }
}
Object.assign(Object_terrain.prototype, calculateHexa);

/**
 * @class
 *
 * @param {Coordinates} coords                  This units coordinates, relative to it's parent container
 * @param {object} data                         This units custom data
 * @param {Object} options                      options.radius REQUIRED. This is the radius of the game maps hexagon
 */
export class Object_unit extends Object_sprite_unit {
  constructor(coords, data, options) {
    const { radius } = options;

    super(coords, data, options);

    this.name = "DefaultUnitObjects_hexa";

    calculateHexa.call(this, radius);
  }
}
/***********************
******* PRIVATE ********
***********************/
/**
 * @private
 */
function calculateHexa(radius) {
  if (!radius) {
    throw new Error("Need radius!");
  }

  const HEIGHT = Math.round(hexagonMath.calcLongDiagonal(radius));
  const WIDTH = Math.round(hexagonMath.calcShortDiagonal(radius));
  const SIDE = Math.round(hexagonMath.calcSide(radius));

  this.anchor.set(0.5, 0.5);
  this.areaHeight = this.HEIGHT = HEIGHT;
  this.areaWidth = this.WIDTH = WIDTH;
  this.SIDE = SIDE;
  this.ROW_HEIGHT = Math.round(HEIGHT * 0.75);

  /* Draw hexagon to test the hits with hitArea */
  this.hitArea = setAndGetShape(radius);
  this.hitTest = function (coords, options) {
    this.updateTransform();
    //map.getMovableLayer().updateTransform();
    //coords = map.getMovableLayer().toLocal(coords);
    var isHit = options.hitDetector.processInteractive(
      new PIXI.Point(coords.x, coords.y),
      this,
      function (/*parent, hits*/) {
        console.log("Shouldn't get here, the object should be non-interactive");
      },
      true,
      true);

    return isHit;
  };
}
/**
 * @private
 */
function setAndGetShape(radius) {
  if (!shape) {
    shape = createHexagon(radius);
  }

  return shape;
}