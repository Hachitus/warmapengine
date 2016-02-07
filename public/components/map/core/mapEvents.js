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
 *
 * @class core.mapEvents
 * @return {Object}     subsribe and publish
 * @todo I want the pubsub module to go the ES6 way, not the only global exception!
 */
function setupMapEvents () {
  return {
    subscribe,
    publish
  };

  function subscribe(type, cb) {
    document.addEventListener(type, cb);
  }
  function publish(type, ...data) {
    var eventToDispatch = new Event(type);

    eventToDispatch.customData = data;
    document.dispatchEvent(eventToDispatch);
  }
}