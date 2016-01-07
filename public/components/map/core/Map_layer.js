'use strict';

/**
 * @require the PIXI framework in global namespace
 * */

/***********************
****** VARIABLES *******
***********************/
var _UIObjects = [];
/* This will extend the layer-classes prototype */
var _baseContainerClass = _getBaseContainerClass();

/***********************
******** EXPORT ********
***********************/
/**
 * Creates a basic layer for the Map. Can not hold subcontainers!
 * @class
 */
export class Map_layer extends PIXI.Container {
  /**
   * @constructs
   * @param {Object} options          options
   *                                  name: String. Layers name, used for identifying the layer, useful in debugging, but used also otherwise too!
   * @param {x: Number, y: Number}          coord starting coords of layer. Relative to parent map layer.
   * @param {object} subContainers          width: Number. subcontainer width in pixels,
   *                                        height: Number. subcontainer height in pixels,
   *                                        maxDetectionOffset: Number. Amount of offset we detect outside the given area.
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   * */
  constructor(options = {
      name: "",
      coord: { x: 0, y: 0 },
      specialLayer: false } ) {
    var { name, coord, specialLayer } = options;

    super();

    Object.assign(this, coord);
    this._cacheEnabled = true;
    /** @member Good for debugging (shows up in toString), but used otherwise too */
    this.name = "" + name;
    /** @member (is it used?) */
    this.drawThisChild = true;
    /** @member (is it used?) */
    this.preventSelection = false;
    /** @member Boolean. When true, this layer is not counted as "PrimaryLayer". SpecialLayers can be e.g. dynamically modified UI-layers */
    this.specialLayer = specialLayer;
  }
}
Object.assign(Map_layer.prototype, _baseContainerClass);

/**
 * Layer designed to hold subcontainers. But can handle objects too.
 * @class
 */
export class Map_parentLayer extends Map_layer {
  /**
   * @constructs
   * @param {String}        name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number}  coord starting coords of layer. Relative to parent map layer.
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, subContainers: false, specialLayer: false } ) {
    var { subContainers } = options;

    super(options);

    this.oldAddChild = super.addChild.bind(this);
    this.subContainersConfig = subContainers;
    this.subContainerList = [];
  }
  addChild(displayObject) {
    if (this.hasSubContainers()) {
      let correctContainer;
      correctContainer = setCorrectSubContainer(displayObject, this);
      this.oldAddChild(correctContainer);
    } else {
      this.oldAddChild(displayObject);
    }

    return displayObject;
  }
  getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  getSubContainersByCoordinates(coordinates) {
    if (!this.hasSubContainers()) {
      throw new Error("tried to retrieve subContainers, when they are not present");
    }

    var foundSubcontainers, tempCoordinates;

    tempCoordinates = this.toLocal(new PIXI.Point(coordinates.x, coordinates.y));
    tempCoordinates.width = coordinates.width;
    tempCoordinates.height = coordinates.height;

    foundSubcontainers = getClosestSubcontainers(this, tempCoordinates);

    return foundSubcontainers;
  }
  getSubcontainers() {
    return this.subContainerList;
  }
}

/**
 * Subcontainers are containers that hold objects like units and terrain etc. under them. They have some restrictions atm. since they are PIXI.ParticleContainers. But when needed we can extend Map_layers with another class which is subcontainer, but not ParticleContainer at the present there is no need, so we won't extend yet. Subcontainers help the layers to make better movement of the map, by making subcontainers visible or invisible and even helping with selecting objects on the map. Thus we don't need to use our inefficient Quadtree.
 *
 * NOTICE! PIXI.ParticleContainer is much more strict than normal containers. When you encounter issues with it. Please check the restrictions on ParticleContainer.
 * @class
 */
class Map_subContainer extends PIXI.ParticleContainer {
  /**
   * @constructs
   * @param  {Object} size          { width: Number, height: Number }
   */
  constructor(size) {
    super();

    this.specialLayer = true;
    this.size = size;
  }
  getSubcontainerArea (scale, options = { toGlobal: true } ) {
    var coordinates;

    coordinates = options.toGlobal ? this.toGlobal(new PIXI.Point(0, 0)) : this;
    if (scale) {
      coordinates.x /= scale;
      coordinates.y /= scale;
    }

    return {
      x: Math.round( coordinates.x ),
      y: Math.round( coordinates.y ),
      width: Math.round( this.size.width ),
      height: Math.round( this.size.height )
    };
  }
}
/**
 * setCache method
 * @method
 */
Map_subContainer.prototype.setCache = setCache;

/***********************
**** PUBLIC METHODS ****
***********************/
/**
 * This extends the Map_layer classes as they share a lot of the same functionality
 */
function _getBaseContainerClass() {
  return {
    setCache,
    hasSubContainers,
    getCurrentCache,
    getCacheEnabled,
    move,
    setScale,
    getScale,
    getUIObjects,
    emptyUIObjects,
    addUIObjects,
    getPrimaryLayers,
    getObjects
  };

  function hasSubContainers() {
    return this.subContainersConfig ? true : false;
  }

  function getCurrentCache() {
    return this.cacheAsBitmap;
  }
  /**
   * Move layer
   * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }
   * @return this layer instance
   * */
  function move(coord) {
    this.x += coord.x;
    this.y += coord.y;
    this.drawThisChild = true;

    return this;
  }
  /**
   * set layer scale
   * @param {Number} amount The amount that you want the layer to scale.
   * @amount that was given
   * */
  function setScale(amount) {
    this.scale.x = this.scale.y = +amount.toFixed(2);

    return this.scale.x;
  }
  /**
   * get layer scale
   * @return current amount of scale
   * */
  function getScale() {
    return this.scale.x;
  }
  /**
   * get UIObjects on this layer, if there are any, or defaulty empty array if no UIObjects are active
   * @return current UIObjects
   * */
  function getUIObjects() {
    return _UIObjects;
  }
  /**
   * Remove all the UIObjects from this layer
   * @return empty UIObjects array
   * */
  function emptyUIObjects() {
    _UIObjects.map(obj => {
      this.removeChild(obj);
      obj = null;
    });

    return _UIObjects;
  }
  /**
   * Add UIObjects to this layer
   * @param {Object || Array} objects Objects can be an object containing one object to add or an Array of objects to add.
   * @return All the UIObjects currently on this layer
   * */
  function addUIObjects(objects) {
    _UIObjects = _UIObjects || [];
    if (Array.isArray(objects)) {
      objects.forEach( (/*thisObj*/) => {
        /* We want to make a copy of the object, since if add existing child from another container to UI,
         * it will get removed from the original container and messes up the hierarchy. Probably making a deep copy
         * directly isn't the best way, but it's the easiest atm. */
        //let newObj = general.deepCopy(thisObj);

        //this.addChild(newObj);
      });
    } else {
      //let newObj = general.deepCopy(objects);
      let newObj = objects;

      newObj.specialLayer = true;
      this.addChild( newObj );
    }
    _UIObjects.push( objects );

    return _UIObjects;
  }
  function getCacheEnabled() {
    return this._cacheEnabled;
  }
  function getPrimaryLayers() {
    return this.children.filter(thisChild => {
      return !thisChild.specialLayer;
    });
  }
  function getObjects() {
    var allObjects = [];

    if (this.hasSubContainers()) {
      this.subContainerList.forEach(subcontainer => {
        allObjects.concat(subcontainer.children);
      });
    }

    return allObjects;
  }
}

function setCache(status) {
  var toCacheStatus = status ? true : false;

  this.cacheAsBitmap = toCacheStatus;

  return toCacheStatus;
}
/***********************
******* PRIVATE ********
***********************/
function setCorrectSubContainer(displayObject, parentLayer) {
  var { subContainersConfig, subContainerList } = parentLayer;
  var xIndex = Math.floor( displayObject.x / subContainersConfig.width );
  var yIndex = Math.floor( displayObject.y / subContainersConfig.height );
  var thisSubcontainer;

  subContainerList[xIndex] = subContainerList[xIndex] || [];
  thisSubcontainer = subContainerList[xIndex][yIndex] = subContainerList[xIndex][yIndex] || [];

  if (subContainerList[xIndex][yIndex].length <= 0) {
    thisSubcontainer = new Map_subContainer({
      x: xIndex * subContainersConfig.width,
      y: yIndex * subContainersConfig.height,
      width: subContainersConfig.width,
      height: subContainersConfig.height
    });

    subContainerList[xIndex][yIndex] = thisSubcontainer;
    thisSubcontainer.x = xIndex * subContainersConfig.width;
    thisSubcontainer.y = yIndex * subContainersConfig.height;
    thisSubcontainer.visible = subContainersConfig.isHiddenByDefault ? false : true;
  }

  displayObject.x -= thisSubcontainer.x;
  displayObject.y -= thisSubcontainer.y;
  subContainerList[xIndex][yIndex].addChild(displayObject);

  return subContainerList[xIndex][yIndex];
}
/**
 * Get the closest subcontainers of the given area.
 * @param  {PIXI.Container} layer     The layer being used
 * @param  {Number} xIndex            x / horizontal index.
 * @param  {Number} yIndex            y / vertical index.
 * @return {Array}                    Array of found subcontainers.
 */
function getClosestSubcontainers(layer, givenCoordinates) {
  var coordinates = {
    x: givenCoordinates.x >= 0 ? givenCoordinates.x : 0,
    y: givenCoordinates.y >= 0 ? givenCoordinates.y : 0,
    width: givenCoordinates.width,
    height: givenCoordinates.height
  };
  var { width, height } = layer.getSubContainerConfigs();
  var allFoundSubcontainers = [];
  var xIndex = Math.floor( coordinates.x / width );
  var yIndex = Math.floor( coordinates.y / height );
  var x2 = coordinates.width ? coordinates.x + coordinates.width :  + coordinates.x;
  var y2 = coordinates.height ? coordinates.y + coordinates.height :  + coordinates.y;
  var widthIndex = Math.floor( x2 / width );
  var heightIndex = Math.floor( y2 / height );
  var subContainerList = layer.subContainerList;

  for (let thisXIndex = xIndex; thisXIndex <= widthIndex; thisXIndex++) {
    if (thisXIndex >= 0 && subContainerList && subContainerList[thisXIndex]) {
      for (let thisYIndex = yIndex; thisYIndex <= heightIndex; thisYIndex++) {
        if (thisYIndex >= 0 && subContainerList[thisXIndex][thisYIndex]) {
          allFoundSubcontainers.push(subContainerList[thisXIndex][thisYIndex]);
        }
      }
    }
  }

  return allFoundSubcontainers;
}