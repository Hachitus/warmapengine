'use strict';

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
import { createMap } from '../../components/factories/horizontalHexaFactory';
/* Read data from files, to use with testing */
import { gameData } from '../../tests/data/gameData';
import { typeData } from '../../tests/data/typeData';
import { mapData } from '../../tests/data/mapData';
import { preload } from '../../components/preloading/preloading';

/* ===== Import plugins ===== */
import { map_drag } from "../../components/map/core/move/map_drag";
import { map_zoom } from '../../components/map/core/zoom/map_zoom';
import { object_select_hexagon } from '../../components/map/extensions/hexagons/object_select/object_select_hexagon';

window.map = {};

window.testMap = function() {
  var canvasElement = document.getElementById("mapCanvas");

  describe("preloader => ", function(done) {
    var runWhenComplete = false;

    it("=> exists", function(){
      expect(preload).toBeDefined();
    });

    it("=> preloader completes", function(done){
      runWhenComplete = function() {
        let i = 0;
        while(i < 1000000) {
          i++;
          i + i + 2 + "y";
        }
        expect(true).toBeTruthy();
        done();
      };

      let prel = new preload( false );
      prel.setErrorHandler( preloadErrorHandler );
        //.setProgressHandler( progressHandler )
      prel.loadManifest([ {
        id: "terrain_spritesheet",
        src:"http://warmapengine.level7.fi/assets/img/map/collection.png"
      } ]);
      prel.resolveOnComplete()
        .then(runWhenComplete);

    });

      /* ====== private functions, or to be moved elsewhere ====== */
    function preloadErrorHandler(err) {
      console.log("PRELOADER ERROR", err );
    }



  /*
  1. Datat yhdessä pötkössä, kuten tää nykyinen testi-data. Eli noi testit datat tiedostoon ja pitää muuttaa oikeaan muotoon!

  You should use this data instead of the testData below. You should convert this data to suit the standards so that there
  is another class / module that handles the transformation and you define a good set of principle how it's done. Data in this:
  "{
    "objType":2,
    "_id":"53837d49976fed3b240006b3",
    "coord":{"x":0,"y":0}
  }"
  What do we do with the _id and should that be replaced with actual data, when we instantiate the objects.

  Always request data from backend with gameID and turn, like: domain.fi/API/mapData/832948hfdjsh93/1

  /* ====== Tests ====== */
    it("exists", function(done){
      map = createMap(canvasElement, gameData, mapData, typeData);
      expect(map).toBeDefined();
      done();
    });
    it("are stage properties correct?", function(){
      expect(map._stage[0].name === "terrainStage").toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
      expect(map.getChildNamed("terrainStage").name  === "terrainStage").toBeTruthy();
      expect(typeof map.getChildNamed("terrainStage") === "object").toBeTruthy();
    });
    it("are layer properties correct?", function(){
      expect(typeof map.getLayerNamed("unitLayer") === "object").toBeTruthy();
      expect(map.stages[0].children.length > 0).toBeTruthy();
    });
    it("are terrain properties correct?", function(){
      expect(Number( map.getLayerNamed("terrainBaseLayer").children[1].y ) === 141, "y = 141").toBeTruthy();
      expect(map.getLayerNamed("terrainBaseLayer").children.length > 1, "length > 1").toBeTruthy();
    });
    it("unit properties are correct?", function(){
      expect(Number( map.getLayerNamed("unitLayer").children[0].x ) === 82).toBeTruthy();
    });
    it("unit properties are correct", function(done){
      map.init( undefined, undefined, tickDoneFunc );

      function tickDoneFunc(tickDone) {
        done();
      }

      expect( true ).toBeTruthy();


    });
    it("test", function(done) {
      var timeoutter = (function (map) {
        return function() {
          map.stages[0].drawThisChild = true;
          map.drawMap();
          done();
        };
      })(map);

      window.setTimeout(timeoutter, 400);

      expect( true ).toBeTruthy();
    })

    it("re-initialize map with plugins", function(done){
      map = createMap(canvasElement, gameData, mapData, typeData);
      expect(map).toBeDefined();
      done();
    });

    it("unit properties ok", function(done){
      try {
        debugger;
        map.init( [ map_zoom, map_drag, object_select_hexagon ], tickDoneFunc );

        function tickDoneFunc(tickDone) {
          done();
        }

        expect( true ).toBeTruthy();
      } catch(e) {
        console.log("ERROR", e)
      }

    });
  });
}

/* ===== Private functions ===== */
// none

/* some functions to help tests */