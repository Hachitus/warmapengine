'use strict';

import { createHexagon } from '/components/map/extensions/hexagons/utils/createHexagon';
import hexagonMath from '/components/map/extensions/hexagons/utils/hexagonMath';

/**
 * Base class for hexagon objects. So basically choosing objects from map that is hexagon based.
 */

export var object_sprite_hexa = (function object_sprite_hexa() {
  var shape;

  /**************************
  ********** API ************
  **************************/
  return {
    build: function calculateHexa(radius) {
      if (!radius) {
        throw new Error("Need radius!");
      }

      const HEIGHT = hexagonMath.calcLongDiagonal(radius);
      const WIDTH = hexagonMath.calcShortDiagonal(radius);
      const SIDE = hexagonMath.calcSide(radius);

      this.anchor.set(0.5, 0.5);
      this.HEIGHT = HEIGHT;
      this.WIDTH = WIDTH;
      this.SIDE = SIDE;

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
  };
  /***********************
  ******* PRIVATE ********
  ***********************/
  function setAndGetShape(radius) {
    if (!shape) {
      shape = createHexagon(radius);
    }

    return shape;
  }
})();