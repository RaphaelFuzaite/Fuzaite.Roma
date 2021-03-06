'use strict';

angular.module('Passageiro').controller('CadastroPassageiroClientController', ['$scope','Form', '$location', 'PassageiroDeferred' ,'PassageiroClientModel', 
	function($scope, Form, $location, PassageiroRouter, PassageiroClientModel) {
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
            Url: '/api/Passageiros',
            //Method: 'POST',
            EnableAutoSaveMethod: true,
            Success: function(response) {
                Passageiro._id = response._id;
            },
            Error: function(response) {
            }
        });
        
        $scope.FormPassageirosResponsaveis = new Form({
            Name: 'PassengersResponsableFormEdit',
            Model: Passageiro,
            Url: '/api/Passageiros',
            //Method: 'PUT',
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