#Introduction
2D strategy game engine for browsers. Project will move forward at its own phase. Rough estimation for the engine ~half a year.
Development from that forward will still continue in the form of a 2D strategy war game.

If you are interested contact me.

#Development data
##NodeJS backend
##Requirements
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
  init: function(map) {}
}
```

