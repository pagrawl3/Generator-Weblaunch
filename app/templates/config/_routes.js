module.exports = function(app, passport) {
	//__IMPORT ALL THE CONTROLLERS
	var	main 			= require('../app/controllers/main');

	//__Routes
	app.get('/', main.index);
};