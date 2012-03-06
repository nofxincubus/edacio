//appointment.js
//By Calvin Park\
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function Appointment(title, top, childbool){
	this.wrapper = document.createElement('div');
	this.wrapper.id = "eventmaker";
	this.wrapper.style.zIndex = 6;
	this.title = title;
	this.eventTitle = document.createElement('h2');
	this.eventTitle.align = "center";
	this.eventTitle.textContent = title;
	this.fromWrapper = document.createElement('div');
	this.fromTitle = document.createElement('h3');
	this.fromTitle.textContent = "From :";
	this.fromTitle.style.position = "absolute";
	this.fromTitle.style.left = "60px";
	this.fromTitle.style.top = "30px";
	this.fromInput = document.createElement('input');
	this.fromInput.id='from';
	this.fromInput.type = "text";
	this.fromInput.style.position = "absolute";
	this.fromInput.style.left = "30px";
	this.fromInput.style.top = "70px";
	this.fromInput.style.width = "102px";
	this.fromWrapper.appendChild(this.fromTitle);
	this.fromWrapper.appendChild(this.fromInput);
	
	this.toWrapper = document.createElement('div');
	this.toTitle = document.createElement('h3');
	this.toTitle.textContent = "To :";
	this.toTitle.style.position = "absolute";
	this.toTitle.style.left = "205px";
	this.toTitle.style.top = "30px";
	this.toInput = document.createElement('input');
	this.toInput.id='to';
	this.toInput.type = "text";
	this.toInput.style.position = "absolute";
	this.toInput.style.left = "165px";
	this.toInput.style.top = "70px";
	this.toInput.style.width = "102px";
	this.toWrapper.appendChild(this.toTitle);
	this.toWrapper.appendChild(this.toInput);
	
	this.whereTitle = document.createElement('h3');
	this.whereTitle.textContent = "Where :";
	this.whereTitle.style.position = "absolute";
	this.whereTitle.style.left = "120px";
	this.whereTitle.style.top = "90px";
	this.whereInput = document.createElement('input');
	this.whereInput.style.position = "absolute";
	this.whereInput.style.left = "70px";
	this.whereInput.style.top = "130px";
	this.whereInput.style.width = "160px";
	
	this.detailTitle = document.createElement('h3');
	this.detailTitle.textContent = "Details :";
	this.detailTitle.style.position = "absolute";
	this.detailTitle.style.left = "120px";
	this.detailTitle.style.top = "145px";
	
	this.detailInput = document.createElement('textarea');
	this.detailInput.style.position = "absolute";
	this.detailInput.style.left = "30px";
	this.detailInput.style.top = "190px";
	this.detailInput.style.height = "70px";
	this.detailInput.style.width = "240px";
	this.detailInput.style.maxHeight = "70px";
	this.detailInput.style.maxWidth = "240px";

	this.submitButton = document.createElement('button');
	this.submitButton.className = "btn";
	this.submitButton.textContent = "Submit";
	this.submitButton.style.position = "absolute";
	this.submitButton.style.right = "30px";
	this.submitButton.style.bottom = "20px";
	this.submitButton.onclick = 'onEventSubmit()';
	this.submitButton.setAttribute('onclick','onEventSubmit()');
	
	this.cancelButton = document.createElement('button');
	this.cancelButton.className = "btn";
	this.cancelButton.textContent = "Cancel";
	this.cancelButton.style.position = "absolute";
	this.cancelButton.style.left = "30px";
	this.cancelButton.style.bottom = "20px";
	this.cancelButton.setAttribute('onclick','onEventCancel()');
	
	this.wrapper.appendChild(this.eventTitle);
	this.wrapper.appendChild(this.fromWrapper);
	this.wrapper.appendChild(this.toWrapper);
	this.wrapper.appendChild(this.whereTitle);
	this.wrapper.appendChild(this.whereInput);
	this.wrapper.appendChild(this.detailTitle);
	this.wrapper.appendChild(this.detailInput);
	this.wrapper.appendChild(this.submitButton);
	this.wrapper.appendChild(this.cancelButton);
	
	this.setDetail(top, childbool);
	
	document.body.appendChild(this.wrapper);
	
	$('#from').datetimepicker();
	$('#to').datetimepicker();
}

Appointment.prototype.removeAll = function(){
	for (var i = 0;i < document.body.childNodes.length;i++)
		if (document.body.childNodes[i] === this.wrapper)
			document.body.removeChild(document.body.childNodes[i]);
}
Appointment.prototype.setDetail = function(top, childBool){
	var strDetail = "Make " + this.title + " appointment with ";
	if (childBool){
		if (top.profile.id != 0)
			strDetail +=  top.profile.name + ", ";
		for (var i = 0;i < top.children.length;i++){
			if (i === top.children.length-1)
				strDetail += "and " + top.children[i].profile.name + ".";	
			else 
				strDetail += top.children[i].profile.name + ", ";
		}
	} else {
		strDetail += top.profile.name;
	}
	this.detailInput.value = strDetail;
}

Appointment.prototype.getDateString = function(){
	x = [];
	x[0] = $('#from').val();
	x[1] = $('#to').val();
	var timeStr = "";
	//put in error checker
	for (var i = 0;i < 2;i++){
	var date = new Date(x[i]);
	var month = (date.getUTCMonth()+1);
	if (month < 10)
		month = '0' + month;
	else
		month = '' + month;
	var day = date.getUTCDate();
	if (day < 10)
		day = '0' + day;
	else
		day = '' + day;
	var hour = date.getUTCHours();
	if (hour < 10)
		hour = '0' + hour;
	else
		hour = '' + hour;
	var minutes = date.getUTCMinutes();
	if (minutes < 10)
		minutes = '0' + minutes;
	else
		minutes = '' + minutes;
	var seconds = date.getUTCSeconds();
	if (seconds < 10)
		seconds = '0' + seconds;
	else
		seconds = '' + seconds;
	
	if (i === 0)
		timeStr +=  date.getFullYear() + month + day + 'T' + hour + minutes + seconds + 'Z/';
	 else
	 	timeStr += date.getFullYear() + month + day + 'T' + hour + minutes + seconds + 'Z';
	}
	return timeStr;
}




