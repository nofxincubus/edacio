// LinkedIn Drap and Drop Menu
// By Calvin park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LinkMenu(w, h) {
	this.width = w;
	this.height = h;
	//initialization of variables
	//group
	this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.frame = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	//blank node
	this.blanknode = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.group.appendChild(this.frame);
	this.group.appendChild(this.blanknode);
	this.initialize();
}

LinkMenu.prototype.initialize = function() {
	
	//Setting basic attributes of the frame
	this.frame.setAttribute('fill',"white");
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
	
	this.blanknode.setAttributeNS(this.xlinkns, 'xlink:href', imagelink);
	this.blanknode.setAttribute("style", "cursor:pointer;");
	this.blanknode.setAttribute("width", "70");
	this.blanknode.setAttribute("height", "70");
	this.blanknode.setAttribute("z-index",3);
}

LinkMenu.prototype.getMenu = function(){
	return this.group;
}
