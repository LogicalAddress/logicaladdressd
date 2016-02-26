var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required: true, index: true},
	location_ref: {type: Schema.ObjectId, ref: 'Location', required : true},
	nearby_trace_ids: Array,

	trace_id: {
		type: String,
		index: true,
		unique: true,
		required : true
	},

	city: { type: String, default: ''},

	address: { type: String, default: ''},

	enabled: { type: Boolean, default: true},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now}
});

HomeSchema.set('autoIndex', true);
var Home = mongoose.model('Home', HomeSchema);

module.exports.HomeModel = Home;

