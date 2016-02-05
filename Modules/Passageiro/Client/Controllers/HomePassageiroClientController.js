'use strict';

angular.module('Passageiro').controller('HomePassageiroClientController', ['$scope', 'GridService', 
    function($scope, GridService){
        
        $scope.Grid = new GridService({
            Url: '/api/Passageiros'
        });
        
    }
]);