var hat = require('hat');
var Request = require('request');
var host = require('../helpers/host')();

var test_user_one = hat();
var access_token_user_one = null;

var test_user_two = hat();
var access_token_user_two = null;

var busId, busId2, busId3;

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
            mobile_number: "08161730129",
            email: "d.retnan@nhubnigeria.com",
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
            mobile_number: "08036504287",
            email: "dretnan@logicaladdress.com",
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
      done();
    });

  });

describe("Case #3 Create Patient One Business", function(){
    beforeEach(function(done) {
      Request.post({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
          mobile_number: "08077746115",
          address: "3rd Floor TAEN Business Complex",
          city: "Jos",
          business_name: "Logical Address Inc",
          tags: ['startup', 'software', 'app']
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
      done();
    });

  });

});



describe("Fetch Businesses Registered", function(){

  var httpResponse = null;
  var httpStatusCode = null;

 describe("Case #1 Test Patient Zero with Fake Access Token", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/business',
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
        console.log("---------------GET /api/v1/business----------------------");
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

 describe("Case #2 Fetch Patient Zero Businesses", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/business',
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
        console.log("---------------GET /api/v1/business----------------------");
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
      expect(httpResponse.data.length).toEqual(2);
      if (httpResponse.data[0].mobile_number == "08036504287") {
        expect(httpResponse.data[0].business_name).toEqual("Auto Lady Nigeria Ltd");
        expect(httpResponse.data[1].business_name).toEqual("First Bank Nigeria Ltd");
      }else{
        expect(httpResponse.data[1].business_name).toEqual("Auto Lady Nigeria Ltd");
        expect(httpResponse.data[0].business_name).toEqual("First Bank Nigeria Ltd");
      }
      busId = httpResponse.data[0]._id;
      busId2 = httpResponse.data[1]._id;
      done();
    });

  });

 describe("Case #3 Fetch Patient One Businesses", function(){
    beforeEach(function(done) {
      Request.get({
        url: host + '/api/v1/business',
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
        console.log("---------------GET /api/v1/business----------------------");
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
      expect(httpResponse.data.length).toEqual(1);
      expect(httpResponse.data[0].business_name).toEqual("Logical Address Inc");
      busId3 = httpResponse.data[0]._id;
      done();
    });

  });

});




describe("Update Business Details", function(){

  var httpResponse = null;
  var httpStatusCode = null;

  describe("Case #1 Update Patient Zero Business Details Fake ID", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            _id: "xxxxxxxxxxxxxxxxxxxxx",
            business: {
              address: "Rukuba Road, Jos",
              city: "Jos",
              business_name: "First Bank Nigeria Ltd",
              tags: ['atm', 'bank', 'money']
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/business----------------------");
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
      done();
    });

  });

  describe("Case #2 Update Patient Zero Business Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            _id: busId,
            business: {
              address: "Rukuba Road, Jos",
              city: "Jos",
              business_name: "Daser Bank of Nigeria Ltd",
          }
        },
      }, 
      function(err, res, body){

        if (err) { throw err; }

        httpResponse = body;
        httpStatusCode = res.statusCode;

        console.log("_____________________________________________________");
        console.log("---------------PUT /api/v1/business----------------------");
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
      expect(httpResponse.business.business_name).toEqual("Daser Bank of Nigeria Ltd");
      done();
    });

  });


  describe("Case #3 Update Patient One Business Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
            _id: busId3,
            business: {
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
        console.log("---------------PUT /api/v1/business----------------------");
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
      expect(httpResponse.business.address).toEqual("Angwan Rukuba, Jos");
      expect(httpResponse.business.city).toEqual("Abuja");
      done();
    });

  });

  describe("Case #4 Update Patient Zero Business Location Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
            _id: busId,
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
        console.log("---------------PUT /api/v1/business----------------------");
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


  describe("Case #5 Update Patient One Location Details", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
            _id: busId3,
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
        console.log("---------------PUT /api/v1/business----------------------");
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


  describe("Case #6 Update Patient Zero Complete Business Info", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_one
        },
        json: {
          _id: busId,
          business: {
            address: "D.B Zang Way Road",
            city: "Kaduna",
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
        console.log("---------------PUT /api/v1/business----------------------");
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


  describe("Case #7 Update Patient One Complete Business Info", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
          _id: busId3,
          business: {
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
        console.log("---------------PUT /api/v1/business----------------------");
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



  describe("Case #8 Patient One to Update Patient Zero Bus info", function(){
    beforeEach(function(done) {
      Request.put({
        url: host + '/api/v1/business',
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': access_token_user_two
        },
        json: {
          _id: busId,
          business: {
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
        console.log("---------------PUT /api/v1/business----------------------");
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
      expect(httpStatusCode).toEqual(404);
      expect(httpResponse.status).toEqual(false);
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