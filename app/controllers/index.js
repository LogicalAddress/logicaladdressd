var AccountKitConfig = require('../../config/accountKit')();
var _ = require('underscore');
var AccountKitGetMobileNumber = require('../lib/accountKit');
var User = require('../models/user');
var UserLib = require('../lib/user');
var Business = require('../models/business');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var hash = require('md5');
var Employee = require('../models/employee');

module.exports = function (app) {

	app.get('/',function (req, res, next) {
		var data = {
			title: "Logical Address | Welcome to Logical Address",
			page: 'home',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		};
		return res.render('pages/index', data);
		// res.render('pages/search-result', data);
	});
	
	app.get('/login', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/login', {
			title: "Logical Address | Login to Logical Address",
			page: 'login',
			csrfToken: req.csrfToken(),
			FACEBOOK_APP_ID: AccountKitConfig.app_id,
			ACCOUNT_KIT_API_VERSION: AccountKitConfig.api_version,
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/login', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		AccountKitGetMobileNumber(req, function(err, mobile_number){
			if (err) return res.send(err);
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
		});
		
	});
	
	app.get('/register', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/register', {
			title: "Logical Address | Register your Logical Address",
			page: 'register',
			csrfToken: req.csrfToken(),
			FACEBOOK_APP_ID: AccountKitConfig.app_id,
			ACCOUNT_KIT_API_VERSION: AccountKitConfig.api_version,
			app_title: "Logical Address",
			mobile_number: _.has(req.session, 'mobile_number') ? req.session.mobile_number : '',
			messages: req.flash('error'),
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/register', csrfProtection, function (req, res, next) {
		
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
	
	app.get('/register/business', csrfProtection, function (req, res, next) {
		res.render('pages/register-business', {
			title: "Logical Address | Logical Address for Business",
			page: 'register-business',
			csrfToken: req.csrfToken(),
			FACEBOOK_APP_ID: AccountKitConfig.app_id,
			ACCOUNT_KIT_API_VERSION: AccountKitConfig.api_version,
			app_title: "Logical Address",
			mobile_number: _.has(req.session, 'mobile_number') ? req.session.mobile_number : '',
			messages: req.flash('error'),
			regstate: req.session.regstate || 0,
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/register/business', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		
		switch(req.session.regstate) {
		    case 1:
		        if (!_.has(req.body, 'first_name') || !_.has(req.body, 'password') ||
		        _.isEmpty(req.body.password) || _.isEmpty(req.body.first_name)){
		        	req.flash('error', 'First name and password are required.');
		        	return res.redirect('/register/business');
		        }
		        //email is not required
		        if(_.has(req.body, 'email') && req.body.email.length > 0){
			        User.findById(req.body.email, function(err, record){
			        	if(record){
					        req.flash('error', 'This email cannot be used, choose a different one.');
			        		return res.redirect('/register/business');
			        	}else{
			        		req.session.contact_person = req.session.contact_person || {};
					        req.session.contact_person.email = req.body.email;
					        req.session.contact_person.first_name = req.body.first_name;
					        req.session.contact_person.password = req.body.password;
					        req.session.contact_person.last_name = req.body.last_name || '';
					        req.session.contact_person.mobile_number = req.session.mobile_number;
					        req.session.contact_person.username = req.session.mobile_number;
					        req.session.contact_person.account_type = 'business';
					        req.session.regstate++;
					        return res.redirect('/register/business');
			        	}
			        });
		        }else{
					req.session.contact_person = req.session.contact_person || {};
					req.session.contact_person.first_name = req.body.first_name;
					req.session.contact_person.password = req.body.password;
					req.session.contact_person.last_name = req.body.last_name || '';
					req.session.contact_person.mobile_number = req.session.mobile_number;
					req.session.contact_person.username = req.session.mobile_number;
					req.session.contact_person.account_type = 'business';
					req.session.regstate++;
			        return res.redirect('/register/business');
		        }
		        break;
		    case 2:
		    	User.register(req.session.contact_person, function(err, user){
					if(user){
		        		req.body.tags = req.body.tags.split(", ");
						Business.createRecord(user, req.body, function(err, business){
							if (business) {
								Business.updateLocation(user, business._id.toString(), {
									gps: { longitude: req.body.longitude, latitude: req.body.latitude},
								}, function(err, record){
									if(record){
										var accessToken = UserLib.generateAccessToken(user);
										req.session.user = user;
										delete req.session.contact_person;
						        		delete req.session.mobile_number;
						        		delete req.session.regstate;
										req.flash('info', 'Registration Successful');
										return res.redirect('/');
									}else{
										User.delete(user); //undo all above and restart step II
										req.flash('error', 'Something went wrong, Unable to create location.');
										return res.redirect('/register/business');
									}
								});
							}else{
								User.delete(user); //undo all above and restart step II
								req.flash('error', 'Something went wrong, Unable to create business.');
								return res.redirect('/register/business');
							}
						});
					}else{
						req.flash('error', 'Something went wrong. Unable to create user.');
						return res.redirect('/register/business');
					}
				});
		        break;
		    default:
		    AccountKitGetMobileNumber(req, function(err, mobile_number){
				if (err) return res.send(err);
				User.findById(mobile_number, function(err, record){
					if(record){
						var accessToken = UserLib.generateAccessToken(record);
						req.session.user = record;
						return res.redirect('/');
					}else{
						req.session.regstate = 1;
						req.session.mobile_number = mobile_number;
						return res.redirect('/register/business');
					}
				});
			});
		}
			
	});
	
	app.get('/password/recovery',function (req, res, next) {
		res.render('pages/forgot-password', {
			title: "Logical Address | Password Recovery",
			page: 'forgot-password',
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.get('/verification_code', csrfProtection, function (req, res, next) {

		if(!_.has(req.session, 'user')) return res.redirect('/');
		
		res.render('pages/verification_code', {
			title: "Logical Address | Verify Your Physical Address",
			page: 'verification_code',
			csrfToken: req.csrfToken(),
			app_title: "Logical Address",
			user: _.has(req.session, 'user') ? req.session.user : false
		});
	});
	
	app.post('/verification_code', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) return res.redirect('/');
		req.flash('message', 'Invalid code');
		return res.redirect('/verification_code');
	});
	
	app.get('/profile', csrfProtection, function (req, res, next) {

		if(!_.has(req.session, 'user')) return res.redirect('/');
		
		if(req.session.user.account_type == "personal"){
			res.render('pages/user-profile', {
				title: "Logical Address | Your Profile",
				page: 'user-profile',
				csrfToken: req.csrfToken(),
				app_title: "Logical Address",
				user: _.has(req.session, 'user') ? req.session.user : false
			});
		}else{
			Business.findRecordsByUserId(req.session.user, function(err, businesses){
				res.render('pages/business-profile', {
					title: "Logical Address | Your Profile",
					page: 'business-profile',
					csrfToken: req.csrfToken(),
					app_title: "Logical Address",
					user: _.has(req.session, 'user') ? req.session.user : false,
					business: businesses[0],
				});	
			});
		}
		
			
	});
	
	app.get('/logout',function (req, res, next) {
		delete req.session.user;
		res.redirect('/');
	});
	
	app.put('/user/update', csrfProtection, function (req, res, next) {
		if(!_.has(req.session, 'user')) return res.redirect('/');
		User.update(req.session.user, req.body, function(err, updatedUser){
			if(updatedUser){
				req.session.user = updatedUser;
				req.flash('message', 'Updated.');
				return res.redirect('/profile');
			}else{
				req.flash('error', 'Something went wrong, Unable to update.');
				return res.redirect('/profile');
			}
		});
	});
	
	app.put('/password/update', csrfProtection, function (req, res, next) {
		if(!_.has(req.session, 'user')) return res.redirect('/');
		if(!_.has(req.body, 'new_password') || !_.has(req.body, 'confirm_new_password') || 
		req.body.new_password.trim().length === 0 || req.body.new_password !== req.body.confirm_new_password){
			req.flash('error', 'Something went wrong, Unable to update password.');
			return res.redirect('/profile');
		}
		if(_.has(req.body, 'current_password') && req.session.user.password == hash(req.body.current_password)){
			User.updatePassword(req.session.user, {password: hash(req.body.new_password)}, function(err, updatedUser){
				if(updatedUser){
					req.session.user = updatedUser;
					req.flash('message', 'Updated.');
					return res.redirect('/profile');
				}else{
					req.flash('error', 'Something went wrong, Unable to update password.');
					return res.redirect('/profile');
				}
			});
		}else{
			req.flash('error', 'Something went wrong, Unable to update password.');
			return res.redirect('/profile');
		}
			
	});
	
	
	app.get('/employee', csrfProtection, function (req, res, next) {

		if(!_.has(req.session, 'user')) return res.redirect('/');
		if(req.session.user.account_type != "business") return res.redirect('/');
		Business.findRecordsByUserId(req.session.user, function(err, record){
			if (record) {
        		Employee.findByBusId(record[0]._id, function(err, record){
        			if (record) {
        				return res.render('pages/employee-list', {
							title: "Logical Address | Employee List",
							page: 'employee-list',
							csrfToken: req.csrfToken(),
							app_title: "Logical Address",
							user: _.has(req.session, 'user') ? req.session.user : false,
							employees: record
						});
        			}else{
        				 return res.redirect('/');
        			}
        
        		});
    		}else{
				return res.redirect('/');
			}
		});
	});
	
	app.post('/employee', function (req, res, next) {
		if(!_.has(req.session, 'user')) return res.redirect('/');
		if(req.session.user.account_type != 'business'){
		    req.flash('error', 'Only business account can make this call');
			return res.redirect('/employee');
		}
		if(!_.has(req.body, 'global_logical_address')){
		    req.flash('error', 'Please supply the employee\'s global logical address');
			return res.redirect('/employee');
		}
		Business.findRecordsByUserId(req.session.user, function(err, records){
			if (records) {
			    records[0].global_logical_address = req.body.global_logical_address;
        		Employee.createRecord(records[0], function(err, record){
        			if (record) {
        				req.flash('message', 'Employee added');
						return res.redirect('/employee');
        			}else{
        				req.flash('error', 'Unable to add employee, ensure it\'s not a business account');
						return res.redirect('/employee');
        			}
        		});
			}else{
			    req.flash('error', 'An unknown error occured');
				return res.redirect('/employee');
			}
		});
	});

};