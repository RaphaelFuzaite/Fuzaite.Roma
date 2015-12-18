'use strict';

var passport = require('passport');

module.exports = function(app) {
	var Usuario = require('../Controllers/UsuarioServerController');

	app.route('/api/User/Me').get(Usuario.Me);
	app.route('/api/User').put(Usuario.Update);
	app.route('/api/User/Accounts');

	app.route('/api/User/Password').post(Usuario.ChangePassword);
	app.route('/api/Auth/Forgot').post(Usuario.Forgot);
	app.route('/api/Auth/Reset/:token').get(Usuario.ValidateResetToken);
	app.route('/api/Auth/Reset/:token').post(Usuario.Reset);

	app.route('/api/Auth/Signup').put(Usuario.Signup);
	app.route('/api/Auth/Signin').post(Usuario.Signin);
	app.route('/api/Auth/Signout').get(Usuario.Signout);
	
	app.route('/api/User/ListUserCategories').get(Usuario.ListUserCategories);

	app.param('UserId', Usuario.UserByID);
};