const express = require('express')
const app = module.exports = express()
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

const sequelize = new Sequelize('gamedb', null, null, {
  dialect: 'sqlite',

  // SQLite only
  storage: './db.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./routes");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//parse form field from html body
/*app.post('/', function (req, res) {
  res.render('index');
  console.log(req.body.city);
})*/


