'use strict';

console.log("Just a reminder: Current working directory for tests needs to be the app root");

/* ====== Library imports ====== */
import chai from 'chai';
var expect = chai.expect;
import fs from 'fs';
import { Deferred } from 'es6-deferred';

global.Canvas = require( 'canvas' );
/** node-easel needs really badly the global Image-function, to generate Sprites. Will cause error if not available. */
global.Image = global.Canvas.Image;
global = require( 'node-easel' );

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../public/components/factories/MapFactory.js';

/* Read data from files, to use with testing */
import { typeData } from '../public/tests/data/typeData.js';
import { graphicData } from '../public/tests/data/graphics.js';
import { importedTerrainData } from '../public/tests/data/terrainData.js';
let terrainData = dataCoverterForTestData_terrain(importedTerrainData);

/* ====== Tests ====== */
describe("basic map - without plugins", function() {

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


  describe("=> make map", function() {
    let map = createMap(mapData);

    it("=> exists", function(){
      expect(map).to.exist;
    });
  });

  /* ===== Private functions ===== */
  // none
});


/* some functions to help tests */
function dataCoverterForTestData_terrain(jsonedData) {
  /* strip the required data to the object and return it */
  return jsonedData.objects.terrainBase.map(function(thisData) {
    return {
      objType: thisData.objType,
      _id: thisData._id,
      coord: thisData.coord
    };
  });
}

function typeIndexToData(objType) {
  return typeData.unit[objType];
}