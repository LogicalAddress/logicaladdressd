var UserModel = require('./user/user-db').UserModel;
var HomeModel = require('./home/home-db').HomeModel;
var Location = require('./location');
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var hash = require('md5');


/*
* An interface to the HomeModel
* @Class Home
* 
**/

function Home(){

}

util.inherits(Home, EventEmitter);


/*
* Register the User Listen on 'register_success' and 'register_error' event
* @Method register
* @Params user {Object} with a compulsory username and password field
* 
**/

Home.prototype.save = function(user, data, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id') && 
		_.has(data, 'location_ref') && _.has(data, 'trace_id')) {

		HomeModel.findOne({user_ref: user._id}, function (err, record) {

				if (!record) {

					var record_model = new HomeModel();
					record_model.user_ref = data.user_ref;
					record_model.location_ref = data.location_ref;
					record_model.trace_id = data.trace_id;

					record_model.save(function(err, record){
						if (record) {
							process.emit("home_created", record.toObject());
							return (_.isFunction(callback) ? callback.apply(context, 
								[null, record.toObject()]) : null );
						}else{
							return (_.isFunction(callback) ? callback.apply(context, 
								["Can't Save: " + err]) : null);
						}
					});

				}else{
					return (_.isFunction(callback) ? callback.apply(context, 
						["Can't Save, Record Exists"]) : null);
				}
		});
	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}

};



/*
* Create HomeTrace Code for User
* @Method CreateRecord
* @Params user {Object} with a compulsory User.user_ref
* 
**/

Home.prototype.createRecord = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'_id') ){

		Location.findRecord({
			user_ref: user._id, location_type: 'home'}, 
			function(err, record){

			if (record) {
				if (err) {
					return (_.isFunction(callback) ? callback.apply(context, 
					["Can't Save, Record Exists"]) : null);
				}
			}

			Location.create({user_ref: user._id, 
				location_type: 'home'}, function(err, response){	

				if (err) {
					return (_.isFunction(callback) ? callback.apply(context, 
						[err]) : null);
				}

				var trace_id = hash(response._id.toString());

				this.save(user, {
					user_ref: user._id, 
					location_ref: response._id, 
					trace_id: trace_id 
				}, function(err, response){
					if (err) {
						return (_.isFunction(callback) ? callback.apply(context, 
							[err]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, response]) : null );
					}
				});

			}, this); //{this} ==> Maintain current context

		}, this); //{this} ==> Maintain current context

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

Home.prototype.findRecordByUserId = function(user, callback, context) {

	context = (context ? context : this);

	if (_.isObject(user) && _.has(user,'user_ref') &&
		_.isString(user.user_ref) && !_.isEmpty(user.user_ref.trim())) {
		HomeModel.findOne(
			{user_ref: user.user_ref}).populate('location_ref').lean().exec(
			function(err, row){
			if (row) {
				// row = _.omit(row, ['location_ref'/*,'user_ref'*/]);
				var gps = {longitude: row.location_ref.gps[0], 
					latitude: row.location_ref.gps[1]};
				row.location_ref.gps = gps;
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null );
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

Home.prototype.update = function(user, data, callback, context) {
	
	context = (context ? context : this);

	// these fields are not included in the update.
	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id') &&
		!_.has(data, 'location_ref') && !_.has(data, 'user_ref') && 
		!_.has(data, 'trace_id') && !_.has(data, 'enabled') && 
		!_.has(data, 'created_at') && !_.has(data, 'updated_at')) {

		data.updated_at = new Date();
		HomeModel.findOneAndUpdate({user_ref: user._id}, data, {new: true}, 
			function (err, record) {
			if (record) {
				var row = record.toObject();
				// row = _.omit(row, [/*'location_ref',*/'user_ref']);
				return (_.isFunction(callback) ? callback.apply(context, 
					[null, row]) : null);
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					["Can't Save: " + err]) : null );
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

Home.prototype.updateLocation = function(user, data, callback, context) {
	
	context = (context ? context : this);

	// These fields are not included in the update.
	if (_.isObject(user) && _.isObject(data) && _.has(user,'_id')) {

		this.findRecordByUserId({user_ref: user._id}, function(err, record){

			if (record) {
				// location_ref is of tyepeof ObjectId
				Location.update(record.location_ref._id.toString(), 
					data, function (err, record) {

					if (record) {
						var row = record;
						// row = _.omit(row, [/*'location_ref',*/'user_ref']);
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, row]) : null);
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't Save: " + err]) : null);
					}
				});
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					['An Unkown Error Occured']) : null);
			}
		});

	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}

};


Home.prototype.delete = function(user) {
	HomeModel.remove({user_ref: user._id}).exec();
};

var homeContext = new Home();

process.on('location_created', function(location){
	if (location.location_type == "home") {
		// Do something something if you care
	}
});

process.on('user_created', function(user){
	homeContext.createRecord(user, function(err, response){
		if (err) {
			// console.log(err);
		}
	}, homeContext);
});

process.on('user_deleted', function(user){
	HomeModel.remove({user_ref: user._id.toString()}).exec();
});

process.on('home_created', function(home){
	// faire quelques chose ici quand tu veux
});

module.exports = homeContext;