var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required : true, index: true},
	location_ref: {type: Schema.ObjectId, ref: 'Location', required : true},
	business_ref: {type: Schema.ObjectId, ref: 'Business', required : true},
	
	global_logical_address: { type: String, required : true, index: true},
	
	verified: { type: Boolean, default: false},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},	
});

EmployeeSchema.set('autoIndex', true);
var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports.EmployeeModel = Employee;