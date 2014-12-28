#pragma strict


function Dock()
{
	Debug.Log("Sent listships");
	//Camera.main.networkView.RPC ("requestListShips", RPCMode.Server);
	GameObject.Find("TriniStation").GetComponent(NewStationScript).Dock();
}

function unDock()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).unDock();
}

function bHangar ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).bHangar();
}

function bShips ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).bShips();
}

function bSkills ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).bSkills();
}

function bUpgrades ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).bUpgrades();
}

function prevShip ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).prevShip();
}

function nextShip ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).nextShip();
}

function purchaseShip ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).purchaseShip();	
}

function addArmor ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).addArmor();	
}

function addPower ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).addPower();	
}

function addEnergy ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).addEnergy();	
}

function setKrulPhaseUpgrade ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setKrulPhaseUpgrade();	
}

function setEnergyBooster1 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setEnergyBooster1();	
}

function setEnergyBooster2 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setEnergyBooster2();	
}

function setEnergyBooster3 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setEnergyBooster3();	
}

function setRepairBooster1 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setRepairBooster1();	
}

function setRepairBooster2 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setRepairBooster2();	
}

function setRepairBooster3 ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setRepairBooster3();	
}

function setNameChange ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setNameChange();	
}

function buyUpgrade ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).buyUpgrade();	
}

function setResetSkills ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setResetSkills();
}

function setPurchaseShivanInterceptor ()
{
	GameObject.Find("TriniStation").GetComponent(NewStationScript).setPurchaseShivanInterceptor();
}

function doRename ()
{
	Camera.main.GetComponent(HUD).doRename();
}

function closeNewsWindow ()
{
	Camera.main.GetComponent(HUD).newsWindow.SetActive(false);
}