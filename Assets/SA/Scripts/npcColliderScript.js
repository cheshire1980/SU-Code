#pragma strict

var TargetSystem : GUISkin;

var explosion : Transform;
var blasterhit : AudioClip;

var sparks : Transform;

var yourDamage : int;

function Start () {

	yourDamage = 0;

}

function OnTriggerEnter(blaster:Collider)
{
	var bbScript : BlasterScript = blaster.GetComponent("BlasterScript");
	var rocketScript : rocketAI = blaster.GetComponent("rocketAI");
	
	if (blaster.tag == "myblaster")
	{
		var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		//HUD.usrHealth = HUD.usrHealth - bbScript2.power;
		//HUD.healthUpdate = true;
		//blaster.tag = "npcblasterused";
		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		
		yourDamage = yourDamage + bbScript.power;
		//Debug.Log(yourDamage);
		Camera.main.GetComponent(PhotonView).RPC("HitNPCRequest",PhotonTargets.All,HUD.usrAccount,gameObject.name,HUD.usrBlasterPower);
		Destroy(GameObject.Find(blaster.name));
	}
	
	if (blaster.tag == "blaster")
	{
		var spark1 = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
		//HUD.usrHealth = HUD.usrHealth - bbScript2.power;
		//HUD.healthUpdate = true;
		//blaster.tag = "npcblasterused";
		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		Destroy(GameObject.Find(blaster.name));
		//Camera.main.GetComponent(PhotonView).RPC("HitNPCRequest",PhotonTargets.All,HUD.usrAccount,gameObject.name,HUD.usrBlasterPower);
	}
	
	if (blaster.tag == "rocket")
	{		
		AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
		
		yourDamage = yourDamage + rocketScript.power;
		//Debug.Log(yourDamage);
		Camera.main.GetComponent(PhotonView).RPC("HitNPCRequest",PhotonTargets.All,HUD.usrAccount,gameObject.name,rocketScript.power);
		//Destroy(GameObject.Find(blaster.name));
	}
}

function AddDamage (power : float)
{
	AudioSource.PlayClipAtPoint(blasterhit, gameObject.transform.position);
	Camera.main.GetComponent(PhotonView).RPC("HitNPCRequest",PhotonTargets.All,HUD.usrAccount,gameObject.name,power);
}