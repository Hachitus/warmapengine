'use strict';

/**
 * @require the PIXI framework in global namespace
 *
 * @todo I don't think this class should be done in the new class-word, since it is much more efficient with normal
 * prototypal inheritance way.
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
export class Map_layer extends PIXI.Container {
  /**
   * @param {String}				                name layer property name, used for identifiying the layer, usefull in
   * debugging, but used also otherwise too!
   * @param {x: Number, y: Number} 	        coord starting coords of layer. Relative to parent map layer.
   * @param {PIXI renderer}	renderer        renderer Not really needed by the super class, but used elsewhere.
   * @param {PIXI renderer} movable         renderer Not really needed by the super class, but used elsewhere.
   * @param {object} subContainers          width: Number. subcontainer width in pixels,
   *                                        height: Number. subcontainer height in pixels,
   *                                        maxDetectionOffset: Number. Amount of offset we detect outside the given area.
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false, subContainers: false, specialLayer: false } ) {
    var { name, coord, renderer, movable, subContainers, specialLayer } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.specialLayer = specialLayer;
    this.oldAddChild = super.addChild.bind(this);
    this.subContainersConfig = subContainers;
    this.subContainerList = [];
  }
}
Object.assign(Map_layer.prototype, _baseContainerClass);

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

export class Map_spriteLayer extends PIXI.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false, subContainers: false, specialLayer: false } ) {
    var { name, coord, renderer, movable, specialLayer, subContainers } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.specialLayer = specialLayer;
    this.oldAddChild = super.addChild.bind(this);
    this.subContainersConfig = subContainers;
    this.subContainerList = [];
  }
	/**
   * If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
	 * the children too. I think this has been normally disabled to make the particleContainer as efficient as possible
   * */
	updateTransform() {
  if (!this.visible)
  {
    return false;
  }

  this.displayObjectUpdateTransform();
  for (var i = 0, j = this.children.length; i < j; ++i)
  {
    this.children[i].updateTransform();
  }
	}
}
Object.assign(Map_spriteLayer.prototype, _baseContainerClass);

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

export class Map_bigSpriteLayer extends PIXI.Container {
  /**
   * @param {String}        name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number}  coord starting coords of layer. Relative to parent map layer.
   * @param {PIXI renderer}     renderer Not really needed by the super class, but used elsewhere.
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false, subContainers: false, specialLayer: false } ) {
    var { name, coord, renderer, movable, specialLayer, subContainers } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.specialLayer = specialLayer;
    this.oldAddChild = super.addChild.bind(this);
    this.subContainersConfig = subContainers;
    this.subContainerList = [];
  }
	/**
   * If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
	 * the children too. I think this has been normally disabled to make the particleContainer as efficient as possible
   * */
	updateTransform() {
  if (!this.visible)
  {
    return false;
  }

  this.displayObjectUpdateTransform();
  for (var i = 0, j = this.children.length; i < j; ++i)
  {
    this.children[i].updateTransform();
  }
	}
}
Object.assign(Map_bigSpriteLayer.prototype, _baseContainerClass);

/***********************
******* PRIVATE ********
***********************/
function _getBaseContainerClass() {
  return {
    addChild,
    setCache,
    hasSubContainers,
    getSubContainerConfigs,
    getSubContainersByCoordinates,
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

  function addChild(displayObject) {
    if (this.hasSubContainers()) {
      let correctContainer;
      correctContainer = setCorrectSubContainer(displayObject, this);
      this.oldAddChild(correctContainer);
    } else {
      this.oldAddChild(displayObject);
    }

    return displayObject;
  }
  function hasSubContainers() {
    return this.subContainersConfig ? true : false;
  }
  function getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  function getSubContainersByCoordinates(coordinates) {
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
  function getCurrentCache() {
    return this.cacheAsBitmap;
  }
  /**
   * Move layer
   * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }
	 * @return this layer instance
   * */
  function move(coord) {
    if (this.movable) {
      this.x += coord.x;
      this.y += coord.y;
      this.drawThisChild = true;
    }

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

export class Map_subContainer extends PIXI.Container {
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
Map_subContainer.prototype.setCache = setCache;

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