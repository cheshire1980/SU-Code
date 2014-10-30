#pragma strict

var lastSynchronizationTime = 0f;
var syncDelay = 0f;
var syncTime = 0f;
var syncStartPosition : Vector3;
var syncEndPosition : Vector3;
var syncStartRotation : Quaternion;
var syncEndRotation : Quaternion;

var npcname : String;
var npcrank : int;
var npcexp : int;
var npchealth : float;
var npchealthmax : float;
var x : float;
var y : float;
var z : float;
var q : Quaternion;
var tx : float;
var tz : float;
var ctime : float;
var s : float;
var cpos : Vector3;
var f : Vector3;

function Start () {

}

function FixedUpdate ()
{
	var shortName = npcname.Substring(0,npcname.Length-5);

	// New optimized npc movement code
	
	cpos += f * ctime * s;
	x = cpos.x;
	y = cpos.y;
	z = cpos.z;

	//gameObject.transform.position.x = x;	
	//gameObject.transform.position.y = y;
	//gameObject.transform.position.z = z;
	//gameObject.transform.rotation = q;
	
    syncTime += Time.deltaTime;
    syncStartPosition = gameObject.transform.position;
    syncEndPosition = Vector3(x,y,z);
	transform.position = Vector3.Slerp(syncStartPosition, syncEndPosition, syncTime / syncDelay);
	
	if (shortName != "Asteroid")
		transform.rotation = Quaternion.Slerp(syncStartRotation, syncEndRotation, syncTime / 0.35);
}

function OnGUI ()
{
	if (MoveAround.SelectedTarget == npcname && MoveAround.objSelected == true)
	{
		GUI.skin = GameObject.Find("Main Camera").GetComponent(HUD).HUD;
		
		var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
		var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

		if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
		{
			var shortName = npcname.Substring(0,npcname.Length-5);
			var uhp = npchealth / npchealthmax;
			var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
			GUI.Box(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70,5),"");
			GUI.DrawTexture(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70 * Mathf.Clamp01(uhp),5), thud);

			GUI.color = Color.red;
			GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,100,100), shortName);
			GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-65,100,100), "Rank: " + npcrank.ToString());
		}
	}
}