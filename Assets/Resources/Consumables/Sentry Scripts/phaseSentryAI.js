#pragma strict

var blasterPrefab : Transform;
var explosion : Transform;

private var sentryInverval : float = 2.0;
private var sentryLife : float = 60.0;
var sentryTimer : float;
var sentryLifeTimer : float;

var pView : PhotonView;

function Start ()
{
	pView = gameObject.GetComponent(PhotonView);
	
	sentryTimer = Time.fixedTime;
	sentryLifeTimer = Time.fixedTime;
}

function shootSentry(target : Transform)
{
	if (pView.isMine)
	{
		var sentryBlaster1 = PhotonNetwork.Instantiate("blasterSentry", transform.Find("sentry/group/BlasterSpawn1").position, transform.Find("sentry/group").rotation, 0);
		var sentryBlaster2 = PhotonNetwork.Instantiate("blasterSentry", transform.Find("sentry/group/BlasterSpawn2").position, transform.Find("sentry/group").rotation, 0);
			
		sentryBlaster1.transform.rotation = transform.Find("sentry/group").rotation;
		sentryBlaster2.transform.rotation = transform.Find("sentry/group").rotation;
		
		//sentryBlaster1.transform.Rotate(Vector3(0,90,0));
		//sentryBlaster2.transform.Rotate(Vector3(0,90,0));
		
		sentryBlaster1.tag = "myblaster";
		sentryBlaster2.tag = "myblaster";
		
		var bbScript : BlasterScript = sentryBlaster1.GetComponent("BlasterScript");
		bbScript.power = HUD.usrBlasterPower / 2;
		bbScript.sentryBlaster = true;
		
		bbScript = sentryBlaster2.GetComponent("BlasterScript");
		bbScript.power = HUD.usrBlasterPower / 2;
		bbScript.sentryBlaster = true;
		bbScript.target = target;

		//sentryBlaster1.rigidbody.AddForce(sentryBlaster1.transform.forward * 2000);
		//sentryBlaster2.rigidbody.AddForce(sentryBlaster2.transform.forward * 2000);
	}
}

function Update ()
{
	if (pView.isMine)
	{
	    var objectsInRange : Collider[] = Physics.OverlapSphere(transform.position, 15);
	    for (var col : Collider in objectsInRange)
	    {
	        var npc : npcColliderScript = col.GetComponent(npcColliderScript);
	        if (col != null)
	        {
	            if (col.tag == "npc")
	            {
	            	transform.Find("sentry/group").LookAt(col.transform);
	            	//transform.Find("sentry/group").Rotate(Vector3(0,-90,0));
	            	
	            	if (Time.fixedTime - sentryTimer >= sentryInverval)
	            	{
	            		sentryTimer = Time.fixedTime;
	 	           		shootSentry(col.transform);
	 	           	}
					//npc.AddDamage(power);
				}
				else if (col.tag == "op")
				{
					if (HUD.usrPvp == 1)
					{
						if (col.GetComponent(PlayerMovement).pvp == 1)
						{
			            	transform.Find("sentry/group").LookAt(col.transform);
			            	//transform.Find("sentry/group").Rotate(Vector3(0,-90,0));
			            	
			            	if (Time.fixedTime - sentryTimer >= sentryInverval)
			            	{
			            		sentryTimer = Time.fixedTime;
			 	           		shootSentry(col.transform);
			 	           	}
						}
					}
				}
					//player.AddDamage(power);
			}
		}

		if (Time.fixedTime - sentryLifeTimer >= sentryLife)
		{
		    var objectsInRange2 : Collider[] = Physics.OverlapSphere(transform.position, 5);	
		    for (var col2 : Collider in objectsInRange2)
		    {
		        var npc2 : npcColliderScript = col2.GetComponent(npcColliderScript);
		        if (col2 != null)
		        {
		            if (col2.tag == "npc")
		            {
						npc2.AddDamage(HUD.usrBlasterPower);
						//npc.AddDamage(power);
					}
					//else if (col.tag == "op")
						//player.AddDamage(power);
				}
			}
			
			var exp = PhotonNetwork.Instantiate("explosion", transform.position, Quaternion.identity,0);
			PhotonNetwork.RemoveRPCs(pView);
			PhotonNetwork.Destroy(gameObject);
			PhotonNetwork.RemoveRPCs(pView);
			exp.tag = "rocket";
			
			//Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
		}
	}
}