#pragma strict

var notifName : String;
var notifTrig : boolean;
var notifOnlineflag : boolean;

var timerStart : float;
var timerEnd : float;

var hudText : GUISkin;
var hudGUI : GUISkin;
var hudBGUI : GUISkin;
var huds : GUISkin;

var online : Texture;
var offline : Texture;

private var notifRect = Rect(Screen.width/2-100,50,200,40);
private var notifBRect = Rect(Screen.width/2-100,50+92,200,40);

function notifWindow(windowID : int)
{
/*
	GUI.skin = hudText;
	if (notifOnlineflag == true)
		GUILayout.Label(notifName + " is now online",GUILayout.Width(200));
	else if (notifOnlineflag == false)
		GUILayout.Label(notifName + " is now offline",GUILayout.Width(200));*/
	GUILayout.Space(1);
}

function notifBWindow(windowID : int)
{
	GUILayout.Space(1);
}

function OnGUI ()
{
	if (notifTrig == true)
	{
		if (Time.time - timerStart > 5)
			notifTrig = false;
			
		var buddiesList : String = GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).buddiesList;
		
		var splits = new Array();
		splits = buddiesList.Split(","[0]);
	
		for (var i=0; i < splits.length; i++)
		{
			var tmpstr : String = splits[i];
			
			if (tmpstr != "")
			{
				if (splits[i] == notifName)
				{
					GUI.skin = hudGUI;
					notifRect = GUI.Window (11, notifRect, notifWindow, "");
					GUI.BeginGroup (Rect (0,0,100,100));
					GUI.EndGroup ();
					
					GUI.skin = hudBGUI;
					notifBRect = GUI.Window (12, notifBRect, notifBWindow, "");
					GUI.BeginGroup (Rect (0,0,100,100));
					GUI.EndGroup ();
					
					GUI.depth = 0;
					GUI.skin = hudText;
					if (notifOnlineflag == true)
					{
						GUI.Label(Rect(Screen.width/2-100,50+47,40,40),online);
						GUI.Label(Rect(Screen.width/2-50,105,200,50),notifName + " is now online");
					}
					else if (notifOnlineflag == false)
					{
						GUI.Label(Rect(Screen.width/2-100,50+47,40,40),offline);
						GUI.Label(Rect(Screen.width/2-50,105,200,50),notifName + " is now offline");
					}
				}
			}
		}
	}
}

@RPC
function GlobalOnline(name:String)
{
	notifName = name;
	timerStart = Time.time;
	notifOnlineflag = true;
	notifTrig = true;
	networkView.RPC("BuddiesListRequest",RPCMode.Server);
}

@RPC
function GlobalOffline(name:String)
{
	notifName = name;
	timerStart = Time.time;
	notifOnlineflag = false;
	notifTrig = true;
	networkView.RPC("BuddiesListRequest",RPCMode.Server);
}
