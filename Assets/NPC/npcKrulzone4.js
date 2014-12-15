#pragma strict

var NPC : Transform;

private var npcZone = "trinispace";

private var npcAmount = 20;
private var npcRank = 24;
private var npcExperience = 1100;
private var npcType = "Flyer";

private var npcBloodstoneR1 = 50;
private var npcBloodstoneR2 = 56;

private var npcDistance = 40;
private var npcPower : float = 20;

private var npcHMax : float = 220;

private var npcX : float = -2238;
private var npcY : float = 0;
private var npcZ : float = -167;

private var npcRoamSpeed = 2;
private var npcEngageSpeed = 15;
private var npcRunBackSpeed = 20;

private var npcDirectionChangeTimeFrom = 5;
private var npcDirectionChangeTimeTo = 15;
private var npcAggroRange = 20;

private var npcRespawnTime = 60;
private var npcBlasterSpeed = 2;

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
			
			if (NPCName[i] != "dead" && NPCdormant[i] == false)
			{
				NPCtiming[i] += Time.fixedDeltaTime;
				npcShootTiming[i] += Time.fixedDeltaTime;
				var distance = Vector3.Distance(NPCorigpos[i],GameObject.Find(NPCName[i]).transform.position);
		
				var calctime = Time.fixedDeltaTime;
				GameObject.Find(NPCName[i]).transform.position += GameObject.Find(NPCName[i]).transform.forward * calctime * speed[i];
				
				if (NPCtiming[i] > NPCchangetime[i])
				{
					// No Aggro / Random Movement
					if (NPCaggro[i] == false)
					{
						GameObject.Find(NPCName[i]).transform.rotation = Quaternion.Euler(0,Random.Range(0,360),0);
						
						if (distance > npcDistance)
						{
							GameObject.Find(NPCName[i]).transform.LookAt(NPCorigpos[i]);
						}
		
						speed[i] = npcRoamSpeed;
						NPCtiming[i] = 0;
						NPCchangetime[i] = Random.Range(npcDirectionChangeTimeFrom,npcDirectionChangeTimeTo);
					}
					
					// Aggro / Follow Player
					if (NPCaggro[i] == true)
					{
						//for (var k=0; k < 2; k++)
						//for (var pList = 0; pList < PhotonNetwork.playerList.Length; pList++)
						//{
							//var pList.name : String = pList.name;
							
							if (NPCaggroname[i] == HUD.usrAccount && GameObject.Find(HUD.usrAccount))
							{
								// Follow Player
								if (Vector3.Distance(GameObject.Find(NPCName[i]).transform.position,GameObject.Find(HUD.usrAccount).transform.position) > 15)
								{
									speed[i] = npcEngageSpeed;
									NPCtiming[i] = 0;
									GameObject.Find(NPCName[i]).transform.LookAt(GameObject.Find(HUD.usrAccount).transform.position);
								}
								// Sit in front of player
								else
								{
									speed[i] = npcEngageSpeed;
									NPCtiming[i] = 0;
									//GameObject.Find(NPCName[i]).transform.LookAt(GameObject.Find(HUD.usrAccount).transform.position);
								}
								
								// Backup if too close
								if (Vector3.Distance(GameObject.Find(NPCName[i]).transform.position,GameObject.Find(HUD.usrAccount).transform.position) < 5)
								{
									//speed[i] =  0 - npcEngageSpeed;
									NPCtiming[i] = 0;
									GameObject.Find(NPCName[i]).transform.position.y = GameObject.Find(HUD.usrAccount).transform.position.y;
									GameObject.Find(NPCName[i]).transform.rotation = Quaternion.Euler(0,Random.Range(0,360),0);    //LookAt(Server.pLocation[k]);
								}
							}
						//}
					}
									
					// Calculate direction and go forward
					NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
					var targetLocation : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
					
					tmpname = NPCName[i];
					npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation,
																			GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																			npcHealth[i],npcHealthMax[i]);				
				}
				
				// Lost aggro & ran home / calculate new roam location
				if (speed[i] == npcRunBackSpeed)
				{
					if (Vector3.Distance(GameObject.Find(NPCName[i]).transform.position,NPCorigpos[i]) < 1)
					{
						NPCdormant[i] = true;
						npcHealth[i] = npcHealthMax[i];
						NPCaggro[i] = false;
						NPCaggroname[i] = "";
						speed[i] = npcRoamSpeed;
						NPCtiming[i] = 0;
						NPCchangetime[i] = Random.Range(npcDirectionChangeTimeFrom,npcDirectionChangeTimeTo);
						GameObject.Find(NPCName[i]).transform.rotation = Quaternion.Euler(0,Random.Range(0,360),0);
						
						NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
						var targetLocation4 : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
						
						tmpname = NPCName[i];
						npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation4,
																				GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																				npcHealth[i],npcHealthMax[i]);
					}
				}
				
				// Aggro routines
				//for (var pListNames = 0; pListNames < PhotonNetwork.playerList.Length; pListNames++)
				//{
					//var pListNames.name : String = pListNames.name;
					//Debug.Log(pListNames.name + " COUNT " + c.ToString());
					
					if (HUD.usrAccount != null)
					{
						if (HUD.usrAccount != "")
						{
							// Found aggro, following
							if (GameObject.Find(HUD.usrAccount) != null)
							{
								if (Vector3.Distance(GameObject.Find(NPCName[i]).transform.position,GameObject.Find(HUD.usrAccount).transform.position) < npcAggroRange)
								{
									if (NPCaggro[i] == false)
									{
										NPCaggro[i] = true;
										NPCaggroname[i] = HUD.usrAccount;
										//Debug.Log(HUD.usrAccount + " IS AGGROED " + PhotonNetwork.playerList.Length);

										NPCtiming[i] = 0;
										NPCchangetime[i] = .5;
										
										speed[i] = npcEngageSpeed;
										
										GameObject.Find(NPCName[i]).transform.LookAt(GameObject.Find(HUD.usrAccount).transform.position);
										NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
										var targetLocation2 : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
										
										tmpname = NPCName[i];
										npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation2,
																								GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																								npcHealth[i],npcHealthMax[i]);
									}
								}

								// Lost Aggro, Returning home
								else if (Vector3.Distance(GameObject.Find(NPCName[i]).transform.position, GameObject.Find(HUD.usrAccount).transform.position) >= npcAggroRange)
								{
									if (NPCaggro[i] == true)
									{
										if (NPCaggroname[i] == HUD.usrAccount);
										{
											Debug.Log(HUD.usrAccount + " HAS UNAGGROED " + Vector3.Distance(GameObject.Find(NPCName[i]).transform.position, GameObject.Find(HUD.usrAccount).transform.position) );
											NPCaggro[i] = false;
											NPCaggroname[i] = "";
											
											speed[i] = npcRunBackSpeed;
											NPCtiming[i] = 0;
											NPCchangetime[i] = 9999;
											
											GameObject.Find(NPCName[i]).transform.LookAt(NPCorigpos[i]);
											NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
											var targetLocation3 : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
											
											tmpname = NPCName[i];
											npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation3,
																									GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																									npcHealth[i],npcHealthMax[i]);				
										}
									}
								}
							}
							//else if (Server.pZone[j] != npcZone)
							//{
								/*else if (NPCaggro[i] == true)
								{
									if (NPCaggroname[i] == pListNames.name)
									{
										NPCaggro[i] = false;
										NPCaggroname[i] = "";
										
										speed[i] = npcRunBackSpeed;
										NPCtiming[i] = 0;
										NPCchangetime[i] = 9999;
										
										GameObject.Find(NPCName[i]).transform.LookAt(NPCorigpos[i]);
										NPCpos[i] = GameObject.Find(NPCName[i]).transform.position;
										var targetLocation333 : Quaternion = GameObject.Find(NPCName[i]).transform.rotation;
										
										tmpname = NPCName[i];
										npcSend(i,tmpname.Substring(0,tmpname.Length-1),npcRank,npcExperience,NPCpos[i].x,NPCpos[i].y,NPCpos[i].z,targetLocation333,
																								GameObject.Find(NPCName[i]).transform.forward,calctime,speed[i],
																								npcHealth[i],npcHealthMax[i]);				
									}
								}*/
							//}
							
							//Shoot when aggroed
							if (NPCaggro[i] == true)
							{
								if (npcShootTiming[i] > npcShootChangeTime[i])
								{
									tmpname = NPCName[i];
									npcShoot(tmpname.Substring(0,tmpname.Length-1),npcPower,GameObject.Find(NPCName[i]).transform.position);
									npcShootTiming[i] = 0;
								}
							}
						}
					}
				//}
			}
			
			else if (NPCdormant[i] == true)
			{
				tmpname = NPCName[i];
				
				if (GameObject.Find(tmpname.Substring(0,tmpname.Length-1)) != null)
					Camera.main.GetComponent(NPCControl).RemoveNPC(tmpname.Substring(0,tmpname.Length-1));
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

//@RPC
//function RemoveNPC(name:String)
//{
//}

//@RPC
//function MoveNPC(name:String,rank:int,experience:int,x:float,y:float,z:float,q:Quaternion,f:Vector3,ctime:float,s:float,health:float,healthmax:float)
//{
//	Camera.main.GetComponent(NPCControl).MoveNPC(name,rank,experience,x,y,z,q,f,ctime,s,health,healthmax);
//}

//@RPC
//function ShootNPC(name:String,power:float)
//{
//	Camera.main.GetComponent(NPCControl).ShootNPC(name,power);
//}

@RPC
function spawnModule (Nname : String, tf : boolean, Mname : String)
{
	//Camera.main.GetComponent(HUD).spawnModule(Nname, tf, Mname);
}

@RPC
function KillNPC(Nname:String,tf:boolean,amount:int,Bname:String)
{
	//Camera.main.GetComponent(HUD).KillNPC(Nname,tf,amount,Bname);
}

private function ResetNPC(Nname:String,i:int)
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

	var randBloodstone = Random.Range(1,4);
	var tfBloodstone;
	var amountBloodstone;
	var nameBloodstone : String = "Bloodstone" + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9);
	
	// Bloodstone code
	if (randBloodstone == 1)
	{
		tfBloodstone = true;
		amountBloodstone = Random.Range(npcBloodstoneR1,npcBloodstoneR2);
	}
	else
	{
		tfBloodstone = false;
		amountBloodstone = 0;
	}
	
	// Module code
	var tfModule;
	var randModule = Random.Range(1,4);
	var nameModule : String = "Module" + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9);
	
	if (randModule == 1)
	{
		tfModule = true;
	}
	else
	{
		tfModule = false;
	}
	
	//for (var i1=0; i1 < 2; i1++)
	//{
		//if (Server.players[i1] != null)
		//{
			//if (Server.players[i1] != "")
			//{
				//if (Server.pZone[i1] == npcZone)
				//{
					//Camera.mainCamera.networkView.RPC("spawnModule",Server.nPlayers[i1],Nname,tfModule,nameModule);
					//Camera.mainCamera.networkView.RPC("KillNPC",Server.nPlayers[i1],Nname,tfBloodstone,amountBloodstone,nameBloodstone);
					//Camera.main.GetComponent(PhotonView).RPC("spawnModule",PhotonTargets.All,Nname.Substring(0,Nname.Length-1),tfModule,nameModule);
					//Camera.main.GetComponent(PhotonView).RPC("KillNPC",PhotonTargets.All,Nname.Substring(0,Nname.Length-1),tfBloodstone,amountBloodstone,nameBloodstone);
					Camera.main.GetComponent(HUD).spawnModule(Nname.Substring(0,Nname.Length-1),tfModule,nameModule);
					Camera.main.GetComponent(HUD).KillNPC(Nname.Substring(0,Nname.Length-1),tfBloodstone,amountBloodstone,nameBloodstone);
				//}
			//}
		//}
	//}
}

function hitNPC(Nname:String,power:float,PhotonMessageInfo)
{
	for (var i=0; i < npcAmount; i++)
	{
		if (NPCName[i] == Nname)
		{
			npcHealth[i] -= power;
			
			if (npcHealth[i] <= 0)
				ResetNPC(Nname,i);
		}
	}
}
