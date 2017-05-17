var AppsModel = require('./apps/apps-db').AppsModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var async = require('async');
var generateToken = require('../lib/generate_token');

function Apps()
{
    
}

util.inherits(Apps, EventEmitter);

Apps.prototype.create = function(user, new_app, callback, context)
{
    context = (context ? context : this);
    if(_.isObject(user) && _.isObject(new_app) && _.has(user,'_id') &&  _.has(new_app, 'app_name') && _.has(new_app, 'callback_url') && !_.isEmpty(new_app.app_name) && !_.isEmpty(new_app.callback_url))
    {
        var appsModel = new AppsModel();
        appsModel.app_name = new_app.app_name;
        appsModel.user_ref = user._id;
        appsModel.callback_url = new_app.callback_url;
        appsModel.app_url = new_app.app_url;
        appsModel.description = new_app.description;
        appsModel.app_id = generateToken(64);
        appsModel.secret_key = generateToken(64);
        appsModel.save(function (err, record) {
            if (err) {
                return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
            } else {
                process.emit("app_created", record.toObject());
			  	return (_.isFunction(callback) ? callback.apply(context, [null, record.toObject()]) : null);
            }
        });
    } else {
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}
};

Apps.prototype.findById = function(app_id, callback, context)
{
    context = (context ? context : this);
    if (!_.isEmpty(app_id.trim())) {
        AppsModel.find({ $or: [
            {app_id: app_id.trim()},
            {secret_key: app_id.trim()}
        ]}, function(err, record)
        {
            if (!err && record) {
				return (_.isFunction(callback) ? callback.apply(context, [null, record[0]]) : null);
			} else {
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
        });
    } else {
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}
};


Apps.prototype.findRecordsByUser = function(user, callback, context)
{
    context = (context ? context : this);
    if (_.isObject(user) && _.has(user, '_id')) {
        AppsModel.find({user_ref: user._id}, function(err, records)
        {
            if (records) {
				return (_.isFunction(callback) ? callback.apply(context, [null, records]) : null);
			} else {
				return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
			}
        });
    } else {
		return (_.isFunction(callback) ? callback.apply(context, ['Invalid Parameters']) : null);
	}
};

process.on('user_deleted', function(user){
	AppsModel.remove({user_ref: user._id}).exec();
});

var appsContext = new Apps();

module.exports = appsContext;