'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
    
var validateArrayLength = function(property) {
	return property.length > 0;
};

var validateMajority = function(property) {
    var birthday = new Date(property);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getFullYear() - 1970) >= 18;
};
    
var PassageiroSchema = new Schema({
	PrimeiroNome: {
		type: String,
		trim: true,
		default: '',
		required: 'Por favor qual é o primeiro nome do passageiro?'
	},
	UltimoNome: {
		type: String,
		trim: true,
		default: '',
		required: 'Nos diga o último nome do passageiro'
	},
	NomeCompleto: {
		type: String,
		trim: true
	},
    Responsaveis: [{
        _id: { type: Schema.ObjectId },
        PrimeiroNome: { type: String, required: 'Informe o primeiro nome do responsável' },
        UltimoNome: { type: String, required: 'Informe o último nome do responsável' },
        NomeDeUsuario: { type: String },
        GrauDeParentesco: { type: String },
        DataDeNascimento: { type: Date, validate: [validateMajority, 'O responsável deve ser maior de idade'] },
        ResponsavelFinanceiro: { type: Boolean },
        Genero: { type: String, enum: ['Masculino', 'Feminino'] },
        DocumentoDeIdentificacao: { type: String, required: 'Informe o tipo de documento de identificação' },
        NumeroDoDocumento: { type: String, required: 'Informe o número do documento de identificação selecionado'}
    }],
    Condutor: {
        type: Schema.ObjectId,
        ref: 'Usuario'
    },
    DataDeNascimento: {
        type: Date,
        required: 'Qual é a data de nascimento?',
    },
    Genero: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        trim: true,
		required: 'Qual é o gênero do passageiro?',  
    },
    DataDeInscricao: {
		type: Date,
		default: Date.now  
    },
    InstituicaoDeEnsino: [{
        _id: { type: Schema.ObjectId },
        Nome: { type: String },
        Endereco: {
            CEP: { type: String },
            Rua: { type: String },
            Numero: { type: Number },
            Complemento: { type: String },
            Bairro: { type: String },
            Cidade: { type: String },
            UF: { type: String },
            Responsavel: { type: String }
         },
         Telefone: [{
            Numero: { type: Number },
            Prefixo: { type: Number },
            Operadora: { type: String },
            TipoDeTelefone: { type: String, enum: ['Residencial', 'Celular', 'Comercial', 'Outros'] },
            Responsavel: { type: String }
         }],
         Diretor: { type: String },
         Professor: [{
             Nome: { type: String }
         }],
         Sala: { type: String },
         Serie: { type: String },
         Turma: { type: String },
         AnoLetivo: { type: Number },
        HorarioDeEntrada: { type: String },
        HorarioDeSaida: { type: String },
    }],
    Endereco: [{
        CEP: { type: String },
        Rua: { type: String },
        Numero: { type: Number },
        Complemento: { type: String },
        Bairro: { type: String },
        Cidade: { type: String },
        UF: { type: String },
        Responsavel: { type: String },
        Principal: { type: Boolean }
    }],
    Telefone: [{
        Numero: { type: Number },
        Prefixo: { type: Number },
        Operadora: { type: String },
        TipoDeTelefone: { type: String, enum: ['Residencial', 'Celular', 'Comercial', 'Outros'] },
        Responsavel: { type: String }
    }],
    ComoNosConheceu: {
        type: String,
        enum: ['Redes Sociais', 'Instituição de Ensino', 'Anúncio', 'Colegas', 'Folhetos']
    }
    
});

mongoose.model('Passageiro', PassageiroSchema);