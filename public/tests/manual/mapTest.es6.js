'use strict';

/**
 * Tests that the normal map initialization works and also: zoom, drag and hexaon object selections work.
 */
/* POLYFILL (es6StringPolyfill)  IS NEEDED FOR IE11, maybe Symbol support or something missing:
 * http://babeljs.io/docs/usage/polyfill/
 * */

/***********************
******** IMPORT ********
***********************/
import { polyfills } from 'components/bundles/hexagonBundle';
import { createHorizontalHexagonMap } from '/factories/horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '/tests/data/gameData';
import { typeData } from '/tests/data/typeData';
import { mapData } from '/tests/data/mapData';
import { Preload } from 'components/preloading/preloading';

/* REQUIRED FOR IE11 */
polyfills.arrayFind();

var pluginsToActivate = [
  "components/map/core/baseEventlisteners/baseEventlisteners",
  "components/map/core/zoom/mapZoom",
  "components/map/core/move/mapDrag",
  "components/map/extensions/hexagons/selectHexagonPlugin"
];

window.initMap = function (options) {
  var canvasElement = options.canvasContainer;
  var map = {};
  var globalMap = {
    data: {}
  };
  var preload;

  gameData.mapSize = {
    x: 1000,
    y: 1000
  };

  preload = new Preload( "", { crossOrigin: false } );
  preload.addResource( typeData.graphicData.terrainBase.json );
  preload.addResource( typeData.graphicData.unit.json );

  preload.setErrorHandler(function(e) {
    console.log("preloader error:", e);
  });
  preload.setProgressHandler(function(progress) {
    console.log("progressing" + progress);
  });

  preload.resolveOnComplete()
    .then(onComplete)
    .catch(function (e) {
      console.log("Map stressTest error: ", e);
    });

  function onComplete() {
    var promises = [];

    map = globalMap.data = createHorizontalHexagonMap(canvasElement, {
        game: gameData,
        map: mapData,
        type: typeData
      }, {
        isHiddenByDefault: false
      });

    promises = map.init( pluginsToActivate, mapData.startPoint );

    Promise.all(promises).then( () => {
      document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);
    });
  }

  return globalMap;
};