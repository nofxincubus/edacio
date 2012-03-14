// notestream.js
// Actionable links
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function ActionItem() {
	this.div = document.getElementById('contactprofile');
	
	this.iconSize = 190/6-7;
	
	var leftoffset = 6;
	var topoffset = 30;
	
	this.email = document.createElement('img');
	this.email.setAttribute('src',"email.png");
	this.email.setAttribute('onclick','emailEvent()');
	this.email.style.position = "absolute";
	this.email.style.width = this.iconSize + "px";
	this.email.style.height = this.iconSize + "px";
	this.email.style.zIndex = "10";
	this.email.style.right = leftoffset + "px";
	this.email.style.top = topoffset + "px";

	this.call = document.createElement('img');
	this.call.setAttribute('src',"phonecall.png");
	this.call.setAttribute('onclick','callEvent()');
	this.call.style.position = "absolute";
	this.call.style.width = this.iconSize + "px";
	this.call.style.height = this.iconSize + "px";
	this.call.style.zIndex = "10";
	this.call.style.right = leftoffset*2 + this.iconSize + "px";
	this.call.style.top = topoffset + "px";

	this.txt = document.createElement('img');
	this.txt.setAttribute('src',"textmsg.png");
	this.txt.setAttribute('onclick','textEvent()');
	this.txt.style.position = "absolute";
	this.txt.style.width = this.iconSize + "px";
	this.txt.style.height = this.iconSize + "px";
	this.txt.style.zIndex = "10";
	this.txt.style.right = leftoffset*3 + this.iconSize*2 + "px";
	this.txt.style.top = topoffset + "px";

	this.lunch = document.createElement('img');
	this.lunch.setAttribute('src',"lunch.png");
	this.lunch.setAttribute('onclick','lunchEvent()');
	this.lunch.style.position = "absolute";
	this.lunch.style.width = this.iconSize + "px";
	this.lunch.style.height = this.iconSize + "px";
	this.lunch.style.zIndex = "inherit";
	this.lunch.style.right = leftoffset*4 + this.iconSize*3 + "px";
	this.lunch.style.top = topoffset + "px";
	
	this.coffee = document.createElement('img');
	this.coffee.setAttribute('onclick','coffeeEvent()');
	this.coffee.setAttribute('src',"coffee.png");
	this.coffee.style.position = "absolute";
	this.coffee.style.width = this.iconSize + "px";
	this.coffee.style.height = this.iconSize + "px";
	this.coffee.style.zIndex = "inherit";
	this.coffee.style.right = leftoffset*5 + this.iconSize*4 + "px";
	this.coffee.style.top = topoffset + "px";
	
	this.meeting = document.createElement('img');
	this.meeting.setAttribute('src',"meeting.png");
	this.meeting.setAttribute('onclick','meetingEvent()');
	this.meeting.style.position = "absolute";
	this.meeting.style.width = this.iconSize + "px";
	this.meeting.style.height = this.iconSize + "px";
	this.meeting.style.zIndex = "inherit";
	this.meeting.style.right = leftoffset*6+ this.iconSize*5 + "px";
	this.meeting.style.top = topoffset + "px";
	
	this.div.appendChild(this.email);
	this.div.appendChild(this.call);
	this.div.appendChild(this.txt);
	this.div.appendChild(this.lunch);
	this.div.appendChild(this.coffee);
	this.div.appendChild(this.meeting);
	
}

ActionItem.prototype.draw = function(){
	this.div.appendChild(this.email);
	this.div.appendChild(this.call);
	this.div.appendChild(this.txt);
	this.div.appendChild(this.lunch);
	this.div.appendChild(this.coffee);
	this.div.appendChild(this.meeting);
	this.div.style.zIndex = 5;
}

ActionItem.prototype.remove = function(){
	this.div.style.opacity = 0;
	this.div.style.zIndex = "-1";
}