var express = require('express');
var app = require('../server.js');
var GameController = require('../controllers/GameController.js');

app.post('/create', GameController.createGame);

app.get('/create', GameController.createGame2);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/2', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/game', function(req, res, next) {
  res.render('game');
});

app.get('/map-1', function(req, res, next) {
  res.render('map-1');
});

app.get('/map-2', function(req, res, next) {
  res.render('map-2');
});

app.get('/map-3', function(req, res, next) {
  res.render('map-3');
});



app.post('/join', GameController.joinGame);

app.get('/start-game', GameController.startGame);

app.get('/get-players', GameController.getPlayers);
