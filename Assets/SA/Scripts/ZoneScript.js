#pragma strict

function Start () {

}

function Update () {

}

@RPC
function LoggedIn(Name:String,location:Vector3,gm:int,rank:int,experience:float,experiencemax:float,bloodstone:int,amethyst:int,activeship:String,
					activeshiphealth:float,activeshiphealthmax:float,activeshipenergy:float,activeshipblasterpower:float,skills:int,
					skillhealth:int,skillenergy:int,skillpower:int,smComplete:int,smEngaged:int,currentsm:int,zone:String,activator:int)
{
	PlayerPrefs.SetString("PlayerName",Name);
	PlayerPrefs.SetInt("PlayerGM",gm);
	//PlayerPrefs.SetInt("PlayerHealth",10);
	//PlayerPrefs.SetInt("PlayerHealthMax",10);
	PlayerPrefs.SetFloat("PlayerX",location.x);
	PlayerPrefs.SetFloat("PlayerY",location.y);
	PlayerPrefs.SetFloat("PlayerZ",location.z);
	PlayerPrefs.SetInt("PlayerRank",rank);
	
	PlayerPrefs.SetInt("PlayerSkills",skills);
	PlayerPrefs.SetInt("PlayerSkillHealth",skillhealth);
	PlayerPrefs.SetInt("PlayerSkillEnergy",skillenergy);
	PlayerPrefs.SetInt("PlayerSkillPower",skillpower);
	
	PlayerPrefs.SetFloat("PlayerExp",experience);
	PlayerPrefs.SetFloat("PlayerExpMax",experiencemax);
	PlayerPrefs.SetInt("PlayerBloodstone",bloodstone);
	PlayerPrefs.SetInt("PlayerAmethyst",amethyst);
	PlayerPrefs.SetString("PlayerActiveShip",activeship);
	
	PlayerPrefs.SetFloat("PlayerActiveShipHealth",activeshiphealth);
	PlayerPrefs.SetFloat("PlayerActiveShipHealthMax",activeshiphealthmax);
	PlayerPrefs.SetFloat("PlayerActiveShipEnergy",activeshipenergy);
	PlayerPrefs.SetFloat("PlayerActiveShipEnergyMax",activeshipenergy);
	PlayerPrefs.SetFloat("PlayerActiveShipBlasterPower",activeshipblasterpower);
	
	PlayerPrefs.SetInt("PlayerSMComplete",smComplete);
	PlayerPrefs.SetInt("PlayerSMEngaged",smEngaged);
	PlayerPrefs.SetInt("PlayerSMCurrent",currentsm);

	if (zone == "")
		zone = "TriniSpace";
		
	PlayerPrefs.SetInt("PlayerActivator",activator);
	PlayerPrefs.SetString("PlayerZone",zone);

	Application.LoadLevel(zone);
}

@RPC
function Teleport(zone:String)
{
}

@RPC
function SilentQuit(name:String)
{
	if (GameObject.Find(name) != null)
	{
		Destroy(GameObject.Find(name));
	}
}