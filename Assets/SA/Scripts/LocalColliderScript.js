#pragma strict

var explosion : Transform;
var blasterhit : AudioClip;

var sparks : Transform;

function Start () {

}

function Update () {

}

function OnTriggerEnter(blaster:Collider)
{
	if (networkView.isMine)
	{
		var bbScript : BlasterScript = blaster.GetComponent("BlasterScript");

		if (blaster.tag == "blaster")
		{
			//Destroy(GameObject.Find(blaster.name));
			//AudioSource.PlayClipAtPoint(blasterhit, transform.position);

			//var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
			
			if (bbScript.pvp == 1)
			{
				if (HUD.usrPvp == 1)
				{
					Destroy(GameObject.Find(blaster.name));
					AudioSource.PlayClipAtPoint(blasterhit, transform.position);

					var spark = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);

					StationScript.loadStationFlag = false;
					StationScript.timeDockPercent = 0;
					HUD.usrHealth = HUD.usrHealth - bbScript.power;
					HUD.healthUpdate = true;
					blaster.tag = "blasterused";
					Camera.mainCamera.networkView.RPC("HealthUpdateRequest",RPCMode.Server,HUD.usrAccount,HUD.usrHealth,HUD.usrHealthMax);
					
					if (HUD.usrHealth <= 0)
					{
						HUD.usrPvp = 0;
					}
				}
			}
		}

		var bbScript2 : npcBlasterScript = blaster.GetComponent("npcBlasterScript");
		
		if (blaster.tag == "npcblaster")
		{
			if (networkView.isMine)
			{
				var spark1 = Instantiate(sparks, gameObject.transform.position, Quaternion.identity);
				
				Destroy(GameObject.Find(blaster.name));
				AudioSource.PlayClipAtPoint(blasterhit, transform.position);
				
				StationScript.loadStationFlag = false;
				StationScript.timeDockPercent = 0;
				HUD.usrHealth = HUD.usrHealth - bbScript2.power;
				HUD.healthUpdate = true;
				blaster.tag = "npcblasterused";
				Camera.mainCamera.networkView.RPC("HealthUpdateRequest",RPCMode.Server,HUD.usrAccount,HUD.usrHealth,HUD.usrHealthMax);
			}
			
			/*if (HUD.usrHealth <= 0)
			{
				Destroy(gameObject);
				var exploded1 = Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
				//HUD.usrPvp = 0;
			}*/
		}
	}
}