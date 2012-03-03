// challenges Class
// Challenges contains all challenges, metrics to accomplish the task, as well as rewards given for completion.
// Created by Zahid Hasan: 2/17/2012

//initialization
function challenges()
{
	this.viewsCompleted = 0;
	this.organizesCompleted =0;
	this.greetsCompleted = 0;
	this.updatesCompleted = 0;
	this.comparesCompleted =0;
	this.challengeList = [];
	this.challengeList.push(new challengeStructure("Get started!", 1, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0));
}

function challengeStructure(name, viewsRequired, organizesRequired, greetsRequired, updatesRequired, comparesRequired, levelReward, XPReward, creditsReward, skillPointsReward, karmaPointsReward, badgeFlag)
{
	//challenge name
	this.name= name;
	//challenge demands
	this.viewsRequired= viewsRequired;
	this.organizesRequired= organizesRequired;
	this.greetsRequired= greetsRequired;
	this.updateRequired= updatesRequired;
	this.comparesRequired= comparesRequired;
	//challenge rewards
	this.levelReward= levelReward; 
	this.XPReward= XPReward;
	this.creditsReward= creditsReward;
	this.skillPointsReward= skillPointsReward;
	this.karmaPointsReward= karmaPointsReward;
	this.badgeFlag= badgeFlag;
}
// ChallengeList organizing the tasks needed to complete a challenge, the rewards reeped for completing a challenge, and any flags that need to be triggered within the game.
// challenges(view, organize, greet, update info, compare)
// rewards (xps, skill, karma, credits, levels)
// flag(badge list, lockouts, new skill sets)

// Temporary initalizing challenge 
function ChallengesList(){
//Upload to Server// will be on server

//List of +1 challenges to test all challenge types
var GetStartedChallenge = {name: "Get started!", viewsRequired: 1, organizesRequired: 0, greetsRequired: 0, updatesRequired: 0, comparesRequired: 0, levelReward: 0, XPReward: 100, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeFlag: 0};

var BuilderChallenge = {name: "Build it!", viewsRequired: 0, organizesRequired: 1, greetsRequired: 0, updatesRequired: 0, comparesRequired: 0, levelReward: 0, XPReward: 500, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeFlag: 0};

var HelloWorldChallenge = {name: "Hello World!", viewsRequired: 0, organizesRequired: 0, greetsRequired: 1, updatesRequired: 0, comparesRequired: 0, levelReward: 0, XPReward: 1000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeFlag: 0};

var UpdaterChallenge = {name: "What do you know!", viewsRequired: 0, organizesRequired: 0, greetsRequired: 0, updatesRequired: 1, comparesRequired: 0, levelReward: 0, XPReward: 5000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeFlag: 0};

var HunterGathererChallenge = {name: "Hunter Gatherer!", viewsRequired: 0, organizesRequired: 0, greetsRequired: 0, updatesRequired: 0, comparesRequired: 1, XPReward: 15000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeFlag: 0};
}

//Clear all challenges in a given category
//Server Database for keeeping traking of challenge that are already completed
//c
challenges.prototype.ClearCompletedChallenges = function(challengesCompleted){
// TODO : When server works : update the user challenge completed database with erhte challenge.
}

//Delta challeneges changes the completed challenges by delta
challenges.prototype.DeltaCompletedChallenges = function(challengesCompleted, delta){
this.challengesCompleted += delta;
}

//import from server
challenges.prototype.importData = function(json){
	//TODO : Server data import
}
//A test for adding listed elements in the miniChallenges box
challenges.prototype.generateText = function()
{
	var x = this.challengeList[0].name;
		document.getElementById('challengeList').innerHTML = x;
}