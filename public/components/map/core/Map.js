/**
Map is the main class for constructing 2D map for strategy games

@require createjs framework in global namespace
@require canvas HTML5-element to work. This is more for node.js
*/

/* ====== 3rd party imports ====== */

//var System = require('es6-module-loader').System;
//import { System } from 'es6-module-loader';

/* ====== Own module imports ====== */

'use strict';

/** ===== EXPORT ===== */

/**
 * @param {object} options
 * {
 *  mapSize: {
 *    x: Number,
 *    y: Number
 * }
 *
 * Plugins are provided in an array of plugin functions
*/

export class Map {
  constructor(options) {
    this.stages = [];
    this.plugins = [];
    this.mapSize = (options && options.mapSize) || { x:0, y:0 };
    this.activeTickCB = false;
    this._fullScreenFunction = null;
  }
  /* options.mapSize = new createjs.Rectangle*/
  init(tickCB, plugins, coord) {
    if (plugins) {
      this.activatePlugins(plugins);
    }

    this.stages.forEach(stage => {
      stage.x = coord.x;
      stage.y = coord.y;
    });

    this.drawMap();
    this.tickOn(tickCB);

    return this;
  }

  drawMap() {
    this.stages.forEach(function(stage) {
      if (stage.drawThisChild) {
        stage.update();
        stage.drawThisChild = false;
      }
    });

    return this;
  }

  getSize() {
    return this.mapSize;
  }

  setSize(width, height) {
    this.mapSize = { x:width, y:height };

    return this.mapSize;
  }

  getChildNamed(name) {
    for (let stage of this.stages) {
      let child;

      if (stage.name.toLowerCase() === name.toLowerCase()) {
        return stage;
      }

      if (child = stage.getChildNamed(name)) {
        return child;
      }
    }

    return false;
  }

  addStage(stage) {
    let stages = [];

    if (!(stage instanceof Array)) {
      stages.push(stage);
    }

    this.stages.push(...stages);

    return this;
  }

  replaceStage(newCanvas, oldCanvas) {
    let oldIndex = _getStageIndex(this.stages, oldCanvas);
    this.stages[oldIndex] = newCanvas;

    return this;
  }

  getLayerNamed(name) {
    let theLayer;

    for (let stage of this.stages) {
      if (theLayer = stage.getChildNamed(name)) {
        return theLayer;
      }
    }

    return false;
  }

  cacheMap() {
    this.stages.forEach(function(stage) {
      if (stage.getCacheEnabled()) {
        this.cache(0, 0, this.mapSize.x, this.mapSize.y);
      } else {
        stage.children.forEach(function(layer) {
            if (layer.getCacheEnabled()) {
              this.cache(0, 0, this.mapSize.x, this.mapSize.y);
            }
          });
      }
    });

    return this;
  }

  getObjectsUnderMapPoint(clickCoords) {
    let objects = [];

    this.stages.forEach(function(stage) {
      objects[stage.name] = objects[stage.name] || [];
      objects[stage.name].push(stage.getObjectsUnderPoint(clickCoords));
    });

    return objects;
  }

  activateFullSize() {
    this._fullScreenFunction = _setStagesToFullSize.bind(this);
    window.addEventListener("resize", this._fullScreenFunction);
  }

  deactivateFullSize() {
    window.removeEventListener("resize", this._fullScreenFunction);
  }
  /* Activate plugins for the map. Must be in array format:
  [{
    name: function name,
    args: [
      First argument,
      second argument,
      ...
    ]
  }] */

  activatePlugins(pluginsArray) {
    pluginsArray.forEach(pluginToUse => {
      this.plugins[pluginToUse.pluginName] = pluginToUse;
      this.plugins[pluginToUse.pluginName].init(this);
    });
  }

  tickOn(tickCB) {
    if (this.activeTickCB) {
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

  return (foundIndex === -1) ? false : foundIndex;
}
/** == Context sensitive, you need to bind, call or apply these == */
function _handleTick() {
  this.stages.forEach(function(stage) {
    if (stage.updateStage === true) {
      stage.update();
    }
  });
}

function _setStagesToFullSize() {
  for (let canvas of this.stages) {
    let ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}
