#pragma strict

var TargetObj : Transform;
var TargetSystem : GUISkin;
var Target : Texture;
var tSelected : Texture;
var hoveringTarget : boolean;

var hTarget : AudioClip;
var sTarget : AudioClip;

var offUp : Texture;
var offLeft : Texture;
var offRight : Texture;

var hPlay : boolean;
var sPlay : boolean;

var rT : boolean;

function OnGUI()
{
	GUI.skin = TargetSystem;
	
	if (hoveringTarget == true)
	{
		if (MoveAround.SelectedTarget != gameObject.name)
		{
			var screenLoc : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);
			GUI.DrawTexture(Rect(screenLoc.x-50,(Screen.height-screenLoc.y)-50,100,100), Target);
									
			if (hPlay == false)
				AudioSource.PlayClipAtPoint(hTarget, GameObject.Find(HUD.usrAccount).transform.position);
			hPlay = true;

		}
	}
	
	if (GameObject.Find("Target"+gameObject.name) != null) { if (rT == true) { Destroy(GameObject.Find("Target"+gameObject.name)); } }
	
	if (MoveAround.objSelected == true)
	{
		if (MoveAround.SelectedTarget == gameObject.name)
		{
			
			if (GameObject.Find("Target"+gameObject.name) == null)
			{
				rT = false;
				//Debug.Log("TEST");
				var TempTarget : Transform;
				TempTarget = Instantiate(TargetObj,gameObject.transform.position,Quaternion.identity);
				TempTarget.name = "Target"+gameObject.name;
			}
			
			GameObject.Find("Target"+gameObject.name).transform.position = gameObject.transform.position;
			
			var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
			var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);
			
			if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
				GUI.DrawTexture(Rect(screenLoc1.x-50,(Screen.height-screenLoc1.y)-50,100,100), tSelected);
			
			else
			{
				var screenY = (Screen.height-screenLoc1.y)-25;
				var screenX = screenLoc1.x;
				
				if (screenY < 0)
					screenY = 0;
				else if (screenY > Screen.height)
					screenY = Screen.height - 25;
					
				if (screenX < 0)
					screenX = 0;
				else if (screenX > Screen.width)
					screenX = Screen.width - 50;
				
				var olddepth = GUI.depth;
				GUI.depth = -1;
				/*
				if (screenX == 0)	
					GUI.DrawTexture(Rect(screenX,screenY,50,50), offLeft);
				
				else if (screenX == Screen.width - 50)	
					GUI.DrawTexture(Rect(screenX,screenY,50,50), offRight);
				
				else
					GUI.DrawTexture(Rect(screenX,0,50,50), offUp); */
				GUI.depth = olddepth;
			}
			
			if (sPlay == false)
				AudioSource.PlayClipAtPoint(sTarget, GameObject.Find(HUD.usrAccount).transform.position);
			sPlay = true;
		}
		else if (MoveAround.SelectedTarget != gameObject.name)
			rT = true;
		//else if (MoveAround.SelectedTarget != gameObject.name)
			//Destroy(GameObject.Find("Target"));
			
		else
			sPlay = false;
	}
	
		if (MoveAround.objSelected == false)
		{
			sPlay = false;
			if (MoveAround.SelectedTarget != gameObject.name) { rT = true; }
		}
}

function OnDestroy()
{
	Destroy(GameObject.Find("Target"+gameObject.name));
}

function OnMouseEnter()
{
	hoveringTarget = false;
	hPlay = false;
}

function OnMouseExit()
{
	hoveringTarget = false;
	hPlay = false;
}
