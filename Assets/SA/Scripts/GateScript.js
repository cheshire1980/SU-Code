#pragma strict

var closeLeave = false;
private var activated : boolean = false;
private var fromGate : String;
var toGate : Vector3;

function Start () {

}




function changeSpace(space : String)
{
	GameObject.Find("TriniArea/SpaceCamera").camera.enabled = false;
	GameObject.Find("KrulArea/SpaceCamera").camera.enabled = false;
	
	if (space == "trinispace")
		GameObject.Find("TriniArea/SpaceCamera").camera.enabled = true;
		
	else if (space == "krulspace")
		GameObject.Find("KrulArea/SpaceCamera").camera.enabled = true;
}

function Update ()
{
	if (activated == true)
	{
		if (gameObject.name == fromGate)
		{
			var tmppos = Vector3.Lerp(GameObject.Find(HUD.usrAccount).transform.position, toGate, Time.deltaTime * 2.00);
			GameObject.Find(HUD.usrAccount).transform.position = tmppos;
			GameObject.Find(HUD.usrAccount).transform.LookAt(toGate);
			
			if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position,toGate) <= 10)
				activated = false;
		}
	}
	
	if (GameObject.Find(HUD.usrAccount) != null)
	{
		if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position,gameObject.transform.position) < 10)
		{
			HUD.activatorClose = true;
			closeLeave = true;
			Debug.Log(HUD.activator);
			if (HUD.activator == true)
			{
				HUD.activatorClose = false;
				HUD.activator = false;
				//Camera.main.networkView.RPC("Teleport",RPCMode.Server,gameObject.name);
				
				//var toGate : Vector3;
				if (gameObject.name == "krulspace")
				{
					activated = true;
					fromGate = gameObject.name;
					//toGate = GameObject.Find("trinispace").transform.position;
					toGate = GameObject.Find(HUD.selectedGate).transform.position;
				}
				else if (gameObject.name == "trinispace")
				{
					activated = true;
					fromGate = gameObject.name;
					//toGate = GameObject.Find("krulspace").transform.position;
					toGate = GameObject.Find(HUD.selectedGate).transform.position;
				}
				
				else if (gameObject.name == "luntaspace")
				{
					activated = true;
					fromGate = gameObject.name;
					//toGate = GameObject.Find("krulspace").transform.position;
					toGate = GameObject.Find(HUD.selectedGate).transform.position;
				}
				
					
				//GameObject.Find(HUD.usrAccount).transform.position = toGate;
				//changeSpace(gameObject.name);
			}
		}
		else if (closeLeave == true)
		{
			closeLeave = false;
			HUD.activatorClose = false;
		}
	}
	
	if (GameObject.Find(HUD.usrAccount) != null)
		if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position,gameObject.transform.position) < 20)
			HUD.activator = false;
}