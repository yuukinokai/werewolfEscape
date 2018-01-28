const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')
var GameSession = require('./gamesession.js')
var ActionHistory = require('./actionhistory.js')
var MoveHistory = require('./movehistory.js')


var UserSession = sequelize.define('GameSession', {
  usertoken: Sequelize.STRING,
  name: Sequelize.STRING,
  type: Sequelize.TINYINT,
  index: Sequelize.TINYINT,
});


module.exports = UserSession;