#pragma strict

var HUDS : GUISkin;
var HUDMenus : GUISkin;
var HUDTech : GUISkin;
var HUDTechAsk : GUISkin;

private var buddyRect = Rect(Screen.width/2 - 125,Screen.height/2 - 250, 250, 500);
private var profileRect = Rect(Screen.width/2 - 300,Screen.height/2 - 200, 600, 400);
private var findRect = Rect(Screen.width/2 - 300,Screen.height/2 - 100, 600, 200);

var FindProfile : boolean;
var FoundProfile : boolean;
var profileNotfound : boolean;

var findName : String;

var oName : String;
var oAvatar : String;
var oRank : int;
var oExperience : float;
var oExperienceMax : float;
var oExperiencePercent : float;
var buddiesList : String;
var buddiesFlag : String;
var buddiesRequest : String;
var scrollRect : Vector2;

private var tY : boolean;
private var tN : boolean;

// Squad variables
private var squadRect = Rect(5, 215,152+12,250);
private var askRect = Rect(Screen.width/2 - 100, Screen.height / 2 - 75, 200, 150);
private var askSquadRect = Rect(Screen.width/2 - 150, Screen.height / 2 - 75, 300, 150);

var squadLead : int;
var squadList : String;
var RemoveAsk : boolean;
var AskSquad : boolean;
var removeAsk : String;


function askSquadWindow(windowID : int)
{
	GUI.skin = HUDS;
	GUILayout.BeginVertical();
	GUILayout.Label("Join " + removeAsk + "'s Squad?");
	
	GUILayout.BeginHorizontal();
	if (GUILayout.Button("Yes",GUILayout.Height(20)))
	{
		networkView.RPC("SquadListAddRequestChoice",RPCMode.Server,1,removeAsk);
		AskSquad = false;
	}
	
	if (GUILayout.Button("No",GUILayout.Height(20)))
	{
		AskSquad = false;
	}
	
	GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	GUI.skin = HUDTech;
}

function askWindow(windowID : int)
{
	GUI.skin = HUDS;
	GUILayout.BeginVertical();
	GUILayout.Label("Remove " + removeAsk + "?");
	
	GUILayout.BeginHorizontal();
	if (GUILayout.Button("Yes",GUILayout.Height(20)))
	{
		networkView.RPC("SquadListRemoveRequest",RPCMode.Server,removeAsk);
		RemoveAsk = false;
	}
	
	if (GUILayout.Button("No",GUILayout.Height(20)))
	{
		RemoveAsk = false;
	}
	
	GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	GUI.skin = HUDTech;
}

function squadWindow(windowID : int)
{
	GUI.skin = HUDS;
	GUILayout.BeginVertical();
	
	if (GUILayout.Button("Leave Squad",GUILayout.Width(100),GUILayout.Height(20)))
		networkView.RPC("SquadListRemoveRequest",RPCMode.Server,HUD.usrAccount);
	//GUI.skin = HUDTech;

	var splits = new Array();
	splits = squadList.Split(","[0]);
	
	for (var i=0; i < splits.length; i++)
	{
		GUILayout.BeginHorizontal();
		var tmpvar : String = splits[i];
		
		if (tmpvar != HUD.usrAccount)
		{
			if (squadLead == 1)
			{
				if (GUILayout.Button("-",GUILayout.Width(20),GUILayout.Height(20)))
				{
					removeAsk = tmpvar;
					RemoveAsk = true;
					//Debug.Log("Sending Request to Remove: " + tmpvar);
					//networkView.RPC("SquadListRemoveRequest",RPCMode.Server,tmpvar);
				}
			}
			GUILayout.Label(tmpvar);
		}
		GUILayout.EndHorizontal();
	}

	GUILayout.EndVertical();
	GUI.skin = HUDTech;
}

function findWindow(windowID : int)
{
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label("Find","BigText");
	GUILayout.Label("","Divider");
	GUILayout.Space(16);

	GUILayout.BeginHorizontal();
	findName = GUILayout.TextField(findName, 25, GUILayout.Width(275));
	GUILayout.Space(8);
	
	if (GUILayout.Button("Search"))
	{
		profileNotfound = false;
		networkView.RPC("ProfileRequest",RPCMode.Server,findName);
	}
	if (GUILayout.Button("Cancel"))
		FindProfile = false;
	GUILayout.EndHorizontal();
	
	if (profileNotfound)
		GUILayout.Label("* Profile Not Found *","PlainText",GUILayout.Width(200));
		
	GUILayout.EndVertical();
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function buddyWindow(windowID : int)
{
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label("Buddy List","BigText");
	GUILayout.Label("","Divider");
	GUILayout.Space(8);
	
	if (GUILayout.Button("Find"))
	{
		findName = "";
		profileNotfound = false;
		FindProfile = true;
	}
	
	scrollRect = GUILayout.BeginScrollView(scrollRect,GUILayout.Width(180),GUILayout.Height(326));
	
	var splits = new Array();
	var fsplits = new Array();
	var rsplits = new Array();
	splits = buddiesList.Split(","[0]);
	fsplits = buddiesFlag.Split(","[0]);
	rsplits = buddiesRequest.Split(","[0]);

	for (var i=0; i < splits.length; i++)
	{
		var tmpstr : String = splits[i];
		
		if (tmpstr != "")
		{
			GUILayout.BeginHorizontal();
			
			if (rsplits[i] == "0")
			{
				if (fsplits[i] == "1")
				{
					GUILayout.Label(GameObject.Find("Main Camera").GetComponent(OnlineNotificationScript).online,GUILayout.Width(30),GUILayout.Height(30));
					GUI.skin = HUDS;
					
					var trigName : boolean;
					var splits1 = new Array();
					splits1 = squadList.Split(","[0]);

					if (squadList != "")
					{
						for (var j=0; j < splits1.length; j++)
						{
							if (splits1[j] == tmpstr)
								trigName = true;
						}
					}
					
					if (trigName == false)
					{
						if (squadList != "")
						{
							if (squadLead == 1)
							{
								if (GUILayout.Button("+",GUILayout.Width(20),GUILayout.Height(20)))
								{
									networkView.RPC("SquadListAdd",RPCMode.Server,tmpstr);
								}
							}
						}
						else if (squadList == "")
						{
							if (GUILayout.Button("+",GUILayout.Width(20),GUILayout.Height(20)))
							{
								networkView.RPC("SquadListAdd",RPCMode.Server,tmpstr);
							}
						}
					}
					GUI.skin = HUDMenus;
				}
				
				if (fsplits[i] == "0")
					GUILayout.Label(GameObject.Find("Main Camera").GetComponent(OnlineNotificationScript).offline,GUILayout.Width(30),GUILayout.Height(30));
				
				GUILayout.Space(8);
				
				if (GUILayout.Button(tmpstr,"PlainText",GUILayout.Width(105)))
					networkView.RPC("ProfileRequest",RPCMode.Server,tmpstr);
			}
			
			if (rsplits[i] == "1")
			{
				GUILayout.Label("New Request:","PlainText",GUILayout.Width(145));
				GUILayout.EndHorizontal();
				GUILayout.BeginHorizontal();
				
				GUI.skin = HUDS;
				tY = GUILayout.Toggle(tY,"");
				GUI.skin = HUDMenus;
				
				if (tY == true)
				{
					networkView.RPC("BuddiesAddAccept",RPCMode.Server,tmpstr);
					tY = false;
				}
				//tN = GUILayout.Toggle(tN,"N");
				
				GUILayout.Space(8);
				
				if (GUILayout.Button(tmpstr,"PlainText",GUILayout.Width(105)))
					networkView.RPC("ProfileRequest",RPCMode.Server,tmpstr);
			}
			
			if (rsplits[i] == "2")
			{
				GUILayout.Label("Waiting Accept From:","PlainText",GUILayout.Width(145));
				GUILayout.EndHorizontal();
				GUILayout.BeginHorizontal();

				if (GUILayout.Button(tmpstr,"PlainText",GUILayout.Width(145)))
					networkView.RPC("ProfileRequest",RPCMode.Server,tmpstr);
			}
			
			GUILayout.EndHorizontal();
		}
	}
	
	GUILayout.EndScrollView();
	GUILayout.EndVertical();
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function profileWindow(windowID : int)
{
	var tAvatar : Texture;
	if (oAvatar == "evil1") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar1;
	if (oAvatar == "evil2") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar2;
	if (oAvatar == "evil3") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar3;
	if (oAvatar == "evil4") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar4;
	if (oAvatar == "evil5") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar5;
	if (oAvatar == "evil6") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar6;
	if (oAvatar == "evil7") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar7;
	if (oAvatar == "evil8") tAvatar = GameObject.Find("Main Camera").GetComponent(ProfileScript).mAvatar8;
	
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label("Online Profile","BigText");
	GUILayout.Label("","Divider");
	GUILayout.Space(16);
	
	GUILayout.BeginHorizontal();  
	GUILayout.Label(tAvatar,GUILayout.Width(130),GUILayout.Height(130));
	
	GUILayout.Space(16);
	oExperiencePercent = oExperience / oExperienceMax;
	GUILayout.Label("Pilot: " + oName + "\n" + 
					"Rank: " + oRank + "\n" +
					"Experience: " + oExperience + " of " + oExperienceMax + " (" + Mathf.Floor(oExperiencePercent * 100) + "%)\n" +
					"\n", "PlainText", GUILayout.Width(400));
					
	GUILayout.EndHorizontal();
	
	GUILayout.Space(8);
	
	var splits = new Array();
	splits = buddiesList.Split(","[0]);

	var nameInlist : boolean;
	
	for (var i=0; i < splits.length; i++)
	{
		if (splits[i] == oName)
			nameInlist = true;
	}

	if (oName != HUD.usrAccount)
	{
		if (nameInlist == false)
		{
			if (GUILayout.Button("Add",GUILayout.Width(130)))
			{
				networkView.RPC("BuddiesAddRequest",RPCMode.Server,oName);
			}
		}
	}
			
	if (nameInlist == true)
	{
		if (GUILayout.Button("Del",GUILayout.Width(130)))
		{
			networkView.RPC("BuddiesRemoveRequest",RPCMode.Server,oName);
		}
	}

	if (GUILayout.Button("Close",GUILayout.Width(130)))
		FoundProfile = false;
		
	GUILayout.EndVertical();
	
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function Start ()
{
	networkView.RPC("BuddiesListRequest",RPCMode.Server);
	networkView.RPC("SquadListRequest",RPCMode.Server);
}

function OnGUI ()
{
	// Squad Display
	if (AskSquad == true)
	{
		GUI.skin = HUDTechAsk;
		askSquadRect = GUI.Window (15, askSquadRect, askSquadWindow, "");
		GUI.BeginGroup (Rect (0,0,400,400));
		GUI.EndGroup ();
		
		GUI.skin = HUDS;
	}
	
	if (RemoveAsk == true)
	{
		GUI.skin = HUDTechAsk;
		askRect = GUI.Window (14, askRect, askWindow, "");
		GUI.BeginGroup (Rect (0,0,400,400));
		GUI.EndGroup ();
		
		GUI.skin = HUDS;
	}
	
	if (squadList != "")
	{
		//GUI.skin = HUDS;
		//GUI.Box(buddyRect,"");
		//GUI.Box(buddyRect,"");
		GUI.skin = HUDTech;
		squadRect = GUI.Window (13, squadRect, squadWindow, "");
		GUI.BeginGroup (Rect (0,0,400,400));
		GUI.EndGroup ();
		
		GUI.skin = HUDS;
		//GUI.Label(Rect(10,Screen.height/2+40, Screen.width, 100),squadList);
	}
	
	// Buddy List
	if (HUD.BuddyWindow == true)
	{
		GUI.skin = HUDS;
		GUI.Box(buddyRect,"");
		GUI.Box(buddyRect,"");
		GUI.skin = HUDMenus;
		buddyRect = GUI.Window (8, buddyRect, buddyWindow, "");
		GUI.BeginGroup (Rect (0,0,400,400));
		GUI.EndGroup ();

		// Find Profile
		if (FindProfile == true)
		{
			GUI.skin = HUDS;
			GUI.Box(findRect,"");
			GUI.Box(findRect,"");
			GUI.skin = HUDMenus;
			findRect = GUI.Window (10, findRect, findWindow, "");
			GUI.BeginGroup (Rect (0,0,400,400));
			GUI.EndGroup ();
		}

		// Online Profile
		if (FoundProfile == true)
		{
			GUI.skin = HUDS;
			GUI.Box(profileRect,"");
			GUI.Box(profileRect,"");
			GUI.skin = HUDMenus;
			profileRect = GUI.Window (9, profileRect, profileWindow, "");
			GUI.BeginGroup (Rect (0,0,400,400));
			GUI.EndGroup ();
		}
	}
}

@RPC
function ProfileRequest(name:String)
{
}

@RPC
function ProfileGet(name:String,avatar:String,rank:int,experience:float,experiencemax:float)
{
	FindProfile = false;
	
	oName = name;
	oAvatar = avatar;
	oRank = rank;
	oExperience = experience;
	oExperienceMax = experiencemax;
	
	FoundProfile = true;
}

@RPC
function ProfileNotFound()
{
	profileNotfound = true;
}

@RPC
function BuddiesList(olist:String,oflag:String,oreq:String)
{
	Debug.Log(olist);
	buddiesList = olist;
	buddiesFlag = oflag;
	buddiesRequest = oreq;
	//buddiesRefresh = true;
}

@RPC
function BuddiesListRequest()
{
}

@RPC
function BuddiesAddRequest(name:String)
{
}

@RPC
function BuddiesAddAccept(name:String)
{
}

@RPC
function BuddiesRemoveRequest(name:String)
{
}

// Squad List Code

@RPC
function SquadListRequest()
{
}

@RPC
function SquadList(slead:int,slist:String)
{
	squadLead = slead;
	squadList = slist;
}

@RPC
function SquadListAdd(name:String,info:NetworkMessageInfo)
{
}

@RPC
function SquadListAddRequest(name:String)
{
	if (squadList == "")
	{
		removeAsk = name;
		AskSquad = true;
	}
}

@RPC
function SquadListAddRequestChoice(choice:int,name:String)
{
}

@RPC
function SquadListRemoveRequest(name:String)
{
}

/*
SquadListRequest - request list
SquadList(slead:int,slist:String) - incoming list
SquadListAdd(name:String,info:NetworkMessageInfo) - send request to add
SquadListAddRequest(name:String) - sent to ask if ok to add
SquadListAddRequestChoice(choice:int,name:String,info:NetworkMessageInfo) - sent as response to SquadListAddRequest
SquadListRemoveRequest(name:String) - remove request*/