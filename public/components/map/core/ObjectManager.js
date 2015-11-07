'use strict';

import { Quadtree } from './utils/Quadtree';

/** this module is responsible for doing hitTesting, like returning the units on certain clicked coordinates or
 * when objects or areas collide with each other */
export class ObjectManager {
  /** @param {object} hitDetector Object or function that handles hit detection. This can be omitted in many cases */
  constructor(hitDetector) {
    this.quadtrees = {};
    this.hitDetector = hitDetector || {};
  }
  /** Retrieve objects under certain coordinates or area, if size is given
   * @param {string} type type of the object / layer that we want to retrieve
   * @param {x:Number, y:Number} coords the coordinates which we want to hitTest
   * @param {x:Number, y:Number} size If we want to test rectangle, instead of just coordinates
   * @todo This should support collision testing better. Now it basically really works only with coordinates and rectangles */
  retrieve(allCoords, type, options = { size: undefined }) {
    var quadtreeObjs, foundObjs;
    var globalCoords = allCoords.globalCoords;

    quadtreeObjs = this.quadtrees[type].retrieve(globalCoords, options.size);

    foundObjs = quadtreeObjs.filter(obj => {
      let isHit = obj.hitTest ? obj.hitTest(globalCoords, { hitDetector: this.hitDetector }) : true;

      return isHit;
    });

    return foundObjs;
  }
  /** Add object to hitDetection layer
   * @param {string} type type of the object / layer that we want to add
   * @param {x:Number, y:Number, width:Number, height:Number} area that is hitTested
   * @param {Object} obj object that we want to store. If hitTest succeeds this object is returned. */
  addObject(type, hitArea, obj) {
    if (!this.quadtrees[type]) {
      throw new Error("Could not add object to objectManager layer, layer not found! (" + type + ")");
    }

    return this.quadtrees[type].add({
        x: hitArea.x,
        y: hitArea.y
      }, {
        width: hitArea.width,
        height: hitArea.height
      },
      obj
    );
  }
  /** Add hitDetection layer
   * @param {string} type type of the layer that we want to add
   * @param {x:Number, y:Number, width:Number, height:Number} HitDetection layer area
   * @param {objects: Number, levels: Number} extra quadtree-settings: maximum objects before we split and maximum levels of nested layers */
  addLayer(type, area, extra) {
    this.quadtrees[type] = new Quadtree({
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height
      }, {
        objects: extra.objects || 10,
        levels: extra.levels || 5
      });

    return this.quadtrees[type];
  }
  /** Get all quadtree layers */
  getLayers() {
    return Object.keys(this.quadtrees).map(layerName => {
      return {
        name: layerName,
        data: this.quadtrees[layerName]
      };
    });
  }
}