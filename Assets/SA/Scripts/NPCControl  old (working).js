#pragma strict

var LZSpawnPointPrefab : Transform;
var usrAccount = "";

var npcname : String[];
var x : float[];
var y : float[];
var z : float[];
var q : Vector3[];
var tx : float[];
var tz : float[];
var ctime : float[];
var s : Vector3[];
var cpos : Vector3[];

function Start () {

	npcname = new String[200];
	x = new float[200];
	y = new float[200];
	z = new float[200];
	q = new Vector3[200];
	tx = new float[200];
	tz = new float[200];
	ctime = new float[200];
	s = new Vector3[200];
	cpos = new Vector3[200];
	
}

function FixedUpdate () {

	var tGO = GameObject.FindGameObjectsWithTag("npc");
	var npcs : GameObject[] = GameObject.FindGameObjectsWithTag("npc");
	var i : int = 0;

	for (var check : GameObject in tGO)
	{
		i = 0;
		for (var tCount = 0; npcname[i] != check.name; tCount++)
			i++;
		
		if (npcname[i] == check.name)
		{
			cpos[i] += cpos[i].forward * ctime[i] + s[i];
			x[i] = cpos[i].x;
			y[i] = cpos[i].y;
			z[i] = cpos[i].z;

			check.transform.position.x = x[i];
			check.transform.position.y = Terrain.activeTerrain.SampleHeight(cpos[i]) + GameObject.Find("LZSpawnPoint").transform.position.y;
			check.transform.position.z = z[i];
			check.transform.rotation = Quaternion.LookRotation(q[i]);
		}
	}
}

@RPC
function MoveNPC(OPName:String,OPx:float,OPy:float,OPz:float,OPq:Vector3,OPctime:float,OPs:Vector3)
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
			var OtherPlayers = Instantiate(LZSpawnPointPrefab, Vector3(OPx,GameObject.Find("LZSpawnPoint").transform.position.y,OPz), Quaternion.LookRotation(OPq));
			OtherPlayers.name = OPName;
			GameObject.Find(OPName).tag = "npc";
			npcname[npcs.Length] = OPName;
		}		

		for (var i = 0; i <= npcs.Length; i++)
		{
			if (npcname[i] == OPName)
			{
				tCount = i;
			}
		}

		if (npcname[tCount] == OPName)
		{
			x[tCount] = OPx;
			y[tCount] = OPy;
			z[tCount] = OPz;
			cpos[tCount] = Vector3(OPx,OPy,OPz);
			ctime[tCount] = OPctime;
			
			q[tCount] = OPq;
			s[tCount] = OPs;
		}
	}
}
