Template.team.helpers({
	isEditingTeam: function(){
		// COOL: if this._id present then BOOL === true
		return Session.get('editedTeamId') === this._id;
  	},

});

Template.team.events({
	'click a.remove': function(e,tpl) {
 		e.preventDefault();
 		Teams.remove(this._id);
    },

  	"click a.edit": function(e, tpl){
    	e.preventDefault();
    	Session.set('editedTeamId', this._id);
	},

	'click a.cancel': function(e, tpl){
  		e.preventDefault();
    	Session.set('editedTeamId', null);
  	},

	'submit form.edit-team': function(e, tpl){
  		e.preventDefault();
    	var newData = tpl.$('input[name=name]').val();
    	Teams.update(this._id, {$set: {name: newData}});
    }, //submit
});