// Badges Class
// Badges Class contains all the badges that exist as well as keeps track of what the user has won.
// get your bling on
// Created by Zahid Hasan: 2/18/2012

function Badges(){
	this.acquiredBadges = ("");
}

// List of all existing badges
function BadgeList{
	var BadgeList= ("GetStarted","Builder","HelloWorld","Updater","HunterGatherer");
}

//Function to add a rewarded badge to the acquired badges
function addAcquiredBadges(BadgeName){
	var badgeIndex = this.acquiredBadges.indexOf(BadgeName); //find badge index
	if(badgeIndex =-1) this.acquiredBadges.push(BadgeName); //add if not found
}

//Function to remove an rewarded badge to the acquired badges
function removeAcquiredBadges(BadgeName){
	var badgeIndex = this.acquiredBadges.indexOf(BadgeName); //find badge index
	if(badgeIndex !=-1) this.acquiredBadges.splice(badgeIndex,BadgeName); //remove if found
}
