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
				gamesession.createUserSession({
					name: res.body.playerName,
					type: 0,
					index: 0,
					usertoken: randomString(12),
				})
					.then(function(usersession) {
						
						
					});

			});
	}



}

