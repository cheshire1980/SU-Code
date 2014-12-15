#pragma strict

private var lastSynchronizationTime = 0f;
private var syncDelay = 0f;
private var syncTime = 0f;
private var syncStartPosition : Vector3;
private var syncEndPosition : Vector3;
private var syncStartRotation : Quaternion;
private var syncEndRotation : Quaternion;

var rocketAudio : AudioClip;

var target : GameObject;
var explosion : Transform;

var tempLocation : Vector3;

var power : float = 0;
var fromNPC : boolean = false;
var lastSplash : String;
var npcOwned : boolean;

var pView : PhotonView;

function Start ()
{
	pView = gameObject.GetComponent(PhotonView);
	
	if (1 == 1)
		AudioSource.PlayClipAtPoint(rocketAudio, transform.position);

	if (pView.isMine && 1 == 1)
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
	
	else if (pView.isMine && Network.isServer)
	{
		power = power * 2;
		transform.LookAt(target.transform.position);
	}
}

function Update ()
{
	if (pView.isMine)
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
				PhotonNetwork.RemoveRPCs(pView);
				//PhotonNetwork.Destroy(gameObject);
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
	
	if (pView.isMine == false)
    {
        SyncedMovement();
    }
}

function quaternionIsNan (quat : Quaternion)
{
	if (float.IsNaN(quat.x))
		return true;
	else if (float.IsNaN(quat.y))
		return true;
	else if (float.IsNaN(quat.z))
		return true;
	else if (float.IsNaN(quat.w))
		return true;
	else
		return false;
}

function vectorIsNan (vect : Vector3)
{
	if (float.IsNaN(vect.x))
		return true;
	else if (float.IsNaN(vect.y))
		return true;
	else if (float.IsNaN(vect.z))
		return true;
	else
		return false;
}

function SyncedMovement ()
{
    syncTime += Time.deltaTime;
    
	if (!vectorIsNan(Vector3.Lerp(syncStartPosition, syncEndPosition, syncTime / syncDelay)))
	    transform.position = Vector3.Lerp(syncStartPosition, syncEndPosition, syncTime / syncDelay);
	    
	if (!quaternionIsNan(Quaternion.Lerp(syncStartRotation, syncEndRotation, syncTime / syncDelay)))
	    transform.rotation = Quaternion.Lerp(syncStartRotation, syncEndRotation, syncTime / syncDelay);
}

function OnTriggerEnter(obj:Collider)
{
	if (pView.isMine)
	{
		if (npcOwned == false)
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
			            if (col.tag == "npc" && 1 == 1)
							npc.AddDamage(power);
						
						else if (col.tag == "op")
						{
							if (HUD.usrPvp == 1)
							{
								if (1 == 1)
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
				var exp = PhotonNetwork.Instantiate("explosion", transform.position, Quaternion.identity,0);
				PhotonNetwork.Destroy(gameObject);
				exp.tag = "rocket";
				
			}
		}
		
		else if (npcOwned == true)
		{
			if (obj.tag == "Player")
			{
				HUD.usrHealth = HUD.usrHealth - power;

				var exp1 = PhotonNetwork.Instantiate("explosion", transform.position, Quaternion.identity,0);
				PhotonNetwork.Destroy(gameObject);
				exp1.tag = "rocket";
				
			}
		}
	}
}

function OnSerializeNetworkView (stream : BitStream, info : NetworkMessageInfo)
{	
	var syncPosition : Vector3;
	var syncRotation : Quaternion;
	var syncVelocity : Vector3;
	
	if (stream.isWriting)
	{
		//detectInfoChange();
		
		syncPosition = transform.position;
		syncRotation = transform.rotation;
		syncVelocity = rigidbody.velocity;
		
		stream.Serialize(syncPosition);
		stream.Serialize(syncRotation);
		stream.Serialize(syncVelocity);
	}
	else
	{
		stream.Serialize(syncPosition);
		stream.Serialize(syncRotation);
		stream.Serialize(syncVelocity);
		
        syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
        
        syncEndPosition = syncPosition + syncVelocity * syncDelay;
        syncStartPosition = rigidbody.position;
        
        syncStartRotation = transform.rotation;
        syncEndRotation = syncRotation;
	}
}
