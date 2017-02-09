var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PermissionsSchema = Schema({
    
    allowed_la: { type: String, required: true }, //The allowed user or business LA
    allowed_at: { type: Date, default: Date.now() },
    account_type: { type: String, default: 'personal' },
    name: { type: Boolean, default: false },
    mobile_number: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    location: { type: Boolean, default: false },
    
    work_info: { type: Boolean, default: true },
    work_phone: { type: Boolean, default: true },
    work_email: { type: Boolean, default: true },
    
}); 

PermissionsSchema.set('autoIndex', true);
var PermissionsModel = mongoose.model('Permissions', PermissionsSchema);

module.exports.PermissionsModel = PermissionsModel;