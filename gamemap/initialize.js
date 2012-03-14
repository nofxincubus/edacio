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
	//myProfile = new profile();
	
	if (getInternetExplorerVersion() === -1)
		runFancy = true;
	else
		runFancy = false;
	svg = el('svgc');
	runFancy = false;
	document.addEventListener("mousedown",	onMD, false);
	document.addEventListener("mousemove",	onMM, false);
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	
	//Firefox's stupidest compatibility test
	if (/Firefox/i.test(navigator.userAgent))
		document.addEventListener(mousewheelevt, onSC, false);
	else if (document.attachEvent) //if IE (and Opera depending on user setting)
		document.attachEvent("on"+mousewheelevt, onSC);
	else if (document.addEventListener) //WC3 browsers
		document.addEventListener(mousewheelevt, onSC, false);
	
	document.addEventListener("mouseup",		onMU, false);
		
	document.addEventListener("touchstart",	onMD, false);
	document.addEventListener("touchend",	onMU, false);
	document.addEventListener("touchmove",	onMM, false);
	
	h = window.innerHeight - 50;
	w = window.innerWidth;
	hw=w/2;
	hh = h - 300;
	svg.setAttribute("style","width:100%; height:" + h + "px;");
	mapui = new MapUI(w,h,svg);
	//mapui.addNode();
	//setfeed = new Feeddivs();
	
	actionitem = new ActionItem();
	
	//Div style declaration for writing notes
	var writenotes = el("recommendcontact");
	writenotes.style.position = "absolute";
	writenotes.style.width = "0px";
	writenotes.style.height = "0px";
	writenotes.style.top = "0px";
	writenotes.style.opacity= 0;
	
	var notelists = el("notelist");
	notelists.style.position = "absolute";
	notelists.style.overflow = "hidden";
	notelists.style.background = "#d7d7d7";
	notelists.style.opacity= 0;
	notelists.style.zIndex = 3;
	liprof = new LIProfile();
	selectedNode =0;
	onEF();
	mapui.drawAll(svg);
		
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
	var xM = mouseX(e);
	var yM = mouseY(e);
	var ymHeight = mapui.height;
	if (mapui.selectedNode != 0 && xM > window.innerWidth-250){
		
	} else {
	selectedNode = mapui.SetDragged	(mouseX(e), mouseY(e));
	if (selectedNode != 0){
		if (selectedNode.profile.checkLastView() && !selectedNode.profile.me)
			mapui.topFocus.profile.addScore(10);
		//show list of past notes
		addNoteList();
		
		//show adding notes about person
		var wrapdiv = el('recommendcontact');
		var textTitle = document.getElementById('contacttitle');
		var textArea = el('contacttextarea');
//		wrapdiv.setAttribute('style','background:#d7d7d7;position:absolute; width:210px; height:115px; top:'+(mapui.height-87)+'px;left:180px; opacity:1; z-index:4;');
		wrapdiv.style.background = "#4a4a4a";
		wrapdiv.style.position = "absolute";
		wrapdiv.style.width = "250px";
		wrapdiv.style.height = "115px";
		wrapdiv.style.top = (window.innerHeight-120)+"px";
		wrapdiv.style.right = "0px"
		wrapdiv.style.opacity = 1;
		wrapdiv.style.zIndex = 4;
		wrapdiv.style.mozBoxShadow = "3px 3px 4px #808080"
		wrapdiv.style.boxShadow = "3px 3px 4px #808080"
		wrapdiv.style.webkitBoxShadow = "3px 3px 4px #808080"
		textArea.value = "";
		textArea.focus();
		textTitle.textContent = "Notes about " + selectedNode.profile.name;
		var plugdiv = document.getElementById("plugview");
		//display the linkedin info	
		if (selectedNode !== mapui.topFocus){
			
			plugging();
			liprof.setConnections(selectedNode.profile);
			liprof.drawAll();
			actionitem.draw();
		}
		else{
			plugdiv.style.opacity = 0;
			liprof.removeAll();
		}
	} else {
		var listdiv = el('pastnotemenu');
		while (listdiv.childNodes.length > 0)
			listdiv.removeChild(listdiv.childNodes[0]);
		el('notelist').style.opacity = 0;
		var wrapdiv = el('recommendcontact');
		var textTitle = document.getElementById('contacttitle');
		var textArea = el('contacttextarea');
		textArea.value = "";
		wrapdiv.style.opacity = 0;
		//wrapdiv.setAttribute('style','position:absolute; width:210px; height:190px; top:230px; left:180px; opacity:0; z-index:-1; background:#d7d7d7');
		textArea.focus();
		textTitle.textContent = "";
		var plugdiv = document.getElementById("plugview");
		plugdiv.style.opacity = 0;
		liprof.removeAll();
		actionitem.remove();
	}
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
	mapui.drawAll(svg);
	event.preventDefault();
	//do shit to drop here
}
function allowDrop(event)
{
	event.preventDefault();
}



function onDragEvent(event){
	var x = -1;
	for (var i = 0;i < mapui.menu.ulDiv.childNodes.length;i++)
		if (mapui.menu.ulDiv.childNodes[i] === event.target){
			x = i+5;
			event.dataTransfer.setData("Text",x);
			break;
		}
	for (var i = 0;i < mapui.oldmenu.frameDiv.childNodes.length;i++)
		if (mapui.oldmenu.frameDiv.childNodes[i] === event.target){
			x = i;
			event.dataTransfer.setData("Text",x);
			break;
		}
}

function addNotes(){
	if (selectedNode !== 0){
		var textArea = document.getElementById('contacttextarea');
		if (textArea.value.length > 1 || textArea.value != " " || textArea.value != "  "){
			var curdate = new Date();
			var month = curdate.getMonth() + 1;
			var day = curdate.getDate();
			var year = curdate.getFullYear();
			var hour = curdate.getHours();
			var minutes = curdate.getMinutes();
			var string = textArea.value +"  " + hour + ":" + minutes + " " + month + "/" + day + "/" + year;
			selectedNode.profile.appendNotes(string);
			mapui.topFocus.profile.addScore(5);
			addNoteList();
		}
		textArea.value = "";
	}
}

function addNoteList(){
	var listdiv = el('pastnotemenu');
		while (listdiv.childNodes.length > 0)
			listdiv.removeChild(listdiv.childNodes[0]);
	var notelists = el('notelist');
	notelists.style.width = "250px";
	notelists.style.height =  window.innerHeight*0.5 - 125 + "px";
	notelists.style.top = window.innerHeight*0.5+"px";
	notelists.style.right = "0px";
	notelists.style.opacity= 1;
	notelists.style.zIndex = 3;
	//Shadow is ugly with this one

	notelists.style.background = '#d7d7d7';
	for (var i = 0;i < selectedNode.profile.notes.length;i++){
		var listele = document.createElement('li');
		var paraele = document.createElement('p');
		paraele.textContent = selectedNode.profile.notes[i];
		listele.appendChild(paraele);
		listdiv.appendChild(listele);
	}
	
		//jquerystuff ///////////////
		//Background color, mouseover and mouseout
	//Background color, mouseover and mouseout
	var colorOver = '#31b8da';
	var colorOut = '#1f1f1f';

	//Padding, mouseover
	var padLeft = '20px';
	var padRight = '20px';
	
	//Default Padding
	var defpadLeft = $('#pastnotemenu li p').css('paddingLeft');
	var defpadRight = $('#pastnotemenu li p').css('paddingRight');
		
	//Animate the LI on mouse over, mouse out
	$('#pastnotemenu li').mouseover(function (){
		
		//mouse over LI and look for A element for transition
		$(this).find('p')
		.animate( { paddingLeft: padLeft, paddingRight: padRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOver }, { queue:false, duration:200 });

	}).mouseout(function () {
	
		//mouse oout LI and look for A element and discard the mouse over transition
		$(this).find('p')
		.animate( { paddingLeft: defpadLeft, paddingRight: defpadRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOut }, { queue:false, duration:200 });
	});	
	
	//Scroll the menu on mouse move above the #sidebar layer
	$('#notelist').mousemove(function(e) {

		//Sidebar Offset, Top value
		var s_top = parseInt($('#notelist').offset().top);		
		
		//Sidebar Offset, Bottom value
		var s_bottom = parseInt($('#notelist').height());
	
		//Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
		var lengthofList = $('#pastnotemenu li').length;
		var menueleheight = $('#pastnotemenu li').height();
		var mheight = parseInt( menueleheight * lengthofList);
			
		//Calculate the top value
		//This equation is not the perfect, but it 's very close
		var mouseY = e.pageY;	
		var top_value = Math.round(( (s_top - mouseY) /(100)) * mheight *0.5);
		
		//Animate the #menu by chaging the top value
		$('#pastnotemenu').animate({top: top_value}, { queue:false, duration:500});
	});
	/////////////////////////
}

function onEventSubmit(){
	
	app.removeAll();
	/*
	el('catcher').style.zIndex = 2;
	el('catcher').style.background = "#000";
	el('catcher').style.opacity = 0;
	*/
}

function onEventCancel(){
	app.removeAll();
	/*
	el('catcher').style.zIndex = 2;
	el('catcher').style.background = "#000";
	el('catcher').style.opacity = 0;
	*/
}

function coffeeEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Coffee", selectedNode, true);
		selectedNode.updateTime();
		mapui.topFocus.profile.addScore(1000);
		mapui.drawAll(svg);
		plugging();
	}
}

function lunchEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Lunch", selectedNode, true);
		selectedNode.updateTime();
		mapui.topFocus.profile.addScore(2000);
		mapui.drawAll(svg);
		plugging();
	}
}

function textEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Text Message", selectedNode, true);
		selectedNode.updateTime();
		mapui.topFocus.profile.addScore(100);
		mapui.drawAll(svg);
		plugging();
	}
}

function callEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Phone Call", selectedNode, true);
		selectedNode.updateTime();
		mapui.topFocus.profile.addScore(500);
		mapui.drawAll(svg);
		plugging();
	}
}

function emailEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Email", selectedNode, true);
		selectedNode.updateTime();
		mapui.topFocus.profile.addScore(50);
		mapui.drawAll(svg);
		plugging();
	}
}

function meetingEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
	app = new Appointment("Meeting", selectedNode, true);
	selectedNode.updateTime();
	mapui.topFocus.profile.addScore(3000);
		mapui.drawAll(svg);
	plugging();
	}
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function plugging() {
	if (selectedNode != mapui.topFocus){
			var plugdiv = document.getElementById("plugview");
			plugdiv.style.opacity = 1;
			if (selectedNode.profile.getNotify())
				plugdiv.style.background = "url(unplugged.png)";
			else 
				plugdiv.style.background = "url(plugged.png)";
			if (selectedNode.profile.lastConnected === 0)
				document.getElementById("plugdesc").textContent = "Never!"
			else{
				var today = new Date();
				var dayz = parseInt((today.UTC-selectedNode.profile.lastConnected.getTime())/86400000);
				document.getElementById("plugdesc").textContent = dayz + " days since you connected.";
			}
	}
	else{
		plugdiv.style.opacity = 0;
	}
}