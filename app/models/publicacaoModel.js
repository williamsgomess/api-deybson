const mongoose = require("../../config/database/conexao");
const Schema = mongoose.Schema;

var publicacaoSchema = new Schema({

	titulo: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	data: {
		type: Date,
		default: Date.now
	},
	categoria: {
		type:mongoose.Schema.Types.ObjectId,
		ref: "Categoria"
	},
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
		required: true
	},
	local: {
		type: String
	},
	modalidade: {
		type:[{
			type: String,
			enum: ["negociação", "doação",  "serviço"],
			
		}],
		default: ["doação"],
		required: true
	},
	anexos: {
		type:[{
			type: String
		}]
	},
	interesses: {
		type:[{
			usuario: {
				type: mongoose.Schema.Types.ObjectId,
			    ref: "Usuario"
			},
			data: {
				type: Date,
				default: Date.now
			}
			
		}]
		
	},
	orientacoes: {
		type: [{
			orientacao: {
				type: mongoose.Schema.Types.ObjectId,
			    ref: "Orientacao"
			},
			data: {
				type: Date,
				default: Date.now
			}
		}]

	}

});
 var publicacao = mongoose.model("Publicacao", publicacaoSchema);
 module.exports = publicacao;