"use strict";

/** Creating the createjsQueue-object from spritesheet. This preloads assests.
 * @requires createjs Createjs library / framework object - global object
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
    var bindedOnComplete = _onComplete.bind(this);
    let promise = new Promise(bindedOnComplete);

    return promise;

    function _onComplete(resolve) {
      this.on("complete", function() {
        resolve(true);
      });
    }
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