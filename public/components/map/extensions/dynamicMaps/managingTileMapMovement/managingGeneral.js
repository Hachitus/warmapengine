'use strict';

/**
 * This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or
 * outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise.
 *
 * @todo  I think this can be improved to be more efficient. Now we just basically iterate through the whole set of
 * objects on the map. Outside and inside the viewport. We could at least iterate through the objects, based on
 * coordinates, so we don't iterate and test ALL the objects. Or then some other methods. One option might even be to
 * use typedArrays to form a more efficient array?
 */

/***********************
******* IMPORTS ********
***********************/
import { mapEvents } from '/components/map/core/mapEvents';
import { arrays } from '/components/utilities/general';

/***********************
********* API **********
***********************/
export var managingTileMapMovement = setupManagingTileMapMovement();

/***********************
******* PUBLIC *********
***********************/
function setupManagingTileMapMovement () {
  const VIEWPORT_OFFSET = 200;
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

    object.visible = isObjectOutsideViewport(object, viewportArea, false) ? false : true;

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
    if (queue.processing) {
      return false;
    }

    queue.processing = true;

    let viewportFn = setupHandleViewportArea(queue, map, changedCoordinates);
    window.setTimeout(viewportFn, CHECK_INTERVAL);

    function setupHandleViewportArea(queue, map, changedCoordinates) {
      var viewportArea = map.getViewportArea();

      return function handleViewportArea() {
        var clonedCoordinates = Object.assign({}, changedCoordinates);
        var objectsUnderChangedArea, isOutside, areas;

        /* RESET */
        changedCoordinates.width = 0;
        changedCoordinates.height = 0;



        try {
          Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );

          areas = getChangedAreas(viewportArea, clonedCoordinates);
                  /* Remove after optimizations ready */
        var startTime = new Date().getTime();
          objectsUnderChangedArea = areas.map((thisArea) => {
            return map.getObjectsUnderPoint(thisArea);
          });
console.log(startTime - new Date().getTime());
          objectsUnderChangedArea = arrays.flatten(objectsUnderChangedArea);

          objectsUnderChangedArea.forEach((thisObject) => {
            isOutside = isObjectOutsideViewport(thisObject, viewportArea);

            if (thisObject.visible && isOutside) {
              thisObject.visible = false;
            } else if (!thisObject.visible && !isOutside ) {
              thisObject.visible = true;
            }
          });

          if (window.Worker) {
            // var worker = new Worker("/components/map/extensions/dynamicMaps/managingTileMapMovement/managingGeneralWorker.js");
            // worker.onmessage = function(e) {
            //   console.log("MESSAGE FROM BEYOND");
            //   // e.data == 'msg from worker'
            // };
            // worker.postMessage(children); // Start the worker.
            // webworker.postMessage("children");
            // console.log('Message posted to worker');
            // webworker.addEventListener('message', function(event) {
            //   console.log("DATA", event.data);
            // });
          }
        } catch (e) {
          console.log("ISSUE: ", e);
        }

        queue.processing = false;


        map.drawOnNextTick();
      };
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
    return {
      x2: viewportArea.x + viewportArea.width + VIEWPORT_OFFSET,
      y2: viewportArea.y + viewportArea.height + VIEWPORT_OFFSET
    };
  }
  /**
   *
   * @param  {[type]} newViewportArea [description]
   * @return {[type]}                 [description]
   *
   * @todo Make a better functionality for this. Math isn't my specialty.
   */
  function getChangedAreas(viewportArea, clonedCoordinates) {
    var areas = [];

    /* The small rectangle outside everything */
    if (clonedCoordinates.width > 0 && clonedCoordinates.height < 0) {
      areas.push(smallCornerPiece({
        x: viewportArea.x2,
        y: viewportArea.y + clonedCoordinates.height
      }));
    }
    if (clonedCoordinates.width < 0 && clonedCoordinates.height < 0) {
      areas.push(smallCornerPiece({
        x: viewportArea.x + clonedCoordinates.width,
        y: viewportArea.y + clonedCoordinates.height
      }));
    }
    if (clonedCoordinates.width > 0 && clonedCoordinates.height > 0) {
      areas.push(smallCornerPiece({
        x: viewportArea.x2,
        y: viewportArea.y2
      }));
    }
    if (clonedCoordinates.width < 0 && clonedCoordinates.height > 0) {
      areas.push(smallCornerPiece({
        x: viewportArea.x + clonedCoordinates.width,
        y: viewportArea.y
      }));
    }

    return areas;

    function smallCornerPiece(coord) {
      return {
        x: coord.x,
        y: coord.y,
        width: Math.abs(clonedCoordinates.width),
        height: Math.abs(clonedCoordinates.height)
      };
    }
  }
}