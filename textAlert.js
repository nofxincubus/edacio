// JavaScript Document
//created by Calvin park
//Feel free to take and use and edit.
////NEED MORE WORK AT DIFFERNT PLACES AND NUMBER THINGS

function textAlert(x, y, txt, buttontxt){
	
	this.padding = 10;
	this.text = txt;
	this.buttonText = buttontxt;
	this.x = x - this.text.length*7;
	this.y = y;
	
	
	//Line element
	//x1,y1,x2,y2, Color,FillStroke, Graphics, Markers

	this.lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	this.lineElement.setAttribute('style', 'stroke:#CCF;stroke-width:4');
	this.lineElement.setAttribute('x1', this.x);
	this.lineElement.setAttribute('y1', this.y+7);
	this.lineElement.setAttribute('x2', this.x);
	this.lineElement.setAttribute('y2', this.y+7);
	
	
	this.animate1 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	this.animate1.setAttribute('attributeName','x2');
	this.animate1.setAttribute('attributeType','XML');
	this.animate1.setAttribute('begin',1);
	this.animate1.setAttribute('from',this.x);
	if (buttontxt == 'linkedin')
		this.animate1.setAttribute('to',this.x + this.text.length*15.5);
	else
		this.animate1.setAttribute('to',this.x + this.text.length*20);
	
	this.animate1.setAttribute('dur','1s');
	this.animate1.setAttribute('fill','freeze');

	
	//default color green
	//Text element
	this.textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.textElement.setAttribute('fill', '#3C0');
	this.textElement.setAttribute('font-size', '30');
	this.textElement.textContent = this.text;
	this.textElement.setAttribute('x', this.x);
	this.textElement.setAttribute('y', this.y);
	
	this.animate2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	this.animate2.setAttribute('attributeName','opacity');
	this.animate2.setAttribute('attributeType','CSS');
	this.animate2.setAttribute('from','0');
	this.animate2.setAttribute('to','1');
	this.animate2.setAttribute('dur','1s');
	this.animate2.setAttribute('fill','freeze');
	
	
	
	
	
	if (buttontxt != 'linkedin'){
		//ButtonRect element	
		this.buttonRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.buttonRect.setAttribute('fill', '#CCF');
		this.buttonRect.setAttribute("style", "cursor:pointer;");
		this.buttonRectPosX = this.x + this.text.length*20-23;
		this.buttonRectPosY = this.y+8;
		this.buttonRect.setAttribute('width',23);
		this.buttonRect.setAttribute('height',0);
		this.buttonRect.setAttribute('x', this.buttonRectPosX);
		this.buttonRect.setAttribute('y', this.buttonRectPosY);
		
		this.animate4 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
		this.animate4.setAttribute('attributeName','height');
		this.animate4.setAttribute('attributeType','XML');
		this.animate4.setAttribute('begin','2s');
		this.animate4.setAttribute('from','0');
		this.animate4.setAttribute('to','53');
		this.animate4.setAttribute('dur','1s');
		this.animate4.setAttribute('fill','freeze');
		
		
		//ButtonText element	
		this.buttonText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.buttonText.setAttribute('fill', '#3C0');
		this.buttonText.setAttribute('font-size', '20');
		this.buttonText.setAttribute("style", "cursor:pointer;");
		this.buttonText.setAttribute("opacity", "0");
		this.buttonText.textContent = 'click';
		//Button Text
	
		this.buttonTextPosX = this.x + this.text.length*20-17;
		this.buttonTextPosY = this.y+12;
		this.buttonText.setAttribute('x', this.buttonTextPosX);
		this.buttonText.setAttribute('y', this.buttonTextPosY);
		this.buttonText.setAttribute('transform', 'rotate(90,' + this.buttonTextPosX + ',' + this.buttonTextPosY + ')');
		
		this.animate3 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
		this.animate3.setAttribute('attributeName','opacity');
		this.animate3.setAttribute('attributeType','CSS');
		this.animate3.setAttribute('begin','2s');
		this.animate3.setAttribute('from','0');
		this.animate3.setAttribute('to','1');
		this.animate3.setAttribute('dur','1s');
		this.animate3.setAttribute('fill','freeze');
	}
		
	
}

textAlert.prototype.setAnimation = function(){
	this.lineElement.appendChild(this.animate1);
	this.textElement.appendChild(this.animate2);
	if (this.buttonText != 'linkedin'){
		this.buttonText.appendChild(this.animate3);
		this.buttonRect.appendChild(this.animate4);
	}
	
}

textAlert.prototype.setIE = function(){
	this.lineElement.setAttribute('x2', this.x + this.text.length*20);
	this.buttonRect.setAttribute('height',53);
	this.buttonText.setAttribute("opacity", "1");
}

textAlert.prototype.showText = function(svg){
	//this.buttonRect.appendChild(this.buttonText);
	svg.appendChild(this.textElement);
	svg.appendChild(this.lineElement);
	if (this.buttonText != 'linkedin'){
	svg.appendChild(this.buttonRect);
	svg.appendChild(this.buttonText);
	}
}


textAlert.prototype.hide = function(svg){
	this.textElement.removeChild(this.textElement.firstChild);
	var i = 0;
	while (i < svg.childNodes.length){
		if (svg.childNodes.item(i) == this.textElement){
			svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.lineElement){
			svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.buttonRect){
			svg.removeChild(svg.childNodes.item(i));
		}
		if (svg.childNodes.item(i) == this.buttonText){
			svg.removeChild(svg.childNodes.item(i));
		}
		i++;
	}
}

textAlert.prototype.setTextColor = function(color){
	this.textElement.setAttribute('fill', color);
	this.buttonText.setAttribute('fill', color);
}
textAlert.prototype.setShapeColor = function(color){
	this.lineElement.setAttribute('style', 'stroke:'+color+';stroke-width:4');
	this.buttonRect.setAttribute('fill', color);
}

textAlert.prototype.setText = function(txt){
	this.text = txt;
	this.textElement.textContent = this.text;
}

textAlert.prototype.setOnEnd = function(onend){
	//doesn't really work yet so fix;
	this.animate4.setAttribute('onend','secondmessage()');
	//this.animate3.setAttribute('onend',onend);
}

textAlert.prototype.setOnClick = function(onclick){
	//doesn't really work yet so fix;
	this.buttonRect.setAttribute('onclick',onclick);
	this.buttonText.setAttribute('onclick',onclick);
	//this.animate3.setAttribute('onend',onend);
}
