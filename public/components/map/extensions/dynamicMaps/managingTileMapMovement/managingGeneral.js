'use strict';

/**
 * This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or
 * outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise.
 *
 * @todo  I think this can be improved to be more efficient. Now we just basically iterate through the whole set of
 * objects on the map. Outside or inside the viewport. We could at least iterate through the objects, based on
 * coordinates, so we don't iterate and test ALL the objects. Or then some other methods. One option might even be to
 * use typedArrays to form a more efficient array?
 */

/***********************
******* IMPORTS ********
***********************/
import { mapEvents } from '/components/map/core/mapEvents';

/***********************
********* API **********
***********************/
export var managingTileMapMovement = setupManagingTileMapMovement();

/***********************
******* PUBLIC *********
***********************/
function setupManagingTileMapMovement () {
  const VIEWPORT_OFFSET = 200;
  var children = new Set();
  var endTime;

  return {
    add,
    check,
    startEventListeners
  };

  function add(object, layer, map) {
    var viewportArea;

    viewportArea = map.getViewportArea();
    Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );

    object.visible = isObjectOutsideViewport(object, viewportArea, false) ? false : true;

    children.add(object);
    layer.addChild(object);
  }
  /**
   * This one checks the that the objects that should currently be visible in the viewport area are visible and outside
   * of the viewport objects are set .visible = false. This affect performance a lot. Basically when the map moves, we
   * set a check in the future based on the given intervalCheck milliseconds. And immediately after it we check if there
   * is another map movement. If there is we set another timeout. This works better with timeouts.
   *
   * @param  {[type]} layer [description]
   * @param  {[type]} map   [description]
   * @return {[type]}       [description]
   */
  function check(map) {
    var intervalForChecks = 80;
    var startTime;

    startTime = new Date().getTime();

    if (startTime - endTime < intervalForChecks + 1) {
      return false;
    }

    let viewportFn = setupHandleViewportArea(map.getViewportArea());
    window.setTimeout(viewportFn, intervalForChecks);

    endTime = new Date().getTime();

    function setupHandleViewportArea(viewportArea) {
      return function handleViewportArea() {
        var isOutside;

        Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );

        children.forEach((thisObject) => {
          isOutside = isObjectOutsideViewport(thisObject, viewportArea);

          if (thisObject.visible && isOutside) {
            thisObject.visible = false;
          } else if (!thisObject.visible && !isOutside ) {
            thisObject.visible = true;
          }
        });

        map.drawOnNextTick();
      };
    }
  }
  function startEventListeners(map) {
    mapEvents.subscribe("mapMoved", cb);
    mapEvents.subscribe("mapResized", cb);

    function cb() {
      managingTileMapMovement.check(map);
    }
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
  function getViewportsRightSideCoordinates(viewportArea) {
    return {
      x2: viewportArea.x + viewportArea.width + VIEWPORT_OFFSET,
      y2: viewportArea.y + viewportArea.height + VIEWPORT_OFFSET
    };
  }
}