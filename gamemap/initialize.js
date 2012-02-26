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
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
 
	
	//Firefox's stupidest compatibility test
	if (/Firefox/i.test(navigator.userAgent))
		document.addEventListener(mousewheelevt, onSC, false);
	else if (svg.attachEvent) //if IE (and Opera depending on user setting)
		svg.attachEvent("on"+mousewheelevt, onSC);
	else if (svg.addEventListener) //WC3 browsers
		svg.addEventListener(mousewheelevt, onSC, false);
	
	svg.addEventListener("mouseup",		onMU, false);
		
	svg.addEventListener("touchstart",	onMD, false);
	svg.addEventListener("touchend",	onMU, false);
	svg.addEventListener("touchmove",	onMM, false);
	w = window.innerWidth-20;
	svg.setAttribute("width",w);
	svg.setAttribute("height",600);
	mapui = new MapUI(w,600);
	//mapui.addNode();
	mapui.drawAll(svg);
	onEF();
}

function onSC(e){
	//for stupid firefox compatibility check.
	var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down

	if (delta > 0)
	{
		mapui.dv -= 1;
		mapui.stable = false;
	}
	else if (delta < 0) {
		mapui.dv += 1;
		mapui.stable = false;
	}
	
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

function onEF()
{
	window.requestAnimFrame(onEF, svg);
	var stable = mapui.Iterate();
	if(stable) return;
	mapui.drawAll(svg);
}

