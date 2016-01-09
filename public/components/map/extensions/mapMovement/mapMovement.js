/* global console */
'use strict';

/**
 * This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or
 * outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise.
 *
 * @todo Finetune this through. Now it actually doesn't hide the subcontainers correctly!
 */

/***********************
******* IMPORTS ********
***********************/
import { mapEvents } from '/components/bundles/coreBundle';
import { arrays } from '/components/utilities/general';

/***********************
****** VARIABLES *******
***********************/
var viewportWorker = new Worker("/components/map/extensions/mapMovement/mapMovementWorker.js");

/***********************
********* API **********
***********************/
export const pluginName = "mapMovement";
export const mapMovement = setupMapMovement();

/***********************
******* PUBLIC *********
***********************/
function setupMapMovement () {
  const VIEWPORT_OFFSET = 0.15;
  const CHECK_INTERVAL = 20;
  var queue = {};
  var changedCoordinates = {
    width: 0,
    height: 0
  };

  return {
    init,
    addAll,
    check,
    startEventListeners
  };

  function init(map) {
    addAll(map);
    startEventListeners(map);
    map.drawOnNextTick();
  }
  function addAll(map) {
    var scale = map.getScale();
    var viewportArea;

    viewportArea = map.getViewportArea();
    Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );
    Object.assign( viewportArea , applyScaleToViewport(viewportArea, map.getScale()) );

    map.getMovableLayer().getPrimaryLayers().forEach( layer => {
      var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());

      subcontainers.forEach(subcontainer => {
        subcontainer.visible = isObjectOutsideViewport(subcontainer, viewportArea, false, scale) ? false : true;
      });
    });
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
            try {
              const scale = map.getScale();
              const scaledViewport = e.data[0];
              const smallerScaledViewport = e.data[1];
              var containersUnderChangedArea = [];
              var isOutside, scaledAndChangedViewport;

              scaledAndChangedViewport = Object.assign({}, scaledViewport);

              scaledAndChangedViewport.width += Math.round(Math.abs(changedCoordinates.width));
              scaledAndChangedViewport.height += Math.round(Math.abs(changedCoordinates.height));

              /* RESET */
              changedCoordinates.width = 0;
              changedCoordinates.height = 0;

              containersUnderChangedArea = map.getMovableLayer().getPrimaryLayers().map(layer => {
                return layer.getSubContainersByCoordinates(scaledAndChangedViewport);
              });
              containersUnderChangedArea = arrays.flatten2Levels(containersUnderChangedArea);

              containersUnderChangedArea.forEach((thisContainer) => {
                isOutside = isObjectOutsideViewport(thisContainer, smallerScaledViewport, true, scale);

                thisContainer.visible = isOutside ? false : true;
                // I do not know is caching between the moves better or not-caching.
                // thisContainer.setCache(false);
                // thisContainer.setCache(true);
              });

              queue.processing = false;

              map.drawOnNextTick();
            } catch (ev) {
              console.log("ERROR", ev);
            }
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

    return;
  }
  function startEventListeners(map) {
    mapEvents.subscribe("mapMoved", moveCb);
    mapEvents.subscribe("mapResized", resizeCb);

    function moveCb(type, movedCoordinates) {
      changedCoordinates.width += movedCoordinates.x;
      changedCoordinates.height += movedCoordinates.y;
      mapMovement.check(map);
    }
    function resizeCb() {
      mapMovement.check(map);
    }
  }
  /**************************************
  *********** PRIVATE *******************
  **************************************/
  function isObjectOutsideViewport(object, viewportArea, hasParent = true, scale = 1) {
    var isIt, globalCoords;

    globalCoords = object.getSubcontainerArea(scale, { toGlobal: hasParent });

    isIt = !testRectangleIntersect(globalCoords, viewportArea);

    return isIt;
  }
  function getViewportsRightSideCoordinates(viewportArea) {
    const offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET * 2 );

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
/***********************
******* PRIVATE ********
***********************/
function testRectangleIntersect(a, b) {
  return (a.x <= b.x + b.width &&
          b.x <= a.x + a.width &&
          a.y <= b.y + b.height &&
          b.y <= a.y + a.height);
}