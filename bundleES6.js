var stealTools = require("steal-tools");

var promise = stealTools.build({
  main: "public/tests/es6/map-spec.es6",
  bundlesPath: "public/dist/es6",
  bundleDepth: "5",
  mainDepth: "5"
},{
  minify: false,
  debug: true,
  bundleSteal: true
});