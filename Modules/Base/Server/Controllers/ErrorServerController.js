'use strict';

var GetUniqueErrorMessage = function (err) {
    var output;

    try {
        var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' já existe!';

    } catch (ex) {
        output = 'Campo único já existe!';
    }

    return output;
};


exports.GetErrorResponse = function (statusCode, err) {
    
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = new GetUniqueErrorMessage(err);
                break;
            default:
                message = 'Algo deu errado no acesso aos dados!';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].name === 'ValidatorError') statusCode = 412;
            if (err.errors[errName].name === 'ValidationError') statusCode = 406; 
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    
    var title = '';
    
    switch (statusCode) {
        case 201: // CREATED
            title = 'Criado';
            break;
        case 202: // ACEPTED
            title = 'Salvo';
            break;
        case 400: // INVALID
            title = 'Erro na aplicação';
            break;
        case 404: // NOT FOUND
            title = 'Não encontrado';
            break;
        case 401: // UNAUTHORIZED
            title = 'Não autorizado';
            break;
        case 403: // FORBIDEN
            title = 'Acesso proibido';
            break;
        case 406: // UNACCEPTABLE
            title = 'Erro do validador';
            break;
        case 408: // REQUEST TIMEOUT
            title = 'Tempo de chamada excedido';
            break;
        case 412: // PRECONDITION FAILED
            title = 'Erro de validação';
            break;
        case 500: // SERVER ERROR
            title = 'Erro no servidor';
            break;
        case 501: // NOT IMPLEMENTED
            title = 'Não implementado';
            break;
        case 502: // UNAVAILABLE
            title = 'Indisponível';
            break;
        case 504: // GATEWAY TIMEOUT
            title = 'Tempo de resposta excedido';
            break;
        default:
            break;
    }
    
    return {
        statusCode: statusCode,
        data: {
            title: title,
            message: message
        }
    };
};