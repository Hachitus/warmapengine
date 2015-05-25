'use strict';

/* ====== Library imports ====== */
// @required createjs
// None

/* ====== Own module imports ====== */
import { Map } from '/var/www/warMapEngine/public/components/map/core/Map';
import { Map_stage } from '/var/www/warMapEngine/public/components/map/core/Map_stage';
import { Map_layer } from '/var/www/warMapEngine/public/components/map/core/Map_layer';
import { Objects_sprite } from '/var/www/warMapEngine/public/components/map/core/Objects';
import { createMap } from '/var/www/warMapEngine/public/components/factories/MapFactory';
import { preload } from '/var/www/warMapEngine/public/components/preloading/preloading';

/* test datas */
import { typeData } from '/var/www/warMapEngine/public/tests/data/typeData';
import { graphicData } from '/var/www/warMapEngine/public/tests/data/graphics';
import { gameData } from '/var/www/warMapEngine/public/tests/data/gameData';
let spritesheetData = graphicData.terrainBase;

let canvasEleID = "mapCanvas";
let stageNamesAndEle = [{
  name: "perusStage",
  ele: canvasEleID
}];
let layerNamesAndEle = [{
  name: "perusLayer",
  type: Map_layer.getType("imagesInSubContainers")
}];
let stages, layers;
/* ====== Preload images, before constructing the stage ====== */
/* We need to set the preloads first argument to false (preferXHR), cause for some reason, it doesn't work with XHR.
@todo figure out the reason behind it, so it's more solid to implement a correct solution and not a hack-fix */
new preload( false )
  .setErrorHandler( preloadErrorHandler )
  //.setProgressHandler( progressHandler )
  .loadManifest( ["assets/img/map/collection.png"])
  .resolveOnComplete()
  .then(handleComplete);

console.log(typeData);
console.log(graphicData);
console.log(terrainData);

let mapData = {
    mapSize: { x: 100, y: 100 },
    pluginsToActivate: false,
    stages: [{
      type: "Map_stage",
      coordinates: { x: 0, y: 0 },
      name: "terrainStage",
      element: "#canvasTerrain",
      layers: [{
          type: "Map_layer",
          coordinates: { x: 0, y: 0 },
          name: "terrainBaseLayer",
          options: {
            cache: true
          },
          objectGroups: [{
            type: "Objects_terrain",
            name: "TerrainBase", // I guess only for debugging?
            typeImageData: {
              images: [
                "/var/www/warMapEngine/public/assets/img/map/collection.png"
              ],
              "frames": [
                [0,0,96,48],
                [0,48,96,48],
                [0,96,96,48],
                [0,144,96,48],
                [0,192,96,48],
                [0,240,96,48]
              ],
              "imageSize":[96,48]
            },
            objects: [{
                name: "Plain",
                coordinates: { x: 40, y: 40 },
                imageData: 1,
                data: {
                  someCustomData: true
                }
              },{
                type: "Objects_terrain",
                name: "Terrain", // I guess only for debugging?
                objects: [{
                  name: "Plain",
                  coordinates: { x: 40, y: 40 },
                  imageData: 2,
                  data: {
                    someCustomData: true
                  }
                }]
            }]
          }]
        },{
          type: "Objects_terrain",
          coordinates: { x: 0, y: 0 },
          name: "terrainBaseLayer",
          typeImageData: {
              images: [
                "/var/www/warMapEngine/public/assets/img/map/collection.png"
              ],
              "frames": [
                [0,0,96,48],
                [0,48,96,48],
                [0,96,96,48],
                [0,144,96,48],
                [0,192,96,48],
                [0,240,96,48]
              ],
              "imageSize":[96,48]
            },
          options: {
            cache: false
          },
          objectGroups: [{
            type: "Objects_unit",
            name: "Unit", // I guess only for debugging?
            objects: [{
              name: "Infantry 1",
              coordinates: { x: 60, y: 60 },
              imageData: 3,
              data: {
                someCustomData: true
              }
            }]
          }]
      }]
    }]
  };

let map = createMap(mapData);



stages = stageNamesAndEle.map(function(stageData) {
  return new Map_stage(stageData.name, stageData.ele);
})
layers = layerNamesAndEle.map(function(layerData) {
  return new Map_layer(layerData.name, layerData.type);
})

window.map = new Map();

let spriteSheet = new createjs.SpriteSheet(spritesheetData);

let sprite = new Objects_sprite({ x:1, y:1 }, {}, { spritesheet: spriteSheet, currentFrameNumber: 0 });

let image = new createjs.Sprite(spriteSheet);
image.gotoAndStop(0);
image.x = 100;
image.y = 100;

window.map.addStage(stages[0]);
stages[0].addChild(layers[0]);

function handleComplete() {
  layers[0].addChild(image, sprite);

  stages[0].update();
}

/* ====== private functions, or to be moved elsewhere ====== */
function preloadErrorHandler(err) {
  console.log("PRELOADER ERROR", err )
};