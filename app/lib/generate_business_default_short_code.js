var _ = require("underscore");

/*
* Return a random short code to be used (10 digit code) + Prefix Inclusive
*/
module.exports = function ()
{
	return '321' + _.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7).join('');
};