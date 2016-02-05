'use strict';
(function(App){
    
    App.RegisterModule('Passageiro');
    App.RegisterModule('Passageiro.Services');
    App.RegisterModule('Passageiro.Routes', ['ui.router', 'Passageiro.Services']);
    
})(ApplicationConfiguration);