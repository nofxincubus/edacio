// JavaScript Document

function ConnectionProfile(tagname){
	
}

function onLinkedInLoad() {
  IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
  IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
}

function onLinkedInLogout() {
  setConnections({}, {total:0});
}

function onLinkedInLogin() {
  // here, we pass the fields as individual string parameters
  IN.API.Connections("me")
    .fields("id", "firstName", "lastName", "pictureUrl", "publicProfileUrl","currentShare","headline")
    .result(function(result, metadata) {
      setConnections(result.values, metadata);
    });
}

function setConnections(connections) {
  var connHTML = "<ul>";
  for (id in connections) {
    connHTML = connHTML + "<li><a href=\"" + connections[id].publicProfileURL + "\">";
    
    /* picture url not always there, must be defensive */
    if (connections[id].hasOwnProperty('pictureUrl')) {
      connHTML = connHTML + "<img align=\"baseline\" src=\"" + connections[id].pictureUrl + "\"></a>";
    }  else {
      connHTML = connHTML + "<img align=\"baseline\" src=\"http://static02.linkedin.com/scds/common/u/img/icon/icon_no_photo_80x80.png\"></a>";
    }
    
    connHTML = connHTML + "&nbsp;<a href=\"" + connections[id].publicProfileUrl + "\">";
    connHTML = connHTML + connections[id].firstName + " " + connections[id].lastName + "</a>";
    connHTML = connHTML + " (memberToken: " + connections[id].id + ")</li>";
	document.body.appendChild(connections[id].currentShare);	
  }

  connHTML = connHTML + "</ul>";
  document.getElementById("connectionsdata").innerHTML = connHTML;
}

//headline
//firstName
//lastName
//currentShare