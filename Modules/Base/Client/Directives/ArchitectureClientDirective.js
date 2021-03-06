'use strict';

angular.module('Base').directive('architectureAuthentication', [function() {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/Modules/Base/Templates/AuthenticationTemplate.html',
			controller: ['$scope', '$http', 'Form', 'UsuarioClientModel', function($scope, $http, Form, UsuarioClientModel){
				var Usuario = new UsuarioClientModel();
				$scope.Authentication = Usuario.Authentication.Get();
				
				$http.get('/api/User/ListUserCategories').success(function (response) {
					$scope.CategoriasDeUsuario = response;
				});
				
				$scope.FormSignin = new Form({
					Name: 'AuthenticationFormSignin',
					Model: Usuario,
					Url: '/api/Auth/Signin',
					Method: 'POST',
					Success: function(response) {
						Usuario.Authentication.Fetch(response);
						window.location.reload();
					},
					Error: function(response) {
						$scope.Error = response.message;
					}
				});
				
				$scope.FormSignup = new Form({
					Name: 'AuthenticationFormSignup',
					Model: Usuario,
					Url: '/api/Auth/Signup',
					Method: 'PUT',
					Success: function(response) {
						Usuario.Authentication.Fetch(response);
						window.location.reload();
					},
					Error: function(response) {
						$scope.Error = response.message;
					}
				});
				
				$scope.IsNewAccount = false;
				$scope.Swap = function(){
					$scope.NewAccount = !$scope.NewAccount;
				};
			}],
			link: {
				post: function ($scope, element, attrs) {
					if(!angular.isObject($scope.Authentication))
						$('.ui.basic.modal').modal({ closable: false, transition: 'fade up', blurring: true }).modal('show');
				}
			}
		};
}]).directive('architectureMessageQueue', ['Message', function(Message){
        return {
			restrict: 'A',
			replace: true,
			templateUrl: '/Modules/Base/Templates/MessageQueueTemplate.html',
			controller: ['$scope', function ($scope) {
				
				$scope.MessageService = Message;
				
				$scope.$watchCollection('MessageService.GetDisclaimer()', function (value) {
					$scope.Mensagens = value;
				});

			}]
		};
}]);