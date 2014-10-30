#pragma strict

var rocketAudio : AudioClip;

var target : GameObject;
var explosion : Transform;

var tempLocation : Vector3;

var power : float = 0;
var fromNPC : boolean = false;
var lastSplash : String;

function Start ()
{
	if (Network.isClient)
		AudioSource.PlayClipAtPoint(rocketAudio, transform.position);

	if (networkView.isMine && Network.isClient)
	{	
		power = HUD.usrBlasterPower * 2;
		
		if (MoveAround.objSelected == true && MoveAround.SelectedTarget != "" && MoveAround.SelectedTarget != null)
		{
			if (GameObject.Find(MoveAround.SelectedTarget) != null)
			{
				if (GameObject.Find(MoveAround.SelectedTarget).tag == "npc" || GameObject.Find(MoveAround.SelectedTarget).tag == "op")
				{
					target = GameObject.Find(MoveAround.SelectedTarget);
					transform.LookAt(target.transform.position);
				}
			}
		}
	}
	
	else if (networkView.isMine && Network.isServer)
	{
		power = power * 2;
		transform.LookAt(target.transform.position);
	}
}

function Update ()
{
	if (networkView.isMine)
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
		
		if (Vector3.Distance(transform.position, tempLocation) == 0)
		{
			Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
			Network.Destroy(networkView.viewID);

			GameObject.Destroy(GameObject.Find(gameObject.name));
			var exp = Instantiate(explosion, transform.position, Quaternion.identity);
			exp.tag = "rocket";
		}
	}
}

function OnTriggerEnter(obj:Collider)
{
	if (networkView.isMine)
	{
		if (obj.tag == "npc" || obj.tag == "op")
		{
		    var objectsInRange : Collider[] = Physics.OverlapSphere(transform.position, 7.5);
		    for (var col : Collider in objectsInRange)
		    {
		        var npc : npcColliderScript = col.GetComponent(npcColliderScript);
		        if (col != null && col.name != lastSplash)
		        {
		        	lastSplash = col.name;
		            // linear falloff of effect
		            //var proximity : float = (location - enemy.transform.position).magnitude;
		            //var effect : float = 1 - (proximity / radius);
		 
		            //enemy.ApplyDamage(damage * effect);
		            if (col.tag == "npc" && Network.isClient)
						npc.AddDamage(power);
					
					else if (col.tag == "op")
					{
						if (HUD.usrPvp == 1)
						{
							if (Network.isClient)
								Camera.main.GetComponent(HUD).requestPvpDamage(target.name, power);
						}
						else if (Network.isServer)
						{
							Camera.main.networkView.RPC ("returnRegularDamage", RPCMode.All, target.name, power);
						}
					}
	            }
			}
			
	            
	            
	            
			//Physics.OverlapSphere(transform.position, 150);
			
			//if (obj.name != target.name)
			var exp = Network.Instantiate(explosion, transform.position, Quaternion.identity,0);
			Network.Destroy(networkView.viewID);
			exp.tag = "rocket";
			
		}
	}
}