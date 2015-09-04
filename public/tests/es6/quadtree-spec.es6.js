/* @require quadtree-js-hitman */

describe("unitTest quadtree -> ", function() {
  var [ bounds, max_objects, max_levels, level ] = [ {x:0, y:0, width: 500, height:500}, 10, 4, undefined];
  var quadtree = new Quadtree(bounds, max_objects, max_levels, level);

  it("=> ... ", function(){
    expect(quadtree).toBeDefined();
  });
});