var GameSession = require('./gamesession.js')
var UserSession = require('./usersession.js')
const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')


var CardHistory = sequelize.define('CardHistory', {
  color: Sequelize.TINYINT,
  effect: Sequelize.TINYINT,
  
});

module.exports = CardHistory;