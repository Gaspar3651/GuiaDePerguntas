const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./dataBase/dataBase');
const Pergunta = require('./dataBase/Pergunta');

// DATA BASE
connection.authenticate().then(() =>{
    console.log('Conexão feita com o banco de dados!');
}).catch((msgErro) =>{
    console.log('ERROR: '+ msgErro);
});

// USANDO EJS COMO VIEW ENGINE NO LUGAR DE HTML
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROTAS
app.get(
    '/',
    function (req, res) {
        Pergunta.findAll(
            {
                raw: true,
                order:[
                    ['createdAt', 'DESC']
                ]
            }).then(perguntas =>{
                res.render('index.ejs',
                    {
                        perguntas: perguntas
                    }
            );
        });
        
    }
);


app.get(
    '/perguntar',
    function (req, res) {
        res.render('perguntar.ejs');
    }
);


app.post(
    '/salvarPergunta',
    (req, res) => {
        var bodyParametros = req.body;

        Pergunta.create({
            titulo: bodyParametros.titulo,
            descricao: bodyParametros.descricao
        }).then(() => {
            res.redirect('/');
        });
    }
);

app.get(
    '/pergunta/:id',
    function (req, res) {
        var id = req.params.id;
        Pergunta.findOne({
            where: {
                id: id
            }
        }).then(result =>{
            if (result != undefined) {  // PERGUNTA ENCONTRADA
                res.render('pergunta.ejs',{
                    pergunta: result
                });
            }else{  // PERGUNTA NÃO ENCONTRADA
                res.redirect('/');
            }
        });
    }
);

app.listen(1111);