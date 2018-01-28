var GameSession = require('../models/gamesession.js');
var UserSession = require('../models/usersession.js');
var ActionHistory = require('../models/actionhistory.js');

exports.drawCard = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "Draw card",
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.attack = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "Attack " + req.body.move,
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.move = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "Move to " + req.body.move,
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.silence = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "Silence sector",
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.startgame = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + ") starts",
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.endturn = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "End turn",
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.noise = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.createActionHistory({
						action: "Player " + user.index + " (" + user.name + "): " + "Noise in sector",
					})
						.then(function(actionhistory) {
							return res.sendStatus(200);
						})
				});
		}
	);

}

exports.getActions = function(req, res){
	if (!req.session.usertoken || req.session.usertoken.length == 0 || !req.body) {
		return res.sendStatus(400);
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.getActionHistories()
						.then(function(actionhistories) {
							var histories = [];
							for (var i =0; i<actionhistories.length; i++) {
								histories.push({action: actionhistories[i].action});
							}
							res.json({actions: histories});
						})
				});
		}
	);
}