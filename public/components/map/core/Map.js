/** Map is the main class for constructing 2D map for strategy games
 *
 * Map is instantiated and then initialized with init-method.
 *
 * Plugins can be added with activatePlugins-method by prodiving init(map) method in the plugin. Plugins are always
 * functions, not objects that are instantiated. Plugins are supposed to extend the map object or anything in it via
 * it's public methods.
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work.
 *
 * @require Plugins that use eventlistener by default, use pointer events polyfill, such as: https://github.com/jquery/PEP
 * Plugins and eventlistener can be overriden, but they user pointer events by default (either the browser must support
 * them or use polyfill) */

'use strict';

/* ====== Own module imports ====== */
import { Map_stage } from './Map_stage';
import { Map_layer } from './Map_layer';
import { resizeUtils, resizeUtils, environmentDetection } from './utils/utils';
import { map_drag } from "./move/map_drag";
import { map_zoom } from './zoom/map_zoom';
import { eventListeners } from './eventlisteners';

var _drawMapOnNextTick = false;
var eventlisteners, _stage, _staticLayer, _movableLayer;

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
    _stage = new Map_stage("mainStage", canvas);
    _staticLayer = new Map_layer("staticLayer", options.subContainers, options.startCoord);
    _stage.addChild(_staticLayer);
    _movableLayer = new Map_layer("movableLayer", options.subContainers, options.startCoord);
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    /* Activate the map zoom and map drag core plugins */
    this.defaultPlugins = [map_zoom, map_drag];
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
    eventlisteners = eventListeners(this, canvas);
    this.environment = "desktop";
    this.mapEnvironment(environmentDetection.isMobile() && "mobile");
    this._mapInMove = false;
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
      _movableLayer.x = coord.x;
      _movableLayer.y = coord.y;
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
    return _stage.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
  }

  getStage() {
    return _stage;
  }

  getSize() {
    return this.mapSize;
  }
  /** All parameters are passed to Map_layer constructor
   * @return created Map_layer instance */
  addLayer(name, subContainers, coord) {
    var layer = new Map_layer(name, subContainers, coord);

    _movableLayer.addChild(layer);

    return layer;
  }
  /**
   * @param {Map_layer} layer - the layer object to be removed */
  removeLayer(layer) {
    _movableLayer.removeChild(layer);

    return layer;
  }
  /** @return layer with the passed layer name */
  getLayerNamed(name) {
    return _movableLayer.getChildNamed(name);
  }
  /**
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance */
  moveMap(coordinates) {
    var realCoordinates = {
      x: coordinates.x / _staticLayer.getScale(),
      y: coordinates.y / _staticLayer.getScale()
    };
    _movableLayer.move(realCoordinates);
    this.drawOnNextTick();

    return this;
  }
  /** Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
   * layer on the map and caches the ones that return true from getCacheEnabled-method.
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance */
  cacheMap() {
    if(_movableLayer.getCacheEnabled()) {
      _movableLayer.cache(0, 0, this.mapSize.x, this.mapSize.y);
    } else {
      _movableLayer.children.forEach(child => {
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

    _movableLayer.getObjectsUnderPoint(coord);

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
  activatePlugins(pluginsArray = []) {
    pluginsArray.forEach(plugin => {
      if(this.plugins.add(plugin)) {
        plugin.init(this);
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
  /** getter and setter for detecting if map is moved and setting the maps status as moved or not moved */
  mapMoved(yesOrNo) {
    if(yesOrNo !== undefined) {
      this._mapInMove = yesOrNo;
      return yesOrNo;
    }

    return this._mapInMove;
  }
  setPrototype(property, value) {
    //this.setPrototypeOf(property, value);
    //this[property] = value;
    //this.prototype[property] = value;
    Map.prototype[property] = value;
  }
  /** getter and setter for marking environment as mobile or desktop */
  mapEnvironment(env) {
    if(env !== undefined) {
      this.environment = env;
      return env;
    }

    return this.environment;
  }
  /** @return { x: Number, y: Number }, current coordinates for the map */
  getMapPosition() {
    return {
      x: _movableLayer.x,
      y: _movableLayer.y
    };
  }
  getZoomLayers() {
    return [_staticLayer];
  }
  getScale() {
    return _staticLayer.getScale();
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
  map.getStage().update();

  return map;
}