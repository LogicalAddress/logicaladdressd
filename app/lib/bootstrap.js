/*
* Initialize Server with Params
*/
var hat = require('hat');
var Async = require('async');
var UserLib = require('./user');
var User = require('../models/user');
var config = require('../../config/config');

module.exports = function ()
{
    /*
    * Setup special system users. the users in the config should be consistent with that in
    * https://github.com/LogicalAddress/LaSociale
    */
};