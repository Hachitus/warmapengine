"use strict";

/** Creating the createjsQueue-object from spritesheet. This preloads assests.
 * @requires createjs Createjs library / framework object - global object
 * @requires Q the promise library (can not be added with ES6)
 * @param {string} basePath
 * @todo Make a loader graphics / notifier when loading assets using preloader.
 *
 * Usage: preload.generate("http://path.fi/path").onComplete().then(function() {}); */
export class preload extends createjs.LoadQueue {
  constructor (...args) {
    super(...args);
  }
  /**@return {Promise} Return promise object, that will be resolved when the preloading is finished */
  resolveOnComplete () {
    var promise = Q.defer();

    this.on("complete", function() {
      promise.resolve(true);
    });

    return promise.promise;
  }
  /** Preload assets. Uses easeljs manifest format */
  loadManifest (...args) {
    super.loadManifest(...args);

    return this;
  }
  /** Error handler if something goes wrong when preloading */
  setErrorHandler (errorCB) {
    this.on("error", errorCB);

    return this;
  }
  /** Progress handler for loading. You should look easeljs docs for more information */
  setProgressHandler (progressCB) {
    this.on("error", progressCB);

    return this;
  }
  /** Activat sound preloading also */
  activateSound () {
    this.installPlugin(createjs.Sound);
  }
}