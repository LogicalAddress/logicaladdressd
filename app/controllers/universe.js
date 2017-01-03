var UserLib = require('../lib/user');
var User = require('../models/user');
var ShortCode = require('../models/shortcode');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');
var Location = require('../models/location');

module.exports = function (app) {

/**
@api {get} /api/v1/universe/:lscode Get location information in either the long or shot code
@apiName GetLocation
@apiGroup Universe
@apiDescription Get user's location associated with the short code
@apiHeader {String} x-auth-token Users unique access-key.
@apiParam {String} [lscode] User's Long or short code
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				The location information.
@apiSuccess {String}  data.short_code	The shortcode in the request
@apiSuccess {String}  data.trace_id		User's trace code (Logical Address). 
The code actually embedded in QRcode.
@apiSuccess {Object}  data.location_ref  The location information
@apiSuccess {String}  data.location_ref.location_type	Location type, 'home' or 'work' etc.
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

	app.get('/api/v1/universe/:lscode', function (req, res, next) {

		// Nous avons besoin de savoir qu'on est membre. C'est tous!
		
		ShortCode.findRecordByLongShortCode(req.params.lscode, function(err, record){
			if (_.isObject(record) && _.has(record, 'trace_id')) {
				res.status(200);
				return res.json({status: true, data: record});
			}
			Location.findRecord({ trace_id: req.params.lscode.trim() }, function(err, lRecord){
				if(_.isObject(lRecord) && _.has(lRecord, 'trace_id')){
					res.status(200);
					// Make the API Consistent
					return res.json({status: true, data: {
						_id: lRecord._id,
						trace_id: lRecord.trace_id,
						user_ref: lRecord.user_ref,
						short_code: '',
						enabled: lRecord.enabled,
						created_at: lRecord.created_at,
						updated_at: lRecord.updated_at,
						location_ref: lRecord
						} 
					});
				}
				User.findByGlobalLA(req.params.lscode, function(err, user){
					if(!user){
						res.status(404);
						return res.json({status: false, reason: 'An unknown error occured'});
					}
					Location.findRecords({ user_ref: user._id }, function(err, lRecord){
						if(_.isArray(lRecord) && lRecord.length > 0){
							res.status(200);
							// Make the API Consistent
							var data = [];
							for(var i = 0; i < lRecord.length; i++){
								data[i] = {
									_id: lRecord[i]._id,
									trace_id: lRecord[i].trace_id,
									user_ref: lRecord[i].user_ref,
									short_code: '',
									enabled: lRecord[i].enabled,
									created_at: lRecord[i].created_at,
									updated_at: lRecord[i].updated_at,
									location_ref: lRecord[i]
								}
							}
							return res.json({status: true, data: data});
						}
						res.status(404);
						return res.json({status: false, reason: 'An unknown error occured'});
					});
				});
			});
		});
	});
};