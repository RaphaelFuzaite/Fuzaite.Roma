'use strict';

var path = require('path'),
	errorHandler = require(path.resolve('./Modules/Base/Server/Controllers/ErrorServerController')),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Usuario = mongoose.model('Usuario');

exports.Signup = function(req, res) {
	delete req.body.roles;

	var user = new Usuario(req.body);

	user.Provider = 'local';
	user.NomeCompleto = user.PrimeiroNome + ' ' + user.UltimoNome;

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.GetErrorMessage(err)
			});
		} else {
			user.Senha = undefined;
			user.Salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

exports.Signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			user.Senha = undefined;
			user.Salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

exports.Signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.ListUserCategories = function(req, res) {
	var categorias = [];
	
	categorias.push({ Nome: 'Condutor', Valor: 'Condutor' });
	categorias.push({ Nome: 'Instituição', Valor: 'Instituicao' });
	categorias.push({ Nome: 'Usuário', Valor: 'Usuario' });
	
	res.json(categorias);
};