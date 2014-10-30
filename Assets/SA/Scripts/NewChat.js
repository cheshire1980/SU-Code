#pragma strict
import System;

var chatTab : String = "PUBLIC";

var cTextPrefab : Transform;

var cNotifSound : AudioClip;

function sendChat ()
{
	var sendText = GameObject.Find("UI_ChatAnchor/UI_Chat/Input/Label").GetComponent(UILabel).text;
	
	if (sendText.ToUpper() == "/GM")
	{
		if (HUD.usrGM >= 1)
		{
			chatTab = "GM";
			notifyChat("GM Chat");
		}
	}
	else if (sendText.ToUpper() == "/PUBLIC")
	{
		chatTab = "PUBLIC";
		notifyChat("Public Chat");
	}
		
	else if (sendText != "")
	{
		if (chatTab == "PUBLIC")
			networkView.RPC("ChatRequest",RPCMode.Server,HUD.usrAccount,sendText);
			
		else if (chatTab == "GM")
			networkView.RPC("obGMchat",RPCMode.Server,HUD.usrAccount,sendText);			
	}
	
	GameObject.Find("UI_ChatAnchor/UI_Chat/Input/Label").GetComponent(UILabel).text = "";
}

function notifyChat (chatText : String)
{
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
	AudioSource.PlayClipAtPoint(cNotifSound, Camera.main.transform.position);
	
	var cText = Instantiate(cTextPrefab, Vector3(0,0,0), Quaternion.identity);
	cText.transform.parent = GameObject.Find("UI_ChatAnchor/UI_Chat/Scroll/Grid").transform;
	cText.transform.localScale = Vector3(1,1,1);
	cText.name = cText.name + System.DateTime.Now.Ticks; //HUD.chatCounter;
	GameObject.Find(cText.name).GetComponent(UILabel).text = "(Switched to " + chatText + ")";
	
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
}

@RPC
function obGMchat (name : String, text : String)
{
}

@RPC
function ibGMchat (ChatName:String,ChatText:String)
{
	if (HUD.usrGM > 0)
	{
		var editedName = "[i]" + ChatName + "[/i]: ";
		
		if (GameObject.Find(ChatName) != null)
		{
			if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 1)
			{
				editedName = "[7FE817](GM Chat)[-] [7FE817]" + editedName + "[-]";
			}
			
			else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 2)
			{
				editedName = "[7FE817](GM Chat)[-] [7FE817]" + editedName + "[-]";			
			}
			else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 3)
			{
				editedName = "[7FE817](GM Chat)[-] [FDD017]" + editedName + "[-]";			
			}
			else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 4)
			{
				editedName = "[7FE817](GM Chat)[-] [F87217]" + editedName + "[-]";			
			}
			else
			{
				editedName = "[7FE817](GM Chat)[-] [817C7B]" + editedName + "[-]";
			}
		}
		
		var editedText = editedName + "\n" + ChatText;
		
		GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
		GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
		AudioSource.PlayClipAtPoint(cNotifSound, Camera.main.transform.position);
		
		var cText = Instantiate(cTextPrefab, Vector3(0,0,0), Quaternion.identity);
		cText.transform.parent = GameObject.Find("UI_ChatAnchor/UI_Chat/Scroll/Grid").transform;
		cText.transform.localScale = Vector3(1,1,1);
		cText.name = cText.name + System.DateTime.Now.Ticks; //HUD.chatCounter;
		GameObject.Find(cText.name).GetComponent(UILabel).text = editedText;
		
		GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
		GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	}
}

@RPC
function ChatRequest(ChatName:String,ChatText:String)
{
}

@RPC
function IBChat(ChatName:String,ChatText:String)
{
	HUD.chatCounter = HUD.chatCounter + 1;
	
	var editedName = "[i]" + ChatName + "[/i]: ";
	
	if (GameObject.Find(ChatName) != null)
	{
		if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 1)
		{
			editedName = "[7FE817]" + editedName + "[-]";
		}
		
		else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 2)
		{
			editedName = "[7FE817]" + editedName + "[-]";			
		}
		else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 3)
		{
			editedName = "[FDD017]" + editedName + "[-]";			
		}
		else if (GameObject.Find(ChatName).GetComponent(PlayerMovement).gm == 4)
		{
			editedName = "[F87217]" + editedName + "[-]";			
		}
		else
		{
			editedName = "[817C7B]" + editedName + "[-]";
		}
	}
	
	var editedText = editedName + "\n" + ChatText;
	
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
	AudioSource.PlayClipAtPoint(cNotifSound, Camera.main.transform.position);
	
	var cText = Instantiate(cTextPrefab, Vector3(0,0,0), Quaternion.identity);
	cText.transform.parent = GameObject.Find("UI_ChatAnchor/UI_Chat/Scroll/Grid").transform;
	cText.transform.localScale = Vector3(1,1,1);
	cText.name = cText.name + System.DateTime.Now.Ticks; //HUD.chatCounter;
	GameObject.Find(cText.name).GetComponent(UILabel).text = editedText;
	
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
}