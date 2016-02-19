/* global console */
'use strict';

/*-----------------------
--------- IMPORT --------
-----------------------*/
import { mapEvents } from 'bundles/coreBundle';
import { arrays } from 'components/utilities/general';

/*-----------------------
------- VARIABLES -------
-----------------------*/
var viewportWorker = new Worker("/components/map/extensions/mapMovement/mapMovementWorker.js");
/*-----------------------
---------- API ----------
-----------------------*/
/* For debugging. This will show up if the plugin fails to load in Map.js */
export const mapMovement = setupMapMovement();

/*-----------------------
-------- PUBLIC ---------
-----------------------*/
/** This module manages visibility of the objects, based on are they visible to the player (on the canvas / webgl) or outside of it. This makes the map a lot faster and reliable resource-wise and lags otherwise. Requires subcontainers atm.
 *
 * @class mapMovement
 **/
function setupMapMovement () {
  const VIEWPORT_OFFSET = 0.15;
  const CHECK_INTERVAL = 20;
  var queue = {};
  var changedCoordinates = {
    width: 0,
    height: 0
  };
  var map;

  return {
    init,
    pluginName: "mapMovement",
    addAll,
    check,
    startEventListeners
  };
  /**
   * Ínitialize as a plugin
   *
   * @method init
   * @param  {Map} map     Instance of Map
   */
  function init(givenMap) {
    map = givenMap;

    addAll();
    startEventListeners();
    map.drawOnNextTick();
    /**
     * For debugging. Shows the amount of currectly active and inactive subcontainers. Console.logs the data. Also extends window object.
     *
     * @method window.FlaTWorld_mapMovement_subCheck
     * @static
     */
    window.FlaTWorld_mapMovement_subCheck = function() {
      map.getPrimaryLayers().forEach( layer => {
        var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());
        var visibleContainers, invisibleContainers;

        visibleContainers = subcontainers.filter(subcontainer => {
          return subcontainer.visible;
        });
        invisibleContainers = subcontainers.filter(subcontainer => {
          return !subcontainer.visible;
        });

        console.log("visible subcontainers: " + visibleContainers.length + ":" +visibleContainers, "\n\ninvisible: " + invisibleContainers.length + ":" + invisibleContainers);
      });
    }
    /**
     * For debugging. Sets all primaryLayers subcontainers on the map as visible = true.
     *
     * @method window.FlaTWorld_mapMovement_deactivate
     * @static
     */
    window.FlaTWorld_mapMovement_deactivate = function() {
      map.getPrimaryLayers().forEach( layer => {
        var subcontainers = arrays.flatten2Levels(layer.getSubcontainers());
        var visibleContainers, invisibleContainers;

        visibleContainers = subcontainers.forEach(subcontainer => {
          subcontainer.visible = false;
        });
      });
    }
  }
  /**
   * Ínitialize as a plugin
   *
   * @method addAll
   * @param  {Map} map     Instance of Map
   */
  function addAll() {
    var scale = map.getZoom();
    var viewportArea;

    viewportArea = map.getViewportArea();
    Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea) );
    Object.assign( viewportArea , applyScaleToViewport(viewportArea, map.getZoom()) );

    map.getPrimaryLayers().forEach( layer => {
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
   * This uses webWorkers. They seemed to speed up the check, when timing with performance.now.
   *
   * @method check
   * @param  {Map} map        The current Map instance
   * @return {Boolean}        True
   */
  function check() {
    if (queue.processing) {
      return false;
    }
    queue.processing = true;

    let viewportFn = setupHandleViewportArea(queue, changedCoordinates);
    window.setTimeout(viewportFn, CHECK_INTERVAL);

    function setupHandleViewportArea(queue, changedCoordinates) {
      var methodType = 1;
      var viewportArea, scale;

      viewportArea = map.getViewportArea();
      scale = map.getZoom();

      smallerViewportArea = Object.assign( {}, getViewportCoordinates(viewportArea, 0.5));
      Object.assign( viewportArea, getViewportCoordinates(viewportArea));

      scaledViewport = Object.assign({} , applyScaleToViewport(viewportArea, scale) );
      smallerScaledViewportArea = Object.assign({} , applyScaleToViewport(smallerViewportArea, scale) );

      viewportWorkerOnMessage(scaledViewport, smallerScaledViewportArea);
    }

    return;
  }
  /**
   * @method startEventListeners
   * @param  {Map} map     Instance of Map
   */
  function startEventListeners() {
    mapEvents.subscribe("mapMoved", moveCb);
    mapEvents.subscribe("mapResized", resizeCb);

    function moveCb(type) {
      var movedCoordinates = type.customData[0];

      changedCoordinates.width += movedCoordinates.x;
      changedCoordinates.height += movedCoordinates.y;
      mapMovement.check(map);
    }
    function resizeCb() {
      mapMovement.check(map);
    }
  }
  /*-----------------------
  -------- PRIVATE --------
  -----------------------*/
  /**
   * @private
   * @static
   * @method isObjectOutsideViewport
   * @param  {Object}  object                 Object / layer we are testing
   * @param  {Object} viewportArea            ViewportArea location and size
   * @param  {Integer} viewportArea.x         X coordinate
   * @param  {Integer} viewportArea.y         Y coordinate
   * @param  {Integer} viewportArea.width     Viewports width (in pixels)
   * @param  {Integer} viewportArea.height    Viewports height (in pixels)
   * @param  {Boolean} hasParent              default = true
   * @param  {Number}  scale                  default = 1 (equals to no defaul scale / no scale)
   * @return {Boolean}
   */
  function isObjectOutsideViewport(object, viewportArea, hasParent = true, scale = 1) {
    var isIt, globalCoords;

    globalCoords = object.getSubcontainerArea(scale, { toGlobal: hasParent });

    isIt = !testRectangleIntersect(globalCoords, viewportArea);

    return isIt;
  }
  /**
   * @private
   * @static
   * @method getViewportsRightSideCoordinates
   * @private
   * @param  {Object} viewportArea            ViewportArea location and size
   * @param  {Integer} viewportArea.x         X coordinate
   * @param  {Integer} viewportArea.y         Y coordinate
   * @param  {Integer} viewportArea.width     Viewports width (in pixels)
   * @param  {Integer} viewportArea.height    Viewports height (in pixels)
   */
  function getViewportsRightSideCoordinates(viewportArea) {
    const offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET * 2 );

    return {
      x2: Math.round( viewportArea.x + Math.abs( viewportArea.width ) + offsetSize ),
      y2: Math.round( viewportArea.y + Math.abs( viewportArea.height ) + offsetSize ),
      width: Math.round( viewportArea.width + offsetSize ),
      height: Math.round( viewportArea.height + offsetSize )
    };
  }
  /**
   * Calculates and modifies coordinates and size according to current scale / zoom on the map.
   *
   * @private
   * @static
   * @method applyScaleToViewport
   * @private
   * @param  {Object} viewportArea            ViewportArea location and size
   * @param  {Integer} viewportArea.x         X coordinate
   * @param  {Integer} viewportArea.y         Y coordinate
   * @param  {Integer} viewportArea.width     Viewports width (in pixels)
   * @param  {Integer} viewportArea.height    Viewports height (in pixels)
   * @param {Number} scale
   */
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
  /**
   * The onmessage callback that handles things after we get reply from the worker
   *
   * @param  {Object} e   Event object from worker
   */
  function viewportWorkerOnMessage(scaledViewport, smallerScaledViewport) {
    const thisMap = map; // Just to keep reference closer than top of the scope
    var containersUnderChangedArea = [];
    var isOutside, scaledAndChangedViewport, usesCache, scale;
    scale = thisMap.getZoom();
    usesCache = thisMap.isCacheActivated();

    scaledAndChangedViewport = Object.assign({}, scaledViewport);

    scaledAndChangedViewport.width += Math.round(Math.abs(changedCoordinates.width));
    scaledAndChangedViewport.height += Math.round(Math.abs(changedCoordinates.height));

    /* RESET */
    changedCoordinates.width = 0;
    changedCoordinates.height = 0;

    containersUnderChangedArea = thisMap.getPrimaryLayers().map(layer => {
      return layer.getSubcontainersByCoordinates(scaledAndChangedViewport);
    });
    containersUnderChangedArea = arrays.flatten2Levels(containersUnderChangedArea);

    containersUnderChangedArea.forEach((thisContainer) => {
      isOutside = isObjectOutsideViewport(thisContainer, smallerScaledViewport, true, scale);

      if (isOutside) {
        thisContainer.visible = false;
      } else {
        thisContainer.visible = true;
      }

    });

    queue.processing = false;

    map.drawOnNextTick();

  }
  /**
   * forms the total viewport parameters based on the given ones.
   *
   * @private
   * @static
   * @method getViewportCoordinates
   * @param  {AreaSize} viewportArea          Given viewport area
   * @param  {Number} offsetQuantifier        How big offset we match against
   * @return {totalViewportArea}              The total viewportArea
   */
  function getViewportCoordinates(viewportArea, offsetQuantifier) {
    var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET  );
    offsetQuantifier = offsetQuantifier || 1;

    return {
      x: Math.round( viewportArea.x - offsetSize * offsetQuantifier ),
      y: Math.round( viewportArea.y - offsetSize * offsetQuantifier ),
      x2: Math.round( viewportArea.x + Math.abs( viewportArea.width ) + offsetSize * offsetQuantifier ),
      y2: Math.round( viewportArea.y + Math.abs( viewportArea.height ) + offsetSize * offsetQuantifier ),
      width: Math.round( viewportArea.width + offsetSize * 2 * offsetQuantifier ),
      height: Math.round( viewportArea.height + offsetSize * 2 * offsetQuantifier )
    };
  }
  /**
   * @private
   * @static
   * @method applyScaleToViewport
   * @param  {AreaSize} viewportArea
   * @param  {Number} scale             Map scale atm.
   * @return {totalViewportArea}        The total viewportArea
   */
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
/*-----------------------
-------- PRIVATE --------
-----------------------*/
/**
 * @private
 * @static
 * @method testRectangleIntersect
 */
function testRectangleIntersect(a, b) {
  return (a.x <= b.x + b.width &&
          b.x <= a.x + a.width &&
          a.y <= b.y + b.height &&
          b.y <= a.y + a.height);
}