var MoveHistory = exports.MoveHistory = require('./movehistory.js');
var ActionHistory = exports.ActionHistory = require('./actionhistory.js');
var UserSession = exports.UserSession = require('./usersession.js');
var GameSession = exports.GameSession = require('./gamesession.js');
var CardHistory = exports.CardHistory = require('./cardhistory.js')

GameSession.hasMany(UserSession);
GameSession.hasMany(MoveHistory);
GameSession.hasMany(ActionHistory);
MoveHistory.belongsTo(GameSession);
MoveHistory.belongsTo(UserSession, {through: 'GameSession'})
UserSession.belongsTo(GameSession);
ActionHistory.belongsTo(GameSession);
ActionHistory.belongsTo(UserSession, {through: 'GameSession'});
CardHistory.belongsTo(GameSession);
CardHistory.belongsTo(UserSession, {through: 'GameSession'});