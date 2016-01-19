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
        
        $scope.FormPassageirosDadosPessoais = new Form({
            Name: 'PassengersPersonalDataFormEdit',
            Model: Passageiro,
            Url: '/api/Passenger/Save',
            //Method: 'PUT',
            EnableAutoSaveMethod: true,
            Success: function(response) {
                Passageiro._id = response._id;
                console.log(response);
            },
            Error: function(response) {
                console.log(response);
            }
        });
        
        $scope.FormPassageirosResponsaveis = new Form({
            Name: 'PassengersResponsableFormEdit',
            Model: Passageiro,
            Url: '/api/Passenger/Save',
            //Method: 'POST',
            EnableAutoSaveMethod: true,
            Success: function(response) {
                $location.path('/Passageiros');
            },
            Error: function(response) {
                console.log(response);
            }
        });        
	}
]);