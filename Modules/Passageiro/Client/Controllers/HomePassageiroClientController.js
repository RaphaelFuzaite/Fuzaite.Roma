'use strict';

angular.module('Passageiro').controller('HomePassageiroClientController', ['$scope', '$http', 'GridService', 'NgTableParams', 
    function($scope, $http, GridService, NgTableParams){
        
        $scope.Grid = new GridService({
            Url: '/api/Passenger/List'
        });
        
    }
]);