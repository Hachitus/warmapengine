/* global PIXI */

'use strict';

/**
 * Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 *
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic
 * */

/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol or something missing: http://babeljs.io/docs/usage/polyfill/ */

/***********************
******* IMPORTS ********
***********************/
import { Map } from "/components/map/core/Map";
import { Map_layer, Map_spriteLayer, Map_bigSpriteLayer } from "/components/map/core/Map_layer";
import { Object_terrain } from "/components/map/extensions/hexagons/object/Object_terrain_hexa";
import { Object_unit } from "/components/map/extensions/hexagons/object/Object_unit_hexa";
import { resizeUtils, environmentDetection } from "/components/map/core/utils/utils";
import { UI } from "/components/map/core/UI";
import { UI_default } from "/components/map/UIs/default/default.js";
import { managingTileMapMovement } from "/components/map/extensions/dynamicMaps/managingTileMapMovement/managingGeneral.js";

/***********************
****** VARIABLES *******
***********************/
var functionsInObj = {
  Object_terrain,
  Object_unit
};
var layers = {
  Map_layer,
  Map_spriteLayer,
  Map_bigSpriteLayer
};

/***********************
********* API **********
***********************/
export var createMap = createMap;

/***********************
******* PUBLIC *********
***********************/
/**
 * @param {DOMElement Canvas} canvasElement the canvas element for the map
 * @param {Object} datas      Object with mapDatas: { map, type, game }
 *                            map: Holds all the stage, layer and object data needed to construct a full map
 *                            game: More general game data (like turn number, map size etc.)
 *                            type: Type data such as different unit types and their graphics (tank, soldier etc.)
*/
function createMap(canvasContainerElement, datas, options = { trackFPSCB: false }) {
  console.log("============== Map factory started =============");
  var mapData = (typeof datas.map === "string") ? JSON.parse(datas.map) : datas.map;
  var typeData = (typeof datas.type === "string") ? JSON.parse(datas.type) : datas.type;
  var gameData = (typeof datas.game === "string") ? JSON.parse(datas.game) : datas.game;
  var windowSize = resizeUtils.getWindowSize();
  var pixelRatio = environmentDetection.getPixelRatio();
  var mapSize = gameData.mapSize;

  var mapProperties = {
    bounds: {
      x: 0,
      y: 0,
      width: windowSize.x,
      height: windowSize.y
    },
    options: {
      resolution: pixelRatio, // We might need this later on, when doing mobile optimizations, for different pizel density devices
      autoResize: true,
      transparent: true,
      antialias: false // TEST. Only should work in chrome atm.?
    },
    subContainers: {
      width: 500,
      height: 500,
      maxDetectionOffset: 100,
      isHiddenByDefault: true
    },
    trackFPSCB: options.trackFPSCB
  };
  var mapOptions = {
    refreshEventListeners: true
  };

  var map = new Map(canvasContainerElement, mapProperties, mapOptions ) ;
  var dialog_selection = document.getElementById("selectionDialog");
  var defaultUI = new UI_default(dialog_selection, map);

  /* Initialize UI as singleton */
  UI(defaultUI, map);
  /* We iterate through the given map data and create objects accordingly */
  //for(let ia = 0; ia < 100; ia++) {
  mapData.layers.forEach( layerData => {
    if (typeof layerData !== "object") {
      console.log("Problem in horizontalHexaFactory, with layerData:", layerData);
      throw new Error("Problem in horizontalHexaFactory, with layerData:", layerData);
    }

    var layerGroup = layerData.group;
    var objManager = map.objectManager;
    var LayerConstructor = layers[layerData.type];
    var renderer = map.getRenderer();
    var layerOptions = {
      name: layerData.name,
      coord: layerData.coord,
      drawOutsideViewport: {
        x: renderer.width,
        y: renderer.height
      }
    };
    var thisLayer;

    try {
      thisLayer = map.addLayer(LayerConstructor, layerOptions);
      objManager.addLayer(layerGroup, {
          x: 0,
          y: 0,
          width: +mapSize.x,
          height: +mapSize.y
        }, {
          objects: 10,
          levels: 6
        });

      layerData.objectGroups.forEach( objectGroup => {
        let spritesheetType = objectGroup.typeImageData;

        if (!spritesheetType) {
          console.log("Error with spritesheetType-data");
          return;
        }

        objectGroup.objects.forEach( object => {
          var objTypeData, objData, objectOptions, currentFrame, newObject;

          objTypeData = typeData.objectData[spritesheetType][object.objType];
          if (!objTypeData) {
            console.debug("Bad mapData for type:", spritesheetType, object.objType, object.name);
            throw new Error("Bad mapData for type:", spritesheetType, object.objType, object.name);
          }

          try {
            objData = {
              typeData: objTypeData,
              activeData: object.data
            };
            currentFrame = PIXI.utils.TextureCache[objTypeData.image];
            objectOptions = {
              currentFrame,
              radius: gameData.hexagonRadius
            };

            newObject = new functionsInObj[objectGroup.type]( object.coord, objData, objectOptions );

            objManager.addObject(
              layerGroup, {
                x: newObject.x,
                y: newObject.y,
                width: newObject.width,
                height: newObject.height
              },
                newObject
            );

            thisLayer.addChild(newObject);
          } catch (e) {
            console.log(e);
          }
        });
      });
    } catch (e) {
      console.log("Problem:", layerData.type, e.stack);
    }
  });

  managingTileMapMovement.addAll(map);
  managingTileMapMovement.startEventListeners(map);
  map.moveMap(mapData.startPoint);

  return map;
}