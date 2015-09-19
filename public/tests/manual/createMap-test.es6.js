/* global PIXI, System */

'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11 - when using babel, maybe Symbol or something missing: http://babeljs.io/docs/usage/polyfill/ */
//require("babel/polyfill");

import { createMap } from '../../components/factories/horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '../../tests/data/gameData';
import { typeData } from '../../tests/data/typeData';
import { mapData } from '../../tests/data/mapData';
import { preload } from '../../components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if(typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

window.initMap = function () {
  var canvasElement = document.getElementById("mapCanvas");
  var map;

  map = createMap(canvasElement, gameData, mapData, typeData);

  let prel = new preload( false );
  prel.setErrorHandler( preloadErrorHandler );
    //.setProgressHandler( progressHandler )
  prel.loadManifest([ {
    id: "terrain_spritesheet",
    src:"http://warmapengine.level7.fi/assets/img/map/testHexagons/testHexagonSpritesheet.png"
  },{
    id: "unit_spritesheet",
    src:"http://warmapengine.level7.fi/assets/img/map/amplio2/units.png"
  }]);
  prel.resolveOnComplete()
    .then(function() {
			var promises = [];

			gameData.pluginsToActivate.map.map(plugin => {
				promises.push(System.import(plugin));
			});
			console.log("1", promises);
			Promise.all(promises).then(activetablePlugins => {
				console.log("2",activetablePlugins);
      	map.init( activetablePlugins, gameData.mapSize, undefined );
			});
    });

  return map;

    /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
};