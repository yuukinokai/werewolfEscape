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
						res.render('create');
					});
			});
	}
}

exports.startGame = function(req, res) {
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
					name: res.body.playerName,
					type: 0,
					index: 0,
					usertoken: usertoken,
				})
					.then(function(usersession) {
						req.session.usertoken = usertoken;
						
					});
			});
	}
}


