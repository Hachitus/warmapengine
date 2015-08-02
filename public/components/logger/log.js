/**
 * @require loglevel.js for frontend logging, or something similar */

 'use strict';

export default {
  debug: function(e, errorText) {
    log.debug(errorText, e);
  }
};