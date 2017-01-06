var UserModel = require('./user/user-db').UserModel;
var BusinessModel = require('./business/business-db').BusinessModel;
var Location = require('./location');
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var hash = require('md5');


/*
* An interface to the BusinessModel
* @Class Business
* 
**/

function Business(){

}

util.inherits(Business, EventEmitter);


/*
* Register the User Listen on 'register_success' and 'register_error' event
* @Method register
* @Params user {Object} with a compulsory username and password field
* 
**/

Business.prototype.save = function(user, data, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id') && 
		_.has(data, 'location_ref') && _.has(data, 'trace_id')) {

		var record_model = new BusinessModel();
		record_model.user_ref = user._id;
		record_model.location_ref = data.location_ref;
		record_model.trace_id = data.trace_id;
		record_model.business_name = data.business_name;
		record_model.mobile_number = data.mobile_number;
		record_model.city = data.city;
		record_model.address = data.address;
		record_model.tags = (_.has(data, 'tags') && _.isArray(data.tags) ? 
			data.tags : []);

		record_model.save(function(err, record){
			if (record) {
				process.emit("business_created", record.toObject());
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, record.toObject()]) : null );
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



/*
* Create BusinessTrace Code for User
* @Method CreateRecord
* @Params user {Object} with a compulsory User.user_ref
* 
**/

Business.prototype.createRecord = function(user, businessData, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.isObject(businessData)) {

			Location.create({user_ref: user._id, 
				location_type: 'business'}, function(err, response){	
				if (err) {
					return (_.isFunction(callback) ? callback.apply(context, 
						[err]) : null);
				}

				var trace_id = hash(response._id.toString());

				businessData.user_ref = user._id;
				businessData.location_ref = response._id;
				businessData.trace_id = trace_id;

				this.save(user, businessData, 
					function(err, response){
					if (err) {
						return (_.isFunction(callback) ? callback.apply(context, 
							[err]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, response]) : null );
					}
				});

			}, this); //{this} ==> Maintain current context
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};

/*
*
* @Method findRecordsByUserId
* @Params user {Object} with a compulsory user_ref field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

Business.prototype.findRecordsByUserId = function(user, callback, context) {
	
	context = (context ? context : this);
	if (_.isObject(user) && _.has(user,'_id')) {
		BusinessModel.find(
			{user_ref: user._id}).populate('location_ref').lean().exec(
			function(err, rows){
			if (rows) {

				for (var i = rows.length - 1; i >= 0; i--) {
					var gps = {longitude: rows[i].location_ref.gps[0], 
								latitude: rows[i].location_ref.gps[1]};
					rows[i].location_ref.gps = gps;
				}
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, rows]) : null);
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

/*
*
* @Method findRecordByTraceId
* @Params user {Object} with a compulsory user_ref field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

Business.prototype.findRecordByTraceId = function(trace_id, callback, context) {
	
	context = (context ? context : this);

	if (!_.isEmpty(trace_id)) {
		BusinessModel.findOne(
			{trace_id: trace_id}).populate('location_ref').lean().exec(
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

/*
*
* @Method findByUserAndId
* @Params user {Object} with a compulsory user_ref field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

Business.prototype.findByUserAndId = function(user_id, busId, callback, context) {

	context = (context ? context : this);

	if (!_.isNull(user_id) && !_.isNull(busId)) {
		BusinessModel.findOne({user_ref: user_id,
			_id: busId}).populate('location_ref').lean().exec(
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

/*
* TODO: Not Tested
*/

Business.prototype.update = function(user, bId, data, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id') &&
		!_.has(data, 'location_ref') && !_.has(data, 'user_ref') && 
		!_.has(data, 'trace_id') && !_.has(data, 'enabled') && 
		!_.has(data, 'created_at') && !_.has(data, 'updated_at') &&
		_.isString(bId) && !_.isNull(bId)) {

		this.findByUserAndId(user._id, bId, function(err, record){
			if (record) {
				if(record.locked){
					return (_.isFunction(callback) ? callback.apply(context, 
						["Can't update!, Business is locked"]) : null);
				}
				data.updated_at = new Date();
				BusinessModel.findOneAndUpdate({user_ref: user._id, 
					_id: bId, locked: false}, data, 
					{new: true}, function (err, record) {
					if (record) {
						var row = record.toObject();
						// row = _.omit(row, [/*'location_ref',*/'user_ref']);
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, row]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't update: " + err]) : null);
					}
				});
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					["Record doesnt exist: " + err]) : null);
			}
		});

	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}
};


/*
* TODO: Not Tested
*/

Business.prototype.updateLocation = function(user, bId, data, callback, context){
	
	context = (context ? context : this);

	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id') &&
		_.isString(bId) && !_.isNull(bId)) {

		this.findByUserAndId(user._id, bId, function(err, record){
			if (record) {

				if(record.locked){
					return (_.isFunction(callback) ? callback.apply(context, 
						["Can't update!, Business is locked"]) : null);
				}

				// location_ref is of tyepeof ObjectId
				Location.update(record.location_ref._id.toString(), data, 
					function (err, record) {
					if (record) {
						var row = record;
						// row = _.omit(row, [/*'location_ref',*/'user_ref']);
						return (_.isFunction(callback) ? 
							callback.apply(context, [null, row]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't update: " + err]) : null);
					}
				});

			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					["Record doesnt exist: " + err]) : null);
			}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null );
	}
};


Business.prototype.delete = function(user, trace_id) {
	BusinessModel.remove({user_ref: user._id, trace_id: trace_id}).exec();
};

Business.prototype.deleteAll = function(user) {
	BusinessModel.remove({user_ref: user._id}).exec();
};

var businessContext = new Business();

process.on('location_created', function(location){
	if (location.location_type == "business") {
		// Do something something if you care
	}
});

process.on('user_created', function(user){
	// Faire quelques chose ici quand to veux
});

process.on('user_deleted', function(user){
	BusinessModel.remove({user_ref: user._id}).exec();
});

process.on('business_created', function(business){
	// Faire quelques chose ici quand to veux
	// console.log(business);
});

module.exports = businessContext;