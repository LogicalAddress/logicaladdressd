var UserLib = require('../lib/user');
var Business = require('../models/business');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');

module.exports = function (app) {


/**
@api {post} /api/v1/business Get business information
@apiName PostBusiness
@apiGroup Business
@apiDescription Create company's business location
*/

	app.post('/api/v1/business', function (req, res, next) {

		var user = req.paygis.user;
		var businessData = req.body;

		Business.createRecord(user, businessData, function(err, record){

			if (record) {
				res.status(200);
				return res.json({status: true, data: record});
			}else{
				res.status(404);
				return res.json({status: false, reason: err});
			}

		});
	});


/**
@api {get} /api/v1/business Get business information
@apiName GetBusiness
@apiGroup Business
@apiDescription Get user's business location
*/

	app.get('/api/v1/business', function (req, res, next) {

		var user = req.paygis.user;

		Business.findRecordsByUserId({user_ref: user._id}, 
			function(err, record){

			if (record) {
				res.status(200);
				return res.json({status: true, data: record});
			}else{
				res.status(404);
				return res.json({status: false, reason: err});
			}

		});
	});


/**
@api {put} /api/v1/business Update business information
@apiName PutBusiness
@apiGroup Business
@apiDescription Update the user's business location. Note that the request parameters 
must contain either business or location or both.
*/

	app.put('/api/v1/business', function (req, res, next) {

		var user = req.paygis.user;
		var business_update = req.body.business;
		var location_update = req.body.location;
		var busId = req.body._id;

		Async.series([
			function(done){
				if (_.isObject(business_update)) {
					Business.update(user, busId, business_update, 
						function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			},
			function(done){
				if (_.isObject(location_update)) {
					Business.updateLocation(user, busId, location_update, 
						function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			}
		], function(err, results){
			if (!err) {
				res.status(200);
				return res.json({status: true, business: results[0], location: results[1]});
			}else{
				res.status(404);
				// Send the first error to occur in the two operations
				return res.json({status: false, reason: err});
			}
		});

	});
	
};
