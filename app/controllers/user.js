var UserLib = require('../lib/user');
var User = require('../models/user');
var helpers = require('../lib/helpers');
var _ = require('underscore');

module.exports = function (app) {



/**
@api {post} /user/register Register user
@apiName PostRegister
@apiGroup User
@apiDescription Register a first time user.
@apiSuccess {Boolean} status Response Status
@apiSuccess {Object}  user				An echo-back of the registration information
@apiSuccess {String}  user.username		user's fake username known to the system. 
It may never be used
@apiSuccess {String}  user.password			User's masked password
@apiSuccess {String}  user._id		User's unique identifier
@apiSuccess {String}  user.q_book		Answer to the book security question
@apiSuccess {String}  user.q_space		Answer to the space security question
@apiSuccess {String}  user.q_mother		Answer to the mother's maiden name security question
@apiSuccess {String}  user.q_animal		Answer to the animal security question
@apiParamExample {json} Request-Example:
{
	username: "John",
	password: "yahweh",
	q_animal: "Goat",
	q_mother: "B",
	q_space: "Moon",
	q_book: "Digital Fortress",
}
@apiSuccessExample {json} Success-Response:
HTTP/1.1 201 Created
{ status: true,
  user: 
   { __v: 0,
     username: 'cd302d453137f3caac4b53f55985d19e',
     password: 'FILTERED',
     _id: '55b3fdd30f65eaa51d0dd52a',
     updated_at: '2015-07-25T21:21:23.875Z',
     created_at: '2015-07-25T21:21:23.875Z',
     q_book: 'Digital Fortress',
     q_space: 'Moon',
     q_mother: 'B',
     q_animal: 'Goat' } }
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
	message: 'User exists'
}
@apiErrorExample Error-Response:
HTTP/1.1 404 Not Found
{
	status: false,
	reason: 'An unknown error occured'
}
*/

	app.post('/user/register', function (req, res, next) {

		if (_.has(req.body, 'username') && _.has(req.body, 'password') &&
			/*_.has(req.body, 'email') && */_.has(req.body, 'mobile_number') &&
			!_.isEmpty(req.body.username.trim()) && 
			!_.isEmpty(req.body.password.trim()) &&
			// !_.isEmpty(req.body.email.trim()) && 
			!_.isEmpty(req.body.mobile_number.trim())) {

			User.register(req.body, function(err, record){
				
				if(record){
					res.status(201);
					return res.json({status: true, user: record});
				}

				if (err == 'Duplicate Entry') {
					res.status(403);
					return res.json({status: false, reason: 'User exists'});
				}else{
					res.status(404);
					return res.json({status: false, reason: 'An unknown error occured'});
				}
				
			});			

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		
	});

/**
@api {post} /api/v1/user/login Login user
@apiName PostLogin
@apiGroup User
@apiDescription Login a registered user.
@apiSuccess {Boolean} status Response Status
@apiSuccess {String} access_token Used subsequently in headers of all future 
correspondents (Request)
@apiSuccess {Object}  user				User's fake username, known to the system
@apiSuccess {String}  user.username		User's username used during registration
@apiSuccess {String}  user._id		User's unique identification
@apiParamExample {json} Request-Example:
{
	username: "John",
	password: "yahweh",
}
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true,
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiNmI1Njg0NDE4NjE1YjkyYWQ0YzE5OGFjZGYwMTY2YjkiLCJfaWQiOiI1NWIzZmRkNDBmNjVlYWE1MWQwZGQ1MmYiLCJ1cGRhdGVkX2F0IjoiMjAxNS0wNy0yNVQyMToyMToyNC4xMThaIiwiY3JlYXRlZF9hdCI6IjIwMTUtMDctMjVUMjE6MjE6MjQuMTE4WiIsIl9fdiI6MH0sInNhbHQiOiJlYmIwN2I5MzJmYTU4NTdlZmU1OWUxYzliMmRmMjNjYiJ9.4RMXpRRMQYj880YYltglUO69hTO2eQoNYUYKcOHmU8I',
  user: 
   { username: '6b5684418615b92ad4c198acdf0166b9',
     _id: '55b3fdd40f65eaa51d0dd52f',
     updated_at: '2015-07-25T21:21:24.118Z',
     created_at: '2015-07-25T21:21:24.118Z',
     __v: 0 } }
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
HTTP/1.1 401 Unauthorized
{
	status: false,
	message: 'Authentication Failed'
}
*/
	app.post('/user/login', function (req, res, next) {

		if (_.has(req.body, 'username') && _.has(req.body, 'password') &&
			!_.isEmpty(req.body.username.trim()) && 
			!_.isEmpty(req.body.password.trim())) {

			User.auth(req.body, function(err, record){

				if (record) {
					var accessToken = UserLib.generateAccessToken(record);
					res.status(200);
					return res.json({status: true, access_token: accessToken, 
						user: record});
				}else{
					res.status(401);
					return res.json({
						status: false, 
						message: 'Authentication Failed', 
						reason: err
					});
				}

			});

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		
	});


/**
@api {delete} /api/v1/user Delete User
@apiName DeleteUser
@apiGroup User
@apiDescription Delete every traces of the registered user.
@apiHeader {String} x-auth-token Users unique access-key.
@apiSuccess {Boolean} status Response Status
@apiSuccess {String} message Usually just to let you know if the delete is successful.
@apiParamExample {json} Request-Example:
{
	username: "John",
	password: "yahweh",
}
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{ status: true, message: 'User Account Deleted' }
@apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
{
	status: false,
	message: 'Invalid Parameters'
}
@apiErrorExample Error-Response:
HTTP/1.1 401 Unauthorized
{
	status: false,
	message: 'Authentication Failed'
}
*/
	app.delete('/api/v1/user', function (req, res, next) {
		
		if (_.has(req.body, 'username') && _.has(req.body, 'password') &&
			!_.isEmpty(req.body.username.trim()) && 
			!_.isEmpty(req.body.password.trim())) {

			User.auth(req.body, function(err, record){

				if (record) {
					User.delete(record);
					res.status(200);
					return res.json({status: true, message: "User Account Deleted"});
				}else{
					res.status(401);
					return res.json({
						status: false, 
						message: 'Authentication Failed', 
						reason: err
					});
				}
			});

		}else{
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
	});
	
};
