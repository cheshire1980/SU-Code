#pragma strict
var isExitButton = false;
var isBackButton = false;
var isLoginButton = false;

function OnMouseEnter()
{
	// Change the color of the text
	renderer.material.color = Color.green;
	
}

function OnMouseExit()
{
	// Change the color of the text
	renderer.material.color = Color.white;
}

function OnMouseUp()
{
	if ( isExitButton )
	{
		Application.Quit();
	}
	
	else if ( isBackButton )
	{
		Application.LoadLevel(0);
	}
	
	else if ( isLoginButton )
	{
		Application.LoadLevel(1);
	}
	else
	{
		//Application.LoadLevel(2);
	}
}