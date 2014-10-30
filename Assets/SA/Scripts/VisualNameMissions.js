#pragma strict

function Start ()
{

	var vMissions : UILabel = gameObject.transform.GetComponent(UILabel);
	
	if (transform.parent.name == "0")
		vMissions.text = "Introduction";
		
	else if (transform.parent.name == "1")
		vMissions.text = "Speed Tutorial";
	
	else if (transform.parent.name == "2")
		vMissions.text = "Repair Tutorial";
		
	else if (transform.parent.name == "3")
		vMissions.text = "Collecting Tutorial";
		
	else if (transform.parent.name == "4")
		vMissions.text = "Test The Waters!";
		
	else if (transform.parent.name == "5")
		vMissions.text = "The Star Gates";

	else if (transform.parent.name == "6")
		vMissions.text = "The Unknown";
		
	else if (transform.parent.name == "7")
		vMissions.text = "PVP Tutorial";
		
	else if (transform.parent.name == "8")
		vMissions.text = "A New Friend!";

	else if (transform.parent.name == "9")
		vMissions.text = "The outter limits";
		
	else if (transform.parent.name == "10")
		vMissions.text = "Finally safe?";
		
	else if (transform.parent.name == "11")
		vMissions.text = "Fortification!";
		
	else if (transform.parent.name == "12")
		vMissions.text = "Krul History";
		
	else if (transform.parent.name == "13")
		vMissions.text = "The Population";
		
	else if (transform.parent.name == "14")
		vMissions.text = "Switching Sides";
		
	else if (transform.parent.name == "15")
		vMissions.text = "Anticipation";
		
	else if (transform.parent.name == "16")
		vMissions.text = "Poker Face!";
}

function Update ()
{

	var vMissions : UISprite = gameObject.transform.parent.GetComponent(UISprite);
	
	if (parseInt(transform.parent.name) <= parseInt(HUD.usrsmComplete))
		vMissions.color.a = 1;
	
	else
		vMissions.color.a = .5;
}