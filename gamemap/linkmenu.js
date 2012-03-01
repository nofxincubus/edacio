// LinkedIn Drap and Drop Menu
// By Calvin park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LinkMenu(w, h) {
	this.x = 20;
	this.y = 20;
	this.width = w;
	this.height = h;
	this.nodeSize = 0.9;
	this.firstindex = 0;
	this.nodeType = "image";
	//initialization of variables
	this.xlinkns = "http://www.w3.org/1999/xlink";
	//group
	this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.frame = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	//blank node
	this.blanknode = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.group.appendChild(this.frame);
	this.group.appendChild(this.blanknode);
	this.selected = -1;
	this.selectedX = 0;
	this.selectedY = 0;
	this.pics = [];
	this.nodes = [];
	
	this.initialize();
}

LinkMenu.prototype.initialize = function() {
	
	//Setting basic attributes of the frame
	this.frame.setAttribute('fill',"beige");
	this.frame.setAttribute('opacity',"1");
	this.frame.setAttribute('stroke',"9bff8a");
	this.frame.setAttribute('stroke-width',"3");
	this.frame.setAttribute('x', 20);
	this.frame.setAttribute('y', 20);

	//Default radius of round corner = 30
	this.frame.setAttribute('rx', 30);
	this.frame.setAttribute('ry', 30);

	this.frame.setAttribute('width', this.width);
	this.frame.setAttribute('height', this.height);
	
	this.blanknode.setAttributeNS(this.xlinkns, 'xlink:href', "tempme.png");
	this.blanknode.setAttribute("style", "cursor:pointer;");
	this.blanknode.setAttribute("width", 70);
	this.blanknode.setAttribute("height", 70);
	this.blanknode.setAttribute("z-index",5);
	this.resetGrid();
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
			if (distance < hei*0.25) {
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
LinkMenu.prototype.nodeEnd = function(a,b){
	if (this.selected != -1){
		var wid = this.nodeSize * this.width/this.nodex;
		var hei = this.nodeSize * this.height/this.nodey;
		this.nodes[this.selected].setAttribute('x', (a - wid*0.5));
		this.nodes[this.selected].setAttribute('y', (b - hei*0.5));
		this.nodes.splice(this.selected,1);
		this.selected = -1;
	}
}
LinkMenu.prototype.nodeReset = function(){
	if (this.selected != -1){
	this.nodes[this.selected].setAttribute('x', this.selectedX);
	this.nodes[this.selected].setAttribute('y', this.selectedY);
	this.selected = -1;
	}
}



LinkMenu.prototype.resetGrid=function(){
	this.nodes = [];
	while (this.group.childNodes.length > 0)
		this.group.removeChild(this.group.firstChild);
	this.group.appendChild(this.frame);
	this.group.appendChild(this.blanknode);
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
		this.nodey = 6;
	else
		this.nodey = 2;

	
	var wid = this.nodeSize * this.width/this.nodex;
	var wborder = (1 - this.nodeSize) * 0.5 * this.width/this.nodex
	var hei = this.nodeSize * this.height/this.nodey;
	var hborder = (1 - this.nodeSize) * 0.5 * this.height/this.nodey;
	var wc = this.width/this.nodex;
	var hc = this.height/this.nodey;
	var k = this.firstindex;
	var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	this.nodes.push(defs);
	this.blanknode.setAttribute('x', (wc)*0 + this.x + wborder);
	this.blanknode.setAttribute('y', (hc)*0 + this.y + hc*0.5 - 0.5*wid);
	for (i = 0; i < this.nodex;i++){
		for (j = 1;j < this.nodey;j++) {
			pl = this.pics.length;
			if (pl == 0)
				pl = this.nodex*this.nodey;
			if (k < pl){
				var c = document.createElementNS("http://www.w3.org/2000/svg", "image");
				var xlinkns = "http://www.w3.org/1999/xlink";
				if (this.nodeType == 'image') {
					var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
					rect.setAttribute('id','rect' + k);
					if (0.8*wid < 0.8*hei) {
						rect.setAttribute('width', wid);
						rect.setAttribute('height', wid);
						rect.setAttribute('x', (wc)*i + this.x + wborder);
						rect.setAttribute('y', (hc)*j + this.y + hc*0.5 - 0.5*wid);
					} else {
						rect.setAttribute('width', hei);
						rect.setAttribute('height',hei);
						rect.setAttribute('x', (this.width/this.nodex)*i + this.x + 0.5*wc - 0.5*hei);
						rect.setAttribute('y', (this.height/this.nodey)*j + this.y + hborder);
					}
					rect.setAttribute('rx', 10);
					rect.setAttribute('ry', 10);
					rect.setAttribute('fill',"white");
					rect.setAttribute('opacity',"1");
					rect.setAttribute('stroke',"green");
					rect.setAttribute('stroke-width',"3");
					defs.appendChild(rect);
					var clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
					clip.setAttribute('id','clip'+k);
					var useE = document.createElementNS("http://www.w3.org/2000/svg", "use");
					useE.setAttributeNS(xlinkns, 'xlink:href', '#rect' + k);
					clip.appendChild(useE);
					defs.appendChild(clip);
					//change to pics here PICS
					//add text for people's names
					
					if (pl == 0)
						c.setAttributeNS(xlinkns, 'xlink:href', "tempme.png");
					else
						c.setAttributeNS(xlinkns, 'xlink:href', "tempme.png");
					c.setAttribute('clip-path','url(#clip' + k + ')');
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
				} else if (this.nodeType == 'rect') {
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
					c.setAttribute('rx', 10);
					c.setAttribute('ry', 10);
					c.setAttribute('fill',"white");
					c.setAttribute('opacity',"1");
					c.setAttribute('stroke',"green");
					c.setAttribute('stroke-width',"3");
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


