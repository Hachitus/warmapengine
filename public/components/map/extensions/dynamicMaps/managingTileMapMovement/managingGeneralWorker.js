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
const METHOD_SHORT = 0;
var viewportArea, changedCoordinates, scale, methodType;

self.addEventListener("message", function (e) {
  var scaledViewport;

  methodType = e.data[0];
  viewportArea = e.data[1];
  scale = e.data[2];

  if (methodType === METHOD_ALL) {
    changedCoordinates = e.data[3];

    try {
      Object.assign( viewportArea, getViewportCoordinates(viewportArea));
      viewportArea.width += Math.round(Math.abs(changedCoordinates.width));
      viewportArea.height += Math.round(Math.abs(changedCoordinates.height));

      scaledViewport = Object.assign({} , applyScaleToViewport(viewportArea, scale) );

      postMessage([scaledViewport]);
    } catch (ev) {
      console.log("ISSUE: ", ev);
    }
  }
});

function getViewportCoordinates(viewportArea) {
  var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET  );

  return {
    x: Math.round( viewportArea.x - offsetSize ),
    y: Math.round( viewportArea.y - offsetSize ),
    x2: Math.round( viewportArea.x + Math.abs( viewportArea.width ) + offsetSize ),
    y2: Math.round( viewportArea.y + Math.abs( viewportArea.height ) + offsetSize ),
    width: Math.round( viewportArea.width + offsetSize * 2 ),
    height: Math.round( viewportArea.height + offsetSize * 2 )
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