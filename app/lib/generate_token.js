var _ = require("underscore");

/*
* Return a random short code to be used (10 digit code) + Prefix Inclusive
*/
module.exports = function (length)
{
    length = length ? length : 10;
	return _.sample([
	    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
	    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	], length).join('');
};