const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./database/pergunta'); //model

//database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//dizendo ao express que estou usando o ejs para desenhar o html
app.set('view engine', 'ejs');
app.use(express.static('public')); //paginas onde ficam os arquivos estaticos. mostra para o express onde estao os arquivos.

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());


app.get("/", function(req,res){
    res.render("index");
});

app.get("/perguntar", (req,res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res)=> {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(console.log("Formulario recebido, titulo: " + titulo + ", descricao: " + descricao));
});

app.listen(8080,()=>{console.log("app rodando")});