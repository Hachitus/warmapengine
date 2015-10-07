/* global PIXI */
'use strict';

/**
@require the PIXI framework in global namespace
@todo I don't think this class should be done in the new class-word, since it is much more efficient with normal
prototypal inheritance way.
*/

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
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = movable;
    this.zoomable = false;
    this.preventSelection = false;
    this.subContainerConfig = subContainerConfig;
    this.oldAddChild = super.addChild.bind(this);

    if(this.subContainerConfig.size) {
    	this.subContainers = _setSubContainers(this.getBounds(), this.subContainerConfig.size);
    	this.subContainers.forEach(sub => {
    		super.addChild(sub);
    	});    	
	}
  }
}
Object.assign(Map_layer.prototype, _baseContainerClass);

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

export class Map_spriteLayer extends PIXI.ParticleContainer {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  	constructor({ name = "", coord = { x: 0, y: 0 }, renderer = null, subContainerConfig = { size: 0 }, movable = false }) {
	    super();

	    Object.assign(this, coord);
	    this.renderer = renderer;
	    //this._cacheEnabled = true;
	    this.name = "" + name; // For debugging. Shows up in toString
	    this.drawThisChild = true;
	    this.movable = movable;
	    this.zoomable = false;
	    this.preventSelection = false;
	    this.subContainerConfig = subContainerConfig;
	    this.oldAddChild = super.addChild.bind(this);

	    if(this.subContainerConfig.size) {
	    	this.subContainers = _setSubContainers(this.getBounds(), this.subContainerConfig.size);
	    	this.subContainers.forEach(sub => {
	    		super.addChild(sub);
	    	});
		}
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

function _getBaseContainerClass() {
	return {
		/**
		 * @param {PIXI.DisplayObject} displayObject
		 */
		hasSubcontainers() {
			return !!this.subContainerConfig.size && this.subContainers.length > 0;
		},
		addChild(displayObject) {
			if(this.hasSubcontainers()) {
				let {x, y} = displayObject.position;
				let correctSubContainer = getCorrectSubcontainer({ x, y });

				function getCorrectSubcontainer(coord) {
					return this.subContainers[0];
				}

				correctSubContainer.addChild(displayObject);
			} else {
				this.oldAddChild(displayObject);
			}
		},
		setCache(status) {
			this._cacheEnabled = status ? true : false;

			if(this.hasSubcontainers()) {
				this.subContainers.each(sub => {
					sub.cacheAsBitmap = this._cacheEnabled;
				});
			} else {
				this.cacheAsBitmap = this._cacheEnabled;
			}

			return this._cacheEnabled;
		},
		getCache(status) {
			return this._cacheEnabled;
		},
		/** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e. { x: 5, y: 0 }
   	 * @return this layer instance */
		move(coord) {
			if (this.movable) {
				this.x += coord.x;
				this.y += coord.y;
				this.drawThisChild = true;
			}

			return this;
		},
		/** gets child (layer or object - sprite etc.) from this layer
		 * @param {string} name searches for a layer that has this name-property
		 * @return the first layer that was found or false if nothing was found */
		getChildNamed(name) {
			if (this.children[0] instanceof PIXI.DisplayObjectContainer ) {
				for (let child of this.children) {
					if (child.name.toLowerCase() === name.toLowerCase()) {
						return child;
					}
				}
			}
			return false;
		},
		/** set layer scale
		 * @param {Number} amount The amount that you want the layer to scale.
		 * @amount that was given */
		setScale(amount) {
			return this.scale.x = this.scale.y = amount;
		},
		/** get layer scale
		 * @return current amount of scale */
		getScale() {
			return this.scale.x;
		},
		/** get UIObjects on this layer, if there are any, or defaulty empty array if no UIObjects are active
		 * @return current UIObjects */
		getUIObjects() {
			return _UIObjects;
		},
		/** Remove all the UIObjects from this layer
		 * @return empty UIObjects array */
		emptyUIObjects() {
			_UIObjects.map(obj => {
				this.removeChild(obj);
				obj = null;
			});

			return _UIObjects;
		},
		/** Add UIObjects to this layer
		 * @param {Object || Array} objects Objects can be an object containing one object to add or an Array of objects to add.
		 * @return All the UIObjects currently on this layer */
		addUIObjects(objects) {
			_UIObjects = _UIObjects || [];
			if(Array.isArray(objects)) {
				this.addChild.apply(this, objects);
			} else {
				this.addChild( objects );
			}
			_UIObjects.push( objects );

			return _UIObjects;
		}
	};
}

function _setSubContainers(bounds, size) {
	console.log("JATKA TÄSTÄ. pixi_map_layer:204");
	throw "JATKA TÄSTÄ. pixi_map_layer:204";
	var bounds = bounds;
	var counts = bounds / size;
	var subContainers = [];

	for(let i = 0; counts < i; i++) {
		let newContainer = new PIXI.ParticleContainer();
		subContainers.push(newContainer);
	}

	return subContainers;
}