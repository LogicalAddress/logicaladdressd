var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PermissionsSchema = Schema({
    
    global_logical_address: { type: String, required: true },
    app_id: { type: String, required: true, index: true },
    allowed_at: { type: Date, default: Date.now() },
    account_type: { type: String, default: 'personal' },
    first_name: { type: Boolean, default: false },
    last_name: { type: Boolean, default: false },
    mobile_number: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    location: { type: Boolean, default: false },
    
    work_info: { type: Boolean, default: true },
    work_phone: { type: Boolean, default: true },
    work_email: { type: Boolean, default: true },
    
}); 

PermissionsSchema.set('autoIndex', true);
var Permissions = mongoose.model('Permissions', PermissionsSchema, 'permissions');

module.exports.PermissionsModel = Permissions;