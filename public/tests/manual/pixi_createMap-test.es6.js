'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol os something missing: http://babeljs.io/docs/usage/polyfill/ */
require("babel/polyfill");

import { createMap } from '../../components/factories/pixi_horizontalHexaFactory';

/* ===== Import plugins ===== */
import { map_drag } from "../../components/map/core/move/map_drag";
import { map_zoom } from '../../components/map/core/zoom/pixi_map_zoom';
import { object_select_hexagon } from '../../components/map/extensions/hexagons/object_select/object_select_hexagon';

/* DATA FILES used for testing */
import { gameData } from '../../tests/data/gameData';
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

  loader.add("/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json");

  loader.once('complete',onComplete);

  loader.load();
  //PIXI.loader.on("progress", loadProgressHandler);

  function onComplete() {
    map = createMap(canvasElement, { game: gameData, map: mapData, type: typeData });
    map.init( [ map_zoom, map_drag ], { x: 41, y: 47 }, undefined );
  }

  return map;
};