var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username : 	{type:String, required : true, unique : true, index: true},
	password: 	{type:String, required : true},
	
	email: 	{type:String, required : true, unique : true, index: true},
	first_name: {type:String},
	last_name: {type:String},
	mobile_number: {type:String, required : true, unique : true, index: true},
	global_logical_address: {type:String, required : true, unique : true, index: true},
	account_type: { type: String, default: 'personal'}, //or business

	q_animal: { type: String, default: 'Goat'},
	q_mother: { type: String, default: 'B'},
	q_space: { type: String, default: 'Pluto'},
	q_book: { type: String, default: 'Digital Fortress'},

	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},
	
	/*Social Life*/
	about: { type: String, default: ''},
	facebook: { type: String, default: ''},
	twitter: { type: String, default: ''},
	pinterest: { type: String, default: ''},
	youtube: { type: String, default: ''},
});

UserSchema.methods.maskPassword = function () {
	this.password = "FILTERED";
};


/**
 * @module UserHelper
 * @submodule UserModel
 */
UserSchema.set('autoIndex', true);
var UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;

