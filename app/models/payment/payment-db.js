var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({

	user_ref: { type: Schema.ObjectId, ref: 'User', required: true, index: true},

	code_type: {
		type: String,
		default: 'memorable', // {memorable => $0.99, custom => $4.99}
		required : true
	},

	amount: {
		type: Number,
		required: true,
	},

	active: { type: Boolean, default: true},
	
	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now}
});

PaymentSchema.set('autoIndex', true);
var Payment = mongoose.model('payment', PaymentSchema);

module.exports.PaymentModel = Payment;

