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

const LISTENER_TYPES = {
  "mousemove": "stagemousemove",
  "mouseup": "stagemouseup",
  "mousedown": "stagemousedown"
};

export class Map {
  constructor(canvas, options) {
    if(!canvas) {
      throw new Error(this.constructor.name + " needs canvas!")
    }
    options = options || {};
    this._stage = new Map_stage("daddyStage", canvas);
    this.mommyLayer = new Map_layer("mommyLayer", options.type, options.subContainers, options.startCoord);
    this._stage.addChild(this.mommyLayer);
    this.plugins = [];
    this.mapSize = options.mapSize || { x:0, y:0 };
    this.activeTickCB = false;
    this._fullScreenFunction = null;
    this._eventListeners = _getEmptyEventListenerArray();
  }
  init(tickCB, plugins, coord) {
    if (plugins) {
      this.activatePlugins(plugins);
    }

    if(coord) {
      this.mommyLayer.x = coord.x;
      this.mommyLayer.y = coord.y;
    }

    this.drawMap();
    this.tickOn(tickCB);

    return this;
  }

  drawMap() {
    this._stage.update();

    return this;
  }

  getStage() {
    return this._stage;
  }

  getSize() {
    return this.mapSize;
  }

  setSize(width, height) {
    this.mapSize = { x:width, y:height };

    return this.mapSize;
  }

  addLayers(name, type, subContainers, coord) {
    var layer = new Map_layer(name, type, subContainers, coord);

    this.mommyLayer.addChild(layer);

    return layer;
  }

  removeLayer(layer) {
    this.mommyLayer.removeChild(layer);

    return layer;
  }

  getLayerNamed(name) {
    return this.mommyLayer.getChildNamed(name);
  }
  moveMap(coordinates) {
    this.mommyLayer.move(coordinates);

    this.drawMap();

    return this;
  }

  cacheMap() {
    if(this.mommyLayer.getCacheEnabled()) {
      this.mommyLayer.cache(0, 0, this.mapSize.x, this.mapSize.y);
    } else {
      this.mommyLayer.children.forEach(child => {
        if(child.getCacheEnabled()) {
          child.cache(0, 0, this.mapSize.x, this.mapSize.y);
        }
      });
    }

    return this;
  }

  getObjectsUnderMapPoint(clickCoords) {
    let objects = [];

    this.mommyLayer.getObjectsUnderPoint(clickCoords);

    return objects;
  }

  activateFullSize() {
    this._fullScreenFunction = _setToFullSize.bind(this);
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
  setListener(action, callback) {
    this._eventListeners[action].push(callback);
    this._stage.addEventListener(LISTENER_TYPES[action], callback);

    return this;
  }
  removeAllListeners() {
    var listeners = this._eventListeners;

    Object.keys(listeners).forEach( typeIndex => {
      listeners[typeIndex].forEach(callback => {
        this._stage.off(LISTENER_TYPES[typeIndex], callback);
      });
    });
    listeners = _getEmptyEventListenerArray();

    return this;
  }
  removeListeners(type) {
    var listeners = this._eventListeners;

    if(typeof type === "string" ) {
      listeners[type].forEach(callback => {
        this._stage.off(LISTENER_TYPES[type], callback);
      });
    } else if (type instanceof Array ) {
      type.forEach(thisType => {
        this._eventListeners[thisType].forEach(callback => {
          this._stage.off(LISTENER_TYPES[thisType], callback);
        });
      });
    }

    listeners = [];

    return this;
  }

}

/** ===== Private functions ===== */
/** == Context sensitive, you need to bind, call or apply these == */
function _handleTick() {
  if (this.mommyLayer.drawThisChild === true) {
    this.drawMap();
  }
}

function _setToFullSize() {
  let ctx = this._stage.getContext("2d");

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function _getEmptyEventListenerArray() {
  return {
    mousedown: [],
    mouseup: [],
    mousemove: []
  };
}