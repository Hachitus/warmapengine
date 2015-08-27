/** @require Quadtree-js. Though this base library can be changed easily */

import { Quadtree } from "../../../../assets/lib/quadtree-js/quadtree-js-hitman"
var QuadMod = Quadtree;
var objects;

export class Quadtree {
  Constructor(options, max) {
    var { objects: max_objects, levels: max_levels } = max;

    this.QuadMod = new QuadMod(options, max_objects, max_levels);
  }
  Add(coords, size, data) {
    var objToInsert = _creteQuadtreeObject(coords, size, data);

    QuadMod.Insert(objToInsert);
  }
  Remove(coords, size, data, refresh) {
    var objToRemove = _creteQuadtreeObject(coords, size, data);

    QuadMod.removeObject(objToRemove)
    refresh && QuadMod.Refresh();
  }
  retrieve(coords, size) {
    var hitDimensions = {
      x: coords.x,
      y: coords.y,
      width: size.width,
      height: size.height
    };
    var objects = [];

    objects = QuadMod.retrieve(hitDimensions).map(function(object) {
      return object.data;
    });

     return objects;
  }
  Move(coords, size, data, to) {
    var foundObject = this.findObject(coords, size, data);

    if(foundObject) {
      QuadMod.Remove(foundObject);
      foundObject.x = to.x;
      foundObject.y = to.y;
      QuadMod.Insert(foundObject);
      return true;
    }



    return false;
  }
  RefreshAll() {
    QuadMod.cleanup();
  }
  findObject(coords, size, data, onlyData) {
    var foundObject = this.retrieve(coords, size).filter(function(object) {
      return object.data === data ? true : false;
    });

    return foundObject;
  }
}

function _refreshAll() {

}
function _creteQuadtreeObject(coords = {x:undefined, y:undefined}, size = {width:0, height:0}, data) {
  var objToInsert = coords;

  if(coords.x === undefined && coords.y === undefined) {
    throw new Error("_createQuadtreeObject requires x and y coordinates as parameters");
  }
  objToInsert.width = size.width;
  objToInsert.height = size.height;
  objToInsert.data = data;
}