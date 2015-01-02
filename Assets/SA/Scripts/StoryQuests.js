#pragma strict

var smsg : GUISkin;
var smsgold : GUISkin;

var isAndroid : boolean;

static var total = 16;

//private var tmpsmwinRect = Rect((Screen.width/2)-(425/2),Screen.height/10,425,130);
private var tmpsmwinRect = Rect(Screen.width - 425,100, 425, 130);

static var smMission : int;
static var missionFailed : boolean;

static var smtrig : int;
static var sm0trig1 : boolean;
static var sm0trig2 : boolean;
static var sm0trig3 : boolean;
static var sm0trig4 : boolean;
static var sm0trig5 : boolean;
static var sm0trig6 : boolean;
static var sm0trig7 : boolean;
static var sm0trig8 : boolean;
static var sm0trig9 : boolean;

static var sm1trig1 : boolean;
static var sm1trig2 : boolean;
static var sm1trig3 : boolean;
static var sm1trig4 : boolean;
static var sm1trig5 : boolean;
static var sm1trig6 : boolean;
static var sm1trig7 : boolean;

static var sm2trig1 : boolean;
static var sm2trig2 : boolean;
static var sm2trig3 : boolean;
static var sm2trig4 : boolean;
static var sm2trig5 : boolean;
static var sm2trig6 : boolean;
static var sm2trig7 : boolean;

static var sm3trig1 : boolean;
static var sm3trig2 : boolean;
static var sm3trig3 : boolean;
static var sm3trig4 : boolean;
static var sm3trig5 : boolean;
static var sm3trig6 : boolean;
static var sm3trig7 : boolean;

static var sm4trig1 : boolean;
static var sm4trig2 : boolean;
static var sm4trig3 : boolean;
static var sm4trig4 : boolean;
static var sm4trig5 : boolean;
static var sm4trig6 : boolean;
static var sm4trig7 : boolean;

static var sm5trig1 : boolean;
static var sm5trig2 : boolean;
static var sm5trig3 : boolean;
static var sm5trig4 : boolean;
static var sm5trig5 : boolean;
static var sm5trig6 : boolean;
static var sm5trig7 : boolean;
static var sm5trig8 : boolean;
static var sm5trig9 : boolean;

static var sm6trig1 : boolean;
static var sm6trig2 : boolean;
static var sm6trig3 : boolean;
static var sm6trig4 : boolean;
static var sm6trig5 : boolean;
static var sm6trig6 : boolean;
static var sm6trig7 : boolean;
static var sm6trig8 : boolean;
static var sm6trig9 : boolean;

static var sm7trig1 : boolean;
static var sm7trig2 : boolean;
static var sm7trig3 : boolean;
static var sm7trig4 : boolean;
static var sm7trig5 : boolean;
static var sm7trig6 : boolean;
static var sm7trig7 : boolean;
static var sm7trig8 : boolean;
static var sm7trig9 : boolean;

static var sm8trig1 : boolean;
static var sm8trig2 : boolean;
static var sm8trig3 : boolean;
static var sm8trig4 : boolean;
static var sm8trig5 : boolean;
static var sm8trig6 : boolean;
static var sm8trig7 : boolean;
static var sm8trig8 : boolean;
static var sm8trig9 : boolean;

static var sm9trig1 : boolean;
static var sm9trig2 : boolean;
static var sm9trig3 : boolean;
static var sm9trig4 : boolean;
static var sm9trig5 : boolean;
static var sm9trig6 : boolean;
static var sm9trig7 : boolean;
static var sm9trig8 : boolean;
static var sm9trig9 : boolean;


var mNotification : Transform;
var droneTemplate : Transform;
var droneInterceptorTemplate : Transform;
var shivanStationTemplate : Transform;
var powercoreTemplate : Transform;
var drone : Transform;
var killCount : int;
var bloodstone : Transform;
var Montar : Transform;
var montarShip : Transform;
var missionNpc : Transform;

var shivanInterceptor : Transform;
var cynicalTemplate : Transform;
var cynicalShip : Transform;
var patrolSweep : boolean;

var npc1 : Transform;
var npc2 : Transform;
var npc3 : Transform;
var npc4 : Transform;
var npc5 : Transform;
var npc6 : Transform;
var npc7 : Transform;
var npc8 : Transform;
var npc9 : Transform;
var npc10 : Transform;

var npcSentryTemplate : Transform;
var npcSentry1 : Transform;
var npcSentry2 : Transform;
var npcSentry3 : Transform;
var npcSentry4 : Transform;

var missionVindicatorTemplate : Transform;
var missionRuptureTemplate : Transform;
var missionSentinelTemplate : Transform;

var shivanStation : Transform;


function sMessage(themsg : String)
{
/*
	GUI.skin = smsgold;
	GUI.Box(tmpsmwinRect,"");
	GUI.Box(tmpsmwinRect,"");
	GUI.skin = smsg;
	HUD.sMessager(themsg);*/
	
	if (GameObject.Find("missionMessage") == null && missionFailed == false)
	{
		var mNot = Instantiate(mNotification, Vector3(0,0,0), Quaternion.identity);
		mNot.transform.parent = GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").transform;
		mNot.transform.localScale = Vector3(0.5,0.5,0.5);
		mNot.name = "missionMessage";
		mNot.transform.Find("missionMessage").GetComponent(NotificationTextType).mission = themsg;
		mNot.active = true;
	}
}

function sMessageDestroy()
{
	GameObject.Destroy(GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage"));
}

static function resetTrigs()
{

	missionFailed = false;
	smtrig = 0;
	
	sm0trig1 = false;
	sm0trig2 = false;
	sm0trig3 = false;
	sm0trig4 = false;
	sm0trig5 = false;
	sm0trig6 = false;
	sm0trig7 = false;
	sm0trig8 = false;
	sm0trig9 = false;

	sm1trig1 = false;
	sm1trig2 = false;
	sm1trig3 = false;
	sm1trig4 = false;
	sm1trig5 = false;
	sm1trig6 = false;
	sm1trig7 = false;
	
	sm2trig1 = false;
	sm2trig2 = false;
	sm2trig3 = false;
	sm2trig4 = false;
	sm2trig5 = false;
	sm2trig6 = false;
	sm2trig7 = false;

	sm3trig1 = false;
	sm3trig2 = false;
	sm3trig3 = false;
	sm3trig4 = false;
	sm3trig5 = false;
	sm3trig6 = false;
	sm3trig7 = false;

	sm4trig1 = false;
	sm4trig2 = false;
	sm4trig3 = false;
	sm4trig4 = false;
	sm4trig5 = false;
	sm4trig6 = false;
	sm4trig7 = false;
	
	sm5trig1 = false;
	sm5trig2 = false;
	sm5trig3 = false;
	sm5trig4 = false;
	sm5trig5 = false;
	sm5trig6 = false;
	sm5trig7 = false;
	sm5trig8 = false;
	sm5trig9 = false;
		
}

function Start()
{
	smMission = HUD.usrsmComplete;
	
	if (Application.platform == RuntimePlatform.Android)
		isAndroid = true;
}

function Update()
{
	if (HUD.usrsmCurrent == 0)
	{
		if (smtrig == 1)
		{
			sm0trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm0trig1 = true;
			sm0trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
			sm0trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
			sm0trig4 = true;
			sm0trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
			sm0trig4 = true;
			sm0trig5 = true;
			sm0trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
			sm0trig4 = true;
			sm0trig5 = true;
			sm0trig6 = true;
			sm0trig7 = true;
		}
		else if (smtrig == 8)
		{
			sm0trig1 = true;
			sm0trig2 = true;
			sm0trig3 = true;
			sm0trig4 = true;
			sm0trig5 = true;
			sm0trig6 = true;
			sm0trig7 = true;
			sm0trig8 = true;
		}
	}
	else if (HUD.usrsmCurrent == 1)
	{
		if (smtrig == 1)
		{
			sm1trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm1trig1 = true;
			sm1trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm1trig1 = true;
			sm1trig2 = true;
			sm1trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm1trig1 = true;
			sm1trig2 = true;
			sm1trig3 = true;
			sm1trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm1trig1 = true;
			sm1trig2 = true;
			sm1trig3 = true;
			sm1trig4 = true;
			sm1trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm1trig1 = true;
			sm1trig2 = true;
			sm1trig3 = true;
			sm1trig4 = true;
			sm1trig5 = true;
			sm1trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm1trig1 = true;
			sm1trig2 = true;
			sm1trig3 = true;
			sm1trig4 = true;
			sm1trig5 = true;
			sm1trig6 = true;
			sm1trig7 = true;
		}
	}
	else if (HUD.usrsmCurrent == 2)
	{
		if (smtrig == 1)
		{
			sm2trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm2trig1 = true;
			sm2trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm2trig1 = true;
			sm2trig2 = true;
			sm2trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm2trig1 = true;
			sm2trig2 = true;
			sm2trig3 = true;
			sm2trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm2trig1 = true;
			sm2trig2 = true;
			sm2trig3 = true;
			sm2trig4 = true;
			sm2trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm2trig1 = true;
			sm2trig2 = true;
			sm2trig3 = true;
			sm2trig4 = true;
			sm2trig5 = true;
			sm2trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm2trig1 = true;
			sm2trig2 = true;
			sm2trig3 = true;
			sm2trig4 = true;
			sm2trig5 = true;
			sm2trig6 = true;
			sm2trig7 = true;
		}
	}
	else if (HUD.usrsmCurrent == 3)
	{
		if (smtrig == 1)
		{
			sm3trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm3trig1 = true;
			sm3trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm3trig1 = true;
			sm3trig2 = true;
			sm3trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm3trig1 = true;
			sm3trig2 = true;
			sm3trig3 = true;
			sm3trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm3trig1 = true;
			sm3trig2 = true;
			sm3trig3 = true;
			sm3trig4 = true;
			sm3trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm3trig1 = true;
			sm3trig2 = true;
			sm3trig3 = true;
			sm3trig4 = true;
			sm3trig5 = true;
			sm3trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm3trig1 = true;
			sm3trig2 = true;
			sm3trig3 = true;
			sm3trig4 = true;
			sm3trig5 = true;
			sm3trig6 = true;
			sm3trig7 = true;
		}
	}
	else if (HUD.usrsmCurrent == 4)
	{
		if (smtrig == 1)
		{
			sm4trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm4trig1 = true;
			sm4trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm4trig1 = true;
			sm4trig2 = true;
			sm4trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm4trig1 = true;
			sm4trig2 = true;
			sm4trig3 = true;
			sm4trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm4trig1 = true;
			sm4trig2 = true;
			sm4trig3 = true;
			sm4trig4 = true;
			sm4trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm4trig1 = true;
			sm4trig2 = true;
			sm4trig3 = true;
			sm4trig4 = true;
			sm4trig5 = true;
			sm4trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm4trig1 = true;
			sm4trig2 = true;
			sm4trig3 = true;
			sm4trig4 = true;
			sm4trig5 = true;
			sm4trig6 = true;
			sm4trig7 = true;
		}
	}
	else if (HUD.usrsmCurrent == 5)
	{
		if (smtrig == 1)
		{
			sm5trig1 = true;
		}
		else if (smtrig == 2)
		{
			sm5trig1 = true;
			sm5trig2 = true;
		}
		else if (smtrig == 3)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
		}
		else if (smtrig == 4)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
		}
		else if (smtrig == 5)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
			sm5trig5 = true;
		}
		else if (smtrig == 6)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
			sm5trig5 = true;
			sm5trig6 = true;
		}
		else if (smtrig == 7)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
			sm5trig5 = true;
			sm5trig6 = true;
			sm5trig7 = true;
		}
		else if (smtrig == 8)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
			sm5trig5 = true;
			sm5trig6 = true;
			sm5trig7 = true;
			sm5trig8 = true;
		}
		else if (smtrig == 9)
		{
			sm5trig1 = true;
			sm5trig2 = true;
			sm5trig3 = true;
			sm5trig4 = true;
			sm5trig5 = true;
			sm5trig6 = true;
			sm5trig7 = true;
			sm5trig8 = true;
			sm5trig9 = true;
		}
	}
}

function OnGUI()
{
	GUI.skin = smsg;
	
	// If engaged in Story Missions
	if (HUD.usrsmEngaged == 1)
	{
		// Which Story Mission
		if (HUD.usrsmCurrent == 0)
		{			
			if (sm0trig1 == false)
			{
				if (isAndroid)
					sMessage("To go move around, move around the joystick on the bottom left corner");
				else
					sMessage("To go forward, press and hold \"W\" ...");
				
				if (GameObject.Find(HUD.usrAccount).GetComponent(MoveAround).forwardbackwardnew != 0)
				{
					sMessageDestroy();
					
					sm0trig1 = true;
				}
			}
			
			else if (sm0trig2 == false)
			{
				if (isAndroid)
					sMessage("Great! Now to stop, let go of the joystick ...");
				else
					sMessage("Great! Now to slow down, press and hold \"S\" ...");
				
				if (GameObject.Find(HUD.usrAccount).GetComponent(MoveAround).forwardbackwardnew <= 1)
				{
					sMessageDestroy();
					
					sm0trig2 = true;
				}
			}
			
			else if (sm0trig5 == false)
			{
				if (isAndroid)
					sMessage("Awesome! Now to shoot, press the blaster icon on the bottom right ...");
				else
					sMessage("Awesome! Now to shoot, press \"1\" or click the blaster icon in your tech bar ...");
				
				if (HUD.tBlasterTrigger)
				{
					sMessageDestroy();
					
					sm0trig5 = true;
				}
			}
			
			else if (sm0trig6 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-76,0,-56), Quaternion.identity);
				drone.name = "drone";

				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				
				
				sm0trig6 = true;
			}
			
			else if (sm0trig7 == false)
			{
				sMessage("Great! Alright, I have set your targetting system to a drone, follow the yellow target!");
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					
					sm0trig7 = true;
				}
			}
			
			else if (sm0trig8 == false)
			{
				Destroy(GameObject.Find("drone"));
				
				if (isAndroid)
					sMessage("Wonderful! You've found the station!! Anytime that you need to find me, I will always be on the top right button, press it for new missions!");
				else				
					sMessage("Wonderful! You've found the station!! Right click me to check out new missions!");
				
				if (HUD.QuestsMenu == true)
				{
					sMessageDestroy();
					
					sm0trig8 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
		}
		
		else if (HUD.usrsmCurrent == 1)
		{
			if (sm1trig1 == false)
			{
				sMessage("In this tutorial, I will be showing you how to use the afterburner, press and hold the afterburner icon...");
				
				if (HUD.afterburner == true)
				{
					sMessageDestroy();
					
					sm1trig1 = true;
				}
			}
			
			else if (sm1trig2 == false)
			{
				sMessage("Notice at the top left that it takes energy to use it? Almost all techs use energy... Let it drain completely...");
				
				if (HUD.usrEnergy <= 0)
				{
					sMessageDestroy();
					
					sm1trig2 = true;
				}
			}
			
			else if (sm1trig3 == false)
			{
				sMessage("It will recharge on its own by making sure no techs are being used, Lets let it charge up to full");
				
				if (HUD.usrEnergy >= HUD.usrEnergyMax)
				{
					sMessageDestroy();
					
					sm1trig3 = true;
				}
			}
			
			else if (sm1trig4 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-139,0,-100), Quaternion.identity);
				drone.name = "drone";
				
				
				sm1trig4 = true;
			}
			
			else if (sm1trig5 == false)
			{
				sMessage("Now that its full, activate your afterburner again, and head over to the drone i've deployed, follow the yellow target");
				
				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					MoveAround.SelectedTarget = null;
					MoveAround.objSelected = false;
					
					Destroy(GameObject.Find("drone"));
					
					sm1trig5 = true;
				}
			}
			
			else if (sm1trig6 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-81,0,-58), Quaternion.identity);
				drone.name = "drone";
				
				
				sm1trig6 = true;
			}
			
			else if (sm1trig7 == false)
			{
				sMessage("Head back over to the drone, this will complete this tutorial...");
				
				MoveAround.SelectedTarget = "drone";
				MoveAround.objSelected = true;
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					Destroy(GameObject.Find("drone"));
					
					sm1trig7 = true;
				}
			}

			else
			{
				MoveAround.SelectedTarget = null;
				MoveAround.objSelected = false;
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}

		}
		
		else if (HUD.usrsmCurrent == 2)
		{
			if (sm2trig1 == false)
			{
				HUD.usrHealth = HUD.usrHealth / 2;
				HUD.healthUpdate = true;
				
				sm2trig1 = true;
			}
			
			else if (sm2trig2 == false)
			{
				sMessage("In this tutorial we will be learning to repair your ship, press and hold the repair icon...");
				
				if (HUD.repair == true)
				{
					sMessageDestroy();
					
					sm2trig2 = true;
				}
			}
			
			else if (sm2trig3 == false)
			{
				sMessage("Just like your afterburner, this also uses energy, keep using repair until your ship is at full health");
				
				if (HUD.usrHealth >= HUD.usrHealthMax)
				{
					sMessageDestroy();
					
					sm2trig3 = true;
				}
			}
			
			else
			{
				MoveAround.SelectedTarget = null;
				MoveAround.objSelected = false;
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
			
		}
		
		else if (HUD.usrsmCurrent == 3)
		{
			if (sm3trig1 == false)
			{
				var bs = Instantiate(bloodstone,Vector3(-76,0,-56),Quaternion.identity);
				
				bs.name = "Bloodstone";
				var bbScript1 : BloodstoneScript = bs.GetComponent("BloodstoneScript");
				bbScript1.amount = 0;
				
				sm3trig1 = true;
			}
			
			else if (sm3trig2 == false)
			{
				sMessage("Right by me is a crystal called \"Bloodstone\", it is your main currency... Press it to target it to collect it");
				
				if (GameObject.Find("Bloodstone") == null)
				{
					sMessageDestroy();
					
					sm3trig2 = true;
				}
			}
			
			else
			{
				MoveAround.SelectedTarget = null;
				MoveAround.objSelected = false;
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
			
		}
		
		else if (HUD.usrsmCurrent == 4)
		{
			if (sm4trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-139,0,-100), Quaternion.identity);
				drone.name = "drone";
				
				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				
				sm4trig1 = true;
			}
			
			else if (sm4trig2 == false)
			{
				sMessage("Lets test your skills, follow the yellow target on your screen, i've set your targetting system to the drone i've deployed...");
				
				MoveAround.SelectedTarget = "drone";
				MoveAround.objSelected = true;
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					//MoveAround.SelectedTarget = null;
					//MoveAround.objSelected = false;
					
					Destroy(GameObject.Find("drone"));
					
					sm4trig2 = true;
				}
			}
			
			else if (sm4trig3 == false)
			{
				//sMessage("Okay, now that you're here, lets see what you're made of! You can target each one by pressing on their ship. Kill 10 Shivans...");
				killCount = HUD.killTotal;
				HUD.killRank = 0;
				HUD.killPlayer = null;
				
				sm4trig3 = true;
			}
			
			else if (sm4trig4 == false)
			{
				//if (HUD.killRank != 5)
					//if (HUD.killPlayer == HUD.usrAccount)
					//{
					//	killCount++;
					//	HUD.killRank = 0;
					//	HUD.killPlayer = null;
					//}
					
				sMessage((HUD.killTotal - killCount) + "Okay, now that you're here, lets see what you're made of! You can target each one by pressing on their ship. Kill 10 Shivans...");
				
				if ((HUD.killTotal - killCount) == 10)
				{
					sMessageDestroy();
					
					sm4trig4 = true;
				}
			}
			
			else if (sm4trig5 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-81,0,-58), Quaternion.identity);
				drone.name = "drone";
				
				
				sm4trig5 = true;
			}
			
			else if (sm4trig6 == false)
			{
				sMessage("Awesome! I like your style! I've set your targetting system to a drone, head back!");
				
				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					//MoveAround.SelectedTarget = null;
					//MoveAround.objSelected = false;
					Destroy(GameObject.Find("drone"));
					
					sm4trig6 = true;
				}
			}
			
			else
			{
				//MoveAround.SelectedTarget = null;
				//MoveAround.objSelected = false;
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
			
		}
		
		else if (HUD.usrsmCurrent == 5)
		{
			if (sm5trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(4,0,-32), Quaternion.identity);
				drone.name = "drone";
				
				
				sm5trig1 = true;
			}
			
			else if (sm5trig2 == false)
			{
				sMessage("The ancient star gates are used to go between star systems and planetary entry. Head to your yellow target.");
				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					//MoveAround.SelectedTarget = null;
					//MoveAround.objSelected = false;
					Destroy(GameObject.Find("drone"));

					
					sm5trig2 = true;
				}
			}
			
			else if (sm5trig3 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-139,0,-100), Quaternion.identity);
				drone.name = "drone";
				
				
				sm5trig3 = true;
			}
			
			else if (sm5trig4 == false)
			{
				sMessage("These gates were left by the ancients, they can be activated by a gate activator tech, I have a spare, however it needs a power source. Head to the yellow target to find one.");
				//MoveAround.SelectedTarget = "drone";
				//MoveAround.objSelected = true;
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					//MoveAround.SelectedTarget = null;
					//MoveAround.objSelected = false;
					Destroy(GameObject.Find("drone"));
					
					sm5trig4 = true;
				}
			}
			
			else if (sm5trig5 == false)
			{
				drone = Instantiate(powercoreTemplate, Vector3(-139,0,-100), Quaternion.identity);
				drone.name = "powercore";

				killCount = HUD.killTotal;
				HUD.killRank = 0;
				HUD.killPlayer = null;
				
				sm5trig5 = true;
			}
			
			else if (sm5trig6 == false)
			{
				sMessage("There's the power source! You will have to kill enough Shivans to clear a path, I will let you know when to collect the power source");
				
				if ((HUD.killTotal - killCount) == 10)
				{
					sMessageDestroy();
					
					sm5trig6 = true;
				}
			}
			
			else if (sm5trig7 == false)
			{
				sMessage("Quick! Go near the power source!");
				
				if (Vector3.Distance(GameObject.Find("powercore").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					Destroy(GameObject.Find("powercore"));
					
					sm5trig7 = true;
				}
			}
			
			else if (sm5trig8 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-81,0,-58), Quaternion.identity);
				drone.name = "drone";
				
				
				sm5trig8 = true;
			}
			
			else if (sm5trig9 == false)
			{
				sMessage("Afterburn back, quick!");
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					//MoveAround.SelectedTarget = null;
					//MoveAround.objSelected = false;
					Destroy(GameObject.Find("drone"));
					
					sm5trig9 = true;
					
					//Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				}
			}
			
			else
			{
				//MoveAround.SelectedTarget = null;
				//MoveAround.objSelected = false;
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
			
		}
		
		else if (HUD.usrsmCurrent == 6)
		{
			if (sm5trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(4,0,-32), Quaternion.identity);
				drone.name = "drone";

				Camera.main.GetComponent(HUD).InstallActivatorRequest();
				sm5trig1 = true;
			}
			
			if (sm5trig2 == false)
			{
				sMessage("I have installed the gate activator on your ship, head to the yellow target");
			
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					
					Destroy(GameObject.Find("drone"));
					sm5trig2 = true;
				}
			}
			
			else if (sm5trig3 == false)
			{
				sMessage("Activate the gate by going near it and using the gate activator on your tech bar, I will meet you on the other side at KRUL for some new missions!");
				
				if (HUD.activatorMission == true)
				{
					sMessageDestroy();
					sm5trig3 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
				
			}
			
		}
		
		else if (HUD.usrsmCurrent == 7)
		{
			if (sm0trig1 == false)
			{
				sMessage("Ok great you've gotten this far! All Trini ships have a built in failsafe, they can not shoot other Trini (or ally ships) unless your Skull is red. Please turn it on...");
				
				if (HUD.usrPvp == 1)
				{
					sMessageDestroy();
					sm0trig1 = true;
				}
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("See how your skull is now red? This means you are now vunerable to other player attacks, but it also means that you can destroy other players! Lets turn it back off for now...");
				
				if (HUD.usrPvp == 0)
				{
					sMessageDestroy();
					sm0trig2 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 8)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-81,0,-58), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("This is Krul space territory, lets get back to Trini space using the gate and head to the yellow target");
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					sm0trig2 = true;
				}
			}
			
			else if (sm0trig3 == false)
			{
				montarShip = Instantiate(Montar, Vector3(-81,0,-58), Quaternion.identity);
				montarShip.name = "Montar";
				montarShip.GetComponent(missionMontarBrain).target = GameObject.Find(HUD.usrAccount).transform;
				sm0trig3 = true;
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("My name is Montar, i've been the one guiding you along the way, my weapons have been damaged since the last Shivan attack, guide me to the gate...");
				
				//if (Vector3.Distance(montarShip.position, GameObject.Find(HUD.usrAccount).transform.position) > 7.5)
				//	montarShip.position = Vector3.Lerp(montarShip.position, GameObject.Find(HUD.usrAccount).transform.position, Time.deltaTime * 0.25);
				//montarShip.LookAt(GameObject.Find(HUD.usrAccount).transform.position);
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
				}

				else if (Vector3.Distance(montarShip.position, GameObject.Find("krulspace").transform.position) < 10)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("Montar"));
					sm0trig4 = true;
				}				
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 9)
		{
			if (sm0trig1 == false)
			{
				sMessage("Head to Krul space using the gate...");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, GameObject.Find("trinispace").transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig1 = true;
				}
			}
			
			else if (sm0trig2 == false)
			{
				montarShip = Instantiate(Montar, GameObject.Find("trinispace").transform.position,Quaternion.identity);
				montarShip.name = "Montar";
				montarShip.GetComponent(missionMontarBrain).target = GameObject.Find(HUD.usrAccount).transform;
				sm0trig2 = true;
			}
			
			else if (sm0trig3 == false)
			{
				sMessage("Quick! Get out of here, go to the Krul station, its not too far from here, make sure Montar stays alive!!");
								
				if (Vector3.Distance(montarShip.position, GameObject.Find("trinispace").transform.position) > 75)
				{
					sMessageDestroy();
					//GameObject.Destroy(GameObject.Find("Montar"));
					
					npc1 = Instantiate(missionNpc, GameObject.Find("Montar").transform.position, Quaternion.identity);
					npc2 = Instantiate(missionNpc, GameObject.Find("Montar").transform.position, Quaternion.identity);
					npc3 = Instantiate(missionNpc, GameObject.Find("Montar").transform.position, Quaternion.identity);
					npc4 = Instantiate(missionNpc, GameObject.Find("Montar").transform.position, Quaternion.identity);
					npc5 = Instantiate(missionNpc, GameObject.Find("Montar").transform.position, Quaternion.identity);
										
					npc1.name = "Interceptor";
					npc2.name = "Interceptor";
					npc3.name = "Interceptor";
					npc4.name = "Interceptor";
					npc5.name = "Interceptor";

					sm0trig3 = true;
				}
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
				}
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("Oh no!! Ambush!! Keep me safe!! Kill the Shivans!!");
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
				}

				else if (npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null)
				{
					sMessageDestroy();
					sm0trig4 = true;
				}
			}
			
			else if (sm0trig5 == false)
			{
				sMessage("Bring Montar to the Krul station and make sure he's alive!");
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
				}

				else if (Vector3.Distance(montarShip.position, GameObject.Find("KrulStation").transform.position) < 10)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("Montar"));
					sm0trig5 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		if (HUD.usrsmCurrent == 10)
		{
			if (sm0trig1 == false)
			{
				npc1 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc2 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc3 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc4 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc5 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc6 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc7 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc8 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc9 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				npc10 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);

				npc1.name = "Interceptor";
				npc2.name = "Interceptor";
				npc3.name = "Interceptor";
				npc4.name = "Interceptor";
				npc5.name = "Interceptor";
				npc6.name = "Interceptor";
				npc7.name = "Interceptor";
				npc8.name = "Interceptor";
				npc9.name = "Interceptor";
				npc10.name = "Interceptor";

				npc1.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc2.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc3.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc4.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc5.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc6.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc7.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc8.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc9.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;
				npc10.GetComponent(missionNpcBrain).target = GameObject.Find("KrulStation").transform;

				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("Another Shivan attack!! Save the station!!");
				
				if (HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
					if (npc2 != null)
						GameObject.Destroy(GameObject.Find(npc2.name));	
					if (npc3 != null)
						GameObject.Destroy(GameObject.Find(npc3.name));	
					if (npc4 != null)
						GameObject.Destroy(GameObject.Find(npc4.name));	
					if (npc5 != null)
						GameObject.Destroy(GameObject.Find(npc5.name));	
					if (npc6 != null)
						GameObject.Destroy(GameObject.Find(npc6.name));	
					if (npc7 != null)
						GameObject.Destroy(GameObject.Find(npc7.name));	
					if (npc8 != null)
						GameObject.Destroy(GameObject.Find(npc8.name));	
					if (npc9 != null)
						GameObject.Destroy(GameObject.Find(npc9.name));	
					if (npc10 != null)
						GameObject.Destroy(GameObject.Find(npc10.name));	

				}

				else if (npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null &&
						npc6 == null && npc7 == null && npc8 == null && npc9 == null && npc10 == null && HUD.usrHealth > 0)
				{
					sMessageDestroy();
					sm0trig2 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 11)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-81,0,-58), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("Before we leave here to get back to Trini, make sure your equipped with a Trini ships! Your going to need it...\nOnce you have, lets head back to Trini to the yellow marker...");
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig2 = true;
					GameObject.Destroy(GameObject.Find("drone"));
				}
			}
			
			else if (sm0trig3 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-181,0,55), Quaternion.identity);
				drone.name = "drone";
				sm0trig3 = true;
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("Okay, we need to do an offensive, head to the yellow target");
				
				if (Vector3.Distance(GameObject.Find("drone").transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig4 = true;
					GameObject.Destroy(GameObject.Find("drone"));
					
					killCount = HUD.killTotal;
					HUD.killRank = 0;
					HUD.killPlayer = null;
				}
			}
			
			else if (sm0trig5 == false)
			{
				sMessage("Kill enough Shivans to slow them down from them fortifying Trini space!");
				
				if ((HUD.killTotal - killCount) >= 15)
				{
					sMessageDestroy();
					sm0trig5 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 12)
		{
			if (sm0trig1 == false)
			{
				sMessage("Okay, get ready, we're going to bring down Kelroth! Go through the gate when your ready!\nKelroth used to be one of the Krul's flagships, the Shivans commendeered it to try to take over Krul space.");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, GameObject.Find("trinispace").transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig1 = true;
					
					killCount = HUD.killTotal;
					HUD.killRank = 0;
					HUD.killPlayer = null;
				}
			}
				
			else if (sm0trig2 == false)
			{
				sMessage("Destroy Kelroth!!");
					
				if ((HUD.killTotal - killCount) >= 1)
				{
					sMessageDestroy();
					sm0trig2 = true;

					npc1 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc2 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc3 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc4 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc5 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc6 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc7 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc8 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc9 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);
					npc10 = Instantiate(missionNpc, GameObject.Find("TriniStation").transform.position, Quaternion.identity);

					npc1.name = "Interceptor";
					npc2.name = "Interceptor";
					npc3.name = "Interceptor";
					npc4.name = "Interceptor";
					npc5.name = "Interceptor";
					npc6.name = "Interceptor";
					npc7.name = "Interceptor";
					npc8.name = "Interceptor";
					npc9.name = "Interceptor";
					npc10.name = "Interceptor";

					npc1.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc2.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc3.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc4.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc5.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc6.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc7.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc8.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc9.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
					npc10.GetComponent(missionNpcBrain).target = GameObject.Find("TriniStation").transform;
				}
			}
			
			else if (sm0trig3 == false)
			{
				sMessage("Oh no!! They're counter attacking the Trini station! Head over to Trini space!");
				
				if (HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
					if (npc2 != null)
						GameObject.Destroy(GameObject.Find(npc2.name));	
					if (npc3 != null)
						GameObject.Destroy(GameObject.Find(npc3.name));	
					if (npc4 != null)
						GameObject.Destroy(GameObject.Find(npc4.name));	
					if (npc5 != null)
						GameObject.Destroy(GameObject.Find(npc5.name));	
					if (npc6 != null)
						GameObject.Destroy(GameObject.Find(npc6.name));	
					if (npc7 != null)
						GameObject.Destroy(GameObject.Find(npc7.name));	
					if (npc8 != null)
						GameObject.Destroy(GameObject.Find(npc8.name));	
					if (npc9 != null)
						GameObject.Destroy(GameObject.Find(npc9.name));	
					if (npc10 != null)
						GameObject.Destroy(GameObject.Find(npc10.name));	
				}
				
				else if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, GameObject.Find("krulspace").transform.position) < 10)
				{
					npc1.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
					npc2.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
					npc3.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
				}
				
				else if (npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null &&
						npc6 == null && npc7 == null && npc8 == null && npc9 == null && npc10 == null && HUD.usrHealth > 0)
				{
					sMessageDestroy();
					sm0trig3 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 13)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-2025,0,-212), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("Head back to Krul space and then to the yellow target...");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, GameObject.Find("drone").transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig2 = true;
					GameObject.Destroy(GameObject.Find("drone"));
				}
			}
			
			else if (sm0trig3 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-2110,0,-220), Quaternion.identity);
				drone.name = "drone";
				sm0trig3 = true;
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("Head over to the yellow target, we need to thin out the Shivan population by the Krul station!");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, GameObject.Find("drone").transform.position) < 10)
				{
					sMessageDestroy();
					sm0trig4 = true;
					GameObject.Destroy(GameObject.Find("drone"));
					
					killCount = HUD.killTotal;
					HUD.killRank = 0;
					HUD.killPlayer = null;
				}
			}
			
			else if (sm0trig5 == false)
			{
				sMessage("Destroy those Shivans!");
				
				if ((HUD.killTotal - killCount) >= 10)
				{
					sMessageDestroy();
					sm0trig5 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 14)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-2025,0,-212), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("Head to the yellow target location...");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 10)
				{
					sMessageDestroy();
					sm0trig2 = true;
					GameObject.Destroy(GameObject.Find("drone"));
					
					montarShip = Instantiate(Montar, GameObject.Find("KrulStation").transform.position,Quaternion.identity);
					montarShip.name = "Montar";
					montarShip.GetComponent(missionMontarBrain).target = GameObject.Find(HUD.usrAccount).transform;
					
					drone = Instantiate(droneInterceptorTemplate, Vector3(-1911,0,-172), Quaternion.identity);
					drone.name = "drone";
					sm0trig1 = true;
				}
			}
			
			else if (sm0trig3 == false)
			{
				sMessage("Head to the yellow target\nMy scans show a disabled Shivan ship near by, I have an idea, I will attempt to hack its systems, and tow it back to the station");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 10)
				{
					sMessageDestroy();
					sm0trig3 = true;
					
					montarShip.GetComponent(missionMontarBrain).target = GameObject.Find("drone").transform;
					
					npc1 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc1.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc1.name = "Interceptor";
				}
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("Protect me while i hack the systems of this Shivan Interceptor...");
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
					if (GameObject.Find("drone") != null)
						GameObject.Destroy(GameObject.Find("drone"));
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
				}
				
				else if (npc1 == null && HUD.usrHealth > 0)
				{
					sMessageDestroy();
					sm0trig4 = true;
					
					npc1 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc1.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc1.name = "Interceptor";
					
					npc2 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc2.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc2.name = "Interceptor";

					npc3 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc3.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc3.name = "Interceptor";
				}
			}
			
			else if (sm0trig5 == false)
			{
				sMessage("Well it didnt take long for them to realise what i am doing, im trying to hurry...");
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
					if (GameObject.Find("drone") != null)
						GameObject.Destroy(GameObject.Find("drone"));
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
					if (npc2 != null)
						GameObject.Destroy(GameObject.Find(npc2.name));	
					if (npc3 != null)
						GameObject.Destroy(GameObject.Find(npc3.name));
				}
				
				else if (npc1 == null && npc2 == null && npc3 == null && HUD.usrHealth > 0)
				{
					sMessageDestroy();
					sm0trig5 = true;
					
					npc1 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc1.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc1.name = "Interceptor";
					
					npc2 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc2.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc2.name = "Interceptor";

					npc3 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc3.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc3.name = "Interceptor";
					
					npc4 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc4.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc4.name = "Interceptor";

					npc5 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc5.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc5.name = "Interceptor";

				}
			}
			
			else if (sm0trig6 == false)
			{
				sMessage("Almost got it...");
				
				if (GameObject.Find("Montar") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
					if (GameObject.Find("drone") != null)
						GameObject.Destroy(GameObject.Find("drone"));
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
					if (npc2 != null)
						GameObject.Destroy(GameObject.Find(npc2.name));	
					if (npc3 != null)
						GameObject.Destroy(GameObject.Find(npc3.name));
					if (npc4 != null)
						GameObject.Destroy(GameObject.Find(npc4.name));	
					if (npc5 != null)
						GameObject.Destroy(GameObject.Find(npc5.name));	
				}
				
				else if (npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null && HUD.usrHealth > 0)
				{
					sMessageDestroy();
					sm0trig6 = true;
					
					GameObject.Find("drone").AddComponent(missionMontarBrain);
					drone.GetComponent(missionMontarBrain).target = GameObject.Find("Montar").transform;
					montarShip.GetComponent(missionMontarBrain).target = GameObject.Find(HUD.usrAccount).transform;
					
					npc1 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc1.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc1.name = "Interceptor";
					
					npc2 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc2.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc2.name = "Interceptor";

					npc3 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc3.GetComponent(missionNpcBrain).target = GameObject.Find("Montar").transform;
					npc3.name = "Interceptor";
					
					npc4 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc4.GetComponent(missionNpcBrain).target = GameObject.Find("drone").transform;
					npc4.name = "Interceptor";

					npc5 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc5.GetComponent(missionNpcBrain).target = GameObject.Find("drone").transform;
					npc5.name = "Interceptor";
					
					npc6 = Instantiate(missionNpc, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
					npc6.GetComponent(missionNpcBrain).target = GameObject.Find("drone").transform;
					npc6.name = "Interceptor";
				}
			}
			
			else if (sm0trig7 == false)
			{
				sMessage("GOT IT!!\nLets head back to the station! Keep us alive!");
				
				if (GameObject.Find("Montar") == null || GameObject.Find("drone") == null || HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					
					if (GameObject.Find("Montar") != null)
						GameObject.Destroy(GameObject.Find("Montar"));
					if (GameObject.Find("drone") != null)
						GameObject.Destroy(GameObject.Find("drone"));
					if (npc1 != null)
						GameObject.Destroy(GameObject.Find(npc1.name));	
					if (npc2 != null)
						GameObject.Destroy(GameObject.Find(npc2.name));	
					if (npc3 != null)
						GameObject.Destroy(GameObject.Find(npc3.name));
					if (npc4 != null)
						GameObject.Destroy(GameObject.Find(npc4.name));	
					if (npc5 != null)
						GameObject.Destroy(GameObject.Find(npc5.name));
					if (npc6 != null)
						GameObject.Destroy(GameObject.Find(npc6.name));	
				}
				
				if (Vector3.Distance(drone.position, GameObject.Find("KrulStation").transform.position) < 10 &&
					Vector3.Distance(montarShip.position, GameObject.Find("KrulStation").transform.position) < 10 &&
					npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null && npc6 == null)
				{
					sMessageDestroy();
					sm0trig7 = true;
					
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("Montar"));
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}
		
		else if (HUD.usrsmCurrent == 15)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-2317,0,-45), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}
			
			else if (sm0trig2 == false)
			{
				sMessage("Okay, while im re-engineering this shivan interceptor, go ahead and thin out the shivan population! (this may take awhile)\nFollow the yellow target to the location!");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 10)
				{
					sMessageDestroy();
					sm0trig2 = true;
					
					GameObject.Destroy(GameObject.Find("drone"));
					killCount = HUD.killTotal;
					HUD.killRank = 0;
					HUD.killPlayer = null;
				}
			}
			
			else if (sm0trig3 == false)
			{
				sMessage("Destroy those Shivans!");
				
				if ((HUD.killTotal - killCount) >= 20)
				{
					sMessageDestroy();
					sm0trig3 = true;
				}
			}
			
			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}
		}

		else if (HUD.usrsmCurrent == 16)
		{
			if (sm0trig1 == false)
			{
				drone = Instantiate(droneTemplate, Vector3(-2021,0,-215), Quaternion.identity);
				drone.name = "drone";
				sm0trig1 = true;
			}

			else if (sm0trig2 == false)
			{
				sMessage("Head back to the Krul station, the ship is ready!");
				
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 10)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
										
					var tmppos : Vector3 = GameObject.Find(HUD.usrAccount).transform.position;
					var tmprot : Quaternion = GameObject.Find(HUD.usrAccount).transform.rotation;
					
					Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
					GameObject.Find(HUD.usrAccount).GetComponent(PlayerMovement).rPlayer(HUD.usrAccount);
					
					var respawn = PhotonNetwork.Instantiate("shivanInterceptor", tmppos, tmprot,0);
					respawn.name = HUD.usrAccount;
					
					drone = Instantiate(droneTemplate, Vector3(-2214,0,-404), Quaternion.identity);
					drone.name = "drone";
					
					shivanStation = Instantiate(shivanStationTemplate, Vector3(-2214,0,-404), Quaternion.identity);
					shivanStation.name = "shivanstation";
					
					npcSentry1 = Instantiate(npcSentryTemplate, Vector3(-2204,0,-394), Quaternion.identity);
					npcSentry2 = Instantiate(npcSentryTemplate, Vector3(-2224,0,-414), Quaternion.identity);
					npcSentry3 = Instantiate(npcSentryTemplate, Vector3(-2204,0,-414), Quaternion.identity);
					npcSentry4 = Instantiate(npcSentryTemplate, Vector3(-2224,0,-394), Quaternion.identity);
					
					Camera.main.GetComponent(HUD).requestAlienMode(true);
					sm0trig2 = true;
				}
			}
			
			else if (sm0trig3 == false)
			{
				sMessage("Okay, DO NOT SHOOT ANYTHING!\nMost of the systems were damaged, so we outfitted this shivan ship with Krul technology, i want you go to the yellow target and investigate the area");
				
				if (HUD.usrHealth <= 0)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					missionFailed = true;
					
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
				}
						
				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 150)
				{
					sMessageDestroy();
					sm0trig3 = true;
				}
			}
			
			else if (sm0trig4 == false)
			{
				sMessage("If all goes well, you will not be detected, also, if you shoot them, they will attack you! fly slowly!");
				
				if (HUD.usrHealth <= 0)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					missionFailed = true;
					
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
				}

				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 20)
				{
					sMessageDestroy();
					sm0trig4 = true;
					
					cynicalShip = Instantiate(cynicalTemplate, Vector3(-2214,0,-604), Quaternion.identity);
					cynicalShip.name = "Cynical";
					
					patrolSweep = false;
				}
			}
			
			else if (sm0trig5 == false)
			{
				sMessage("EGADS! They have a station & sentries!! Wait, keep watching, lets see what else is here...");
				
				if (HUD.usrHealth <= 0)
				{
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					GameObject.Destroy(cynicalShip.gameObject);
					missionFailed = true;
					
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
				}

				var tmptargetcynpos : Vector3;
				
				if (patrolSweep == false)
				{
					tmptargetcynpos = Vector3(-2214,0,-404);
					if (Vector3.Distance(cynicalShip.position, Vector3(-2214,0,-404)) <= 1)
					{
						patrolSweep = true;
					}
				}
				
				else if (patrolSweep == true)
				{					
					tmptargetcynpos = Vector3(-2214,0,-604);
					if (Vector3.Distance(cynicalShip.position, Vector3(-2214,0,-604)) <= 1)
					{
						patrolSweep = false;
					}
				}
				
				var tmpcynpos : Vector3;
				tmpcynpos = Vector3.Lerp(cynicalShip.position, tmptargetcynpos, Time.deltaTime * 0.25);
				cynicalShip.position = tmpcynpos;

				if (patrolSweep == true)
				{
					sMessageDestroy();
					sm0trig5 = true;
				}
			}

			else if (sm0trig6 == false)
			{
				GameObject.Destroy(GameObject.Find("drone"));
				
				drone = Instantiate(droneTemplate, GameObject.Find("KrulStation").transform.position, Quaternion.identity);
				drone.name = "drone";

				npc1 = Instantiate(missionVindicatorTemplate, GameObject.Find("trinispace").transform.position, Quaternion.identity);
				npc1.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
				npc1.GetComponent(missionNpcBrain).npcHealth = 350;
				npc1.GetComponent(missionNpcBrain).npcHealthMax = 350;
				npc1.GetComponent(missionNpcBrain).npcRank = 29;
				npc1.GetComponent(missionNpcBrain).blasterPower = 15;
				npc1.name = "Vindicator";

				npc2 = Instantiate(missionRuptureTemplate, GameObject.Find("trinispace").transform.position, Quaternion.identity);
				npc2.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
				npc2.GetComponent(missionNpcBrain).npcHealth = 350;
				npc2.GetComponent(missionNpcBrain).npcHealthMax = 350;
				npc2.GetComponent(missionNpcBrain).npcRank = 29;
				npc2.GetComponent(missionNpcBrain).blasterPower = 15;
				npc2.name = "Rupture";

				npc3 = Instantiate(missionSentinelTemplate, GameObject.Find("trinispace").transform.position, Quaternion.identity);
				npc3.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
				npc3.GetComponent(missionNpcBrain).npcHealth = 350;
				npc3.GetComponent(missionNpcBrain).npcHealthMax = 350;
				npc3.GetComponent(missionNpcBrain).npcRank = 29;
				npc3.GetComponent(missionNpcBrain).blasterPower = 15;
				npc3.name = "Sentinel";

				sm0trig6 = true;
			}
			
			else if (sm0trig7 == false)
			{
				sMessage("WHAT THE HELL IS THAT!!!?!?\nI have never seen that ship configuration before!! Lets get out of here, back to the base! Keep the ship alive!!");

				if (patrolSweep == true)
				{					
					tmptargetcynpos = Vector3(-2214,0,-604);
					if (Vector3.Distance(cynicalShip.position, Vector3(-2214,0,-604)) <= 1)
					{
						patrolSweep = false;
					}
				}

				tmpcynpos = Vector3.Lerp(cynicalShip.position, tmptargetcynpos, Time.deltaTime * 0.25);
				cynicalShip.position = tmpcynpos;

				if (HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					GameObject.Destroy(cynicalShip.gameObject);
					missionFailed = true;
				}

				if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, drone.position) < 100)
				{
					sMessageDestroy();
					sm0trig7 = true;
				}
			}
			
			else if (sm0trig8 == false)
			{
				sMessage("Look, there's more of them! WHAT ARE THEY??? Destroy them before you get destroyed, do not get killed!");
				
				if (HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					GameObject.Destroy(cynicalShip.gameObject);
					missionFailed = true;
				}

				if (npc1 == null && npc2 == null && npc3 == null)
				{
					sMessageDestroy();
					sm0trig8 = true;
				}
			}
			
			else if (sm0trig9 == false)
			{
				sMessage("Head back to the Krul station & dock to complete the mission!");
				
				if (HUD.usrHealth <= 0)
				{
					Camera.main.GetComponent(HUD).FailSMrequest(HUD.usrsmCurrent);
					sMessageDestroy();
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					GameObject.Destroy(cynicalShip.gameObject);
					missionFailed = true;
				}

				if (HUD.nowDocked == true)
				{
					sMessageDestroy();
					
					GameObject.Destroy(GameObject.Find("drone"));
					GameObject.Destroy(GameObject.Find("shivanstation"));
					GameObject.Destroy(npcSentry1.gameObject);
					GameObject.Destroy(npcSentry2.gameObject);
					GameObject.Destroy(npcSentry3.gameObject);
					GameObject.Destroy(npcSentry4.gameObject);
					GameObject.Destroy(cynicalShip.gameObject);

					sm0trig9 = true;
				}
			}

			else
			{
				Camera.main.GetComponent(HUD).CompleteSM(HUD.usrsmCurrent);
			}			
		}
	}
}