'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Usuario = mongoose.model('Usuario');

exports.UserByID = function(req, res, next, id) {
	Usuario.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Tivemos problemas ao carregar o usuário #' + id));
		req.profile = user;
		next();
	});
};

exports.RequiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'Precisamos que esteja conectado em sua conta'
		});
	}

	next();
};

exports.HasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'Você não tem autorização para fazer isto'
				});
			}
		});
	};
};