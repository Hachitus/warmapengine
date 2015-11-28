[![GPLv3 Affero License](http://img.shields.io/badge/license-LGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl.html)

#Introduction
2D strategy game engine for browsers. Project will move forward at its own phase. Rough estimation for the bare functionality
of the engine is during 2015.
Development from that forward will still continue in the form of a 2D strategy game.

The development is done in ES6, which should be well enough supported by the time the games made with this framework are done.

If you are interested contact me (http://hyytia.level7.fi/)

#Development data
##Requirements
This is an example install for a fresh debian based virtual server (tested). You may naturally skip any step you wish, if there are alternatives on your server, step you want to perform differently or something you already have on your server.

Install node.js and npm

    apt-get install nodejs npm git

Rather install these packages as global

    npm install -g forever

If you have issues with forever (type forever and enter on the cmd):

    ln -s /usr/bin/nodejs /usr/bin/node

or

    apt-get install nodejs-legacy

Clone the repository

    git clone [url to this repository]

change to the repository

    cd [installed repository path]

Install package.json packages

    npm install

Install jspm packages

    nodejs node_modules/jspm/jspm.js install

##Commanding the backend server

start server

    npm run start

stop server

    npm run stop

##Testing and development
Tests can be found with index-file in tests/-folder. For example working example should be found in: *http://warmapengine.level7.fi/tests/*

But naturally on your server it is http://server_address/tests/

#How the Map engine works
##How to setup simple map
Unfortunately this instruction is not yet available. As the map is more finished and refactored, you will get the instructions. Now if you have the energy. See through the tests e.g. tests/pixi_manualTest.html or pixi_manualStressTest.html, which have the fully working map prototype.
##Plugins
Plugin objects have to have init method, in the format of:
```javascript
{
  init: function(map) {
    // All the functionality e.g. extend map prototype or activate eventListener etc.
  }
}
```

Plugins need to export pluginName-variable, like so:
```javascript
export var pluginName = "thisPluginName";
```

Also the map engine uses it's own interface to use the normal map functionalities like moving the map (default dragging
the map), selecting units and zooming the map. These are implemented via eventlisteners.js and UI.js core modules.

UI interface is implemented so that map uses the UI.js module to implement API and to that API you pass in the UITheme
module you want to use in the game. All UIThemes have to implement at least the core functionality API (or overwrite
the API, which is naturally not encouraged).

All UI templates need to extend the UI_templateBase @ '/components/map/core/UI_templateBase'