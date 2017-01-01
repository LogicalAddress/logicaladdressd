var accountKitConfig = require('../../config/accountKit')();
var Querystring  = require('querystring');
var Request = require('request');
var crypto = require('crypto');
var _ = require('underscore');

module.exports = function (req, callback)
{
	if(req.body.csrf_nonce !== req.body._csrf) return callback("Token Mismatch");
	
	var app_access_token = ['AA', accountKitConfig.app_id, accountKitConfig.app_secret].join('|');
	var params = { grant_type: 'authorization_code', code: req.body.code, access_token: app_access_token};
	var token_exchange_url = accountKitConfig.token_exchange_base_url + '?' + Querystring.stringify(params);
	Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
	    if (!_.has(respBody, 'access_token')) return callback(err);
		// security had to be turned off since this stupid appsecre_proof is not accepted
		// var appsecret_proof= crypto.createHmac('sha256', accountKitConfig.app_secret).update(respBody.access_token).digest('base64');
		var params = {access_token: respBody.access_token/*, appsecret_proof: appsecret_proof,*/};
		var me_endpoint_url = accountKitConfig.me_endpoint_base_url + '?' + Querystring.stringify(params);
		Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
			if (err) return callback.send(err);
			return callback(null, respBody.phone.number);
        }); //End Request
    }); //End Request
};
    