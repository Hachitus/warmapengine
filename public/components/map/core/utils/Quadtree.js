/** @require Quadtree-js. Though this base library can be changed easily */

import { Quadtree as QuadMod } from "../../../../assets/lib/quadtree-js/quadtree-js-hitman";

export class Quadtree {
  constructor(options, max) {
    var { objects: max_objects, levels: max_levels } = max;

    this.quadtree = new QuadMod(options, max_objects, max_levels);
  }
  add(coords, size, data) {
    var objToAdd = _creteQuadtreeObject(coords, size, data);

    this.quadtree.insert(objToAdd);
  }
  remove(coords, size, data, refresh) {
    var objToRemove = _creteQuadtreeObject(coords, size, data);

    this.quadtree.removeObject(objToRemove);
    refresh && this.quadtree.cleanup();
  }
  retrieve(coords, size) {
    var hitDimensions = {
      x: coords.x,
      y: coords.y,
      width: size ? size.width : 0,
      height: size ? size.height : 0
    };
    var objects = [];

    objects = this.quadtree.retrieve(hitDimensions).map(function(object) {
      return object.data;
    });

     return objects;
  }
  move(coords, size, data, to) {
    var foundObject = this.findObject(coords, size, data);

    if(foundObject) {
      this.quadtree.removeObject(foundObject);
      foundObject.x = to.x;
      foundObject.y = to.y;
      this.quadtree.insert(foundObject);
      this.refreshAll();
      return true;
    }

    return false;
  }
  refreshAll() {
    this.quadtree.cleanup();
  }
  findObject(coords, size, data, onlyData) {
    var foundObject = this.retrieve(coords, size).filter(function(object) {
      return object.data === data ? true : false;
    });

    return foundObject;
  }
}

function _creteQuadtreeObject(coords = {x:undefined, y:undefined}, size = {width:0, height:0}, data) {
  var objToAdd = coords;

  if(coords.x === undefined && coords.y === undefined) {
    throw new Error("_createQuadtreeObject requires x and y coordinates as parameters");
  }
  objToAdd.width = size.width;
  objToAdd.height = size.height;
  objToAdd.data = data;

  return objToAdd;
}