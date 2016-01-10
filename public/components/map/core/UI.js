'use strict';

/*---------------------
------ VARIABLES ------
----------------------*/
var scope;

/*---------------------
--------- API ---------
----------------------*/
export { UI as UI };

/*---------------------
-------- PUBLIC -------
----------------------*/
/**
 * Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
 * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and bringing the unit on top in the map. UI themes must implement this core UI module
 *
 * @todo Not implemented fully yet and probably need refactoring
 *
 * @class core.UI
 * @memberOf Map.core
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
   * @abstract
   * */
  scope.showSelections = UITheme.showSelections.bind(UITheme);
  /**
   * Resonsible for hignlighting the selected object. For example the unit that is being commanded. The hightlight
   * can mean e.g. bringing the unit on top on the map and showing selection circle around it.
   *
   * @abstract
   * */
  scope.highlightSelectedObject = UITheme.highlightSelectedObject.bind(UITheme);
  /**
   * Shows arrow or movement or what ever to indicate the selected unit is moving to the given location
   *
   * @abstract
   * */
  scope.showUnitMovement = UITheme.showUnitMovement.bind(UITheme);

  return scope;
}