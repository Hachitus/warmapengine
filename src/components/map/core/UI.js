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
   * Main class for showing UI on the map, like unit selections, movements and such. Has nothing to do with showing off-map data, like
   * datagrams of the resources player has or other players status etc.
   * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit), unit movement.
   * How it works is that this is basically the interface that shows what the UI theme class can (or must) implement.
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
     * @param  {Array|Object} objects   Objects that have been selected.
     * @param {Object} getDatas         This is an object made of functions, that get wanted data from the object. For example if you have
     * objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name    Retrieves object name
     * @param {Object} options          Extra options
     * @return {Boolean}
     * */
    scope.showSelections = function (objects, getDatas, { filters } = {}) {
      if (filters) {
        objects = filters.filterObjects(objects);
      }

      objects = Array.isArray(objects) ? objects : [objects];

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
     * @param {Object} getDatas       This is an object made of functions, that get wanted data from the object. For example if you have
     * objects name in object.data.specialData.name, then you have an object getDatas.name(), which retrieves this.
     * @param {Object} getDatas.name  Retrieves object name
     * @param {Object} options        Extra options. Like dropping a shadow etc.
     * */
    scope.highlightSelectedObject = UITheme.highlightSelectedObject.bind(UITheme);
    /**
     * Shows arrow or movement or what ever to indicate the selected unit is moving to the given location
     *
     * @method showUnitMovement
     * @static
     * */
    scope.showUnitMovement = UITheme.showUnitMovement.bind(UITheme);

    return scope;
  }

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.UI = UI;
})();