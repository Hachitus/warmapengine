'use strict';

/**
@require the createjs framework in global namespace
*/

/**
 * @todo this.preventSelection. This should determine wether this stage holds data that can be selected by the player
 */

/**
 * @todo subContainers. Subcontainers are containers inside layers designed to group up objects to smaller containers. So e.g.
 * getObjectsUnderPoint is faster. This has not been efficiently tested from performance wise so the feature will be
 * added after the basic map module works and we can verify the effect well */

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

var _UIObjects = [];

/* ===== EXPORT ===== */
export class Map_layer extends PIXI.Container {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, subContainers, coord) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this._cacheEnabled = true;
    this.subContainers = subContainers || false; // These should probably be particleContainers
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
  /** setter and getter
   * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
  cacheEnabled(status) {
    if(status !== undefined) {
      this._cacheEnabled = status;
    }

    return this._cacheEnabled;
  }
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
  }
  getChildNamed(name) {
    if (this.children[0] instanceof PIXI.DisplayObjectContainer ) {
      for (let child of this.children) {
        if (child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  isUsingSubContainers() {
    return !!this.subContainers;
  }
  setScale(amount) {
    return this.scale.x = this.scale.y = amount;
  }
  getScale() {
    return this.scale.x;
  }
  getUIObjects() {
    return _UIObjects;
  }
  emptyUIObjects() {
    _UIObjects.map(obj => {
      this.removeChild(obj);
      obj = null;
    });

    return _UIObjects;
  }
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
}

export class Map_subLayer extends PIXI.ParticleContainer {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */
  constructor(name, subContainers, coord) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this._cacheEnabled = true;
    this.subContainers = subContainers || false; // These should probably be particleContainers
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
  /** setter and getter
   * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
  cacheEnabled(status) {
    if(status !== undefined) {
      this._cacheEnabled = status;
    }

    return this._cacheEnabled;
  }
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
  }
  getChildNamed(name) {
    if (this.children[0] instanceof PIXI.DisplayObjectContainer ) {
      for (let child of this.children) {
        if (child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  isUsingSubContainers() {
    return !!this.subContainers;
  }
  setScale(amount) {
    return this.scale.x = this.scale.y = amount;
  }
  getScale() {
    return this.scale.x;
  }
  getUIObjects() {
    return _UIObjects;
  }
  emptyUIObjects() {
    _UIObjects.map(obj => {
      this.removeChild(obj);
      obj = null;
    });

    return _UIObjects;
  }
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
}