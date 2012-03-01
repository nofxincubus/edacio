//Contact Circle UI by CALVIN PARK
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
	this.layerlevel = 0;
	this.circleRadius = 200;
	this.innerRadius = 0;
	this.outerRadius = 400;
	this.stable = true;
	//this.width = (window.innerWidth-20)*0.5;	
	//this.height = 300;
	this.menu = new LinkMenu(150, 400);
	this.topNodes = [];
	this.circleNames = [];
	this.innerName = "Circle ";
	this.outerName = "Circle ";
	this.initialize();
};

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
	
	this.outerText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.outerText.setAttribute('fill', '#3C0');
	this.outerText.setAttribute('font-size', '30');
	this.outerText.setAttribute('opacity',"0");
	this.outerText.setAttribute('style',"cursor:pointer;text-anchor: middle; dominant-baseline: central;");
	this.outerText.textContent = this.outerName;
	this.outerText.setAttribute('x', this.width*0.5);
	this.outerText.setAttribute('y', this.height*0.5);
	this.outerText.setAttribute('onclick','onTitleClick()');
	
	this.innerText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.innerText.setAttribute('fill', '#3C0');
	this.innerText.setAttribute('font-size', '30');
	this.innerText.setAttribute('opacity',"1");
	this.innerText.setAttribute('style',"cursor:pointer; text-anchor: middle; dominant-baseline: central;");
	this.innerText.textContent = this.innerName;
	this.innerText.setAttribute('x', this.width*0.5);
	this.innerText.setAttribute('y', this.height*0.5);
	this.innerText.setAttribute('onclick','onTitleClick()');
};

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(svg);
	
	this.reposition();
	//Add the circle
	svg.appendChild(this.mainCircle);
	svg.appendChild(this.outerCircle);
	svg.appendChild(this.innerText);
	svg.appendChild(this.outerText);
	svg.appendChild(this.menu.getMenu());
	i = 0;
	while (i < this.topNodes.length){
		if (this.topNodes[i].getLayer() == this.layerlevel)
			svg.appendChild(this.topNodes[i].getPoint());
		else if (this.topNodes[i].getLayer() == this.layerlevel + 1)
			svg.appendChild(this.topNodes[i].getPoint());
		i++;
	}
};

//Reve the MAP UI
MapUI.prototype.removeAll = function(svg) {
	while (svg.childNodes.length > 0 ){
		svg.removeChild(svg.firstChild);
	}
};


MapUI.prototype.addNode = function(name) {
	var focc = new Focus("tempme.png", name, this.layerlevel);
	this.topNodes.push(focc);
};

MapUI.prototype.importNodes = function(json) {
	//Get Data but for now simulate
	this.numNodes = 1;	
};

MapUI.prototype.getMousePos = function(x,y){
	i =0;
	while (i < this.topNodes.length){
		this.topNodes[i].dropBoxTest(x,y);
		i++;
	}
};

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
	this.innerText.setAttribute('opacity',ciropac);
	if (this.circleNames.length > 0){
		if (this.circleNames[this.layerlevel])
			this.innerText.textContent = this.circleNames[this.layerlevel];
		else 
			this.innerText.textContent = this.innerName + this.layerlevel;
		if (this.circleNames[this.layerlevel+1])
			this.outerText.textContent = this.circleNames[this.layerlevel+1];
		else 
			this.outerText.textContent = this.outerName + (this.layerlevel+1);
	}
	else {
		this.innerText.textContent = this.innerName + this.layerlevel;
		this.outerText.textContent = this.outerName + (this.layerlevel+1);
	}
	this.innerText.setAttribute('font-size', this.circleRadius*0.2);
	this.outerCircle.setAttribute('opacity',ouopac);
	this.outerText.setAttribute('opacity',ouopac);
	
	this.outerText.setAttribute('font-size', this.outerRadius*0.2);
	
	var i = 0;
	var innercount = 0;
	var outercount = 0;
	var layer;

	while (i < this.topNodes.length){
		if (this.topNodes[i].getLayer() == this.layerlevel) {
			this.topNodes[i].getPoint().setAttribute('opacity',ciropac);
			innercount++;
		}
		if (this.topNodes[i].getLayer() == this.layerlevel + 1) {
			this.topNodes[i].getPoint().setAttribute('opacity',ouopac);
			outercount++;
		}
		i++;
		
	}

	var mpi = Math.PI/180;
	var innerStart = 0;
	var outerStart = 0;
	//fill the circle
	
	var innerAngle = 360/innercount;
	var outerAngle = 360/outercount;
	var innerIncrement = innerAngle * mpi;
	var outerIncrement = outerAngle * mpi;
	for (i = 0; i < this.topNodes.length;i ++){
		var cr;
		if (this.topNodes[i].getLayer() == this.layerlevel){
			cr = this.circleRadius;
			innerStart += innerIncrement;
			var xp = this.centerx + Math.sin(innerStart) * cr;
			var yp = this.centery + Math.cos(innerStart) * cr;
			this.topNodes[i].setXY(xp,yp);
		}
		if  (this.topNodes[i].getLayer() == this.layerlevel + 1){
			cr = this.outerRadius;
			outerStart += outerIncrement;
			var xp = this.centerx + Math.sin(outerStart) * cr;
			var yp = this.centery + Math.cos(outerStart) * cr;
			this.topNodes[i].setXY(xp,yp)
		}
	}
};

MapUI.prototype.setCircTitle = function(name){
	this.circleNames[this.layerlevel] = name;
};

MapUI.prototype.Iterate=function(){
	if(this.stable)
		return this.stable;
	
	else {
	this.dv = this.dv * this.damping;
	
	var cirR = this.circleRadius;
	var outR = this.circleRadius + 200;
	cirR +=  this.dv;
	outR = cirR + 200;

	if (cirR <= 0){
		this.circleRadius = outR;
		this.outerRadius = 400;
		this.layerlevel++;
	}
	else if (cirR >= 200) {
		if (this.layerlevel == 0){
			this.stable == true;
			return this.stable;
		} else {
			this.outerRadius = cirR;
			this.circleRadius = 0;
			this.layerlevel--;
		}
	}
	else {
		this.circleRadius = cirR;
		this.outerRadius = outR;
	}
	
		
	if (Math.abs(this.dv) < 0.1)
		this.stable = true;
	else 
		this.stable = false;
	return this.stable;
	}
};

MapUI.prototype.SetDragged=function(b,a){
	for(i=0;i<this.graph.n;i++)
		if(a=this.vertices[i],b.distance2D(b,a)<c){
			this.dragged=a;
			this.stable=false;
			break
		}
	};

MapUI.prototype.MoveDragged=function(b,a){
	if(this.dragged)
		this.dragged.x=b,
		this.dragged.y=a,
		this.stable=false
	};

MapUI.prototype.StopDragging=function(){
	this.dragged=null
	};