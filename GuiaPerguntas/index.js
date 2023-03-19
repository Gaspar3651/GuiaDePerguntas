const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./dataBase/dataBase');
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
        res.render('index.ejs');
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
        res.send('Titulo: ' + bodyParametros.titulo+ ' <br> <br> Descrição: ' + bodyParametros.descricao);
    }
);

app.listen(1111);