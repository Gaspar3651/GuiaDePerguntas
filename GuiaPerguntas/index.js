const express = require('express');
const app = express();

// USANDO EJS COMO VIEW ENGINE NO LUGAR DE HTML
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get(
    '/',
    function (req, res) {
        res.render('index.ejs');
    }
);

app.listen(1111);