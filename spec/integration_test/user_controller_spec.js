var hat = require('hat');
var Request = require('request');
var host = require('../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

var test_user_two = hat();
var access_token_user_two = null;

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

  describe("Case #2 - Register Duplicate User", function(){
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
      expect(httpStatusCode).toEqual(403);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #3 - Register With Invalid Params I", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_one,
            password: "",
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #4 - Register With Invalid Params II", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
          
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });


  describe("Case #5 - Register With Invalid Params III", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: "",
            password: "",
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #6 - Register With Patial Params I", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            password: "",
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #7 - Register With Patial Params II", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_one,
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.status).toEqual(false);
      done();
    });

  });

  describe("Case #8 - Register Patient One", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/register',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_two,
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

  describe("Case #10 - Login Patient One", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/user/login',
        headers: {
          'Accept': 'application/json',
        },
        json: {
            username: test_user_two,
            password: "yahweh",
        }, 
      }, 
      function(err, res, body){
        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;
        access_token_user_two = (httpResponse.access_token) ? httpResponse.access_token.toString() : null;

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
      expect(access_token_user_two).not.toBe(null);
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


  describe("Case #2 Delete Patient One", function(){
    beforeEach(function(done) {
      Request.del({
        url: host + '/api/v1/user',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
            username: test_user_two,
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
