#pragma strict

var target : Transform;

var blaster : Transform;
var blasterPower : float;

var spreadTrigger : boolean;
var spreadPosition : Vector3;

var bulletTime : float;

var npcHealth : float = 50;
var npcHealthMax : float = 50;
var npcRank : int = 15;

var explosion : Transform;
var blasterhit : AudioClip;
var sparks : Transform;


function npcBrain ()
{
	lookatTarget();
	movetoTarget();
	//shootatTarget();
}

function movetoTarget ()
{
	gameObject.transform.position.y = 0;
	
	if (Vector3.Distance(gameObject.transform.position, target.position) > 10)
	{
		gameObject.transform.position = Vector3.Lerp(gameObject.transform.position, target.position, Time.deltaTime * 0.75);
		spreadTrigger = false;
	}
	
	else
	{
		if (spreadTrigger == false)
		{
			spreadTrigger = true;
			spreadPosition.x = Random.Range(target.position.x - 9, target.position.x + 9);
			spreadPosition.z = Random.Range(target.position.z - 9, target.position.z + 9);
			spreadPosition.y = 0;
		}
		
		else if (spreadTrigger == true)
		{
			gameObject.transform.position = Vector3.Lerp(gameObject.transform.position, spreadPosition, Time.deltaTime * 0.25);
			
			if (Vector3.Distance(spreadPosition, target.position) < 8)
			{
				spreadPosition.x = Random.Range(target.position.x - 9, target.position.x + 9);
				spreadPosition.z = Random.Range(target.position.z - 9, target.position.z + 9);
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
	if (Time.fixedTime - bulletTime >= 5)
	{
		if (Vector3.Distance(gameObject.transform.position, target.position) < 10)
		{
			bulletTime = Time.fixedTime;
			
			var blasterShot = Instantiate(blaster, GameObject.Find(gameObject.name + "/blasterSpawn").transform.position, Quaternion.identity);
			blasterShot.transform.LookAt(target);
			
			blasterShot.rigidbody.AddForce(blasterShot.transform.forward * 2000);
		}
	}
}

function Update ()
{
	gameObject.transform.position.y = 0;
	npcBrain();
}

function OnGUI ()
{
	GUI.skin = GameObject.Find("Main Camera").GetComponent(HUD).HUD;
	
	var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
	var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

	if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
	{
		var shortName = gameObject.name;
		var uhp = npcHealth / npcHealthMax;
		var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
		GUI.Box(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70,5),"");
		GUI.DrawTexture(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,70 * Mathf.Clamp01(uhp),5), thud);

		GUI.color = Color.yellow;
		GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-75,100,100), shortName);
		//GUI.Label(Rect(screenLoc1.x-(5*(shortName.Length/2)),(Screen.height-screenLoc1.y)-65,100,100), "Rank: " + npcRank.ToString());
	}
}

function OnTriggerEnter(newblaster:Collider)
{
	var bbScript : npcBlasterScript = newblaster.GetComponent("npcBlasterScript");
	
	if (newblaster.tag == "npcblaster")
	{			
		var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		
		npcHealth = npcHealth - bbScript.power;
		Destroy(GameObject.Find(newblaster.name));
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
	
	if (npcHealth <= 0)
	{
		var exp2 = Instantiate(explosion,gameObject.transform.position,gameObject.transform.rotation);
		GameObject.Destroy(gameObject);
	}
}