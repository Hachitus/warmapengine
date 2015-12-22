'use strict';

/**
 * This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or
 * outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise.
 *
 * @todo  We can make this a bit more efficient still at least should work with static / fixed grid. Now we use
 * quadtree and that is not optimal
 */

/***********************
******* IMPORTS ********
***********************/
import { mapEvents } from '/components/map/core/mapEvents';

/***********************
********* API **********
***********************/
export var managingTileMapMovement = setupManagingTileMapMovement();
var viewportWorker = new Worker("/components/map/extensions/dynamicMaps/managingTileMapMovement/managingGeneralWorker.js");

/***********************
******* PUBLIC *********
***********************/
function setupManagingTileMapMovement () {
  const VIEWPORT_OFFSET = 0.15;
  const CHECK_INTERVAL = 20;
  var queue = {};
  var changedCoordinates = {
    width: 0,
    height: 0
  };

  return {
    add,
    check,
    startEventListeners
  };

  function add(object, layer, map) {
    var viewportArea;

    viewportArea = map.getViewportArea();
    Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );
    Object.assign( viewportArea , applyScaleToViewport(viewportArea, map.getScale()) );

    object.visible = isObjectOutsideViewport(object, viewportArea, false) ? false : true;

    layer.addChild(object);
  }
  /**
   * This one checks the that the objects that should currently be visible in the viewport area are visible and outside
   * of the viewport objects are set .visible = false. This affect performance a lot. Basically when the map moves, we
   * set a check in the future based on the given intervalCheck milliseconds. And immediately after it we check if there
   * is another map movement. If there is we set another timeout. This works better with timeouts.
   *
   * NOTE! This uses webWorkers. They seemed to speed up the check, when timing with performance.now.
   *
   * @param  {[type]} layer [description]
   * @param  {[type]} map   [description]
   * @return {[type]}       [description]
   */
  function check(map) {
    if (queue.processing) {
      return false;
    }

    queue.processing = true;

    let viewportFn = setupHandleViewportArea(queue, map, changedCoordinates);
    window.setTimeout(viewportFn, CHECK_INTERVAL);

    function setupHandleViewportArea(queue, map, changedCoordinates) {
      var viewportArea = map.getViewportArea();

      try {
        if (window.Worker) {
          viewportWorker.onmessage = function(e) {
            var isOutside;

            let scaledViewport = e.data[0];
            let objectsUnderChangedArea = map.getObjectsUnderPoint(scaledViewport);

            objectsUnderChangedArea.forEach((thisObject) => {
              isOutside = isObjectOutsideViewport(thisObject, viewportArea);

              if (thisObject.visible && isOutside) {
                thisObject.visible = false;
              } else if (!thisObject.visible && !isOutside ) {
                thisObject.visible = true;
              }
            });

            queue.processing = false;
            map.drawOnNextTick();
          };
          viewportWorker.postMessage([
            1,
            viewportArea,
            map.getScale(),
            changedCoordinates
          ]);
        } else {
          queue.processing = false;
          throw new Error("ERROR WITH WEB WORKER");
        }
      } catch (e) {
        queue.processing = false;
        console.log(e);
      }
    }
  }
  function startEventListeners(map) {
    mapEvents.subscribe("mapMoved", moveCb);
    mapEvents.subscribe("mapResized", resizeCb);

    function moveCb(type, movedCoordinates) {
      changedCoordinates.width += movedCoordinates.x;
      changedCoordinates.height += movedCoordinates.y;
      managingTileMapMovement.check(map);
    }
    function resizeCb() {
      managingTileMapMovement.check(map);
    }
  }
  /**************************************
  *********** PRIVATE *******************
  **************************************/
  function isObjectOutsideViewport(object, viewportArea, hasParent = true) {
    var isIt, globalCoords;

    globalCoords = object.getGraphicalArea({ toGlobal: hasParent });

    isIt = globalCoords.x < viewportArea.x || globalCoords.y < viewportArea.y ||
            globalCoords.x > viewportArea.x2 || globalCoords.y > viewportArea.y2;

    return isIt;
  }
  function getViewportsRightSideCoordinates(viewportArea) {
    var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET * 2 );

    return {
      x2: Math.round( viewportArea.x + Math.abs( viewportArea.width ) + offsetSize ),
      y2: Math.round( viewportArea.y + Math.abs( viewportArea.height ) + offsetSize ),
      width: Math.round( viewportArea.width + offsetSize ),
      height: Math.round( viewportArea.height + offsetSize )
    };
  }
  function applyScaleToViewport(viewportArea, scale) {
    return {
      x: Math.round( viewportArea.x / scale ),
      y: Math.round( viewportArea.y / scale ),
      x2: Math.round( viewportArea.x2 / scale ),
      y2: Math.round( viewportArea.y2 / scale ),
      width: Math.round( viewportArea.width / scale ),
      height: Math.round( viewportArea.height / scale )
    };
  }
}