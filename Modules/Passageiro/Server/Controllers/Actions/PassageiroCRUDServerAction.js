'use strict';

var path = require('path'),
	errorHandler = require(path.resolve('./Modules/Base/Server/Controllers/ErrorServerController')),
	mongoose = require('mongoose'),
	Passageiro = mongoose.model('Passageiro');

exports.List = function(req, res) {
	Passageiro.find().exec(function(err, passageiros) {
		if (err) {
            var errorResponse = errorHandler.GetErrorResponse(400, err);
            res.status(errorResponse.statusCode).send(errorResponse.data);
		} else {
			res.json(passageiros);
		}
	});
};

exports.Create = function(req, res) {
    var passageiro = new Passageiro(req.body);
    passageiro.Condutor = req.user._id;
        
    passageiro.save(function(err){
       if (err) {
           var errorResponse = errorHandler.GetErrorResponse(400, err);
           console.log(errorResponse.data);
           res.status(errorResponse.statusCode).send(errorResponse.data);
       } else {
           res.status(201).json(passageiro);
       }
    });
};

exports.Update = function(req, res) {
    var passageiro = new Passageiro(req.body);
    passageiro.Condutor = req.user._id;
    
    var query = { _id: passageiro._id };
    passageiro.update(query, passageiro, function(err){
       if (err) {
           var errorResponse = errorHandler.GetErrorResponse(400, err);
           console.log('ERRORRESPONSE ', errorResponse);
           res.status(errorResponse.statusCode).send(errorResponse.data);
       } else {
           res.status(202).json(passageiro);
       }
    });
};