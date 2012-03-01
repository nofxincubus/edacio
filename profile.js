// profile.js
// Profile handles user values and displays the mini profile.
// Zahid Hasan
function profile(){
this.name = "Zahid Hasan";
this.score = 0;
this.credits =0;
this.awards =0;
this.alerts=0;
}
// Add/clear scores
profile.prototype.addScore = function(delta){
 this.score += delta;
 document.getElementById("score").innerHTML= addCommas(this.score);
 //return this.score;
}
profile.prototype.clearScore = function()
{
 this.score = 0;
 addCommas(this.score);
 document.getElementById("score").innerHTML= addCommas(this.score);
 //return this.score;
}
// Add/clear credits
profile.prototype.addCredits= function(delta){
 this.credits += delta;
 document.getElementById("credits").innerHTML= addCommas(this.credits);
 //return this.score+delta;
}
profile.prototype.clearCredits = function()
{
 this.credits = 0;
 document.getElementById("credits").innerHTML= addCommas(this.credits);
 //return this.score+delta;
}
//Add/clear rewards
profile.prototype.addAwards = function(delta){
 this.awards += delta;
 document.getElementById("awards").innerHTML= addCommas(this.awards);
 //return this.score+delta;
}
profile.prototype.clearAwards = function()
{
 this.awards= 0;
 document.getElementById("awards").innerHTML= addCommas(this.awards);
 //return this.score+delta;
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
