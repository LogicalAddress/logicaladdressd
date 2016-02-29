var hat = require('hat');
var Request = require('request');
var host = require('../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

var test_user_one_bussiness_trace_id = null;
var test_user_one_bussiness_trace_id2 = null;

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

  describe("Case #2 - Login Patient Zero", function(){
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


describe("Create a Business", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Create Patient Zero Business", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          mobile_number: "08161730129",
          address: "Rukuba Road, Jos",
          city: "Jos",
          business_name: "First Bank Nigeria Ltd",
          tags: ['atm', 'bank', 'money']
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/business----------------------");
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
      expect(httpResponse.data.trace_id.length).toEqual(32);
      test_user_one_bussiness_trace_id = httpResponse.data.trace_id;
      done();
    });

  });


  describe("Case #2 Create Patient Zero Business II", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          mobile_number: "08036504287",
          address: "Nimpco Filling Station, Jabi",
          city: "Abuja",
          business_name: "Auto Lady Nigeria Ltd",
          tags: ['repairs', 'motor', 'car']
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------POST /api/v1/business----------------------");
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
      expect(httpResponse.data.trace_id.length).toEqual(32);
      test_user_one_bussiness_trace_id2 = httpResponse.data.trace_id;
      done();
    });

  });

});

describe("Request for ShortCode", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Business ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/shortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_bussiness_trace_id
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
      expect(httpResponse.data.short_code).not.toBe(null);
      expect(httpResponse.data.short_code.length).toEqual(10);
      expect(httpResponse.data.short_code.substr(0, 3)).toEqual("321");
      expect(httpResponse.data.code_type).toEqual('default');
      done();
    });

  });

  describe("Case #2 Business ShortCode - Duplicate", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/shortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_bussiness_trace_id
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
      expect(httpResponse.reason).toEqual('Record exists');
      done();
    });

  });


  describe("Case #3 Business II ShortCode", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/shortcode',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          trace_id: test_user_one_bussiness_trace_id2
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
      expect(httpResponse.data.short_code).not.toBe(null);
      expect(httpResponse.data.short_code.length).toEqual(10);
      expect(httpResponse.data.short_code.substr(0, 3)).toEqual("321");
      expect(httpResponse.data.code_type).toEqual('default');
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
