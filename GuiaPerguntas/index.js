const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    function (req, res) {
        //  ESSA PARTE AINDA NÃO FUNCIONA
        var teste = req.body['descricao'];
        res.send('perguntar ' + teste);
    }
);

app.listen(1111);