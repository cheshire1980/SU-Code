#pragma strict

import System;
import System.Reflection;


function Start ()
{

}

function copyText ()
{
	if (Application.platform != RuntimePlatform.Android)
	{
		//var copy : GUIUtility = new GUIUtility();
		//copy.systemCopyBuffer = gameObject.transform.GetComponent(UILabel).text;
	}
}

function OnGUI ()
{
	
		//UniPasteBoard.SetClipBoardString(gameObject.transform.GetComponent(UILabel).text);

}
