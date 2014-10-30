#pragma strict

var target : String = "";
var rotation : Vector3;
//var orig = gameObject.transform.rotation;

function Start () {

}

function Update () {

	if (target == "")
	{
		gameObject.transform.rotation = Quaternion.identity;
	}
	else if (target != "")
	{
		if (target == HUD.usrAccount)
		{
			var tlook = Quaternion.LookRotation(GameObject.Find("PlayerShip").transform.position - transform.position);
			transform.rotation = tlook;
			//gameObject.transform.LookAt(GameObject.Find("PlayerShip").transform);
		}
		else
			gameObject.transform.LookAt(GameObject.Find(target).transform);
	}
	
}