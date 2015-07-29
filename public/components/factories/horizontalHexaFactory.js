'use strict';

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ===== 3rd party library imports ===== */
//import { System } from 'systemjs';

/* ====== Own module imports ====== */
import { Map } from '../map/core/Map';
import { Object_terrain_hexa } from '../map/hexagons/object/Object_terrain_hexa';
import { Object_unit_hexa } from '../map/hexagons/object/Object_unit_hexa';
import { spritesheetList } from '../map/core/spritesheetList';
let allSpritesheets = spritesheetList();
import { UI } from '../map/core/UI';
import { UI_default } from "../map/UIs/default/default.js";

let functionsInObj = {
  Object_terrain: Object_terrain_hexa,
  Object_unit: Object_unit_hexa
};

/** ===== EXPORT ===== */
/*
@argument {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
Coordinates are always defaulted to 0,0 if none are given.
{
  mapSize: createjs.Rectangle,
  pluginsToActivate: [
    "map/move/map_move",
    "map/FOW/map_FOW"
  ],
  stages: [{
    type: "map/core/Map_Stage",
    coordinates: createjs.Point,
    name: "terrainStage",
    element: "#canvasTerrain",
    layers: [{
      type: "map/layers/Map_layer_terrain",
      coordinates: createjs.Point,
      name: "terrainBaseLayer",
      options: {
        cache: true
      },
      objectGroups: [{
        type: "map/objects/Objects_terrain",
        name: "TerrainBase", // I guess only for debugging?
        objects: [{
          name: "Plain",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }],
        type: "map/objects/Objects_terrain",
        name: "Terrain", // I guess only for debugging?
        objects: [{
          name: "Plain",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }]
      }],
      type: "map/layers/Map_layer_terrain",
      coordinates: createjs.Point,
      name: "terrainBaseLayer",
      options: {
        cache: false
      },
      objectGroups: [{
        type: "map/objects/Objects_unit",
        name: "Unit", // I guess only for debugging?
        objects: [{
          name: "Infantry 1",
          coordinates: createjs.Point,
          imageData: data_forExampleImageFileName,
          data: customDataObject
        }]
      }]
    }]
  }]
}
*/

export function createMap(canvasElement, gameDataArg, mapDataArg, typeDataArg) {
  console.log("============================================")
  var mapData = (typeof mapDataArg === "string") ? JSON.parse(mapDataArg) : mapDataArg;
  var typeData = (typeof typeDataArg === "string") ? JSON.parse(typeDataArg) : typeDataArg;
  var gameData = (typeof gameDataArg === "string") ? JSON.parse(gameDataArg) : gameDataArg;
  var map = new Map(canvasElement, { mapSize: gameData.mapSize });
  var dialog_selection = document.getElementById("selectionDialog");
  var defaultUI = new UI_default(dialog_selection);
  defaultUI.init();

  /* Initialize UI as singleton */
  UI(defaultUI, map);

  /* Activate plugins */
  /* The system does not work :(
  if(gameData.pluginsToActivate.map && gameData.pluginsToActivate.map.length > 0) {
    Promise.all(
          gameData.pluginsToActivate.map.map(x => System.import(x)))
      .then(([module1, module2, module3]) => {
          console.log("all plugins loaded");
      }).catch(e => {
        console.log(e.stack);
      });
  }
  */

  /* We iterate through the given map data and create objects accordingly */
  mapData.layers.forEach( layerData => {
    let thisLayer;

    try {
      thisLayer = map.addLayers( layerData.name, 2, false, layerData.coord );
    } catch(e) {
      console.log("Problem:", layerData.type, e.stack);
    }

    layerData.objectGroups.forEach( objectGroup => {
      let spritesheet;
      let spritesheetType = objectGroup.typeImageData;

      if(!spritesheetType) {
        console.log("Error with spritesheetType-data");
        return;
      }

      if(spritesheetType) {
        let spritesheetData = typeData.graphicData[spritesheetType];

        spritesheet = allSpritesheets.addSpritesheet(spritesheetData);
      }

      objectGroup.objects.forEach( object => {
        let objTypeData = typeData.objectData[spritesheetType][object.objType];

        if(!objTypeData) {
          console.debug("Bad mapData for type:", spritesheetType, object.objType, object.name);
          throw new Error("Bad mapData for type:", spritesheetType, object.objType, object.name);
        }

        let currentFrameNumber = objTypeData.image;
        let objData = {
          typeData: objTypeData,
          activeData: object.data
        };
        let newObject = new functionsInObj[objectGroup.type]( object.coord, objData, spritesheet, currentFrameNumber, { radius: 47 } );
        thisLayer.addChild( newObject );
      });
    });
  });

  map.moveMap(mapData.startPoint);

  return map;

/*
  CreateTerrainStage
    _CreateTerrainLayer_base
    _CreateTerrainLayer_terrain
    _CreateTerrainLayer_dither
    _CreateTerrainLayer_prettifier
    _CreateTerrainLayer_resource
  CreateUnitStage
    _CreateUnitLayer_Unit
    _CreateUnitLayer_City
  CreateFOWStage
  CreateDataStage
  CreateUIStage
    _CreateUILayer_arrow
    _CreateUILayer_selection
*/
}