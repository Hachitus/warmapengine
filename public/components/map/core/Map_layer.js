'use strict';

/**
@require the createjs framework in global namespace
@require validator module
*/

/* ====== Own module imports ====== */
import { addPrototype as mapFunc_addPrototype } from "./mapFunctions";

/* ===== Constants ===== */
const TYPES = {
  justSubContainers: 1,
  noSubContainers: 2,
  imagesInSubContainers: 3
};

/** ===== EXPORT ===== */
export class Map_layer extends createjs.Container {
  constructor(name, type, subContainers, coord) {
    super();

    this.x = coord ? ( coord.x || 0 ) : 0;
    this.y = coord ? ( coord.y || 0 ) : 0;
    this.superPrototype = this.constructor.prototype;
    this._cacheEnabled = true;
    this.type = subContainers ? TYPES.imagesInSubContainers : type;
    this.visible = true;
    this.useSubcontainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.interactive = false;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }
  getCacheEnabled() {
    return this._cacheEnabled;
  }
  setCacheEnabled(status) {
    validators._is_boolean(status);
    this._cacheEnabled = status;

    return this;
  }
  addPrototype(name, functionToAdd) {
    super.prototype[name] = functionToAdd;
  }
  /* overloaded inherited method */
  addChildToSubContainer(object, index) {
    let functionToUse = index ? "_addChildAt" : "_addChild";

    if (!this.useSubcontainers) {
      /* We add the object to the Container directly. Wether it is Container or Bitmap etc. */
      this[functionToUse](object, index);
    } else {
      /* We add the object to the correct subContainer. For better logic and performance */
      let correctSubContainer = _getCorrectContainer.call(this, object.x, object.y);
      correctSubContainer.addChild(object, index);
    }

    return this;
  }
  getChildNamed(name) {
    if (this.children[0] instanceof createjs.Container) {
      for (let child of this.children) {
        if (child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  isUsingSubContainers() {
    return !!this.useSubcontainers;
  }
  isSetVisible() { }
  setVisible() { }
  static getType(name) {
    return TYPES[name];
  }
}
Map_layer.prototype.addPrototype = mapFunc_addPrototype;

/* The node-easel, nor minified easeljs doesn't have the SpriteStage (and node doesn't have the extend) */
/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';

export class Map_spritesheetLayer extends createjs.SpriteContainer {
  constructor(name, type, subContainers, spritesheet) {
    super(spritesheet);
    this.type = subContainers ? TYPES.imagesInSubContainers : type;
    this.visible = true;
    this.useSubcontainers = subContainers || false;
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;

    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }
  addChildToSubContainer(object, index) {
    let functionToUse = index ? "_addChildAt" : "_addChild";

    if(!this.useSubcontainers) {
      this[functionToUse](object, index);
    } else {
      let correctSubContainer = _getCorrectContainer.call(this, object.x, object.y);
      correctSubContainer.addChild(object, index);
    }

    return this;
  }
  getChildNamed(name) {
    if(this.children[0] instanceof createjs.Container) {
      for(let child of this.children) {
        if(child.name.toLowerCase() === name.toLowerCase()) {
          return child;
        }
      }
    }
    return false;
  }
  isUsingSubContainers() {
    return !!this.useSubcontainers;
  }
  isSetVisible() { }
  setVisible() { }
}
*/

/** ===== Private functions ===== */
function _getCorrectContainer(x, y) {
  let correctSubContainer = this.getObjectUnderPoint(x, y);

  return correctSubContainer;
}