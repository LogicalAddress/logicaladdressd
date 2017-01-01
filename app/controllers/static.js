var AccountKitConfig = require('../../config/accountKit')();
var _ = require('underscore');
var AccountKitGetMobileNumber = require('../lib/accountKit');
var User = require('../models/user');
var UserLib = require('../lib/user');

module.exports = function (app) {

	app.get('/address-verification-service',function (req, res, next) {
		res.render('static/avs', {
			title: "Logical Address | Password Recovery",
			page: 'address-verification-service',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.get('/identity',function (req, res, next) {
		res.render('static/identity', {
			title: "Logical Address | Password Recovery",
			page: 'identity',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
};