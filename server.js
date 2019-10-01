const express = require("express")
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
const cors = require("cors")

const app = express();
app.use(cors())
app.use(bodyParser.json({limit: '16mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '16mb', extended : true}));

const rotas = require("./app/routes/routes");

rotas(app);

app.listen(port)
console.log("rodando na porta 3000");