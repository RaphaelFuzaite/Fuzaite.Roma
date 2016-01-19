'use strict';

angular.module('Passageiro').factory('PassageiroClientModel', ['PassageiroResponsavelClientModel', function(PassageiroResponsavel) {
   
   var Passenger = function (data) {
       var self = this;
       
       if(angular.isObject(data)) {
           self._Id = data._Id;
           self.PrimeiroNome = data.PrimeiroNome;
           self.UltimoNome = data.UltimoNome;
           self.DataDeNascimento = data.DataDeNascimento;
           self.Genero = data.Genero;
           self.ComoNosConheceu = data.ComoNosConheceu;
           self.DataDeInscricao = data.DataDeInscricao;
       }
       
       return self;
   };
   
   Passenger.prototype.GetRules = function () {
        return {
            primeiroNome: {
                identifier: 'PrimeiroNome',
                rules: [{
                    type: 'empty',
                    prompt: 'Campo obrigatório'
                }]
            },
            ultimoNome: {
                identifier: 'UltimoNome',
                rules: [{
                    type: 'empty',
                    prompt: 'Campo obrigatório'
                }]
            },
            dataDeNascimento: {
				identifier: 'DataDeNascimento',
				rules: [{
					type: 'empty',
					prompt: 'Campo obrigatório'
				}]
			},
            comoNosConheceu: {
                identifier: 'ComoNosConheceu',
                rules: [{
                    type: 'empty',
                    prompt: 'Selecione uma opção'   
                }]
            },
            genero: {
				identifier: 'Genero',
				rules: [{
					type: 'checked',
					prompt: 'Selecione uma opção'
				}]
            }
        };
   };
   
   return Passenger;
    
}]);