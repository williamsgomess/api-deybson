const mongoose = require("../../config/database/conexao");
const Schema = mongoose.Schema;

var categoriaSchema = new Schema({
	nome:{
		type: String, 
		required: true,
		unique: true
	},
	descricao:{
		type: String,
		required: true
	}
})
var categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = categoria;
