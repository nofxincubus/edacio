// liprofile.js
// LinkedIn profile widget
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LIProfile(id) {
	this.id = id;
	initialize();
}

LIProfile.prototype.initialize = function() {
  // here, we pass the fields as individual string parameters
  IN.API.Profile(id)
    .fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl","currentShare","headline")
    .result(function(result, metadata) {
      this.setConnections(result.values, metadata);
    });
}

LIProfile.prototype.setConnections = function(connections) {
  var connHTML = "<ul>";
  for (id in connections) {
	  /* picture url not always there, must be defensive */
    if (connections[id].hasOwnProperty('pictureUrl')) {
       this.publicURL = connections[id].publicProfileURL;
    }  else {
       this.publicURL = "tempme.png";
    }
	this.pictureURL = connections[id].pictureUrl;
	this.firstName = connections[id].firstName;
	this.lastName = connections[id].lastName;
	this.currentStatus = connections[id].currentShare.comment;
	this.title = connections[id].headline;
  }
}

LIProfile.prototype.buildDiv = function(){
	var wrapdiv = document.getElementById('contactprofile');
	
}

