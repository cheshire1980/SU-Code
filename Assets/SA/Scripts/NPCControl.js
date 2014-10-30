#pragma strict

var npcBomber : Transform;
var npcFlyer : Transform;
var npcBossKelroth : Transform;
var npcAsteroid : Transform;
var npcRupture : Transform;

var usrAccount = "";

static var npcname : String[];
static var npcrank : int[];
static var npcexp : int[];
static var npchealth : float[];
static var npchealthmax : float[];
static var x : float[];
static var y : float[];
static var z : float[];
static var q : Quaternion[];
static var tx : float[];
static var tz : float[];
static var ctime : float[];
static var s : float[];
static var cpos : Vector3[];
static var f : Vector3[];

function Start () {

	npcname = new String[500];
	npcrank = new int[500];
	npcexp = new int[500];
	npchealth = new float[500];
	npchealthmax = new float[500];
	x = new float[500];
	y = new float[500];
	z = new float[500];
	q = new Quaternion[500];
	tx = new float[500];
	tz = new float[500];
	ctime = new float[500];
	s = new float[500];
	cpos = new Vector3[500];
	f = new Vector3[500];
	
}

/*
function FixedUpdate () {

	var tGO = GameObject.FindGameObjectsWithTag("npc");
	var npcs : GameObject[] = GameObject.FindGameObjectsWithTag("npc");
	var i : int = 0;

	for (var check : GameObject in tGO)
	{
		i = -1;
		//for (var tCount = 0; npcname[i] != check.name; tCount++)
		//Debug.Log(npcs.Length);
		for (var tCount = 0; tCount < npcname.Length; tCount++)
		//for (var tCount = 0; tCount < npcname.Length; tCount++)
		{
			//Debug.Log(i);
			i++;
			//Debug.Log(npcname.Length + " AND " + i);
			if (npcname[i] == check.name)
				break;
		}
		
		if (npcname[i] == check.name)
		{
			cpos[i] += f[i] * ctime[i] * s[i];
			x[i] = cpos[i].x;
			y[i] = cpos[i].y;
			z[i] = cpos[i].z;

			check.transform.position.x = x[i];
			
			check.transform.position.y = y[i];
			check.transform.position.z = z[i];
			check.transform.rotation = q[i];
		}
	}
}*/

@RPC
function MoveNPC(OPName:String,OPRank:int,OPExp:int,OPx:float,OPy:float,OPz:float,OPq:Quaternion,OPf:Vector3,OPctime:float,OPs:float,OPh:float,OPhm:float)
{
	usrAccount = PlayerPrefs.GetString("PlayerName");
	
	if (OPName != usrAccount)
	{
		
		var tGO = GameObject.FindGameObjectsWithTag("npc");
		var npcs : GameObject[] = GameObject.FindGameObjectsWithTag("npc");
		var tCount : int = 0;
		var newbie = false;

		if (GameObject.Find(OPName) == null)
		{
			var OtherPlayers : Transform;
			
			/*
			if (OPName.Substring(0,OPName.Length-5) == "Bomber")
				OtherPlayers = Instantiate(npcBomber, Vector3(OPx,GameObject.Find("LZSpawnPoint").transform.position.y,OPz), OPq);
			else if (OPName.Substring(0,OPName.Length-5) == "Flyer")
				OtherPlayers = Instantiate(npcFlyer, Vector3(OPx,GameObject.Find("LZSpawnPoint").transform.position.y,OPz), OPq);
			else if (OPName.Substring(0,OPName.Length-5) == "Kelroth")
				OtherPlayers = Instantiate(npcBossKelroth, Vector3(OPx,GameObject.Find("LZSpawnPoint").transform.position.y,OPz), OPq);
			*/
			if (OPName.Substring(0,OPName.Length-5) == "Bomber")
			{
				OtherPlayers = Instantiate(npcBomber, Vector3(OPx,OPy,OPz), OPq);
			}
			else if (OPName.Substring(0,OPName.Length-5) == "Flyer")
				OtherPlayers = Instantiate(npcFlyer, Vector3(OPx,OPy,OPz), OPq);
			else if (OPName.Substring(0,OPName.Length-5) == "Kelroth")
				OtherPlayers = Instantiate(npcBossKelroth, Vector3(OPx,OPy,OPz), OPq);
			else if (OPName.Substring(0,OPName.Length-5) == "Asteroid")
				OtherPlayers = Instantiate(npcAsteroid, Vector3(OPx,OPy,OPz), OPq);
			else if (OPName.Substring(0,OPName.Length-5) == "Rupture")
				OtherPlayers = Instantiate(npcRupture, Vector3(OPx,OPy,OPz), OPq);

								
			OtherPlayers.name = OPName;
			GameObject.Find(OPName).tag = "npc";

			/*var checkBlank : boolean;
			var tCount1 : int;
			
			for (var j = 0; j < npcname.Length; j++)
			{
				//if (npcname[j] == OPName)
				//{
				//	tCount1 = j;
				//}

				if (npcname[j] == "")
				{
					tCount1 = j;
					checkBlank = true;
					break;
				}
			}

			if (checkBlank == false)
				npcname[npcs.Length] = OPName;
			else if (checkBlank == true)
				npcname[tCount1] = OPName;*/
		}		

		/*for (var i = 0; i < npcname.Length; i++)
		{
			if (npcname[i] == OPName)
			{
				tCount = i;
				break;
				//if (npcname[i] == "")
				//	break;
			}
		}

		if (npcname[tCount] == OPName)
		{
			npcrank[tCount] = OPRank;
			npcexp[tCount] = OPExp;
			npchealth[tCount] = OPh;
			npchealthmax[tCount] = OPhm;
			x[tCount] = OPx;
			y[tCount] = OPy;
			z[tCount] = OPz;
			cpos[tCount] = Vector3(OPx,OPy,OPz);
			ctime[tCount] = OPctime;
			
			q[tCount] = OPq;
			s[tCount] = OPs;
			f[tCount] = OPf;*/

	        GameObject.Find(OPName).GetComponent(NPCInfo).syncTime = 0f;
	        GameObject.Find(OPName).GetComponent(NPCInfo).syncDelay = Time.time - GameObject.Find(OPName).GetComponent(NPCInfo).lastSynchronizationTime;
	        GameObject.Find(OPName).GetComponent(NPCInfo).lastSynchronizationTime = Time.time;
	        
	        //GameObject.Find(OPName).GetComponent(NPCInfo).syncEndPosition = Vector3(OPx,OPy,OPz);
	        //GameObject.Find(OPName).GetComponent(NPCInfo).syncStartPosition = GameObject.Find(OPName).transform.position;
	        
	        GameObject.Find(OPName).GetComponent(NPCInfo).syncStartRotation = GameObject.Find(OPName).transform.rotation;
	        GameObject.Find(OPName).GetComponent(NPCInfo).syncEndRotation = OPq;
        
			GameObject.Find(OPName).GetComponent(NPCInfo).npcname = OPName;
			GameObject.Find(OPName).GetComponent(NPCInfo).npcrank = OPRank;
			GameObject.Find(OPName).GetComponent(NPCInfo).npcexp = OPExp;
			GameObject.Find(OPName).GetComponent(NPCInfo).npchealth = OPh;
			GameObject.Find(OPName).GetComponent(NPCInfo).npchealthmax = OPhm;
			GameObject.Find(OPName).GetComponent(NPCInfo).x = OPx;
			GameObject.Find(OPName).GetComponent(NPCInfo).y = OPy;
			GameObject.Find(OPName).GetComponent(NPCInfo).z = OPz;
			GameObject.Find(OPName).GetComponent(NPCInfo).q = OPq;
			GameObject.Find(OPName).GetComponent(NPCInfo).cpos = Vector3(OPx,OPy,OPz);
			GameObject.Find(OPName).GetComponent(NPCInfo).ctime = OPctime;
			GameObject.Find(OPName).GetComponent(NPCInfo).s = OPs;
			GameObject.Find(OPName).GetComponent(NPCInfo).f = OPf;
		//}
	}
}

@RPC
function ShootNPC(npcname:String,npcpower:float)
{
		//ShootScript.blast1 = true;
		var bScript : GameObject = GameObject.Find(npcname);
		var bbScript : npcShootScript = bScript.GetComponent("npcShootScript");
		
		bbScript.TriggerRemoteBlasters = true;
		bbScript.remoteName = npcname;
		bbScript.remotePower = npcpower;
		//bbScript.remotePvp = Pvp;
}

@RPC
function RemoveNPC(name:String)
{
	//for (var i = 0; i < npcname.Length; i++)
	//{
	//	if (npcname[i] == name)
	//	{
	//		npcname[i] = "";
			Destroy(GameObject.Find(name));
	//		break;
	//	}
	//}
}
