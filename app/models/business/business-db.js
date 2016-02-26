var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required : true, index: true},
	location_ref: {type: Schema.ObjectId, ref: 'Location', required : true},
	nearby_trace_ids: Array,

	trace_id: {
		type: String,
		index: true,
		unique: true,
		required : true,
	},

	business_name: { type: String, default: ''},
	mobile_number: String,
	city: { type: String, default: ''},
	address: { type: String, default: ''},
	tags: Array, // {wedding, bank, money, market}

	expires_at: Date,
	enabled: { type: Boolean, default: true},

	verified: { type: Boolean, default: false},

	locked: { type: Boolean, default: false},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},
});

BusinessSchema.set('autoIndex', true);
var Business = mongoose.model('Business', BusinessSchema);

module.exports.BusinessModel = Business;