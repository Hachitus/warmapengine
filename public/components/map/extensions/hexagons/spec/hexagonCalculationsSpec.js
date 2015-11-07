/* global describe, it, expect, beforeEach, hexagonMath */
'use strict';

import * as hexagonMath from "../utils/hexagonMath.js";

describe("testing hexagonMath", function() {
  var RADIUS = 20;

  it("calcShortDiagonal", function() {
    var shortDiagonal = hexagonMath.calcShortDiagonal(RADIUS);

    expect(Number(shortDiagonal)).toEqual(34.641);
  });
  it("calcLongDiagonal", function() {
    var shortDiagonal = hexagonMath.calcLongDiagonal(RADIUS);

    expect(Number(shortDiagonal)).toEqual(RADIUS * 2);
  });
  it("calcSide", function() {
    var side = hexagonMath.calcSide(RADIUS);

    expect(Number(side)).toEqual(RADIUS);
  });
  it("getHexagonPoints", function() {
    var points = hexagonMath.getHexagonPoints(20);

    expect(epsEqu(points[0].x, 17.321)).toEqual(true, "0.y: 17.321 === " + points[0].x);
    expect(epsEqu(points[0].y, 10)).toEqual(true, "0.y: 10 === " + points[0].y);

    expect(epsEqu(points[1].x, 0)).toEqual(true, "1.x: 0 === " + points[1].x);
    expect(epsEqu(points[1].y, 20)).toEqual(true, "1.y: 20 === " + points[1].y);

    expect(epsEqu(points[2].x, 17.321)).toEqual(true, "2.x: 17.321 === " + points[2].x);
    expect(epsEqu(points[2].y, 10)).toEqual(true, "2.y: 10 === " + points[2].y);

    expect(epsEqu(points[3].x, 17.321)).toEqual(true, "3.x: 17.321 === " + points[3].x);
    expect(epsEqu(points[3].y, -10)).toEqual(true, "3.y: -10 === " + points[3].y);

    expect(epsEqu(points[4].x, 0)).toEqual(true, "4.x: 0 === " + points[4].x);
    expect(epsEqu(points[4].y, -20)).toEqual(true, "4.y: -20 === " + points[4].y);

    expect(epsEqu(points[5].x, 17.321)).toEqual(true, "5.x: 17.321 === " + points[5].x);
    expect(epsEqu(points[5].y, -10)).toEqual(true, "5.y: -10 === " + points[5].y);

    expect(epsEqu(points[6].x, 17.321)).toEqual(true, "6.x: 17.321 === " + points[6].x);
    expect(epsEqu(points[6].y, 10)).toEqual(true, "6.y: 10 === " + points[6].y);

    function epsEqu(x, y) {
      return ( Math.abs(x) - Math.abs(y) ) < 0.01;
    }
  });
  describe("hexaHitTests => ", function() {
    var points = hexagonMath.getHexagonPoints(20);
    var hitCoords = {
      x: 20,
      y: 10
    };
    var offsetCoords = {
      x: 10,
      y: 20
    };
    var isHit;

    beforeEach(function() {
      points = hexagonMath.getHexagonPoints(20);
      hitCoords = {
        x: 20,
        y: 10
      };
      offsetCoords = {
        x: 10,
        y: 20
      };
      isHit = false;
    });

    it("test1 => ", function(done) {
      isHit = hexagonMath.hexaHitTest(points, hitCoords, offsetCoords);

      expect(isHit).toEqual(true, "not hit! with:", offsetCoords, hitCoords);

      done();
    });
    it("test2 => ", function(done) {
      offsetCoords = {
        x: 100,
        y: 20
      };
      isHit = hexagonMath.hexaHitTest(points, hitCoords, offsetCoords);

      expect(isHit).toEqual(false, "not hit! with:", offsetCoords, hitCoords);

      done();
    });
    it("test3 => ", function(done) {
      hitCoords = {
        x: 100,
        y: 20
      };
      isHit = hexagonMath.hexaHitTest(points, hitCoords, offsetCoords);

      expect(isHit).toEqual(false, "not hit! with:", offsetCoords, hitCoords);

      done();
    });
  });
});