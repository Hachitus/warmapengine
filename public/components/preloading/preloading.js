"use strict";

/*
Creating the createjsQueue-object from spritesheet. This preloads assests.

@requires createjs Createjs library / framework object - global object
@param {string} basePath
@todo Make a loader graphics / notifier when loading assets using preloader.

Usage: preload.generate("http://path.fi/path").onComplete().then(function() {});
*/
export class preload extends createjs.LoadQueue {
  constructor (...args) {
    super(...args);
  }
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
  loadManifest (...args) {
    super.loadManifest(...args);

    return this;
  }
  setErrorHandler (errorCB) {
    this.on("error", errorCB);

    return this;
  }
  setProgressHandler (progressCB) {
    this.on("error", progressCB);

    return this;
  }
  activateSound () {
    this.installPlugin(createjs.Sound);
  }
}