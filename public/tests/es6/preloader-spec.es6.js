import { preload } from '/var/www/warMapEngine/public/components/preloading/preloading';

describe("unitTest preloader -> ", function() {
  var runWhenComplete = false;

  it("=> exists", function(){
    expect(preload).toBeDefined();
  });

  it("=> preloader completes", function(done){
    runWhenComplete = function() {
      done();
    }

    let prel = new preload( false );
    prel.setErrorHandler( preloadErrorHandler );
      //.setProgressHandler( progressHandler )
    prel.loadManifest([ {id: "terrain_spritesheet", src:"http://warmapengine.level7.fi/assets/img/map/collection.png"} ]);
    prel.resolveOnComplete()
      .then(runWhenComplete);

  });

    /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err )
  };
});