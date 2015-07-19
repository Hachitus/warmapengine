'use strict';

export function setupHexagonClick(map, element, callback) {
  return element.addEventListener("click", function(e) {
    var globalCoords = element.localToGlobal(e.x, e.y);
    var objects, centerCoords;

    centerCoords = map.toHexaCenterCoord(globalCoords.x, globalCoords.y);
    objects = map.getObjectsUnderPoint(map.stages, centerCoords);

    callback(objects);
  });
}