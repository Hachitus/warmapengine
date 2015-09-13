import { Quadtree } from './utils/Quadtree';

export class ObjectManager {
  constructor(hitDetector) {
    if(!hitDetector) {
      throw new Error("Requires hit detector as parameter!");
    }
    this.quadtrees = {};
    this.hitDetector = new PIXI.interaction.InteractionManager(hitDetector);
  }
  retrieve(type, coords, size) {
    var quadtreeObjs, foundObjs, isHit;

    quadtreeObjs = this.quadtrees[type].retrieve(coords, size);
    foundObjs = quadtreeObjs.filter(obj => {
      return this.hitTest(obj, coords);
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
      })

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
  hitTest(obj, coordinates, offsetCoords) { return "need to be implemented by another module"; }
}