// connectionProfile.js
// Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function connectionProfile(id, picURL, name, title, location, currentStatus, publicURL){
	this.id = id;
	this.picURL = picURL;
	this.name = name;
	this.title = title;
	this.location = location;
	this.currentStatus = currentStatus;
	this.publicURL = publicURL;
	//add Notes and shit
	this.notes = [];
}

connectionProfile.prototype.appendNotes = function(notes){
	this.notes.push(notes);
}