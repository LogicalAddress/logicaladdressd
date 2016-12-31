/*
* Initialize Server with Params
*/
var hat = require('hat');
var Async = require('async');
var UserLib = require('./user');
var User = require('../models/user');
var config = require('../../config/config');

module.exports = function ()
{
    /*
    * Setup special system users. the users in the config should be consistent with that in
    * https://github.com/LogicalAddress/LaSociale
    */
	Async.each(config.special_users, function(user, done){
		User.register({
			username: user.username,
			email: user.username,
			mobile_number: user.username,
            password: hat(),
            q_animal: "Goat",
            q_mother: "B",
            q_space: "Moon",
            q_book: "Digital Fortress"
        }, function(err, record){
			if(record){
				done(null);
			}else if (err == 'Duplicate Entry') {
				done("Special users already created");
			}else{
				throw new Error('An unknown error occured');
			}				
		});
  	}, function(err){
    	if(err){
    		console.log(err);
    	}else{
    		console.log("Special users created");
    	}
  	});
};