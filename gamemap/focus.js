// Focus.js
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function Focus (profile, parent){
	this.xlinkns = "http://www.w3.org/1999/xlink";
	this.profile = profile;
	if (parent != 0) {
		this.width = parent.width;
		this.height = parent.height;
	} else{
		this.width = 50;
		this.height = 50;
	}
	this.innerStart = Math.PI;
	this.x = 0;
	this.y = 0;
	this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.dragovergroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	
	this.dragovergroup.setAttribute('opacity',0);
	this.group.appendChild(this.dragovergroup);
	this.group.setAttribute("style", "cursor:pointer;");
	
	this.point = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.point.setAttributeNS(this.xlinkns, 'xlink:href', this.profile.picURL);
	this.point.setAttribute("width", this.width);
	this.point.setAttribute("height", this.height);
	
	this.notification = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.notification.setAttributeNS(this.xlinkns, 'xlink:href', "notification.png");
	//if children
	this.notification.setAttribute("width", this.width*0.3);
	this.notification.setAttribute("height", this.height*0.3);
	this.notification.setAttribute("opacity",0);
	
    this.circ = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.circ.setAttribute("stroke", "none");
	this.circ.setAttribute("fill", "none");
	this.circ.setAttribute("stroke-width", "3");
	this.circ.setAttribute('opacity',"1");
	this.circ.setAttribute('r', this.width*1.2);

	this.circOver = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.circOver.setAttribute("stroke", "#919191");
	this.circOver.setAttribute("fill", "#919191");
	this.circOver.setAttribute("stroke-width", "3");
	this.circOver.setAttribute('opacity',"0");
	this.circOver.setAttribute('r', this.width*1.2);
	this.circOver.setAttribute('onmouseover', "evt.target.setAttribute('opacity', '0.4');");
	this.circOver.setAttribute('onmouseout',"evt.target.setAttribute('opacity','0');");

	this.nameText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.nameText.setAttribute('fill', '#000');
	this.nameText.setAttribute('text-anchor', 'middle');
	this.nameText.setAttribute('font-size', '13');
	this.nameText.textContent = this.profile.name;
	

	this.circAnimate = false;

	this.group.appendChild(this.circ);
	this.group.appendChild(this.point);
	this.group.appendChild(this.nameText);
	this.group.appendChild(this.circOver);
	this.group.appendChild(this.notification);
	
	this.group.setAttribute('style','z-index:0');
	this.circOver.setAttribute('style','z-index:0');
	this.circ.setAttribute('style','z-index:0');
	
	this.parent = parent;
	this.children = [];
}

Focus.prototype.setID = function(id){
	this.profile.id = id;
}

Focus.prototype.increaseSize = function(){
	this.width += 1;
	this.height += 1;
	this.point.setAttribute("width", this.width);
	this.point.setAttribute("height", this.height);
	this.circOver.setAttribute('r', this.width*1.5);
	this.circ.setAttribute('r', this.width*1.5);
	for (var i = 0; i < this.children.length;i++){
		this.children[i].increaseSize();
	}
}
Focus.prototype.decreaseSize = function(){
	this.width -= 1;
	this.height -= 1;
	this.point.setAttribute("width", this.width);
	this.point.setAttribute("height", this.height);
	
	this.circOver.setAttribute('r', this.width*1.5);
	this.circ.setAttribute('r', this.width*1.5);
	for (var i = 0; i < this.children.length;i++){
		this.children[i].decreaseSize();
	}
}

Focus.prototype.setXY = function(x,y){
	this.x = x;
	this.y = y;
	this.point.setAttribute('x', this.x-this.width*0.5);
	this.point.setAttribute('y', this.y-this.height*0.5);
	this.notification.setAttribute("x", this.x+this.width*0.30);
	this.notification.setAttribute("y", this.y+this.height*0.30);
	this.nameText.setAttribute('x', this.x);
	this.nameText.setAttribute('y', this.y + this.height*0.5 + 15);
	this.circ.setAttribute('cx', this.x);
	this.circ.setAttribute('cy', this.y);
	this.circOver.setAttribute('cx', this.x);
	this.circOver.setAttribute('cy', this.y);
	if (this.profile.me){
		this.profile.alerts = this.getAlerts();
		this.profile.updateProfile();
	}
	this.dragOverInitialize();
}

Focus.prototype.setName = function(name){
	this.profile.name = name;
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

//dragover
Focus.prototype.dragOverInitialize = function(){
	while (this.dragovergroup.childNodes.length > 0)
		this.dragovergroup.removeChild(this.dragovergroup.childNodes[0]);
	
	var mpi = Math.PI/180;
	//fill the circle
	var innercount = this.children.length;
	var innerAngle = 360/innercount;
	var innerIncrement = innerAngle * mpi;
	var innerS = this.innerStart;
	for (var i = 0; i < this.children.length;i ++){
		var cr;
		cr = this.width*0.95;
		innerS += innerIncrement;
		var xp = this.x + 1.3*Math.sin(innerS) * cr;
		var yp = this.y + 0.7*Math.cos(innerS) * cr;
		var childd = document.createElementNS("http://www.w3.org/2000/svg", 'image');
		childd.setAttributeNS(this.xlinkns, 'xlink:href', this.children[i].profile.picURL);
		childd.setAttribute('width',18);
		childd.setAttribute('height',18);
		childd.setAttribute('x',xp-9);
		childd.setAttribute('y',yp-9);
		childd.setAttribute('opacity','inherit');
		/*
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("stroke", "#9966FF");
		line.setAttribute("fill", "none");
		line.setAttribute("stroke-width", "3");
		line.setAttribute('opacity',"1");
		line.setAttribute("z-index",0);
		line.setAttribute('x1',this.x);
		line.setAttribute('y1',this.y);
		line.setAttribute('x2',xp);
		line.setAttribute('y2',yp);
		this.dragovergroup.appendChild(line);*/
		this.dragovergroup.appendChild(childd);
	}
	this.dragovergroup.setAttribute('opacity',0);
}

//dragover
Focus.prototype.dragOver = function(){
	this.dragovergroup.setAttribute('opacity',1);
}

//dragover
Focus.prototype.dragOut = function(){
	this.dragovergroup.setAttribute('opacity',0);
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

Focus.prototype.getLayer = function(){
	return this.layerlevel;
}

Focus.prototype.distance = function(a,b){
	return Math.sqrt((this.x-a)*(this.x-a) + (this.y-b)*(this.y-b));
}

Focus.prototype.isSelected = function(){
	if (runFancy){
		this.addJiggleAnimate(this.point);
	} else {
		this.circ.setAttribute('fill',"#919191");
	}
}

Focus.prototype.deSelect = function(){
	if (runFancy){
		this.removeAnimate(this.point);
	} else {
		this.circ.setAttribute('fill',"none");
	}
}

Focus.prototype.reSize = function(b,a){
	
	var maxmult = 1.5;
	var minmult = 0.5;
	var multiplier = ((a*0.5)/this.distance(b,a));
	this.point.setAttribute("width", this.width*multiplier);
	this.point.setAttribute("height", this.height*multiplier);
}

Focus.prototype.updateTime = function(){
	this.profile.updateTime();
	this.getAlerts();
}

Focus.prototype.getAlerts = function(){
	var total = 0;
	if (!this.profile.me){
		for (var i = 0; i < this.children.length;i++)
			total = total + this.children[i].getAlerts();
		
		if (total > 0)
			this.notification.setAttributeNS(this.xlinkns, 'xlink:href', "notification.png");
		else
			this.notification.setAttributeNS(this.xlinkns, 'xlink:href', "notifyparent.png");
		if (this.profile.getNotify()){
			total = total + 1;
			this.notification.setAttribute("opacity", 1);
		}else
			this.notification.setAttribute("opacity", 0);
		
	} else{
		for (var i = 0; i < this.children.length;i++)
			total = total + this.children[i].getAlerts();
	}
	return total;
}