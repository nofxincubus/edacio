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
	this.me = false;
	this.lastConnected = 0;
	//1 = 
	this.type = 1;
	//add Notes and shit
	this.notes = [];
	this.permanantTag = [];
	//this.currentChallenge
	this.pastChallenges = [];
}

connectionProfile.prototype.appendNotes = function(notes){
	this.notes.push(notes);
}

connectionProfile.prototype.appendPermenantNotes = function(notes){
	this.permanantTag.push(notes);
}

connectionProfile.prototype.setMe = function(){
	this.me = true;
}

connectionProfile.prototype.getTimeSince = function(){
	var today = new Date();
	if (this.lastConnected === 0)
		return ((today.getTime() - this.lastConnected)/(today.getTime()));
	else
		return ((today.getTime() - this.lastConnected.getTime())/(today.getTime()));
}

connectionProfile.prototype.updateTime = function(){
	this.lastConnected = new Date();
}


