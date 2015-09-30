/* global createjs, PIXI */
'use strict';

/**
@require the createjs framework in global namespace
@todo I don't think this class should be done in the new class-word, since it is much more efficient with normal
prototypal inheritance way.
*/

var _UIObjects = [];
/* This will extend the layer-classes prototype */
var _baseContainerClass = _getBaseContainerClass();

/* ===== EXPORT ===== */
export class Map_layer extends createjs.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name = "", coord = { x: 0, y: 0 }) {
    super();

    this.name = "" + name; // For debugging. Shows up in toString
		Object.assign(this, coord);
    this._cacheEnabled = true;    
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.visible = true;
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }
}
Object.assign(Map_layer.prototype, _baseContainerClass);

/**
 * @todo implement spriteContainer! It should be more efficient when using spritesheets. Only issue was that minified
 * easeljs doesn't have the spriteStage (and spriteContainer?) and neither the node-easel (and node doesn't have the extend) */
/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';
*/
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';

export class Map_spriteLayer extends createjs.SpriteContainer {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, coord = { x: 0, y: 0}) {
    super();

    Object.assign(this, coord);
    this._cacheEnabled = true;
    this.name = "" + name; // Used otherwise too, but good for debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.visible = true;
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }
}

Object.assign(Map_spriteLayer.prototype, _baseContainerClass);

function _getBaseContainerClass() {
	return {
		/** layer caching. Not implemented yet
		 * @todo Implement */
		setCache(status) {
			if(status) {
				this._cacheEnabled = true;
			} else {
				this._cacheEnabled = false;
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
			if (this.children[0] instanceof createjs.Container) {
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
			this.scaleX = amount;
			this.scaleY = amount;

			return amount;
		},
		/** get layer scale
		 * @return current amount of scale */
		getScale() {
			return this.scaleX;
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

			return _UIObjects = [];
		},
		/** Add UIObjects to this layer
		 * @param {Object || Array} objects Objects can be an object containing one object to add or an Array of objects to add.
		 * @return All the UIObjects currently on this layer */
		addUIObjects(objects) {
			_UIObjects = _UIObjects || [];
			
			if(Array.isArray(objects)) {
				this.addChild.apply(this, objects);
				_UIObjects.concat( objects );
			} else {
				this.addChild( objects );
				_UIObjects.push( objects );
			}

			return _UIObjects;
		}
	};
}