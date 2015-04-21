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
		Games.remove(this._id);
	},

	// FOR THESE THE AUTHOR USES
	// Games.update({_id: this._id}, ...)
	// ?benefit as this._id works
	'click a.incrementOne': function(e, template){
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
	},
});

/*'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.update(selectedPlayer, {$inc: {score: 5} });
}*/