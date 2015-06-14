'use strict';

/**
 * @todo  Should always add / update bounds when new children are added to layers or stages. So that it checks if the
 * children are out of bound of the present area -> calculates new bounds and updates the bound with map.setBounds(),
 * http://www.createjs.com/docs/easeljs/files/easeljs_display_DisplayObject.js.html#l1152
 */
export let map_cache = (function map_move() {
  var scope = {};

  scope.init = function(mapObj) {
    _createPrototypes(mapObj);

    return mapObj;
  };

  return scope;

  /* ===== _createPrototypes ===== */
  function _createPrototypes(mapObj) {
    if(mapObj.stages && mapObj.stages[0]) {
      let stage = mapObj.stages[0];

      stage.addPrototype("cacheStage", _cacheStage);
      stage.addPrototype("updateBounds", _updateBounds_stage);

      if(stage.children && stage.children[0]) {
        let layer = stage.children[0];

        layer.addPrototype("cacheLayer", _cacheLayer);
        layer.addPrototype("updateBounds", _updateBounds_layer);
      }
    }

  }

  function _updateBounds_layer(newChild) {
    if(newChild === "outOfBounds") {
      newBounds = calculateNewBounds(newChild);
    }

    this.setBounds(newBounds);
  }
  function _updateBounds_stage(newChild) {
    if(newChild === "outOfBounds") {
      newBounds = calculateNewBounds(newChild);
    }

    this.setBounds(newBounds);
  }
  function _cacheLayer() {
    this.getBounds();
    this.cache();
  }
  function _cacheStage() {
    this.getBounds();
    this.cache();
  }
})();