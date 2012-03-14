// liprofile.js
// LinkedIn profile widget
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LIProfile() {
	//this.initialize();
	//this.testBuild();
	this.profTag = document.getElementById('linkImage');
	this.nameTag = document.getElementById('linkName');
	this.locationTag = document.getElementById('linkLocation');
	this.titleTag = document.getElementById('linkTitle');
	this.currentStatusTag = document.getElementById('linkStatus');
	this.wrapdiv = document.getElementById('contactprofile');
	this.wrapdiv.style.zIndex = 3;
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
	var wrapdiv = document.getElementById('contactprofile');
	wrapdiv.style.width
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
	this.profTag.src = this.pictureURL;
	this.nameTag.textContent = this.name;
	this.locationTag.textContent = this.location;
	this.titleTag.textContent = this.title;
	this.currentStatusTag.textContent = this.currentStatus;
	this.drawAll();
}

LIProfile.prototype.reposition = function(){
	this.profTag.style.position = "absolute";
	this.profTag.style.top = "1px";
	this.profTag.style.left = "1px";
	this.profTag.style.width = "58px";
	this.profTag.style.height = "58px";
	
	this.nameTag.style.position = "absolute";
	this.nameTag.style.top = "-10px";
	this.nameTag.style.left= "60px";
	this.nameTag.style.color = "#FFF";
	
	this.titleTag.style.position = "absolute";
	this.titleTag.style.top = "50px";
	this.titleTag.style.left= "5px";
	this.titleTag.style.fontSize = "11px";
	
	this.locationTag.style.position = "absolute";
	this.locationTag.style.top = "78px";
	this.locationTag.style.left= "5px";
	this.locationTag.style.fontSize = "11px";

	this.currentStatusTag.style.position = "absolute";
	this.currentStatusTag.style.top = "95px";
	this.currentStatusTag.style.left= "5px";
	this.currentStatusTag.style.fontSize = "8px";
}

LIProfile.prototype.drawAll = function(){
	this.removeAll();
	this.wrapdiv.style.opacity = 1;
	this.wrapdiv.style.zIndex = 3;
	this.wrapdiv.appendChild(this.profTag);
	this.wrapdiv.appendChild(this.nameTag);
	this.wrapdiv.appendChild(this.titleTag);
	this.wrapdiv.appendChild(this.locationTag);
	this.wrapdiv.appendChild(this.currentStatusTag);
}

LIProfile.prototype.removeAll = function(){
	this.wrapdiv.style.opacity = 0;
	while (this.wrapdiv.childNodes.length > 0)
		this.wrapdiv.removeChild(this.wrapdiv.childNodes[0]);
}
