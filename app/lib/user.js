var jwt = require('jwt-simple');
var _ = require('underscore');
var hat = require('hat');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var secret = require('../../config/secret')();


/*
* An interface to the UserModel
* @Class UserLib
* 
**/ 

function UserLib(){

}

util.inherits(UserLib, EventEmitter);


/**
* Generate Access Token
* @method generateAccessToken
* @param user_object {Object} the request object
* @return accessToken {String} Lifetime accessToken
* 
**/

UserLib.prototype.generateAccessToken = function(user_object){

	if (!_.isObject(user_object) || !_.has(user_object, '_id') || 
		!_.has(user_object, 'username') ) {
		return undefined;
	}

	var payload = { user: user_object, salt: hat()};
	
	var accessToken = jwt.encode(payload, secret);

	return accessToken;
};

/**
* Convert accessToken to User Object
* @method accessTokenToUserObj
* @param accessToken {String} the accessToken
* @return userObj {Object}
* 
**/

UserLib.prototype.accessTokenToUserObj = function(accessToken){

	if (!_.isString(accessToken)) {
		return null;
	}

	try {
		var userObj = jwt.decode(accessToken, secret);
		return userObj;
	}catch(err){
		return null;
	}

};

// TODO: Not Tested

UserLib.prototype.veryfyAccessToken = function(sessionObj){

	if (_.isObject(sessionObj) && _.has(sessionObj, 'user')) {
		return true;
	}else{
		return false;
	}

};


module.exports = new UserLib();