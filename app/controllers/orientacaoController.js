const Orientacao = require("../models/orientacaoModel")
const Publicacao = require("../models/publicacaoModel")

exports.criarOrientacao = async function(req, res){
	req.body.autor = req.idUsuario
	try{
		var orientacao = await Orientacao.create(req.body)
		var {orientacoes} = await Publicacao.findById(orientacao.publicacao)
		var idOrientacao = {
			orientacao: orientacao._id
		}
		await orientacoes.push(idOrientacao)
		await Publicacao.findByIdAndUpdate(orientacao.publicacao, {orientacoes: orientacoes})
		return res.status("201").json(orientacao)
	}catch(err){
		return res.status("400").json({erro: "erro ao criar orientação", err})
	}
}
exports.listarOrientacoes = async function(req, res){

	try{
		var  orientacoes = await Orientacao.find().populate("autor publicacao servico")
		console.log(orientacoes)
		if(orientacoes == null)
			return res.status("200").json({info:"Não hã orientaçoes para se listar"})
		return res.status("200").json(orientacoes)
	}catch(err){
		res.status("400").json({erro: "erro ao lisart orientações", err})
	}
}
exports.buscarOrientacao = async function(req, res){
	var dados = req.params.dados

	try{
		var orientacao = await Orientacao.findById(dados).populate("autor publicacao servico")
		if(publicacao == null)
			return res.status("200").json({info:"nenhuma orientação foi encontrada com os dados repassados"})
		return res.status("200").json(publicacao)
	}catch(err){
		return res.status("400").json({erro: "erro ao buscar orientação", err})
	}
}
exports.alterarOrientacao = async function(req, res){
	var dados = req.params.dados

	try{
		var orientacao = await Orientacao.findByIdAndUpdate(dados, req.body, {new: true})
		res.status("200").json(orientacao)

	}catch(err){
		return res.status("400").json({erro:" erro ao atualizar orientação", err})
	}
}
exports.excluirOrientacao = async function(req, res){
	var dados = req.params.dados

	try{
		Orientacao.findByIdAndDelete(dados, function(erro){
			if(erro)
				return res.json(erro)
		})
		return res.status("200").json({info:" sucesso ao excluir orientacao"})
	}catch(err){
		return res.status("400").json({erro:" erro ao tentar excluir orientação", err})
	}
}