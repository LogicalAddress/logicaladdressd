var UserLib = require('../lib/user');
var Business = require('../models/business');
var Employee = require('../models/employee');
var _ = require('underscore');

module.exports = function (app) {

	app.post('/api/v1/business/employee', function (req, res, next) {
		var user = req.paygis.user;
		if(user.account_type != 'business'){
		    res.status(500);
        	return res.json({status: false, reason: 'Only business account can make this call'});
		}
		if(!_.has(req.body, 'global_logical_address')){
		    res.status(500);
		    return res.json({status: false, reason: 'send a global_logical_address'});
		}
		Business.findRecordsByUserId(user, function(err, records){
			if (records) {
			    records[0].global_logical_address = req.body.global_logical_address;
        		Employee.createRecord(records[0], function(err, record){
        			if (record) {
        				res.status(200);
        				return res.json({status: true, data: record});
        			}else{
        				res.status(404);
        				return res.json({status: false, reason: err});
        			}
        		});
			}else{
			    res.status(404);
        		return res.json({status: false, reason: err});
			}
		});
	});


	app.get('/api/v1/business/employee', function (req, res, next) {

		var user = req.paygis.user;
        if(user.account_type != 'business'){
		    res.status(404);
        	return res.json({status: false, reason: 'Only business account can make this call'});
		}
		Business.findRecordsByUserId(user, function(err, record){
			if (record) {
        		Employee.findByBusId(record[0]._id, function(err, record){
        			if (record) {
        				res.status(200);
        				return res.json({status: true, data: record});
        			}else{
        				res.status(404);
        				return res.json({status: false, reason: err});
        			}
        
        		});
    		}else{
			    res.status(404);
        		return res.json({status: false, reason: err});
			}
		});
	});
};