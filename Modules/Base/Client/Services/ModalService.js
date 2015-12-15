'use strict';

angular.module('Base').service('Modal', [function () {
    
    function ClassDefinitions(key, hasIcon) {
        var classes = hasIcon ? 'labeled icon ' : '';
        switch (key) {
            case 'negativo':
                classes += 'red';
                break;
            case 'positivo':
                classes += 'teal';
                break;
            case 'neutro':
                classes += 'grey';
                break;
            case 'padrao':
                classes += 'blue';
                break;                
            default:
                break;
        }
        return classes;
    }
    
    function SizeDefinitions (key) {
        var size = '';
        switch (key) {
            case 'P':
                size = 'small';
                break;
            case 'G':
                size = 'large';
                break;
            case 'F':
                size = 'fullscreen';
                break;   
            default:
                break;
        }
        return size;
    }
    
    function BindAction (actions) {
        return actions.map(function (t,i) {
           return {
               Classes: ClassDefinitions(t.Chave, t.Icone),
               Icone:   t.Icone,
               Texto:   t.Texto,
               Click:   t.Click 
           };
        });
    }

    var _modal = {
        Titulo:      '',
        Conteudo:    '',
        Tamanho:     '',
        Acoes:       [],
        SetModalContent: function (data) {
            _modal.Titulo    = data.Title;
            _modal.Conteudo  = data.Content;
            _modal.Tamanho   = SizeDefinitions(data.Size);
            return _modal;
        },
        SetModalActions: function (actions) {
            _modal.Acoes     = BindAction(actions);
            return _modal;
        }
    };
    
    return _modal;
		
}]);