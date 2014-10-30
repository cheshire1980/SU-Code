#pragma strict

var target : Transform;
var oldtarget : Transform;

var blaster : Transform;
var blasterPower : float;

var missionSentryTemplate : Transform;
var missionRocketTemplate : Transform;
var npcSentry : Transform;
var npcRocket : Transform;
var npcRupture : boolean;
var npcSentinel : boolean;

var spreadTrigger : boolean;
var spreadPosition : Vector3;

var bulletTime : float;
var bulletWait : float;
var rocketTime : float;
var rocketWait : float;
var sentryTime : float;
var sentryWait : float;

var npcHealth : float = 50;
var npcHealthMax : float = 50;
var npcRank : int = 15;

var explosion : Transform;
var blasterhit : AudioClip;
var sparks : Transform;


function Start ()
{
	bulletTime = Time.fixedTime;
	bulletWait = Random.Range(1,5);
	rocketTime = Time.fixedTime;
	rocketWait = Random.Range(3,10);
	sentryTime = Time.fixedTime;
	sentryWait = Random.Range(3,10);
	
	if (gameObject.name == "Rupture")
		npcRupture = true;
	else if (gameObject.name == "Sentinel")
		npcSentinel = true;
		
	gameObject.name = gameObject.name + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9);
	
	if (blasterPower == 0) { blasterPower = 1; }
}

function npcBrain ()
{
	lookatTarget();
	movetoTarget();
	shootatTarget();
}

function movetoTarget ()
{
	gameObject.transform.position.y = 0;
	
	if (Vector3.Distance(gameObject.transform.position, target.position) > 15)
	{
		gameObject.transform.position = Vector3.Lerp(gameObject.transform.position, target.position, Time.deltaTime * 0.25);
		spreadTrigger = false;
	}
	
	else
	{
		if (spreadTrigger == false)
		{
			spreadTrigger = true;
			spreadPosition.x = Random.Range(target.position.x - 14, target.position.x + 14);
			spreadPosition.z = Random.Range(target.position.z - 14, target.position.z + 14);
			spreadPosition.y = 0;
		}
		
		else if (spreadTrigger == true)
		{
			gameObject.transform.position = Vector3.Lerp(gameObject.transform.position, spreadPosition, Time.deltaTime * 0.25);
			
			if (Vector3.Distance(spreadPosition, target.position) < 13)
			{
				spreadPosition.x = Random.Range(target.position.x - 14, target.position.x + 14);
				spreadPosition.z = Random.Range(target.position.z - 14, target.position.z + 14);
				spreadPosition.y = 0;
			}
		}
	}
}

function lookatTarget ()
{
	gameObject.transform.LookAt(target);
}

function shootatTarget ()
{
	//yield WaitForSeconds (Random.Range(2, 5));
	if (Time.fixedTime - bulletTime >= bulletWait)
	{
		if (Vector3.Distance(gameObject.transform.position, target.position) < 15)
		{
			bulletTime = Time.fixedTime;
			bulletWait = Random.Range(1,5);
			
			var blasterShot = Instantiate(blaster, GameObject.Find(gameObject.name + "/blasterSpawn").transform.position, Quaternion.identity);
			blasterShot.transform.LookAt(target);
			blasterShot.GetComponent(npcBlasterScript).power = blasterPower;
			
			blasterShot.rigidbody.AddForce(blasterShot.transform.forward * 2000);
		}
	}
	
	if (npcRupture == true)
	{
		if (Time.fixedTime - rocketTime >= rocketWait)
		{
			if (Vector3.Distance(gameObject.transform.position, target.position) < 15)
			{
				rocketTime = Time.fixedTime;
				rocketWait = Random.Range(3,10);
				
				var rocketShot = Instantiate(missionRocketTemplate, GameObject.Find(gameObject.name + "/blasterSpawn").transform.position, Quaternion.identity);
				rocketShot.transform.LookAt(target);
				rocketShot.GetComponent(rocketAI).power = blasterPower;
			}
		}
	}
	
	if (npcSentinel == true)
	{
		if (Time.fixedTime - sentryTime >= sentryWait)
		{
			if (Vector3.Distance(gameObject.transform.position, target.position) < 15)
			{
				sentryTime = Time.fixedTime;
				sentryWait = Random.Range(3,10);
				
				var sentryShot = Instantiate(missionSentryTemplate, GameObject.Find(gameObject.name + "/blasterSpawn").transform.position, Quaternion.identity);
				sentryShot.transform.LookAt(target);
				sentryShot.GetComponent(missionNpcSentryAI).power = blasterPower;
				sentryShot.GetComponent(missionNpcSentryAI).selfDestruct = true;
				//GameObject.Destroy(sentryShot.gameObject,60);
			}
		}
	}
}

function Update ()
{
	if (oldtarget != null)
	{
		target = oldtarget;
	}
	
	else if (target == null)
	{
		if (GameObject.Find("Montar") != null)
		{
			oldtarget = target;
			target = GameObject.Find("Montar").transform;
		}
			
		else if (GameObject.Find(HUD.usrAccount) != null)
		{
			oldtarget = target;
			target = GameObject.Find(HUD.usrAccount).transform;
		}
			
		else
			GameObject.Destroy(gameObject);
	}
	
	npcBrain();
}

function OnGUI ()
{
	if (MoveAround.SelectedTarget == gameObject.name && MoveAround.objSelected == true)
	{
		GUI.skin = GameObject.Find("Main Camera").GetComponent(HUD).HUD;
		
		var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
		var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

		if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
		{
			var shortName = gameObject.name.Substring(0,gameObject.name.Length-5);
			var uhp = npcHealth / npcHealthMax;
			var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
			GUI.Box(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70,5),"");
			GUI.DrawTexture(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70 * Mathf.Clamp01(uhp),5), thud);

			GUI.color = Color.red;
			GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,100,100), shortName);
			GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-65,100,100), "Rank: " + npcRank.ToString());
		}
	}
}

function OnTriggerEnter(newblaster:Collider)
{
	var bbScript : BlasterScript = newblaster.GetComponent("BlasterScript");
	
	if (newblaster.tag == "myblaster")
	{
		if (target != GameObject.Find(HUD.usrAccount).transform)
			target = GameObject.Find(HUD.usrAccount).transform;
			
		var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		
		npcHealth = npcHealth - HUD.usrBlasterPower;
		Destroy(GameObject.Find(blaster.name));
	}
	
	if (newblaster.tag == "blaster")
	{
		var spark1 = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		//HUD.usrHealth = HUD.usrHealth - bbScript2.power;
		//HUD.healthUpdate = true;
		//blaster.tag = "npcblasterused";
		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		Destroy(GameObject.Find(blaster.name));
		//Camera.mainCamera.networkView.RPC("HitNPCRequest",RPCMode.Server,HUD.usrAccount,gameObject.name,HUD.usrBlasterPower);
	}
	
	if (newblaster.tag == "rocket")
	{
		spark1 = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		
		npcHealth -= newblaster.GetComponent(rocketAI).power;
	}
	
	if (npcHealth <= 0)
	{
		var exp2 = Instantiate(explosion,gameObject.transform.position,gameObject.transform.rotation);
		GameObject.Destroy(gameObject);
	}
}