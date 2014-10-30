#pragma strict

function displayAllMinerals()
{
	GameObject.Find("UI Root/UI_CraftingPanel/cWindow/Box1/mineralsAmount").GetComponent(UILabel).text = HUD.usrMinerals.ToString();
	
	GameObject.Find("UI Root/UI_CraftingPanel/cWindow/Box2/amberAmount").GetComponent(UILabel).text = HUD.usrAmber.ToString();
	GameObject.Find("UI Root/UI_CraftingPanel/cWindow/Box2/azuriteAmount").GetComponent(UILabel).text = HUD.usrAzurite.ToString();
	GameObject.Find("UI Root/UI_CraftingPanel/cWindow/Box2/modulesAmount").GetComponent(UILabel).text = HUD.usrModules.ToString();
}

function Start () {

}

function Update ()
{
	displayAllMinerals();
}