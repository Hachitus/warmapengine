 'use strict';

/*---------------------
--------- API ---------
----------------------*/

import log from 'loglevel';

log.enableAll();
/**
 * @class log
 * @requires loglevel.js for frontend logging, or something similar
 **/
export default {
  debug: function(e, errorText) {
    log.debug(errorText, e);
  }
};