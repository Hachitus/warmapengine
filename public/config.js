/* global System */

'use strict';

System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    optional: [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    babel: "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "blueimp-md5": "npm:blueimp-md5@1.1.1",
    "core-js": "npm:core-js@1.1.4",
    css: "github:systemjs/plugin-css@0.1.17",
    json: "github:systemjs/plugin-json@0.1.0",
    text: "github:systemjs/plugin-text@0.0.2",
    "github:jspm/nodelibs-process@0.1.1": {
      process: "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.24": {
      process: "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      fs: "github:jspm/nodelibs-fs@0.1.2",
      process: "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
