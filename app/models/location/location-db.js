var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required : true, index: true},
	location_type: String, // {home, work, mobile, business, event}
	trace_id: String,

	// gps: {
	// 	longitude: { type: String, default: ''},
	// 	latitude: { type: String, default: ''}
	// },
	// gps: { type: Object, index: '2d', default: {longitude: 0.0, latitude: 0.0}},
	gps: { type: [Number], index: '2d', default: [0, 0]},
	altitude: { type: String, default: ''},
	altitude_accuracy: { type: String, default: ''},
	speed: { type: String, default: ''},

	expires_at: Date, 
	enabled: { type: Boolean, default: true},

	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now},

	verify_change: { type: String, default: '########'}
});

LocationSchema.set('autoIndex', true);
var Location = mongoose.model('Location', LocationSchema);

module.exports.LocationModel = Location;

