

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});


var app = express();

require('./config/express')(app, config);

// Add push notifications
var pushLibs= glob.sync(config.root + '/app/push_notification/*.js');
pushLibs.forEach(function (pushLib) {
	require(pushLib);
});

app.listen(process.env.PORT || config.port);

