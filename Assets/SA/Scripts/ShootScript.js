#pragma strict

var explosion : Transform;
var blasterhit : AudioClip;
var sparks : Transform;

var usrAccount = "";
var BlasterPrefab:Transform;

static var TriggerRemoteBlasters = false;
static var timeBetweenBlasterShots = 0.125;//075;
var timeBlaster = 0.0000;
static var blast1 = false;
var blast2 = false;
var blast3 = false;
var blast4 = false;
var blast5 = false;
static var remoteName = "";
static var remotePower : float = 0;
static var remotePvp = 0;
static var remoteTarget = "";

var pView : PhotonView;

function Start()
{
	pView = Camera.main.GetComponent(PhotonView);
	usrAccount = PlayerPrefs.GetString("PlayerName");
}

function OnGUI()
{
	var Name = Camera.main.GetComponent(HUD).triggerName;

	if (pView.isMine == false)
	{
		if (Name == gameObject.GetComponent(PlayerMovement).playerName)
		{
			remotePower = Camera.main.GetComponent(HUD).triggerPower;
			remotePvp = Camera.main.GetComponent(HUD).triggerPvp;
			remoteTarget = Camera.main.GetComponent(HUD).triggerTarget;
			
			if (TriggerRemoteBlasters)
			{
				if (GameObject.Find(remoteTarget) == null && remoteTarget != HUD.usrAccount)
				{
					remoteTarget = "";
				}
					
				if (blast1 == true)
				{
					//var trans : GameObject = GameObject.Find(Name);
					//var transs : GameObject = trans.Find("BlasterSpawn");
					//var trans = GameObject.Find("/" + Name + "/BlasterSpawn").transform.position;
					//var transs = GameObject.Find("/" + Name + "/BlasterSpawn").transform.rotation;
					//var transs = trans.Find("BlasterSpawn");
					
					
					//var Blaster6 = Instantiate(BlasterPrefab,
					//								transform.Find("BlasterSpawn").transform.position,
					//								transform.Find("BlasterSpawn").transform.rotation);
					
					
					var Blaster6 = Instantiate(BlasterPrefab,
													transform.Find("BlasterSpawn").transform.position,
													transform.Find("BlasterSpawn").transform.rotation);
	 
					Blaster6.name = "b_" + remoteName + "1";
					Blaster6.tag = "blaster";
					var bbScript : BlasterScript = Blaster6.GetComponent("BlasterScript");
					bbScript.power = remotePower;
					bbScript.pvp = remotePvp;

					if (remoteTarget != "")
					{
						if (remoteTarget != HUD.usrAccount)
							Blaster6.transform.LookAt(GameObject.Find(remoteTarget).transform);
						else
							Blaster6.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
					}
					
					Blaster6.rigidbody.AddForce(Blaster6.transform.forward * 2000);
					blast1 = false;
					blast2 = true;
					timeBlaster = Time.fixedTime;
				}
		
				if (blast2 == true)
				{
					if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
					{
						var Blaster7 = Instantiate(BlasterPrefab,
													transform.Find("BlasterSpawn").transform.position,
													transform.Find("BlasterSpawn").transform.rotation);

						Blaster7.name = "b_" + Name + "2";
						Blaster7.tag = "blaster";
						var bbScript2 : BlasterScript = Blaster7.GetComponent("BlasterScript");
						bbScript2.power = remotePower;
						bbScript2.pvp = remotePvp;

						if (remoteTarget != "")
						{
							if (remoteTarget != HUD.usrAccount)
								Blaster7.transform.LookAt(GameObject.Find(remoteTarget).transform);
							else
								Blaster7.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
						}
					
						Blaster7.rigidbody.AddForce(Blaster7.transform.forward * 2000);
						blast2 = false;
						blast3 = true;
						timeBlaster = Time.fixedTime;
					}
				}
		
				if (blast3 == true)
				{
					if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
					{
						var Blaster8 = Instantiate(BlasterPrefab,
													transform.Find("BlasterSpawn").transform.position,
													transform.Find("BlasterSpawn").transform.rotation);

						Blaster8.name = "b_" + Name + "3";
						Blaster8.tag = "blaster";
						var bbScript3 : BlasterScript = Blaster8.GetComponent("BlasterScript");
						bbScript3.power = remotePower;
						bbScript3.pvp = remotePvp;

						if (remoteTarget != "")
						{
							if (remoteTarget != HUD.usrAccount)
								Blaster8.transform.LookAt(GameObject.Find(remoteTarget).transform);
							else
								Blaster8.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
						}
						
						Blaster8.rigidbody.AddForce(Blaster8.transform.forward * 2000);
						blast3 = false;
						blast4 = true;
						timeBlaster = Time.fixedTime;
					}
				}
		
				if (blast4 == true)
				{
					if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
					{
						var Blaster9 = Instantiate(BlasterPrefab,
													transform.Find("BlasterSpawn").transform.position,
													transform.Find("BlasterSpawn").transform.rotation);

						Blaster9.name = "b_" + Name + "4";
						Blaster9.tag = "blaster";
						var bbScript4 : BlasterScript = Blaster9.GetComponent("BlasterScript");
						bbScript4.power = remotePower;
						bbScript4.pvp = remotePvp;

						if (remoteTarget != "")
						{
							if (remoteTarget != HUD.usrAccount)
								Blaster9.transform.LookAt(GameObject.Find(remoteTarget).transform);
							else
								Blaster9.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
						}
						
						Blaster9.rigidbody.AddForce(Blaster9.transform.forward * 2000);
						blast4 = false;
						blast5 = true;
						timeBlaster = Time.fixedTime;
					}
				}
		
				if (blast5 == true)
				{
					if (Time.fixedTime - timeBlaster > timeBetweenBlasterShots)
					{
						var Blaster10 = Instantiate(BlasterPrefab,
													transform.Find("BlasterSpawn").transform.position,
													transform.Find("BlasterSpawn").transform.rotation);

						Blaster10.name = "b_" + Name + "5";
						Blaster10.tag = "blaster";
						var bbScript5 : BlasterScript = Blaster10.GetComponent("BlasterScript");
						bbScript5.power = remotePower;
						bbScript5.pvp = remotePvp;

						if (remoteTarget != "")
						{
							if (remoteTarget != HUD.usrAccount)
								Blaster10.transform.LookAt(GameObject.Find(remoteTarget).transform);
							else
								Blaster10.transform.LookAt(GameObject.Find(HUD.usrAccount).transform);
						}
						
						Blaster10.rigidbody.AddForce(Blaster10.transform.forward * 2000);
						blast5 = false;
						TriggerRemoteBlasters = false;
						timeBlaster = Time.fixedTime;
					}
				}
			}
		}
	}
}

function RemoteShoot(Name : String)
{
}


function OnTriggerEnter(blaster:Collider)
{
	var bbScript : BlasterScript = blaster.GetComponent("BlasterScript");

	/*if (blaster.tag == "myblaster")
	{
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);

		var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);		
		Destroy(GameObject.Find(blaster.name));
	}*/

	if (blaster.tag == "npcblaster")
	{
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);

		var spark1 = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);		
		Destroy(GameObject.Find(blaster.name));
	}
}