// var chkProfileId = require("../lib/chkProfileId");
var underscore = require("underscore");
var User = require("../models/user");

var filterFieldsByPerm = function(req, res, next){
	next();
}
var chkLocation = function(req, res, next){
	next();
}

module.exports = function(app){
    
    /*
    * For those who will put logical address on their website similar to facebook.com/LogicalAddress
    * this route handles logicaladdress.com/098524252522
    * where the number signifies their logical address, and we should return the profile page for this LA
    * do not forget to call the next() if you can't find the business name, otherwise routes like /login
    * will not resolve. This is why we name the file to begin with _ (lower ascii value, first loaded)
    */ 
    
    app.get( "/:logicaladdress(\\d+)", function(req, res, next){
        console.log("numeric route after '/' is most likely a person's or biz page, call next if not found");
		next();
	});
	
	
	/*
    * For those who will put logical address on their website similar to facebook.com/LogicalAddress
    * this route handles the likes of https://logicaladdress.com/LogicalAddress
    * this route should return a profile page for the unique name repesenting, either automatically created on
    * registration or custom chosen by the user.
    * do not forget to call the next() if you can't find the business name, otherwise routes like /login
    * will not resolve. This is why we name the file to begin with _ (lower ascii value, first loaded)
    */ 
    
    app.get( "/:profileId", chkLocation, filterFieldsByPerm, function(req, res, next){
    	User.findOne({
			custom_url: req.params.profileId,
		}, function(error, response){
			if(response){
				req.profileDetails = response;
			}
			if(req.profileDetails){
	    		return res.render('pages/public-business-profile', {
	    			title: "Logical Address | Account Setting",
					page: 'user-setting',
					profileDetails: req.profileDetails,
					user: req.session.user ? req.session.user : false,
	    		});
    		}
    		next();
		});
	});
	
};