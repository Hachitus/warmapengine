/* global createjs */

'use strict';

/**
 * Map is the main class for constructing 2D map for strategy games
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
 * them or use polyfill)
 */

/* ====== Own module imports ====== */
import { resizeUtils, environmentDetection } from './utils/utils';
import { Map_stage } from './Map_stage';
import { Map_layer } from './Map_layer';
import { map_drag } from "./move/map_drag";
import { map_zoom } from './zoom/map_zoom';
import { eventListeners } from './eventlisteners';
import { ObjectManager } from './ObjectManager';

var _drawMapOnNextTick = false;
var eventlisteners, _stage, _staticLayer, _movableLayer, fullSizer;

export class Map {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map. This will be replaced by PIXI, so don't rely on element
   * identifiers staying the same (like class and ID).
   * @param {Object} options - different options for the map to be given.
   * @return Map instance
   */
  constructor( canvas, { mapSize = { x: 0, y: 0 }, startCoord = { x: 0, y: 0 } } ) {
    if (!canvas) {
      throw new Error(this.constructor.name + " needs canvas!");
    }

    this.canvas = canvas;
    fullSizer = resizeUtils.setToFullSize(this.canvas.getContext("2d"));

    _stage = new Map_stage("mainStage", canvas);
    _staticLayer = new Map_layer("staticLayer");
    _stage.addChild(_staticLayer);
    _movableLayer = new Map_layer("movableLayer", startCoord);
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    /* Activate the map zoom and map drag core plugins */
    this.defaultPlugins = [map_zoom, map_drag];
    this.mapSize = mapSize;
    this.activeTickCB = false;
    /* Define event callback here!
		 * @todo I think this should be organized another way? */
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
    this.setEnvironment(environmentDetection.isMobile() ? "mobile" : "desktop");
    this._mapInMove = false;
    this.objectManager = new ObjectManager(); // Fill this with quadtrees or such
    /* Set the correct timing mode for ticker, as in requestAnimationFrame */
    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    this.canvas.style.position = "absolute";
    this.canvas.style.display = "block";
    /* stop scrollbars of showing */
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    this.canvas.style.left = "0px";
    this.canvas.style.top = "0px";
  }
  /**
   * initialization method
   * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
   * separately passing them to activatePlugins method
   * @param {x: ? y:?} coord - Starting coordinates for the map
   * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
   * during ticks
   * @return the current map instance
   */
  init(plugins = [], coord = { x: 0, y: 0 }, tickCB = undefined, options = { fullsize: true }) {
    if (options.fullsize) {
      this.toggleFullsize();
    }

    if (plugins.length) {
      this.activatePlugins(plugins);
    }

    if (coord) {
      Object.assign(_movableLayer, coord);
    }

    this.drawOnNextTick();
    _defaultTick(this);
    tickCB && this.customTickOn(tickCB);

    return this;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance
   */
  drawOnNextTick() {
    _drawMapOnNextTick = true;

    return this;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance
   */
  getLayersWithAttributes(attribute, value) {
    return _stage.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
  }
  createLayer(name = "", coord = { x: 0, y: 0 } ) {
    var layer = new Map_layer(name, coord);

    return layer;
  }
  /**
   *  All parameters are passed to Map_layer constructor
   * @return created Map_layer instance
   */
  addLayer(layer) {
    _movableLayer.addChild(layer);

    return layer;
  }
  /**
   * @param {Map_layer} layer - the layer object to be removed
   * */
  removeLayer(layer) {
    _movableLayer.removeChild(layer);

    return layer;
  }
  /**
   * @return layer with the passed layer name
   */
  getLayerNamed(name) {
    return _movableLayer.getChildNamed(name);
  }
  /**
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance
   * */
  moveMap(coord = { x: 0, y: 0 }) {
    var realCoordinates = {
      x: coord.x / _staticLayer.getScale(),
      y: coord.y / _staticLayer.getScale()
    };

    _movableLayer.move(realCoordinates);
    this.drawOnNextTick();

    return this;
  }
  /**
   * Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
   * layer on the map and caches the ones that return true from getCacheEnabled-method.
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance
   * */
  cacheMap() {
    if (_movableLayer.getCacheEnabled()) {
      _movableLayer.cache(0, 0, this.mapSize.x, this.mapSize.y);
    } else {
      _movableLayer.children.forEach(child => {
        if (child.getCacheEnabled()) {
          child.cache(0, 0, this.mapSize.x, this.mapSize.y);
        }
      });
    }

    this.drawOnNextTick();

    return this;
  }
  unCacheMap() {
    if (_movableLayer.getCacheEnabled()) {
      _movableLayer.unCache(0, 0, this.mapSize.x, this.mapSize.y);
    } else {
      _movableLayer.children.forEach(child => {
        if (child.getCacheEnabled()) {
          child.unCache(0, 0, this.mapSize.x, this.mapSize.y);
        }
      });
    }

    this.drawOnNextTick();

    return this;
  }

  /**
   * Activate plugins for the map. Plugins need .pluginName property and .init-method
   * @param [Array] pluginsArray - Array that consists of the plugin modules
   */
  activatePlugins(pluginsArray = []) {
    var currentPluginNameForErrors;

    try {
      pluginsArray.forEach(plugin => {
        currentPluginNameForErrors = "undefined";
        if (!plugin || !plugin.pluginName) {
          throw new Error("plugin or plugin.pluginName missing");
        }
        currentPluginNameForErrors = plugin.pluginName;

        if (this.plugins.add(plugin[plugin.pluginName])) {
          plugin[plugin.pluginName].init(this);
        }
      });
    } catch (e) {
      console.log("An error initializing plugin " + currentPluginNameForErrors, e);
    }

    return this;
  }
  /**
   * Custom tick handler that can be given to map. The default tick handler is by default
   * always on and will not be affected
   * @param [Function] tickCB - Callback function to use in tick
   *  */
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
  /**
   * getter and setter for detecting if map is moved and setting the maps status as moved or not moved
   *  */
  mapMoved(yesOrNo) {
    if (yesOrNo !== undefined) {
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
    /**
     * Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
     * the eventlistener callback use this.eventCBs
     */
  toggleFullsize() {
    if (!this.isFullsize) {
      fullSizer();

      window.addEventListener("resize", fullSizer);
      this.isFullsize = true;
    } else {
      window.removeEventListener("resize", fullSizer);
      this.isFullsize = false;
    }

    return this.isFullsize;
  }
    /**
     * Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
     * the eventlistener callback use this.eventCBs
     */
  toggleFullScreen () {
    resizeUtils.toggleFullScreen();
  }
  setEnvironment(env = "desktop" /* or mobile */) {
    this.environment = env;
  }
  /**
   * @return { x: Number, y: Number }, current coordinates for the map
   * */
  getMapPosition() {
    return {
      x: _movableLayer.x,
      y: _movableLayer.y
    };
  }
  getEnvironment() {
    return this.environment;
  }
  getZoomLayer() {
    return _staticLayer;
  }
  getScale() {
    return _staticLayer.getScale();
  }
  getUILayer() {
    return _staticLayer;
  }
  getMovableLayer() {
    return _movableLayer;
  }
  getStage() {
    return _stage;
  }
  getSize() {
    return this.mapSize;
  }
  /*************************************
   ******* APIS THROUGH PLUGINS ********
   ************************************/
  zoomIn() { return "notImplementedYet. Activate with plugin"; }
  zoomOut() { return "notImplementedYet. Activate with plugin"; }
  /**
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   * @param { x: Number, y: Number } coordinates to search from
   * @param { String } type type of the objects to search for
   * */
  addObjectsForSelection(coord = { x: 0, y: 0 }, type, object) { return "notImplementedYet. Activate with plugin"; }
  removeObjectsForSelection(coord = { x: 0, y: 0 }, type, object) { return "notImplementedYet. Activate with plugin"; }
  getObjectsUnderPoint(coord = { x: 0, y: 0 }, type) { return "notImplementedYet. Activate with plugin"; /* Implemented with a plugin */ }
  getObjectsUnderShape(coord = { x: 0, y: 0 }, shape, type) { return "notImplementedYet. Activate with plugin"; /* Can be implemented if needed. We need more sophisticated quadtree for this */ }
}

/** ===== Private functions ===== */
/**
 * This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
 * callback is always set and should not be removed or overruled
 */
function _defaultTick(map) {
  createjs.Ticker.addEventListener("tick", _tickFunc);

  return _tickFunc;

  function _tickFunc() {
    if (_drawMapOnNextTick === true) {
      _drawMap(map);
      _drawMapOnNextTick = false;
    }
  }
}
/**
 * Private function to draw the map
 * */
function _drawMap(map) {
  map.getStage().update();

  return map;
}