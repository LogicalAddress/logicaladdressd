var hat = require('hat');
var Request = require('request');
var host = require('../../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

var test_user_two = hat();
var access_token_user_two = null;

// console.log = function(data){
  
// };


describe("Create Test Users", function(){

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


  describe("Case #2 - Register Patient One", function(){
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


  describe("Case #3 - Login Patient Zero", function(){
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

  describe("Case #4 - Login Patient One", function(){
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


describe("Fetch Work Details", function(){

  var httpResponse = null;
  var httpStatusCode = null;

 describe("Case #5 Test Patient Zero with Fake Access Token", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': 'FAKE-ACCESS-TOKEN'
        },
        json: {
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------GET /api/v1/work----------------------");
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
      expect(httpStatusCode).toEqual(400);
      expect(httpResponse.message).toEqual('Access Token Expired');
      done();
    });

  });

 describe("Case #6 Fetch Patient Zero Home Details", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/work',
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
        console.log("---------------GET /api/v1/work----------------------");
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

 describe("Case #1 Fetch Patient One Home Details", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------GET /api/v1/work----------------------");
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

    it("User II:", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });

});

describe("Update Work Details", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Update Patient Zero Work Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            work: {
              address: "Rukuba Road, Jos",
              city: "Jos",
              work_name: "First Bank Nigeria Ltd",
              tags: ['atm', 'bank', 'money']
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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


  describe("Case #2 Update Patient One Work Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
            work: {
              address: "Angwan Rukuba, Jos",
              city: "Abuja"
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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

    it(":User II", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });

  describe("Case #3 Update Patient Zero Work Location Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            location: {
              altitude: '6.3',
              speed: '6.2',
              altitude_accuracy: '0.1',
              gps:{
                longitude: '4.0',
                latitude: '5.3'
              }
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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


  describe("Case #4 Update Patient One Location Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
            location: {
              altitude: '3.6',
              speed: '2.6',
              altitude_accuracy: '1.0',
              gps:{
                longitude: '0.4',
                latitude: '3.5'
              }
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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

    it(":User II", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });


  describe("Case #5 Update Patient Zero Complete Work Info", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          work: {
            address: "D.B Zang Way Road",
            city: "Kaduna",
            work_name: "Nignux Technologies",
            tags: ['wedding', 'bank', 'money', 'market']
          },
          location: {
            gps: { longitude: '3.4', latitude: '6.2'},
            altitude: "0.3",
            altitude_accuracy: '5.5',
            speed: '4.3'
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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


  describe("Case #6 Update Patient One Complete Work Info", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/work',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
          work: {
            address: "Angwan Rimi",
            city: "Ilorin"
          },
          location: {
            gps: { longitude: '4.3', latitude: '2.6'},
            altitude: "3.0",
            altitude_accuracy: '5.5',
            speed: '3.4'
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/work----------------------");
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

    it(":User II", function(done){
      expect(httpStatusCode).toEqual(200);
      expect(httpResponse.status).toEqual(true);
      done();
    });

  });

});





describe("Delete The Test Users", function(){

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