#pragma strict

function LateUpdate()
{
	var maincam : Transform = gameObject.transform;
	
	maincam.Rotate(0,.10,0);
}