// User Class
// This function is responsible for keeping track of user information and managing the user resource dynamics.
// Created by Zahid Hasan
// 2/15/2012

function User(){
	// User Identification Information
	this.name = '';
	this.birthDate = '';
	this.emailAddress = '';
	
	// User Network Information
	this.contactsNum = 0;
	
	// User Game Information
	this.level = 0; // Current user level
	this.XP =0; // Experience points (IMPORTANT used to watch, rank, and guide players)
	this.credits = 0; // Redeemable points (usable for virtual goods/services)
	this.skillPoints = 0; // Used to unlock more actions and capabilities
	this.karmaPoints = 0; // No other benefit other than to show player altruistic worth
	
}
User.prototype.addPoints=function(pointType,delta){
    switch(pointType){
	case 'level':
		this.level += delta;
		break;
	case 'XP':
		this.XP += delta;
		break;
	case 'credits':
		this.credits += delta;
		break;
	case 'skillPoints':
		this.skillPoints += delta;
		break;
	case 'karmaPoints':
		this.karmaPoints += delta;
		break;
	default:
	helpme = textAlert("I have fucked up.")
	helpmeTextAlert = new textAlert(960*0.5+50,500*0.5+100,'I have fucked up (regarding the pointType switch statement','start')
	}
}

User.prototype.removePoints=function(pointType,delta){
    switch(pointType){ //Check the point type, and add the 
	case 'level':
		this.level -= delta;
		break;
	case 'XP':
		this.XP -= delta;
		break;
	case 'credits':
		this.credits -= delta;
		break;
	case 'skillPoints':
		this.skillPoints -= delta;
		break;
	case 'karmaPoints':
		this.karmaPoints -= delta;
		break;
	default:
	helpme = textAlert("I have fucked up.")
	helpmeTextAlert = new textAlert(960*0.5+50,500*0.5+100,'I have fucked up (regarding the pointType switch statement','start')
	}
}

User.prototype.setPoints=function(pointType, setValue){
    switch(pointType){ //Check the point type, and add the 
	case 'level':
		this.level = setValue;
		break;
	case 'XP':
		this.XP = setValue;
		break;
	case 'credits':
		this.credits = setValue;
		break;
	case 'skillPoints':
		this.skillPoints = setValue;
		break;
	case 'karmaPoints':
		this.karmaPoints = setValue;
		break;
	default:
	helpme = textAlert("I have fucked up.")
	helpmeTextAlert = new textAlert(960*0.5+50,500*0.5+100,'I have fucked up (regarding the pointType switch statement','start')
	}
}
