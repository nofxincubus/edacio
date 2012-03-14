//temp function
function onLoad(){
	x = new JoshuaMenu(200,window.innerHeight,0,0);
	
}
//Joshua Menu
//By Calvin Park
//Menu So baller its named after its designer
//Email Calvin For questions and usage nofxincubus@gmail.com
//Feel free to use just mention me in "detail" on your website

function JoshuaMenu(w, h, x, y ){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.firstindex = 0;
	this.frameDiv = document.getElementById("menulist");
	this.ulDiv = document.getElementById("menulistul");
	this.frameDiv.style.position = "absolute";
	this.frameDiv.style.overflow = "hidden";
	this.frameDiv.style.width = this.width + "px";
	this.frameDiv.style.height = this.height + "px";
	this.frameDiv.style.top = this.y + "px";
	this.frameDiv.style.left = this.x + "px";
	this.frameDiv.style.zIndex = 3;
	//change
	this.frameDiv.style.background = "#757575";
	
	
	


	this.profileList = [];
	this.nodes = [];
	this.initialize();
}

JoshuaMenu.prototype.initialize = function() {
	
	this.profileList.push(new connectionProfile(0,"company.png","Institution","","","",""));
	this.profileList.push(new connectionProfile(0,"investor.png","Investor","","","",""));
	this.profileList.push(new connectionProfile(0,"artist.png","Designer","","","",""));
	this.profileList.push(new connectionProfile(0,"programmer.png","Programmer","","","",""));
	this.profileList.push(new connectionProfile(0,"blankcategory.png","New Category","","","",""));
	this.profileList.push(new connectionProfile(0,"blankcontact.png","New Contact","","","",""));
	/*
	for (var i = 0;i < 40;i++)
		this.profileList.push(new connectionProfile(0,"blankcontact.png","New Contact" + i,"","","",""));
	*/
	this.resetList();
}

JoshuaMenu.prototype.addLinked = function(pl){
	for (var i = 0;i < pl.length;i++){
		this.profileList.push(pl[i]);
	}
	this.resetList();
}

JoshuaMenu.prototype.resetList = function() {
	for (var i = 6;i < this.profileList.length;i++){
		var listele = document.createElement('li');
		listele.style.width = this.width + "px";
		listele.style.height = "40px";
		listele.style.background = "url(listback.png)";
		listele.style.backgroundSize = "contain";
		listele.style.backgroundRepeat = "no-repeat"
		listele.style.display = "block";
		listele.style.cursor = "hand";
		listele.style.cursor = "pointer";
		listele.style.zIndex = "inherit";
		listele.draggable = true;
		listele.setAttribute('ondragstart','onDragEvent(event)');
		
		var imgdiv = document.createElement('img');
		imgdiv.src =  this.profileList[i].picURL;
		imgdiv.style.width = "38px";
		imgdiv.style.height = "38px";
		imgdiv.style.position = "relative";
		imgdiv.style.top = "1px";
		imgdiv.style.left = "1px";
		imgdiv.draggable = false;
		var name = document.createElement('p');
		name.textContent = this.profileList[i].name;
		name.style.position = "relative";
		name.style.top = "-13px";
		name.style.left = "45px";
		name.draggable = false;
		listele.appendChild(imgdiv);
		listele.appendChild(name);
		this.ulDiv.appendChild(listele);
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
	var defpadLeft = $('#menulistul li').css('paddingLeft');
	var defpadRight = $('#menulistul li').css('paddingRight');
		
	//Animate the LI on mouse over, mouse out
	$('#menulistul li').mouseover(function (){
		
		//mouse over LI and look for A element for transition
		$(this)
		.animate( { paddingLeft: padLeft, paddingRight: padRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOver }, { queue:false, duration:200 });

	}).mouseout(function () {
	
		//mouse oout LI and look for A element and discard the mouse over transition
		$(this)
		.animate( { paddingLeft: defpadLeft, paddingRight: defpadRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOut }, { queue:false, duration:200 });
	});	
	
	//Scroll the menu on mouse move above the #sidebar layer
	$('#menulist').mousedown(function(e) {

		//Sidebar Offset, Top value
		var s_top = parseInt($('#menulist').offset().top);		
		
		//Sidebar Offset, Bottom value
		var s_bottom = parseInt($('#menulist').height());
	
		//Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
		
		var lengthofList = $('#menulistul li').length;
		var menueleheight = $('#menulistul li').height();
		var mheight = parseInt( menueleheight * lengthofList);
		var currentTop = $('#menulistul').offset().top;
		//Calculate the top value
		//This equation is not the perfect, but it 's very close
		var mouseY = e.pageY;
		if (mouseY > 20 && mouseY < 150){
			if (currentTop < 0)
				$('#menulistul').animate({top: currentTop + 100}, { queue:false, duration:500});
		}
		if (mouseY > s_bottom-80 && mouseY < s_bottom + 70)
			if (Math.abs(currentTop) < mheight - window.innerHeight)
				$('#menulistul').animate({top: currentTop - 200}, { queue:false, duration:500});
			
		
		
		
	});
	//Scroll the menu on mouse move above the #sidebar layer
	$('#menulist').mouseover(function(e) {

		//Sidebar Offset, Top value
		var s_top = parseInt($('#menulist').offset().top);		
		
		//Sidebar Offset, Bottom value
		var s_bottom = parseInt($('#menulist').height());
	
		//Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
		
		var lengthofList = $('#menulistul li').length;
		var menueleheight = $('#menulistul li').height();
		var mheight = parseInt( menueleheight * lengthofList);
		var currentTop = $('#menulistul').offset().top;
		//Calculate the top value
		//This equation is not the perfect, but it 's very close
		var mouseY = e.pageY;
		if (mouseY > 20 && mouseY < 100){
			if (currentTop < 0)
				$('#menulistul').animate({top: currentTop + 100}, { queue:false, duration:500});
		}
		if (mouseY > s_bottom-80 && mouseY < s_bottom)
			if (Math.abs(currentTop) < mheight - window.innerHeight)
				$('#menulistul').animate({top: currentTop - 200}, { queue:false, duration:500});
			
		
		
		
	});
	/////////////////////////
}