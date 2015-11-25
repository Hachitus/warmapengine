/* global PIXI, System, alert */

'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11 - when using babel, maybe Symbol or something missing: http://babeljs.io/docs/usage/polyfill/ */
//require("babel/polyfill");

import { createMap } from '/components/factories/horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '/tests/data/gameData';
import { typeData } from '/tests/data/typeData';
import { mapData } from '/tests/data/mapData';
import { Preload } from '/components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if (typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

window.initMap = function () {
  var canvasElement = document.getElementById("mapCanvas");
  var map = {};
  var globalMap = {
    data: {}
  };
  var preload;

  preload = new Preload( "", { crossOrigin: false } );
  preload.addResource( typeData.graphicData.terrainBase.json );
  preload.addResource( typeData.graphicData.unit.json );

  preload.setErrorHandler(function(e) {
    console.log("preloader error:", e);
  });
  preload.setProgressHandler(function(progress) {
    console.log("progressing" + progress);
  });

  preload.resolveOnComplete().then(onComplete);

  function onComplete() {
    var promises = [];

    map = globalMap.data = createMap(canvasElement, { game: gameData, map: mapData, type: typeData });

    gameData.pluginsToActivate.map.map(plugin => {
      promises.push(System.import(plugin));
    });

    Promise.all(promises).then(activetablePlugins => {
      map.init( activetablePlugins, mapData.startPoint, undefined );

      document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);

      if (map.setCache) {
        map.setCache(true);
      }
    });
  }

  return globalMap;

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
};