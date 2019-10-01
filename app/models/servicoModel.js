const mongoose = require("../../config/database/conexao")
const Schema = mongoose.Schema

var servicoSchema = new Schema({
	titulo: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	usuarioResponsavel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
		required: true
	},
	avaliacoes: {
		type: [{
			avaliacao: {
				type: String,
				required: true
			},
			usuario: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Usuario",
				required: true
			}
		}]
	}
})
const servico = mongoose.model("Servico", servicoSchema)

module.exports = servico