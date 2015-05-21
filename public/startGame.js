'use strict';

import { H_Lib } from './components/ownLibraries/libraries';

/* ======== First PRELOAD ======== */
var preloadedImage = "/assets/img/map/collection.png";

/* ======== While preloading is in progress ======== */
//Load all necessary dom objects
var canvases = [
  document.getElementById("canvasStaticBackground")
];

// Setup data
let screenSize = {
   x: 1280,
   y: 960
},

// Set request animation frame to correct behavious
window.requestNextAnimationFrame = ( H_Lib.drawing.requestNextAnimationFrame() );

/* Preload "complete" */
handleComplete({images: [preloadedImage]});

/* After all the components have been loaded, we initiate the map. If we do this
 * before the images have been loaded, chrome will not display map properly */
function handleComplete(preloadedAssets) {
  initMap(canvases);
}