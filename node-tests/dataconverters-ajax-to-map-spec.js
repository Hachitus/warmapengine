This is meant to test the dataconverter, that will take in ajax calls data (mocked with real ajax connection) and convert
it to a correct format for making a map with map factory


'use strict';

console.log("Just a reminder: Current working directory for tests needs to be the app root");

/* ====== Library imports ====== */
import chai from 'chai';
var expect = chai.expect;
import fs from 'fs';
import { Deferred } from 'es6-deferred';

global.Canvas = require( 'canvas' );
/** node-easel needs really badly the global Image-function, to generate Sprites. Will cause error if not available. */
global.Image = global.Canvas.Image;
global = require( 'node-easel' );

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { MapFactory } from '../public/components/factors/MapFactory.js';

/* Read data from files, to use with testing */
let typeData = JSON.parse(fs.readFileSync("public/tests/data/typeData.js", {encoding: 'utf-8'} ));

let terrainData = dataCoverterForTestData_terrain();

let graphicData = JSON.parse(fs.readFileSync("public/tests/data/graphics.js", {encoding: 'utf-8'} ));

/* ====== Tests ====== */
describe("basic map - without plugins", function() {

  describe("=> Test map construction from test data", function() {

    describe("=> test spritesheet", function() {
      let spritesheet = _reset_spritesheets();

      it("=> is spritesheet", function(){
        expect(spritesheet instanceof createjs.SpriteSheet).to.exist;
        expect(spritesheet._images).to.exist;
      });
    });
  });

  /* ===== Private functions ===== */
  // none
});


/* some functions to help tests */
function dataCoverterForTestData_terrain() {
  let terrainFile = "public/tests/data/terrainData.js";

  let data = fs.readFileSync(terrainFile);

  let jsonedData = JSON.parse(data);
  let retData;

  /* strip the required data to the object and return it */
  retData = jsonedData.objects.terrainBase.map(function(thisData) {
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