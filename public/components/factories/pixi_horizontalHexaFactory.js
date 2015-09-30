/* global PIXI */
'use strict';

/** Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic */

/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol or something missing: http://babeljs.io/docs/usage/polyfill/ */
//require("babel/polyfill");

/* ====== Own module imports ====== */
import { Map } from '../map/core/pixi_Map';
import { Map_layer, Map_spriteLayer } from '/components/map/core/pixi_Map_layer';
import { Object_terrain } from '../map/extensions/hexagons/object/pixi_Object_terrain_hexa';
import { Object_unit } from '../map/extensions/hexagons/object/pixi_Object_unit_hexa';
import { resizeUtils } from '../map/core/utils/utils';
import { UI } from '../map/core/UI';
import { UI_default } from "../map/UIs/default/default.js";
import { eventListeners } from '../map/core/eventlisteners';

/***** CONFIG. Set correct classes to use *****/
var functionsInObj = {
  Object_terrain,
  Object_unit
};
var layers = {
  Map_layer,
  Map_spriteLayer
};

/* ===== EXPORT ===== */
/**
 * @param {DOMElement Canvas} canvasElement the canvas element for the map
 * @param {Object} gameDataArg gameData. More specific data in data-folders test-datas
 * @param {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
 * More specific data in data-folders test-datas
 * @param {Object} typeDataArg typeData. More specific data in data-folders test-datas.
*/

export function createMap(canvasElement, datas) {
  console.log("============================================");
  var mapData = (typeof datas.map === "string") ? JSON.parse(datas.map) : datas.map;
  var typeData = (typeof datas.type === "string") ? JSON.parse(datas.type) : datas.type;
  var gameData = (typeof datas.game === "string") ? JSON.parse(datas.game) : datas.game;
  var windowSize = resizeUtils.getWindowSize();
  var mapOptions = {
    mapSize: gameData.mapSize,
    bounds: {
      width: windowSize.width,
      height: windowSize.height
    },
    renderer: {
      autoResize: true,
      transparent: true,
      antialias: false // TEST. Only should work in chrome atm.?
      //resolution: changincVariable - We might need this later on, when doing mobile optimizations, for different pizel density devices
    }
  };
  var map = new Map(canvasElement, mapOptions ) ;
  var dialog_selection = document.getElementById("selectionDialog");
  var defaultUI = new UI_default(dialog_selection);
  defaultUI.init();

  /* Initialize UI as singleton */
  UI(defaultUI, map);

  /* We iterate through the given map data and create objects accordingly */
  //for(let ia = 0; ia < 100; ia++) {
  mapData.layers.forEach( layerData => {
    var layerGroup = layerData.group;
    var objManager = map.objectManager;
    var thisLayer;

    try {
			thisLayer = new layers[layerData.type](layerData.name, layerData.coord);
			map.addLayer(thisLayer);
      objManager.addLayer(layerGroup, {
        x: 0,
        y: 0,
        width: map.mapSize.x,
        height: map.mapSize.y
      }, {
        objects: 10,
        levels: 6
      });
    } catch(e) {
      console.log("Problem:", layerData.type, e.stack);
    }

    layerData.objectGroups.forEach( objectGroup => {
      let spritesheetType = objectGroup.typeImageData;

      if(!spritesheetType) {
        console.log("Error with spritesheetType-data");
        return;
      }

      objectGroup.objects.forEach( object => {
				var objTypeData, objData, objectOptions, currentFrame, newObject;
				
				objTypeData = typeData.objectData[spritesheetType][object.objType];
				if(!objTypeData) {
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
						layerGroup,
						{
							x: newObject.x,
							y: newObject.y,
							width: newObject.width,
							height: newObject.height
						},
							newObject
					);

					thisLayer.addChild( newObject );
				} catch (e) {
					console.log(e);
				}
      });
    });
  });
  


  map.moveMap(mapData.startPoint);

  document.getElementById("testFullscreen").addEventListener("click", function() {
    eventListeners.toggleFullScreen();
  });

  window.map = map;

  return map;
}