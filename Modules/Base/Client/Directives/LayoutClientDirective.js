'use strict';

angular.module('Base').directive('layoutNavigationBar', [function() {
		return {
			restrict: 'A',
			replace: false,
			templateUrl: '/Modules/Base/Templates/NavigationBarTemplate.html',
			controller: ['$scope',  function ($scope) {
				
			}]
		};
	}
]).directive('layoutFastAccess', [function() {
		return {
			restrict: 'A',
			replace: false,
			templateUrl: '/Modules/Base/Templates/FastAccessTemplate.html',
			controller: ['$scope',  function ($scope) {
				
			}]
		};
	}
]);