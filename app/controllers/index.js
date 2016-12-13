module.exports = function (app) {

	app.get('/',function (req, res, next) {
		res.render('index', {title: "This is the Logical Address Server"});
	});
};