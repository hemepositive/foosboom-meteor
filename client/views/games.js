Template.games.helpers({
	games: function() {
		return Games.find();
    //add sorting
    //return Games.find({}, {$sort: {completed: true}});
	},
	teams: function() {
		return Teams.find();
	},
	isCreatingGame: function() {
		return Session.get('isCreatingGame');
	}
});

Template.games.events({
  
  'click a.create': function(e, tpl){
  	e.preventDefault();
    Session.set('isCreatingGame', true);
  },

  'click a.cancel': function(e, tpl){
  	e.preventDefault();
    Session.set('isCreatingGame', null);
  },

  'click a.delete': function(e, tpl){
  	e.preventDefault();
  	Games.remove(this._id);
  },

   'submit form.create-game': function(e, tpl){
  	e.preventDefault();
  	// get teams from selections
  	var team1 = {
  		id: tpl.$("select[name='teamOne']").val(),
  		name: tpl.$("select[name='teamOne'] option:selected").text(),
  		score:0
  	}
  	var team2 = {
  		id: tpl.$("select[name='teamTwo']").val(),
  		name: tpl.$("select[name='teamTwo'] option:selected").text(),
  		score:0
  	}
  	// create a gome
 	var game = {
    	completed: false,
    	createdAt: new Date(),
    	teams: [team1, team2]
	};
	// insert game
  	var gameId = Games.insert(game);

  	Teams.update({_id: team1.id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: team2.id}, {$addToSet: { gameIds: gameId}});

    Session.set('isCreatingGame', null);
  },
}); //events
