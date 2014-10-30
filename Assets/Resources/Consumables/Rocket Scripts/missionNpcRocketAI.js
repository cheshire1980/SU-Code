#pragma strict

var rocketAudio : AudioClip;

var target : GameObject;
var explosion : Transform;

var tempLocation : Vector3;

var power : float = 1;

function Start ()
{
	AudioSource.PlayClipAtPoint(rocketAudio, transform.position);
		
	power = power * 10;
	
	target = GameObject.Find(HUD.usrAccount);
}

function Update ()
{
		if (target != null)
		{
			tempLocation = target.transform.position;
		}
		
		transform.position = Vector3.MoveTowards(transform.position, tempLocation, Time.deltaTime * 15);
		
		if (target == null)
		{
			//if (Vector3.Distance(transform.position, tempLocation) < 0.5)
				//GameObject.Destroy(GameObject.Find(gameObject.name));
				Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
				Network.Destroy(networkView.viewID);
		}
		
		/*if (Vector3.Distance(transform.position, tempLocation) == 0)
		{
			Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
			Network.Destroy(networkView.viewID);

			GameObject.Destroy(GameObject.Find(gameObject.name));
			var exp = Instantiate(explosion, transform.position, Quaternion.identity);
			exp.tag = "rocket";
		}*/
}

function OnTriggerEnter(obj:Collider)
{
	if (obj.tag != "npc" && obj.tag != "npcblaster") //|| obj.tag == "op")
	{
		Debug.Log(obj.name);
		HUD.usrHealth -= power;
		var exp = Instantiate(explosion, transform.position, Quaternion.identity);
		GameObject.Destroy(gameObject);
	}
}