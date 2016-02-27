var config = require('../../config/config');
module.exports = function(){
	return "http://localhost:" + config.port;
};