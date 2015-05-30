import { preload } from '/var/www/warMapEngine/public/components/preloading/preloading';

describe("basic map - without plugins", function() {
  var runWhenComplete = false;

  it("=> exists", function(){
    expect(preload).toBeDefined();
  });

  new preload( false )
    .setErrorHandler( preloadErrorHandler )
    //.setProgressHandler( progressHandler )
    .loadManifest( ["assets/img/map/collection.png"])
    .resolveOnComplete()
    .then(runWhenComplete);

  it("=> completes", function(done){
    runWhenComplete = function() {
      done();
    }
  });

    /* ====== private functions, or to be moved elsewhere ====== */
  function preloadErrorHandler(err) {
    console.log("PRELOADER ERROR", err )
  };
});