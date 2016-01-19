'use strict';

angular.module('Base').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$urlRouterProvider.otherwise('NotFound');

		$stateProvider
		.state('Inicio', {
			url: '/',
			templateUrl: 'Modules/Base/Views/HomeBaseClientView.html',
			data: {
				Titulo: 'Início',
				Subtitulo: 'Visão Geral',
				ncyBreadcrumbLabel: 'Início'
  			},
			ncyBreadcrumb: {
				label: 'Início'
			}
		})
		.state('NotFound', {
        	url: '/NotFound',
        	templateUrl: 'Modules/Base/Views/404BaseClientView.html'
      	});
	}
]).config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push(['$q', '$location', 'Message',
			function($q, $location, Message) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								//Authentication.RemoveUser();

								// Redirect to signin page
								$location.path('Acessar');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}
						
						Message.CompleteDisclaimer(rejection.status, rejection.data);

						return $q.reject(rejection);
					},
                    response: function(response) {
                        switch (response.status){
                            case 201:
                                Message.CompleteDisclaimer(response.status, { title: 'Criado!', message: 'Os dados foram gravados com sucesso.' });
                            break;
                            case 202:
                                Message.CompleteDisclaimer(response.status, { title: 'Salvo!', message: 'As atualizações foram salvas.' });
                            break;
                            default:
                            break;    
                        }
                        
                        return response;
                    }
				};
			}
		]);
	}
]).config(['$breadcrumbProvider',function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
		templateUrl: '/Modules/Base/Templates/BreadcrumbTemplate.html'
    });
}]).run([function () {
    //Authentication.FetchUser();
}]).run(function($rootScope) {
	$rootScope.$on('$stateChangeStart', function() {
		console.log('Carregando...');
	});
	
	$rootScope.$on('$stateChangeSuccess', function() {
		console.log('Carregado...');
	});
});