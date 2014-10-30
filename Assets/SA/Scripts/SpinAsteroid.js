#pragma strict

function Start () {

}

function FixedUpdate()
{
	gameObject.transform.Rotate(Time.fixedDeltaTime*6,Time.fixedDeltaTime*12,Time.fixedDeltaTime*6);	
}