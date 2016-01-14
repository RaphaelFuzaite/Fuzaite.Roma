'use strict';

angular.module('Passageiro').controller('CadastroPassageiroClientController', ['$scope','Form', '$location', 'PassageiroClientModel', 
	function($scope, Form, $location, PassageiroClientModel) {
		$scope.Sections = {
            0: true,
            1: false,
            2: false,
            3: false
        };
        
        $scope.ChangeSection = function(sectionName) {
            for(var property in $scope.Sections){
                if($scope.Sections.hasOwnProperty(property))
                {
                    $scope.Sections[property] = property === sectionName;
                }
            }
        };
        
        var Passageiro = new PassageiroClientModel();
        
        $scope.FormPassageiros = new Form({
            Name: 'PassengersFormEdit',
            Model: Passageiro,
            Url: '/api/Passengers/Save',
            Method: 'PUT',
            Success: function(response) {
                $location.path('/Passageiros');
            },
            Error: function(response) {
                $scope.Error = response.message;
            }
        });
	}
]);