#pragma strict

function Start () {

}

function Update ()
{

	if (parseInt(HUD.usrsmComplete) > parseInt(transform.name))
		Destroy(gameObject);

}

function OnDestroy()
{
	gameObject.transform.parent.GetComponent(UIGrid).Reposition();
}