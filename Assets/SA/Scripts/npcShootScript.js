#pragma strict

var usrAccount = "";
var BlasterPrefab:Transform;

static var TriggerRemoteBlasters = false;
static var timeBetweenBlasterShots = 0.075;
var timeBlaster = 0.0000;
static var blast1 = false;
var blast2 = false;
var blast3 = false;
var blast4 = false;
var blast5 = false;
static var remoteName = "";
static var remotePower : float = 0;
static var remotePvp = 0;

function Start()
{
	usrAccount = PlayerPrefs.GetString("PlayerName");
}

function Update()
{
	RemoteShoot(remoteName);
	//remoteName = "";
}

function RemoteShoot(Name : String)
{
	if (Name == gameObject.name)
	{
		if (TriggerRemoteBlasters)
		{	
			var Blaster7 = Instantiate(BlasterPrefab,
										transform.Find("BlasterSpawnOP").transform.position,
										GameObject.Find(Name).transform.rotation);

			Blaster7.name = "b_" + Name;
			var bbScript2 : npcBlasterScript = Blaster7.GetComponent("npcBlasterScript");
			bbScript2.power = remotePower;

			Blaster7.rigidbody.AddForce(transform.forward * 2000);
			TriggerRemoteBlasters = false;
		}
	}
}


