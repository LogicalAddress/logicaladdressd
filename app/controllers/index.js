var accountKit = require('../../config/accountKit')();
var Querystring  = require('querystring');
var Request = require('request');
var crypto = require('crypto');
var UserLib = require('../lib/user');
var User = require('../models/user');
var _ = require('underscore');

module.exports = function (app) {

	app.get('/',function (req, res, next) {
		res.render('pages/index', {
			title: "Logical Address | Welcome to Logical Address",
			page: 'home',
			app_title: "Logical Address"
		});
	});
	
	app.get('/login',function (req, res, next) {
		
		res.render('pages/login', {
			title: "Logical Address | Login to Logical Address",
			page: 'login',
			csrfToken: req.csrfToken(),
			FACEBOOK_APP_ID: accountKit.app_id,
			ACCOUNT_KIT_API_VERSION: accountKit.api_version,
			app_title: "Logical Address",
		});
	});
	
	app.post('/login',function (req, res, next) {

		if(req.body.csrf_nonce !== req.body._csrf) return res.send(500);	
		var app_access_token = ['AA', accountKit.app_id, accountKit.app_secret].join('|');
		var params = { grant_type: 'authorization_code', code: req.body.code, access_token: app_access_token};
		var token_exchange_url = accountKit.token_exchange_base_url + '?' + Querystring.stringify(params);
		Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
			if (!_.has(respBody, 'access_token')) return res.send(404);
			// security had to be turned off since this stupid appsecre_proof is not accepted
			// var appsecret_proof= crypto.createHmac('sha256', accountKit.app_secret).update(respBody.access_token).digest('base64');
			var params = {access_token: respBody.access_token/*, appsecret_proof: appsecret_proof,*/};
			var me_endpoint_url = accountKit.me_endpoint_base_url + '?' + Querystring.stringify(params);
			Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
				if (err) return res.send(err);
				User.findById(respBody.phone.number, function(err, record){
					if(record){
						var accessToken = UserLib.generateAccessToken(record);
						res.session.user = record;
						res.status(200);
						return res.send({status: true, access_token: accessToken, user: record});
					}else{
						req.session.partialRegistration = respBody.phone.number;
						res.redirect('/register');
					}
				});
	    	}); //End Request
	    }); //End Request
	});
	
	app.get('/register',function (req, res, next) {
		res.render('pages/register', {
			title: "Logical Address | Register your Logical Address",
			page: 'register',
			app_title: "Logical Address"
		});
	});
	
	app.get('/register/business',function (req, res, next) {
		res.render('pages/register-business', {
			title: "Logical Address | Logical Address for Business",
			page: 'register-business',
			app_title: "Logical Address"
		});
	});
	
	app.get('/password/recovery',function (req, res, next) {
		res.render('pages/forgot-password', {
			title: "Logical Address | Password Recovery",
			page: 'forgot-password',
			app_title: "Logical Address"
		});
	});
};