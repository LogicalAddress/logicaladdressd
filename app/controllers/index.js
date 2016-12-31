var accountKit = require('../../config/accountKit');
var Querystring  = require('querystring');
var Request = require('request');

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
	
	app.post('/login',function (request, response, next) {
		console.log('code: ' + request.body.code);
		// CSRF check
		if (request.body.csrf_nonce === req.body._csrf) {
			var app_access_token = ['AA', accountKit.app_id, accountKit.app_secret].join('|');
	    	var params = { grant_type: 'authorization_code', code: request.body.code,
	    	access_token: app_access_token };
	    	// exchange tokens
	    	var token_exchange_url = accountKit.token_exchange_base_url + '?' + Querystring.stringify(params);
	    	Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
		    	var view = { user_access_token: respBody.access_token, expires_at: respBody.expires_at,
		        	user_id: respBody.id, };
	    		// get account details at /me endpoint
	    		var me_endpoint_url = accountKit.me_endpoint_base_url + '?access_token=' + respBody.access_token;
	    		Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
		        	// send login_success.html
		        	if (respBody.phone) {
		        		view.phone_num = respBody.phone.number;
		        	} else if (respBody.email) {
		        		view.email_addr = respBody.email.address;
		        	}
	        		response.send(view);
	    		}); //End Request
	    	});
		} else {
	    	// login failed
	    	response.writeHead(200, {'Content-Type': 'text/html'});
	    	response.end("Something went wrong. :( ");
		}
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