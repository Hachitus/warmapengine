'use strict';

/**
 * This module handles map events. Like informing map movement, object selection and other changes.
 *
 * Events atm:
 * - mapMoved
 * - mapMovedFinal
 * - mapResize
 */
/***********************
******** IMPORT ********
***********************/
// import { PubSub } from '/assets/lib/pubsub/pubsub';

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
  function publish(type, ...data) {
    console.log("EVENT: " + type);
    PubSub.publish(type, ...data);
  }
}