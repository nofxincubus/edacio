// JavaScript Document

function Frame(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.pics = [];
	this.nodeType = 'image';
	this.nextGood = true;
	this.backGood = false;
	this.firstindex = 0;
	this.selected = 1;
	// Maxsize = 1 - min size = 0 default 0.7
	this.nodeSize = 0.7;

	this.frame = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	this.next = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.bac = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	var xlinkns = "http://www.w3.org/1999/xlink";

	this.next.setAttributeNS(xlinkns, 'xlink:href', 'next.png');
	this.next.setAttribute("style", "cursor:pointer;");
	this.next.setAttribute("width", "50");
	this.next.setAttribute("height", "80");
	this.next.setAttribute('x', x + w);
	this.next.setAttribute('y', y + h*0.5 - 40);
	this.next.setAttribute('onclick','setNext()');
	
	this.bac.setAttributeNS(xlinkns, 'xlink:href', 'back.png');
	this.bac.setAttribute("style", "cursor:pointer;");
	this.bac.setAttribute("width", "50");
	this.bac.setAttribute("height", "80");
	this.bac.setAttribute('x', x - 50);
	this.bac.setAttribute('y', y + h*0.5 - 40);
	this.bac.setAttribute('onclick','setBack()');

	//Setting basic attributes of the frame
	this.frame.setAttribute('fill',"white");
	this.frame.setAttribute('opacity',"1");
	this.frame.setAttribute('stroke',"9bff8a");
	this.frame.setAttribute('stroke-width',"3");

	this.frame.setAttribute('x', x);
	this.frame.setAttribute('y', y);

	//Default radius of round corner = 30
	this.frame.setAttribute('rx', 30);
	this.frame.setAttribute('ry', 30);

	this.frame.setAttribute('width', w);
	this.frame.setAttribute('height', h);

	//Nodes inside the frame
	this.nodes = [];
	}

Frame.prototype.setXY=function(x, y){
	this.x = x;
	this.y = y;
	this.frame.setAttribute('x', x);
	this.frame.setAttribute('y', y);
}

Frame.prototype.setWH=function(w, h){
	this.width = w;
	this.height = h;
	this.frame.setAttribute('width', w);
	this.frame.setAttribute('height', h);
}

Frame.prototype.resetGrid=function(){
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
		this.nodey = 4;
	else
		this.nodey = 2;
	this.nodes = [];

	this.next.setAttribute('x', this.x + this.width);
	this.next.setAttribute('y', this.y + this.height * 0.5 - 40);
	
	this.bac.setAttribute('x', this.x - 50);
	this.bac.setAttribute('y', this.y + this.height * 0.5 - 40);
	
	wid = this.nodeSize * this.width/this.nodex;
	wborder = (1 - this.nodeSize) * 0.5 * this.width/this.nodex
	hei = this.nodeSize * this.height/this.nodey;
	hborder = (1 - this.nodeSize) * 0.5 * this.height/this.nodey;
	wc = this.width/this.nodex;
	hc = this.height/this.nodey;
	k = this.firstindex;
	var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	this.nodes.push(defs);
	for (i = 0; i < this.nodex;i++){
		for (j = 0;j < this.nodey;j++) {
			pl = pics.length;
			if (pl == 0)
				pl == this.nodex*this.nodey;
			if (k < pl){
				var c = document.createElementNS("http://www.w3.org/2000/svg", this.nodeType);
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
						c.setAttributeNS(xlinkns, 'xlink:href', "test.png");
					else
						c.setAttributeNS(xlinkns, 'xlink:href', pics[k]);
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
				this.addAnimation(xx,yy,rn,c);
				k++;
			}
		}
	}
}

Frame.prototype.setFillColor=function(col){
	this.frame.setAttribute('fill',col);
}

Frame.prototype.setBorderColor=function(col){
	this.frame.setAttribute('stroke',col);
}

Frame.prototype.setBorderWidth=function(wid){
	this.frame.setAttribute('stroke-width',wid);
}

Frame.prototype.setOpacity=function(opa){
	this.frame.setAttribute('opacity',opa);
}

Frame.prototype.setCornerRadius=function(rx,ry){
	this.frame.setAttribute('rx', rx);
	this.frame.setAttribute('ry', ry);
}

Frame.prototype.setNodeType=function(type){
	this.nodetype = type;
}

Frame.prototype.drawAll=function(svg){
	
	svg.appendChild(this.frame);
//	svg.appendChild(this.nodes[0]);
	for (i = 0; i < this.nodes.length;i++)
		svg.appendChild(this.nodes[i]);

	if (this.nextGood)
		svg.appendChild(this.next);
	if (this.backGood)
		svg.appendChild(this.bac);
}

Frame.prototype.hideExcept = function(svg){
	var i = 0;
	while (i < svg.childNodes.length){
		for (j = 0; j < this.nodes.length;j++){
			if (svg.childNodes.item(i) == this.nodes[j] && j != this.selected)
				svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.next){
			svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.bac){
			svg.removeChild(svg.childNodes.item(i));
		}
		i++;
	}
}

Frame.prototype.setNodeSize=function(size){
	this.nodeSize = size;
}

Frame.prototype.setPics = function(pic){
	this.pics = pic;
}

Frame.prototype.setNextIndex = function(){
	if (this.firstindex + this.nodex*this.nodey*2 < pics.length){
		this.firstindex = this.firstindex + this.nodex*this.nodey;
		this.nextGood = true;
		this.backGood = true;
	}
	else if (this.firstindex + this.nodex*this.nodey < pics.length && this.firstindex + this.nodex*this.nodey*2 > pics.length){
		this.firstindex = this.firstindex + this.nodex*this.nodey;
		this.nextGood = false;
	} else
		this.nextGood = false;
		
}

Frame.prototype.setBackIndex = function(){
	if (Math.abs(this.firstindex - this.nodex*this.nodey) < 0)
		this.backGood = false;
	else if (Math.abs(this.firstindex - this.nodex*this.nodey) == 0){
		this.firstindex = this.firstindex - this.nodex*this.nodey;
		this.nextGood = true;
		this.backGood = false;
	} else {
		this.firstindex = this.firstindex - this.nodex*this.nodey;
		this.nextGood = true;
		this.backGood = true;
	}
}

Frame.prototype.addAnimation = function(x,y,rn,c){
	animate = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
	animate.setAttribute('begin',rn);
	animate.setAttribute('attributeName','transform');
	animate.setAttribute('attributeType','XML');
	animate.setAttribute('type','rotate');
	animate.setAttribute('from',-2 +',' + x + ',' + y);
	animate.setAttribute('to',2 + ',' + x + ',' + y);
	animate.setAttribute('dur','0.3');
	animate.setAttribute('repeatCount','indefinite');
	c.appendChild(animate);
	this.nodes.push(c);
}