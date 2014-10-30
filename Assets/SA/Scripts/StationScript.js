#pragma strict

var association1 : Transform;
var TriniArmor : Transform;
var TriniArmorHybrid : Transform;
var TriniFighter : Transform;
var TriniFighterHybrid : Transform;

var nearStationFlag : boolean;
static var Docked : boolean;

static var loadStationFlag : boolean;

var timeDock : float;
static var timeDockPercent : float;
var progressBar : Texture;

static var tabHangar : boolean;
static var tabShips : boolean;
static var tabSkills : boolean;
static var tabTechs : boolean;

var selectedBuyShip = 0;
var selectedBuyShipName = "";


function displayHangar ()
{
	if (HUD.usrActiveship == "a_StarterShip")
	{
		GameObject.Find("rAssociation1").SetActive(true);
		GameObject.Find("TriniArmor").SetActive(false);
		GameObject.Find("TriniArmorHybrid").SetActive(false);
		GameObject.Find("TriniFighter").SetActive(false);
		GameObject.Find("TriniFighterHybrid").SetActive(false);
	}
}

function Start () {

	nearStationFlag = false;
	Docked = false;
	loadStationFlag = false;
	HUD.usrZone = "triniplanet";
		
}

function FixedUpdate () {

	//HUD.usrZone = "triniplanet";	
	if (Docked == false)
		if (GameObject.Find("PlayerShip") != null)
			if (Vector3.Distance(GameObject.Find("PlayerShip").transform.position,gameObject.transform.position) < 15)
				nearStationFlag = true;
	else
	{
		nearStationFlag = false;
		loadStationFlag = false;
		timeDockPercent = 0;
	}
	
	if (Docked == true)
	{
		GameObject.Find("rAssociation1").SetActive(false);
		GameObject.Find("TriniArmor").SetActive(false);
		GameObject.Find("TriniArmorHybrid").SetActive(false);
		GameObject.Find("TriniFighter").SetActive(false);
		GameObject.Find("TriniFighterHybrid").SetActive(false);
	}

	if (HUD.usrActiveship == "a_StarterShip")
		GameObject.Find("rAssociation1").SetActive(true);
	else if (HUD.usrActiveship == "a_TriniArmor")
		GameObject.Find("TriniArmor").SetActive(true);
	else if (HUD.usrActiveship == "a_TriniArmorHybrid")
		GameObject.Find("TriniArmorHybrid").SetActive(true);
	else if (HUD.usrActiveship == "a_TriniFighter")
		GameObject.Find("TriniFighter").SetActive(true);
	else if (HUD.usrActiveship == "a_TriniFighterHybrid")
		GameObject.Find("TriniFighterHybrid").SetActive(true);

}

function OnGUI()
{
	//Debug.Log(HUD.usrZone);
	//if (HUD.usrZone.Substring((HUD.usrZone.Length-7)) != "station")
	//{
		if (nearStationFlag == true)
		{
			if (Docked == false)
			{
				if (HUD.usrHealth > 0)
				{
					GUI.Box(Rect(Screen.width/2 - 100,Screen.height/5,200,50),"");
					if (GUI.Button(Rect(Screen.width/2 - 95,Screen.height/5+5,190,40),"Dock at Station") )
					{
						loadStationFlag = true;
						timeDock = Time.fixedTime;
					}
				}
			}
		}
	//}
	
	if (loadStationFlag == true)
	{
		GUI.Box(Rect(Screen.width/2 - 100,Screen.height/3,200,50),"Docking...");
		
		if (Time.fixedTime - timeDock >= 1)
			timeDockPercent = .20;
		if (Time.fixedTime - timeDock >= 2)
			timeDockPercent = .40;
		if (Time.fixedTime - timeDock >= 3)
			timeDockPercent = .60;
		if (Time.fixedTime - timeDock >= 4)
			timeDockPercent = .80;
		if (Time.fixedTime - timeDock >= 5)
			timeDockPercent = 1.00;

		GUI.DrawTexture(Rect(Screen.width/2 - 95,Screen.height/3+30,190 * Mathf.Clamp01(timeDockPercent),5), progressBar);
		
		if (Time.fixedTime - timeDock > 5.5)
		{
			Docked = true;
			loadStationFlag = false;
			timeDockPercent = 0;
			
			PlayerPrefs.SetFloat("PlayerX",GameObject.Find("PlayerShip").transform.position.x);
			PlayerPrefs.SetFloat("PlayerY",GameObject.Find("PlayerShip").transform.position.y);
			PlayerPrefs.SetFloat("PlayerZ",GameObject.Find("PlayerShip").transform.position.z);
			Destroy(GameObject.Find("PlayerShip"));
			
			tabHangar = true;
			tabShips = false;
			tabSkills = false;
			tabTechs = false;
		}
	}
	
	if (Docked == true)
	{
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"");
		
		if (GUI.Button(Rect(Screen.width/2-50,Screen.height/10,100,20),"UN-DOCK") )
		{
			var pos : Vector3 = Vector3(PlayerPrefs.GetFloat("PlayerX"),PlayerPrefs.GetFloat("PlayerY")+.5,PlayerPrefs.GetFloat("PlayerZ"));
			
			var respawn : Transform;
			
			if (HUD.usrActiveship == "a_StarterShip")
				respawn = Instantiate(association1, pos, Quaternion.identity);
		
			else if (HUD.usrActiveship == "a_TriniArmor")
				respawn = Instantiate(TriniArmor, pos, Quaternion.identity);

			else if (HUD.usrActiveship == "a_TriniArmorHybrid")
				respawn = Instantiate(TriniArmorHybrid, pos, Quaternion.identity);
		
			else if (HUD.usrActiveship == "a_TriniFighter")
				respawn = Instantiate(TriniFighter, pos, Quaternion.identity);
		
			else if (HUD.usrActiveship == "a_TriniFighterHybrid")
				respawn = Instantiate(TriniFighterHybrid, pos, Quaternion.identity);

			respawn.name = "PlayerShip";
			SmoothFollowNew.target = respawn;
			MouseOrbit.target = respawn;
			HUD.healthUpdate = true;
			Docked = false;
			
			var d1 : GameObject = GameObject.Find(selectedBuyShipName);
			d1.SetActiveRecursively(false);
			d1.SetActive(false);
			
			var d2 = GameObject.Find(HUD.usrActiveship);
			d2.SetActiveRecursively(false);
		}
		
		if (GUI.Button(Rect(200,Screen.height/6,100,20),"Hangar"))
		{
			tabHangar = true;
			tabShips = false;
			tabSkills = false;
			tabTechs = false;
			
			var h1 : GameObject = GameObject.Find(selectedBuyShipName);
			h1.SetActiveRecursively(false);
			h1.SetActive(true);
			
			var h2 = GameObject.Find(HUD.usrActiveship);
			h2.SetActiveRecursively(true);
		}
		
		if (GUI.Button(Rect(300,Screen.height/6,100,20),"Ships"))
		{
			tabHangar = false;
			tabShips = true;
			tabSkills = false;
			tabTechs = false;
			
			if (selectedBuyShip != 0)
			{
				var ss1 : GameObject = GameObject.Find(selectedBuyShipName);
				ss1.SetActiveRecursively(false);
				ss1.SetActive(true);
				
				var ss2 = GameObject.Find(HUD.usrActiveship);
				ss2.SetActiveRecursively(true);
			}
			
			selectedBuyShip = 0;
			selectedBuyShipName = "a_TriniArmor";
			
			var tmp : GameObject = GameObject.Find(HUD.usrActiveship);
			tmp.SetActiveRecursively(false);
			tmp.SetActive(true);
			
			var tmp2 = GameObject.Find(selectedBuyShipName);
			tmp2.SetActiveRecursively(true);
		}
		
		if (GUI.Button(Rect(400,Screen.height/6,100,20),"Skills"))
		{
			tabHangar = false;
			tabShips = false;
			tabSkills = true;
			tabTechs = false;
			
			var s1 : GameObject = GameObject.Find(selectedBuyShipName);
			s1.SetActiveRecursively(false);
			s1.SetActive(true);
			
			var s2 = GameObject.Find(HUD.usrActiveship);
			s2.SetActiveRecursively(true);
		}

		if (GUI.Button(Rect(500,Screen.height/6,100,20),"Techs"))
		{
			tabHangar = false;
			tabShips = false;
			tabSkills = false;
			tabTechs = true;
			
			var t1 : GameObject = GameObject.Find(selectedBuyShipName);
			t1.SetActiveRecursively(false);
			t1.SetActive(true);
			
			var t2 = GameObject.Find(HUD.usrActiveship);
			t2.SetActiveRecursively(true);
		}

		if (tabHangar == true)
		{
			GUI.Label(Rect(200,Screen.height/5,100,100),"Current: ");
			
			//var tmp = GameObject.Find("a_TriniArmor");
			//var tmp2 = tmp.GetComponent("Camera");
			//tmp2.camera.rect(Rect(0,0,1,1));
		}
		
		if (tabShips == true)
		{
			/*if (selectedBuyShip == 0)
			{
				var tmp2 = GameObject.Find(selectedBuyShipName);
				tmp2.SetActiveRecursively(false);
				tmp2.renderer.enabled = true;

				selectedBuyShipName = "a_TriniArmor";
			}
				
			else if (selectedBuyShip == 1)
				selectedBuyShipName = "a_TriniFighter";*/
			
			if (selectedBuyShip == 0)
				GUI.Label(Rect(Screen.width/2+60,Screen.height/4,300,40),"Trini Armor Ship");
				
			else if (selectedBuyShip == 1)
				GUI.Label(Rect(Screen.width/2+60,Screen.height/4,300,40),"Trini Fighter Ship");
				
			else if (selectedBuyShip == 2)
				GUI.Label(Rect(Screen.width/2+60,Screen.height/4,300,40),"Trini Armor Hybrid Ship");
				
			else if (selectedBuyShip == 3)
				GUI.Label(Rect(Screen.width/2+60,Screen.height/4,300,40),"Trini Fighter Hybrid Ship");
			

			GUI.Label(Rect(Screen.width/2+60,Screen.height/3.5,300,20),"Cost: 50 Bloodstone");
			
			if (GUI.Button(Rect(Screen.width/2-50,Screen.height/4,100,20),"Purchase"))
			{
				if (HUD.usrBloodstone >= 50)
				{
					Camera.main.networkView.RPC("PurchaseShip",RPCMode.Server,HUD.usrAccount,selectedBuyShipName);
					HUD.usrActiveship = selectedBuyShipName;
					tabHangar = true;
					tabShips = false;
				}
			}
			
			if (GUI.Button(Rect((Screen.width/3)-50,Screen.height/10,50,20),"<"))
			{
				selectedBuyShip--;
				
				var temp3 = GameObject.Find(selectedBuyShipName);
				temp3.SetActiveRecursively(false);
				temp3.SetActive(true);
				//tmp2.renderer.enabled = true;
				
				if (selectedBuyShip < 0)
					selectedBuyShip = 3;
					
				if (selectedBuyShip == 0)
					selectedBuyShipName = "a_TriniArmor";
				
				else if (selectedBuyShip == 1)
					selectedBuyShipName = "a_TriniFighter";
				
				else if (selectedBuyShip == 2)
					selectedBuyShipName = "a_TriniArmorHybrid";

				else if (selectedBuyShip == 3)
					selectedBuyShipName = "a_TriniFighterHybrid";

				var turnon1 = GameObject.Find(selectedBuyShipName);
				turnon1.SetActiveRecursively(true);
			}
			
			if (GUI.Button(Rect(((Screen.width/3)+(Screen.width/3)),Screen.height/10,50,20),">"))
			{
				selectedBuyShip++;
				
				var temp2 = GameObject.Find(selectedBuyShipName);
				temp2.SetActiveRecursively(false);
				temp2.SetActive(true);
				//tmp2.renderer.enabled = true;
				
				if (selectedBuyShip > 3)
					selectedBuyShip = 0;
					
				if (selectedBuyShip == 0)
					selectedBuyShipName = "a_TriniArmor";
				
				else if (selectedBuyShip == 1)
					selectedBuyShipName = "a_TriniFighter";
				
				else if (selectedBuyShip == 2)
					selectedBuyShipName = "a_TriniArmorHybrid";

				else if (selectedBuyShip == 3)
					selectedBuyShipName = "a_TriniFighterHybrid";

				var turnon = GameObject.Find(selectedBuyShipName);
				turnon.SetActiveRecursively(true);
			}
			
			// Turn off current avatar	
			//var turnoff = GameObject.Find(HUD.usrActiveship);
			//turnoff.SetActiveRecursively(false);
			//turnoff.renderer.enabled = true;
			
			// Turn on ship buy avatar
			//var turnon = GameObject.Find(selectedBuyShipName);
			//turnon.SetActiveRecursively(true);

		}
		
		if (tabSkills == true)
		{
			GUI.Label(Rect(Screen.width/2-100,Screen.height/2-120,200,100),"(Individual Skill Point Adds 5%)");
			GUI.Label(Rect(Screen.width/2-100,Screen.height/2-100,200,100),"Available Skill Points: " + HUD.usrSkills);
			GUI.Label(Rect(Screen.width/2-100,Screen.height/2-60,200,100),"Health Skill Points: " + HUD.usrSkillHealth);
			GUI.Label(Rect(Screen.width/2-100,Screen.height/2-40,200,100),"Energy Skill Points: " + HUD.usrSkillEnergy);
			GUI.Label(Rect(Screen.width/2-100,Screen.height/2-20,200,100),"Power Skill Points: " + HUD.usrSkillPower);
			
			if (GUI.Button(Rect(Screen.width/2-130,Screen.height/2-60,20,20),"+"))
			{
				Camera.main.networkView.RPC("AddSkill",RPCMode.Server,true,false,false);
			}

			if (GUI.Button(Rect(Screen.width/2-130,Screen.height/2-40,20,20),"+"))
			{
				Camera.main.networkView.RPC("AddSkill",RPCMode.Server,false,true,false);
			}
			
			if (GUI.Button(Rect(Screen.width/2-130,Screen.height/2-20,20,20),"+"))
			{
				Camera.main.networkView.RPC("AddSkill",RPCMode.Server,false,false,true);
			}
		}
		
		if (tabTechs == true)
		{
		}	
	}
}