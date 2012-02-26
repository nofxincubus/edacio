//MAP UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h){
	this.width = w;
	this.height = h;
	this.centerx = w/2;
	this.centery = h/2;
	this.dv = 0;
	this.damping = 0.95;
	this.updown = 1;
	this.layerlevel = 1;
	this.circleRadius = 200;
	this.innerRadius = 0;
	this.outerRadius = 400;
	this.stable = true;
	//this.width = (window.innerWidth-20)*0.5;	
	//this.height = 300;
	this.topNodes = [];
	this.lines = [];
	this.initialize();
	
}
MapUI.prototype.initialize = function(){
	
	this.mainCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.mainCircle.setAttribute("stroke", "#9966FF");
	this.mainCircle.setAttribute("fill", "none");
	this.mainCircle.setAttribute("stroke-width", "3");
	this.mainCircle.setAttribute('opacity',"1");
	this.mainCircle.setAttribute('r', this.circleRadius);
	this.mainCircle.setAttribute('cx', this.width*0.5);
	this.mainCircle.setAttribute('cy', this.height*0.5);
	
	this.outerCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.outerCircle.setAttribute("stroke", "#9966FF");
	this.outerCircle.setAttribute("fill", "none");
	this.outerCircle.setAttribute("stroke-width", "3");
	this.outerCircle.setAttribute('opacity',"1");
	this.outerCircle.setAttribute('r', this.outerRadius);
	this.outerCircle.setAttribute('cx', this.width*0.5);
	this.outerCircle.setAttribute('cy', this.height*0.5);
}

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(svg);
	
	this.reposition();
	//Add the circle
	svg.appendChild(this.mainCircle);
	svg.appendChild(this.outerCircle);
	i = 0;
	while (i < this.topNodes.length){
		if (this.topNodes[i].getLayer() == this.layerlevel)
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
	var focc = new Focus("tempme.png", name, this.layerlevel);
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
	//set Radius
	this.mainCircle.setAttribute('r', this.circleRadius);
	this.outerCircle.setAttribute('r', this.outerRadius);
	
	//set transparency shizzle

	var ciropac = 1-Math.abs(this.circleRadius - 200)/200;
	var ouopac = 1-Math.abs(this.outerRadius - 200)/200;
	this.mainCircle.setAttribute('opacity',ciropac);
	this.outerCircle.setAttribute('opacity',ouopac);
	
	i = 0;
	while (i < this.topNodes.length){
		if (this.topNodes[i].getLayer() == this.layerlevel)
			this.topNodes[i].getPoint().setAttribute('opacity',ouopac);
		else
			this.topNodes[i].getPoint().setAttribute('opacity',ciropac);
		i++;
	}
	
	var i;
	var mpi = Math.PI/180;
	var startRadians = 0;
	//fill the circle
	var incrementAngle = 360/this.topNodes.length;
	var incrementRadians = incrementAngle * mpi;
	
	for (i = 0; i < this.topNodes.length;i ++){
		var cr;
		if (this.topNodes[i].getLayer == this.layerlevel)
			cr = this.circleRadius;
		else
			cr = this.outerRadius;
		var xp = this.centerx + Math.sin(startRadians) * cr;
		var yp = this.centery + Math.cos(startRadians) * cr;

		this.topNodes[i].setXY(xp,yp);

		startRadians += incrementRadians;

	}
}

MapUI.prototype.Iterate=function(){
	if(this.stable)
		return this.stable;
	if (this.layerlevel == 1 && this.dv > 0){
		this.stable = true;
		this.dv = 0;
		return this.stable;
	}
	this.dv = this.dv * this.damping;

	this.circleRadius +=  this.dv;
	this.outerRadius = this.circleRadius + 200;

	if (this.circleRadius <= 0){
		this.circleRadius = this.outerRadius;
		this.outerRadius = 400;
		this.layerlevel++;
	}
	else if (this.circleRadius >= 200) {
		this.outerRadius = this.circleRadius;
		this.circleRadius = 0;
		this.layerlevel--;
	}
	
		
	if (Math.abs(this.dv) < 0.1)
		this.stable = true;
	else 
		this.stable = false;
	return this.stable;
};
