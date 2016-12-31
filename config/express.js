var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var csrf = require('csurf');

var cor = require('../app/lib/cors');

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
  app.use(cookieParser());
  app.use(csrf({ cookie: true }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use('/internaldocs', express.static(config.root + '/docs'));
  app.use('/apidoc', express.static(config.root + '/apidoc'));
  app.use(methodOverride());

  // Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/v1/* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you 
  // are sure that authentication is not needed
  app.all('/api/v1/*', require('../app/lib/authentication.js'));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    console.log("convinience");
    res.status(err.status || 500);
    console.log(err.message);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN'){
      console.log("bad token");
      return next(err)
    } 
    // handle CSRF token errors here
    res.status(403)
    res.send('Form tampered with')
  })

};
