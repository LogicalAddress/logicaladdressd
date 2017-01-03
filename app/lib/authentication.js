/**
 * @module Authentication
 */

var jwt = require('jwt-simple');
var _ = require('underscore');
var UserLib = require('./user');
// var validateUser = require('../routes/auth').validateUser;
 
/**
 * @class Authentication
 * */
 
/**
 * Authenticates call 
 * @method authenticate
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {Function} next The express next object. 
**/
module.exports = function (req, res, next)
{
	var access_token = (req.body && req.body.access_token) || 
	(req.query && req.query.access_token) || 
	req.headers['x-access-token'] || req.headers['x-auth-token'];    
    if (_.isString(access_token)) {
    	var decoded = UserLib.accessTokenToUserObj(access_token);
    	if (_.isObject(decoded) && _.has(decoded, 'user')) {
    		req.paygis = req.paygis || {};
    		req.paygis.user = decoded.user;
    		next(); // TODO: Pass decoded along.. To move to next middleware
    	}else{
    		res.status(400);
			return res.json({
				"status": false,
				"message": "Access Token Expired"
			});
    	}
    }else if(_.has(req.session, 'user')){
    	req.paygis = req.paygis || {};
    	req.paygis.user = req.session.user;
    	next();
    }else {
	    res.status(400);
	    return res.json({
	      "status": false,
	      "message": "Invalid Access Token or Key"
	    });
  	} 

};