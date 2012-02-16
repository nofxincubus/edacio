// JavaScript Document
/////UNDER CONSTRUCTION////
///////Made by Calvin

function MessageBox(x, y){
	this.x = x;
	this.padding = 10;
	this.y = y;
	this.text = "Default text";
	
	//TODO: make extra lines
	this.width = this.text.length*20;
	this.height = 100;
	//Text element
	this.textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.textElement.setAttribute('fill', 'black');
	this.textElement.setAttribute("font-size", "18");
	this.textElement.setAttribute('align','center');
	this.textElement.textContent = this.text;
	this.textElement.setAttribute('x', x + this.padding);
	this.textElement.setAttribute('y', y + this.padding);
	this.textElement.setAttribute('textLength',this.width - this.padding*2 );
	
	this.frame = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	//Setting basic attributes of the frame
	this.frame.setAttribute('fill','#ff9');
	this.frame.setAttribute('opacity',"1");
	this.frame.setAttribute('stroke',"#9f6");
	this.frame.setAttribute('stroke-width',"3");
	
	this.frame.setAttribute('x', x);
	this.frame.setAttribute('y', y);
	
	//Default radius of round corner = 15
	this.frame.setAttribute('rx', 15);
	this.frame.setAttribute('ry', 15);
	
	this.frame.setAttribute('width', this.width);
	this.frame.setAttribute('height', this.height);
}

MessageBox.prototype.setXY=function(x, y){
	this.x = x;
	this.y = y;
	this.frame.setAttribute('x', x);
	this.frame.setAttribute('y', y);
}

MessageBox.prototype.setWH=function(w, h){
	this.width = w;
	this.height = h;
	this.frame.setAttribute('width', w);
	this.frame.setAttribute('height', h);
}

MessageBox.prototype.setXY=function(x, y){
	this.x = x;
	this.y = y;
	this.frame.setAttribute('x', x);
	this.frame.setAttribute('y', y);
}

MessageBox.prototype.setText=function(txt){
	this.text = txt;
}

MessageBox.prototype.show=function(svg){
	
	svg.appendChild(this.frame);
	svg.appendChild(this.textElement);

}

MessageBox.prototype.hide=function(svg){
	var i = 0;
	while (i < svg.childNodes.length){
		if (svg.childNodes.item(i) == this.textElement){
			svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.frame){
			svg.removeChild(svg.childNodes.item(i));
		}
		i++;
	}
}