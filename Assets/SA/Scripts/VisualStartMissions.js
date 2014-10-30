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
		Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,parseInt(transform.parent.name));
	}
}