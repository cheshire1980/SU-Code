#pragma strict

static var distY = 20;
static var distZ = 20;

function Start () {

}

function Update () {

	if (GameObject.Find(HUD.usrAccount) != null)
	{
		GameObject.Find(HUD.usrAccount).transform.position.y = 0;

		transform.position = GameObject.Find(HUD.usrAccount).transform.position;
		
		transform.position.z = transform.position.z + distZ;
		transform.position.y = transform.position.y + distY;
		
		transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
	}
}