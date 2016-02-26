var ShortCodeModel = require('./shortcode/shortcode-db').ShortCodeModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var getDefaultShortCode = require('../lib/generate_default_short_code');
var getBusDefaultCode = require('../lib/generate_business_default_short_code');
var getMemorableShortCode = require('../lib/generate_memorable_short_code');
var Payment = require('./payment');


/*
* An interface to the ShortCodeModel
* @Class ShortCode
* 
**/

function ShortCode(){

}

util.inherits(ShortCode, EventEmitter);


// /*
// * Save The short code against the currently logged in user
// * @Method save
// * 
// **/

// ShortCode.prototype.registerBusinessDefault = function(data) {
// 	var context = (context ? context : this);
// 	if (_.isObject(data) && _.has(data, 'trace_id')) {
// 		ShortCodeModel.findOne({trace_id: data.trace_id, code_type: 'default'}, 
// 			function (err, record) {
// 			if (!record) {
// 				var record_model = new ShortCodeModel();
// 				record_model.user_ref = data.user_ref;
// 				record_model.location_ref = data.location_ref;
// 				record_model.trace_id = data.trace_id;
// 				record_model.short_code = getBusDefaultCode();
// 				record_model.code_type = 'default';
// 				record_model.save(function(err, record){
// 					if (record) {
// 						return (_.isFunction(callback) ? callback.apply(context, 
// 							[null, record.toObject()]) : null);
// 					}else{
// 						return (_.isFunction(callback) ? callback.apply(context, 
// 							["Can't Save: " + err]) : null);
// 					}
// 				});
// 			}else{
// 				return (_.isFunction(callback) ? callback.apply(context, 
// 					['Duplicate Entry']) : null);
// 			}
// 		});
// 	}else{
// 		return (_.isFunction(callback) ? callback.apply(context, 
// 			['Invalid Parameters']) : null);
// 	}
// };


/*
* Save The short code against the currently logged in user
* @Method save
* 
**/

ShortCode.prototype.registerBusinessDefault = function(data) {

	if (_.isObject(data) && _.has(data, 'trace_id')) {

		var that = this;

		ShortCodeModel.findOne({trace_id: data.trace_id, code_type: 'default'},
		 function (err, record) {

				if (!record) {

					var record_model = new ShortCodeModel();
					record_model.user_ref = data.user_ref;
					record_model.location_ref = data.location_ref;
					record_model.trace_id = data.trace_id;
					record_model.short_code = getBusDefaultCode();
					record_model.code_type = 'default';

					record_model.save(function(err, record){
						if (record) {
							that.emit("create_shortcode_complete", 
								null, record.toObject());
						}else{
							that.emit("create_shortcode_complete", 
								"Can't Save: " + err);
						}
					});

				}else{
					that.emit("create_shortcode_complete", 'Duplicate Entry');
				}
		});

	}else{
		return this.emit("create_shortcode_complete", 'Invalid Parameters');
	}

};


/*
* Save The short code against the currently logged in user
* @Method save
* 
**/

ShortCode.prototype.registerDefault = function(data) {

	if (_.isObject(data) && _.has(data, 'trace_id')) {

		var that = this;

		ShortCodeModel.findOne({trace_id: data.trace_id, code_type: 'default'},
		 function (err, record) {

				if (!record) {

					var record_model = new ShortCodeModel();
					record_model.user_ref = data.user_ref;
					record_model.location_ref = data.location_ref;
					record_model.trace_id = data.trace_id;
					record_model.short_code = getDefaultShortCode();
					record_model.code_type = 'default';

					record_model.save(function(err, record){
						if (record) {
							that.emit("create_shortcode_complete", null, 
								record.toObject());
						}else{
							that.emit("create_shortcode_complete", 
								"Can't Save: " + err);
						}
					});
				}else{
					that.emit("create_shortcode_complete", 'Duplicate Entry');
				}
		});
	}else{
		return this.emit("create_shortcode_complete", 'Invalid Parameters');
	}
};


// /*
// * Save The short code against the currently logged in user
// * @Method save
// * 
// **/

// ShortCode.prototype.registerDefault = function(data) {
// 	var context = (context ? context : this);
// 	if (_.isObject(data) && _.has(data, 'trace_id')) {
// 		ShortCodeModel.findOne({trace_id: data.trace_id, code_type: 'default'}, 
// 			function (err, record) {
// 			if (!record) {
// 				var record_model = new ShortCodeModel();
// 				record_model.user_ref = data.user_ref;
// 				record_model.location_ref = data.location_ref;
// 				record_model.trace_id = data.trace_id;
// 				record_model.short_code = getDefaultShortCode();
// 				record_model.code_type = 'default';
// 				record_model.save(function(err, record){
// 					if (record) {
// 						return (_.isFunction(callback) ? callback.apply(context, 
// 							[null, record.toObject()]) : null);
// 					}else{
// 						return (_.isFunction(callback) ? callback.apply(context, 
// 							["Can't Save: " + err]) : null);
// 					}
// 				});
// 			}else{
// 				return (_.isFunction(callback) ? callback.apply(context, 
// 					['Duplicate Entry']) : null);
// 			}
// 		});
// 	}else{
// 		return (_.isFunction(callback) ? callback.apply(context, 
// 			['Invalid Parameters']) : null);
// 	}
// };


ShortCode.prototype.registerRandomMemorable = function(data, callback, context){
	var context = (context ? context : this);
	var that = this;
	if (_.isObject(data) && _.has(data, 'trace_id') && 
		_.has(data, 'user_ref')) {
		Payment.findRecord({user_ref: data.user_ref, active: true, 
			code_type: 'memorable'}, function (err, paymentRecord) {
			if (paymentRecord) {
				var record_model = new ShortCodeModel();
				record_model.user_ref = data.user_ref;
				record_model.location_ref = data.location_ref;
				record_model.trace_id = data.trace_id;
				record_model.short_code = getMemorableShortCode();
				record_model.code_type = 'memorable';
				record_model.save(function(err, record){
					if (record) {
						that.emit("flag_payment", paymentRecord);
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, record.toObject()]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't Save: " + err]) : null);
					}
				});
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['No active payment record found']) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};



ShortCode.prototype.registerCustom = function(data, callback, context) {
	var context = (context ? context : this);
	var that = this;
	if (_.isObject(data) && _.has(data, 'trace_id')	&& 
		_.has(data, 'user_ref') && _.has(data, 'custom')) {
		Payment.findRecord({user_ref: data.user_ref, active: true, 
			code_type: 'custom'}, function (err, paymentRecord) {
			if (paymentRecord) {
				var record_model = new ShortCodeModel();
				record_model.user_ref = data.user_ref;
				record_model.location_ref = data.location_ref;
				record_model.trace_id = data.trace_id;
				record_model.short_code = data.custom;
				record_model.code_type = 'custom';
				record_model.save(function(err, record){
					if (record) {
						that.emit("flag_payment", paymentRecord);
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, record.toObject()]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't Save: " + err]) : null);
					}
				});
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['No active payment record found']) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};

/*
*
* @Method findRecordByUserId
* @Params user {Object} with a compulsory user_ref field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

ShortCode.prototype.findRecordByLongShortCode = function(longorshortcode, 
	callback, context) {
	var context = (context ? context : this);
	if (_.isString(longorshortcode) && !_.isEmpty(longorshortcode.trim())) {
		ShortCodeModel.findOne( {
			enabled: true, 
			'$or': [ { short_code: longorshortcode }, 
			{ trace_id: longorshortcode } ] 
		} ).populate('location_ref').lean().exec(
			function(err, row){
			if (row) {
				// row = _.omit(row, ['location_ref'/*,'user_ref'*/]);
				var gps = {longitude: row.location_ref.gps[0], 
					latitude: row.location_ref.gps[1]};
				row.location_ref.gps = gps;
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['No Record Found']) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};

module.exports = new ShortCode();