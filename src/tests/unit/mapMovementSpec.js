/* global flatworld, describe, beforeEach, it, expect */
'use strict';

describe("mapMovement extension => ", function () {
  var subcontainerArea;
  var subContainer = {
    getSubcontainerArea: function () {
      return subcontainerArea;
    }
  };
  var viewportArea;

  beforeEach(function () {
    viewportArea = {
      x: 50,
      y: 50,
      width: 500,
      height: 500
    };
    subcontainerArea = {
      x: 0,
      y: 0
    };
    flatworld.extensions.mapMovement._testObject._setMap({
      drawOnNextTick: function () {
        return true;
      }
    });
  });

  it("getViewportCoordinates", function () {
    var calculatedViewportArea;

    calculatedViewportArea = flatworld.extensions.mapMovement._testObject.getViewportCoordinates(viewportArea, {
      scale: 0.9
    });
    expect(calculatedViewportArea).toEqual({
      x: -61,
      y: -61,
      x2: 717,
      y2: 717,
      width: 778,
      height: 778
    });
  });
  it("viewportWorkerOnMessage", function (done) {
    var subcontainers = [{
      visible: undefined
    }];
    var primaryLayers = [{
      getSubcontainersByCoordinates: function () {
        return subcontainers;
      }
    }];
    var calculatedViewportArea;

    calculatedViewportArea = flatworld.extensions.mapMovement._testObject.viewportWorkerOnMessage(viewportArea, primaryLayers);

    calculatedViewportArea.then(() => {
      expect(subcontainers[0].visible).toEqual(true);
    }).then(done);
  });
  it("testRectangleIntersect", function () {
    var calculatedViewportArea;

    calculatedViewportArea = flatworld.extensions.mapMovement._testObject.testRectangleIntersect(viewportArea);
    expect(calculatedViewportArea).toEqual({
      x: -200,
      y: -200,
      x2: 800,
      y2: 800,
      width: 1000,
      height: 1000
    });
  });
  it("isObjectOutsideViewport", function () {
    var isOutside, isNotOutside;

    isOutside = flatworld.extensions.mapMovement._testObject.isObjectOutsideViewport(subContainer, viewportArea);
    expect(isOutside).toBe(true, "should be outside viewport");

    subcontainerArea = {
      x: 100,
      y: 100,
      width: 800,
      height: 800
    };
    isNotOutside = flatworld.extensions.mapMovement._testObject.isObjectOutsideViewport(subContainer, viewportArea);
    expect(isNotOutside).toBe(false, "should be outside viewport");

    subcontainerArea = {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };
    isNotOutside = flatworld.extensions.mapMovement._testObject.isObjectOutsideViewport(subContainer, viewportArea);
    expect(isNotOutside).toBe(false, "should be inside viewport");
  });
});