 'use strict';

/*---------------------
--------- API ---------
----------------------*/
/**
 * @class default
 * @requires loglevel.js for frontend logging, or something similar
 **/
export default {
  debug: function(e, errorText) {
    log.debug(errorText, e);
  }
};