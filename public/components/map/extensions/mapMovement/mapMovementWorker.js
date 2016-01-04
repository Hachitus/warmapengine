/* global self, postMessage */

'use strict';

/**
 * This webworker receives array as postMessage. The first index will determine what we do. First index is a value of
 * integer.
 */

/* object.assign polyfill for IE11 */
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

const VIEWPORT_OFFSET = 0.1;
const METHOD_ALL = 1;
var viewportArea, scale, methodType, smallerViewportArea;

/**
 * Calculates the correct current viewport / window area. Arguments are received with postMessage using e.data property
 *
 * @param  {Number} e.data[0]                                         This defines what we want to generate. Now there is only METHOD_ALL
 * @param  {x: Number, y: Number, width: Number, height: Number}      Current viewport area with global coordinates
 * @param  {Number}                                                   Amount of scale / zoom on the map
 * @return {Array}                                                    Array consists of normal calculated viewport and smaller scaled viewport. The properties for both are:
 * {
 *   x: Number, y: Number, x2: Number, y2: Number, width: Number, height: Number
 * }
 */
self.addEventListener("message", function (e) {
  var scaledViewport, smallerScaledViewportArea;

  methodType = e.data[0];
  viewportArea = e.data[1];
  scale = e.data[2];

  if (methodType === METHOD_ALL) {
    try {
      smallerViewportArea = Object.assign( {}, getViewportCoordinates(viewportArea, 0.5));
      Object.assign( viewportArea, getViewportCoordinates(viewportArea));

      scaledViewport = Object.assign({} , applyScaleToViewport(viewportArea, scale) );
      smallerScaledViewportArea = Object.assign({} , applyScaleToViewport(smallerViewportArea, scale) );

      postMessage([scaledViewport, smallerScaledViewportArea]);
    } catch (ev) {
      console.log("ISSUE: ", ev);
    }
  }
});

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