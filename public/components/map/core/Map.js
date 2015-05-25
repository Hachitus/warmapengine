'use strict';

/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== 3rd party imports ====== */
//var System = require('es6-module-loader').System;
//import { System } from 'es6-module-loader';

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

/**
 * @param {object} options
 * {
 *  mapSize: {
 *    x: Number,
 *    y: Number
 * }
*/
export class Map {
  constructor(options) {
    this.stages = [];
    this.plugins = [];
    this.mapSize = (options && options.mapSize) || { x:0, y:0, width:0, height:0 };
    this.activeTickCB = false;
  }
  /* options.mapSize = new createjs.Rectangle*/
  init(plugins) {
    if(plugins) {
      this.activatePlugins(plugins);
    }
    this.drawMap();
    this.tickOn();


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
  activateFullSize() {
    window.addEventListener("resize", _setStagesToFullSize.bind(this));
  }
  deactivateFullSize() {
    window.removeEventListener("resize", this._setStagesToFullSize.bind(this));
  }
  /* Activate plugins for the map. Must be in array format:
  [{
    name: function name,
    args: [
      First argument,
      second argument,
      ...
    ]

    Parameter pluginToUse.func.name is part of ES6 standard to get function name.
  }] */
  activatePlugins(pluginsArray) {
    pluginsArray.forEach(function(pluginToUse) {
      this.plugins[pluginToUse.func.name] = new pluginToUse.func(...pluginToUse.args);
      this.plugins[pluginToUse.func.name].init();
    });
  }
  tickOn(tickCB) {
    if(this.activeTickCB) {
      throw new Error("there already exists one tick callback. Need to remove it first, before setting up a new one");
    }

    this.activeTickCB = tickCB || _handleTick.bind(this);

    createjs.Ticker.addEventListener("tick", this.activeTickCB);

    return this;
  }
  tickOff() {
    createjs.Ticker.removeEventListener("tick", this.activeTickCB);

    this.activeTickCB = undefined;

    return this;
  }
}

/** ===== Private functions ===== */
function _getStageIndex(stages, stageToFind) {
  var foundIndex = stages.indexOf(stageToFind);

  return ( foundIndex === -1 ) ? false : foundIndex;
}
/** == Context sensitive, you need to bind, call or apply these == */
function _handleTick() {
  this.stages.forEach(function(stage) {
    if(stage.updateStage === true) {
      stage.update();
    }
  });
}
function _setStagesToFullSize() {
  for( let canvas of this.stages ) {
    let ctx = canvas.getContext( "2d" );

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}