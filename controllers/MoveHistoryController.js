var GameSession = require('../models/gamesession.js');
var UserSession = require('../models/usersession.js');
var MoveHistory = require('../models/movehistory.js');

exports.addMove = function (req, res) {

	if (!req.session.usertoken || req.session.usertoken.length == 0) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.createMoveHistory({
				move: req.body.move,
			});
		}
	);
}


exports.getLastMove = function (req, res) {

	if (!req.session.usertoken || req.session.usertoken.length == 0) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getMoveHistories({
			  limit: 1,
			  order: [ [ 'createdAt', 'DESC' ]]
			}).then(function(movehistory) {
				req.json({move: movehistory[0].move});
			})
		}
	);
}

exports.getAllMoves = function (req, res) {

	if (!req.session.usertoken || req.session.usertoken.length == 0) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getMoveHistories().then(function(movehistories) {
				var histories = [];
				for (var i =0; i<movehistories.length; i++) {
					histories.push({move: movehistories[i].action});
				}
				res.json({moves: histories});
			})
		}
	);
}