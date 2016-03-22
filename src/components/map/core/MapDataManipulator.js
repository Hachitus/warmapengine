(function () {
  'use strict';

  const mapLayers = window.flatworld.mapLayers;
  const objects = window.flatworld.objects;

  /*---------------------
  --------- API ---------
  ----------------------*/
  class MapDataManipulator {
    /**
     * Class to get a consistent standard for the engine to be able to filter objects, when retrieving or sorting them. This is used
     * when some method uses filters.
     *
     * @class MapDataManipulator
     * @constructor
     * @param {Array|Object} rules        REQUIRED. The rules that apply for this instance. Multiple rules in Array or one as Object.
     **/
    constructor(rules) {
      this.rules = Array.isArray(rules) ? rules : [rules];
      this.layerClasses = Object.keys(mapLayers).map((k) => mapLayers[k]);
      this.objectClasses = Object.keys(objects).map((k) => objects[k]);
    }
    filterLayers(layers) {
      var found;

      if (!Array.isArray(layers)) {
        found = [this._runRule(layers, "layer")];
      } else {
        found = layers.filter((layer) => {
          return this._runRule(layer, "layer");
        });
      }

      return found;
    }
    filterObjects(objects) {
      var found;

      if (!Array.isArray(objects)) {
        found = [this._runRule(objects, "object")];
      } else {
        found = objects.filter((object) => {
          return this._runRule(object, "object");
        });
      }

      return found;
    }
    /**
     * adds a filter rule
     *
     * @method addRule
     * @param {} rules        Rules to add
     */
    addRule(rules) {
      this.rules.concat(rules);
    }
    /**
     * This is the actual method that runs through the rules and arranges the data
     *
     * @method _runRule
     * @private
     * @param {Array} [varname] [description]
     **/
    _runRule(object, type) {
      var ruleMatches;

      this.rules.forEach((rule) => {
        if (rule.type === "filter") {
          if (rule.object === type === "layer") {
            ruleMatches = this._getLayer(object, rule);
          } else if (rule.object === type &&  type === "object") {
            ruleMatches = this._getObject(object, rule);
          }
        }
      });

      return ruleMatches;
    }
    /**
     * This is the actual method that runs through the rules and arranges the data
     *
     * @todo Refactor
     *
     * @method _getLayer
     * @private
     * @return {[type]} [description]
     **/
    _getLayer(object, rule) {
      if (object && ( object.parent instanceof this.layerClasses[0] || object && object.parent instanceof this.layerClasses[1] )) {
        return object.parent[rule.property] === rule.value;
      } else if ( object && object.parent && ( object.parent.parent instanceof this.layerClasses[0] ||
          object.parent.parent instanceof this.layerClasses[0] )) {
        return object.parent.parent[rule.property] === rule.value;
      }
    }
    /**
     * This is the actual method that runs through the rules and arranges the data
     *
     * @todo Refactor
     *
     * @method _getObject
     * @private
     * @return {[type]} [description]
     **/
    _getObject(object, rule) {
      var objectIsOfType;

      objectIsOfType = this.objectClasses.filter((objectClass) => {
        return object instanceof objectClass;
      });

      if (objectIsOfType.length) {
        return object[rule.property] === rule.value;
      }
    }
  }

  window.flatworld.MapDataManipulator = MapDataManipulator;
})();