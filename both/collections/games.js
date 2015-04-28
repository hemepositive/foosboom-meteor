Games = new Meteor.Collection('games');


Games.allow({
  insert: function (userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

Meteor.methods({
  gamesInsert: function(teamOneId, teamTwoId) {
    // Meteor method check to check datatype
    check(Meteor.userId(), String);
    check(teamOneId, String);
    check(teamTwoId, String);

    //checking to make sure owner 'owns' the team
    var teamOne = Teams.findOne({_id: teamOneId, ownerId: Meteor.userId()});
    var teamTwo = Teams.findOne({_id: teamTwoId, ownerId: Meteor.userId()});
    //error message
    if (!teamOne || !teamTwo){
       throw new Meteor.Error("invalid-parameters",
        "One of the teams doesn't exist in the database");
     }

    var teamOneData = {
      id: teamOne._id,
      name: teamOne.name,
      score: 0,
    };
    var teamTwoData = {
      id: teamTwo._id,
      name: teamTwo.name,
      score: 0,
    };
    var game = {
      ownerId: Meteor.userId(),
      createdAt: new Date(),
      teams: [teamOneData, teamTwoData],
      completed: false
    };
    var gameId = Games.insert(game);
    
    Teams.update({_id: teamOneData.id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: teamTwoData.id}, {$addToSet: { gameIds: gameId}});
   
    return gameId;

  } 
});