var AccountKitConfig = require('../../config/accountKit')();
var _ = require('underscore');
var AccountKitGetMobileNumber = require('../lib/accountKit');
var User = require('../models/user');
var UserLib = require('../lib/user');
var Business = require('../models/business');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var hash = require('md5');
var Employee = require('../models/employee');
var Location = require('../models/location');

module.exports = function(app)
{ 
    
    // Test 3rd party //
    app.get('/3rdparty/test/', function(req, res) {
       var html = "\
<!doctype html><html><head><script type=\"text/javascript\" src=\"https://logicaladdressd-dretnan.c9users.io/3rdparty/js/get-permissions\"></script></head><body><form method=\"post\" action=\"/3rdparty/test/submit/\"><input type=\"text\" id=\"logical-address\"/><input type=\"submit\" value=\"checkout\"></form><script type=\"text/javascript\">logical_address_init('logical-address', function(error, res){alert(res)});</script></body></html>";
        res.setHeader('content-type', 'text/html');
        res.write(html);
        res.end();
    });
    
    
    app.get('/3rdparty/set-permissions', csrfProtection, function (req, res, next) {
		
		if(_.has(req.session, 'user')) {
		    res.render('pages/set-permissions', {
		        title: "Logical Address | Set Permissions",
		        page: 'setPermissions',
		        user: _.has(req.session, 'user') ? req.session.user : false,
		    })
		} else {
		
    		res.render('pages/login', {
    			title: "Logical Address | Login to Logical Address",
    			page: 'login',
    			csrfToken: req.csrfToken(),
    			FACEBOOK_APP_ID: AccountKitConfig.app_id,
    			ACCOUNT_KIT_API_VERSION: AccountKitConfig.api_version,
    			app_title: "Logical Address",
    			user: _.has(req.session, 'user') ? req.session.user : false
    		});
		}
	});
    
    
    app.get('/3rdparty/js/get-permissions', function(req, res)
    {
        var permission_url = "https://logicaladdressd-dretnan.c9users.io/3rdparty/set-permissions"
            ,check_permissions_url  = "https://logicaladdressd-dretnan.c9users.io/3rdparty/search/"
            ,js = "\
var win, la_interval_id, la_child_flag = false, la_data = {};\n\
function valid_div(obj) {\n\
    try {\n\
        if(obj instanceof HTMLElement) return obj;\n\
        throw new Error;\n\
    }\n\
    catch(e){\n\
        if(obj && (typeof obj === \"object\") && (Object.prototype.hasOwnProperty.call(obj, \"nodeType\")) && (obj.nodeType === 1) && (typeof obj.style === \"object\") && (typeof obj.ownerDocument ===\"object\"))\n\
            return obj;\n\
        else if(typeof obj === \"string\") {\n\
            obj = document.getElementById(obj);\n\
            return (valid_div(obj));\n\
        } else return null;\n\
    }\n\
}\n\
function logical_address_init(input, callback) {\n\
    var la_dom, la_event = \"input\",\n\
        la_check_callback = function(cb){ return (typeof cb === \"function\" && cb()) ? true : false; },\n\
        la_json_obj = null;\n\
    if(la_dom = valid_div(input)){\n\
        la_dom.addEventListener((la_event.length == 0) ? \"input\" : la_event, function() {\n\
            var la_code = la_dom.value;\n\
            if(la_code.length == 10) {\n\
                var strWindowFeatures = \"location=no,height=570,width=520,scrollbars=yes,status=yes\"\n\
                    ,URL = \"" + permission_url + "?mini=true&url=\" + location.href;\n\
                win = window.open(URL, \"_blank\", strWindowFeatures);\n\
                win.onload = function() {\n\
                     var la_interval_id = window.setInterval(function(){\n\
                        if(la_child_flag){\n\
                            if(la_check_callback(callback)) callback(null, la_data);\n\
                            window.clearInterval(la_interval_id);\n\
                            la_child_flag = false;\n\
                        } else if(win.closed){\n\
                        	console.log(\"" + check_permissions_url + "\" + la_code);\n\
                            var xmlhttp = new XMLHttpRequest();\n\
                            xmlhttp.open(\"GET\", \"" + check_permissions_url + "\" + la_code, true);\n\
                            xmlhttp.onreadystatechange = function() {\n\
                                if (xmlhttp.readyState == 4) {\n\
                                    if(xmlhttp.status == 200) {\n\
                                        la_json_obj = JSON.parse(xmlhttp.responseText);\n\
                                        if(la_check_callback(callback)) callback(null, la_json_obj);\n\
                                    } else { throw new Error(\"Server error occured\"); }\n\
                                } else { throw new Error(\"Error communicating with server\"); }\n\
                            };\n\
                            console.log(xmlhttp);\n\
                            console.log(xmlhttp.readyState);\n\
                            xmlhttp.send(null);\n\
                            window.clearInterval(la_interval_id);\n\
                        }\n\
                    }, 100);\n\
                    //var la_interval_id = window.setInterval(la_check_window, 100);\n\
                }\n\
            }\n\
            console.info('input changed to: ' + la_code);\n\
        });\n\
    } else {\n\
        console.log(callback);\n\
        if(la_check_callback(callback))\n\
        {\n\
            callback(\"Invalid element id of DOM object passed\");\n\
        } else {\n\
            throw new Error(\"Invalid div id of DOM Object passed\");\n\
        }\n\
    }\n\
}\n\
function logical_address_handle_result(_data) {\n\
    return _data;\n\
}\n\
function logical_address_finalyzer(error, data) {\n\
    window.setTimeout(function() {\n\
        if (win.closed) {\n\
            la_child_flag = true;\n\
            la_data = data;\n\
            console.log(data);\n\
            console.log(win);\n\
            console.info(\"LA window closed\");\n\
        }\n\
    }, 1);\n\
    \n\
}\n\
";
        res.setHeader('content-type', 'text/javascript');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.write(js);
        res.end();
    });
    
    app.get("/3rdparty/search/:la_code", function(req, res, next) {
        User.findByGlobalLA(req.params.la_code, function(error,user)
        {
            if(!user){
				res.status(404);
				return res.json({status: false, reason: 'An unknown error occuredX'});
			}
			Location.findRecords({ user_ref: user._id }, function(err, lRecord){
				if(_.isArray(lRecord) && lRecord.length > 0){
					res.status(200);
					// Make the API Consistent
					var data = [];
					for(var i = 0; i < lRecord.length; i++){
						data[i] = {
							_id: lRecord[i]._id,
							trace_id: lRecord[i].trace_id,
							user_ref: lRecord[i].user_ref,
							short_code: '',
							enabled: lRecord[i].enabled,
							created_at: lRecord[i].created_at,
							updated_at: lRecord[i].updated_at,
							location_ref: lRecord[i],
						};
					}
					return res.json({status: true, data: data});
				}
				res.status(404);
				return res.json({status: false, reason: 'An unknown error occured'});
			});
        });
    });
}

/**
 * 
function logical(div, event = "input", callback = false)
{
    var div = document.getElementById(div);
    div.addEventListener(event, function()
    {
        if(callback)
        {
            callback(null, json)
        } else return json;
    })
    
}
var result = logical("jk", "event", callback);**/