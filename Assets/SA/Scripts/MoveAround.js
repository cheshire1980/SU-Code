#pragma strict
var deadzone : float = 0.10;
private var calib : float;

var ljoy : Joystick;
var rjoy : Joystick;
var fjoy : Joystick;
var sjoy : Joystick;

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

static var forwardbackward : float;
static var leftright : float;
static var rolling : float;
static var rollingfwdbk : float;
static var mtimeNow : float;
static var x : float;
static var y : float;
static var z : float;
static var q : Quaternion;

static var verticalStatus : float;
static var horizontalStatus : float;
static var rollStatus : float;
static var pitchStatus : float;

static var verticalStatusCur : float;
static var horizontalStatusCur : float;
static var rollStatusCur : float;
static var pitchStatusCur : float;

static var vsc : float;
static var mtime : float;

var trigAB : boolean;
var mouseRelease : boolean;

var dragwindow : boolean;
	private var l : GUILayer;
	
var accel : Vector3;
var filter : float = 5.0;

static var forwardbackwardnew : float;

function Start ()
{
	usrAccount = PlayerPrefs.GetString("PlayerName");
	pView = gameObject.GetComponent(PhotonView);
	//calib = Input.acceleration.z;
}

var pView : PhotonView = gameObject.GetComponent(PhotonView);

/*
function OnGUI ()
{
	GUI.skin = GameObject.Find("Main Camera").GetComponent(HUD).HUD;
	
	var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
	var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

	if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
	{
		var uhp = HUD.usrHealth / HUD.usrHealthMax;
		var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
		var tehud = GameObject.Find("Main Camera").GetComponent(HUD).mEnergy;

		GUI.Box(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+55,70,5),"");
		GUI.DrawTexture(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+55,70 * Mathf.Clamp01(uhp),5), thud);
		
		GUI.Box(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+65,70,5),"");
		GUI.DrawTexture(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+65,70 * Mathf.Clamp01(HUD.usrEnergyPercent),5), tehud);

		if (HUD.usrPvp == 1)
		{
			GUI.color = Color.red;
		}
		
		if (HUD.usrPvp == 0)
		{
			if (HUD.usrGM == 1)
			{
				GUI.color = Color.green;
			}
			
			if (HUD.usrGM == 2)
			{
				//GUI.skin = GameObject.Find("Main Camera").GetComponent(OtherPlayersPrefab).HUDDEV;
				GUI.color = Color.yellow;
			}
		}
		
		GUI.Label(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+65,100,100), HUD.usrAccount);
		GUI.Label(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)+75,100,100), "Rank: " + HUD.usrRank.ToString());
		
		//var huddie : HUDText;
		//gameObject.GetComponent(HUDText).Add(gameObject.name,Color.red,1f);
		//Debug.Log(gm);
	}
}*/

function FixedUpdate()
{
	if (pView.isMine)
	{
	//Input.compensateSensors = true;
	//accel = Vector3.Lerp(accel, Input.acceleration, filter * Time.deltaTime);
	//accel = Input.acceleration;
	
	// Moving Routines
	mtime = Time.deltaTime;
	
	var fjoytemp = 0;//fjoy.position.x;
	var sjoytemp = 0;//sjoy.position.x;
	
	var fsjoytemp : float;
	
	if (fjoytemp != 0)
		fsjoytemp = 1;
	else if (sjoytemp != 0)
		fsjoytemp = -1;
	else
		fsjoytemp = 0;
			
	//--------------------------------------------

	if (Application.platform == RuntimePlatform.Android)
	{	
		var ljoytemp = ljoy.position.x;
		var rjoytemp = ljoy.position.y; //rjoy.position.x;
		
		var joytemp : float;
		
		if (ljoytemp != 0)
			joytemp = -1;
		else if (rjoytemp != 0)
			joytemp = 1;
		else
			joytemp = 0;
	}

	//rollStatusCur = joytemp;
	
	//if (Application.platform == RuntimePlatform.Android)
	//{
		var relpos;
		
	if (Application.platform == RuntimePlatform.Android)
	{
		if (ljoy.position.x != 0 && ljoy.position.y != 0)
		{
			relpos = Vector3(0,0,0) - Vector3(ljoy.position.x, 0, ljoy.position.y);
			GameObject.Find(HUD.usrAccount).transform.rotation = Quaternion.LookRotation(relpos);
			
			//forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 10, Time.deltaTime * 1.25);
			if (HUD.afterburner == false)
			{
				//if (forwardbackwardnew > 10)
				//	forwardbackwardnew = 10;
					
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 10, Time.deltaTime * 1.25);
				//forwardbackwardnew = 10;
			}
			else if (HUD.afterburner == true)
			{
				//if (forwardbackwardnew > 30)
				//	forwardbackwardnew = 30;
					
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 30, Time.deltaTime * 2.00);
			}
		}

		else if (ljoy.position.x == 0 && ljoy.position.y == 0)
		{
			//forwardbackwardnew = forwardbackwardnew - 0.005;
			if (HUD.afterburner == true)
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 0, Time.deltaTime * 2.0);
			
			else if (HUD.afterburner == false)
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 0, Time.deltaTime * 1.25);
				
			if (forwardbackwardnew < 0)
				forwardbackwardnew = 0;
		}
	}
	
	else //if (Application.isWebPlayer)
	{
		var vMovement = Input.GetAxis("Vertical");
		var hMovement = Input.GetAxis("Horizontal");
		
		if (vMovement != 0 || hMovement != 0)
		{
			relpos = Vector3(0,0,0) - Vector3(hMovement, 0, vMovement);
			GameObject.Find(HUD.usrAccount).transform.rotation = Quaternion.LookRotation(relpos);
			
			//forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 10, Time.deltaTime * 1.25);
			if (HUD.afterburner == false)
			{
				//if (forwardbackwardnew > 10)
				//	forwardbackwardnew = 10;
					
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 10, Time.deltaTime * 1.25);
				//forwardbackwardnew = 10;
			}
			else if (HUD.afterburner == true)
			{
				//if (forwardbackwardnew > 30)
				//	forwardbackwardnew = 30;
					
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 30, Time.deltaTime * 2.00);
			}
		}

		else if (vMovement == 0 || hMovement == 0)
		{
			//forwardbackwardnew = forwardbackwardnew - 0.005;
			if (HUD.afterburner == true)
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 0, Time.deltaTime * 2.0);
			
			else if (HUD.afterburner == false)
				forwardbackwardnew = Mathf.Lerp(forwardbackwardnew, 0, Time.deltaTime * 1.25);
				
			if (forwardbackwardnew < 0)
				forwardbackwardnew = 0;
		}
	}

	//}

	var controller : CharacterController = GetComponent(CharacterController);	
	var forward = transform.TransformDirection(Vector3.forward);
	controller.Move((forward * forwardbackwardnew)*Time.deltaTime);
	
	//Debug.Log(ljoy.position.x + " " + ljoy.position.y + " " + forwardbackwardnew);

		//Debug.Log(forwardbackwardnew);
	/*verticalStatusCur = Input.GetAxis("Vertical") ?
							Input.GetAxis("Vertical") : fsjoytemp;
	
	horizontalStatusCur = Input.GetAxis("Horizontal") ?
							Input.GetAxis("Horizontal") : joytemp;
							//Input.GetAxis("Horizontal") : accel.x;*/
	}
	
	/*if (horizontalStatusCur != horizontalStatus)
	{
		horizontalStatusCur = horizontalStatus;
		verticalStatusCur = 11;
	}
	
	//original pitch with motion on phone
	//pitchStatusCur = accel.z;
	
	// Calibrate pitch
	pitchStatusCur = pitchStatusCur - calib;
	
	// Add Dead Zone to horiz & pitch
	if (horizontalStatusCur > 0)
	{
		if (horizontalStatusCur < deadzone)
			horizontalStatusCur = 0;
	}
	else if (horizontalStatusCur < 0)
	{
		if (horizontalStatusCur > -deadzone)
			horizontalStatusCur = 0;
	}
	if (pitchStatusCur > 0)
	{
		if (pitchStatusCur < deadzone)
			pitchStatusCur = 0;
	}
	else if (pitchStatusCur < 0)
	{
		if (pitchStatusCur > -deadzone)
			pitchStatusCur = 0;
	}
	// End of Dead Zone code
	
	if (pitchStatusCur > 0)
		pitchStatusCur = 0 - pitchStatusCur;
	else if (pitchStatusCur < 0)
		pitchStatusCur = pitchStatusCur - pitchStatusCur - pitchStatusCur;

	if (Application.platform == RuntimePlatform.Android)
	{
		if (rollStatusCur > 0)
			rollStatusCur = 0 - rollStatusCur;
		else if (rollStatusCur < 0)
			rollStatusCur = rollStatusCur - rollStatusCur - rollStatusCur;
	}
	
	if (pitchStatusCur != pitchStatus)
	{
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																mtime,
																verticalStatusCur,
																HUD.afterburner,
																horizontalStatusCur,
																rollStatusCur,
																pitchStatusCur,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
	}
	
	
	if (trigAB != HUD.afterburner)
	{
		trigAB = HUD.afterburner;
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																mtime,
																verticalStatusCur,
																HUD.afterburner,
																horizontalStatusCur,
																rollStatusCur,
																0.00,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
	}
	
	if (verticalStatusCur != verticalStatus)
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																mtime,
																verticalStatusCur,
																HUD.afterburner,
																horizontalStatusCur,
																rollStatusCur,
																0.00,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);

	if (horizontalStatusCur != horizontalStatus)
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																mtime,
																verticalStatusCur,
																HUD.afterburner,
																horizontalStatusCur,
																rollStatusCur,
																0.00,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);

	if (rollStatusCur != rollStatus)
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																mtime,
																verticalStatusCur,
																HUD.afterburner,
																horizontalStatusCur,
																rollStatusCur,
																0.00,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);

	
	verticalStatus = verticalStatusCur;
	horizontalStatus = horizontalStatusCur;
	rollStatus = rollStatusCur;
	pitchStatus = pitchStatusCur;
	
	vsc = verticalStatus;
	
	// Forward & Backward Direction
	var controller : CharacterController = GetComponent(CharacterController);	
	var forward = transform.TransformDirection(Vector3.forward);
	controller.Move((forward * forwardbackward)*mtimeNow);
	
	// Left - Right & Rolling Direction
	if (Application.platform != RuntimePlatform.Android)
		transform.Rotate(rollingfwdbk, leftright, rolling);
	else if (Application.platform == RuntimePlatform.Android)
		transform.Rotate(pitchStatusCur*10.0f, horizontalStatusCur*10.0f, rolling);*/
	
	// Error Correction
	//if (rollingfwdbk == 0.00)
		//if (leftright == 0.00)
			//if (rolling == 0.00)
				/*if (forwardbackward == 0.00)
				{
					if (transform.position.x != x)
					{
						if (transform.position.y != y)
						{
							if (transform.position.z != z)
							{
								transform.position.x = x;
								transform.position.y = y;
								transform.position.z = z;
								transform.rotation = q;
							}
						}
					}
				}*/
				
//	if (Vector3.Distance(transform.position,Vector3(x,y,z)) > 5)
//		transform.position = Vector3(x,y,z);
//}

//function Update ()
//{
	// Mouse Routines
	/*if (Application.platform != RuntimePlatform.Android)
	{
		if (Application.platform != RuntimePlatform.IPhonePlayer)
		{
			if (Input.GetMouseButton(0))
			{
				mouseRelease = true;
				
				if (Input.GetAxis("Mouse X") != leftright)
				{
					Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																			mtime,
																			verticalStatusCur,
																			HUD.afterburner,
																			Input.GetAxis("Mouse X") * rotateSpeedW,
																			rollStatusCur,
																			Input.GetAxis("Mouse Y") * (0-rotateSpeedW),
																			GameObject.Find("PlayerShip").transform.position.x,
																			GameObject.Find("PlayerShip").transform.position.y,
																			GameObject.Find("PlayerShip").transform.position.z,
																			GameObject.Find("PlayerShip").transform.rotation,
																			HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
				}
				
				else if (Input.GetAxis("Mouse Y") != rollingfwdbk)
				{
					Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																			mtime,
																			verticalStatusCur,
																			HUD.afterburner,
																			Input.GetAxis("Mouse X") * rotateSpeedW,
																			rollStatusCur,
																			Input.GetAxis("Mouse Y") * (0-rotateSpeedW),
																			GameObject.Find("PlayerShip").transform.position.x,
																			GameObject.Find("PlayerShip").transform.position.y,
																			GameObject.Find("PlayerShip").transform.position.z,
																			GameObject.Find("PlayerShip").transform.rotation,
																			HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
				}
			}
		}
	}
	
	if (Input.GetMouseButton(0) == false)
	{
		if (mouseRelease == true)
		{
			mouseRelease = false;
			
			Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																	mtime,
																	verticalStatusCur,
																	HUD.afterburner,
																	horizontalStatusCur,
																	rollStatusCur,
																	0.00,
																	GameObject.Find("PlayerShip").transform.position.x,
																	GameObject.Find("PlayerShip").transform.position.y,
																	GameObject.Find("PlayerShip").transform.position.z,
																	GameObject.Find("PlayerShip").transform.rotation,
																	HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);
		}
	}*/
	// End of Mouse Routines
	
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

	// Right Click Targetting System
	if (Application.platform != RuntimePlatform.Android)
	{	
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
					SelectedTarget = "";
				}
				
				else if (hit.transform.name == "PlayerShip")
				{
					objSelected = false;
					SelectedTarget = "";
				}
	
				if (GameObject.Find(hit.transform.name).tag != "op")
					if (GameObject.Find(hit.transform.name).tag != "npc")
						if (GameObject.Find(hit.transform.name).tag != "bloodstone")
							if (GameObject.Find(hit.transform.name).tag != "questgiver")
								if (GameObject.Find(hit.transform.name).tag != "drone")
									if (GameObject.Find(hit.transform.name).tag != "module")
									{
										SelectedTarget = "";
										objSelected = false;
									}
	
				//GameObject.Find("Nameofyourobject") search your gameobject on the hierarchy with the desired name and allows you to use it
				//Destroy(GameObject.Find(hit.transform.name));
				//Debug.Log(hit.transform.name);
					SelectedTarget = hit.transform.name;
	
			}
			
			if (GameObject.Find(MoveAround.SelectedTarget) != null)
			{
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
				
				if (GameObject.Find(SelectedTarget).tag == "module")
				{
					var bbScript11 : ModulesScript = GameObject.Find(SelectedTarget).GetComponent("ModulesScript");
					bbScript11.dragName = HUD.usrAccount;
				}
			}
		}
	}
	
	else if (Application.platform == RuntimePlatform.Android)
	{
		var oldSelectedTarget = SelectedTarget;
		var oldobjSelected = objSelected;
		

		for (var ii = 0; ii < Input.touchCount; ++ii)
		{
			if (Input.GetTouch(ii).phase == TouchPhase.Began)
			{
				var ray1 = Camera.main.ScreenPointToRay(Input.GetTouch(ii).position);
				
				if(Physics.Raycast(ray1, hit, 10000))
				{
					//objSelected = true;
					if (hit.transform.name == "Terrain")
					{
						objSelected = false;
						SelectedTarget = "";
					}
					
					else if (hit.transform.name == "PlayerShip")
					{
						objSelected = false;
						SelectedTarget = "";
					}
		
					if (GameObject.Find(hit.transform.name).tag == "op")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}
					
					if (GameObject.Find(hit.transform.name).tag == "npc")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}

					if (GameObject.Find(hit.transform.name).tag == "bloodstone")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}

					if (GameObject.Find(hit.transform.name).tag == "questgiver")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}

					if (GameObject.Find(hit.transform.name).tag == "drone")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}

					if (GameObject.Find(hit.transform.name).tag == "module")
					{
						objSelected = true;
						SelectedTarget = hit.transform.name;
					}

					//else
					//{
					//	objSelected = true;
					//	SelectedTarget = hit.transform.name;
					//}

					//GameObject.Find("Nameofyourobject") search your gameobject on the hierarchy with the desired name and allows you to use it
					//Destroy(GameObject.Find(hit.transform.name));
					//Debug.Log(hit.transform.name);
		
				}
				
				if (GameObject.Find(MoveAround.SelectedTarget) != null)
				{
					if (GameObject.Find(SelectedTarget).tag == "bloodstone")
					{
						if (Vector3.Distance(GameObject.Find("PlayerShip").transform.position,GameObject.Find(SelectedTarget).transform.position) <= 15)
						{
							var bbScript111 : BloodstoneScript = GameObject.Find(SelectedTarget).GetComponent("BloodstoneScript");
							Camera.main.networkView.RPC("CollectBloodstone",RPCMode.Server,HUD.usrAccount,SelectedTarget,bbScript111.amount);
						}
						//var bbScript : BloodstoneScript = GameObject.Find(SelectedTarget).GetComponent("BloodstoneScript");
						//HUD.usrBloodstone += bbScript.amount;
						//Destroy(GameObject.Find(SelectedTarget));
						//networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax,usrBloodstone);
					}
					if (GameObject.Find(SelectedTarget).tag == "module")
					{
						var bbScript2 : ModulesScript = GameObject.Find(SelectedTarget).GetComponent("ModulesScript");
						bbScript2.dragName = HUD.usrAccount;
					}
				}
			}
		}
	}
	
	// Reset target if it doesnt exist anymore
	if (GameObject.Find(SelectedTarget) == null)
	{
		SelectedTarget = "";
		objSelected = false;
	}
			
	// Update Target info
	if (objSelected == true)
	{
		if (SelectedTarget != "")
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
		
				HUD.sAvatar = null;
				HUD.sName = SelectedTarget.Substring(0,SelectedTarget.Length-5);
				HUD.sHealth = NPCControl.npchealth[count];
				HUD.sHealthMax = NPCControl.npchealthmax[count];
				HUD.sHealthPercent = NPCControl.npchealth[count] / NPCControl.npchealthmax[count];
				HUD.sRank = NPCControl.npcrank[count];
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "op")
			{
				var bb : GameObject = GameObject.Find(SelectedTarget);
				var bbScript1 : PlayerMovement = bb.GetComponent("PlayerMovement");

				HUD.sAvatar = bbScript1.avatar;
				HUD.sName = SelectedTarget;
				HUD.sHealth = bbScript1.health;
				HUD.sHealthMax = bbScript1.healthmax;
				HUD.sHealthPercent = HUD.sHealth / HUD.sHealthMax;
				HUD.sRank = bbScript1.rank;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "bloodstone")
			{
				HUD.sAvatar = null;
				HUD.sName = "Bloodstone";
				HUD.sHealth = 0;
				HUD.sHealthMax = 0;
				HUD.sHealthPercent = 0;
				HUD.sRank = 0;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "questgiver")
			{
				HUD.sAvatar = null;
				HUD.sName = GameObject.Find(SelectedTarget).name;
				HUD.sHealth = 10000;
				HUD.sHealthMax = 10000;
				HUD.sHealthPercent = 1;
				HUD.sRank = 99;
			}
			
			else if (GameObject.Find(SelectedTarget).tag == "drone")
			{
				HUD.sAvatar = null;
				HUD.sName = GameObject.Find(SelectedTarget).name;
				HUD.sHealth = 10000;
				HUD.sHealthMax = 10000;
				HUD.sHealthPercent = 1;
				HUD.sRank = 99;
			}
			
			else
			{
				HUD.sAvatar = null;
				HUD.sName = "";
				HUD.sHealth = 0;
				HUD.sHealthMax = 0;
				HUD.sHealthPercent = 0;
				HUD.sRank = 0;

				SelectedTarget = "";
				objSelected = false;
			}
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
				Camera.main.networkView.RPC("ShootRequest",RPCMode.Server,usrAccount,HUD.usrBlasterPower,HUD.usrPvp,SelectedTarget);
			}
		}
	}
}

function joyStickInput (joystick : Joystick) {
    var absJoyPos = Vector2 (Mathf.Abs(joystick.position.x),
                                   Mathf.Abs(joystick.position.y));
    var xDirection = (joystick.position.x > 0) ? 1 : -1;
    var yDirection = (joystick.position.y > 0) ? 1 : -1;
    return ( ( absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}

@script RequireComponent(CharacterController)