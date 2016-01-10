/* global PIXI, Q */

/**
 * @todo should you use PIXI here or just https://github.com/englercj/resource-loader straight?
 */
"use strict";

/*-----------------------
--------- IMPORT --------
-----------------------*/
import * as Q from '/assets/lib/q/q';

/*-----------------------
---------- API ----------
-----------------------*/
export class Preload {
  /**
   * Preloads assets before initializing map.
   *
   * @class Preload
   * @constructor
   */
  constructor (baseUrl) {
    this.preloaderClass = new PIXI.loaders.Loader();
    this.preloaderClass.baseUrl = baseUrl;
  }
  /**
   * @method resolveOnComplete
   * @return {Promise} Return promise object, that will be resolved when the preloading is finished
   **/
  resolveOnComplete () {
    var promise = Q.defer();

    this.preloaderClass.load();

    this.preloaderClass.once('complete', function() {
      promise.resolve(true);
    });

    return promise.promise;
  }
  /**
   * @method addResource
   **/
  addResource (resource) {
    this.preloaderClass.add(resource);
  }
  /**
   * Preload assets
   *
   * @method loadManifest
   **/
  loadManifest () {
    return this;
  }
  /**
   * Error handler if something goes wrong when preloading
   *
   * @method setErrorHandler
   **/
  setErrorHandler (errorCB) {
    this.preloaderClass.on("error", errorCB);

    return this;
  }
  /**
   * Progress handler for loading. You should look easeljs docs for more information
   *
   * @method setProgressHandler
   **/
  setProgressHandler (progressCB) {
    this.preloaderClass.on("error", progressCB);

    return this;
  }
  /**
   * Activate sound preloading also
   *
   * @method activateSound
   **/
  activateSound () {
    this.preloaderClass.installPlugin();
  }
}