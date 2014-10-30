#pragma strict

var blasterPrefab : Transform;
var explosion : Transform;
var power : float = 1;

private var sentryInverval : float = 2.0;
private var sentryLife : float = 60.0;
var sentryTimer : float;
var sentryLifeTimer : float;

var selfDestruct : boolean = false;

function Start ()
{
	sentryTimer = Time.fixedTime;
	sentryLifeTimer = Time.fixedTime;
}

function shootSentry()
{
	var sentryBlaster1 = Instantiate(blasterPrefab, transform.Find("sentry/group/BlasterSpawn").position, Quaternion.identity);
		
	sentryBlaster1.transform.rotation = transform.Find("sentry/group").rotation;
	
	sentryBlaster1.transform.Rotate(Vector3(0,90,0));
		
	var bbScript : npcBlasterScript = sentryBlaster1.GetComponent("npcBlasterScript");
	bbScript.power = power;
	
	sentryBlaster1.rigidbody.AddForce(sentryBlaster1.transform.forward * 2000);
}

function Update ()
{
    var objectsInRange : Collider[] = Physics.OverlapSphere(transform.position, 15);
    for (var col : Collider in objectsInRange)
    {
        var npc : npcColliderScript = col.GetComponent(npcColliderScript);
        if (col != null)
        {
            if (col.name == HUD.usrAccount && HUD.usrAlienMode == false)
            {
            	transform.Find("sentry/group").LookAt(col.transform);
            	transform.Find("sentry/group").Rotate(Vector3(0,-90,0));
            	
            	if (Time.fixedTime - sentryTimer >= sentryInverval)
            	{
            		sentryTimer = Time.fixedTime;
 	           		shootSentry();
 	           	}
				//npc.AddDamage(power);
			}
			//else if (col.tag == "op")
				//player.AddDamage(power);
		}
	}

	if (Time.fixedTime - sentryLifeTimer >= sentryLife && selfDestruct == true)
	{
	    var objectsInRange2 : Collider[] = Physics.OverlapSphere(transform.position, 5);	
	    for (var col2 : Collider in objectsInRange2)
	    {
	        var npc2 : npcColliderScript = col2.GetComponent(npcColliderScript);
	        if (col2 != null)
	        {
	            if (col2.tag != "npc" && col2.tag != "npcblaster")
	            {
					HUD.usrHealth -= power;
					//npc.AddDamage(power);
				}
				//else if (col.tag == "op")
					//player.AddDamage(power);
			}
		}
		
		var exp = Instantiate(explosion, transform.position, Quaternion.identity);
		GameObject.Destroy(gameObject);
		
		//Network.RemoveRPCs(GameObject.Find(HUD.usrAccount).networkView.viewID);
	}
}