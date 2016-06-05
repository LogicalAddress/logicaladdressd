var UserLib = require('../lib/user');
var _ = require('underscore');
var helpers = require('../lib/helpers');
var hash = require('md5');
var User = require('../models/user');

module.exports = function (app) {

	app.post('/accountKit', function (req, res, next) {
		if (!_.has(req.body, 'accountId')) {
			res.status(400);
			return res.json({status: false, reason: 'Invalid Parameters'});
		}
		User.accountKitAuth(req.body.accountId, function(err, record){
			if (record) {
				var accessToken = UserLib.generateAccessToken(record);
				res.status(200);
				return res.json({status: true, access_token: accessToken, 
					user: record});
			}else{
				var regData =  { username: req.body.accountId, password: "yahweh",
			        q_animal: "Goat", q_mother: "B", q_space: "Moon", q_book: "Digital Fortress",};
				User.register(regData, function(err, record){
					if(record){
						User.accountKitAuth(req.body.accountId,
							function(err, record){
							if (record) {
								var accessToken = UserLib.generateAccessToken(record);
								console.log("generated access token voila");
								console.log(accessToken);
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
						res.status(401);
						return res.json({
							status: false, 
							message: 'Authentication Failed', 
							reason: err
						});
					}
				});
			}
		});
	});	
};