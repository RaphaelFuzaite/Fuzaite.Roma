'use strict';

var path = require('path'),
	errorHandler = require(path.resolve('./Modules/Base/Server/Controllers/ErrorServerController')),
	mongoose = require('mongoose'),
	Passageiro = mongoose.model('Passageiro');

exports.List = function(req, res) {
	Passageiro.find().exec(function(err, passageiros) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(passageiros);
		}
	});
};