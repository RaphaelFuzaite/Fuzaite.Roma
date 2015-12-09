'use strict';

angular.module('Base').run(function($timeout) {
	$timeout(function() {
		ApplicationConfiguration.VendorsInitializer.Form.Element();
		ApplicationConfiguration.VendorsInitializer.Layout.Element();
	},1000);
}).controller('BaseController', ['$scope',
	function($scope) {
		$scope.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
	}
]);