var UserLib = require('../lib/user');
var Business = require('../models/business');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');

module.exports = function (app) {


/**
@api {post} /api/v1/business Post business information
@apiName PostBusiness
@apiGroup Business
@apiDescription Create company's business location
@apiHeader {String} x-auth-token Users unique access-key.
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data	user submitted business information
@apiParamExample {json} Request-Example:
{
	mobile_number: "08036504287",
	address: "Nimpco Filling Station, Jabi",
	city: "Abuja",
	business_name: "Auto Lady Nigeria Ltd",
	tags: ['repairs', 'motor', 'car']
}
@apiParamExample {json} Request-Example:
{
	mobile_number: "08161730129",
	address: "Rukuba Road, Jos",
	city: "Jos",
	business_name: "Daser Bank of Nigeria Ltd",
	tags: ['atm', 'bank', 'money']
}
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { __v: 0,
     mobile_number: '08036504287',
     trace_id: 'efdd63c258f087370a4db694e5115dcf',
     location_ref: '56d1ec3bd5eb63771f47d28c',
     user_ref: '56d1ec3ad5eb63771f47d280',
     _id: '56d1ec3bd5eb63771f47d28d',
     updated_at: '2016-02-27T18:34:35.267Z',
     created_at: '2016-02-27T18:34:35.267Z',
     locked: false,
     verified: false,
     enabled: true,
     tags: [ 'repairs', 'motor', 'car' ],
     address: 'Nimpco Filling Station, Jabi',
     city: 'Abuja',
     business_name: 'Auto Lady Nigeria Ltd',
     nearby_trace_ids: [] } }
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'An unknown error occured'
}
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Access Token Expired'
}
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Access Token or Key'
}
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
@apiHeader {String} x-auth-token Users unique access-key.
@apiSuccess {Boolean} status Response Status
@apiSuccess {Array}  data	Array of user's business information
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data:
	[{"_id":"56d1e83eb17166191e269771",
		"mobile_number":"08161730129",
		"trace_id":"bf27ac7c5d57f9ac1c1ce5ea0a5424d0",
		"location_ref":{"_id":"56d1e83eb17166191e269770",
			"user_ref":"56d1e83db17166191e269766",
			"location_type":"business",
			"verify_change":"########",
			"updated_at":"2016-02-27T18:17:34.356Z",
			"created_at":"2016-02-27T18:17:34.356Z",
			"enabled":true,
			"speed":"",
			"altitude_accuracy":"",
			"altitude":"",
			"gps":{"longitude":0,"latitude":0},"__v":0,
			"trace_id":"bf27ac7c5d57f9ac1c1ce5ea0a5424d0"
		},
		"user_ref":"56d1e83db17166191e269766",
		"updated_at":"2016-02-27T18:17:34.362Z",
		"created_at":"2016-02-27T18:17:34.362Z",
		"locked":false,"verified":false,
		"enabled":true,
		"tags":["atm","bank","money"],
		"address":"Rukuba Road, Jos",
		"city":"Jos",
		"business_name":"Daser Bank of Nigeria",
		"nearby_trace_ids":[],"__v":0
	},{"_id":"56d1e83eb17166191e269773",
		"mobile_number":"08036504287",
		"trace_id":"71964581930782dafdc3013ba7b2e473",
		"location_ref":{"_id":"56d1e83eb17166191e269772",
			"user_ref":"56d1e83db17166191e269766",
			"location_type":"business",
			"verify_change":"########",
			"updated_at":"2016-02-27T18:17:34.406Z",
			"created_at":"2016-02-27T18:17:34.406Z",
			"enabled":true,
			"speed":"",
			"altitude_accuracy":"",
			"altitude":"",
			"gps":{"longitude":0,"latitude":0},"__v":0,
			"trace_id":"71964581930782dafdc3013ba7b2e473"
		},
		"user_ref":"56d1e83db17166191e269766",
		"updated_at":"2016-02-27T18:17:34.420Z",
		"created_at":"2016-02-27T18:17:34.420Z",
		"locked":false,"verified":false,
		"enabled":true,
		"tags":["repairs","motor","car"],
		"address":"Nimpco Filling Station, Jabi",
		"city":"Abuja",
		"business_name":"Auto Lady Nigeria Ltd",
		"nearby_trace_ids":[],"__v":0
	}]
}

@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'No Record Found'
}
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Access Token Expired'
}
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Access Token or Key'
}
*/

	app.get('/api/v1/business', function (req, res, next) {

		var user = req.paygis.user;

		Business.findRecordsByUserId(user, function(err, record){

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
