'use strict';

import { MapLayer, MapLayerParent } from '/components/bundles/strippedCoreBundle';

/*---------------------
--------- API ---------
----------------------*/
export class MapDataManipulator {
  /**
   * Class to get a consistent standard for the engine to be able to filter objects, when retrieving or sorting them.
   *
   * @class core.MapDataManipulator
   * @constructor
   * @param {Array|Object} rules        REQUIRED. The rules that apply for this instance. Multiple rules in Array or one as Object.
   **/
  constructor(rules) {
    this.rules = Array.isArray(rules) ?  rules : [rules];
    this.layerClasses = [MapLayer, MapLayerParent];
  }
  filterSubcontainers(subcontainers) {
    if (!Array.isArray(subcontainers)) {
      return this._runRules(subcontainers);
    }
  }
  /**
   * This is the actual method that runs through the rules and arranges the data
   *
   * @private
   * @return {[type]} [description]
   **/
  _runRules(object) {
    var foundObjects;

    this.rules.forEach(rule => {
      if (rule.type === "filter") {
        switch (rule.object) {
          case "container":
            foundObjects = this._getContainer(object, rule);
          break;
        }
      }
    });

    return foundObjects;
  }
  /**
   * This is the actual method that runs through the rules and arranges the data
   *
   * @todo Refactor
   *
   * @private
   * @method _getContainer
   * @return {[type]} [description]
   **/
  _getContainer(object, rule) {
    if (object && ( object.parent instanceof this.layerClasses[0] || object && object.parent instanceof this.layerClasses[1] )) {
      return object.parent[rule.property] === rule.value;
    } else if ( object && object.parent && ( object.parent.parent instanceof this.layerClasses[0] || object.parent.parent instanceof this.layerClasses[0] )) {
      return object.parent.parent[rule.property] === rule.value;
    }
  }
}