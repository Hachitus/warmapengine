/* global require, __dirname */
'use strict';

// async stack traces. Had dependency issues on new installations for this, so disabled for now.
//require('longjohn');

// Express dependencies
var express = require('express');

// App setup
var app = express();

app.use("/", express.static(__dirname + '/public/'));
app.listen(9001);