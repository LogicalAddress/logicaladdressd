define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/business",
    "title": "Get business information",
    "name": "GetBusiness",
    "group": "Business",
    "description": "<p>Get user's business location</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Array of user's business information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data:\n\t[{\"_id\":\"56d1e83eb17166191e269771\",\n\t\t\"mobile_number\":\"08161730129\",\n\t\t\"trace_id\":\"bf27ac7c5d57f9ac1c1ce5ea0a5424d0\",\n\t\t\"location_ref\":{\"_id\":\"56d1e83eb17166191e269770\",\n\t\t\t\"user_ref\":\"56d1e83db17166191e269766\",\n\t\t\t\"location_type\":\"business\",\n\t\t\t\"verify_change\":\"########\",\n\t\t\t\"updated_at\":\"2016-02-27T18:17:34.356Z\",\n\t\t\t\"created_at\":\"2016-02-27T18:17:34.356Z\",\n\t\t\t\"enabled\":true,\n\t\t\t\"speed\":\"\",\n\t\t\t\"altitude_accuracy\":\"\",\n\t\t\t\"altitude\":\"\",\n\t\t\t\"gps\":{\"longitude\":0,\"latitude\":0},\"__v\":0,\n\t\t\t\"trace_id\":\"bf27ac7c5d57f9ac1c1ce5ea0a5424d0\"\n\t\t},\n\t\t\"user_ref\":\"56d1e83db17166191e269766\",\n\t\t\"updated_at\":\"2016-02-27T18:17:34.362Z\",\n\t\t\"created_at\":\"2016-02-27T18:17:34.362Z\",\n\t\t\"locked\":false,\"verified\":false,\n\t\t\"enabled\":true,\n\t\t\"tags\":[\"atm\",\"bank\",\"money\"],\n\t\t\"address\":\"Rukuba Road, Jos\",\n\t\t\"city\":\"Jos\",\n\t\t\"business_name\":\"Daser Bank of Nigeria\",\n\t\t\"nearby_trace_ids\":[],\"__v\":0\n\t},{\"_id\":\"56d1e83eb17166191e269773\",\n\t\t\"mobile_number\":\"08036504287\",\n\t\t\"trace_id\":\"71964581930782dafdc3013ba7b2e473\",\n\t\t\"location_ref\":{\"_id\":\"56d1e83eb17166191e269772\",\n\t\t\t\"user_ref\":\"56d1e83db17166191e269766\",\n\t\t\t\"location_type\":\"business\",\n\t\t\t\"verify_change\":\"########\",\n\t\t\t\"updated_at\":\"2016-02-27T18:17:34.406Z\",\n\t\t\t\"created_at\":\"2016-02-27T18:17:34.406Z\",\n\t\t\t\"enabled\":true,\n\t\t\t\"speed\":\"\",\n\t\t\t\"altitude_accuracy\":\"\",\n\t\t\t\"altitude\":\"\",\n\t\t\t\"gps\":{\"longitude\":0,\"latitude\":0},\"__v\":0,\n\t\t\t\"trace_id\":\"71964581930782dafdc3013ba7b2e473\"\n\t\t},\n\t\t\"user_ref\":\"56d1e83db17166191e269766\",\n\t\t\"updated_at\":\"2016-02-27T18:17:34.420Z\",\n\t\t\"created_at\":\"2016-02-27T18:17:34.420Z\",\n\t\t\"locked\":false,\"verified\":false,\n\t\t\"enabled\":true,\n\t\t\"tags\":[\"repairs\",\"motor\",\"car\"],\n\t\t\"address\":\"Nimpco Filling Station, Jabi\",\n\t\t\"city\":\"Abuja\",\n\t\t\"business_name\":\"Auto Lady Nigeria Ltd\",\n\t\t\"nearby_trace_ids\":[],\"__v\":0\n\t}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'No Record Found'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "post",
    "url": "/api/v1/business",
    "title": "Post business information",
    "name": "PostBusiness",
    "group": "Business",
    "description": "<p>Create company's business location</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>user submitted business information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     mobile_number: '08036504287',\n     trace_id: 'efdd63c258f087370a4db694e5115dcf',\n     location_ref: '56d1ec3bd5eb63771f47d28c',\n     user_ref: '56d1ec3ad5eb63771f47d280',\n     _id: '56d1ec3bd5eb63771f47d28d',\n     updated_at: '2016-02-27T18:34:35.267Z',\n     created_at: '2016-02-27T18:34:35.267Z',\n     locked: false,\n     verified: false,\n     enabled: true,\n     tags: [ 'repairs', 'motor', 'car' ],\n     address: 'Nimpco Filling Station, Jabi',\n     city: 'Abuja',\n     business_name: 'Auto Lady Nigeria Ltd',\n     nearby_trace_ids: [] } }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tmobile_number: \"08036504287\",\n\taddress: \"Nimpco Filling Station, Jabi\",\n\tcity: \"Abuja\",\n\tbusiness_name: \"Auto Lady Nigeria Ltd\",\n\ttags: ['repairs', 'motor', 'car']\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\tmobile_number: \"08161730129\",\n\taddress: \"Rukuba Road, Jos\",\n\tcity: \"Jos\",\n\tbusiness_name: \"Daser Bank of Nigeria Ltd\",\n\ttags: ['atm', 'bank', 'money']\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "put",
    "url": "/api/v1/business",
    "title": "Update business information",
    "name": "PutBusiness",
    "group": "Business",
    "description": "<p>Update the user's business location. Note that the request parameters must contain either business or location or both.</p>",
    "version": "0.0.0",
    "filename": "app/controllers/business.js",
    "groupTitle": "Business"
  },
  {
    "type": "get",
    "url": "/api/v1/home",
    "title": "Get home information",
    "name": "GetHome",
    "group": "Home",
    "description": "<p>Get user's home location</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User home information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.address",
            "description": "<p>User's current physical address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.city",
            "description": "<p>User's current city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>User's home trace code (Logical Address). This would be wrapped up in QRcode.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref",
            "description": "<p>The location information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.location_type",
            "description": "<p>Location type, 'home' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { trace_id: '537e2860cace54e137baee4a013bb653',\n     location_ref: \n      { user_ref: '55b3bd0720343cc60f6ad0ad',\n        location_type: 'home',\n        _id: '55b3bd0720343cc60f6ad0ae',\n        verify_change: '########',\n        updated_at: '2015-07-25T16:44:55.325Z',\n        created_at: '2015-07-25T16:44:55.325Z',\n        enabled: true,\n        speed: '',\n        altitude_accuracy: '',\n        altitude: '',\n        gps: {\n\t\t\tlongitude: '0',\n\t\t\tlatitude: '0'\n\t\t},\n        __v: 0 },\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     _id: '55b3bd0720343cc60f6ad0af',\n     updated_at: '2015-07-25T16:44:55.340Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true,\n     address: '',\n     city: '',\n     nearby_trace_ids: [],\n     __v: 0 } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/home.js",
    "groupTitle": "Home"
  },
  {
    "type": "put",
    "url": "/api/v1/home",
    "title": "Update home information",
    "name": "PutHome",
    "group": "Home",
    "description": "<p>Update the user's home location. Note that the request parameters must<br> contain either home or location or both.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "home",
            "description": "<p>The home object containing only fields that should be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "home.address",
            "description": "<p>User's current physical address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "home.city",
            "description": "<p>User's current city</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The location object containing only fields that should be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.altitude",
            "description": "<p>GPS altitude information</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.speed",
            "description": "<p>GPS speed information</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.altitude_accuracy",
            "description": "<p>GPS altitude accuracy information</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location.gps",
            "description": "<p>The GPS long and lat object</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": true,
            "field": "location.gps.longitude",
            "description": "<p>GPS longitude information</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": true,
            "field": "location.gps.latitude",
            "description": "<p>GPS latitude information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tlocation: {\n\t\taltitude: '50.6',\n\t\tspeed: '6.50',\n\t\taltitude_accuracy: '0.19',\n\t\tgps:{\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t}\n\t}\n\thome: {\n\t\taddress: \"No. 2A Rukuba Road\",\n\t\tcity: \"Jos\"\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\tlocation: {\n\t\taltitude: '50.6',\n\t\tspeed: '6.50',\n\t\taltitude_accuracy: '0.19',\n\t\tgps:{\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t}\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\thome: {\n\t\taddress: \"No. 2A Rukuba Road\",\n\t\tcity: \"Jos\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "home",
            "description": "<p>User updated home information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "home.address",
            "description": "<p>User's current physical address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "home.city",
            "description": "<p>User's current city</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The updated location GPS home information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.location_type",
            "description": "<p>Location type, 'home' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "location.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "location.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  home: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0af',\n     location_ref: '55b3bd0720343cc60f6ad0ae',\n     trace_id: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     updated_at: '2015-07-25T16:44:55.842Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true,\n     address: 'No. 2A Rukuba Road',\n     city: 'Jos',\n     nearby_trace_ids: [] },\n  location: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0ae',\n     location_type: 'home',\n     verify_change: '########',\n     updated_at: '2015-07-25T16:44:55.853Z',\n     created_at: '2015-07-25T16:44:55.325Z',\n     enabled: true,\n     speed: '3.4',\n     altitude_accuracy: '5.5',\n     altitude: '3.0',\n     gps: {\n\t\t\tlongitude: 4.3,\n\t\t\tlatitude: 2.6\n\t\t} } }",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  home: 'Not Updated',\n  location: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0ae',\n     location_type: 'home',\n     verify_change: '########',\n     updated_at: '2015-07-25T16:44:55.731Z',\n     created_at: '2015-07-25T16:44:55.325Z',\n     enabled: true,\n     speed: '2.6',\n     altitude_accuracy: '1.0',\n     altitude: '3.6',\n     gps: {\n\t\t\tlongitude: 4.3,\n\t\t\tlatitude: 2.6\n\t\t} } }",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  home: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0aa',\n     location_ref: '55b3bd0720343cc60f6ad0a9',\n     trace_id: '99152e15de2a1ac4e4858b9f9cd2f495',\n     user_ref: '55b3bd0620343cc60f6ad0a8',\n     updated_at: '2015-07-25T16:44:55.580Z',\n     created_at: '2015-07-25T16:44:55.105Z',\n     enabled: true,\n     address: 'No. 2A Rukuba Road',\n     city: 'Jos',\n     nearby_trace_ids: [] },\n  location: 'Not Updated' }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/home.js",
    "groupTitle": "Home"
  },
  {
    "type": "post",
    "url": "/api/v1/payment",
    "title": "Pay for services",
    "name": "CreatePayment",
    "group": "Payment",
    "description": "<p>Pay for services e.g 1. {memorable =&gt; $0.99, custom =&gt; $4.99}</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "code_type",
            "description": "<p>User's Logical Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "amount",
            "description": "<p>The amount in $$ to pay</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tcode_type: 'memorable',\n\tamount: 0.99\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\tcode_type: 'custom',\n\tamount: 4.99\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The payment information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code_type",
            "description": "<p>The shortcode type bought by the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The payment id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.amount",
            "description": "<p>The amount paid in $</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.active",
            "description": "<p>Weather the user has used it or not. Active means used.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { code_type: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     _id: '55b3bd0720343cc60f6ad0af',\n     amount: 0.99,\n     active: true,\n     __v: 0 },\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 550 Permission Denied\n{\n\tstatus: false,\n\treason: 'Internal Server Error'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/payment.js",
    "groupTitle": "Payment"
  },
  {
    "type": "get",
    "url": "/api/v1/payment/",
    "title": "Get all payments active or not",
    "name": "GetPayments",
    "group": "Payment",
    "description": "<p>Get the payment history of the currenly logged in user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The payment information. (TODO in doc not in code: containing an array)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code_type",
            "description": "<p>The shortcode type bought by the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The payment id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.amount",
            "description": "<p>The amount paid in $</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.active",
            "description": "<p>Weather the user has used it or not. Active means used.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   [{ code_type: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     _id: '55b3bd0720343cc60f6ad0af',\n     amount: 0.99,\n     active: true,\n     __v: 0  }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'No Record Found'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/payment.js",
    "groupTitle": "Payment"
  },
  {
    "type": "post",
    "url": "/api/v1/customshortcode",
    "title": "Request a shortcode information",
    "name": "CreateMemorableShortcode",
    "group": "ShortCode",
    "description": "<p>Request to have a short code instead of the long trace code.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "trace_id",
            "description": "<p>User's Logical Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "custom_code",
            "description": "<p>User's prefered shortcode</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\ttrace_id: 537e2860cace54e137baee4a013bb653,\n\tcustom_code: 08161730129\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>updated information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.short_code",
            "description": "<p>The requested shortcode</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>The logical address in the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0af',\n     short_code: 08161730129,\n     code_type: 'memorable'\n     location_ref: '55b3bd0720343cc60f6ad0ae',\n     trace_id: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     updated_at: '2015-07-25T16:44:55.842Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true, \n     },\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 403 Not Found\n{\n\tstatus: false,\n\tmessage: 'Record exists'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 550 Permission Denied\n{\n\tstatus: false,\n\treason: 'Permission Denied!'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/shortcode.js",
    "groupTitle": "ShortCode"
  },
  {
    "type": "post",
    "url": "/api/v1/memorableshortcode",
    "title": "Request a shortcode information",
    "name": "CreateMemorableShortcode",
    "group": "ShortCode",
    "description": "<p>Request to have a short code instead of the long trace code.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "trace_id",
            "description": "<p>User's Logical Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\ttrace_id: 537e2860cace54e137baee4a013bb653,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>updated information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.short_code",
            "description": "<p>The requested shortcode</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>The logical address in the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0af',\n     short_code: 564323,\n     code_type: 'memorable'\n     location_ref: '55b3bd0720343cc60f6ad0ae',\n     trace_id: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     updated_at: '2015-07-25T16:44:55.842Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true, \n     },\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 403 Not Found\n{\n\tstatus: false,\n\tmessage: 'Record exists'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 550 Permission Denied\n{\n\tstatus: false,\n\treason: 'Permission Denied!'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/shortcode.js",
    "groupTitle": "ShortCode"
  },
  {
    "type": "post",
    "url": "/api/v1/shortcode",
    "title": "Request a shortcode information",
    "name": "CreateShortcode",
    "group": "ShortCode",
    "description": "<p>Request to have a short code instead of the long trace code.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "trace_id",
            "description": "<p>User's Logical Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\ttrace_id: 537e2860cace54e137baee4a013bb653,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>updated information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.short_code",
            "description": "<p>The requested shortcode</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>The logical address in the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     _id: '55b3bd0720343cc60f6ad0af',\n     short_code: 564323,\n     code_type: 'default'\n     location_ref: '55b3bd0720343cc60f6ad0ae',\n     trace_id: '537e2860cace54e137baee4a013bb653',\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     updated_at: '2015-07-25T16:44:55.842Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true, \n     },\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 403 Not Found\n{\n\tstatus: false,\n\tmessage: 'Record exists'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 550 Permission Denied\n{\n\tstatus: false,\n\treason: 'Permission Denied!'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/shortcode.js",
    "groupTitle": "ShortCode"
  },
  {
    "type": "get",
    "url": "/api/v1/shortcode/:lcode",
    "title": "Get location information based on shot code",
    "name": "GetLocation",
    "group": "ShortCode",
    "description": "<p>Get user's location associated with the short code</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lcode",
            "description": "<p>User's Long or short code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The location information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.short_code",
            "description": "<p>The shortcode in the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>User's trace code (Logical Address). The code actually embedded in QRcode.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref",
            "description": "<p>The location information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.location_type",
            "description": "<p>Location type, 'home' or 'work' etc.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { trace_id: '537e2860cace54e137baee4a013bb653',\n     location_ref: \n      { user_ref: '55b3bd0720343cc60f6ad0ad',\n        location_type: 'home',\n        _id: '55b3bd0720343cc60f6ad0ae',\n        verify_change: '########',\n        updated_at: '2015-07-25T16:44:55.325Z',\n        created_at: '2015-07-25T16:44:55.325Z',\n        enabled: true,\n        speed: '',\n        altitude_accuracy: '',\n        altitude: '',\n        gps: {\n\t\t\tlongitude: '0',\n\t\t\tlatitude: '0'\n\t\t},\n        __v: 0 },\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     _id: '55b3bd0720343cc60f6ad0af',\n     updated_at: '2015-07-25T16:44:55.340Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true,\n     __v: 0 } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/shortcode.js",
    "groupTitle": "ShortCode"
  },
  {
    "type": "get",
    "url": "/api/v1/universe/:lscode",
    "title": "Get location information in either the long or shot code",
    "name": "GetLocation",
    "group": "Universe",
    "description": "<p>Get user's location associated with the short code</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lscode",
            "description": "<p>User's Long or short code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The location information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.short_code",
            "description": "<p>The shortcode in the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>User's trace code (Logical Address). The code actually embedded in QRcode.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref",
            "description": "<p>The location information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.location_type",
            "description": "<p>Location type, 'home' or 'work' etc.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { trace_id: '537e2860cace54e137baee4a013bb653',\n     location_ref: \n      { user_ref: '55b3bd0720343cc60f6ad0ad',\n        location_type: 'home',\n        _id: '55b3bd0720343cc60f6ad0ae',\n        verify_change: '########',\n        updated_at: '2015-07-25T16:44:55.325Z',\n        created_at: '2015-07-25T16:44:55.325Z',\n        enabled: true,\n        speed: '',\n        altitude_accuracy: '',\n        altitude: '',\n        gps: {\n\t\t\tlongitude: '0',\n\t\t\tlatitude: '0'\n\t\t},\n        __v: 0 },\n     user_ref: '55b3bd0720343cc60f6ad0ad',\n     _id: '55b3bd0720343cc60f6ad0af',\n     updated_at: '2015-07-25T16:44:55.340Z',\n     created_at: '2015-07-25T16:44:55.340Z',\n     enabled: true,\n     __v: 0 } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/universe.js",
    "groupTitle": "Universe"
  },
  {
    "type": "delete",
    "url": "/api/v1/user",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "User",
    "description": "<p>Delete every traces of the registered user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Usually just to let you know if the delete is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true, message: 'User Account Deleted' }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tusername: \"John\",\n\tpassword: \"yahweh\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\tstatus: false,\n\tmessage: 'Authentication Failed'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user/login",
    "title": "Login user",
    "name": "PostLogin",
    "group": "User",
    "description": "<p>Login a registered user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Used subsequently in headers of all future correspondents (Request)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's fake username, known to the system</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>User's username used during registration</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User's unique identification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiNmI1Njg0NDE4NjE1YjkyYWQ0YzE5OGFjZGYwMTY2YjkiLCJfaWQiOiI1NWIzZmRkNDBmNjVlYWE1MWQwZGQ1MmYiLCJ1cGRhdGVkX2F0IjoiMjAxNS0wNy0yNVQyMToyMToyNC4xMThaIiwiY3JlYXRlZF9hdCI6IjIwMTUtMDctMjVUMjE6MjE6MjQuMTE4WiIsIl9fdiI6MH0sInNhbHQiOiJlYmIwN2I5MzJmYTU4NTdlZmU1OWUxYzliMmRmMjNjYiJ9.4RMXpRRMQYj880YYltglUO69hTO2eQoNYUYKcOHmU8I',\n  user: \n   { username: '6b5684418615b92ad4c198acdf0166b9',\n     _id: '55b3fdd40f65eaa51d0dd52f',\n     updated_at: '2015-07-25T21:21:24.118Z',\n     created_at: '2015-07-25T21:21:24.118Z',\n     __v: 0 } }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tusername: \"John\",\n\tpassword: \"yahweh\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\tstatus: false,\n\tmessage: 'Authentication Failed'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register user",
    "name": "PostRegister",
    "group": "User",
    "description": "<p>Register a first time user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>An echo-back of the registration information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>user's fake username known to the system. It may never be used</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>User's masked password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User's unique identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.q_book",
            "description": "<p>Answer to the book security question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.q_space",
            "description": "<p>Answer to the space security question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.q_mother",
            "description": "<p>Answer to the mother's maiden name security question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.q_animal",
            "description": "<p>Answer to the animal security question</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{ status: true,\n  user: \n   { __v: 0,\n     username: 'cd302d453137f3caac4b53f55985d19e',\n     password: 'FILTERED',\n     _id: '55b3fdd30f65eaa51d0dd52a',\n     updated_at: '2015-07-25T21:21:23.875Z',\n     created_at: '2015-07-25T21:21:23.875Z',\n     q_book: 'Digital Fortress',\n     q_space: 'Moon',\n     q_mother: 'B',\n     q_animal: 'Goat' } }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tusername: \"John\",\n\tpassword: \"yahweh\",\n\tq_animal: \"Goat\",\n\tq_mother: \"B\",\n\tq_space: \"Moon\",\n\tq_book: \"Digital Fortress\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "     HTTP/1.1 403 Not Found\n{\n\tstatus: false,\n\tmessage: 'User exists'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/work",
    "title": "Get work information",
    "name": "GetWork",
    "group": "Work",
    "description": "<p>Get user's work location</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User's work information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.work_name",
            "description": "<p>The name of company/organization the current user works</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.tags",
            "description": "<p>The nature of workplace, expressed in tags</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.address",
            "description": "<p>User's current work physical address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.city",
            "description": "<p>User's current city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>User's work trace code (Logical Address). This would be wrapped up in QRcode.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref",
            "description": "<p>The location information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.location_type",
            "description": "<p>Location type, 'work' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_ref.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.location_ref.gps",
            "description": "<p>The location object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.location_ref.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',\n     location_ref: \n      { user_ref: '55b3cf2a61b97568152f1365',\n        location_type: 'work',\n        _id: '55b3cf2a61b97568152f1368',\n        verify_change: '########',\n        updated_at: '2015-07-25T18:02:18.880Z',\n        created_at: '2015-07-25T18:02:18.880Z',\n        enabled: true,\n        speed: '',\n        altitude_accuracy: '',\n        altitude: '',\n        gps: {longitude: 0, latitude: 0\t},\n        __v: 0 },\n     user_ref: '55b3cf2a61b97568152f1365',\n     _id: '55b3cf2a61b97568152f1369',\n     cloned_work_id: '',\n     uses_clone: false,\n     updated_at: '2015-07-25T18:02:18.891Z',\n     created_at: '2015-07-25T18:02:18.890Z',\n     enabled: true,\n     tags: [],\n     address: '',\n     city: '',\n     work_name: '',\n     nearby_trace_ids: [],\n     __v: 0 } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/work.js",
    "groupTitle": "Work"
  },
  {
    "type": "put",
    "url": "/api/v1/work",
    "title": "Update work information",
    "name": "PutWork",
    "group": "Work",
    "description": "<p>Update the user's work location. Note that the request parameters must<br> contain either work or location or both.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "work",
            "description": "<p>The work object containing only fields that should be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "work.work_name",
            "description": "<p>The name of company/organization the current user works</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "work.address",
            "description": "<p>User's current workplace physical address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "work.city",
            "description": "<p>User's current city where work place is</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The location object containing only fields that should be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.altitude",
            "description": "<p>GPS altitude information</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.speed",
            "description": "<p>GPS speed information</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location.altitude_accuracy",
            "description": "<p>GPS altitude accuracy information</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location.gps",
            "description": "<p>The GPS long and lat object</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": true,
            "field": "location.gps.longitude",
            "description": "<p>GPS longitude information</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": true,
            "field": "location.gps.latitude",
            "description": "<p>GPS latitude information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\tlocation: {\n\t\taltitude: '50.6',\n\t\tspeed: '6.50',\n\t\taltitude_accuracy: '0.19',\n\t\tgps:{\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t}\n\t}\n\twork: {\n\t\taddress: \"Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction\",\n\t\tcity: \"Jos\",\n\t\twork_name: \"Nignux Technologies Ltd.\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\tlocation: {\n\t\taltitude: '50.6',\n\t\tspeed: '6.50',\n\t\taltitude_accuracy: '0.19',\n\t\tgps:{\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t}\n\t}\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n\twork: {\n\t\taddress: \"Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction\",\n\t\tcity: \"Jos\"\n\t\twork_name: \"Nignux Technologies Ltd.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Response Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "work",
            "description": "<p>User updated workplace information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "work.address",
            "description": "<p>User's current workplace physical address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "work.city",
            "description": "<p>User's current city of workplace</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "work.work_name",
            "description": "<p>The name of company/organization user works</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The updated location GPS work information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.location_type",
            "description": "<p>Location type, 'work' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location.gps",
            "description": "<p>The location object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "location.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "location.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  Work: \n   { __v: 0,\n     _id: '55b3cf2a61b97568152f1369',\n     location_ref: '55b3cf2a61b97568152f1368',\n     trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',\n     user_ref: '55b3cf2a61b97568152f1365',\n     cloned_work_id: '',\n     uses_clone: false,\n     updated_at: '2015-07-25T18:02:19.161Z',\n     created_at: '2015-07-25T18:02:18.890Z',\n     enabled: true,\n     tags: [],\n     address: 'Nignux Hub. 3rd Floor, TAEN Business Complex. @ Old Aiport Junction',\n     city: 'Jos',\n     work_name: 'Nignux Technologies Ltd.',\n     nearby_trace_ids: [] },\n  location: \n   { __v: 0,\n     _id: '55b3cf2a61b97568152f1368',\n     location_type: 'work',\n     verify_change: '########',\n     updated_at: '2015-07-25T18:02:19.171Z',\n     created_at: '2015-07-25T18:02:18.880Z',\n     enabled: true,\n     speed: '3.4',\n     altitude_accuracy: '5.5',\n     altitude: '3.0',\n     gps: { longitude: 4.3, latitude: 2.6 } } }",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  Work: 'Not Updated',\n  location: \n   { __v: 0,\n     _id: '55b3cf2a61b97568152f1368',\n     location_type: 'work',\n     verify_change: '########',\n     updated_at: '2015-07-25T18:02:19.099Z',\n     created_at: '2015-07-25T18:02:18.880Z',\n     enabled: true,\n     speed: '2.6',\n     altitude_accuracy: '1.0',\n     altitude: '3.6',\n     gps: { longitude: 0.4, latitude: 3.5 } } }",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  work: \n   { __v: 0,\n     _id: '55b3cf2a61b97568152f1369',\n     location_ref: '55b3cf2a61b97568152f1368',\n     trace_id: '05d5df35ae4e9644fd1905ae2d54f82a',\n     user_ref: '55b3cf2a61b97568152f1365',\n     cloned_work_id: '',\n     uses_clone: false,\n     updated_at: '2015-07-25T18:02:19.035Z',\n     created_at: '2015-07-25T18:02:18.890Z',\n     enabled: true,\n     tags: [],\n     address: 'Angwan Rukuba, Jos',\n     city: 'Abuja',\n     work_name: '',\n     nearby_trace_ids: [] },\n  location: 'Not Updated' }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'Invalid Parameters'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: 'An unknown error occured'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Access Token Expired'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tstatus: false,\n\tmessage: 'Invalid Access Token or Key'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/work.js",
    "groupTitle": "Work"
  }
] });
