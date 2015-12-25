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
   * @param {object} subContainers          { width: 500, height: 500, maxDetectionOffset: 100 }
   *
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
   */
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false, subContainers: false } ) {
    var { name, coord, renderer, movable, subContainers } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
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
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false } ) {
    var { name, coord, renderer, movable } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.oldAddChild = super.addChild.bind(this);
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
  constructor(options = { name: "", coord: { x: 0, y: 0 }, renderer: null, movable: false } ) {
    var { name, coord, renderer, movable } = options;

    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.oldAddChild = super.addChild.bind(this);
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
    getCorrectSubContainer,
    getCurrentCache,
    getCacheEnabled,
    move,
    setScale,
    getScale,
    getUIObjects,
    emptyUIObjects,
    addUIObjects
  };

  function addChild(displayObject) {
    if (this.subContainers) {
      let correctContainer;
      correctContainer = setCorrectSubContainer(displayObject, this);
      this.oldAddChild(correctContainer);
      return;
    }

    this.oldAddChild(displayObject);

    return displayObject;
  }
  function setCache(status) {
    var toCacheStatus = status ? true : false;

    this.cacheAsBitmap = toCacheStatus;

    return toCacheStatus;
  }
  function hasSubContainers() {
    return this.subContainers ? true : false;
  }
  function getSubContainerConfigs() {
    return this.subContainersConfig;
  }
  function getSubContainersByCoordinates(coords) {
    var correctSubcontainers;

    correctSubcontainers = this.children.filter(thisSubContainer => {
      throw new Error("undone");
      if (coords.x < thisSubContainer.x &&
          coords.x < thisSubContainer.x &&
          coords.x < thisSubContainer.x &&
          coords.x < thisSubContainer.x) {
        return true;
      }
    });

    return correctSubcontainers;
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

      this.addChild( newObj );
    }
    _UIObjects.push( objects );

    return _UIObjects;
  }
  function getCacheEnabled() {
    return this._cacheEnabled;
  }
}

export class Map_subContainer extends PIXI.Container {
  constructor(size) {
    super();

    this.size = size;
  }
}

/***********************
******* PRIVATE ********
***********************/
function setCorrectSubContainer(displayObject, parentLayer) {
  var { subContainersConfig, subContainerList, size } = parentLayer;
  var xIndex = Math.floor( displayObject.x / subContainersConfig.width );
  var yIndex = Math.floor( displayObject.y / subContainersConfig.height );
  var thisSubContainer;

  if (subContainerList[xIndex][yIndex]) {
    thisSubContainer = subContainerList[xIndex][yIndex];
  } else if (subContainerList[xIndex]) {
    thisSubContainer = new Map_subContainer(size);
    subContainerList[xIndex][yIndex] = [thisSubContainer];
  } else {
    thisSubContainer = new Map_subContainer(size);
    subContainerList[xIndex] = [];
    subContainerList[xIndex][yIndex] = [thisSubContainer];
  }

  thisSubContainer.addChild(displayObject);

  return thisSubContainer;
}