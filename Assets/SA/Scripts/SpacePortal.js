#pragma strict

function Start () {

}

function FixedUpdate()
{
	
	if (HUD.installedactivator == true) { gameObject.transform.Find("Waypoint").active = true; }
	gameObject.transform.Rotate(0,Time.fixedDeltaTime*12,0);
	
}