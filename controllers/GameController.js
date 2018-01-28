var GameSession = require('../models/gamesession.js');
var UserSession = require('../models/usersession.js');

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

exports.createGame2 = function(req, res) {


	if (!req.session.usertoken || req.session.usertoken.length == 0) return res.sendStatus(400);

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					res.render('create', {game_id: gamesession.game_id});
				});
		}
	);
}

exports.createGame = function(req, res) {
	if (!req.body) return res.sendStatus(400);
	if (req.body.playerName.length != 0) {
		GameSession.create({
			name: "New Game",
			game_id: randomString(8),
			game_status: 0,
		})
			.then(function(gamesession) {
				var usertoken = randomString(12);
				gamesession.createUserSession({
					name: req.body.playerName,
					type: 0,
					index: 0,
					usertoken: usertoken,
				})
					.then(function(usersession) {
						req.session.usertoken = usertoken;
						res.render('create', {game_id: gamesession.game_id});
					});
			});
	}
}

exports.getPlayers = function(req, res) {
	if (!req.query) return res.sendStatus(400);
	if (req.query.game_id.length != 0) {
		GameSession.findOne({where: {
			game_id: req.query.game_id,
			}
		})
			.then(function(gamesession) {
				var playerCount;
				gamesession.getUserSessions()
					.then(function(usersessions) {
						var names = [];
						for (var i =0; i<usersessions.length; i++) {
							names.push({name: usersessions[i].name});
						}
						res.json({names: names});
					});
			});
	}
}

exports.getGameStatus = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0) {
		return;
	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					res.json({game_status: gamesession.game_status})
				});
		}
	);

}

exports.joinGame = function(req, res) {
	if (!req.body || !req.body.playerName || !req.body.accessCode) return res.sendStatus(400);
	if (req.body.playerName.length != 0 && req.body.accessCode.length != 0) {
		var accessCode = req.body.accessCode;
		var playerName = req.body.playerName;

		GameSession.findOne({where: {game_id: accessCode}})
			.then(function(gamesession) {
				if (gamesession.status > 0) {
					res.send("Game already started");
				}
				var playerCount;
				gamesession.getUserSessions()
					.then(function(usersessions) {

						playerCount = usersessions.length;
						var usertoken = randomString(12);

						gamesession.createUserSession({
							usertoken: usertoken,
							name: playerName,
							type: 0,
							index: playerCount,
						})
							.then(function(usersession) {
								res.redirect('create');
							})

					});

			})
	} else {
		res.send('rip');
	}

}

exports.startGame = function(req, res) {
	if (!req.session.usertoken || req.session.usertoken.length == 0) {

	}

	UserSession.findOne({where: {usertoken: req.session.usertoken}}).then(
		function(user) {
			user.getGameSession()
				.then(function(gamesession) {
					gamesession.getUserSessions()
						.then(function(usersessions) {

							var playerCount = usersessions.length;
							var humanCount = Math.floor(playerCount/2);
							var werewolfCount = playerCount - humanCount;

							var roles = [];
							for (var i =0; i< humanCount; i++) {
								roles.push(0);
							}

							for (var i =0; i< werewolfCount; i++) {
								roles.push(1);
							}
							var promises = [];
							for (var i=0; i<playerCount; i++) {
								promises.push(usersessions[i].update({
									type: roles[Math.floor(Math.random() * roles.length)]
								}));
							}

							Promise.all(promises).then(function() {

								gamesession.update({
									game_status: 1,
								})
									.then(function() {
										res.redirect('game');
									})
							})
						})
				});
		}
	);

}


