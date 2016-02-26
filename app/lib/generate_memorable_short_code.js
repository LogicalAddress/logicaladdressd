var _ = require("underscore");

/*
* Return a random short code to be used (4 digit code)
*/
module.exports = function ()
{
	return _.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4).join('');
};