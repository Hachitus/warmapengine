'use strict';

/**
@require the createjs framework in global namespace
*/

/* ===== EXPORT ===== */
export class Map_stage extends createjs.Stage {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {DOM Canvas element} canvas REQUIRED! Canvas element used by the map
   * @param {x: Number, y: Number} stageBounds Set stage bounds based on these coordinates
  */
  constructor(name, canvas, stageBounds) {
    if(!canvas) {
      throw new Error(Map_stage.constructor.name + " needs canvas!");
    }

    super(canvas);

    if(stageBounds) {
      this.setBounds(0, 0, stageBounds.x, stageBounds.y);
    }

    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.mouseEnabled = true;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }
  /** setter and getter
   * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
  cacheEnabled(status) {
    if(status !== undefined) {
      this._cacheEnabled = status;
    }

    return this._cacheEnabled;
  }
  ChildNamed(name) {
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

/**
 * @todo implement spriteStage! It should be more efficient when using spritesheets. Only issue was that minified
 * easeljs doesn't have the spriteStage and neither the node-easel (and node doesn't have the extend) */