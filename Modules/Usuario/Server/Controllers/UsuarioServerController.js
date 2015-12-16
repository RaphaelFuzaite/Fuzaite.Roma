'use strict';
var _ = require('lodash');

module.exports = _.extend(
	require('./Actions/UsuarioAuthenticationServerAction'),
	require('./Actions/UsuarioAuthorizationServerAction'),
	require('./Actions/UsuarioPasswordServerAction'),
	require('./Actions/UsuarioProfileServerAction')
);	