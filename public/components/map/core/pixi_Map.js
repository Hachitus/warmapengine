/* global PIXI */

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
import { Map_layer } from '/components/map/core/pixi_Map_layer';
import { resizeUtils, environmentDetection } from './utils/utils';
import { eventListeners } from './eventlisteners';
import { ObjectManager } from './ObjectManager';

var _drawMapOnNextTick = false;
var eventlisteners, _staticLayer, _movableLayer, _renderer;

export class Map {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given. Format:
   * { bounds: { width: Number, height: Number}, renderer: {} }
   * @return Map instance

   @todo, set default values for given and required options */
  constructor(canvas, { mapSize = { x: 0, y: 0 }, startCoord = { x: 0, y: 0 }, bounds = { width: 0, height: 0 }, options = {} }) {		
    if(!canvas) {
      throw new Error(this.constructor.name + " needs canvas!");
    }
		
    if(typeof canvas === "string") {
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
      fullSize: function() {
        let windowSize = resizeUtils.getWindowSize();
        //_renderer.autoResize = true;
        _renderer.view.style.width = windowSize.x + "px";
        _renderer.view.style.height = windowSize.y + "px";
        _renderer.resize(windowSize.x, windowSize.y);
        setFullsizedMap();
      },
      fullscreen: resizeUtils.toggleFullScreen,
      select: null,
      drag: null,
      zoom: null
    };
    this.isFullsize = false;
    this._mapInMove = false;
		let interactionManager = new PIXI.interaction.InteractionManager(_renderer);
    this.objectManager = new ObjectManager(interactionManager); // Fill this with quadtrees or such

    this.environment = environmentDetection.isMobile() ? "mobile" : "desktop";
  }
  /** initialization method
   * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
   * separately passing them to activatePlugins method
   * @param {x: ? y:?} coord - Starting coordinates for the map
   * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
   * during ticks
   * @return the current map instance */
  init(plugins = [], coord = { x: 0, y: 0 }, tickCB) {
    this.toggleFullsize();

    eventlisteners = eventListeners(this, this.canvas);

    if (plugins.length) {
      this.activatePlugins(plugins);
    }

    if(coord) {
			Object.assign(_movableLayer, coord);
    }

    this.drawOnNextTick();
    _defaultTick(this, PIXI.ticker.shared);
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
    return _staticLayer.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
  }
  createLayer(name = "", coord = { x: 0, y: 0 }) {
    var layer = new Map_layer(name, coord);

    return layer;
  }
  /** All parameters are passed to Map_layer constructor
   * @return created Map_layer instance */
  addLayer(layer) {
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
  moveMap(coord = { x: 0, y: 0 }) {
    var realCoordinates = {
      x: coord.x / _staticLayer.getScale(),
      y: coord.y / _staticLayer.getScale()
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
    _movableLayer.children.forEach(child => {
      if(child.getCacheEnabled()) {
        child.setCache();
      }
    });

    return this;
  }
  /** Activate plugins for the map. Plugins need .pluginName property and .init-method
  @param [Array] pluginsArray - Array that consists of the plugin modules */
  activatePlugins(pluginsArray = []) {
    var currentPluginNameForErrors;

    try {
      pluginsArray.forEach(plugin => {
				currentPluginNameForErrors = "undefined";
        if(!plugin || !plugin.pluginName) {
          throw new Error("plugin or plugin.pluginName missing");
        }
        currentPluginNameForErrors = plugin.pluginName;

        if(this.plugins.add(plugin[plugin.pluginName])) {
          plugin[plugin.pluginName].init(this);
        }
      });
    } catch(e) {
      console.log("An error initializing plugin " + currentPluginNameForErrors, e);
    }

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
  /** Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
  the eventlistener callback use this.eventCBs */
  toggleFullsize() {
    if(!this.isFullsize) {
      var ctx = this.canvas.context;

      this.eventCBs.fullSize();

      window.addEventListener("resize", setupResizeCB(map));
      setFullsizedMap();
    } else {
      window.removeEventListener("resize", setupResizeCB(map));
      unSetFullsizedMap();
    }

    return this.isFullsize = !this.isFullsize;

    /** ===== PRIVATE ===== */
    function setupResizeCB(map) {
      map;

      return function resizeCB() {
        map.eventCBs.fullSize();
      }
    }
  }
    /** Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
  the eventlistener callback use this.eventCBs */
  toggleFullScreen () {
    resizeUtils.toggleFullScreen();
  }
  setEnvironment(env = "desktop") {
    this.environment = env;
  }
  /** @return { x: Number, y: Number }, current coordinates for the map */
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
  /*************************************
   ******* APIS THROUGH PLUGINS ********
   ************************************/
  zoomIn() { return "notImplementedYet. Activate with plugin"; }
  zoomOut() { return "notImplementedYet. Activate with plugin"; }
  /** Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   * @param { x: Number, y: Number } coordinates to search from
   * @param { String } type type of the objects to search for */
  addObjectsForSelection(coord = { x: 0, y: 0 }, type, object) { return "notImplementedYet"; }
  removeObjectsForSelection(coord = { x: 0, y: 0 }, type, object) { return "notImplementedYet"; }
  getObjectsUnderPoint(coord = { x: 0, y: 0 }, type) { return "notImplementedYet"; /* Implemented with a plugin */ }
  getObjectsUnderShape(coord = { x: 0, y: 0 }, shape, type) { return "notImplementedYet"; /* Can be implemented if needed. We need more sophisticated quadtree for this */ }
}

/** ===== Private functions ===== */
/* This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
callback is always set and should not be removed or overruled */
function _defaultTick(map, ticker) {
  ticker.add(function (time) {
    if(_drawMapOnNextTick === true) {
      _renderer.render(_staticLayer);
    }
    _drawMapOnNextTick = false;
  });
}

function setFullsizedMap() {
  _renderer.view.style.position = "absolute";
  _renderer.view.style.display = "block";
  _renderer.autoResize = true;
  _renderer.resize(window.innerWidth, window.innerHeight);
}
function unSetFullsizedMap() {
  _renderer.autoResize = false;
}