#pragma strict

function loadShip ()
{
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).loadShip();
}

function selectShip ()
{
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).selectShip(gameObject.name);
}

function renameShip ()
{
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).renameShip();
}

function renameComplete ()
{
	GameObject.Find("UI Root/UI_StationPanel/HangarList").GetComponent(HangarScript).renameComplete();
}