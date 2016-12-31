var UserModel = require('./user/user-db').UserModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var hash = require('md5');
var async = require('async');
var generateGlobalLogicalAddress = require('../lib/generate_global_logical_address');


/*
* An interface to the UserModel
* @Class User
* 
**/

function User(){

}

util.inherits(User, EventEmitter);


/*
* Register the User Listen on 'register_success' and 'register_error' event
* @Method register
* @Params user {Object} with a compulsory username and password field
* 
**/

User.prototype.register = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'username') && 
		_.has(user, 'password') && !_.isEmpty(user.username) && 
		!_.isEmpty(user.password)) {	
		
		user.username = hash(user.username.trim().toLowerCase());
		user.password = hash(user.password.trim().toLowerCase());
		user.global_logical_address = generateGlobalLogicalAddress();
		if(!_.has(user, 'email')){
			user.email = user.global_logical_address + '@logicaladdress.com';
		}
		
		UserModel.find({ $or: [ {username: user.username}, 
		{email: user.email}, {mobile_number: user.mobile_number}]}, 
		function(err, record){

			if (err || record.length > 0) { 
				//however it works. voodoo is real: see http://stackoverflow.com/questions/14492118/or-search-using-mongoose
				return (_.isFunction(callback) ? callback.apply(context, 
					['Duplicate Entry']) : null);
			}

			var userModel = new UserModel(user);
			userModel.save(function (err, record) {
				if (err) {
					return (_.isFunction(callback) ? callback.apply(context, 
						[err]) : null);
				}
			  	record.maskPassword();
			  	process.emit("user_created", record.toObject());
			  	return (_.isFunction(callback) ? callback.apply(context, 
			  		[err, record.toObject()]) : null);
			});
		});			
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}

};

/*
*
* @Method findUserByUsername
* @Params user {Object} with a compulsory username field
* @Params callback {Function}
*
**/

/*User.prototype.findUserByUsername = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'username') &&
		!_.isEmpty(user.username.trim())) {

		UserModel.findOne({username: user.username}).lean().exec(function(err, row){
			if (row) {
				row = _.omit(row, ['password','q_book','q_space','q_mother','q_animal']);
				return (_.isFunction(callback) ? callback.apply(context, [err, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
		});

	}else{
		return (_.isFunction(callback) ? callback.apply(context, [null]) : null);
	}

};*/


/*
*
* @Method auth
* @Params user {Object} with a compulsory username and password field
* @Params callback {Function}
*
**/

User.prototype.auth = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'username') &&
		_.has(user,'password') && !_.isEmpty(user.username.trim()) && 
		!_.isEmpty(user.password.trim())) {

		UserModel.find({ $or: [ {username: hash(user.username.trim().toLowerCase()), 
		password: hash(user.password.trim().toLowerCase())}, 
		{email: user.username, password: user.password}, 
		{mobile_number: user.username, password: user.password},
		{global_logical_address: user.username, password: user.password}] });
		
		UserModel.find({ $or: [ {username: hash(user.username.trim().toLowerCase())}, 
		{email: user.username}, {mobile_number: user.username}]}, 
		function(err, record){
			
			if (err || record.length > 0) {
				row = _.omit(record[0].toObject(), ['password','q_book','q_space','q_mother','q_animal']);
				return (_.isFunction(callback) ? callback.apply(context, [err, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
			
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}

};

/*User.prototype.auth = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'username') &&
		_.has(user,'password') && !_.isEmpty(user.username.trim()) && 
		!_.isEmpty(user.password.trim())) {

		UserModel.find({ $or: [ {username: hash(user.username.trim().toLowerCase()), 
		password: hash(user.password.trim().toLowerCase())}, 
		{email: user.username, password: user.password}, 
		{mobile_number: user.username, password: user.password},
		{global_logical_address: user.username, password: user.password}] })
		.lean().exec(
			function(err, row){
			if (!err && row.length > 0) {
				row = _.omit(row[0], ['password','q_book','q_space','q_mother','q_animal']);
				return (_.isFunction(callback) ? callback.apply(context, [err, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}

};*/


/*User.prototype.accountKitAuth = function(accountId, callback, context) {
	context = (context ? context : this);
	if (_.isString(accountId) && !_.isEmpty(accountId.trim())) {
		accountId = hash(accountId.trim().toLowerCase());
		UserModel.findOne({username: accountId}).lean().exec(function(err, row){
			if (row) {
				row = _.omit(row, ['password','q_book','q_space','q_mother','q_animal']);
				return (_.isFunction(callback) ? callback.apply(context, [err, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}
};*/


User.prototype.delete = function(user) {
	UserModel.remove({_id: user._id}).exec();
	process.emit('user_deleted', user);
};

var userContext = new User();

process.on('user_created', function(user){
	// Faire quelques chose pour l'user
});

module.exports = userContext;