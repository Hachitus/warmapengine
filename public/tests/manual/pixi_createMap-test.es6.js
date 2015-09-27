/* global PIXI, System, alert */

'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol os something missing: http://babeljs.io/docs/usage/polyfill/ */
//require("babel/polyfill");

import { createMap } from '../../components/factories/pixi_horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '../../tests/data/pixi_gameData';
import { typeData } from '../../tests/data/pixi_typeData';
import { mapData } from '../../tests/data/pixi_mapData';
import { Preload } from '../../components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if(typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

window.initMap = function () {
  var canvasElement = document.getElementById("mapCanvas");
  var map = {};
	var preload;

  preload = new Preload( "/assets/img/map/", { crossOrigin: false } );
  preload.add("testHexagons/pixi_testHexagonSpritesheet.json");
  preload.add("units/testHexagonUnits.json");

	preload.setErrorHandler(function(e) {
		console.log("preloader error:", e);
	});
	preload.setProgressHandler(function(progress) {
		console.log("progressing" + progress);
	});
	
	preload.resolveOnComplete().then(onComplete);

  function onComplete() {
		var promises = [];
		
    map = createMap(canvasElement, { game: gameData, map: mapData, type: typeData });
		
		gameData.pluginsToActivate.map.map(plugin => {
			promises.push(System.import(plugin));
		});
		
		Promise.all(promises).then(activetablePlugins => {
			map.init( activetablePlugins, gameData.mapSize, undefined );
		});
  }

  return map;
	
	/* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
};