var config = require('../../../config/config');
var mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

db.on('connected', function () {
	db.connected = true;
  	console.log('connected to database at ' + config.db);
});

module.exports = db;