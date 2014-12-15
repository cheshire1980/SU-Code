#pragma strict

var eventsWindow : GameObject;

function eventsWindowSwitch ()
{
	if (eventsWindow.active == true)
		eventsWindow.SetActive(false);
		
	else if (eventsWindow.active == false)
	{
		Camera.main.networkView.RPC ("requestSEInfo", RPCMode.Server);
		eventsWindow.SetActive(true);
	}
}

function missionsWindow ()
{
	if (HUD.QuestsMenu == false)
	{
		//s1.SetActiveRecursively(true);
		//s1.SetActive(true);
		HUD.QuestsMenu = true;
		//StoryQuestsMenu.QuestsMenu = true;
	}
	else if (HUD.QuestsMenu == true)
	{
		//s1.SetActiveRecursively(false);
		//s1.SetActive(true);
		HUD.QuestsMenu = false;
		//StoryQuestsMenu.QuestsMenu = false;
	}
}

function cancelMission ()
{
	Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
}