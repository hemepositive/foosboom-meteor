Template.game.helpers({
	game: function() {
		var currentGame = this._id;
		return currentGame;
	},
});

Template.game.events({
	'click a.gameover': function(e, template){
		e.preventDefault();
		console.log("gameover");
		console.log(this.completed);
		Games.update(this._id, {$set: {completed: true}});
		console.log(this.completed);

		//console.log(this._id, {completed});

	},

	'click a.editScore': function(e, template){
		e.preventDefault();
		//var team1Score = this._id.team[0].score;
		//var team2Score = this._id.team[1].score;
		console.log("edit clicked");
		console.log(this._id);
		console.log(this.completed);
		Games.update(this._id, {$inc :{score: +1}});



		
	}
});