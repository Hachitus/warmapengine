'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../../components/factories/MapFactory.js';

/* Read data from files, to use with testing */
import { typeData } from '../../tests/data/typeData.js';
import { graphicData } from '../../tests/data/graphics.js';
import { terrainData } from '../../tests/data/terrainData.js';

let convertedTerrainData = dataCoverterForTestData_terrain(terrainData);

Hyvin tärkeää nyt miettiä, miten toi data pitäs olla organisoitu. Eli älä mieti koodin puolen implementointia vaan "interfacea"
Voit väännellä dataa kyllä koodin puolella, kuten haluat.
0. Mites mahdollinen API!? Se on ehkä tärkein osa tässä miettiä!
1. Pitäskö olla yhdessä pötkössä, kuten nyt
2. Pitäskö olla tree-mallisesti kuten testi-datassa
3. Miten tietokanta siitä tykkää?

You should use this data instead of the testData below. You should convert this data to suit the standards so that there
is another class / module that handles the transformation and you define a good set of principle how it's done. Data in this:
"{
  "objType":2,
  "_id":"53837d49976fed3b240006b3",
  "coord":{"x":0,"y":0}
}"
What do we do with the _id and should that should be replaced with actual data, when we instantiate the objects. Though
where that data comes from and is stored depends.
debugger;

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
                "/assets/img/map/collection.png"
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
            typeImageData: {
              images: [
                "/assets/img/map/collection.png"
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
      debugger;
      expect(map.getLayerNamed("terrainBaseLayer").children[0].x === 40).toBeTruthy();
      expect(map.getLayerNamed("terrainBaseLayer").children.length > 1).toBeTruthy();
    });
    it("=> unit properties are correct", function(){
      expect(map.getLayerNamed("unitLayer").children[0].x === 60).toBeTruthy();
    });
  });

  /* ===== Private functions ===== */
  // none
});


/* some functions to help tests */
function dataCoverterForTestData_terrain(jsonedData) {
  /* strip the required data to the object and return it */
  return jsonedData.objects.map(function(thisData) {
    return {
      objType: thisData.objType,
      _id: thisData._id,
      coord: thisData.coord
    };
  });
}