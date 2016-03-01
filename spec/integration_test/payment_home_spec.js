var hat = require('hat');
var Request = require('request');
var host = require('../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

var test_user_one_home_trace_id = null;

// console.log = function(data){
  
// };


describe("User Registration & Login", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 - Register Patient Zero", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_one,
            password: "yahweh",
            q_animal: "Goat",
            q_mother: "B",
            q_space: "Moon",
            q_book: "Digital Fortress",
        }, 
      }, 
      function(err, res, body){
        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;
        console.log("_____________________________________________________");
        console.log("----------------POST /user/register-------------------");
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
      expect(httpStatusCode).toEqual(201);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });

  describe("Case #9 - Login Patient Zero", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/login',
        headers: {
          'Accept': 'application/json',
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
        access_token_user_one = (httpResponse.access_token) ? httpResponse.access_token.toString() : null;

        console.log("_____________________________________________________");
        console.log("------------------POST /user/login-------------------");
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


describe("Fetch Home Details", function(){

  var httpResponse = null;
  var httpStatusCode = null;

 describe("Case #6 Fetch Patient Zero Home Details", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/home',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------GET /api/v1/home----------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      expect(httpResponse.data.trace_id).not.toBe(null);
      test_user_one_home_trace_id = httpResponse.data.trace_id;
      done();
    });

  });

});



describe("Buy Custom Code and Memorable Code", function(){

  var httpResponse = null;
  var httpStatusCode = null;

 describe("Case #1 Home custom", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/payment',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          code_type: 'custom',
          amount: 4.99,
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/payment------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });


  describe("Case #1 Home custom II", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/payment',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          code_type: 'custom',
          amount: 4.99,
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/payment------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });


 describe("Case #1 Home Memorable ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/payment',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          code_type: 'memorable',
          amount: 0.99,
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/payment------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });

});




describe("Request for user defined (custom) short code", function(){

  var httpResponse = null;
  var httpStatusCode = null;

 describe("Case #1 Home User Defined Custom ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/customshortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_home_trace_id,
          custom_code: '1987'
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/shortcode------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });


 describe("Case #1 Home Memorable ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/memorableshortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_home_trace_id,
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/shortcode------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });


  describe("Case #1 Home Memorable ShortCode Again", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/memorableshortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_home_trace_id,
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/shortcode------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(404);
      expect(httpResponse.status).toEqual(false);
      expect(httpResponse.reason).toEqual('An unknown error occured');
      expect(httpResponse.extra).toEqual('No active payment record found');
      done();
    });

  });

 describe("Case #1 Home User Defined Custom ShortCode: Same Code", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/customshortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_home_trace_id,
          custom_code: '1987'
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/shortcode------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(403);
      expect(httpResponse.status).toEqual(false);
      expect(httpResponse.reason).toEqual("Record exists");
      done();
    });

  });

 describe("Case #1 Get All Payments - 2 Used Up 1 remaining", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/payment',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------GET /api/v1/payment------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      expect(httpResponse.data.length).toEqual(3);
      var usedCount = 0;
      var unUsedCount = 0;
      for (var i = httpResponse.data.length - 1; i >= 0; i--) {
        if(httpResponse.data[i].active){
          unUsedCount++;
        }else{
          usedCount++;
        }
      }
      expect(usedCount).toEqual(2);
      expect(unUsedCount).toEqual(1);
      done();
    });

  });

  describe("Case #1 Home User Defined Custom ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/customshortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_home_trace_id,
          custom_code: '1988'
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/shortcode------------------");
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

    it(":User I", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });



});



describe("User Delete", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Delete Patient Zero", function(){
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
