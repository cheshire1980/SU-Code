#pragma strict

static var hit:RaycastHit;

function Start () {

}

function Update ()
{
	if (Application.platform == RuntimePlatform.Android)
	{
		var oldSelectedTarget = MoveAround.SelectedTarget;
		var oldobjSelected = MoveAround.objSelected;
		

		for (var ii = 0; ii < Input.touchCount; ++ii)
		{
	
			var ray1 = Camera.main.ScreenPointToRay(Input.GetTouch(ii).position);
			
			if(Physics.Raycast(ray1, hit, 10000))
			{
				//objSelected = true;
				if (hit.transform.name == "Terrain")
				{
					MoveAround.objSelected = false;
					MoveAround.SelectedTarget = "";
				}
				
				else if (hit.transform.name == "PlayerShip")
				{
					MoveAround.objSelected = false;
					MoveAround.SelectedTarget = "";
				}
	
				if (GameObject.Find(hit.transform.name).tag == "op")
				{
					MoveAround.objSelected = true;
					MoveAround.SelectedTarget = hit.transform.name;
				}
				
				if (GameObject.Find(hit.transform.name).tag == "npc")
				{
					MoveAround.objSelected = true;
					MoveAround.SelectedTarget = hit.transform.name;
				}

				if (GameObject.Find(hit.transform.name).tag == "bloodstone")
				{
					MoveAround.objSelected = true;
					MoveAround.SelectedTarget = hit.transform.name;
				}

				if (GameObject.Find(hit.transform.name).tag == "questgiver")
				{
					MoveAround.objSelected = true;
					MoveAround.SelectedTarget = hit.transform.name;
				}

				if (GameObject.Find(hit.transform.name).tag == "drone")
				{
					MoveAround.objSelected = true;
					MoveAround.SelectedTarget = hit.transform.name;
				}

				//else
				//{
				//	objSelected = true;
				//	SelectedTarget = hit.transform.name;
				//}

				//GameObject.Find("Nameofyourobject") search your gameobject on the hierarchy with the desired name and allows you to use it
				//Destroy(GameObject.Find(hit.transform.name));
				//Debug.Log(hit.transform.name);
	
			}
			
			if (GameObject.Find(MoveAround.SelectedTarget) != null)
			{
				if (GameObject.Find(MoveAround.SelectedTarget).tag == "bloodstone")
				{
					if (Vector3.Distance(GameObject.Find("PlayerShip").transform.position,GameObject.Find(MoveAround.SelectedTarget).transform.position) <= 15)
					{
						var bbScript111 : BloodstoneScript = GameObject.Find(MoveAround.SelectedTarget).GetComponent("BloodstoneScript");
						Camera.main.networkView.RPC("CollectBloodstone",RPCMode.Server,HUD.usrAccount,MoveAround.SelectedTarget,bbScript111.amount);
					}
					//var bbScript : BloodstoneScript = GameObject.Find(SelectedTarget).GetComponent("BloodstoneScript");
					//HUD.usrBloodstone += bbScript.amount;
					//Destroy(GameObject.Find(SelectedTarget));
					//networkView.RPC("RankExpUpdate",RPCMode.Server,usrAccount,usrRank,usrExperience,usrExperienceMax,usrBloodstone);
				}
			}
		}
	}
}