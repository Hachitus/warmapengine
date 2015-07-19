'use strict';

console.log("Just a reminder: Current working directory for tests needs to be the app root");

/* ====== Library imports ====== */
import chai from 'chai';
var expect = chai.expect;
import { Deferred } from 'es6-deferred';

global.Canvas = require( 'canvas' );
/** node-easel needs really badly the global Image-function, to generate Sprites. Will cause error if not available. */
global.Image = global.Canvas.Image;
global = require( 'node-easel' );

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { Map } from '../public/components/map/core/Map';
import { Map_stage } from '../public/components/map/core/Map_stage.js';
import { Map_layer } from '../public/components/map/core/Map_layer.js';
import { Objects_sprite } from '../public/components/map/core/Objects.js';

/* Read data from files, to use with testing */
import { typeData } from '../public/tests/data/typeData.js';
import { graphicData } from '../public/tests/data/graphics.js';
import { importedTerrainData } from '../public/tests/data/terrainData.js';

var terrainData = dataCoverterForTestData_terrain(importedTerrainData);

/* ====== Tests ====== */
function testMap() {
  describe("basic map - without plugins", function() {

    describe("=> Test class construction", function() {

      describe("=> test spritesheet", function() {
        var spritesheet = _reset_spritesheets();

        it("=> is spritesheet", function(){
          expect(spritesheet instanceof createjs.SpriteSheet).to.exist;
          expect(spritesheet._images).to.exist;
          expect(spritesheet.animations).to.exist;
        });
      });

      describe("=> test sprite", function() {
        var spritesheet = _reset_spritesheets();
        var sprite = _reset_sprites(spritesheet);

        it("=> is Sprite", function(){
          expect(sprite[0] instanceof createjs.Sprite).to.be.true;
        });
        it("=> x is 1", function(){
          expect(sprite[0].x).to.equal(1);
        });
      });

      describe("=> test layer", function() {
        var layers = _reset_layers();

        it("=> is Container", function(){
          console.log("HAA", new createjs.Container().addChild);
          expect(layers[0] instanceof createjs.Container).to.be.true;
          expect(layers[1] instanceof createjs.Container).to.be.true;
          expect(layers[2] instanceof createjs.Container).to.be.true;
        });
      });

      describe("=> test stage", function() {
        var stages = _reset_stages();

        it("=> is Stage", function(){
          expect(stages[0] instanceof createjs.Stage).to.be.true;
        });
        it("=> has addChild", function(){
          expect(typeof stages[0].addChild === "object").to.be.true;
        });
      });

      describe("=> test Map", function() {
        var map = _reset_map();

        it("=> is map", function(){
          expect(map instanceof Map).to.exist;
          expect(map.init).to.exist;
          expect(map.drawMap).to.exist;
        });
      });

    });

    /* ===== Testing map class ===== */
    describe("=> Map class", function() {
      var all = _resetVariables();

      describe("=> addStage and getChildNamed", function() {

        all.map.addStage(all.stages[0]);

        it("=> getChildNamed", function() {
          expect(all.map.getChildNamed("first") instanceof createjs.Stage).to.be.true;
        });

        var sizeFromMap;
        it("=> init and get size", function() {
          all.map.init({
            mapSize: new createjs.Rectangle(0,0,1,1)
            });
          sizeFromMap = all.map.getSize();

          expect(sizeFromMap instanceof createjs.Rectangle).to.be.true;
          expect(sizeFromMap.width === 1).to.be.true;
          expect(sizeFromMap.height === 1).to.be.true;
          expect(sizeFromMap.y === 0).to.be.true;
        });
        it("=> setSize", function() {
          all.map.setSize(0,0,70,70);
          sizeFromMap = all.map.getSize();
          expect(sizeFromMap.width === 70).to.be.true;
          expect(sizeFromMap.height === 70).to.be.true;
          expect(sizeFromMap.y === 0).to.be.true;
        });

        it("=> draw map", function() {
          all.map.init();

          all.map.drawMap();
        });


      });
    });

  /* ===== Test class inits ===== */

    describe("=> testing map (success)", function() {
      var all = _resetVariables();

      var layer = _createLayers(all.layerSize, all.layerObjects);
      all.stages[0].addChild(layer);

      all.map.init();
      all.map.addStage(...all.stages);

      it("=> map should hold createjs.Stage", function() {
        expect(all.map.stages[0] instanceof createjs.Stage).to.be.true;
      });
      it("=> stage should hold createjs.Containers", function() {
        expect(all.map.stages[0].children[0] instanceof createjs.Container).to.be.true;
      });
    });

    describe("=> initialize layers (success)", function() {
      var all = _resetVariables();

      //Create the canvas to draw to
      var canvas = new Canvas( 980, 580 );

      var layer = _createLayers(all.layerSize, all.layerObjects);
      all.stages[0].addChild(layer);

      it("=> initialize map errorenously", function() {
        all.map.init();
        all.map.addStage(all.stage);

        expect(all.map.children).to.not.be.true;
      });
      it("=> initialize layer errorenously", function() {
        layer.removeAllChildren();

        expect(layer.children).to.not.be.true;
      });
    });

    /* ===== Private functions ===== */
    function _createLayers(layerSize, layerObjects) {
      var layer = new Map_layer();

      layer.addChild(...layerObjects);

      return layer;
    }
  });


  /* ==== Function that basically does the same as beforeEach should do, but it didn't work correctly ===== */
  function _reset_spritesheets() {
    var spritesheetData = graphicData.terrain;

    return new createjs.SpriteSheet(spritesheetData);
  }
  function _reset_sprites(spriteSheet) {
    var sprites = [];

    sprites.push(
      new Objects_sprite(
        { x:1, y:1 },
        {},
        {
          spritesheet: spriteSheet,
          currentFrameNumber: typeIndexToData(terrainData[0].objType).image
        }
      )
    );

    sprites.push(
      new Objects_sprite(
        { x:20, y:20 },
        {},
        {
          spritesheet: spriteSheet,
          currentFrameNumber: typeIndexToData(terrainData[1].objType).image
        }
      )
    );

    return sprites;
  }
  function _reset_layers() {
    return [
      new Map_layer("layer3"),
      new Map_layer("layer3"),
      new Map_layer("layer3")
    ];
  }
  function _reset_stages() {
    var canvas = new Canvas( 980, 580 );
    var canvas2 = new Canvas( 980, 580 );

    return [
      new Map_stage("first", canvas),
      new Map_stage("second", canvas2)
    ]
  }
  function _reset_map(...args) {
    return new Map(...args);
  }
  function _resetVariables() {
    var objects = [];
    var stages = _reset_stages();
    var layerObjects = _reset_layers();
    var spriteSheet = _reset_spritesheets();
    var sprites = _reset_sprites( spriteSheet );
    var map = _reset_map({ x: 100, y:100 });

    return {
      layerObjects,
      spriteSheet,
      sprites,
      map,
      stages
    };
  }

  /* some functions to help tests */
  function dataCoverterForTestData_terrain(importedTerrainData) {
    var retData;

    /* strip the required data to the object and return it */
    retData = importedTerrainData.objects.terrainBase.map(function(thisData) {
      return {
        objType: thisData.objType,
        _id: thisData._id,
        coord: thisData.coord
      };
    });

    return retData;
  }

  function typeIndexToData(objType) {
    return typeData.unit[objType];
  }
}