'use strict';
angular.module('Passageiro').config(['$stateProvider', function($stateProvider) {
			
		$stateProvider
                .state('Passageiros', {
                abstract: true,
                url: '/Passageiros',
                template: '<ui-view/>'
            })
            .state('Passageiros.Lista', {
                url: '',
                templateUrl: 'Modules/Passageiro/Views/HomePassageiroClientView.html',
                ncyBreadcrumb: {
                    label: 'Passageiros'
                }
            })
			.state('Passageiros.Cadastrar', {
				url: '/Cadastrar',
				templateUrl: 'Modules/Passageiro/Views/CadastroPassageiroClientView.html',
                ncyBreadcrumb: {
                    parent: 'Passageiros.Lista',
                    label: 'Cadastrar'
                }
			});
	}
]);