'use strict';

/**
 * Module dependencies.
 */
var config = require('../Config'),
	mongoose = require('./mongoose'),
	express = require('./express'),
	chalk = require('chalk');

// Initialize Models
mongoose.loadModels();

module.exports.loadModels = function loadModels() {
	mongoose.loadModels();
};

module.exports.Init = function init(callback) {

	mongoose.connect(function (db) {
		// Initialize express
		var app = express.init(db);
		if (callback) callback(app, db, config);

	});
};

module.exports.Start = function start(callback) {
	var _this = this;

	_this.Init(function(app, db, config) {

		// Start the app by listening on <port>
		app.listen(config.Port, function() {

			// Logging initialization
			console.log('--');
			console.log(chalk.green(config.App.Title));
			console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
			console.log(chalk.green('Port:\t\t\t\t' + config.Port));
			console.log(chalk.green('Database:\t\t\t' + config.DB.URI));
			if (process.env.NODE_ENV === 'secure') {
				console.log(chalk.green('HTTPs:\t\t\t\ton'));
			}
			console.log('--');

			if (callback) callback(app, db, config);
		});

	});

};
