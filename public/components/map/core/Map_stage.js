'use strict';

/**
@require the createjs framework in global namespace
@require validator module
*/

/* ====== Own module imports ====== */

/** ===== EXPORT ===== */
export class Map_stage extends createjs.Stage {
  /* Takes the canvas element as argument */
  constructor(name, canvas, stageBounds) {
    if(!canvas) {
      throw new Error(Map_stage.constructor.name + " needs canvas!")
    }

    super(canvas);

    if(stageBounds) {
      this.setBounds(0, 0, stageBounds.x, stageBounds.y);
    }

    this.superPrototype = this.constructor.prototype;
    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    this.drawThisChild = true;

    /* Controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.mouseEnabled = true;
    this.preventSelection = true;
    this.movable = true;
    this.interactive = false;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }
  addPrototype(name, functionToAdd) {
    super.prototype[name] = functionToAdd;
  }
  setCacheEnabled(status) {
    this._cacheEnabled = status;

    return this;
  }
  getChildNamed(name) {
    for (let layer of this.children) {
      let child;

      if (layer.name.toLowerCase() === name.toLowerCase()) {
        return layer;
      }

      if (child = layer.getChildNamed(name)) {
        return child;
      }
    }

    return false;
  }
}

/* The node-easel, nor minified easeljs doesn't have the SpriteStage (and node doesn't have the extend) */


/*
import extend from '../../../assets/lib/createjs/utils/extend';
import promote from '../../../assets/lib/createjs/utils/promote';
import SpriteContainer from '../../../assets/lib/easeljs/SpriteContainer/SpriteContainer';
import SpriteStage from '../../../assets/lib/easeljs/SpriteContainer/SpriteStage';
export class Map_spriteStage extends createjs.SpriteStage {

    constructor(name, ...args) {
        super(...args);

        this._cacheEnabled = true;
        this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
        this.drawThisChild = true;


        this.tickEnabled = false;
        this.tickOnUpdate = false;
        this.tickChildren = false;
        this.mouseChildren = false;
        this.mouseEnabled = false;
        this.preventSelection = true;
        this.autoClear = false;
        //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
    }
    getCacheEnabled() {
        return this._cacheEnabled;
    }
    setCacheEnabled(status) {
        validators._is_boolean(status);
        this._cacheEnabled = status;

        return this;
    }
    getChildNamed(name) {
      for(let layer of this.children) {
        let child;

        if(layer.name.toLowerCase() === name.toLowerCase()) {
          return layer;
        }

        if(child = layer.getChildNamed(name)) {
          return child;
        }
      }

      return false;
    }
};
*/
