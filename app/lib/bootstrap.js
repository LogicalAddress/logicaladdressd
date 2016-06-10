/*
* Initialize Server with Params
*/
var hat = require('hat');
var Async = require('async');
var UserLib = require('./user');
var User = require('../models/user');
var config = require('../../config/config');

module.exports = function (req, res, next)
{
	Async.each(config.special_users, function(username, done){
		User.register({
			username: username,
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