/* global self, postMessage */

'use strict';

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

const VIEWPORT_OFFSET = 0.15;
var scaledViewport, viewportArea, changedCoordinates, scale;

self.addEventListener("message", function (e) {
  viewportArea = e.data[0];
  changedCoordinates = e.data[1];
  scale = e.data[2];

  try {
    Object.assign( viewportArea, getViewportsRightSideCoordinates(viewportArea));

    if (changedCoordinates.width < 0) {
      Object.assign( viewportArea, getViewportsLeftSideCoordinates(viewportArea));
    }
    if (changedCoordinates.height < 0) {
      Object.assign( viewportArea, getViewportsLeftSideCoordinates(viewportArea));
    }
    viewportArea.width += Math.round(Math.abs(changedCoordinates.width));
    viewportArea.height += Math.round(Math.abs(changedCoordinates.height));

    scaledViewport = Object.assign({} , applyScaleToViewport(viewportArea, scale) );

    /* RESET */
    changedCoordinates.width = 0;
    changedCoordinates.height = 0;

    postMessage([scaledViewport]);
  } catch (ev) {
    console.log("ISSUE: ", ev);
  }
});

function getViewportsRightSideCoordinates(viewportArea) {
  var offsetSize = Math.abs( viewportArea.width * VIEWPORT_OFFSET * 2 );

  return {
    x2: Math.round( viewportArea.x + Math.abs( viewportArea.width ) + offsetSize ),
    y2: Math.round( viewportArea.y + Math.abs( viewportArea.height ) + offsetSize ),
    width: Math.round( viewportArea.width + offsetSize ),
    height: Math.round( viewportArea.height + offsetSize )
  };
}
function getViewportsLeftSideCoordinates(viewportArea) {
  var offsetSize = Math.round(Math.abs( viewportArea.width * VIEWPORT_OFFSET ));

  return {
    x: Math.round( viewportArea.x - offsetSize ),
    y: Math.round( viewportArea.y - offsetSize ),
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