module.exports = function (app) {

	app.get('/',function (req, res, next) {
		res.render('pages/index', {
			title: "Logical Address | Welcome to Logical Address",
			page: 'home',
			app_title: "Logical Address"
		});
	});
	
	app.get('/login',function (req, res, next) {
		res.render('pages/login', {
			title: "Logical Address | Login to Logical Address",
			page: 'login',
			app_title: "Logical Address"
		});
	});
	
	app.get('/register',function (req, res, next) {
		res.render('pages/register', {
			title: "Logical Address | Register your Logical Address",
			page: 'register',
			app_title: "Logical Address"
		});
	});
	
	app.get('/register/business',function (req, res, next) {
		res.render('pages/register-business', {
			title: "Logical Address | Logical Address for Business",
			page: 'register-business',
			app_title: "Logical Address"
		});
	});
	
	app.get('/password/recovery',function (req, res, next) {
		res.render('pages/forgot-password', {
			title: "Logical Address | Password Recovery",
			page: 'forgot-password',
			app_title: "Logical Address"
		});
	});
};