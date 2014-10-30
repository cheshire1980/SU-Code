#pragma strict

function Start () {

}

function LateUpdate ()
{
	if (GameObject.Find(HUD.usrAccount) != null)
	{
		gameObject.transform.position = GameObject.Find(HUD.usrAccount).transform.position;
		gameObject.transform.position.y = -5;
		gameObject.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
		gameObject.transform.Rotate(0,0,0);
	}
		
}