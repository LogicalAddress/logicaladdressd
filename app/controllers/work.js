var UserLib = require('../lib/user');
var Work = require('../models/work');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');

module.exports = function (app) {
 
/**
@api {get} /api/v1/work Get work information
@apiName GetWork
@apiGroup Work
@apiDescription Get user's work location
@apiHeader {String} x-auth-token Users unique access-key.
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				User's work information.
@apiSuccess {String}  data.work_name	The name of company/organization the current user works
@apiSuccess {Array}   data.tags		The nature of workplace, expressed in tags
@apiSuccess {String}  data.address		User's current work physical address
@apiSuccess {String}  data.city			User's current city
@apiSuccess {String}  data.trace_id		User's work trace code (Logical Address). 
This would be wrapped up in QRcode.
@apiSuccess {Object}  data.location_ref  The location information
@apiSuccess {String}  data.location_ref.location_type	Location type, 'work' in this case
@apiSuccess {String}  data.location_ref.altitude	The altitude G.P.S information
@apiSuccess {String}  data.location_ref.altitude The altitude acuracy. G.P.S information
@apiSuccess {String}  data.location_ref.speed	The speed. G.P.S information
@apiSuccess {Object}  data.location_ref.gps			The location object
@apiSuccess {Float}   data.location_ref.gps.longitude	The longitude
@apiSuccess {Float}   data.location_ref.gps.latitude		The latitude
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',
     location_ref: 
      { user_ref: '55b3cf2a61b97568152f1365',
        location_type: 'work',
        _id: '55b3cf2a61b97568152f1368',
        verify_change: '########',
        updated_at: '2015-07-25T18:02:18.880Z',
        created_at: '2015-07-25T18:02:18.880Z',
        enabled: true,
        speed: '',
        altitude_accuracy: '',
        altitude: '',
        gps: {longitude: 0, latitude: 0	},
        __v: 0 },
     user_ref: '55b3cf2a61b97568152f1365',
     _id: '55b3cf2a61b97568152f1369',
     cloned_work_id: '',
     uses_clone: false,
     updated_at: '2015-07-25T18:02:18.891Z',
     created_at: '2015-07-25T18:02:18.890Z',
     enabled: true,
     tags: [],
     address: '',
     city: '',
     work_name: '',
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

	app.get('/api/v1/work', function (req, res, next) {

		var user = req.paygis.user;

		Work.findRecordByUserId({user_ref: user._id}, function(err, record){

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
@api {put} /api/v1/work Update work information
@apiName PutWork
@apiGroup Work
@apiDescription Update the user's work location. Note that the request parameters must  
contain either work or location or both.
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {Object} work The work object containing only fields that should be updated
@apiParam {String} [work.work_name] The name of company/organization the current user works
@apiParam {String} [work.address] User's current workplace physical address
@apiParam {String} [work.city] User's current city where work place is
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
	work: {
		address: "Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction",
		city: "Jos",
		work_name: "Nignux Technologies Ltd."
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
	work: {
		address: "Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction",
		city: "Jos"
		work_name: "Nignux Technologies Ltd."
    }
}
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  work				User updated workplace information.
@apiSuccess {String}  work.address		User's current workplace physical address
@apiSuccess {String}  work.city			User's current city of workplace
@apiSuccess {String}  work.work_name	The name of company/organization user works


@apiSuccess {Object}  location			The updated location GPS work information.
@apiSuccess {String}  location.location_type	Location type, 'work' in this case
@apiSuccess {String}  location.altitude			The altitude G.P.S information
@apiSuccess {String}  location.altitude			The altitude acuracy. G.P.S information
@apiSuccess {String}  location.speed			The speed. G.P.S information
@apiSuccess {Object}  location.gps				The location object
@apiSuccess {Float}   location.gps.longitude	The longitude
@apiSuccess {Float}   location.gps.latitude		The latitude

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  Work: 
   { __v: 0,
     _id: '55b3cf2a61b97568152f1369',
     location_ref: '55b3cf2a61b97568152f1368',
     trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',
     user_ref: '55b3cf2a61b97568152f1365',
     cloned_work_id: '',
     uses_clone: false,
     updated_at: '2015-07-25T18:02:19.161Z',
     created_at: '2015-07-25T18:02:18.890Z',
     enabled: true,
     tags: [],
     address: 'Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction',
     city: 'Jos',
     work_name: 'Nignux Technologies Ltd.',
     nearby_trace_ids: [] },
  location: 
   { __v: 0,
     _id: '55b3cf2a61b97568152f1368',
     location_type: 'work',
     verify_change: '########',
     updated_at: '2015-07-25T18:02:19.171Z',
     created_at: '2015-07-25T18:02:18.880Z',
     enabled: true,
     speed: '3.4',
     altitude_accuracy: '5.5',
     altitude: '3.0',
     gps: { longitude: 4.3, latitude: 2.6 } } }

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  Work: 'Not Updated',
  location: 
   { __v: 0,
     _id: '55b3cf2a61b97568152f1368',
     location_type: 'work',
     verify_change: '########',
     updated_at: '2015-07-25T18:02:19.099Z',
     created_at: '2015-07-25T18:02:18.880Z',
     enabled: true,
     speed: '2.6',
     altitude_accuracy: '1.0',
     altitude: '3.6',
     gps: { longitude: 0.4, latitude: 3.5 } } }

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  work: 
   { __v: 0,
     _id: '55b3cf2a61b97568152f1369',
     location_ref: '55b3cf2a61b97568152f1368',
     trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',
     user_ref: '55b3cf2a61b97568152f1365',
     cloned_work_id: '',
     uses_clone: false,
     updated_at: '2015-07-25T18:02:19.035Z',
     created_at: '2015-07-25T18:02:18.890Z',
     enabled: true,
     tags: [],
     address: 'Angwan Rukuba, Jos',
     city: 'Abuja',
     work_name: '',
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

	app.put('/api/v1/work', function (req, res, next) {

		var user = req.paygis.user;
		var work_update = req.body.work;
		var location_update = req.body.location;

		Async.series([
			function(done){
				if (_.isObject(work_update)) {
					Work.update(user, work_update, function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			},
			function(done){
				if (_.isObject(location_update)) {
					Work.updateLocation(user, location_update, function(err, record){
						done(err, record);
					});
				}else{
					done(null, 'Not Updated');
				}
			}
		], function(err, results){
			if (!err) {
				res.status(200);
				return res.json({status: true, work: results[0], location: results[1]});
			}else{
				res.status(404);
				// Send the first error to occur in the two operations
				return res.json({status: false, reason: err});
			}
		});

	});
	
};
