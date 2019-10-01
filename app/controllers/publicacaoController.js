var Publicacao = require("../models/publicacaoModel")
var Usuario = require("../models/usuarioModel")
var Orientacao = require("../models/orientacaoModel")

exports.criarPublicacao = async function(req, res){
	req.body.usuario = req.idUsuario
	try{
		var publicacao = await Publicacao.create(req.body)
		var publicacoesUsuario = await Usuario.findById(publicacao.usuario)
		await publicacoesUsuario.publicacoes.push(publicacao._id)
		await Usuario.findByIdAndUpdate(publicacao.usuario, {publicacoes: publicacoesUsuario.publicacoes})
		return res.status("201").json(publicacao)

	}catch(err){
		return res.status("400").json({erro: "Erro ao criar a publicação", err})
	}
}
exports.listarPublicacoes = async function(req, res){

	try{
		var publicacoes = await Publicacao.find().populate("usuario categoria interesses.usuario orientacoes.orientacao orientacoes.orientacao.autor")
		if(publicacoes == null)
			return res.status("200").json({info: "não há publicações para se listar"})
		return res.status("200").json(publicacoes)
	}catch(err){
		return res.status("400").json({erro: "erro ao listar publicações", err})
	}
}
exports.buscarPublicacao = async function(req, res){
	var dados = req.params.dados

	try{
		var publicacao = await Publicacao.findById(dados).populate("usuario categoria interesses orientacoes.orientacao orientacoes.orientacao.autor")
		if(publicacao == null)
			return res.status("200").json({info:"nenhuma publicação foi encontrada com os dados repassados"})
		return res.status("200").json(publicacao)
	}catch(err){
		return res.status("400").json({erro: "erro ao buscar publicação", err})
	}
}
exports.alterarPublicacao = async function(req, res){
	var dados = req.params.dados

	try{
		var publicacao = await Publicacao.findByIdAndUpdate(dados, req.body, {new: true})
		res.status("200").json(publicacao)

	}catch(err){
		return res.status("400").json({erro:" erro ao atualizar publicação", err})
	}
}
exports.excluirPublicacao = async function(req, res){
	var dados = req.params.dados

	try{
		const Orientacao = require("../models/orientacaoModel")
		var {orientacoes}= await Publicacao.findById(dados)
		await Promise.all(orientacoes.map(async (valor, index)=>{
			await Orientacao.findByIdAndDelete(orientacoes[index], function(erro){
			 	if(erro)
			 		return res.json(erro) 
			})
		}))
		await Publicacao.findByIdAndDelete(dados, function(erro){
			    if(erro)
				   return res.json(erro)
		    })
		return res.status("200").json({info:" sucesso ao excluir publicação"})
		
		
	}catch(err){
		return res.status("400").json({erro:" erro ao tentar excluir publicação", err})
	}
}
exports.interessePublicacao = async function(req, res){

	try{
		var dados = req.params.dados
		var idInteressado = {
		 usuario: req.idUsuario
		}
		var {interesses} = await Publicacao.findById(dados)
		interesses.push(idInteressado)
		var r = await Publicacao.findByIdAndUpdate(dados, {interesses: interesses}, {new: true})
		return res.status('200').json({info: "realzado com sucesso", r, i: interesses})
	}catch(erro){
		return res.status('400').json(erro)
	}
}