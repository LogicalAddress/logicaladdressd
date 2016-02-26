var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username : 	{type:String, required : true, unique : true, index: true},
	password: 	{type:String, required : true},

	q_animal: { type: String, default: 'Goat'},
	q_mother: { type: String, default: 'B'},
	q_space: { type: String, default: 'Pluto'},
	q_book: { type: String, default: 'Digital Fortress'},

	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now}
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

