#pragma strict

function Start ()
{

}

function Update ()
{

}

function startMission()
{
	if (parseInt(transform.parent.name) == parseInt(HUD.usrsmComplete))
	{
		HUD.QuestsMenu = false;
		Camera.main.GetComponent(HUD).EngageSMrequest(parseInt(transform.parent.name));
	}
}