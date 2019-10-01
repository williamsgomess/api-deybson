const mongoose = require("../../config/database/conexao")
const Schema = mongoose.Schema

const OrientacaoSchema = new Schema({

	orientacao: {
		type: String,
		required: true
	},
	autor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
		required: true
	},
	publicacao: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Publicacao",
		required: true
	},
	servico: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Servico",
	}
})
const orientacao = mongoose.model("Orientacao", OrientacaoSchema)

module.exports = orientacao