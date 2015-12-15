'use strict';

angular.module('Base').directive('architectureAuthentication', [function() {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/Modules/Base/Templates/AuthenticationTemplate.html',
			controller: ['$scope','UsuarioClientModel', function($scope, UsuarioClientModel){
				var Usuario = new UsuarioClientModel({});
				$scope.Authentication = Usuario.Authentication.Get();
				
			}],
			link: {
				post: function ($scope, element, attrs) {
					if(!angular.isObject($scope.Authentication))
						$('.ui.modal').modal({ closable: false }).modal('show');
				}
			}
		};
}]);