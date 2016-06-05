var hat = require('hat');
var Request = require('request');
var host = require('../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

// console.log = function(data){
  
// };


describe("AccountKit SMS Authentication", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 - Invalid Authentication", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/accountKit',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_one,
        }, 
      }, 
      function(err, res, body){
        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;
        console.log("_____________________________________________________");
        console.log("----------------POST /accountKit-------------------");
        console.log("_____________________________________________________");
        console.log(httpResponse);
        console.log("_____________________________________________________");

        done();
      });
    });
            

    afterEach(function(){
      httpStatusCode = null;
      httpResponse = null;
    });

    it(":", function(done){
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #2 - Valid Authentication", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/accountKit',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            accountId: test_user_one,
        }, 
      }, 
      function(err, res, body){
        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;
        access_token_user_one = (httpResponse.access_token) ? httpResponse.access_token.toString() : null;

        console.log("_____________________________________________________");
        console.log("------------------POST /accountKit-------------------");
        console.log("_____________________________________________________");
        console.log(httpResponse);
        console.log("_____________________________________________________");

        done();
      });
    });
            

    afterEach(function(){
      httpStatusCode = null;
      httpResponse = null;
    });

    it(":", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      expect(access_token_user_one).not.toBe(null);
      done();
    });
    
  });

});


  describe("Case #2 - Verification Authentication", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/accountKit',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            accountId: test_user_one,
        }, 
      }, 
      function(err, res, body){
        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;
        access_token_user_one = (httpResponse.access_token) ? httpResponse.access_token.toString() : null;

        console.log("_____________________________________________________");
        console.log("------------------POST /accountKit-------------------");
        console.log("_____________________________________________________");
        console.log(httpResponse);
        console.log("_____________________________________________________");

        done();
      });
    });
            

    afterEach(function(){
      httpStatusCode = null;
      httpResponse = null;
    });

    it(":", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      expect(access_token_user_one).not.toBe(null);
      done();
    });
    
  });

});

describe("User Delete", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Delete AcountKit User", function(){
    beforeEach(function(done) {
      Request.del({
        url: host + '/api/v1/user',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            username: test_user_one,
            password: "yahweh",
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------DELETE /api/v1/user-------------------");
        console.log("_____________________________________________________");
        console.log(httpResponse);
        console.log("_____________________________________________________");

        done();
      });
    });
            

    afterEach(function(){
      httpStatusCode = null;
      httpResponse = null;
    });

    it(":", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });
});
