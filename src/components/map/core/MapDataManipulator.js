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
    filterSubContainers(layers) {
      var found;

      if (!Array.isArray(layers)) {
        found = this._runRule(layers, "subContainer") ? [layers] : [];
      } else {
        found = layers.filter((layer) => {
          return this._runRule(layer, "subContainer");
        });
      }

      return found;
    }
    filterLayers(layers) {
      var found;

      if (!Array.isArray(layers)) {
        found = this._runRule(layers, "layer") ? [layers] : [];
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
        found = this._runRule(objects, "object") ? [objects] : [];
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
          if (rule.object !== type) {
            return;
          }

          if (type === "layer") {
            ruleMatches = this._getObject(object, rule, this.layerClasses);
          } else if (type === "object") {
            ruleMatches = this._getObject(object, rule, this.objectClasses);
          } else if (type === "subContainer") {
            ruleMatches = this._getSubContainer(object, rule, this.layerClasses);
          }
        }
      });

      return ruleMatches;
    }
    /**
     * When checking subcontainers. The subcontainers PARENT has to be of type from flatworld.mapLayers.
     *
     * @method _getSubContainer
     * @private
     * @return {[type]} [description]
     **/
    _getSubContainer(object, rule, classes) {
      var objectIsOfType;

      if (!object || !object.parent) {
        return false;
      }

      objectIsOfType = classes.filter((objectClass) => {
        return object.parent instanceof objectClass;
      });

      if (!objectIsOfType.length) {
        return false;
      }

      return object.parent[rule.property] === rule.value;
    }
    /**
     * This is the actual method that runs through the rules and arranges the data
     *
     * @method _getObject
     * @private
     * @return {[type]} [description]
     **/
    _getObject(object, rule, classes) {
      var objectIsOfType;

      objectIsOfType = classes.filter((objectClass) => {
        return object instanceof objectClass;
      });

      if (objectIsOfType.length) {
        return object[rule.property] === rule.value;
      }
    }
  }

  window.flatworld.MapDataManipulator = MapDataManipulator;
})();