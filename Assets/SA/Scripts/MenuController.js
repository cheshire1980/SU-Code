#pragma strict

import System;
//import System.Data;
import System.IO;

//import MySql.Data;
//import MySql.Data.MySqlClient;
//import System.Collections;
//import System.Collections.Generic;
//import System.Data.SqlClient;



static var filePath = "sudata.dat";

var header : Texture;
var headerlogo : Texture;

static var version : int = 12022014;
var mySkin : GUISkin;
var mySkin2 : GUISkin;

static var svrAddr = "gameserver.spaceunfolding.com";
//static var svrAddr = "127.0.0.1";
static var svrPort = 20500;

// Setting Default Values for Objects
var LoaderWidth = 278;
var LoaderHeight = 130;

var ErrorHeight = 290;
var ErrorEndHeight = 50;
var ErrorLabelWidth = 290;
var ErrorLabelHeight = 311;

var ErrorTriggerNotLoggedIn = false;
var ErrorTriggerAccountCreated = false;
var ErrorTriggerAccountExists = false;
var ErrorTriggerIncorrectVersion = false;

var LoginWidth = 286;
var LoginHeight = 247;

var QuitWidth = 351;
var QuitHeight = 247;

var NewWidth = 435;
var NewHeight = 247;

var InputWidth = 387;
var InputAccountHeight = 156;
var InputPasswordHeight = 184;
var InputEmailHeight = 212;

var LabelWidth = 297;
var LabelAccountHeight = 154;
var LabelPasswordHeight = 182;
var LabelEmailHeight = 210;

var NewButtonVisible = true;
var CreateButtonVisible = false;

// Setting Default Values for Accounts
static var usrAccount = "";
var usrPassword = "";
var usrEmail = "";
var firstparm = "";
var secondparm = "";
var thirdparm = "";
var connFlag = false;

static var sDisco = false;
static var phase1 = false;
static var phase2 = false;
static var phase3 = false;
static var phase4 = false;

private var windowRect = Rect (Screen.width/2-350/2, Screen.height/2-480/2, 350, 480);

var dbconn : WWW;
var dbnew : WWW;
	
	
// End of variables + Start of code
function OnConnectedToServer()
{
	if (Network.peerType == NetworkPeerType.Client)
	{
		if (connFlag == true)
		{
			phase1 = false;
			phase2 = true;

			//GUI.Label(Rect(10,10,100,100),"Connected! Sending RPC Call!");
			networkView.RPC("Exist",RPCMode.Server,usrAccount,usrPassword,version);
			connFlag = false;
		}
	}
}

function mainWindow(windowID : int)
{
	GUILayout.Space(8);
	GUILayout.BeginVertical();
	//GUILayout.Label("Guest"+SystemInfo.deviceUniqueIdentifier.Substring(0,10));
	GUILayout.Label("Login","BigText");
	GUILayout.Label("", "Divider");
	GUILayout.Space(8);

	GUILayout.BeginHorizontal();
	GUILayout.Label("Account Name","PlainText");
	GUILayout.Space(10);
	usrAccount = GUILayout.TextField(usrAccount, 25, GUILayout.Width(175));
	GUILayout.EndHorizontal();
	
	GUILayout.Space(8);
	
	GUILayout.BeginHorizontal();
	GUILayout.Label("Account Password","PlainText");
	GUILayout.Space(10);
	usrPassword = GUILayout.PasswordField(usrPassword,"*"[0], 25, GUILayout.Width(175));
	GUILayout.EndHorizontal();

	GUILayout.Space(8);
	GUILayout.Label("", "Divider");
	GUILayout.Space(8);
	
	if ( NewButtonVisible )
	{
		if (GUILayout.Button("Login"))
		{
			connFlag = true;
			phase1 = true;
			Network.Connect(svrAddr,svrPort);
		}
	}
	if ( CreateButtonVisible )
	{
		if (GUILayout.Button("Create!"))
		{
			NewButtonVisible = true;
			CreateButtonVisible = false;
			networkView.RPC("New",RPCMode.Server,usrAccount,usrPassword,usrEmail);
		}
	}
	GUILayout.BeginHorizontal();
	if (GUILayout.Button("Quit"))
	{
		Network.Disconnect();
		Application.Quit();
	}
	if ( NewButtonVisible )
	{
		if (GUILayout.Button("New"))
		{
			NewButtonVisible = false;
			CreateButtonVisible = true;
			Network.Connect(svrAddr,svrPort);
		}
	}
	if ( CreateButtonVisible )
	{
		if (GUILayout.Button("Cancel"))
		{
			NewButtonVisible = true;
			CreateButtonVisible = false;
		}
	}
	
	GUILayout.EndHorizontal();
	
	GUILayout.Space(8);
	GUILayout.Label("","Divider");
	GUILayout.Space(16);
	
	if (ErrorTriggerNotLoggedIn)
		GUILayout.Label("The Acct/Pass is incorrect!!","PlainText");
	else if (ErrorTriggerAccountCreated)
		GUILayout.Label("The Account has been created!!","PlainText");
	else if (ErrorTriggerAccountExists)
		GUILayout.Label("The Account already exists!!","PlainText");
	else if (ErrorTriggerIncorrectVersion)
		GUILayout.Label("Incorrect Version!! Please Update!!","PlainText");
	else if (sDisco)
		GUILayout.Label("Disconnected from the server!!","PlainText");
		
	if (phase1)
		GUILayout.Label("Connecting to server ...","PlainText");
	if (phase2)
		GUILayout.Label("Connected, sent login info & waiting for response from server ...","PlainText");
	if (phase3)
		GUILayout.Label("Received server response, loading scene, please wait ...","PlainText");

	GUILayout.EndVertical();
	
	//GUI.DragWindow(Rect(0,0,10000,10000));
}

function Start()
{
	Debug.Log(Application.persistentDataPath);
	var resolutions : Resolution[] = Screen.resolutions;

	if (Application.platform == RuntimePlatform.Android)
	{
		windowRect = Rect (960/2-350/2, 600/2-480/2, 350, 480);
		//Screen.SetResolution (960, 600, true);
		Screen.SetResolution (1280, 720, true);
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
	}
	
}

function OnGUI()
{
	GUI.skin = mySkin2;
	//GUI.Box(windowRect,"");
	//GUI.Box(windowRect,"");
	// Login Screen Box
	GUI.skin = mySkin;
	
	//windowRect = GUI.Window (0, windowRect, mainWindow, "");
	//GUI.BeginGroup (Rect (0,0,100,100));
	//GUI.EndGroup ();

	// Old Login

	//GUI.skin = mySkin2;
	
	//GUI.DrawTexture(Rect(Screen.width/2-(965/2), 0, 965, 298),header);
	GUI.DrawTexture(Rect(Screen.width/2-(600/2), 10, 600, 56),headerlogo);

	if (ErrorTriggerNotLoggedIn)
		GameObject.Find("Info").GetComponent(UILabel).text = "The Acct/Pass is incorrect!!";
	else if (ErrorTriggerAccountCreated)
		GameObject.Find("Info").GetComponent(UILabel).text = "The Account has been created!!";
	else if (ErrorTriggerAccountExists)
	{
		GameObject.Find("Info").GetComponent(UILabel).text = "The Account already exists!!";
		ErrorTriggerAccountExists = false;
	}
	else if (ErrorTriggerIncorrectVersion)
		GameObject.Find("Info").GetComponent(UILabel).text = "Incorrect Version!! Please Update!!";
	else if (sDisco)
		GameObject.Find("Info").GetComponent(UILabel).text = "Disconnected from the server!!";

	if (phase1)
		GameObject.Find("Info").GetComponent(UILabel).text = "Connecting to login server ...";
	if (phase2)
		GameObject.Find("Info").GetComponent(UILabel).text = "Checking login credentials ...";
	if (phase3)
		GameObject.Find("Info").GetComponent(UILabel).text = "Login accepted, logging into game server ...";
	if (phase4)
		GameObject.Find("Info").GetComponent(UILabel).text = "Loading scene ...";

	ErrorTriggerNotLoggedIn = false;
	ErrorTriggerAccountCreated = false;
	ErrorTriggerAccountExists = false;
	ErrorTriggerIncorrectVersion = false;
	sDisco = false;
	/*
	GUI.Box(Rect(LoaderWidth,LoaderHeight,220,150),"Login");
	
	// Info box
	if (ErrorTriggerNotLoggedIn)
	{
		GUI.Box(Rect(LoaderWidth,ErrorHeight,220,ErrorEndHeight),"Server Info");
		GUI.Label(Rect(ErrorLabelWidth,ErrorLabelHeight, 300,100),"The Acct/Pass is incorrect!!");
	}
	else if (ErrorTriggerAccountCreated)
	{
		GUI.Box(Rect(LoaderWidth,ErrorHeight,220,ErrorEndHeight),"Server Info");
		GUI.Label(Rect(ErrorLabelWidth,ErrorLabelHeight, 300,100),"The Account has been created!!");
	}
	else if (ErrorTriggerAccountExists)
	{
		GUI.Box(Rect(LoaderWidth,ErrorHeight,220,ErrorEndHeight),"Server Info");
		GUI.Label(Rect(ErrorLabelWidth,ErrorLabelHeight, 300,100),"The Account already exists!!");
	}
	else if (ErrorTriggerIncorrectVersion)
	{
		GUI.Box(Rect(LoaderWidth,ErrorHeight,220,ErrorEndHeight),"Server Info");
		GUI.Label(Rect(ErrorLabelWidth,ErrorLabelHeight, 300,100),"Incorrect Version!! Please Update!!");
	}
	else if (sDisco)
	{
		GUI.Box(Rect(LoaderWidth,ErrorHeight,220,ErrorEndHeight),"Client Info");
		GUI.Label(Rect(ErrorLabelWidth,ErrorLabelHeight, 300,100),"Disconnected from the server!!");
	}

	// Login Buttons
	if (GUI.Button(Rect(LoginWidth,LoginHeight,60,25),"Login"))
	{
		connFlag = true;
		Network.Connect(svrAddr,svrPort);
		//networkView.RPC("Exist",RPCMode.Server,usr_Account,usr_Password);
	}
	
	if (GUI.Button(Rect(QuitWidth,QuitHeight,50,25),"Quit"))
	{
		Network.Disconnect();
		Application.Quit();
	}
	
	if ( NewButtonVisible )
	{
		if (GUI.Button(Rect(NewWidth,NewHeight,55,25),"New"))
		{
			NewButtonVisible = false;
			CreateButtonVisible = true;
			Network.Connect(svrAddr,svrPort);
		}
	}
	
	if ( CreateButtonVisible )
	{
		GUI.Label(Rect(LabelWidth,LabelEmailHeight,100,50),"Email");
		usrEmail = GUI.TextArea(Rect(InputWidth,InputEmailHeight,100,20),usrEmail);
		
		if (GUI.Button(Rect(NewWidth,NewHeight,55,25),"Create!"))
		{
			NewButtonVisible = true;
			CreateButtonVisible = false;
			networkView.RPC("New",RPCMode.Server,usrAccount,usrPassword,usrEmail);
		}
	}
	
	// Login Text Areas & Labels
	usrAccount = GUI.TextField(Rect(InputWidth,InputAccountHeight,100,20),usrAccount,25);
	usrPassword = GUI.PasswordField(Rect(InputWidth,InputPasswordHeight,100,20),usrPassword,"*"[0],25);
	GUI.Label(Rect(LabelWidth,LabelAccountHeight,100,50),"Account");
	GUI.Label(Rect(LabelWidth,LabelPasswordHeight,100,50),"Password");
	*/
	/*
	if (Network.peerType == NetworkPeerType.Client)
	{
		if (connFlag == true)
		{
			//GUI.Label(Rect(10,10,100,100),"Connected! Sending RPC Call!");
			networkView.RPC("Exist",RPCMode.Server,usrAccount,usrPassword,version);
			connFlag = false;
		}
	}*/
}

function backClicked()
{

	GameObject.Find("Info").GetComponent(UILabel).text = "";
	
	var temp : GameObject;
	
	temp = GameObject.Find("Tab2");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);
	temp = GameObject.Find("Tab3");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);
	temp = GameObject.Find("Tab4");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);
	
	temp = GameObject.Find("Menu/Tab1");
	temp.SetActiveRecursively(true);
	temp.SetActive(true);
	
	temp = GameObject.Find("Menu/Back");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);

}

function enableGuest()
{

	//Network.Disconnect();
	NewButtonVisible = false;
	CreateButtonVisible = true;
	//Network.Connect(svrAddr,svrPort);

	var tempAccount = "";
	var tempPassword = "";
	
	if (System.IO.File.Exists(Application.persistentDataPath + "/" + filePath))
	{
		var sr = new File.OpenText(Application.persistentDataPath + "/" + filePath);
		var input = "";
		
		input = sr.ReadLine();
		tempAccount = input;
		
		input = sr.ReadLine();
		tempPassword = input;

		sr.Close();
	}
	
	if (tempAccount == "")
	{
		var temp : GameObject;
		
		temp = GameObject.Find("Menu/Back");
		temp.SetActiveRecursively(true);
		temp.SetActive(true);

		temp = GameObject.Find("Menu/Tab1");
		temp.SetActiveRecursively(false);
		temp.SetActive(true);

		temp = GameObject.Find("Tab2");
		temp.SetActiveRecursively(true);
		temp.SetActive(true);
		
		usrPassword = SystemInfo.deviceUniqueIdentifier;
	}
	else
	{
		usrAccount = tempAccount;
		usrPassword = tempPassword;
		enableGuestLogin();
	}
	
}

function enableNew()
{

	//Network.Disconnect();
	NewButtonVisible = false;
	CreateButtonVisible = true;
	//Network.Connect(svrAddr,svrPort);

	var temp : GameObject;
	
	temp = GameObject.Find("Menu/Back");
	temp.SetActiveRecursively(true);
	temp.SetActive(true);

	temp = GameObject.Find("Menu/Tab1");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);

	temp = GameObject.Find("Tab4");
	temp.SetActiveRecursively(true);
	temp.SetActive(true);
	
	//usrPassword = SystemInfo.deviceUniqueIdentifier;
	
}

function dbNewCreate (uname : String, upass : String, uemail : String)
{
	dbnew = new WWW("http://www.spaceunfolding.com/remotedb/newacct.php?username=" + uname + "&password=" + upass + "&email=" + uemail);
	yield dbnew;
}

function enableCreate()
{

	usrAccount = GameObject.Find("Tab2/Name/Label").GetComponent(UILabel).text;
	
	NewButtonVisible = true;
	CreateButtonVisible = false;
	GameObject.Find("Info").GetComponent(UILabel).text = "Checking player name availability, please wait ...";
	//networkView.RPC("New",RPCMode.Server,usrAccount,usrPassword,usrEmail);
	dbNewCreate(usrAccount, usrPassword, usrEmail);
}

function enableNewCreate()
{

	usrAccount = GameObject.Find("Tab4/Name/Label").GetComponent(UILabel).text;
	usrPassword = GameObject.Find("Tab4/Password").GetComponent(UIInput).value;
	
	NewButtonVisible = true;
	CreateButtonVisible = false;
	GameObject.Find("Info").GetComponent(UILabel).text = "Checking player name availability, please wait ...";
	//networkView.RPC("New",RPCMode.Server,usrAccount,usrPassword,usrEmail);
	dbNewCreate(usrAccount, usrPassword, usrEmail);
}

function enableExisting()
{

	Network.Disconnect();
	var temp : GameObject;
	
	temp = GameObject.Find("Menu/Back");
	temp.SetActiveRecursively(true);
	temp.SetActive(true);

	temp = GameObject.Find("Menu/Tab1");
	temp.SetActiveRecursively(false);
	temp.SetActive(true);

	temp = GameObject.Find("Tab3");
	temp.SetActiveRecursively(true);
	temp.SetActive(true);
	
	var tempAccount = "";
	var tempPassword = "";
	
	if (System.IO.File.Exists(Application.persistentDataPath + "/" + filePath))
	{
		var sr = new File.OpenText(Application.persistentDataPath + "/" + filePath);
		var input = "";
		
		tempAccount = sr.ReadLine();
		tempPassword = sr.ReadLine();

		sr.Close();
	}
	
	GameObject.Find("Tab3/Name/Label").GetComponent(UILabel).text = tempAccount;
	GameObject.Find("Tab3/Password").GetComponent(UIInput).value = tempPassword;
}

function enableLogin()
{
	
	usrAccount = GameObject.Find("Tab3/Name/Label").GetComponent(UILabel).text;
	usrPassword = GameObject.Find("Tab3/Password").GetComponent(UIInput).value;
	
	Debug.Log(usrAccount + " " + usrPassword);
	
	connFlag = true;
	phase1 = true;
	
	dbLogin(usrAccount, usrPassword);
		
	//Network.Connect(svrAddr,svrPort);
	//PhotonNetwork.ConnectUsingSettings("v1.0");
	//PhotonNetwork.JoinRoom("main");

}

function dbLogin (uname : String, upass : String)
{
	dbconn = new WWW("http://www.spaceunfolding.com/remotedb/login.php?username=" + usrAccount + "&password=" + usrPassword);
	yield dbconn;
}

function dbLogin2 ()
{
	if (dbconn != null)
	{
		if (dbconn.text == "BAD")
		{
			phase1 = false;
			phase2 = false;
			phase3 = false;
			ErrorTriggerNotLoggedIn = true;
			ErrorTriggerAccountCreated = false;
			ErrorTriggerAccountExists = false;
			ErrorTriggerIncorrectVersion = false;
			dbconn = null;
		}

		else
		{
			//phase1 = false;
			//phase2 = false;
			//phase3 = true;
			
			//PhotonNetwork.ConnectUsingSettings("v1.0");
			if (dbconn.text.Substring(0,4) == "GOOD")
			{
				var iBuffer = dbconn.text.Split(";"[0]);
				dbconn = null;
				
				Debug.Log(iBuffer[0]);

				var data1 : String = iBuffer[1];
				var data2 : float = float.Parse(iBuffer[2]);
				var data3 : float = float.Parse(iBuffer[3]);
				var data4 : float = float.Parse(iBuffer[4]);
				var datavect : Vector3 = Vector3(data2,data3,data4);
				var data5 : int = int.Parse(iBuffer[5]);
				var data6 : int = int.Parse(iBuffer[6]);
				var data7 : float = float.Parse(iBuffer[7]);
				var data8 : float = float.Parse(iBuffer[8]);
				var data9 : int = int.Parse(iBuffer[9]);
				var data10 : int = int.Parse(iBuffer[10]);
				var data11 : String = iBuffer[11];
				var data12 : float = float.Parse(iBuffer[12]);
				var data13 : float = float.Parse(iBuffer[13]);
				var data14 : float = float.Parse(iBuffer[14]);
				var data15 : float = float.Parse(iBuffer[15]);
				var data16 : int = int.Parse(iBuffer[16]);
				var data17 : int = int.Parse(iBuffer[17]);
				var data18 : int = int.Parse(iBuffer[18]);
				var data19 : int = int.Parse(iBuffer[19]);
				var data20 : int = int.Parse(iBuffer[20]);
				var data21 : int = int.Parse(iBuffer[21]);
				var data22 : int = int.Parse(iBuffer[22]);
				var data23 : String = iBuffer[23];
				var data24 : int = int.Parse(iBuffer[24]);

				LoggedIn(data1,datavect,data5,data6,data7,data8,data9,data10,data11,
									data12,data13,data14,data15,data16,
									data17,data18,data19,data20,data21,data22,data23,data24);
			}
		}
	}	
}

function dbNewCreate2 ()
{
	if (dbnew != null)
	{
		if (dbnew.text == "GOOD")
		{
			AccountCreated();
			dbnew = null;
		}
		
		else if (dbnew.text == "BAD")
		{
			AccountExists();
			dbnew = null;
		}
	}
}

function Update ()
{
	dbLogin2();
	dbNewCreate2();
}

function OnJoinedLobby ()
{
	phase1 = false;
	phase2 = false;
	phase3 = false;
	phase4 = true;
	GameObject.Find("Info").GetComponent(UILabel).text = "Loading scene ...";
	
	Debug.Log("Entered this function test");
	
	//PhotonNetwork.JoinRoom("main");
	
	//PlayerPrefs.SetString("PlayerActiveShip", "phaseCrawler");
	PhotonNetwork.SetSendingEnabled(0, false);
	PhotonNetwork.isMessageQueueRunning = false;
	PhotonNetwork.LoadLevel("TriniSpace");
}

function enableGuestLogin()
{
		
	connFlag = true;
	phase1 = true;
	//Network.Connect(svrAddr,svrPort);
	dbLogin(usrAccount, usrPassword);

}

@RPC
function Exist(firstparm:String,secondparm:String,ver:int)
{
}

@RPC
function New(firstparm:String,secondparm:String,thirdparm:String)
{
}

@RPC
function LoggedIn(Name:String,location:Vector3,gm:int,rank:int,experience:float,experiencemax:float,bloodstone:int,amethyst:int,activeship:String,
					activeshiphealth:float,activeshiphealthmax:float,activeshipenergy:float,activeshipblasterpower:float,skills:int,
					skillhealth:int,skillenergy:int,skillpower:int,smComplete:int,smEngaged:int,currentsm:int,zone:String,activator:int)
{
	Network.isMessageQueueRunning = false;
	
	phase1 = false;
	phase2 = false;
	phase3 = true;
	//GameObject.Find("Info").GetComponent(UILabel).text = "Received server response, loading scene, please wait ...";
	GameObject.Find("Info").GetComponent(UILabel).text = "Login accepted, logging into game server ...";
	
    //var sw : StreamWriter = new StreamWriter(filePath);
    #if !UNITY_WEBPLAYER
	var sw = File.CreateText(Application.persistentDataPath + "/" + filePath);
	sw.WriteLine(usrAccount);
	sw.WriteLine(usrPassword);
	sw.Flush();
	sw.Close();
	#endif
	
	usrAccount = Name;
	PlayerPrefs.SetString("PlayerName",usrAccount);
	PlayerPrefs.SetString("PlayerPassword",usrPassword);
	PlayerPrefs.SetInt("PlayerGM",gm);
	//PlayerPrefs.SetInt("PlayerHealth",10);
	//PlayerPrefs.SetInt("PlayerHealthMax",10);
	PlayerPrefs.SetFloat("PlayerX",location.x);
	PlayerPrefs.SetFloat("PlayerY",location.y);
	PlayerPrefs.SetFloat("PlayerZ",location.z);
	PlayerPrefs.SetInt("PlayerRank",rank);
	
	PlayerPrefs.SetInt("PlayerSkills",skills);
	PlayerPrefs.SetInt("PlayerSkillHealth",skillhealth);
	PlayerPrefs.SetInt("PlayerSkillEnergy",skillenergy);
	PlayerPrefs.SetInt("PlayerSkillPower",skillpower);
	
	PlayerPrefs.SetFloat("PlayerExp",experience);
	PlayerPrefs.SetFloat("PlayerExpMax",experiencemax);
	PlayerPrefs.SetInt("PlayerBloodstone",bloodstone);
	PlayerPrefs.SetInt("PlayerAmethyst",amethyst);
	PlayerPrefs.SetString("PlayerActiveShip",activeship);
	
	PlayerPrefs.SetFloat("PlayerActiveShipHealth",activeshiphealth);
	PlayerPrefs.SetFloat("PlayerActiveShipHealthMax",activeshiphealthmax);
	PlayerPrefs.SetFloat("PlayerActiveShipEnergy",activeshipenergy);
	PlayerPrefs.SetFloat("PlayerActiveShipEnergyMax",activeshipenergy);
	PlayerPrefs.SetFloat("PlayerActiveShipBlasterPower",activeshipblasterpower);
	
	PlayerPrefs.SetInt("PlayerSMComplete",smComplete);
	PlayerPrefs.SetInt("PlayerSMEngaged",smEngaged);
	PlayerPrefs.SetInt("PlayerSMCurrent",currentsm);

	if (zone == "")
		zone = "TriniSpace";
		
	PlayerPrefs.SetInt("PlayerActivator",activator);
	PlayerPrefs.SetString("PlayerZone",zone);
	
	ErrorTriggerNotLoggedIn = false;
	ErrorTriggerAccountCreated = false;
	ErrorTriggerAccountExists = false;
	ErrorTriggerIncorrectVersion = false;
	sDisco = false;

	//PhotonNetwork.isMessageQueueRunning = false;
	PhotonNetwork.ConnectUsingSettings("v1.0");
	//PhotonNetwork.isMessageQueueRunning = false;
	//Application.LoadLevel(zone);
}

@RPC
function NotLoggedIn()
{
	phase1 = false;
	phase2 = false;
	phase3 = false;
	ErrorTriggerNotLoggedIn = true;
	ErrorTriggerAccountCreated = false;
	ErrorTriggerAccountExists = false;
	ErrorTriggerIncorrectVersion = false;
}

@RPC
function AccountCreated()
{
	phase1 = false;
	phase2 = false;
	phase3 = false;
	ErrorTriggerNotLoggedIn = false;
	ErrorTriggerAccountCreated = true;
	ErrorTriggerAccountExists = false;
	ErrorTriggerIncorrectVersion = false;
	
	enableGuestLogin();
}

@RPC
function AccountExists()
{
	phase1 = false;
	phase2 = false;
	phase3 = false;
	ErrorTriggerNotLoggedIn = false;
	ErrorTriggerAccountCreated = false;
	ErrorTriggerAccountExists = true;
	ErrorTriggerIncorrectVersion = false;
}

@RPC
function IncorrectVersion()
{
	phase1 = false;
	phase2 = false;
	phase3 = false;
	ErrorTriggerNotLoggedIn = false;
	ErrorTriggerAccountCreated = false;
	ErrorTriggerAccountExists = false;
	ErrorTriggerIncorrectVersion = true;
}

@RPC
function MoveNPC()
{
}
