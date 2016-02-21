(function () {
  'use strict';

  /*---------------------
  --------- API ---------
  ----------------------*/
  var loglevel = window.flatworld_libararies.loglevel;

  loglevel.enableAll();
  /**
   * @class log
   * @requires loglevel.js for frontend logging, or something similar
   **/
  window.flatworld.log = {
    debug: function(e, errorText) {
      loglevel.debug(errorText, e);
    },
    error: function (e, errorText) {
      loglevel.error(errorText, e);
    }
  };
})();