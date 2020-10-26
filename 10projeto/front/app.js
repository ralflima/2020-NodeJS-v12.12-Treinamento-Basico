// Importar módulos
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

// App
var app = express();

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Template
app.engine('handlebars', expressHandlebars({defaultLayout : 'principal'}));
app.set('view engine', 'handlebars');

// Especificar arquivos estáticos
app.use(express.static(__dirname + '/publico'));
 
// Rotas
app.get('/', function(req, res){
    fetch('http://localhost:3000/clientes', {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('inicio', {dados:resposta}))
});

app.post('/cadastrar', function(req, res){
    let nome = req.body.nome;
    let idade = req.body.idade;

    let dados = {'nome':nome, 'idade':idade};

    fetch('http://localhost:3000/clientes', {
        method:'POST',
        body:JSON.stringify(dados),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));
});

app.get('/selecionar/:id', function(req, res){
    let id = req.params.id;

    fetch('http://localhost:3000/clientes/'+id, {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('selecionar', {dados:resposta}))
});

app.post('/editar', function(req, res){
    let nome = req.body.nome;
    let idade = req.body.idade;
    let id = req.body.id;

    fetch('http://localhost:3000/clientes/'+id, {
        method:'PUT',
        body:JSON.stringify({'nome':nome, 'idade':idade}),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));
});

app.get('/remover/:id', function(req, res){
    let id = req.params.id;

    fetch('http://localhost:3000/clientes/'+id, {method:'DELETE'})
    .then(res.redirect('/'));
});

// Servidor
app.listen(8080);