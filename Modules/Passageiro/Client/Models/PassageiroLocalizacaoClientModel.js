'use strict';

angular.module('Passageiro').factory('PassageiroLocalizacaoClientModel', function(){
    
    var LocationPassenger = function (data) {
      var self = this;
      
      if(angular.isObject(data)){
          
      }
      
      return self;  
    };
    
    LocationPassenger.prototype.GetRules = function() {
        return {
            endereco: {
                
            }
        }  
    };
    
    return LocationPassenger;
    
});