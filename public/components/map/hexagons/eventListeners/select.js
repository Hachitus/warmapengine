'use strict';

export function setupHexagonClick(map, element, callback) {
  return element.addEventListener("click", function(e) {
    var globalCoords = element.localToGlobal(e.x, e.y);
    var objects;

    objects = map.getObjectsUnderPoint(globalCoords);

    callback(objects);
  });
}