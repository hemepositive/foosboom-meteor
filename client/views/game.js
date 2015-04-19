Template.game.helpers({
	game: function() {
		var currentGame = Games.findOne(this._id);
		console.log(this._id);
		console.log("test game helper");
		console.log(currentGame._id);
		return currentGame;
	},
	teamList: function(){
		console.log("log currentGame");
		console.log(this._id);
		console.log(this._d.teams);
		return true;

	}
});

Template.game.events({
	// 'click a.gameover': function(e, template){
	// 	e.preventDefault();
	// 	console.log("gameover");
	// 	console.log(this.completed);
	// 	value="{{_id}}"
	// 	Games.update(this._id, {$set: {completed: true}});
	// 	console.log(this.completed);

	// 	//console.log(this._id, {completed});

	// },

	'click a.editScore': function(e, template){
		e.preventDefault();
		//var team1Score = this._id.team.score;
		//var team2Score = this._id.team[1].score;
		console.log("edit clicked");
		console.log(this._id.teams);
		console.log(this.completed);
		Games.update(this._id, {$inc :{score: +1}});



		
	}
});