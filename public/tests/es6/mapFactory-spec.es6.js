'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../../components/factories/MapFactory.js';

/* Read data from files, to use with testing */
import { gameData } from '../../tests/data/gameData.js';
import { typeData } from '../../tests/data/typeData.js';
import { mapData } from '../../tests/data/mapData.js';

/*
1. Datat yhdessä pötkössä, kuten tää nykyinen testi-data. Eli noi testit datat tiedostoon ja pitää muuttaa oikeaan muotoon!

You should use this data instead of the testData below. You should convert this data to suit the standards so that there
is another class / module that handles the transformation and you define a good set of principle how it's done. Data in this:
"{
  "objType":2,
  "_id":"53837d49976fed3b240006b3",
  "coord":{"x":0,"y":0}
}"
What do we do with the _id and should that be replaced with actual data, when we instantiate the objects.

Always request data from backend with gameID and turn, like: domain.fi/API/mapData/832948hfdjsh93/1

/* ====== Tests ====== */
describe("basic map - without plugins", function() {
  let mapCanvas = document.getElementById("mapCanvas");
  /*let mapData = {
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
            typeImageData: "terrainBase",
            objects: [{
                name: "Plain",
                coordinates: { x: 40, y: 40 },
                imageData: 1,
                data: {
                  someCustomData: true
                }
              },{
                name: "Plain",
                coordinates: { x: 40, y: 40 },
                imageData: 2,
                data: {
                  someCustomData: true
                }
            }]
          }]
        },{
          type: "Map_layer",
          coordinates: { x: 0, y: 0 },
          name: "unitLayer",
          options: {
            cache: false
          },
          objectGroups: [{
            type: "Objects_unit",
            name: "Unit", // I guess only for debugging?
            typeImageData: "unit",
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
  */


  describe("=> make map", function() {
    let map = createMap(gameData, mapData, typeData);

    it("=> exists", function(){
      expect(map).toBeDefined();
    });
    it("=> stage properties are correct", function(){
      expect(map.stages[0].name === "terrainStage").toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
      expect(map.getChildNamed("terrainStage").name  === "terrainStage").toBeTruthy();
      expect(typeof map.getChildNamed("terrainStage") === "object").toBeTruthy();
    });
    it("=> layer properties are correct", function(){
      expect(typeof map.getLayerNamed("unitLayer") === "object").toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
    });
    it("=> terrain properties are correct", function(){
      expect(Number( map.getLayerNamed("terrainBaseLayer").children[1].y ) === 480).toBeTruthy();
      expect(map.getLayerNamed("terrainBaseLayer").children.length > 1).toBeTruthy();
    });
    it("=> unit properties are correct", function(){
      expect(Number( map.getLayerNamed("unitLayer").children[0].x ) === 60).toBeTruthy();
    });
    it("=> unit properties are correct", function(done){
      map.init( tickDoneFunc );

      function tickDoneFunc(tickDone) {
        done();
      }

      expect( true ).toBeTruthy();


    });
  });

  /* ===== Private functions ===== */
  // none
});


/* some functions to help tests */