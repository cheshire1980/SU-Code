#pragma strict


var doneButton : GameObject;

var tab_rAssociation1_Template : Transform;
var tab_shivanInterceptor_Template : Transform;

var tab_TriniArmor_Template : Transform;
var tab_TriniFighter_Template : Transform;
var tab_TriniArmorHybrid_Template : Transform;
var tab_TriniFighterHybrid_Template : Transform;

var tab_KrulArmor_Template : Transform;
var tab_KrulFighter_Template : Transform;
var tab_KrulAlloy_Template : Transform;
var tab_KrulFusion_Template : Transform;

var tab_phaseBarricade_Template : Transform;
var tab_phaseCrimson_Template : Transform;
var tab_phaseMagnum_Template : Transform;
var tab_phaseZealot_Template : Transform;
var tab_phaseSentinel_Template : Transform;
var tab_phaseCrawler_Template : Transform;

var ids = new Array();
var ships = new Array();
var names = new Array();

var selectedID : String;
var selectedShip : String;
var selectedShipname : String;
var selectedPOS : int;

var sData : WWW;
var renameData : WWW;

function parseShips () { ids = HUD.usrShipids.Split(":"[0]); ships = HUD.usrShips.Split(":"[0]); names = HUD.usrShipnames.Split(":"[0]); }

function insertShips ()
{
	GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").GetComponent(UIGrid).Reposition();
	
	var tabs : Transform;
	
	for (var i=0; i < ids.length; i++)
	{
		if (ids[i] != "" && GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid/" + ids[i]) == null)
		{
			if (ships[i] == "a_StarterShip") tabs = Instantiate(tab_rAssociation1_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "shivanInterceptor") tabs = Instantiate(tab_shivanInterceptor_Template,Vector3(0,0,0),Quaternion.identity);
			
			else if (ships[i] == "a_TriniArmor") tabs = Instantiate(tab_TriniArmor_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "a_TriniFighter") tabs = Instantiate(tab_TriniFighter_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "a_TriniArmorHybrid") tabs = Instantiate(tab_TriniArmorHybrid_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "a_TriniFighterHybrid") tabs = Instantiate(tab_TriniFighterHybrid_Template,Vector3(0,0,0),Quaternion.identity);

			else if (ships[i] == "KrulArmor") tabs = Instantiate(tab_KrulArmor_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "KrulFighter") tabs = Instantiate(tab_KrulFighter_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "KrulAlloy") tabs = Instantiate(tab_KrulAlloy_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "KrulFusion") tabs = Instantiate(tab_KrulFusion_Template,Vector3(0,0,0),Quaternion.identity);

			else if (ships[i] == "phaseBarricade") tabs = Instantiate(tab_phaseBarricade_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "phaseCrimson") tabs = Instantiate(tab_phaseCrimson_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "phaseMagnum") tabs = Instantiate(tab_phaseMagnum_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "phaseZealot") tabs = Instantiate(tab_phaseZealot_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "phaseSentinel") tabs = Instantiate(tab_phaseSentinel_Template,Vector3(0,0,0),Quaternion.identity);
			else if (ships[i] == "phaseCrawler") tabs = Instantiate(tab_phaseCrawler_Template,Vector3(0,0,0),Quaternion.identity);
			
			tabs.transform.parent = GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").transform;
			tabs.transform.localScale = Vector3(1,1,1);
			tabs.name = ids[i];
			
			GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").GetComponent(UIGrid).Reposition();
		}
	}
	
	GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").GetComponent(UIGrid).Reposition();
}

function clearShips ()
{
var tmpids = ids;
var tmpships = ships;

	for (var i=0; i < tmpids.length; i++)
	{
		if (tmpids.length > 0)
			if (tmpids[i] != "")
				if (GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid/" + tmpids[i]) != null)
					GameObject.Destroy(GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid/" + tmpids[i]));
	}
	
	GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel").GetComponent(UIScrollView).ResetPosition();


	GameObject.Find("UI Root/UI_StationPanel/HangarList/Panel/Grid").GetComponent(UIGrid).Reposition();
}

function selectShip (id : String)
{
	for (var i=0; i < ids.length; i++)
	{
		if (id == ids[i])
		{
			selectedID = id;
			selectedShip = ships[i];
			selectedShipname = names[i];
			selectedPOS = i;
		}
	}
}

function reqLoadShip(id : String)
{
	sData = new WWW("http://www.spaceunfolding.com/remotedb/ships.php?id=" + HUD.usrID + "&username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&loadship=" + id);
	yield sData;
}

function loadShip ()
{
	if (selectedID != "")
	{
		HUD.usrActiveship = selectedShip;
		HUD.usrActiveshipname = selectedShipname;
		//Camera.main.networkView.RPC ("requestLoadShip", RPCMode.Server, int.Parse(selectedID));
		reqLoadShip(selectedID);
	}
}

function renameShip ()
{
	doneButton.SetActive(true);
}

function renameSendData (info : String)
{
	info = info.Replace(" ","%20");
	renameData = new WWW("http://www.spaceunfolding.com/remotedb/shop.php?username=" + HUD.usrAccount + "&password=" + HUD.usrPassword + "&buy=" + info);
	yield renameData;
}

function renameComplete ()
{
	var name : String = GameObject.Find("UI Root/UI_StationPanel/HangarList/Name").GetComponent(UILabel).text;
	
	renameSendData("rship&rename=" + name);
	
	doneButton.SetActive(false);
}

function Update ()
{
	var trueName;
	
	if (selectedShip == "a_StarterShip") trueName = "Association 1";
	else if (selectedShip == "shivanInterceptor") trueName = "Shivan Interceptor";
	else if (selectedShip == "a_TriniArmor") trueName = "Trini Armor";
	else if (selectedShip == "a_TriniFighter") trueName = "Trini Fighter";
	else if (selectedShip == "a_TriniArmorHybrid") trueName = "Trini Armor Hybrid";
	else if (selectedShip == "a_TriniFighterHybrid") trueName = "Trini Fighter Hybrid";
	else if (selectedShip == "KrulArmor") trueName = "Krul Armor";
	else if (selectedShip == "KrulFighter") trueName = "Krul Fighter";
	else if (selectedShip == "KrulAlloy") trueName = "Krul Alloy";
	else if (selectedShip == "KrulFusion") trueName = "Krul Fusion";
	else if (selectedShip == "phaseBarricade") trueName = "Barricade";
	else if (selectedShip == "phaseCrimson") trueName = "Crimson";
	else if (selectedShip == "phaseMagnum") trueName = "Magnum";
	else if (selectedShip == "phaseZealot") trueName = "Zealot";
	else if (selectedShip == "phaseSentinel") trueName = "Sentinel";
	else if (selectedShip == "phaseCrawler") trueName = "Crawler";
	
	GameObject.Find("UI Root/UI_StationPanel/HangarList/Ship").GetComponent(UILabel).text = trueName;	
	
	if (sData != null)
	{
		if (sData.isDone)
		{
			var iBuffer = sData.text.Split(";"[0]);		
			var i0 : int = int.Parse(iBuffer[0]);
			var i1 : int = int.Parse(iBuffer[1]);
			var i2 : float = float.Parse(iBuffer[2]);
			var i3 : float = float.Parse(iBuffer[3]);
			var i4 : float = float.Parse(iBuffer[4]);
			var i5 : float = float.Parse(iBuffer[5]);
			var i6 : int = int.Parse(iBuffer[6]);
			var i7 : int = int.Parse(iBuffer[7]);
			var i8 : int = int.Parse(iBuffer[8]);
			var i9 : int = int.Parse(iBuffer[9]);
			var i10 : int = int.Parse(iBuffer[10]);
			var i11 : float = float.Parse(iBuffer[11]);
			var i12 : float = float.Parse(iBuffer[12]);
			sData = null;
			
			Camera.main.GetComponent(HUD).UpdateInfo(i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12);
			Camera.main.GetComponent(HUD).requestStartData();
		}
	}
	
	if (doneButton.active == false)
	{
		if (selectedPOS != null)
			if (names[selectedPOS] != null)
				selectedShipname = names[selectedPOS];
			
		GameObject.Find("UI Root/UI_StationPanel/HangarList/Name").GetComponent(UILabel).text = selectedShipname;
	}
	
	if (renameData != null)
	{
		if (renameData.isDone)
		{
			names[selectedPOS] = renameData.text;
			selectedShipname = renameData.text;
			HUD.usrActiveshipname = renameData.text;
			Camera.main.GetComponent(HUD).reqBSAT();
			renameData = null;
		}
	}
}
