module.exports = function(app){
const usuarioController = require("../controllers/usuarioController");
const categoriaController = require("../controllers/categoriaController");
const publicacaoController = require("../controllers/publicacaoController");
const servicoController = require("../controllers/servicoController");
const orientacaoController = require("../controllers/orientacaoController");
const imagemController = require("../controllers/imagemController");



//ROTAS DE USUARIO
app.route("/usuarios")
	.post(usuarioController.cadastrarUsuario)
	.get(usuarioController.verificaoJwt, usuarioController.listarUsuarios)
	
app.route("/usuarios/:dados")
	.get(usuarioController.verificaoJwt, usuarioController.consultarUsuario)
	.put(usuarioController.verificaoJwt, usuarioController.alterarUsuario)
	.delete(usuarioController.verificaoJwt, usuarioController.excluirUsuario)

app.route("/usuarios/interesses/:dados")
	.put(usuarioController.verificaoJwt, publicacaoController.interessePublicacao)

app.route("/usuarios/acesso")
	.post(usuarioController.login)


// ROTAS DE CATEGORIA
app.route("/categorias")
	.post(usuarioController.verificaoJwt, categoriaController.cadastrarCategoria)
	.get(usuarioController.verificaoJwt, categoriaController.listarCategorias)
	
app.route("/categorias/:dados")
	.get(usuarioController.verificaoJwt, categoriaController.buscarCategoria)
	.put(usuarioController.verificaoJwt, categoriaController.alterarCategoria)
	.delete(usuarioController.verificaoJwt, categoriaController.excluirCategoria)

//ROTAS DE PUBLICAÇÃO
app.route("/publicacoes")
	.post(usuarioController.verificaoJwt, publicacaoController.criarPublicacao)
	.get(usuarioController.verificaoJwt, publicacaoController.listarPublicacoes)
	
app.route("/publicacoes/:dados")
	.get(usuarioController.verificaoJwt, publicacaoController.buscarPublicacao)
	.put(usuarioController.verificaoJwt, publicacaoController.alterarPublicacao)
	.delete(usuarioController.verificaoJwt, publicacaoController.excluirPublicacao)

//SERVICOS
app.route("/servicos")
	.get(usuarioController.verificaoJwt, servicoController.listarServicos)
	.post(usuarioController.verificaoJwt, servicoController.criarServico)
app.route("/servicos/:dados")
	.get(usuarioController.verificaoJwt, servicoController.consultarServico)
	.put(usuarioController.verificaoJwt, servicoController.alterarServico)
	.delete(usuarioController.verificaoJwt, servicoController.excluirServico)

//ORIENTAÇÕES
app.route("/orientacoes")
	.get(usuarioController.verificaoJwt, orientacaoController.listarOrientacoes)
	.post(usuarioController.verificaoJwt, orientacaoController.criarOrientacao)
app.route("/orientacoes/:dados")
	.get(usuarioController.verificaoJwt, orientacaoController.buscarOrientacao)
	.put(usuarioController.verificaoJwt, orientacaoController.alterarOrientacao)
	.delete(usuarioController.verificaoJwt, orientacaoController.excluirOrientacao)

//GERAR BASE64
app.route("/base64")
	.post(imagemController.multer.single("img"), imagemController.gerarBase64)
//apenas teste
app.route("/")
	.get(usuarioController.verificaoJwt, function(req, res){
		res.send({id: req.idUsuario, tiposuario: req.tipoUsuario})
	})

app.route("/teste")
	.get(function(req, res){
		return res.send("Api funcionando remotamente")
	})
/*app.route("/profissional")
	.post(profissionalController.cadastrarProfissional)
	.get(autenticacaoController.verificaoJwt, profissionalController.listarProfissionais)
	

app.route("/administrador")
	.get(function(req, res){
		res.send("pagina do administrador")
	})
*/
}
