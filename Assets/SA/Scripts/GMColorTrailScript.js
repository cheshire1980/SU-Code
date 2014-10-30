#pragma strict

function Start ()
{
	var newTrails : String;

	if (HUD.usrGM == 1)
		newTrails = "GMTrails";
	else if (HUD.usrGM == 2)
		newTrails = "GMTrails";
	else if (HUD.usrGM == 3)
		newTrails = "CMTrails";
	else if (HUD.usrGM == 4)
		newTrails = "DEVTrails";

	if (gameObject.name == HUD.usrAccount)
	{
		if (HUD.usrGM == 1)
			newTrails = "GMTrails";
		else if (HUD.usrGM == 2)
			newTrails = "GMTrails";
		else if (HUD.usrGM == 3)
			newTrails = "CMTrails";
		else if (HUD.usrGM == 4)
			newTrails = "DEVTrails";
		
		if (HUD.usrGM > 0)
		{
			Destroy(GameObject.Find(gameObject.name + "/Trails"));
								
			for (var child : Transform in transform)
			{
				if (child.name == newTrails)
					child.gameObject.SetActive(true);
			}
		}
	}
	
	else
	{
		if (gameObject.GetComponent(PlayerMovement).gm == 1)
			newTrails = "GMTrails";
		else if (gameObject.GetComponent(PlayerMovement).gm == 2)
			newTrails = "GMTrails";
		else if (gameObject.GetComponent(PlayerMovement).gm == 3)
			newTrails = "CMTrails";
		else if (gameObject.GetComponent(PlayerMovement).gm == 4)
			newTrails = "DEVTrails";
		
		if (gameObject.GetComponent(PlayerMovement).gm > 0)
		{
			Destroy(GameObject.Find(gameObject.name + "/Trails"));
								
			for (var child : Transform in transform)
			{
				if (child.name == newTrails)
					child.gameObject.SetActive(true);
			}
		}
	}
}
