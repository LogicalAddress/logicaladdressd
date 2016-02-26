var UserModel = require('./user/user-db').UserModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var hash = require('md5');
var async = require('async');


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

	var context = (context ? context : this);
	var that = this;

	if (_.isObject(user) && _.has(user,'username') && 
		_.has(user, 'password') && !_.isEmpty(user.username) && 
		!_.isEmpty(user.password)) {	
		
		user.username = hash(user.username.trim().toLowerCase());
		user.password = hash(user.password.trim().toLowerCase());
		
		this.findUserByUsername(user, function(err, record){

			if (record) {
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
			  	that.emit("user_created", record.toObject());
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

User.prototype.findUserByUsername = function(user, callback, context) {

	var context = (context ? context : this);

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

};


/*
*
* @Method auth
* @Params user {Object} with a compulsory username and password field
* @Params callback {Function}
*
**/

User.prototype.auth = function(user, callback, context) {

	var context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'username') &&
		_.has(user,'password') && !_.isEmpty(user.username.trim()) && 
		!_.isEmpty(user.password.trim())) {

		user.username = hash(user.username.trim().toLowerCase());
		user.password = hash(user.password.trim().toLowerCase());

		UserModel.findOne({username: user.username, password: user.password})
		.lean().exec(
			function(err, row){

			if (row) {
				row = _.omit(row, ['password','q_book','q_space','q_mother','q_animal']);
				return (_.isFunction(callback) ? callback.apply(context, [row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
		});

	}else{
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}

};


User.prototype.delete = function(user) {
	UserModel.remove({_id: user._id}).exec();
	this.emit('user_deleted', user));
};

var userContext = new User();

userContext.on('user_created', function(user){
	// Faire quelques chose pour l'user
});

module.exports = userContext;