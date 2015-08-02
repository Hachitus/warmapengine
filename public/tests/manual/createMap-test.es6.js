'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../../components/factories/horizontalHexaFactory';

/* ===== Import plugins ===== */
import { map_drag } from "../../components/map/core/move/map_drag";
import { map_zoom } from '../../components/map/core/zoom/map_zoom';
import { object_select_hexagon } from '../../components/map/extensions/hexagons/object_select/object_select_hexagon';

/* DATA FILES used for testing */
import { gameData } from '../../tests/data/gameData';
import { typeData } from '../../tests/data/typeData';
import { mapData } from '../../tests/data/mapData';
import { preload } from '../../components/preloading/preloading';

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
      console.log("preloading complete? Map should be ready to init?");
      map.init( [ map_zoom, map_drag, object_select_hexagon ], { x: 41, y: 47 }, undefined );
    });

  return map;

    /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }
};