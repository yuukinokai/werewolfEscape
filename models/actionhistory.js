var GameSession = require('./gamesession.js')
var UserSession = require('./usersession.js')
const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')


var ActionHistory = sequelize.define('ActionHistory', {
  action: Sequelize.STRING,
});

module.exports = ActionHistory;