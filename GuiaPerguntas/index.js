const express = require('express');
const app = express();

// USANDO EJS COMO VIEW ENGINE NO LUGAR DE HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get(
    '/',
    function (req, res) {
        var nome = 'Andri';
        var lang = 'JS';
        var exibirMsg = false;
        var produtos = [
            {nome: 'Doritos', preco: 3.14},
            {nome: 'Coca-cola', preco: 5},
            {nome: 'Leite', preco: 1.45}
        ];

        res.render(
            'index.ejs', 
            {
                nome, 
                lang,
                exibirMsg,
                produtos
            }
        );
    }
);

app.listen(1212);