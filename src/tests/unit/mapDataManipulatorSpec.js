/* global describe, beforeEach, it, expect */
'use strict';

describe("mapDataManipulator => ", function () {
  const MapDataManipulator = window.flatworld.mapDataManipulator;
  const mapLayers = window.flatworld.mapLayers;
  var rules, testLayers;

  beforeEach(function () {
    rules = {
    };
    testLayers = [new mapLayers.MapLayer({
      selectable: true
    }),
    new mapLayers.MapLayer({
      selectable: false
    }),
    new mapLayers.MapLayer({
      selectable: true
    })];
  });

  it("Tsuipaduipa", function () {
    var mapDataManipulator = new MapDataManipulator(rules);
    var foundLayers;

    foundLayers = mapDataManipulator.filter(testLayers);

    expect(foundLayers).toEqual([foundLayers[0], foundLayers[2]]);
  });
});