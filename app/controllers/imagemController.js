const multer = require('multer')
const sharp = require('sharp')

exports.multer = multer({storage : multer.memoryStorage()})

async function sharpCode(img, w, h){
	var imgRedimensionada = await sharp(img).resize(w, h).toBuffer()
	var base64 = await imgRedimensionada.toString('base64')
	return base64;
}
exports.gerarBase64 = async function(req, res ){
	try{ 
		var w = parseInt(req.body.w) 
		var h = parseInt(req.body.h)
		var base = await sharpCode(req.file.buffer, w, h)
	return res.send(await {code: `data:image/jpg;base64,${base}`})
	}catch(err){
		return res.send({err})
	}
	
}