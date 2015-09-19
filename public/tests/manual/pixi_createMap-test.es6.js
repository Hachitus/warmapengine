/* global PIXI, System */

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
//import { preload } from '../../components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if(typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

window.initMap = function () {
  var canvasElement = document.getElementById("mapCanvas");
  var map;

  /** @todo MOVE the preloader to it's destined file: preloader. */
  var loader = PIXI.loader;

  loader.baseUrl = "/assets/img/map/";
  loader.add("testHexagons/pixi_testHexagonSpritesheet.json");
  loader.add("units/testHexagonUnits.json");

  loader.once('complete',onComplete);

  loader.load();
  //PIXI.loader.on("progress", loadProgressHandler);

  function onComplete() {
		var promises = [];
		
    map = createMap(canvasElement, { game: gameData, map: mapData, type: typeData });
		
		gameData.pluginsToActivate.map.map(plugin => {
			promises.push(System.import(plugin));
		});
		console.log("1", promises);
		Promise.all(promises).then(activetablePlugins => {
			console.log("2",activetablePlugins);
			map.init( activetablePlugins, gameData.mapSize, undefined );
		});
  }

  return map;
};