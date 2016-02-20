[![GPLv3 Affero License](http://img.shields.io/badge/license-LGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl.html)

#NOTE, STILL IN DEVELOPMENT!
This engine is still in development. It is not well tested for other uses than the current tests / example game. When the most critical development phase is over, the API will be more locked down. At this stage the API and structure can still change, so if you use the engine for something serious, please take that into account!

Also I am very happy to get feedback on any projects or tests that might be using this engine and very eager to help with getting issues resolved.

#Introduction
2D strategy game engine for browsers. Project will move forward at its own pace. The very core functionality has been done, that practically manages adding the objects to the map, moving the map around and selecting + highlighting objects on the map. Other functionality outside of that, has not yet been done. But rough roadmap for thise exist.

Basically the core functionality will appear mostly in the pace of making a simple example 2D strategy game for the engine. A much later on there will be a full-blown game made based on this, but after the core engine is ready.

The development is done in ES6, which should be well enough supported by the time the games made with this framework are done. I aim to have the supported platforms from IE11+.

If you are interested contact me (http://hyytia.level7.fi/)

#Developing
##Installing on fresh server
This is an example install for a fresh Debian 8.0 (Jessie) based virtual server. You may naturally skip any step you wish, if there are alternatives on your server, step you want to perform differently or something you already have on your server. The installation has been tested on upcloud.com servers and works there fine, from start to finish.

Update repositories & install node.js, npm and git

    apt-get update && apt-get -y install nodejs npm git

Clone the repository and change directory

    git clone https://github.com/Hachitus/warmapengine.git && cd warmapengine

Install package.json packages and JSPM packages. NOTE! Forever is installed as global module!

    npm run init

##Commanding the backend server

start server

    npm run start

stop server

    npm run stop

##Testing and development
Tests can be found with index-file in tests/-folder. For example working example should be found in: *http://warmapengine.level7.fi/tests/*, but naturally on your server it is http://server_address/tests/.

There are no unit tests at the moment, since I didn't find them worth the time and effort as many things in canvas game can not be unit tested easily, I decided to skip them all together for now.

#How the Map engine works
##How to setup simple map
The main module for the whole map is core.map, so you should always primarily look through it's API and then dig deeper. The best examples for setting up a map at the moment is still going through the code. Check the test-files: tests/manualTest.html and tests/manualStressTest.html (which are more comprehensive). They use horizontalHexaFactory to go through the map data and setup objects based on that data. You can use horizontalHexaFactory if you want or setup your own factory and own data structure. Factories always have to follow a certain data structure so they might not be something everyone wants or can cope with.

Simple unfinished example:

	import { Preload } from '/components/preloading/preloading';
	import { ObjectTerrain, ObjectUnit } from "/components/map/extensions/hexagons/Objects";

	preload = new Preload( "", { crossOrigin: false } );
	preload.addResource( "terrainBase.json" );

	preload.resolveOnComplete().then(() => {
		var map, thisLayer, newObject;
		var layerOptions = {
	    	name: "terrainLayer",
	      	drawOutsideViewport: {
	        	x: 100,
	        	y: 100
	      	},
	      	selectable: layerData.name === "unitLayer" ? true : false
	    };
	    var objData = {
          typeData: "typeData,
          activeData: "someData"
        };
        var currentFrame = 1;
        var hexagonRadius = 50;
        var objectOptions = {
            currentFrame,
        	radius: hexagonRadius
        };

		map = new Map(canvasElement, mapOptions );
		dialog_selection = document.getElementById("selectionDialog");
	    defaultUI = new UI_default(dialog_selection, map);

	    /* Initialize UI as singleton */
	    UI(defaultUI, map);

		map.init( pluginsToActivate, startPoint );

		thisLayer = map.addLayer(layerOptions);
		newObject = new ObjectTerrain({ x: 1, y: 1 }, objData, objectOptions);
		thisLayer.addChild(newObject);
	})


##API documentation
*http://hachitus.github.io/warmapengine/documentation/*

##Plugins
The map supports adding plugins and even some of the core functionalities have been implemented as plugins. You must comply to just to a couplr rules. Plugins have a lot of freedom to mess around with the map data, this is subject to change if there are issues with this later on. Plugin objects must have init method and pluginName variable, in the format of:
```javascript

	export const sameNameThatIsExported = setupModuleFunction();

	{
	  pluginName: "sameNameThatIsExported"
	  init: function(map) {
	    // All the functionality e.g. extend map prototype or activate eventListener etc.
	  }
	}

```

Plugins need to export the class / object that exposes the init-method with the same name as pluginName, like so:
```javascript

	export const sameNameThatIsExported = setupModuleFunction();

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

# Sponsors
Thank you to browserstack for providing magnificient testing tools
<a href="www.browserstack.com"><img alt="browserstack logo" src="https://raw.githubusercontent.com/Hachitus/warmapengine/master/nonModuleRelated/browserStackLogo.png" width="150"/></a>
# Credit
Copyright (c) 2016 Janne Hyytiä