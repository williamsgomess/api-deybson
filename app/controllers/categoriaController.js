const Categoria = require("../models/categoriaModel");

exports.cadastrarCategoria = async function(req, res){
	try{
		var { nome } = req.body;
		var categoria = await Categoria.findOne({nome})
		if(categoria)
			return res.status("400").json({erro: "Categoria ja cadastrada"});

		categoria = await Categoria.create(req.body)
		return res.status("201").json(categoria)
	}catch(err){
		return res.status("400").json({erro:" erro ao cadastrar categoria", err})
	}
}
exports.listarCategorias = async function(req, res){

	try{
		var categorias = await Categoria.find();
		return res.json(categorias)
	}catch(err){
			return res.json({erro:"erro ao litar categoria", err})
	}
}
exports.buscarCategoria = async function(req, res){

	var nome = req.params.dados
	var _id = req.params.dados

	try{
		var categoria = await Categoria.findOne({nome})
		if(categoria != null)
			return res.status("200").json(categoria)

		categoria = await Categoria.findOne({_id})
		if(categoria != null)
			return res.status("200").json(categoria)

		return res.status("200").json({info:" Não foi encontrada nenhuma categoria com esse nome"})
		
	}catch(err){
		res.status("400").json({erro:"Erro ao buscar categoria", err})
	}
}
exports.alterarCategoria = async function(req, res){
	var dados = req.params.dados

	try{
		var categoria = await Categoria.findByIdAndUpdate(dados, req.body, {new: true})
		res.status("200").json(categoria)

	}catch(err){
		return res.status("400").json({erro:" erro ao atualizar categoria", err})
	}
}
exports.excluirCategoria = async function(req, res){
	var dados = req.params.dados

	try{
		Categoria.findByIdAndDelete(dados, function(erro){
			if(erro)
				return res.json(erro)
		})
		return res.status("200").json({info:" sucesso ao excluir categoria"})
	}catch(err){
		return res.status("400").json({erro:" erro ao tentar excluir categoria", err})
	}
}
