#pragma strict

var station : Transform;
var phaseSentry : Transform;

static var viewHUD : boolean = true;
var viewHUDmini : GameObject;

var HUD : GUISkin;
var HUDtemp : GUISkin;
var HUDtemp2 : GUISkin;
var HUDNew : GUISkin;
var HUDTechT : GUISkin;
var HUDTechB : GUISkin;
var HUDMenus : GUISkin;

var tLetgo : boolean;

//private var selfTRect = Rect(5,-27,Screen.width/6+12,Screen.height/6+67+12+57);
private var selfTRect = Rect(5,-27,152+12,290);
private var selfHERect = Rect(5,15,152,45);

//private var enemyTRect = Rect(Screen.width - (Screen.width/6)-5-12,5,Screen.width/6+12,Screen.height/6+45+12);
private var enemyTRect = Rect(Screen.width - (Screen.width/6)-5-12,-27,Screen.width/6+12,268);

//private var techRect = Rect(Screen.width - (Screen.width/2)-5, Screen.height - (Screen.height/16)-5, Screen.width/2, Screen.height/16);
private var techRect = Rect(Screen.width - 365, Screen.height - 112, 365, 40);
private var techBRect = Rect(Screen.width - 365, Screen.height - 20, 365, 40);

private var AtechRect = Rect(Screen.width - 365-27+80, Screen.height - 112-240, 365+27+20-80, 112+240+27);
//private var AtechBRect = Rect(Screen.width - 365-160, Screen.height - 20, 365+160, 40);

static var mmsg : String;

var shivanInterceptor : Transform;

var phaseCrimson : Transform;
var phaseBarricade : Transform;
var phaseMagnum : Transform;
var phaseZealot : Transform;
var phaseSentinel : Transform;
var phaseCrawler : Transform;

var association1 : Transform;
var TriniArmor : Transform;
var TriniArmorHybrid : Transform;
var TriniFighter : Transform;
var TriniFighterHybrid : Transform;

var KrulArmor : Transform;
var KrulFighter : Transform;
var KrulAlloy : Transform;
var KrulFusion : Transform;


var explosion : Transform;
var bloodstone : Transform;
var modules : Transform;

var minimap : boolean = false;

static var sAvatar : String;
static var sName : String;
static var sRank : int;
static var sHealth : float;
static var sHealthMax : float;
static var sHealthPercent : float;

static var usrAccount = "";
static var usrGM : int;
static var usrAvatar = "";
static var usrPvp = 0;
static var usrBlasterPower : float;
static var usrAlienMode : boolean;

static var usrZone : String;
static var usrBloodstone : int;
static var usrAmethyst : int;
static var usrMinerals : int;
static var usrAmber : int;
static var usrAzurite : int;
static var usrModules : int;

static var usrRockets : int;
static var usrSentries : int;

static var usrHealth : float = 20.0000;
static var usrHealthMax : float = 20.0000;
static var usrHealthPercent : float = 0.0000;
static var healthUpdate = false;

static var usrEnergy : float = 10.0000;
static var usrEnergyMax : float = 10.0000;
static var usrEnergyPercent : float = 0.0000;
static var energyUpdate = false;
static var energyTime = 0.0000;
static var energyTimeRepair = 0.0000;

static var usrExperience : float;
static var usrExperienceMax : float;
static var usrExperiencePercent : float;
static var usrRank : int;

static var usrSkills : int;
static var usrSkillHealth : int;
static var usrSkillEnergy : int;
static var usrSkillPower : int;

var specialEvent : GameObject;
var specialEventDatestamp : long;

var energyBooster : GameObject;
var repairBooster : GameObject;

static var usrEnergyMembership : int = 1;
static var usrRepairMembership : int = 1;
static var usrEnergyDateMem : long;
static var usrRepairDateMem : long;
static var energyBoosterTime;
static var energyBoosterDate : String;
static var repairBoosterTime;
static var repairBoosterDate : String;

static var usrShipids : String;
static var usrShips : String;
static var usrShipnames : String;
static var usrActiveship : String;
static var usrActiveshipname : String = "";

static var usrsmComplete : int;
static var usrsmEngaged : int;
static var usrsmCurrent : int;

static var afterburner = false;
static var collector = false;
static var repair = false;
static var activator = false;
static var activatorMission = false;
static var installedactivator = false;
static var activatorClose = false;
static var selectedGate : String;
var gateWindow : GameObject;

static var QuestsMenu : boolean = false;
var missionIcon : GameObject;

var mHealth : Texture;
var mEnergy : Texture;
var mExperience : Texture;

var mProfile : Texture;
var mLogout : Texture;
var mShop : Texture;
var mPlanets : Texture;
var mSquad : Texture;
var mSupport : Texture;
var mPvp : Texture;
var mNews : Texture;
var mExit : Texture;
var msExit : Texture;
var mMissions : Texture;

var mBloodstone : Texture;
var mAmethyst : Texture;
var mMinerals : Texture;

var tBlaster : Texture;
static var tBlasterWaitTime = 0.0000;
static var tBlasterTrigger = false;
static var tBlasterTriggerServer = false;
var BlasterPrefab:Transform;
static var TriggerLocalBlasters = false;
static var timeBetweenBlasterShots = 0.125;//0.075;
var timeBlaster = 0.0000;
static var blast11 = false;
var blast22 = false;
var blast33 = false;
var blast44 = false;
var blast55 = false;

var tAfterburner : Texture;
var tCollector : Texture;
var tRepair : Texture;
var tRockets : Texture;
var tSentry : Texture;

static var gmcFlag : boolean;
static var cmds = "";
var cmdsEnd = 10;
var cmdsEndin = 0;

static var killTotal : int;
static var killRank : int;
static var killPlayer : String;

var mm : GameObject;

static var ProfileWindow : boolean;
static var BuddyWindow : boolean;

var fadeNMtrig : boolean;
var fadeNMvalue : float;


static var triggerName : String;
static var triggerPower : float;
static var triggerPvp : int;
static var triggerTarget : String;

static var PlayerShip : GameObject;

var mNotification : Transform;
var mNotificationFail : Transform;
static var chatCounter : int;

static var globalDock : boolean;
static var globalDockStation : String;
static var nowDocked : boolean;

var getAmethyst : GameObject;
var buyAmethyst : GameObject;

var craftingSystem : GameObject;
var newsWindow : GameObject;

var discoWindow : GameObject;
var helpWindow : GameObject;

@RPC
function instantiateShip (shipspawn : String, newpos : Vector3) {}

@RPC
function useSentries ()
{
	Camera.main.networkView.RPC ("useSentries", RPCMode.Server);
}

@RPC
function requestSentries ()
{
	Camera.main.networkView.RPC ("requestSentries", RPCMode.Server);
}

@RPC
function amountSentries (amount : int)
{
	usrSentries = amount;
}

@RPC
function useRockets ()
{
	Camera.main.networkView.RPC ("useRockets", RPCMode.Server);
}

@RPC
function requestRockets ()
{
	Camera.main.networkView.RPC ("requestRockets", RPCMode.Server);
}

@RPC
function amountRockets (amount : int)
{
	usrRockets = amount;
}

@RPC
function refineToAmber ()
{
	Camera.main.networkView.RPC ("refineToAmber", RPCMode.Server);
}

@RPC
function refineToAzurite ()
{
	Camera.main.networkView.RPC ("refineToAzurite", RPCMode.Server);
}

@RPC
function fuseSentries ()
{
	Camera.main.networkView.RPC ("fuseSentries", RPCMode.Server);
}

@RPC
function fuseRockets()
{
	Camera.main.networkView.RPC ("fuseRockets", RPCMode.Server);
}

@RPC
function requestAmber ()
{
	Camera.main.networkView.RPC ("requestAmber", RPCMode.Server);
}

@RPC
function Amber (amount : int)
{
	usrAmber = amount;
}

@RPC
function requestAzurite ()
{
	Camera.main.networkView.RPC ("requestAzurite", RPCMode.Server);
}

@RPC
function Azurite (amount : int)
{
	usrAzurite = amount;
}

@RPC
function requestModules ()
{
	Camera.main.networkView.RPC ("requestModules", RPCMode.Server);
}

@RPC
function Modules (amount : int)
{
	usrModules = amount;
}

@RPC
function requestMinerals ()
{
	Camera.main.networkView.RPC ("requestMinerals", RPCMode.Server);
}

@RPC
function Minerals (amount : int)
{
	usrMinerals = amount;
}

@RPC
function requestMemberships ()
{
	Camera.main.networkView.RPC ("requestMemberships", RPCMode.Server);
}

@RPC
function Memberships (eMem : int, eDateMem : String, rMem : int, rDateMem : String)
{
	usrEnergyMembership = eMem;
	usrRepairMembership = rMem;
	energyBoosterDate = eDateMem;
	repairBoosterDate = rDateMem;
	
	//TimeSpan.FromTicks(System.DateTime.Now.Ticks - pEnergydatemem[int.Parse(nPlayers[i].ToString()) - 1]).TotalDays
	if (eMem > 1)
		energyBooster.SetActive(true);
	else if (eMem == 1)
		energyBooster.SetActive(false);
	
	if (rMem > 1)
		repairBooster.SetActive(true);
	else if (rMem == 1)
		repairBooster.SetActive(false);
}

function enterSpace ()
{
	GameObject.Find("TriniArea/SpaceCamera").camera.enabled = false;
	GameObject.Find("KrulArea/SpaceCamera").camera.enabled = false;

	var temp1 = Vector3.Distance(GameObject.Find(usrAccount).transform.position,GameObject.Find("TriniArea/SpaceCamera").transform.position);
	var temp2 = Vector3.Distance(GameObject.Find(usrAccount).transform.position,GameObject.Find("KrulArea/SpaceCamera").transform.position);

	if (temp1 < temp2)
		GameObject.Find("TriniArea/SpaceCamera").camera.enabled = true;
		
	else if (temp2 < temp1)
		GameObject.Find("KrulArea/SpaceCamera").camera.enabled = true;
}

function spawnShip (newpos : Vector3)
{
	var respawn : Transform;

	// Trini Ships
	if (usrActiveship == "a_StarterShip")
		respawn = Network.Instantiate(association1, newpos, Quaternion.identity,0);

	else if (usrActiveship == "a_TriniArmor")
		respawn = Network.Instantiate(TriniArmor, newpos, Quaternion.identity,0);
		
	else if (usrActiveship == "a_TriniArmorHybrid")
		respawn = Network.Instantiate(TriniArmorHybrid, newpos, Quaternion.identity,0);

	else if (usrActiveship == "a_TriniFighter")
		respawn = Network.Instantiate(TriniFighter, newpos, Quaternion.identity,0);

	else if (usrActiveship == "a_TriniFighterHybrid")
		respawn = Network.Instantiate(TriniFighterHybrid, newpos, Quaternion.identity,0);
	
	// Krul Ships
	else if (usrActiveship == "KrulArmor")
		respawn = Network.Instantiate(KrulArmor, newpos, Quaternion.identity,0);

	else if (usrActiveship == "KrulFighter")
		respawn = Network.Instantiate(KrulFighter, newpos, Quaternion.identity,0);

	else if (usrActiveship == "KrulAlloy")
		respawn = Network.Instantiate(KrulAlloy, newpos, Quaternion.identity,0);

	else if (usrActiveship == "KrulFusion")
		respawn = Network.Instantiate(KrulFusion, newpos, Quaternion.identity,0);

	else if (usrActiveship == "shivanInterceptor")
		respawn = Network.Instantiate(shivanInterceptor, newpos, Quaternion.identity,0);

	// Phase Ships
	else if (usrActiveship == "phaseBarricade")
		respawn = Network.Instantiate(phaseBarricade, newpos, Quaternion.identity,0);
		
	else if (usrActiveship == "phaseCrimson")
		respawn = Network.Instantiate(phaseCrimson, newpos, Quaternion.identity,0);

	else if (usrActiveship == "phaseMagnum")
		respawn = Network.Instantiate(phaseMagnum, newpos, Quaternion.identity,0);
		
	else if (usrActiveship == "phaseZealot")
		respawn = PhotonNetwork.Instantiate("phaseZealot", newpos, Quaternion.identity,0).transform;

	else if (usrActiveship == "phaseSentinel")
		respawn = Network.Instantiate(phaseSentinel, newpos, Quaternion.identity,0);

	else if (usrActiveship == "shivanInterceptor")
		respawn = Network.Instantiate(shivanInterceptor, newpos, Quaternion.identity,0);
		
	else if (usrActiveship == "phaseCrawler")
		respawn = PhotonNetwork.Instantiate("phaseCrawler", newpos, Quaternion.identity,0)	.transform;

	respawn.position = newpos;
	respawn.name = usrAccount;
	respawn.tag = "Player";
	PlayerShip = GameObject.Find(usrAccount);
	
	//enterSpace();
}

function Start ()
{
	PhotonNetwork.isMessageQueueRunning = true;
	
	mm = GameObject.Find("MiniMap");
	
	usrAccount = PlayerPrefs.GetString("PlayerName");
	usrGM = PlayerPrefs.GetInt("PlayerGM");
	
	var pos : Vector3 = Vector3(PlayerPrefs.GetFloat("PlayerX"),PlayerPrefs.GetFloat("PlayerY"),PlayerPrefs.GetFloat("PlayerZ"));
	usrRank = PlayerPrefs.GetInt("PlayerRank");
	usrExperience = PlayerPrefs.GetFloat("PlayerExp");
	usrExperienceMax = PlayerPrefs.GetFloat("PlayerExpMax");
	usrZone = PlayerPrefs.GetString("PlayerZone");
	
	usrSkills = PlayerPrefs.GetInt("PlayerSkills");
	usrSkillHealth = PlayerPrefs.GetInt("PlayerSkillHealth");
	usrSkillEnergy = PlayerPrefs.GetInt("PlayerSkillEnergy");
	usrSkillPower = PlayerPrefs.GetInt("PlayerSkillPower");
	
	usrBloodstone = PlayerPrefs.GetInt("PlayerBloodstone");
	usrAmethyst = PlayerPrefs.GetInt("PlayerAmethyst");
	
	usrActiveship = PlayerPrefs.GetString("PlayerActiveShip");
	usrHealth = PlayerPrefs.GetFloat("PlayerActiveShipHealth");
	usrHealthMax = PlayerPrefs.GetFloat("PlayerActiveShipHealthMax");
	usrEnergy = PlayerPrefs.GetFloat("PlayerActiveShipEnergy");
	usrEnergyMax = PlayerPrefs.GetFloat("PlayerActiveShipEnergyMax");
	usrBlasterPower = PlayerPrefs.GetFloat("PlayerActiveShipBlasterPower");
	
	usrsmComplete = PlayerPrefs.GetInt("PlayerSMComplete");
	usrsmEngaged = PlayerPrefs.GetInt("PlayerSMEngaged");
	usrsmCurrent = PlayerPrefs.GetInt("PlayerSMCurrent");
	
	var ta = PlayerPrefs.GetInt("PlayerActivator");
	
	if (ta == 0)
		installedactivator = false;
		
	if (ta == 1)
		installedactivator = true;
		
	activatorClose = false;
		
	//usrHealth = PlayerPrefs.GetInt("PlayerHealth");
	//usrHealthMax = PlayerPrefs.GetInt("PlayerHealthMax");
	//usrPvp = PlayerPrefs.GetInt("PlayerPvp");
	
	usrEnergy = usrEnergyMax;
	afterburner = false;
	collector = true;
	
	usrHealthPercent = usrHealth / usrHealthMax;
	usrEnergyPercent = usrEnergy / usrEnergyMax;
	usrExperiencePercent = usrExperience / usrExperienceMax;
	
	energyTime = Time.fixedTime;
	
	Network.isMessageQueueRunning = true;
	
	// Make Ship Active
	/*var respawn : Transform;
	
	if (usrActiveship == "a_StarterShip")
		respawn = Instantiate(association1, pos, Quaternion.identity);

	else if (usrActiveship == "a_TriniArmor")
		respawn = Network.Instantiate(TriniArmor, pos, Quaternion.identity,0);
		
	else if (usrActiveship == "a_TriniArmorHybrid")
		respawn = Instantiate(TriniArmorHybrid, pos, Quaternion.identity);

	else if (usrActiveship == "a_TriniFighter")
		respawn = Network.Instantiate(TriniFighter, pos, Quaternion.identity,0);

	else if (usrActiveship == "a_TriniFighterHybrid")
		respawn = Instantiate(TriniFighterHybrid, pos, Quaternion.identity);

	respawn.name = usrAccount;*/
	
	//if (GameObject.Find(usrAccount) == null)
	//	spawnShip(pos);
	
	PhotonNetwork.CreateRoom("main");
	//PhotonNetwork.JoinRoom("main");
	
	//"PlayerShip";
	//SmoothFollowNew.target = respawn;
	//MouseOrbit.target = respawn;
	healthUpdate = true;
		
	// Set Avatar active
	//viewHUDmini = GameObject.Find(usrActiveship);
	//viewHUDmini.SetActiveRecursively(true);
	
	// Boost Specs with skills
	addSkills();
	//enterSpace();
	
	requestMemberships();
	requestMinerals();
	requestAmber();
	requestAzurite();
	requestModules();
	requestRockets();
	requestSentries();
	
	requestNews();
	requestShipName();
	requestISSpecialEvent();
}

function OnPhotonCreateRoomFailed()
{
	Debug.Log("*** Room already created, joining it ***");
	PhotonNetwork.JoinRoom("main");
}

function OnJoinedRoom()
{
	Debug.Log("*** JOINED THE MAIN ROOM ***");
	var pos : Vector3 = Vector3(PlayerPrefs.GetFloat("PlayerX"),PlayerPrefs.GetFloat("PlayerY"),PlayerPrefs.GetFloat("PlayerZ"));
	
	if (GameObject.Find(usrAccount) == null)
	{
		Debug.Log(" LOADING SHIP ");
		spawnShip(pos);
	}

	healthUpdate = true;
		
	// Set Avatar active
	//viewHUDmini = GameObject.Find(usrActiveship);
	//viewHUDmini.SetActiveRecursively(true);
	
	// Boost Specs with skills
	addSkills();
	//enterSpace();
	
	requestMemberships();
	requestMinerals();
	requestAmber();
	requestAzurite();
	requestModules();
	requestRockets();
	requestSentries();
	
	requestNews();
	requestShipName();
	requestISSpecialEvent();
}

function FixedUpdate ()
{
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
}

function Update () {
	// Screenshot Toggle
	if (Input.GetButtonDown("f11"))
	{
		if (StationScript.Docked == false)
		{
			if (viewHUD == true)
			{
				viewHUD = false;
				viewHUDmini.SetActiveRecursively(false);
				viewHUDmini.SetActive(true);
			}
			else if (viewHUD == false)
			{
				viewHUD = true;
				viewHUDmini.SetActive(true);
				viewHUDmini.SetActiveRecursively(true);
			}
		}
	}
	
	// Game Master Console
	if (Input.GetButtonDown("f9"))
	{
		if (usrGM >= 1)
		{
			if (gmcFlag == true)
				gmcFlag = false;
			else if (gmcFlag == false)
				gmcFlag = true;
		}
	}

	LocalShoot();
	
	if (healthUpdate)
	{
		healthUpdate = false;
		usrHealthPercent = usrHealth / usrHealthMax;
	}
	
	if (energyUpdate)
	{
		energyUpdate = false;
		usrEnergyPercent = usrEnergy / usrEnergyMax;
	}
	
	usrExperiencePercent = usrExperience / usrExperienceMax;
	
	if (usrExperience >= usrExperienceMax)
	{
		if (usrExperienceMax != 0)
		{
			usrRank++;
			usrExperience = 0;
			usrExperienceMax = usrExperienceMax + (usrExperienceMax / 2);
			//usrExperienceMax = usrExperienceMax * 2;
			networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax);
			
			// Turn on Visuals
			var tempGO2 : Transform = GameObject.Find(usrAccount).transform;
			
			for (var child : Transform in tempGO2)
			{
				if (child.gameObject.name == "Level")
				{
					child.gameObject.particleSystem.Simulate(0,true,true);
					child.gameObject.SetActiveRecursively(false);
					child.gameObject.SetActiveRecursively(true);
					//child.gameObject.particleSystem.particleEmitter.emit = true;
				}
			}
			// ---
		}
	}
	
	if (Input.GetButtonDown("2"))
	{		
		if (afterburner == true)
			afterburner = false;
		else if (afterburner == false)
			afterburner = true;
	}
	
	if (Input.GetButtonDown("3"))
	{
		if (repair == true)
			repair = false;
		else if (repair == false)
			repair = true;
	}

	/*if (Input.GetButtonDown("3"))
	{
		if (repair == true)
			repair = false;
		else if (repair == false)
			repair = true;
	}*/

	// Afterburner code
	if (afterburner == true)
	{
		energyUpdate = true; 
		if (usrEnergy > 0)
		{
			MoveAround.speed = 30;
			usrEnergy = usrEnergy - (Time.fixedTime - energyTime);
			energyTime = Time.fixedTime;
		}
		else
		{
			MoveAround.speed = 10;
			afterburner = false;
		}
	}	
	else if (afterburner == false)
	{
		energyUpdate = true;
		MoveAround.speed = 10;
		if (usrEnergy >= usrEnergyMax)
			energyTime = Time.fixedTime;
		else
			usrEnergy = usrEnergy + (((Time.fixedTime - energyTime)+(usrBlasterPower / 2000 )) * usrEnergyMembership);
			energyTime = Time.fixedTime;
	}

	// Repair code
	if (repair == true)
	{
		energyUpdate = true;
		healthUpdate = true;
		if (usrEnergy > 0)
		{
			if (usrHealth < usrHealthMax)
			{
				// Turn on Visuals
				var tempGO : Transform = GameObject.Find(usrAccount).transform;
				
				for (var child : Transform in tempGO)
				{
					if (child.gameObject.name == "Repair")
					{
						child.gameObject.SetActiveRecursively(true);
						//child.gameObject.particleSystem.particleEmitter.emit = true;
					}
				}
				// ---
				
				usrHealth = usrHealth + ((Time.fixedTime - energyTimeRepair)*2) * usrRepairMembership;
				usrEnergy = usrEnergy - ((Time.fixedTime - energyTimeRepair)*2) * usrRepairMembership;
				energyTimeRepair = Time.fixedTime;
			}
			else if (usrHealth >= usrHealthMax)
			{
				repair = false;
				usrHealth = usrHealthMax;
			}
		}
		else
		{
			//MoveAround.speed = 10;
			repair = false;
		}
	}
	else if (repair == false)
	{
		// Turn off Visuals
		if (GameObject.Find(usrAccount) != null)
			var tempGO1 : Transform = GameObject.Find(usrAccount).transform;
		
		for (var child1 : Transform in tempGO1)
		{
			if (child1.gameObject.name == "Repair")
			{
				child1.gameObject.particleSystem.Simulate(0,true,true);
				child1.gameObject.SetActiveRecursively(false);
			}
		}
		// ---
		
		energyTimeRepair = Time.fixedTime;
	}	
	/*else if (repair == false)
	{
		energyUpdate = true;
		//MoveAround.speed = 10;
		if (usrEnergy >= usrEnergyMax)
			energyTimeRepair = Time.fixedTime;
		else
			usrEnergy = usrEnergy + (Time.fixedTime - energyTimeRepair);
			energyTimeRepair = Time.fixedTime;
	}*/

	// Auto Collector code
	if (collector == true)
	{
		var bs = GameObject.FindGameObjectsWithTag("bloodstone");
		for (var c in bs)
		{
			var bs1 : GameObject = GameObject.Find(c.name);
			var bbScript : BloodstoneScript = bs1.GetComponent("BloodstoneScript");

			if (bbScript.tagged == false)
			{
				if (bbScript.autotagged == false)
				{
					if (Vector3.Distance(GameObject.Find(usrAccount).transform.position,GameObject.Find(c.name).transform.position) <= 15)
					{
						//var bbScript : BloodstoneScript = GameObject.Find(c.name).GetComponent("BloodstoneScript");
						Camera.main.networkView.RPC("CollectBloodstone",RPCMode.Server,usrAccount,c.name,bbScript.amount);
						bbScript.autotagged = true;
					}
				}
			}
		}
	}
	

}

/*function OnSerializeNetworkView (stream : BitStream, info : NetworkMessageInfo)
{
	var syncPosition : Vector3;
	
	Debug.Log("Writing...");
	
	if (stream.isWriting)
	{
		Debug.Log("Sending Packet: " + transform.position.x + " " + transform.position.y + " " + transform.position.z);
		syncPosition = transform.position;
		stream.Serialize(syncPosition);
	}
	//else
	//{
	//	stream.Serialize(ref syncPosition);
		
	//}
}*/

function OnDisconnectedFromServer(info : NetworkDisconnection)
{
	MenuController.phase1 = false;
	MenuController.phase2 = false;
	MenuController.phase3 = false;
	
	Debug.Log(info);
	MenuController.sDisco = true;

	Application.LoadLevel(0);
}

function selfTwindow(windowID : int)
{
	GUILayout.Space(1);
}

function enemyTwindow(windowID : int)
{
	GUILayout.Space(1);
}

function selfHEwindow(windowID : int)
{
	GUILayout.Space(1);
}

function enemyHEwindow(windowID : int)
{
	GUILayout.Space(1);
}

function techWindow(windowID : int)
{
	GUILayout.Space(1);
}

function techBWindow(windowID : int)
{
	GUILayout.Space(1);
}


function messageBox (themsg : String)
{
/*
	GUI.skin = smsgold;
	GUI.Box(tmpsmwinRect,"");
	GUI.Box(tmpsmwinRect,"");
	GUI.skin = smsg;
	HUD.sMessager(themsg);*/
	
	if (GameObject.Find("missionMessage") == null)
	{
		var mNot = Instantiate(Camera.main.GetComponent(StoryQuests).mNotification, Vector3(0,0,0), Quaternion.identity);
		mNot.transform.parent = GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").transform;
		mNot.transform.localScale = Vector3(0.5,0.5,0.5);
		mNot.name = "missionMessage";
		mNot.transform.Find("missionMessage").GetComponent(NotificationTextType).mission = themsg;
		mNot.active = true;
		
		GameObject.Destroy(GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage"),10);
	}
}

function messageBoxDestroy ()
{
	if (GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage") != null)
	{
		GameObject.Destroy(GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage"));
	}
}

function usesRockets ()
{
	if (usrActiveship == "a_TriniFighter"
	 || usrActiveship == "KrulFighter"
	 || usrActiveship == "phaseCrimson"
	 || usrActiveship == "phaseZealot"
	 || usrActiveship == "phaseCrawler")
	{ return true; }
	
	else
	{ return false; }
}

function usesSentry ()
{
	if (usrActiveship == "phaseSentinel")
	{ return true; }
	
	else
	{ return false; }
}

function OnGUI()
{
	GUI.depth = 0;
	GUI.skin = HUD;
	//GUI.skin.label.fontSize = 13;
	GUI.skin.label.fontSize = 0;
	
	// Game Master Console
	if (gmcFlag == true)
	{
		GUI.Box(Rect(Screen.width/2-100,Screen.height/2-100,200,200),"Game Master Console");
		cmds = GUI.TextArea(Rect(Screen.width/2-95,Screen.height/2+75,140,20),cmds);
		
		if (GUI.Button(Rect(Screen.width/2-95+140,Screen.height/2+75,50,20), "SEND"))
		{
			networkView.RPC("GMC",RPCMode.Server,cmds);
			cmds = "";
		}
		
		if (cmds.Length != 0)
			cmdsEndin = parseInt(cmds[cmds.Length-1]);
		
		if (cmdsEndin == cmdsEnd)
		{
			networkView.RPC("GMC",RPCMode.Server,cmds);
			Debug.Log(cmds);
			cmds = "";
		}
	}

	// Special Event Display
	if (specialEvent.active == true)
	{
		var specialEventDate = TimeSpan.FromTicks(specialEventDatestamp - System.DateTime.Now.Ticks).TotalDays;
		var tmpdate : String = specialEventDate.ToString();
		var splits3 = tmpdate.Split("."[0]);
		GUI.Label(Rect(20, 238, 200, 50), "Event!\n" + splits3[0] + " Days");
	}
	
	// Booster Display
	if (energyBooster.active == true)
	{
		energyBoosterTime = TimeSpan.FromTicks(System.DateTime.Now.Ticks - long.Parse(energyBoosterDate)).TotalDays;
		var tmpstring : String = energyBoosterTime.ToString();
		var tmptime : float = 30 - float.Parse(tmpstring);
		var splits = tmptime.ToString().Split("."[0]);
		GUI.Label(Rect(20,155,200,30),"" + splits[0] + " Days");
	}
	
	if (repairBooster.active == true)
	{
		repairBoosterTime = TimeSpan.FromTicks(System.DateTime.Now.Ticks - long.Parse(repairBoosterDate)).TotalDays;
		var tmpstring2 : String = repairBoosterTime.ToString();
		var tmptime2 : float = 30 - float.Parse(tmpstring2);
		var splits2 = tmptime2.ToString().Split("."[0]);
		GUI.Label(Rect(85,155,200,30),"" + splits2[0] + " Days");
	}
			
	// Death Routine
	if (usrHealth <= 0)
	{
		usrPvp = 0;
		repair = false;
		MoveAround.objSelected = false;
		MoveAround.SelectedTarget = null;
		
		//if (GameObject.Find(usrAccount) != null)
		//	Destroy(GameObject.Find(usrAccount));
			
		GUI.Box(Rect((Screen.width/2)-100,(Screen.height/2)-100,200,200),"Revive?");
		if (GUI.Button(Rect((Screen.width/2)-95,(Screen.height/2)-70,190,20),"Respawn at station"))
		{			
						
			//respawn.name = usrAccount;
			//SmoothFollowNew.target = respawn;
			//MouseOrbit.target = respawn;

			//PlayerPrefs.SetFloat("PlayerX",GameObject.Find(usrAccount).transform.position.x);
			//PlayerPrefs.SetFloat("PlayerY",GameObject.Find(usrAccount).transform.position.y+2);
			//PlayerPrefs.SetFloat("PlayerZ",GameObject.Find(usrAccount).transform.position.z);
			
			//Destroy(GameObject.Find(usrAccount));
			
			usrHealth = usrHealthMax;
			usrEnergy = usrEnergyMax;
			healthUpdate = true;
			afterburner = false;
			blast11 = false;
			blast22 = false;
			blast33 = false;
			blast44 = false;
			blast55 = false;
			
			//PlayerShip.SetActive(true);
			//PlayerShip.transform.position = Vector3(-76.94347,0,-52.7742);
			
			if (GameObject.Find(usrAccount) == null)
				spawnShip(Vector3(-76.94347,0,-52.7742));
			
			/*StationScript.tabHangar = true;
			StationScript.tabShips = false;
			StationScript.tabSkills = false;
			StationScript.tabTechs = false;
			StationScript.Docked = true;*/
			
			// Boost Specs with skills
			//networkView.RPC("HealthUpdateRequest",RPCMode.Server,usrAccount,usrHealth,usrHealthMax);
			addSkills();
			
			Debug.Log(usrZone);
			//if (usrZone != "trinispace")
			//	networkView.RPC("Teleport",RPCMode.Server,"trinispace");
		}
	}

	// Mini Map
	mm.SetActive(false);
	/* *** Disabled for now ***
	if (viewHUD == true)
	{
		if (minimap == false)
		{
			if (GUI.Button(Rect(Screen.width-20,Screen.height/2,20,20),"<"))
			{
				minimap = true;
			}
			
			mm.SetActive(false);
		}
		
		if (minimap == true)
		{
			GUI.Box(Rect(Screen.width-Screen.width/5,      Screen.height - Screen.height/2.4       ,Screen.width/5,Screen.height/3.7),"");
			
			var coords : Vector3;
			
			if (GameObject.Find(usrAccount) != null)
				coords = GameObject.Find(usrAccount).transform.position;
			else
				coords = Camera.main.transform.position;
			
			GUI.skin = HUDtemp;
			GUI.Label(Rect(Screen.width-Screen.width/5+20,      (Screen.height - Screen.height/2.4)+Screen.height/4.3       ,Screen.width/5,Screen.width/5),
				"X: " + Mathf.Floor(coords.x) + "     Y: " + Mathf.Floor(coords.y) + "     Z: " + Mathf.Floor(coords.z));
			GUI.skin = HUD;
			
			if (GUI.Button(Rect(Screen.width-20,Screen.height/2,20,20),">"))
			{
				minimap = false;
			}
			
			mm.SetActive(true);
		}
	} */
	
	// Menu bar
	if (viewHUD == true)
	{
		//GUI.Box(Rect(Screen.width/2-(50*4), 5, 50*8, 50),"");
		if (GUI.Button(Rect(Screen.width/2-70-(80*2)-10, 5, 80, 80), mProfile, ""))
		{
			if (ProfileWindow == true)
				ProfileWindow = false;
			else if (ProfileWindow == false)
				ProfileWindow = true;
		}
		if (GUI.Button(Rect(Screen.width/2-70-(80*1), 5, 80, 80), mLogout, ""))
		{
			discoWindow.SetActive(true);
		}
		if (GUI.Button(Rect(Screen.width - 90, 10, 80, 80), mShop, ""))
		{
			/*if (BuddyWindow == true)
				BuddyWindow = false;
			else if (BuddyWindow == false)
				BuddyWindow = true;*/
			
		}
		//else if (GUI.Button(Rect(Screen.width/2-(50*2), 5, 50, 50), mPlanets, ""))
		//{
		//}
		//else if (GUI.Button(Rect(Screen.width/2-(50*2), 5, 50, 50), mSquad, ""))
		//{
		//}
		if (usrPvp == 0)
		{
			if (GUI.Button(Rect(Screen.width/2-(60), 5, 120, 120), mPvp, ""))
			{
				usrPvp = 1;
			}
		}
		if (usrPvp == 1)
		{
			if (GUI.Button(Rect(Screen.width/2-(60), 5, 120, 120), mPlanets, ""))
			{
				usrPvp = 0;
			}
		}
		if (GUI.Button(Rect(Screen.width/2+70+(80*0), 5, 80, 80), mNews, ""))
		{
			if (newsWindow.active == false)
				requestNews();
				
			else if (newsWindow.active == true)
				newsWindow.SetActive(false);
		}
		if (GUI.Button(Rect(Screen.width/2+70+(80*1)+10, 5, 80, 80), mSupport, ""))
		{
			if (helpWindow.active == false)
				helpWindow.SetActive(true);
			
			else if (helpWindow.active == true)
				helpWindow.SetActive(false);
		}
	}
	
	// Experience bar & Bloodstone / Amethyst / Minerals
	if (viewHUD == true)
	{
		//GUI.Box(Rect(Screen.width - (Screen.width/2)-5,Screen.height - (Screen.height/7.30) ,Screen.width/2,(Screen.height/15.5)),"");
		//GUI.Label(Rect(Screen.width - (Screen.width/2),Screen.height - (Screen.height/7.30),200,30),"Bloodstone: " + usrBloodstone);
		
		GUI.Label(Rect(20,70,200,30),"" + usrBloodstone);
		GUI.DrawTexture(Rect(10,10,60,60),mBloodstone);
		
		GUI.Label(Rect(85,70,200,30),"" + usrAmethyst);
		if (GUI.Button(Rect(75,10,60,60),mAmethyst,""))
		{
			if (getAmethyst.active == false)
				getAmethyst.SetActive(true);
				
			else if (getAmethyst.active == true)
			{
				getAmethyst.SetActive(false);
				buyAmethyst.SetActive(false);
			}

		/*
			if (Application.isWebPlayer)
				Application.ExternalEval("window.open('http://iframe.sponsorpay.com/?appid=13142&uid=" + usrAccount + "','_blank')");
			else
				Application.OpenURL("http://iframe.sponsorpay.com/?appid=13142&uid=" + usrAccount);*/
		}
		
		GUI.Label(Rect(150,70,200,30),"" + usrMinerals);
		if (GUI.Button(Rect(140,10,60,60),mMinerals,""))
		{
			if (craftingSystem.active == false)
			{
				if (nowDocked == false)
					messageBox("You have to be docked to access the crafting system");
				else
					craftingSystem.SetActive(true);
			}
				
			else if (craftingSystem.active == true)
				craftingSystem.SetActive(false);
		}
		
		//GUI.DrawTexture(Rect(16,(Screen.height/6)+30,(Screen.width/6-10) * Mathf.Clamp01(usrEnergyPercent),5), mEnergy);
		//---GUI.DrawTexture(Rect(Screen.width - (Screen.width/2),Screen.height - (Screen.height/10.30)+5,((Screen.width/2)-10) * Mathf.Clamp01(usrExperiencePercent),(Screen.height/40)-10), mExperience);
	}
		
	// Tech box
	var App = Application.platform;
	App = RuntimePlatform.Android;
		
	// Blaster Tech
	if (viewHUD == true)
	{
		if (App == RuntimePlatform.Android)
		{
			GUI.Label(Rect(Screen.width - 95, Screen.height - 105, 80, 80),tBlaster,"");
			GUI.Label(Rect(Screen.width - 185, Screen.height - 105, 80, 80),tRepair,"");
			GUI.Label(Rect(Screen.width - 275, Screen.height - 105, 80, 80),tAfterburner,"");
			
			// Rockets Tech
			if (usesRockets() == true)
			{
					GUI.Label(Rect(Screen.width - 130, Screen.height - 210, 80, 80),"x" + usrRockets.ToString());
					GUI.Label(Rect(Screen.width - 95, Screen.height - 240, 80, 80),tRockets,"");
			}
			
			else if (usesSentry() == true)
			{
					GUI.Label(Rect(Screen.width - 130, Screen.height - 210, 80, 80),"x" + usrSentries.ToString());
					GUI.Label(Rect(Screen.width - 95, Screen.height - 240, 80, 80),tSentry,"");
			}

			for (var i = 0; i < Input.touchCount; ++i)
			{
				var r1 = Rect(Screen.width - 95, Screen.height - 105, 80, 80);
				var r2 = Rect(Screen.width - 185, Screen.height - 105, 80, 80);
				var r3 = Rect(Screen.width - 275, Screen.height - 105, 80, 80);
				var r4 = Rect(Screen.width - 95, Screen.height - 240, 80, 80);
				
				var tpos = Input.GetTouch(i).position;
				tpos.y = Screen.height - tpos.y;
				
				// Blaster
				if (r1.Contains(tpos))
				{
					if (tBlasterTrigger == false)
					{
						if (usrEnergy >= float.Parse(usrBlasterPower.ToString()))
						{
							tBlasterTrigger = true;
							tBlasterWaitTime = Time.fixedTime;
							networkView.RPC("ShootRequest",RPCMode.Server,usrAccount,usrBlasterPower,usrPvp,MoveAround.SelectedTarget);
						}
					}
				}
				
				// Repair
				if (r2.Contains(tpos) && tLetgo == false)
				{
					tLetgo = true;
					Debug.Log("repair touched");
					if (repair == true)
						repair = false;
					else if (repair == false)
						repair = true;
				}
									
				// Afterburner
				else if (r3.Contains(tpos) && tLetgo == false)
				{
					tLetgo = true;
					Debug.Log("afterburner touched");
					if (afterburner == true)
						afterburner = false;
					else if (afterburner == false)
						afterburner = true;
				}
				
				// Special Tech
				if (r4.Contains(tpos) && tLetgo == false)
				{
					tLetgo = true;
					if (Input.GetTouch(i).phase == TouchPhase.Began)
					{
						if (MoveAround.objSelected == true && MoveAround.SelectedTarget != "" && MoveAround.SelectedTarget != null && usesRockets() == true && usrRockets > 0)
						{
							requestAlienMode(false);
							useRockets();
							Network.Instantiate(station, GameObject.Find(usrAccount + "/BlasterSpawn").transform.position, Quaternion.identity,0);
						}
						
						else if (usesSentry() == true && usrSentries > 0)
						{
							requestAlienMode(false);
							useSentries();
							Network.Instantiate(phaseSentry, GameObject.Find(usrAccount + "/BlasterSpawn").transform.position, Quaternion.identity,0);
						}
					}
				}
				
				if (Input.GetTouch(i).phase == TouchPhase.Ended)
				{
					tLetgo = false;
					if (!r2.Contains(tpos))
						repair = false;
					if (!r3.Contains(tpos))
						afterburner = false;
				}
			}
			
			// Blaster
			if (tBlasterTrigger == true)
			{
				if (tBlasterTriggerServer == true) {
					if (Time.fixedTime - tBlasterWaitTime >= 2)
					{
						tBlasterTrigger = false;
						tBlasterTriggerServer = false;
					}
				}
		
				var timeLeft2 = 2 - (Time.fixedTime - tBlasterWaitTime);
				GUI.skin = HUDtemp2;
				GUI.Box(Rect(Screen.width - 95, Screen.height - 105, 80, 80),"");
				GUI.Box(Rect(Screen.width - 95, Screen.height - 105, 80, 80),"");
				GUI.Label(Rect(Screen.width - 95, Screen.height - 105, 80, 80),Mathf.Floor(timeLeft2).ToString());
				GUI.skin = HUD;
			}

			if (timeLeft2 <= -5)
			{
				TriggerLocalBlasters = false;
				tBlasterTrigger = false;
				tBlasterTriggerServer = false;
				blast11 = false;
				blast22 = false;
				blast33 = false;
				blast44 = false;
				blast55 = false;
			}
				
			// Repair
			if (repair == true)
			{
				GUI.skin = HUDtemp2;
				GUI.Box(Rect(Screen.width - 185, Screen.height - 105, 80, 80),"");
				GUI.Box(Rect(Screen.width - 185, Screen.height - 105, 80, 80),"");
				GUI.Label(Rect(Screen.width - 185, Screen.height - 105, 80, 80),"O");
				GUI.skin = HUD;
			}

			// Afterburner
			if (afterburner == true)
			{
				GUI.skin = HUDtemp2;
				GUI.Box(Rect(Screen.width - 275, Screen.height - 105, 80, 80),"");
				GUI.Box(Rect(Screen.width - 275, Screen.height - 105, 80, 80),"");
				GUI.Label(Rect(Screen.width - 275, Screen.height - 105, 80, 80),Mathf.Floor(usrEnergy).ToString());
				GUI.skin = HUD;
			}

		}
		
		if (Application.platform != RuntimePlatform.Android)
		{
			if (GUI.Button(Rect(Screen.width - 95, Screen.height - 105, 80, 80), "", ""))
			{
				if (tBlasterTrigger == false)
				{
					if (usrEnergy >= float.Parse(usrBlasterPower.ToString()))
					{
						tBlasterTrigger = true;
						tBlasterWaitTime = Time.fixedTime;
						networkView.RPC("ShootRequest",RPCMode.Server,usrAccount,usrBlasterPower,usrPvp,MoveAround.SelectedTarget);
					}
				}
			}
			if (GUI.Button(Rect(Screen.width - 185, Screen.height - 105, 80, 80),"",""))
			{
				tLetgo = true;
				Debug.Log("repair touched");
				if (repair == true)
					repair = false;
				else if (repair == false)
					repair = true;
			}
			if (GUI.Button(Rect(Screen.width - 275, Screen.height - 105, 80, 80),"",""))
			{
				tLetgo = true;
				Debug.Log("afterburner touched");
				if (afterburner == true)
					afterburner = false;
				else if (afterburner == false)
					afterburner = true;
			}
			if (usesRockets() == true)
			{
				if (GUI.Button(Rect(Screen.width - 95, Screen.height - 240, 80, 80),"",""))
				{
					if (MoveAround.objSelected == true && MoveAround.SelectedTarget != "" && MoveAround.SelectedTarget != null && usesRockets() == true && usrRockets > 0)
					{
						requestAlienMode(false);
						useRockets();
						Network.Instantiate(station, GameObject.Find(usrAccount + "/BlasterSpawn").transform.position, Quaternion.identity,0);
					}
				}
			}
			if (usesSentry() == true)
			{
				if (GUI.Button(Rect(Screen.width - 95, Screen.height - 240, 80, 80),"",""))
				{
					if (usrSentries > 0)
					{
						requestAlienMode(false);
						useSentries();
						Network.Instantiate(phaseSentry, GameObject.Find(usrAccount + "/BlasterSpawn").transform.position, Quaternion.identity,0);
					}
				}
			}
		}
	}

	// Activator Tech
	if (viewHUD == true)
	{
		if (installedactivator == true)
		{
			if (App == RuntimePlatform.Android)
			{
				if (activatorClose == false)
				{
					GUI.Label(Rect(Screen.width - 365, Screen.height - 105, 80, 80),mExit,"");
					gateWindow.SetActive(false);
				}
				else if (activatorClose == true)
				{
					if (GUI.Button(Rect(Screen.width - 365, Screen.height - 105, 80, 80),mSquad,""))
					{
						// new
						if (gateWindow.active == false)
							gateWindow.SetActive(true);
						
						else if (gateWindow.active == true)
							gateWindow.SetActive(false);
							
						// old
						//activator = true;
						//activatorMission = true;
						
						// really old
						//activatorClose = false;
						//networkView.RPC("Teleport",RPCMode.Server,"triniplanet");
					}
				}
			}
		}
	}
	
	//GUI.Label(Rect(Screen.width/2-10, Screen.height-40, 200, 50),"Speed: " + MoveAround.forwardbackward.ToString());
	
	
	// Redesigned missions system
	if (viewHUD == true)
	{
		//Debug.Log(usrsmComplete);
		var s1 = GameObject.Find("UI_MissionPanel");
		
		if (QuestsMenu == false)
		{
			s1.SetActiveRecursively(false);
			s1.SetActive(true);
		}
		else if (QuestsMenu == true)
		{
			s1.SetActiveRecursively(true);
			s1.SetActive(true);
		}
		
		if (usrsmComplete <= StoryQuests.total)
		{
			missionIcon.SetActive(true);
		}
		else
		{
			missionIcon.SetActive(false);
		}
			
		/*if (GUI.Button(Rect(Screen.width - 90, 10, 80, 80),mMissions,""))
		{
			if (QuestsMenu == false)
			{
				//s1.SetActiveRecursively(true);
				//s1.SetActive(true);
				QuestsMenu = true;
				//StoryQuestsMenu.QuestsMenu = true;
			}
			else if (QuestsMenu == true)
			{
				//s1.SetActiveRecursively(false);
				//s1.SetActive(true);
				QuestsMenu = false;
				//StoryQuestsMenu.QuestsMenu = false;
			}
		}*/
	}

	// Code for nameplates for NPCs
	
}

function fadeNMcolor()
{
	if (fadeNMtrig == true)
		fadeNMvalue = fadeNMvalue + 0.005;
	else if (fadeNMtrig == false)
		fadeNMvalue = fadeNMvalue - 0.005;
		
	if (fadeNMvalue >= 1)
		fadeNMtrig = false;
	else if (fadeNMvalue <= 0)
		fadeNMtrig = true;
		
	return fadeNMvalue;
}

@RPC
function AvatarChange(Name:String,avatar:String)
{
	if (Name == usrAccount)
		usrAvatar = avatar;
	
	else
	{
		var OPName : GameObject = GameObject.Find(Name);
		OPName.GetComponent(OtherPlayersPrefab).avatar = avatar;
	}
}

@RPC
function AvatarChangeRequest(Name:String,avatar:String)
{
}

@RPC
function ShootRequest(Name:String,Power:float,Pvp:int,Target:String)
{
}

@RPC
function Shoot(Name:String,Power:float,Pvp:int,Target:String)
{
	if (Name == usrAccount)
	{
		if (usrEnergy >= float.Parse(usrBlasterPower.ToString()))
		{
			tBlasterWaitTime = Time.fixedTime;
			tBlasterTriggerServer = true;
			
			TriggerLocalBlasters = true;
			blast11 = true;
			usrEnergy = usrEnergy - float.Parse(usrBlasterPower.ToString());
		}
	}
	else
	{
		triggerName = Name;
		triggerPvp = Pvp;
		triggerPower = Power;
		triggerTarget = Target;
		ShootScript.TriggerRemoteBlasters = true;
		ShootScript.blast1 = true;
		
		var bScript : GameObject = GameObject.Find(Name);
		var bbScript : ShootScript = bScript.GetComponent("ShootScript");
		bbScript.remoteName = Name;
		bbScript.remotePower = Power;
		bbScript.remotePvp = Pvp;
		bbScript.remoteTarget = Target;
	}
}

@RPC
function QuitRequest(Name:String)
{
}

@RPC
function QuitRefresh(Name:String)
{
	if (Name.ToLower != usrAccount)
	{
		var RIP;
		RIP = GameObject.Find(Name);
		Destroy(RIP);
	}
}

@RPC
function HealthUpdateRequest(Name:String,Health:float,HealthMax:float)
{
}

@RPC
function HealthUpdate(Name:String,Health:float,HealthMax:float)
{
	/*if (Name != usrAccount)
	{
		var bb : GameObject = GameObject.Find(Name);
		var bbScript : OtherPlayersPrefab = bb.GetComponent("OtherPlayersPrefab");
		
		bbScript.health = Health;
		bbScript.healthmax = HealthMax;

		if (Health <= 0)
		{
			var tObj : GameObject = GameObject.Find(Name);
			Destroy(GameObject.Find(Name));
			var exp = Instantiate(explosion,tObj.transform.position,tObj.transform.rotation);
		}
	}*/
}

@RPC
function HitNPCRequest(name:String,Nname:String,power:float)
{
}

@RPC
function RankExpUpdate(name:String,rank:int,experience:float,experiencemax:float)
{
}

@RPC
function CollectBloodstone(name:String,Bname:String,amount:int)
{
}

@RPC
function ReceiveBloodstone(name:String,Bname:String,amount:int)
{
	var bs : GameObject = GameObject.Find(Bname);
	var bbScript : BloodstoneScript = bs.GetComponent("BloodstoneScript");
	
	if (bbScript.tagged == false)
	{
		if (name == usrAccount)
		{
			bbScript.dragName = usrAccount;
			bbScript.newAmount = amount;
			
			bbScript.tagged = true;
			//usrBloodstone = amount;
			//Destroy(GameObject.Find(Bname));
		}
		else
		{
			bbScript.dragName = name;
			
			bbScript.tagged = true;
			//Destroy(GameObject.Find(Bname));
		}
	}
}

@RPC
function collectModule ()
{
}

@RPC
function receiveModule ()
{
}

@RPC
function spawnModule (Nname : String, tf : boolean, Mname : String)
{
	var tObj : GameObject = GameObject.Find(Nname);
	var bbScript : npcColliderScript = tObj.GetComponent("npcColliderScript");
		
	if (bbScript.yourDamage != 0)
	{
		if (tf == true)
		{
			var bs = Instantiate(modules,tObj.transform.position,Quaternion.identity);
			
			bs.name = Mname;
			//var bbScript1 : BloodstoneScript = bs.GetComponent("BloodstoneScript");
			//bbScript1.amount = 1;
			//usrBloodstone += amount;
		}
	}
}

@RPC
function KillNPC(Nname:String,tf:boolean,amount:int,Bname:String)
{
	var tObj : GameObject = GameObject.Find(Nname);
	var bbScript : npcColliderScript = tObj.GetComponent("npcColliderScript");
		
	//for (var i = 0; i < NPCControl.npcname.Length; i++)
	//{
		//if (NPCControl.npcname[i] == Nname)
		//{
			// Bloodstone code
			if (bbScript.yourDamage != 0)
			{
				if (tf == true)
				{
					var bs = Instantiate(bloodstone,tObj.transform.position,Quaternion.identity);
					
					bs.name = Bname;
					var bbScript1 : BloodstoneScript = bs.GetComponent("BloodstoneScript");
					bbScript1.amount = amount;
					//usrBloodstone += amount;
				}
			}

			//NPCControl.npcname[i] = "";
			
			// Code for kill counter for self
			killRank = GameObject.Find(Nname).GetComponent(NPCInfo).npcrank;
			if (bbScript.yourDamage > 0)
				killPlayer = usrAccount;
			else
				killPlayer = null;
			if (killPlayer == usrAccount)
				killTotal++;
			// ------------------------
			
			var tmp1 : float = bbScript.yourDamage / GameObject.Find(Nname).GetComponent(NPCInfo).npchealthmax;
			var tmp2 : float = GameObject.Find(Nname).GetComponent(NPCInfo).npcrank - usrRank;
			var tmp3 : float = GameObject.Find(Nname).GetComponent(NPCInfo).npcexp * tmp1;
			
			if (tmp2 > 10)
			{
				if (Nname == MoveAround.SelectedTarget)
				{
					MoveAround.SelectedTarget = "";
					MoveAround.objSelected = false;
				}
				Destroy(GameObject.Find(Nname));
				
				var exp1 = Instantiate(explosion,tObj.transform.position,tObj.transform.rotation);
			}
			else if ( tmp2 < -10)
			{
				if (Nname == MoveAround.SelectedTarget)
				{
					MoveAround.SelectedTarget = "";
					MoveAround.objSelected = false;
				}
				Destroy(GameObject.Find(Nname));
				
				var exp2 = Instantiate(explosion,tObj.transform.position,tObj.transform.rotation);
			}
			else
			{
				var tmp4 : float;
				if (tmp2 == -10) tmp4 = .01;
				if (tmp2 == -9) tmp4 = .05;
				if (tmp2 == -8) tmp4 = .10;
				if (tmp2 == -7) tmp4 = .15;
				if (tmp2 == -6) tmp4 = .20;
				if (tmp2 == -5) tmp4 = .25;
				if (tmp2 == -4) tmp4 = .30;
				if (tmp2 == -3) tmp4 = .35;
				if (tmp2 == -2) tmp4 = .40;
				if (tmp2 == -1) tmp4 = .45;
				if (tmp2 == 0) tmp4 = .50;
				if (tmp2 == 1) tmp4 = .55;
				if (tmp2 == 2) tmp4 = .60;
				if (tmp2 == 3) tmp4 = .65;
				if (tmp2 == 4) tmp4 = .70;
				if (tmp2 == 5) tmp4 = .75;
				if (tmp2 == 6) tmp4 = .80;
				if (tmp2 == 7) tmp4 = .85;
				if (tmp2 == 8) tmp4 = .90;
				if (tmp2 == 9) tmp4 = .95;
				if (tmp2 == 10) tmp4 = 1.00;

				
				//var tmp4 = tmp2 / 10;
				var tmp5 = tmp3 * tmp4;
				
				/*Debug.Log("your damage DIV npc health max: " + tmp1);
				Debug.Log("npc rank - your rank: " + tmp2);
				Debug.Log("npc exp MULT remainder of percent of tmp1: " + tmp3);
				Debug.Log("convert rank remainder to percent: " + tmp4);
				Debug.Log("answer: " + tmp5);
				Debug.Log("NPC Exp: " + NPCControl.npcexp[i] + " / Experience Received: " + tmp5);*/
				usrExperience += tmp5;
				
				if (Nname == MoveAround.SelectedTarget)
				{
					MoveAround.SelectedTarget = "";
					MoveAround.objSelected = false;
				}
				Destroy(GameObject.Find(Nname));
				
				var exp = Instantiate(explosion,tObj.transform.position,tObj.transform.rotation);

				networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax);
			}
		//}
	//}
}

static function sm1(windowID : int)
{
	//var smwinRect = Rect(Screen.width/2-125,Screen.height/4*3,250,250);	
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	GUILayout.Label(mmsg,"PlainText");
	GUILayout.EndVertical();
}

static function sMessager(msg:String)
{
	//private var smwinRect = Rect((Screen.width/2)-(400/2),Screen.height/10,400,150);
	mmsg = msg;
	//GUI.Window (1, Rect((Screen.width/2)-(425/2),Screen.height/10,425,130), sm1, "");
	GUI.Window (1, Rect(Screen.width - 425,100, 425, 130), sm1, "");
	GUI.BeginGroup (Rect (0,0,100,100));
	GUI.EndGroup ();
}

function addSkills()
{
	usrHealthMax = PlayerPrefs.GetFloat("PlayerActiveShipHealthMax");
	usrEnergyMax = PlayerPrefs.GetFloat("PlayerActiveShipEnergyMax");
	usrBlasterPower = PlayerPrefs.GetFloat("PlayerActiveShipBlasterPower");

	var uhm = usrHealthMax;
	var uem = usrEnergyMax;
	var ubp = usrBlasterPower;
	
	usrHealthMax = usrHealthMax + (uhm * (.05 * usrSkillHealth));
	usrEnergyMax = usrEnergyMax + (uem * (.05 * usrSkillEnergy));
	usrBlasterPower = usrBlasterPower + (ubp * (.05 * usrSkillPower));
	
	//usrHealth = usrHealthMax;
	//usrEnergy = usrEnergyMax;
}

static function forceRotate(objtoRotate : Transform, objtolookAt : Transform)
{
	objtoRotate.LookAt(objtolookAt);
}

function LocalShoot()
{
	if (TriggerLocalBlasters)
	{
		if (blast11 == true)
		{
			usrAlienMode = false;
			var Blaster = Instantiate(BlasterPrefab,
									GameObject.Find(usrAccount + "/BlasterSpawn").transform.position,
									GameObject.Find(usrAccount).transform.rotation);
			
			Blaster.name = "b_" + usrAccount + "1";
			Blaster.tag = "myblaster";
			var bbScript : BlasterScript = Blaster.GetComponent("BlasterScript");
			bbScript.power = usrBlasterPower;
			if (MoveAround.objSelected == true)
				GameObject.Find("b_" + usrAccount + "1").transform.LookAt(GameObject.Find(MoveAround.SelectedTarget).transform);

			//if (MoveAround.curSpeed == 10)
			//	Blaster.rigidbody.AddForce(Blaster.transform.forward * 3000);
			if (MoveAround.curSpeed == 30)
				Blaster.rigidbody.AddForce(Blaster.transform.forward * 4000);
			else
				Blaster.rigidbody.AddForce(Blaster.transform.forward * 2000);
			blast11 = false;
			blast22 = true;
			timeBlaster = Time.fixedTime;
		}

		if (blast22 == true)
		{
			if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
			{
				var Blaster2 = Instantiate(BlasterPrefab,
									GameObject.Find(usrAccount + "/BlasterSpawn").transform.position,
									GameObject.Find(usrAccount).transform.rotation);
				
				Blaster2.name = "b_" + usrAccount + "2";
				Blaster2.tag = "myblaster";
				var bbScript2 : BlasterScript = Blaster2.GetComponent("BlasterScript");
				bbScript2.power = usrBlasterPower;
				if (MoveAround.objSelected == true)
					GameObject.Find("b_" + usrAccount + "2").transform.LookAt(GameObject.Find(MoveAround.SelectedTarget).transform);

				//if (MoveAround.curSpeed == 10)
				//	Blaster2.rigidbody.AddForce(Blaster2.transform.forward * 3000);
				if (MoveAround.curSpeed == 30)
					Blaster2.rigidbody.AddForce(Blaster2.transform.forward * 4000);
				else
					Blaster2.rigidbody.AddForce(Blaster2.transform.forward * 2000);
				blast22 = false;
				blast33 = true;
				timeBlaster = Time.fixedTime;
			}
		}

		if (blast33 == true)
		{
			if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
			{
				var Blaster3 = Instantiate(BlasterPrefab,
									GameObject.Find(usrAccount + "/BlasterSpawn").transform.position,
									GameObject.Find(usrAccount).transform.rotation);
			
				Blaster3.name = "b_" + usrAccount + "3";
				var bbScript3 : BlasterScript = Blaster3.GetComponent("BlasterScript");
				bbScript3.power = usrBlasterPower;
				Blaster3.tag = "myblaster";
				if (MoveAround.objSelected == true)
					GameObject.Find("b_" + usrAccount + "3").transform.LookAt(GameObject.Find(MoveAround.SelectedTarget).transform);
				
				//if (MoveAround.curSpeed == 10)
				//	Blaster3.rigidbody.AddForce(Blaster3.transform.forward * 3000);
				if (MoveAround.curSpeed == 30)
					Blaster3.rigidbody.AddForce(Blaster3.transform.forward * 4000);
				else
					Blaster3.rigidbody.AddForce(Blaster3.transform.forward * 2000);
				blast33 = false;
				blast44 = true;
				timeBlaster = Time.fixedTime;
			}
		}

		if (blast44 == true)
		{
			if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
			{
				var Blaster4 = Instantiate(BlasterPrefab,
									GameObject.Find(usrAccount + "/BlasterSpawn").transform.position,
									GameObject.Find(usrAccount).transform.rotation);
			
				Blaster4.name = "b_" + usrAccount + "4";
				var bbScript4 : BlasterScript = Blaster4.GetComponent("BlasterScript");
				bbScript4.power = usrBlasterPower;
				Blaster4.tag = "myblaster";
				if (MoveAround.objSelected == true)
					GameObject.Find("b_" + usrAccount + "4").transform.LookAt(GameObject.Find(MoveAround.SelectedTarget).transform);

				//if (MoveAround.curSpeed == 10)
				//	Blaster4.rigidbody.AddForce(Blaster4.transform.forward * 3000);
				if (MoveAround.curSpeed == 30)
					Blaster4.rigidbody.AddForce(Blaster4.transform.forward * 4000);
				else
					Blaster4.rigidbody.AddForce(Blaster4.transform.forward * 2000);
				blast44 = false;
				blast55 = true;
				timeBlaster = Time.fixedTime;
			}
		}

		if (blast55 == true)
		{
			if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
			{
				var Blaster5 = Instantiate(BlasterPrefab,
									GameObject.Find(usrAccount + "/BlasterSpawn").transform.position,
									GameObject.Find(usrAccount).transform.rotation);
			
				Blaster5.name = "b_" + usrAccount + "5";
				Blaster5.tag = "myblaster";
				var bbScript5 : BlasterScript = Blaster5.GetComponent("BlasterScript");
				bbScript5.power = usrBlasterPower;
				if (MoveAround.objSelected == true)
					GameObject.Find("b_" + usrAccount + "5").transform.LookAt(GameObject.Find(MoveAround.SelectedTarget).transform);

				//if (MoveAround.curSpeed == 10)
				//	Blaster5.rigidbody.AddForce(Blaster5.transform.forward * 3000);
				if (MoveAround.curSpeed == 30)
					Blaster5.rigidbody.AddForce(Blaster5.transform.forward * 4000);
				else
					Blaster5.rigidbody.AddForce(Blaster5.transform.forward * 2000);
				blast55 = false;
				TriggerLocalBlasters = false;
				timeBlaster = Time.fixedTime;
			}
		}
	} 
}

@RPC
function PurchaseShip(name:String, ship:String)
{
}

@RPC
function UpdateInfo(bloodstone:int,amethyst:int,health:float,healthmax:float,energy:float,power:float,skills:int,skillhealth:int,skillenergy:int,skillpower:int,
						rank:int,experience:float,experiencemax:float)
{
	usrBloodstone = bloodstone;
	usrAmethyst = amethyst;
	
	//usrHealth = health;
	usrHealthMax = healthmax;
	//usrEnergy = energy;
	usrEnergyMax = energy;
	usrBlasterPower = power;
	
	usrSkills = skills;
	usrSkillHealth = skillhealth;
	usrSkillEnergy = skillenergy;
	usrSkillPower = skillpower;
	
	usrRank = rank;
	usrExperience = experience;
	usrExperienceMax = experiencemax;

	PlayerPrefs.SetFloat("PlayerActiveShipHealthMax",healthmax);
	PlayerPrefs.SetFloat("PlayerActiveShipEnergyMax",energy);
	PlayerPrefs.SetFloat("PlayerActiveShipBlasterPower",power);
	addSkills();
}

@RPC
function AddSkill(health:boolean,energy:boolean,power:boolean)
{
}

function missionComplete()
{
	var mNot = Instantiate(mNotification, Vector3(0,0,0), Quaternion.identity);
	mNot.transform.parent = GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").transform;
	mNot.transform.localScale = Vector3(0.5,0.5,0.5);
	mNot.active = true;
}

function missionFail()
{
	var mNot = Instantiate(mNotificationFail, Vector3(0,0,0), Quaternion.identity);
	mNot.transform.parent = GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").transform;
	mNot.transform.localScale = Vector3(0.5,0.5,0.5);
	mNot.active = true;
}

@RPC
function FailSMrequest (sm:int) {}

@RPC
function FailSMconfirm (sm:int)
{
	if (usrsmEngaged == 1)
	{
		usrsmEngaged = 0;
		StoryQuests.resetTrigs();
		missionFail();
		Camera.main.GetComponent(StoryQuests).sMessageDestroy();
	}
}

@RPC
function CompleteSM(sm:int)
{
}

@RPC
function CompleteSMconfirm()
{
	if (usrsmEngaged == 1)
	{
		if (usrsmCurrent == usrsmComplete)
			usrsmComplete++;
			
		usrsmEngaged = 0;
		StoryQuests.resetTrigs();
		missionComplete();
	}
}

@RPC
function EngageSMrequest(sm:int)
{
}

@RPC
function EngageSMconfirm(sm:int)
{
	StoryQuests.resetTrigs();
	MoveAround.objSelected = false;
	MoveAround.SelectedTarget = "";
	usrsmCurrent = sm;
	usrsmEngaged = 1;
}

@RPC
function SquadEngageSMRequest(sm:int)
{
}

@RPC
function SquadMissionUpdateRequest(trig:int)
{
}

@RPC
function SquadMissionUpdate(trig:int)
{
	StoryQuests.smtrig = trig;
}

@RPC
function InstallActivatorRequest()
{
}

@RPC
function InstallActivator()
{
	installedactivator = true;
}

@RPC
function PurchaseRequest (upgradeCode : String)
{
}

@RPC
function PurchaseConfirm ()
{
}

@RPC
function requestNews ()
{
	Camera.main.networkView.RPC ("requestNews", RPCMode.Server);
}

@RPC
function serverNews (news : String)
{
	newsWindow.SetActive(true);
	GameObject.Find("UI Root/UI_News/nWindow/Panel/Label").GetComponent(UILabel).text = news;
	GameObject.Find("UI Root/UI_News/nWindow/Slider").GetComponent(UISlider).value = 0;
}

@RPC
function requestListShips () {}

@RPC
function returnListShips (ids : String, ships : String, names : String)
{
	//GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).clearShips();

	usrShipids = ids;
	usrShips = ships;
	usrShipnames = names;
	
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).parseShips();
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).insertShips();
	
	GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").GetComponent(UIGrid).Reposition();

}

@RPC
function requestLoadShip (id : int) {}

@RPC
function requestRenameShip (id : int, name : String) {}

@RPC
function requestShipName () { Camera.main.networkView.RPC ("requestShipName", RPCMode.Server); }

@RPC
function returnShipName (name : String)
{
	usrActiveshipname = name;
}

@RPC
function requestAlienMode (flag : boolean) { usrAlienMode = flag; Camera.main.networkView.RPC ("requestAlienMode", RPCMode.Server, flag); }

@RPC
function requestPvpDamage (target : String, damage : float) { Camera.main.networkView.RPC ("requestPvpDamage", RPCMode.Server, target, damage); }

@RPC
function returnPvpDamage (target : String, damage : float)
{
	if (usrPvp == 1)
	{
		if (usrAccount == target)
		{
			usrHealth -= damage;
		}
	}
}

@RPC
function returnRegularDamage (target : String, damage : float)
{
	Debug.Log("Received reg damage code");
	if (usrAccount == target)
	{
		usrHealth -= damage;
	}
}

@RPC
function requestISSpecialEvent () { Camera.main.networkView.RPC ("requestISSpecialEvent", RPCMode.Server); }

@RPC
function returnISSpecialEvent (se : boolean, sevent_id : int, sevent_datestamp : String)
{
	if (se == true)
	{
		specialEventDatestamp = long.Parse(sevent_datestamp);
		specialEvent.SetActive(true);
	}
	
	else if (se == false)
	{
		specialEvent.SetActive(false);
	}
}

@RPC
function GMC(cmds:String)
{
}

@RPC
function GMMOVE(name:String,x:float,y:float,z:float)
{
	if (name == usrAccount)
		GameObject.Find(usrAccount).transform.position = Vector3(x,y,z);
}
