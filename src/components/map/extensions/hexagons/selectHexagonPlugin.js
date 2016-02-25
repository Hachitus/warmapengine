(function () {
  'use strict';

  /*-----------------------
  --------- IMPORT --------
  -----------------------*/
  var setupHexagonClick = window.flatworld.extensions.hexagons.setupHexagonClick;

  /*-----------------------
  ---------- API ----------
  -----------------------*/
  debugger;
  window.flatworld.extensions.hexagons.selectHexagonObject = setupObject_select_hexagon();

  /*-----------------------
  -------- PUBLIC ---------
  -----------------------*/
  /**
   * Handles the selection of hexagons on the map
   *
   * @class hexagonPlugin.setupObject_select_hexagon
   * @return {Object}       Return methods inside object
   */
  function setupObject_select_hexagon() {
    var map = {};

    return {
      init,
      pluginName: "selectHexagonObject"
    };

    /**
     * @method  init
     * @param {Map} givenMap         Instantiated Map class object
     */
    function init(givenMap) {
      map = givenMap;

      startClickListener(map);
    }

    /*-----------------------
    -------- PRIVATE --------
    -----------------------*/
    /**
     * @method startClickListener
     * @param {Map} map              Instantiated Map class object
     */
    function startClickListener(map) {
      return setupHexagonClick(map);
    }
  }
})();