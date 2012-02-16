//Edacio javascript shizzles
//made by Calvin Park//
//Take whatever I'm find with it baby.

// JavaScript Document

//Might do something useful, unknown function.. -Z
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

//Calls function getElementById
function el(s)
{
	return document.getElementById(s);
}
//Default onLoad, if internet explorer, it will not run animations (runFancy)
function onLoad(){
	var runFancy;
	if (getInternetExplorerVersion() == -1)
		runFancy = true;
	else
		runFancy = false;
	svg = document.getElementById('svgc');
	
	//Event Listener for mouse and touchscreen (tablet) clicks
	svg.addEventListener("mousedown",	onMD, false);
	svg.addEventListener("mouseup",		onMU, false);
	svg.addEventListener("touchstart",	onMD, false);
	svg.addEventListener("touchend",	onMU, false);
	
	//if not logged on to linked in:
	//TODO: Make it so the messageboxes dont come on if the user is already logged in.
	messagebox1 = new textAlert(960*0.5-10,500*0.5-100,'Login with LinkedIn by clicking on top button','linkedin');
	
	//messagebox1.setOnClick('onlogin()');
	//set colors to whatever
	//messagebox1.setTextColor('#3CC');
	//messagebox1.setShapeColor('#06C');
	
	messagebox2 = new textAlert(960*0.5+50,500*0.5+100,'Create your own contact','start');
	messagebox2.setOnClick('oncreatecontact()');
	
	fr = new Frame(150,30,960-300,500-60);
	if (runFancy){
		messagebox1.setAnimation();
		messagebox2.setAnimation();
	}
	else{
		messagebox1.setIE();
		messagebox2.setIE();
	}
	messagebox1.showText(svg);
	messagebox2.showText(svg);
}

function onlogin(){
	messagebox1.hide(svg);
	messagebox2.hide(svg);
	firstDraw()
}
//TODO: Add functionality to onCreateContact()
function oncreatecontact(){//g.StopDragging();
	messagebox1.hide(svg);
	messagebox2.hide(svg);
	
}
//TODO: Add functionality to onMD, onMU
//used for mouse events for game aspects unrelated to button clicking (dragging, multiple selection, etc.)
function onMD(e){
	//g.SetDragged	(mouseX(e)-hw, mouseY(e)-hh, 30);
}
function onMU(e){//g.StopDragging();
}
//Checking for IE
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var browserIEVersion = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      browserIEVersion = parseFloat( RegExp.$1 );
  }
  return browserIEVersion;
}
function checkVersion()
{
  var msg = "You're not using Internet Explorer.";
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver >= 8.0 ) 
      msg = "You're using a recent copy of Internet Explorer."
    else
      msg = "You should upgrade your copy of Internet Explorer.";
  }
  alert( msg );
}

function firstDraw(){
	
	fr.resetGrid();
	fr.drawAll(svg);
}
//Not used
function reDraw(){
	fr.hideExcept(svg);
	fr.resetGrid();
	fr.drawAll(svg);
}
function onLoadPics(pic){
	fr.setPics(pic);
}
function setNext() {
	fr.setNextIndex();
	reDraw();
}
function setBack() {
	fr.setBackIndex();
	reDraw();
}