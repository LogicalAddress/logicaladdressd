var UserModel = require('./user');
var EmployeeModel = require('./employee/employee-db').EmployeeModel;
var _ = require("underscore");
var util = require('util');
var EventEmitter = require('events').EventEmitter;


/*
* An interface to the EmployeeModel
* @Class Employee
* 
**/

function Employee(){

}

util.inherits(Employee, EventEmitter);


/*
* Add Employee and fire the 'employee_added' event
* @Method register
* @Params data {Object} with a compulsory business info with global_logical_address and password field
* 
**/

Employee.prototype.createRecord = function(data, callback, context) {

	context = (context ? context : this);

	if (_.isObject(data) && _.has(data, 'location_ref') && 
		_.has(data, 'global_logical_address')  && _.has(data, 'trace_id')) {
			
			console.log(data);

		UserModel.findByGlobalLAAndAccountType({account_type: 'personal', global_logical_address: data.global_logical_address}, 
			function (err, record) {
			if (record) {
				var record_model = new EmployeeModel();
				record_model.user_ref = record._id;
				record_model.location_ref = data.location_ref;
				record_model.business_ref = data._id;
				record_model.global_logical_address = data.global_logical_address;
				
				record_model.save(function(err, record){
					if (record) {
						process.emit("employee_added", record.toObject());
						return (_.isFunction(callback) ? callback.apply(context, 
							[null, record.toObject()]) : null );
					}else{
						return (_.isFunction(callback) ? callback.apply(context, 
							["Can't Add Employee: " + err]) : null);
					}
				});
			}else{
				return (_.isFunction(callback) ? callback.apply(context, 
					["Can't Save, User doesn't Exists"]) : null);
			}
		});

	}else{
		return (_.isFunction(callback) ? callback.apply(context, 
			['Invalid Parameters']) : null);
	}

};

/*
*
* @Method findByGlobalLogicalAddress
* @Params callback {Function}
*
**/

Employee.prototype.findByGlobalLogicalAddress = function(global_logical_address, callback, context) {
	
	context = (context ? context : this);

	if (_.isString(global_logical_address) && 
	!_.isEmpty(global_logical_address.trim())) {
		
		EmployeeModel.find(
			{
				global_logical_address: global_logical_address
				
			})
			.populate('location_ref')
			.populate('user_ref')
			.populate('business_ref')
			.lean().exec(function(err, rows){
			if (rows) {
				for(var i = 0; i < rows.length; i++){
					var gps = {longitude: rows[i].location_ref.gps[0], latitude: rows[i].location_ref.gps[1]};
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
* List all employees in {this} business or organization
*/

Employee.prototype.findByBusId = function(businessId, callback, context) {
	
	context = (context ? context : this);

	if (_.isObject(businessId)) { //_ids are objects lean() or not
		
		EmployeeModel.find(
			{
				business_ref: businessId
				
			})
			.populate('location_ref')
			.populate('user_ref')
			.populate('business_ref')
			.lean().exec(
			function(err, rows){
			if (rows) {
				for(var i = 0; i < rows.length; i++){
					var gps = {longitude: rows[i].location_ref.gps[0], latitude: rows[i].location_ref.gps[1]};
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




Employee.prototype.delete = function(user) {
	EmployeeModel.remove({user_ref: user._id}).exec();
};

var employeeContext = new Employee();

process.on('location_created', function(location){

});

process.on('user_created', function(user){

});

process.on('user_deleted', function(user){
	if(user.account_type != 'personal') return;
	EmployeeModel.remove({user_ref: user._id.toString()}).exec();
});

process.on('employee_added', function(employee){
	// faire quelques chose ici quand tu veux
});

module.exports = employeeContext;