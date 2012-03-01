// LinkedIn Drap and Drop Menu
// By Calvin park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LinkMenu(w, h) {
	this.x = 30;
	this.y = 30;
	this.width = w;
	this.height = h;
	this.nodeSize = 0.85;
	this.firstindex = 0;
	this.nodeType = "image";
	//initialization of variables
	this.xlinkns = "http://www.w3.org/1999/xlink";
	//group
	this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.frame = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	this.remove = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	this.remove.setAttribute("onmousedown", "removeNode()");
	this.removeText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.removeText.setAttribute("onmousedown", "removeNode()");
	this.up = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.down = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.up.setAttributeNS(this.xlinkns, 'xlink:href', 'up.png');
	this.down.setAttributeNS(this.xlinkns, 'xlink:href', 'down.png');
	this.down.setAttribute("onmousedown","addMenuIndex()");
	this.up.setAttribute("onmousedown","subMenuIndex()");
	this.up.setAttribute("width", 50);
	this.up.setAttribute("height", 30);
	this.down.setAttribute("width", 50);
	this.down.setAttribute("height", 30);
	
	//blank node
	this.group.appendChild(this.frame);
	this.group.appendChild(this.remove);
	this.group.appendChild(this.up);
	this.group.appendChild(this.down);
	this.selected = -1;
	this.selectedX = 0;
	this.selectedY = 0;
	this.pics = [];
	this.picNames = [];
	
	this.nodes = [];

	this.initialize();
}

LinkMenu.prototype.initialize = function() {
	
	//Setting basic attributes of the frame
	this.frame.setAttribute('fill',"#f9fcaf");
	this.frame.setAttribute('opacity',"1");
	this.frame.setAttribute('stroke',"#f9fcaf");
	this.frame.setAttribute('stroke-width',"3");
	this.frame.setAttribute('x', this.x);
	this.frame.setAttribute('y', this.y);
	this.up.setAttribute("x", this.width*0.5 + 5);
	this.up.setAttribute("y", this.x-30);
	this.down.setAttribute("x",  this.width*0.5  + 5);
	this.down.setAttribute("y", this.y+this.height+50);

	//Default radius of round corner = 30
	this.frame.setAttribute('rx', 10);
	this.frame.setAttribute('ry', 10);
	this.frame.setAttribute('width', this.width);
	this.frame.setAttribute('height', this.height +50);
	
	this.remove.setAttribute('fill',"#ffafaf");
	this.remove.setAttribute('opacity',"1");
	this.remove.setAttribute('stroke',"#ffafaf");
	this.remove.setAttribute('stroke-width',"3");
	this.remove.setAttribute('x', this.x+15);
	this.remove.setAttribute('y', this.height+this.y+5);
	this.remove.setAttribute('rx', 10);
	this.remove.setAttribute('ry', 10);
	this.remove.setAttribute('width', this.width-30);
	this.remove.setAttribute('height', 40);
	this.removeText.setAttribute('fill', '#6d5e76');
	this.removeText.setAttribute('text-anchor', 'middle');
	this.removeText.setAttribute('font-size', '15');
	this.removeText.textContent = "Remove Node";
	this.removeText.setAttribute('x', this.x+15+(this.width-30)*0.5);
	this.removeText.setAttribute('y', this.height+this.y+5+23);
	this.remove.setAttribute("style", "cursor:pointer;");
	this.removeText.setAttribute("style", "cursor:pointer;");
	
	//Standard Nodes
	/*
	Company
	Investors
	Developers
	Designers
	*/
	this.pics.push("company.png");
	this.pics.push("investor.png");
	this.pics.push("artist.png");
	this.pics.push("programmer.png");
	this.pics.push("blankcategory.png");
	this.pics.push("blankcontact.png");
	
	this.picNames.push("Institution");
	this.picNames.push("Investor");
	this.picNames.push("Designer");
	this.picNames.push("Programmer");
	this.picNames.push("New Category");
	this.picNames.push("New Contact");
	
	
	for (var xx = 0;xx < 30;xx++){
		this.pics.push("blankcontact.png");
		this.picNames.push("New Contact" + xx);
	}
	
	this.resetGrid();
}

LinkMenu.prototype.addIndex = function(){
	this.firstindex += this.nodex*this.nodey;
}
LinkMenu.prototype.subIndex = function(){
	this.firstindex -= this.nodex*this.nodey;
}


LinkMenu.prototype.getMenu = function(){
	this.resetGrid();
	return this.group;
}

LinkMenu.prototype.clickTest = function(a,b){
	
	var wid = this.nodeSize * this.width/this.nodex;
	var hei = this.nodeSize * this.height/this.nodey;
	if (a > this.x && a < this.width+this.x && b > this.y && b < this.height+this.y){
		for (var i = 0;i < this.nodes.length;i++){
			var x1 = Math.abs(this.nodes[i].getAttribute("x")) + wid*0.5;
			var y1 = Math.abs(this.nodes[i].getAttribute("y")) + hei*0.5;
			var distance = Math.sqrt((x1-a)*(x1-a) + (y1-b)*(y1-b));
			if (distance < hei*0.5) {
				this.selected = i;
				this.selectedX = this.nodes[i].getAttribute("x");
				this.selectedY = this.nodes[i].getAttribute("y");
				return true;
			}
		}
	}
	this.selected = -1;
	return false;
}

LinkMenu.prototype.nodeTest = function(a,b){
	if (this.selected != -1){
		var wid = this.nodeSize * this.width/this.nodex;
		var hei = this.nodeSize * this.height/this.nodey;
		this.nodes[this.selected].setAttribute('x', (a - wid*0.5));
		this.nodes[this.selected].setAttribute('y', (b - hei*0.5));
		return true;
	}
	return false;
}

LinkMenu.prototype.nodeEndName = function(a, name){
	if (this.selected != -1){
		var thisindex = this.selected + this.firstindex;
		if (thisindex > 5)
			return new Focus(this.pics.splice(thisindex,1),name,a);
		else
			return new Focus(this.pics[thisindex],name,a);
	}
	return 0;
}

LinkMenu.prototype.nodeEnd = function(a){
	if (this.selected != -1){
		var thisindex = this.selected + this.firstindex;
		if (thisindex > 5)
			return new Focus(this.pics.splice(thisindex,1),this.picNames.splice(thisindex,1),a);
		else
			return new Focus(this.pics[thisindex],this.picNames[thisindex],a);
	}
	return 0;
}
LinkMenu.prototype.nodeReset = function(){
	if (this.selected != -1){
	this.nodes[this.selected].setAttribute('x', this.selectedX);
	this.nodes[this.selected].setAttribute('y', this.selectedY);
	this.selected = -1;
	}
}

LinkMenu.prototype.addLinked = function(pics,names){
	for (var i = 0;i < pics.length;i++){
		this.pics.push(pics[i]);
		this.picNames.push(names[i]);
	}
	this.resetGrid();
}
LinkMenu.prototype.restore = function(pic,name){
	this.pics.push(pic);
	this.picNames.push(name);
	this.resetGrid();
}



LinkMenu.prototype.resetGrid=function(){
	this.nodes = [];
	while (this.group.childNodes.length > 0)
		this.group.removeChild(this.group.firstChild);
	
	this.group.appendChild(this.frame);
	this.group.appendChild(this.remove);
	this.group.appendChild(this.removeText);
	//Need to modify for 
	if (this.width > 500)
		this.nodex = 9;
	else if (this.width > 200)
		this.nodex = 4;
	else
		this.nodex = 2;
		
	if (this.height > 500)
		this.nodey = 9;
	else if (this.height > 200)
		this.nodey = 7;
	else
		this.nodey = 2;
	if (this.firstindex > 0)
		this.group.appendChild(this.up);
	if (this.firstindex + this.nodex*this.nodey < this.pics.length)
		this.group.appendChild(this.down);
	
	var wid = this.nodeSize * this.width/this.nodex;
	var wborder = (1 - this.nodeSize) * 0.5 * this.width/this.nodex
	var hei = this.nodeSize * this.height/this.nodey;
	var hborder = (1 - this.nodeSize) * 0.5 * this.height/this.nodey;
	var wc = this.width/this.nodex;
	var hc = this.height/this.nodey;
	var k = this.firstindex;
	for (j = 0;j < this.nodey;j++) {
	for (i = 0; i < this.nodex;i++){
			var pl = this.pics.length;
			if (pl == 0)
				pl = this.nodex*this.nodey;
			if (k < pl){
				var c = document.createElementNS("http://www.w3.org/2000/svg", "image");
				var xlinkns = "http://www.w3.org/1999/xlink";
				if (this.nodeType == 'image') {
					
					//change to pics here PICS
					//add text for people's names
					c.setAttributeNS(xlinkns, 'xlink:href', this.pics[k]);
					if (0.8*wid < 0.8*hei) {
						c.setAttribute('width', wid);
						c.setAttribute('height', wid);
						c.setAttribute('x', (wc)*i + this.x + wborder);
						c.setAttribute('y', (hc)*j + this.y + hc*0.5 - 0.5*wid);
					} else {
						c.setAttribute('width', hei);
						c.setAttribute('height',hei);
						c.setAttribute('x', (this.width/this.nodex)*i + this.x + 0.5*wc - 0.5*hei);
						c.setAttribute('y', (this.height/this.nodey)*j + this.y + hborder);
					}
					c.setAttribute("style", "cursor:move;");
				}
				rn=Math.floor(Math.random()*11)/10;
				xx = (wc)*i + this.x + wborder + wid*0.5 + rn*5;
				yy = (hc)*j + this.y + hc*0.5 +rn*5;
				c.setAttribute('z-index',"5");
				this.nodes.push(c);
				this.group.appendChild(c);
				k++;
			}
		}
	}
}



