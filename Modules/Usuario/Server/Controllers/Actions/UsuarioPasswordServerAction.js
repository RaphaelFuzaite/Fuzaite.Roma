'use strict';

var _ = require('lodash'),
	path = require('path'),
	errorHandler = require(path.resolve('./Modules/Base/Server/Controllers/ErrorServerController')),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Usuario = mongoose.model('Usuario'),
	//config = require(path.resolve('./Config/Config')),
	//nodemailer = require('nodemailer'),
	//async = require('async'),
	crypto = require('crypto');

//var smtpTransport = nodemailer.createTransport(config.mailer.options);

exports.Forgot = function(req, res, next) {
	/*async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(err, token);
			});
		},

		function(token, done) {
			if (req.body.username) {
				User.findOne({
					username: req.body.username
				}, '-salt -password', function(err, user) {
					if (!user) {
						return res.status(400).send({
							message: 'Não conhecemos esse usuário por aqui'
						});
					} else if (user.provider !== 'local') {
						return res.status(400).send({
							message: 'Parece que você se inscreveu utilizando a sua conta ' + user.provider
						});
					} else {
						user.resetPasswordToken = token;
						user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

						user.save(function(err) {
							done(err, token, user);
						});
					}
				});
			} else {
				return res.status(400).send({
					message: 'Precisamos do nome do usuário'
				});
			}
		},
		function(token, user, done) {
			res.render('templates/reset-password-email', {
				name: user.displayName,
				appName: config.app.title,
				url: 'http://' + req.headers.host + '/Auth/Reset/' + token
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Redefinição de senha',
				html: emailHTML
			};
			//smtpTransport.sendMail(mailOptions, function(err) {
			//	if (!err) {
			//		res.send({
			//			message: 'Um email foi enviado para ' + user.email + ' contendo mais instruções.'
			//		});
			//	} else {
			//		return res.status(400).send({
			//			message: 'Tivemos um problema ao enviar o email.'
			//		});
			//	}

			//	done(err);
			//});
		}
	], function(err) {
		if (err) return next(err);
	});*/
};

exports.ValidateResetToken = function(req, res) {
	Usuario.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function(err, user) {
		if (!user) {
			return res.redirect('/#!/Password/Reset/Invalid');
		}

		res.redirect('/#!/Password/Reset/' + req.params.token);
	});
};

exports.Reset = function(req, res, next) {
	var passwordDetails = req.body;

	/*async.waterfall([

		function(done) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!err && user) {
					if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
						user.password = passwordDetails.newPassword;
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;

						user.save(function(err) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.GetErrorMessage(err)
								});
							} else {
								req.login(user, function(err) {
									if (err) {
										res.status(400).send(err);
									} else {
										res.json(user);

										done(err, user);
									}
								});
							}
						});
					} else {
						return res.status(400).send({
							message: 'As senhas não estão combinando'
						});
					}
				} else {
					return res.status(400).send({
						message: 'Token de redefinição de senha é inválido ou expirou.'
					});
				}
			});
		},
		function(user, done) {
			res.render('templates/reset-password-confirm-email', {
				name: user.displayName,
				appName: config.app.title
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},

		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Parece que a sua senha foi alterada por aqui',
				html: emailHTML
			};

			//smtpTransport.sendMail(mailOptions, function(err) {
			//	done(err, 'done');
			//});
		}
	], function(err) {
		if (err) return next(err);
	});*/
};

exports.ChangePassword = function(req, res) {
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
			Usuario.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										message: errorHandler.GetErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												message: 'Conseguimos alterar a sua senha'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'As senhas não estão combinando'
							});
						}
					} else {
						res.status(400).send({
							message: 'A senha atual está incorreta'
						});
					}
				} else {
					res.status(400).send({
						message: 'Não encontramos este usuário'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Você esqueceu a senha'
			});
		}
	} else {
		res.status(400).send({
			message: 'Você não está conectado'
		});
	}
};