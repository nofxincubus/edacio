// Challenges Class
// Challenges contains all challenges, metrics to accomplish the task, as well as rewards given for completion.
//yo mama is a challenge
// Created by Zahid Hasan: 2/17/2012

function Challenges(){
this.viewsCompleted = 0;
this.organizesCompleted =0;
this.greetsCompleted = 0;
this.updatesCompleted = 0;
this.comparesCompleted =0;
}

// ChallengeList organizing the tasks needed to complete a challenge, the rewards reeped for completing a challenge, and any flags that need to be triggered within the game.
// challenges(view, organize, greet, update info, compare)
// rewards (xps, skill, karma, credits, levels)
// flag(badge list, lockouts, new skill sets)

ChallengeList(){

//List of +1 challenges to test all challenge types
var GetStartedChallenge = {name: "Get started!", viewsRequired: 1, oganizesRequired: 0, greetsRequired: 0, updatesRequired: 0, comparesCompleted: 0, levelReward: 0, XPReward: 100, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeReward: "GetStarted"};

var BuilderChallenge = {name: "Build it!", viewsRequired: 0, oganizesRequired: 1, greetsRequired: 0, updatesRequired: 0, comparesCompleted: 0, levelReward: 0, XPReward: 500, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeReward: "Builder"}};

var HelloWorldChallenge = {name: "Hello World!", viewsRequired: 0, oganizesRequired: 0, greetsRequired: 1, updatesRequired: 0, comparesCompleted: 0, levelReward: 0, XPReward: 1000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeReward: "HelloWorld"};

var UpdaterChallenge = {name: "What do you know!", viewsRequired: 0, oganizesRequired: 0, greetsRequired: 0, updatesRequired: 1, comparesCompleted: 0, levelReward: 0, XPReward: 5000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeReward: "Updater"};

var HunterGathererChallenge = {name: "Get started!", viewsRequired: 0, oganizesRequired: 0, greetsRequired: 0, updatesRequired: 0, comparesCompleted: 1, XPReward: 15000, creditsReward: 0, skillPointsReward: 0, karmaPointsReward: 0, badgeReward: "HunterGatherer"};

}

//Clear all challenges in a given category
function ClearCompletedChallenges(challengesCompleted){

this.challengesCompleted = 0;
this.challengesCompleted;
}
//Delta challeneges changes the completed challenges by delta
function DeltaCompletedChallenges(challengesCompleted, delta){S
this.challengesCompleted += delta;
}
