'use strict';

/***********************
******** IMPORT ********
***********************/
import { Quadtree } from './utils/Quadtree';
import { arrays } from '/components/utilities/general';

/***********************
********* API **********
***********************/
/**
 * this module is responsible for doing hitTesting, like returning the units on certain clicked coordinates or
 * when objects or areas collide with each other.
 * It uses quadtree for preliminary filtering of matching objects and then the framework specific collision detection
 */
export class ObjectManager {
  /**
   * @param {object} hitDetector Object or function that handles hit detection. This can be omitted in many cases
   */
  constructor(hitDetector) {
    this.quadtrees = {};
    this.hitDetector = hitDetector || {};
  }
  /**
   * Retrieve objects under certain coordinates or area, if size is given
   *
   * @param {globalCoords: { x:Number, y:Number }, localCoords: { x:Number, y:Number } } coords the coordinates which we
   * want to hitTest
   * @param {string} type type of the object / layer that we want to retrieve
   * @param {Object} size If we want to test rectangle, instead of just coordinates
   *
   * @todo It might be a good idea to make the hitDetection more extensive. Now it just uses point or rectangle / bounds to
   * detect hits. It could use sprites or forms. Since we do most work with quadtree, resources shouldn't be the issue.
   */
  retrieve(allCoords, type, options = { quadtree: true, subcontainers: [], size: { width: 0, height: 0 } }) {
    var { quadtree, subcontainers } = options;
    var { globalCoords, localCoords } = allCoords;
    var foundObjs = [];
    var quadtreeObjs;

    if (quadtree) {
      if (!type) {
        quadtreeObjs = Object.keys(this.quadtrees).map((thisIndex) => {
          return this.quadtrees[thisIndex].retrieve(localCoords, options.size);
        });
      } else {
        quadtreeObjs = this.quadtrees[type].retrieve(localCoords, options.size);
      }

      foundObjs = arrays.flatten2Levels(quadtreeObjs);

      if (!options.size.width || !options.size.height) {
        foundObjs = foundObjs.filter(obj => {
          let isHit = obj.hitTest ? obj.hitTest(globalCoords, { hitDetector: this.hitDetector }) : true;

          return isHit;
        });
      }
    } else {
      subcontainers.forEach(container => {
        foundObjs = foundObjs.concat(container.children);
      });

      if (!options.size.width || !options.size.height) {
        foundObjs = foundObjs.filter(obj => {
          let isHit = obj.hitTest ? obj.hitTest(globalCoords, { hitDetector: this.hitDetector }) : true;

          return isHit;
        });
      }
    }

    return foundObjs;
  }
  /**
   * Add object to hitDetection layer
   * @param {string} type type of the object / layer that we want to add
   * @param {x:Number, y:Number, width:Number, height:Number} area that is hitTested
   * @param {Object} obj object that we want to store. If hitTest succeeds this object is returned.
   */
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
  /**
   * Add hitDetection layer. Basically you create layers for different object types, like for example one for the
   * terrain, one for the units and one for the cities. The quadtree does not really require bounds, so we omit them.
   *
   * @param {string} type type of the layer that we want to add
   * @param {objects: Number, levels: Number} extra quadtree-settings: maximum objects before we split and maximum levels of nested layers
   */
  addLayer(type, bounds, extra = {}) {
    this.quadtrees[type] = new Quadtree(bounds, {
        objects: extra.objects || 10,
        levels: extra.levels || 5
      });

    return this.quadtrees[type];
  }
  /**
   * Get all quadtree layers
   */
  getLayers() {
    return Object.keys(this.quadtrees).map(layerName => {
      return {
        name: layerName,
        data: this.quadtrees[layerName]
      };
    });
  }
}