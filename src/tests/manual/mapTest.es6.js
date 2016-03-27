'use strict';

/**
 * Tests that the normal map initialization works and also: zoom, drag and hexaon object selections work.
 */
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
  var UITheme = window.flatworld.UIs.default;
  var UI = window.flatworld.UI;

  /* DATA FILES used for testing */
  var gameData = window.gameData;
  var typeData = window.typeData;
  var mapData = window.mapData;

  var pluginsToActivate = [
    baseEventlisteners,
    mapZoom,
    mapDrag,
    hexagons.selectHexagonObject
  ];
  var HEXAGON_RADIUS = gameData.hexagonRadius;

  /* REQUIRED FOR IE11 */
  polyfills.arrayFind();
  polyfills.es6String();

  hexagons.utils.init(HEXAGON_RADIUS);

  initFlatworld(mapData, {
    canvasContainer: document.getElementById("mapCanvasContainer")
  });

  function initFlatworld (mapData, options) {
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

      map = globalMap.data = factories.hexaFactory(canvasElement, {
          game: gameData,
          map: mapData,
          type: typeData
        },
        {
          isHiddenByDefault: false
        });

      var dialog_selection = document.getElementById("selectionDialog");
      var initializedUITheme = new UITheme.init(dialog_selection, map);
      UI(initializedUITheme, map);

      promises = map.init( pluginsToActivate, mapData.startPoint );

      Promise.all(promises).then( () => {
        document.getElementById("testFullscreen").addEventListener("click", map.toggleFullScreen);
      });
    }

    return globalMap;
  };

})();