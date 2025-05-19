const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/pergunta'); //model
const Resposta = require('./database/Resposta');

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
    Pergunta.findAll({ raw: true, order: [ //SELECT * FROM pergunta
        ['id', 'DESC'] //decrescente, asc = crescente
    ] }).then(perguntas => { 
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        });
    }); 
    
});

app.get("/perguntar", (req,res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res)=> {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ //INSERT INTO pergunta VALUES ...
        titulo: titulo,
        descricao: descricao
    }).then(() => { //quando a pergunta for salva, fazer algo.
        res.redirect("/")
    });
});

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({ //SELECT * FROM pergunta WHERE id = x
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //encontrada
            Resposta.findAll({
                where: {perguntaID: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas
                });
            });
        }else{ // nao encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo;
    var perguntaID = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(() => {
        res.redirect("/pergunta/" + perguntaID);
    });
});

app.listen(8080,()=>{console.log("app rodando")});