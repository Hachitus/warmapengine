'use strict';

/** Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic */

/* ====== Own module imports ====== */
import { Map } from '../map/core/Map';
import { Object_terrain } from '../map/extensions/hexagons/object/Object_terrain_hexa';
import { Object_unit } from '../map/extensions/hexagons/object/Object_unit_hexa';
import { spritesheetList } from '../map/core/spritesheetList';

var allSpritesheets = spritesheetList();
import { UI } from '../map/core/UI';
import { UI_default } from "../map/UIs/default/default.js";
import { eventListeners } from '../map/core/eventlisteners';
import { Quadtree } from '../map/core/utils/Quadtree';

var functionsInObj = {
  Object_terrain,
  Object_unit
};

/* ===== EXPORT ===== */
/**
 * @param {DOMElement Canvas} canvasElement the canvas element for the map
 * @param {Object} gameDataArg gameData. More specific data in data-folders test-datas
 * @param {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
 * More specific data in data-folders test-datas
 * @param {Object} typeDataArg typeData. More specific data in data-folders test-datas.
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

  /* We iterate through the given map data and create objects accordingly */
  mapData.layers.forEach( layerData => {
    let thisLayer, thisQuadTree;

    try {
      thisLayer = map.addLayer( layerData.name, false, layerData.coord );
      thisQuadTree = map.objectSelections[layerData.group] = new Quadtree({
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
      let spritesheet;
      let spritesheetType = objectGroup.typeImageData;

      if(!spritesheetType) {
        console.log("Error with spritesheetType-data");
        return;
      }

      if(spritesheetType) {
        let spritesheetData = typeData.graphicData[spritesheetType];

        spritesheet = allSpritesheets.createSpritesheet(spritesheetData);
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
        let newObject = new functionsInObj[objectGroup.type]( object.coord, objData, spritesheet, currentFrameNumber, { radius: 42 } );
        thisQuadTree.add({
            x: newObject.x,
            y: newObject.y
          },{
            width: newObject.width,
            height: newObject.height
          },
            newObject
        );
        thisLayer.addChild( newObject );
      });
    });
  });

  map.moveMap(mapData.startPoint);

  document.getElementById("testFullscreen").addEventListener("click", function() {
    eventListeners.toggleFullScreen();
  });

  return map;
}