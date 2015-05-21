'use strict';

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== Own module imports ====== */
import { Map_stage } from './Map_stage';
import { Map_layer } from './Map_layer';
import { validatorMod } from "./map_validators";

/** ===== Private functions declared ===== */
let privateFunctions = {
    _getStageIndex
};

/** ===== Validators used in this module. Imported from map_validators ===== */
let validators = {
    _is_index: validatorMod.isIndex,
    _is_coordinates: validatorMod.isCoordinates,
    _is_SubContainerAmount: validatorMod.isSubContainerAmount,
    _is_UseOfSubLayers: validatorMod.isUseOfSubLayers,
    _is_UseOfSubContainers: validatorMod.isUseOfSubContainers,
    _is_canvas: validatorMod.isCanvas
};

/** ===== EXPORT ===== */
/*
*/
export class Map {
    constructor(options) {
      this.zoomLevel = 1;
      this.stages = [];
      this.plugins = {};
      this.mapSize = (options && options.mapSize) || { x:0, y:0, width:0, height:0 };
      this.activeTickCB;
    }
    /* options.mapSize = new createjs.Rectangle*/
    init(options) {
      this.mapSize = (options && options.mapSize) || { x:0, y:0, width:0, height:0 };

      return this;
    }
    drawMap() {
      this.stages.forEach(function(stage) {
        if(stage.drawThisChild) {
          stage.update();
          stage.drawThisChild = false;
        }
      });
        return this;
    }
    getSize( ) {
        return this.mapSize;
    }
    setSize(x1, y1, x2, y2) {
      this.mapSize = { x:x1, y:y1, width:x2, height:y2 };

      return this.mapSize;
    }
    getChildNamed(name) {
      for(let stage of this.stages) {
        let child;

        if(stage.name.toLowerCase() === name.toLowerCase()) {
          return stage;
        }

        if(child = stage.getChildNamed(name)) {
          return child;
        }
      }

      return false;
    }
    addStage(stage) {
      let stages = [];

      if(! (stage instanceof Array) ) {
        stages.push(stage);
      }

      this.stages.push(...stages);

      return this;
    }
    replaceStage(newCanvas, oldCanvas) {
      let oldIndex = privateFunctions._getStageIndex(this.stages, oldCanvas);
      this.stages[oldIndex] = newCanvas;

      return this;
    }
    addLayer(layer, stage) {

        return this;
    }
    removeLayer(layer) {
        return this;
    }
    replaceLayer(newLayer, oldLayer) {
        return this;
    }
    toggleLayer(layer) {
        return this;
    }
    getLayerNamed(name) {
      let theLayer;

      for(let stage of this.stages) {
        if(theLayer = stage.getChildNamed(name)) {
          return theLayer;
        }
      }
      return false;
    }
    cacheMap() {
        this.stages.forEach(function(stage) {
            if(stage.cacheEnabled) {
                this.cache(this.mapSize.x, this.mapSize.y);
            }
        });

        return this;
    }
    cacheLayers() {
        return this;
    }
    getObjectsUnderMapPoint() {
        let objects = [];

        this.stages.forEach(function(value, index) {
            objects[index] = value;
        });

        return objects;
    }
    tick() {
      this.stages.forEach(function(stage) {
        if(stage.updateStage === true) {
          stage.update();
        }
      });
    }
    setCanvasesToFullSize(canvases) {
      for( let canvas of this.stages ) {
        let ctx = canvas.getContext( "2d" );

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    }
    /* Activates a given plugin / module for this map instance */
    activatePlugin(plugin) {
      this.plugins[plugin.name] = new plugin(this);
      this.plugins[plugin.name].init();
    }
    startTick(tickCB) {
      if(this.activeTickCB) {
        return false;
      }

      this.activeTickCB = tickCB;
	    createjs.Ticker.addEventListener("tick", this.activeTickCB);

	    return this;
    }
    stopTick() {
      this.activeTickCB = undefined;
	    createjs.Ticker.removeEventListener("tick", this.activeTickCB);

	    return this;
    }
}

/** ===== Private functions ===== */
function _getStageIndex(stages, stageToFind) {
  var foundIndex = stages.indexOf(stageToFind);

  return ( foundIndex === -1 ) ? false : foundIndex;
}