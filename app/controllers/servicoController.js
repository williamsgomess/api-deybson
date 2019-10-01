const Servico = require("../models/servicoModel")

exports.criarServico = async function(req, res){

	try{
		req.body.usuarioResponsavel = req.idUsuario
		var servico = await Servico.create(req.body)
		return res.status("201").json(servico)
	}catch(err){
		return res.status("400").json(err)
	}
}

exports.listarServicos = async function(req, res){

	try{
		var servicos = await Servico.find().populate("usuarioResponsavel")
		if(servicos == null)
			return res.status("200").json({info: "lista de serviços vazia"})
		return res.status("200").json(servicos)
	}catch(err){
		return res.status("400").json(err)
	}
}

exports.consultarServico = async function(req, res){

	try{
		var dados = req.params.dados
		var servico = await Servico.findById(dados).populate("usuarioResponsavel")
		if(servico == null)
			return res.status("200").json({info: "nenhum serviço encontrado com esse id"})
		return res.status("200").json(servico)
	}catch(err){
		return res.status("400").json(err)
	}
}

exports.alterarServico = async function(req, res){
	var dados = req.params.dados
	try{
		var servico = await Servico.findByIdAndUpdate(dados, req.body, {new: true})
		return res.status("200").json(servico)
	}catch(err){
		return res.status("400").json(err)
	}
}

exports.excluirServico = async function(req, res){
	var dados = req.params.dados
	try{
		await Servico.findByIdAndDelete(dados, function(erro){
			if(erro)
				return res.json(erro)
		})
		return res.status("200").json({info:" sucesso ao excluir serviço"})
	}catch(err){
		return res.status("400").json(err)
	}
}