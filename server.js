const express = require('express')
const app = module.exports = express()
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

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


// Add routes
require("./routes");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//parse form field from html body
/*app.post('/', function (req, res) {
  res.render('index');
  console.log(req.body.city);
})*/
