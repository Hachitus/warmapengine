/** Map is the main class for constructing 2D map for strategy games
 *
 * Map is instantiated and then initialized with init-method.
 *
 * Plugins can be added with activatePlugins-method by prodiving init(map) method in the plugin. Plugins are always
 * functions, not objects that are instantiated. Plugins are supposed to extend the map object or anything in it via
 * it's public methods.
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. */

'use strict';

/* ====== 3rd party imports ====== */

/* ====== Own module imports ====== */
import { Map_stage } from './Map_stage';
import { Map_layer } from './Map_layer';
import { resizeUtils, resizeUtils } from './utils/utils';
import { map_drag } from "./move/map_drag";
import { map_zoom } from './zoom/map_zoom';
import { eventListeners } from './eventlisteners';

var _drawMapOnNextTick = false;
var eventlisteners;

export class Map {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given.
   * @return Map instance */
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
    this.activatedPlugins = [];
    /* Activate the map zoom and map drag core plugins */
    this.pluginsToActivate = [map_zoom, map_drag];
    this.mapSize = options.mapSize || { x:0, y:0 };
    this.activeTickCB = false;
    this.eventCBs = {
      fullSize: resizeUtils.setToFullSize(canvas.getContext("2d")),
      fullscreen: resizeUtils.toggleFullScreen,
      select: null,
      drag: null,
      zoom: null
    };
    this._fullSizeFunction = null;
    eventlisteners = eventListeners(this.eventCBs);
  }
  /** initialization method
   * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
   * separately passing them to activatePlugins method
   * @param {x: ? y:?} coord - Starting coordinates for the map
   * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
   * during ticks
   * @return the current map instance */
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
  /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance */
  drawOnNextTick() {
    _drawMapOnNextTick = true;

    return this;
  }
  /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance */
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
  /** All parameters are passed to Map_layer constructor
   * @return created Map_layer instance */
  addLayer(name, type, subContainers, coord) {
    var layer = new Map_layer(name, type, subContainers, coord);

    this.mommyLayer.addChild(layer);

    return layer;
  }
  /**
   * @param {Map_layer} layer - the layer object to be removed */
  removeLayer(layer) {
    this.mommyLayer.removeChild(layer);

    return layer;
  }
  /** @return layer with the passed layer name */
  getLayerNamed(name) {
    return this.mommyLayer.getChildNamed(name);
  }
  /**
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance */
  moveMap(coordinates) {
    this.mommyLayer.move(coordinates);
    this.drawOnNextTick();
    this.mapMoved(true);

    return this;
  }
  /** Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
   * layer on the map and caches the ones that return true from getCacheEnabled-method.
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance */
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
  /** iterates through the map layers and returns matching objects on given coordinates
   * @param {x: Number, y: Number} coord - The map coordinate under which we want to retrieve all the objects.
   * @return this map instance */
  getObjectsUnderMapPoint(coord) {
    let objects = [];

    this.mommyLayer.getObjectsUnderPoint(coord);

    return objects;
  }
  /** Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
  the eventlistener callback use this.eventCBs */
  toggleFullSize() {
    eventlisteners.toggleFullSizeListener();
  }
  /** Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
  the eventlistener callback use this.eventCBs */
  toggleFullScreen () {
    eventlisteners.toggleFullScreen();
  }
  /** Activate plugins for the map. Plugins need .pluginName property and .init-method
  @param [Array] pluginsArray - Array that consists of the plugin modules */
  activatePlugins(pluginsArray) {
    var allPlugins = this.pluginsToActivate.concat(pluginsArray);

    allPlugins.forEach(pluginToUse => {
      if(this.activatedPlugins[pluginToUse.pluginName] !== true) {
        this.plugins[pluginToUse.pluginName] = pluginToUse;
        this.plugins[pluginToUse.pluginName].init(this);
        this.activatedPlugins[pluginToUse.pluginName] = true;
        this.pluginsToActivate = [];
      }
    });

    return this;
  }
  /** Custom tick handler that can be given to map. The default tick handler is by default
  always on and will not be affected
  @param [Function] tickCB - Callback function to use in tick */
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
  /* getter and setter for detecting if map is moved and setting the maps status as moved or not moved */
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
/* This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
callback is always set and should not be removed or overruled */
function _defaultTick(map) {
  createjs.Ticker.addEventListener("tick", _tickFunc);

  return _tickFunc;

  function _tickFunc() {
    if(_drawMapOnNextTick === true) {
      _drawMap(map);
      _drawMapOnNextTick = false;
    }
  }
}
/* Private function to draw the map */
function _drawMap(map) {
  map._stage.update();

  return map;
}