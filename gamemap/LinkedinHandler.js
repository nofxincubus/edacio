// LinkedinHandler Class
// LinkedinHandler handles all the information collection and managemnet between the Linkedin API and Edacio's services.
// better wash your hands after
// Created by Zahid Hasan
// 2/16/2012

function onLinkedInLoad() {
	IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
	IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
}
	
function onLinkedInLogin(){
	IN.API.Connections("me")
	.fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl")
	.result(function(result, metadata) {
	setConnections(result.values, metadata);
	});
}
	
function setConnections(connections) {
	i = 0;
	pics =[];
	names = [];
	for (id in connections) {
		if(connections[id].hasOwnProperty('pictureUrl')){
			pics.push(connections[id].pictureUrl);
			names.push(connections[id].firstName + " " + connections[id].lastName);
		}
		else{
			pics.push("http://static02.linkedin.com/scds/common/u/img/icon/icon_no_photo_80x80.png");
			names.push(connections[id].firstName + " " + connections[id].lastName);
		}
		i++;
	}
	mapui.menu.addLinked(pics,names);
}
