'use strict';

angular.module('Base').service('Message', ['$interval', function ($interval){
    
    var ItemMessage = function (data, messageClass) {
        var self = this;
        
        self.Class = messageClass;
        self.Titulo = data.title;
        self.Texto = data.message;
        self.Duracao = (_message.Itens.length > 0 ? _message.Itens[_message.Itens.length - 1].Duracao : 0) + 10;
        self.Visivel = true;
        self.Id = _message.Itens.length;
        self.Timer = function (item) {
            var timer = $interval(function() {
                --item.Duracao;
                if (item.Duracao < 1) {
                    $interval.cancel(timer);
                    item.Visivel = false;
                    //_message.DismissMessage(item.Id);
                }
            }, 1000);
        };
        self.Timer(self);
    };
    
    var _message = {
        Itens: [],
        ResetQueue: function () {
            this.Itens = [];
        },
        CompleteDisclaimer: function (statusCode, data) {
            switch (statusCode) {
                case 201: // CREATED
                case 202: // ACEPTED
                    this.Itens.push(new ItemMessage(data, _message.MessagingClass.Success));
                    break;
                case 400: // INVALID
                case 404: // NOT FOUND
                case 408: // REQUEST TIMEOUT
                    this.Itens.push(new ItemMessage(data, _message.MessagingClass.Warning));
                    break;
                case 401: // UNAUTHORIZED
                case 403: // FORBIDEN
                    this.Itens.push(new ItemMessage(data, _message.MessagingClass.Info));
                    break;
                case 500: // SERVER ERROR
                case 501: // NOT IMPLEMENTED
                case 502: // UNAVAILABLE
                case 504: // GATEWAY TIMEOUT
                    this.Itens.push(new ItemMessage(data, _message.MessagingClass.Error));
                    break;
                default:
                    this.ResetQueue();
                    break;
            }
        },
        GetDisclaimer: function () {
            if (this.Itens.every(function(t){ return t.Duracao < 1; })) {
                this.ResetQueue();
            }
            
            return this.Itens;
        },
        DismissMessage: function (index) {
            this.Itens.splice(index, 1);
        },
        MessagingClass: {
            Error:      'negative',
            Warning:    'warning',
            Info:       'info',
            Success:    'success'
        }
    };
    
    return _message;
    
}]);