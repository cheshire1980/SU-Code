#pragma strict

static var QuestsMenu : boolean = false;

var QuestMenu : GUISkin;
var QuestMenu2 : GUISkin;

static var qMenuX : int = 400;
static var qMenuY : int = 355;
static var qMenuXleft : int;
static var qMenuYtop : int;
static var qMenuXend : int;
static var qMenuYend : int;

static var curPage : int = 1;
static var totPage : int = 5;

private var windowRect = Rect (Screen.width/2-350/2, Screen.height/2-480/2, 350, 460);


function qWindow(windowID : int)
{
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.BeginHorizontal();
	GUILayout.Label("Mission Database","BigText");
	GUILayout.Space(16);
	GUILayout.Label(curPage + " of " + totPage,"PlainText", GUILayout.Width(50));
	GUILayout.EndHorizontal();
	GUILayout.Label("","Divider");
	GUILayout.Space(8);
	
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
	if (GUILayout.Button("<"))
		curPage--;
	GUILayout.Space(10);
	if (GUILayout.Button(">"))
		curPage++;
	GUILayout.EndHorizontal();

	if (curPage < 1)
		curPage = totPage;
		
	if (curPage > totPage)
		curPage = 1;
				
	GUILayout.Space(8);
	GUILayout.Label("","Divider");
	GUILayout.Space(8);
	
	if (curPage == 1)
	{
		if (HUD.usrsmComplete >= 0)
		{
			if (GUILayout.Button("Introduction"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,0);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,0);
				}
			}
		}
		
		if (HUD.usrsmComplete >= 1)
		{
			if (GUILayout.Button("Speed Tutorial"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,1);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,1);
				}
			}
		}
		
		if (HUD.usrsmComplete >= 2)
		{
			if (GUILayout.Button("Repair Tutorial"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,2);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,2);
				}
			}
		}
		
		if (HUD.usrsmComplete >= 3)
		{
			if (GUILayout.Button("Collecting Tutorial"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,3);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,3);
				}
			}
		}
	}
	
	// Page 2
	else if (curPage == 2)
	{
		if (HUD.usrsmComplete >= 4)
		{
			if (GUILayout.Button("Test The Waters!"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,4);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,4);
				}
			}
		}
		
		if (HUD.usrsmComplete >= 5)
		{
			if (GUILayout.Button("The Star Gates"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,5);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,5);
				}
			}
		}
		
		if (HUD.usrsmComplete >= 6)
		{
			if (GUILayout.Button("The Unknown"))
			{
				if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList != "")
				{
					if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadLead == 1)
						Camera.main.networkView.RPC("SquadEngageSMRequest",RPCMode.Server,6);
				}
				else if (GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).squadList == "")
				{
					Camera.main.networkView.RPC("EngageSMrequest",RPCMode.Server,6);
				}
			}
		}

	}
	
	GUILayout.EndVertical();
	GUI.DragWindow(Rect(0,0,10000,10000));
}

function OnGUI()
{
	// Set variables
	qMenuXleft = (Screen.width/2)-(qMenuX/2) + 5;
	qMenuYtop = (Screen.height/2)-(qMenuY/2) + 5;
	qMenuXend = qMenuX - 10;
	qMenuYend = qMenuY - 10;

	// Mission Database
	GUI.skin = QuestMenu;

	//if (MoveAround.objSelected == true)
	//{
		//if (GameObject.Find(MoveAround.SelectedTarget).tag == "questgiver" && Vector3.Distance(
		//						GameObject.Find(MoveAround.SelectedTarget).transform.position,
		//						GameObject.Find("PlayerShip").transform.position) < 20)
		if (QuestsMenu == true)
		{
			GUI.skin = QuestMenu2;
			GUI.Box(windowRect,"");
			GUI.Box(windowRect,"");
			GUI.skin = QuestMenu;
			windowRect = GUI.Window (0, windowRect, qWindow, "");
			GUI.BeginGroup (Rect (0,0,100,100));
			GUI.EndGroup ();
		}
		
	//}
		
	else
	{
		// Set the current page
		if (HUD.usrsmComplete > -1)
			curPage = 1;
			
		if (HUD.usrsmComplete > 3)
			curPage = 2;
		
		if (HUD.usrsmComplete > 8)
			curPage = 3;
	}
}