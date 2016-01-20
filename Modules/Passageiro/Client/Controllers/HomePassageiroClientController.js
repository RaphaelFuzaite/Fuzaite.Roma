'use strict';

angular.module('Passageiro').controller('HomePassageiroClientController', ['$scope', '$http', 'GridService', 'NgTableParams', 
    function($scope, $http, GridService, NgTableParams){
        
        /*$scope.Grid = new GridService({
            Url: '/api/Passenger/List'
        });*/
           
        
        $scope.TableParams = new NgTableParams();
        $scope.TableParams.settings({ 
            data: [
                {name: 'Moroni', age: 50},
                {name: 'Isla', age: 59}
            ]
        });
        
        console.log($scope.TableParams);
        $scope.TableParams.reload();
    }
]);