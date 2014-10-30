#pragma strict

static var viewHUD : boolean = true;
var viewHUDmini : GameObject;

var HUD : GUISkin;
var HUDtemp : GUISkin;
var HUDtemp2 : GUISkin;
var HUDNew : GUISkin;
var HUDTechT : GUISkin;
var HUDTechB : GUISkin;

//private var selfTRect = Rect(5,5,Screen.width/6+12,Screen.height/6+67+12);
private var selfTRect = Rect(5,-27,Screen.width/6+12,Screen.height/6+67+12+57);
private var selfHERect = Rect(5,(Screen.height/6)+12,Screen.width/6,45);

//private var enemyTRect = Rect(Screen.width - (Screen.width/6)-5-12,5,Screen.width/6+12,Screen.height/6+45+12);
private var enemyTRect = Rect(Screen.width - (Screen.width/6)-5-12,-27,Screen.width/6+12,Screen.height/6+45+12+57);

//private var techRect = Rect(Screen.width - (Screen.width/2)-5, Screen.height - (Screen.height/16)-5, Screen.width/2, Screen.height/16);
private var techRect = Rect(Screen.width - 365, Screen.height - 112, 365, 40);
private var techBRect = Rect(Screen.width - 365, Screen.height - 20, 365, 40);

static var mmsg : String;

var association1 : Transform;
var TriniArmor : Transform;
var TriniArmorHybrid : Transform;
var TriniFighter : Transform;
var TriniFighterHybrid : Transform;

var explosion : Transform;
var bloodstone : Transform;

var minimap : boolean = false;

static var sName : String;
static var sRank : int;
static var sHealth : float;
static var sHealthMax : float;
static var sHealthPercent : float;

static var usrAccount = "";
static var usrGM : int;
static var usrPvp = 0;
static var usrBlasterPower : float;

static var usrZone : String;
static var usrBloodstone : int;
static var usrAmethyst : int;

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

static var usrActiveship : String;

static var usrsmComplete : int;
static var usrsmEngaged : int;
static var usrsmCurrent : int;

static var afterburner = false;
static var collector = false;
static var repair = false;

var mHealth : Texture;
var mEnergy : Texture;
var mExperience : Texture;

var mProfile : Texture;
var mBuddies : Texture;
var mPlanets : Texture;
var mSquad : Texture;
var mClan : Texture;
var mPvp : Texture;
var mNews : Texture;
var mExit : Texture;
var msExit : Texture;

var mBloodstone : Texture;
var mAmethyst : Texture;

var tBlaster : Texture;
static var tBlasterWaitTime = 0.0000;
static var tBlasterTrigger = false;
static var tBlasterTriggerServer = false;
var BlasterPrefab:Transform;
static var TriggerLocalBlasters = false;
static var timeBetweenBlasterShots = 0.075;
var timeBlaster = 0.0000;
static var blast11 = false;
var blast22 = false;
var blast33 = false;
var blast44 = false;
var blast55 = false;

var tAfterburner : Texture;
var tCollector : Texture;
var tRepair : Texture;

static var gmcFlag : boolean;
static var cmds = "";
var cmdsEnd = 10;
var cmdsEndin = 0;

static var killTotal : int;
static var killRank : int;
static var killPlayer : String;

var mm : GameObject;

function Start () {

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
	

	//usrHealth = PlayerPrefs.GetInt("PlayerHealth");
	//usrHealthMax = PlayerPrefs.GetInt("PlayerHealthMax");
	//usrPvp = PlayerPrefs.GetInt("PlayerPvp");
	
	usrEnergy = usrEnergyMax;
	afterburner = false;
	
	usrHealthPercent = usrHealth / usrHealthMax;
	usrEnergyPercent = usrEnergy / usrEnergyMax;
	usrExperiencePercent = usrExperience / usrExperienceMax;
	
	// Make Ship Active
	var respawn : Transform;
	
	if (usrActiveship == "a_StarterShip")
		respawn = Instantiate(association1, pos, Quaternion.identity);

	else if (usrActiveship == "a_TriniArmor")
		respawn = Instantiate(TriniArmor, pos, Quaternion.identity);
		
	else if (usrActiveship == "a_TriniArmorHybrid")
		respawn = Instantiate(TriniArmorHybrid, pos, Quaternion.identity);

	else if (usrActiveship == "a_TriniFighter")
		respawn = Instantiate(TriniFighter, pos, Quaternion.identity);

	else if (usrActiveship == "a_TriniFighterHybrid")
		respawn = Instantiate(TriniFighterHybrid, pos, Quaternion.identity);

	respawn.name = "PlayerShip";
	SmoothFollowNew.target = respawn;
	MouseOrbit.target = respawn;
	healthUpdate = true;
		
	// Set Avatar active
	viewHUDmini = GameObject.Find(usrActiveship);
	viewHUDmini.SetActiveRecursively(true);
	
	// Boost Specs with skills
	addSkills();
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
		if (usrGM == 1)
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
		}
	}
	
	if (Input.GetButtonDown("2"))
	{
		if (afterburner == true)
			afterburner = false;
		else if (afterburner == false)
			afterburner = true;
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
			usrEnergy = usrEnergy + (Time.fixedTime - energyTime);
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
				var tempGO : Transform = GameObject.Find("PlayerShip").transform;
				
				for (var child : Transform in tempGO)
				{
					if (child.gameObject.name == "Repair")
					{
						child.gameObject.SetActiveRecursively(true);
						//child.gameObject.particleSystem.particleEmitter.emit = true;
					}
				}
				// ---
				
				usrHealth = usrHealth + (Time.fixedTime - energyTimeRepair)*2;
				usrEnergy = usrEnergy - (Time.fixedTime - energyTimeRepair)*2;
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
		var tempGO1 : Transform = GameObject.Find("PlayerShip").transform;
		
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
					if (Vector3.Distance(GameObject.Find("PlayerShip").transform.position,GameObject.Find(c.name).transform.position) <= 15)
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

function OnDisconnectedFromServer(info : NetworkDisconnection)
{
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


function OnGUI()
{
	GUI.skin = HUD;
	GUI.skin.label.fontSize = 13;
	
	// Game Master Console
	if (gmcFlag == true)
	{
		GUI.Box(Rect(Screen.width/2-100,Screen.height/2-100,200,200),"Game Master Console");
		cmds = GUI.TextArea(Rect(Screen.width/2-95,Screen.height/2+75,190,20),cmds);
		
		if (cmds.Length != 0)
			cmdsEndin = parseInt(cmds[cmds.Length-1]);
		
		if (cmdsEndin == cmdsEnd)
		{
			networkView.RPC("GMC",RPCMode.Server,cmds);
			cmds = "";
		}
	}
		
	
	// Death Routine
	if (usrHealth <= 0)
	{
		repair = false;
		MoveAround.objSelected = false;
		MoveAround.SelectedTarget = null;
		
		if (GameObject.Find("PlayerShip") != null)
			Destroy(GameObject.Find("PlayerShip"));
			
		GUI.Box(Rect((Screen.width/2)-100,(Screen.height/2)-100,200,200),"Revive?");
		if (GUI.Button(Rect((Screen.width/2)-95,(Screen.height/2)-70,190,20),"Respawn at station"))
		{
			var respawn = Instantiate(association1,
										Vector3(-102.8425,1.084108,-58.47147),
										Quaternion.identity);
			
			respawn.name = "PlayerShip";
			SmoothFollowNew.target = respawn;
			MouseOrbit.target = respawn;

			PlayerPrefs.SetFloat("PlayerX",GameObject.Find("PlayerShip").transform.position.x);
			PlayerPrefs.SetFloat("PlayerY",GameObject.Find("PlayerShip").transform.position.y+2);
			PlayerPrefs.SetFloat("PlayerZ",GameObject.Find("PlayerShip").transform.position.z);
			
			Camera.mainCamera.transform.position = GameObject.Find("PlayerShip").transform.position;
			Camera.mainCamera.transform.rotation = GameObject.Find("PlayerShip").transform.rotation;
			Destroy(GameObject.Find("PlayerShip"));
			
			usrHealth = usrHealthMax;
			usrEnergy = usrEnergyMax;
			healthUpdate = true;
			afterburner = false;
			blast11 = false;
			blast22 = false;
			blast33 = false;
			blast44 = false;
			blast55 = false;
			
			StationScript.tabHangar = true;
			StationScript.tabShips = false;
			StationScript.tabSkills = false;
			StationScript.tabTechs = false;
			StationScript.Docked = true;
			
			// Boost Specs with skills
			addSkills();
		}
	}
	
	// Mini Map
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
			
			if (GameObject.Find("PlayerShip") != null)
				coords = GameObject.Find("PlayerShip").transform.position;
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
	}
	
	// Menu bar
	if (viewHUD == true)
	{
		GUI.Box(Rect((Screen.width/2)-((Screen.width/4)/2),5,(Screen.height/24)*8, Screen.height/24+2),"");
		
		if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2),5,Screen.height/24,Screen.height/24), mProfile, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +(Screen.height/24),5,Screen.height/24,Screen.height/24), mBuddies, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*2),5,Screen.height/24,Screen.height/24), mPlanets, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*3),5,Screen.height/24,Screen.height/24), mSquad, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*4),5,Screen.height/24,Screen.height/24), mClan, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*5),5,Screen.height/24,Screen.height/24), mPvp, ""))
		{
			if (usrPvp == 0)
			{
				usrPvp = 1;
				networkView.RPC("MoveMeRequest",RPCMode.Server,usrAccount,usrActiveship,
																	GameObject.Find("PlayerShip").transform.position.x,
																	GameObject.Find("PlayerShip").transform.position.y,
																	GameObject.Find("PlayerShip").transform.position.z,
																	GameObject.Find("PlayerShip").transform.rotation,
																	usrPvp,usrRank,usrHealth,usrHealthMax);
			}
			else if (usrPvp == 1)
			{
				usrPvp = 0;
				networkView.RPC("MoveMeRequest",RPCMode.Server,usrAccount,usrActiveship,
																	GameObject.Find("PlayerShip").transform.position.x,
																	GameObject.Find("PlayerShip").transform.position.y,
																	GameObject.Find("PlayerShip").transform.position.z,
																	GameObject.Find("PlayerShip").transform.rotation,
																	usrPvp,usrRank,usrHealth,usrHealthMax);
			}
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*6),5,Screen.height/24,Screen.height/24), mNews, ""))
		{
		}
		else if (GUI.Button(Rect((Screen.width/2)-((Screen.width/4)/2) +((Screen.height/24)*7),5,Screen.height/24,Screen.height/24), mExit, ""))
		{
			networkView.RPC("QuitRequest",RPCMode.Server,usrAccount);
			Network.Disconnect();
			Application.LoadLevel(0);
		}
	}
	
	// Self Target box
	if (viewHUD == true)
	{
		//GUI.Box(selfTRect,"");
		
		//GUI.Box(selfTRect,"");
		GUI.skin = HUDNew;
		selfTRect = GUI.Window (2, selfTRect, selfTwindow, "");
		GUI.BeginGroup (Rect (0,0,100,100));
		GUI.EndGroup ();
		GUI.depth = 0;
		GUI.skin = HUD;
		
		if (usrPvp == 0)
			GUI.Label(Rect(25,10,200,200),usrRank + ". " + usrAccount);
		else if (usrPvp == 1)
		{
			var oldColor = GUI.color;
			GUI.color = Color.red;
			GUI.Label(Rect(25,10,200,200),usrRank + ". [PVP] " + usrAccount);
			GUI.color = oldColor;
		}
	}
	
	// Health / Energy boxes
	if (viewHUD == true)
	{
		//GUI.Box(selfHERect,"");
		//GUI.skin = HUDNew;
		//selfHERect = GUI.Window (3, selfHERect, selfHEwindow, "");
		//GUI.BeginGroup (Rect (0,0,100,100));
		//GUI.EndGroup ();
		//GUI.skin = HUD;
		
		GUI.DrawTexture(Rect(16,(Screen.height/6)+11,(Screen.width/6-10) * Mathf.Clamp01(usrHealthPercent),5), mHealth);
		GUI.skin = HUDtemp;
	    GUI.Label(Rect(16,(Screen.height/6)+14,100,100),"Health: " + Mathf.Floor(usrHealth).ToString() + " / " + usrHealthMax.ToString());
		GUI.skin = HUD;
		
		GUI.DrawTexture(Rect(16,(Screen.height/6)+30,(Screen.width/6-10) * Mathf.Clamp01(usrEnergyPercent),5), mEnergy);
		GUI.skin = HUDtemp;
	    GUI.Label(Rect(16,(Screen.height/6)+33,100,100),"Energy: " + Mathf.Floor(usrEnergy).ToString() + " / " + usrEnergyMax.ToString());
		GUI.skin = HUD;
	}
	
	// Enemy Target box (IF Something is Targetted)
	if (viewHUD == true)
	{
		if (MoveAround.objSelected == true)
		{
			if (MoveAround.SelectedTarget != null)
			{
				//GUI.Box(enemyTRect,"");
				GUI.skin = HUDNew;
				enemyTRect = GUI.Window (4, enemyTRect, enemyTwindow, "");
				GUI.BeginGroup (Rect (0,0,100,100));
				GUI.EndGroup ();
				GUI.skin = HUD;
		
				GUI.Label(Rect(Screen.width - (Screen.width/6)+5,5+5,Screen.width/6,Screen.height/6),sName);
	
				//GUI.Box(Rect(Screen.width - (Screen.width/6)-5,(Screen.height/6)+6,Screen.width/6,45),"");
				
				GUI.DrawTexture(Rect(Screen.width - (Screen.width/6)-6,(Screen.height/6)+11,(Screen.width/6-10) * Mathf.Clamp01(sHealthPercent),5), mHealth);
				GUI.skin = HUDtemp;
			    GUI.Label(Rect(Screen.width - (Screen.width/6)-6,(Screen.height/6)+14,100,100),"Health: " + Mathf.Floor(sHealth).ToString() + " / " + sHealthMax.ToString());
				GUI.skin = HUD;
				
				//GUI.DrawTexture(Rect(Screen.width - (Screen.width/6),(Screen.height/6)+30,(Screen.width/6-10) * Mathf.Clamp01(usrEnergyPercent),5), mEnergy);
				GUI.skin = HUDtemp;
			    GUI.Label(Rect(Screen.width - (Screen.width/6)-6,(Screen.height/6)+33,100,100),"Rank: " + sRank);
				GUI.skin = HUD;
			}
		}
	}

	//GUI.DrawTexture(Rect(Screen.width/2,Screen.height/2,100,100), Target);
	
	// Experience bar & Bloodstone / Amethyst
	if (viewHUD == true)
	{
		//GUI.Box(Rect(Screen.width - (Screen.width/2)-5,Screen.height - (Screen.height/7.30) ,Screen.width/2,(Screen.height/15.5)),"");
		//GUI.Label(Rect(Screen.width - (Screen.width/2),Screen.height - (Screen.height/7.30),200,30),"Bloodstone: " + usrBloodstone);
		
		GUI.DrawTexture(Rect(Screen.width/4,5,18,18),mBloodstone);
		GUI.Label(Rect(Screen.width/4+25,5,200,30),"" + usrBloodstone);
		
		GUI.Label(Rect(Screen.width - Screen.width/3+25,5,200,30),"" + usrAmethyst);
		if (GUI.Button(Rect(Screen.width - Screen.width/3,5,18,18),mAmethyst,""))
		{
			if (Application.isWebPlayer)
				Application.ExternalEval("window.open('http://iframe.sponsorpay.com/?appid=13142&uid=" + usrAccount + "','_blank')");
			else
				Application.OpenURL("http://iframe.sponsorpay.com/?appid=13142&uid=" + usrAccount);
		}
		
		//GUI.DrawTexture(Rect(16,(Screen.height/6)+30,(Screen.width/6-10) * Mathf.Clamp01(usrEnergyPercent),5), mEnergy);
		//---GUI.DrawTexture(Rect(Screen.width - (Screen.width/2),Screen.height - (Screen.height/10.30)+5,((Screen.width/2)-10) * Mathf.Clamp01(usrExperiencePercent),(Screen.height/40)-10), mExperience);
		GUI.DrawTexture(Rect(16,(Screen.height/6)+49,(Screen.width/6-10) * Mathf.Clamp01(usrExperiencePercent),5), mExperience);
		GUI.skin = HUDtemp;
		GUI.Label(Rect(16,(Screen.height/6)+52,100,100),"Experience");
		GUI.skin = HUD;
	}
	
	// Tech box
	if (viewHUD == true)
	{
		//GUI.Box(techRect,"");
		GUI.skin = HUDTechT;
		techRect = GUI.Window (3, techRect, techWindow, "");
		GUI.BeginGroup (Rect (0,0,100,100));
		GUI.EndGroup ();
		
		GUI.skin = HUDTechB;
		techBRect = GUI.Window (5, techBRect, techBWindow, "");
		GUI.BeginGroup (Rect (0,0,100,100));
		GUI.EndGroup ();
		GUI.skin = HUD;
	}
	
	// Blaster Tech
	if (viewHUD == true)
	{
		if (GUI.Button(Rect(Screen.width - 365, Screen.height - 65, 40, 40),tBlaster,""))
		{
			if (tBlasterTrigger == false)
			{
				if (usrEnergy >= float.Parse(usrBlasterPower.ToString()))
				{
					tBlasterTrigger = true;
					tBlasterWaitTime = Time.fixedTime;
					networkView.RPC("ShootRequest",RPCMode.Server,usrAccount,usrBlasterPower,usrPvp);
				}
			}
		}
		if (tBlasterTrigger == true)
		{
			if (tBlasterTriggerServer == true) {
				if (Time.fixedTime - tBlasterWaitTime >= 2)
				{
					tBlasterTrigger = false;
					tBlasterTriggerServer = false;
				}
			}
	
			var timeLeft = 2 - (Time.fixedTime - tBlasterWaitTime);
			GUI.skin = HUDtemp2;
			GUI.Box(Rect(Screen.width - 365, Screen.height - 65, 40, 40),"");
			GUI.Box(Rect(Screen.width - 365, Screen.height - 65, 40, 40),"");
			GUI.Label(Rect(Screen.width - 365, Screen.height - 65, 40, 40),Mathf.Floor(timeLeft).ToString());
			GUI.skin = HUD;
		}
	}
	
	// Afterburner Tech
	if (viewHUD == true)
	{
		if (GUI.Button(Rect(Screen.width - 320, Screen.height - 65, 40, 40),tAfterburner,""))
		{
			if (afterburner == true)
				afterburner = false;
			else if (afterburner == false)
				afterburner = true;
		}
		if (afterburner == true)
		{
			GUI.skin = HUDtemp2;
			GUI.Box(Rect(Screen.width - 320, Screen.height - 65, 40, 40),"");
			GUI.Box(Rect(Screen.width - 320, Screen.height - 65, 40, 40),"");
			GUI.Label(Rect(Screen.width - 320, Screen.height - 65, 40, 40),Mathf.Floor(usrEnergy).ToString());
			GUI.skin = HUD;
		}
	}
	
	// Auto Collector Tool
	if (viewHUD == true)
	{
		if (GUI.Button(Rect(Screen.width - 230, Screen.height - 65, 40, 40),tCollector,""))
		{
			if (collector == true)
				collector = false;
			else if (collector == false)
				collector = true;
		}
		if (collector == true)
		{
			GUI.skin = HUDtemp2;
			GUI.Box(Rect(Screen.width - 230, Screen.height - 65, 40, 40),"");
			GUI.Box(Rect(Screen.width - 230, Screen.height - 65, 40, 40),"");
			GUI.Label(Rect(Screen.width - 230, Screen.height - 65, 40, 40),"O");
			GUI.skin = HUD;
		}
	}
	
	// Repair Tool
	if (viewHUD == true)
	{
		if (GUI.Button(Rect(Screen.width - 275, Screen.height - 65, 40, 40),tRepair,""))
		{
			if (repair == true)
				repair = false;
			else if (repair == false)
				repair = true;
		}
		if (repair == true)
		{
			GUI.skin = HUDtemp2;
			GUI.Box(Rect(Screen.width - 275, Screen.height - 65, 40, 40),"");
			GUI.Box(Rect(Screen.width - 275, Screen.height - 65, 40, 40),"");
			GUI.Label(Rect(Screen.width - 275, Screen.height - 65, 40, 40),"O");
			GUI.skin = HUD;
		}
	}
	
	if (viewHUD == true)
	{
		GUI.Box(Rect(Screen.width - 185, Screen.height - 65, 40, 40),"");
		GUI.Box(Rect(Screen.width - 140, Screen.height - 65, 40, 40),"");
		GUI.Box(Rect(Screen.width - 95, Screen.height - 65, 40, 40),"");
		GUI.Box(Rect(Screen.width - 50, Screen.height - 65, 40, 40),"");
	}
	
	//var coords : GameObject = GameObject.Find("PlayerShip");
	//GUI.Label(Rect(0,250,100,100),Screen.width + " X " + Screen.height);
	//GUI.Label(Rect(Screen.width - 100,Screen.height/2,100,100),coords.transform.position.x + "x, " +
	//															coords.transform.position.y + "y, " +
	//															coords.transform.position.z + "z");
}
@RPC
function ShootRequest(Name:String,Power:float,Pvp:int)
{
}

@RPC
function Shoot(Name:String,Power:float,Pvp:int)
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

		ShootScript.TriggerRemoteBlasters = true;
		ShootScript.blast1 = true;
		var bScript : GameObject = GameObject.Find(Name);
		var bbScript : ShootScript = bScript.GetComponent("ShootScript");
		bbScript.remoteName = Name;
		bbScript.remotePower = Power;
		bbScript.remotePvp = Pvp;
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
	if (Name != usrAccount)
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
	}
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
function KillNPC(Nname:String,tf:boolean,amount:int,Bname:String)
{
	var tObj : GameObject = GameObject.Find(Nname);
	var bbScript : npcColliderScript = tObj.GetComponent("npcColliderScript");
	
	Destroy(GameObject.Find(Nname));
	var exp = Instantiate(explosion,tObj.transform.position,tObj.transform.rotation);
	
	for (var i = 0; i < NPCControl.npcname.Length; i++)
	{
		if (NPCControl.npcname[i] == Nname)
		{
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

			NPCControl.npcname[i] = "";
			
			// Code for kill counter for self
			killRank = NPCControl.npcrank[i];
			if (bbScript.yourDamage > 0)
				killPlayer = usrAccount;
			else
				killPlayer = null;
			if (killPlayer == usrAccount)
				killTotal++;
			// ------------------------
			
			var tmp1 : float = bbScript.yourDamage / NPCControl.npchealthmax[i];
			var tmp2 : float = NPCControl.npcrank[i] - usrRank;
			var tmp3 : float = NPCControl.npcexp[i] * tmp1;
			
			if (tmp2 > 10)
				break;
			else if ( tmp2 < -10)
				break;
			
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
						
			networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax);
			break;
		}
	}
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
	GUI.Window (1, Rect((Screen.width/2)-(425/2),Screen.height/10,425,130), sm1, "");
	GUI.BeginGroup (Rect (0,0,100,100));
	GUI.EndGroup ();
}

function addSkills()
{
	usrHealthMax = PlayerPrefs.GetFloat("PlayerActiveShipHealthMax");
	usrEnergyMax = PlayerPrefs.GetFloat("PlayerActiveShipEnergyMax");
	usrBlasterPower = PlayerPrefs.GetFloat("PlayerActiveShipBlasterPower");

	usrHealthMax = usrHealthMax + (usrHealthMax * (.05 * usrSkillHealth));
	usrEnergyMax = usrEnergyMax + (usrEnergyMax * (.05 * usrSkillEnergy));
	usrBlasterPower = usrBlasterPower + (usrBlasterPower * (.05 * usrSkillPower));
	
	//usrHealth = usrHealthMax;
	//usrEnergy = usrEnergyMax;
}

function LocalShoot()
{
	if (TriggerLocalBlasters)
	{
		if (blast11 == true)
		{
			var Blaster = Instantiate(BlasterPrefab,
									GameObject.Find("BlasterSpawn").transform.position,
									GameObject.Find("PlayerShip").transform.rotation);
			
			Blaster.name = "b_" + usrAccount + "1";
			Blaster.tag = "myblaster";
			var bbScript : BlasterScript = Blaster.GetComponent("BlasterScript");
			bbScript.power = usrBlasterPower;

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
									GameObject.Find("BlasterSpawn").transform.position,
									GameObject.Find("PlayerShip").transform.rotation);
				
				Blaster2.name = "b_" + usrAccount + "2";
				Blaster2.tag = "myblaster";
				var bbScript2 : BlasterScript = Blaster2.GetComponent("BlasterScript");
				bbScript2.power = usrBlasterPower;

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
									GameObject.Find("BlasterSpawn").transform.position,
									GameObject.Find("PlayerShip").transform.rotation);
			
				Blaster3.name = "b_" + usrAccount + "3";
				var bbScript3 : BlasterScript = Blaster3.GetComponent("BlasterScript");
				bbScript3.power = usrBlasterPower;
				Blaster3.tag = "myblaster";
				
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
									GameObject.Find("BlasterSpawn").transform.position,
									GameObject.Find("PlayerShip").transform.rotation);
			
				Blaster4.name = "b_" + usrAccount + "4";
				var bbScript4 : BlasterScript = Blaster4.GetComponent("BlasterScript");
				bbScript4.power = usrBlasterPower;
				Blaster4.tag = "myblaster";

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
									GameObject.Find("BlasterSpawn").transform.position,
									GameObject.Find("PlayerShip").transform.rotation);
			
				Blaster5.name = "b_" + usrAccount + "5";
				Blaster5.tag = "myblaster";
				var bbScript5 : BlasterScript = Blaster5.GetComponent("BlasterScript");
				bbScript5.power = usrBlasterPower;

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
	
	usrHealth = health;
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

@RPC
function CompleteSM(sm:int)
{
}

@RPC
function CompleteSMconfirm()
{
	if (usrsmCurrent == usrsmComplete)
		usrsmComplete++;
		
	usrsmEngaged = 0;
	StoryQuests.resetTrigs();
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
function GMC(cmds:String)
{
}

@RPC
function GMMOVE(name:String,x:float,y:float,z:float)
{
	if (name == usrAccount)
		GameObject.Find("PlayerShip").transform.position = Vector3(x,y,z);
}
