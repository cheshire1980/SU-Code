#pragma strict

var closeLeave = false;
private var activated : boolean = false;
private var fromGate : String;
var toGate : Vector3;

var zonePrefab : Transform;
var zoneIN : AudioClip;
var zoneOUT : AudioClip;

var warp : boolean;


function Start ()
{
	warp = false;
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

function soundZoneOUT ()
{
	AudioSource.PlayClipAtPoint(zoneOUT, GameObject.Find(HUD.usrAccount).transform.position, 0.15f);
}

function soundZoneIN ()
{
	AudioSource.PlayClipAtPoint(zoneIN, GameObject.Find(HUD.usrAccount).transform.position);
}

function spawnZoneTitle ()
{
	var theZone = Instantiate(zonePrefab, Vector3(0,0,0), Quaternion.identity);

	var theZoneName : String;
	
	if (HUD.selectedGate == "krulspace")
		theZoneName = "Trini Space";
	
	else if (HUD.selectedGate == "trinispace")
		theZoneName = "Krul Space";
		
	else if (HUD.selectedGate == "luntaspace")
		theZoneName = "Lunta Space";
		
	theZone.GetComponent(UILabel).text = "[F9E8D2]Entered " + theZoneName + "[-]";
	theZone.parent = GameObject.Find("UI Root/UI_Zone/UI_Zone2").transform;
	theZone.localScale = Vector3(1,1,1);
	theZone.localPosition = Vector3(0,-80,0);
	
	soundZoneIN();
	
	yield WaitForSeconds(10);
	GameObject.Destroy(theZone.gameObject);
}

function Update ()
{
	if (activated == true)
	{
		if (gameObject.name == fromGate)
		{
			if (warp == false)
				soundZoneOUT();
				
			warp = true;
			var tmppos = Vector3.Lerp(GameObject.Find(HUD.usrAccount).transform.position, toGate, Time.deltaTime * 2.00);
			GameObject.Find(HUD.usrAccount).transform.position = tmppos;
			GameObject.Find(HUD.usrAccount).transform.LookAt(toGate);
			
			if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position,toGate) <= 10)
			{
				activated = false;
				
				spawnZoneTitle();
				warp = false;
				Debug.Log("Arrived at " + HUD.selectedGate);				
			}
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