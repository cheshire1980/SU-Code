#pragma strict

var explosion : Transform;

private var lastSynchronizationTime = 0f;
private var syncDelay = 0f;
private var syncTime = 0f;
private var syncStartPosition : Vector3;
private var syncEndPosition : Vector3;
private var syncStartRotation : Quaternion;
private var syncEndRotation : Quaternion;

 var playerName : String = "";

var HUDName : GUISkin;
var HUDBuddies : GUISkin;
var HUDDEV : GUISkin;

var ship : String;
var health : float = 0.0001;
var healthmax : float;
var energy : float;
var energymax : float;
var rank : int;
var gm : int;
var avatar : String;
var pvp : int;
var shipname : String = "";

var oship : String;
var ohealth : float;
var ohealthmax : float;
var oenergy : float;
var oenergymax : float;
var orank : int;
var ogm : int;
var oavatar : String;
var opvp : int;
var oshipname : String = "";


var pView : PhotonView;

function backupInfo ()
{
	if (pView.isMine == true)
	{
		ohealth = health;
		ohealthmax = healthmax;
		orank = rank;
		ogm = gm;
		oavatar = avatar;
		opvp = pvp;
		
		if (oshipname != shipname)
		{
			oshipname = shipname;
			networkView.RPC ("shipName", RPCMode.AllBuffered, shipname);
		}
	}
}

function detectInfoChange ()
{
	if (pView.isMine)
	{
		var tempchange : boolean = false;
		
		if (ohealth != health)
			tempchange = true;
		if (ohealthmax != healthmax)
			tempchange = true;
		if (orank != rank)
			tempchange = true;
		if (ogm != gm)
			tempchange = true;
		if (oavatar != avatar)
			tempchange = true;
		if (opvp != pvp)
			tempchange = true;
		if (oshipname != shipname)
			tempchange = true;
			
		if (tempchange == true)
		{
			Debug.Log("Flagged because of name change" + oshipname + " " + shipname);
			backupInfo();
			networkView.RPC ("sendInfo", RPCMode.AllBuffered, HUD.usrAccount, networkView.viewID, pvp, rank, health, healthmax, gm);
			networkView.RPC ("shipName", RPCMode.AllBuffered, shipname);
		}
	}
}

function Awake ()
{
	//DontDestroyOnLoad(this);
}

function Start ()
{
	pView = gameObject.GetComponent(PhotonView);
	
	if (pView.isMine)
	{
		health = HUD.usrHealth;
		healthmax = HUD.usrHealthMax;
		energy = HUD.usrEnergy;
		energymax = HUD.usrEnergyMax;
		rank = HUD.usrRank;
		gm = HUD.usrGM;
		avatar = HUD.usrAvatar;
		pvp = HUD.usrPvp;
		shipname = HUD.usrActiveshipname;
		
		backupInfo();
		networkView.RPC("sendInfo",RPCMode.AllBuffered, HUD.usrAccount, networkView.viewID, pvp, rank, health, healthmax, gm);
	}
}

function OnGUI ()
{
	/*if (Network.isClient)
	{
		if (gameObject.name == "")
			GameObject.Destroy(gameObject);
		else if (gameObject.name == null)
			GameObject.Destroy(gameObject);
	}*/
		
	if (pView.isMine == true)
	{
		if (playerName == HUD.usrAccount)
		{
			health = HUD.usrHealth;
			healthmax = HUD.usrHealthMax;
			energy = HUD.usrEnergy;
			energymax = HUD.usrEnergyMax;
			rank = HUD.usrRank;
			gm = HUD.usrGM;
			avatar = HUD.usrAvatar;
			pvp = HUD.usrPvp;
			shipname = HUD.usrActiveshipname;
			detectInfoChange();
		}
	}
	
	if (Network.isClient)
	{
		GUI.skin = HUDName;
		var oldcolor = GUI.color;
		
		var cameraRelative = Camera.main.transform.InverseTransformPoint(gameObject.transform.position);
		var screenLoc1 : Vector3 = Camera.main.WorldToScreenPoint(gameObject.transform.position);

		if (screenLoc1.x > 0 && screenLoc1.x < Screen.width && screenLoc1.y > 0 && screenLoc1.y < Screen.height && cameraRelative.z > 0)
		{
			if (pView.isMine)
			{
				if (gm == 0)
				{
					var buddiesList : String = GameObject.Find("Main Camera").GetComponent(ProfileOnlineScript).buddiesList;
					
					var splits = new Array();
					splits = buddiesList.Split(","[0]);
					
					for (var i=0; i < splits.length; i++)
					{
						var tmpstr : String = splits[i];
						
						if (tmpstr != "")
						{
							if (splits[i] == playerName)
							{
								GUI.skin = HUDBuddies;
							}
						}
					}
				}
			}
			
			var uhp = health / healthmax;
			var thud = GameObject.Find("Main Camera").GetComponent(HUD).mHealth;
			GUI.Box(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-75,70,5),"");
			GUI.DrawTexture(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-75,70 * Mathf.Clamp01(uhp),5), thud);
			
			if (pView.isMine)
			{
				var tehud = GameObject.Find("Main Camera").GetComponent(HUD).mEnergy;
				GUI.Box(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)-68,70,5),"");
				GUI.DrawTexture(Rect(screenLoc1.x-(5*(HUD.usrAccount.Length/2)),(Screen.height-screenLoc1.y)-68,70 * Mathf.Clamp01(HUD.usrEnergyPercent),5), tehud);
			}
			
			if (pvp == 1)
			{
				GUI.skin = HUDName;
				GUI.color = Color.red;
			}
			
			if (pvp == 0)
			{
				if (gm == 1)
				{
					GUI.skin = HUDName;
					GUI.color = Color.green;
					//Debug.Log("GM " + playerName);
				}

				if (gm == 2)
				{
					GUI.skin = HUDName;
					GUI.color = Color.green;
					//Debug.Log("GM " + playerName);
				}

				if (gm == 3)
				{
					GUI.skin = HUDName;
					GUI.color = Color.yellow;
					//Debug.Log("GM " + playerName);
				}

				if (gm == 4)
				{
					GUI.skin = HUDDEV;
					//Debug.Log("Dev " + playerName);
					//GUI.color = Color.magenta;
				}
			}
			
			var gmtag : String = "";
			
			if (gm == 1)
				gmtag = "GM ";
			else if (gm == 2)
				gmtag = "LGM ";
			else if (gm == 3)
				gmtag = "CM ";
			else if (gm == 4)
				gmtag = "DEV ";
				
			if (shipname != "")
			{
				if (gmtag == "")
					gmtag = "\"" + shipname + "\"";
					
				else if (gmtag != "")
					gmtag = gmtag + "- \"" + shipname + "\"";
			}
				
			if (pView.isMine)
			{			
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-65,1000,100), playerName);
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-55,1000,100), "Rank: " + rank.ToString());
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-45,1000,100), gmtag);
			}
			
			else
			{
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-75,1000,100), playerName);
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-65,1000,100), "Rank: " + rank.ToString());
				GUI.Label(Rect(screenLoc1.x-(5*(playerName.Length/2)),(Screen.height-screenLoc1.y)-55,1000,100), gmtag);
			}
		}
	}
}

function OnPhotonSerializeView(stream : PhotonStream, info : PhotonMessageInfo)
//function OnSerializeNetworkView (stream : BitStream, info : NetworkMessageInfo)
{	
	var syncPosition : Vector3;
	var syncRotation : Quaternion;
	var syncVelocity : Vector3;
	
	if (stream.isWriting)
	{
		detectInfoChange();
		
		syncPosition = transform.position;
		syncRotation = transform.rotation;
		syncVelocity = rigidbody.velocity;
		
		stream.SendNext(syncPosition);
		stream.SendNext(syncRotation);
		stream.SendNext(syncVelocity);
	}
	else
	{
		syncPosition = stream.ReceiveNext();
		syncRotation = stream.ReceiveNext();
		syncVelocity = stream.ReceiveNext();
		
        syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
        
        syncEndPosition = syncPosition + syncVelocity * syncDelay;
        syncStartPosition = rigidbody.position;
        
        syncStartRotation = transform.rotation;
        syncEndRotation = syncRotation;
	}
}


@RPC
function shipName (name : String, info : NetworkMessageInfo)
{
	if (!pView.isMine)
	{
		shipname = name;
	}
}

@RPC
function sendInfo (name : String, netID : NetworkViewID, rpvp : int, rrank : int, rhealth : float, rhealthmax : float, rgm : int, info : NetworkMessageInfo)
{
	if (netID == networkView.viewID)
	{			
		if (playerName == "");
			playerName = name;
		
		pvp = rpvp;
		rank = rrank;
		health = rhealth;
		healthmax = rhealthmax;
		gm = rgm;
		
		if (name != HUD.usrAccount)
			gameObject.tag = "op";
	}
}

@RPC
function remoteExplosion(remoteName : String)
{
	var exp;
	var temppos;
	var temprot;

	if (Network.isClient)
	{
		if (remoteName == playerName)
		{
			if (health <= 0)
			{
				if (gameObject != null)
				{
					temprot = gameObject.transform.rotation;
					temppos = gameObject.transform.position;
					Network.RemoveRPCs(networkView.viewID);
					GameObject.Destroy(gameObject);
					exp = Instantiate(explosion,temppos,temprot);
				}
			}
		}
	}
	
	else if (Network.isServer)
	{
		if (remoteName == playerName)
		{
			if (health <= 0)
			{
				if (gameObject != null)
				{
					temprot = gameObject.transform.rotation;
					temppos = gameObject.transform.position;
					Network.RemoveRPCs(networkView.viewID);
					Network.Destroy(gameObject);
					exp = Instantiate(explosion,temppos,temprot);
				}
			}
		}
	}
}

@RPC
function removePlayer(remoteName : String)
{
	if (Network.isClient)
	{
		if (remoteName == playerName)
		{
			if (gameObject != null)
			{
				Network.RemoveRPCs(networkView.viewID);
				GameObject.Destroy(gameObject);
			}
		}
	}
	
	else if (Network.isServer)
	{
		if (remoteName == playerName)
		{
			if (gameObject != null)
			{
				Network.RemoveRPCs(networkView.viewID);
				Network.Destroy(gameObject);
			}
		}
	}
}

function rPlayer(name)
{
	networkView.RPC ("removePlayer", RPCMode.AllBuffered, name);
}

function clearInst (viewPos : Vector3, viewID : NetworkViewID)
{
	networkView.RPC ("clearInstantiate", RPCMode.Server, viewPos, viewID);
}

@RPC
function clearInstantiate (viewPos : Vector3, viewID : NetworkViewID, info : NetworkMessageInfo)
{
	if (Network.isServer)
	{
		networkView.RPC ("remoteExplosion", RPCMode.All, viewPos);
		//Network.RemoveRPCs(viewID);
		//Network.DestroyPlayerObjects(info.sender);
	}
	else
	{
		networkView.RPC ("clearInstantiate", RPCMode.Server, viewPos, viewID);
	}
}

function Update ()
{
	var exp;
	var temppos;
	var temprot;
	
    if (!pView.isMine == true)
    {
    	if (gameObject.name != playerName)
    		gameObject.name = playerName;
    }
    
	if (pView.isMine == true)
	{
		if (health <= 0)
		{
			detectInfoChange();
			if (gameObject != null)
			{
				temprot = gameObject.transform.rotation;
				temppos = gameObject.transform.position;
    			Network.RemoveRPCs(networkView.viewID);
    			GameObject.Destroy(gameObject);
				exp = Instantiate(explosion,temppos,temprot);
				networkView.RPC ("remoteExplosion",RPCMode.AllBuffered, playerName);
			}
		}
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

function OnDisconnectedFromServer(info : NetworkDisconnection)
{
	GameObject.Destroy(gameObject);
}
