Places = new Mongo.Collection("places");
Places._ensureIndex({'loc':'2dsphere'});

Meteor.startup(function () {
  // code to run on server at startup
});
