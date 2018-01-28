const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')
var GameSession = require('./gamesession.js')
var UserSession = require('./usersession.js')



var MoveHistory = sequelize.define('MoveHistory', {
  move: Sequelize.STRING,
});

module.exports = MoveHistory;