#pragma strict

var usrAccount = "";

function Start () {

	usrAccount = PlayerPrefs.GetString("PlayerName");
	Camera.mainCamera.networkView.RPC("UpdateRoom",RPCMode.Server);
	
	//Camera.mainCamera.networkView.observed = GameObject.Find(HUD.usrAccount).transform; Camera.mainCamera.GetComponent(HUD);
	
	if (Application.platform != RuntimePlatform.Android)
	{
		if (GameObject.Find("Dual Joysticks") != null)
		{
			Destroy(GameObject.Find("Dual Joysticks"));
		}
	}
}

function Update () {

}

function Awake () {
		
}