'use strict';

module.exports = function(app) {
	var Passageiro = require('../Controllers/PassageiroServerController');

	app.route('/api/Passenger/List').get(Passageiro.List);
};