'use strict';

module.exports = function(app) {
	var Passageiro = require('../Controllers/PassageiroServerController');

    app.route('/api/Passageiros')
        .get(Passageiro.List)
        .post(Passageiro.Create);
    
	app.route('/api/Passageiros/:PassageiroId')
        .get(Passageiro.FindByID)
        .put(Passageiro.Update);
        //.delete(Passageiro.Delete);
    
    //app.param('PassageiroId', Passageiro.PassageiroByID);
};