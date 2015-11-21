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
 * */

'use strict';

/* ====== Own module imports ====== */
import { Map_layer } from '/components/map/core/pixi_Map_layer';
import { resizeUtils, environmentDetection } from './utils/utils';
import { eventListeners } from './eventlisteners';
import { ObjectManager } from './ObjectManager';

var _drawMapOnNextTick = false;
var eventlisteners, _staticLayer, _movableLayer, _renderer, boundResizer;

export class Map {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given. Format:
   * { bounds: { width: Number, height: Number}, renderer: {} }
   * @return Map instance
   *
   * @todo, set default values for given and required options
   */
  constructor(canvas = null, props = { mapSize: { x: 0, y: 0 }, startCoord: { x: 0, y: 0 }, bounds: { width: 0, height: 0 }, options: {} }) {
    var { mapSize, startCoord, bounds, options } = props;

    if (!canvas) {
      throw new Error(this.constructor.name + " needs canvas!");
    }

    if (typeof canvas === "string") {
      canvas = document.querySelector(canvas);
    } else {
      canvas = canvas;
    }

    _renderer = PIXI.autoDetectRenderer(bounds.width, bounds.height, options);
    /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
    _renderer.plugins.interaction.destroy();
    canvas.parentElement.replaceChild(_renderer.view, canvas);
    this.canvas = _renderer.view;

    _staticLayer = new Map_layer({ name:"staticLayer", coord: { x: 0, y: 0 }, renderer: _renderer });
    _movableLayer = new Map_layer({ name:"movableLayer", coord: startCoord, movable: true });
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    this.mapSize = mapSize;
    /* Define event callback here!
     * @todo I think this should be organized another way? */
    this.eventCBs = {
      fullSize: boundResizer,
      fullscreen: setFullScreen.bind(this),
      select: null,
      drag: null,
      zoom: null
    };
    this.isFullsize = false;
    this._mapInMove = false;
    let interactionManager = new PIXI.interaction.InteractionManager(_renderer);
    this.objectManager = new ObjectManager(interactionManager); // Fill this with quadtrees or such

    boundResizer = _resizeCanvas.bind(this);

    this.environment = environmentDetection.isMobile() ? "mobile" : "desktop";

    /* needed for fullsize canvas in PIXI */
    _renderer.view.style.position = "absolute";
    _renderer.view.style.display = "block";
    /* stop scrollbars of showing */
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    _renderer.view.style.left = "0px";
    _renderer.view.style.top = "0px";
  }
  /**
   * initialization method
   * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
   * separately passing them to activatePlugins method
   * @param {x: ? y:?} coord - Starting coordinates for the map
   * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
   * during ticks
   * @return the current map instance
   * */
  init(plugins = [], coord = { x: 0, y: 0 }, tickCB = null, options = { fullsize: true }) {
    if (options.fullsize) {
      this.toggleFullsize();
    }

    eventlisteners = eventListeners(this, this.canvas);

    if (plugins.length) {
      this.activatePlugins(plugins);
    }

    if (coord) {
      Object.assign(_movableLayer, coord);
    }

    this.drawOnNextTick();
    _defaultTick(this, PIXI.ticker.shared);
    tickCB && this.customTickOn(tickCB);

    return this;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance
   * */
  drawOnNextTick() {
    _drawMapOnNextTick = true;

    return this;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance
   * */
  getLayersWithAttributes(attribute, value) {
    return _staticLayer.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
  }
  createLayer(name = "", coord = { x: 0, y: 0 }) {
    var layer = new Map_layer(name, coord);

    return layer;
  }
  /**
   * All parameters are passed to Map_layer constructor
   * @return created Map_layer instance
   * */
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
   * */
  getLayerNamed(name) {
    return _movableLayer.getChildNamed(name);
  }
  /**
   * Moves the map the amount of given x and y pixels. Note that this is not the destination coordinate, but the amount
   * of movement that the map should move.
   *
   * Internally it moves the movableLayer, taking into account necessary properties (like scale).
   *
   * @param {x: Number, y: Number} coord      The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return                                  this
   * */
  moveMap(coord = { x: 0, y: 0 }) {
    var realCoordinates = {
      x: coord.x / _staticLayer.getScale(),
      y: coord.y / _staticLayer.getScale()
    };
    _movableLayer.move(realCoordinates);
    this.drawOnNextTick();

    this.mapMoved(true);

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
    _movableLayer.children.forEach(child => {
      if (child.getCacheEnabled()) {
        child.setCache(true);
      }
    });

    return this;
  }
  /**
   * unCache the map.
   * @return this map instance
   * */
  unCacheMap() {
    _movableLayer.children.forEach(child => {
      if (child.getCacheEnabled()) {
        child.setCache(false);
      }
    });

    return this;
  }
  /**
   * Activate plugins for the map. Plugins need .pluginName property and .init-method
   * @param [Array] pluginsArray - Array that consists of the plugin modules
   * */
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
   * getter and setter for detecting if map is moved and setting the maps status as moved or not moved
   * */
  mapMoved(yesOrNo) {
    if (yesOrNo !== undefined) {
      this._mapInMove = yesOrNo;
      return yesOrNo;
    }

    return this._mapInMove;
  }
  setPrototype(property, value) {
    var thisPrototype = Object.getPrototypeOf(this);

    thisPrototype[property] = value;
  }
  /**
   * Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
   * the eventlistener callback use this.eventCBs
   */
  toggleFullsize() {
    if (!this.isFullsize) {
      _setResizeCanvas();
      this.isFullsize = true;
    } else {
      _removeResizeCanvas();
      this.isFullsize = false;
    }

    return this.isFullsize;

    /** ===== PRIVATE ===== */
  }
  /**
   * Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
   * the eventlistener callback use this.eventCBs
   * */
  toggleFullScreen () {
    resizeUtils.toggleFullScreen();
  }
  setEnvironment(env = "desktop") {
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
  getRenderer() {
    return _renderer;
  }
  getStage() {
    return _staticLayer;
  }
  getSize() {
    return this.mapSize;
  }
  getObjectsUnderPoint(globalCoords = { x: 0, y: 0 }, type = undefined) {
    /* Filter objects based on quadtree and then based on possible group provided */
    var objects = {};
    var allCoords = {
      globalCoords: globalCoords,
      localCoords: this.getMovableLayer().toLocal(new PIXI.Point(globalCoords.x, globalCoords.y))
    };

    objects[type] = this.objectManager.retrieve(allCoords, type);

    return objects;
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
   * @param { String } object The object to add
   * */
  addObjectsForSelection() { return "notImplementedYet"; }
  /**
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   * @param { x: Number, y: Number } coordinates to search from
   * @param { String } type type of the objects to search for
   * @param { String } object The object to add
   * */
  removeObjectsForSelection() { return "notImplementedYet"; }
  /**
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   * @param { x: Number, y: Number } coordinates to search from
   * @param { String } shape The shape to match against
   * @param { String } type type of the objects to search for
   * */
  getObjectsUnderShape() { return "notImplementedYet"; /* Can be implemented if needed. We need more sophisticated quadtree for this */ }
}

/** ===== PRIVATE ===== */
/**
 * This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
 * callback is always set and should not be removed or overruled
 */
function _defaultTick(map, ticker) {
  ticker.add(function () {
    if (_drawMapOnNextTick === true) {
      _renderer.render(_staticLayer);
    }
    _drawMapOnNextTick = false;
  });
}

function _resizeCanvas() {
  let windowSize = resizeUtils.getWindowSize();

  _renderer.autoResize = true;
  _renderer.resize(windowSize.x, windowSize.y);
  this.drawOnNextTick();
}
function _setResizeCanvas() {
  window.addEventListener("resize", boundResizer);
  boundResizer();
}
function _removeResizeCanvas() {
  _renderer.autoResize = false;
  window.removeEventListener("resize", boundResizer);
}
function setFullScreen() {
  resizeUtils.toggleFullScreen();
  _resizeCanvas.call(this);
}