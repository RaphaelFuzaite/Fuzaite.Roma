'use strict';

module.exports = function(app) {
	var Passageiro = require('../Controllers/PassageiroServerController');

	app.route('/api/Passenger/List').get(Passageiro.List);
    app.route('/api/Passenger/Save').put(Passageiro.Create);
    app.route('/api/Passenger/Save').post(Passageiro.Update);
};