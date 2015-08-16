'use strict';

/** NOT IMPLEMENTED YET!
 * @todo  Should always add / update bounds when new children are added to layers or stages. So that it checks if the
 * children are out of bound of the present area -> calculates new bounds and updates the bound with map.setBounds(),
 * http://www.createjs.com/docs/easeljs/files/easeljs_display_DisplayObject.js.html#l1152
 */

export let map_cache = (function map_cache() {
  var scope = {};

  scope.init = function(map) {
    return map;
  };

  return scope;

  /* ===== _createPrototypes ===== */
  function _createPrototypes(mapObj) {
//    layer.prototype("cacheLayer", _cacheLayer);
//    layer.prototype("updateBounds", _updateBounds_layer);
  }

  function _updateBounds_layer(newChild) {
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