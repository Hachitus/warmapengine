(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var StateMachine = window.StateMachine;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.mapStates = setupMapStates();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Finite state machine for the map. Uses this library and pretty much it's API https://github.com/jakesgordon/javascript-state-machine.
   *
   * @class mapStates
   * @requires  state-machine library
   */
  function setupMapStates() {
    return StateMachine.create({
      initial: "statusQuo",
      events: [
        /**
         * When the object is selected
         *
         * @method objectSelect
         */
        { name: "objectSelect", from: [ "statusQuo", "objectSelected"], to: "objectSelected" },
        /**
         * When object is issued a move order
         *
         * @method objectMove
         */
        { name: "objectOrder", from: "objectSelected", to: "animatingObject" },
        /**
         * When object ends it's movement animation
         *
         * @method objectMoveEnd
         */
        { name: "objectOrderEnd", from: "animatingObject", to: "objectSelected" },
        /**
         * The games main UI is opened and the map stays at the background, normally non-responsive
         *
         * @method UIOpen
         */
        { name: "UIOpen", from: ["statusQuo", "objectSelected"], to: "mainUIOpened" },
        /**
         * Games main UI is closed and map is activated again
         *
         * @method UIClose
         */
        { name: "UIClose", from: "mainUIOpen", to: "statusQuo" },
        /**
         * Map is being moved / dragged
         *
         * @method mapMove
         */
        { name: "mapMove", from: ["statusQuo", "objectSelected"], to: "mapMoving" },
        /**
         * Map is being moved / dragged
         *
         * @method mapMove
         */
        { name: "mapMoveEnd", from: ["mapMoving"], to: "statusQuo" }
    ]});
  }
})();