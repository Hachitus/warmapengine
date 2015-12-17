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

/***********************
******* PUBLIC *********
***********************/
function setupManagingTileMapMovement () {
  const VIEWPORT_OFFSET = 0.1;
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
        var objectsUnderChangedArea, isOutside;

        try {
          Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea));

          if (changedCoordinates.width < 0) {
            Object.assign( viewportArea, getViewportsLeftSideCoordinates(viewportArea));
          }
          if (changedCoordinates.height < 0) {
            Object.assign( viewportArea, getViewportsLeftSideCoordinates(viewportArea));
          }
          viewportArea.width += Math.abs(changedCoordinates.width);
          viewportArea.height += Math.abs(changedCoordinates.height);

          /* RESET */
          changedCoordinates.width = 0;
          changedCoordinates.height = 0;

          objectsUnderChangedArea = map.getObjectsUnderPoint(viewportArea);

          objectsUnderChangedArea.forEach((thisObject) => {
            isOutside = isObjectOutsideViewport(thisObject, viewportArea);

            if (thisObject.visible && isOutside) {
              thisObject.visible = false;
            } else if (!thisObject.visible && !isOutside ) {
              thisObject.visible = true;
            }
          });
          /** @todo Remove after optimization ready */

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
    var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET * 2 );
    var width = Math.abs( viewportArea.width ) + offsetSize;
    var height = Math.abs( viewportArea.width ) + offsetSize;

    return {
      x2: viewportArea.x + Math.abs( viewportArea.width ) + width,
      y2: viewportArea.y + Math.abs( viewportArea.height ) + height,
      width: viewportArea.width + width,
      height: viewportArea.height + height
    };
  }
  function getViewportsLeftSideCoordinates(viewportArea) {
    var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET );
    var width = Math.abs( viewportArea.width ) + offsetSize;
    var height = Math.abs( viewportArea.width ) + offsetSize;

    return {
      x: viewportArea.x - width,
      y: viewportArea.y - height,
      width: viewportArea.width + width,
      height: viewportArea.height + height
    };
  }
}