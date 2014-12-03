#pragma strict

var LZSpawnPointPrefab:Transform;
var TriniArmor : Transform;
var TriniArmorHybrid : Transform;
var TriniFighter : Transform;
var TriniFighterHybrid : Transform;

var usrAccount = "";

function Start ()
{
	usrAccount = PlayerPrefs.GetString("PlayerName");
}

function MakePlayerShip(name:String, ship:String, rank:int, health:float, healthmax:float, x:float, y:float, z:float, q:Quaternion)
{
	/*if (GameObject.Find(name) == null)
	{
		var OtherPlayers : Transform;
		
		if (ship == "a_StarterShip")
			OtherPlayers = Instantiate(LZSpawnPointPrefab, Vector3(x,y,z), q.identity);
			
		else if (ship == "a_TriniArmor")
			OtherPlayers = Instantiate(TriniArmor, Vector3(x,y,z), q.identity);
			
		else if (ship == "a_TriniArmorHybrid")
			OtherPlayers = Instantiate(TriniArmorHybrid, Vector3(x,y,z), q.identity);
	
		else if (ship == "a_TriniFighter")
			OtherPlayers = Instantiate(TriniFighter, Vector3(x,y,z), q.identity);
	
		else if (ship == "a_TriniFighterHybrid")
			OtherPlayers = Instantiate(TriniFighterHybrid, Vector3(x,y,z), q.identity);
	
		OtherPlayers.name = name;
		//GameObject.Find(name).GetComponentInChildren(TextMesh).text = name;
		//GameObject.Find(name).tag = "op";
		
		//OtherPlayers.GetComponentInChildren(TextMesh).text = name;
		OtherPlayers.GetComponentInChildren(TextMesh).text = null;
		OtherPlayers.tag = "op";
		
		//var bb : GameObject = GameObject.Find(name);
		var bbScript : OtherPlayersPrefab = OtherPlayers.GetComponent("OtherPlayersPrefab");
		bbScript.ship = ship;
		bbScript.rank = rank;
		bbScript.health = health;
		bbScript.healthmax = healthmax;
	}*/
}

@RPC
function MoveMeRequest(MyName:String,ship:String,x:float,y:float,z:float,rotation:Quaternion,pvp:int,rank:int,health:float,healthmax:float)
{
}

@RPC
function MoveMeRequestNew(MyName:String,ship:String,mtime:float,fwdbk:float,ab:boolean,lftrt:float,roll:float,rollfwdbk:float,x:float,y:float,z:float,rotation:Quaternion,pvp:int,rank:int,health:float,healthmax:float)
{
}


@RPC
function MovePlayer(OPName:String,ship:String,OPx:float,OPy:float,OPz:float,rotation:Quaternion,pvp:int,rank:int,health:float,healthmax:float)
{
}

@RPC
function MovePlayerNew(OPName:String,gm:int,avatar:String,ship:String,mtime:float,fwdbk:float,lftrt:float,roll:float,rollfwdbk:float,x:float,y:float,z:float,rotation:Quaternion,pvp:int,rank:int,health:float,healthmax:float)
{
	
	if (OPName == HUD.usrAccount)
	{
		/*MoveAround.forwardbackward = fwdbk;
		MoveAround.leftright = lftrt;
		MoveAround.rolling = roll;
		MoveAround.rollingfwdbk = rollfwdbk;
		MoveAround.mtimeNow = mtime;
		MoveAround.x = x;
		MoveAround.y = y;
		MoveAround.z = z;
		MoveAround.q = rotation;
		HUD.usrAvatar = avatar;
		HUD.usrGM = gm;*/
	}
	
	else if (OPName != HUD.usrAccount)
	{
		if (health > 0)
		{
			if (GameObject.Find(OPName) == null)
			{
				MakePlayerShip(OPName, ship, rank, health, healthmax, x, y, z, rotation);
				GameObject.Find(OPName).transform.position.x = x;
				GameObject.Find(OPName).transform.position.y = y;
				GameObject.Find(OPName).transform.position.z = z;
				GameObject.Find(OPName).transform.rotation = rotation;
			}
	
			var trans : GameObject = GameObject.Find(OPName);
			
			if (trans.tag == "op")
			{
				//var bb1 : GameObject = GameObject.Find(OPName);
				var bbScript1 : OtherPlayersPrefab = trans.GetComponent("OtherPlayersPrefab");
				bbScript1.gm = gm;
				//Debug.Log(gm);
				bbScript1.rank = rank;
				bbScript1.health = health;
				bbScript1.healthmax = healthmax;
				
				if (ship != bbScript1.ship)
				{
					Destroy(GameObject.Find(OPName));
					MakePlayerShip(OPName, ship, rank, health, healthmax, x, y, z, rotation);
					GameObject.Find(OPName).transform.position.x = x;
					GameObject.Find(OPName).transform.position.y = y;
					GameObject.Find(OPName).transform.position.z = z;
					GameObject.Find(OPName).transform.rotation = rotation;
				}
					
				if (pvp == 0)
					GameObject.Find(OPName).GetComponentInChildren(TextMesh).renderer.material.SetColor("_Color",Color.white);
					
				else if (pvp == 1)
					GameObject.Find(OPName).GetComponentInChildren(TextMesh).renderer.material.SetColor("_Color",Color.red);
				
				var bs : GameObject = GameObject.Find(OPName);
				var bbScript : OtherPlayersPrefab = bs.GetComponent("OtherPlayersPrefab");
	
				bbScript.fwdbk = fwdbk;
				bbScript.lftrt = lftrt;
				bbScript.roll = roll;
				bbScript.rollfwdbk = rollfwdbk;
				bbScript.mtime = mtime;
				bbScript.x = x;
				bbScript.y = y;
				bbScript.z = z;
				bbScript.q = rotation;
				bbScript.avatar = avatar;
				bbScript.pvp = pvp;
			}
		}
	}
}

@RPC
function UpdateRoom()
{
}

@RPC
function UpdateRoomPing()
{
	/*usrAccount = PlayerPrefs.GetString("PlayerName");
	
		Camera.mainCamera.networkView.RPC("MoveMeRequestNew",RPCMode.Server,usrAccount,HUD.usrActiveship,
																Time.deltaTime,
																MoveAround.verticalStatusCur,
																HUD.afterburner,
																MoveAround.horizontalStatusCur,
																MoveAround.rollStatusCur,
																MoveAround.rollingfwdbk,
																GameObject.Find("PlayerShip").transform.position.x,
																GameObject.Find("PlayerShip").transform.position.y,
																GameObject.Find("PlayerShip").transform.position.z,
																GameObject.Find("PlayerShip").transform.rotation,
																HUD.usrPvp,HUD.usrRank,HUD.usrHealth,HUD.usrHealthMax);*/
}