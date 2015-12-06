'use strict';

import { mapEvents } from '/components/map/core/mapEvents';

export var managingChildrenOnMap = (function () {
  var childrenOutsideViewport = new Set();
  var childrenInsideViewport = new Set();

  return {
    add,
    check,
    startEventListeners
  };

  function add(object, globalCoordinates, layer, map) {
    var viewportArea = map.getViewportArea();
    viewportArea.x2 = viewportArea.y + viewportArea.width;
    viewportArea.y2 = viewportArea.x + viewportArea.height;

    if (isObjectOutsideViewport(object, viewportArea, false) ) {
      // object.persistentParentLink = layer;
      childrenOutsideViewport.add(object);
      object.visible = false;
    } else {
      object.visible = true;
      object.persistentParentLink = layer;
      childrenInsideViewport.add(object);
    }

    layer.addChild(object);
  }
  function check(layer, map) {
    var viewportArea = map.getViewportArea();
    viewportArea.x2 = viewportArea.y + viewportArea.width;
    viewportArea.y2 = viewportArea.x + viewportArea.height;

    childrenInsideViewport.forEach((thisObject) => {
      if (isObjectOutsideViewport(thisObject, viewportArea) ) {
        childrenOutsideViewport.add(thisObject);
        thisObject.visible = false;
      }
    });
    childrenOutsideViewport.forEach((thisObject) => {
      if (!isObjectOutsideViewport(thisObject, viewportArea) ) {
        childrenOutsideViewport.delete(thisObject);
        thisObject.visible = true;
      }
    });

    map.drawOnNextTick();
  }
  function startEventListeners(cb) {
    mapEvents.subscribe("mapMoved", function (...args) {
      cb(...args);
    });
    mapEvents.subscribe("mapResized", function (...args) {
      cb(...args);
    });
  }
  /**************************************
  *********** PRIVATE *******************
  **************************************/
  function isObjectOutsideViewport(object, viewportArea, hasParent = true) {
    var isIt, globalCoords;

    globalCoords = object.getGraphicalArea(hasParent);

    isIt = globalCoords.x < viewportArea.x || globalCoords.y < viewportArea.y ||
            globalCoords.x > viewportArea.x2 || globalCoords.y > viewportArea.y2;

    return isIt;
  }
})();