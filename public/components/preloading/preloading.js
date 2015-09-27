/* global PIXI, Q */

/** @todo should you use PIXI here or just https://github.com/englercj/resource-loader straight? */
"use strict";

export class Preload {
  constructor (baseUrl) {
		this.preloaderClass = new PIXI.loaders.Loader();
		this.preloaderClass.baseUrl = baseUrl;    
  }
  /**
	 * @return {Promise} Return promise object, that will be resolved when the preloading is finished */
  resolveOnComplete () {
    var promise = Q.defer();
		
		this.preloaderClass.load();

    this.preloaderClass.once('complete', function() {
      promise.resolve(true);
    });

    return promise.promise;
  }
	add(resource) {
		this.preloaderClass.add(resource);
	}
  /** Preload assets. Uses easeljs manifest format */
  loadManifest () {
    return this;
  }
  /** Error handler if something goes wrong when preloading */
  setErrorHandler (errorCB) {
    this.preloaderClass.on("error", errorCB);

    return this;
  }
  /** Progress handler for loading. You should look easeljs docs for more information */
  setProgressHandler (progressCB) {
    this.preloaderClass.on("error", progressCB);

    return this;
  }
  /** Activat sound preloading also */
  activateSound () {
    this.preloaderClass.installPlugin();
  }
}