var UserLib = require('../lib/user');
var Home = require('../models/home');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');

module.exports = function (app) {

/**
@api {get} /api/v1/home Get home information
@apiName GetHome
@apiGroup Home
@apiDescription Get user's home location
@apiHeader {String} x-auth-token Users unique access-key.
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				User home information.
@apiSuccess {String}  data.address		User's current physical address
@apiSuccess {String}  data.city			User's current city
@apiSuccess {String}  data.trace_id		User's home trace code (Logical Address). 
This would be wrapped up in QRcode.
@apiSuccess {Object}  data.location_ref  The location information
@apiSuccess {String}  data.location_ref.location_type	Location type, 'home' in this case
@apiSuccess {String}  data.location_ref.altitude	The altitude G.P.S information
@apiSuccess {String}  data.location_ref.altitude The altitude acuracy. G.P.S information
@apiSuccess {String}  data.location_ref.speed	The speed. G.P.S information
@apiSuccess {Object}  data.location_ref.gps			The location Object
@apiSuccess {Float}   data.location_ref.gps.longitude		The longitude
@apiSuccess {Float}   data.location_ref.gps.latitude		The latitude
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { trace_id: '537e2860cace54e137baee4a013bb653',
     location_ref: 
      { user_ref: '55b3bd0720343cc60f6ad0ad',
        location_type: 'home',
        _id: '55b3bd0720343cc60f6ad0ae',
        verify_change: '########',
        updated_at: '2015-07-25T16:44:55.325Z',
        created_at: '2015-07-25T16:44:55.325Z',
        enabled: true,
        speed: '',
        altitude_accuracy: '',
        altitude: '',
        gps: {
			longitude: '0',
			latitude: '0'
		},
        __v: 0 },
     user_ref: '55b3bd0720343cc60f6ad0ad',
     _id: '55b3bd0720343cc60f6ad0af',
     updated_at: '2015-07-25T16:44:55.340Z',
     created_at: '2015-07-25T16:44:55.340Z',
     enabled: true,
     address: '',
     city: '',
     nearby_trace_ids: [],
     __v: 0 } }
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

	app.get('/api/v1/home', function (req, res, next) {

		var user = req.paygis.user;

		Home.findRecordByUserId({user_ref: user._id}, function(err, record){

			if (record) {
				res.status(200);
				return res.json({status: true, data: record});
			}else{
				res.status(404);
				return res.json({status: false, reason: 'An unknown error occured'});
			}

		});
	});

/**
@api {put} /api/v1/home Update home information
@apiName PutHome
@apiGroup Home
@apiDescription Update the user's home location. Note that the request parameters must  
contain either home or location or both.
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {Object} home The home object containing only fields that should be updated
@apiParam {String} [home.address] User's current physical address
@apiParam {String} [home.city] User's current city
@apiParam {Object} location The location object containing only fields 
that should be updated
@apiParam {String} [location.altitude] GPS altitude information
@apiParam {String} [location.speed] GPS speed information
@apiParam {String} [location.altitude_accuracy] GPS altitude accuracy information
@apiParam {Object} location.gps The GPS long and lat object
@apiParam {Float} [location.gps.longitude] GPS longitude information
@apiParam {Float} [location.gps.latitude] GPS latitude information

@apiParamExample {json} Request-Example:
{
	location: {
		altitude: '50.6',
		speed: '6.50',
		altitude_accuracy: '0.19',
		gps:{
			longitude: 63.23,
			latitude: 54.3
		}
	}
	home: {
		address: "No. 2A Rukuba Road",
		city: "Jos"
	}
}
@apiParamExample {json} Request-Example:
{
	location: {
		altitude: '50.6',
		speed: '6.50',
		altitude_accuracy: '0.19',
		gps:{
			longitude: 63.23,
			latitude: 54.3
		}
	}
}
@apiParamExample {json} Request-Example:
{
	home: {
		address: "No. 2A Rukuba Road",
		city: "Jos"
	}
}
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  home				User updated home information.
@apiSuccess {String}  home.address		User's current physical address
@apiSuccess {String}  home.city			User's current city

@apiSuccess {Object}  location			The updated location GPS home information.
@apiSuccess {String}  location.location_type	Location type, 'home' in this case
@apiSuccess {String}  location.altitude			The altitude G.P.S information
@apiSuccess {String}  location.altitude			The altitude acuracy. G.P.S information
@apiSuccess {String}  location.speed			The speed. G.P.S information
@apiSuccess {Object}  location.gps				The location Object
@apiSuccess {Float}   location.gps.longitude	The longitude
@apiSuccess {Float}   location.gps.latitude		The latitude

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  home: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0af',
     location_ref: '55b3bd0720343cc60f6ad0ae',
     trace_id: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     updated_at: '2015-07-25T16:44:55.842Z',
     created_at: '2015-07-25T16:44:55.340Z',
     enabled: true,
     address: 'No. 2A Rukuba Road',
     city: 'Jos',
     nearby_trace_ids: [] },
  location: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0ae',
     location_type: 'home',
     verify_change: '########',
     updated_at: '2015-07-25T16:44:55.853Z',
     created_at: '2015-07-25T16:44:55.325Z',
     enabled: true,
     speed: '3.4',
     altitude_accuracy: '5.5',
     altitude: '3.0',
     gps: {
			longitude: 4.3,
			latitude: 2.6
		} } }

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  home: 'Not Updated',
  location: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0ae',
     location_type: 'home',
     verify_change: '########',
     updated_at: '2015-07-25T16:44:55.731Z',
     created_at: '2015-07-25T16:44:55.325Z',
     enabled: true,
     speed: '2.6',
     altitude_accuracy: '1.0',
     altitude: '3.6',
     gps: {
			longitude: 4.3,
			latitude: 2.6
		} } }

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  home: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0aa',
     location_ref: '55b3bd0720343cc60f6ad0a9',
     trace_id: '99152e15de2a1ac4e4858b9f9cd2f495',
     user_ref: '55b3bd0620343cc60f6ad0a8',
     updated_at: '2015-07-25T16:44:55.580Z',
     created_at: '2015-07-25T16:44:55.105Z',
     enabled: true,
     address: 'No. 2A Rukuba Road',
     city: 'Jos',
     nearby_trace_ids: [] },
  location: 'Not Updated' }
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

	app.put('/api/v1/home', function (req, res, next) {
		
		var user = req.paygis.user;
		var home_update = req.body.home;
		var location_update = req.body.location;

		Async.series([
			function(done){
				if (_.isObject(home_update)) {
					Home.update(user, home_update, function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			},
			function(done){
				if (_.isObject(location_update)) {
					Home.updateLocation(user, location_update, function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			}
		], function(err, results){
			if (!err) {
				res.status(200);
				return res.json({status: true, home: results[0], location: results[1]});
			}else{
				res.status(404);
				// Send the first error to occur in the two operations
				return res.json({status: false, reason: err});
			}
		});

	});
	
};
