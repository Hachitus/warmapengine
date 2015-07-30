'user strict';

import { mouseUtils } from "../utils/utils.js";

export let map_zoom = (function map_zoom() {
  var scope = {};
  var zoomLimit = {
    farther: 0.4,
    closer : 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;

  scope.pluginName = map_zoom.name;

  /** ==== Public functions */
  function setZoomModifier (amount) {
    zoomModifier = amount;

    return this;
  }
  function setZoomLimits (farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  function zoomIn (amount) {
    if(_isOverZoomLimit( amount ) )

    this.getLayersWithAttributes("zoomable", true).forEach(layer => {
      layer.scaleX -= zoomModifier;
      layer.scaleY -= zoomModifier;
    });

    return this;
  }
  function zoomOut (amount) {
    if(_isOverZoomLimit( amount ) )

    this.getLayersWithAttributes("zoomable", true).forEach(layer => {
      layer.scaleX += zoomModifier;
      layer.scaleY += zoomModifier;
    });

    return this;
  }
  /**
  * @param {Map object} mapObj - the Map class object
  */
  scope.init = function(map) {
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);
    _startZoomListener(map);
  };

  return scope;

  function _startZoomListener( map ) {
    try {
      /* There has been several different mousewheel events before, but now all except opera should support "wheel" */
      map.setListener("mousewheel", _setupZoomEvent(map));
    } catch (e) {
      console.log(e);
    }
  }

  /* ===== Private functions ===== */
  function _isOverZoomLimit(amount) {
    if(amount > zoomLimit.farther && amount < zoomLimit.closer) {
      return false;
    }

    return true;
  }
  function _setupZoomEvent(map) {
    return function handleZoomEvent(event) {
      var mouseWheelDelta = mouseUtils.deltaFromWheel(event);

      if(mouseWheelDelta > 0) {
        map.zoomIn();
      } else if(mouseWheelDelta < 0) {
        map.zoomOut();
      }

      map.drawOnNextTick();
    };
  }
})();