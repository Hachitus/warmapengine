/* global alert */

'use strict';

/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol support or something missing: http://babeljs.io/docs/usage/polyfill/ */

import { createMap } from '/components/factories/horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '/tests/data/gameData';
import { typeData } from '/tests/data/typeData';
import { mapData } from '/tests/data/mapData';
import { Preload } from '/components/preloading/preloading';

import { environmentDetection } from '/components/map/core/utils/utils';
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

    promises = map.init( gameData.pluginsToActivate.map, mapData.startPoint );

    Promise.all(promises).then( () => {
      document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);
    });
  }

  return globalMap;
};