// LinkedinHandler Class
// Included headlines, locations, and current status

function onLinkedInLoad() {
	IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
	IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
}
	
function onLinkedInLogin(){
	IN.API.Connections("me")
	.fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl","currentShare","headline","location")
	.result(function(result, metadata) {
	setConnections(result.values, metadata);
	});
	IN.API.Profile("me")
	.fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl","currentShare","headline","location")
	.result(function(result, metadata) {
	setMe(result.values, metadata);
	});
}
	
function setConnections(connections) {
	i = 0;
	profileList =[];
	for (id in connections) {
		var pic = "tempme.png";
		var name = connections[id].firstName + " " + connections[id].lastName;
		if(connections[id].hasOwnProperty('pictureUrl')){
			pic = connections[id].pictureUrl;
		}
		var curStat = "";
		var loc = "";
		if (connections[id].currentShare)
			curStat = connections[id].currentShare.comment;
		if (connections[id].location)
			loc = connections[id].location.name
		var cprof = new connectionProfile(connections[id].id,pic,name,connections[id].headline,
		loc,curStat,connections[id].publicProfileUrl);
		profileList.push(cprof);
		
		i++;
	}
	mapui.menu.addLinked(profileList);
}
function setMe(connections) {
	i = 0;
	profileList =[];
	for (id in connections) {
		var pic = "tempme.png";
		var name = connections[id].firstName + " " + connections[id].lastName;
		if(connections[id].hasOwnProperty('pictureUrl')){
			pic = connections[id].pictureUrl;
		}
		var curStat = "";
		var loc = "";
		if (connections[id].currentShare)
			curStat = connections[id].currentShare.comment;
		if (connections[id].location)
			loc = connections[id].location.name
		var cprof = new connectionProfile(connections[id].id,pic,name,connections[id].headline,
		loc,curStat,connections[id].publicProfileUrl);
		profileList.push(cprof);
		
		i++;
	}
	mapui.resetTopNodes(profileList[0]);
}
