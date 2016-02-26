var UserLib = require('../lib/user');
var Payment = require('../models/payment');
var _ = require('underscore');
var Async = require('async');
var helpers = require('../lib/helpers');

//There is no spec file for this module
module.exports = function (app) {

/**
@api {get} /api/v1/payment/ Get all payments active or not
@apiName GetPayments
@apiGroup Payment
@apiDescription Get the payment history of the currenly logged in user.
@apiHeader {String} x-auth-token Users unique access-key.

@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  data				The payment information. (TODO in doc not in code: 
containing an array)
@apiSuccess {String}  data.code_type	The shortcode type bought by the user
@apiSuccess {String}  data._id			The payment id
@apiSuccess {Number}  data.amount		The amount paid in $
@apiSuccess {Boolean} data.active 		Weather the user has used it or not. Active means used.

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   [{ code_type: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     _id: '55b3bd0720343cc60f6ad0af',
     amount: 0.99,
     active: true,
     __v: 0  }]

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

	app.get('/api/v1/payment', function (req, res, next) {

		var user = req.paygis.user;
		
		Payment.findAll({user_ref: user._id}, function(err, record){

			if (record) {
				res.status(200);
				return res.json({status: true, data: record});
			}else{
				res.status(404);
				return res.json({status: false, reason: 'No Record Found'});
			}
		});
	});

/**
@api {post} /api/v1/payment Pay for services
@apiName CreatePayment
@apiGroup Payment
@apiDescription Pay for services e.g 1. {memorable => $0.99, custom => $4.99}
@apiHeader {String} x-auth-token Users unique access-key.

@apiParam {String} [code_type] User's Logical Address
@apiParam {String} [amount] The amount in $$ to pay

@apiParamExample {json} Request-Example:
{
	code_type: 'memorable',
	amount: 0.99
}

@apiParamExample {json} Request-Example:
{
	code_type: 'custom',
	amount: 4.99
}

@apiSuccess {Object}  data				The payment information
@apiSuccess {String}  data.code_type	The shortcode type bought by the user
@apiSuccess {String}  data._id			The payment id
@apiSuccess {Number}  data.amount		The amount paid in $
@apiSuccess {Boolean} data.active 		Weather the user has used it or not. Active means used.

@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  data: 
   { code_type: '537e2860cace54e137baee4a013bb653',
     user_ref: '55b3bd0720343cc60f6ad0ad',
     _id: '55b3bd0720343cc60f6ad0af',
     amount: 0.99,
     active: true,
     __v: 0 },
   }
@apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
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

@apiErrorExample Error-Response:
HTTP/1.1 550 Permission Denied
{
	status: false,
	reason: 'Internal Server Error'
}
*/


	app.post('/api/v1/payment', function (req, res, next) {
		if (_.has(req.body, 'code_type') && _.has(req.body, 'amount') ) {
			var user = req.paygis.user;
			var code_type = req.body.code_type.trim();
			var amount = req.body.amount;
			if (code_type == 'memorable' ||	code_type == 'custom') {
				Payment.register(user._id, code_type, amount, 
					function(err, record){
					if(record){
						res.status(200);
						return res.json({status: true, data: record});
					}else{
						console.log("Fatal Error: save payment failed");
						res.status(400);
						return res.json({status: false, 
							reason: 'Invalid Code Type'});
					}
				});
			}else{
				res.status(400);
				return res.json({status: false, reason: 'Invalid Code Type'});
			}
		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
	});
};
