'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
// import { PubSub } from '/assets/lib/pubsub/pubsub';

/*---------------------
--------- API ---------
----------------------*/
export const mapEvents = setupMapEvents();

/*---------------------
-------- PUBLIC -------
----------------------*/
/**
 * This module handles map events. Like informing map movement, object selection and other changes.
 * Events atm:
 * - mapMoved
 * - mapMovedFinal
 * - mapResize
 *
 * @class core.mapEvents
 * @memberOf Map.core
 * @return {Object}     subsribe and publish
 * @todo I want the pubsub module to go the ES6 way, not the only global exception!
 */
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