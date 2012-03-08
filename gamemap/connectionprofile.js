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
	this.score = 0;
	this.credits =0;
	this.awards =0;
	this.alerts=0;
	this.lastConnected = 0;
	// 1. Stay Close
	 // 2. Keep Track
	//  3. Keep in touch
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

connectionProfile.prototype.getNextAppointment = function(){
	var today = new Date();
	var comparison;
	if (this.type === 1)
		comparison = 7*24*60*60*1000*0.5;
	else if (this.type === 2)
		comparison = 7*24*60*60*1000;
	else 
		comparison = 7*24*60*60*1000*4;
	today = new Date(today.getTime() + comparison)
	var newTimeString = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + " 11:00:00";
	var newDate = new Date(newTimeString);
	return newDate;
}

connectionProfile.prototype.getNotify = function(){
	var today = new Date();
	var timeDiff;
	if (this.lastConnected === 0)
		timeDiff = (today.getTime() - this.lastConnected)/(today.getTime());
	else
		timeDiff = (today.getTime() - this.lastConnected.getTime())/(today.getTime());
	var comparison;
	if (this.type === 1)
		comparison = 7*24*60*60*1000*0.5;
	else if (this.type === 2)
		comparison = 7*24*60*60*1000;
	else 
		comparison = 7*24*60*60*1000*4;
	if (timeDiff >= comparison)
		return false;
	else
		return true;
}

connectionProfile.prototype.updateTime = function(){
	this.lastConnected = new Date();
}


connectionProfile.prototype.addScore = function(delta){
 this.score += delta;
 //return this.score;
}
connectionProfile.prototype.clearScore = function()
{
 this.score = 0;
 addCommas(this.score);
 //return this.score;
}
// Add/clear credits
connectionProfile.prototype.addCredits= function(delta){
 this.credits += delta;
 //return this.score+delta;
}
connectionProfile.prototype.clearCredits = function()
{
 this.credits = 0;
 //return this.score+delta;
}
//Add/clear rewards
connectionProfile.prototype.addAwards = function(delta){
 this.awards += delta;
 //return this.score+delta;
}
connectionProfile.prototype.clearAwards = function()
{
 this.awards= 0;
 //return this.score+delta;
}