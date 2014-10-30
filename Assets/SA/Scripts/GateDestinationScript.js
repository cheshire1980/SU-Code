#pragma strict

function select_Trini ()
{
	HUD.selectedGate = "krulspace";
	HUD.activator = true;
	HUD.activatorMission = true;
	Camera.main.GetComponent(HUD).gateWindow.SetActive(false);
}

function select_Krul ()
{
	HUD.selectedGate = "trinispace";
	HUD.activator = true;
	HUD.activatorMission = true;
	Camera.main.GetComponent(HUD).gateWindow.SetActive(false);
}

function select_Lunta ()
{
	HUD.selectedGate = "luntaspace";
	HUD.activator = true;
	HUD.activatorMission = true;
	Camera.main.GetComponent(HUD).gateWindow.SetActive(false);
}