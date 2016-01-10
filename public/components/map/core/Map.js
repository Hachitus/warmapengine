/* global System, Q */
'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import { Map_layer, Map_parentLayer, eventListeners, ObjectManager, mapEvents, utils } from '/components/bundles/coreBundle';
import * as Q from '/assets/lib/q/q';

/*---------------------
------ VARIABLES ------
----------------------*/
var _drawMapOnNextTick = false;
var isMapReadyPromises = [];
var eventlisteners, _staticLayer, _movableLayer, _renderer, boundResizer, ParentLayerConstructor;

/*---------------------
--------- API ---------
----------------------*/
export class Map {
  /**
   * Main class for the whole engine, which initializes the whole structure and plugins
   *
   * You use the class by instantiating it with new and then initialize with init-method:
   *     var map = new Map(canvasElement, mapOptions );
   *     promises = map.init( gameData.pluginsToActivate, mapData.startPoint );
   *
   * Plugins can be added with activatePlugins-method by prodiving init(map) method in the plugin. Plugins are always
   * functions, not objects that are instantiated. Plugins are supposed to extend the map object or anything in it via
   * it's public methods.
   *
   * @class core.Map
   * @constructor
   * @requires PIXI.JS framework in global namespace
   * @requires Canvas (webGL support recommended) HTML5-element supported.
   * @requires Hammer for touch events
   * @requires Hamster for mouse scroll events
   *
   * @param {HTMLElement} canvasContainer                 HTML element which will be container for the created canvas element
   * @param {Object} props                                Extra properties
   * @param {Object} props.startCoord                     Coordinates where the map starts at
   * @param {Integer} props.startCoord.x                  X coordinate
   * @param {Integer} props.startCoord.y                  Y coordinate
   * @param {Object} props.bounds                         Bounds of the map / mapSize
   * @param {Integer} props.bounds.width                  Bound width
   * @param {Integer} props.bounds.height                 Bound height
   * @param {Object} props.rendererOptions                Renderer options passed to PIXI.autoDetectRenderer
   * @param {Object} props.subContainers                  Subcontainers size in pixels. If given, will activate subcontainers. If not given or false, subcontainers are not used.area.
   * @param {Integer} props.subContainers.width           Subcontainer width
   * @param {Integer} props.subContainers.height          Subcontainer height
   * @param {FPSCallback} trackFPSCB                      Callback function for tracking FPS in renderer. So this is used for debugging and optimizing.
   *
   * @return {Map}                                            new Map instance
   */
  constructor(canvasContainer = null,
      props = {
        startCoord: { x: 0, y: 0 },
        bounds: { width: 0, height: 0 },
        rendererOptions: { refreshEventListeners: true },
        subContainers: false,
        trackFPSCB: false }) {
    var { startCoord, bounds, rendererOptions, subContainers, trackFPSCB } = props;

    if (!canvasContainer) {
      throw new Error(this.constructor.name + " needs canvasContainer!");
    }

    if (typeof canvasContainer === "string") {
      canvasContainer = document.querySelector(canvasContainer);
    }

    _renderer = PIXI.autoDetectRenderer(bounds.width, bounds.height, rendererOptions);
    /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
    _renderer.plugins.interaction.destroy();
    canvasContainer.innerHTML = "";
    canvasContainer.appendChild(_renderer.view, canvasContainer);
    let interactionManager = new PIXI.interaction.InteractionManager(_renderer);

    /* This defines which class we use to generate layer on the map. Under movableLayer */
    ParentLayerConstructor = subContainers ? Map_parentLayer : Map_layer;

    /* These are the 2 topmost layers on the map:
     * - staticLayer: Keeps at the same coordinates always and is responsible for holding map scale value and possible
     * objects that do not move with the map.
     * - movableLayer: Moves the map, when the user commands. Can hold e.g. UI objects that move with the map. Like
     * graphics that show which area or object is currently selected. */
    _staticLayer = new Map_layer({ name:"staticLayer", coord: { x: 0, y: 0 } });
    _movableLayer = new Map_layer({ name:"movableLayer", coord: startCoord });
    _staticLayer.addChild(_movableLayer);

    /* InteractionManager is responsible for finding what objects are under certain coordinates. E.g. when selecting */
    eventlisteners = eventListeners(this.canvas, true);

    /* needed for fullsize canvas in PIXI */
    _renderer.view.style.position = "absolute";
    _renderer.view.style.display = "block";
    /* stop scrollbars of showing */
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    _renderer.view.style.left = "0px";
    _renderer.view.style.top = "0px";

    /**
     * canvas element that was generated and is being used by this new generated Map instance.
     *
     * @attribute canvas
     * @type {HTMLElement}
     */
    this.canvas = _renderer.view;
    /**
     * list of plugins that the map uses and are initialized
     * @see class/core/Map.js~Map.html#instance-method-activatePlugins
     *
     * @attribute plugins
     * @type {Set}
     */
    this.plugins = new Set();
    /**
     * Subcontainers size that we want to generate, when layers use subcontainers
     *
     * @attribute subContainersConfig
     * @type {{width: Integer, height: Int}}
     */
    this.subContainersConfig = subContainers;
    /**
     * Callback function that gets the current FPS on the map and shows it in DOM
     *
     * @attribute trackFPSCB
     * @type {Function}
     */
    this.trackFPSCB = trackFPSCB;
    /**
     * ObjectManager instance. Responsible for retrieving the objects from the map, on desired occasions. Like when the player clicks the map to select some object.
     *
     * @attribute objectManager
     * @type {ObjectManager}
     */
    this.objectManager = new ObjectManager(interactionManager); // Fill this with quadtrees or such

    /* PRIVATE */
    this._mapInMove = false;
  }
  /**
   * initialization method
   *
   * @method init
   * @param {String[]} plugins    Plugins to be activated for the map. Normally you should give the plugins here
   * instead of separately passing them to activatePlugins method. You can provide the module strings or module objects.
   * @param  {Object} coord                          Starting coordinates for the map
   * @param  {Integer} coord.x                       X coordinate
   * @param  {Integer} coord.y                       Y coordinate
   * @param {Function} tickCB                        callback function for tick. Tick callback is initiated in every frame. So map draws happen during ticks
   * @param {Object} options                         Fullsize: Do we set fullsize canvas or not.
   * @return {Array}                                 Returns an array of Promises. If this is empty / zero. Then there is nothing to wait for, if it contains promises, you have to wait for them to finish for the plugins to work and map be ready.
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
   *
   * @method whenReady
   * @return the current map instance
   * */
  whenReady() {
    return Q.all(isMapReadyPromises);
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   *
   * @method drawOnNextTick
   * @return the current map instance
   * */
  drawOnNextTick() {
    _drawMapOnNextTick = true;

    return this;
  }
  /**
   * The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
   *
   * @method getLayersWithAttributes
   * @param {String} attribute
   * @param {*} value
   * @return the current map instance
   * */
  getLayersWithAttributes(attribute, value) {
    return _staticLayer.children[0].children.filter(layer => {
      return layer[attribute] === value;
    });
  }
  /**
   * Create a special layer, that has UI effect in it.
   *
   * @method createUILayer
   * @param  {String} name          name of the layer
   * @param  {Object} coord         Coordinates of the layer
   * @param  {Integer} coord.x      X coordinate
   * @param  {Integer} coord.y      Y coordinate
   * @return {Map_layer}            The created UI layer
   */
  createUILayer(name = "default UI layer", coord = { x: 0, y: 0 }) {
    var layer = new Map_layer(name, coord);
    layer.specialLayer = true;

    return layer;
  }
  /**
   * All parameters are passed to Map_layer constructor
   *
   * @method addLayer
   * @return created Map_layer instance
   * */
  addLayer(layerOptions) {
    var thisLayer;

    if (this.getSubContainerConfigs() && layerOptions.subContainers !== false) {
      layerOptions.subContainers = this.getSubContainerConfigs();
    }

    thisLayer = new ParentLayerConstructor(layerOptions);
    _movableLayer.addChild(thisLayer);

    return thisLayer;
  }
  /**
   * I think we don't need this when we have getSubcontainerConfigs?
   *
   * @method usesSubContainers
   */
  usesSubContainers() {
    return this.subContainersConfig ? true : false;
  }
  /**
   * Does the map use subContainers
   *
   * @method getSubContainerConfigs
   */
  getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  /**
   * Get the size of area that is shown to the player. Depends a bit if we want to show the maximum possible or current.
   *
   * @method getViewportArea
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
   * @method removeLayer
   * @param {Map_layer} layer - the layer object to be removed
   * */
  removeLayer(layer) {
    _movableLayer.removeChild(layer);

    return layer;
  }
  /**
   * @method getLayerNamed
   * @return layer with the passed layer name
   * */
  getLayerNamed(name) {
    return _movableLayer.getChildNamed(name);
  }
  /**
   * Moves the map the amount of given x and y pixels. Note that this is not the destination coordinate, but the amount of movement that the map should move. Internally it moves the movableLayer, taking into account necessary properties (like scale).
   *
   * @method moveMap
   * @param {Object} coord                 The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }. With this we want the map to move horizontally 5 pixels and vertically stay at the same position.
   * @param {Integer} coord.x              X coordinate
   * @param {Integer} coord.y              Y coordinate
   * @param {Object} informCoordinates     THIS IS EXPERIMENTAL, TO FIX THE INCORRECT EVENT COORDINATES THIS SEND TO mapEvents, WHEN SCALING
   * @param {Integer} informCoordinates.x  X coordinate
   * @param {Integer} informCoordinates.y  Y coordinate
   * @param {{x: Integer, y: Integer}}
   **/
  moveMap(coord = { x: 0, y: 0 }, informCoordinates = coord) {
    var realCoordinates = {
      x: Math.round(coord.x / _staticLayer.getScale()),
      y: Math.round(coord.y / _staticLayer.getScale())
    };
    _movableLayer.move(realCoordinates);
    mapEvents.publish("mapMoved", informCoordinates || realCoordinates);
    this.drawOnNextTick();

    return this;
  }
  /**
   * Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
   * layer on the map and caches the ones that return true from getCacheEnabled-method.
   *
   * @method cacheMap
   **/
  cacheMap() {
    _movableLayer.children.forEach(child => {
      child.setCache(child.getCacheEnabled());
    });

    return this;
  }
  /**
   * unCache the map.
   *
   * @method unCacheMap
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
   * @method pluginsArray
   * @param {Object[]} pluginsArray         Array that consists the plugin modules to be activated
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
   * @method activatePlugin
   * @param {Object} plugin        Plugin module instance.
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
   *
   * @method mapMoved
   * @param {Boolean} yesOrNo         Has the map moved, or not.
   * @param {Boolean} isFinal         Is this the last time map has been moved with this event chain.
   * */
  mapMoved(yesOrNo, isFinal) {
    isFinal && mapEvents.publish("mapMovedFinal");

    if (yesOrNo !== undefined) {
      this._mapInMove = yesOrNo;
      return yesOrNo;
    }

    return this._mapInMove;
  }
  /**
   * @method setPrototype
   * @param {String} property
   * @param {*} value
   */
  setPrototype(property, value) {
    var thisPrototype = Object.getPrototypeOf(this);

    thisPrototype[property] = value;
  }
  /**
   * Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite the eventlistener callback use this.eventCBs
   *
   * @method toggleFullsize
   **/
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
   *
   * @method toggleFullScreen
   **/
  toggleFullScreen () {
    var eventListenerCB = setFullScreen.bind(this);

    eventlisteners.toggleFullscreen(eventListenerCB);
  }
  /**
   * @method getSubcontainersUnderPoint
   * @param  {[type]} globalCoords [description]
   * @return {[type]}              [description]
   */
  getSubcontainersUnderPoint(globalCoords) {
    var primaryLayers = this.getMovableLayer().getPrimaryLayers();
    var allMatchingSubcontainers = [];
    var allCoords = {
      globalCoords: globalCoords,
      localCoords: this.getMovableLayer().toLocal(new PIXI.Point(globalCoords.x, globalCoords.y))
    };
    var thisLayersSubcontainers;

    allCoords.localCoords.width = globalCoords.width;
    allCoords.localCoords.height = globalCoords.height;

    primaryLayers.forEach(layer => {
      thisLayersSubcontainers = layer.getSubContainersByCoordinates(allCoords.localCoords);
      allMatchingSubcontainers = allMatchingSubcontainers.concat(thisLayersSubcontainers);
    });

    return allMatchingSubcontainers;
  }
  /**
   * Filter objects based on quadtree and then based on possible group provided
   *
   * @method getObjectsUnderPoint
   * @param  {Object} globalCoords            Starting coordinates for the map
   * @param  {Integer} globalCoords.x         X coordinate
   * @param  {Integer} globalCoords.y         Y coordinate
   * @param  {String} type                    Type of the objects / layer to find.
   * @return {Array}                          Array of object found on the map.
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
        thisLayersSubcontainers = layer.getSubContainersByCoordinates(allCoords.globalCoords);
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
   * @method getMapPosition
   * @return {{x: Integer, y: Integer}}          current coordinates for the moved map
   * */
  getMapPosition() {
    return {
      x: _movableLayer.x,
      y: _movableLayer.y
    };
  }
  /**
   * @method getCanvas
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * @method getZoomLayer
   * @return {[type]} [description]
   */
  getZoomLayer() {
    return _staticLayer;
  }
  /**
   * @method setScale
   * @param {Number} scale
   */
  setScale(scale) {
    return _staticLayer.setScale(scale);
  }
  /**
   * @method getScale
   */
  getScale() {
    return _staticLayer.getScale();
  }
  /**
   * @method getUILayer
   */
  getUILayer() {
    return _staticLayer;
  }
  /**
   * @method getMovableLayer
   */
  getMovableLayer() {
    return _movableLayer;
  }
  /**
   * @method getRenderer
   */
  getRenderer() {
    return _renderer;
  }
  /**
   * @method getStage
   */
  getStage() {
    return _staticLayer;
  }
  /**
   * @method getStaticLayer
   */
  getStaticLayer() {
    return _staticLayer;
  }
  /*------------------------------------
   ------- APIS THROUGH PLUGINS --------
   -----------------------------------*/
   /**
    * @method zoomIn
    */
  zoomIn() { return "notImplementedYet. Activate with plugin"; }
   /**
    * @method zoomOut
    */
  zoomOut() { return "notImplementedYet. Activate with plugin"; }
  /*
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   *
   * @method addObjectsForSelection
   * @param  {Object} coord            ViewportArea location and size
   * @param  {Integer} coord.x         X coordinate
   * @param  {Integer} coord.y         Y coordinate
   * @param { String } type type of the objects to search for
   * @param { String } object The object to add
   * */
  addObjectsForSelection() { return "notImplementedYet"; }
  /*
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   *
   * @method removeObjectsForSelection
   * @param {{x: Number, y: Number }} coordinates to search from
   * @param { String } type type of the objects to search for
   * @param { String } object The object to add
   * */
  removeObjectsForSelection() { return "notImplementedYet"; }
  /*
   * Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
   * Default uses quadtree
   *
   * @method getObjectsUnderShape
   * @param { x: Number, y: Number } coordinates to search from
   * @param { String } shape The shape to match against
   * @param { String } type type of the objects to search for
   * */
  getObjectsUnderShape() { return "notImplementedYet"; /* Can be implemented if needed. We need more sophisticated quadtree for this */ }
}

/*---------------------
------- PRIVATE -------
----------------------*/
/**
 * This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
 * callback is always set and should not be removed or overruled
 *
 * @private
 * @static
 * @method _defaultTick
 */
function _defaultTick(map, ticker) {
  const ONE_SECOND = 1000;
  var FPSCount = 0;
  var fpsTimer = new Date().getTime();
  var renderStart, totalRenderTime;

  ticker.add(function () {
    if (_drawMapOnNextTick === true) {
      if (map.trackFPSCB) {
        renderStart = new Date().getTime();
      }
      _renderer.render(_staticLayer);
      _drawMapOnNextTick = false;
      if (map.trackFPSCB) {
        totalRenderTime += Math.round( Math.abs( renderStart - new Date().getTime() ) );
      }
    }
    if (map.trackFPSCB) {
      FPSCount++;

      if (fpsTimer + ONE_SECOND < new Date().getTime()) {
        map.trackFPSCB( {
          FPS: FPSCount,
          FPStime: fpsTimer,
          renderTime: totalRenderTime,
          drawCount: _renderer.drawCount
        });
        FPSCount = 0;
        totalRenderTime = 0;
        fpsTimer = new Date().getTime();
      }
    }
  });
}
/**
 * Resizes the canvas to the current most wide and high element status. Basically canvas size === window size.
 *
 * @private
 * @static
 * @method _resizeCanvas
 */
function _resizeCanvas() {
  let windowSize = utils.resize.getWindowSize();

  _renderer.autoResize = true;
  _renderer.resize(windowSize.x, windowSize.y);
  mapEvents.publish("mapResized");
  this.drawOnNextTick();
}
/**
 * Activate the browsers fullScreen mode and expand the canvas to fullsize
 *
 * @private
 * @static
 * @method setFullScreen
 */
function setFullScreen() {
  utils.resize.toggleFullScreen();
  mapEvents.publish("mapResized");
  _resizeCanvas.call(this);
}