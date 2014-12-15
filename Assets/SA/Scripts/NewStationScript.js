#pragma strict
	
var stationDockWindow : GameObject;
var stationHangar : GameObject;
var stationWindow : GameObject;
var stationPurchaseShips : GameObject;
var stationSkillPoints : GameObject;
var stationUpgrades : GameObject;

// Trini Ships
var rAssociation1 : GameObject;
var TriniArmor : GameObject;
var TriniArmorHybrid : GameObject;
var TriniFighter : GameObject;
var TriniFighterHybrid : GameObject;

// Krul Ships
var KrulArmor : GameObject;
var KrulFighter : GameObject;
var KrulAlloy : GameObject;
var KrulFusion : GameObject;

// Phase Ships
var phaseBarricade : GameObject;
var phaseCrimson : GameObject;
var phaseMagnum : GameObject;
var phaseZealot : GameObject;
var phaseSentinel : GameObject;

var tabHangar : boolean;
var tabShips : boolean;
var tabSkills : boolean;
var tabUpgrades : boolean;

var tabShipsCounter : int = 0;
var price : int;

var upgrade : String;
var upgradeTitle : String;
var upgradeDesc : String;
var upgradePrice : int;
var upgradePriceReq : int;
var upgradeCode : String;

private var Docked : boolean;

var origPos : Vector3;

var shipData : WWW;

function requestShips()
{
	shipData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword);
	yield shipData;
}


function Dock ()
{
	HUD.nowDocked = true;
	
	tabHangar = true;
	tabShips = false;
	tabSkills = false;
	tabUpgrades = false;
	
	Docked = true;
	stationDockWindow.SetActive(false);
	stationWindow.SetActive(true);
	origPos = GameObject.Find(HUD.usrAccount).transform.position;
	//Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
	PhotonNetwork.RemoveRPCs(Camera.main.GetComponent(PhotonView));
	//GameObject.Find(HUD.usrAccount).GetComponent(PlayerMovement).rPlayer(HUD.usrAccount);
	PhotonNetwork.Destroy(GameObject.Find(HUD.usrAccount));
	
	// Code for TapForTap
	TapForTap.SetYearOfBirth(1999);
	TapForTap.CreateAdView(TapForTapVerticalAlignment.TOP, TapForTapHorizontalAlignment.CENTER);
	//TapForTap.PrepareInterstitial();
	//TapForTap.ShowInterstitial();
	
	// Code for request ships
	requestShips();
	//Debug.Log(shipData.text);
}

function resetVars ()
{
	Docked = false;
	stationWindow.SetActive(false);
	
	resetTabs();
	resetShips();
	
	if (HUD.usrZone == "")
		HUD.usrZone = "TriniSpace";
}

function unDock ()
{
	HUD.nowDocked = false;
	
	Docked = false;
	stationWindow.SetActive(false);
	
	resetTabs();
	resetShips();
	
	if (HUD.usrZone == "")
		HUD.usrZone = "TriniSpace";
		
	Camera.main.GetComponent(HUD).spawnShip(origPos);
	
	// Code for TapForTap
	TapForTap.RemoveAdView();
}

function addskillArmor()
{

}

function addskillBlaster()
{

}

function addskillEnergy()
{

}

function displayShip (shipName : String)
{
	// Trini Ships
	if (shipName == "a_StarterShip")
		rAssociation1.SetActive(true);
	else if (shipName == "a_TriniArmor")
		TriniArmor.SetActive(true);
	else if (shipName == "a_TriniArmorHybrid")
		TriniArmorHybrid.SetActive(true);
	else if (shipName == "a_TriniFighter")
		TriniFighter.SetActive(true);
	else if (shipName == "a_TriniFighterHybrid")
		TriniFighterHybrid.SetActive(true);
	
	// Krul Ships
	else if (shipName == "KrulArmor")
		KrulArmor.SetActive(true);
	else if (shipName == "KrulFighter")
		KrulFighter.SetActive(true);
	else if (shipName == "KrulAlloy")
		KrulAlloy.SetActive(true);
	else if (shipName == "KrulFusion")
		KrulFusion.SetActive(true);
		
	// Phase Ships
	else if (shipName == "phaseBarricade")
		phaseBarricade.SetActive(true);
	else if (shipName == "phaseCrimson")
		phaseCrimson.SetActive(true);
	else if (shipName == "phaseMagnum")
		phaseMagnum.SetActive(true);
	else if (shipName == "phaseZealot")
		phaseZealot.SetActive(true);
	else if (shipName == "phaseSentinel")
		phaseSentinel.SetActive(true);
}

function displayPurchaseShip (counter : int)
{
	// Trini Ships
	if (counter == 0)
	{
		displayShip("a_TriniArmor");
		price = 50;
	}
	else if (counter == 1)
	{
		displayShip("a_TriniArmorHybrid");
		price = 50;
	}
	else if (counter == 2)
	{
		displayShip("a_TriniFighter");
		price = 50;
	}
	else if (counter == 3)
	{
		displayShip("a_TriniFighterHybrid");
		price = 50;
	}
	
	// Krul Ships
	else if (counter == 4)
	{
		displayShip("KrulArmor");
		price = 2000;
	}
	else if (counter == 5)
	{
		displayShip("KrulFighter");
		price = 2000;
	}
	else if (counter == 6)
	{
		displayShip("KrulAlloy");
		price = 2000;
	}
	else if (counter == 7)
	{
		displayShip("KrulFusion");
		price = 2000;
	}

	// Phase Ships
	else if (counter == 8)
	{
		displayShip("phaseBarricade");
		price = 5000;
	}
	else if (counter == 9)
	{
		displayShip("phaseCrimson");
		price = 5000;
	}
	else if (counter == 10)
	{
		displayShip("phaseMagnum");
		price = 5000;
	}
	else if (counter == 11)
	{
		displayShip("phaseZealot");
		price = 5000;
	}
	else if (counter == 12)
	{
		displayShip("phaseSentinel");
		price = 10000;
	}

	GameObject.Find("UI Root/UI_StationPanel/PurchaseShips/Price/Amount").GetComponent(UILabel).text = price.ToString();

}

function purchaseShip ()
{
	var selectedShip : String;
	
	// Trini Ships
	if (tabShipsCounter == 0)
		selectedShip = "a_TriniArmor";
	else if (tabShipsCounter == 1)
		selectedShip = "a_TriniArmorHybrid";
	else if (tabShipsCounter == 2)
		selectedShip = "a_TriniFighter";
	else if (tabShipsCounter == 3)
		selectedShip = "a_TriniFighterHybrid";
	
	// Krul Ships
	else if (tabShipsCounter == 4)
		selectedShip = "KrulArmor";
	else if (tabShipsCounter == 5)
		selectedShip = "KrulFighter";
	else if (tabShipsCounter == 6)
		selectedShip = "KrulAlloy";
	else if (tabShipsCounter == 7)
		selectedShip = "KrulFusion";
		
	// Phase Ships
	else if (tabShipsCounter == 8)
		selectedShip = "phaseBarricade";
	else if (tabShipsCounter == 9)
		selectedShip = "phaseCrimson";
	else if (tabShipsCounter == 10)
		selectedShip = "phaseMagnum";
	else if (tabShipsCounter == 11)
		selectedShip = "phaseZealot";
	else if (tabShipsCounter == 12)
		selectedShip = "phaseSentinel";
		
		
	if (HUD.usrBloodstone >= price)
	{
		//Camera.main.networkView.RPC("PurchaseShip",RPCMode.Server,HUD.usrAccount,selectedShip);
		//HUD.usrActiveship = selectedShip;
		Camera.main.GetComponent(HUD).uiData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&purchaseship=" + selectedShip);
		yield Camera.main.GetComponent(HUD).uiData;
		resetShips();
		resetTabs();
		tabHangar = true;

		shipBuyThread();		
	}
}

function shipBuyThread()
{
	Camera.main.GetComponent(HUD).uiData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&updateinfo");
	yield Camera.main.GetComponent(HUD).uiData;
	//yield WaitForSeconds(5);
	requestShips();
}

function resetShips ()
{
	// Trini Ships
	rAssociation1.SetActive(false);
	TriniArmor.SetActive(false);
	TriniArmorHybrid.SetActive(false);
	TriniFighter.SetActive(false);
	TriniFighterHybrid.SetActive(false);
	
	// Krul Ships
	KrulArmor.SetActive(false);
	KrulFighter.SetActive(false);
	KrulAlloy.SetActive(false);
	KrulFusion.SetActive(false);
	
	// Phase Ships
	phaseBarricade.SetActive(false);
	phaseCrimson.SetActive(false);
	phaseMagnum.SetActive(false);
	phaseZealot.SetActive(false);
	phaseSentinel.SetActive(false);
}

function resetTabs ()
{		
	stationHangar.SetActive(false);
	stationPurchaseShips.SetActive(false);
	stationSkillPoints.SetActive(false);
	stationUpgrades.SetActive(false);
	
	resetShips();
	
	tabHangar = false;
	tabShips = false;
	tabSkills = false;
	tabUpgrades = false;
}

function nextShip ()
{
	resetShips();
	
	if (tabShipsCounter < 12)
		tabShipsCounter = tabShipsCounter + 1;
	else
		tabShipsCounter = 0;
}

function prevShip ()
{
	resetShips();
	
	if (tabShipsCounter > 0)
		tabShipsCounter = tabShipsCounter - 1;
	else
		tabShipsCounter = 12;
}

function bHangar ()
{
	resetTabs();
	tabHangar = true;
	Camera.main.networkView.RPC ("requestListShips", RPCMode.Server);
}

function bShips ()
{
	resetTabs();
	tabShipsCounter = 0;
	tabShips = true;
}

function bSkills ()
{
	resetTabs();
	tabSkills = true;
}

function bUpgrades ()
{
	resetTabs();
	tabUpgrades = true;
}

function addArmor ()
{
	//Camera.main.networkView.RPC("AddSkill",RPCMode.Server,true,false,false);
	Camera.main.GetComponent(HUD).uiData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&addskill=skillhealth");
}

function addPower ()
{
	//Camera.main.networkView.RPC("AddSkill",RPCMode.Server,false,false,true);
	Camera.main.GetComponent(HUD).uiData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&addskill=skillpower");
}

function addEnergy ()
{
	//Camera.main.networkView.RPC("AddSkill",RPCMode.Server,false,true,false);
	Camera.main.GetComponent(HUD).uiData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&addskill=skillenergy");
}

function displaySkills ()
{
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Label").GetComponent(UILabel).text = HUD.usrSkills.ToString();
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Armor/Label").GetComponent(UILabel).text = HUD.usrSkillHealth.ToString();
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Blaster/Label").GetComponent(UILabel).text = HUD.usrSkillPower.ToString();
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Energy/Label").GetComponent(UILabel).text = HUD.usrSkillEnergy.ToString();

	var armorVar = HUD.usrHealthMax;
	var powerVar = HUD.usrBlasterPower;
	var energyVar = HUD.usrEnergyMax;
	
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Armor/morePower").GetComponent(UILabel).text = armorVar.ToString() + " total armor";
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Blaster/morePower").GetComponent(UILabel).text = powerVar.ToString() + " total power";
	GameObject.Find("UI Root/UI_StationPanel/SkillPoints/Energy/morePower").GetComponent(UILabel).text = energyVar.ToString() + " total energy";
}

function setKrulPhaseUpgrade ()
{
	setUpgrade("kpu");
}

function setEnergyBooster1 ()
{
	setUpgrade("em1");
}

function setEnergyBooster2 ()
{
	setUpgrade("em2");
}

function setEnergyBooster3 ()
{
	setUpgrade("em3");
}

function setRepairBooster1 ()
{
	setUpgrade("rm1");
}

function setRepairBooster2 ()
{
	setUpgrade("rm2");
}

function setRepairBooster3 ()
{
	setUpgrade("rm3");
}

function setResetSkills ()
{
	setUpgrade("rskills");
	buyUpgrade();
}

function setPurchaseShivanInterceptor ()
{
	setUpgrade("psi");
}

function setUpgrade (theUpgrade : String)
{
	if (theUpgrade == "kpu")
	{
		upgradeTitle = "Krul Phase Upgrade";
		upgradeDesc = "This upgrade will upgrade a Phase ship to Krul standards and statistics! Bigger, better, more powerful!";
		upgradePrice = 2000;
		upgradePriceReq = 1;
		upgradeCode = "kpu";
	}
	
	else if (theUpgrade == "rskills")
	{
		upgradePrice = 5;
		upgradePriceReq = 2;
		upgradeCode = "rskills";
	}
	
	else if (theUpgrade == "em1")
	{
		upgradeTitle = "Basic Energy Booster";
		upgradeDesc = "This booster will boost your energy regeneration rate by double!\n\nAfterburner still turns off energy regeneration.\nThis will last for 30 days.";
		upgradePrice = 500;
		upgradePriceReq = 1;
		upgradeCode = "em1";
	}
	
	else if (theUpgrade == "em2")
	{
		upgradeTitle = "Express Energy Booster";
		upgradeDesc = "This booster will boost your energy regeneration rate by triple!\n\nAfterburner still turns off energy regeneration.\nThis will last for 30 days.";
		upgradePrice = 10;
		upgradePriceReq = 2;
		upgradeCode = "em2";
	}

	else if (theUpgrade == "em3")
	{
		upgradeTitle = "Ultimate Energy Booster";
		upgradeDesc = "This booster will boost your energy regeneration rate to unlimited! Yes, unlimited energy!\n\nAfterburner still turns off energy regeneration.\nThis will last for 30 days.";
		upgradePrice = 50;
		upgradePriceReq = 2;
		upgradeCode = "em3";
	}
	
	else if (theUpgrade == "rm1")
	{
		upgradeTitle = "Basic Repair Booster";
		upgradeDesc = "This booster will boost your repair regeneration rate by double!\n\nThis will last for 30 days.";
		upgradePrice = 500;
		upgradePriceReq = 1;
		upgradeCode = "rm1";
	}

	else if (theUpgrade == "rm2")
	{
		upgradeTitle = "Express Repair Booster";
		upgradeDesc = "This booster will boost your repair regeneration rate by triple!\n\nThis will last for 30 days.";
		upgradePrice = 10;
		upgradePriceReq = 2;
		upgradeCode = "rm2";
	}

	else if (theUpgrade == "rm3")
	{
		upgradeTitle = "Ultimate Repair Booster";
		upgradeDesc = "This booster will boost your repair regeneration rate by 4 times!\n\nThis will last for 30 days.";
		upgradePrice = 50;
		upgradePriceReq = 2;
		upgradeCode = "rm3";
	}

	else if (theUpgrade == "psi")
	{
		upgradeTitle = "Shivan Interceptor";
		upgradeDesc = "Add this beauty ship to your collection today! Has Krul based stats";
		upgradePrice = 500;
		upgradePriceReq = 2;
		upgradeCode = "psi";
	}
}

function displayUpgrades ()
{
	GameObject.Find("UI Root/UI_StationPanel/Upgrades/Title").GetComponent(UILabel).text = upgradeTitle;
	GameObject.Find("UI Root/UI_StationPanel/Upgrades/Title/Description").GetComponent(UILabel).text = upgradeDesc;
}

function buyUpgrade ()
{
	// 1 == Bloodstone
	// 2 == Amethyst
	
	if (upgradeCode != "" || upgradeCode != null)
	{
		if (upgradePriceReq == 1)
		{
			if (HUD.usrBloodstone >= upgradePrice)
			{
				Camera.main.GetComponent(HUD).PurchaseRequest(upgradeCode);
				resetShips();
				resetTabs();
				tabHangar = true;
			}
		}
		
		else if (upgradePriceReq == 2)
		{
			if (HUD.usrAmethyst >= upgradePrice)
			{
				Camera.main.GetComponent(HUD).PurchaseRequest(upgradeCode);
				resetShips();
				resetTabs();
				tabHangar = true;
			}
		}
		
		//Camera.main.networkView.RPC ("requestMemberships", RPCMode.Server);
	}
}

function Start ()
{
	resetVars();
}

function Update ()
{	
	if (Docked == false)
	{
		if (GameObject.Find(HUD.usrAccount) != null)
		{
			if (Vector3.Distance(gameObject.transform.position, GameObject.Find(HUD.usrAccount).transform.position) < 15)
			{
				stationDockWindow.SetActive(true);
				HUD.globalDock = true;
				HUD.globalDockStation = gameObject.name;
			}

			if (HUD.globalDock == true && HUD.globalDockStation == gameObject.name)
			{
				resetShips();

				if (Vector3.Distance(gameObject.transform.position, GameObject.Find(HUD.usrAccount).transform.position) >= 15)
				{
					stationDockWindow.SetActive(false);
					HUD.globalDock = false;
					HUD.globalDockStation = "";
				}
			}
		}
	}
	
	else if (Docked == true)
	{
		stationDockWindow.SetActive(false);
		HUD.globalDock = false;
		HUD.globalDockStation = "";
		
		if (tabHangar == true)
		{
			stationHangar.SetActive(true);
			//displayShip(HUD.usrActiveship);
		}
		
		else if (tabShips == true)
		{
			stationPurchaseShips.SetActive(true);
			displayPurchaseShip(tabShipsCounter);
		}
		
		else if (tabSkills == true)
		{
			stationSkillPoints.SetActive(true);
			displaySkills();
		}
		
		else if (tabUpgrades == true)
		{
			stationUpgrades.SetActive(true);
			displayUpgrades();
		}
	}
	
	
	if (shipData != null)
	{
		if (shipData.isDone)
		{
			var dataBuffer = shipData.text.Split("|"[0]);
			var ids : String;
			var ships : String;
			var shipnames : String;
			
			for (var i = 0; i < dataBuffer.Length-1; i++)
			{
				var tmpstring = dataBuffer[i];
				var iBuffer = tmpstring.Split(";"[0]);
				
				ids = ids + iBuffer[0] + ":";
				ships = ships + iBuffer[1] + ":";
				shipnames = shipnames + iBuffer[2] + ":";
			}
			
			Camera.main.GetComponent(HUD).returnListShips(ids, ships, shipnames);
			shipData = null;
		}
	}
}