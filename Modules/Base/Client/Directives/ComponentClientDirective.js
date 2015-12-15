'use strict';

angular.module('Base').directive('componentModal', ['Modal', function(Modal) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/Modules/Base/Templates/ModalTemplate.html',
			controller: ['$scope', function ($scope) {				
				$scope.Modal = Modal;
			}]
		};
	}
])
.directive('componentModalContent', ['Modal', '$compile', function(Modal, $compile) {
		return {
			restrict: 'A',
			replace: true,
			link: function ($scope, element, attrs) {
				$scope.$watch('Modal.Conteudo', function (value) {
					element.append($compile(value)($scope));
				});	
			}
		};
	}
]);