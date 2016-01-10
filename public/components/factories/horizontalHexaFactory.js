/* global PIXI */

'use strict';

/**
 * Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @requires Some polyfills are needed and added for IE11 ( http://babeljs.io/docs/usage/polyfill/ ). These are found
 * in utils
 * @requires PIXI in global space
 **/

/***********************
******* IMPORTS ********
***********************/
import { Map, UI, utils } from "/components/bundles/coreBundle";
import { Object_terrain, Object_unit } from "/components/map/extensions/hexagons/Objects";
import { UI_default } from "/components/map/UIs/default/default.js";

/***********************
****** VARIABLES *******
***********************/
const functionsInObj = {
  Object_terrain,
  Object_unit
};

/***********************
********* API **********
***********************/
export { createMap as createMap };

/***********************
******* PUBLIC *********
***********************/
/**
 * This constructs a whole horizontally aligned hexagonal map
 *
 * @class horizontalHexaFactory
 * @memberOf Map.factories
 * @param {Object} canvasContainerElement       HTML Element. Container which will hold the generated canvas element
 * @param {Object} datas                        Object with mapDatas to construct the map structure
 * @param {Object} datas.map                    Holds all the stage, layer and object data needed to construct a full map
 * @param {Object} datas.game                   More general game data (like turn number, map size etc.)
 * @param {Object} datas.type                   Type data such as different unit types and their graphics (tank, soldier etc.)
 * @param {Object} options                      Optional options
 * @param {Function} options.trackFPSCB         Callback to track FPS
 **/
function createMap(canvasContainerElement, datas, options = { trackFPSCB: false }) {
  console.log("============== Horizontal hexagonal Map factory started =============");
  const pixelRatio = utils.environmentDetection.getPixelRatio();
  const DATA_MAP = (typeof datas.map === "string") ? JSON.parse(datas.map) : datas.map;
  const DATA_TYPE = (typeof datas.type === "string") ? JSON.parse(datas.type) : datas.type;
  const DATA_GAME = (typeof datas.game === "string") ? JSON.parse(datas.game) : datas.game;
  const WINDOW_SIZE = utils.resize.getWindowSize();
  const MAP_SIZE = DATA_GAME.mapSize;
  const mapOptions = {
    refreshEventListeners: true
  };
  var mapProperties = {
    bounds: {
      x: 0,
      y: 0,
      width: WINDOW_SIZE.x,
      height: WINDOW_SIZE.y
    },
    rendererOptions: {
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
  var map, dialog_selection, defaultUI;

  map = new Map(canvasContainerElement, mapProperties, mapOptions );
  dialog_selection = document.getElementById("selectionDialog");
  defaultUI = new UI_default(dialog_selection, map);

  /* Initialize UI as singleton */
  UI(defaultUI, map);

  DATA_MAP.layers.forEach( layerData => {
    if (typeof layerData !== "object") {
      console.log("Problem in horizontalHexaFactory, with layerData:", layerData);
      throw new Error("Problem in horizontalHexaFactory, with layerData:", layerData);
    }

    var layerGroup = layerData.group;
    var objManager = map.objectManager;
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
      thisLayer = map.addLayer(layerOptions);
      objManager.addLayer(layerGroup, {
          x: 0,
          y: 0,
          width: +MAP_SIZE.x,
          height: +MAP_SIZE.y
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

          try {
            objTypeData = DATA_TYPE.objectData[spritesheetType][object.objType];
            if (!objTypeData) {
              console.debug("Bad mapData for type:", spritesheetType, object.objType, object.name);
              throw new Error("Bad mapData for type:", spritesheetType, object.objType, object.name);
            }

            objData = {
              typeData: objTypeData,
              activeData: object.data
            };
            currentFrame = PIXI.utils.TextureCache[objTypeData.image];
            objectOptions = {
              currentFrame,
              radius: DATA_GAME.hexagonRadius
            };

            newObject = new functionsInObj[objectGroup.type]( object.coord, objData, objectOptions );

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

  map.moveMap(DATA_MAP.startPoint);

  return map;
}