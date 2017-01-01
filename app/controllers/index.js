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
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.get('/login',function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/login', {
			title: "Logical Address | Login to Logical Address",
			page: 'login',
			csrfToken: req.csrfToken(),
			FACEBOOK_APP_ID: accountKit.app_id,
			ACCOUNT_KIT_API_VERSION: accountKit.api_version,
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/login',function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
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
				var mobile_number = respBody.phone.number;
				User.findById(mobile_number, function(err, record){
					if(record){
						var accessToken = UserLib.generateAccessToken(record);
						req.session.user = record;
						return res.redirect('/');
					}else{
						req.session.mobile_number = mobile_number;
						return res.redirect('/register');
					}
				});
	    	}); //End Request
	    }); //End Request
	});
	
	app.get('/register',function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/register', {
			title: "Logical Address | Register your Logical Address",
			page: 'register',
			csrfToken: req.csrfToken(),
			app_title: "Logical Address",
			mobile_number: _.has(req.session, 'mobile_number') ? req.session.mobile_number : '',
			messages: req.flash('error'),
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/register',function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		if ( ( (_.has(req.body, 'mobile_number') && !_.isEmpty(req.body.mobile_number.trim())) || 
		_.has(req.session, 'mobile_number') ) && _.has(req.body, 'first_name') && 
		_.has(req.body, 'last_name') && _.has(req.body, 'password') && 
		!_.isEmpty(req.body.first_name.trim()) && 
			!_.isEmpty(req.body.password.trim())) {

			if(_.has(req.session, 'mobile_number')) {
				req.body.mobile_number = req.session.mobile_number;
				req.body.username = req.session.mobile_number;
			}else{
				req.body.username = req.body.mobile_number;
			}
			
			User.register(req.body, function(err, record){
			
				if(record){
					var accessToken = UserLib.generateAccessToken(record);
					req.session.user = record;
					delete req.session.mobile_number;
					return res.redirect('/');//TODO redirect to previous url
				}
				
				if (err == 'Duplicate Entry') {
					req.flash('error', 'Dublicate Entry');
				}else{
					req.flash('error', 'An unknown error occured' + err);
				}
				return res.redirect('/register'); //TODO get previous redirect
			});
		}else{
			if(_.has(req.session, 'mobile_number')) {
				req.flash('error', 'first name and password are required.');
			}else{
				req.flash('error', 'first name, mobile number and password are required.');	
			}
			return res.redirect('/register');
		}
	});
	
	app.get('/register/business',function (req, res, next) {
		res.render('pages/register-business', {
			title: "Logical Address | Logical Address for Business",
			page: 'register-business',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.get('/password/recovery',function (req, res, next) {
		res.render('pages/forgot-password', {
			title: "Logical Address | Password Recovery",
			page: 'forgot-password',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.get('/logout',function (req, res, next) {
		delete req.session.user;
		res.redirect('/');
	});
};