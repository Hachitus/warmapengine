 'use strict';

/**
 * @require loglevel.js for frontend logging, or something similar
 * */

/*---------------------
--------- API ---------
----------------------*/
export default {
  debug: function(e, errorText) {
    log.debug(errorText, e);
  }
};