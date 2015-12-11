'use strict';

/***********************
******* IMPORTS ********
***********************/
import { createHexagon } from '/components/map/extensions/hexagons/utils/createHexagon';
import hexagonMath from '/components/map/extensions/hexagons/utils/hexagonMath';

/***********************
********* API **********
***********************/
export var object_sprite_hexa = setupObject_sprite_hexa();

/***********************
******* PUBLIC *********
***********************/
/**
 * Base class for hexagon objects. So basically choosing objects from map that is hexagon based.
 */
function setupObject_sprite_hexa() {
  var shape;

  /**************************
  ********** API ************
  **************************/
  return {
    build: calculateHexa
  };

  /**************************
  ********* PUBLIC **********
  **************************/
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
  /***********************
  ******* PRIVATE ********
  ***********************/
  function setAndGetShape(radius) {
    if (!shape) {
      shape = createHexagon(radius);
    }

    return shape;
  }
}