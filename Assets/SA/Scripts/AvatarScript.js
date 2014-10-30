#pragma strict

var savedRotate;

function Start () {

	savedRotate = transform.rotation;
}

function Update () {

	if (StationScript.Docked == true)
	{
		if (StationScript.tabHangar == true)
			transform.Rotate(0,Time.fixedDeltaTime*20,0);
		else if (StationScript.tabShips == true)
			transform.Rotate(0,Time.fixedDeltaTime*20,0);
		else
			transform.rotation = savedRotate;
	}
	
	if (StationScript.Docked == false)
		transform.rotation = savedRotate;

}