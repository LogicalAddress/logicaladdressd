var LocationModel = require('./location/location-db').LocationModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var hash = require('md5');


/*
* An interface to the UserModel
* @Class User
* 
**/

function Location(){

}

util.inherits(Location, EventEmitter);


/*
* Register the User Listen on 'register_success' and 'register_error' event
* @Method register
* @Params user {Object} with a compulsory username and password field
* 
**/

Location.prototype.create = function(data, callback, context) {

	context = (context ? context : this);

	if (_.isObject(data) && _.has(data,'user_ref') && 
		_.has(data, 'location_type')) {

			var locationModel = new LocationModel(data);

			locationModel.save(function (err, record) {
				if (record) {
					process.emit('location_created', record.toObject());
					return (_.isFunction(callback) ? callback.apply(context, 
						[null, record.toObject()]) : null);
				}else{
					return (_.isFunction(callback) ? callback.apply(context, 
						[err]) : null);
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
* @Params user {Object} with a compulsory _id field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

Location.prototype.findRecordByUserId = function(user, callback, context) {

	context = (context ? context : this);
	
	if (_.isObject(user) && _.has(user,'user_ref') &&
		!_.isEmpty(user.user_ref.trim())) {

		LocationModel.findOne({user_ref: user.user_ref}).populate().lean().exec(
			function(err, row){
			if (row) {
				var gps = {longitude: row.gps[0], latitude: row.gps[1]};
				row.gps = gps;
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
* @Method findRecord
* @Params query {Object} with a compulsory _id field
* @Params callback {Function} If Empty, Listen on 'user_user_complete' event
*
**/

Location.prototype.findRecord = function(query, callback, context) {

	context = (context ? context : this);

	if (_.isObject(query)) {

		LocationModel.findOne(query).lean().exec(function(err, row){
			if (row) {
				var gps = {longitude: row.gps[0], latitude: row.gps[1]};
				row.gps = gps;
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


/*
* TODO: Not Tested
*/

Location.prototype.update = function(location_ref, data, callback, context) {

	context = (context ? context : this);

	// These fields are not included in the update.
	if (_.isString(location_ref) && _.isObject(data) &&
		!_.has(data, 'location_type') && !_.has(data, 'user_ref') && 
		!_.has(data, 'expires_at') && !_.has(data, 'enabled') && 
		!_.has(data, 'created_at') && !_.has(data, 'updated_at') && 
		!_.has(data, 'verify_change')) {
		
		data.updated_at = new Date();

		if (_.has(data,'gps') && _.has(data.gps,'longitude') && 
			_.has(data.gps,'latitude')) {
			var gps = data.gps;
			data.gps = [];
			data.gps[0] = parseFloat(gps.longitude);
			data.gps[1] = parseFloat(gps.latitude);
		}

		LocationModel.findOneAndUpdate({_id: location_ref}, data, {new: true}, 
			function (err, record) {
			if (record) {
				var row = record.toObject();
				row = _.omit(row, [/*'_id',*/'user_ref']);
				var gps = {longitude: row.gps[0], latitude: row.gps[1]};
				row.gps = gps;
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null);
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

Location.prototype.delete = function(user) {
	LocationModel.remove({user_ref: user._id}).exec();
};

locationContext = new Location();

process.on('location_created', function(location){
	// LocationModel.findOneAndUpdate( {_id: location._id},
	// 	{$set: {trace_id: hash(location._id.toString())}}).exec();
	LocationModel.findOneAndUpdate({_id: location._id}, {$set: 
		{trace_id: hash(location._id.toString())}}, 
		{new: true}, function (err, record) {
		if (!record) {
			console.log("unable to update trace_id");
			console.log(err);
		}
	});
});

process.on('user_deleted', function(user){
	LocationModel.remove({user_ref: user._id}).exec();
});

module.exports = locationContext;