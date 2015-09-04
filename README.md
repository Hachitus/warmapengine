#Introduction
2D strategy game engine for browsers. Project will move forward at its own phase. Rough estimation for the engine ~half a year.
Development from that forward will still continue in the form of a 2D strategy game.

If you are interested contact me (http://hyytia.level7.fi/)

#Development data
##NodeJS backend
##Requirements
Install node.js and npm
    apt-get install nodejs npm
Rather install these packages as global
    npm install -g forever gulp
start server
    npm run start
stop server
    npm run stop

##Tests
compile and transpile to ES5
    gulp
compiled code in *warMapEngine.level7.fi/tests/*

#How the Map engine works
##Plugins
Plugins are modules that when imported return an object. The modules work in ES6-format.
Plugin objects have to have init method, in the format of:
```javascript
{
  init: function(map) {
    // All the functionality e.g. extend map prototype or activate eventListener etc.
  }
}
```
Also the map engine uses it's own interface to use the normal map functionalities like moving the map (default dragging
the map), selecting units and zooming the map. These are implemented via eventlisteners.js and UI.js core modules.

UI interface is implemented so that map uses the UI.js module to implement API and to that API you pass in the UITheme
module you want to use in the game. All UIThemes have to implement at least the core functionality API (or overwrite
the API, which is naturally not encouraged). The UI module can be extended with plugins.