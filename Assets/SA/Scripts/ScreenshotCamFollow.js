#pragma strict

static var distY = 5;
static var distZ = 5;

function Start () {

}

function Update () {

	if (GameObject.Find("ship") != null)
	{
		GameObject.Find("ship").transform.position.y = 0;

		transform.position = GameObject.Find("ship").transform.position;
		
		transform.position.z = transform.position.z + distZ;
		transform.position.y = transform.position.y + distY;
		
		transform.LookAt(GameObject.Find("ship").transform);
	}
}