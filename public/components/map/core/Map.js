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
import { toggleFullScreen } from './utils/utils';

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
  "mousemove": {
    element: "canvas",
    event: "mousemove"
  },
  "mouseup": {
    element: "canvas",
    event: "mouseup"
  },
  "mousedown": {
    element: "canvas",
    event: "mousedown"
  },
  "mousewheel": {
    element: "canvas",
    event: "wheel"
  },
  "mouseclick": {
    element: "canvas",
    event: "click"
  },
};

export class Map {
  constructor(canvas, options) {
    if(!canvas) {
      throw new Error(this.constructor.name + " needs canvas!");
    }
    options = options || {};
    this.canvas = canvas;
    this._stage = new Map_stage("daddyStage", canvas);
    this.mommyLayer = new Map_layer("mommyLayer", options.type, options.subContainers, options.startCoord);
    this._stage.addChild(this.mommyLayer);
    this.plugins = [];
    this.mapSize = options.mapSize || { x:0, y:0 };
    this.activeTickCB = false;
    this._fullScreenFunction = null;
    this._eventListeners = _getEmptyEventListenerArray();
    this._drawMapOnNextTick = false;
  }
  init(plugins, coord, tickCB) {
    if (plugins) {
      this.activatePlugins(plugins);
    }

    if(coord) {
      this.mommyLayer.x = coord.x;
      this.mommyLayer.y = coord.y;
    }

    this.drawOnNextTick();
    _defaultTick(this);
    tickCB && this.customTickOn(tickCB);

    return this;
  }

  drawOnNextTick() {
    this._drawMapOnNextTick = true;
  }
  _drawMap() {
    this._stage.update();

    return this;
  }

  getLayersWithAttributes(attribute, value) {
    return this._stage.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
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

    this.drawOnNextTick();

    this.mapMoved(true);

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
  toggleFullScreen () {
    toggleFullScreen();
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

  customTickOn(tickCB) {
    if (this.activeTickCB) {
      throw new Error("there already exists one tick callback. Need to remove it first, before setting up a new one");
    }

    this.activeTickCB = tickCB || function() {};

    createjs.Ticker.addEventListener("tick", this.activeTickCB);

    return this;
  }

  customTickOff() {
    createjs.Ticker.removeEventListener("tick", this.activeTickCB);

    this.activeTickCB = undefined;

    return this;
  }
  setListener(action, callback) {
    /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
    this._eventListeners[action].push(callback);
    this[LISTENER_TYPES[action].element].addEventListener(LISTENER_TYPES[action].event, callback);

    return this;
  }
  removeAllListeners() {
    var listeners = this._eventListeners;

    Object.keys(listeners).forEach( typeIndex => {
      listeners[typeIndex].forEach(callback => {
        this[LISTENER_TYPES[typeIndex].element].removeEventListener(LISTENER_TYPES[typeIndex].event, callback);
      });
    });
    listeners = _getEmptyEventListenerArray();

    return this;
  }
  removeListeners(type, origCallback) {
    var listeners = this._eventListeners;

    if(typeof type === "string" ) {
      if(origCallback) {
        this[LISTENER_TYPES[type].element].removeEventListener(LISTENER_TYPES[type].event, origCallback);
        return;
      }

      throw new Error("no callback specified! - 1");
    } else if (type instanceof Array ) {
      type.forEach(thisType => {
        if(origCallback) {
          this[LISTENER_TYPES[thisType].element].removeEventListener(LISTENER_TYPES[thisType].event, origCallback);
          return;
        }

        throw new Error("no callback specified! - 2");
      });
    }

    listeners = [];

    return this;
  }
  /* getter and setter */
  mapMoved(yesOrNo) {
    if(yesOrNo !== undefined) {
      this.mapInMove = yesOrNo;
      return yesOrNo;
    }

    return this.mapInMove;
  }
  setPrototype(property, value) {
    this.__proto__[property] = value;
  }
}

/** ===== Private functions ===== */
function _setToFullSize() {
  let ctx = this._stage.getContext("2d");

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function _getEmptyEventListenerArray() {
  var objects = {};

  Object.keys(LISTENER_TYPES).forEach(function(type) {
    objects[type] = [];
  });

  return objects;
}
/* This should handle the default drawing of the map, so that map always updates when drawOnNextTick === true */
function _defaultTick(map) {
  createjs.Ticker.addEventListener("tick", _tickFunc);

  return _tickFunc;

  function _tickFunc() {
    if(map._drawMapOnNextTick === true) {
      map._drawMap();
      map._drawMapOnNextTick = false;
    }
  }
}