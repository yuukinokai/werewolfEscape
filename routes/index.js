var express = require('express');
var app = require('../server.js');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/2', function(req, res, next) {
  res.render('index', { title: 'Express' });
});