Template.game.helpers({
	game: function() {
		var currentGame = Games.findOne(this._id);
	}
});

Template.game.events({
	'click a.finish-game': function(e, template){
		e.preventDefault();
		Games.update(this._id, {$set: {completed: true}});
	},
	'click a.delete-game': function(e, template){
		e.preventDefault;
		//Games.remove(this._id);
		var currentGameID = this._id;
		var teamOneId = this.teams[0].id;
		var teamTwoId = this.teams[1].id;
		
		Games.remove(currentGameID, function(error) {
			if (! error) {
				Teams.update(teamOneId, {$pull: {gameIds: currentGameID}});
				Teams.update(teamTwoId, {$pull: {gameIds: currentGameID}});
			}
		});
		
	},
	'click a.score': function(e, template) {
		e.preventDefault();
		var teamData = $(e.currentTarget).data();
		var update = {$inc: {}};
		var selector = "teams." + teamData.index + ".score";
		console.log(teamData);
		console.log(update);
		console.log(teamData.inc);
		update.$inc[selector] = teamData.inc;
		Games.update(this._id, update);
	},

	// FOR THESE THE AUTHOR USES
	// Games.update({_id: this._id}, ...)
	// ?benefit as this._id works
	/*'click a.incrementOne': function(e, template){
		e.preventDefault();
		Games.update(this._id, {$inc : {"teams.0.score": 1}});
	},
	'click a.decrementOne': function(e, template){
		e.preventDefault();
		Games.update(this._id, {$inc : {"teams.0.score": -1}});
	},
	'click a.incrementTwo': function(e, template){
		e.preventDefault();
		Games.update(this._id, {$inc : {"teams.1.score": 1}});
	},
	'click a.decrementTwo': function(e, template){
		e.preventDefault();
		Games.update(this._id, {$inc : {"teams.1.score": -1}});
	},*/
});

/*'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.update(selectedPlayer, {$inc: {score: 5} });
}*/