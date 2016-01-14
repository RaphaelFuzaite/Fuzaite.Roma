'use strict';

angular.module('Passageiro').factory('PassageiroResponsavelClientModel', function(){
   
   var ResponsiblePassenger = function (data) {
       var self = this;
       
       if(angular.isObject(data)) {
           self._Id = data._Id;
           self.PrimeiroNome = data.PrimeiroNome;
           self.UltimoNome = data.UltimoNome;
           self.NomeDeUsuario = data.NomeDeUsuario;
           self.GrauDeParentesco = data.GrauDeParentesco;
           self.ResponsavelFinanceiro = data.ResponsavelFinanceiro;
           self.DataDeNascimento = data.DataDeNascimento;
           self.Genero = data.Genero;
       }
       
       return self;
   };
   
    ResponsiblePassenger.prototype.GetRules = function () {
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
            grauDeParentesco: {
				identifier: 'GrauDeParentesco',
				rules: [{
					type: 'empty',
					prompt: 'Selecione uma opção'
				}]
			},
            responsavelFinanceiro: {
				identifier: 'ResponsavelFinanceiro'
			},
            dataDeNascimento: {
				identifier: 'DataDeNascimento',
				rules: [{
					type: 'empty',
					prompt: 'Campo obrigatório'
				},{
					type: 'date',
					prompt: 'Informe uma data válida'
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
   
    return ResponsiblePassenger;
    
});