// JavaScript Document

function Feeddivs(){
	this.public = document.getElementById("publicopinion");
	this.fbook = document.getElementById("facebookstuff");
	this.other = document.getElementById("otherstuff");
	this.initialize();
}

Feeddivs.prototype.initialize = function(){
	var foot = document.getElementsByTagName('footer');
	var wrapWidth = foot.item(0).clientWidth;
	this.eachWidth = wrapWidth*0.18;
	this.public.style.width = this.eachWidth + "px";
	this.fbook.style.width = this.eachWidth + "px";
	this.other.style.width = this.eachWidth + "px";
	
	this.public.style.left =  (wrapWidth*0.46 - 1.55*this.eachWidth) + "px";
	this.fbook.style.left = (wrapWidth*0.46 - 0.5*this.eachWidth) + "px";
	this.other.style.left = (wrapWidth*0.46 + 0.55*this.eachWidth) + "px";
	
}
