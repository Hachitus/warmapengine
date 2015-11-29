/* global System, alert, console, Q */

'use strict';
/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol support or something missing: http://babeljs.io/docs/usage/polyfill/ */

/**
 * @requir Q for promises
 */

import { createMap } from '/components/factories/horizontalHexaFactory';

/* DATA FILES used for testing */
import { gameData } from '/tests/data/gameData';
import { typeData } from '/tests/data/typeData';
import { Preload } from '/components/preloading/preloading';

import { environmentDetection } from '../../components/map/core/utils/utils';
if (typeof Hammer === 'undefined' && environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

/** ===== CONFIGS ===== */
const HEXASIZE = {
  x: 41,
  y: 47
};
/* Note the y is 3/4 of the actual height */
const HEXAGON_DISTANCES = {
  x: 82,
  y: 94 * 0.75
};

/* Do the map: */
var mapsize;
window.getMapData = getMapData;
window.initMap = initMap;

/**************************************
****** GENERATE RANDOM MAP DATA *******
**************************************/
function getMapData(mapsize) {
  var terrainTypeCount = 4;
  var unitTypeCount = 56;
  var coordMapsize = {
    x: mapsize,
    y: mapsize
  };

  return {
    gameID: "53837d47976fed3b24000005",
    turn: 1,
    startPoint: { x: 0, y: 0 },
    element: "#mapCanvas",
    layers: [
    populateTerrainLayer(HEXAGON_DISTANCES, terrainTypeCount, coordMapsize),
    populateUnitLayer(HEXAGON_DISTANCES, unitTypeCount, coordMapsize)
    ]
  };
}

function initMap(mapData, options) {
  var canvasElement = document.getElementById("mapCanvas");
  var map = {};
  var globalMap = {
    data: {}
  };
  var promise = Q.defer();
  var preload;

  /* Determines how much stuff we show on screen for stress testing */
  // If either is even 1 pixel bigger than this, gets all black
  /* works with:
  x: 8118,
  y: 8107*/
  mapsize = {
    x: options.mapsize || 1000,
    y: options.mapsize || 1000
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

  preload.resolveOnComplete().then(onComplete).then( () => {
    promise.resolve(true);
  });

  function onComplete() {
    var promises = [];

    gameData.mapSize = mapsize;

    map = globalMap.data = createMap(canvasElement, { game: gameData, map: mapData, type: typeData });

    promises = map.init( gameData.pluginsToActivate.map, mapData.startPoint );

    map.whenReady.then( () => {
      document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);
      if (options.cache) {
        map.cacheMap(true);
      }
    });
  }

  return globalMap;

  /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
}

/************ PRIVATE ************/
function addBase_spriteLayerData(name, group, options = { interactive: true, cache: true }) {
  var { interactive, cache } = options;

  return {
    type: "Map_bigSpriteLayer",
    coord: { x: 0, y: 0 },
    name: name,
    group: group, // For quadTrees
    specials: [{
      interactive: interactive
    }],
    options: {
      cache: cache
    },
    objectGroups: []
  };
}

function populateTerrainLayer(size, typeCount, mapsize) {
  let layerData = addBase_spriteLayerData("terrainLayer", "terrain");

  for (let y = 0; y < mapsize.y; y += size.y ) {
    let x = 0;

    if (y / size.y % 2 === 0) {
      x += size.x / 2;
    }

    while ( x < mapsize.x ) {
      let realX = x;

      layerData.objectGroups.push({
        type: "Object_terrain",
        name: "Terrain", // For quadTrees and debugging
        typeImageData: "terrainBase",
        objects: [{
          objType: Math.floor(Math.random() * typeCount),
          name:"random_" + Math.random(),
          _id: Math.random(),
          coord:{
            x: realX,
            y: y
          },
          data: {},
          lastSeenTurn:Math.floor(Math.random() * 10)
        }]
      });

      x += size.x;
    }
  }

  return layerData;
}

function populateUnitLayer(size, typeCount, mapsize) {
  let layerData = addBase_spriteLayerData("unitLayer", "unit");

  for (let y = 0; y < mapsize.y; y += size.y ) {
    let x = 0;

    if (y / size.y % 2 === 0) {
      x += size.x / 2;
    }

    while ( x < mapsize.x ) {
      let realX = x;

      layerData.objectGroups.push({
        type: "Object_unit",
        name: "Unit", // For quadTrees and debugging
        typeImageData: "unit",
        objects: [{
          objType: Math.floor(Math.random() * typeCount),
          name: "random_" + Math.random(),
          _id: Math.random(),
          coord:{
            x: realX,
            y: y
          },
          data: {
            playerID: Math.floor(Math.random() * 10),
            hp: Math.floor(Math.random() * 100),
            someStuff: "jalajajajajaja" + Math.random(),
            someStuff2: "jalajajajajaja" + Math.random(),
            someStuff3: "jalajajajajaja" + Math.random(),
            someStuff4: "jalajajajajaja" + Math.random(),
            someStuff5: "jalajajajajaja" + Math.random(),
            someStuff6: ("jalajajajajaja" + Math.random()).repeat(30)
          },
          lastSeenTurn:Math.floor(Math.random() * 10)
        }]
      });

      x += size.x;
    }
  }

  return layerData;
}