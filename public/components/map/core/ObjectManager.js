import { Quadtree } from './utils/Quadtree';

export class ObjectManager {
  constructor(hitDetector) {
    this.quadtrees = {};
    this.hitDetector = hitDetector || {};
  }
  retrieve(type, coords, size) {
    var quadtreeObjs, foundObjs;

    quadtreeObjs = this.quadtree[type].retrieve(coords, size);
// THESE MIGHT WORK, but we still need the actual hexagon hit detection
//let x = Number(objects.units[0].x);
  //    let y = Number(objects.units[0].y);
      //let { regX, regY } = objects.units[0];

      //let globalCoords = objects.units[0].localToGlobal(x + regX, y + regY);
    foundObjs = quadtreeObjs.filter(obj => {
      return obj.data.hitTest(coords);
    });

    return foundObjs;
  }
  addObject(layerName, hitArea, obj) {
    if(!this.quadtrees[layerName]) {
      throw new Error("Could not add object to objectManager layer, layer not found! (" + layerName + ")");
    }

    return this.quadtrees[layerName].add({
        x: hitArea.x,
        y: hitArea.y
      }, {
        width: hitArea.width,
        height: hitArea.height
      },
      obj
    );
  }
  addLayer(name, area, extra) {
    this.quadtrees[name] = new Quadtree({
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height
      }, {
        objects: extra.objects || 10,
        levels: extra.levels || 5
      });

    return this.quadtrees[name];
  }
  getLayers() {
    return Object.keys(this.quadtrees).map(layerName => {
      return {
        name: layerName,
        data: this.quadtrees[layerName]
      };
    });
  }
}