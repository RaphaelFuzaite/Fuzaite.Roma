'use strict';

(function () {
    angular.module('Passageiro.Services').factory('PassageiroService', ['$resource', function($resource) {
            
        return $resource('api/Passageiros/:PassageiroId', {
            PassageiroId: '@_id'        
        }, {
            update: {
                method: 'PUT'
            }
        });
        
    }]);
})();