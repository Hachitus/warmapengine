'use strict';

/**
@require the createjs framework in global namespace
@require validator module
*/

import { validatorMod } from "./map_validators";
import { addPrototype as mapFunc_addPrototype } from "./mapFunctions";

/** ===== Private functions declared ===== */
let privateFunctions = { };

/** ===== Validators used in this module. Imported from map_validators ===== */
let validators = {
  _is_index: validatorMod.isIndex,
  _is_boolean: validatorMod.isBoolean,
  _is_coordinates: validatorMod.isCoordinates,
  _is_SubContainerAmount: validatorMod.isSubContainerAmount,
  _is_UseOfSubLayers: validatorMod.isUseOfSubLayers,
  _is_UseOfSubContainers: validatorMod.isUseOfSubContainers
};

/** ===== EXPORT ===== */
export class Map_stage extends createjs.Stage {
  /* Takes the canvas element as argument */
    constructor(name, ...args) {
        super(...args);

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
        this.preventSelection = true;
        this.movable = true;
        this.interactive = false;
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
}
Map_stage.prototype.addPrototype = mapFunc_addPrototype;

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
