var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppsSchema = new Schema({
    app_name:       {type: String, required: true},
    app_id:         {type: String, required: true, unique: true, index: true},
    secret_key:     {type: String, required: true, unique: true, index: true},
    callback_url:   {type: String, required: true},
    app_url:        {type: String, required: true},
    logo_url:       {type: String, default: '/assets/img/default-app-dp.png'},
    user_ref:       {type: Schema.ObjectId, ref: 'User', index: true, required: true},
    description:    {type: String, default: '' },
	enabled:        { type: Boolean, default: true},
	
	created_at:     { type: Date, default: Date.now},
	updated_at:     { type: Date, default: Date.now},
});

AppsSchema.set('autoIndex', true);
var AppsModel = mongoose.model('Apps', AppsSchema);

module.exports.AppsModel = AppsModel;