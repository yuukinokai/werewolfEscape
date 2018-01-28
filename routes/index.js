var express = require('express');
var app = require('../server.js');
var GameController = require('../controllers/GameController.js');
var ActionHistoryController = require('../controllers/ActionHistoryController.js');

app.post('/create', GameController.createGame);

app.get('/create', GameController.createGame2);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/2', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
app.get('/get-status', GameController.getGameStatus);
app.get('/game', GameController.getGame);


app.post('/action/drawcard', ActionHistoryController.drawCard);
app.post('/action/attack', ActionHistoryController.attack);
app.post('/action/move', ActionHistoryController.move);
app.post('/action/silence', ActionHistoryController.silence);
app.post('/action/startgame', ActionHistoryController.startgame);
app.post('/action/endturn', ActionHistoryController.endturn);
app.get('/get-actions', ActionHistoryController.getActions);
