var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required : true, index: true},
	location_ref: {type: Schema.ObjectId, ref: 'Location', required : true},
	nearby_trace_ids: Array,

	trace_id: {
		type: String,
		index: true,
		unique: true,
		required : true,
	},

	work_name: { type: String, default: ''},
	city: { type: String, default: ''},
	address: { type: String, default: ''},
	tags: Array, // {wedding, bank, money, market}

	expires_at: Date,
	enabled: { type: Boolean, default: true},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},	

	// Feature Purpose (Refer to another row containing the location of {this} user)
	uses_clone: { type: Boolean, default: false},
	cloned_work_id: { type: String, default: ''}
});

WorkSchema.set('autoIndex', true);
var Work = mongoose.model('Work', WorkSchema);

module.exports.WorkModel = Work;