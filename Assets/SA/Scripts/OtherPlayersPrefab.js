#pragma strict

var HUDName : GUISkin;
var HUDBuddies : GUISkin;
var HUDDEV : GUISkin;

var ship : String;
var health : float;
var healthmax : float;
var rank : int;
var gm : int;

var fwdbk : float;
var lftrt : float;
var roll : float;
var rollfwdbk : float;
var mtime : float;
var x : float;
var y : float;
var z : float;
var q : Quaternion;
var avatar : String;
var pvp : int;


function OnGUI ()
{
	GUI.skin = HUDName;
	
	var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
	var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

	if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
	{
		if (gm == 0)
		{
			var buddiesList : String = GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).buddiesList;
			
			var splits = new Array();
			splits = buddiesList.Split(","[0]);
			
			for (var i=0; i < splits.length; i++)
			{
				var tmpstr : String = splits[i];
				
				if (tmpstr != "")
				{
					if (splits[i] == gameObject.name)
					{
						GUI.skin = HUDBuddies;
					}
				}
			}
		}
		
		var uhp = health / healthmax;
		var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
		GUI.Box(Rect(screenLoc1.x-(5*(gameObject.name.Length/2)),(Screen.height-screenLoc1.y)-75,70,5),"");
		GUI.DrawTexture(Rect(screenLoc1.x-(5*(gameObject.name.Length/2)),(Screen.height-screenLoc1.y)-75,70 * Mathf.Clamp01(uhp),5), thud);

		if (pvp == 1)
		{
			GUI.skin = HUDName;
			GUI.color = Color.red;
		}
		
		if (pvp == 0)
		{
			if (gm == 1)
			{
				GUI.skin = HUDName;
				GUI.color = Color.green;
			}
			
			if (gm == 2)
			{
				GUI.skin = HUDDEV;
				//GUI.color = Color.magenta;
			}
		}
		
		GUI.Label(Rect(screenLoc1.x-(5*(gameObject.name.Length/2)),(Screen.height-screenLoc1.y)-75,100,100), gameObject.name);
		GUI.Label(Rect(screenLoc1.x-(5*(gameObject.name.Length/2)),(Screen.height-screenLoc1.y)-65,100,100), "Rank: " + rank.ToString());
		
		//var huddie : HUDText;
		//gameObject.GetComponent(HUDText).Add(gameObject.name,Color.red,1f);
		//Debug.Log(gm);
	}
}

function FixedUpdate ()
{
	// Correct GM Trails
	var newTrails : String;

	if (gm == 1)
		newTrails = "GMTrails";
	else if (gm == 2)
		newTrails = "DEVTrails";

	if (gm > 0)
	{
		if (GameObject.Find(gameObject.name + "/Trails") != null)
		{
			Destroy(GameObject.Find(gameObject.name + "/Trails"));
			
			for (var child : Transform in transform)
			{
				if (child.name == newTrails)
					child.gameObject.SetActive(true);
			}
		}
	}
	
	// Error Correction
	if (fwdbk == 0.00)
	{
		if (lftrt == 0.00)
			transform.position = Vector3(x,y,z);
	}
	
	if (lftrt == 0.00)
	{
		if (roll == 0.00)
		{
			if (rollfwdbk == 0.00)
				transform.rotation = q;
		}
	}
	
	// Forward & Backward Direction
	var player : CharacterController = GetComponent(CharacterController);
	var forward = transform.TransformDirection(Vector3.forward);
	player.Move((forward * fwdbk)*mtime);
	
	// Left - Right & Rolling Direction
	transform.Rotate(rollfwdbk, lftrt, roll);
}

function Awake () {
	
	//var newObj = transform.Find("NameTag");
	//newObj.text = gameObject.name;
	//GetComponentInChildren(TextMesh).text = gameObject.name;
	Camera.mainCamera.networkView.RPC("UpdateRoom",RPCMode.Server);
}