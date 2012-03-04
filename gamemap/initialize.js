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

function el(s)
{
	return document.getElementById(s);
}

function initialize(){
	//site Initialization
	document.body.setAttribute("height",window.innerHeight);
	//el('footer1').setAttribute("style",'background:#6CF; height:' + window.innerHeight*0.25);
	mouseIncrease = window.innerHeight*0.05;
	myProfile = new profile();
	
	if (getInternetExplorerVersion() === -1)
		runFancy = true;
	else
		runFancy = false;
	svg = el('svgc');
	runFancy = false;
	svg.addEventListener("mousedown",	onMD, false);
	svg.addEventListener("mousemove",	onMM, false);
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	
	//Firefox's stupidest compatibility test
	if (/Firefox/i.test(navigator.userAgent))
		document.addEventListener(mousewheelevt, onSC, false);
	else if (document.attachEvent) //if IE (and Opera depending on user setting)
		document.attachEvent("on"+mousewheelevt, onSC);
	else if (document.addEventListener) //WC3 browsers
		document.addEventListener(mousewheelevt, onSC, false);
	
	svg.addEventListener("mouseup",		onMU, false);
		
	svg.addEventListener("touchstart",	onMD, false);
	svg.addEventListener("touchend",	onMU, false);
	svg.addEventListener("touchmove",	onMM, false);
	
	h = window.innerHeight*0.7;
	w = window.innerWidth - 20;
	hw=w/2;
	hh=h/2;
	svg.setAttribute("style","width:100%; height:" + h + "px ; background:#C9F");
	mapui = new MapUI(w,h,svg);
	//mapui.addNode();
	mapui.drawAll(svg);
	liprof = new LIProfile();
	onEF();
}

function onSC(e){
	//for stupid firefox compatibility check.
	var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down

	if (delta > 0)
	{
		mapui.dv -= 2*Math.PI/360;
		mapui.stable = false;
	}
	else if (delta < 0) {
		mapui.dv += 2*Math.PI/360;
		mapui.stable = false;
	}
}

function onMD(e){
	var x = mapui.SetDragged	(mouseX(e), mouseY(e));
	if (x != 0){
		var wrapdiv = el('recommendcontact');
		var textTitle = document.getElementById('contacttitle');
		var textArea = el('contacttextarea');
		wrapdiv.setAttribute('style','position:absolute; top:40px; left:180px; opacity:0.8; z-index = 10;');
		textArea.setAttribute('style','max-height:100px; max-width:200px; z-index:10');
		textArea.focus();
		textTitle.textContent = "Notes about " + x.profile.name;
		liprof.setConnections(x.profile);
		liprof.drawAll();
	} else {
		var wrapdiv = el('recommendcontact');
		var textTitle = document.getElementById('contacttitle');
		var textArea = el('contacttextarea');
		wrapdiv.setAttribute('style','position:absolute; top:40px; left:180px; opacity:0; z-index = 1;');
		textArea.setAttribute('style','max-height:100px; max-width:200px; z-index:1');
		textArea.focus();
		textTitle.textContent = "";
		liprof.removeAll();
	}
	
	
}
function onMM(e){mapui.MoveDragged	(mouseX(e), mouseY(e));}
function onMU(e){
	mapui.StopDragging (mouseX(e), mouseY(e));
	mapui.drawAll(svg);
}

function mouseX(e)
{
	var cx;
	if(e.type === "touchstart" || e.type === "touchmove") cx = e.touches.item(0).clientX;
	else cx = e.clientX;
	return (cx);
}
function mouseY(e)
{	
	var cy;
	if(e.type === "touchstart" || e.type === "touchmove")	cy = e.touches.item(0).clientY - 25;
	else cy = e.clientY - 25;
	return (cy); 
}

function myProfile(){
	//Get my Shizzles
}

function removeNode(){
	mapui.deleteSelectedNode();
	mapui.drawAll(svg);
}

function onEF()
{
	window.requestAnimFrame(onEF, svg);
	var stable = mapui.spinIterate();
	if(stable) return;
	mapui.drawAll(svg);
}

//Checking for IE
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var browserIEVersion = -1; // Return value assumes failure.
  if (navigator.appName === 'Microsoft Internet Explorer')
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

function addMenuIndex(){
	mapui.menu.addIndex();
}

function subMenuIndex(){
	mapui.menu.subIndex();
}

function changeMode(){
	mapui.changeCircle();
}
function increaseSize(){
	mapui.increaseSize();
}
function decreaseSize(){
	mapui.decreaseSize();
}

function drop(event){
	var findex = mapui.menu.firstindex;
	var index = parseInt(event.dataTransfer.getData("Text"));
	mapui.dropNode(mouseX(event), mouseY(event), index, findex);
	event.preventDefault();
	//do shit to drop here
}
function allowDrop(event)
{
event.preventDefault();
}


function onDragEvent(event){
	var x = -1;
	for (var i = 0;i < mapui.menu.frameDiv.childNodes.length;i++)
		if (mapui.menu.frameDiv.childNodes[i] === event.target){
			x = i;
			event.dataTransfer.setData("Text",x);
			break;
		}
	
}