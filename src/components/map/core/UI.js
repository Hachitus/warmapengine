(function () {
  'use strict';

  /*---------------------
  ------ VARIABLES ------
  ----------------------*/
  var scope;

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
   * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and bringing the unit on top in the map. UI themes must implement this core UI module
   *
   * @todo Not implemented fully yet and probably need refactoring
   *
   * @class UI
   * @constructor
   * @param {Object} UITheme        Module that will be used for the UI theme
   * @param {Map} givenMap          Map instance that is used
   * @return {Object}               UI module
  */
  function UI (UITheme, givenMap) {
    var map;

    /* SINGLETON MODULE */
    if (scope) {
      return scope;
    }

    if (!UITheme || !givenMap) {
      throw new Error("UI-module requires UITheme and map object");
    }

    map = givenMap;
    scope = {};

    /**
     * Responsible for showing selection element, where the player select the wanted object out of array of objects.
     * For example if there are several objects in one tile on the map and the player needs to be able to select one
     * specific unit on the stack. This is always defined in the UI theme-module
     *
     * @method showSelections
     * @static
     * @param  {Array} objects     Objects that have been selected.
     * @param {Object} getDatas       This is an object made of functions, that get wanted data from the object. For example if you have objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name  Retrieves object name
     * @param {Object} options        Extra options
     * @return {Boolean}
     * */
    scope.showSelections = function (objects, getDatas, options) {
      objects = filterObjectsForHighlighting(objects);

      if (objects.length === 1) {
        return UITheme.highlightSelectedObject(objects[0], getDatas);
      } else if (objects.length > 1) {
        return UITheme.showSelections(objects, getDatas);
      }

      return "No objects found";
    };
    /**
     * Resonsible for hignlighting the selected object. For example the unit that is being commanded. The hightlight
     * can mean e.g. bringing the unit on top on the map and showing selection circle around it.
     *
     * @method highlightSelectedObject
     * @static
     * @param  {Object} object        Object that has been selected.
     * @param {Object} getDatas       This is an object made of functions, that get wanted data from the object. For example if you have objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name  Retrieves object name
     * @param {Object} options        Extra options. Like dropping a shadow etc.
     * */
    scope.highlightSelectedObject = function (object, getDatas, options) {
      UITheme.highlightSelectedObject(object);
    }
    /**
     * Shows arrow or movement or what ever to indicate the selected unit is moving to the given location
     *
     * @method showUnitMovement
     * @static
     * */
    scope.showUnitMovement = function (object, from, to, options) {
      UITheme.showUnitMovement(object, from, to, options);
    }

    return scope;
  }
  /*--------------------------------
  ------------ PRIVATE -------------
  --------------------------------*/
  /**
   * This is a general function which filters only highlightable object for use in UI operations
   *
   * @static
   * @method filterObjectsForHighlighting
   * @param  {Array} objects
   */
  function filterObjectsForHighlighting (objects) {
    var newObjects = objects.filter(obj => {
      return obj.highlightable === true ? true : false;
    });

    return newObjects;
  }

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.UI = UI;
})();