var UserLib = require('../lib/user');
var ShortCode = require('../models/shortcode');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');
var Location = require('../models/location');

//There is no spec file for this module
module.exports = function (app) {

/**
@api {get} /api/v1/shortcode/:lcode Get location information based on shot code
@apiName GetLocation
@apiGroup ShortCode
@apiDescription Get user's location associated with the short code
@apiHeader {String} x-auth-token Users unique access-key.
@apiParam {String} [lcode] User's Long or short code
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

	app.get('/api/v1/shortcode/:lcode', function (req, res, next) {

		// Nous avons besoin de savoir qu'on est membre. C'est tous!
		
		ShortCode.findRecordByLongShortCode(req.params.lcode, 
			function(err, record){

			if (_.isObject(record) && _.has(record, 'trace_id')) {
				res.status(200);
				return res.json({status: true, data: record});
			}else{
				res.status(404);
				return res.json({status: false, 
					reason: 'An unknown error occured'});
			}

		});
	});

/**
@api {post} /api/v1/shortcode Request a shortcode information
@apiName CreateShortcode
@apiGroup ShortCode
@apiDescription Request to have a short code instead of the long trace code.  
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {String} [trace_id] User's Logical Address

@apiParamExample {json} Request-Example:
{
	trace_id: 537e2860cace54e137baee4a013bb653,
}
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				updated information.
@apiSuccess {String}  data.short_code	The requested shortcode
@apiSuccess {String}  data.trace_id		The logical address in the request

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0af',
     short_code: 564323,
     code_type: 'default'
     location_ref: '55b3bd0720343cc60f6ad0ae',
     trace_id: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     updated_at: '2015-07-25T16:44:55.842Z',
     created_at: '2015-07-25T16:44:55.340Z',
     enabled: true, 
     },
   }
@apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
     HTTP/1.1 403 Not Found
{
	status: false,
	message: 'Record exists'
}
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'An unknown error occured'
}
@apiErrorExample Error-Response:
HTTP/1.1 550 Permission Denied
{
	status: false,
	reason: 'Permission Denied!'
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


	app.post('/api/v1/shortcode', function (req, res, next) {

		var user = req.paygis.user;

		if (_.has(req.body, 'trace_id') && 
			!_.isEmpty( req.body.trace_id.trim() ) ) {

			Location.findRecord({
				user_ref: user._id, 
				trace_id: req.body.trace_id.trim()
				}, 
				function(err, lRecord){

					if(lRecord){

						ShortCode.once('create_shortcode_complete', 
							function(err, record){
				
							if(record){
								res.status(200);
								return res.json({status: true, data: record});
							}

							if (err == 'Duplicate Entry') {
								res.status(403);
								return res.json({status: false, 
									reason: 'Record exists'});
							}else{
								res.status(404);
								return res.json({status: false, 
									reason: 'An unknown error occured', extra: err});
							}
						
						});

						if (lRecord.location_type == "business") {

							ShortCode.registerBusinessDefault({
								user_ref: user._id, 
								location_ref: lRecord._id,
								trace_id: req.body.trace_id.trim()
							});

						}else{

							ShortCode.registerDefault({
								user_ref: user._id, 
								location_ref: lRecord._id,
								trace_id: req.body.trace_id.trim()
							});
						}
						
					}else{

						res.status(550);
						return res.json({status: false, reason: 'Permission Denied!'});
					}
			});

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		
	});



/**
@api {post} /api/v1/memorableshortcode Request a shortcode information
@apiName CreateMemorableShortcode
@apiGroup ShortCode
@apiDescription Request to have a short code instead of the long trace code.  
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {String} [trace_id] User's Logical Address

@apiParamExample {json} Request-Example:
{
	trace_id: 537e2860cace54e137baee4a013bb653,
}
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				updated information.
@apiSuccess {String}  data.short_code	The requested shortcode
@apiSuccess {String}  data.trace_id		The logical address in the request

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0af',
     short_code: 564323,
     code_type: 'memorable'
     location_ref: '55b3bd0720343cc60f6ad0ae',
     trace_id: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     updated_at: '2015-07-25T16:44:55.842Z',
     created_at: '2015-07-25T16:44:55.340Z',
     enabled: true, 
     },
   }
@apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
     HTTP/1.1 403 Not Found
{
	status: false,
	message: 'Record exists'
}
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'An unknown error occured'
}
@apiErrorExample Error-Response:
HTTP/1.1 550 Permission Denied
{
	status: false,
	reason: 'Permission Denied!'
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


	app.post('/api/v1/memorableshortcode', function (req, res, next) {

		var user = req.paygis.user;

		if (_.has(req.body, 'trace_id') && 
			!_.isEmpty( req.body.trace_id.trim() ) ) {

			Location.findRecord({
				user_ref: user._id, 
				trace_id: req.body.trace_id.trim()
				}, 
				function(err, lRecord){

					if(lRecord){

						ShortCode.registerRandomMemorable({
							user_ref: user._id, 
							location_ref: lRecord._id,
							trace_id: req.body.trace_id.trim()
						}, function(err, record){
				
							if(record){
								res.status(200);
								return res.json({status: true, data: record});
							}

							if (err == 'Duplicate Entry') {
								res.status(403);
								return res.json({status: false, 
									reason: 'Record exists'});
							}else{
								res.status(404);
								return res.json({status: false, 
									reason: 'An unknown error occured', 
									extra: err});
							}
						
						});						
					}else{

						res.status(550);
						return res.json({status: false, 
							reason: 'Permission Denied!'});
					}
			});

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		
	});

	

/**
@api {post} /api/v1/customshortcode Request a shortcode information
@apiName CreateMemorableShortcode
@apiGroup ShortCode
@apiDescription Request to have a short code instead of the long trace code.  
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {String} [trace_id] User's Logical Address
@apiParam {String} [custom_code] User's prefered shortcode

@apiParamExample {json} Request-Example:
{
	trace_id: 537e2860cace54e137baee4a013bb653,
	custom_code: 08161730129
}
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				updated information.
@apiSuccess {String}  data.short_code	The requested shortcode
@apiSuccess {String}  data.trace_id		The logical address in the request

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { __v: 0,
     _id: '55b3bd0720343cc60f6ad0af',
     short_code: 08161730129,
     code_type: 'memorable'
     location_ref: '55b3bd0720343cc60f6ad0ae',
     trace_id: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     updated_at: '2015-07-25T16:44:55.842Z',
     created_at: '2015-07-25T16:44:55.340Z',
     enabled: true, 
     },
   }
@apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
     HTTP/1.1 403 Not Found
{
	status: false,
	message: 'Record exists'
}
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'An unknown error occured'
}
@apiErrorExample Error-Response:
HTTP/1.1 550 Permission Denied
{
	status: false,
	reason: 'Permission Denied!'
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


	app.post('/api/v1/customshortcode', function (req, res, next) {

		var user = req.paygis.user;

		if (_.has(req.body, 'trace_id') && _.has(req.body, 'custom_code') &&
		 !_.isEmpty( req.body.trace_id.trim()) && 
		 	!_.isEmpty( req.body.custom_code.trim()) ) {

			Location.findRecord({
				user_ref: user._id, 
				trace_id: req.body.trace_id.trim()
				}, 
				function(err, lRecord){

					if(lRecord){

						ShortCode.registerCustom({
							user_ref: user._id, 
							location_ref: lRecord._id,
							trace_id: req.body.trace_id.trim(),
							custom: req.body.custom_code.trim()
						}, function(err, record){
				
							if(record){
								res.status(200);
								return res.json({status: true, data: record});
							}

							if (err == 'Duplicate Entry') {
								res.status(403);
								return res.json({status: false, 
									reason: 'Record exists'});
							}else{
								res.status(404);
								return res.json({status: false, 
									reason: 'An unknown error occured', 
									extra: err});
							}
						
						});
						
					}else{

						res.status(550);
						return res.json({status: false, 
							reason: 'Permission Denied!'});
					}
			});

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		
	});
};
