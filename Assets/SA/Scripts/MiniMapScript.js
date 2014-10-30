#pragma strict

function Start () {

}

function Update () {

}

function LateUpdate ()
{

	var go : Vector3;

	if (GameObject.Find("PlayerShip") != null)
		go = GameObject.Find("PlayerShip").transform.position;
	else
		go = Camera.main.transform.position;

	transform.position = Vector3(go.x,go.y,go.z);
}
