var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortCodeSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required: true, index: true},
	location_ref: {type: Schema.ObjectId, ref: 'Location', required : true},

	trace_id: {
		type: String,
		index: true,
		// unique: true,
		required : true
	},

	code_type: {
		type: String,
		default: 'default', // {memorable => $0.99, custom => $4.99}
		required : true
	},

	short_code: {
		unique: true,
		index: true,
		type: String,
		required: true,
	},

	enabled: { type: Boolean, default: true},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now}
});

ShortCodeSchema.set('autoIndex', true);
var ShortCode = mongoose.model('shortcode', ShortCodeSchema);

module.exports.ShortCodeModel = ShortCode;

