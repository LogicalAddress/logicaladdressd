var User = require('../models/user');
var _ = require("underscore");
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

module.exports = function (app) {
	
	app.get('/user/settings', csrfProtection, function (req, res, next) {
		
		if(!_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/user-setting', {
			title: "Logical Address | Account Setting",
			page: 'user-setting',
			csrfToken: req.csrfToken(),
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.put('/user/seturl', csrfProtection, function (req, res, next) {
		if(!_.has(req.session, 'user')) return res.redirect('/');
		if(!_.has(req.body, 'custom_url')){
			req.flash('error', 'invalid request');
			return res.redirect('/user/settings');
		}
		var custom_url = req.body.custom_url.trim();
		if(custom_url.split(' ').length > 1 || custom_url.split('-').length > 1){
			// TODO use regEx to validate ID
			req.flash('error', 'invalid profile ID, space not allowed');
			return res.redirect('/user/settings');
		}
		
		User.findOne({custom_url: custom_url}, function(err, response){
			if(response){
				req.flash('error', 'profile name already taken, please choose another one.');
				return res.redirect('/user/settings');
			}
			User.update(req.session.user, {
				custom_url: custom_url,
				custom_url_updated_at: Date.now(),
			}, function(err, updatedUser){
				if(updatedUser){
					req.session.user = updatedUser;
					req.flash('message', 'Updated.');
					return res.redirect('/user/settings');
				}else{
					req.flash('error', 'Something went wrong, Unable to update.');
					return res.redirect('/user/settings');
				}
			});
		});
	});
	
};