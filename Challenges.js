// challenges Class
// Challenges contains all challenges, metrics to accomplish the task, as well as rewards given for completion.
// Created by Zahid Hasan: 2/17/2012

//initialization of styles
function setupChallengeStyle()
{
	var x = document.getElementById('miniChallenges');
	x.setAttribute('style',"float:right;width:300px;height:420px;background-color:lightgrey;-moz-border-radius: 15px;border-radius: 15px;");
	//document.body.setAttribute('style',"background-color:SkyBlue;");
	//document.getElementsByClassName(.setAttribute('style',"background:red;width:;");

}
//initialization of variables
function challenges()
{
	this.viewsCompleted = 0;
	this.organizesCompleted =0;
	this.greetsCompleted = 0;
	this.updatesCompleted = 0;
	this.comparesCompleted =0;
	this.challengeList = [];
	this.challengeList.push(new challengeStructure("Get started!", 1, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0));
	this.challengeList.push(new challengeStructure("Build it!", 0, 1, 0, 0, 0, 0, 500, 0, 0, 0, 0));
	this.challengeList.push(new challengeStructure("Hello World!", 0, 0, 1, 0, 0, 0, 5000, 0, 0, 0, 0));
	this.challengeList.push(new challengeStructure("Hunter!", 0, 0, 0, 1, 0, 0, 15000, 0, 0, 0, 0));
}
// Create minichallenges list html and css 
challenges.prototype.createChallenges =function(challengeStruct)
{
	for(var challengeCount = 0; challengeCount<5; challengeCount++)
	{
		var challengeListItem = document.createElement('div');
		challengeListItem.setAttribute('id', "challengeListItem");
		challengeListItem.setAttribute('style', "width:300px;height:60px;");
		challengeListItem.innerHTML='<img style="position:relative;top:3px;" src="awardsNo.png"/><h4><b  style="position:relative;top:-60px;left:50px;">'+challengeStruct[challengeCount].name+'</b></h4>'
			+'<h5><font id="view"  style="position:relative;top:-105px;left:150px;text-align:right;">View:</font><font  id="organize" style="position:relative;top:-105px;left:180px;text-align:right;">Organize:</font></h5>'
			+'<h5><font id="greet" style="position:relative;top:-115px;left:145px;text-align:right;">Greet:</font><font id="update" style="position:relative;top:-115px;left:190px;">Update:</font></h5>'
			+'<h4><font id="viewValue"  style="position:relative;top:-183px;left:195px;text-align:right;">'+challengeStruct[challengeCount].viewsRequired+'</font><font id="organizeValue"  style="position:relative;top:-183px;left:275px;text-align:right;">'+challengeStruct[challengeCount].organizesRequired+'</font></h4>'
			+'<h4><font id="greetValue"  style="position:relative;top:-196px;left:195px;text-align:right;">'+challengeStruct[challengeCount].greetsRequired+'</font><font id="updateValue"  style="position:relative;top:-196px;left:275px;text-align:right;">'+challengeStruct[challengeCount].updatesRequired+'</font></h4>';

		document.getElementById("challengeList").appendChild(challengeListItem);
	}
}

function challengeStructure(name, viewsRequired, organizesRequired, greetsRequired, updatesRequired, comparesRequired, levelReward, XPReward, creditsReward, skillPointsReward, karmaPointsReward, badgeFlag)
{
	//challenge name
	this.name= name;
	//challenge demands
	this.viewsRequired= viewsRequired;
	this.organizesRequired= organizesRequired;
	this.greetsRequired= greetsRequired;
	this.updatesRequired= updatesRequired;
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

/* this shit is dead
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
*/
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

