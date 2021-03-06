#pragma strict

var NPC : Transform;

private var npcZone = "trinispace";

private var npcAmount = 50;
private var npcRank = 1;
private var npcExperience = 0;
private var npcType = "Asteroid";

private var npcBloodstoneR1 = 15;
private var npcBloodstoneR2 = 21;

private var npcDistance = 400;
private var npcPower : float = 4;

private var npcHMax : float = 40;

private var npcX : float = -2219.5;
private var npcY : float = 0;
private var npcZ : float = 0;

private var npcRoamSpeed = 0;
private var npcEngageSpeed = 0;
private var npcRunBackSpeed = 0;

private var npcDirectionChangeTimeFrom = 5;
private var npcDirectionChangeTimeTo = 15;
private var npcAggroRange = 20;

private var npcRespawnTime = 60;
private var npcBlasterSpeed = 3;

private var NPCName = new Array();
private var NPCpos : Vector3[];
private var NPCorigpos : Vector3[];
private var speed : float[];

private var NPCtiming : float[];
private var NPCchangetime : float[];

private var npcShootTiming : float[];
private var npcShootChangeTime : float[];

private var NPCaggro : boolean[];
private var NPCaggroname = new Array();

private var npcHealth : float[];
private var npcHealthMax : float[];

private var npcRespawnTimer : float[];

private var npcfix : int;
private var wasInRange : boolean[,];

private var NPCdormant : boolean[];
private var tmpname : String;
var spawndownMode : boolean;
private var spawnsetAlready : boolean;

function spawnsetNpcs ()
{
	NPCdormant = new boolean[npcAmount];
	NPCName = new Array[npcAmount];
	NPCpos = new Vector3[npcAmount];
	NPCorigpos = new Vector3[npcAmount];
	speed = new float[npcAmount];
	NPCtiming = new float[npcAmount];
	NPCchangetime = new float[npcAmount];
	npcShootTiming = new float[npcAmount];
	npcShootChangeTime = new float[npcAmount];
	NPCaggro = new boolean[npcAmount];
	NPCaggroname = new Array[npcAmount];
	
	npcHealth = new float[npcAmount];
	npcHealthMax = new float[npcAmount];
	npcRespawnTimer = new float[npcAmount];
	
	wasInRange = new boolean[10000,npcAmount];

	for (var i=0; i < npcAmount; i++)
	{
		NPCdormant[i] = true;
		NPCpos[i] = Vector3(Random.Range(npcX-npcDistance, npcX+npcDistance),npcY,Random.Range(npcZ-npcDistance, npcZ+npcDistance));
		NPCorigpos[i] = NPCpos[i];
		
		//speed[i] = Vector3(Random.Range(-0.05, 0.05),0,Random.Range(-0.05, 0.05));
		speed[i] = npcRoamSpeed;
		
		NPCtiming[i] = 0;
		NPCchangetime[i] = Random.Range(npcDirectionChangeTimeFrom,npcDirectionChangeTimeTo);
		npcShootTiming[i] = 0;
		npcShootChangeTime[i] = npcBlasterSpeed;

		NPCName[i] = npcType + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + "S";
		
		var trans = Instantiate(NPC, NPCpos[i], Quaternion.identity);
		trans.name = NPCName[i];
		trans.transform.rotation = Quaternion.Euler(0,Random.Range(0,360),0);
		NPCaggro[i] = false;
		
		npcHealth[i] = npcHMax;
		npcHealthMax[i] = npcHMax;
	}
	
	spawnsetAlready = true;
	spawndownMode = false;
}

function spawndownNpcs ()
{
	var Count : int = 0;
	
	for (var sd = 0; sd < npcAmount; sd++)
	{			
		if (GameObject.Find(NPCName[sd]) != null)
			if (NPCaggro[sd] == true)
				Count++;
	}
	
	for (var sd1 = 0; sd1 < npcAmount; sd1++)
	{			
		if (GameObject.Find(NPCName[sd1]) != null)
		{
			if (NPCaggro[sd1] == false)
			{
				if (Count == 0)
				{
					tmpname = NPCName[sd1];
					GameObject.Destroy(GameObject.Find(NPCName[sd1]));
					
					if (GameObject.Find(tmpname.Substring(0,tmpname.Length-1)) != null)
					GameObject.Destroy(GameObject.Find(tmpname.Substring(0,tmpname.Length-1)));
				}
			}
		}
	}

	if (Count == 0)
	{
		spawndownMode = true;
		spawnsetAlready = false;
	}
}

function Start ()
{
	if (Vector3.Distance(Vector3(npcX,npcY,npcZ), GameObject.Find(HUD.usrAccount).transform.position) <= (npcDistance*2))
		spawnsetNpcs();
		
	else
		spawndownMode = true;
}

function FixedUpdate () {

	// Fix for both trigs
	if (spawndownMode == false && spawnsetAlready == false)
		spawndownMode = true;
		
	// Completely remove assets from Scene for spawn down
	if (GameObject.Find(HUD.usrAccount) != null)
		if (Vector3.Distance(Vector3(npcX,npcY,npcZ), GameObject.Find(HUD.usrAccount).transform.position) > (npcDistance*2) && spawndownMode == false)
			spawndownNpcs();

	// Spawn set mode
	if (GameObject.Find(HUD.usrAccount) != null)	
		if (Vector3.Distance(Vector3(npcX,npcY,npcZ), GameObject.Find(HUD.usrAccount).transform.position) <= (npcDistance*2) && spawnsetAlready == false)
			spawnsetNpcs();
			
	// Dormant Code
	if (spawndownMode == false)
	{
		for (var dCount = 0; dCount < npcAmount; dCount++)
		{
			if (Vector3.Distance(NPCpos[dCount], GameObject.Find(HUD.usrAccount).transform.position) <= (npcAggroRange * 3))
			{
				NPCdormant[dCount] = false;
			}
			
			else if (Vector3.Distance(NPCpos[dCount], GameObject.Find(HUD.usrAccount).transform.position) > (npcAggroRange * 3))
			{
				NPCdormant[dCount] = true;
			}
		}
	}

	if (1 == 1)
	{
		// Fix for tea bagging issue
		/*for (var fix=0; fix < npcAmount; fix++)
		{
			if (NPCaggro[fix] == true)
			{
				npcfix = 0;
				
				for (var fix2 = 0; fix2 < PhotonNetwork.playerList.Length; fix2++)
				{
					npcfix++;
					if (PhotonNetwork.playerList[fix2].name == NPCaggroname[fix])
					{
						npcfix = 0;
						break;
					}
				}
				
				if (npcfix == 2)
				{
					NPCaggro[fix] = false;
					NPCaggroname[fix] = "";
					NPCtiming[fix] = 0;
					NPCchangetime[fix] = 0;
					speed[fix] = npcRunBackSpeed;

					Debug.Log("FIXED NPC - " + NPCaggro[fix]);
				}

			}
		}*/

		// NPC code starts here
		if (spawndownMode == false)
		{
		for (var i=0; i < npcAmount; i++)
		{
			if (NPCName[i] == "dead")
			{
				npcRespawnTimer[i] += Time.fixedDeltaTime;
				
				if (npcRespawnTimer[i] > npcRespawnTime)
				{
					npcRespawnTimer[i] = 0;

					NPCaggro[i] = false;
					NPCaggroname[i] = "";
					speed[i] = npcRoamSpeed;
					NPCtiming[i] = 9999;
					NPCchangetime[i] = Random.Range(npcDirectionChangeTimeFrom,npcDirectionChangeTimeTo);
					Destroy(GameObject.Find(NPCName[i]));
					NPCName[i] = "dead";
					
					npcHealth[i] = npcHMax;
					npcHealthMax[i] = npcHMax;
					npcShootTiming[i] = 0;
						
					//NPCpos[i] = Vector3(npcX,npcY,npcZ);


					NPCName[i] = npcType + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + "S";
					
					var trans = Instantiate(NPC, NPCpos[i], Quaternion.identity);
					trans.name = NPCName[i];
					//trans.transform.rotation = Quaternion.Euler(0,Random.Range(0,360),0);

					NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
					var targetLocation5 : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
					
					var calctime2 = Time.fixedDeltaTime;

					tmpname = NPCName[i];
					npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation5,
																			GameObject.Find(NPCName[i]).transform.forward,calctime2,speed[i],
																			npcHealth[i],npcHealthMax[i]);
				}
			}
			
			if (NPCName[i] != "dead")
			{
				NPCtiming[i] += Time.fixedDeltaTime;
				npcShootTiming[i] += Time.fixedDeltaTime;
				var distance = Vector3.Distance(NPCorigpos[i],GameObject.Find(NPCName[i]).transform.position);
		
				var calctime = Time.fixedDeltaTime;
				//GameObject.Find(NPCName[i]).transform.position += GameObject.Find(NPCName[i]).transform.forward * calctime * speed[i];
				
				if (NPCtiming[i] > NPCchangetime[i])
				{
					// No Aggro / Random Movement
					if (NPCaggro[i] == false)
					{
						//GameObject.Find(NPCName[i]).transform.rotation = Quaternion.identity;
						
						//if (distance > npcDistance)
						//{
						//	GameObject.Find(NPCName[i]).transform.LookAt(NPCorigpos[i]);
						//}
		
						//speed[i] = npcRoamSpeed;
						NPCtiming[i] = 0;
						NPCchangetime[i] = Random.Range(npcDirectionChangeTimeFrom,npcDirectionChangeTimeTo);
					}
									
					// Calculate direction and go forward
					NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
					var targetLocation : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
					
					tmpname = NPCName[i];
					npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation5,
																			GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																			npcHealth[i],npcHealthMax[i]);				
				}
			}
		}
	}
	}
}

private function npcSend(npcid:int,name:String,rank:int,experience:int,x:float,y:float,z:float,q:Quaternion,f:Vector3,ctime:float,s:float,health:float,healthmax:float)
{
	var i : int = 0;
	//for (var pList = 0; pList < PhotonNetwork.playerList.Length; pList++)
	//{
		i++;
		//var pListName : String = pList.name;
		
		if (HUD.usrAccount != null)
		{
			if (HUD.usrAccount != "")
			{
				if (Vector3.Distance(Vector3(x,y,z),GameObject.Find(HUD.usrAccount).transform.position) < (npcAggroRange * 3))
				{
						//Camera.mainCamera.networkView.RPC("MoveNPC",Server.nPlayers[i],name,rank,experience,x,y,z,q,f,ctime,s,health,healthmax);
						//Camera.main.GetComponent(PhotonView).RPC("MoveNPC",PhotonNetwork.playerList[pList],name,rank,experience,x,y,z,q,f,ctime,s,health,healthmax);
						Camera.main.GetComponent(NPCControl).MoveNPC(name,rank,experience,x,y,z,q,f,ctime,s,health,healthmax);
						wasInRange[i,npcid] = true;
				}
				else if (Vector3.Distance(Vector3(x,y,z),GameObject.Find(HUD.usrAccount).transform.position) >= (npcAggroRange * 10))
				{
					if (wasInRange[i,npcid] == true)
					{
						wasInRange[i,npcid] = false;
						//Camera.mainCamera.networkView.RPC("RemoveNPC",Server.nPlayers[i],name);
						//Camera.main.GetComponent(PhotonView).RPC("RemoveNPC",PhotonNetwork.playerList[pList],name);
						Camera.main.GetComponent(NPCControl).RemoveNPC(name);
					}
				}
			}
		}
	//}
}

private function npcShoot(name:String,power:float,v:Vector3)
{
	//for (var pList = 0; pList < PhotonNetwork.playerList.Length; pList++)
	//{
		//var pListName : String = pList.name;
		
		if (HUD.usrAccount != null)
		{
			if (HUD.usrAccount != "")
			{
				if (Vector3.Distance(Vector3(v.x,v.y,v.z),GameObject.Find(HUD.usrAccount).transform.position) < 75)
				{
					//Camera.mainCamera.networkView.RPC("ShootNPC",Server.nPlayers[i],name,power);
					//Camera.main.GetComponent(PhotonView).RPC("ShootNPC", PhotonNetwork.playerList[pList], name, power);
					Camera.main.GetComponent(NPCControl).ShootNPC(name, power);
				}
			}
		}
	//}
}

private function ResetNPC(Nname:String,i:int,info:PhotonMessageInfo)
{
	NPCaggro[i] = false;
	NPCaggroname[i] = "";
	speed[i] = npcRoamSpeed;
	NPCtiming[i] = 0;
	NPCchangetime[i] = 0;
	Destroy(GameObject.Find(NPCName[i]));
	NPCName[i] = "dead";
	
	npcHealth[i] = npcHMax;
	npcHealthMax[i] = npcHMax;
	
	NPCpos[i] = Vector3(Random.Range(npcX-npcDistance,npcX+npcDistance),
						npcY,
						Random.Range(npcZ-npcDistance,npcZ+npcDistance));
	

	HUD.usrMinerals += 1;
	Camera.main.GetComponent(HUD).rMinui(HUD.usrMinerals);

	Camera.main.GetComponent(HUD).KillNPC(Nname.Substring(0,Nname.Length-1),false,0,"Bloodstone12345");
}

function hitNPC(Nname:String,power:float,info:PhotonMessageInfo)
{
	for (var i=0; i < npcAmount; i++)
	{
		if (NPCName[i] == Nname)
		{
			npcHealth[i] -= power;
			
			if (npcHealth[i] <= 0)
				ResetNPC(Nname,i,info);
		}
	}
}