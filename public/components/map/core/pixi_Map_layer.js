/* global PIXI */
'use strict';

/**
@require the PIXI framework in global namespace
*/

var _UIObjects = [];

/* ===== EXPORT ===== */
export class Map_layer extends PIXI.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, coord, renderer) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
  }
}
Object.assign(Map_layer.prototype, _getBaseContainerClass());

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

export class Map_spriteLayer extends PIXI.ParticleContainer {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, coord, renderer) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this.renderer = renderer;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
  }
		/* If we want the interactive manager to work correctly for detecting coordinate clicks, we need correct worldTransform data, for
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
		 * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
		 { x: 5, y: 0 }
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
			if (this.children[0] instanceof PIXI.DisplayObjectContainer ) {
				for (let child of this.children) {
					if (child.name.toLowerCase() === name.toLowerCase()) {
						return child;
					}
				}
			}
			return false;
		},
		setScale(amount) {
			return this.scale.x = this.scale.y = amount;
		},
		getScale() {
			return this.scale.x;
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