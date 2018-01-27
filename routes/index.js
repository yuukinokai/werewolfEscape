var express = require('express');
var app = require('../server.js');

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

app.get('/map', function(req, res, next) {
  res.render('map');
});

app.get('/create', function(req, res, next) {
  res.render('create');
});
