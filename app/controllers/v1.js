var AccountKitConfig = require('../../config/accountKit')();
var _ = require('underscore');
var AccountKitGetMobileNumber = require('../lib/accountKit');
var User = require('../models/user');
var UserLib = require('../lib/user');
var Business = require('../models/business');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var hash = require('md5');
var Employee = require('../models/employee');
var Location = require('../models/location');
var Apps = require('../models/apps');
var Permissions = require('../models/permissions');
var Async = require("async");

module.exports = function(app)
{
    app.get('/v1/oauth/authorize/:resType/:clientId/:redirectUri/', function(req, res) {
        res.send(req.params);
    });
    
    app.get('/v1/oauth/authorize/', csrfProtection, function(req, res) {
        if (req.query.response_type && req.query.app_id) {
            var params = req.query;
            if(_.has(req.session, 'user') && _.has(params, 'app_id') && _.has(params, 'response_type'))
            {
                Apps.findById(params.app_id, function(err, record) {
                    if(!err && record)
                    {
                        //if(_.has(params, 'scope'))
                        var allowed_scopes = [
                            'first_name', 'last_name', 'mobile_number', 'email',
                            'location', 'work_email', 'work_phone',
                        ];
                        
                        var scopes = [];
                        if(_.has(params, 'scope'))
                        {
                            scopes = params.scope.split(',');
                            scopes.forEach(function(e,i) {
                                if(allowed_scopes.indexOf(e) == -1 || !_.has(req.session.user, e))
                                {
                                    scopes.splice(i, 1);
                                }
                            });
                        } else scopes = allowed_scopes;
                        res.setHeader('X-Frame-Options', 'DENY');
                        res.render('pages/set-permissions', {
            		        title: record.app_name + " is Requesting Permissions to Access Your LogicalAddress",
            		        page: 'set-permissions',
            		        user: req.session.user,
            		        app_details: record,
            		        scopes: scopes,
        		        	csrfToken: req.csrfToken(),
                			after: (_.has(req.query, 'callback_url')) ? decodeURIComponent(req.query.callback_url) : record.callback_url,
                			after_data: req.query,
            		    });
                    } else {
                        res.status(403);
                        res.json({status: false, message: 'App does not exist', reason: ''});
                    }
                });
            } else {
                // var after_data = []
                // Object.keys(req.query).forEach(function(key) { after_data[key] = req.query[key] });
                // console.log(after_data);
                res.render('pages/min-login', {
        			title: "Login to Logical Address to Continue to " + "",
        			page: 'login',
        			csrfToken: req.csrfToken(),
        			app_title: "Logical Address",
        			user: req.session.user,
        			after: '/v1/oauth/authorize/',
        			after_data: req.query,
        		});
            }
        } else {
            res.status(400);
            return res.json({status: false, reason: 'Invalid request'});
        }
    });
    
    app.post("/v1/oauth/authorize/", csrfProtection, function(req, res) {
        if(!_.has(req.session, 'user')) return res.redirect('/login?next=' + '');
        if(!_.isEmpty(req.body.permissions)) {
            console.log(req.query);
            Permissions.permit(req.session.user, req.query.app_id, req.body.permissions, function(err, record) {
                if(!err && record)
                {
                    var permObj = {};
                    for (var i=0; i < req.body.permissions.length; i++) {
                        permObj[req.body.permissions[i]] = req.body.permissions[i];
                    }

                    res.status(200);
                    return res.json({status: true, permited: permObj});
                } else {
                    res.status(403);
                    return res.json({status: false, reason: 'App does not exist'});
                }
            });
        }
        else {
            res.status(400);
            return res.json({status: false, reason: 'Invalid request'});
        }
    });
    
    app.post('/v1/oauth/request/:logical_address', function(req, res) {
        console.log(req.body);
        
        if(_.has(req.body, 'app_secret') && (req.params.logical_address.length == 10 || req.params.logical_address == "all") && (req.body.app_secret.length >= 62)) {
            var app_sec = req.body.app_secret;
            var logical_address = req.params.logical_address.trim();
            
            Apps.findById(app_sec, function(err, record) {
                if(!err && record) {
                    var app_id = record.app_id;
                    Permissions.findPermissions(app_id, logical_address, function(err, records)
                    {
                        //console.log(records);
                        if(!err && records && records.length)
                        {
                            console.log(records);
                            var users_details = [];
                            Async.forEachOfSeries(records, function(record, key, callback){
                                console.log(record);
                                
                                User.findByGlobalLA(record.global_logical_address, function(err, user_record){
                                    var user_details = {};
                                    if(!err && _.has(user_record, 'username'))
                                    {
                                        for(var j in record)
                                        {
                                        console.log(typeof record[j]);
                                            if(typeof record[j] === 'boolean' && record[j] === true)
                                            {
                                                user_details[j] = user_record[j];
                                                console.log(user_details);
                                            }
                                        }
                                        users_details.push(user_details);
                                    }
                                    callback(null);
                                });
                                
                            }, function(err){
                                if(!err)
                                {
                                    if(logical_address == "all") return res.status(200).json(users_details);
                                    return res.status(200).json(users_details[0]);
                                }
                            });
                           
                        } else{
                            return res.status(400).json({status: false, reason: "No resource available"});
                        }
                    });
                } else {
                    return res.status(400).json({status: false, reason: "App not found"});
                }
            });
        } else {
            return res.status(400)
                .json({status: false, reason: 'Logical Address and App Secret required'});
        }
    });
};