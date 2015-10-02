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
import { Preload } from '../../components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if(typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

/**************************************
****** GENERATE RANDOM MAP DATA *******
**************************************/
var mapData = (function() {
	var data = {
		gameID: "53837d47976fed3b24000005",
		turn: 1,
		startPoint: { x: 0, y: 0 },
		element: "#mapCanvas",
		layers: []
	};
	const MAPSIZE = {
		x: 20000,
		y: 30000
	};
	const HEXASIZE = {
		x: 41,
		y: 47
	};
	/* Note the y is 3/4 of the actual height */
	var hexagonSizes = {
		x: 82,
		y: 94 * 0.75
	};
	var unitCount = 10000;
	var terrainTypeCount = 4;
	var unitTypeCount = 56;
	var objGroup, layerData;
	
	return {
		gameID: "53837d47976fed3b24000005",
		turn: 1,
		startPoint: { x: 0, y: 0 },
		element: "#mapCanvas",
		layers: [
			populateTerrainLayer(hexagonSizes, terrainTypeCount),
			populateUnitLayer(unitCount, hexagonSizes, unitTypeCount)
		]
	};
	
	/************ PRIVATE ************/
	function addBase_spriteLayerData(name, group, options = { interactive: true, cache: true }) {
		var { interactive, cache } = options;

		return {
			type: "Map_spriteLayer",
			coord: { x: 0, y: 0 },
			name: name,
			group: group, // For quadTrees
			specials: [{
				"interactive": interactive
			}],
			options: {
				cache: cache
			},
			objectGroups: []
		};
	}
	
	function populateTerrainLayer(size, typeCount) {
		let layerData = addBase_spriteLayerData("terrainLayer", "terrain");
		
		for (let y = 0; y < MAPSIZE.y; y += size.y ) {
			let x = 0;
			
			if(y / size.y % 2 === 0) {
				x += size.x / 2;
			}
			
			while( x < MAPSIZE.x ) {
				let realX = x;
				
				layerData.objectGroups.push({
						type: "Object_terrain",
						name: "Terrain", // For quadTrees and debugging
						typeImageData: "terrainBase",
						objects: [{
							 "objType": Math.floor(Math.random() * typeCount),
							 "name":"random_" + Math.random(),
							 "_id": Math.random(),
							 "coord":{
									"x": realX,
									"y": y
							 },
							 "data": {},
							 "lastSeenTurn":Math.floor(Math.random() * 10)
						}]
				});
				
				x += size.x;
			}
		}
		
		return layerData;
	}

	function populateUnitLayer(amount, size, typeCount) {
		let layerData = addBase_spriteLayerData("terrainLayer", "terrain");

		for (let i = 0; i < amount; i++ ) {
			layerData.objectGroups.push({
					type: "Object_unit",
					name: "Unit", // For quadTrees and debugging
					typeImageData: "unit",
					objects: [{
						"objType": Math.floor(Math.random() * typeCount),
						"name": "random_" + Math.random(),
						"_id": Math.random(),
						 "coord":{
								"x": calculateRandomHexaCoord( HEXASIZE.x ),
								"y": calculateRandomHexaCoord( HEXASIZE.y )
						 },
						"data": {
							"playerID": Math.floor(Math.random() * 10),
							"hp": Math.floor(Math.random() * 100),
							"someStuff": "jalajajajajaja" + Math.random(),
							"someStuff2": "jalajajajajaja" + Math.random(),
							"someStuff3": "jalajajajajaja" + Math.random(),
							"someStuff4": "jalajajajajaja" + Math.random(),
							"someStuff5": "jalajajajajaja" + Math.random(),
							"someStuff6": ("jalajajajajaja" + Math.random()).repeat(30)
						},
						"lastSeenTurn":Math.floor(Math.random() * 10)
					}]
			});
		}
		
		return layerData;
	}
	
	function calculateRandomHexaCoord(hexaSize) {
		return ( Math.floor( hexaSize * ( Math.random() * MAPSIZE.x / hexaSize ) ) );
	}
	
})();

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
			if(map.setCache) {
				map.setCache(true);
			}
		});
  }

  return map;
	
	/* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
};