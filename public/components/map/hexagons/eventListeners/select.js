'use strict';

export function setupHexagonClick(map, element, callback) {
  return element.addEventListener("stagemousedown", function(e) {
    var globalCoords = element.localToGlobal(e.stageX, e.stageY);
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if(objects && objects.length > 0) {
      callback(objects);
    }
  });
}