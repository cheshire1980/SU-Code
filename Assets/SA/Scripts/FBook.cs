using UnityEngine;
using System.Collections;
using Facebook.MiniJSON;

public class FBook : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}


	void OnGUI () {
		if (!FB.IsLoggedIn)                                                                                              
		{                                                                                                                
			GUI.Label((new Rect(179 , 11, 287, 160)), "Login to Facebook");             
			if (GUI.Button(new Rect(10, 10, 200, 200), "Test"))                                      
			{                                                                                                            
				FB.Login("email,publish_actions", LoginCallback);                                                        
			}                                                                                                            
		}  
	}

	void Awake () {

		// Initialize FB SDK              
		enabled = false;                  
		FB.Init(SetInit, OnHideUnity);  
	}

	private void SetInit()                                                                       
	{                                                                                            
		Debug.Log("SetInit");                                                                  
		enabled = true; // "enabled" is a property inherited from MonoBehaviour                  
		if (FB.IsLoggedIn)                                                                       
		{                                                                                        
			Debug.Log("Already logged in");                                                    
			OnLoggedIn();                                                                        
		}
		else
		{
			Debug.Log ("Not Logged in");
		}
	}                                                                                            
	
	private void OnHideUnity(bool isGameShown)                                                   
	{                                                                                            
		Debug.Log("OnHideUnity");                                                              
		if (!isGameShown)                                                                        
		{                                                                                        
			// pause the game - we will need to hide                                             
			Time.timeScale = 0;                                                                  
		}                                                                                        
		else                                                                                     
		{                                                                                        
			// start the game back up - we're getting focus again                                
			Time.timeScale = 1;                                                                  
		}                                                                                        
	}

	void LoginCallback(FBResult result)                                                        
	{                                                                                          
		Debug.Log("LoginCallback");                                                          
		
		if (FB.IsLoggedIn)                                                                     
		{                                                                                      
			OnLoggedIn();                                                                      
		}                                                                                      
	}                                                                                          
	
	void OnLoggedIn()                                                                          
	{                                                                                          
		Debug.Log("Logged in. ID: " + FB.UserId);
		
		// Reqest player info and profile picture                                                                           
		FB.API ("/me?fields=id,first_name,friends.limit(100).fields(first_name,id)", Facebook.HttpMethod.GET, APICallback);
	}

	void APICallback(FBResult result)                                                                                              
	{                                                                                                                              
		Debug.Log("APICallback");                                                                                                
		if (result.Error != null)                                                                                                  
		{                                                                                                                          
			Debug.LogError(result.Error);                                                                                           
			// Let's just try again                                                                                                
			FB.API("/me?fields=id,first_name,friends.limit(100).fields(first_name,id)", Facebook.HttpMethod.GET, APICallback);     
			return;                                                                                                                
		}                                                                                                                          
		
		profile = Util.DeserializeJSONProfile(result.Text);                                                                        
		GameStateManager.Username = profile["first_name"];                                                                         
		friends = Util.DeserializeJSONFriends(result.Text);                                                                        
	}
}
