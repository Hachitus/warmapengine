/* global PIXI */
'use strict';

/**
@require the PIXI framework in global namespace
@todo I don't think this class should be done in the new class-word, since it is much more efficient with normal
prototypal inheritance way.
*/

var _UIObjects = [];
/* This will extend the layer-classes prototype */
var _baseContainerClass = _getBaseContainerClass();

/* ===== EXPORT ===== */
export class Map_layer extends PIXI.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name = "", coord = { x: 0, y: 0 }, renderer) {
    super();

		this.position = new PIXI.Point(coord.x, coord.y);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
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
  constructor(name, coord = { x: 0, y: 0 }, renderer) {
    super();

    Object.assign(this, coord);
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
  }
	/** If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
	the children too. I think this has been normally disabled to make the particleContainer as efficient as possible */
	updateTransform() {
		if (!this.visible)
		{
				return;
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
		/** layer caching. Not implemented yet
		 * @todo Implement */
		setCache(status) {
			return this.cacheAsBitmap = status ? true : false;
		},
		getCache(status) {
			return this.cacheAsBitmap;
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