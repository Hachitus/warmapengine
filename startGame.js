// async stack traces
require('longjohn');

// Express dependencies
var express = require('express');

// App setup
var app = express();

app.use("/", express.static(__dirname + '/public/'));
app.listen(9001);