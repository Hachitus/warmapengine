'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../../components/factories/horizontalHexaFactory';
/* Read data from files, to use with testing */
import { gameData } from '../../tests/data/gameData';
import { typeData } from '../../tests/data/typeData';
import { mapData } from '../../tests/data/mapData';
import { preload } from '../../components/preloading/preloading';

/* ===== Import plugins ===== */
import { map_drag } from "../../components/map/move/map_drag";
import { object_select_hexagon } from '../../components/map/hexagons/object_select/object_select_hexagon';

var map = window.map = {};
window.initMap = function () {
  var canvasElement = document.getElementById("mapCanvas");

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
      map.init( tickDoneFunc, [ map_drag, object_select_hexagon ], { x: 41, y:47 } );
    });

    /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err );
  }

  function tickDoneFunc(tickDone) {

  }
/*
  var timeoutter = (function (map) {
    return function() {
      map.stages[0].drawThisChild = true;
      map.drawMap();
    };
  })(map);

  window.setTimeout(timeoutter, 400);
*/
}