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
import { preload } from '/var/www/warMapEngine/public/components/preloading/preloading';

/* Read data from files, to use with testing */
import { typeData } from '../public/tests/data/typeData.js';
import { graphicData } from '../public/tests/data/graphics.js';
import { terrainData } from '../public/tests/data/terrainData.js';

/* ====== Tests ====== */
describe("basic map - without plugins", function() {

  describe("=> Test class construction", function() {
    let preloader = preload("/img");

    it("=> is spritesheet", function(){
      expect(preloader instanceof createjs.LoadQueue).to.exist;
    });
  });

  /* ===== Private functions ===== */
});