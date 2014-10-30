#pragma strict

function Start () {

}

function Update () {

	if (HUD.repair == false)
		Destroy(gameObject);
		
}