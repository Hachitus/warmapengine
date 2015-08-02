#Introduction
2D strategy game engine for browsers. Project will move forward at its own phase. Rough estimation for the engine ~half a year.
Development from that forward will still continue in the form of a 2D strategy war game.

If you are interested contact me.

#Development data
##Game development environment
*warMapEngine.level7.fi/tests/*

###NodeJS backend
*Requirements*: npm install -g forever, npm install -g browserify, npm install -g babel, npm install -g babelify, npm install -g gulp

*start server* npm run start
*stop server* npm run stop

##Tests
Command: *gulp*

#How the module works
##Plugins
Plugins are modules that return an object. Objects have to have init method. Init methods receive used map class instance
So the plugin init method is defined as:
{
  init(map) {}
}
