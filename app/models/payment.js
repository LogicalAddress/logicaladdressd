var PaymentModel = require('./payment/payment-db').PaymentModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;


/*
* An interface to the PaymentModel
* @Class Payment
* 
**/

function Payment(){

}

util.inherits(Payment, EventEmitter);


/*
* Save payment details against the currently logged in user
* @Method save
* 
**/

Payment.prototype.register = function(user_id, code_type, amount, callback, context) {
	context = (context ? context : this);
	if ( user_id && _.isString(code_type) && _.isNumber(amount) ) {
		var record_model = new PaymentModel();
		record_model.user_ref = user_id;
		record_model.code_type = code_type;
		record_model.amount = amount;
		record_model.save(function(err, record){
			if (record) {
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, record.toObject()]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					["Can't Save: " + err]) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};


Payment.prototype.findRecord = function(query, callback, context) {
	context = (context ? context : this);
	if ( _.isObject(query) ) {
		PaymentModel.findOne(query).lean().exec(function(err, row){
			if (row) {
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['No record Found']) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};


Payment.prototype.findAll = function(query, callback, context) {
	context = (context ? context : this);
	if ( _.isObject(query) ) {
		PaymentModel.find(query).lean().exec(function(err, row){
			if (row) {
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['No record Found']) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};


var paymentContext = new Payment();

process.on('flag_payment', function(paymentRecord){
	
	var data = {};
	data.updated_at = new Date();
	data.active = false;

	PaymentModel.findOneAndUpdate({_id: paymentRecord._id}, 
		{$set: data}, {new: true}, function (err, record) {
		if (!record) {
			console.log("unable to flag_payment");
			console.log(err);
		}
	});
});

module.exports = paymentContext;