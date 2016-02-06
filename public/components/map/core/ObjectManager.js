'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import { utils } from 'bundles/strippedCoreBundle';
import { arrays } from 'components/utilities/general';

/*---------------------
--------- API ---------
----------------------*/
export class ObjectManager {
  /**
   * this module is responsible for doing hitTesting, like returning the units on certain clicked coordinates or when objects or areas collide with each other.
   *
   * @class core.ObjectManager
   * @constructor
   * @param {object} hitDetector Object or function that handles hit detection. This can be omitted in many cases
   * @todo It might be a good idea to make the hitDetection more extensive. Now it just uses point or rectangle / bounds to detect hits. It could use sprites or forms.
   */
  constructor(hitDetector) {
    this.hitDetector = hitDetector || {};
  }
  /**
   * Retrieve objects under certain coordinates or area, if size is given. Uses subcontainers when used, no other options yet.
   *
   * @method retrieve
   * @param {Object} allCoords                                The coordinates which we want to hitTest
   * @param {x:Integer, y:Integer} allCoords.globalCoords     Global coordinates on static layer / canvas
   * @param {x:Integer, y:Integer} allCoords.globalCoords.x
   * @param {x:Integer, y:Integer} allCoords.globalCoords.y
   * @param {Object} allCoords.localCoords                    Local coordiantes on movable layer
   * @param {x:Integer, y:Integer} allCoords.localCoords.x
   * @param {x:Integer, y:Integer} allCoords.localCoords.y
   * @param {string} type                                     type of the object / layer that we want to retrieve
   * @param {Object} options                                  optional options
   * @param {Array} options.subcontainers                     The subcontainers we match against
   * @param {Object} options.size                             Size of the rectangle area to match against, if we want to match rectangle instead of one point
   * @param {Integer} options.size.width
   * @param {Integer} options.size.height
   * @return {Array}                                          matched objects
   */
  retrieve(allCoords, options = { type: false, subcontainers: [], size: { width: 0, height: 0 } }) {
    var { subcontainers, size, type } = options;
    var { globalCoords, localCoords } = allCoords;
    var foundObjs = [];

    if (subcontainers.length > 0) {
      subcontainers.forEach(container => {
        foundObjs = foundObjs.concat(container.children);
      });

      if (!size.width || !size.height) {
        foundObjs = foundObjs.filter(obj => {
          if (type && type !== obj.type) {
            return false;
          }

          let isHit = obj.hitTest ? obj.hitTest(globalCoords, { hitDetector: this.hitDetector }) : true;

          return isHit;
        });
      }
    }

    return foundObjs;
  }
}