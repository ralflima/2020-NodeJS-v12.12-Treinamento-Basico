// Importar o express
var express = require('express');

// Criando variável para ter acesso as funcionalidades do Express
var app = express();

// Rota
app.get('/', function(req, res){
    res.write('Utilizando o Express');
    res.end();
})

// Servidor
app.listen(8080);