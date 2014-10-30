#pragma strict

static var sevent_id : int;
static var sevent_name : String;
static var sevent_description : String;
static var sevent_waves : int;
static var sevent_npc : String;
static var sevent_npchealth : float;
static var sevent_healthincrease : float;
static var sevent_npcdamage : float;
static var sevent_damageincrease : float;
static var sevent_attempts : int;
static var sevent_rewardafterwave : int;
static var sevent_rewardcompleted : String;
static var sevent_rewardcompletedgems : int;

var seventWindow : GameObject;

var runningEvent : boolean = false;
var waveCompleted : boolean = false;
var waveCounter : int;
var sentReq : boolean = false;

var stationTemplate : Transform;
var droneTemplate : Transform;

var npcTemplate : Transform;
var sentinelTemplate : Transform;
var ruptureTemplate : Transform;
var vindicatorTemplate : Transform;
var interceptorTemplate : Transform;

var station : Transform;
var drone : Transform;
var npc1 : Transform;
var npc2 : Transform;
var npc3 : Transform;
var npc4 : Transform;
var npc5 : Transform;


@RPC
function requestCompleteSE () { networkView.RPC ("requestCompleteSE", RPCMode.Server); }

@RPC
function returnCompleteSE ()
{
	if (runningEvent == true)
	{
		Camera.main.GetComponent(HUD).messageBoxDestroy();
		
		if (sevent_id == 1)
			Camera.main.GetComponent(HUD).messageBox("Congratulations! You have completed the event! Check your ship hangar for the new Crawler Phase ship!");

		runningEvent = false;
	}
}

@RPC
function requestCompleteWave () { networkView.RPC ("requestCompleteWave", RPCMode.Server); }

@RPC
function returnCompleteWave ()
{
	if (runningEvent == true)
	{
		Camera.main.GetComponent(HUD).messageBoxDestroy();
		Camera.main.GetComponent(HUD).messageBox("Wave " + waveCounter.ToString() + " completed! Received " + sevent_rewardafterwave.ToString() + " Bloodstone!");
		
		yield WaitForSeconds(12);
		startNewWave();
	}
}

@RPC
function requestStartSE () { networkView.RPC ("requestStartSE", RPCMode.Server); }

@RPC
function returnStartSE (start : boolean)
{
	if (start == true)
	{
		seventWindow.SetActive(false);
		startSE();
	}
	
	else if (start == false)
	{
		seventWindow.SetActive(false);
		Camera.main.GetComponent(HUD).messageBoxDestroy();
		Camera.main.GetComponent(HUD).messageBox("You have already used up all your tries for today.Try again tomorrow.");
	}
}

@RPC
function requestSEInfo () {}

@RPC
function returnSEInfo (id : int, name : String, desc : String, waves : int, npc : String, npch : float, hi : float, npcd : float, di : float,
							attempts : int, raw : int, rc : String, rcg : int)
{
	sevent_id = id;
	sevent_name = name;
	sevent_description = desc;
	sevent_waves = waves;
	sevent_npc = npc;
	sevent_npchealth = npch;
	sevent_healthincrease = hi;
	sevent_npcdamage = npcd;
	sevent_damageincrease = di;
	sevent_attempts = attempts;
	sevent_rewardafterwave = raw;
	sevent_rewardcompleted = rc;
	sevent_rewardcompletedgems = rcg;
}

function startWaves ()
{
	yield WaitForSeconds(12);
	startNewWave();
}

function startNewWave ()
{
	if (runningEvent == true)
	{
		waveCounter += 1;
		waveCompleted = false;
		sentReq = false;

		if (sevent_npc == "Sentinel")
			npcTemplate = sentinelTemplate;
		else if (sevent_npc == "Rupture")
			npcTemplate = ruptureTemplate;
		else if (sevent_npc == "Vindicator")
			npcTemplate = vindicatorTemplate;
		else if (sevent_npc == "Interceptor")
			npcTemplate = interceptorTemplate;
			
		var tmppos : Vector3 = GameObject.Find(HUD.usrAccount).transform.position;
		npc1 = Instantiate (npcTemplate, Vector3(tmppos.x - 500, 0, tmppos.z - 500), Quaternion.identity);
		npc2 = Instantiate (npcTemplate, Vector3(tmppos.x + 500, 0, tmppos.z + 500), Quaternion.identity);
		npc3 = Instantiate (npcTemplate, Vector3(tmppos.x - 500, 0, tmppos.z + 500), Quaternion.identity);
		npc4 = Instantiate (npcTemplate, Vector3(tmppos.x + 500, 0, tmppos.z - 500), Quaternion.identity);
		npc5 = Instantiate (npcTemplate, Vector3(tmppos.x, 0, tmppos.z - 500), Quaternion.identity);

		npc1.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
		npc1.GetComponent(missionNpcBrain).npcHealth = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc1.GetComponent(missionNpcBrain).npcHealthMax = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc1.GetComponent(missionNpcBrain).npcRank = HUD.usrRank;
		npc1.GetComponent(missionNpcBrain).blasterPower = sevent_npcdamage + (waveCounter * sevent_damageincrease);
		npc1.name = sevent_npc;

		npc2.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
		npc2.GetComponent(missionNpcBrain).npcHealth = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc2.GetComponent(missionNpcBrain).npcHealthMax = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc2.GetComponent(missionNpcBrain).npcRank = HUD.usrRank;
		npc2.GetComponent(missionNpcBrain).blasterPower = sevent_npcdamage + (waveCounter * sevent_damageincrease);
		npc2.name = sevent_npc;

		npc3.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
		npc3.GetComponent(missionNpcBrain).npcHealth = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc3.GetComponent(missionNpcBrain).npcHealthMax = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc3.GetComponent(missionNpcBrain).npcRank = HUD.usrRank;
		npc3.GetComponent(missionNpcBrain).blasterPower = sevent_npcdamage + (waveCounter * sevent_damageincrease);
		npc3.name = sevent_npc;

		npc4.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
		npc4.GetComponent(missionNpcBrain).npcHealth = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc4.GetComponent(missionNpcBrain).npcHealthMax = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc4.GetComponent(missionNpcBrain).npcRank = HUD.usrRank;
		npc4.GetComponent(missionNpcBrain).blasterPower = sevent_npcdamage + (waveCounter * sevent_damageincrease);
		npc4.name = sevent_npc;

		npc5.GetComponent(missionNpcBrain).target = GameObject.Find(HUD.usrAccount).transform;
		npc5.GetComponent(missionNpcBrain).npcHealth = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc5.GetComponent(missionNpcBrain).npcHealthMax = sevent_npchealth + (waveCounter * sevent_healthincrease);
		npc5.GetComponent(missionNpcBrain).npcRank = HUD.usrRank;
		npc5.GetComponent(missionNpcBrain).blasterPower = sevent_npcdamage + (waveCounter * sevent_damageincrease);
		npc5.name = sevent_npc;
		
		Camera.main.GetComponent(HUD).messageBoxDestroy();
		Camera.main.GetComponent(HUD).messageBox("Wave " + waveCounter.ToString());
		Camera.main.GetComponent(HUD).messageBox("Wave " + waveCounter.ToString());
		Camera.main.GetComponent(HUD).messageBox("Wave " + waveCounter.ToString());
	}
}

function startSE ()
{
	runningEvent = true;
	waveCompleted = false;
	waveCounter = 0;
	
	station = Instantiate (stationTemplate, Vector3(0,0,0), Quaternion.identity);
	drone = Instantiate (droneTemplate, Vector3(0,0,0), Quaternion.identity);
	
	station.name = "station";
	drone.name = "drone";
	
	Camera.main.GetComponent(HUD).messageBoxDestroy();
	Camera.main.GetComponent(HUD).messageBox("Head to the yellow target location and get ready for the 1st wave!");
}

function updateSEWindow ()
{
	if (seventWindow.active == true)
	{
		//seventWindow.transform.Find("Title").GetComponent(UILabel).text = sevent_name;
		
		GameObject.Find("UI Root/UI_SpecialEvent/seWindow/Title").GetComponent(UILabel).text = sevent_name;
		seventWindow.transform.Find("Desc").GetComponent(UILabel).text = sevent_description;
	}
}

function Update ()
{
	updateSEWindow();
	
	if (runningEvent == true)
	{
		if (GameObject.Find(HUD.usrAccount) == null)
		{
			runningEvent = false;
			Camera.main.GetComponent(HUD).messageBoxDestroy();
			Camera.main.GetComponent(HUD).messageBox("Event failed! Please try again!");
			GameObject.Destroy(station.gameObject);
		}
		
		if (waveCounter == 0 && waveCompleted == false)
		{	
			if (Vector3.Distance(GameObject.Find(HUD.usrAccount).transform.position, station.transform.position) < 5)
			{
				GameObject.Destroy(drone.gameObject);
				waveCompleted = true;
				
				startWaves();
			}
		}
		
		else if (waveCounter != 0 && waveCompleted == false)
		{
			if (npc1 == null && npc2 == null && npc3 == null && npc4 == null && npc5 == null && GameObject.Find(HUD.usrAccount) != null)
			{
				waveCompleted = true;
				sentReq = false;
			}
		}
		
		if (waveCompleted == true && sentReq == false && waveCounter != 0 && waveCounter != sevent_waves)
		{
			requestCompleteWave();
			sentReq = true;
		}
		
		else if (waveCompleted == true && sentReq == false && waveCounter != 0 && waveCounter == sevent_waves)
		{
			requestCompleteSE();
			sentReq = true;
		}
	}
}