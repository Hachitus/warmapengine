/* jshint ignore:start */
// JSHINT IGNORE: Since does not seem to handle ES6 classes properly.

'use strict';

import { general } from './utils/utils';

/**
 * @require the PIXI framework in global namespace
 * @todo I don't think this class should be done in the new class-word, since it is much more efficient with normal
 * prototypal inheritance way. */

var _UIObjects = [];
var oldAddChild;
/* This will extend the layer-classes prototype */
var _baseContainerClass = _getBaseContainerClass();

/* ===== EXPORT ===== */
export class Map_layer extends PIXI.Container {
  /**
   * @param {String}				name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} 	coord starting coords of layer. Relative to parent map layer.
   * @param {PIXI renderer}			renderer Not really needed by the super class, but used elsewhere.
   * @param {Number} 				subContainers	size is the maximum pixels width and height of one subcontainer.
   * Different devices graphic cards can only have specific size of bitmap drawn, and PIXI cache always draws a bitmap
   * thus the default is: 4096, based on this site: http://webglstats.com/ and MAX_TEXTURE_SIZE
  */
  constructor({ name = "", coord = { x: 0, y: 0 }, renderer = null, subContainerConfig = { size: 0 }, movable = false }) {
    super();

    Object.assign(this, coord);
    this.subcontainerTypeConstructor = PIXI.Container.bind(PIXI);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.subContainerConfig = subContainerConfig;
    this.oldAddChild = super.addChild.bind(this);
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
	constructor({ name = "", coord = { x: 0, y: 0 }, renderer = null, movable = false }) {
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
	/** If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
	the children too. I think this has been normally disabled to make the particleContainer as efficient as possible */
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
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
	constructor({ name = "", coord = { x: 0, y: 0 }, renderer = null, subContainerConfig = { size: 0 }, movable = false }) {
	    super();

	    Object.assign(this, coord);
	    this.subcontainerTypeConstructor = PIXI.Container.bind(PIXI);
	    this.renderer = renderer;
	    this._cacheEnabled = true;
	    this.name = "" + name; // For debugging. Shows up in toString
	    this.drawThisChild = true;
	    this.movable = movable;
	    this.zoomable = false;
	    this.preventSelection = false;
	    this.subContainerConfig = subContainerConfig;
	    this.oldAddChild = super.addChild.bind(this);
  	}
	/** If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
	the children too. I think this has been normally disabled to make the particleContainer as efficient as possible */
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

function _getBaseContainerClass() {
  return {
    hasSubcontainers,
    addChild,
    setCache,
    getCurrentCache,
    getCacheEnabled,
    move,
    getChildNamed,
    setScale,
    getScale,
    getUIObjects,
    emptyUIObjects,
    addUIObjects,
    createNewSubcontainer,
    getCorrectSubcontainer
  };

  /**
  	 * @param {PIXI.DisplayObject} displayObject
  	 */
  function hasSubcontainers() {
    return (this.subContainerConfig && this.subContainerConfig.size);
  }
  function addChild(displayObject) {
    if (this.hasSubcontainers()) {
      let {x, y} = displayObject.position;
      let correctSubContainer = this.getCorrectSubcontainer({ x, y });

      if (!correctSubContainer) {
        throw new Error("getCorrectSubcontainer did not find correct subcontainer!");
      }

      correctSubContainer.addChild(displayObject);
    } else {
      this.oldAddChild(displayObject);
    }

    return displayObject;
  }
  function setCache(status) {
    var toCacheStatus = status ? true : false;

    this.cacheAsBitmap = toCacheStatus;

    return toCacheStatus;
  }
  function getCurrentCache(status) {
    return this.cacheAsBitmap;
  }
  /** Move layer
   * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }
  	 * @return this layer instance */
  function move(coord) {
    if (this.movable) {
      this.x += coord.x;
      this.y += coord.y;
      this.drawThisChild = true;
    }

    return this;
  }
  /** gets child (layer or object - sprite etc.) from this layer
  	 * @param {string} name searches for a layer that has this name-property
  	 * @return the first layer that was found or false if nothing was found */
  function getChildNamed(name) {
    if (this.children[0] instanceof PIXI.DisplayObjectContainer ) {
      for (let child of this.children) {
        if (child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  /** set layer scale
  	 * @param {Number} amount The amount that you want the layer to scale.
  	 * @amount that was given */
  function setScale(amount) {
    return this.scale.x = this.scale.y = amount;
  }
  /** get layer scale
  	 * @return current amount of scale */
  function getScale() {
    return this.scale.x;
  }
  /** get UIObjects on this layer, if there are any, or defaulty empty array if no UIObjects are active
  	 * @return current UIObjects */
  function getUIObjects() {
    return _UIObjects;
  }
  /** Remove all the UIObjects from this layer
  	 * @return empty UIObjects array */
  function emptyUIObjects() {
    _UIObjects.map(obj => {
      this.removeChild(obj);
      obj = null;
    });

    return _UIObjects;
  }
  /** Add UIObjects to this layer
  	 * @param {Object || Array} objects Objects can be an object containing one object to add or an Array of objects to add.
  	 * @return All the UIObjects currently on this layer */
  function addUIObjects(objects) {
    _UIObjects = _UIObjects || [];
    if (Array.isArray(objects)) {
      objects.forEach( thisObj => {
        /* We want to make a copy of the object, since if add existing child from another container to UI,
         * it will get removed from the original container and messes up the hierarchy. Probably making a deep copy
         * directly isn't the best way, but it's the easiest atm. */
        //let newObj = general.deepCopy(thisObj);

        //this.addChild(newObj);
      })
    } else {
      //let newObj = general.deepCopy(objects);
      let newObj = objects;

      this.addChild( newObj );
    }
    _UIObjects.push( objects );

    return _UIObjects;
  }

  function createNewSubcontainer(coord = {x: 0, y: 0}) {
    let newSubcontainer;

    newSubcontainer = new this.subcontainerTypeConstructor();
    newSubcontainer.x = this.subContainerConfig.size * Math.floor(coord.x / this.subContainerConfig.size);
    newSubcontainer.y = this.subContainerConfig.size * Math.floor(coord.y / this.subContainerConfig.size);

    this.oldAddChild(newSubcontainer);

    return newSubcontainer;
  }
  function getCorrectSubcontainer(coord) {
    var foundContainer = [];
    this.subContainers = this.subContainers || [];

    foundContainer = this.subContainers.find(sub => {
      if (sub.x <= coord.x &&
      sub.y <= coord.y &&
      sub.x + this.subContainerConfig.size > coord.x &&
      sub.y + this.subContainerConfig.size > coord.y) {
        return sub;
      }
    });

    if (!foundContainer) {
      foundContainer = this.createNewSubcontainer(coord);
      this.subContainers.push(foundContainer);
    }

    return foundContainer;
  }
  function getCacheEnabled() {
    return this._cacheEnabled;
  }
}

function _setSubContainers(parentSize, subsize) {
  var counts = {
    x: Math.floor(parentSize.x / subsize),
    y: Math.floor(parentSize.y / subsize)
  };
  var subContainers = [];

  for (let x = 0; counts.x < x; x++) {
    for (let y = 0; counts.y < y; y++) {
      let newContainer = new PIXI.Container();
      newContainer.x = x;
      newContainer.y = y;
      subContainers.push(newContainer);
    }
  }

  return subContainers;
}