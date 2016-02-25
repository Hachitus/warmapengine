'use strict';
/* POLYFILL (es6StringPolyfill)  IS NEEDED FOR IE11, maybe Symbol support or something missing:
 * http://babeljs.io/docs/usage/polyfill/
 * */

(function () {
  /***********************
  ******** IMPORT ********
  ***********************/
  var polyfills = window.flatworld.generalUtils.polyfills;
  var factories = window.flatworld.factories;
  var Preload = window.flatworld.Preload;
  var baseEventlisteners = window.flatworld.extensions.baseEventlisteners;
  var mapZoom = window.flatworld.extensions.mapZoom;
  var mapDrag = window.flatworld.extensions.mapDrag;
  var hexagons = window.flatworld.extensions.hexagons;
  var mapMovement = window.flatworld.extensions.mapMovement;
  var Sound = window.flatworld.Sound;
  var mapEvents = window.flatworld.mapEvents;
  var Q = window.flatworld.Q;

  /* DATA FILES used for testing */
  var gameData = window.gameData;
  var typeData = window.typeData;

  /** ===== CONFIGS ===== */
  /* Note the y is 3/4 of the actual height */
  const HEXAGON_DISTANCES = {
    x: 82,
    y: 94 * 0.75
  };

  /* REQUIRED FOR IE11 */
  polyfills.arrayFind();
  polyfills.es6String();

  /* Start the whole functionality */
  (function () {
    window.FPSElement = document.createElement("div");
    window.FPSElement.style.position = 'absolute';
    window.FPSElement.style.left = '0px';
    window.FPSElement.style.top = '0px';
    window.FPSElement.style.backgroundColor = 'white';

    document.body.appendChild( window.FPSElement );

    var mapsizeElement = document.getElementById("hexaTiles");
    var cacheElement = document.getElementById("cache");
    var cacheMap = true;
    var currentMapSize, mapData;

    document.getElementById("testNotification").textContent = "START THE TESTS BY SELECTING VALUES BELOW AND CLICKING START!";
    document.getElementById("changeValues").disabled = false;

    document.getElementById("changeValues").addEventListener("click", function() {
      document.getElementById("testNotification").style.display = "none";
      currentMapSize = mapsizeElement.value;
      cacheMap = cacheElement.checked;

      mapData = getMapData(currentMapSize);
      window.mapReady = initFlatworld(mapData, {
        mapsize: currentMapSize,
        cache: cacheMap,
        canvasContainer: document.getElementById("mapCanvasContainer"),
        trackFPSCB: function (data) {
          var totalFPS = data.FPS;
          var totalTime = data.FPStime;
          var totalRenderTime = data.renderTime;
          var drawCount = data.drawCount;

          window.FPSElement.innerHTML = totalFPS + " - " + Math.round( ( totalRenderTime / totalTime * 100 ) ) + "%" + " : " + drawCount;
        }
      });
    });
  })();

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

  function initFlatworld(mapData, options) {
    options = options || {};
    var mapsize = options.mapSize;
    var canvasContainer = options.canvasContainer;
    var trackFPSCB = options.trackFPSCB;
    var cache = options.cache;
    var automatic = options.automatic;
    var map = {};
    var globalMap = {
      data: {}
    };
    var pluginsToActivate = [
      baseEventlisteners,
      mapZoom,
      mapDrag,
      hexagons.selectHexagonObject,
      mapMovement
    ];
    var sound = new Sound();
    var preload;

    /* Determines how much stuff we show on screen for stress testing */
    // If either is even 1 pixel bigger than this, gets all black
    /* works with:
    x: 8118,
    y: 8107*/
    gameData.mapSize = {
      x: mapsize || 1000,
      y: mapsize || 1000
    };

    preload = new Preload( "", { crossOrigin: false } );
    preload.addResource( typeData.graphicData.terrainBase.json );
    preload.addResource( typeData.graphicData.unit.json );
    loadSounds();
    mapEvents.subscribe("objectsSelected", unitSelectedSound);

    preload.setErrorHandler(function(e) {
      console.log("preloader error:", e);
    });
    preload.setProgressHandler(function(progress) {
      console.log("progressing" + progress);
    });

    preload.resolveOnComplete()
      .then(onComplete)
      .then((map) => {
        map.whenReady().then(() => {
          document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);
        }).then(() => {
          if (automatic) {
            map.whenReady().then(() => {
              window.setTimeout(perfTestLoop)
            }).then(null, (e) => {
              console.log(e);
            });

            function perfTestLoop () {
              var direction = 1;
              var round = 0;
              var quantifier = 2;

              return function() {
                map.moveMap({
                  x: direction === 1 ? -quantifier : quantifier,
                  y: direction === 1 ? -quantifier : quantifier
                });

                if (map.getMovableLayer().x > 500) {
                  round ++;
                  direction = 1;
                } else if (map.getMovableLayer().x < - 7000) {
                  direction = 2;
                }

                if (round < 5) {
                  window.setTimeout(perfTestLoop);
                }
              }
            }
          }
        })
      })
      .catch(function (e) {
        console.log("Map stressTest error: ", e);
      });

    function onComplete(loader, resources) {
      map = globalMap.data = factories.hexaFactory(
        canvasContainer, {
          game: gameData,
          map: mapData,
          type: typeData
        }, {
          trackFPSCB: trackFPSCB,
          isHiddenByDefault: true,
          cache: options.cache
        });

      map.init( pluginsToActivate, mapData.startPoint );

      return map;
    }

    /* ====== private functions ====== */
    function preloadErrorHandler(err) {
      console.log("PRELOADER ERROR", err );
    }
    function unitSelectedSound() {
      sound.play("cheer");
    }
    function loadSounds() {
      sound.add( "cheer", "/tests/testAssets/sounds/personCheering.mp3" );
    }
  }

  /*---------------------
  ------- PRIVATE -------
  ---------------------*/
  /* THESE GENERATE THE ACTUAL RANDOM MAP DATA */
  function addBase_spriteLayerData(name, group, options) {
    options = options || {};
    var interactive = options.interactive || true;
    var cache = options.cache || true;

    return {
      type: "MapLayerParent",
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
          type: "ObjectTerrain",
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
          type: "ObjectUnit",
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
})();