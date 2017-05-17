var _ = require("underscore");
var util = require("util");
var EventEmitter = require('events').EventEmitter;
var PermissionsModel = require("./permissions/permissions-db").PermissionsModel;

function Permissions()
{
    
}

util.inherits(Permissions, EventEmitter);

Permissions.prototype.permit = function(user, app_id, permissions, callback, context)
{
    context = (context ? context : this);
    if(_.isObject(user) && _.has(user, '_id') && _.has(user, 'global_logical_address'))
    {
        var permissionsObj = {};
        permissionsObj.global_logical_address = user.global_logical_address;
        permissionsObj.app_id = app_id;
        permissions.forEach(function(e,i) {
            if(_.has(user, e))
            {
                permissionsObj[e] = true;
            }
        });
        PermissionsModel.findOneAndUpdate({}, permissionsObj, { upsert: true, new: true, setDefaultsOnInsert: true }, function(err, record) {
            if(err)
            {
                return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
            } else {
                process.emit("access_permited", record.toObject());
			  	return (_.isFunction(callback) ? callback.apply(context, [null, record.toObject()]) : null);
            }
        });
    }
};

Permissions.prototype.findPermissions = function(app_id, logical_address, callback, context)
{
    context = (context ? context : this);
    if(logical_address == "all")
    {
        PermissionsModel.find({app_id: app_id.trim()}, function(err, records)
        {
           if(err)
           {
               return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
           }
           return (_.isFunction(callback) ? callback.apply(context, [null, records]) : null);
        });
    } else {
        PermissionsModel.find({app_id: app_id.trim(), global_logical_address: logical_address}, function(err, record)
        {
           if(err)
           {
               return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
           }
           return (_.isFunction(callback) ? callback.apply(context, [null, record]) : null);
        });
    }
};

Permissions.prototype.checkPermission = function(app_id, logical_address, permission, callback, context) {
    context = (context ? context : this);
    var permissions = {app_id: app_id.trim(), global_logical_address: logical_address}, result = false;
    permissions[permission] = true;
    PermissionsModel.find(permissions, function(err, record)
    {
        //console.log('PermissionsModel', record);
        if(err) return (_.isFunction(callback) ? callback.apply(context, [err]) : null);
        if(record.length) result = true;
        return (_.isFunction(callback) ? callback.apply(context, [null, result]) : null);
    });
};

var permissionsContext = new Permissions();

module.exports = permissionsContext;