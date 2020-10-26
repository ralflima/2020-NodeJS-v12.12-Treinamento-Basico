// Importando o Express e o Express-handlebars
var express = require('express');
var exphbs  = require('express-handlebars');
 
// App
var app = express();
 
// Template
app.engine('handlebars', exphbs({defaultLayout : 'principal'}));
app.set('view engine', 'handlebars');
 
// Rotas
app.get('/', function (req, res) {

    let pessoas = [
        {"nome":"Ralf", "idade":30},
        {"nome":"Mayra", "idade":31},
        {"nome":"Henrique", "idade":28}
    ]

    res.render('inicio', {gostandoDeNode:false, dados:pessoas});
});

app.get('/sobre', function (req, res) {
    res.render('sobre');
});
 
// Servidor
app.listen(8080);