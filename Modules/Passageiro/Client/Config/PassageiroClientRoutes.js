'use strict';
angular.module('Passageiro').config(['$stateProvider', function($stateProvider) {
			
		$stateProvider
			.state('Passageiros', {
				url: '/Passageiros',
				templateUrl: 'Modules/Passageiro/Views/HomePassageiroClientView.html'
			})
			.state('Passageiros.Cadastro', {
				url: '/Cadastro',
				templateUrl: 'Modules/Passageiro/Views/CadastroPassageiroClientView.html'
			});
	}
]);