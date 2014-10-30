#pragma strict

var chatSound : AudioClip;

var mySkin : GUISkin;
var chatlog = new Array(6);
//var chatlog = "";
var chatlog0 = "";
var chatlog1 = "";
var chatlog2 = "";
var chatlog3 = "";
var chatlog4 = "";
var chatlog5 = "";
var chatlog6 = "";
var chatlog0m = 0;
var chatlog1m = 0;
var chatlog2m = 0;
var chatlog3m = 0;
var chatlog4m = 0;
var chatlog5m = 0;
var chatlog6m = 0;
var chatlog0t = 0.0000;
var chatlog1t = 0.0000;
var chatlog2t = 0.0000;
var chatlog3t = 0.0000;
var chatlog4t = 0.0000;
var chatlog5t = 0.0000;
var chatlog6t = 0.0000;
var chattextbox = false;
var chattext = "";
var chattextend = 10;
var chattextendin = 0;
var focusChatInput = false;
var usrAccount = "";
var scrollposition : Vector2 = Vector2.zero;

function OnGUI()
{		
	GUI.skin = mySkin;
	//GUI.Label(Rect(0,0,100,100),Screen.width + " X " + Screen.height);
	
	chatlog.length = 7;
	
	chatlog0 = chatlog[0];
	chatlog1 = chatlog[1];
	chatlog2 = chatlog[2];
	chatlog3 = chatlog[3];
	chatlog4 = chatlog[4];
	chatlog5 = chatlog[5];
	chatlog6 = chatlog[6];

/*	
	if (chatlog0 != null)
		GUI.Label(Rect(15,Screen.height - 150,273,150),chatlog0);
	if (chatlog1 != null)
		GUI.Label(Rect(15,Screen.height - 130,273,150),chatlog1);
	if (chatlog2 != null)
		GUI.Label(Rect(15,Screen.height - 110,273,150),chatlog2);
	if (chatlog3 != null)
		GUI.Label(Rect(15,Screen.height - 90,273,150),chatlog3);
	if (chatlog4 != null)
		GUI.Label(Rect(15,Screen.height - 70,273,150),chatlog4);
	if (chatlog5 != null)
		GUI.Label(Rect(15,Screen.height - 50,273,150),chatlog5);
	if (chatlog6 != null)
		GUI.Label(Rect(15,Screen.height - 30,273,150),chatlog6);
*/
	if (Time.fixedTime - chatlog6t > 60) 
		chatlog6 = null;
	if (Time.fixedTime - chatlog5t > 60) 
		chatlog5 = null;
	if (Time.fixedTime - chatlog4t > 60) 
		chatlog4 = null;
	if (Time.fixedTime - chatlog3t > 60) 
		chatlog3 = null;
	if (Time.fixedTime - chatlog2t > 60) 
		chatlog2 = null;
	if (Time.fixedTime - chatlog1t > 60) 
		chatlog1 = null;	
	if (Time.fixedTime - chatlog0t > 60) 
		chatlog0 = null;
	
	if (chatlog6 != null)
	{
		if (chatlog6.Length > 78)
			chatlog6m = 15 * 2;
		else if (chatlog6.Length > 39)
			chatlog6m = 15 * 1;
		else if (chatlog6.Length <= 39)
			chatlog6m = 0;
	}

	if (chatlog5 != null)
	{
		if (chatlog5.Length > 78)
			chatlog5m = (15 * 2);
		else if (chatlog5.Length > 39)
			chatlog5m = (15 * 1);
		else if (chatlog5.Length <= 39)
			chatlog5m = 0;
	}

	if (chatlog4 != null)
	{
		if (chatlog4.Length > 78)
			chatlog4m = (15 * 2);
		else if (chatlog4.Length > 39)
			chatlog4m = (15 * 1);
		else if (chatlog4.Length <= 39)
			chatlog4m = 0;
	}

	if (chatlog3 != null)
	{
		if (chatlog3.Length > 78)
			chatlog3m = (15 * 2);
		else if (chatlog3.Length > 39)
			chatlog3m = (15 * 1);
		else if (chatlog3.Length <= 39)
			chatlog3m = 0;
	}

	if (chatlog2 != null)
	{
		if (chatlog2.Length > 78)
			chatlog2m = (15 * 2);
		else if (chatlog2.Length > 39)
			chatlog2m = (15 * 1);
		else if (chatlog2.Length <= 39)
			chatlog2m = 0;
	}

	if (chatlog1 != null)
	{
		if (chatlog1.Length > 78)
			chatlog1m = (15 * 2);
		else if (chatlog1.Length > 39)
			chatlog1m = (15 * 1);
		else if (chatlog1.Length <= 39)
			chatlog1m = 0;
	}

	if (chatlog0 != null)
	{
		if (chatlog0.Length > 78)
			chatlog0m = (15 * 2);
		else if (chatlog0.Length > 39)
			chatlog0m = (15 * 1);
		else if (chatlog0.Length <= 39)
			chatlog0m = 0;
	}

	if (chattextbox == false)
	{
		if (chatlog0 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 180) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m + chatlog0m),285,23 + chatlog0m),"");
			GUI.Label(Rect(15,(Screen.height - 180) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m + chatlog0m),273,150),chatlog0);
		}
		if (chatlog1 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 155) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m),285,23 + chatlog1m),"");
			GUI.Label(Rect(15,(Screen.height - 155) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m),273,150),chatlog1);
		}
		if (chatlog2 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 130) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m),285,23 + chatlog2m),"");
			GUI.Label(Rect(15,(Screen.height - 130) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m),273,150),chatlog2);
		}
		if (chatlog3 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 105) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m),285,23 + chatlog3m),"");
			GUI.Label(Rect(15,(Screen.height - 105) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m),273,150),chatlog3);
		}
		if (chatlog4 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 80) - (chatlog6m + chatlog5m + chatlog4m),285,23 + chatlog4m),"");
			GUI.Label(Rect(15,(Screen.height - 80) - (chatlog6m + chatlog5m + chatlog4m),273,150),chatlog4);
		}
		if (chatlog5 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 55) - (chatlog6m + chatlog5m),285,23 + chatlog5m),"");
			GUI.Label(Rect(15,(Screen.height - 55) - (chatlog6m + chatlog5m),273,150),chatlog5);
		}
		if (chatlog6 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 30) - chatlog6m,285,23 + chatlog6m),"");
			GUI.Label(Rect(15,(Screen.height - 30) - chatlog6m,273,150),chatlog6);
		}
	}
	
	if (chattextbox == true)
	{
		if (chatlog0 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 200) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m + chatlog0m),285,23 + chatlog0m),"");
			GUI.Label(Rect(15,(Screen.height - 200) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m + chatlog0m),273,150),chatlog0);
		}
		if (chatlog1 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 175) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m),285,23 + chatlog1m),"");
			GUI.Label(Rect(15,(Screen.height - 175) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m + chatlog1m),273,150),chatlog1);
		}
		if (chatlog2 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 150) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m),285,23 + chatlog2m),"");
			GUI.Label(Rect(15,(Screen.height - 150) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m + chatlog2m),273,150),chatlog2);
		}
		if (chatlog3 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 125) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m),285,23 + chatlog3m),"");
			GUI.Label(Rect(15,(Screen.height - 125) - (chatlog6m + chatlog5m + chatlog4m + chatlog3m),273,150),chatlog3);
		}
		if (chatlog4 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 100) - (chatlog6m + chatlog5m + chatlog4m),285,23 + chatlog4m),"");
			GUI.Label(Rect(15,(Screen.height - 100) - (chatlog6m + chatlog5m + chatlog4m),273,150),chatlog4);
		}
		if (chatlog5 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 75) - (chatlog6m + chatlog5m),285,23 + chatlog5m),"");
			GUI.Label(Rect(15,(Screen.height - 75) - (chatlog6m + chatlog5m),273,150),chatlog5);
		}
		if (chatlog6 != null)
		{
			GUI.Box(Rect(5,(Screen.height - 50) - chatlog6m,285,23 + chatlog6m),"");
			GUI.Label(Rect(15,(Screen.height - 50) - chatlog6m,273,150),chatlog6);
		}
	}
	//GUI.Label(Rect(15,Screen.height - 150,265,140),chatlog);
	
	//GUI.Box(Rect(5,Screen.height - 155,275,150),"");	
	//GUI.Label(Rect(0,0,100,100),chatlog);
	
	if(chattextbox == true)
	{
		//GUI.Box(Rect(5,Screen.height - 175,275,20),"");
		GUI.SetNextControlName("ChatInput");
		chattext = GUI.TextArea(Rect(5,Screen.height - 25,285,20),chattext);
		if (focusChatInput == true)
		{
			//GUI.FocusControl("ChatInput");
			//focusChatInput = false;
		}
		//Debug.Log(parseInt(chattext[chattext.Length]));
		
		if (chattext.Length != 0)
		{
			chattextendin = parseInt(chattext[chattext.Length-1]);
			//Debug.Log("First: " + chattextend + " / Next: " + chattextendin);
		}

		if (chattextendin == chattextend)
		{
			if (chattext.Length > 1)
			{
				usrAccount = PlayerPrefs.GetString("PlayerName");
				networkView.RPC("ChatRequest",RPCMode.Server,usrAccount,chattext);
			}
			chattext = "";
			chattextbox = false;
			chattextendin = 0;
		}
	}
	
	// Chat Button for Mobile Devices
	if (Application.platform == RuntimePlatform.Android)
	{
		chattextbox = true;
		if (GUI.Button(Rect(300,Screen.height-40,50,40),"Send"))
		{
			if (chattext.Length > 1)
			{
				usrAccount = PlayerPrefs.GetString("PlayerName");
				networkView.RPC("ChatRequest",RPCMode.Server,usrAccount,chattext);
			}
			chattext = "";
			chattextbox = false;
			chattextendin = 0;
		}
	}

}

function Start () {

}

function Update () {

	if(Input.GetButtonUp("Enter"))
	{
		if(chattextbox == false)
		{
			chattextbox = true;
			focusChatInput = true;
		}
		else
		{
			chattextbox = false;
		}
	}
	
	/*if(Input.GetButtonUp("SpaceBar"))
	{
		HUD.usrHealth--;
		HUD.healthUpdate = true;
		GameObject.Find("PlayerShip").transform.position.x = 0;
		GameObject.Find("PlayerShip").transform.position.y = 5;
		GameObject.Find("PlayerShip").transform.position.z = 0;
	}*/
}

@RPC
function ChatRequest(ChatName:String,ChatText:String)
{
}

@RPC
function IBChat(ChatName:String,ChatText:String)
{
	AudioSource.PlayClipAtPoint(chatSound, gameObject.transform.position);
	
	chatlog[0] = chatlog[1];
	chatlog[1] = chatlog[2];
	chatlog[2] = chatlog[3];
	chatlog[3] = chatlog[4];
	chatlog[4] = chatlog[5];
	chatlog[5] = chatlog[6];
	chatlog[6] = ChatName + ": " + ChatText;
	
	chatlog0t = chatlog1t;
	chatlog1t = chatlog2t;
	chatlog2t = chatlog3t;
	chatlog3t = chatlog4t;
	chatlog4t = chatlog5t;
	chatlog5t = chatlog6t;
	chatlog6t = Time.fixedTime;
	
	//chatlog = chatlog + ChatName + ": " + ChatText;
}