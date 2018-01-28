var UserSession = require('./usersession.js')
const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')


var GameSession = sequelize.define('GameSession', {
  name: Sequelize.STRING,
  game_id: Sequelize.STRING,
  game_status: Sequelize.TINYINT,
});

module.exports = GameSession;