//MAP UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h){
	this.width = w;
	this.height = h;
	this.updown = 1;
	//this.width = (window.innerWidth-20)*0.5;	
	//this.height = 300;
	this.topNodes = [];
	this.lines = [];
	
}

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(svg);
	i = 0;
	while (i < this.lines.length){
		svg.appendChild(this.lines[i]);
		i++;
	}
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
	if (this.topNodes.length == 0){
		focc = new Focus("tempme.png", 100, this.height*0.5 + 50*this.updown);
		focc.setName(name);
		this.updown = this.updown* (-1);
	} else {
		focc = new Focus("tempme.png", this.topNodes[this.topNodes.length-1].x + 150, this.topNodes[this.topNodes.length-1].y + 50*this.updown);
		focc.setName(name);
		this.updown = this.updown* (-1);
		templine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		templine.setAttribute("style", "stroke:#777;stroke-width:3");
		templine.setAttribute('x1', this.topNodes[this.topNodes.length-1].x);
		templine.setAttribute('y1', this.topNodes[this.topNodes.length-1].y);
		templine.setAttribute('x2', focc.x);
		templine.setAttribute('y2', focc.y);
		templine.setAttribute('z-index',-1);
		this.lines.push(templine);
	}
	this.topNodes.push(focc);
	window.scrollTo(this.topNodes[this.topNodes.length-1].getPoint().x,0);
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


