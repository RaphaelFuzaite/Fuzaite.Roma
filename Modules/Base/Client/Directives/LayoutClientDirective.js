'use strict';

angular.module('Base').directive('layoutNavigationBar', ['Menu', function(Menu) {
		return {
			restrict: 'A',
			replace: true,
			scope: {},
			templateUrl: '/Modules/Base/Templates/NavigationBarTemplate.html',
			link: function($scope, elem, attr) {
				$scope.Menu = Menu.GetMenu();
				
				$scope.Size = function() {
					console.log("Nav");
					return Menu.GetMenuState() ? 'eight' : 'three';
				};
			}
		};
	}
]).directive('layoutFastAccess', ['Menu', function(Menu) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/Modules/Base/Templates/FastAccessTemplate.html',
			scope: {},
			link: function($scope, elem, attr) {
				$scope.Menu = Menu.GetMenu();	
				$scope.Size = function() {
				console.log("Fast");
					return Menu.GetMenuState() ? 'eight' : 'thirteen'; 
				};
			}
		};
	}
]).directive('layoutMainHeader', ['Menu', function(Menu) {
	return {
		restrict: 'A',
		replace: false,
		templateUrl: '/Modules/Base/Templates/MainHeaderTemplate.html',
		controller: ['$scope', function($scope){
			$scope.Menu = Menu.GetMenu();
			
			$scope.AlternarEstadoDoMenu = function (){
				$scope.Menu.ChangeMenuState();	
			};
		}]
	}
}]);