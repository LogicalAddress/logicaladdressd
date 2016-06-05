var Parse = require('parse/node');

Parse.initialize("test");
Parse.serverURL = 'http://localhost:1337/parse';

/*
* We are going to have two channels (1 world channel and 1 array of users' channel
* (for targeting specific users))
*/

/*
Using Advanced Targeting

While channels are great for many applications, sometimes you need more precision 
when targeting the recipients of your pushes. Parse allows you to write a query for any 
subset of your Installation objects using the querying API and to send them a push.

Since Installation objects are just like any other object stored in Parse, you can 
save any data you want and even create relationships between Installation objects 
and your other objects. This allows you to send pushes to a very customized and dynamic 
segment of your user base.

The JavaScript SDK does not currently support modifying Installation objects. 
Take a look at the iOS, Android or REST Push guide for more on this topic.
*/


/*
* We are going to assume that the Android Client have modified two instalation objects
* 1. world channel
* 2. Custom query object to narrow it down to a specific user. their username
*/



/*
* For Case II

var query = new Parse.Query(Parse.Installation);
query.equalTo('injuryReports', true);

Parse.Push.send({
  where: query, // Set our Installation query
  data: {
    alert: "Willie Hayes injured by own pop fly."
  }
}, {
  success: function() {
    // Push was successful
  },
  error: function(error) {
    // Handle error
  }
});

*/