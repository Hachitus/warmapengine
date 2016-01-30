[![GPLv3 Affero License](http://img.shields.io/badge/license-LGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl.html)

#NOTE, STILL IN DEVELOPMENT!
This engine is still in development. It is not well tested for other uses than the current tests / example game. When the most critical development phase is over, the API will be more locked now. At this stage the API and structure can still change, so if you use the engine for something serious, please take that into account!

Also I am very happy to get feedback on any projects or tests that might be using this engine and very eager to help with getting issues.

#Introduction
2D strategy game engine for browsers. Project will move forward at its own phase. Rough estimation for the bare functionality
of the engine is during 2015.
Development from that forward will still continue in the form of a 2D strategy game.

The development is done in ES6, which should be well enough supported by the time the games made with this framework are done.

If you are interested contact me (http://hyytia.level7.fi/)

#Development data
##Requirements
This is an example install for a fresh Debian 8.0 (Jessie) based virtual server. You may naturally skip any step you wish, if there are alternatives on your server, step you want to perform differently or something you already have on your server. The installation has been tested on upcloud.com servers and works there fine, from start to finish.

Update repositories & install node.js, npm and git

    apt-get update && apt-get install nodejs npm git

Clone the repository and change directory

    git clone https://github.com/Hachitus/warmapengine.git && cd warmapengine

Install package.json packages and JSPM packages. NOTE! Forever is installed as global module!

    npm install

Install bower packages

    nodejs node_modules/bower/lib/bin/bower.js install --allow-root

If you have an issues with forever (type forever on the cmd and see if it gives an error), create symlink:

    ln -s /usr/bin/nodejs /usr/bin/node

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

Plugins need to export the class / object that exposes the init-method as default, like so:
```javascript
export default pluginClass;
```

Also the map engine uses it's own interface to use the normal map functionalities like moving the map (default dragging
the map), selecting units and zooming the map. These are implemented via eventlisteners.js and UI.js core modules.

UI interface is implemented so that map uses the UI.js module to implement API and to that API you pass in the UITheme
module you want to use in the game. All UIThemes have to implement at least the core functionality API (or overwrite
the API, which is naturally not encouraged).

All UI templates need to extend the UI_templateBase @ '/components/map/core/UI_themeBase'

##Events
Unless overridden there are 3 map events fired currently (each in different file in the core or extensions files):
* mapMoved
** Data passed to event: Amount of movement being handled ({ x, y })
* mapZoomed
** Data passed to event: Last scale factor, amount of current zoom to be applied, is is zoom in or out (true / false)
* objectsSelected
** Data passed to event: array of objects selected as data

# Credit
Copyright (c) 2016 Janne Hyytiä