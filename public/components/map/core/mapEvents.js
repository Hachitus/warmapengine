'use strict';

export var mapEvents = (function () {
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
})();