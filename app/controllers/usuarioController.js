const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const secret = require("../../config/jsonWebToken/autorizacaoSecret");
const bcrypt = require("bcrypt");
const imagemController = require("../controllers/imagemController");


	function gerarToken(parametros={}){
		var token = jwt.sign(parametros ,secret.secret, {expiresIn :86400})
		return token;
	}

exports.cadastrarUsuario = async function(req, res){

	var { email } = req.body;
	try{

		var usuario = await Usuario.findOne({email})
		if(usuario)
			return res.status("400").json({info: "ja existe usuario utilizando esse email cadastrado com esse email"});

		var usuario = await Usuario.create(req.body)
		usuario.senha = undefined;

		if(usuario)
			return res.status("201").json({usuario, 
										   token: gerarToken({id: usuario.id,
										   					 tipo: usuario.tipoUsuario})
										  })
	}catch(err){
		return res.status("400").json({erro: "Erro ao cadastra usuario", err})
	}
}
exports.login = async function(req, res){
	var{email, senha } =  req.body;
		try{ 
			var usuario = await Usuario.findOne({email})
			if(!usuario)
				return res.status("400").json({info: "email não encontrado"});

			if(! await bcrypt.compare(senha, usuario.senha )){ 
			var teste = true;
			teste= await bcrypt.compare(senha, usuario.senha )
			console.log(teste)
			return res.status("400").json({info: "senha incorreta"});}
			
			usuario.senha = undefined
			return res.status("200").json(await {usuario,
										   token : gerarToken({id:usuario.id,
										   					   tipo:usuario.tipoUsuario})
										});
		}catch(err){
		return res.status("400").json({erro :"erro ao tentar logar", err})
	}
}
exports.verificaoJwt = function(req, res, next){
	const autorizacaoheadr = req.headers.authorization;
	if(!autorizacaoheadr)
		return res.status("401").json({erro:"não autorizado:  token não repassado"})

	var partes = autorizacaoheadr.split(" ");
	var[bearer, token] = partes;

	 jwt.verify(token, secret.secret, function(err, decoded){
	 	if(err) 
	 		return res.status("401").json({erro:"não autorizado: token invalido"})
	 	req.idUsuario = decoded.id
	    req.tipoUsuario = decoded.tipo
	
	 })
	  return next();
}
exports.listarUsuarios = async function(req, res){
	try{
		var lista = await Usuario.find();
		if(lista == null)
			return res.status("200").json({info : ("nenhum usuario encontrado")})
		lista.senha = undefined;
		return res.status("200").json(await lista)

	}catch(err){
		return res.status("400").json({erro : "erro ao listar usuarios", err})
	}
}
exports.consultarUsuario = async function(req, res){
	try{
		var dados = req.params.dados;
		var usuario = await Usuario.findById(dados)
		console.log(usuario)
		if(usuario== null)
			return res.status("400").json({info: "dados do usuario solicitado não existem, ou "+
				"usuario pode ter sido excluido"})
		return res.status("200").json(usuario)

	}catch(err){
		return res.status("400").json({erro:"erro ao consultar usuario", err})
	}
}
exports.alterarUsuario = async function(req, res){
	try{
		var idUsuario = req.params.dados
		var usuario = await Usuario.findByIdAndUpdate(idUsuario, req.body, {new : true})
		return res.status("200").json(usuario)
	}catch(err){
		return res.status("400").json({erro :"erro ao alterar usuario", err})

	}
}
exports.excluirUsuario = async function(req, res){
	try{
		var idUsuario = req.params.dados
		console.log(idUsuario)
		var {publicacoes} = await Usuario.findById(idUsuario)
		await publicacoes.map((valor, index)=>
			excluirpublicacoes(publicacoes[index]))
		
		Usuario.findByIdAndRemove(idUsuario, function(err){
			if(err)
				return res.json(err)
		})
		return res.status("200").json({info: "excluido com sucesso"})
	}catch(err){
		return res.status("400").json({erro: "Erro ao excluir usuario", err})
	}
}
async function excluirpublicacoes(publicacoes){
	      const Publicacao = require("../models/publicacaoModel")
		  const Orientacao = require("../models/orientacaoModel")
		  var {orientacoes} = await Publicacao.findById(publicacoes)
		  await Promise.all(orientacoes.map(async (valor, index)=>{
			await Orientacao.findByIdAndDelete(orientacoes[index], function(erro){
			 	if(erro)
			 		return res.json(erro) 
			})
		  }))
		  await Publicacao.findByIdAndDelete(publicacoes, function(erro){
			    if(erro)
				   return res.json(erro)
		    })
}