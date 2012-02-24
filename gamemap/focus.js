// Focus.js
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function Focus (imagelink, x, y){
	this.x = x;
	this.y = y;
	this.xlinkns = "http://www.w3.org/1999/xlink";
	this.focusName = "";
	this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.point = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.point.setAttributeNS(this.xlinkns, 'xlink:href', imagelink);
	this.point.setAttribute("style", "cursor:pointer;");
	this.point.setAttribute("width", "70");
	this.point.setAttribute("height", "70");
	this.point.setAttribute("z-index",2);
	this.point.setAttribute('x', x-35);
	this.point.setAttribute('y', y-35);
	this.point.setAttribute('onclick','expand()');
    this.circ = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.circ.setAttribute("stroke", "#9966FF");
	this.circ.setAttribute("fill", "#9966FF");
	this.circ.setAttribute("stroke-width", "3");
	this.circ.setAttribute('opacity',"0");
	this.circ.setAttribute('r', "70");
	this.circ.setAttribute('cx', x);
	this.circ.setAttribute('cy', y);
	this.circAnimate = false;
	this.group.appendChild(this.point);
	this.group.appendChild(this.circ);
	this.children = [];

}

Focus.prototype.setName = function(name){
	this.focusName = name;
}
//Add children
Focus.prototype.addChildren = function(newFoc){
	this.children.push(newFoc);
}

//Jiggle animation
Focus.prototype.addJiggleAnimate = function(x){
	this.jignimate = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
	rn=Math.floor(Math.random()*11)/10;
	this.jignimate.setAttribute('begin',rn);
	this.jignimate.setAttribute('attributeName','transform');
	this.jignimate.setAttribute('attributeType','XML');
	this.jignimate.setAttribute('type','rotate');
	varx = this.x;
	vary = this.y;
	this.jignimate.setAttribute('from',-2 +',' + varx + ',' + vary);
	this.jignimate.setAttribute('to',2 + ',' + varx + ',' + vary);
	this.jignimate.setAttribute('dur','0.3');
	this.jignimate.setAttribute('repeatCount','indefinite');
	x.appendChild(this.jignimate);
}

//Glow animation
Focus.prototype.addGlowAnimate = function(x){
	this.glonimate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	this.glonimate.setAttribute('attributeName','opacity');
	this.glonimate.setAttribute('attributeType','CSS');
	this.glonimate.setAttribute('from','0.5');
	this.glonimate.setAttribute('to','0');
	this.glonimate.setAttribute('dur','1s');
	this.glonimate.setAttribute('repeatCount','indefinite');
	x.appendChild(this.glonimate);
}

//If near Glow
Focus.prototype.dropBoxTest = function(x, y){
	dx = x - this.x;
	dy = y - this.y;
	if (Math.sqrt(dx*dx + dy*dy) < 70 && !this.circAnimate){
		//this.addGlowAnimate(this.circ);
		this.circ.setAttribute('opacity',"0.2");
		this.circAnimate = true;
	}
	else if (Math.sqrt(dx*dx + dy*dy) > 70 && this.circAnimate){
		this.circ.setAttribute('opacity',"0");
		this.circAnimate = false;
	}
}



//remove animation if top node
Focus.prototype.removeAnimate = function(x){
	while (x.childNodes.length > 0){
		x.removeChild(x.childNodes.item(0));
		x.setAttribute('opacity',"0");
	}
}

//return point for drawing on svgcanvas
Focus.prototype.getPoint = function(){
	return this.group;
}


