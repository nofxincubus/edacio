//Contact Circle UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h,csvg){
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
	this.selectedNode = 0;
	this.innerStart = 0;
	this.loadTopNodes();
	this.initialize();
	this.dragged = false;
	this.lines =[];
	this.doCircle = false;
	var xx = 70;
	this.menu = new DivMenu(150,this.circleRadius*2.1,xx,16);
};

MapUI.prototype.increaseSize = function(){
	this.sizeConstraint +=0.005;
	this.width += 5;
	this.circleRadius = this.width*this.sizeConstraint;
	this.centerx = this.width*0.5 - 10;
	this.centery = this.circleRadius + 50;
	this.topFocus.increaseSize();
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
	//Linkedin Load for your own shit but temporarily
	var x = new connectionProfile(0,"tempme.png","Zahid Hasan","Mr. Incredible","Ann Arbor, MI", "Working like Crazy","");
	this.topFocus = new Focus(x,0);
	this.currentFocus = this.topFocus;
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
}
MapUI.prototype.resetTopNodes = function(profile){
	//Linkedin Load for your own shit but temporarily
	this.topFocus = new Focus(profile,0);
	this.currentFocus = this.topFocus;
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
	this.drawAll(this.svg);
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
		if (this.layerlevel === 0){
			this.stable === true;
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
MapUI.prototype.currentTest = function(a,b) {
		if (this.currentFocus.distance(a,b) < this.currentFocus.width*1.5) {
			return true;
		}
	return false;
}

MapUI.prototype.moveAll = function(b,a){
	
}

MapUI.prototype.SetDragged=function(b,a){
	var ba;
	if (this.topNodeTest(b,a) != -1) {
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
		}
	} else if (this.parentTest(b,a)){
		this.currentFocus = this.currentFocus.parent;
		this.selectedNode.deSelect();
		this.selectedNode = this.currentFocus;
		this.selectedNode.isSelected();
	} else if (this.currentTest(b,a)){
		this.selectedNode.deSelect();
		this.selectedNode = this.currentFocus;
		this.selectedNode.isSelected();
	}
	else {
	this.dragged = true;
	this.startDragX = b;
	this.startDragY = a;
	this.selectedNode.deSelect();
	return 0;
	}
	this.drawAll(this.svg);
	return this.selectedNode;
};

MapUI.prototype.MoveDragged=function(b,a){
	if(this.dragged) {
		
	}
	
	
};

MapUI.prototype.dropNode = function(b,a, selected, firstindex){
	var inserted = false;
		for (var i = 0;i < this.currentFocus.children.length;i++){
			if (this.currentFocus.children[i].distance(b,a) < this.currentFocus.width*1.5){
				var menuIconIndex = Math.abs(selected) + Math.abs(firstindex);
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.profileList[menuIconIndex].name);
					if (nodeName!=null && nodeName!="")	{
						var newProf = new connectionProfile(0,this.menu.profileList[menuIconIndex].picURL,nodeName,"","", "","");
						foci = new Focus(newProf,this.currentFocus.children[i]);
					}
					else 
						foci = 0;
				} else {
					foci = new Focus(this.menu.profileList[menuIconIndex],this.currentFocus.children[i]);
				}
				if (foci != 0){
					this.currentFocus.children[i].children.push(foci);
					inserted = true;
				}
				
			}
		}
		var dis = this.currentFocus.distance(b,a);
		if (dis < this.currentFocus.width*1.5) {
			var menuIconIndex = Math.abs(selected) + Math.abs(firstindex);
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.profileList[menuIconIndex].name);
					if (nodeName!=null && nodeName!="")	{
						var newProf = new connectionProfile(0,this.menu.profileList[menuIconIndex].picURL,nodeName,"","", "","");
						foci = new Focus(newProf,this.currentFocus);
					}
					else 
						foci = 0;
				} else {
					foci = new Focus(this.menu.profileList[menuIconIndex],this.currentFocus);
				}
			if (foci != 0){
				this.currentFocus.children.push(foci);
				this.inserted = true;
				this.drawAll(this.svg);
			}
		}
}

MapUI.prototype.StopDragging=function(b,a){
	/*
	if (this.menudragged) {
		this.menudragged = false;
		//while for each component
		
	} else */
	if(this.dragged) {
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
			if (this.selectedNode === this.currentFocus.children[i]){
				var deletedFocus = this.currentFocus.children.splice(i,1);
				if (this.this.menu.picNames.indexOf(deletedFocus[0].focusName) === -1)
					this.this.menu.restore(deletedFocus[0].imageLink, deletedFocus[0].focusName);
				break;
			}
		}
};