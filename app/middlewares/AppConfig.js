var AppConfig = require("../../config/config");
module.exports = function (app) {
    app.all('*', function(req, res, next){
        res.locals.AppConfig = AppConfig;
        res.locals.ENV = process.env.NODE_ENV;
        req.locals.app_title = "Logical Address";
        next();
    });
};