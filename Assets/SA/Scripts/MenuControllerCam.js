#pragma strict

function LateUpdate()
{
	var maincam : Transform = gameObject.transform;
	
	if (gameObject.name == "space_craft_4")
		maincam.Rotate(0,-.10,0);
	else
		maincam.Rotate(0,.10,0);
}