#Introduction
War map engine for browsers in development. Project will move forward at its own phase. If interested contact me.

#Readme
##Game development environment
*URL*: warMapEngine.level7.fi

###NodeJS backend
*Requirements*: npm install -g forever, npm install -g browserify, npm install -g babel, npm install -g babelify, npm install -g gulp, npm install-g browserify

*start server* forever start --uid warMapEngine --watchDirectory public startApp.js

*gulp compiler* gulp compile

*gulp watcher* gulp watchAndCompile (unfortunately crashes when errors)

##Tests
node_modules/mocha/bin/mocha --compilers js:mocha-traceur tests/test-spec.js

##Style guide
We use airbnb javascript style guide.
https://github.com/airbnb/javascript/blob/master/README.md#types
There are some exceptions, since we use es6. But be smart with them :)
