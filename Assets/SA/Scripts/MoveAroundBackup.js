#pragma strict

var repairSound : Transform;

static var speed = 10.0;
var rotateSpeed = 2.0;
var rotateSpeedW = 4.0;
var usrAccount = "";
var usrPvp = 0;
var MovedTrigger = false;
var MovedZTrigger = false;
var MovedTriggerX = 0.00000001;
var MovedTriggerY = 0.00000001;
var MovedTriggerZ = 0.00000001;
//var MovedTriggerQ = GameObject.Find("PlayerShip").transform.rotation;
var MovedTriggerQ:Quaternion;
var BlasterPrefab:Transform;
static var objSelected = false;

static var curSpeed = 0.0000;
static var hit:RaycastHit;
static var SelectedTarget : String;

static var zMoving = "";
static var qMoving = "";
var sentFlag = false;
var sentFlag2 = false;

var mouseRotate = false;
static var tCalc : float;
static var forward : Vector3;
var tFloat : float;

var zCounter : float;
var qCounter : float;

function Start ()
{
	usrAccount = PlayerPrefs.GetString("PlayerName");
}

function Update ()
{
	if (HUD.repair == true)
	{
		if (GameObject.Find("repair") == null)
		{
			var rs = Instantiate(repairSound,transform.position,Quaternion.identity);
			rs.name = "repair";
		}
	}
	
	else if (HUD.repair == false)
		Destroy(GameObject.Find("repair"));
		
	//Debug.Log(audio.isPlaying);
	
	var controller : CharacterController = GetComponent(CharacterController);
	
	// Rotate around y - axis and Rolling Routines
	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, Input.GetAxis("Roll") * rotateSpeed);
	if(Input.GetMouseButton(0))
	{
		//transform.Rotate(Input.GetAxis ("Mouse Y") * rotateSpeedW, Input.GetAxis ("Mouse X") * rotateSpeedW, 0);
		transform.Rotate(Input.GetAxis ("Mouse Y") * (0-rotateSpeedW), Input.GetAxis ("Mouse X") * rotateSpeedW, 0);
	}
	
	// Move forward / backward
	var forward = transform.TransformDirection(Vector3.forward);
	curSpeed = speed * Input.GetAxis ("Vertical");
	//controller.SimpleMove(forward * curSpeed);
	controller.Move((forward * curSpeed)*Time.deltaTime);
	
	// Moving Routines
	if (MovedTriggerX != GameObject.Find("PlayerShip").transform.position.x)
	{
		MovedTriggerX = GameObject.Find("PlayerShip").transform.position.x;
		MovedTrigger = true;
	}

	if (MovedTriggerY != GameObject.Find("PlayerShip").transform.position.y)
	{
		MovedTriggerY = GameObject.Find("PlayerShip").transform.position.y;
		MovedTrigger = true;
	}

	if (MovedTriggerZ != GameObject.Find("PlayerShip").transform.position.z)
	{
		MovedTriggerZ = GameObject.Find("PlayerShip").transform.position.z;
		MovedTrigger = true;
	}

	if (MovedTriggerQ != GameObject.Find("PlayerShip").transform.rotation)
	{
		MovedTriggerQ = GameObject.Find("PlayerShip").transform.rotation;
		MovedTrigger = true;
	}

	MovedTriggerX = GameObject.Find("PlayerShip").transform.position.x;
	MovedTriggerY = GameObject.Find("PlayerShip").transform.position.y;
	MovedTriggerZ = GameObject.Find("PlayerShip").transform.position.z;
	MovedTriggerQ = GameObject.Find("PlayerShip").transform.rotation;

	if (MovedTrigger)
	{
		usrAccount = PlayerPrefs.GetString("PlayerName");
		Camera.mainCamera.networkView.RPC("MoveMeRequest",RPCMode.Server,usrAccount,HUD.usrActiveship,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
		MovedTrigger = false;
	}

	// Right Click Targetting System	
	if(Input.GetMouseButtonUp(1))
	{
		//MovedTriggerQ = GameObject.Find("PlayerShip").transform.rotation;
		
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
					
		//hit = RaycastHit;
		//this if checks, a detection of hit in an GameObject with the mouse on screen
		if(Physics.Raycast(ray, hit))
		{
			objSelected = true;
			if (hit.transform.name == "Terrain")
			{
				objSelected = false;
				SelectedTarget = null;
			}
			
			else if (hit.transform.name == "PlayerShip")
			{
				objSelected = false;
				SelectedTarget = null;
			}

			if (GameObject.Find(hit.transform.name).tag != "op")
				if (GameObject.Find(hit.transform.name).tag != "npc")
					if (GameObject.Find(hit.transform.name).tag != "bloodstone")
						if (GameObject.Find(hit.transform.name).tag != "questgiver")
							if (GameObject.Find(hit.transform.name).tag != "drone")
							{
								SelectedTarget = null;
								objSelected = false;
							}

			//GameObject.Find("Nameofyourobject") search your gameobject on the hierarchy with the desired name and allows you to use it
			//Destroy(GameObject.Find(hit.transform.name));
			//Debug.Log(hit.transform.name);
			SelectedTarget = hit.transform.name;

		}
		
		if (GameObject.Find(SelectedTarget).tag == "bloodstone")
		{
			if (Vector3.Distance(GameObject.Find("PlayerShip").transform.position,GameObject.Find(SelectedTarget).transform.position) <= 15)
			{
				var bbScript : BloodstoneScript = GameObject.Find(SelectedTarget).GetComponent("BloodstoneScript");
				Camera.main.networkView.RPC("CollectBloodstone",RPCMode.Server,HUD.usrAccount,SelectedTarget,bbScript.amount);
			}
			//var bbScript : BloodstoneScript = GameObject.Find(SelectedTarget).GetComponent("BloodstoneScript");
			//HUD.usrBloodstone += bbScript.amount;
			//Destroy(GameObject.Find(SelectedTarget));
			//networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax,usrBloodstone);
		}
	}

	// Tech Buttons
	if (Input.GetButton("1"))
	{
		if (HUD.tBlasterTrigger == false)
		{
			if (HUD.usrEnergy >= float.Parse(HUD.usrBlasterPower.ToString()))
			{
				HUD.tBlasterTrigger = true;
				HUD.tBlasterWaitTime = Time.fixedTime;
				Camera.main.networkView.RPC("ShootRequest",RPCMode.Server,usrAccount,HUD.usrBlasterPower,HUD.usrPvp);
			}
		}
	}
	
	// Reset target if it doesnt exist anymore
	if (GameObject.Find(SelectedTarget) == null)
		SelectedTarget = null;
		
	// Update Target info
	if (objSelected == true)
	{
		if (SelectedTarget != null)
		{
			if (GameObject.Find(SelectedTarget).tag == "npc")
			{
				var count : int = -1;
				
				for (var i = 0; i < NPCControl.npcname.Length; i++)
				{
					count++;
					if (NPCControl.npcname[count] == SelectedTarget)
						break;
				}
		
				HUD.sName = SelectedTarget.Substring(0,SelectedTarget.Length-5);
				HUD.sHealth = NPCControl.npchealth[count];
				HUD.sHealthMax = NPCControl.npchealthmax[count];
				HUD.sHealthPercent = NPCControl.npchealth[count] / NPCControl.npchealthmax[count];
				HUD.sRank = NPCControl.npcrank[count];
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "op")
			{
				var bb : GameObject = GameObject.Find(SelectedTarget);
				var bbScript1 : OtherPlayersPrefab = bb.GetComponent("OtherPlayersPrefab");

				HUD.sName = SelectedTarget;
				HUD.sHealth = bbScript1.health;
				HUD.sHealthMax = bbScript1.healthmax;
				HUD.sHealthPercent = HUD.sHealth / HUD.sHealthMax;
				HUD.sRank = bbScript1.rank;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "bloodstone")
			{
				HUD.sName = "Bloodstone";
				HUD.sHealth = 0;
				HUD.sHealthMax = 0;
				HUD.sHealthPercent = 0;
				HUD.sRank = 0;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "questgiver")
			{
				HUD.sName = GameObject.Find(SelectedTarget).name;
				HUD.sHealth = 10000;
				HUD.sHealthMax = 10000;
				HUD.sHealthPercent = 1;
				HUD.sRank = 99;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "drone")
			{
				HUD.sName = GameObject.Find(SelectedTarget).name;
				HUD.sHealth = 10000;
				HUD.sHealthMax = 10000;
				HUD.sHealthPercent = 1;
				HUD.sRank = 99;
			}
			
			else
			{
				HUD.sName = "";
				HUD.sHealth = 0;
				HUD.sHealthMax = 0;
				HUD.sHealthPercent = 0;
				HUD.sRank = 0;

				SelectedTarget = null;
				objSelected = false;
			}
		}
	}
}

@script RequireComponent(CharacterController)