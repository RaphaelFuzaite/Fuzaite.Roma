'use strict';
angular.module('Passageiro.Routes').config(['$stateProvider', function($stateProvider) {

    var GetTemplateUrl = 'Modules/Passageiro/Views/';
    
    function GetPassageiro($stateParams, PassageiroService) {
        return PassageiroService.get({
            PassageiroId: $stateParams.PassageiroId
        }).$promise;
    }
    
    GetPassageiro.$inject = ['$stateParams', 'PassageiroService'];
    
    function NewPassageiro(PassageiroService) {
        return new PassageiroService();
    }
    
    NewPassageiro.$inject = ['PassageiroService'];    

    $stateProvider
        .state('Passageiros', {
        abstract: true,
        url: '/Passageiros',
        template: '<ui-view/>'
    })
    .state('Passageiros.Lista', {
        url: '',
        templateUrl: GetTemplateUrl + 'HomePassageiroClientView.html',
        ncyBreadcrumb: {
            label: 'Passageiros'
        }
    })
    .state('Passageiros.Cadastrar', {
        url: '/Cadastrar',
        templateUrl: GetTemplateUrl + 'CadastroPassageiroClientView.html',
        resolve: {
          PassageiroDeferred: NewPassageiro
        },
        controller: 'CadastroPassageiroClientController',
        ncyBreadcrumb: {
            parent: 'Passageiros.Lista',
            label: 'Cadastrar'
        }
    })
    .state('Passageiros.Editar', {
        url: '/Editar/:PassageiroId',
        templateUrl: GetTemplateUrl + 'CadastroPassageiroClientView.html',
        controller: 'CadastroPassageiroClientController',
        resolve: {
          PassageiroDeferred: GetPassageiro
        },
        ncyBreadcrumb: {
            parent: 'Passageiros.Lista',
            label: 'Editar'
        }
    });
    
}]);