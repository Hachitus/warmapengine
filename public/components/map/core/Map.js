/* global System, Q */

'use strict';

/**
 * Map is the main class for constructing 2D map for strategy games
 *
 * Map is instantiated and then initialized with init-method:
 * var map = new Map(canvasElement, mapOptions );
 * promises = map.init( gameData.pluginsToActivate, mapData.startPoint );
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

/***********************
******** IMPORT ********
***********************/
import { Map_layer } from '/components/map/core/Map_layer';
import { resizeUtils } from '/components/map/core/utils/utils';
import { eventListeners } from '/components/map/core/eventlisteners';
import { ObjectManager } from '/components/map/core/ObjectManager';
import { mapEvents } from '/components/map/core/mapEvents';

/***********************
****** VARIABLES *******
***********************/
var _drawMapOnNextTick = false;
var isMapReadyPromises = [];
var eventlisteners, _staticLayer, _movableLayer, _renderer, boundResizer;

/***********************
********* API **********
***********************/
export class Map {
  /**
   * @param {DOM Canvas element} canvas     Canvas used by the map
   * @param {Object} options                different options for the map to be given. Format:
   *                                        { bounds: { width: Number, height: Number}, renderer: {} }
   * @param {object} subContainers          width: Number. subcontainer width in pixels,
   *                                        height: Number. subcontainer height in pixels,
   *                                        maxDetectionOffset: Number. Amount of offset we detect outside the given area.
   *
   * @return Map instance
   */
  constructor(canvasContainer = null, props = { startCoord: { x: 0, y: 0 }, bounds: { width: 0, height: 0 }, options: { refreshEventListeners: true }, subContainers: false}) {
    var { startCoord, bounds, options, subContainers } = props;

    if (!canvasContainer) {
      throw new Error(this.constructor.name + " needs canvasContainer!");
    }

    if (typeof canvasContainer === "string") {
      canvasContainer = document.querySelector(canvasContainer);
    }

    _renderer = PIXI.autoDetectRenderer(bounds.width, bounds.height, options);
    /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
    _renderer.plugins.interaction.destroy();
    canvasContainer.innerHTML = "";
    canvasContainer.appendChild(_renderer.view, canvasContainer);

    this.canvas = _renderer.view;
    this.plugins = new Set();
    this._mapInMove = false;
    this.subContainersConfig = subContainers;

    /* These are the 2 topmost layers on the map:
     * - staticLayer: Keeps at the same coordinates always and is responsible for holding map scale value and possible
     * objects that do not move with the map.
     * - movableLayer: Moves the map, when the user commands. Can hold e.g. UI objects that move with the map. Like
     * graphics that show which area or object is currently selected. */
    _staticLayer = new Map_layer({ name:"staticLayer", coord: { x: 0, y: 0 }, renderer: _renderer });
    _movableLayer = new Map_layer({ name:"movableLayer", coord: startCoord, movable: true });
    _staticLayer.addChild(_movableLayer);

    /* InteractionManager is responsible for finding what objects are under certain coordinates. E.g. when selecting */
    let interactionManager = new PIXI.interaction.InteractionManager(_renderer);
    this.objectManager = new ObjectManager(interactionManager); // Fill this with quadtrees or such
    eventlisteners = eventListeners(this.canvas, true);

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
   * @param {Array | String} plugins    Plugins to be activated for the map. Normally you should give the plugins here
   * instead of separately passing them to activatePlugins method. You can provide the module strings or module objects.
   * @param {x: ? y:?} coord            Starting coordinates for the map
   * @param {Function} tickCB           callback function for tick. Tick callback is initiated in every frame. So map
   * draws happen during ticks
   * @param {Object} options            Fullsize: Do we set fullsize canvas or not.
   * @return {Array}                    Returns an array of Promises. If this is empty / zero. Then there is nothing to
   * wait for, if it contains promises, you have to wait for them to finish for the plugins to work and map be ready.
   * */
  init(plugins = [], coord = { x: 0, y: 0 }, tickCB = null, options = { fullsize: true }) {
    var allPromises = [];

    options.fullsize && this.toggleFullsize();

    if (plugins.length && typeof plugins[0] === "object") {
      this.activatePlugins(plugins);
    } else if (plugins.length && typeof plugins[0] === "string") {
      plugins.map(plugin => {
        let thisPromise;

        thisPromise = System.import(plugin).then( (plugin) => {
          this.activatePlugin(plugin);
        });

        allPromises.push(thisPromise);
      });
    }

    coord && Object.assign(_movableLayer, coord);

    this.drawOnNextTick();
    _defaultTick(this, PIXI.ticker.shared);
    tickCB && this.customTickOn(tickCB);

    isMapReadyPromises = allPromises;

    return allPromises;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   * @return the current map instance
   * */
  whenReady() {
    return Q.all(isMapReadyPromises);
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
  addLayer(LayerConstructor, layerOptions) {
    var thisLayer;

    if (this.getSubContainerConfigs() && layerOptions.subContainers !== false) {
      layerOptions.subContainers = this.getSubContainerConfigs();
    }

    thisLayer = new LayerConstructor(layerOptions);
    _movableLayer.addChild(thisLayer);

    return thisLayer;
  }
  /**
   * Does the map use subContainers
   */
  usesSubContainers() {
    return this.subContainersConfig ? true : false;
  }
  getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  /**
   * Get the size of area that is shown to the player. Depends a bit if we want to show the maximum possible or current.
   *
   * @param  {Boolean} isLocal       Do we want to use moving layer or static (global) coordinates
   * @return {Object}                x- and y-coordinates and the width and height of the viewport
   */
  getViewportArea(isLocal = false) {
    var layer = isLocal ? this.getMovableLayer() : this.getStaticLayer();

    return {
      x: layer.x,
      y: layer.y,
      width: window.innerWidth,
      height: window.innerHeight
    };
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
    mapEvents.publish("mapMoved", realCoordinates);
    this.drawOnNextTick();

    return this;
  }
  /**
   * Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
   * layer on the map and caches the ones that return true from getCacheEnabled-method.
   *
   * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
   * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
   * @return this map instance
   * */
  cacheMap() {
    _movableLayer.children.forEach(child => {
      child.setCache(child.getCacheEnabled());
    });

    return this;
  }
  /**
   * unCache the map.
   *
   * @return this map instance
   * */
  unCacheMap() {
    _movableLayer.children.forEach(child => {
      child.setCache(false);
    });

    return this;
  }
  /**
   * Activate plugins for the map. Plugins need .pluginName property and .init-method
   *
   * @param [Array] pluginsArray - Array that consists of the plugin modules
   * */
  activatePlugins(pluginsArray = []) {
    pluginsArray.forEach(plugin => {
      this.activatePlugin(plugin);
    });

    return this;
  }
  /**
   * Activate plugins for the map. Plugins need .pluginName property and .init-method
   *
   * @param [String | Object] plugin        String to module or the module object.
   * */
  activatePlugin(plugin) {
    try {
      if (!plugin || !plugin.pluginName) {
        throw new Error("plugin or plugin.pluginName missing");
      }

      if (this.plugins.add(plugin[plugin.pluginName])) {
        plugin[plugin.pluginName].init(this);
      }
    } catch (e) {
      console.log("An error initializing plugin " + plugin ? plugin.pluginName : "no plugin name", e);
    }
  }
  /**
   * getter and setter for detecting if map is moved and setting the maps status as moved or not moved
   * */
  mapMoved(yesOrNo, isFinal) {
    isFinal && mapEvents.publish("mapMovedFinal");

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
    if (!boundResizer) {
      boundResizer = _resizeCanvas.bind(this);
    }

    mapEvents.publish("mapResized");

    return eventlisteners.toggleFullSizeListener(boundResizer);
  }
  /**
   * Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
   * the eventlistener callback use this.eventCBs
   * */
  toggleFullScreen () {
    var eventListenerCB = setFullScreen.bind(this);

    eventlisteners.toggleFullscreen(eventListenerCB);
  }
  getSubcontainersUnderPoint(localCoords) {
    var primaryLayers = this.getMovableLayer().getPrimaryLayers();
    var allMatchingSubcontainers = [];
    var thisLayersSubcontainers;

    primaryLayers.forEach(layer => {
      thisLayersSubcontainers = layer.getSubContainersByCoordinates(localCoords);
      allMatchingSubcontainers = allMatchingSubcontainers.concat(thisLayersSubcontainers);
    });

    return allMatchingSubcontainers;
  }
  /**
   * Filter objects based on quadtree and then based on possible group provided
   *
   * @param  {x: Number, y: Number} globalCoords      The global coordinates on canvas, that is hitTested.
   * @param  {String} type                            Type of the objects / layer to find.
   * @return {Array}                                  Array of object found on the map.
   */
  getObjectsUnderPoint(globalCoords = { x: 0, y: 0, width: 0, height: 0 }, type = undefined) {
    var objects = {};
    var allCoords = {
      globalCoords: globalCoords,
      localCoords: this.getMovableLayer().toLocal(new PIXI.Point(globalCoords.x, globalCoords.y))
    };
    // allCoords.localCoords.width = globalCoords.width;
    // allCoords.localCoords.height = globalCoords.height;

    if (this.usesSubContainers()) {
      let allMatchingSubcontainers = [];
      let thisLayersSubcontainers = [];
      let primaryLayers = this.getMovableLayer().getPrimaryLayers();

      primaryLayers.forEach(layer => {
        thisLayersSubcontainers = layer.getSubContainersByCoordinates(allCoords.localCoords);
        allMatchingSubcontainers = allMatchingSubcontainers.concat(thisLayersSubcontainers);
      });

      if (type) {
        objects[type] = this.objectManager.retrieve(allCoords, type, {
          subcontainers: allMatchingSubcontainers,
          size: {
            width: globalCoords.width,
            height: globalCoords.height
          }
        });
      } else {
        objects = this.objectManager.retrieve(allCoords, type, {
          subcontainers: allMatchingSubcontainers,
          size: {
            width: globalCoords.width,
            height: globalCoords.height
          }
        });
      }
    } else {
      if (type) {
        objects[type] = this.objectManager.retrieve(allCoords, type, {
            quadtree: true,
            size: {
              width: globalCoords.width,
              height: globalCoords.height
            }
          });
      } else {
        objects = this.objectManager.retrieve(allCoords, type, {
          quadtree: true,
          size: {
            width: globalCoords.width,
            height: globalCoords.height
          }
        });
      }
    }

    return objects;
  }
  /**
   * @return { x: Number, y: Number }, current coordinates for the moved map
   * */
  getMapPosition() {
    return {
      x: _movableLayer.x,
      y: _movableLayer.y
    };
  }
  getCanvas() {
    return this.canvas;
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
  getStaticLayer() {
    return _staticLayer;
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

/***********************
******* PRIVATE ********
***********************/
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
/**
 * Resizes the canvas to the current most wide and high element status. Basically canvas size === window size.
 */
function _resizeCanvas() {
  let windowSize = resizeUtils.getWindowSize();

  _renderer.autoResize = true;
  _renderer.resize(windowSize.x, windowSize.y);
  mapEvents.publish("mapResized");
  this.drawOnNextTick();
}
/**
 * Activate the browsers fullScreen mode and expand the canvas to fullsize
 */
function setFullScreen() {
  resizeUtils.toggleFullScreen();
  mapEvents.publish("mapResized");
  _resizeCanvas.call(this);
}