/* global createjs, PIXI */
'use strict';

/**
@require the createjs framework in global namespace
*/

/**
 * @todo this.preventSelection. This should determine wether this stage holds data that can be selected by the player
 */

var _UIObjects = [];

/* ===== EXPORT ===== */
export class Map_layer extends createjs.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, coord) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
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
Object.assign(Map_layer.prototype, _getBaseContainerClass());

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
  constructor(name, coord) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
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

Object.assign(Map_spriteLayer.prototype, _getBaseContainerClass());

function _getBaseContainerClass() {
	return {
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
   	 @return this layer instance */
		move(coordinates) {
			if (this.movable) {
				this.x += coordinates.x;
				this.y += coordinates.y;
				this.drawThisChild = true;
			}

			return this;
		},
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
		setScale(amount) {
			this.scaleX = amount;
			this.scaleY = amount;

			return amount;
		},
		getScale() {
			return this.scaleX;
		},
		getUIObjects() {
			return _UIObjects;
		},
		emptyUIObjects() {
			_UIObjects.map(obj => {
				this.removeChild(obj);
				obj = null;
			});

			return _UIObjects;
		},
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