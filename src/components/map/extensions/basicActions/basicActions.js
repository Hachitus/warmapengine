(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  exports.flatworld.extensions.basicActions = extendUnit;

  /*---------------------
  --------- API ---------
  ----------------------*/
  function extendUnit (object) {
    object.prototype.move = function () {};
  }
})();