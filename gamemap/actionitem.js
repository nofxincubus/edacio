// notestream.js
// Actionable links
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function ActionItem(height) {
	this.div = document.getElementById('actionableitem');
	this.width = 210;
	this.height = height;
	if (this.width/3 < this.height*0.5)
		this.iconSize = this.width/3-10;
	else
		this.iconSize = this.height*0.5-10;
	
	this.div.style.height = this.height + "px";
	this.div.style.width = this.width + "px";
	this.div.style.position = "absolute";
	this.div.style.top = "35px";
	this.div.style.left = "180px";
	this.div.style.zIndex = "3";
	this.div.style.opacity = "0";
	this.div.style.background = "#36C";
	this.div.style.mozBoxShadow = "3px 3px 4px #808080"
	this.div.style.boxShadow = "3px 3px 4px #808080"
	this.div.style.webkitBoxShadow = "3px 3px 4px #808080"
	
	var leftoffset = (this.width - this.iconSize*3)*0.25;
	var topoffset = (this.height - this.iconSize*2)/3;
	
	this.email = document.createElement('image');
	this.email.setAttribute('src',"email.png");
	this.email.style.position = "absolute";
	this.email.style.width = this.iconSize + "px";
	this.email.style.height = this.iconSize + "px";
	this.email.style.zIndex = "inherit";
	this.email.style.left = leftoffset + "px";
	this.email.style.top = topoffset + "px";

	this.call = document.createElement('image');
	this.call.setAttribute('src',"phonecall.png");
	this.call.style.position = "absolute";
	this.call.style.width = this.iconSize + "px";
	this.call.style.height = this.iconSize + "px";
	this.call.style.zIndex = "inherit";
	this.call.style.left = leftoffset*2 + this.iconSize + "px";
	this.call.style.top = topoffset + "px";

	this.txt = document.createElement('image');
	this.txt.setAttribute('src',"textmsg.png");
	this.txt.style.position = "absolute";
	this.txt.style.width = this.iconSize + "px";
	this.txt.style.height = this.iconSize + "px";
	this.txt.style.zIndex = "inherit";
	this.txt.style.left = leftoffset*3 + this.iconSize*2 + "px";
	this.txt.style.top = topoffset + "px";

	this.lunch = document.createElement('image');
	this.lunch.setAttribute('src',"lunch.png");
	this.lunch.style.position = "absolute";
	this.lunch.style.width = this.iconSize + "px";
	this.lunch.style.height = this.iconSize + "px";
	this.lunch.style.zIndex = "inherit";
	this.lunch.style.left = leftoffset + "px";
	this.lunch.style.top = topoffset*2+ this.iconSize + "px";
	
	this.coffee = document.createElement('image');
	this.coffee.setAttribute('src',"coffee.png");
	this.coffee.style.position = "absolute";
	this.coffee.style.width = this.iconSize + "px";
	this.coffee.style.height = this.iconSize + "px";
	this.coffee.style.zIndex = "inherit";
	this.coffee.style.left = leftoffset*2 + this.iconSize + "px";
	this.coffee.style.top = topoffset*2+ this.iconSize + "px";
	
	this.meeting = document.createElement('image');
	this.meeting.setAttribute('src',"meeting.png");
	this.meeting.style.position = "absolute";
	this.meeting.style.width = this.iconSize + "px";
	this.meeting.style.height = this.iconSize + "px";
	this.meeting.style.zIndex = "inherit";
	this.meeting.style.left = leftoffset*3+ this.iconSize*2 + "px";
	this.meeting.style.top = topoffset*2+ this.iconSize + "px";
	
	this.div.appendChild(this.email);
	this.div.appendChild(this.call);
	this.div.appendChild(this.txt);
	this.div.appendChild(this.lunch);
	this.div.appendChild(this.coffee);
	this.div.appendChild(this.meeting);
	
}

ActionItem.prototype.draw = function(){
	this.div.style.opacity = 1;
}

ActionItem.prototype.remove = function(){
	this.div.style.opacity = 0;
}