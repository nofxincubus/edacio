//MAP UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h){
	this.width = w;
	this.height = h;
	this.centerx = w/2;
	this.centery = h/2;
	this.updown = 1;
	this.zoomlevel = 1;
	//this.width = (window.innerWidth-20)*0.5;	
	//this.height = 300;
	this.topNodes = [];
	this.lines = [];
	this.initialize();
	
}
MapUI.prototype.initialize = function(){
	this.circleRadius = this.zoomlevel*200;
	this.mainCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.mainCircle.setAttribute("stroke", "#9966FF");
	this.mainCircle.setAttribute("fill", "#FFF");
	this.mainCircle.setAttribute("stroke-width", "3");
	this.mainCircle.setAttribute('opacity',"1");
	this.mainCircle.setAttribute('r', this.circleRadius);
	this.mainCircle.setAttribute('cx', this.width*0.5);
	this.mainCircle.setAttribute('cy', this.height*0.5);
}

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(svg);
	
	this.reposition();
	//Add the circle
	svg.appendChild(this.mainCircle);
	i = 0;
	while (i < this.topNodes.length){
		svg.appendChild(this.topNodes[i].getPoint());
		i++;
	}
	
}

//Reve the MAP UI
MapUI.prototype.removeAll = function(svg) {
	while (svg.childNodes.length > 0 ){
		svg.removeChild(svg.firstChild);
	}
}


MapUI.prototype.addNode = function(name) {
	var focc = new Focus("tempme.png", name);
	this.topNodes.push(focc);
}

MapUI.prototype.importNodes = function(json) {
	//Get Data but for now simulate
	this.numNodes = 1;	
}

MapUI.prototype.getMousePos = function(x,y){
	i =0;
	while (i < this.topNodes.length){
		this.topNodes[i].dropBoxTest(x,y);
		i++;
	}
}

MapUI.prototype.reposition = function() {
	/*
	var templine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	templine.setAttribute("style", "stroke:#777;stroke-width:3");
	templine.setAttribute('x1', this.topNodes[this.topNodes.length-1].x);
	templine.setAttribute('y1', this.topNodes[this.topNodes.length-1].y);
	templine.setAttribute('x2', focc.x);
	templine.setAttribute('y2', focc.y);
	templine.setAttribute('z-index',-1);
	*/
	this.mainCircle.setAttribute('r', this.circleRadius);
	var i;
	var mpi = Math.PI/180;
	var startRadians = 0;
	//fill the circle
	var incrementAngle = 360/this.topNodes.length;
	var incrementRadians = incrementAngle * mpi;
	
	for (i = 0; i < this.topNodes.length;i ++){
		var xp = this.centerx + Math.sin(startRadians) * this.circleRadius;
		var yp = this.centery + Math.cos(startRadians) * this.circleRadius;

		this.topNodes[i].setXY(xp,yp);

		startRadians += incrementRadians;

	}
}

