const bcrypt = require("bcrypt")
const mongoose = require("../../config/database/conexao");

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	 nome :{
	 	type: String,
	 	required: true,
	 },
	 sexo:{
	 	type:[{
	 		type: String,
	 		enum :["F", "M"] }],
	 	required: true,
	 	default: ["M"]
	 },
	 nascimento:{
	 	type: Date,
	 	required: true,
	 	default: Date.now
	 },
	 endereco:{
	 	type: [{
			rua: {
				type: String,
				required: true
			},
			n: {
				type: String,
				required: true
			},
			logradouro: {
				type: String,
				requ: true
			},
			bairro: {
				type: String,
				required: true
			},
			cidade: {
				type: String,
				required: true
			},
			estado: {
				type: String, 
				required: true
			}

		}],
		required: true
	 },
	 telefone:{
	 	type: [{
	 		ddd: {
	 			type: Number,
	 			required: true
	 		},
	 		numero: {
	 			type: Number,
	 			require: true
	 		}

	 	}]
	 },
	 email:{
	 	type: String,
	 	required: true,
	 	unique: true,
	 	lowercase: true
	 },
	 senha: {
	 	type: String,
	 	required: true
	 },
	 imgPerfil: {
	 	type: String
	 }, 
	 publicacoes: {
	 	type: [{
	 		type: mongoose.Schema.Types.ObjectId,
	 		ref: "Publicacao"
	 	}]
	 },
	 tipoUsuario: {
	 	type:[{
	 		type: String,
	 		enum: ["comum", "profissional","administrador"],
	 		
	 	}],
	 	default: ["comum"],
	 	required: true
	 },
	 infoProfissional:{
	 	type: {
	 		especialidade: {
	 			type: String
			},
			cnpj:{
	 			type: String
			},
	 		areaAtuacao:{
	 			type:{
	 				nome: {
	 					type: String,
	 					required: true
	 				},
	 				descricao: {
	 					type: String,
	 					required: true
	 				}
	 			}
	 		}

	 	}
	 }

})
usuarioSchema.pre("save", async function(next){
	var hash = await bcrypt.hash(this.senha, 10);
	this.senha = hash;
	next();
})
 var usuario = mongoose.model("Usuario", usuarioSchema);

 module.exports = usuario;

