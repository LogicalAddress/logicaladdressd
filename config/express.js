var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cor = require('../app/lib/cors');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

module.exports = function(app, config) {
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.all('*', cor.allowCrossDomain);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser('S3CRE7'));
  app.use(session({
    secret:'lovely secrete code',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: require('./config').db,
        ttl: 24 * 60 * 60 * 1000 * 365, //1yr
        // mongoOptions: advancedOptions
    }),
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, //1yr
  }));
  app.use(flash());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use('/internaldocs', express.static(config.root + '/docs'));
  app.use('/apidoc', express.static(config.root + '/apidoc'));
  // app.use(methodOverride());
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/v1/* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you 
  // are sure that authentication is not needed
  app.all('/api/v1/*', require('../app/lib/authentication.js'));
  
  app.use(function(req, res, next) {
      req.app.locals.furl = function(resource) {
          resource = resource ? resource : '';
          //var proto = req.connection.encrypted ? 'https' : 'http';
          return "//" + req.headers.host + '/' + resource;
      };
      req.app.locals.app_title = "LogicalAddress";
      return next();
  });
  
  var middlewares = glob.sync(config.root + '/middlewares/**/*.js');
	middlewares.forEach(function (middleware) { 
		require(middleware)(app);
	});

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  // app.use(function (req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });
  
  // if(app.get('env') === 'development'){
  //   app.use(function (err, req, res, next) {
  //     res.status(err.status || 500);
  //     res.render('error', {
  //       message: err.message,
  //       error: err,
  //       title: 'error'
  //     });
  //   });
  // }

  // app.use(function (err, req, res, next) {
  //   console.log("convinience");
  //   res.status(err.status || 500);
  //   console.log(err.message);
  //     res.render('error', {
  //       message: err.message,
  //       error: {},
  //       title: 'error'
  //     });
  // });
  
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN'){
      return next(err);
    } 
    // handle CSRF token errors here
    res.status(403);
    res.send('Form tampered with')
  })

};
