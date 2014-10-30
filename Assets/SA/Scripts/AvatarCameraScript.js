#pragma strict

var savedRect : Rect;

function Start () {

	savedRect = camera.rect;

}

function Update () {

	if (StationScript.Docked == true)
	{
		if (StationScript.tabHangar == true)
			camera.rect = Rect(0,0,1,1);
		
		else if (StationScript.tabShips == true)
			camera.rect = Rect(0,0,1,1);
					
		else
		{
			camera.enabled = true;
			camera.rect = savedRect;
		}
	}
	
	if (StationScript.Docked == false)
	{
		camera.enabled = true;
		camera.rect = savedRect;
	}
	
}