#pragma strict

var gmcButton : GameObject;
var gmcConsole : GameObject;

function toggleGMC ()
{
	if (gmcConsole.active == true)
		gmcConsole.SetActive(false);
		
	else if (gmcConsole.active == false)
		gmcConsole.SetActive(true);
		
	/*if (HUD.gmcFlag == true)
		HUD.gmcFlag = false;
		
	else if (HUD.gmcFlag == false)
		HUD.gmcFlag = true;*/
}

function sendCMD ()
{
	Camera.main.networkView.RPC ("GMC", RPCMode.Server, GameObject.Find("UI Root/UI_GMCAnchor/UI_GMCPanel/GMC/Input/Label").GetComponent(UILabel).text);
	GameObject.Find("UI Root/UI_GMCAnchor/UI_GMCPanel/GMC/Input/Label").GetComponent(UILabel).text = null;
}

function Update ()
{
	if (gameObject.name == "GMCBUTTON")
	{
		if (HUD.usrGM > 0)
			gmcButton.SetActive(true);
		
		else
			gmcButton.SetActive(false);
	}
}