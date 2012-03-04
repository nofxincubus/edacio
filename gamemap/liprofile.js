// liprofile.js
// LinkedIn profile widget
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LIProfile() {
	//this.initialize();
	//this.testBuild();
	this.profTag = document.createElement('image');
	this.nameTag = document.createElement('h3');
	this.locationTag = document.createElement('h4');
	this.titleTag = document.createElement('h4');
	this.currentStatusTag = document.createElement('p');
	this.wrapdiv = document.getElementById('contactprofile');
	this.reposition();
}

LIProfile.prototype.setConnections = function(profile) {
    this.publicURL = profile.publicURL;
	this.pictureURL = profile.picURL;
	this.name = profile.name;
	this.location = profile.location;
	if (profile.currentStatus === undefined)
		this.currentStatus = "";
	else
		this.currentStatus = profile.currentStatus;
	this.title = profile.title;
	this.buildDiv();
}

LIProfile.prototype.testBuild = function(){
	this.wrapdiv = document.getElementById('contactprofile');
	this.profTag = document.createElement('image');
	this.profTag.setAttribute('src',"tempme.png");
	this.nameTag = document.createElement('h3');
	this.nameTag.textContent =  "Boob TIT" ;
	this.locationTag = document.createElement('h4');
	this.locationTag.textContent = "Boobland";
	this.titleTag = document.createElement('h5');
	this.titleTag.textContent = "Mr BoobHandler";
	this.currentStatusTag = document.createElement('p');
	this.currentStatusTag.textContent = "I'm handling boobs I'm handling boobs I'm handling boobs I'm handling boobs I'm handling boobs I'm handling boobs";
}

LIProfile.prototype.buildDiv = function(){
	
	this.profTag.setAttribute('src',this.pictureURL);
	this.nameTag.textContent = this.name;
	this.locationTag.textContent = this.location;
	this.titleTag.textContent = this.title;
	this.currentStatusTag.textContent = this.currentStatus;
	this.drawAll();
}

LIProfile.prototype.reposition = function(){
	this.profTag.setAttribute('style','position:absolute;top:3px;left:3px;width:60px;height:60px;');
	this.nameTag.setAttribute('style','position:absolute;top:0px;left:75px;');
	this.titleTag.setAttribute('style','position:absolute;top:12px;left:75px;');
	this.locationTag.setAttribute('style','position:absolute;top:50px;left:3px;');
	this.currentStatusTag.setAttribute('style','position:absolute;top:70px;left:3px;');
}

LIProfile.prototype.drawAll = function(){
	this.removeAll();
	this.wrapdiv.appendChild(this.profTag);
	this.wrapdiv.appendChild(this.nameTag);
	this.wrapdiv.appendChild(this.titleTag);
	this.wrapdiv.appendChild(this.locationTag);
	this.wrapdiv.appendChild(this.currentStatusTag);
}

LIProfile.prototype.removeAll = function(){
	while (this.wrapdiv.childNodes.length > 0)
		this.wrapdiv.removeChild(this.wrapdiv.childNodes[0]);
}
