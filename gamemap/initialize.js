//MAP UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

//Initialize Map Interface!
requestAnimFrame = (
		function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000/60);
			};
		})();

function initialize(){
	svg = document.getElementById('svgc');

	svg.addEventListener("mousedown",	onMD, false);
	svg.addEventListener("mousemove",	onMM, false);
	svg.addEventListener("mouseup",		onMU, false);
		
	svg.addEventListener("touchstart",	onMD, false);
	svg.addEventListener("touchend",	onMU, false);
	svg.addEventListener("touchmove",	onMM, false);
	
	svg.setAttribute("width",3000);
	svg.setAttribute("height",600);
	mapui = new MapUI(3000,600);
	//mapui.addNode();
	mapui.drawAll(svg);
}

function onMD(e){
	
}
function onMM(e){mapui.getMousePos(e.clientX,e.clientY);
}
function onMU(e){//g.StopDragging();
}

function myProfile(){
	//Get my Shizzles
}

function addNode(){
	var name=prompt("Please enter the name","GlaDos");
	mapui.addNode(name);
	mapui.drawAll(svg);
}

