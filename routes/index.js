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

app.get('/map-1', function(req, res, next) {
  res.render('map-1');
});

app.get('/map-2', function(req, res, next) {
  res.render('map-2');
});

app.get('/map-3', function(req, res, next) {
  res.render('map-3');
});

app.get('/create', function(req, res, next) {
  res.render('create');
});
