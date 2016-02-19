'use strict';

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
 * - mapResize
 * - mapFullscreeActivated
 * - mapZoomed
 *
 * @class mapEvents
 * @return {Object}     subsribe and publish
 * @todo I want the pubsub module to go the ES6 way, not the only global exception!
 */
function setupMapEvents () {
  const TIMER_FOR_SAME_TYPE = 50;

  var lastTimePublished = {};
  return {
    subscribe,
    publish
  };

  function subscribe(type, cb) {
    document.addEventListener(type, cb);
  }
  function publish(type, ...data) {
    var timestamp;

    timestamp = new Date().getTime();

    if (!lastTimePublished[type]) {
      lastTimePublished[type] = timestamp;
    }

    if ( (lastTimePublished[type] + TIMER_FOR_SAME_TYPE ) < timestamp) {
      let eventToDispatch = new Event(type);

      eventToDispatch.customData = data;
      document.dispatchEvent(eventToDispatch);
      lastTimePublished[type] = timestamp;
    }
  }
}