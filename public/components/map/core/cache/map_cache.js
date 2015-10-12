'use strict';

/** NOT IMPLEMENTED YET!
 * @todo  Should always add / update bounds when new children are added to layers or stages. So that it checks if the
 * children are out of bound of the present area -> calculates new bounds and updates the bound with map.setBounds(),
 * http://www.createjs.com/docs/easeljs/files/easeljs_display_DisplayObject.js.html#l1152
 */

var _pluginName = "map_cache";

export var pluginName = _pluginName;

export let map_cache = (function map_cache() {
  var cacheStatus = false;
  var scope = {};

  scope.init = function(map) {
    //map.setPrototype("setCache", setCacheMap);
    //map.setPrototype("getCache", getCacheMap);
  };

  return scope;

  /* ===== _createPrototypes ===== */
  function setCacheMap(status) {
    this.getMovableLayer().children.forEach(child => {
      if(child.getCacheEnabled()) {
        child.setCache();
      }
    });
    return this.cache().setCache(status ? true : false);
  }
  function getCacheMap() {
    return this.getMovableLayer().getCache();
  }
})();