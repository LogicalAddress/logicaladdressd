define({ "api": [
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
    "type": "get",
    "url": "/api/v1/mobile",
    "title": "Get Active Origin",
    "name": "GetMobile",
    "group": "Mobile",
    "description": "<p>Get user's active origin location information</p>",
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
            "description": "<p>User's mobile origin information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>User's mobile trace code (Logical Address). This would be wrapped up in QRcode.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.expires_at",
            "description": "<p>Expiring Timestamp in milliseconds since 1990</p>"
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
            "description": "<p>Location type, 'mobile' in this case</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n\"status\":true,\n\"data\":{\n \"expires_at\":\"1437861805468\",\n \"trace_id\":\"21e0d89662d8c59189e36628f079dc43\",\n \"location_ref\":{\n  \"user_ref\":\"55b407a8dff6a38720a176fb\",\n  \"location_type\":\"mobile\",\n  \"_id\":\"55b407a8dff6a38720a17705\",\n  \"verify_change\":\"########\",\n  \"updated_at\":\"2015-07-25T22:03:20.463Z\",\n  \"created_at\":\"2015-07-25T22:03:20.463Z\",\n  \"enabled\":true,\n  \"speed\":\"\",\n  \"altitude_accuracy\":\"\",\n  \"altitude\":\"\",\n  \"gps\":{\"latitude\":0,\"longitude\":0},\n \"__v\":0},\n\"user_ref\":\"55b407a8dff6a38720a176fb\",\n\"_id\":\"55b407a8dff6a38720a17706\",\n\"updated_at\":\"2015-07-25T22:03:20.467Z\",\n\"created_at\":\"2015-07-25T22:03:20.467Z\",\n\"enabled\":true,\"\n__v\":0\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "get",
    "url": "/api/v1/mobile/active_targets",
    "title": "Get Active Targets",
    "name": "GetMobileActiveTargets",
    "group": "Mobile",
    "description": "<p>Get active targets to origin (List of Targets)</p>",
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
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of accepted Targets who can track the Origin's Trace Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"status\":true,\n\"data\":[\n {\n  \"origin_trace_id\":\"21e0d89662d8c59189e36628f079dc43\",\n  \"location_ref\":\n   {\n    \"user_ref\":\"55b407a8dff6a38720a17700\",\n    \"location_type\":\"mobile\",\n    \"_id\":\"55b407a8dff6a38720a17709\",\n    \"verify_change\":\"########\",\n    \"updated_at\":\"2015-07-25T22:03:20.557Z\",\n    \"created_at\":\"2015-07-25T22:03:20.557Z\",\n    \"enabled\":true,\n    \"speed\":\"\",\n    \"altitude_accuracy\":\"\",\n    \"altitude\":\"\",\n    \"gps\":\n     {\n      \"latitude\":0,\n      \"longitude\":0\n     },\n    \"__v\":0\n   },\n  \"origin_ref\":\"55b407a8dff6a38720a17706\",\n  \"user_ref\":\"55b407a8dff6a38720a17700\",\n  \"_id\":\"55b407a8dff6a38720a1770a\",\n  \"updated_at\":\"2015-07-25T22:03:20.559Z\",\n  \"created_at\":\"2015-07-25T22:03:20.559Z\",\n  \"enabled\":true,\n  \"accepted\":true,\n  \"identifier\":\"Nelson Collins\",\n  \"__v\":0\n },\n {\n \"origin_trace_id\":\"21e0d89662d8c59189e36628f079dc43\",\n \"location_ref\":\n  {\n   \"user_ref\":\"55b407a8dff6a38720a176fb\",\n   \"location_type\":\"mobile\",\n   \"_id\":\"55b407a8dff6a38720a17707\",\n   \"verify_change\":\"########\",\n   \"updated_at\":\"2015-07-25T22:03:20.523Z\",\n   \"created_at\":\"2015-07-25T22:03:20.523Z\",\n   \"enabled\":true,\n   \"speed\":\"\",\n   \"altitude_accuracy\":\"\",\n   \"altitude\":\"\",\n   \"gps\":{\n    \"latitude\":0,\n    \"longitude\":0\n    },\n   \"__v\":0\n  },\n  \"origin_ref\":\"55b407a8dff6a38720a17706\",\n  \"user_ref\":\"55b407a8dff6a38720a176fb\",\n  \"_id\":\"55b407a8dff6a38720a17708\",\n  \"updated_at\":\"2015-07-25T22:03:20.528Z\",\n  \"created_at\":\"2015-07-25T22:03:20.528Z\",\n  \"enabled\":true,\n  \"accepted\":true,\n  \"identifier\":\"Nelson Collins\",\n  \"__v\":0\n  }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "get",
    "url": "/api/v1/mobile/pending",
    "title": "Get Pending Requests",
    "name": "GetMobilePending",
    "group": "Mobile",
    "description": "<p>Get Pending Requests to Origin</p>",
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
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Targets who requested access to Origin's Trace Code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.origin_trace_id",
            "description": "<p>Origin's mobile trace code (Logical Address).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_ref",
            "description": "<p>User's unique identification who made the request</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.accepted",
            "description": "<p>The state of the request</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data._id",
            "description": "<p>The request ID. To be used when accepting or rejecting request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.identifier",
            "description": "<p>The name of the user who made the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   [ { origin_trace_id: '21e0d89662d8c59189e36628f079dc43',\n       location_ref: '55b407a8dff6a38720a17709',\n       origin_ref: '55b407a8dff6a38720a17706',\n       user_ref: '55b407a8dff6a38720a17700',\n       _id: '55b407a8dff6a38720a1770a',\n       updated_at: '2015-07-25T22:03:20.559Z',\n       created_at: '2015-07-25T22:03:20.559Z',\n       enabled: true,\n       accepted: false,\n       identifier: 'Nelson Collins',\n       __v: 0 },\n     { origin_trace_id: '21e0d89662d8c59189e36628f079dc43',\n       location_ref: '55b407a8dff6a38720a17707',\n       origin_ref: '55b407a8dff6a38720a17706',\n       user_ref: '55b407a8dff6a38720a176fb',\n       _id: '55b407a8dff6a38720a17708',\n       updated_at: '2015-07-25T22:03:20.528Z',\n       created_at: '2015-07-25T22:03:20.528Z',\n       enabled: true,\n       accepted: false,\n       identifier: 'Nelson Collins',\n       __v: 0 } ] }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/api/v1/mobile",
    "title": "Create Mobile Origin",
    "name": "PostMobile",
    "group": "Mobile",
    "description": "<p>Generate a logical address (trace code) that would be used by those who have it to track the user</p>",
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
            "description": "<p>Response status, true means successful.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The mobile trace information (Origin)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trace_id",
            "description": "<p>The trace id, that others (Targets) would use to track this user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.expires_at",
            "description": "<p>Expiring Timestamp in milliseconds since 1990</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_ref",
            "description": "<p>Represents the unique identifier of the creator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     expires_at: '1437861467868',\n     trace_id: 'dbd69d61c0804d9b99b612f28d98cfcb',\n     location_ref: '55b406568d393c3220c80d12',\n     user_ref: '55b406568d393c3220c80d08',\n     _id: '55b406568d393c3220c80d13',\n     updated_at: '2015-07-25T21:57:42.867Z',\n     created_at: '2015-07-25T21:57:42.867Z',\n     enabled: true } }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/api/v1/mobile/authorize",
    "title": "Authorize/Deny Request",
    "name": "PostMobileAuthorize",
    "group": "Mobile",
    "description": "<p>Accept or Reject Request to Track</p>",
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
            "optional": false,
            "field": "request_id",
            "description": "<p>The Request ID (Accessible at /api/v1/mobile/pending)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "command",
            "description": "<p>true to accept or false to deny request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\trequest_id: '55b407a8dff6a38720a1770a',\n\tcommand: true\n}",
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
            "description": "<p>The Authorized information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.accepted",
            "description": "<p>The state of the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.identifier",
            "description": "<p>The name of the user who made the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_ref",
            "description": "<p>The Unique identifier of the user who made the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { origin_trace_id: '21e0d89662d8c59189e36628f079dc43',\n     location_ref: '55b407a8dff6a38720a17707',\n     origin_ref: '55b407a8dff6a38720a17706',\n     user_ref: '55b407a8dff6a38720a176fb',\n     _id: '55b407a8dff6a38720a17708',\n     __v: 0,\n     updated_at: '2015-07-25T22:03:20.528Z',\n     created_at: '2015-07-25T22:03:20.528Z',\n     enabled: true,\n     accepted: true,\n     identifier: 'Nelson Collins' } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: \"Invalid Parameters. Pass 'command' & 'request_id' in body request\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "post",
    "url": "/api/v1/mobile/target",
    "title": "Create a Target",
    "name": "PostMobileTarget",
    "group": "Mobile",
    "description": "<p>Create a Target in order to track Origin</p>",
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
            "optional": false,
            "field": "trace_id",
            "description": "<p>The Request ID (created by other user at POST /api/v1/mobile)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>The name of the target. This would be shown to the user who would accept the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\ttrace_id: 'dbd69d61c0804d9b99b612f28d98cfcb',\n\tidentifier: 'Nelson Collins'\n}",
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
            "description": "<p>The Request information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.accepted",
            "description": "<p>The state of the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.identifier",
            "description": "<p>The name of the user who made the request (current user)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_ref",
            "description": "<p>The Unique identifier of the user who made the request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.origin_trace_id",
            "description": "<p>Should be same as trace_id passed in the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     origin_trace_id: '21e0d89662d8c59189e36628f079dc43',\n     location_ref: '55b407a8dff6a38720a17709',\n     origin_ref: '55b407a8dff6a38720a17706',\n     user_ref: '55b407a8dff6a38720a17700',\n     _id: '55b407a8dff6a38720a1770a',\n     updated_at: '2015-07-25T22:03:20.559Z',\n     created_at: '2015-07-25T22:03:20.559Z',\n     enabled: true,\n     accepted: false,\n     identifier: 'Nelson Collins' } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: \"Invalid Parameters. Pass 'trace_id' and 'identifier' in body request\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "put",
    "url": "/api/v1/mobile",
    "title": "Update Active Origin",
    "name": "PutMobile",
    "group": "Mobile",
    "description": "<p>Update Location parameters for the Origin</p>",
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
          "content": "{\n\tlocation: {\n\t\taltitude: '50.6',\n\t\tspeed: '6.50',\n\t\taltitude_accuracy: '0.19',\n\t\tgps:{\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t}\n\t}\n}",
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
            "description": "<p>The updated location GPS mobile information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_type",
            "description": "<p>Location type, 'mobile' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     _id: '55b407a8dff6a38720a17705',\n     location_type: 'mobile',\n     verify_change: '########',\n     updated_at: '2015-07-25T22:03:20.816Z',\n     created_at: '2015-07-25T22:03:20.463Z',\n     enabled: true,\n     speed: '6.50',\n     altitude_accuracy: '0.19',\n     altitude: '50.6',\n     gps: {\n\t\t\tlongitude: 63.23,\n\t\t\tlatitude: 54.3\n\t\t} } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: \"Invalid Parameters. Pass 'location' object in the body request\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
  },
  {
    "type": "put",
    "url": "/api/v1/mobile/target",
    "title": "Update Target",
    "name": "PutMobiletarget",
    "group": "Mobile",
    "description": "<p>Update Location Parameters for the Target</p>",
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
            "optional": false,
            "field": "trace_id",
            "description": "<p>The trace code of the Origin current user is tracking.</p>"
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
          "content": "{\n\ttrace_id: '21e0d89662d8c59189e36628f079dc43',\n\tlocation: {\n\t\taltitude: '23.4',\n\t\tspeed: '1.82',\n\t\taltitude_accuracy: '19.09',\n\t\tgps:{\n\t\t\tlongitude: '34.4',\n\t\t\tlatitude: '73.8'\n\t\t}\n\t}\n}",
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
            "description": "<p>The updated location GPS mobile information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.location_type",
            "description": "<p>Location type, 'mobile' in this case</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.altitude",
            "description": "<p>The altitude G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.speed",
            "description": "<p>The speed. G.P.S information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.gps",
            "description": "<p>The location Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.gps.longitude",
            "description": "<p>The longitude</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "data.gps.latitude",
            "description": "<p>The latitude</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ status: true,\n  data: \n   { __v: 0,\n     _id: '55b407a8dff6a38720a17707',\n     location_type: 'mobile',\n     verify_change: '########',\n     updated_at: '2015-07-25T22:03:20.852Z',\n     created_at: '2015-07-25T22:03:20.523Z',\n     enabled: true,\n     speed: '1.82',\n     altitude_accuracy: '19.09',\n     altitude: '23.4',\n     gps: {\n\t\t\tlongitude: '34.4',\n\t\t\tlatitude: '73.8'\n\t\t} } }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: \"Invalid Parameters. Pass 'trace_id' and 'location' object in body request\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\tstatus: false,\n\treason: '{The actual reason}'\n}",
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
    "filename": "app/controllers/mobile.js",
    "groupTitle": "Mobile"
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
    "url": "/api/v1/user/register",
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
