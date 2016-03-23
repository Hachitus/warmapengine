/* global describe, beforeEach, it, expect */
'use strict';

describe("mapDataManipulator => ", function () {
  const MapDataManipulator = window.flatworld.MapDataManipulator;
  const mapLayers = window.flatworld.mapLayers;
  const objects = window.flatworld.objects;
  var layerRules, objectRules, subContainerRules, testLayers, testObjects, testSubContainer;

  beforeEach(function () {
    layerRules = {
      type: "filter",
      object: "layer",
      property: "selectable",
      value: true
    };
    objectRules = {
      type: "filter",
      object: "object",
      property: "name",
      value: "DefaultTerrainObject"
    };
    subContainerRules = {
      type: "filter",
      object: "subContainer",
      property: "selectable",
      value: true
    };
    testLayers = [new mapLayers.MapLayer({
      selectable: false,
      name: "terrainLayer"
    }),
    new mapLayers.MapLayer({
      selectable: true,
      name: "unitLayer"
    }),
    new mapLayers.MapLayer({
      selectable: false,
      name: "unitLayer"
    })];
    testObjects = [
      new objects.ObjectSpriteTerrain(),
      new objects.ObjectSpriteUnit()
    ];
    testSubContainer = [{
      parent: new mapLayers.MapLayer({
        selectable: false,
        name: "terrainLayer"
      })
    },{
      parent: new mapLayers.MapLayer({
        selectable: true,
        name: "unitLayer"
      })
    },{
      parent: new mapLayers.MapLayer({
        selectable: false,
        name: "unitLayer"
      })
    }];
  });

  it("filterLayers", function () {
    var mapDataManipulator = new MapDataManipulator(layerRules);
    var foundLayers;

    foundLayers = mapDataManipulator.filterLayers(testLayers);

    expect(foundLayers[0]).toBe(testLayers[1]);
  });
  it("filterObjects", function () {
    var mapDataManipulator = new MapDataManipulator(objectRules);
    var foundObjects;

    foundObjects = mapDataManipulator.filterObjects(testObjects);

    expect(foundObjects[0]).toBe(testObjects[0]);
  });
  it("filterSubContainers", function () {
    var mapDataManipulator = new MapDataManipulator(subContainerRules);
    var foundObjects;

    foundObjects = mapDataManipulator.filterSubContainers(testSubContainer);

    expect(foundObjects[0]).toBe(testSubContainer[1]);

    foundObjects = mapDataManipulator.filterSubContainers(testSubContainer[1]);

    expect(foundObjects[0]).toBe(testSubContainer[1]);
  });
});