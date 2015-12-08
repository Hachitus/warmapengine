'use strict';

/**
 * This module handles map events. Like informing map movement, object selection and other changes.
 */

/***********************
********* API **********
***********************/
export var mapEvents = setupMapEvents();

/***********************
******** PUBLIC ********
***********************/
function setupMapEvents () {
  return {
    subscribe,
    publish
  };

  function subscribe(type, cb) {
    PubSub.subscribe(type, cb);
  }
  function publish(type, data = []) {
    PubSub.publish(type, ...data);
  }
};