//Contact Circle UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h, csvg){
	this.svg = csvg;
	this.width = w;
	this.height = h;
	
	this.dv = 0;
	this.damping = 0.95;
	this.updown = 1;
	this.layerlevel = 0;
	this.sizeConstraint = 0.35;
	this.circleRadius = h*this.sizeConstraint;
	this.centerx = w/2 - 10;
	this.centery = this.circleRadius + 50;
	this.stable = true;
	//this.width = (window.innerWidth-20)*0.5;	
	//this.height = 300;
	this.menu = new LinkMenu(150, this.circleRadius*2+30, 20, 30);
	this.selectedNode = 0;
	this.innerStart = 0;
	this.loadTopNodes();
	this.initialize();
	this.menudragged = false;
	this.dragged = false;
	this.lines =[];
	this.doCircle = false;
};

MapUI.prototype.increaseSize = function(){
	this.sizeConstraint +=0.005;
	this.width += 5;
	this.circleRadius = this.width*this.sizeConstraint;
	this.centerx = this.width*0.5 - 10;
	this.centery = this.circleRadius + 50;
	this.topFocus.increaseSize();
	this.menu.positionAll(150, this.circleRadius*2, this.centerx-this.circleRadius - 220, this.centery-this.circleRadius - 20);
	//this.topFocus.increaseSize();
	this.drawAll();
}
MapUI.prototype.decreaseSize = function(){
	this.sizeConstraint -=0.005;
	this.width -= 5;
	this.circleRadius = this.width*this.sizeConstraint;
	this.centerx = this.width*0.5 - 10;
	this.centery = this.circleRadius + 50;
	this.topFocus.decreaseSize();
	this.menu.positionAll(150, this.circleRadius*2, this.centerx-this.circleRadius - 220, this.centery-this.circleRadius - 20);
	//this.topFocus.decreaseSize();
	this.drawAll();
}

MapUI.prototype.changeCircle = function(){
	if (this.doCircle)
		this.doCircle = false;
	else
		this.doCircle = true;
	this.drawAll();
}

MapUI.prototype.loadTopNodes = function(){
	this.topFocus = new Focus("zahid.jpg","Zahid Hasan",0);
	this.currentFocus = this.topFocus;
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
}

MapUI.prototype.initialize = function(){
	
	this.mainCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.mainCircle.setAttribute("stroke", "#9966FF");
	this.mainCircle.setAttribute("fill", "none");
	this.mainCircle.setAttribute("stroke-width", "3");
	this.mainCircle.setAttribute('opacity',"1");
	this.mainCircle.setAttribute('r', this.circleRadius);
	this.mainCircle.setAttribute('cx', this.centerx);
	this.mainCircle.setAttribute('cy', this.centery);
	
	this.parentLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
};

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(this.svg);
	
	this.reposition();

	//Add the circle or lines
	if (this.doCircle)
		this.svg.appendChild(this.mainCircle);
	else {
		for (var i = 0;i < this.lines.length;i ++)
			this.svg.appendChild(this.lines[i]);
	}
	
	this.svg.appendChild(this.menu.getMenu());

	if (this.currentFocus.parent != 0)
	{
		this.svg.appendChild(this.parentLine);
		this.svg.appendChild(this.currentFocus.parent.getPoint());
	}
	var i = 0;
	this.svg.appendChild(this.currentFocus.getPoint());
	while (i < this.currentFocus.children.length){
		this.svg.appendChild(this.currentFocus.children[i].getPoint());
		i++;
	}
	
};

//Reve the MAP UI
MapUI.prototype.removeAll = function(svg) {
	while (this.svg.childNodes.length > 0 ){
		this.svg.removeChild(svg.firstChild);
	}
};


MapUI.prototype.importNodes = function(json) {
	//Get Data but for now simulate
	this.numNodes = 1;	
};

MapUI.prototype.getMousePos = function(x,y){
	i =0;
	while (i < this.currentFocus.children.length){
		this.currentFocus.children[i].dropBoxTest(x,y);
		i++;
	}
};

MapUI.prototype.reposition = function() {
	this.lines = [];
	//set Radius
	this.mainCircle.setAttribute('cx', this.centerx);
	this.mainCircle.setAttribute('cy', this.centery);
	this.mainCircle.setAttribute('r', this.circleRadius);
	//set transparency shizzle

	var ciropac = 1-Math.abs(this.circleRadius - 200)/200;
	this.mainCircle.setAttribute('opacity',ciropac);
	this.currentFocus.setXY(this.centerx, this.centery);
	
	if (this.currentFocus.parent != 0)
	{
		this.currentFocus.parent.setXY(this.centerx + this.circleRadius+100, this.centery);
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("stroke", "#9966FF");
		line.setAttribute("fill", "none");
		line.setAttribute("stroke-width", "3");
		line.setAttribute('opacity',"1");
		line.setAttribute("z-index",-1);
		line.setAttribute('x1',this.centerx);
		line.setAttribute('y1',this.centery);
		line.setAttribute('x2',this.centerx + this.circleRadius+100);
		line.setAttribute('y2',this.centery);
		this.parentLine = line;
	}

	var mpi = Math.PI/180;
	//fill the circle
	var innercount = this.currentFocus.children.length;
	var innerAngle = 360/innercount;
	var innerIncrement = innerAngle * mpi;
	
	for (var i = 0; i < this.currentFocus.children.length;i ++){
		var cr;
		cr = this.circleRadius;
		this.innerStart += innerIncrement;
		var xp = this.centerx + Math.sin(this.innerStart) * cr;
		var yp = this.centery + Math.cos(this.innerStart) * cr;
		this.currentFocus.children[i].setXY(xp,yp);		
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("stroke", "#9966FF");
		line.setAttribute("fill", "none");
		line.setAttribute("stroke-width", "3");
		line.setAttribute('opacity',"1");
		line.setAttribute("z-index",0);
		line.setAttribute('x1',this.centerx);
		line.setAttribute('y1',this.centery);
		line.setAttribute('x2',xp);
		line.setAttribute('y2',yp);
		this.lines.push(line);
	}
	
	
};


MapUI.prototype.zoomIterate=function(){
	/*
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
	}
	else if (cirR >= 200) {
		if (this.layerlevel == 0){
			this.stable == true;
			return this.stable;
		} else {
			this.outerRadius = cirR;
			this.circleRadius = 0;
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
	*/
};

MapUI.prototype.spinIterate=function(){
	if(this.stable)
		return this.stable;
	
	else {
	this.dv = this.dv * this.damping;
	
	this.innerStart += this.dv;
		
	if (Math.abs(this.dv) < 0.1*Math.PI/180)
		this.stable = true;
	else 
		this.stable = false;
	return this.stable;
	}
};

MapUI.prototype.topNodeTest = function(a,b) {
	for (var i = 0;i < this.currentFocus.children.length;i++)
		if (this.currentFocus.children[i].distance(a,b) < this.currentFocus.width*1.5)
			return i;
	return -1;
}

MapUI.prototype.parentTest = function(a,b) {
	if (this.currentFocus.parent != 0){
		if (this.currentFocus.parent.distance(a,b) < this.currentFocus.width*1.5) {
			return true;
		}
	}
	return false;
}

MapUI.prototype.moveAll = function(b,a){
	
}

MapUI.prototype.SetDragged=function(b,a){
	var ba;
	//Stupid Firefox Drag fix
	if (this.menudragged)
		this.StopDragging(b,a);
	if (this.menu.clickTest(b,a)) {	
		if (this.menu.nodeTest(b,a))
			this.menudragged = true;
	} else if (this.topNodeTest(b,a) != -1) {
		if ( this.currentFocus.children[this.topNodeTest(b,a)].children.length > 0){
			this.currentFocus = this.currentFocus.children[this.topNodeTest(b,a)];
			this.selectedNode.deSelect();
			this.selectedNode = this.currentFocus;
			this.selectedNode.isSelected();
		}
		else {
			this.selectedNode.deSelect();
			this.selectedNode = this.currentFocus.children[this.topNodeTest(b,a)];
			this.selectedNode.isSelected();
			//do something here to update the html;
		}
	} else if (this.parentTest(b,a)){
		this.currentFocus = this.currentFocus.parent;
		this.selectedNode.deSelect();
		this.selectedNode = this.currentFocus;
		this.selectedNode.isSelected();
	}
	else {
	this.dragged = true;
	this.startDragX = b;
	this.startDragY = a;
	this.selectedNode.deSelect();
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
	}
};

MapUI.prototype.MoveDragged=function(b,a){
	if (this.menudragged) {
		this.menu.nodeTest(b,a);
		this.stable = false;
	} else if(this.dragged) {
		
	}
	
	
};

MapUI.prototype.StopDragging=function(b,a){
	if (this.menudragged) {
		this.menudragged = false;
		//while for each component
		var inserted = false;
		for (var i = 0;i < this.currentFocus.children.length;i++){
			if (this.currentFocus.children[i].distance(b,a) < this.currentFocus.width*1.5){
				var menuIconIndex = this.menu.selected + this.menu.firstindex;
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.picNames[this.menu.selected + this.menu.firstindex]);
					if (nodeName!=null && nodeName!="")	{
						foci = this.menu.nodeEndName(this.currentFocus.children[i],nodeName);
					}
					else 
						foci = 0;
				} else
					foci = this.menu.nodeEnd(this.currentFocus.children[i]);
				if (foci != 0){
					this.currentFocus.children[i].children.push(foci);
					inserted = true;
				}
				
			}
		}
		if (this.currentFocus.distance(b,a) < this.currentFocus.width*1.5) {
			var menuIconIndex = this.menu.selected + this.menu.firstindex;
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.picNames[this.menu.selected + this.menu.firstindex]);
					if (nodeName!=null && nodeName!="")	{
						foci = this.menu.nodeEndName(this.currentFocus,nodeName);
					}
					else 
						foci = 0;
				} else
					var foci = this.menu.nodeEnd(this.currentFocus);
			if (foci != 0){
				this.currentFocus.children.push(foci);
				inserted = true;
			}
			
		}
		if (!inserted) {
			this.menu.nodeReset();
		}
	} else if(this.dragged) {
	this.dragged = false;
	if (Math.abs(b - this.startDragX) < 50 && Math.abs(a - this.startDragY) < 50)
		return;
	else if (Math.abs(a - this.startDragY) > Math.abs(b - this.startDragX))
		this.dv = 0.1*(a - this.startDragY)/this.height;
	else if (Math.abs(a - this.startDragY) < Math.abs(b - this.startDragX))
		this.dv = 0.1*(b - this.startDragX)/this.width;
	this.stable=false;
	}
	this.dragged = false;
	this.menudragged = false;
};

MapUI.prototype.deleteSelectedNode = function(){
	if (this.selectedNode != this.topFocus && this.selectedNode != 0)
		for (var i = 0; i < this.currentFocus.children.length;i++){
			if (this.selectedNode == this.currentFocus.children[i]){
				var deletedFocus = this.currentFocus.children.splice(i,1);
				if (this.menu.picNames.indexOf(deletedFocus[0].focusName) == -1)
					this.menu.restore(deletedFocus[0].imageLink, deletedFocus[0].focusName);
				break;
			}
		}
};