#pragma strict

var HUDS : GUISkin;
var HUDMenus : GUISkin;

var mAvatar1 : Texture;
var mAvatar2 : Texture;
var mAvatar3 : Texture;
var mAvatar4 : Texture;
var mAvatar5 : Texture;
var mAvatar6 : Texture;
var mAvatar7 : Texture;
var mAvatar8 : Texture;

private var profileRect = Rect(Screen.width/2 - 300,Screen.height/2 - 200, 600, 400);
private var avatarRect = Rect(Screen.width/2 - 300,Screen.height/2 - 200, 600, 400);

var AvatarWindow : boolean;

function profileWindow(windowID : int)
{
	var tAvatar : Texture;
	if (HUD.usrAvatar == "evil1") tAvatar = mAvatar1;
	if (HUD.usrAvatar == "evil2") tAvatar = mAvatar2;
	if (HUD.usrAvatar == "evil3") tAvatar = mAvatar3;
	if (HUD.usrAvatar == "evil4") tAvatar = mAvatar4;
	if (HUD.usrAvatar == "evil5") tAvatar = mAvatar5;
	if (HUD.usrAvatar == "evil6") tAvatar = mAvatar6;
	if (HUD.usrAvatar == "evil7") tAvatar = mAvatar7;
	if (HUD.usrAvatar == "evil8") tAvatar = mAvatar8;
	
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label("Your Profile","BigText");
	GUILayout.Label("","Divider");
	GUILayout.Space(16);
	
	GUILayout.BeginHorizontal();  
	GUILayout.Label(tAvatar,GUILayout.Width(130),GUILayout.Height(130));
	
	GUILayout.Space(16);
	GUILayout.Label("Pilot: " + HUD.usrAccount + "\n" + 
					"Rank: " + HUD.usrRank + "\n" +
					"Experience: " + HUD.usrExperience + " of " + HUD.usrExperienceMax + " (" + Mathf.Floor(HUD.usrExperiencePercent * 100) + "%)\n" +
					"\n" + 
					"Kills This Session: " + HUD.killTotal, "PlainText", GUILayout.Width(400));
					
	GUILayout.EndHorizontal();
	
	GUILayout.Space(8);
	if (GUILayout.Button("Change",GUILayout.Width(130)))
		AvatarWindow = true;
		
	if (GUILayout.Button("Close",GUILayout.Width(130)))
		HUD.ProfileWindow = false;

	GUILayout.EndVertical();
	
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function avatarWindow(windowID : int)
{
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label("Choose an Avatar","BigText");
	GUILayout.Label("","Divider");
	GUILayout.Space(16);
	GUILayout.BeginHorizontal();
	
	GUI.skin = HUDS;
	if (GUILayout.Button(mAvatar1,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil1"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar2,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil2"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar3,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil3"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar4,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil4"); AvatarWindow = false; }
	GUILayout.EndHorizontal();
	
	GUILayout.BeginHorizontal();
	if (GUILayout.Button(mAvatar5,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil5"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar6,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil6"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar7,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil7"); AvatarWindow = false; }
	if (GUILayout.Button(mAvatar8,GUILayout.Width(130),GUILayout.Height(130))) { networkView.RPC("AvatarChangeRequest",RPCMode.Server,HUD.usrAccount,"evil8"); AvatarWindow = false; }
	GUI.skin = HUDMenus;
	
	GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function OnGUI ()
{
	// Profile Window
	if (HUD.usrAvatar == "default")
	{
			GUI.skin = HUDS;
			GUI.Box(avatarRect,"");
			GUI.Box(avatarRect,"");
			GUI.skin = HUDMenus;
			avatarRect = GUI.Window (7, avatarRect, avatarWindow, "");
			GUI.BeginGroup (Rect (0,0,400,400));
			GUI.EndGroup ();
	}
		
	if (HUD.ProfileWindow == true)
	{
		if (AvatarWindow == false)
		{
			GUI.skin = HUDS;
			GUI.Box(profileRect,"");
			GUI.Box(profileRect,"");
			GUI.skin = HUDMenus;
			profileRect = GUI.Window (6, profileRect, profileWindow, "");
			GUI.BeginGroup (Rect (0,0,400,400));
			GUI.EndGroup ();
		}
		
		if (AvatarWindow == true)
		{
			GUI.skin = HUDS;
			GUI.Box(avatarRect,"");
			GUI.Box(avatarRect,"");
			GUI.skin = HUDMenus;
			avatarRect = GUI.Window (7, avatarRect, avatarWindow, "");
			GUI.BeginGroup (Rect (0,0,400,400));
			GUI.EndGroup ();
		}
	}
	
	else
		AvatarWindow = false;
}